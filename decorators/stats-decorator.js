/**
 * Stats decorator: builds the Stats of a block (testimonial, teaser, ...) from its Stat items
 * (Stats Title and Stats Value each) and, authored before them, its Stats composite
 * multifield, as a description list.
 */
import { moveInstrumentation } from '../scripts/scripts.js';
import { readMultifieldItems } from '../utils/multifield.js';
import { buildEditorItems } from './editor-item-decorator.js';

/**
 * Reads the Stats composite multifield: items are runs of elements between <hr>s (or list
 * items). The last element of an item is the Stats Value, the ones before it the Stats Title.
 * @param {Element} cell
 * @returns {{ label: Element[], value: Element[] }[]}
 */
function readStats(cell) {
  return readMultifieldItems(cell)
    // a list item holds the stat's elements
    .map((item) => (item.length === 1 && item[0].tagName === 'LI' ? [...item[0].children] : item))
    .filter((item) => item.length)
    .map((item) => ({
      label: item.slice(0, -1),
      value: [item[item.length - 1]],
    }));
}

/**
 * Reads Stat item rows: the last cell is the Stats Value, the one before it the Stats Title
 * (an empty cell for the item's dialog tab comes first).
 * @param {Element[]} rows
 * @returns {{ label: Node[], value: Node[], row: Element }[]}
 */
function readStatRows(rows) {
  return rows.map((row) => {
    const cells = [...row.children];
    const value = cells[cells.length - 1];
    const label = cells.length > 1 ? cells[cells.length - 2] : null;
    return { label: [...(label?.childNodes || [])], value: [...(value?.childNodes || [])], row };
  }).filter(({ value }) => value.some((node) => node.textContent.trim()));
}

/**
 * The stats as a <dl>, the Stats Title above its value; classes {prefix}-stats, -stat,
 * -stat-label and -stat-value. In the editor, Stat items without a value are placeholders.
 * @param {Element} cell the Stats property cell (stats authored before Stat items)
 * @param {string} prefix the block name, e.g. "teaser"
 * @param {Element[]} [rows] the Stat item rows
 * @param {string} [hint] the editor placeholder text (see editorItemHint)
 * @returns {HTMLDListElement|null}
 */
// eslint-disable-next-line import/prefer-default-export
export function buildStats(cell, prefix, rows = [], hint = '') {
  const items = readStatRows(rows);
  const stats = [...readStats(cell), ...items];
  const rendered = new Set(items.map(({ row }) => row));
  const pending = buildEditorItems(rows.filter((row) => !rendered.has(row)), hint);
  if (!stats.length && !pending.length) return null;
  const list = document.createElement('dl');
  list.className = `${prefix}-stats`;
  stats.forEach(({ label, value, row }) => {
    const item = document.createElement('div');
    item.className = `${prefix}-stat`;
    if (row) moveInstrumentation(row, item);
    const dt = document.createElement('dt');
    dt.className = `${prefix}-stat-label`;
    dt.append(...label);
    const dd = document.createElement('dd');
    dd.className = `${prefix}-stat-value`;
    dd.append(...value);
    item.append(dt, dd);
    list.append(item);
  });
  list.append(...pending);
  if (cell) moveInstrumentation(cell, list);
  return list;
}
