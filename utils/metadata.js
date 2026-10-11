/**
 * Metadata utils: the page's standard metadata, set on the page (Title, Description) or by
 * the bulk metadata spreadsheet (/metadata.json), e.g. Template, Tags, Publication Date,
 * Author, Category. Names follow https://www.aem.live/docs/special-metadata-properties.
 */
import { getMetadata } from '../scripts/aem.js';

/**
 * The page tags: each Tags value is published as <meta property="article:tag">.
 * @returns {string[]} tag IDs (e.g. tcs:topics/cloud) or titles, as authored
 */
export function getPageTags() {
  const tags = [...document.head.querySelectorAll('meta[property="article:tag"]')]
    .map((meta) => meta.content.trim());
  // a "tags" meta (comma separated) as a fallback, e.g. from the bulk metadata sheet
  const list = tags.length ? tags : getMetadata('tags').split(',');
  return [...new Set(list.map((tag) => tag.trim()).filter(Boolean))];
}

/**
 * The page's standard metadata as typed values.
 * @returns {{
 *   title: string, description: string, image: string, template: string, category: string,
 *   tags: string[], publicationDate: string, author: string
 * }}
 */
export function getPageMetadata() {
  return {
    title: getMetadata('og:title') || document.title,
    description: getMetadata('description'),
    image: getMetadata('og:image'),
    template: getMetadata('template'),
    category: getMetadata('category'),
    tags: getPageTags(),
    publicationDate: getMetadata('publication-date'),
    author: getMetadata('author'),
  };
}
