import { pictureOf } from '../../decorators/image-decorator.js';
import { setHeaderOverlay } from '../../utils/header-space.js';
import { linkOf } from '../../utils/links.js';
import { readProperties, textOf } from '../../utils/properties.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { getPageTree } from '../../utils/query-index.js';
import { toSitePath } from '../../utils/urls.js';

/*
 * TCS Header (blocks/tcs-header/_tcs-header.json): a key-value block with the TCS and TATA logos
 * and their links (Figma "Nav Bar-NEW", New Screens from New DS). On the Navigation page it
 * supplies the site header's brand (TCS logo) and tools (TATA logo), see blocks/header; anywhere
 * else it shows the logo bar.
 *
 * Tablet and mobile menu: on the Navigation page (decorated in the nav fragment, before the site
 * header reads it) a nav page without a menu list of its own gets one from the query index, the
 * pages below the block's Menu root path (else the Menu root path of the Conversation Canvas
 * authored in its section) up to the Menu depth. It is added as the section after the block's, the
 * way an authored menu is delivered, so blocks/header (unchanged) makes it the menu: the menu
 * button, its levels, keyboard and focus handling. Without pages there is no menu (no button).
 *
 * Header over the first block (every width): on the Navigation page the block sets the site's mode,
 * <html data-header-overlay> (utils/header-space.js, remembered for the next pages); the layout is
 * in styles/styles.css (it applies before the header loads) and the transparent bar here.
 */

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

/** a Menu root path field (a link or text, AEM or published path) as a site path */
const rootOf = (cell) => toSitePath(linkOf(cell)?.getAttribute('href') || textOf(cell));

/**
 * The menu settings to try, in order: the block's own Menu root path and Menu depth, then those of
 * the Conversation Canvas in the same section (read before it is decorated: blocks load in order).
 * @returns {Array<{ root: string, depth: number }>}
 */
function menuSettings(block, props) {
  const canvas = block.closest('.section')?.querySelector('.conversation-canvas');
  const canvasProps = canvas ? readProperties(canvas) : {};
  const own = textOf(props.menudepth);
  return [
    { root: rootOf(props.menurootpath), depth: own },
    { root: rootOf(canvasProps.menurootpath), depth: own || textOf(canvasProps.menudepth) },
  ].filter(({ root }) => root)
    .map(({ root, depth }) => ({ root, depth: Math.max(1, parseInt(depth, 10) || 1) }));
}

/**
 * The menu of the Navigation page: a section with the list of the tree's pages (any depth), the
 * markup of an authored menu, from the first settings with pages in the site's query index (a
 * Menu root path of another site, e.g. the language master on /en, has none there); null without
 * pages.
 */
async function buildMenuSection(candidates) {
  let tree = null;
  for (let i = 0; i < candidates.length && !tree?.children.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    tree = await getPageTree(candidates[i].root, candidates[i].depth);
  }
  if (!tree?.children.length) return null;
  const toList = (nodes) => {
    const list = document.createElement('ul');
    nodes.forEach((node) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = node.path;
      link.textContent = node.title;
      item.append(link);
      if (node.children.length) item.append(toList(node.children));
      list.append(item);
    });
    return list;
  };
  const section = document.createElement('div');
  section.className = 'section tcs-header-menu';
  const wrapper = document.createElement('div');
  wrapper.className = 'default-content-wrapper';
  wrapper.append(toList(tree.children));
  section.append(wrapper);
  return section;
}

/** whether the Navigation page already has a menu: a section with a list after the block's */
function hasMenu(section) {
  let next = section?.nextElementSibling;
  while (next) {
    if (!next.querySelector('.conversation-canvas') && next.querySelector('ul')) return true;
    next = next.nextElementSibling;
  }
  return false;
}

/**
 * Browsers without scroll-driven animations (the bar turns solid once scrolled, tcs-header.css):
 * <html class="tcs-header-scrolled"> after the bar's height, from a passive scroll listener
 * (scrollY only, no layout read).
 */
function followScroll() {
  if (window.CSS?.supports?.('animation-timeline', 'scroll()')) return;
  const root = document.documentElement;
  let bar = 0;
  const update = () => {
    // the bar's height, read once (on the first scroll; --nav-height in rem)
    bar ||= (parseFloat(getComputedStyle(root).getPropertyValue('--nav-height')) || 4) * 16;
    root.classList.toggle('tcs-header-scrolled', window.scrollY > bar);
  };
  window.addEventListener('scroll', update, { passive: true });
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const section = block.closest('.section');
  // on the Navigation page: decorated in its fragment (not in the page yet), before the header
  const inHeader = !block.isConnected;
  const settings = inHeader && !hasMenu(section) ? menuSettings(block, props) : [];
  if (inHeader) {
    setHeaderOverlay(textOf(props.headeroverlay).toLowerCase());
    followScroll();
  }
  const [t, menu] = await Promise.all([
    getPlaceholders(),
    settings.length ? buildMenuSection(settings) : null,
  ]);
  const bar = document.createElement('div');
  bar.className = 'tcs-header-bar';
  bar.append(...[
    buildLogo(props.tcslogo, props.tcslogoalt, props.tcslogolink, 'tcs-header-brand', t('tcsLogo', 'Tata Consultancy Services')),
    buildLogo(props.tatalogo, props.tatalogoalt, props.tatalogolink, 'tcs-header-group', t('tataLogo', 'TATA Group')),
  ].filter(Boolean));
  block.replaceChildren(bar);
  if (menu && section) section.after(menu);
}
