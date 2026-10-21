import { pictureOf } from '../../decorators/image-decorator.js';
import { linkOf } from '../../utils/links.js';
import { readProperties, textOf } from '../../utils/properties.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { getPageTree } from '../../utils/query-index.js';
import { setHeaderSolid, SOLID } from '../../utils/header-overlay.js';

/*
 * TCS Header (blocks/tcs-header/_tcs-header.json): a key-value block with the TCS and TATA logos
 * and their links (Figma "Nav Bar-NEW", New Screens from New DS). On the Navigation page it
 * supplies the site header's brand (TCS logo) and tools (TATA logo), see blocks/header; anywhere
 * else it shows the logo bar.
 *
 * In the site header it is the TCS business logic and Figma styles of the header (blocks/header
 * keeps the header's own behaviour: loading the nav page, the menu, its keyboard and focus
 * handling, the header Canvas host). On the header:nav event (blocks/header) it
 * - makes its section the brand and tools (the logo bar), the first other section the menu;
 * - supplies the menu of a nav page without one: the pages the header Canvas's menu lists (its
 *   Menu root path and Menu depth, utils/query-index.js getPageTree), never an empty menu;
 * - marks the header block: tcs-header-site (the Figma styles of tcs-header.css), Header
 *   background tcs-header-bg-grey, Header over hero Solid (utils/header-overlay.js: no hero puts
 *   the header over itself);
 * - once the header has a menu, announces it as html[data-site-menu="header"]: below 1200px the
 *   Conversation Canvases hide their own site menu button (blocks/conversation-canvas), so the
 *   header's menu button is the one site navigation there;
 * - closes the open menu when the device is turned (orientation change).
 */

// Header background options (classes) and their header block classes
const BACKGROUNDS = { 'bg-grey': 'tcs-header-bg-grey' };

/**
 * A logo: its image (alt text from the alt field), linked when a link is authored; the alt text
 * alone when there's no image.
 * @returns {HTMLAnchorElement | HTMLSpanElement | null}
 */
function buildLogo(imageCell, altCell, linkCell, className, fallback) {
  const picture = pictureOf(imageCell, altCell);
  // the alt text collapses into the image (AEM): without an image, the link gets a name
  const alt = textOf(altCell) || (textOf(linkCell) || linkOf(linkCell) ? fallback : '');
  if (!picture && !alt) return null;
  const raw = linkOf(linkCell)?.getAttribute('href') || textOf(linkCell);
  // a domain typed without https:// (www.tata.com) would be a relative link
  const href = /^(www\.|[a-z0-9-]+\.[a-z]{2,}(\/|$))/i.test(raw) ? `https://${raw}` : raw;
  // a linked logo needs a name: an empty alt gets the logo's name
  const img = picture?.querySelector('img');
  if (img && href && !img.getAttribute('alt')?.trim()) img.alt = fallback;
  const logo = document.createElement(href ? 'a' : 'span');
  logo.className = className;
  if (href) logo.href = href;
  logo.append(picture || alt);
  return logo;
}

/** a nav section holding one logo */
function logoSection(logo, role) {
  const section = document.createElement('div');
  section.className = `section nav-${role}`;
  const p = document.createElement('p');
  if (logo) p.append(logo);
  section.append(p);
  return section;
}

/**
 * The menu of a nav page without one: the pages the header Canvas's menu lists, as a section with
 * a list, the way an authored menu is delivered.
 * @param {Element} canvas The header Canvas block (decorated: data-menu-root, data-menu-depth)
 * @returns {Promise<Element | null>} the menu section, null when the tree has no pages
 */
