/**
 * Block properties decorator: shared reading of key-value block properties (one row per
 * model field) and building of the elements most blocks render from them, so every block
 * handles authored values, toggles, headings and editor instrumentation the same way.
 */
import { toClassName } from '../scripts/aem.js';
import { moveInstrumentation } from '../scripts/scripts.js';
import { tag as parseTag } from '../scripts/page-properties.js';

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** a property name as read from a row key, e.g. "primaryCtaTarget" -> "primaryctatarget" */
export const normalizeKey = (text) => toClassName(text || '').replace(/-/g, '');

/**
 * Reads the property rows of a key-value block, keyed by their normalized name.
 * @param {Element} block
 * @returns {Object<string, Element>} the value cell of each property
 */
export function readProperties(block) {
  const properties = {};
  [...block.children].forEach((row) => {
    const [key, value] = row.children;
    if (row.children.length === 2) properties[normalizeKey(key.textContent)] = value;
  });
  return properties;
}

/** the trimmed text of a property cell */
export const textOf = (cell) => cell?.textContent.trim() || '';

/** a toggle: only an authored "true" turns it on, so a missing row means off */
export const isOn = (cell) => textOf(cell).toLowerCase() === 'true';

/**
 * A select value from its property row, or from the block classes (block options).
 * @param {Element} block
 * @param {Element} cell
 * @param {string[]} allowed
 * @returns {string} an allowed value, or ''
 */
export function optionOf(block, cell, allowed) {
  const value = toClassName(textOf(cell));
  if (allowed.includes(value)) return value;
  return allowed.find((name) => block.classList.contains(name)) || '';
}

/** the element holding a plain-text value: authored text may be wrapped in a paragraph */
function textSource(cell) {
  const only = cell.children.length === 1 ? cell.firstElementChild : null;
  return only?.tagName === 'P' && cell.textContent.trim() === only.textContent.trim() ? only : cell;
}

/**
 * Moves the content of a property cell into a new element, with its editor instrumentation.
 * Plain-text values lose their wrapping paragraph; a div keeps rich text as is.
 * @param {Element} cell
 * @param {string} tagName
 * @param {string} className
 * @returns {Element}
 */
export function fromCell(cell, tagName, className) {
  const el = document.createElement(tagName);
  el.className = className;
  const source = tagName === 'div' ? cell : textSource(cell);
  el.append(...source.childNodes);
  moveInstrumentation(source, el);
  moveInstrumentation(cell, el);
  return el;
}

/**
 * Builds a heading from a title property and its Title Type (h1-h6).
 * @param {Element} cell the title cell
 * @param {Element} typeCell the Title Type cell
 * @param {string} className
 * @param {string} [fallback] heading level when no Title Type is set
 * @returns {HTMLHeadingElement | null}
 */
export function buildHeading(cell, typeCell, className, fallback = 'h2') {
  if (!textOf(cell)) return null;
  const level = toClassName(textOf(typeCell));
  const authored = cell.querySelector(HEADINGS.join(','));
  const tagName = HEADINGS.includes(level) ? level : (authored?.tagName.toLowerCase() || fallback);
  const heading = document.createElement(tagName);
  heading.className = className;
  const source = authored || textSource(cell);
  heading.append(...source.childNodes);
  moveInstrumentation(source, heading);
  moveInstrumentation(cell, heading);
  return heading;
}

/**
 * Formats a date (YYYY-MM-DD, possibly with a time) without time zone shifts.
 * @param {string} value
 * @param {string} format dd-mm-yyyy (default) | mm-dd-yyyy | mmm-d-yyyy | dd/mm/yy
 * @returns {{ iso: string, text: string }}
 */
export function formatDate(value, format) {
  const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return { iso: '', text: value || '' };
  const [, year, month, day] = match;
  const iso = `${year}-${month}-${day}`;
  if (format === 'mm-dd-yyyy') return { iso, text: `${month}-${day}-${year}` };
  if (format === 'mmm-d-yyyy') {
    return { iso, text: `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}` };
  }
  if (format === 'dd/mm/yy') return { iso, text: `${day}/${month}/${year.slice(2)}` };
  return { iso, text: `${day}-${month}-${year}` };
}

/**
 * Builds a <time> element for a date.
 * @returns {HTMLTimeElement | null}
 */
export function buildTime(value, format, className) {
  const { iso, text } = formatDate(value, format);
  if (!text) return null;
  const time = document.createElement('time');
  time.className = className;
  if (iso) time.dateTime = iso;
  time.textContent = text;
  return time;
}

/**
 * Reads tags from a multi-value cell (list items or a comma-separated list).
 * @returns {{ id: string, label: string }[]}
 */
export function readTags(cell) {
  if (!cell) return [];
  const items = cell.querySelectorAll('li');
  const values = items.length ? [...items].map((li) => li.textContent) : textOf(cell).split(',');
  return values.map((value) => value.trim()).filter(Boolean).map((id) => parseTag(id));
}

/**
 * Builds a list of tag labels.
 * @param {{ id: string, label: string }[]} tags
 * @returns {HTMLUListElement | null}
 */
export function buildTagList(tags, className) {
  if (!tags.length) return null;
  const list = document.createElement('ul');
  list.className = className;
  tags.forEach(({ id, label }) => {
    const li = document.createElement('li');
    li.dataset.tag = id;
    li.textContent = label;
    list.append(li);
  });
  return list;
}

/**
 * The picture of an image property, with the alt text field applied
 * (an empty alt marks the image as decorative).
 * @returns {HTMLPictureElement | null}
 */
export function pictureOf(cell, altCell) {
  const picture = cell?.querySelector('picture');
  if (!picture) return null;
  const img = picture.querySelector('img');
  const alt = textOf(altCell);
  if (img && alt) img.alt = alt;
  else if (img && !img.hasAttribute('alt')) img.alt = '';
  moveInstrumentation(cell, picture);
  return picture;
}
