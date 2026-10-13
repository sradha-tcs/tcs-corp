/**
 * Query index utils: the published pages and their metadata (helix-query.yaml, /query-index.json),
 * loaded once per page and read the same way in every block. Rows of the current locale site.
 */
import { getLocale } from './site.js';

const INDEX = '/query-index.json';
const PAGE_SIZE = 500;
const YES = ['yes', 'true', '1', 'on', 'y'];

let pages;

/** a multi-value column: a JSON array, or a comma-separated list */
function listOf(value) {
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

/**
 * A page of the index with its metadata columns.
 * @typedef {Object} IndexedPage
 * @property {string} path
 * @property {string} title
 * @property {string} description
 * @property {string} image the og:image path
 * @property {string[]} tags tag IDs
 * @property {string} contentType
 * @property {string} publishDate
 * @property {string} readingTime
 * @property {string} thumbnailImage
 * @property {string} featuredImage
 * @property {string} authorId
 * @property {boolean} featureCard the feature-card column (or the featured column)
 * @property {number|null} featuredPriority the featured-priority column (or priority)
 * @property {number} lastModified
 */
function toPage(row) {
  return {
    path: row.path,
    title: row.title || '',
    description: row.description || '',
    image: row.image || '',
    tags: listOf(row.tags),
    contentType: row.contentType || '',
    publishDate: row.publishDate || '',
    readingTime: row.readingTime || '',
    thumbnailImage: row.thumbnailImage || '',
    featuredImage: row.featuredImage || '',
    authorId: row.authorId || '',
    featureCard: YES.includes(String(row.featureCard || row.featured || '').trim().toLowerCase()),
    featuredPriority: numberOf(row.featuredPriority) ?? numberOf(row.priority),
    lastModified: Number(row.lastModified) || 0,
  };
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

/**
 * The pages of the current locale site (its published path, e.g. /de-de/...).
 * @returns {Promise<IndexedPage[]>} empty when the index isn't available (e.g. in the editor)
 */
// eslint-disable-next-line import/prefer-default-export
export async function getPages() {
  pages = pages || fetchAll().catch(() => []);
  const { root } = getLocale();
  return (await pages)
    .filter((row) => row.path && (!root || row.path === root || row.path.startsWith(`${root}/`)))
    .map(toPage);
}
