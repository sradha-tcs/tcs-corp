import { fromCell } from '../../decorators/content-decorator.js';
import { isEditing } from '../../utils/environment.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { optionOf, readProperties, textOf } from '../../utils/properties.js';

/*
 * Blockquote (blocks/blockquote/_blockquote.json): a key-value block. The quote in italics next
 * to a coloured line on its left (Line color). No author, image or quote marks: for an
 * attributed statement use the Quote block. The Additional tab arrives as block classes.
 */

// Line color values (the colours are in blockquote.css)
const LINE_COLORS = ['brand-blue'];

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const lineColor = optionOf(block, props.linecolor, LINE_COLORS) || 'brand-blue';

  block.classList.remove(...LINE_COLORS.map((color) => `line-${color}`));
  block.classList.add(`line-${lineColor}`);

  if (!textOf(props.quote)) {
    block.replaceChildren();
    if (isEditing()) {
      const t = await getPlaceholders();
      const hint = document.createElement('p');
      hint.className = 'blockquote-empty';
      hint.textContent = t('blockquoteEmpty', 'Blockquote: add a Quote.');
      block.append(hint);
    }
    return;
  }

  block.replaceChildren(fromCell(props.quote, 'blockquote', 'blockquote-text'));
}
