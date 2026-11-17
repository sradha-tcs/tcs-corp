/**
 * Keywords utils: the page's keywords from its two sources, the page dialog's Keywords (delivered
 * by AEM as <meta name="keywords">) and the bulk metadata sheet's meta-keywords column, combined
 * as the sheet's keyword-action column says:
 *
 * | keyword-action      | Keywords                                                          |
 * |---------------------|-------------------------------------------------------------------|
 * | default (or empty)  | the dialog overrides the sheet: the dialog's, else the sheet's    |
 * | override            | the sheet overrides the dialog: the sheet's, else the dialog's    |
 * | merge               | both, the dialog's first, each keyword once (case-insensitive)    |
 *
 * Unknown values act as default. Pure (no DOM): decorators/seo-decorator.js applies the result.
 */

export const KEYWORD_ACTIONS = ['default', 'override', 'merge'];

/** the keywords of a comma-separated value, trimmed, without empty entries */
export const keywordsOf = (value) => String(value || '').split(',').map((k) => k.trim()).filter(Boolean);

/** the keyword-action value, lower case; default for an empty or unknown value */
export function keywordActionOf(value) {
  const action = String(value || '').trim().toLowerCase();
  return KEYWORD_ACTIONS.includes(action) ? action : 'default';
}

/**
 * The page's keywords.
 * @param {string} dialog the page dialog's Keywords (comma separated)
 * @param {string} sheet the metadata sheet's meta-keywords (comma separated)
 * @param {string} action the metadata sheet's keyword-action
 * @returns {string} the keywords, comma separated ('' when neither source has any)
 */
export function resolveKeywords(dialog, sheet, action) {
  const fromDialog = keywordsOf(dialog);
  const fromSheet = keywordsOf(sheet);
  let list;
  switch (keywordActionOf(action)) {
    case 'override':
      list = fromSheet.length ? fromSheet : fromDialog;
      break;
    case 'merge': {
      const seen = new Set();
      list = [...fromDialog, ...fromSheet].filter((k) => {
        const key = k.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      break;
    }
    default:
      list = fromDialog.length ? fromDialog : fromSheet;
  }
  return list.join(', ');
}
