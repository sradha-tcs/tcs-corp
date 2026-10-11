import { moveInstrumentation } from '../../scripts/scripts.js';
import { createHiddenText } from '../../decorators/a11y-decorator.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { isEditing, prefersReducedMotion } from '../../utils/environment.js';
import { toSitePath } from '../../utils/urls.js';
import { onVisible } from '../../utils/viewport.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';

// UI text from the placeholders sheet; English fallbacks until it's loaded in decorate()
let t = (key, fallback, values) => fillPlaceholder(fallback, values);

/*
 * Table List (blocks/table-list/_table-list.json): a heading with a "View all" link and up to
 * four numbered cards (number, title, description, arrow link), shown as a list or a table.
 * Block properties are read by position (one single-cell row per field); the items are a
 * header (2 cells) and cards (number, title, description, page reference, tag 1, tag 2).
 */

const DEFAULTS = {
  variations: '',
  maxCards: 4,
  showTags: false,
  view: 'list',
  cardColor: 'white',
  display: 'title-description',
  viewAllTitle: 'View all',
  motionType: 'none',
  listTitle: 'Our transformation solutions',
};

const VALID_VARIATIONS = [
  '',
  'compact',
  'no-description',
  'dark',
  'featured-industry',
  'no-number',
  'description-first',
  'title-right',
];

const VALID_CARD_COLORS = ['white', 'blue', 'black', 'grey'];
const VALID_DISPLAYS = ['title-description', 'title', 'description'];
const VALID_MOTIONS = ['none', 'fade', 'slide', 'reveal'];

const pick = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);

function getText(element) {
  return element?.textContent?.trim() || '';
}

function getFieldLink(element) {
  const link = element?.querySelector('a[href]');
  return link?.getAttribute('href') || getText(element);
}

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

/**
 * Extracts the destination of an authored page-reference cell.
 * The path is used as a destination, never as visible card text.
 * @param {Element|null} cell Authored reference cell
 * @returns {string} Destination or an empty string
 */
function getPageReference(cell) {
  if (!cell) return '';
  const anchor = cell.querySelector('a[href]');
  return [anchor?.getAttribute('href'), cell.getAttribute('href'), getText(cell)]
    .map(toDestination)
    .find(Boolean) || '';
}

function readBlockConfig(block) {
  const configRows = [];
  const contentRows = [];

  [...block.children].forEach((row) => {
    if (row.children.length === 1) configRows.push(row);
    else contentRows.push(row);
  });

  const cell = (index) => configRows[index]?.children[0];
  const value = (index) => getText(cell(index));
  const rawShowTags = value(2).toLowerCase();
  const maxCards = Number.parseInt(value(1), 10);

  const properties = {
    variations: pick(value(0), VALID_VARIATIONS, DEFAULTS.variations),
    maxCards: Number.isNaN(maxCards) ? DEFAULTS.maxCards : Math.min(Math.max(maxCards, 1), 4),
    showTags: rawShowTags ? ['true', 'yes', '1'].includes(rawShowTags) : DEFAULTS.showTags,
    view: pick(value(3), ['list', 'table'], DEFAULTS.view),
    cardColor: pick(value(4), VALID_CARD_COLORS, DEFAULTS.cardColor),
    display: pick(value(5), VALID_DISPLAYS, DEFAULTS.display),
    // no defaults here, so the authored header item can fill in the heading and link text
    viewAllTitle: value(6),
    viewAllLink: toDestination(getFieldLink(cell(7))),
    motionType: pick(value(8), VALID_MOTIONS, DEFAULTS.motionType),
    listTitle: value(9),
  };

  return { properties, contentRows, hasVariationConfig: Boolean(configRows[0]) };
}

function createHeader(properties, headerRow) {
  const header = document.createElement('div');
  header.className = 'table-list-header';
  const [headingCell, linkCell] = headerRow ? [...headerRow.children] : [];
  if (headerRow) moveInstrumentation(headerRow, header);

  const heading = document.createElement('h2');
  heading.className = 'table-list-heading';
  heading.textContent = properties.listTitle || getText(headingCell)
    || t('tableListTitle', DEFAULTS.listTitle);
  header.append(heading);

  const authoredLink = linkCell?.querySelector('a[href]');
  const href = properties.viewAllLink || toDestination(authoredLink?.getAttribute('href'));
  if (href) {
    const explore = document.createElement('p');
    explore.className = 'table-list-explore';
    const link = document.createElement('a');
    link.href = href;
    link.textContent = properties.viewAllTitle || getText(authoredLink)
      || t('viewAll', DEFAULTS.viewAllTitle);
    decorateButton(link, { view: 'link' });
    explore.append(link);
    header.append(explore);
  }

  return header;
}

function createTags(cells) {
  const tags = document.createElement('div');
  tags.className = 'table-list-tags';
  cells.forEach((cell) => {
    const text = getText(cell);
    if (!text) return;
    const tag = document.createElement('span');
    tag.className = 'table-list-tag';
    tag.textContent = text;
    moveInstrumentation(cell, tag);
    tags.append(tag);
  });
  return tags.children.length ? tags : null;
}

/**
 * Builds the arrow-only card action: a labelled link, or a decorative arrow without a link.
 * The arrow itself is drawn in CSS.
 * @param {Element} cell Authored page-reference cell
 * @param {string} title Card title, for the accessible name
 * @returns {HTMLElement} Arrow action wrapper
 */
