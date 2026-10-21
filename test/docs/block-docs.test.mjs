import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { conditionText, fieldTables } from '../../tools/docs/generate-block-docs.mjs';
import { headingsOf, slug, validateAll } from '../../tools/docs/validate-block-docs.mjs';

const root = new URL('../../', import.meta.url).pathname.replace(/\/$/, '');
const { results, folderProblems } = validateAll(root);

describe('block documentation (npm run build:docs)', () => {
  it('every block folder has a README listed in blocks/README.md', () => {
    assert.deepEqual(folderProblems, []);
  });
  results.forEach((r) => {
    it(`${r.file} is current and valid`, () => {
      assert.deepEqual(r.problems, []);
    });
  });
});

describe('block documentation helpers', () => {
  it('writes visibility conditions in words', () => {
    assert.equal(conditionText({ '===': [{ var: 'showDate' }, true] }), '`showDate` is `true`');
    assert.equal(conditionText({ '!': { var: 'multiLinks' } }), '`multiLinks` is off or empty');
    assert.equal(conditionText({ or: [{ '!': { var: 'classes' } }, { '===': [{ var: 'classes' }, ''] }] }), '`classes` is off or empty or `classes` is empty');
  });
  it('splits a model at its tabs', () => {
    const tables = fieldTables({ fields: [{ component: 'tab', label: 'Content', name: 'c' }, { component: 'text', name: 'title', label: 'Title' }, { component: 'text', name: 'titleType', label: 'Title Type' }] }, new Set(['title', 'titleType']));
    assert.equal(tables.length, 1);
    assert.equal(tables[0].tab, 'Content');
    assert.match(tables[0].rows[1].guidance, /Delivered with `title` \(field collapse\)/);
  });
  it('makes GitHub heading anchors', () => {
    assert.equal(slug('Data Layer and Analytics'), 'data-layer-and-analytics');
    assert.equal(slug('Authoring Step 2: Add the CTA'), 'authoring-step-2-add-the-cta');
    assert.deepEqual(headingsOf('# A\n## B\n## B').map((h) => h.anchor), ['a', 'b', 'b-1']);
  });
});
