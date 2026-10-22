import { ensurePageHeader } from '../../decorators/template-decorator.js';

/**
 * Press release template (Site Global Templates: press-release).
 * - a Page Header from the page metadata (title, publish-date, tags), unless one is authored
 * The media contacts are the Media Contacts block (blocks/media-contacts), authored on the page.
 * @param {Element} main
 */
export default function decorate(main) {
  ensurePageHeader(main);
}
