/* eslint-disable */
/* global WebImporter */

/**
 * List (blocks/list, key-value, template name "List") for "In the News".
 *
 * Source: div.relatedContent inside the media contacts fragment (h2.related-section-title and
 * four hand-picked press release cards). The cards are dropped: the block lists the latest
 * press releases from the query index by tag. The values are constant, copied verbatim from the
 * approved reference (migration-work/pilot/reference.plain.html).
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
  'linkItems', 'openInNewTab', 'showImage', 'showEyebrow', 'showTags', 'showDescription',
  'showDate', 'dateFormat', 'showCta', 'imageLoading', 'desktopMode', 'desktopColumns',
  'desktopGap', 'desktopVisible', 'desktopCardWidth', 'desktopControls', 'desktopIndicator',
  'tabletMode', 'tabletColumns', 'tabletGap', 'tabletVisible', 'tabletCardWidth',
  'tabletControls', 'tabletIndicator', 'mobileMode', 'mobileColumns', 'mobileGap',
  'mobileVisible', 'mobileCardWidth', 'mobileControls', 'mobileIndicator', 'equalHeight',
  'stretchCards', 'scrollSnap', 'snapAlign', 'hideScrollbar', 'mouseDrag', 'keyboardScrolling',
  'scrollStep', 'loop', 'initialIndex', 'edgePadding', 'emptyBehavior', 'emptyMessage',
  'analyticsEnabled',
];

/** the reference's rows (values as HTML), in the reference's (= model) order */
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

/**
 * One single-cell row per field group: the key as a paragraph, then the value.
 * The List takes child items (List Items), so md2jcr (1.5.10, docs/container-blocks.md) reads
 * one-cell rows as the parent's property rows (in model order) and any row of two or more cells
 * as a List Item; in key-value mode it skips the first node of the row (the key). Two-cell
 * key / value rows would turn every row into a bogus List Item.
 */
function row(document, key, html) {
  const keyEl = document.createElement('p');
  keyEl.textContent = key;
  const value = document.createElement('div');
  value.innerHTML = html || '';
  return [[keyEl, ...value.childNodes]];
}

export default function parse(element, { document }) {
  const cells = FIELDS.map((key) => row(document, key, VALUES[key]));
  const block = WebImporter.Blocks.createBlock(document, { name: 'list', cells });
  element.replaceWith(block);
}
