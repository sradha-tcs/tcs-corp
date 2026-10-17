/**
 * Query index utils: the published pages and their metadata (helix-query.yaml, /query-index.json),
 * loaded once per page and read the same way in every block. Rows of the current locale site.
 */
import { indexRoot } from './site.js';

const INDEX = '/query-index.json';
const PAGE_SIZE = 500;
const YES = ['yes', 'true', '1', 'on', 'y'];

let pages;

/** a multi-value column: a JSON array, or a comma-separated list */
export function listOf(value) {
  if (Array.isArray(value)) return value;
  const text = String(value || '').trim();
  if (text.startsWith('[')) {
    try {
      return JSON.parse(text);
    } catch {
      // not JSON: a list
    }
  }
  return text.split(',').map((item) => item.trim()).filter(Boolean);
}

const numberOf = (value) => {
  const number = parseFloat(value);
  return Number.isNaN(number) ? null : number;
};

const isYes = (value) => YES.includes(String(value || '').trim().toLowerCase());

/** a metadata column name (e.g. featured-image) as the index names it (featuredImage) */
const columnName = (name) => String(name || '').trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());

/**
 * A page of the index with its metadata columns.
 * @typedef {Object} IndexedPage
 * @property {string} path
 * @property {string} title
 * @property {string} description
 * @property {string} image the og:image path
 * @property {string[]} tags tag IDs
 * @property {string} pageType
 * @property {string} contentType
 * @property {string} publishDate
 * @property {string} readingTime
 * @property {string} thumbnailImage
 * @property {string} featuredImage
 * @property {string} author
 * @property {string} authorId
 * @property {boolean} featured the featured column (or feature-card)
 * @property {number|null} priority the priority column (or featured-priority)
 * @property {number} lastModified
 * @property {Object<string, string>} row every column of the page, by its index name
 */
/**
 * The tags of an index row: the article:tag column and the cq-tags column (the page's Tags as
 * AEM publishes them: one comma-separated meta).
 * @param {Object<string, string>} row
 * @returns {string[]} tag IDs
 */
export function tagsOf(row) {
  return [...new Set([...listOf(row.tags), ...listOf(row.cqTags)])];
}

function toPage(row) {
  const tags = tagsOf(row);
  return {
    path: row.path,
    title: row.title || '',
    description: row.description || '',
    image: row.image || '',
    tags,
    pageType: row.pageType || '',
    contentType: row.contentType || '',
    publishDate: row.publishDate || '',
    readingTime: row.readingTime || '',
    thumbnailImage: row.thumbnailImage || '',
    featuredImage: row.featuredImage || '',
    author: row.author || '',
    authorId: row.authorId || '',
    featured: isYes(row.featured) || isYes(row.featureCard),
    priority: numberOf(row.priority) ?? numberOf(row.featuredPriority),
    lastModified: Number(row.lastModified) || 0,
    row: { ...row, tags },
  };
}

/**
 * A column of a page by its metadata name (e.g. featured-image, content-type or path).
 * @param {IndexedPage} page
 * @param {string} name
 * @returns {*} the value, or ''
 */
export function columnOf(page, name) {
  const key = columnName(name);
  return page.row[key] ?? page.row[name] ?? page[key] ?? '';
}

async function fetchAll() {
  const rows = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    // eslint-disable-next-line no-await-in-loop
    const resp = await fetch(`${INDEX}?offset=${offset}&limit=${PAGE_SIZE}`);
    if (!resp.ok) break;
    // eslint-disable-next-line no-await-in-loop
    const json = await resp.json();
    rows.push(...(json.data || []));
    if (!json.data?.length || rows.length >= (json.total || 0)) break;
  }
  return rows;
}

/** an image path of a loaded page: same-origin images by path, others by URL */
function imagePath(src, pageUrl) {
  if (!src) return '';
  const url = new URL(src, pageUrl);
  return url.origin === new URL(pageUrl).origin ? `${url.pathname}${url.search}` : url.href;
}

/**
 * An index row read from a page's HTML, as helix-query.yaml reads it: every named meta by its
 * column name (page-type → pageType, cq-tags → cqTags), og:title, description, og:image and the
 * article:tag metas; without them (as AEM author renders a page), the title, first heading and
 * first image of the page.
 * @param {Document} doc
 * @param {string} path the page path the row is for
 * @param {string} pageUrl the page's URL, to resolve its image
 * @returns {Object<string, string>}
 */
export function rowOfDocument(doc, path, pageUrl) {
  const row = { path };
  doc.head.querySelectorAll('meta[name]').forEach((meta) => {
    row[columnName(meta.name)] = meta.content.trim();
  });
  const property = (name) => doc.head.querySelector(`meta[property="${name}"]`)?.content.trim() || '';
  row.title = property('og:title') || doc.title.trim() || doc.querySelector('h1')?.textContent.trim() || '';
  row.description = row.description || property('og:description');
  const src = property('og:image') || doc.querySelector('main img[src]')?.getAttribute('src');
  row.image = imagePath(src, pageUrl);
  row.tags = [...doc.head.querySelectorAll('meta[property="article:tag"]')]
    .map((meta) => meta.content.trim()).filter(Boolean).join(', ');
  return row;
}

const loaded = new Map();

/**
 * Pages the index doesn't have, read from their own HTML: in the editor (AEM author has no query
 * index) or a page not indexed yet. Loaded in parallel, once per page; a page that fails to load
 * is left out.
 * @param {string[]} paths page paths (AEM or published, e.g. /content/tcs-corp/us/en/x.html)
 * @returns {Promise<IndexedPage[]>} with the paths as given
 */
export async function getPagesAt(paths) {
  const rows = await Promise.all([...new Set(paths)].map((path) => {
    if (!loaded.has(path)) {
      const url = new URL(path, window.location.href).href;
      loaded.set(path, fetch(url)
        .then((response) => (response.ok ? response.text() : Promise.reject(response.status)))
        .then((html) => rowOfDocument(new DOMParser().parseFromString(html, 'text/html'), path, url))
        .catch(() => null));
    }
    return loaded.get(path);
  }));
  return rows.filter(Boolean).map(toPage);
}

/**
 * The pages of the current locale site (its published path, e.g. /de-de/...; for the language
 * master under review, its own tree, see REVIEW_ROOTS), loaded once and cached in memory.
 * @returns {Promise<IndexedPage[]>} empty when the index isn't available (e.g. in the editor)
 */
export async function getPages() {
  pages = pages || fetchAll().catch(() => []);
  const root = indexRoot();
  return (await pages)
    .filter((row) => row.path && (!root || row.path === root || row.path.startsWith(`${root}/`)))
    .map(toPage);
}
