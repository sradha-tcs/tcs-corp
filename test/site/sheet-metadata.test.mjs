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
  // each index definition, by its target: the query indexes (every column) and the navigation
  // indexes (only the menus' path and title, KB-D-073)
  const blocks = yaml.split(/^(?= {2}\w+:\n {4}include:)/m).slice(1);
  const queryIndexes = blocks.filter((block) => /target: \S*query-index\.json/.test(block));
  const navIndexes = blocks.filter((block) => /target: \S*nav-index\.json/.test(block));
  const has = (block, column, select) => block.includes(`${column}:\n        select: head > meta[${select}]`);
  const nameOf = (block) => block.trim().split(':')[0];

  it('has both the dialog\'s and the sheet\'s value in every query index', () => {
    assert.ok(queryIndexes.length >= 4);
    queryIndexes.forEach((block) => {
      [
        ['pageType', 'name="page-type"'], ['sheetPageType', 'name="sheet-page-type"'],
        ['metaTitle', 'name="meta-title"'], ['metaDescription', 'name="meta-description"'],
        [' title', 'property="og:title"'],
      ].forEach(([column, select]) => assert.ok(has(block, column, select), `${column} in ${nameOf(block)}`));
    });
  });

  it('has a navigation index for each query index, with the dialog\'s and the sheet\'s title', () => {
    assert.equal(navIndexes.length, queryIndexes.length);
    navIndexes.forEach((block) => {
      assert.ok(has(block, ' title', 'property="og:title"'), `title in ${nameOf(block)}`);
      assert.ok(has(block, 'metaTitle', 'name="meta-title"'), `metaTitle in ${nameOf(block)}`);
    });
  });
});
