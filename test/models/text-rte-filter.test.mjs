// The Text component's rich text toolbar in Universal Editor: the filter the Text definition names
// must exist with an rte configuration, and Text components authored before it was configured
// (no filter property) get it in the editor (scripts/editor-support-rte.js). node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TEXT_RTE_FILTER, applyTextRteFilter } from '../../scripts/editor-support-rte.js';

const read = (file) => JSON.parse(readFileSync(new URL(`../../${file}`, import.meta.url)));
const text = read('component-definition.json').groups.flatMap((g) => g.components).find((c) => c.id === 'text');
const filters = read('component-filters.json');

describe('Text RTE filter', () => {
  it('is the filter the Text definition names', () => {
    assert.equal(text.plugins.xwalk.page.template.filter, TEXT_RTE_FILTER);
  });

  it('exists in component-filters.json with a toolbar (npm run build:json was run)', () => {
    const filter = filters.find((f) => f.id === TEXT_RTE_FILTER);
    assert.ok(filter, `component-filters.json has the filter ${TEXT_RTE_FILTER}`);
    assert.ok(filter.rte?.toolbar && filter.rte?.actions);
  });

  // Edge Delivery publishes only semantic formatting: no style, class or dir attributes, and a
  // table in default content becomes a block (aem.live markup reference, AGENTS.md)
  it('offers only tools whose result Edge Delivery publishes', () => {
    const { toolbar, actions } = filters.find((f) => f.id === TEXT_RTE_FILTER).rte;
    ['alignment', 'direction', 'advanced'].forEach((group) => assert.ok(!(group in toolbar), `no ${group} tools`));
    assert.ok(!toolbar.format.includes('text_color'), 'no text colour');
    assert.ok(!toolbar.insert.includes('table') && !('table' in actions), 'no table in a Text');
    assert.equal(actions.indentation?.scope, 'lists', 'indent only nests list items');
    assert.equal(actions.link?.hideTarget, true, 'no link target (not delivered)');
    const { sections, ...groups } = toolbar;
    assert.deepEqual([...sections].sort(), Object.keys(groups).sort(), 'every group in sections, once');
  });

  it('is given to Text components without a filter, and only to those', () => {
    let selector;
    const old = { dataset: {} };
    const container = { querySelectorAll: (s) => { selector = s; return [old]; } };
    applyTextRteFilter(container);
    assert.equal(old.dataset.aueFilter, TEXT_RTE_FILTER);
    assert.match(selector, /\[data-aue-type="richtext"\]/);
    assert.match(selector, /\[data-aue-behavior="component"\]/, 'Text components, not block fields');
    assert.match(selector, /:not\(\[data-aue-filter\]\)/, 'a filter AEM wrote is kept');
  });
});