async function buildSiteMenu(canvas) {
  const { menuRoot, menuDepth } = canvas.dataset;
  const tree = menuRoot
    ? await getPageTree(menuRoot, Math.max(1, parseInt(menuDepth, 10) || 1)) : { children: [] };
  if (!tree.children.length) {
    // eslint-disable-next-line no-console
    console.warn('tcs-header: no menu, the header Canvas\'s Menu root path has no pages', menuRoot);
    return null;
  }
  const toList = (nodes) => {
    const list = document.createElement('ul');
    nodes.forEach((node) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = node.path;
      link.textContent = node.title;
      li.append(link);
      if (node.children.length) li.append(toList(node.children));
      list.append(li);
    });
    return list;
  };
  const section = document.createElement('div');
  section.className = 'section nav-sections';
  const wrapper = document.createElement('div');
  wrapper.className = 'default-content-wrapper';
  wrapper.append(toList(tree.children));
  section.append(wrapper);
  return section;
}

/** the site header has the menu: the Canvases' site menu buttons give way below 1200px */
function announceSiteMenu(menu) {
  if (menu) document.documentElement.dataset.siteMenu = 'header';
  return menu;
}

/**
 * The site header's nav (header:nav, blocks/header) with this block on its nav page: the logo bar,
 * the menu and the header options.
 * @param {CustomEvent} event detail: { block (the header block), nav, menu }
 */
function adaptHeader({ detail }) {
  const { block, nav } = detail;
  const bar = nav.querySelector(':scope > .section .tcs-header');
  if (!bar) return;
  const isCanvas = (section) => !!section.querySelector('.conversation-canvas');
  // a TCS Header authored in the same section as a Conversation Canvas stays in the nav (the
  // section goes to the header Canvas)
  let section = bar.closest('.section');
  if (isCanvas(section)) {
    const own = document.createElement('div');
    own.className = 'section';
    own.append(bar.closest('.tcs-header-wrapper') || bar);
    section.before(own);
    section = own;
  }
  const brand = logoSection(bar.querySelector('.tcs-header-brand'), 'brand');
  const tools = logoSection(bar.querySelector('.tcs-header-group'), 'tools');
  section.replaceWith(brand);
  const menu = [...nav.children].find((el) => el !== brand && !isCanvas(el));
  menu?.classList.add('nav-sections');
  (menu || brand).after(tools);

  block.classList.add('tcs-header-site');
  Object.entries(BACKGROUNDS).forEach(([option, name]) => {
    if (bar.classList.contains(option)) block.classList.add(name);
  });
  const header = block.closest('header');
  if (header && bar.classList.contains(SOLID) && setHeaderSolid(header)) {
    // eslint-disable-next-line no-console
    console.warn('tcs-header: Header over hero is Solid, the header stays above the opening hero');
  }
  if (menu) {
    announceSiteMenu(menu);
  } else {
    const canvas = nav.querySelector('.conversation-canvas[data-menu-root]');
    if (canvas) detail.menu = buildSiteMenu(canvas).then(announceSiteMenu);
  }
}

/**
 * A change of orientation (a phone or tablet turned) closes the open menu, as crossing the desktop
 * breakpoint does in blocks/header: through the header's own menu button, so its state, ARIA,
 * inert page and scroll lock stay the header's.
 */
function closeOnRotate() {
  const button = document.querySelector('header .tcs-header-site nav[data-expanded="true"] .nav-hamburger button');
  if (button?.offsetParent) button.click();
}

// once per page: the site header announces its nav (blocks/header)
document.addEventListener('header:nav', adaptHeader);
window.matchMedia('(orientation: portrait)').addEventListener('change', closeOnRotate);

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const t = await getPlaceholders();
  const bar = document.createElement('div');
  bar.className = 'tcs-header-bar';
  bar.append(...[
    buildLogo(props.tcslogo, props.tcslogoalt, props.tcslogolink, 'tcs-header-brand', t('tcsLogo', 'Tata Consultancy Services')),
    buildLogo(props.tatalogo, props.tatalogoalt, props.tatalogolink, 'tcs-header-group', t('tataLogo', 'TATA Group')),
  ].filter(Boolean));
  block.replaceChildren(bar);
}
