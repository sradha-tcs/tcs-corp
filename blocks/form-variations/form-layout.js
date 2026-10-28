/*
 * The cells of the Form Variations items in model order (blocks/form-variations/
 * _form-variations.json), after the "<node name>, <classes>" cell AEM renders first: the builders
 * read the cells by these names. test/form-variations/form-layout.test.mjs keeps them in step
 * with the models.
 */
export const FIELD_LAYOUT = {
  'field-text': ['fieldName', 'label', 'inputKind', 'fieldWidth', 'required', 'dependsOn'],
  'field-select': ['fieldName', 'label', 'fieldWidth', 'required', 'options', 'dependsOn'],
  'field-combined': ['fieldName', 'label', 'options', 'fieldWidth', 'required', 'dependsOn'],
  'field-textarea': ['fieldName', 'label', 'maxLength', 'fieldWidth', 'required', 'dependsOn'],
  'field-checkbox': ['fieldName', 'label', 'fieldWidth', 'required', 'dependsOn'],
  'field-richtext': ['fieldName', 'label', 'fieldWidth', 'dependsOn'],
  'contact-card': ['region', 'contactName', 'emails', 'phones', 'emailIcon', 'phoneIcon', 'fieldWidth'],
  'field-submit': ['label', 'fieldWidth', 'dependsOn'],
};

/**
 * The cells of the items authored (and published) with the model before Field width, the contact
 * icons and the Combined field's label and units: read until those pages are published again.
 */
export const PREVIOUS_FIELD_LAYOUT = {
  'field-text': ['fieldName', 'label', 'inputKind', 'required', 'dependsOn'],
  'field-select': ['fieldName', 'label', 'required', 'options', 'dependsOn'],
  'field-combined': ['fieldName', 'required', 'dependsOn'],
  'field-textarea': ['fieldName', 'label', 'maxLength', 'required', 'dependsOn'],
  'field-checkbox': ['fieldName', 'label', 'required', 'dependsOn'],
  'contact-card': ['region', 'contactName', 'emails', 'phones'],
  'field-submit': ['label', 'dependsOn'],
};

/** the block's own properties in model order (one row each, after the Content tab's empty row) */
export const PROPERTY_LAYOUT = [
  'formEyebrow', 'formEyebrowIcon', 'formHeading', 'formDescription', 'bgImage', 'formAction',
];

/** the block's properties of the model before the Eyebrow and the Background image */
export const PREVIOUS_PROPERTY_LAYOUT = ['formHeading', 'formDescription', 'formAction'];

/** the item types */
export const ITEM_TYPES = Object.keys(FIELD_LAYOUT);

/** the item types whose first field is the field key */
export const KEYED_TYPES = ITEM_TYPES.filter((type) => FIELD_LAYOUT[type][0] === 'fieldName');

/** the fewest cells of an item that has its fieldName cell (the previous model's) */
export const keyedCells = (type) => (PREVIOUS_FIELD_LAYOUT[type] || FIELD_LAYOUT[type]).length;

/**
 * The field cells of an item by their model names: the current model's, or the previous model's
 * for a row with fewer cells.
 * @param {string} type the item type
 * @param {Element[]} cells the item's field cells in model order
 * @returns {Object<string, Element | undefined>}
 */
export function fieldsOf(type, cells) {
  const current = FIELD_LAYOUT[type];
  const layout = cells.length < current.length && PREVIOUS_FIELD_LAYOUT[type]
    ? PREVIOUS_FIELD_LAYOUT[type] : current;
  return Object.fromEntries(layout.map((name, i) => [name, cells[i]]));
}

/**
 * The block's property cells by their model names: the current model's, or the previous model's
 * when there are fewer rows (the Additional tab's empty row follows them).
 * @param {Array<Element | undefined>} cells the property cells, without the Content tab's row
 * @returns {Object<string, Element | undefined>}
 */
export function propertiesOf(cells) {
  const current = cells.length >= PROPERTY_LAYOUT.length;
  const layout = current ? PROPERTY_LAYOUT : PREVIOUS_PROPERTY_LAYOUT;
  return Object.fromEntries(layout.map((name, i) => [name, cells[i]]));
}
