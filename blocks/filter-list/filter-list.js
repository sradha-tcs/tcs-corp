import { buildAuthorLockup } from '../../decorators/article-meta-decorator.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { buildTime } from '../../decorators/date-decorator.js';
import { buildHeading } from '../../decorators/heading-decorator.js';
import { createIconButton } from '../../decorators/icon-button-decorator.js';
import { buildImage } from '../../decorators/responsive-image-decorator.js';
import { getAuthors } from '../../utils/data.js';
import { isEditing } from '../../utils/environment.js';
import { uniqueId } from '../../utils/ids.js';
import { readMultifieldItems } from '../../utils/multifield.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import {
  isOn, readProperties, textOf,
} from '../../utils/properties.js';
import { getPages } from '../../utils/query-index.js';
import { readTagValues } from '../../utils/tags.js';
import { resolveTags } from '../../utils/taxonomy.js';

/*
 * Filter List (blocks/filter-list/_filter-list.json, TCS DS Figma "Explore the Agentic bank" /
 * "Explore insights & opinions"): the pages of the locale site (query index) with any tag of
 * the Filters, as cards; each filter (Tag title and Tags) shows the pages with its tags.
 * Everything on the cards comes from the pages' metadata:
 * - standard card: image, tags and reading time, title, content type and publish date
 * - report card (content type Report): content type and date, title, description, Download
 * - dark card (no image): first tag, title, description, Explore
 * - feature card (feature-card = yes, ranked by featured-priority): a large horizontal card
 *   with the image behind tags, reading time, title and author (Authors sheet)
 * Cards show a page at a time (Cards per page) with Load more; the feature cards go after,
 * before, or before and after each page (Feature cards).
 */

const POSITIONS = ['after', 'before', 'both'];
const MAX_CARD_TAGS = 2;
const CARD_IMAGE = [{ media: '(min-width: 900px)', width: '600' }, { width: '750' }];
const FEATURE_IMAGE = [{ media: '(min-width: 900px)', width: '1600' }, { width: '750' }];

/** the Filters multifield: a Tag title and its tags per item */
function readFilters(cell) {
  return readMultifieldItems(cell).map((item) => {
    const elements = item.length === 1 && item[0].tagName === 'LI' ? [...item[0].children] : item;
    const [labelEl, ...rest] = elements;
    const tagsCell = document.createElement('div');
    tagsCell.append(...rest.map((el) => el.cloneNode(true)));
    return { label: textOf(labelEl), tags: readTagValues(tagsCell) };
  }).filter(({ label, tags }) => label && tags.length);
}

const byDate = (a, b) => (b.publishDate || '').localeCompare(a.publishDate || '')
  || b.lastModified - a.lastModified;
const byPriority = (a, b) => (a.featuredPriority ?? Infinity) - (b.featuredPriority ?? Infinity)
  || byDate(a, b);

const element = (tagName, className, text) => {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
};

