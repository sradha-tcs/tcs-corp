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
  const depth = Math.max(1, Math.min(3, parseInt(textOf(config.menudepth), 10) || 3));
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

/** the skeleton of the Primary navigation while the query index loads: pills */
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

  const audio = document.createElement('button');
  audio.type = 'button';
  audio.className = 'conversation-canvas-audio';
  const audioAlt = textOf(config.searchaudioiconalt)
    || config.searchaudioicon?.querySelector('img')?.getAttribute('alt')?.trim();
  audio.setAttribute('aria-label', audioAlt || t('searchByVoice', 'Search by voice'));
  const audioImage = imageOf(config.searchaudioicon, '');
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

  const submitLabel = textOf(config.searchbuttonlabel) || t('submit', 'Submit');
  const submit = createIconButton({
    label: submitLabel,
    icon: 'arrow-right',
    type: textOf(config.searchbuttonstyle).toLowerCase() || 'primary',
    buttonType: 'submit',
  });

  const status = document.createElement('p');
  status.className = 'conversation-canvas-search-status visually-hidden';
  status.setAttribute('role', 'status');
  const searchPage = linkOf(config.searchpage)?.getAttribute('href') || textOf(config.searchpage);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const query = input.value.trim();
    if (!query) return;
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

const docks = new WeakMap();
const PANEL_COLUMNS_FROM = 6;

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

/**
 * Builds the shared Canvas navigation; its pills render once the site tree loads.
 */
