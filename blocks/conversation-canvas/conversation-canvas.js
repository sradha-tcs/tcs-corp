import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { buildImage } from '../../decorators/responsive-image-decorator.js';
import { getPageTags } from '../../utils/metadata.js';
import { getPages } from '../../utils/query-index.js';
import { getLocale } from '../../utils/site.js';
import { resolveTags } from '../../utils/taxonomy.js';
import { hideVisually } from '../../decorators/a11y-decorator.js';
import { createButton } from '../../decorators/button-decorator.js';
import { createIconButton } from '../../decorators/icon-button-decorator.js';
import {
  BUTTON_ALIGNMENTS, BUTTON_TYPES, BUTTON_VIEWS, readButtonOptions,
} from '../../utils/buttons.js';
import { linkOf } from '../../utils/links.js';
import { normalizeKey as normalize, textOf } from '../../utils/properties.js';
import { toSitePath } from '../../utils/urls.js';
import { uniqueId } from '../../utils/ids.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';
import registerCanvas from './canvas-controller.js';
import { bone, skeletonElement, skeletonWhile } from '../../decorators/skeleton-decorator.js';
import { buildEditorItems, editorItemHint } from '../../decorators/editor-item-decorator.js';

// UI text from the placeholders sheet; English fallbacks until it's loaded in decorate()
let t = (key, fallback, values) => fillPlaceholder(fallback, values);

// conversation canvas properties (_conversation-canvas.json), keyed by their normalized row name;
// the alt texts collapse into their images (field collapse), so rows without keys have none
const FIELDS = [
  'classes', 'bgstyle', 'backgroundimage', 'icon', 'iconalt', 'eyebrow', 'title', 'titlesize',
  'text', 'menurootpath', 'menudepth', 'searchplaceholder', 'searchaudioicon',
  'searchaudioiconalt', 'searchbuttonstyle', 'searchbuttonlabel', 'searchpage',
];
const COLLAPSED = ['classes', 'iconalt', 'searchaudioiconalt'];
const STYLES = ['primary', 'secondary'];
const TITLE_SIZES = ['bigger', 'medium'];
// the site menu shows a level of more pages than this in two columns
const MENU_COLUMNS_FROM = 6;
// px the open site menu keeps clear of the bottom of the window
const MENU_WINDOW_MARGIN = 24;

/**
 * Reads the key-value property rows and the Button List item rows of the block.
 * Falls back to one property per single-cell row, in model order, if rows have no keys.
 * @param {Element} block
 * @returns {{ config: Object<string, Element>, buttonRows: Element[] }}
 */
function readBlock(block) {
  const config = {};
  const buttonRows = [];
  const unkeyed = [];
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const key = cells.length === 2 ? normalize(cells[0].textContent) : '';
    // a Button item: in Universal Editor by its model (also before it has a link), else its link
    if (row.dataset.aueModel === 'conversation-canvas-button') buttonRows.push(row);
    else if (FIELDS.includes(key)) [, config[key]] = cells;
    else if (row.querySelector('a[href]')) buttonRows.push(row);
    else if (cells.length === 1) unkeyed.push(cells[0]);
  });
  if (!Object.keys(config).length) {
    FIELDS.filter((field) => !COLLAPSED.includes(field))
      .forEach((field, i) => { if (unkeyed[i]) config[field] = unkeyed[i]; });
  }
  return { config, buttonRows };
}

/**
 * Returns the image of an image property cell, with the given alt text (or one merged into it).
 * @returns {Element | null}
 */
function imageOf(cell, alt) {
  if (!cell) return null;
  let image = cell.querySelector('picture') || cell.querySelector('img');
  if (!image) {
    const src = cell.querySelector('a')?.href || textOf(cell);
    image = buildImage(src ? { src, alt: '' } : null);
  }
  if (!image) return null;
  const img = image.tagName === 'IMG' ? image : image.querySelector('img');
  if (alt !== undefined && alt !== '') img.alt = alt;
  else if (!img.hasAttribute('alt')) img.alt = '';
  return image;
}

/**
 * Builds a Button List item with the button decorator, from its Button properties:
 * the link (text, title and Type) plus Views and Icon values in the other cells.
 * @param {Element} row
 * @returns {Element | null} the list item
 */
