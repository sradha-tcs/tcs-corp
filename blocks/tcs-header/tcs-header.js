import { pictureOf } from '../../decorators/image-decorator.js';
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
 * The menu settings: the block's own Menu root path and Menu depth, else those of the Conversation
 * Canvas in the same section (read before it is decorated: blocks load in order), else none.
 * @returns {{ root: string, depth: number } | null}
 */
function menuSettings(block, props) {
  let root = rootOf(props.menurootpath);
  let depth = textOf(props.menudepth);
  if (!root) {
    const canvas = block.closest('.section')?.querySelector('.conversation-canvas');
    const canvasProps = canvas ? readProperties(canvas) : {};
    root = rootOf(canvasProps.menurootpath);
    depth = depth || textOf(canvasProps.menudepth);
  }
  return root ? { root, depth: Math.max(1, parseInt(depth, 10) || 1) } : null;
}

/**
 * The menu of the Navigation page: a section with the list of the tree's pages (any depth), the
 * markup of an authored menu; null without pages.
 */
async function buildMenuSection({ root, depth }) {
  const tree = await getPageTree(root, depth);
  if (!tree.children.length) return null;
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
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const section = block.closest('.section');
  // on the Navigation page: decorated in its fragment (not in the page yet), before the header
  const settings = !block.isConnected && !hasMenu(section) ? menuSettings(block, props) : null;
  const [t, menu] = await Promise.all([
    getPlaceholders(),
    settings ? buildMenuSection(settings) : null,
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
