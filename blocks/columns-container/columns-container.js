import { getPlaceholders } from '../../utils/placeholders.js';
import { readColumn } from '../column-break/column-break.js';

/*
 * Columns Container: a section (blocks/columns-container/_columns-container.json) whose content
 * is laid out in columns. scripts.js wraps the section's content in this synthetic block; each
 * Column item (blocks/column-break) starts a column and the components after it, up to the next
 * Column, are the column's content: default content and any block, as in a section (Edge
 * Delivery has no blocks in blocks). The Column element becomes the column, so its Additional tab
 * (spacing, Hide block, Anchor ID) applies to it. Content before the first Column is a column of
 * its own. Layout: Columns per row (more Columns start new rows), Column widths, Gap, Vertical
 * alignment and Side by side from (block classes).
 */

const MAX_COLUMNS = 4;

/**
 * The columns per row: Columns per row (per-row-1 to per-row-4), else Automatic: as many as
 * there are Columns, at most MAX_COLUMNS. More Columns start new rows.
 * @param {Element} block
 * @param {number} count the number of columns
 * @returns {number}
 */
function perRow(block, count) {
  const chosen = Number([...block.classList].find((name) => /^per-row-[1-4]$/.test(name))?.slice(8));
  return chosen || Math.min(count, MAX_COLUMNS) || 1;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const t = await getPlaceholders();
  const columns = [];
  [...block.children].forEach((wrapper) => {
    const marker = wrapper.querySelector(':scope > .column-break');
    if (marker) {
      readColumn(marker);
      // the Column itself holds its content (its wrapper div is left out)
      marker.replaceChildren();
      marker.classList.add('columns-container-column');
      columns.push(marker);
      wrapper.remove();
      return;
    }
    if (!columns.length) {
      const column = document.createElement('div');
      column.className = 'columns-container-column';
      columns.push(column);
    }
    columns[columns.length - 1].append(wrapper);
  });

  columns.forEach((column, i) => {
    // in the editor, a label to select the Column (hidden on the page)
    const label = document.createElement('p');
    label.className = 'columns-container-label';
    label.textContent = column.dataset.columnTitle
      || t('columnLabel', 'Column {n}', { n: i + 1 });
    column.prepend(label);
    if (column.children.length === 1) {
      const hint = document.createElement('p');
      hint.className = 'columns-container-hint';
      hint.textContent = t('columnEmpty', 'Add the components of this column after it.');
      column.append(hint);
    }
  });

  block.classList.add(`columns-container-${perRow(block, columns.length)}`);
  block.replaceChildren(...columns);
  if (!columns.length) {
    const hint = document.createElement('p');
    hint.className = 'columns-container-hint';
    hint.textContent = t('columnsContainerEmpty', 'Add a Column, then the components of the column after it.');
    block.append(hint);
  }
}
