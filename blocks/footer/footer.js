import { loadFragment } from '../fragment/fragment.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { removeButtonDecoration } from '../../decorators/button-decorator.js';
import { fromCell } from '../../decorators/content-decorator.js';
import { announceNewTab, setLinkTarget } from '../../decorators/link-decorator.js';
import { buildSocialLinks } from '../../decorators/social-links-decorator.js';
import { matchCells } from '../../utils/cells.js';
import { getSocialLinks } from '../../utils/data.js';
import { uniqueId } from '../../utils/ids.js';
import { getInheritedMetadata } from '../../utils/inherited-metadata.js';
import { readLinkItems } from '../../utils/links.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { textOf } from '../../utils/properties.js';
import { getLocale, resolvePagePath } from '../../utils/site.js';
import { REGIONAL, placementOf, rowRoles } from './footer-rows.js';

/*
 * Footer: two roles with one block name.
 * - The page footer (built by aem.js in <footer>): loads the footer page (the inherited Footer
 *   page property, else the locale's references/footer, see below) as a fragment.
 * - The authored Footer block on that footer page (blocks/footer/_footer.json): the
 *   Conversation Canvas Page (a page with the conversation-canvas block, loaded as a fragment)
 *   above the bottom bar with the Copyright Text (rich text; {year} becomes the current year)
 *   and the Link List (Link Title, Link Path, Link Type: Default / Open in new window).
 *   Optional, shown only when authored (e.g. on the EMEA footer, references/footer-emea): a
 *   Logo (linked to the locale's Home page, with the Social Links next to it) and Footer Column
 *   items (Column Title, Link List, Show As); a column shown as Regional links is the row of
 *   regional links above the bottom bar.
 * Figma "Footer - Desktop / Tablet / Mobile" (2496-91965, 4347-44552, 4347-44593).
 */

// Footer Column cells in model order
const COLUMN_FIELDS = ['title', 'links', 'placement'];
const COLUMN_MATCHERS = {
  title: (cell) => !cell.querySelector('a[href]') && placementOf(textOf(cell)) !== REGIONAL,
  links: (cell) => !!cell.querySelector('a[href]'),
  placement: (cell) => placementOf(textOf(cell)) === REGIONAL,
};

/** replaces {year} in the copyright text with the current year */
function fillYear(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const year = String(new Date().getFullYear());
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.nodeValue.includes('{year}')) node.nodeValue = node.nodeValue.replaceAll('{year}', year);
  }
}

/** the links of a Link List cell as a list; null without links */
function buildLinkItems(cell, t) {
  const items = readLinkItems(cell);
  if (!items.length) return null;
  const list = document.createElement('ul');
  items.forEach(({ link, newWindow }) => {
    // footer links are plain links, not the buttons standalone content links become
    removeButtonDecoration(link);
    setLinkTarget(link, newWindow);
    if (newWindow) announceNewTab(link, t('opensInNewTab', '(opens in a new tab)'));
    const li = document.createElement('li');
    li.append(link);
    list.append(li);
  });
  return list;
}

