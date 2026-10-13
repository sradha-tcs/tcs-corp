import { moveInstrumentation } from '../../scripts/scripts.js';
import { buildImage } from '../../decorators/responsive-image-decorator.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  // the image (with its Image alt text) from the image decorator: site media optimized
  ul.querySelectorAll('picture > img').forEach((img) => {
    const image = buildImage({ src: img.src, alt: img.alt });
    if (!image) return;
    moveInstrumentation(img, image.querySelector('img') || image);
    img.closest('picture').replaceWith(image);
  });
  block.replaceChildren(ul);
}
