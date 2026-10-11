/*
 * List: a header row with a title and a CTA on the right
 * (from hariprasad2026/aem-eds-app-demo, List-block).
 * Adapted: authored as Title / Title Type / CTA fields (a block can't contain the Title and
 * Button components); the CTA uses the shared button decorator.
 */
import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { readButtonOptions } from '../../utils/buttons.js';

const HEADINGS = 'h1, h2, h3, h4, h5, h6';

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const title = block.querySelector(HEADINGS);
  const link = block.querySelector('a[href]');

  const header = document.createElement('div');
  header.className = 'list-header-row';

  const titleSlot = document.createElement('div');
  titleSlot.className = 'list-title-slot';
  if (title) {
    moveInstrumentation(title.closest('.list > div > div') || title, titleSlot);
    titleSlot.append(title);
  }
  header.append(titleSlot);

  if (link) {
    const ctaSlot = document.createElement('div');
    ctaSlot.className = 'list-cta-slot';
    moveInstrumentation(link.closest('.list > div > div') || link, ctaSlot);
    // CTA Style: Primary / Secondary buttons, Default a text link with an arrow
    const { type } = readButtonOptions(link);
    decorateButton(link, ['primary', 'secondary'].includes(type)
      ? { view: 'button', type }
      : { view: 'button', type: 'tertiary' });
    ctaSlot.append(link);
    header.append(ctaSlot);
  } else {
    header.classList.add('list-header-row-no-cta');
  }

  block.replaceChildren(header);
}
