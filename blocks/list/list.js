import {
  applyCardListLayout, buildCardListHeader, buildCardListSkeleton, cardListId, renderCardList,
  renderCardListEmpty, renderEditorItems, trackCardList,
} from '../../decorators/card-list-decorator.js';
import { renderWhenLoaded } from '../../decorators/skeleton-decorator.js';
import { PRESENTATION_PROPERTIES, contentTypeLabel } from '../../utils/card-list-config.js';
import { matchCells, withoutTabCells } from '../../utils/cells.js';
import { getAuthors } from '../../utils/data.js';
import { isAuthor, isEditing } from '../../utils/environment.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { linkPathsOf } from '../../utils/links.js';
import { normalizeKey, textOf } from '../../utils/properties.js';
import { getPages, getPagesAt } from '../../utils/query-index.js';
import { loadRedirects, resolveRedirect } from '../../utils/redirects.js';
import { getLocale, pageLink, toPublishedPath } from '../../utils/site.js';
import { readTagValues } from '../../utils/tags.js';
import { resolveTags } from '../../utils/taxonomy.js';
import {
  HEADINGS, ITEM_DISPLAY, buildCards, itemLayoutFor, mergeFixedItems, normalizeConfig,
  normalizePath, showsFeatureAuthor, validateConfig,
} from './list-data.js';

/*
 * List (blocks/list/_list.json): the AEM Core List component for Edge Delivery Services, with
 * the TCS DS Figma List variations as its presentation. Sources: child pages of a page, a fixed
 * list of pages and links (List Item children, with overrides) or pages with tags; pages and
 * their metadata come from the query index, redirects from the redirects sheets (no repository
 * queries in the browser). The cards (image, panel, report, statistic, feature) or the list of
 * links, the grid or horizontal scroll per breakpoint and the data layer state come from the
 * card list decorator, shared with the Cards block (manually authored cards). The data side is
 * ./list-data.js; lists made before (a title and a CTA only) render as they did.
 */

const TEXT_CELL = (cell) => !cell.querySelector('a[href], picture, img');
const ITEM_MATCHERS = {
  link: (cell) => !!cell.querySelector('a[href]'),
  image: (cell) => !!cell.querySelector('picture, img'),
  newTab: (cell) => /^(true|false)$/i.test(textOf(cell)),
  kind: (cell) => /^(image|panel|report|stat)$/i.test(textOf(cell)),
  theme: (cell) => /^(dark|navy|brand|brand-light|grey|mid-grey|gradient|image)$/i.test(textOf(cell)),
};
['headline', 'summary', 'eyebrow', 'tags', 'subtitle', 'ctaLabel', 'analyticsLabel', 'ariaLabel']
  .forEach((field) => { ITEM_MATCHERS[field] = TEXT_CELL; });
// the Display toggles: true / false
ITEM_DISPLAY.forEach((field) => { ITEM_MATCHERS[field] = ITEM_MATCHERS.newTab; });

/** the block's property names (normalized), to tell property rows from item rows */
const PROPERTIES = new Set([...PRESENTATION_PROPERTIES, 'source', 'pageitems', 'pages', 'parentpath',
  'parentusecurrentpage', 'directchildrenonly', 'childdepth', 'rootpath', 'tagsusecurrentpage',
  'tags', 'tagmatch', 'includedescendants', 'maxdepth', 'orderby', 'sortorder', 'maxitems',
  'featureshowauthor', 'showcontentlabel']);
const PATH_PROPERTIES = ['parentpath', 'rootpath'];
const LIST_PROPERTIES = ['tags', 'classes'];
const debug = (...args) => {
  if (/[?&]debug=list\b/.test(window.location.search)) console.debug('[list]', ...args); // eslint-disable-line no-console
};

/** a link of this site as its path (and query); other links as they are */
function sitePath(href) {
  if (!/^https?:/i.test(href)) return href;
  const url = new URL(href);
  return url.origin === window.location.origin ? `${url.pathname}${url.search}` : href;
}

