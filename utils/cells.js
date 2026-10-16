/**
 * Cells utils: read the cells of block item rows (one cell per model field) when AEM may leave
 * out fields that were never set, and drop the cells AEM renders for the dialog tabs.
 */

const isEmpty = (cell) => !cell?.textContent.trim() && !cell?.querySelector('img, picture, a[href]');

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
 * @returns {Object<string, Element>} the cell of each field found
 */
export function matchCells(cells, fields, matchers) {
  const matched = {};
  if (cells.length === fields.length) {
    fields.forEach((field, i) => {
      if (!isEmpty(cells[i])) matched[field] = cells[i];
    });
    return matched;
  }
  let next = 0;
  cells.forEach((cell) => {
    if (next >= fields.length) return;
    if (isEmpty(cell)) {
      next += 1;
      return;
    }
    const index = fields.findIndex((field, i) => i >= next && (matchers[field]?.(cell) ?? true));
    if (index < 0) return;
    matched[fields[index]] = cell;
    next = index + 1;
  });
  return matched;
}
