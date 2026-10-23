/**
 * Card list config utils: the presentation settings shared by the blocks that show cards from
 * the TCS DS Figma List variations (List, Cards), without the DOM (unit tested). The fields are
 * the shared groups of models/_card-list.json; the rendering is decorators/card-list-decorator.js.
 */

export const CARD_STYLES = ['image', 'panel', 'report', 'stat', 'mixed'];
export const CARD_KINDS = ['image', 'panel', 'report', 'stat'];
export const CARD_THEMES = ['dark', 'navy', 'brand', 'brand-light', 'grey', 'mid-grey', 'gradient', 'image'];
export const IMAGE_RATIOS = ['16-9', '1-1', '4-3', '3-2'];
export const PANEL_HEIGHTS = ['auto', 'portrait', 'compact'];
export const DATE_FORMATS = ['dd-mmm-yy', 'dd-mm-yyyy', 'mm-dd-yyyy', 'mmm-d-yyyy', 'dd/mm/yy',
  'do-mmmm-yyyy'];
export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
export const BREAKPOINTS = ['desktop', 'tablet', 'mobile'];
export const DISPLAY_MODES = ['grid', 'horizontal-scroll'];
export const STYLE_OPTIONS = ['stat-compact', 'dividers', 'header-center'];
export const YES = ['yes', 'true', '1', 'on', 'y'];

/** responsive defaults (TCS DS Figma List variations: 1440 / 1024 / 402 frames) */
export const RESPONSIVE_DEFAULTS = {
  desktop: {
    mode: 'grid', columns: 4, gap: 24, visible: 4.2, cardWidth: 0, controls: false, indicator: false,
  },
  tablet: {
    mode: 'grid', columns: 4, gap: 24, visible: 3.3, cardWidth: 0, controls: false, indicator: false,
  },
  mobile: {
    mode: 'grid', columns: 1, gap: 16, visible: 1.2, cardWidth: 0, controls: false, indicator: true,
  },
};

/** the presentation property names (normalized: lower case, no dashes), to tell property rows */
export const PRESENTATION_PROPERTIES = [
  // header
  'title', 'titletype', 'description', 'link', 'linktext', 'linktype', 'listlabel', 'componentid',
  // cards
  'displayasteaser', 'cardstyle', 'cardtheme', 'imageratio', 'panelheight', 'featurefirst',
  'linkitems', 'openinnewtab', 'showimage', 'showeyebrow', 'showtags', 'showdescription',
  'showdate', 'dateformat', 'showcta', 'imageloading',
  // layout and scroll
  ...BREAKPOINTS.flatMap((bp) => ['mode', 'columns', 'gap', 'visible', 'cardwidth', 'controls', 'indicator']
    .map((key) => `${bp}${key}`)),
  'equalheight', 'stretchcards', 'scrollsnap', 'snapalign', 'hidescrollbar', 'mousedrag',
  'touchswipe', 'keyboardscrolling', 'scrollstep', 'loop', 'initialindex', 'edgepadding',
  'reducedmotion',
  // advanced
  'emptybehavior', 'emptymessage', 'analyticsenabled', 'classes',
];

export const text = (value) => String(value ?? '').trim();
export const isYes = (value) => YES.includes(text(value).toLowerCase());
export const pickValue = (value, allowed, fallback) => {
  const v = text(value).toLowerCase();
  return allowed.includes(v) ? v : fallback;
};
export const flag = (value, fallback) => (text(value) === '' ? fallback : isYes(value));
export const number = (value, fallback, { min = -Infinity, max = Infinity } = {}) => {
  const n = parseFloat(value);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};
export const integer = (value, fallback, range) => Math.round(number(value, fallback, range));

/** a path as the index lists it: no .html, query or hash, no trailing slash but the root's */
/**
 * The label of a content type (content-type metadata, e.g. case-study): the taxonomy label of its
 * tag (…:content-type/case-study) when the card has it, else the value in words (Case study).
 * @param {string} contentType
 * @param {string[]} tagIds the card's tag IDs
 * @param {Map<string, string>} labels tag labels by ID
 */
export function contentTypeLabel(contentType, tagIds = [], labels = new Map()) {
  const value = text(contentType);
  if (!value) return '';
  const tag = tagIds.find((id) => id.endsWith(`content-type/${value}`));
  const words = value.replace(/[-_]+/g, ' ');
  return labels.get(tag) || `${words.charAt(0).toUpperCase()}${words.slice(1)}`;
}

