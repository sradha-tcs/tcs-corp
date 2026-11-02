/* eslint-disable */
/* global WebImporter */

/**
 * List (blocks/list, key-value, template name "List") for "In the News" (press releases) and
 * "Related reading" (blogs).
 *
 * In the News: div.relatedContent inside the media contacts fragment (h2.related-section-title
 * and four hand-picked press release cards). The cards are dropped: the block lists the latest
 * press releases from the query index by tag. The values are constant, copied verbatim from the
 * approved reference (migration-work/pilot/reference.plain.html).
 *
 * Related reading: div.staticRelatedContent (h3.related-section-title and a slider of
 * hand-picked cards: a.static-related-content-slide-a with href, target _blank,
 * p.static-related-content-title, an optional span.static-related-content-date-text label such
 * as "Blog" and a thumbnail as a CSS background). A Fixed list with one List Item per card: Page
 * or link (the tcs.com URL, as the other imported links), Open in a new tab, Title and Eyebrow;
 * a slide without a link or title is left out. The thumbnails are tcs.com DAM files, not assets
 * of this site, so the cards have no images (showImage false, as In the News, whose presentation
 * values it shares).
 *
 * md2jcr maps the rows of a key-value block by POSITION (row n = the n-th field group of the
 * model, tabs and classes_* left out), not by the key text. So the block has one row per field
 * group of the "list" model, in model order, with an empty value where the reference sets
 * nothing; AEM leaves empty properties out of the delivered block, so the published block has
 * exactly the reference's rows in the reference's order. Each row is a single cell (key, then
 * value), see row(). Keep FIELDS in step with blocks/list/_list.json (npm run build:json).
 */

/** the field groups of the "list" model, in model order (as md2jcr groups them) */
const FIELDS = [
  'title', 'description', 'link', 'listLabel', 'source', 'pageItems', 'parentPath',
  'parentUseCurrentPage', 'directChildrenOnly', 'childDepth', 'rootPath', 'tagsUseCurrentPage',
  'tags', 'tagMatch', 'includeDescendants', 'maxDepth', 'orderBy', 'sortOrder', 'maxItems',
  'displayAsTeaser', 'cardStyle', 'cardTheme', 'imageRatio', 'panelHeight', 'featureFirst',
  'featureShowAuthor', 'linkItems', 'openInNewTab', 'showImage', 'showEyebrow', 'showTags',
  'showDescription', 'showDate', 'dateFormat', 'showContentLabel', 'showCta', 'imageLoading',
  'desktopMode', 'desktopColumns', 'desktopGap', 'desktopVisible', 'desktopCardWidth',
  'desktopControls', 'desktopIndicator', 'tabletMode', 'tabletColumns', 'tabletGap',
  'tabletVisible', 'tabletCardWidth', 'tabletControls', 'tabletIndicator', 'mobileMode',
  'mobileColumns', 'mobileGap', 'mobileVisible', 'mobileCardWidth', 'mobileControls',
  'mobileIndicator', 'equalHeight', 'stretchCards', 'scrollSnap', 'snapAlign', 'hideScrollbar',
  'mouseDrag', 'keyboardScrolling', 'scrollStep', 'loop', 'initialIndex', 'edgePadding',
  'emptyBehavior', 'emptyMessage', 'analyticsEnabled',
];

/** the field groups of the "list-item" model, in model order (the first ones a card sets) */
const ITEM_FIELDS = ['link', 'newTab', 'headline', 'summary', 'image', 'eyebrow'];

/** In the News: the reference's rows (values as HTML), in the reference's (= model) order */
const VALUES = {
  title: '<h2>In the News</h2>',
  source: 'tags',
  rootPath: '<a href="/language-master/en/who-we-are/newsroom/press-release">/content/tcs-corp/language-master/en/who-we-are/newsroom/press-release</a>',
  tagsUseCurrentPage: 'false',
  tags: '<ul><li>tcs-corp:content-type/press-release</li></ul>',
  includeDescendants: 'true',
  orderBy: 'lastModified',
  sortOrder: 'descending',
  maxItems: '4',
  displayAsTeaser: 'true',
  cardStyle: 'image',
  imageRatio: '16-9',
  panelHeight: 'portrait',
  linkItems: 'true',
  showImage: 'false',
  showEyebrow: 'false',
  showTags: 'false',
  showDescription: 'false',
  showDate: 'true',
  dateFormat: 'dd-mmm-yy',
  showCta: 'true',
  imageLoading: 'lazy',
  desktopMode: 'grid',
  desktopColumns: '4',
  tabletMode: 'horizontal-scroll',
  tabletColumns: '4',
  tabletVisible: '2.5',
  mobileMode: 'horizontal-scroll',
  mobileColumns: '1',
  mobileVisible: '1.2',
  mobileIndicator: 'true',
  scrollSnap: 'true',
  emptyBehavior: 'hide',
  analyticsEnabled: 'true',
};

/** Related reading: In the News's presentation, a fixed list of cards with their eyebrow */
const RELATED_VALUES = {
  ...VALUES,
  source: 'fixed',
  rootPath: '',
  tagsUseCurrentPage: '',
  tags: '',
  includeDescendants: '',
  orderBy: 'manual',
  sortOrder: 'ascending',
  maxItems: '',
  showEyebrow: 'true',
  showDate: 'false',
  desktopColumns: '3',
};

const norm = (s) => (s || '').replace(/[\s\u00a0]+/g, ' ').trim();

/**
 * One single-cell row per field group: the key as a paragraph, then the value.
 * The List takes child items (List Items), so md2jcr (1.5.10, docs/container-blocks.md) reads
 * one-cell rows as the parent's property rows (in model order) and any row of two or more cells
 * as a List Item; in key-value mode it skips the first node of the row (the key). Two-cell
 * key / value rows would turn every row into a bogus List Item. A List Item row has a cell per
 * field group of the "list-item" model, in model order (ITEM_FIELDS, no tab cells; trailing empty
 * cells left out).
 */
function row(document, key, html) {
  const keyEl = document.createElement('p');
  keyEl.textContent = key;
  const value = document.createElement('div');
  value.innerHTML = html || '';
  return [[keyEl, ...value.childNodes]];
}

/** Related reading: the title row and a List Item per card */
function relatedReading(element, document) {
  const title = document.createElement('h2');
  title.textContent = norm(element.querySelector('.related-section-title, h2, h3')?.textContent)
    || 'Related reading';
  const values = { ...RELATED_VALUES, title: title.outerHTML };
  const cells = FIELDS.map((key) => row(document, key, values[key]));
  element.querySelectorAll('a.static-related-content-slide-a').forEach((card) => {
    const href = card.getAttribute('href');
    const headline = norm(card.querySelector('.static-related-content-title')?.textContent);
    if (!href || !headline) return;
    const link = document.createElement('a');
    link.href = href;
    link.textContent = href;
    const item = {
      link,
      newTab: card.getAttribute('target') === '_blank' ? 'true' : '',
      headline,
      eyebrow: norm(card.querySelector('.static-related-content-date-text')?.textContent),
    };
    cells.push(ITEM_FIELDS.map((key) => item[key] || ''));
  });
  return cells;
}

export default function parse(element, { document }) {
  const cells = element.matches('.staticRelatedContent')
    ? relatedReading(element, document)
    : FIELDS.map((key) => row(document, key, VALUES[key]));
  const block = WebImporter.Blocks.createBlock(document, { name: 'list', cells });
  element.replaceWith(block);
}
