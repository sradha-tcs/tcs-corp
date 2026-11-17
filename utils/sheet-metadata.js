/**
 * Sheet metadata utils: values that both the page dialog and the metadata sheet set. The sheet's
 * value overrides the dialog's, everywhere (page head, template, Page Header, index rows and the
 * cards built from them):
 *
 * | Value       | Sheet column       | Page dialog             |
 * |-------------|--------------------|-------------------------|
 * | Page Type   | `sheet-page-type`  | Page Type (`page-type`) |
 * | Title       | `meta-title`       | Title                   |
 * | Description | `meta-description` | Description             |
 *
 * Read by scripts.js (template, body class), decorators/seo-decorator.js, utils/metadata.js and
 * utils/query-index.js (index rows).
 *
 * The sheet columns have names of their own because Edge Delivery lets a page's own metadata win
 * over a sheet column of the same name. Pure (no DOM).
 */

/**
 * The sheet's value, else the dialog's.
 * @param {string} sheet the metadata sheet's value
 * @param {string} dialog the page dialog's value
 * @returns {string} trimmed, as authored ('' when neither is set)
 */
// eslint-disable-next-line import/prefer-default-export
export function sheetOverrides(sheet, dialog) {
  return String(sheet || '').trim() || String(dialog || '').trim();
}
