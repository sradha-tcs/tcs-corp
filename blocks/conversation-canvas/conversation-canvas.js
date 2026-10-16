import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { buildImage } from '../../decorators/responsive-image-decorator.js';
import { getPageTags } from '../../utils/metadata.js';
import { getLocale } from '../../utils/site.js';
import { resolveTags } from '../../utils/taxonomy.js';
import { hideVisually } from '../../decorators/a11y-decorator.js';
import { createButton } from '../../decorators/button-decorator.js';
import { createIconButton } from '../../decorators/icon-button-decorator.js';
import {
  BUTTON_ALIGNMENTS, BUTTON_TYPES, BUTTON_VIEWS, readButtonOptions,
} from '../../utils/buttons.js';
import { normalizeKey as normalize, textOf } from '../../utils/properties.js';
import { toSitePath } from '../../utils/urls.js';
import { uniqueId } from '../../utils/ids.js';
import {
  findNode, isWithin, loadNavigationTree, MAX_DEPTH, normalizePath,
} from '../../utils/navigation.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';
import registerCanvas from './canvas-controller.js';

// UI text from the placeholders sheet; English fallbacks until it's loaded in decorate()
let t = (key, fallback, values) => fillPlaceholder(fallback, values);

// conversation canvas properties (_conversation-canvas.json), keyed by their normalized row name;
// the alt texts collapse into their images (field collapse), so rows without keys have none
const FIELDS = [
  'classes', 'bgstyle', 'backgroundimage', 'icon', 'iconalt', 'eyebrow', 'title', 'titlesize',
  'text', 'menurootpath', 'menudepth', 'searchplaceholder', 'searchaudioicon',
  'searchaudioiconalt', 'searchbuttonstyle', 'searchbuttonlabel',
];
const COLLAPSED = ['classes', 'iconalt', 'searchaudioiconalt'];
const STYLES = ['primary', 'secondary'];
const TITLE_SIZES = ['bigger', 'medium'];

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
    if (FIELDS.includes(key)) [, config[key]] = cells;
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
  const depth = Math.min(MAX_DEPTH, Math.max(1, parseInt(textOf(config.menudepth), 10) || 1));
  return { root, depth };
}

/*
 * Site navigation (Figma Full menu 1124:26209), shared by the Primary dock and the menu of the
 * Default and Secondary styles; one level at a time, from the navigation tree
 * (utils/navigation.js):
 * - first level (root view): pills for the top-level pages
 * - a section (a page with sub-pages): its row starts with the menu button (back to the first
 *   level) or a back arrow (deeper levels); sub-pages with their own sub-pages are toggles that
 *   open a panel listing them
 * - suggestions (Primary dock, a page without sub-pages): pills that search for their text
 * In the menu a first-level page with sub-pages opens its level, and every level and panel starts
 * with a link to its own page, so each page stays reachable without hover.
 */
const PANEL_COLUMNS_FROM = 6; // panel items from which the panel uses two columns

