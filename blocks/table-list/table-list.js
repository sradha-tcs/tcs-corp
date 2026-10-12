import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { pick } from '../../utils/buttons.js';
import { isEditing, prefersReducedMotion } from '../../utils/environment.js';
import { normalizeKey, textOf } from '../../utils/properties.js';
import { toSitePath } from '../../utils/urls.js';
import { onVisible } from '../../utils/viewport.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';

// UI text from the placeholders sheet; English fallbacks until it's loaded in decorate()
let t = (key, fallback, values) => fillPlaceholder(fallback, values);

/*
 * Table List (blocks/table-list/_table-list.json, TCS DS Figma "List" variations): a heading
 * with a call to action and a list of items, everything set in the dialog:
 * - Variation 1 (industries): title, description and arrow
 * - Variation 2 (solutions): description, large title and an outline button
 * - Variation 3 (products): description, number, large title and a diagonal arrow
 * Call to action style, numbers and the item link default per variation and can be changed.
 * Block properties are key-value rows, or one row per field in model order (blocks created
 * before the model was key-value); items are rows of number, title, trademark, description
 * and link (with its button text) cells.
 */

// block properties (_table-list.json), in model order
const FIELDS = [
  'variations', 'listheading', 'maxcards', 'viewalllabel', 'viewalllink', 'ctastyle', 'numbers',
  'itemaction', 'itembuttonlabel', 'motion',
];
const VARIATIONS = ['industries', 'solutions', 'products'];
const CTA_STYLES = ['primary', 'secondary', 'tertiary'];
const NUMBERS = ['show', 'mobile', 'hide'];
const ITEM_ACTIONS = ['arrow', 'arrow-up-right', 'button'];
const MOTIONS = ['none', 'fade', 'slide', 'reveal'];
const HEADINGS = ['h2', 'h3', 'h4'];
const TRADEMARKS = { tm: '™', r: '®' };
const MAX_ITEMS = 10;

// what each variation shows unless the dialog says otherwise
const VARIATION_DEFAULTS = {
  industries: { ctaStyle: 'primary', numbers: 'mobile', itemAction: 'arrow' },
  solutions: { ctaStyle: 'secondary', numbers: 'hide', itemAction: 'button' },
  products: { ctaStyle: 'tertiary', numbers: 'show', itemAction: 'arrow-up-right' },
};

/**
 * Turns an authored link value into a destination the site serves: site paths ("/en/page"),
 * AEM paths ("/content/<site>/en/page.html"), anchors ("#id") and http(s) URLs.
 * @param {string} value Authored link value
 * @returns {string} The destination, or an empty string when the value is not a link
 */
