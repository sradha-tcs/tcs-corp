/**
 * Cards data: the authored Card items as the card model of the card list decorator (shared
 * with the List block), without the DOM structure (unit tested in test/cards). A card's content
 * is authored in the card itself (no page lookup): image, eyebrow, title, description, label,
 * tags, date, content type, reading time, link and call to action, style and colour.
 */
import {
  CARD_KINDS, CARD_THEMES, isExternal, isSafeUrl, isYes, text, toISODate,
} from '../../utils/card-list-config.js';
import { formatDate } from '../../utils/dates.js';

/**
 * The cells of a Card row as AEM delivers them, in the order of the card model: a cell per field
 * (image alt and link text fold into the image and link cells) and an empty cell per dialog tab
 * (null)
 */
export const CARD_LAYOUT = [null, 'image', 'eyebrow', 'title', 'titleSize', 'text', 'subtitle',
  'tags', 'date', 'contentLabel', 'readingTime', null, 'link', 'ctaLabel', 'newTab', 'cta1',
  'cta1Style', 'cta1Target', 'cta2', 'cta2Style', 'cta2Target', null, 'kind', 'theme',
  'analyticsLabel', 'ariaLabel'];

/** the cells of a Card rendered before it had CTA 1 / CTA 2 and Title size (pages not
 * previewed again since) */
export const CARD_LAYOUT_BEFORE_CTAS = CARD_LAYOUT.filter((field) => !/^cta\d|^titleSize$/.test(field || ''));

/** CTA Style: Secondary Button by default (an empty value isn't delivered) */
export const CTA_STYLES = ['secondary', 'secondary-no-arrow', 'primary', 'primary-no-arrow', 'tertiary'];

/** Title size: 96px, 48px or a heading size (H1 to H6) */
export const TITLE_SIZES = ['96', '48', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

/**
 * The CTA buttons of a card (CTA 1, CTA 2): those with a safe link, with their label (CTA Title,
 * else the link's text), style and target.
 * @param {Object[]} ctas [{ href, label, style, target, ref }]
 * @param {string} origin the page origin (external links)
 */
export function ctasOf(ctas = [], origin = '') {
  return ctas.map((cta) => {
    const url = text(cta.href);
    if (!url || !isSafeUrl(url)) return null;
    const style = text(cta.style).toLowerCase();
    return {
      url,
      label: text(cta.label) || url,
      style: CTA_STYLES.includes(style) ? style : 'secondary',
      newWindow: text(cta.target).toLowerCase() === 'new-window',
      external: isExternal(url, origin),
      ref: cta.ref || null,
    };
  }).filter(Boolean);
}

/**
 * The card of an authored item.
 * @param {Object} item the item's values ({ href, title, body, image, ... }; body: the
 *   description's element, rich text)
 * @param {Object} config normalizePresentation() of the block
 * @param {{ id: string, index: number, origin?: string }} context the block's component id,
 *   the item's position (0-based) and the page origin (external links)
 * @returns {Object|null} null for an item without content or with an unsafe link
 */
export function itemToCard(item, config, { id, index, origin = '' }) {
  const href = text(item.href);
  if (href && !isSafeUrl(href)) return null;
  const title = text(item.title);
  const hasBody = !!item.body?.textContent?.trim();
  if (!title && !hasBody && !item.image) return null;
  const dateISO = toISODate(item.date);
  const newTab = text(item.newTab);
  return {
    id: `${id}-item-${index + 1}`,
    sourceType: 'manual',
    sourcePath: href.startsWith('/') ? href : '',
    url: href,
    title,
    // the text of the rich text (the analytics title of a card without one)
    description: text(hasBody ? item.body.textContent : item.description).replace(/\s+/g, ' '),
    body: hasBody ? item.body : null,
    image: text(item.image),
    imageAlt: text(item.imageAlt),
    picture: item.picture || null,
    eyebrow: text(item.eyebrow),
    tagIds: item.tags || [],
    tags: [],
    dateISO,
    date: dateISO ? formatDate(dateISO, config.dateFormat).text : '',
    lastModified: 0,
    contentType: text(item.contentType),
    readingTime: text(item.readingTime),
    authorId: '',
    subtitle: text(item.subtitle),
    kind: CARD_KINDS.includes(text(item.kind).toLowerCase()) ? text(item.kind).toLowerCase() : '',
    theme: CARD_THEMES.includes(text(item.theme).toLowerCase()) ? text(item.theme).toLowerCase() : '',
    ctaLabel: text(item.ctaLabel),
    openInNewTab: newTab === '' ? config.openInNewTab : isYes(newTab),
    external: isExternal(href, origin),
    analyticsLabel: text(item.analyticsLabel),
    accessibilityLabel: text(item.accessibilityLabel),
    ctas: ctasOf(item.ctas, origin),
    titleSize: TITLE_SIZES.includes(text(item.titleSize).toLowerCase()) ? text(item.titleSize).toLowerCase() : '',
    ref: item.ref || null,
  };
}

/**
 * The cards of the authored items, in the authored order (no sorting or deduplication: the
 * author chose them).
 * @param {Object[]} items
 * @param {Object} config
 * @param {{ id: string, origin?: string }} context
 */
export function buildManualCards(items, config, { id, origin = '' }) {
  return items.map((item, index) => itemToCard(item, config, { id, index, origin }))
    .filter(Boolean)
    // ids follow the shown cards (1, 2, ...)
    .map((card, i) => ({ ...card, id: `${id}-item-${i + 1}` }));
}
