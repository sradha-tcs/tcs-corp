// The root of the query index rows a page's lists show (utils/site.js indexRoot): node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { indexRoot } from '../../utils/site.js';

describe('indexRoot', () => {
  it('is the locale root of a locale page', () => {
    assert.equal(indexRoot('/en/dummy-pages/insights'), '/en');
    assert.equal(indexRoot('/de-de/'), '/de-de');
  });
  it('is the language master tree for its pages under review', () => {
    assert.equal(indexRoot('/language-master/en/curated-design-pages/story'), '/language-master/en');
    assert.equal(indexRoot('/language-master/en'), '/language-master/en');
  });
  it('is the default locale root for other pages', () => {
    assert.equal(indexRoot('/drafts/page'), '/en');
    assert.equal(indexRoot('/language-masters/en/x'), '/en');
  });
});
