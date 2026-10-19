/*
 * Accordion Block (Block Collection): collapsible items built on <details>.
 * https://www.aem.live/developer/block-collection/accordion
 */
import { moveInstrumentation } from '../../scripts/scripts.js';
import { buildEditorItems, editorItemHint } from '../../decorators/editor-item-decorator.js';

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const empty = (cell) => !cell || (!cell.textContent.trim() && !cell.querySelector('img, picture, a'));
  // AEM adds an empty row for the block's dialog tab; an item without a summary has no name
  const rows = [...block.children];
  const unnamed = rows.filter((row) => empty(row.children[0]));
  const hint = await editorItemHint(unnamed.filter((row) => row.dataset.aueResource));
  unnamed.forEach((row) => {
    const [placeholder] = row.dataset.aueResource ? buildEditorItems([row], hint) : [];
    if (placeholder) row.replaceWith(placeholder);
    else row.remove();
  });
  rows.filter((row) => !unnamed.includes(row)).forEach((row) => {
    const [label, body] = row.children;
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    const panel = body || document.createElement('div');
    panel.className = 'accordion-item-body';

    const details = document.createElement('details');
    moveInstrumentation(row, details);
    details.className = 'accordion-item';
    details.append(summary, panel);
    row.replaceWith(details);
  });
}
