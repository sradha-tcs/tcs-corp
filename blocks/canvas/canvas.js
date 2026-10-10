import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { buildPropertyImage, toSitePath } from '../../scripts/page-properties.js';
import {
  BUTTON_ALIGNMENTS,
  BUTTON_TYPES,
  BUTTON_VIEWS,
  createButton,
  decorateButton,
  readButtonOptions,
} from '../../decorators/button-decorator.js';

// canvas properties (blocks/canvas/_canvas.json), keyed by their normalized row name
const FIELDS = [
  'classes', 'bgstyle', 'backgroundimage', 'icon', 'iconalt', 'eyebrow', 'title', 'titlesize',
  'text', 'menurootpath', 'menudepth', 'searchplaceholder', 'searchaudioicon',
  'searchaudioiconalt', 'searchbuttonstyle', 'searchbuttonlabel',
];
const STYLES = ['primary', 'secondary'];
const TITLE_SIZES = ['bigger', 'medium'];
const FLOAT_THRESHOLD = 8; // px scrolled before a primary canvas shows its floating search row

let canvasCount = 0;

const normalize = (text) => toClassName(text || '').replace(/-/g, '');

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
    FIELDS.filter((field) => field !== 'classes')
      .forEach((field, i) => { if (unkeyed[i]) config[field] = unkeyed[i]; });
  }
  return { config, buttonRows };
}

const textOf = (cell) => cell?.textContent.trim() || '';

/**
 * Returns the image of an image property cell, with the given alt text (or one merged into it).
 * @returns {Element | null}
 */
