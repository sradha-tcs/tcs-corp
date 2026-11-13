// The page's Page Type (utils/page-type.js): the metadata sheet's template column overrides the
// page dialog's Page Type (page-type), in the page and in index rows: node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pageTypeOf } from '../../utils/page-type.js';

describe('pageTypeOf', () => {
  it('takes the sheet\'s template over the dialog\'s Page Type', () => {
    assert.equal(pageTypeOf('press-release', 'article'), 'press-release');
    assert.equal(pageTypeOf(' blog ', 'article'), 'blog');
  });
  it('falls back to the dialog\'s Page Type without a sheet value', () => {
    assert.equal(pageTypeOf('', 'article'), 'article');
    assert.equal(pageTypeOf(undefined, 'listing'), 'listing');
    assert.equal(pageTypeOf('  ', 'home'), 'home');
  });
  it('is empty when neither is set', () => {
    assert.equal(pageTypeOf('', ''), '');
    assert.equal(pageTypeOf(undefined, undefined), '');
  });
});

describe('query index', () => {
  it('indexes the sheet\'s template next to pageType in every index', () => {
    const yaml = readFileSync(new URL('../../helix-query.yaml', import.meta.url), 'utf8');
    const indexes = (yaml.match(/^ {2}\w+:\n {4}include:/gm) || []).length;
    assert.ok(indexes >= 4);
    assert.equal((yaml.match(/select: head > meta\[name="page-type"\]/g) || []).length, indexes);
    assert.equal((yaml.match(/template:\n {8}select: head > meta\[name="template"\]/g) || []).length, indexes);
  });
});
