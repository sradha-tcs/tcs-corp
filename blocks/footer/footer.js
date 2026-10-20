import { loadFragment } from '../fragment/fragment.js';
import { prepareMotion } from '../../decorators/motion-decorator.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { removeButtonDecoration } from '../../decorators/button-decorator.js';
import { fromCell } from '../../decorators/content-decorator.js';
import { buildEditorItems, editorItemHint } from '../../decorators/editor-item-decorator.js';
import { announceNewTab, setLinkTarget } from '../../decorators/link-decorator.js';
import { buildSocialLinks } from '../../decorators/social-links-decorator.js';
import { FIELD_ROW_ITEM, itemRows } from '../../utils/cells.js';
import { getSocialLinks } from '../../utils/data.js';
import { getInheritedMetadata } from '../../utils/inherited-metadata.js';
import { readLinkItems, readLinkRows } from '../../utils/links.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { resolvePagePath } from '../../utils/site.js';

/*
 * Footer: two roles with one block name.
 * - The page footer (built by aem.js in <footer>): loads the footer page (references/footer by
 *   default, see below) as a fragment.
 * - The authored Footer block on that footer page (blocks/footer/_footer.json): the
 *   Conversation Canvas Page (a page with the conversation-canvas block, loaded as a fragment)
 *   above the bottom bar with the Copyright Text (rich text; {year} becomes the current year)
 *   and the links: Footer Link items (footer-link, added with Add: Link Title, Link Path, Link
 *   Type Default / Open in new window), after the ones of the Link List multifield authored
 *   before them.
 * Figma "Footer - Desktop / Tablet / Mobile" (2496-91965, 2496-94560, 2496-94602).
 */

/** replaces {year} in the copyright text with the current year */
function fillYear(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const year = String(new Date().getFullYear());
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.nodeValue.includes('{year}')) node.nodeValue = node.nodeValue.replaceAll('{year}', year);
  }
}

function buildLinkList(cell, rows, label, hint, newTabHint) {
  const rowItems = readLinkRows(rows);
  const items = [...readLinkItems(cell), ...rowItems];
  const rendered = new Set(rowItems.map(({ row }) => row));
  // in the editor, Footer Link items without a link yet
  const pending = buildEditorItems(rows.filter((row) => !rendered.has(row)), hint, 'li');
  if (!items.length && !pending.length) return null;
  const nav = document.createElement('nav');
  nav.className = 'footer-links';
  nav.setAttribute('aria-label', label);
  const list = document.createElement('ul');
  items.forEach(({ link, newWindow, row }) => {
    // footer links are plain links, not the buttons standalone content links become
    removeButtonDecoration(link);
    setLinkTarget(link, newWindow);
    if (newWindow) announceNewTab(link, newTabHint);
    const li = document.createElement('li');
    if (row) moveInstrumentation(row, li);
    li.append(link);
    list.append(li);
  });
  list.append(...pending);
  nav.append(list);
  return nav;
}

/** the conversation canvas page of the Conversation Canvas Page property, as a fragment */
async function buildCanvas(cell) {
  const value = cell?.querySelector('a[href]')?.getAttribute('href') || cell?.textContent.trim();
  if (!value) return null;
  const fragment = await loadFragment(resolvePagePath(value, ''));
  if (!fragment?.children.length) return null;
  const canvas = document.createElement('div');
  canvas.className = 'footer-canvas';
  moveInstrumentation(cell, canvas);
  canvas.append(...fragment.children);
  return canvas;
}

/**
 * The authored Footer block: rows Conversation Canvas Page, Copyright Text and Link List, then
 * the Footer Link items.
 * @param {Element} block
 */
async function decorateFooterBar(block) {
  const linkRows = itemRows(block, ['footer-link'], FIELD_ROW_ITEM);
  const [canvasRow, copyrightRow, linksRow] = [...block.children]
    .filter((row) => !linkRows.includes(row));
  const [t, canvas, hint] = await Promise.all([
    getPlaceholders(), buildCanvas(canvasRow?.firstElementChild), editorItemHint(linkRows),
  ]);
  const bar = document.createElement('div');
  bar.className = 'footer-bar';

  const copyrightCell = copyrightRow?.firstElementChild;
  if (copyrightCell?.textContent.trim()) {
    const copyright = fromCell(copyrightCell, 'div', 'footer-copyright');
    fillYear(copyright);
    bar.append(copyright);
  }
  const links = buildLinkList(linksRow?.firstElementChild, linkRows, t('footerLinks', 'Footer links'), hint, t('opensInNewTab', '(opens in a new tab)'));
  if (links) bar.append(links);

  block.replaceChildren(...[canvas, bar].filter(Boolean));
}

/**
 * The page footer: the footer page as a fragment, plus the locale's Social Links.
 * @param {Element} block
 */
async function decoratePageFooter(block) {
  // the Footer page property of the page or, inherited, of its nearest parent page up to Home
  // (or the metadata sheet's footer column), else the locale's references/footer
  const footerPath = resolvePagePath(await getInheritedMetadata('footer'), 'references/footer');
  const [fragment, socialLinks, t] = await Promise.all([
    loadFragment(footerPath), getSocialLinks(), getPlaceholders(),
  ]);

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment?.firstElementChild) footer.append(fragment.firstElementChild);

  // the locale's Social Links data sheet, in Sort Order
  const social = buildSocialLinks(
    socialLinks,
    'footer-social',
    (platform) => t('followUsOn', 'Follow us on {platform}', { platform }),
    t('opensInNewTab', '(opens in a new tab)'),
  );
  if (social) {
    social.setAttribute('aria-label', t('followUs', 'Follow us'));
    footer.append(social);
  }

  block.append(footer);
  // the block animations of the footer page (e.g. its Canvas), once it is in the page
  await prepareMotion(block);
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // the page footer is the block aem.js puts directly into <footer>
  if (block.parentElement?.tagName === 'FOOTER') await decoratePageFooter(block);
  else await decorateFooterBar(block);
}