function buildDock(config, id, block, primary = true) {
  const dock = document.createElement('div');
  dock.className = primary ? 'conversation-canvas-dock'
    : 'conversation-canvas-search conversation-canvas-menu-dock';

  const panel = document.createElement('div');
  panel.className = 'conversation-canvas-nav-panel';
  panel.id = `${id}-panel`;
  panel.hidden = true;

  const row = document.createElement('div');
  row.className = 'conversation-canvas-search';
  const menuToggle = buildMenuToggle(`${id}-nav`);
  const form = buildSearchForm(config, id, block);
  row.append(menuToggle, form);

  const nav = document.createElement('nav');
  nav.className = 'conversation-canvas-nav';
  nav.id = `${id}-nav`;
  nav.setAttribute('aria-label', t('siteNavigation', 'Site'));

  const navObserver = new ResizeObserver(([entry]) => {
    const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
    const value = `${Math.ceil(height) / 16}rem`;
    if (dock.style.getPropertyValue('--conversation-canvas-nav-height') !== value) {
      dock.style.setProperty('--conversation-canvas-nav-height', value);
      dock.style.setProperty('--conversation-canvas-obscured', `calc(${value} + 8rem)`);
    }
  });
  navObserver.observe(nav);

  const surface = document.createElement('div');
  surface.className = 'conversation-canvas-menu-surface';
  if (primary) dock.append(panel, row, nav);
  else {
    surface.append(nav);
    surface.hidden = true;
    dock.append(panel, row, surface);
  }

  const state = {
    tree: null, current: null, view: null, suggestions: [], collapsed: !primary, expanded: false,
  };
  const textOfNode = (node) => node.title.replace(/\s*\|.*$/, '');

  const pill = (tag, text) => {
    const el = document.createElement(tag);
    el.className = 'conversation-canvas-nav-item';
    el.textContent = text;
    if (tag === 'button') el.type = 'button';
    return el;
  };

  const closePanel = () => {
    panel.hidden = true;
    panel.replaceChildren();
    dock.classList.remove('conversation-canvas-panel-open');
    nav.querySelectorAll('.conversation-canvas-nav-toggle[aria-expanded="true"]')
      .forEach((button) => button.setAttribute('aria-expanded', 'false'));
  };

  const openPanel = (button, node) => {
    if (!panel.hidden && button.getAttribute('aria-expanded') === 'true') return;
    closePanel();
    const list = document.createElement('ul');
    list.className = 'conversation-canvas-nav-panel-list';
    const wide = node.children.length >= PANEL_COLUMNS_FROM;
    const columnEnd = wide ? Math.ceil(node.children.length / 2) - 1 : -1;
    node.children.forEach((child, i) => {
      const li = document.createElement('li');
      li.className = 'conversation-canvas-nav-panel-item';
      if (i === columnEnd) li.classList.add('conversation-canvas-nav-panel-column-end');
      const a = document.createElement('a');
      a.href = child.path;
      a.className = 'conversation-canvas-nav-panel-link';
      a.textContent = textOfNode(child);
      a.addEventListener('click', closePanel);
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
    const thirdLevel = current.parent?.parent && current.parent.parent !== tree;
    if (state.suggestions.length && (primary || thirdLevel)) {
      return { type: 'suggestions' };
    }
    return current.parent === tree ? { type: 'root' } : { type: 'section', node: current.parent };
  };

  const parentView = (view) => {
    const { tree, current } = state;
    if (view.type === 'suggestions') {
      if (view.returnView) return view.returnView;
      return current.parent === tree ? { type: 'root' } : { type: 'section', node: current.parent };
    }
    if (view.type === 'section' && view.node.parent && view.node.parent !== tree) {
      return { type: 'section', node: view.node.parent };
    }
    return { type: 'root' };
  };

  // Defined setView above render; disable-line prevents no-use-before-define on render()
  function setView(view) {
    state.view = view;
    render(); // eslint-disable-line no-use-before-define
  }

  function render() {
    closePanel();
    const { tree, view } = state;
    const items = [];
    const drilling = !state.collapsed && view.type === 'section';
    row.hidden = false;
    dock.classList.toggle('conversation-canvas-menu-drilling', drilling);
    dock.classList.toggle('conversation-canvas-menu-open', !state.collapsed);

    if (drilling) {
      menuToggle.remove();
      items.push(menuToggle);
    } else if (menuToggle.parentElement !== row) {
      row.prepend(menuToggle);
    }

    if (view.type === 'suggestions') {
      const back = document.createElement('button');
      back.type = 'button';
      back.className = 'conversation-canvas-nav-back';
      back.setAttribute('aria-label', t('back', 'Back'));
      back.addEventListener('click', () => {
        state.expanded = true;
        setView(parentView(view));
      });
      items.push(back);
    }

    if (view.type === 'suggestions') {
      state.suggestions.forEach((text) => {
        const item = pill('button', text);
        item.classList.add('conversation-canvas-nav-suggestion');
        item.addEventListener('click', () => {
          form.elements.q.value = text.replace(/^["“]|["”]$/g, '');
          form.elements.q.dispatchEvent(new Event('input', { bubbles: true }));
          form.elements.q.focus({ preventScroll: true });
        });
        items.push(item);
      });
    } else {
      const node = view.type === 'root' ? tree : view.node;
      node.children.forEach((child) => {
        const item = document.createElement('div');
        item.className = 'conversation-canvas-nav-pill';
        const link = pill('a', textOfNode(child));
        link.href = child.path;
        item.append(link);
        let toggle = null;
        if (child.children.length) {
          toggle = createIconButton({
            label: t('expandSubpages', 'Explore {title}', { title: textOfNode(child) }),
            icon: 'chevron-down',
            type: 'tertiary',
          });
          toggle.classList.add('conversation-canvas-nav-toggle');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-controls', panel.id);
          toggle.addEventListener('click', () => {
            if (view.type === 'root') {
              state.expanded = true;
              setView({ type: 'section', node: child });
            } else {
              state.expanded = true;
              setView({ type: 'suggestions', returnView: view });
            }
          });
          item.append(toggle);
        }
        const preview = () => {
          if (toggle) openPanel(toggle, child);
          else closePanel();
        };
        item.addEventListener('mouseenter', preview);
        link.addEventListener('focus', preview);
        if (state.current && isWithin(state.current, child)) {
          link.classList.add('conversation-canvas-nav-current');
          link.setAttribute('aria-current', state.current === child ? 'page' : 'true');
        }
        items.push(item);
      });
    }

    if (!items.length) {
      const empty = document.createElement('span');
      empty.className = 'conversation-canvas-menu-empty';
      empty.textContent = t('noPagesFound', 'No pages found');
      items.push(empty);
    }
    const list = document.createElement('ul');
    list.className = 'conversation-canvas-nav-list';
    list.append(...items.map((item) => {
      const li = document.createElement('li');
      li.append(item);
      return li;
    }));
    nav.replaceChildren(list);
    nav.dataset.view = view.type;
    nav.hidden = state.collapsed || !items.length;
    surface.hidden = state.collapsed;
    menuToggle.setAttribute('aria-expanded', String(!state.collapsed));
    const toggleLabel = !state.collapsed && !drilling ? t('closeMenu', 'Close menu') : t('menu', 'Menu');
    menuToggle.setAttribute('aria-label', toggleLabel);
    menuToggle.classList.toggle('conversation-canvas-menu-close', !state.collapsed && !drilling);
  }

  const closeNavigation = () => {
    state.expanded = false;
    state.collapsed = true;
    dock.classList.remove('conversation-canvas-menu-open', 'is-opening', 'conversation-canvas-menu-drilling');
    if (state.tree) setView({ type: 'root' });
    else {
      surface.hidden = true;
      nav.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  };

  menuToggle.addEventListener('click', () => {
    if (!state.collapsed && state.view?.type === 'section') {
      setView({ type: 'root' });
    } else if (!state.collapsed && state.expanded) {
      closeNavigation();
    } else {
      state.expanded = true;
      state.collapsed = false;
      nav.hidden = false;
      surface.hidden = false;
      dock.classList.add('conversation-canvas-menu-open');

      dock.classList.add('is-opening');
      const enablePointer = () => {
        dock.classList.remove('is-opening');
        window.removeEventListener('mousemove', enablePointer);
      };
      window.addEventListener('mousemove', enablePointer, { once: true });

      menuToggle.setAttribute('aria-expanded', 'true');
      if (state.tree) setView({ type: 'root' });
    }
  });
  menuToggle.setAttribute('aria-expanded', 'false');

  dock.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!panel.hidden) {
      closePanel();
    } else {
      closeNavigation();
    }
  });

  document.addEventListener('click', (e) => {
    if (!state.collapsed && !e.composedPath().includes(dock)) closeNavigation();
  });

  window.addEventListener('scroll', () => {
    if (state.expanded && !state.collapsed) {
      closeNavigation();
    } else if (!panel.hidden) closePanel();
  }, { passive: true });

  dock.addEventListener('focusout', (e) => {
    if (e.relatedTarget && !dock.contains(e.relatedTarget)) closeNavigation();
  });

  const { root, depth } = menuSettings(config);
  const tagLabels = resolveTags(getPageTags()).then((tags) => tags.map((tag) => tag.label));
  const loaded = Promise.all([loadMenuTree(root, depth), tagLabels]).then(([tree, labels]) => {
    if (!state.suggestions.length) {
      state.suggestions = labels.length ? labels : [
        t('canvasSuggestionSimilarChallenges', 'What customers have solved similar challenges?'),
        t('canvasSuggestionIndustryCustomers', 'Find customers in my industry'),
      ];
    }
    state.tree = tree;
    state.current = findNode(tree, normalizePath(window.location.pathname));
    const view = defaultView();
    if (!state.expanded && view.type === 'suggestions') state.collapsed = false;
    setView(state.expanded || (!primary && view.type !== 'suggestions') ? { type: 'root' } : view);
  });

  skeletonWhile(nav, loaded, navSkeleton);
  // eslint-disable-next-line no-console
  loaded.catch((e) => console.error('conversation canvas navigation', e));

  docks.set(block, {
    setSuggestions(suggestions) {
      state.suggestions = suggestions;
      if (state.tree) {
        const view = defaultView();
        if (view.type === 'suggestions') state.collapsed = false;
        setView(view);
      }
    },
  });
  return dock;
}

