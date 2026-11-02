import { pictureOf } from '../../decorators/image-decorator.js';
import { setHeaderOverlay } from '../../utils/header-space.js';
import { linkOf } from '../../utils/links.js';
import { readProperties, textOf } from '../../utils/properties.js';
import { getPlaceholders } from '../../utils/placeholders.js';

/**
 * A logo helper: generates image element with proper alt text and links
 */
function buildLogo(imageCell, altCell, linkCell, className, fallback) {
  const picture = pictureOf(imageCell, altCell);
  const alt = textOf(altCell) || (textOf(linkCell) || linkOf(linkCell) ? fallback : '');
  if (!picture && !alt) return null;

  const raw = linkOf(linkCell)?.getAttribute('href') || textOf(linkCell);
  const href = /^(www\.|[a-z0-9-]+\.[a-z]{2,}(\/|$))/i.test(raw) ? `https://${raw}` : raw;
  const img = picture?.querySelector('img');

  if (img && href && !img.getAttribute('alt')?.trim()) img.alt = fallback;
  const logo = document.createElement(href ? 'a' : 'span');
  logo.className = className;
  if (href) logo.href = href;
  logo.append(picture || alt);
  return logo;
}

/**
 * loads and decorates the tcs-header block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);

  // Apply overlay configuration if in header
  const inHeader = !block.isConnected || !!block.closest('header') || !!block.closest('.nav-wrapper');
  if (inHeader && props.headeroverlay) {
    setHeaderOverlay(textOf(props.headeroverlay).toLowerCase());
  }

  const t = await getPlaceholders();

  const bar = document.createElement('div');
  bar.className = 'tcs-header-bar';
  bar.append(...[
    buildLogo(props.tcslogo, props.tcslogoalt, props.tcslogolink, 'tcs-header-brand', t('tcsLogo', 'Tata Consultancy Services')),
    buildLogo(props.tatalogo, props.tatalogoalt, props.tatalogolink, 'tcs-header-group', t('tataLogo', 'TATA Group')),
  ].filter(Boolean));

  block.replaceChildren(bar);
}
