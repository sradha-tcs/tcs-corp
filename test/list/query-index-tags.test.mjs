/* Unit tests of the index tags (utils/query-index.js): article:tag and AEM's cq-tags */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { tagsOf } from '../../utils/query-index.js';

describe('index tags', () => {
  it('reads the article:tag column (a JSON list)', () => {
    assert.deepEqual(tagsOf({ tags: '["tcs-corp:industry/banking","tcs-corp:service/ai"]' }), ['tcs-corp:industry/banking', 'tcs-corp:service/ai']);
  });
  it('reads the cq-tags column (comma separated, as AEM publishes the page Tags)', () => {
    assert.deepEqual(tagsOf({ tags: '[]', cqTags: 'tcs-corp:industry/banking, tcs-corp:service/ai' }), ['tcs-corp:industry/banking', 'tcs-corp:service/ai']);
  });
  it('merges both without duplicates', () => {
    assert.deepEqual(tagsOf({ tags: '["tcs-corp:service/ai"]', cqTags: 'tcs-corp:service/ai,tcs-corp:service/cloud' }), ['tcs-corp:service/ai', 'tcs-corp:service/cloud']);
  });
  it('is empty without tags', () => {
    assert.deepEqual(tagsOf({}), []);
  });
});
