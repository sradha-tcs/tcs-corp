import { readProperties, textOf } from '../../utils/properties.js';

/*
 * Column: an item of a Columns Container section (blocks/columns-container). It marks where a
 * column starts and holds its Column name (shown in the editor only); the components after it,
 * up to the next Column, are the column's content. The Columns Container turns it into the
 * column element, so on the page it shows only that content.
 */

/**
 * Reads the properties of a Column (key-value rows, or one row per field). Kept on the element,
 * so they can be read again after its rows are gone.
 * @param {Element} block The Column block
 * @returns {{ title: string }}
 */
export function readColumn(block) {
  if (!('columnTitle' in block.dataset)) {
    const properties = readProperties(block);
    const title = 'title' in properties ? properties.title : block.firstElementChild?.lastElementChild;
    block.dataset.columnTitle = textOf(title);
  }
  return { title: block.dataset.columnTitle };
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  // the Columns Container made it a column (its content is the column's); nothing to do
  if (block.classList.contains('columns-container-column')) return;
  // a Column outside a Columns Container: only its name, in the editor
  const { title } = readColumn(block);
  const label = document.createElement('p');
  label.className = 'columns-container-label';
  label.textContent = title;
  block.replaceChildren(label);
}