/** AEM author serves pages with their .html extension, which page paths leave out */
const withPageExtension = (path) => (/^\/content\/(?:[^?#]*\/)?[^/.?#]+$/.test(path) ? `${path}.html` : path);

/**
 * The text of a List Item link, unless it is the link itself (AEM renders a link without a text
 * as its path)
 */
function linkTextOf(a) {
  const label = a?.textContent.trim() || '';
  const href = a?.getAttribute('href') || '';
  return label && normalizePath(label) !== normalizePath(href) && !/^(\/|https?:)\S*$/.test(label)
    ? label : '';
}

/** a published page path from an aem-content value (a link or a path) */
function pathOf(cell) {
  const href = cell?.querySelector('a[href]')?.getAttribute('href') || textOf(cell);
  if (!href) return '';
  const path = /^https?:/i.test(href) ? new URL(href).pathname : href;
  return normalizePath(toPublishedPath(path));
}

/**
 * Reads the block: property rows (key | value), List Item rows and, for lists made before the
 * key-value model, the title and CTA rows. The fixed list's items are its Pages, merged with the
 * List Items (mergeFixedItems).
 * @param {Element} block
 */
export function readBlockConfig(block) {
  const rows = [...block.children];
  const props = {};
  const itemRows = [];
  rows.forEach((row) => {
    const model = row.dataset.aueModel;
    const cells = [...row.children];
    const key = cells.length === 2 ? normalizeKey(cells[0].textContent) : '';
    if (model === 'list-item' || (!model && !PROPERTIES.has(key))) itemRows.push(row);
    else if (key) [, props[key]] = cells;
  });
  const legacy = !Object.keys(props).length && rows.every((row) => row.children.length <= 1);
  const raw = {};
  Object.entries(props).forEach(([key, cell]) => {
    if (key === 'pageitems' || key === 'pages') return;
    if (PATH_PROPERTIES.includes(key)) raw[key] = pathOf(cell);
    else if (LIST_PROPERTIES.includes(key)) raw[key] = readTagValues(cell).join(',');
    else raw[key] = textOf(cell);
  });
  const listItems = legacy ? [] : itemRows.map((row) => {
    // rows rendered before the Display toggles were added have fewer cells
    const layout = itemLayoutFor(row.children.length);
    const fieldCells = withoutTabCells([...row.children], layout);
    const cells = matchCells(fieldCells, layout.filter(Boolean), ITEM_MATCHERS);
    const a = cells.link?.querySelector('a[href]');
    const href = a?.getAttribute('href') || '';
    const img = cells.image?.querySelector('img');
    const get = (field) => textOf(cells[field]);
    return {
      href,
      linkText: linkTextOf(a),
      title: get('headline'),
      description: get('summary'),
      image: img?.getAttribute('src') || '',
      imageAlt: img?.getAttribute('alt') || '',
      picture: cells.image?.querySelector('picture') || null,
      eyebrow: get('eyebrow'),
      tags: readTagValues(cells.tags),
      subtitle: get('subtitle'),
      ctaLabel: get('ctaLabel'),
      newTab: get('newTab').toLowerCase(),
      analyticsLabel: get('analyticsLabel'),
      accessibilityLabel: get('ariaLabel'),
      kind: get('kind').toLowerCase(),
      theme: get('theme').toLowerCase(),
      ...Object.fromEntries(ITEM_DISPLAY.map((field) => [field, get(field)])),
      ref: row,
    };
  }).filter((item) => item.href);
  // a page of Pages and a List Item for it are the same card, whether authored as AEM or
  // published paths
  const keyOf = (path) => normalizePath(toPublishedPath(sitePath(path)));
  // Pages as AEM paths (a value delivered as text isn't rewritten) are published paths on the
  // site; in the editor they stay AEM paths
  const { contentRoot } = getLocale();
  // Pages: a page per item (composite multifield); lists made before: the multi-value pages
  const pages = [...linkPathsOf(props.pageitems), ...linkPathsOf(props.pages)]
    .map((path) => (contentRoot ? path : toPublishedPath(path)));
  const items = legacy ? [] : mergeFixedItems(pages, listItems, keyOf);
  return {
    legacy,
    raw,
    props,
    items,
    itemRows: legacy ? [] : itemRows,
    heading: legacy ? block.querySelector(HEADINGS.join(',')) : null,
    legacyLink: legacy ? block.querySelector('a[href]') : null,
  };
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  if (block.dataset.listDecorated) return;
  block.dataset.listDecorated = 'true';

  const read = readBlockConfig(block);
  const config = normalizeConfig(read.raw);
  const t = await getPlaceholders();
  const id = cardListId(config, block, 'list');
  if (config.componentId && id !== config.componentId) debug(`component id "${config.componentId}" is used twice`);
  const { header, heading } = buildCardListHeader(read, { base: id });

  // lists made before: a title and a CTA only
  if (read.legacy) {
    block.classList.add('card-list', 'list-legacy');
    block.replaceChildren(...[header].filter(Boolean));
    return;
  }
  block.id = id;
  config.componentId = id;

  const warnings = validateConfig(config, { fixedCount: read.items.length });
  debug('config', config, warnings);
  const needsIndex = config.source !== 'fixed' || read.items.some((item) => item.href.startsWith('/'));
  const loaded = Promise.all([
    needsIndex ? getPages() : [],
    loadRedirects(),
    showsFeatureAuthor(config) ? getAuthors().catch(() => []) : [],
  ]);
  // laid out before the pages arrive, so the skeleton takes the list's grid / scroll layout
  applyCardListLayout(block, config);
  block.classList.add(`source-${config.source}`);

  // pages from the query index: a skeleton while it loads (decorators/skeleton-decorator.js)
  await renderWhenLoaded(block, {
    data: loaded,
    skeleton: () => buildCardListSkeleton(config, {
      title: !!heading,
      count: config.source === 'fixed' ? read.items.length : Infinity,
    }),
    render: async ([indexed, redirects, authorRows]) => {
      // List Item pages the index doesn't have (in the editor, AEM author has no query index) are
      // read from the pages themselves
      const known = new Set(indexed.map((page) => normalizePath(page.path)));
      const missing = read.items.map((item) => sitePath(item.href))
        .filter((path) => path.startsWith('/') && !known.has(normalizePath(path)))
        .map(withPageExtension);
      const pages = missing.length ? [...indexed, ...await getPagesAt(missing)] : indexed;
      const data = {
        pages,
        items: read.items,
        currentPath: normalizePath(toPublishedPath(window.location.pathname)),
        // on AEM author, links to the AEM pages
        resolveUrl: (path) => withPageExtension(pageLink(resolveRedirect(redirects, path))),
        origin: window.location.origin,
        lang: document.documentElement.lang,
      };
      let cards = buildCards(config, data);
      if (!cards.length && config.emptyBehavior === 'fallback' && config.source !== 'fixed') {
        cards = buildCards({ ...config, source: 'fixed' }, data);
      }
      const tagIds = [...new Set(cards.flatMap((card) => card.tagIds))];
      const labels = new Map((await resolveTags(tagIds)).map((tag) => [tag.id, tag.label]));
      cards.forEach((card) => {
        card.tags = card.tagIds.map((tag) => labels.get(tag) || tag);
        card.contentTypeLabel = contentTypeLabel(card.contentType, card.tagIds, labels);
      });
      debug('cards', cards);

      // in the editor, List Items without a card (e.g. one just added with Add, before it has a
      // link) are placeholders the author can select
      const editorItems = () => {
        if (!isEditing()) return;
        const hint = config.source === 'fixed'
          ? t('listItemEditorHint', 'This List Item isn’t shown yet: choose a page or a link in its Link tab.')
          : t('listItemSourceHint', 'List Items are shown when the List source is Fixed list.');
        renderEditorItems(block, read.itemRows, hint);
      };

      if (!cards.length) {
        const editing = isEditing();
        // on AEM author (no query index) the list says where its pages show, even when set to hide
        const author = isAuthor();
        if (config.emptyBehavior === 'hide' && !editing && !author) {
          block.replaceChildren();
          block.hidden = true;
          block.parentElement?.setAttribute('hidden', '');
          return;
        }
        let message = config.emptyMessage || t('listEmpty', 'There are no items to show.');
        if (editing && warnings.length) {
          message = t('listEditorHint', 'Set up the list in its properties: {problems}.', { problems: warnings.join(', ') });
        } else if ((editing || author) && config.source !== 'fixed' && !pages.length) {
          message = t('listEditorPages', 'The pages show on the published page (from the query index).');
        }
        renderCardListEmpty(block, header, message);
        editorItems();
        return;
      }

      const authors = new Map(authorRows.map((author) => [author.id, author]));
      renderCardList(block, {
        config, cards, header, heading, id, t, authors,
      });
      editorItems();
      if (config.analytics) {
        trackCardList(block, {
          id,
          type: 'tcs-corp/components/list',
          title: heading?.textContent.trim() || config.listLabel,
          cards,
          state: {
            'xdm:listSource': config.source,
            'xdm:variant': config.displayAsTeaser ? config.cardStyle : 'links',
          },
        });
      } else {
        block.dataset.analytics = 'off';
      }
    },
  });
}