function buildListButton(row) {
  const a = row.querySelector('a[href]');
  if (!a) return null;
  const values = [...row.children].filter((cell) => !cell.contains(a)).map(textOf).filter(Boolean)
    .map((value) => value.toLowerCase());
  const options = readButtonOptions(a);
  const view = values.find((v) => BUTTON_VIEWS.includes(v)) || options.view || 'button';
  const type = values.find((v) => BUTTON_TYPES.includes(v)) || options.type || 'primary';
  const known = [...BUTTON_VIEWS, ...BUTTON_TYPES, ...BUTTON_ALIGNMENTS];
  const icon = values.find((v) => !known.includes(v)) || options.icon;

  const li = document.createElement('li');
  moveInstrumentation(row, li);
  li.append(createButton({
    href: a.href,
    text: a.textContent.trim(),
    title: a.title && a.title !== a.textContent.trim() ? a.title : '',
    view,
    type,
    icon,
  }));
  return li;
}

/**
 * Reads the Menu root path (default: the locale site, e.g. /de-de) and Menu depth properties.
 * @returns {{ root: string, depth: number }}
 */
function menuSettings(config) {
  const root = toSitePath(config.menurootpath?.querySelector('a')?.getAttribute('href')
    || textOf(config.menurootpath)) || getLocale().root;
  const depth = Math.max(1, parseInt(textOf(config.menudepth), 10) || 1);
  return { root, depth };
}

/**
 * Loads the site tree from the query index: pages under the root path, up to the depth.
 * Each node is { path, title, parent, children }; the returned node is the root.
 * @param {string} root Site path of the menu root
 * @param {number} depth Levels below the root
 * @returns {Promise<Object>}
 */
async function loadMenuTree(root, depth) {
  const base = root === '/' ? '' : root.replace(/\/$/, '');
  const tree = {
    path: base || '/', title: '', parent: null, children: [],
  };
  try {
    const data = await getPages();
    const levelOf = (path) => path.slice(base.length).split('/').filter(Boolean).length;
    const nodes = new Map([[tree.path, tree]]);
    data
      .filter(({ path }) => path.startsWith(`${base}/`) && levelOf(path) >= 1 && levelOf(path) <= depth)
      .sort((x, y) => levelOf(x.path) - levelOf(y.path) || x.path.localeCompare(y.path))
      .forEach(({ path, title }) => {
        const parent = nodes.get(path.slice(0, path.lastIndexOf('/')) || '/');
        if (!parent) return;
        const node = {
          path, title: title || path.split('/').pop().replace(/-/g, ' '), parent, children: [],
        };
        parent.children.push(node);
        nodes.set(path, node);
      });
  } catch { /* an empty tree is returned */ }
  return tree;
}

const normalizePath = (path) => path.replace(/\.html$/, '').replace(/\/$/, '') || '/';

function findNode(tree, path) {
  if (tree.path === path) return tree;
  for (let i = 0; i < tree.children.length; i += 1) {
    const found = findNode(tree.children[i], path);
    if (found) return found;
  }
  return null;
}

const isWithin = (node, ancestor) => {
  for (let n = node; n; n = n.parent) if (n === ancestor) return true;
  return false;
};

// a hovered item's panel stays this long once the pointer leaves it (on its way to the panel)
const HOVER_CLOSE_DELAY = 300;

/**
 * Builds the site menu of the Default and Secondary styles (desktop, Figma Full menu 1124:26210 /
 * 1124:26244): a level's pages as a row below the search row, the first level as pills. A page
 * with child pages shows them in a panel above the row (Figma List Container 1124:26250) while
 * the pointer is on it, or with its chevron button (keyboard, touch). A link's text opens its
 * page; in the panel, the arrow of a page with child pages opens its level: the row shows that
 * level's pages, with a menu button back to the first level (a back arrow below the second), and
 * the page's child pages open in the panel.
 * @returns {Promise<Element>} the menu content; its reset() shows the first level again
 */
