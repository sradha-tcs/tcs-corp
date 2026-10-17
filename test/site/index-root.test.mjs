// The root of the query index rows a page's lists show (utils/site.js indexRoot): node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  indexRoot, localePagePath, localeSheetPath, pageLink,
} from '../../utils/site.js';

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

describe('localePagePath', () => {
  it('is the locale page on locale pages', () => {
    assert.equal(localePagePath('references/nav', '/de-de/insights'), '/de-de/references/nav');
  });
  it('is the language master references for its pages under review', () => {
    assert.equal(localePagePath('references/nav', '/language-master/en/x'), '/language-master/en/references/nav');
    assert.equal(localePagePath('references/footer', '/language-master/en/x'), '/language-master/en/references/footer');
  });
  it('is the locale page for other pages', () => {
    assert.equal(localePagePath('error-pages/404', '/language-master/en/x'), '/en/error-pages/404');
    assert.equal(localePagePath('', '/language-master/en/x'), '/en/');
  });
});

describe('on AEM author', () => {
  const page = '/content/tcs-corp/language-master/en/curated-design-pages/home.html';
  it('a language master page lists and reads the language master', () => {
    assert.equal(indexRoot(page), '/language-master/en');
    assert.equal(localeSheetPath('placeholders', page), '/language-master/en/placeholders.json');
    assert.equal(localePagePath('references/nav', page), '/content/tcs-corp/language-master/en/references/nav');
  });
  it('a locale page stays on its locale', () => {
    const en = '/content/tcs-corp/us/en/home.html';
    assert.equal(indexRoot(en), '/en');
    assert.equal(localeSheetPath('placeholders', en), '/en/placeholders.json');
    assert.equal(localePagePath('references/nav', en), '/content/tcs-corp/us/en/references/nav');
  });
});

describe('pageLink', () => {
  const author = '/content/tcs-corp/language-master/en/curated-design-pages/home.html';
  it('is the AEM page of a published page on author', () => {
    assert.equal(pageLink('/language-master/en/dummy-pages/careers', author), '/content/tcs-corp/language-master/en/dummy-pages/careers.html');
    assert.equal(pageLink('/en/dummy-pages/insights?x=1#top', author), '/content/tcs-corp/us/en/dummy-pages/insights.html?x=1#top');
    assert.equal(pageLink('/en/', author), '/content/tcs-corp/us/en.html');
  });
  it('keeps other links, and every link on the site', () => {
    assert.equal(pageLink('https://www.tata.com/', author), 'https://www.tata.com/');
    assert.equal(pageLink('/content/dam/tcs-corp/report.pdf', author), '/content/dam/tcs-corp/report.pdf');
    assert.equal(pageLink('/language-master/en/report.pdf', author), '/language-master/en/report.pdf');
    assert.equal(pageLink('/language-master/en/dummy-pages/careers', '/language-master/en/x'), '/language-master/en/dummy-pages/careers');
  });
});

describe('the language master root page', () => {
  it('is under review on author and on the site', () => {
    ['/content/tcs-corp/language-master/en.html', '/content/tcs-corp/language-master/en',
      '/language-master/en', '/language-master/en/', '/language-master/en/index',
      '/language-master/en.plain.html'].forEach((page) => {
      assert.equal(indexRoot(page), '/language-master/en', page);
      assert.equal(localeSheetPath('taxonomy', page), '/language-master/en/taxonomy.json', page);
    });
    assert.equal(localePagePath('references/nav', '/content/tcs-corp/language-master/en.html'), '/content/tcs-corp/language-master/en/references/nav');
  });
  it('a path that only starts like it is not', () => {
    assert.equal(indexRoot('/content/tcs-corp/language-master/en-gb.html'), '/en');
    assert.equal(indexRoot('/language-master/english'), '/en');
  });
});