function createNavigator(id, {
  form = null, menu = false, onPanel = () => {}, onRender = () => {},
} = {}) {
  // panel for a pill's sub-pages, shown in place of the search row (above the level in the menu)
  const panel = document.createElement('div');
  panel.className = 'conversation-canvas-nav-panel';
  panel.id = `${id}-panel`;
  panel.hidden = true;

  const nav = document.createElement('nav');
  nav.className = 'conversation-canvas-nav';
  nav.id = `${id}-nav`;
  nav.setAttribute('aria-label', t('siteNavigation', 'Site'));

  const state = {
    tree: null, current: null, view: null, suggestions: [], collapsed: false,
  };
  const textOfNode = (node) => node.title.replace(/\s*\|.*$/, '');

  const closePanel = () => {
    panel.hidden = true;
    panel.replaceChildren();
    onPanel(false);
    nav.querySelectorAll('[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  };

  const panelLink = (node, overview = false) => {
    const li = document.createElement('li');
    li.className = 'conversation-canvas-nav-panel-item';
    const a = document.createElement('a');
    a.href = node.path;
    a.className = 'conversation-canvas-nav-panel-link';
    if (overview) a.classList.add('conversation-canvas-nav-panel-overview');
    a.textContent = textOfNode(node);
    if (state.current === node) a.setAttribute('aria-current', 'page');
    li.append(a);
    return li;
  };

  const openPanel = (button, node) => {
    closePanel();
    const list = document.createElement('ul');
    list.className = 'conversation-canvas-nav-panel-list';
    const items = node.children.map((child) => panelLink(child));
    if (menu) items.unshift(panelLink(node, true));
    const wide = items.length >= PANEL_COLUMNS_FROM;
    // balanced columns: the first column ends at item ceil(n / 2)
    if (wide) items[Math.ceil(items.length / 2) - 1].classList.add('conversation-canvas-nav-panel-column-end');
    list.append(...items);
    panel.classList.toggle('conversation-canvas-nav-panel-wide', wide);
    panel.setAttribute('aria-label', textOfNode(node));
    panel.append(list);
    panel.hidden = false;
    onPanel(true);
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
  const setView = (view, focus = null) => {
    state.view = view;
    // eslint-disable-next-line no-use-before-define
    render();
    // the focused control was replaced: focus the new level (its first control) or the item of
    // the level it came from
    if (focus === 'first') nav.querySelector('a, button')?.focus();
    else if (focus) [...nav.querySelectorAll('[data-path]')].find((el) => el.dataset.path === focus)?.focus();
  };

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
      back.addEventListener('click', () => setView(parentView(view), view.node?.path || 'first'));
      items.push(back);
    }
    if (menu && view.type === 'section') {
      // the level's own page (its title, as in the Figma mobile menu)
      const heading = pill('a', textOfNode(view.node));
      heading.href = view.node.path;
      heading.classList.add('conversation-canvas-nav-heading');
      if (state.current === view.node) heading.setAttribute('aria-current', 'page');
      items.push(heading);
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
        } else if (child.children.length && menu) {
          // menu: a first-level page with sub-pages opens its level
          item = pill('button', textOfNode(child));
          item.classList.add('conversation-canvas-nav-drill');
          item.setAttribute('aria-label', t('showSubmenu', 'Show {label} menu', { label: textOfNode(child) }));
          item.addEventListener('click', () => setView({ type: 'section', node: child }, 'first'));
        } else {
          item = pill('a', textOfNode(child));
          item.href = child.path;
        }
        item.dataset.path = child.path;
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
    onRender();
  }

  return {
    nav,
    panel,
    state,
    render,
    setView,
    defaultView,
    closePanel,
    setTree(tree) {
      state.tree = tree;
      state.current = findNode(tree, normalizePath(window.location.pathname));
      setView(defaultView());
    },
    /** back to the level of the current page */
    reset() {
      if (state.tree) setView(defaultView());
    },
    /** Escape: closes an open panel and focuses its toggle; false when no panel was open */
    escape() {
      if (panel.hidden) return false;
      const opener = nav.querySelector('[aria-expanded="true"]');
      closePanel();
      opener?.focus();
      return true;
    },
  };
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    // hand the query to whichever search experience is wired up on the page
    block.dispatchEvent(new CustomEvent('conversation-canvas:search', { bubbles: true, detail: { query } }));
  });

  form.append(label, input, audio, submit);
  return form;
}

/**
 * Builds the search row of the Default and Secondary styles: menu button with a popover menu
 * of the site tree, and the search form.
 */
function buildSearch(config, id, block) {
  const row = document.createElement('div');
  row.className = 'conversation-canvas-search';

  // the menu: the site navigation (createNavigator), opening above the row
  const menuToggle = buildMenuToggle(`${id}-menu`);
  menuToggle.setAttribute('aria-expanded', 'false');
  const menu = document.createElement('div');
  menu.className = 'conversation-canvas-menu';
  menu.id = `${id}-menu`;
  menu.hidden = true;
  // above the row (Figma), else below it when there's more room there (e.g. a row just below the
  // header bar); the CSS fits its height to the room
  const place = () => {
    if (menu.hidden) return;
    const rect = row.getBoundingClientRect();
    const below = window.innerHeight - rect.bottom > rect.top;
    menu.classList.toggle('conversation-canvas-menu-below', below);
    menu.style.setProperty('--conversation-canvas-menu-room', `${Math.round(below ? window.innerHeight - rect.bottom : rect.top)}px`);
  };
  const navigator = createNavigator(`${id}-menu`, { menu: true, onRender: place });
  const empty = document.createElement('p');
  empty.className = 'conversation-canvas-menu-empty';
  empty.textContent = t('noPagesFound', 'No pages found');
  empty.hidden = true;
  menu.append(navigator.panel, navigator.nav, empty);
  const { root, depth } = menuSettings(config);
  let loaded = null;
  const setOpen = (open) => {
    menu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? t('closeMenu', 'Close menu') : t('menu', 'Menu'));
    if (open) place();
    else navigator.closePanel();
  };
  window.addEventListener('resize', place);
  menuToggle.addEventListener('click', () => {
    const open = menu.hidden;
    setOpen(open);
    if (!open) return;
    // the tree loads once; every opening starts at the level of the current page
    loaded = loaded || loadNavigationTree(root, depth).then((tree) => {
      navigator.setTree(tree);
      empty.hidden = tree.children.length > 0;
    });
    loaded.then(() => navigator.reset());
  });
  row.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || menu.hidden) return;
    if (navigator.escape()) return;
    setOpen(false);
    menuToggle.focus();
  });
  // a click outside the row closes the menu (composedPath: a level re-render detaches the target)
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !e.composedPath().includes(row)) setOpen(false);
  });
  row.addEventListener('focusout', (e) => {
    if (!menu.hidden && e.relatedTarget && !row.contains(e.relatedTarget)) setOpen(false);
  });

  row.append(menuToggle, menu, buildSearchForm(config, id, block));
  return row;
}

