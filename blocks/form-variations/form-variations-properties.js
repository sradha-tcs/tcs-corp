/**
 * Form Variations block properties (eyebrow, eyebrow icon, heading, heading level, description,
 * background image, submit action) from the block's property rows, without the DOM (unit tested:
 * test/form-variations/properties.test.mjs).
 *
 * In Universal Editor every value carries its field name (data-aue-prop). On published pages the
 * rows are positional, but their positions differ from page to page: an empty row per dialog tab
 * on some, none on others, empty rows for optional fields left blank, and the layout of the model
 * version the page was saved with (fields added later). So without field names the values are
 * told apart by their kind and order, not by their row:
 * - empty rows carry no value and are skipped (tab rows, empty optional fields)
 * - h1 to h6 is the heading level; the text just before it is the heading
 * - an image (a picture, or a link or text to an image file) is the eyebrow icon when a text
 *   follows it (the icon stands before the heading; the text before it is the eyebrow), else the
 *   background image
 * - a link or path that isn't an image is the submit action
 * - the other texts, in order: eyebrow, heading, description when there are three; heading and
 *   description when there are two; the heading alone when there is one
 */

export const PROPERTY_NAMES = [
  'formEyebrow', 'formEyebrowIcon', 'formHeading', 'formHeadingLevel', 'formDescription',
  'bgImage', 'formAction',
];

export const HEADING_LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const IMAGE_FILE = /\.(avif|gif|jpe?g|png|svg|webp)([?#]|$)/i;
const PATH = /^(https?:\/\/|\/)\S+$/i;

const clean = (value) => String(value ?? '').trim();

/**
 * @typedef {Object} PropertyValue the value of one property row
 * @property {string} [prop] its field name (data-aue-prop, Universal Editor only)
 * @property {string} text its text
 * @property {boolean} [image] whether it holds a picture or an image
 * @property {string} [href] the href of its link
 */

/**
 * The row index of each property's value.
 * @param {PropertyValue[]} values one per property row, in row order
 * @returns {Object<string, number>} property name: index into values (no entry: not authored)
 */
export function mapProperties(values) {
  // Universal Editor: by field name
  const named = {};
  values.forEach((value, index) => {
    const name = value.prop;
    if (PROPERTY_NAMES.includes(name) && named[name] === undefined) named[name] = index;
  });
  if (Object.keys(named).length) return named;

  // published pages: by kind and order
  const filled = values
    .map((value, index) => ({
      index, text: clean(value.text), image: !!value.image, href: clean(value.href),
    }))
    .filter((value) => value.text || value.image || value.href);
  const isImage = (value) => value.image || IMAGE_FILE.test(value.href || value.text);
  const isLevel = (value) => !isImage(value) && !value.href
    && HEADING_LEVELS.includes(value.text.toLowerCase());
  const isAction = (value) => !isImage(value) && !isLevel(value)
    && (!!value.href || PATH.test(value.text));

  const result = {};
  const level = filled.find(isLevel);
  if (level) result.formHeadingLevel = level.index;
  const action = filled.find(isAction);
  if (action) result.formAction = action.index;
  let texts = filled.filter((value) => !isImage(value) && !isLevel(value) && !isAction(value));
  const take = (name, value) => {
    if (!value || result[name] !== undefined) return;
    result[name] = value.index;
    texts = texts.filter((text) => text !== value);
  };

  filled.filter(isImage).forEach((image) => {
    const textAfter = texts.some((text) => text.index > image.index);
    if (textAfter && result.formEyebrowIcon === undefined) {
      result.formEyebrowIcon = image.index;
      // the eyebrow stands just before its icon
      take('formEyebrow', texts.filter((text) => text.index < image.index).pop());
    } else if (result.bgImage === undefined) {
      result.bgImage = image.index;
    }
  });

  if (level) {
    // the heading stands just before its level, the eyebrow before the heading
    const heading = texts.filter((text) => text.index < level.index).pop();
    if (heading) {
      take('formHeading', heading);
      take('formEyebrow', texts.filter((text) => text.index < heading.index).pop());
    }
  }

  if (result.formHeading === undefined) {
    if (result.formEyebrow === undefined && texts.length >= 3) take('formEyebrow', texts[0]);
    take('formHeading', texts[0]);
  }
  take('formDescription', texts.find((text) => text.index > (result.formHeading ?? -1)));
  return result;
}

/**
 * The heading level of the title: h1 to h6, or '' (not chosen: h2 at the form's own size)
 * @param {string} value the Heading level field's text
 */
export const headingLevelOf = (value) => {
  const level = clean(value).toLowerCase();
  return HEADING_LEVELS.includes(level) ? level : '';
};