export const normalizePath = (path) => text(path).replace(/[?#].*$/, '').replace(/\.html$/, '')
  .replace(/(.)\/$/, '$1');

/** a safe, DOM id: letters, digits, - and _, starting with a letter (else the prefix is added) */
export function toSafeId(value, prefix = 'list') {
  const id = text(value).toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');
  if (!id) return '';
  return /^[a-z]/.test(id) ? id : `${prefix}-${id}`;
}

/** a short stable hash (djb2, base 36) */
export function hash(value) {
  let h = 5381;
  [...String(value)].forEach((c) => {
    h = ((h * 33) ^ c.charCodeAt(0)) >>> 0; // eslint-disable-line no-bitwise
  });
  return h.toString(36);
}

/** a link that can be rendered: http(s), mailto, tel, or a path; never javascript: or data: */
export function isSafeUrl(href) {
  const value = text(href);
  if (!value) return false;
  if (/^(https?:|mailto:|tel:)/i.test(value)) return true;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return false;
  return /^(\/|\.\.?\/|#|\?|[\w-])/.test(value);
}

/** whether a link leaves the site */
export const isExternal = (href, origin = '') => /^https?:\/\//i.test(href)
  && (!origin || !href.toLowerCase().startsWith(origin.toLowerCase()));

/** a date (YYYY-MM-DD, an ISO date-time or a timestamp in seconds) as YYYY-MM-DD, or '' */
export function toISODate(value) {
  const v = text(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
  if (/^\d{9,13}$/.test(v)) {
    const ms = v.length > 10 ? Number(v) : Number(v) * 1000;
    const date = new Date(ms);
    return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
  }
  return '';
}

/**
 * The card kind (Card style), the first that applies:
 * 1. the item's own Card style (List Item, Card; source-generated cards have none)
 * 2. the list's Card style, unless Mixed (by page): a style forces every card
 * 3. the page's card-style metadata (card.pageKind: the linked or listed page's)
 * 4. automatic: report for Report pages, panel for pages without an image, image otherwise
 * Unknown values are skipped, so a card always gets a supported kind.
 * @param {Object} card { kind, pageKind, contentType, image }
 * @param {string} cardStyle the list's Card style
 * @returns {string} one of CARD_KINDS
 */
export function kindOf(card, cardStyle) {
  if (CARD_KINDS.includes(card.kind)) return card.kind;
  if (CARD_KINDS.includes(cardStyle)) return cardStyle;
  if (CARD_KINDS.includes(card.pageKind)) return card.pageKind;
  if (/report/i.test(card.contentType)) return 'report';
  return card.image ? 'image' : 'panel';
}

/**
 * The card colour (Card colour), the first that applies:
 * 1. the item's own Card colour (List Item, Card)
 * 2. the list's Card colour
 * 3. the page's card-theme metadata (card.pageTheme)
 * 4. '': the default colour of the card's style
 * Unknown values are skipped (no class is made from them).
 * @param {Object} card { theme, pageTheme }
 * @param {string} cardTheme the list's Card colour
 * @returns {string} one of CARD_THEMES, or ''
 */
export function themeOf(card, cardTheme) {
  return [card.theme, cardTheme, card.pageTheme].find((theme) => CARD_THEMES.includes(theme)) || '';
}

/**
 * The presentation of one card: the list's (or Cards') Show options with the card's own Display
 * toggles (List Item: Hide Title, Show Description / Image / Eyebrow / Label / Action Label).
 * Show Action Label off always removes the call to action, also with Hide Title on (the renderer
 * then keeps a linked card's title visible as its one link).
 * @param {Object} card { title, display }
 * @param {Object} config the list's presentation (normalizePresentation)
 * @returns {Object} the configuration for this card
 */
export function cardDisplay(card, config) {
  const own = card.display || {};
  return {
    ...config,
    showImage: config.showImage && own.showImage !== false,
    showEyebrow: config.showEyebrow && own.showEyebrow !== false,
    showDescription: config.showDescription && own.showDescription !== false,
    // a card's own Show Description off hides it on text cards too
    ownDescription: own.showDescription !== false,
    showCta: config.showCta && own.showActionLabel !== false,
    showLabel: own.showLabel !== false,
    titleHidden: !!own.titleHidden && !!card.title,
  };
}

/**
 * The text of a card's call to action: none when the card's call to action is off (cardDisplay),
 * else its Call to action label, else the default of its kind (e.g. Explore for panels).
 * @param {Object} card { ctaLabel }
 * @param {{ showCta: boolean }} display from cardDisplay()
 * @param {string} kind one of CARD_KINDS
 * @param {Object<string, string>} [defaults] the default labels by kind
 * @returns {string} '' for no call to action
 */
export function cardActionLabel(card, display, kind, defaults = {}) {
  if (!display.showCta) return '';
  return text(card.ctaLabel) || defaults[kind] || '';
}

/**
 * Normalizes the authored presentation properties (lower-case keys, text values): missing or
 * invalid values get their defaults, so a configuration never breaks rendering.
 * @param {Object<string, string>} raw
 * @param {{ idPrefix?: string }} [options] the prefix of ids that don't start with a letter
 * @returns {Object}
 */
export function normalizePresentation(raw = {}, { idPrefix = 'list' } = {}) {
  const get = (key) => raw[key];
  const responsive = {};
  BREAKPOINTS.forEach((bp) => {
    const d = RESPONSIVE_DEFAULTS[bp];
    const cardWidth = number(get(`${bp}cardwidth`), 0, { min: 0, max: 1200 });
    responsive[bp] = {
      mode: pickValue(get(`${bp}mode`), DISPLAY_MODES, d.mode),
      columns: integer(get(`${bp}columns`), d.columns, { min: 1, max: 6 }),
      gap: number(get(`${bp}gap`), d.gap, { min: 0, max: 120 }),
      visible: number(get(`${bp}visible`), d.visible, { min: 1, max: 8 }),
      cardWidth: cardWidth >= 120 ? cardWidth : 0,
      controls: flag(get(`${bp}controls`), d.controls),
      indicator: flag(get(`${bp}indicator`), d.indicator),
    };
  });
  return {
    componentId: toSafeId(get('componentid'), idPrefix),
    emptyMessage: text(get('emptymessage')),
    linkItems: flag(get('linkitems'), true),
    showDescription: flag(get('showdescription'), true),
    showDate: flag(get('showdate'), true),
    dateFormat: pickValue(get('dateformat'), DATE_FORMATS, 'dd-mmm-yy'),
    displayAsTeaser: flag(get('displayasteaser'), true),
    showImage: flag(get('showimage'), true),
    showEyebrow: flag(get('showeyebrow'), true),
    showTags: flag(get('showtags'), true),
    showCta: flag(get('showcta'), true),
    openInNewTab: flag(get('openinnewtab'), false),
    imageLoading: pickValue(get('imageloading'), ['lazy', 'eager'], 'lazy'),
    analytics: flag(get('analyticsenabled'), true),
    listLabel: text(get('listlabel')),
    cardStyle: pickValue(get('cardstyle'), CARD_STYLES, 'image'),
    cardTheme: pickValue(get('cardtheme'), ['', ...CARD_THEMES], ''),
    imageRatio: pickValue(get('imageratio'), IMAGE_RATIOS, '16-9'),
    panelHeight: pickValue(get('panelheight'), PANEL_HEIGHTS, 'portrait'),
    featureFirst: flag(get('featurefirst'), false),
    styleOptions: text(get('classes')).split(',').map(text).filter((name) => STYLE_OPTIONS.includes(name)),
    // responsive
    responsive,
    snap: flag(get('scrollsnap'), true),
    snapAlign: pickValue(get('snapalign'), ['start', 'center'], 'start'),
    hideScrollbar: flag(get('hidescrollbar'), true),
    drag: flag(get('mousedrag'), true),
    swipe: flag(get('touchswipe'), true),
    keyboard: flag(get('keyboardscrolling'), true),
    step: pickValue(get('scrollstep'), ['one-card', 'viewport'], 'one-card'),
    loop: flag(get('loop'), false),
    initialIndex: integer(get('initialindex'), 0, { min: 0, max: 200 }),
    edge: pickValue(get('edgepadding'), ['bleed', 'none'], 'bleed'),
    reducedMotion: flag(get('reducedmotion'), true),
    equalHeight: flag(get('equalheight'), false),
    stretch: flag(get('stretchcards'), true),
  };
}
