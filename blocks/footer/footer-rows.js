/**
 * Footer rows: the roles of the authored Footer block's rows (blocks/footer/_footer.json). The
 * block's fields come first, one cell each: Conversation Canvas Page, Copyright Text, Link List
 * and Logo; then a row per Footer Column item. Footers authored before the Logo field and the
 * columns existed have the first three rows only. A pure module (no DOM), so it can be tested
 * in Node.
 */

/** the block field rows, in model order */
export const FIELD_ROLES = ['canvas', 'copyright', 'links', 'logo'];

/** the model of a Footer Column item (data-aue-model in Universal Editor) */
export const COLUMN_MODEL = 'footer-column';

/** the Show As value of a column shown as the row of regional links */
export const REGIONAL = 'regional';

/**
 * The role of each row: canvas, copyright, links, logo or column. In Universal Editor items
 * carry their model; on the published page, the Logo row is the fourth row with one cell that
 * holds an image or nothing, and every other row after the Link List is a column.
 * @param {{ model?: string, cells: number, image: boolean, text: boolean }[]} rows
 * @returns {string[]}
 */
export function rowRoles(rows) {
  return rows.map((row, index) => {
    if (row.model === COLUMN_MODEL) return 'column';
    if (index < 3) return FIELD_ROLES[index];
    if (index === 3 && !row.model && row.cells <= 1 && (row.image || !row.text)) return 'logo';
    return 'column';
  });
}

/**
 * The placement (Show As) of a column: regional, else a link column (default).
 * @param {string} value the Show As cell's text
 */
export const placementOf = (value) => (
  (value || '').trim().toLowerCase() === REGIONAL ? REGIONAL : 'default'
);
