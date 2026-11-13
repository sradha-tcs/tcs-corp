// The metadata sheet's values override the page dialog's (utils/sheet-metadata.js): Page Type
// (sheet-page-type), Title (meta-title) and Description (meta-description), in the page and in
// index rows: node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sheetOverrides } from '../../utils/sheet-metadata.js';

describe('sheetOverrides', () => {
  it('takes the sheet\'s value over the dialog\'s, as authored', () => {
    assert.equal(sheetOverrides('press-release', 'article'), 'press-release');
    assert.equal(sheetOverrides(' blog ', 'article'), 'blog');
    assert.equal(sheetOverrides('Cloud for banks | TCS', 'Cloud for banks'), 'Cloud for banks | TCS', 'the title suffix kept');
    assert.equal(sheetOverrides('Sheet description', 'Dialog description'), 'Sheet description');
  });
  it('falls back to the dialog\'s value without a sheet value', () => {
    assert.equal(sheetOverrides('', 'article'), 'article');
    assert.equal(sheetOverrides(undefined, 'Cloud for banks'), 'Cloud for banks');
    assert.equal(sheetOverrides('  ', 'home'), 'home');
  });
  it('is empty when neither is set', () => {
    assert.equal(sheetOverrides('', ''), '');
    assert.equal(sheetOverrides(undefined, undefined), '');
  });
});

describe('query index', () => {
  const yaml = readFileSync(new URL('../../helix-query.yaml', import.meta.url), 'utf8');
  const indexes = (yaml.match(/^ {2}\w+:\n {4}include:/gm) || []).length;
  it('has both the dialog\'s and the sheet\'s value in every index', () => {
    assert.ok(indexes >= 4);
    [
      ['pageType', 'page-type'], ['sheetPageType', 'sheet-page-type'],
      ['metaTitle', 'meta-title'], ['metaDescription', 'meta-description'],
    ].forEach(([column, meta]) => {
      const re = new RegExp(`${column}:\\n {8}select: head > meta\\[name="${meta}"\\]`, 'g');
      assert.equal((yaml.match(re) || []).length, indexes, column);
    });
    assert.equal((yaml.match(/ title:\n {8}select: head > meta\[property="og:title"\]/g) || []).length, indexes, 'title');
  });
});
