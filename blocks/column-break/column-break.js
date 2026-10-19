import { getPlaceholders } from '../../utils/placeholders.js';
import { readProperties, textOf } from '../../utils/properties.js';

/*
 * Column Break: an item of a Columns Container section (blocks/columns-container). It marks where
 * a column starts and holds its Column name; the components after it, up to the next Column
 * Break, are the column's content. It stays in its column as the column's label, shown in
 * Universal Editor edit mode only (to select it and edit its properties), hidden on the page.
 */

/**
 * Reads the properties of a Column Break (key-value rows, or one row per field). Kept on the
 * element, so they can be read again after its rows are gone.
 * @param {Element} block The Column Break block
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
export default async function decorate(block) {
  const { title } = readColumn(block);
  const t = await getPlaceholders();
  const label = document.createElement('p');
  label.className = 'column-break-label';
  const column = block.closest('.columns-container-column');
  const index = column ? [...column.parentElement.children].indexOf(column) + 1 : 0;
  label.textContent = title || t('columnLabel', 'Column {n}', { n: index || 1 });
  block.replaceChildren(label);
}
