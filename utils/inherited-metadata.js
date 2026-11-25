/**
 * Inherited metadata utils: page properties that child pages inherit from their parent pages,
 * like AEM's inherited page properties. Edge Delivery publishes each page with its own metadata
 * only, so the nearest parent page (up to the locale's Home page) that sets a value is looked
 * up: its published HTML head is loaded and read. Used for the Navigation (nav), Footer
 * (footer) and 404 Page (error-page) page properties. On a 404 page, the missing page has no
 * properties, so the lookup starts at its nearest existing parent.
 *
 * Parent pages are loaded in parallel, once per page and URL, and their values are cached for
 * the browser session (a changed parent property shows in a new session).
 */
import { getMetadata } from '../scripts/aem.js';
import { getParentPages, pageUrlForms } from './site.js';

/** the metadata names that are inherited: Navigation, Footer and 404 Page */
export const INHERITED_METADATA = ['nav', 'footer', 'error-page'];

// v2: root pages are also read at their own path (pageUrlForms); a session's empty values for a
// root page read before must not stay cached
const CACHE_KEY = 'tcs-inherited-metadata-v2';
const pages = new Map();

function readCache() {
  try {
    return JSON.parse(sessionStorage.getItem(CACHE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeCache(url, values) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ...readCache(), [url]: values }));
  } catch {
    // storage unavailable or full: values are loaded again next time
  }
}

/**
 * The head of a page's HTML: the response is read only up to </head> and the rest of the download
 * is cancelled (the metadata is all that's needed; a page is often 10 times its head).
 * @param {Response} response
 * @returns {Promise<string>}
 */
async function headOf(response) {
  const reader = response.body?.getReader?.();
  if (!reader) return response.text();
  const decoder = new TextDecoder();
  const read = async (html) => {
    const { done, value } = await reader.read();
    if (done) return html + decoder.decode();
    const next = html + decoder.decode(value, { stream: true });
    const end = next.indexOf('</head>');
    if (end < 0) return read(next);
    reader.cancel().catch(() => {});
    return next.slice(0, end + '</head>'.length);
  };
  return read('');
}

/**
 * The head of a page from the first of its URL forms that loads (a root page is published as its
 * folder's index or at its own path, see pageUrlForms): the next form is requested only when the
 * one before is missing, so a site publishing the expected form makes one request.
 * @param {string[]} forms
 * @returns {Promise<string>} '' when none loads
 */
async function fetchFirstPage(forms) {
  // eslint-disable-next-line no-restricted-syntax
  for (const form of forms) {
    // eslint-disable-next-line no-await-in-loop
    const response = await fetch(form);
    if (response.ok) return headOf(response);
  }
  return '';
}

/** the inherited metadata of a page as { nav, footer, error-page }; empty for a missing page */
function loadPageMetadata(url) {
  if (!pages.has(url)) {
    const cached = readCache()[url];
    pages.set(url, cached ? Promise.resolve(cached) : fetchFirstPage(pageUrlForms(url))
      .then((html) => {
        const { head } = new DOMParser().parseFromString(html, 'text/html');
        const values = Object.fromEntries(INHERITED_METADATA.map((name) => [
          name, head.querySelector(`meta[name="${name}"]`)?.content.trim() || '',
        ]));
        writeCache(url, values);
        return values;
      })
      .catch(() => ({})));
  }
  return pages.get(url);
}

/**
 * The value of an inherited metadata: the page's own (page properties, or a column of the bulk
 * metadata sheet), else the nearest parent page's up to the locale's Home page, else ''.
 * @param {string} name e.g. nav or footer
 * @returns {Promise<string>}
 */
export async function getInheritedMetadata(name) {
  const own = getMetadata(name);
  if (own) return own;
  const parents = await Promise.all(getParentPages().map(loadPageMetadata));
  return parents.find((values) => values[name])?.[name] || '';
}