export function setConversationCanvasSuggestions(block, suggestions = []) {
  docks.get(block)?.setSuggestions(suggestions);
}

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

export default async function decorate(block) {
  t = await getPlaceholders();
  const id = uniqueId('conversation-canvas');
  const { config, buttonRows } = readBlock(block);

  const style = normalize(textOf(config.classes));
  if (STYLES.includes(style)) block.classList.add(style);
  const primary = block.classList.contains('primary');
  block.classList.add(`conversation-canvas-bg-${toClassName(textOf(config.bgstyle)) || 'default'}`);
  const titleSize = normalize(textOf(config.titlesize));
  if (TITLE_SIZES.includes(titleSize)) block.classList.add(`conversation-canvas-title-${titleSize}`);

  const floats = !block.classList.contains('nofloat');
  const inJourney = primary || !block.classList.contains('decorative');

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

  const background = imageOf(config.backgroundimage, '');
  if (background) {
    const bg = document.createElement('div');
    bg.className = 'conversation-canvas-background';
    bg.append(background);
    block.classList.add('conversation-canvas-has-background');
    block.append(bg);
  }

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

  const slot = document.createElement('div');
  slot.className = 'conversation-canvas-search-slot';
  const row = buildDock(config, id, block, false);
  slot.append(row);
  content.append(slot);

  if (block.classList.contains('secondary')) {
    const filters = document.createElement('ul');
    filters.className = 'conversation-canvas-filters';
    filters.setAttribute('aria-label', t('suggestions', 'Suggestions'));
    filters.hidden = true;
    content.append(filters);
  }

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
