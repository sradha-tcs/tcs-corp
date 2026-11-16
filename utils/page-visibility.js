/**
 * Page visibility utils: the page properties Hide Header, Hide Footer and Hide Conversation
 * Canvas (models/_page.json; or the metadata sheet's hide-header, hide-footer and hide-canvas
 * columns), published as <meta name="hide-header" content="true">. Each applies to its own page
 * only (not inherited by child pages); empty, false or any other value shows the part.
 *
 * scripts.js marks the hidden parts on <html> (data-hide-header, data-hide-footer,
 * data-hide-canvas) in the eager phase, before the page is shown, and doesn't load a hidden
 * header or footer; the Conversation Canvas takes a hidden Canvas as one with Hide block on.
 */

/** the part of the page each toggle hides, and its metadata (page property / sheet column) name */
export const PAGE_PARTS = {
  header: 'hide-header',
  footer: 'hide-footer',
  canvas: 'hide-canvas',
};

const YES = ['yes', 'true', '1', 'on', 'y'];

/**
 * Whether a toggle value is on: true, yes, on, 1 or y (any case), as AEM publishes a boolean
 * page property (true) or an author types it in the metadata sheet.
 * @param {*} value
 * @returns {boolean}
 */
export const isOn = (value) => YES.includes(String(value ?? '').trim().toLowerCase());

/** reads a <meta name> of the page, as getMetadata (aem.js) does */
const readMeta = (name) => [...document.head.querySelectorAll(`meta[name="${name}"]`)]
  .map((meta) => meta.content).join(', ');

/**
 * The parts of the page its toggles hide.
 * @param {(name: string) => string} [read] reads a metadata value by name (the page's <meta>)
 * @returns {{header: boolean, footer: boolean, canvas: boolean}}
 */
export function hiddenParts(read = readMeta) {
  return Object.fromEntries(Object.entries(PAGE_PARTS)
    .map(([part, name]) => [part, isOn(read(name))]));
}

/**
 * Whether the page hides a part: 'header', 'footer' or 'canvas'.
 * @param {'header'|'footer'|'canvas'} part
 * @param {(name: string) => string} [read]
 * @returns {boolean}
 */
export const pageHides = (part, read = readMeta) => !!PAGE_PARTS[part]
  && isOn(read(PAGE_PARTS[part]));

/**
 * Marks the hidden parts on <html> (data-hide-header, data-hide-footer, data-hide-canvas) for
 * styles/styles.css, before the page is shown: a hidden header keeps no space (no layout shift).
 * @param {{header: boolean, footer: boolean, canvas: boolean}} hidden
 */
export function markHiddenParts(hidden) {
  Object.keys(PAGE_PARTS).forEach((part) => {
    document.documentElement.toggleAttribute(`data-hide-${part}`, !!hidden[part]);
  });
}
