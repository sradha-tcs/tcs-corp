/**
 * Page context utils: what the data layer says about the page (its page entry,
 * decorators/data-layer-decorator.js), from the page metadata and its path. No personal data: the
 * author is its Author ID, the URL has no query string or fragment (they may carry identifiers).
 */
import { getPageLanguage, getPageMetadata, getPageTags } from './metadata.js';
import { indexRoot, sectionsOf } from './site.js';

/**
 * The page context.
 * @returns {Object} pageName, pageURL, pagePath, pageTitle, pageType, template, language, country,
 *   region, siteSection, subSection, contentType, publishDate, authorId, tags
 */
// eslint-disable-next-line import/prefer-default-export
export function getPageContext() {
  const metadata = getPageMetadata();
  const { pathname, origin } = window.location;
  const root = indexRoot(pathname);
  return {
    ...sectionsOf(pathname, root),
    pageURL: `${origin}${pathname}`,
    pagePath: pathname,
    pageTitle: metadata.title || document.title,
    pageType: metadata.pageType,
    template: metadata.pageType,
    language: getPageLanguage(),
    country: metadata.country,
    region: metadata.region,
    contentType: metadata.contentType,
    publishDate: metadata.publishDate,
    authorId: metadata.authorId,
    tags: getPageTags(),
  };
}