/** a row of labels separated by bars, e.g. BANKING | SUPPLY CHAIN | 16m */
function labelRow(className, values) {
  const items = values.filter(Boolean);
  if (!items.length) return null;
  const row = element('p', className);
  items.forEach((value) => {
    row.append(typeof value === 'string' ? element('span', '', value) : value);
  });
  return row;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const t = await getPlaceholders();
  const filters = readFilters(props.filters);
  const showAll = !props.showall || isOn(props.showall);
  const perPage = Math.max(1, parseInt(textOf(props.cardsperpage), 10) || 8);
  const position = POSITIONS.find((value) => value === textOf(props.featuredposition)) || 'after';
  const id = uniqueId('filter-list');
  // tag labels (taxonomy) and authors (Authors sheet), loaded with the pages
  let labels = new Map();
  let authors = new Map();

  const tagsOf = (page) => page.tags.slice(0, MAX_CARD_TAGS).map((tag) => labels.get(tag) || tag);
  const readingOf = (page) => (/^\d+$/.test(page.readingTime)
    ? t('minutesShort', '{n}m', { n: page.readingTime }) : page.readingTime);

  // the card's title links to the page; the whole card is clickable
  const titleLink = (page, level = 'h3') => {
    const heading = element(level, 'filter-list-card-title');
    const a = element('a', 'filter-list-card-link', page.title);
    a.href = page.path;
    heading.append(a);
    return heading;
  };

  function standardCard(page) {
    const card = element('article', 'filter-list-card');
    const picture = buildImage({ src: page.thumbnailImage || page.image, alt: '' }, CARD_IMAGE);
    if (picture) {
      const media = element('div', 'filter-list-card-media');
      media.append(picture);
      card.append(media);
    }
    card.append(...[
      labelRow('filter-list-card-tags', [...tagsOf(page), readingOf(page)]),
      titleLink(page),
      labelRow('filter-list-card-meta', [page.contentType, buildTime(page.publishDate, 'dd-mmm-yy')]),
    ].filter(Boolean));
    return card;
  }

  /** report (content type Report) and dark (no image) cards: their link is a button */
  function textCard(page, report) {
    const card = element('article', `filter-list-card ${report ? 'filter-list-card-report' : 'filter-list-card-dark'}`);
    const eyebrow = report
      ? labelRow('filter-list-card-tags', [page.contentType, buildTime(page.publishDate, 'dd-mmm-yy')])
      : labelRow('filter-list-card-tags', tagsOf(page).slice(0, 1));
    const link = element('a', '', report ? t('download', 'Download') : t('explore', 'Explore'));
    link.href = page.path;
    link.setAttribute('aria-label', `${link.textContent}: ${page.title}`);
    decorateButton(link, { view: 'button', type: report ? 'secondary' : 'tertiary' });
    const action = element('p', 'filter-list-card-action');
    action.append(link);
    card.append(...[
      eyebrow,
      element('h3', 'filter-list-card-title', page.title),
      page.description ? element('p', 'filter-list-card-description', page.description) : null,
      action,
    ].filter(Boolean));
    return card;
  }

  function featureCard(page) {
    const card = element('article', 'filter-list-card filter-list-card-feature');
    const picture = buildImage({ src: page.featuredImage || page.image || page.thumbnailImage, alt: '' }, FEATURE_IMAGE);
    if (picture) {
      const media = element('div', 'filter-list-card-media');
      media.append(picture);
      card.append(media);
    }
    const author = authors.get(page.authorId);
    const content = element('div', 'filter-list-card-content');
    content.append(...[
      labelRow('filter-list-card-tags', [...tagsOf(page), readingOf(page)]),
      titleLink(page),
      author ? buildAuthorLockup({
        picture: buildImage(author.image ? { src: author.image, alt: '' } : null),
        name: element('p', 'filter-list-author-name', author.name),
        designation: author.designation ? element('p', 'filter-list-author-designation', author.designation) : null,
        prefix: 'filter-list',
      }) : null,
    ].filter(Boolean));
    card.append(content);
    return card;
  }

  const cardOf = (page) => {
    if (/report/i.test(page.contentType)) return textCard(page, true);
    if (!page.thumbnailImage && !page.image) return textCard(page, false);
    return standardCard(page);
  };

  // header and filters
  const header = element('div', 'filter-list-header');
  const title = buildHeading(props.title, props.titletype, 'filter-list-title');
  if (title) header.append(title);

  const toolbar = element('div', 'filter-list-toolbar');
  const chips = element('div', 'filter-list-filters');
  chips.id = `${id}-filters`;
  chips.setAttribute('role', 'group');
  const filtersLabel = textOf(props.filterslabel) || t('filters', 'Filters');
  chips.setAttribute('aria-label', filtersLabel);
  const results = element('div', 'filter-list-results');
  results.id = `${id}-results`;
  results.setAttribute('aria-live', 'polite');
  const more = element('button', '', t('loadMore', 'Load more'));
  more.type = 'button';
  decorateButton(more, { view: 'button', type: 'secondary' });
  const moreWrapper = element('p', 'filter-list-more');
  moreWrapper.append(more);

  let candidates = [];
  // the selected filter's index; null: the results of every filter (All)
  let active = null;
  let pagesShown = 1;

  const emptyText = () => (isEditing() && !candidates.length
    ? t('filterListEditor', 'The results show on the published page, from the pages\' metadata.')
    : t('noResults', 'No results found.'));

  const render = () => {
    const tags = (active === null ? filters : [filters[active]]).flatMap((f) => f.tags);
    const matches = candidates.filter((page) => page.tags.some((tag) => tags.includes(tag)));
    const featured = matches.filter((page) => page.featureCard).sort(byPriority);
    const regular = matches.filter((page) => !page.featureCard).sort(byDate);
    const pageCount = Math.max(1, Math.ceil(regular.length / perPage));

    // the feature cards in their ranking, one before and / or after each page of cards
    const items = [];
    const nextFeature = () => {
      const page = featured.shift();
      return page ? featureCard(page) : null;
    };
    for (let n = 0; n < Math.min(pagesShown, pageCount); n += 1) {
      const cards = regular.slice(n * perPage, (n + 1) * perPage).map(cardOf);
      if (position === 'before' || (position === 'both' && n === 0)) items.push(nextFeature());
      items.push(...cards);
      if (position !== 'before') items.push(nextFeature());
    }
    results.replaceChildren(...items.filter(Boolean));
    if (!results.children.length) results.append(element('p', 'filter-list-empty', emptyText()));
    moreWrapper.hidden = pagesShown >= pageCount;
  };

  // the filters: All (Show All filter) and a chip per Tag title; selecting a chip again clears it
  const chipList = [
    ...(showAll ? [{ index: null, label: t('all', 'All') }] : []),
    ...filters.map((filter, index) => ({ index, label: filter.label })),
  ];
  const buttons = chipList.map(({ index, label }) => {
    const button = element('button', 'filter-list-filter', label);
    button.type = 'button';
    button.setAttribute('aria-controls', results.id);
    button.addEventListener('click', () => {
      active = active === index ? null : index;
      buttons.forEach((other, i) => {
        other.setAttribute('aria-pressed', String(chipList[i].index === active));
      });
      pagesShown = 1;
      render();
    });
    button.setAttribute('aria-pressed', String(index === active));
    return button;
  });
  chips.append(...buttons);

  // the funnel shows or hides the filters
  const toggle = createIconButton({
    label: t('filters', 'Filters'),
    icon: 'filter',
    className: 'filter-list-toggle',
    onClick: () => {
      toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') !== 'true'));
    },
  });
  toggle.setAttribute('aria-controls', chips.id);
  toggle.setAttribute('aria-expanded', 'true');
  toolbar.append(element('p', 'filter-list-label', filtersLabel), chips, toggle);
  if (filters.length) header.append(toolbar);

  more.addEventListener('click', () => {
    pagesShown += 1;
    render();
  });

  moreWrapper.hidden = true;
  block.replaceChildren(...[header.children.length ? header : null, results, moreWrapper]
    .filter(Boolean));

  // the results: pages of the locale with any tag of the filters, but this page
  const allTags = filters.flatMap((f) => f.tags);
  const [pages, authorRows] = await Promise.all([getPages(), getAuthors().catch(() => [])]);
  const here = window.location.pathname.replace(/\.html$/, '');
  candidates = pages.filter((page) => page.path !== here
    && page.tags.some((tag) => allTags.includes(tag)));
  const ids = [...new Set(candidates.flatMap((page) => page.tags))];
  labels = new Map((await resolveTags(ids)).map(({ id: tag, label }) => [tag, label]));
  authors = new Map(authorRows.map((author) => [author.id, author]));
  render();
}