async function buildMenuList(root, depth) {
  const tree = await loadMenuTree(root, depth);
  const container = document.createElement('div');
  container.className = 'conversation-canvas-nav conversation-canvas-menu-levels';
  container.dataset.view = 'root';
  const list = document.createElement('ul');
  list.className = 'conversation-canvas-nav-list';
  container.append(list);
  if (!tree.children.length) {
    const li = document.createElement('li');
    li.className = 'conversation-canvas-menu-empty';
    li.textContent = t('noPagesFound', 'No pages found');
    list.append(li);
    container.reset = () => {};
    return container;
  }
  const current = findNode(tree, normalizePath(window.location.pathname));
  const panel = document.createElement('div');
  panel.className = 'conversation-canvas-menu-panel';
  panel.id = uniqueId('conversation-canvas-menu-panel');
  panel.hidden = true;

  // the item whose panel is open; pinned: opened by its chevron or an arrow, not by the pointer
  let open = null;
  let pinned = false;
  let closeTimer = 0;
  const closePanel = () => {
    clearTimeout(closeTimer);
    panel.hidden = true;
    panel.replaceChildren();
    open?.classList.remove('conversation-canvas-nav-open');
    open?.querySelector('.conversation-canvas-nav-chevron')?.setAttribute('aria-expanded', 'false');
    open = null;
    pinned = false;
  };

  let render;
  const openPanel = (li, node, pin) => {
    clearTimeout(closeTimer);
    if (open === li) {
      pinned = pinned || pin;
      return;
    }
    closePanel();
    const rows = document.createElement('ul');
    rows.setAttribute('aria-label', node.title);
    rows.append(...node.children.map((child) => {
      const row = document.createElement('li');
      const a = document.createElement('a');
      a.href = child.path;
      a.textContent = child.title;
      if (current === child) a.setAttribute('aria-current', 'page');
      row.append(a);
      if (child.children.length) {
        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'conversation-canvas-menu-next';
        next.setAttribute('aria-label', t('showSubmenu', 'Show {label} menu', { label: child.title }));
        next.addEventListener('click', (e) => {
          // the level replaces this button: a click outside the row would close the menu
          e.stopPropagation();
          render(node, child);
        });
        row.append(next);
      }
      return row;
    }));
    // more than six pages: two columns, filled top to bottom
    if (node.children.length > MENU_COLUMNS_FROM) {
      rows.className = 'conversation-canvas-menu-columns';
      rows.style.setProperty('--conversation-canvas-menu-rows', Math.ceil(node.children.length / 2));
    }
    panel.append(rows);
    panel.hidden = false;
    // in its item, after its chevron: Tab reaches the panel's links next
    li.append(panel);
    li.classList.add('conversation-canvas-nav-open');
    li.querySelector('.conversation-canvas-nav-chevron')?.setAttribute('aria-expanded', 'true');
    open = li;
    pinned = pin;
  };

  const item = (child) => {
    const li = document.createElement('li');
    li.dataset.path = child.path;
    const a = document.createElement('a');
    a.className = 'conversation-canvas-nav-item';
    a.href = child.path;
    a.textContent = child.title;
    if (current && isWithin(current, child)) {
      a.classList.add('conversation-canvas-nav-current');
      a.setAttribute('aria-current', current === child ? 'page' : 'true');
    }
    li.append(a);
    if (!child.children.length) return li;
    li.classList.add('conversation-canvas-nav-group');
    const chevron = document.createElement('button');
    chevron.type = 'button';
    chevron.className = 'conversation-canvas-nav-chevron';
    chevron.setAttribute('aria-label', t('showSubmenu', 'Show {label} menu', { label: child.title }));
    chevron.setAttribute('aria-expanded', 'false');
    chevron.setAttribute('aria-controls', panel.id);
    chevron.addEventListener('click', (e) => {
      e.stopPropagation();
      if (open === li && pinned) closePanel();
      else openPanel(li, child, true);
    });
    li.append(chevron);
    li.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') openPanel(li, child, false);
    });
    li.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse' || open !== li || pinned) return;
      closeTimer = setTimeout(() => {
        if (open === li && !pinned) closePanel();
      }, HOVER_CLOSE_DELAY);
    });
    return li;
  };

  render = (node, child) => {
    closePanel();
    const items = [];
    if (node !== tree) {
      const back = document.createElement('button');
      back.type = 'button';
      back.className = 'conversation-canvas-nav-back';
      // back to the first level (Figma: the menu icon), else up one level (an arrow)
      const toRoot = node.parent === tree;
      back.classList.toggle('conversation-canvas-nav-back-menu', toRoot);
      back.setAttribute('aria-label', toRoot ? t('menu', 'Menu') : t('back', 'Back'));
      back.addEventListener('click', (e) => {
        e.stopPropagation();
        render(node.parent || tree);
        // focus on the item of the level that was open
        list.querySelector(`li[data-path="${node.path}"] > a`)?.focus();
      });
      const li = document.createElement('li');
      li.append(back);
      items.push(li);
    }
    items.push(...node.children.map(item));
    list.replaceChildren(...items);
    container.dataset.view = node === tree ? 'root' : 'level';
    if (!child) return;
    const li = list.querySelector(`li[data-path="${child.path}"]`);
    if (!li) return;
    openPanel(li, child, true);
    li.querySelector('a').focus();
  };

  // Escape closes an open panel first, focus back on its item
  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !open) return;
    e.stopPropagation();
    const opener = open.querySelector('.conversation-canvas-nav-chevron');
    closePanel();
    opener?.focus();
  });
  container.reset = () => render(tree);
  render(tree);
  return container;
}

