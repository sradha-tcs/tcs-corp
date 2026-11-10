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
const MIN_HEADER_HEIGHTS = { mobile: 5.625, tablet: 7.75, desktop: 7.75 };
const OVERLAY_KEY = 'header-overlay-v1';
const OVERLAYS = ['always', 'never'];
const POSITION_KEY = 'header-position-v1';
const POSITION_VIEWS_KEY = 'header-position-views-v1';
const POSITION_VIEWS = ['desktop', 'tablet', 'mobile'];

function applyPosition(mode, views = {}) {
  document.documentElement.dataset.headerPosition = mode === 'float' ? 'float' : 'sticky';
  POSITION_VIEWS.forEach((view) => {
    const attribute = `headerPosition${view[0].toUpperCase()}${view.slice(1)}`;
    const position = views?.[view];
    if (position === 'float' || position === 'sticky') {
      document.documentElement.dataset[attribute] = position;
    } else {
      delete document.documentElement.dataset[attribute];
    }
  });
}

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
    const breakpoint = currentBreakpoint();
    const rem = parseFloat(localStorage.getItem(key()));
    if (rem > 0) {
      const height = Math.max(rem, MIN_HEADER_HEIGHTS[breakpoint]);
      document.documentElement.style.setProperty('--header-reserved', `${height}rem`);
    }
    applyOverlay(localStorage.getItem(OVERLAY_KEY));
    const position = localStorage.getItem(POSITION_KEY);
    applyPosition(position);
    try {
      applyPosition(position, JSON.parse(localStorage.getItem(POSITION_VIEWS_KEY)));
    } catch {
      localStorage.removeItem(POSITION_VIEWS_KEY);
    }
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

export function setHeaderPosition(mode, views = {}) {
  applyPosition(mode, views);
  try {
    localStorage.setItem(POSITION_KEY, mode === 'float' ? 'float' : 'sticky');
    const positions = Object.fromEntries(POSITION_VIEWS
      .filter((view) => ['float', 'sticky'].includes(views?.[view]))
      .map((view) => [view, views[view]]));
    localStorage.setItem(POSITION_VIEWS_KEY, JSON.stringify(positions));
  } catch {
    // no storage: applied to this page only
  }
}
