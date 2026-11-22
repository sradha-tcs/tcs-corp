/**
 * Structured data decorator: adds the page's schema.org JSON-LD to the head (once), from its
 * metadata (utils/structured-data.js). Used by the article, blog and press release templates;
 * runs after the page is shown (no effect on LCP).
 */
import { getAuthor } from '../utils/data.js';
import { getPageMetadata } from '../utils/metadata.js';
import { articleSchema } from '../utils/structured-data.js';

/**
 * Adds an article JSON-LD to the head.
 * @param {string} type schema.org type: Article, BlogPosting or NewsArticle
 * @returns {Promise<HTMLScriptElement|null>}
 */
export default async function addArticleStructuredData(type) {
  if (document.head.querySelector('script[type="application/ld+json"][data-structured-data]')) return null;
  const metadata = getPageMetadata();
  const author = metadata.authorId ? await getAuthor(metadata.authorId).catch(() => null) : null;
  const canonical = document.head.querySelector('link[rel="canonical"]')?.href;
  const schema = articleSchema({
    type,
    url: canonical || `${window.location.origin}${window.location.pathname}`,
    title: metadata.title || document.title,
    description: metadata.description,
    // the page's own image (not the platform's default share image)
    image: [metadata.featuredImage, metadata.image]
      .find((src) => src && !/default-meta-image/.test(src)),
    publishDate: metadata.publishDate,
    modifiedDate: metadata.modifiedDate,
    authorName: author?.name || metadata.author,
    language: metadata.language,
    // the page's keywords meta (tags are taxonomy IDs, not words)
    keywords: (document.head.querySelector('meta[name="keywords"]')?.content || '').split(',').map((k) => k.trim()).filter(Boolean),
  });
  if (!schema) return null;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.structuredData = 'article';
  // JSON in a script element: "<" escaped so authored text can't close the element
  script.textContent = JSON.stringify(schema).replace(/</g, '\\u003c');
  document.head.append(script);
  return script;
}