/** the skeleton of the site menu and the Primary navigation while the query index loads: pills */
function navSkeleton() {
  const pills = skeletonElement('skeleton-row');
  for (let i = 0; i < 4; i += 1) pills.append(bone('pill'));
  return pills;
}

/**
 * Builds the menu toggle button (round, with the menu icon).
 */
function buildMenuToggle(controls, label = t('menu', 'Menu')) {
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'conversation-canvas-menu-toggle';
  toggle.setAttribute('aria-label', label);
  toggle.setAttribute('aria-controls', controls);
  return toggle;
}

/**
 * Builds the search form: input with watermark, audio (speech input) and submit buttons.
 * Submitting dispatches a conversation-canvas:search event with the query.
 * @returns {HTMLFormElement}
 */
function buildSearchForm(config, id, block) {
  const form = document.createElement('form');
  form.className = 'conversation-canvas-search-form';
  // a search landmark, named by its placeholder when there are several on the page
  form.setAttribute('role', 'search');
  const placeholder = textOf(config.searchplaceholder) || t('searchPlaceholder', 'Ask us a question');
  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'q';
  input.id = `${id}-q`;
  input.placeholder = placeholder;
  input.autocomplete = 'off';
  const label = hideVisually(document.createElement('label'));
  label.htmlFor = input.id;
  label.textContent = placeholder;

  // audio (speech input), only where the browser supports it
  const audio = document.createElement('button');
  audio.type = 'button';
  audio.className = 'conversation-canvas-audio';
  // the icon's alt text names the button (collapsed into the image; a separate row is read too)
  const audioAlt = textOf(config.searchaudioiconalt)
    || config.searchaudioicon?.querySelector('img')?.getAttribute('alt')?.trim();
  audio.setAttribute('aria-label', audioAlt || t('searchByVoice', 'Search by voice'));
  const audioImage = imageOf(config.searchaudioicon, '');
  // the button has the name, so the icon is decorative
  const audioImg = audioImage?.tagName === 'IMG' ? audioImage : audioImage?.querySelector('img');
  audioImg?.setAttribute('alt', '');
  if (audioImage) audio.append(audioImage);
  else audio.classList.add('conversation-canvas-audio-default');
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Recognition) {
    let recognition = null;
    audio.setAttribute('aria-pressed', 'false');
    const stopListening = () => {
      recognition = null;
      audio.setAttribute('aria-pressed', 'false');
    };
    audio.addEventListener('click', () => {
      if (recognition) {
        recognition.stop();
        return;
      }
      recognition = new Recognition();
      recognition.lang = document.documentElement.lang || 'en';
      recognition.addEventListener('result', (e) => {
        input.value = e.results[0][0].transcript;
        input.focus();
      });
      recognition.addEventListener('end', stopListening);
      recognition.addEventListener('error', stopListening);
      try {
        recognition.start();
        audio.setAttribute('aria-pressed', 'true');
      } catch {
        stopListening();
      }
    });
  } else {
    audio.hidden = true;
  }

  // submit: an icon button from the button decorator (icon button types)
  const submitLabel = textOf(config.searchbuttonlabel) || t('submit', 'Submit');
  const submit = createIconButton({
    label: submitLabel,
    icon: 'arrow-right',
    type: textOf(config.searchbuttonstyle).toLowerCase() || 'primary',
    buttonType: 'submit',
  });

  // a polite status when the search can't run (no integration, no Search page)
  const status = document.createElement('p');
  status.className = 'conversation-canvas-search-status visually-hidden';
  status.setAttribute('role', 'status');
  const searchPage = linkOf(config.searchpage)?.getAttribute('href') || textOf(config.searchpage);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const query = input.value.trim();
    if (!query) return;
    // hand the query to whichever search experience is wired up on the page: an integration
    // that handles it calls preventDefault(); else the Search page opens with the query
    const handled = !block.dispatchEvent(new CustomEvent('conversation-canvas:search', {
      bubbles: true, cancelable: true, detail: { query },
    }));
    if (handled) return;
    if (searchPage) {
      const url = new URL(searchPage, window.location.href);
      url.searchParams.set('q', query);
      window.location.assign(url.href);
      return;
    }
    status.textContent = t('searchUnavailable', 'Search isn’t available yet.');
  });

  form.append(label, input, audio, submit, status);
  return form;
}

