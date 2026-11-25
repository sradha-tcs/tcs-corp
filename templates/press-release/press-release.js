import { ensurePageHeader } from '../../decorators/template-decorator.js';

/**
 * Press release template (Site Global Templates: press-release).
 * - a Page Header from the page metadata (title, publish-date, tags), unless one is authored
 * The media contacts are the Media Contacts block (blocks/media-contacts), authored on the page.
 * @param {Element} main
 */
export default function decorate(main) {
  ensurePageHeader(main);
  // schema.org NewsArticle JSON-LD (SEO), not awaited: it doesn't hold the page back
  // loaded on its own (not in the template's import chain, which holds the page back)
  import('../../decorators/structured-data-decorator.js')
    .then(({ default: addArticleStructuredData }) => addArticleStructuredData('NewsArticle'))
    .catch(() => {});
}
