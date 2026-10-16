import { pictureOf } from '../../decorators/image-decorator.js';
import { linkOf } from '../../utils/links.js';
import { readProperties, textOf } from '../../utils/properties.js';

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
function buildLogo(imageCell, altCell, linkCell, className) {
  const picture = pictureOf(imageCell, altCell);
  const alt = textOf(altCell);
  if (!picture && !alt) return null;
  const href = linkOf(linkCell)?.getAttribute('href') || textOf(linkCell);
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
export default function decorate(block) {
  const props = readProperties(block);
  const bar = document.createElement('div');
  bar.className = 'tcs-header-bar';
  bar.append(...[
    buildLogo(props.tcslogo, props.tcslogoalt, props.tcslogolink, 'tcs-header-brand'),
    buildLogo(props.tatalogo, props.tatalogoalt, props.tatalogolink, 'tcs-header-group'),
  ].filter(Boolean));
  block.replaceChildren(bar);
}
