import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { tag as parseTag } from '../../scripts/page-properties.js';
import {
  NEW_WINDOW, decorateButton, readLinkItems, setLinkTarget,
} from '../../decorators/button-decorator.js';

/*
 * Teaser (blocks/teaser/_teaser.json): a key-value block, one row per property.
 * Styles: Default (image and content side by side, image left or right; centered without an
 * image) and "No Image, Right Desc & Links" (title left; description, links and short
 * description right). Figma: "2 Slot Section" / "Text & Image" and "Text Section".
 */

const STYLES = ['no-image'];
const BG_COLORS = ['grey', 'dark', 'dark-green'];
const LINK_STYLES = ['list', 'primary', 'secondary'];
const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const normalize = (text) => toClassName(text || '').replace(/-/g, '');

/** the property rows of the block, keyed by their normalized name (e.g. "primarycta") */
function readProperties(block) {
  const properties = {};
  [...block.children].forEach((row) => {
    const [key, value] = row.children;
    if (row.children.length === 2) properties[normalize(key.textContent)] = value;
  });
  return properties;
}

const textOf = (cell) => cell?.textContent.trim() || '';
// toggles: only an authored "true" turns them on, so a missing row means off
const isOn = (cell) => textOf(cell).toLowerCase() === 'true';

/** a block option from the block classes (block options) or its property row */
function option(block, cell, allowed) {
  const value = toClassName(textOf(cell));
  if (allowed.includes(value)) return value;
  return allowed.find((name) => block.classList.contains(name)) || '';
}

/** the element holding a plain-text value: authored text may be wrapped in a paragraph */
function textSource(cell) {
  const only = cell.children.length === 1 ? cell.firstElementChild : null;
  return only?.tagName === 'P' && cell.textContent.trim() === only.textContent.trim() ? only : cell;
}

/** moves the content of a property cell into a new element, with its editor instrumentation */
function fromCell(cell, tagName, className) {
  const el = document.createElement(tagName);
  el.className = className;
  const source = tagName === 'div' ? cell : textSource(cell);
  el.append(...source.childNodes);
  moveInstrumentation(source, el);
  moveInstrumentation(cell, el);
  return el;
}

/** formats an authored date (YYYY-MM-DD, possibly with a time) without time zone shifts */
function formatDate(value, format) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return { iso: '', text: value };
  const [, year, month, day] = match;
  const iso = `${year}-${month}-${day}`;
  if (format === 'mm-dd-yyyy') return { iso, text: `${month}-${day}-${year}` };
  if (format === 'mmm-d-yyyy') {
    return { iso, text: `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}` };
  }
  return { iso, text: `${day}-${month}-${year}` };
}

/** tag IDs from a multi-value cell: list items or a comma-separated list */
function readTags(cell) {
  const items = cell.querySelectorAll('li');
  const values = items.length
    ? [...items].map((li) => li.textContent)
    : textOf(cell).split(',');
  return values.map((value) => value.trim()).filter(Boolean).map((id) => parseTag(id));
}

function buildTitle(props) {
  const cell = props.title;
  if (!textOf(cell)) return null;
  const level = toClassName(textOf(props.titletype));
  const authored = cell.querySelector(HEADINGS.join(','));
  const tagName = HEADINGS.includes(level) ? level : (authored?.tagName.toLowerCase() || 'h2');
  const title = document.createElement(tagName);
  title.className = 'teaser-title';
  const source = authored || textSource(cell);
  title.append(...source.childNodes);
  moveInstrumentation(source, title);
  moveInstrumentation(cell, title);
  return title;
}

function buildMeta(props) {
  const meta = document.createElement('div');
  meta.className = 'teaser-meta';
  const date = textOf(props.date);
  if (isOn(props.showdate) && date) {
    const { iso, text } = formatDate(date, toClassName(textOf(props.dateformat)));
    const time = document.createElement('time');
    time.className = 'teaser-date';
    if (iso) time.dateTime = iso;
    time.textContent = text;
    meta.append(time);
  }
  const tags = isOn(props.displaytags) && props.tags ? readTags(props.tags) : [];
  if (tags.length) {
    const list = document.createElement('ul');
    list.className = 'teaser-tags';
    tags.forEach(({ id, label }) => {
      const li = document.createElement('li');
      li.dataset.tag = id;
      li.textContent = label;
      list.append(li);
    });
    meta.append(list);
  }
  return meta.children.length ? meta : null;
}

/** the link of a single-link property (link + text collapsed into one anchor) */
function linkOf(cell) {
  return cell?.querySelector('a[href]') || null;
}

/**
 * A Link Style value: Default ("") | list | primary | secondary. A missing row falls back to
 * the model default; an empty row is Default.
 */
function linkStyleOf(cell, fallback = '') {
  if (!cell) return fallback;
  const value = toClassName(textOf(cell));
  return LINK_STYLES.includes(value) ? value : '';
}

