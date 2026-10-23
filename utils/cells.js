/**
 * Cells utils: tell the item rows of a block from its own rows, read the cells of item rows (one
 * cell per model field) when AEM may leave out fields that were never set, and drop the cells
 * AEM renders for the dialog tabs.
 */

const isEmpty = (cell) => !cell?.textContent.trim() && !cell?.querySelector('img, picture, a[href]');

/** an item row of a key-value block: its own rows are name | value; items have 1 or 3+ cells */
export const KEY_VALUE_ITEM = (row) => row.children.length !== 2;

/** an item row of a block with a row per field (one cell each): item models have 2+ cells */
export const FIELD_ROW_ITEM = (row) => row.children.length > 1;

/**
 * The item rows of a block (components added to it with Add, e.g. a Hero's CTAs): AEM renders
 * them after the block's own rows, a cell per field of the item model, empty cells included. In
 * Universal Editor the rows carry their model; on the page the row's cells tell them apart.
 * @param {Element} block
 * @param {string[]} models the item models, e.g. ['hero-cta']
 * @param {(row: Element) => boolean} isItem KEY_VALUE_ITEM or FIELD_ROW_ITEM, maybe narrowed
 *   when a block has items of several models
 * @returns {Element[]}
 */
export function itemRows(block, models, isItem) {
  return [...block.children].filter((row) => {
    const model = row.dataset.aueModel;
    return model ? models.includes(model) : isItem(row);
  });
}

/**
 * The field cells of an item row without its dialog tabs: AEM renders an empty cell for each tab
 * (component "tab") of the item model, in model order. A row with a cell per field and tab loses
 * the tab cells; a row without them (e.g. markup of a block made before tabs, or fields AEM left
 * out) is returned as it is.
 * @param {Element[]} cells
 * @param {Array<string|null>} layout the model's fields and tabs in order (null for a tab;
 *   collapsed and grouped fields count once)
 * @returns {Element[]}
 */
export function withoutTabCells(cells, layout) {
  const tabCells = layout.map((field, i) => (field === null ? cells[i] : null)).filter(Boolean);
  if (cells.length !== layout.length || !tabCells.every(isEmpty)) return cells;
  return cells.filter((cell, i) => layout[i] !== null);
}

/**
 * Matches the cells of a row to its model fields: a row with a cell per field is read in field
 * order; otherwise an empty cell keeps its field's place and a cell with a value goes to the
 * next field it fits (a field AEM left out is skipped).
 * @param {Element[]} cells
 * @param {string[]} fields the model's fields, in order (grouped fields count once)
 * @param {Object<string, (cell: Element) => boolean>} matchers what a value of each field is like
 * @param {{ tail?: string[] }} [options] tail: the model's last fields (e.g. toggles), read from
 *   the end of a row that isn't a cell per field: its last cells that are empty or fit them
 *   belong to them, so a value of the last field can't move to an earlier field of its kind
 * @returns {Object<string, Element>} the cell of each field found
 */
export function matchCells(cells, fields, matchers, { tail = [] } = {}) {
  const matched = {};
  if (cells.length === fields.length) {
    fields.forEach((field, i) => {
      if (!isEmpty(cells[i])) matched[field] = cells[i];
    });
    return matched;
  }
  const fits = (cell, field) => matchers[field]?.(cell) ?? true;
  let count = 0;
  while (count < Math.min(tail.length, cells.length)) {
    const cell = cells[cells.length - 1 - count];
    if (!isEmpty(cell) && !fits(cell, tail[tail.length - 1 - count])) break;
    count += 1;
  }
  const tailFields = tail.slice(tail.length - count);
  cells.slice(cells.length - count).forEach((cell, i) => {
    if (!isEmpty(cell)) matched[tailFields[i]] = cell;
  });
  const rest = fields.filter((field) => !tailFields.includes(field));
  let next = 0;
  cells.slice(0, cells.length - count).forEach((cell) => {
    if (next >= rest.length) return;
    if (isEmpty(cell)) {
      next += 1;
      return;
    }
    const index = rest.findIndex((field, i) => i >= next && fits(cell, field));
    if (index < 0) return;
    matched[rest[index]] = cell;
    next = index + 1;
  });
  return matched;
}
