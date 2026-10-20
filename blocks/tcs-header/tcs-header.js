import { pictureOf } from '../../decorators/image-decorator.js';
import { linkOf } from '../../utils/links.js';
import { readProperties, textOf } from '../../utils/properties.js';
import { getPlaceholders } from '../../utils/placeholders.js';

/*
 * TCS Header (blocks/tcs-header/_tcs-header.json): a key-value block with the TCS and TATA logos
 * and their links (Figma "Nav Bar-NEW", New Screens from New DS). On the Navigation page it
 * supplies the site header's brand (TCS logo) and tools (TATA logo), see blocks/header; anywhere
 * else it shows the logo bar.
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