/**
 * Renders links in their Link Style: Default text links with an arrow, Primary / Secondary
 * Button buttons, or List rows with dividers (consecutive List links share one list; links
 * opening a new window point up and right).
 * @param {Element} container
 * @param {{ link: HTMLAnchorElement, newWindow: boolean, style: string }[]} entries
 */
function renderLinks(container, entries) {
  let list = null;
  entries.forEach(({ link, newWindow, style }) => {
    if (style === 'list') {
      if (!list) {
        list = document.createElement('ul');
        list.className = 'teaser-link-list';
        container.append(list);
      }
      const li = document.createElement('li');
      link.className = 'teaser-link-list-item';
      setLinkTarget(link, newWindow);
      li.append(link);
      list.append(li);
      return;
    }
    list = null;
    decorateButton(link, { view: 'button', type: style || 'tertiary', newWindow });
    container.append(link);
  });
  const styles = [...new Set(entries.map(({ style }) => style || 'default'))];
  container.classList.add(styles.length === 1 ? `teaser-links-${styles[0]}` : 'teaser-links-mixed');
}

function buildLinks(props) {
  const links = document.createElement('div');
  links.className = 'teaser-links';
  let entries;

  if (isOn(props.multilinks)) {
    // MultiLinks: the Links multifield, all in the Multi Link Style
    const style = linkStyleOf(props.multilinkstyle);
    entries = readLinkItems(props.links).map((item) => ({ ...item, style }));
    if (props.links) moveInstrumentation(props.links, links);
  } else {
    // Primary and Secondary CTA, each in its own Link Style
    entries = [
      [props.primarycta, props.primaryctatarget, props.primaryctastyle, 'primary'],
      [props.secondarycta, props.secondaryctatarget, props.secondaryctastyle, 'secondary'],
    ].map(([cell, target, style, fallback]) => {
      const link = linkOf(cell);
      if (link) moveInstrumentation(cell, link);
      return link && {
        link,
        newWindow: textOf(target) === NEW_WINDOW,
        style: linkStyleOf(style, fallback),
      };
    }).filter(Boolean);
  }

  if (!entries.length) return null;
  renderLinks(links, entries);
  return links;
}

function buildImage(block, props) {
  if (option(block, props.classes, STYLES) === 'no-image' || isOn(props.hideimage)) return null;
  const picture = props.image?.querySelector('picture');
  if (!picture) return null;
  const img = picture.querySelector('img');
  const alt = textOf(props.imagealt);
  if (img && alt) img.alt = alt;
  else if (img && !img.hasAttribute('alt')) img.alt = '';
  const media = document.createElement('div');
  media.className = 'teaser-media';
  media.append(picture);
  moveInstrumentation(props.image, media);
  return media;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const props = readProperties(block);
  const style = option(block, props.classes, STYLES);
  const bgColor = option(block, props.bgcolor, BG_COLORS);
  const imageRight = toClassName(textOf(props.imageposition)) === 'right'
    || block.classList.contains('image-right');

  // header: eyebrow, date and tags, title and View All
  const header = document.createElement('div');
  header.className = 'teaser-header';
  if (isOn(props.showeyebrow) && textOf(props.eyebrow)) {
    header.append(fromCell(props.eyebrow, 'p', 'teaser-eyebrow'));
  }
  const meta = buildMeta(props);
  if (meta) header.append(meta);

  const headingRow = document.createElement('div');
  headingRow.className = 'teaser-heading-row';
  const title = buildTitle(props);
  if (title) {
    if (isOn(props.titlehidden)) title.classList.add('teaser-title-hidden');
    headingRow.append(title);
  }
  const viewAll = linkOf(props.viewall);
  if (viewAll) {
    decorateButton(viewAll, { view: 'button', type: 'primary' });
    viewAll.classList.add('teaser-view-all');
    moveInstrumentation(props.viewall, viewAll);
    headingRow.append(viewAll);
  }
  if (headingRow.children.length) header.append(headingRow);

  // body: description, links, short description
  const body = document.createElement('div');
  body.className = 'teaser-body';
  if (isOn(props.showdescription) && textOf(props.description)) {
    body.append(fromCell(props.description, 'div', 'teaser-description'));
  }
  const links = buildLinks(props);
  if (links) body.append(links);
  if (textOf(props.shortdescription)) {
    body.append(fromCell(props.shortdescription, 'div', 'teaser-short-description'));
  }

  const content = document.createElement('div');
  content.className = 'teaser-content';
  content.append(...[header, body].filter((part) => part.children.length));

  const media = style === 'no-image' ? null : buildImage(block, props);

  block.classList.remove(...STYLES, ...BG_COLORS.map((color) => `bg-${color}`));
  if (style) block.classList.add(style);
  if (bgColor) block.classList.add(`bg-${bgColor}`);
  block.classList.toggle('image-right', !!media && imageRight);
  block.classList.toggle('teaser-has-media', !!media);
  if (isOn(props.personalization)) {
    // marker for a personalization script (e.g. Adobe Target); no visible change
    block.classList.add('personalization');
    block.dataset.personalization = 'true';
  }

  block.replaceChildren(...[media, content].filter(Boolean));
}
