/*
 * Breadcrumb data (pure, unit tested in test/breadcrumb/): which parent pages the trail shows
 * and its items. The parent pages come from utils/site.js getParentPages (nearest first, the
 * locale's Home page last), their titles from the query index or the pages themselves.
 */

// Levels shown: how many parent levels, counting up from the current page (all: every one)
export const LEVELS = ['1', '2', '3', '4', '5'];

/**
 * The number of parent levels to show.
 * @param {string} value the authored Levels shown (all, or a value of LEVELS)
 * @returns {number} 0 for all
 */
export const levelsOf = (value) => (LEVELS.includes(String(value).trim()) ? Number(value) : 0);

/**
 * A page path as a lookup key: without query, hash, .html / .plain.html, /index or a trailing
 * slash (/en/ and /en/index are /en).
 * @param {string} path
 * @returns {string}
 */
export const pathKey = (path) => String(path || '')
  .replace(/[?#].*$/, '')
  .replace(/(\.plain)?\.html$/, '')
  .replace(/\/(index)?$/, '') || '/';

/**
 * The parent pages the trail shows, the farthest first: the nearest `levels` of them (all for 0).
 * @param {string[]} parents nearest first, as getParentPages returns them
 * @param {number} levels
 * @returns {string[]}
 */
export function trailOf(parents, levels) {
  const shown = levels > 0 ? parents.slice(0, levels) : parents;
  return [...shown].reverse();
}

/**
 * The items of the trail: a link per parent page that exists (has a title; the Home page is
 * always shown, labelled homeLabel), then the current page (no link) when given.
 * @param {Object} options
 * @param {string[]} options.trail parent page URLs, the farthest first (trailOf)
 * @param {string} options.home the Home page's URL (the last of getParentPages)
 * @param {(url: string) => string} options.titleOf a parent page's title, '' when it isn't found
 * @param {string} options.homeLabel e.g. Home
 * @param {string} [options.current] the current page's title; empty: not shown
 * @returns {{ label: string, href?: string, current?: boolean }[]}
 */
export function itemsOf({
  trail, home, titleOf, homeLabel, current,
}) {
  const items = trail
    .map((url) => ({ label: url === home ? homeLabel : titleOf(url), href: url }))
    .filter((item) => item.label);
  if (current) items.push({ label: current, current: true });
  return items;
}
