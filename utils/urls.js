/**
 * URLs utils: convert AEM content paths into the paths the site serves.
 */
import { toPublishedPath } from './site.js';

/**
 * Converts an AEM content path to the path the site serves (following the locale mappings
 * of paths.json, e.g. /content/tcs-corp/de/de-de/about.html: /de-de/about); other URLs pass
 * through.
 * @param {string} path An AEM path or URL
 * @returns {string}
 */
// eslint-disable-next-line import/prefer-default-export
export function toSitePath(path) {
  if (!path) return '';
  try {
    const url = new URL(path, window.location.href);
    if (url.origin !== window.location.origin) return url.href;
    const pathname = toPublishedPath(url.pathname.replace(/\.html$/, '')) || '/';
    return `${pathname}${url.search}${url.hash}`;
  } catch {
    return path;
  }
}

/**
 * decodeURIComponent that never throws: a malformed escape (e.g. #%E0 in a shared link) keeps
 * the raw value instead of breaking the page or the block that reads it
 * @param {string} value
 * @returns {string}
 */
export function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
