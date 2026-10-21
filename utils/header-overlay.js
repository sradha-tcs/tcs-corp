/**
 * Header over hero utils: the contract between the opening Hero (blocks/hero) and the site header
 * (blocks/header, with the nav page's TCS Header block, blocks/tcs-header). The hero says whether
 * the header lies over it with its data-header-over attribute (all widths, or desktop only); the
 * CSS of the header and the hero reads that attribute (styles/styles.css, blocks/header,
 * blocks/tcs-header, blocks/hero). A TCS Header set to Solid marks the header so no hero puts it
 * over itself. Pure, apart from the two DOM helpers at the end.
 */

/** the hero's attribute and its values */
export const HEADER_OVER = 'data-header-over';
export const OVER_ALL = 'all';
export const OVER_DESKTOP = 'desktop';

/** the header's attribute set by a Solid TCS Header (never over a hero) */
export const HEADER_MODE = 'data-header-mode';
export const SOLID = 'solid';

/** the Hero's Placement values (classes) and its BG Colors the header never lies over */
export const PAGE_START = 'page-start';
export const BELOW_HEADER = 'below-header';
export const DARK_BACKGROUNDS = ['bg-dark', 'bg-dark-subtle', 'bg-black'];

/**
 * Whether the header lies over a hero, and at which widths.
 * - Page start: at every width; Automatic (no Placement): on desktop, as before the option;
 *   Below header: never.
 * - Only the hero that opens the page (in its first section), only with a light BG Color (the
 *   header's logos are dark artwork), and never when the header is Solid.
 * @param {Object} hero
 * @param {string} [hero.placement] '', 'page-start' or 'below-header'
 * @param {boolean} [hero.dark] the hero has a dark BG Color
 * @param {boolean} [hero.opening] the hero is in the page's first section
 * @param {boolean} [hero.strictOpening] the hero is the first content of the page
 * @param {boolean} [solid] the header is Solid (TCS Header)
 * @returns {{ mode: '' | 'all' | 'desktop', reason: string }} reason: why Page start doesn't apply
 */
export function headerOverMode({
  placement = '', dark = false, opening = false, strictOpening = false,
} = {}, solid = false) {
  if (placement === BELOW_HEADER) return { mode: '', reason: '' };
  if (placement === PAGE_START) {
    if (solid) return { mode: '', reason: 'the TCS Header is Solid' };
    if (dark) return { mode: '', reason: 'with a dark BG Color' };
    if (!strictOpening) return { mode: '', reason: 'unless the hero opens the page' };
    return { mode: OVER_ALL, reason: '' };
  }
  // Automatic: as before the option (any light hero in the first section, on desktop)
  if (solid || dark || !opening) return { mode: '', reason: '' };
  return { mode: OVER_DESKTOP, reason: '' };
}

/** whether the page's header is Solid (set by a TCS Header with Header over hero Solid) */
export function isHeaderSolid(doc = document) {
  return doc.querySelector(`header[${HEADER_MODE}="${SOLID}"]`) !== null;
}

/**
 * Makes the header Solid: no hero puts it over itself (the heroes already decorated drop their
 * attribute; those decorated later, e.g. in Universal Editor, read isHeaderSolid).
 * @param {Element} header The <header> element
 * @returns {number} how many heroes had the header over them
 */
export function setHeaderSolid(header) {
  header.setAttribute(HEADER_MODE, SOLID);
  const heroes = [...header.ownerDocument.querySelectorAll(`main .hero[${HEADER_OVER}]`)];
  heroes.forEach((hero) => hero.removeAttribute(HEADER_OVER));
  return heroes.length;
}
