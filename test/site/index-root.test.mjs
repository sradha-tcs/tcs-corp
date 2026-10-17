// The root of the query index rows a page's lists show (utils/site.js indexRoot): node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { indexRoot, localeSheetPath } from '../../utils/site.js';

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

describe('localeSheetPath', () => {
  it('is the locale sheet on locale pages', () => {
    assert.equal(localeSheetPath('taxonomy', '/de-de/insights'), '/de-de/taxonomy.json');
    assert.equal(localeSheetPath('/data/authors', '/en/x'), '/en/data/authors.json');
  });
  it('is the language master copy of its sheets for its pages under review', () => {
    assert.equal(localeSheetPath('taxonomy', '/language-master/en/x'), '/language-master/en/taxonomy.json');
    assert.equal(localeSheetPath('data/authors', '/language-master/en/x'), '/language-master/en/data/authors.json');
    assert.equal(localeSheetPath('placeholders', '/language-master/en/x'), '/language-master/en/placeholders.json');
    assert.equal(localeSheetPath('redirects', '/language-master/en/x'), '/language-master/en/redirects.json');
  });
  it('is the locale sheet for sheets the language master does not publish', () => {
    assert.equal(localeSheetPath('metadata', '/language-master/en/x'), '/en/metadata.json');
  });
});
