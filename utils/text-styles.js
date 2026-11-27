/**
 * Text styles of default content (KB-D-083): the Rich Text block's Style options for the built-in
 * Text component. The built-in Text delivers only its text (a fixed model), so the options are
 * Section fields (models/_text.json `sectionFields`, in the Section dialog's Text tab), delivered
 * as section metadata; scripts.js decorateSectionsWithOptions turns them into section classes
 * that styles/styles.css applies to the section's default content (Text, Title, buttons).
 */

/**
 * The section metadata rows (normalized names) and their values, each with its class.
 * Keep in step with models/_text.json (test/models/text-styles.test.mjs).
 */
export const TEXT_STYLE_OPTIONS = {
  textalign: { center: 'text-align-center', right: 'text-align-right', justify: 'text-align-justify' },
  textsize: { small: 'text-size-small', large: 'text-size-large' },
  textlead: { lead: 'text-lead' },
  textcolor: { secondary: 'text-color-secondary', brand: 'text-color-brand' },
  textcolumns: { 2: 'text-columns-2', 3: 'text-columns-3' },
  underlinestyle: { brand: 'text-underline-brand', secondary: 'text-underline-secondary', highlight: 'text-underline-highlight' },
  textdirection: { rtl: 'text-dir-rtl' },
  externallinks: { 'new-tab': 'text-links-new-tab' },
};

/** the row names, for the section options scripts.js reads */
export const TEXT_STYLE_ROWS = Object.keys(TEXT_STYLE_OPTIONS);

/**
 * The section classes of the authored text style values; unknown values are ignored.
 * @param {Object<string, {text: string}>} rows section options by normalized row name
 * @returns {string[]}
 */
export function textStyleClasses(rows) {
  return TEXT_STYLE_ROWS
    .map((row) => TEXT_STYLE_OPTIONS[row][String(rows?.[row]?.text ?? '').trim().toLowerCase()])
    .filter(Boolean);
}
