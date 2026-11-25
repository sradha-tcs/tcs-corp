// The pages the header and footer load, in priority order (utils/site.js referencePagePaths,
// KB-D-077): the configured (own or inherited) Navigation / Footer value first, then the site's
// default reference pages. node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { REFERENCE_PAGES, referencePagePaths, resolvePagePath } from '../../utils/site.js';

const LEAF = '/language-masters/en/who-we-are/newsroom/press-release/tcs-leader';
const AUTHOR_LEAF = '/content/tcs-corporate/language-masters/en/who-we-are/newsroom/press-release/tcs-leader.html';

describe('referencePagePaths', () => {
  it('without a value: the default pages, the references folder page first', () => {
    assert.deepEqual(referencePagePaths('nav', '', LEAF), [
      '/language-masters/en/references/header-references/tcs-header',
      '/language-masters/en/references/nav',
    ]);
    assert.deepEqual(referencePagePaths('footer', undefined, LEAF), [
      '/language-masters/en/references/footer-references/tcs-footer',
      '/language-masters/en/references/footer',
    ]);
  });

  it('puts the configured value first, whatever its form, then the defaults', () => {
    const expected = [
      '/language-masters/en/references/header-references/tcs-header',
      '/language-masters/en/references/nav',
    ];
    // AEM path, published path and path relative to the site root give the same page
    assert.deepEqual(referencePagePaths('nav', '/content/tcs-corporate/language-masters/en/references/header-references/tcs-header', LEAF), expected);
    assert.deepEqual(referencePagePaths('nav', '/language-masters/en/references/header-references/tcs-header', LEAF), expected);
    assert.deepEqual(referencePagePaths('nav', 'references/header-references/tcs-header', LEAF), expected);
    assert.deepEqual(referencePagePaths('nav', '/language-masters/en/references/header-references/tcs-header.html', LEAF), expected);
  });

  it('keeps an area page first and the defaults as its fallback', () => {
    assert.deepEqual(referencePagePaths('nav', 'references/nav-careers', '/en/careers/jobs'), [
      '/en/references/nav-careers',
      '/en/references/header-references/tcs-header',
      '/en/references/nav',
    ]);
    assert.deepEqual(referencePagePaths('footer', '/content/tcs-corp/us/en/references/tcs-footer', '/en/x'), [
      '/en/references/tcs-footer',
      '/en/references/footer-references/tcs-footer',
      '/en/references/footer',
    ]);
  });

  it('keeps a folder page value first (it is skipped when it loads empty)', () => {
    assert.deepEqual(referencePagePaths('footer', '/language-masters/en/references/footer-references', LEAF)[0], '/language-masters/en/references/footer-references');
  });

  it('lists every page once', () => {
    assert.deepEqual(referencePagePaths('nav', 'references/nav', '/de-de/x'), [
      '/de-de/references/nav',
      '/de-de/references/header-references/tcs-header',
    ]);
  });

  it('uses AEM page paths in Universal Editor', () => {
    assert.deepEqual(referencePagePaths('nav', '/language-masters/en/references/header-references/tcs-header', AUTHOR_LEAF), [
      '/content/tcs-corporate/language-masters/en/references/header-references/tcs-header',
      '/content/tcs-corporate/language-masters/en/references/nav',
    ]);
    assert.deepEqual(referencePagePaths('footer', '', '/content/tcs-corp/de/de-de/insights.html'), [
      '/content/tcs-corp/de/de-de/references/footer-references/tcs-footer',
      '/content/tcs-corp/de/de-de/references/footer',
    ]);
  });

  it('has default pages for the header and the footer only', () => {
    assert.deepEqual(Object.keys(REFERENCE_PAGES), ['nav', 'footer']);
  });
});

describe('resolvePagePath with a page path', () => {
  it('resolves values the same way as before for the current page', () => {
    assert.equal(resolvePagePath('', 'references/nav', '/de-de/x'), '/de-de/references/nav');
    assert.equal(resolvePagePath('/content/tcs-corp/de/de-de/references/nav-jobs', '', '/de-de/x'), '/de-de/references/nav-jobs');
    assert.equal(resolvePagePath('https://main--tcs-corp--sradha-tcs.aem.page/en/references/nav-jobs.plain.html', '', '/en/x'), '/en/references/nav-jobs');
    assert.equal(resolvePagePath('/en/references/nav-jobs', '', '/content/tcs-corp/us/en/x.html'), '/content/tcs-corp/us/en/references/nav-jobs');
  });
});