/**
 * Builds the search row of the Default and Secondary styles: menu button with a popover menu
 * of the site tree, and the search form.
 */
function buildSearch(config, id, block) {
  const row = document.createElement('div');
  row.className = 'conversation-canvas-search';

  const menuToggle = buildMenuToggle(`${id}-menu`);
  menuToggle.setAttribute('aria-expanded', 'false');
  const menu = document.createElement('nav');
  menu.className = 'conversation-canvas-menu';
  menu.id = `${id}-menu`;
  menu.setAttribute('aria-label', t('menu', 'Menu'));
  menu.hidden = true;
  const { root, depth } = menuSettings(config);
  let menuLoaded = false;

  // the menu's row is below the search row: the search row moves up while the menu is open, so
  // the menu stays in the window (e.g. the header Canvas or a floating row at its bottom); placed
  // when it opens and on resize. Scrolling closes it (it doesn't follow a moving row: no flicker)
  let placeFrame = 0;
  // the row floated (or was in place) when the menu opened: it closes when that changes, so it
  // never hangs on a row that has landed elsewhere (canvas-controller.js)
  let floatedAtOpen = false;
  let closeMenu;
  const placeMenu = () => {
    placeFrame = 0;
    if (!menu.hidden && row.classList.contains('conversation-canvas-floating') !== floatedAtOpen) {
      closeMenu();
      return;
    }
    const lift = parseFloat(row.style.getPropertyValue('--conversation-canvas-menu-lift')) || 0;
    const rect = menu.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    const room = window.innerHeight - MENU_WINDOW_MARGIN;
    // 0 while it isn't shown (closed, or below desktop, where the menu button is hidden)
    const next = !menu.hidden && rect.height
      ? Math.max(0, Math.round(rect.bottom + lift - room)) : 0;
    if (next !== lift) row.style.setProperty('--conversation-canvas-menu-lift', `${next}px`);
    // the grey fade behind the menu covers the window: from the row's place in it (once lifted)
    row.style.setProperty('--conversation-canvas-menu-x', `${-Math.round(rowRect.left)}px`);
    row.style.setProperty('--conversation-canvas-menu-y', `${-Math.round(rowRect.top - (next - lift))}px`);
  };
  const schedulePlace = () => {
    if (!placeFrame) placeFrame = requestAnimationFrame(placeMenu);
  };
  const onScroll = () => {
    if (!menu.hidden) closeMenu();
  };
  closeMenu = () => {
    menu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', schedulePlace);
    ['lift', 'x', 'y'].forEach((v) => row.style.removeProperty(`--conversation-canvas-menu-${v}`));
  };
  menuToggle.addEventListener('click', async () => {
    if (!menu.hidden) {
      closeMenu();
      return;
    }
    menu.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    floatedAtOpen = row.classList.contains('conversation-canvas-floating');
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedulePlace);
    schedulePlace();
    if (!menuLoaded) {
      menuLoaded = true;
      const list = buildMenuList(root, depth);
      skeletonWhile(menu, list, navSkeleton);
      menu.append(await list);
      schedulePlace();
    } else {
      // it opens at its first level
      menu.querySelector('.conversation-canvas-menu-levels')?.reset();
    }
  });
  row.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !row.contains(e.target)) closeMenu();
  });
  row.addEventListener('focusout', (e) => {
    if (!menu.hidden && e.relatedTarget && !row.contains(e.relatedTarget)) closeMenu();
  });

  row.append(menuToggle, menu, buildSearchForm(config, id, block));
  return row;
}

/*
 * Primary (sticky) dock: the whole canvas floats at the bottom of the viewport, except while
 * another canvas's search row is docked in place, until the footer canvas (canvas-journey.js).
 * It holds the search row and, on desktop, the site navigation:
 * - home (the menu root): pills for the top-level sections
 * - a page with sub-pages: pills for its sub-pages; pills with their own sub-pages open a
 *   panel listing them, shown in place of the search row
 * - a page without sub-pages: suggestion pills (dynamic, or the page's Tags), or its
 *   parent's sub-pages when there are no suggestions
 * The menu button next to the search toggles the full menu (top-level sections); the back
 * button in the navigation goes up one level.
 */
