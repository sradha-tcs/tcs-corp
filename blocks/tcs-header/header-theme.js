/**
 * Header logo theme, without the DOM (unit tested: test/tcs-header/header-theme.test.mjs): whether
 * the TCS and TATA logos are white (dark: a dark background behind the header) or black (light),
 * from what lies behind the header bar. tcs-header.js measures the page and sets
 * <html data-header-theme>.
 */

export const DARK_CLASSES = ['bg-dark', 'bg-dark-subtle', 'bg-dark-green', 'bg-black', 'dark',
  'bg-charcoal-80', 'bg-navy-60', 'bg-charcoal-40'];
export const LIGHT_CLASSES = ['bg-light', 'bg-grey', 'bg-white', 'light', 'highlight'];

/** at or above this the bar's own background (scroll progress or alpha) is white enough */
export const OPAQUE = 0.6;

/**
 * A CSS colour (rgb() / rgba(), as getComputedStyle returns it) as { r, g, b, a }, or null.
 * @param {string} color
 */
export function parseColor(color) {
  const parts = String(color || '').match(/rgba?\(([^)]+)\)/i)?.[1]
    .split(/[\s,/]+/).filter(Boolean).map((p) => (p.endsWith('%') ? parseFloat(p) / 100 : parseFloat(p)));
  if (!parts || parts.length < 3 || parts.slice(0, 3).some(Number.isNaN)) return null;
  const [r, g, b, a = 1] = parts;
  return {
    r, g, b, a: Number.isNaN(a) ? 1 : a,
  };
}

/** the relative luminance of a colour, 0 (black) to 1 (white) */
export const luminance = ({ r, g, b }) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;

/**
 * 'dark' or 'light' from an element's classes and background colour, or '' when neither says
 * (no theme class, a background with alpha 0.1 or less)
 * @param {{ classes?: string[], color?: string }} element
 */
export function themeOfElement({ classes = [], color = '' } = {}) {
  if (classes.some((name) => DARK_CLASSES.includes(name))) return 'dark';
  if (classes.some((name) => LIGHT_CLASSES.includes(name))) return 'light';
  const rgba = parseColor(color);
  if (rgba && rgba.a > 0.1) return luminance(rgba) < 0.5 ? 'dark' : 'light';
  return '';
}

/**
 * The header theme, the first that applies:
 * 1. light while the menu is open, with Header over the first block Never, or once the bar has
 *    turned (nearly) white (scroll progress or its background alpha 0.6 and up)
 * 2. the opening block of the section behind the bar (e.g. a Hero), then that section: their
 *    theme classes, else their background colour's luminance
 * 3. dark when that section has a Hero without a light class, else light
 * @param {Object} state
 * @param {boolean} [state.menuOpen]
 * @param {string} [state.overlay] <html data-header-overlay>
 * @param {number} [state.progress] the bar's --header-scroll-progress (0 to 1)
 * @param {string} [state.barColor] the bar's computed background colour
 * @param {{ classes?: string[], color?: string }} [state.block] the section's opening block
 * @param {{ classes?: string[], color?: string }} [state.section] the section behind the bar
 * @param {boolean} [state.hasHero] whether that section has a Hero
 * @returns {'dark'|'light'}
 */
export function headerTheme({
  menuOpen = false, overlay = '', progress = 0, barColor = '', block = null, section = null,
  hasHero = false,
} = {}) {
  if (menuOpen || overlay === 'never') return 'light';
  if (progress >= OPAQUE || (parseColor(barColor)?.a ?? 0) >= OPAQUE) return 'light';
  const theme = themeOfElement(block || {}) || themeOfElement(section || {});
  if (theme) return theme;
  return hasHero ? 'dark' : 'light';
}