/*
 * Primary (sticky) dock: the whole canvas floats at the bottom of the viewport, except while
 * another canvas's search row is docked in place, until the footer canvas (canvas-journey.js).
 * It holds the search row and, on desktop, the site navigation (createNavigator):
 * - home (the menu root): pills for the top-level sections
 * - a page with sub-pages: pills for its sub-pages; pills with their own sub-pages open a
 *   panel listing them, shown in place of the search row
 * - a page without sub-pages: suggestion pills (dynamic, or the page's Tags), or its
 *   parent's sub-pages when there are no suggestions
 * The menu button next to the search toggles the full menu (top-level sections); the back
 * button in the navigation goes up one level.
 */
const docks = new WeakMap();

/**
 * Builds the primary dock and returns it; its navigation renders once the site tree loads.
 */
function buildDock(config, id, block) {
  const dock = document.createElement('div');
  dock.className = 'conversation-canvas-dock';

  // search row: full menu toggle and search form
  const row = document.createElement('div');
  row.className = 'conversation-canvas-search';
  const menuToggle = buildMenuToggle(`${id}-nav`);
  const form = buildSearchForm(config, id, block);
  row.append(menuToggle, form);

  const navigator = createNavigator(id, {
    form,
    onPanel: (open) => dock.classList.toggle('conversation-canvas-panel-open', open),
    onRender: () => {
      // eslint-disable-next-line no-use-before-define
      const { state } = navigator;
      if (navigator.defaultView().type === 'root') {
        menuToggle.removeAttribute('aria-pressed');
        menuToggle.setAttribute('aria-expanded', String(!state.collapsed));
      } else {
        menuToggle.removeAttribute('aria-expanded');
        menuToggle.setAttribute('aria-pressed', String(state.view.type === 'root'));
      }
    },
  });
  const { state } = navigator;
  dock.append(navigator.panel, row, navigator.nav);

  // menu button: full menu on / off (on home, where the full menu is the default: show / hide)
  menuToggle.addEventListener('click', () => {
    if (!state.tree) return;
    if (navigator.defaultView().type === 'root') {
      state.collapsed = !state.collapsed;
      navigator.render();
    } else {
      navigator.setView(state.view.type === 'root' ? navigator.defaultView() : { type: 'root' });
    }
  });

  dock.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') navigator.escape();
  });
  document.addEventListener('click', (e) => {
    if (!navigator.panel.hidden && !dock.contains(e.target)) navigator.closePanel();
  });

  const { root, depth } = menuSettings(config);
  // suggestions: the page's tags (Tags metadata), labelled from the taxonomy
  const tagLabels = resolveTags(getPageTags()).then((tags) => tags.map((tag) => tag.label));
  Promise.all([loadNavigationTree(root, depth), tagLabels]).then(([tree, labels]) => {
    if (!state.suggestions.length) state.suggestions = labels;
    navigator.setTree(tree);
  });

  docks.set(block, {
    setSuggestions(suggestions) {
      state.suggestions = suggestions;
      navigator.reset();
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
  // Floating journey: Docks only (nofloat): a stop of the journey whose own row doesn't float;
  // Decorative: a Canvas in place that isn't part of the journey (the Primary dock always is)
  const floats = !block.classList.contains('nofloat');
  const inJourney = primary || !block.classList.contains('decorative');

  // primary (sticky): only the floating dock (search row and site navigation)
  if (primary) {
    const dock = buildDock(config, id, block);
    block.replaceChildren(dock);
    if (inJourney) {
      registerCanvas({
        block, row: dock, slot: null, primary, floats,
      });
    }
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
    content.append(filters);
  }

  // button list
  const buttons = buttonRows.map(buildListButton).filter(Boolean);
  if (buttons.length) {
    const list = document.createElement('ul');
    list.className = 'conversation-canvas-buttons';
    list.append(...buttons);
    content.append(list);
  }

  block.replaceChildren(...block.querySelectorAll(':scope > .conversation-canvas-background'), content);
  if (inJourney) {
    registerCanvas({
      block, row, slot, primary, floats,
    });
  }
}
