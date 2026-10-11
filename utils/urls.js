/**
 * URLs utils: convert AEM content paths into the paths the site serves.
 */

// AEM publishes page links as /content/<site>/path(.html); the site serves them as /path
const CONTENT_ROOT = /^\/content\/(?!dam\/)[^/]+(?=\/|$)/;

/**
 * Converts an AEM content path to the path the site serves; other URLs pass through.
 * @param {string} path An AEM path or URL
 * @returns {string}
 */
// eslint-disable-next-line import/prefer-default-export
export function toSitePath(path) {
  if (!path) return '';
  try {
    const url = new URL(path, window.location.href);
    if (url.origin !== window.location.origin) return url.href;
    const pathname = url.pathname.replace(CONTENT_ROOT, '').replace(/\.html$/, '') || '/';
    return `${pathname}${url.search}${url.hash}`;
  } catch {
    return path;
  }
}
