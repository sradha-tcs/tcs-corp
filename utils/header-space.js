/**
 * Header space utils: the height the header takes once loaded (the logo bar; a header Canvas lies
 * on the hero and takes no header space), remembered per breakpoint, so the next pages reserve
 * exactly that space before the header loads and nothing moves when it arrives (no layout shift).
 * Without a remembered height, styles/styles.css reserves the logo bar (--header-reserved).
 *
 * The header over the first block (TCS Header option Header over the first block): the
 * mode is <html data-header-overlay> ('always', 'never'; none: automatic, over an opening light
 * Hero), which styles/styles.css needs before the header loads. It is remembered too, so the next
 * pages lay the page out for it from the start; a visitor's first page has the automatic layout
 * until the header loads.
 */
import { currentBreakpoint } from './viewport.js';

// v2: heights remembered before the header Canvas left the header's flow included the Canvas
const key = () => `header-height-v2-${currentBreakpoint()}`;
const OVERLAY_KEY = 'header-overlay-v1';
const OVERLAYS = ['always', 'never'];

function applyOverlay(mode) {
  if (OVERLAYS.includes(mode)) document.documentElement.dataset.headerOverlay = mode;
  else delete document.documentElement.dataset.headerOverlay;
}

/**
 * reserves the remembered header height (on <html>, --header-reserved), if there is one, and
 * applies the remembered header overlay mode
 */
export function reserveHeaderSpace() {
  try {
    const rem = parseFloat(localStorage.getItem(key()));
    if (rem > 0) document.documentElement.style.setProperty('--header-reserved', `${rem}rem`);
    applyOverlay(localStorage.getItem(OVERLAY_KEY));
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

/**
 * Applies the header overlay mode (on <html>, data-header-overlay) and remembers it.
 * @param {string} mode 'always', 'never', or anything else for automatic
 */
export function setHeaderOverlay(mode) {
  applyOverlay(mode);
  try {
    if (OVERLAYS.includes(mode)) localStorage.setItem(OVERLAY_KEY, mode);
    else localStorage.removeItem(OVERLAY_KEY);
  } catch {
    // no storage: applied to this page only
  }
}
