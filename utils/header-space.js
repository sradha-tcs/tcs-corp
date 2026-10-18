/**
 * Header space utils: the height the header takes once loaded (the logo bar, with the header
 * Canvas when the nav page has one), remembered per breakpoint, so the next pages reserve exactly
 * that space before the header loads and nothing moves when it arrives (no layout shift). Without
 * a remembered height, styles/styles.css reserves the TCS Header with its Canvas
 * (--header-reserved).
 */
import { currentBreakpoint } from './viewport.js';

const key = () => `header-height-${currentBreakpoint()}`;

/** reserves the remembered header height (on <html>, --header-reserved), if there is one */
export function reserveHeaderSpace() {
  try {
    const rem = parseFloat(localStorage.getItem(key()));
    if (rem > 0) document.documentElement.style.setProperty('--header-reserved', `${rem}rem`);
  } catch {
    // no storage (private mode): the CSS default stays
  }
}

/**
 * Remembers the loaded header's height for the current breakpoint.
 * @param {Element} header
 */
export function rememberHeaderSpace(header) {
  try {
    const rem = header.offsetHeight / 16;
    if (rem > 0) localStorage.setItem(key(), String(rem));
  } catch {
    // no storage: nothing to remember
  }
}
