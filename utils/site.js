/**
 * Site utils: the TCS Corporate site structure. Each locale site (country / language, e.g.
 * /us/en) holds its pages and its own references, error pages and data:
 *
 *   /us/en/                       Home (index) and the content pages
 *   /us/en/references/            Header (nav), Footer (footer) and other fragments
 *   /us/en/error-pages/           404, 403, 500
 *   /us/en/placeholders.json      UI text (Key, Text, Description, Category)
 *   /us/en/taxonomy.json          tag titles
 *   /us/en/metadata, redirects    bulk metadata and redirects (paths.json maps them to the root)
 *   /us/en/data/*.json            authors, locations, partners, social-links, media-contacts
 *
 * Pages outside a locale (e.g. site-global-templates, block-library) use the default locale.
 */

export const DEFAULT_LOCALE = { country: 'us', language: 'en' };

// the site prefix of AEM author paths (/content/<site>), not present on the published site
const CONTENT_ROOT = /^\/content\/(?!dam\/)[^/]+(?=\/|$)/;
// /{country}/{language}, e.g. /us/en or /ch/de-ch
const LOCALE_PATH = /^\/([a-z]{2})\/([a-z]{2}(?:-[a-z]{2})?)(?=\/|$)/i;

/**
 * The locale site of a page.
 * @param {string} [pathname] defaults to the current page
 * @returns {{ country: string, language: string, root: string, contentRoot: string }}
 *   root is the site path of the locale (e.g. /us/en); contentRoot the AEM author prefix
 *   (e.g. /content/tcs-corp) when editing, otherwise ''
 */
export function getLocale(pathname = window.location.pathname) {
  const contentRoot = pathname.match(CONTENT_ROOT)?.[0] || '';
  const match = pathname.slice(contentRoot.length).match(LOCALE_PATH);
  const country = (match?.[1] || DEFAULT_LOCALE.country).toLowerCase();
  const language = (match?.[2] || DEFAULT_LOCALE.language).toLowerCase();
  return {
    country, language, root: `/${country}/${language}`, contentRoot,
  };
}

/**
 * The path of a page in the current locale, e.g. references/nav: /us/en/references/nav
 * (/content/tcs-corp/us/en/references/nav when editing in AEM).
 * @param {string} path relative to the locale root
 */
export function localePagePath(path) {
  const { root, contentRoot } = getLocale();
  return `${contentRoot}${root}/${path.replace(/^\//, '')}`;
}

/**
 * The URL of a spreadsheet of the current locale, e.g. placeholders: /us/en/placeholders.json
 * @param {string} name the sheet path relative to the locale root, without .json
 */
export function localeSheetPath(name) {
  return `${getLocale().root}/${name.replace(/^\//, '')}.json`;
}

/**
 * The rows of a spreadsheet JSON; for a multi-sheet JSON (e.g. a taxonomy with translated
 * titles) the given sheet, or the default one.
 * @param {Object} json
 * @param {string} [sheet]
 * @returns {Object[]}
 */
export function sheetRows(json, sheet) {
  if (!json) return [];
  if (json[':type'] === 'multi-sheet') {
    return (json[sheet] || json.default || json[json[':names']?.[0]])?.data || [];
  }
  return json.data || [];
}