function toDestination(value) {
  const href = (value || '').trim();
  if (href.startsWith('#')) return href.length > 1 ? href : '';
  if (href.startsWith('/') || /^https?:\/\//i.test(href)) return toSitePath(href);
  return '';
}

/** the destination of a link cell: its link, or a path typed as text */
const linkOf = (cell) => toDestination(cell?.querySelector('a[href]')?.getAttribute('href')
  || textOf(cell));

/**
 * The text of a link cell, when authored: a link without its own text shows its URL.
 * @param {Element} cell
 */
function linkTextOf(cell) {
  const a = cell?.querySelector('a[href]');
  const text = textOf(a);
  if (!text || text === a.getAttribute('href') || /^(\/|https?:)/i.test(text)) return '';
  return text;
}

/**
 * Reads the block: its properties (key-value rows, or single-cell rows in model order), the
 * item rows and a legacy header item (heading | link) of lists created before the heading and
 * link were block fields.
 * @param {Element} block
 */
function readBlock(block) {
  const cells = {};
  const unkeyed = [];
  const items = [];
  let header = null;
  [...block.children].forEach((row) => {
    const rowCells = [...row.children];
    const key = rowCells.length === 2 ? normalizeKey(rowCells[0].textContent) : '';
    if (FIELDS.includes(key)) [, cells[key]] = rowCells;
    else if (rowCells.length === 1) unkeyed.push(rowCells[0]);
    else if (rowCells.length === 2) header = row;
    else items.push(row);
  });
  if (!Object.keys(cells).length) {
    FIELDS.forEach((field, i) => { if (unkeyed[i]) cells[field] = unkeyed[i]; });
  }

  const variation = pick(textOf(cells.variations), VARIATIONS, 'industries');
  const defaults = VARIATION_DEFAULTS[variation];
  const maxItems = Number.parseInt(textOf(cells.maxcards), 10);
  const headingCell = cells.listheading;
  return {
    variation,
    heading: textOf(headingCell),
    headingType: pick(headingCell?.querySelector('h1, h2, h3, h4, h5, h6')?.tagName, HEADINGS.map((h) => h.toUpperCase()), 'H2').toLowerCase(),
    maxItems: Number.isNaN(maxItems) ? 4 : Math.min(Math.max(maxItems, 1), MAX_ITEMS),
    ctaText: textOf(cells.viewalllabel),
    ctaLink: linkOf(cells.viewalllink),
    ctaStyle: pick(textOf(cells.ctastyle), CTA_STYLES, defaults.ctaStyle),
    numbers: pick(textOf(cells.numbers), NUMBERS, defaults.numbers),
    itemAction: pick(textOf(cells.itemaction), ITEM_ACTIONS, defaults.itemAction),
    buttonText: textOf(cells.itembuttonlabel),
    motion: pick(textOf(cells.motion), MOTIONS, 'none'),
    items,
    header,
  };
}

function buildHeader(config) {
  const header = document.createElement('div');
  header.className = 'table-list-header';
  const [legacyHeading, legacyLink] = config.header ? [...config.header.children] : [];
  if (config.header) moveInstrumentation(config.header, header);

  const text = config.heading || textOf(legacyHeading);
  if (text) {
    const heading = document.createElement(config.headingType);
    heading.className = 'table-list-heading';
    heading.textContent = text;
    header.append(heading);
  }

  const href = config.ctaLink || linkOf(legacyLink);
  if (href) {
    const cta = document.createElement('p');
    cta.className = 'table-list-cta';
    const link = document.createElement('a');
    link.href = href;
    link.textContent = config.ctaText || linkTextOf(legacyLink) || t('viewAll', 'View all');
    decorateButton(link, { view: 'button', type: config.ctaStyle });
    cta.append(link);
    header.append(cta);
  }
  return header.children.length ? header : null;
}

/** replaces an authored cell with a new element holding its text and its instrumentation */
function fromCell(cell, tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = textOf(cell);
  if (cell) moveInstrumentation(cell, element);
  return element;
}

/**
 * The item's link: an arrow (the whole item is clickable) or a button.
 * @returns {Element|null}
 */
function buildAction(linkCell, title, config) {
  const href = linkOf(linkCell);
  const action = document.createElement('div');
  action.className = 'table-list-action';
  if (config.itemAction === 'button') {
    if (!href) return null;
    const button = document.createElement('a');
    button.href = href;
    button.textContent = linkTextOf(linkCell) || config.buttonText || t('explore', 'Explore');
    button.setAttribute('aria-label', `${button.textContent}: ${title}`);
    decorateButton(button, { view: 'button', type: 'secondary' });
    action.append(button);
    return action;
  }
  const arrow = document.createElement(href ? 'a' : 'span');
  arrow.className = `table-list-arrow ${config.itemAction}`;
  if (href) {
    arrow.href = href;
    arrow.setAttribute('aria-label', t('exploreItem', 'Explore {title}', { title }));
  } else {
    arrow.setAttribute('aria-hidden', 'true');
  }
  action.append(arrow);
  return action;
}

function decorateItem(row, index, config) {
  const [numberCell, titleCell, trademarkCell, descriptionCell, linkCell] = row.children;

  const main = document.createElement('div');
  main.className = 'table-list-main';
  if (config.numbers !== 'hide') {
    const number = fromCell(numberCell, 'span', 'table-list-number');
    if (!number.textContent) number.textContent = String(index + 1).padStart(2, '0');
    main.append(number);
  }
  const title = fromCell(titleCell, 'h3', 'table-list-title');
  const trademark = TRADEMARKS[textOf(trademarkCell).toLowerCase()];
  if (trademark) {
    const sup = document.createElement('sup');
    sup.className = 'table-list-trademark';
    sup.textContent = trademark;
    title.append(sup);
  }
  main.append(title);

  const parts = [main];
  if (textOf(descriptionCell)) {
    parts.push(fromCell(descriptionCell, 'p', 'table-list-description'));
  }
  const action = buildAction(linkCell, textOf(titleCell), config);
  if (action) parts.push(action);

  // the row is kept, so its Universal Editor instrumentation stays in place
  row.className = 'table-list-item';
  row.replaceChildren(...parts);
  return row;
}

/**
 * Reveals the items with the chosen motion as they scroll into view. Skipped in the
 * Universal Editor and for reduced motion, where the items are always shown.
 */
function observeMotion(block, motion) {
  const items = [...block.querySelectorAll('.table-list-item')];
  if (motion === 'none' || !items.length || !('IntersectionObserver' in window)) return;
  if (isEditing() || prefersReducedMotion()) return;
  block.classList.add('motion-ready');
  items.forEach((item) => onVisible(item, () => item.classList.add('is-visible'), { threshold: 0.15 }));
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  t = await getPlaceholders();
  const config = readBlock(block);

  block.classList.add(config.variation, `numbers-${config.numbers}`, `motion-${config.motion}`);

  const list = document.createElement('div');
  list.className = 'table-list-items';
  list.setAttribute('role', 'list');
  config.items.slice(0, config.maxItems).forEach((row, i) => {
    const item = decorateItem(row, i, config);
    item.setAttribute('role', 'listitem');
    list.append(item);
  });

  block.replaceChildren(...[buildHeader(config), list].filter(Boolean));
  observeMotion(block, config.motion);
}
