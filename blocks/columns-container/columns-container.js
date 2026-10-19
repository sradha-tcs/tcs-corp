import { getPlaceholders } from '../../utils/placeholders.js';
import { readColumn } from '../column-break/column-break.js';

/*
 * Columns Container: a section (blocks/columns-container/_columns-container.json) whose content
 * is laid out in columns. scripts.js wraps the section's content in this synthetic block; each
 * Column Break item (blocks/column-break) starts a column and the components after it, up to the
 * next Column Break, are the column's content: default content and any block, as in a section
 * (Edge Delivery has no blocks in blocks). Content before the first Column Break is a column of
 * its own. Layout: Columns per row (more Columns start new rows), Column widths, Gap, Vertical
 * alignment and Side by side from (block classes).
 *
 * A column is a plain element (not a block): the Column Break stays in it as its first child (the
 * column's label in the editor, hidden on the page) and its block options (spacing, Hide block,
 * Anchor ID) are copied to the column. So Universal Editor updates of the components in a column
 * find their own block, not the Column Break.
 */

const MAX_COLUMNS = 4;

/** the Additional tab classes of a Column Break that apply to its column */
const COLUMN_OPTIONS = /^(hideblock|(p|m)[lrtb]-\d+)$/;

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

/** a column for a Column Break (null: content before the first one) */
function createColumn(marker) {
  const column = document.createElement('div');
  column.className = 'columns-container-column';
  if (!marker) return column;
  readColumn(marker);
  [...marker.classList].filter((name) => COLUMN_OPTIONS.test(name))
    .forEach((name) => column.classList.add(name));
  const anchor = [...marker.classList].find((name) => name.startsWith('anchor-'));
  if (anchor) column.id = anchor;
  return column;
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
    if (marker || !columns.length) columns.push(createColumn(marker));
    // the Column Break (in its wrapper) is the column's first child, then its content
    columns[columns.length - 1].append(wrapper);
  });

  columns.forEach((column) => {
    const hasContent = [...column.children].some((child) => !child.querySelector(':scope > .column-break'));
    if (hasContent) return;
    const hint = document.createElement('p');
    hint.className = 'columns-container-hint';
    hint.textContent = t('columnEmpty', 'Add the components of this column after it.');
    column.append(hint);
  });

  block.classList.add(`columns-container-${perRow(block, columns.length)}`);
  block.replaceChildren(...columns);
  if (!columns.length) {
    const hint = document.createElement('p');
    hint.className = 'columns-container-hint';
    hint.textContent = t('columnsContainerEmpty', 'Add a Column Break, then the components of the column after it.');
    block.append(hint);
  }
}
