// Form Variations: the item cells the builders read match the item models (node --test)
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  FIELD_LAYOUT, ITEM_TYPES, KEYED_TYPES, PREVIOUS_FIELD_LAYOUT, PROPERTY_LAYOUT, fieldsOf,
  keyedCells, propertiesOf,
} from '../../blocks/form-variations/form-layout.js';
import modelLayout from '../model-layout.mjs';

const FILE = 'blocks/form-variations/_form-variations.json';

describe('form-variations item layout', () => {
  ITEM_TYPES.forEach((type) => {
    it(`reads the cells of ${type} in its model order`, () => {
      assert.deepEqual(FIELD_LAYOUT[type], modelLayout(FILE, type));
    });
  });

  it('keys the field items by their fieldName (not the contact cards and buttons)', () => {
    assert.deepEqual(KEYED_TYPES, [
      'field-text', 'field-select', 'field-combined', 'field-textarea', 'field-checkbox', 'field-richtext',
    ]);
  });

  it('names the cells of an item', () => {
    const fields = fieldsOf('field-combined', ['score', 'Score', 'CGPA, Percentage', '', 'true', '']);
    assert.equal(fields.fieldName, 'score');
    assert.equal(fields.options, 'CGPA, Percentage');
    assert.equal(fields.required, 'true');
    assert.equal(fields.dependsOn, '');
  });
});

describe('form-variations properties and earlier content', () => {
  it('reads the block properties in their model order', () => {
    assert.deepEqual(PROPERTY_LAYOUT, modelLayout(FILE, 'form-variations').filter(Boolean));
  });

  it('reads a row of the previous model (no Field width) by its names', () => {
    const fields = fieldsOf('field-text', ['firstName', 'First name', 'text', 'true', '']);
    assert.equal(fields.fieldName, 'firstName');
    assert.equal(fields.required, 'true');
    assert.equal(fields.fieldWidth, undefined);
    assert.equal(keyedCells('field-text'), 5);
  });

  it('reads the properties of the previous model (title, description, action)', () => {
    const props = propertiesOf(['Contact us', 'Tell us more', '/submit', '']);
    assert.equal(props.formHeading, 'Contact us');
    assert.equal(props.formAction, '/submit');
    assert.equal(props.formEyebrow, undefined);
    const current = propertiesOf(['CSR', '/icon.png', 'Contact us', 'Text', '/bg.jpg', '/submit', '']);
    assert.equal(current.formHeading, 'Contact us');
    assert.equal(current.bgImage, '/bg.jpg');
  });

  it('has a previous layout for each item type but the rich text (new)', () => {
    assert.deepEqual(Object.keys(PREVIOUS_FIELD_LAYOUT).sort(), ITEM_TYPES.filter((type) => type !== 'field-richtext').sort());
  });
});