function buildLinkList(cell, label, t) {
  const list = buildLinkItems(cell, t);
  if (!list) return null;
  const nav = document.createElement('nav');
  nav.className = 'footer-links';
  nav.setAttribute('aria-label', label);
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

/** the URL of the locale's Home page: the AEM page when editing, else the published root */
function homeUrl() {
  const { root, aemRoot, contentRoot } = getLocale();
  return contentRoot ? `${contentRoot}${aemRoot}.html` : `${root}/`;
}

/**
 * The Logo, linked to the locale's Home page; its alt text names the link (the image keeps its
 * Universal Editor instrumentation)
 */
function buildLogo(row, t) {
  const picture = row?.querySelector('picture') || row?.querySelector('img');
  if (!picture) return null;
  const img = picture.matches('img') ? picture : picture.querySelector('img');
  const a = document.createElement('a');
  a.className = 'footer-logo';
  a.href = homeUrl();
  if (!img?.alt.trim()) {
    a.setAttribute('aria-label', t('footerLogoHome', 'TCS home'));
    img?.setAttribute('alt', '');
  }
  a.append(picture);
  return a;
}

/** a Footer Column item: its title (a heading the list is labelled by) and links */
function readColumn(row) {
  const { title, links, placement } = matchCells([...row.children], COLUMN_FIELDS, COLUMN_MATCHERS);
  return {
    row, title: textOf(title), links, placement: placementOf(textOf(placement)),
  };
}

function buildColumn({ row, title, links }, className, t, tagName = 'div') {
  const list = buildLinkItems(links, t);
  if (!list && !title) return null;
  const column = document.createElement(tagName);
  column.className = className;
  moveInstrumentation(row, column);
  if (title) {
    const heading = document.createElement('h2');
    heading.className = `${className}-title`;
    heading.id = uniqueId(className);
    heading.textContent = title;
    column.append(heading);
    list?.setAttribute('aria-labelledby', heading.id);
  }
  if (list) column.append(list);
  return column;
}

/**
 * The Logo and the link columns (the Social Links go next to the Logo, see decoratePageFooter),
 * then the regional links; null when neither is authored.
 */
function buildFooterNav(logoRow, columnRows, t) {
  const columns = columnRows.map(readColumn);
  const logo = buildLogo(logoRow, t);
  const linkColumns = columns.filter(({ placement }) => placement !== REGIONAL)
    .map((column) => buildColumn(column, 'footer-column', t)).filter(Boolean);
  const regions = columns.filter(({ placement }) => placement === REGIONAL).map((column) => {
    const nav = buildColumn(column, 'footer-regions', t, 'nav');
    const heading = nav?.querySelector('.footer-regions-title');
    if (heading) {
      // the landmark is named by the title, its list needs no name of its own
      nav.setAttribute('aria-labelledby', heading.id);
      nav.querySelector('ul')?.removeAttribute('aria-labelledby');
    } else nav?.setAttribute('aria-label', t('footerRegionalLinks', 'Regional links'));
    return nav;
  }).filter(Boolean);
  if (!logo && !linkColumns.length && !regions.length) return null;

  const area = document.createElement('div');
  area.className = 'footer-nav';
  if (logo || linkColumns.length) {
    const main = document.createElement('div');
    main.className = 'footer-main';
    const brand = document.createElement('div');
    brand.className = 'footer-brand';
    if (logo) brand.append(logo);
    main.append(brand);
    if (linkColumns.length) {
      const nav = document.createElement('nav');
      nav.className = 'footer-columns';
      nav.setAttribute('aria-label', t('footerNavigation', 'Footer navigation'));
      nav.append(...linkColumns);
      main.append(nav);
    }
    area.append(main);
  }
  area.append(...regions);
  return area;
}

/**
 * The authored Footer block: rows Conversation Canvas Page, Copyright Text, Link List and Logo,
 * then the Footer Column items.
 * @param {Element} block
 */
async function decorateFooterBar(block) {
  const rows = [...block.children];
  const roles = rowRoles(rows.map((row) => ({
    model: row.dataset.aueModel,
    cells: row.children.length,
    image: !!row.querySelector('picture, img'),
    text: !!row.textContent.trim(),
  })));
  const rowOf = (role) => rows[roles.indexOf(role)];
  const columnRows = rows.filter((row, i) => roles[i] === 'column');

  const [t, canvas] = await Promise.all([
    getPlaceholders(), buildCanvas(rowOf('canvas')?.firstElementChild),
  ]);
  const footerNav = buildFooterNav(rowOf('logo'), columnRows, t);

  const bar = document.createElement('div');
  bar.className = 'footer-bar';
  const copyrightCell = rowOf('copyright')?.firstElementChild;
  if (copyrightCell?.textContent.trim()) {
    const copyright = fromCell(copyrightCell, 'div', 'footer-copyright');
    fillYear(copyright);
    bar.append(copyright);
  }
  const links = buildLinkList(rowOf('links')?.firstElementChild, t('footerLinks', 'Footer links'), t);
  if (links) bar.append(links);

  block.replaceChildren(...[canvas, footerNav, bar].filter(Boolean));
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
  );
  if (social) {
    social.setAttribute('aria-label', t('footerSocialLinks', 'Social media'));
    social.querySelectorAll('a[target="_blank"]').forEach((a) => {
      announceNewTab(a, t('opensInNewTab', '(opens in a new tab)'));
    });
    // next to the Logo of a footer with one, else after the footer page
    const brand = footer.querySelector('.footer-brand');
    if (brand) brand.append(social);
    else footer.append(social);
  }

  block.append(footer);
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
