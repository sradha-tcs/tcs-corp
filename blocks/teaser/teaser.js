/**
 * Teaser block: a skeleton for now; fields and design will be added later.
 * Also used as a slide type by the Gen Carousel block.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  [...block.children].forEach((row) => row.classList.add('teaser-row'));
}
