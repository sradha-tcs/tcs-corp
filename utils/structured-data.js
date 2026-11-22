/**
 * Structured data utils: schema.org JSON-LD of a page from its metadata (pure, unit tested in
 * test/seo/structured-data.test.mjs). Only values the page has are written: no empty fields, no
 * invented publisher or organization data. Rendered by decorators/structured-data-decorator.js.
 */
import { compact } from './objects.js';

/** a calendar date as authored (YYYY-MM-DD, possibly with a time), else '' */
export const isoDate = (value) => {
  const match = String(value || '').match(/^(\d{4}-\d{2}-\d{2})(T[\d:.]+(Z|[+-]\d{2}:?\d{2})?)?/);
  return match ? match[0] : '';
};

/** an absolute http(s) URL of a value relative to the page, else '' (DAM paths aren't served) */
export function absoluteUrl(value, base) {
  const text = String(value || '').trim();
  if (!text || text.startsWith('/content/dam/')) return '';
  try {
    const url = new URL(text, base);
    return /^https?:$/.test(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

/**
 * The JSON-LD of an article-like page (Article, BlogPosting, NewsArticle).
 * @param {Object} page
 * @param {string} page.type schema.org type, e.g. NewsArticle
 * @param {string} page.url the page's canonical URL
 * @param {string} page.title
 * @param {string} [page.description]
 * @param {string} [page.image] the page image (relative or absolute)
 * @param {string} [page.publishDate]
 * @param {string} [page.modifiedDate]
 * @param {string} [page.authorName]
 * @param {string} [page.language]
 * @param {string[]} [page.keywords]
 * @returns {Object|null} null without a title or URL
 */
export function articleSchema(page) {
  if (!page?.title || !page?.url) return null;
  const published = isoDate(page.publishDate);
  return compact({
    '@context': 'https://schema.org',
    '@type': page.type || 'Article',
    headline: String(page.title).slice(0, 110),
    description: page.description,
    image: absoluteUrl(page.image, page.url) ? [absoluteUrl(page.image, page.url)] : undefined,
    datePublished: published,
    dateModified: isoDate(page.modifiedDate) || published,
    author: page.authorName ? [{ '@type': 'Person', name: page.authorName }] : undefined,
    inLanguage: page.language,
    keywords: page.keywords?.length ? page.keywords.join(', ') : undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': page.url },
  }) || null;
}
