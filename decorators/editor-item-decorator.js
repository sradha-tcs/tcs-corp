/**
 * Editor item decorator: in Universal Editor, an item a block doesn't render yet (e.g. a CTA
 * just added with Add, before it has a link) shows as a placeholder the author can select, so
 * Add visibly adds the item. On the page these items are left out.
 */
import { moveInstrumentation } from '../scripts/scripts.js';
import { getPlaceholders } from '../utils/placeholders.js';

const inEditor = (rows) => rows.some((row) => row.hasAttribute('data-aue-resource'));

/**
 * The placeholder text, loaded only in Universal Editor (items carry instrumentation), so the
 * page doesn't wait for the placeholders.
 * @param {Element[]} rows the block's item rows
 * @returns {Promise<string>}
 */
export async function editorItemHint(rows) {
  if (!inEditor(rows)) return '';
  const t = await getPlaceholders();
  return t('itemEditorHint', 'Not shown yet: fill in this item’s properties.');
}

/**
 * Placeholders for the item rows a block didn't render, with their editor instrumentation;
 * none outside Universal Editor (rows without instrumentation).
 * @param {Element[]} rows the item rows not rendered
 * @param {string} hint the placeholder text, from the placeholders
 * @param {string} [tagName] e.g. 'li' in a list
 * @returns {Element[]}
 */
export function buildEditorItems(rows, hint, tagName = 'div') {
  return rows.filter((row) => row.hasAttribute('data-aue-resource')).map((row) => {
    const item = document.createElement(tagName);
    item.className = 'editor-item';
    const text = document.createElement('span');
    text.className = 'editor-item-hint';
    text.textContent = hint;
    item.append(text);
    moveInstrumentation(row, item);
    return item;
  });
}