function createCardAction(cell, title) {
  const wrapper = document.createElement('div');
  wrapper.className = 'table-list-link';

  const destination = getPageReference(cell);
  const action = document.createElement(destination ? 'a' : 'span');
  action.className = 'table-list-arrow';
  if (destination) {
    action.href = destination;
    action.setAttribute('aria-label', t('exploreItem', 'Explore {title}', { title: title || t('card', 'card') }));
  } else {
    action.setAttribute('aria-hidden', 'true');
  }

  wrapper.append(action);
  return wrapper;
}

/** replaces an authored cell with a new element holding its text and its instrumentation */
function fromCell(cell, tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = getText(cell);
  if (cell) moveInstrumentation(cell, element);
  return element;
}

function decorateCard(row, index, { showTags, variation }) {
  const [numberCell, titleCell, descriptionCell, pageReferenceCell, ...tagCells] = row.children;

  const number = fromCell(numberCell, 'span', 'table-list-number');
  if (!number.textContent) number.textContent = String(index + 1).padStart(2, '0');

  const title = fromCell(titleCell, 'h3', 'table-list-title');
  const titleGroup = document.createElement('div');
  titleGroup.className = 'table-list-title-group';
  titleGroup.append(title);

  const descriptionGroup = document.createElement('div');
  descriptionGroup.className = 'table-list-description-group';
  const tags = showTags && variation === 'title-right' ? createTags(tagCells.slice(0, 2)) : null;
  if (tags) descriptionGroup.append(tags);
  descriptionGroup.append(fromCell(descriptionCell, 'p', 'table-list-description'));

  const action = createCardAction(pageReferenceCell, title.textContent);

  // the row is kept, so its Universal Editor instrumentation stays in place
  row.className = 'table-list-card';
  row.replaceChildren(number, titleGroup, descriptionGroup, action);
  return row;
}

function buildTable(cards, display) {
  const showTitle = display !== 'description';
  const showDescription = display !== 'title';

  const table = document.createElement('table');
  table.className = 'table-list-table';

  const headerRow = document.createElement('tr');
  [
    ['number', 'Number'],
    showTitle && ['title', 'Title'],
    showDescription && ['description', 'Description'],
    ['link', 'Link'],
  ].filter(Boolean).forEach(([key, fallback]) => {
    const th = document.createElement('th');
    th.scope = 'col';
    const label = t(`${key}Column`, fallback);
    // the link column has no visible header
    if (key === 'link') th.append(createHiddenText(label));
    else th.textContent = label;
    headerRow.append(th);
  });
  const thead = document.createElement('thead');
  thead.append(headerRow);

  const tbody = document.createElement('tbody');
  cards.forEach((card) => {
    const row = document.createElement('tr');
    moveInstrumentation(card, row);

    const sources = [
      card.querySelector('.table-list-number'),
      showTitle && card.querySelector('.table-list-title'),
      showDescription && card.querySelector('.table-list-description'),
    ].filter((source) => source !== false);

    sources.forEach((source) => {
      const td = document.createElement('td');
      td.textContent = getText(source);
      if (source) moveInstrumentation(source, td);
      row.append(td);
    });

    const actionCell = document.createElement('td');
    const link = card.querySelector('a.table-list-arrow');
    if (link) {
      // keeps the aria-label, the link's only accessible name
      const actionLink = link.cloneNode(true);
      actionLink.classList.add('table-list-table-link');
      actionCell.append(actionLink);
    }
    row.append(actionCell);
    tbody.append(row);
  });

  table.append(thead, tbody);
  const scroller = document.createElement('div');
  scroller.className = 'table-list-table-scroll';
  scroller.append(table);
  return scroller;
}

/**
 * Reveals the cards with the chosen motion as they scroll into view. Skipped in the
 * Universal Editor and for reduced motion, where the cards are always shown.
 */
function observeMotion(block, motionType) {
  const cards = [...block.querySelectorAll('.table-list-card')];
  if (motionType === 'none' || !cards.length || !('IntersectionObserver' in window)) return;
  if (isEditing() || prefersReducedMotion()) return;

  block.classList.add('motion-ready');
  cards.forEach((card) => onVisible(card, () => card.classList.add('is-visible'), { threshold: 0.15 }));
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  t = await getPlaceholders();
  const { properties, contentRows, hasVariationConfig } = readBlockConfig(block);

  const existingVariation = VALID_VARIATIONS
    .find((variation) => variation && block.classList.contains(variation)) || '';
  const variation = hasVariationConfig ? properties.variations : existingVariation;

  const headerRow = contentRows.find((row) => row.children.length === 2);
  const cardRows = contentRows.filter((row) => row.children.length >= 4);

  block.classList.remove(...VALID_VARIATIONS.filter(Boolean));
  if (variation) block.classList.add(variation);
  block.classList.add(
    `card-${properties.cardColor}`,
    `motion-${properties.motionType}`,
    `display-${properties.display}`,
  );
  if (properties.showTags) block.classList.add('show-tags');

  const header = createHeader(properties, headerRow);

  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'table-list-cards';
  const cards = cardRows
    .slice(0, properties.maxCards)
    .map((row, index) => decorateCard(row, index, { showTags: properties.showTags, variation }));
  cardsContainer.append(...cards);

  if (variation === 'featured-industry') cards[0]?.classList.add('table-list-card-featured');

  block.replaceChildren(header);
  if (properties.view === 'table' && cards.length) {
    block.classList.add('view-table');
    block.append(buildTable(cards, properties.display));
  } else {
    block.append(cardsContainer);
    observeMotion(block, properties.motionType);
  }
}