function imageOf(cell, alt) {
  if (!cell) return null;
  let image = cell.querySelector('picture') || cell.querySelector('img');
  if (!image) {
    const src = cell.querySelector('a')?.href || textOf(cell);
    image = buildPropertyImage(src ? { src, alt: '' } : null);
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
 * Builds the navigation menu from the query index: pages under the root path, up to the depth.
 * @param {string} root Site path of the menu root
 * @param {number} depth Levels below the root
 * @returns {Promise<Element>}
 */
async function buildMenuList(root, depth) {
  const list = document.createElement('ul');
  try {
    const resp = await fetch('/query-index.json');
    const { data = [] } = resp.ok ? await resp.json() : {};
    const base = root === '/' ? '' : root.replace(/\/$/, '');
    const levelOf = (path) => path.slice(base.length).split('/').filter(Boolean).length;
    const pages = data
      .filter(({ path }) => path.startsWith(`${base}/`) && levelOf(path) >= 1 && levelOf(path) <= depth)
      .sort((x, y) => x.path.localeCompare(y.path));
    const items = new Map();
    pages.forEach(({ path, title }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = path;
      a.textContent = title || path.split('/').pop().replace(/-/g, ' ');
      li.append(a);
      items.set(path, li);
      const parent = items.get(path.slice(0, path.lastIndexOf('/')));
      if (parent) {
        let sub = parent.querySelector(':scope > ul');
        if (!sub) {
          sub = document.createElement('ul');
          parent.append(sub);
        }
        sub.append(li);
      } else {
        list.append(li);
      }
    });
  } catch { /* an empty menu is shown */ }
  if (!list.children.length) {
    const li = document.createElement('li');
    li.className = 'canvas-menu-empty';
    li.textContent = 'No pages found';
    list.append(li);
  }
  return list;
}

/**
 * Builds the search row: menu button and menu, search input, audio and submit buttons.
 */
function buildSearch(config, id, block) {
  const row = document.createElement('div');
  row.className = 'canvas-search';

  // menu
  const menuToggle = document.createElement('button');
  menuToggle.type = 'button';
  menuToggle.className = 'canvas-menu-toggle';
  menuToggle.setAttribute('aria-label', 'Menu');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-controls', `${id}-menu`);
  const menu = document.createElement('nav');
  menu.className = 'canvas-menu';
  menu.id = `${id}-menu`;
  menu.setAttribute('aria-label', 'Menu');
  menu.hidden = true;
  const root = toSitePath(config.menurootpath?.querySelector('a')?.getAttribute('href')
    || textOf(config.menurootpath)) || '/';
  const depth = Math.max(1, parseInt(textOf(config.menudepth), 10) || 1);
  let menuLoaded = false;
  const closeMenu = () => {
    menu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  menuToggle.addEventListener('click', async () => {
    const open = menu.hidden;
    menu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', open);
    if (open && !menuLoaded) {
      menuLoaded = true;
      menu.append(await buildMenuList(root, depth));
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

  // search form
  const form = document.createElement('form');
  form.className = 'canvas-search-form';
  const placeholder = textOf(config.searchplaceholder) || 'Ask us a question';
  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'q';
  input.id = `${id}-q`;
  input.placeholder = placeholder;
  input.autocomplete = 'off';
  const label = document.createElement('label');
  label.className = 'canvas-visually-hidden';
  label.htmlFor = input.id;
  label.textContent = placeholder;

  // audio (speech input), only where the browser supports it
  const audio = document.createElement('button');
  audio.type = 'button';
  audio.className = 'canvas-audio';
  audio.setAttribute('aria-label', textOf(config.searchaudioiconalt) || 'Search by voice');
  const audioImage = imageOf(config.searchaudioicon, '');
  if (audioImage) audio.append(audioImage);
  else audio.classList.add('canvas-audio-default');
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Recognition) {
    audio.addEventListener('click', () => {
      const recognition = new Recognition();
      recognition.lang = document.documentElement.lang || 'en';
      recognition.addEventListener('result', (e) => {
        input.value = e.results[0][0].transcript;
        input.focus();
      });
      recognition.start();
    });
  } else {
    audio.hidden = true;
  }

  // submit: an icon button from the button decorator (icon button types)
  const submitLabel = textOf(config.searchbuttonlabel) || 'Submit';
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = submitLabel;
  decorateButton(submit, {
    view: 'icon',
    type: textOf(config.searchbuttonstyle).toLowerCase() || 'primary',
    icon: 'arrow-right',
    title: submitLabel,
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    // hand the query to whichever search experience is wired up on the page
    block.dispatchEvent(new CustomEvent('canvas:search', { bubbles: true, detail: { query } }));
  });

  form.append(label, input, audio, submit);
  row.append(menuToggle, form, menu);
  return row;
}

/*
 * Floating search rows: across all canvases on the page, at most one search row floats at the
 * bottom of the viewport. None floats while any canvas shows its search row in place.
 * Primary canvases have no in-place row; theirs floats once the page is scrolled.
 */
const floating = [];
let floatFrame;

function updateFloating() {
  const vh = window.innerHeight;
  const inView = (el) => {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < vh;
  };
  const inPlaceVisible = floating.some((c) => !c.primary && inView(c.slot));
  let assigned = false;
  floating.forEach((c) => {
    let float = false;
    if (!inPlaceVisible && !assigned) {
      float = c.primary
        ? window.scrollY > FLOAT_THRESHOLD
        : c.slot.getBoundingClientRect().bottom < 0;
    }
    if (float) assigned = true;
    if (float && !c.row.classList.contains('is-floating') && !c.primary) {
      // keep the space of the row while it floats, so the page doesn't jump
      c.slot.style.minHeight = `${c.slot.offsetHeight}px`;
    }
    c.row.classList.toggle('is-floating', float);
    if (!float && !c.primary) c.slot.style.minHeight = '';
  });
}

function scheduleFloating() {
  cancelAnimationFrame(floatFrame);
  floatFrame = requestAnimationFrame(updateFloating);
}

/**
 * Renders filter tags into the canvas filter list (Secondary style). The tags are dynamic, so
 * the list is empty until a script supplies them, e.g. from a personalisation service.
 * @param {Element} block The canvas block
 * @param {Array<{ label: string, href?: string, active?: boolean }>} tags
 */
export function setCanvasFilters(block, tags = []) {
  const list = block.querySelector('.canvas-filters');
  if (!list) return;
  list.replaceChildren(...tags.map(({ label, href, active }) => {
    const li = document.createElement('li');
    const tag = document.createElement(href ? 'a' : 'button');
    tag.className = `tag tag-filter${active ? ' active' : ''}`;
    tag.textContent = label;
    if (href) tag.href = href;
    else tag.type = 'button';
    li.append(tag);
    return li;
  }));
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  canvasCount += 1;
  const id = `canvas-${canvasCount}`;
  const { config, buttonRows } = readBlock(block);

  // style options
  const style = normalize(textOf(config.classes));
  if (STYLES.includes(style)) block.classList.add(style);
  const primary = block.classList.contains('primary');
  block.classList.add(`bg-${toClassName(textOf(config.bgstyle)) || 'default'}`);
  const titleSize = normalize(textOf(config.titlesize));
  if (TITLE_SIZES.includes(titleSize)) block.classList.add(`title-${titleSize}`);

  const content = document.createElement('div');
  content.className = 'canvas-content';

  // background image
  const background = imageOf(config.backgroundimage, '');
  if (background) {
    const bg = document.createElement('div');
    bg.className = 'canvas-background';
    bg.append(background);
    block.classList.add('has-background');
    block.append(bg);
  }

  // icon, eyebrow, title, text
  const intro = document.createElement('div');
  intro.className = 'canvas-intro';
  const icon = imageOf(config.icon, textOf(config.iconalt));
  if (icon) {
    const iconWrap = document.createElement('div');
    iconWrap.className = 'canvas-icon';
    iconWrap.append(icon);
    intro.append(iconWrap);
  }
  if (textOf(config.eyebrow)) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'canvas-eyebrow';
    eyebrow.textContent = textOf(config.eyebrow);
    intro.append(eyebrow);
  }
  if (textOf(config.title)) {
    const title = document.createElement(primary ? 'h1' : 'h2');
    title.className = 'canvas-title';
    title.textContent = textOf(config.title);
    intro.append(title);
  }
  if (config.text && textOf(config.text)) {
    const text = document.createElement('div');
    text.className = 'canvas-text';
    text.append(...config.text.childNodes);
    intro.append(text);
  }
  if (intro.children.length) content.append(intro);

  // search row, in place (default, secondary) or floating only (primary)
  const slot = document.createElement('div');
  slot.className = 'canvas-search-slot';
  const row = buildSearch(config, id, block);
  slot.append(row);
  content.append(slot);

  // filter tags (secondary): markup only, filled by setCanvasFilters()
  if (block.classList.contains('secondary')) {
    const filters = document.createElement('ul');
    filters.className = 'canvas-filters';
    filters.setAttribute('aria-label', 'Suggestions');
    content.append(filters);
  }

  // button list
  const buttons = buttonRows.map(buildListButton).filter(Boolean);
  if (buttons.length) {
    const list = document.createElement('ul');
    list.className = 'canvas-buttons';
    list.append(...buttons);
    content.append(list);
  }

  block.replaceChildren(...block.querySelectorAll(':scope > .canvas-background'), content);

  floating.push({ row, slot, primary });
  if (floating.length === 1) {
    window.addEventListener('scroll', scheduleFloating, { passive: true });
    window.addEventListener('resize', scheduleFloating);
  }
  scheduleFloating();
}
