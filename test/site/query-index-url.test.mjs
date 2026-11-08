// The query index a page reads (utils/query-index.js): its review root's own index, else the shared
// one; the parallel requests after the first: node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { indexUrlOf, remainingOffsets } from '../../utils/query-index.js';

describe('indexUrlOf', () => {
  it('is the review root\'s own index for its pages', () => {
    assert.equal(indexUrlOf('/language-masters/en'), '/language-masters/en/query-index.json');
    assert.equal(indexUrlOf('/language-master/en'), '/language-master/en/query-index.json');
    assert.equal(indexUrlOf('/design-block-master/en'), '/design-block-master/en/query-index.json');
  });
  it('is the shared index for the locales', () => {
    assert.equal(indexUrlOf('/en'), '/query-index.json');
    assert.equal(indexUrlOf('/de-de'), '/query-index.json');
  });
});

describe('remainingOffsets', () => {
  it('lists the requests after the first one', () => {
    assert.deepEqual(remainingOffsets(1000, 3500), [1000, 2000, 3000]);
    assert.deepEqual(remainingOffsets(146, 146), []);
    assert.deepEqual(remainingOffsets(0, 0), []);
  });
});
