/**
 * Page type utils: the page's Page Type from its two sources. The metadata sheet's sheet-page-type
 * column (published as <meta name="sheet-page-type">) overrides the page dialog's Page Type (page
 * property page-type, <meta name="page-type">). They have different names because Edge Delivery
 * lets a page's own metadata win over a sheet column of the same name.
 *
 * Read by scripts.js (template and body class), utils/metadata.js and utils/query-index.js (index
 * rows: the sheetPageType and pageType columns). Pure (no DOM).
 */

/**
 * The page type: the sheet's sheet-page-type, else the dialog's Page Type.
 * @param {string} sheet the metadata sheet's sheet-page-type value
 * @param {string} dialog the page dialog's Page Type
 * @returns {string} trimmed, as authored ('' when neither is set)
 */
// eslint-disable-next-line import/prefer-default-export
export function pageTypeOf(sheet, dialog) {
  return String(sheet || '').trim() || String(dialog || '').trim();
}
