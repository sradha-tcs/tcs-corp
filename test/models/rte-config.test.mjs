// The Universal Editor rich text editor configuration (models/_rte.json, KB-D-080): every
// component with a rich text field has a filter with the toolbar; the built-in Text has no table
// (a table in default content becomes a block); the Rich Text block's model. node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../../', import.meta.url).pathname;
const read = (path) => JSON.parse(readFileSync(`${root}${path}`, 'utf8'));
const definitions = read('component-definition.json').groups.flatMap((g) => g.components);
const models = new Map(read('component-models.json').map((m) => [m.id, m]));
const filters = new Map(read('component-filters.json').map((f) => [f.id, f]));
const rte = read('models/_rte.json');
const hasRichtext = (fields) => (fields || []).some((f) => f.component === 'richtext' || hasRichtext(f.fields));
const templateOf = (def) => def.plugins?.xwalk?.page?.template || {};

describe('RTE configuration', () => {
  it('gives every component with a rich text field a filter with the toolbar', () => {
    const withRichtext = definitions.filter((def) => def.id === 'text' || hasRichtext(models.get(templateOf(def).model)?.fields));
    assert.ok(withRichtext.length >= 30, `found ${withRichtext.length}`);
    withRichtext.forEach((def) => {
      const filter = filters.get(templateOf(def).filter);
      assert.ok(filter, `${def.id}: no filter`);
      assert.ok(filter.rte?.toolbar && filter.rte?.actions, `${def.id}: filter ${filter.id} has no RTE configuration`);
    });
  });

  it('keeps the built-in Text without tables, the blocks with them', () => {
    const text = filters.get(templateOf(definitions.find((d) => d.id === 'text')).filter);
    assert.equal(text.id, 'text');
    assert.ok(!text.rte.toolbar.insert.includes('table'));
    assert.ok(!('table' in text.rte.actions));
    assert.ok(filters.get('rich-text').rte.toolbar.insert.includes('table'));
  });

  it('uses the semantic tags Edge Delivery delivers', () => {
    [rte.rte, rte.text].forEach((config) => {
      assert.equal(config.actions.bold.tag, 'strong');
      assert.equal(config.actions.italic.tag, 'em');
      assert.equal(config.actions.strike.tag, 'del');
      assert.equal(config.actions.bullet_list.wrapInParagraphs, false);
      assert.ok(config.toolbar.sr_script.includes('superscript'));
    });
  });

  it('adds the toolbar without changing which children a block accepts', () => {
    assert.deepEqual(filters.get('quote').components, []);
    assert.ok(filters.get('accordion-item'));
    assert.ok(filters.get('hero').components.includes('hero-cta'));
  });
});

describe('Rich Text block model', () => {
  const model = models.get('rich-text');
  const def = definitions.find((d) => d.id === 'rich-text');

  it('is a key-value block named after its folder, with its filter', () => {
    assert.equal(templateOf(def).name, 'Rich Text');
    assert.equal(templateOf(def)['key-value'], true);
    assert.equal(templateOf(def).filter, 'rich-text');
  });

  it('has the tabs Content, Style and Additional', () => {
    assert.deepEqual(model.fields.filter((f) => f.component === 'tab').map((f) => f.label), ['Content', 'Style', 'Additional']);
  });

  it('delivers the styles as block classes, with names that survive delivery', () => {
    const style = model.fields.slice(model.fields.findIndex((f) => f.name === 'styleTab') + 1, model.fields.findIndex((f) => f.name === 'additionalTab'));
    assert.ok(style.length >= 6);
    style.forEach((field) => {
      assert.match(field.name, /^classes_/);
      assert.doesNotMatch(field.name, /(Text|Title|Type|Alt|MimeType)$/);
      assert.ok(field.options.every((o) => o.value === '' || /^[a-z0-9-]+$/.test(o.value)), field.name);
    });
  });

  it('is offered where Text is offered', () => {
    ['section', 'columns-container', 'tabs'].forEach((id) => {
      const list = filters.get(id).components;
      assert.ok(list.includes('rich-text'), id);
      assert.equal(list.indexOf('rich-text'), list.indexOf('text') + 1, id);
    });
  });
});