const docks = new WeakMap();
const PANEL_COLUMNS_FROM = 6; // panel items from which the panel uses two columns

/**
 * Builds the primary dock and returns it; its navigation renders once the site tree loads.
 */
function buildDock(config, id, block) {
  const dock = document.createElement('div');
  dock.className = 'conversation-canvas-dock';

  // panel for a pill's sub-pages, shown in place of the search row
  const panel = document.createElement('div');
  panel.className = 'conversation-canvas-nav-panel';
  panel.id = `${id}-panel`;
  panel.hidden = true;

  // search row: full menu toggle and search form
  const row = document.createElement('div');
  row.className = 'conversation-canvas-search';
  const menuToggle = buildMenuToggle(`${id}-nav`);
  const form = buildSearchForm(config, id, block);
  row.append(menuToggle, form);

  const nav = document.createElement('nav');
  nav.className = 'conversation-canvas-nav';
  nav.id = `${id}-nav`;
  nav.setAttribute('aria-label', t('siteNavigation', 'Site'));

  // the panel after its toggles (the nav), so Tab reaches it once open; CSS shows it above them
  dock.append(row, nav, panel);

  const state = {
    tree: null, current: null, view: null, suggestions: [], collapsed: false,
  };
  const textOfNode = (node) => node.title.replace(/\s*\|.*$/, '');

  const closePanel = () => {
    panel.hidden = true;
    panel.replaceChildren();
    dock.classList.remove('conversation-canvas-panel-open');
    nav.querySelectorAll('[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  };

  const openPanel = (button, node) => {
    closePanel();
    const list = document.createElement('ul');
    list.className = 'conversation-canvas-nav-panel-list';
    const wide = node.children.length >= PANEL_COLUMNS_FROM;
    // balanced columns: the first column ends at item ceil(n / 2)
    const columnEnd = wide ? Math.ceil(node.children.length / 2) - 1 : -1;
    node.children.forEach((child, i) => {
      const li = document.createElement('li');
      li.className = 'conversation-canvas-nav-panel-item';
      if (i === columnEnd) li.classList.add('conversation-canvas-nav-panel-column-end');
      const a = document.createElement('a');
      a.href = child.path;
      a.className = 'conversation-canvas-nav-panel-link';
      a.textContent = textOfNode(child);
      if (state.current === child) a.setAttribute('aria-current', 'page');
      li.append(a);
      list.append(li);
    });
    panel.classList.toggle('conversation-canvas-nav-panel-wide', wide);
    panel.setAttribute('aria-label', textOfNode(node));
    panel.append(list);
    panel.hidden = false;
    dock.classList.add('conversation-canvas-panel-open');
    button.setAttribute('aria-expanded', 'true');
  };

  const defaultView = () => {
    const { tree, current } = state;
    if (!current || current === tree) return { type: 'root' };
    if (current.children.length) return { type: 'section', node: current };
    if (state.suggestions.length) return { type: 'suggestions' };
    return current.parent === tree ? { type: 'root' } : { type: 'section', node: current.parent };
  };

  const parentView = (view) => {
    const { tree, current } = state;
    if (view.type === 'suggestions') {
      return current.parent === tree ? { type: 'root' } : { type: 'section', node: current.parent };
    }
    if (view.type === 'section' && view.node.parent && view.node.parent !== tree) {
      return { type: 'section', node: view.node.parent };
    }
    return { type: 'root' };
  };

  const pill = (tag, text) => {
    const el = document.createElement(tag);
    el.className = 'conversation-canvas-nav-item';
    el.textContent = text;
    if (tag === 'button') el.type = 'button';
    return el;
  };

  // eslint-disable-next-line no-use-before-define
  const setView = (view) => { state.view = view; render(); };

  function render() {
    closePanel();
    const { tree, view } = state;
    const items = [];
    if (view.type !== 'root') {
      const back = document.createElement('button');
      back.type = 'button';
      back.className = 'conversation-canvas-nav-back';
      // back to the full menu (Figma: the menu icon), else up one level (an arrow)
      const toRoot = parentView(view).type === 'root';
      back.classList.toggle('conversation-canvas-nav-back-menu', toRoot);
      back.setAttribute('aria-label', toRoot ? t('menu', 'Menu') : t('back', 'Back'));
      back.addEventListener('click', () => setView(parentView(view)));
      items.push(back);
    }
    if (view.type === 'suggestions') {
      state.suggestions.forEach((text) => {
        const item = pill('button', text);
        item.classList.add('conversation-canvas-nav-suggestion');
        item.addEventListener('click', () => {
          form.elements.q.value = text.replace(/^["“]|["”]$/g, '');
          form.requestSubmit();
        });
        items.push(item);
      });
    } else {
      const node = view.type === 'root' ? tree : view.node;
      node.children.forEach((child) => {
        let item;
        if (child.children.length && view.type === 'section') {
          item = pill('button', textOfNode(child));
          item.classList.add('conversation-canvas-nav-toggle');
          item.setAttribute('aria-expanded', 'false');
          item.setAttribute('aria-controls', panel.id);
          item.addEventListener('click', () => {
            if (item.getAttribute('aria-expanded') === 'true') closePanel();
            else openPanel(item, child);
          });
        } else {
          item = pill('a', textOfNode(child));
          item.href = child.path;
        }
        if (state.current && isWithin(state.current, child)) {
          item.classList.add('conversation-canvas-nav-current');
          item.setAttribute('aria-current', state.current === child ? 'page' : 'true');
        }
        items.push(item);
      });
    }
    const list = document.createElement('ul');
    list.className = 'conversation-canvas-nav-list';
    list.append(...items.map((item) => {
      const li = document.createElement('li');
      li.append(item);
      return li;
    }));
    nav.replaceChildren(list);
    // the first level shows pills, the levels below text items (Figma Full menu)
    nav.dataset.view = view.type;
    nav.hidden = state.collapsed || !items.length;
    if (defaultView().type === 'root') {
      menuToggle.removeAttribute('aria-pressed');
      menuToggle.setAttribute('aria-expanded', String(!state.collapsed));
    } else {
      menuToggle.removeAttribute('aria-expanded');
      menuToggle.setAttribute('aria-pressed', String(view.type === 'root'));
    }
  }

  // menu button: full menu on / off (on home, where the full menu is the default: show / hide)
  menuToggle.addEventListener('click', () => {
    if (!state.tree) return;
    if (defaultView().type === 'root') {
      state.collapsed = !state.collapsed;
      render();
    } else {
      setView(state.view.type === 'root' ? defaultView() : { type: 'root' });
    }
  });

  dock.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || panel.hidden) return;
    const opener = nav.querySelector('[aria-expanded="true"]');
    closePanel();
    opener?.focus();
  });
  document.addEventListener('click', (e) => {
    if (!panel.hidden && !dock.contains(e.target)) closePanel();
  });

  const { root, depth } = menuSettings(config);
  // suggestions: the page's tags (Tags metadata), labelled from the taxonomy
  const tagLabels = resolveTags(getPageTags()).then((tags) => tags.map((tag) => tag.label));
  const loaded = Promise.all([loadMenuTree(root, depth), tagLabels]).then(([tree, labels]) => {
    if (!state.suggestions.length) state.suggestions = labels;
    state.tree = tree;
    state.current = findNode(tree, normalizePath(window.location.pathname));
    setView(defaultView());
  });
  // pills while the site tree loads; a failure leaves the navigation empty, as before
  skeletonWhile(nav, loaded, navSkeleton);
  // eslint-disable-next-line no-console
  loaded.catch((e) => console.error('conversation canvas navigation', e));

  docks.set(block, {
    setSuggestions(suggestions) {
      state.suggestions = suggestions;
      if (state.tree) setView(defaultView());
    },
  });
  return dock;
}

