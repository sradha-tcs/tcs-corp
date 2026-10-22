/*
 * Table Block (Block Collection): a table from rows of columns.
 * https://www.aem.live/developer/block-collection/table
 * Adapted: the first row is the column headers (unless No Header), the first column the row
 * headers (First Column Header); the heading just before the table names it; a table wider than
 * its container scrolls in a labelled region keyboard users can focus
 * (decorators/table-scroll-decorator.js, shared with the tables of rich text).
 */
import { moveInstrumentation } from '../../scripts/scripts.js';
import { nameTable, observeScrollRegion } from '../../decorators/table-scroll-decorator.js';
import { getPlaceholders } from '../../utils/placeholders.js';

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const t = await getPlaceholders();
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const header = !block.classList.contains('no-header');
  const rowHeader = block.classList.contains('row-header');

  // AEM delivers an empty row for each of the block's dialog tabs before the Row items
  const isTabRow = (row) => row.children.length <= 1 && !row.textContent.trim()
    && !row.querySelector('img, picture, a');
  const firstRow = [...block.children].findIndex((row) => !isTabRow(row));
  const rows = firstRow < 0 ? [] : [...block.children].slice(firstRow);
  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    moveInstrumentation(row, tr);
    const inHead = i === 0 && header;
    [...row.children].forEach((cell, j) => {
      const th = inHead || (rowHeader && j === 0);
      const td = document.createElement(th ? 'th' : 'td');
      if (th) td.setAttribute('scope', inHead ? 'col' : 'row');
      moveInstrumentation(cell, td);
      td.append(...cell.childNodes);
      tr.append(td);
    });
    if (inHead) thead.append(tr);
    else tbody.append(tr);
  });
  table.append(...(thead.children.length ? [thead] : []), tbody);
  // rows of a different Columns setting (changed after rows were added): every row as wide
  const width = Math.max(0, ...[...table.rows].map((tr) => tr.cells.length));
  [...table.rows].forEach((tr) => {
    while (tr.cells.length < width) tr.append(document.createElement(tr.parentElement === thead ? 'th' : 'td'));
  });

  // the table's name: the heading before it
  const heading = nameTable(table, block);
  block.replaceChildren(table);

  // wider than its container: a region keyboard users can focus to scroll it
  observeScrollRegion(block, heading?.textContent.trim() || t('table', 'Table'));
}
