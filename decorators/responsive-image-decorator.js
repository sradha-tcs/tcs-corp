/**
 * Responsive image decorator: images built from a URL (e.g. a section background or an
 * image property value), and the images of a separate AEM Assets environment (EDAM, KB-D-064)
 * delivered as Dynamic Media with OpenAPI links. Kept free of scripts.js imports so scripts.js
 * can use it.
 */
import { createOptimizedPicture } from '../scripts/aem.js';
import { deliveryAsset, deliveryImageUrl } from '../utils/media.js';

const BREAKPOINTS = [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }];

/**
 * A responsive picture of a Dynamic Media with OpenAPI delivery image, in the structure of
 * createOptimizedPicture: a WebP source per breakpoint, then the original format, the last
 * breakpoint as the <img>. An image that takes no width (SVG) is a plain <img> in a <picture>.
 * @param {string} href the delivery image URL
 * @param {string} [alt] '' for a decorative image
 * @param {Array<{ media?: string, width: string }>} [breakpoints]
 * @returns {HTMLPictureElement}
 */
export function buildDeliveryPicture(href, alt = '', breakpoints = BREAKPOINTS) {
  const picture = document.createElement('picture');
  const img = document.createElement('img');
  img.alt = alt;
  img.loading = 'lazy';
  if (!deliveryAsset(href)?.resizable) {
    img.src = href;
    picture.append(img);
    return picture;
  }
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.media = br.media;
    source.type = 'image/webp';
    source.srcset = deliveryImageUrl(href, br.width, { webp: true });
    picture.append(source);
  });
  breakpoints.forEach((br, i) => {
    if (i < breakpoints.length - 1) {
      const source = document.createElement('source');
      if (br.media) source.media = br.media;
      source.srcset = deliveryImageUrl(href, br.width);
      picture.append(source);
    } else {
      img.src = deliveryImageUrl(href, br.width);
      picture.append(img);
    }
  });
  return picture;
}

/**
 * Builds an image from a URL: site media is optimized (responsive <picture>), an EDAM delivery
 * image too; other URLs are used as they are.
 * @param {{ src: string, alt?: string } | null} img
 * @param {Array} [breakpoints] widths passed to createOptimizedPicture
 * @returns {Element | null}
 */
export function buildImage(img, breakpoints = [{ width: '750' }]) {
  if (!img?.src) return null;
  const url = new URL(img.src, window.location.href);
  if (url.origin === window.location.origin && url.pathname.includes('/media_')) {
    return createOptimizedPicture(url.href, img.alt || '', false, breakpoints);
  }
  if (deliveryAsset(url.href)?.image) return buildDeliveryPicture(url.href, img.alt || '', breakpoints);
  const el = document.createElement('img');
  el.src = url.href;
  el.alt = img.alt || '';
  el.loading = 'lazy';
  return el;
}

/**
 * Images of a separate AEM Assets environment: an image field holding a Dynamic Media with
 * OpenAPI delivery URL is delivered as a link to it (when no MIME type sends it through the
 * Edge Delivery media bus). A link that stands alone in its cell or paragraph becomes the
 * picture blocks expect; a link in running text stays a link. The link's title is the alt text
 * (else its text, unless that is the URL itself). Runs before the blocks are decorated.
 * @param {Element} main
 */
export function decorateDeliveryImages(main) {
  main.querySelectorAll('a[href*="/adobe/assets/urn:aaid:aem:"]').forEach((a) => {
    if (!deliveryAsset(a.href)?.image || a.firstElementChild) return;
    const text = a.textContent.trim();
    const holder = a.parentElement;
    if (!holder || holder.textContent.trim() !== text) return;
    const title = (a.title || '').trim();
    const alt = title || (text && !/^https?:\/\//i.test(text) ? text : '');
    const picture = buildDeliveryPicture(a.href, alt);
    // Universal Editor instrumentation of the link moves to the picture
    [...a.attributes]
      .filter(({ name }) => name.startsWith('data-aue-') || name.startsWith('data-richtext-'))
      .forEach(({ name, value }) => picture.setAttribute(name, value));
    a.replaceWith(picture);
  });
}