/**
 * Sets the suggestion pills of a primary (sticky) canvas, shown on pages without sub-pages,
 * e.g. AI prompts from a personalisation service. Clicking one searches for it.
 * @param {Element} block The conversation canvas block
 * @param {string[]} suggestions
 */
export function setConversationCanvasSuggestions(block, suggestions = []) {
  docks.get(block)?.setSuggestions(suggestions);
}

/**
 * Renders filter tags into the conversation canvas filter list (Secondary style). The tags are
 * dynamic, so the list is empty until a script supplies them, e.g. from a personalisation service.
 * @param {Element} block The conversation canvas block
 * @param {Array<{ label: string, href?: string, active?: boolean }>} tags
 */
export function setConversationCanvasFilters(block, tags = []) {
  const list = block.querySelector('.conversation-canvas-filters');
  if (!list) return;
  list.hidden = !tags.length;
  list.replaceChildren(...tags.map(({ label, href, active }) => {
    const li = document.createElement('li');
    const tag = document.createElement(href ? 'a' : 'button');
    tag.className = `tag tag-filter${active ? ' active' : ''}`;
    tag.textContent = label;
    if (href) {
      tag.href = href;
      if (active) tag.setAttribute('aria-current', 'true');
    } else {
      tag.type = 'button';
      tag.setAttribute('aria-pressed', String(!!active));
    }
    tag.dataset.cmpInteraction = 'filter';
    tag.dataset.cmpValue = label;
    li.append(tag);
    return li;
  }));
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  t = await getPlaceholders();
  const id = uniqueId('conversation-canvas');
  const { config, buttonRows } = readBlock(block);

  // style options
  const style = normalize(textOf(config.classes));
  if (STYLES.includes(style)) block.classList.add(style);
  const primary = block.classList.contains('primary');
  block.classList.add(`conversation-canvas-bg-${toClassName(textOf(config.bgstyle)) || 'default'}`);
  const titleSize = normalize(textOf(config.titlesize));
  if (TITLE_SIZES.includes(titleSize)) block.classList.add(`conversation-canvas-title-${titleSize}`);
  // Floating journey: Floats and docks, or Stays in place (nofloat): a stop of the journey whose
  // own row doesn't float, so the floating row lands on it instead of floating over it. Decorative
  // (no longer offered) stays in place the same way. Canvases not shown aren't stops
  // (canvas-controller.js)
  const floats = !block.classList.contains('nofloat') && !block.classList.contains('decorative');

  // primary (sticky): only the floating dock (search row and site navigation)
  if (primary) {
    const dock = buildDock(config, id, block);
    block.replaceChildren(dock);
    registerCanvas({
      block, row: dock, slot: null, primary, floats: true,
    });
    return;
  }

  const content = document.createElement('div');
  content.className = 'conversation-canvas-content';

  // background image
  const background = imageOf(config.backgroundimage, '');
  if (background) {
    const bg = document.createElement('div');
    bg.className = 'conversation-canvas-background';
    bg.append(background);
    block.classList.add('conversation-canvas-has-background');
    block.append(bg);
  }

  // icon, eyebrow, title, text
  const intro = document.createElement('div');
  intro.className = 'conversation-canvas-intro';
  const icon = imageOf(config.icon, textOf(config.iconalt));
  if (icon) {
    const iconWrap = document.createElement('div');
    iconWrap.className = 'conversation-canvas-icon';
    iconWrap.append(icon);
    intro.append(iconWrap);
  }
  if (textOf(config.eyebrow)) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'conversation-canvas-eyebrow';
    eyebrow.textContent = textOf(config.eyebrow);
    intro.append(eyebrow);
  }
  if (textOf(config.title)) {
    const title = document.createElement('h2');
    title.className = 'conversation-canvas-title';
    title.textContent = textOf(config.title);
    intro.append(title);
  }
  if (config.text && textOf(config.text)) {
    const text = document.createElement('div');
    text.className = 'conversation-canvas-text';
    text.append(...config.text.childNodes);
    intro.append(text);
  }
  if (intro.children.length) content.append(intro);

  // search row, in place; floats once scrolled past (canvas-controller.js, canvas-journey.js)
  const slot = document.createElement('div');
  slot.className = 'conversation-canvas-search-slot';
  const row = buildSearch(config, id, block);
  slot.append(row);
  content.append(slot);

  // filter tags (secondary): markup only, filled by setConversationCanvasFilters()
  if (block.classList.contains('secondary')) {
    const filters = document.createElement('ul');
    filters.className = 'conversation-canvas-filters';
    filters.setAttribute('aria-label', t('suggestions', 'Suggestions'));
    // no empty list for screen readers: shown once setConversationCanvasFilters() adds tags
    filters.hidden = true;
    content.append(filters);
  }

  // button list; in Universal Editor a Button without a link yet is a placeholder to select
  const built = buttonRows.map((buttonRow) => [buttonRow, buildListButton(buttonRow)]);
  const buttons = built.map(([, li]) => li).filter(Boolean);
  const pending = built.filter(([, li]) => !li).map(([buttonRow]) => buttonRow);
  if (pending.length) buttons.push(...buildEditorItems(pending, await editorItemHint(pending), 'li'));
  if (buttons.length) {
    const list = document.createElement('ul');
    list.className = 'conversation-canvas-buttons';
    list.append(...buttons);
    content.append(list);
  }

  block.replaceChildren(...block.querySelectorAll(':scope > .conversation-canvas-background'), content);
  registerCanvas({
    block, row, slot, primary, floats,
  });
}
