// A root (Home) page is published as its folder's index or at its own path (utils/site.js
// pageUrlForms, KB-D-078): the inherited Navigation / Footer / 404 Page of a root page are found in
// either form. node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getParentPages, pageUrlForms } from '../../utils/site.js';

describe('pageUrlForms', () => {
  it('tries a root page as its folder index, then at its own path', () => {
    // sradha-tcs maps the root page to /language-master/en/; ultimatix serves it at /language-masters/en
    assert.deepEqual(pageUrlForms('/language-masters/en/'), ['/language-masters/en/', '/language-masters/en']);
    assert.deepEqual(pageUrlForms('/design-block-master/en/'), ['/design-block-master/en/', '/design-block-master/en']);
    assert.deepEqual(pageUrlForms('/de-de/'), ['/de-de/', '/de-de']);
  });

  it('has one form for other pages, the site root and AEM page URLs', () => {
    assert.deepEqual(pageUrlForms('/language-masters/en/who-we-are'), ['/language-masters/en/who-we-are']);
    assert.deepEqual(pageUrlForms('/'), ['/']);
    assert.deepEqual(pageUrlForms('/content/tcs-corporate/language-masters/en.html'), ['/content/tcs-corporate/language-masters/en.html']);
    assert.deepEqual(pageUrlForms('/content/tcs-corporate/language-masters/en/'), ['/content/tcs-corporate/language-masters/en/']);
  });

  it('covers the root page of a leaf page in both forms', () => {
    const parents = getParentPages('/language-masters/en/who-we-are/newsroom/press-release/tcs-leader');
    assert.deepEqual(parents, [
      '/language-masters/en/who-we-are/newsroom/press-release',
      '/language-masters/en/who-we-are/newsroom',
      '/language-masters/en/who-we-are',
      '/language-masters/en/',
    ]);
    assert.deepEqual(parents.flatMap(pageUrlForms).slice(-2), ['/language-masters/en/', '/language-masters/en']);
  });

  it('keeps AEM page URLs in Universal Editor', () => {
    const parents = getParentPages('/content/tcs-corporate/language-masters/en/who-we-are/x.html');
    assert.deepEqual(parents, ['/content/tcs-corporate/language-masters/en/who-we-are.html', '/content/tcs-corporate/language-masters/en.html']);
    assert.deepEqual(parents.flatMap(pageUrlForms), parents);
  });
});
