// Text styles of the built-in Text (KB-D-083): the Rich Text block's Style options as Section
// fields (models/_text.json sectionFields, the Section's Text tab), read by utils/text-styles.js.
// node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TEXT_STYLE_OPTIONS, TEXT_STYLE_ROWS, textStyleClasses } from '../../utils/text-styles.js';

const root = new URL('../../', import.meta.url).pathname;
const read = (path) => JSON.parse(readFileSync(`${root}${path}`, 'utf8'));
const text = read('models/_text.json');
const models = new Map(read('component-models.json').map((m) => [m.id, m]));
const styleFields = text.sectionFields.filter((f) => f.component !== 'tab');
const rowName = (name) => name.toLowerCase();

describe('Text styles model', () => {
  it('defines the text styles once, in models/_text.json, spread into the Section model', () => {
    const section = models.get('section').fields.map((f) => f.name);
    text.sectionFields.forEach((f) => assert.ok(section.includes(f.name), f.name));
    assert.equal(text.sectionFields[0].component, 'tab');
    assert.equal(text.sectionFields[0].label, 'Text');
  });

  it('keeps the built-in Text a fixed model (only its text is delivered)', () => {
    assert.deepEqual(text.models, []);
    assert.equal(text.definitions[0].plugins.xwalk.page.resourceType, 'core/franklin/components/text/v1/text');
  });

  it('offers the values utils/text-styles.js turns into classes', () => {
    assert.deepEqual(styleFields.map((f) => rowName(f.name)), TEXT_STYLE_ROWS);
    styleFields.forEach((field) => {
      const values = field.options.map((o) => o.value).filter(Boolean);
      assert.deepEqual(values, Object.keys(TEXT_STYLE_OPTIONS[rowName(field.name)]), field.name);
      assert.equal(field.options[0].value, '', `${field.name}: the default first`);
    });
  });

  it('uses Section field names that are delivered (not classes_*, no collapsing suffix)', () => {
    styleFields.forEach(({ name }) => {
      assert.doesNotMatch(name, /^classes_/);
      assert.doesNotMatch(name, /(Text|Title|Type|Alt|MimeType)$/);
    });
  });
});

describe('textStyleClasses', () => {
  it('maps the delivered values to section classes', () => {
    const rows = {
      textalign: { text: 'center' },
      textsize: { text: 'Large' },
      textlead: { text: 'lead' },
      textcolor: { text: 'brand' },
      textcolumns: { text: '2' },
      underlinestyle: { text: 'highlight' },
      textdirection: { text: 'rtl' },
      externallinks: { text: 'new-tab' },
    };
    assert.deepEqual(textStyleClasses(rows), [
      'text-align-center', 'text-size-large', 'text-lead', 'text-color-brand', 'text-columns-2',
      'text-underline-highlight', 'text-dir-rtl', 'text-links-new-tab',
    ]);
  });

  it('ignores empty, unknown and missing values', () => {
    assert.deepEqual(textStyleClasses({}), []);
    assert.deepEqual(textStyleClasses(undefined), []);
    assert.deepEqual(textStyleClasses({ textalign: { text: '' }, textsize: { text: 'huge' }, other: { text: 'x' } }), []);
  });
});
