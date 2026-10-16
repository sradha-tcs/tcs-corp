/* Unit tests of the site structure (utils/site.js), incl. the EMEA locale site: npm test */
import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  LOCALES, getLocale, getParentPages, localePagePath, resolvePagePath, toAemPath, toPublishedPath,
} from '../../utils/site.js';

const SITE = '/content/tcs-corp';

/** the page the browser is on (resolvePagePath and the defaults read window.location) */
function visit(pathname) {
  globalThis.window = { location: { pathname, href: `https://example.com${pathname}` } };
}

afterEach(() => {
  delete globalThis.window;
});

describe('locales', () => {
  it('has the 13 country sites and the EMEA site, each with a unique published code', () => {
    assert.equal(LOCALES.length, 14);
    assert.equal(new Set(LOCALES.map(({ code }) => code)).size, LOCALES.length);
  });
  it('EMEA: AEM /emea/en, published at /en-emea, en-GB', () => {
    const locale = getLocale('/en-emea/about');
    assert.equal(locale.code, 'en-emea');
    assert.equal(locale.root, '/en-emea');
    assert.equal(locale.aemRoot, '/emea/en');
    assert.equal(locale.lang, 'en-GB');
    assert.equal(locale.language, 'en');
    assert.equal(getLocale(`${SITE}/emea/en/about.html`).code, 'en-emea');
  });
  it('keeps /en (US English) apart from /en-emea', () => {
    assert.equal(getLocale('/en/about').code, 'en');
    assert.equal(getLocale('/en').code, 'en');
    assert.equal(getLocale('/en-emea').code, 'en-emea');
    assert.equal(getLocale(`${SITE}/us/en/about.html`).code, 'en');
  });
  it('the other locales are unchanged', () => {
    assert.equal(getLocale('/de-de/insights').aemRoot, '/de/de-de');
    assert.equal(getLocale('/ko-kr/').aemRoot, '/kr/ko-kr');
  });
});

describe('parent pages', () => {
  it('EMEA published pages, nearest first, up to Home', () => {
    assert.deepEqual(getParentPages('/en-emea/about'), ['/en-emea/']);
    assert.deepEqual(getParentPages('/en-emea/careers/jobs/uk'), [
      '/en-emea/careers/jobs', '/en-emea/careers', '/en-emea/',
    ]);
    assert.deepEqual(getParentPages('/en-emea/'), []);
    assert.deepEqual(getParentPages('/en-emea'), []);
  });
  it('EMEA AEM pages when editing', () => {
    assert.deepEqual(getParentPages(`${SITE}/emea/en/careers/jobs.html`), [
      `${SITE}/emea/en/careers.html`, `${SITE}/emea/en.html`,
    ]);
    assert.deepEqual(getParentPages(`${SITE}/emea/en.html`), []);
  });
  it('US English and other locales are unchanged', () => {
    assert.deepEqual(getParentPages('/en/insights/blogs'), ['/en/insights', '/en/']);
    assert.deepEqual(getParentPages(`${SITE}/de/de-de/insights.html`), [`${SITE}/de/de-de.html`]);
  });
  it('none outside the locales', () => {
    assert.deepEqual(getParentPages('/drafts/footer'), []);
  });
});

describe('path conversion', () => {
  it('EMEA AEM paths to published paths and back', () => {
    assert.equal(toPublishedPath(`${SITE}/emea/en/references/footer-emea`), '/en-emea/references/footer-emea');
    assert.equal(toPublishedPath(`${SITE}/emea/en`), '/en-emea');
    assert.equal(toAemPath('/en-emea/references/footer-emea', SITE), `${SITE}/emea/en/references/footer-emea`);
  });
  it('US English is unchanged', () => {
    assert.equal(toPublishedPath(`${SITE}/us/en/references/footer`), '/en/references/footer');
    assert.equal(toAemPath('/en/references/footer', SITE), `${SITE}/us/en/references/footer`);
  });
});

describe('resolvePagePath (the Footer page property)', () => {
  it('an AEM path on the published EMEA site: the published path', () => {
    visit('/en-emea/about');
    assert.equal(
      resolvePagePath(`${SITE}/emea/en/references/footer-emea`, 'references/footer'),
      '/en-emea/references/footer-emea',
    );
  });
  it('a published path or a path relative to the locale root', () => {
    visit('/en-emea/about');
    assert.equal(resolvePagePath('/en-emea/references/footer-emea', 'references/footer'), '/en-emea/references/footer-emea');
    assert.equal(resolvePagePath('references/footer-careers', 'references/footer'), '/en-emea/references/footer-careers');
    assert.equal(resolvePagePath(`${SITE}/emea/en/references/footer-emea.html`, 'references/footer'), '/en-emea/references/footer-emea');
  });
  it('no value: the locale default footer', () => {
    visit('/en-emea/about');
    assert.equal(resolvePagePath('', 'references/footer'), '/en-emea/references/footer');
    visit('/en/about');
    assert.equal(resolvePagePath('', 'references/footer'), '/en/references/footer');
    visit('/fr-ca/');
    assert.equal(resolvePagePath('', 'references/footer'), '/fr-ca/references/footer');
  });
  it('when editing in AEM: the AEM path', () => {
    visit(`${SITE}/emea/en/about.html`);
    assert.equal(
      resolvePagePath('/en-emea/references/footer-emea', 'references/footer'),
      `${SITE}/emea/en/references/footer-emea`,
    );
    assert.equal(resolvePagePath('', 'references/footer'), `${SITE}/emea/en/references/footer`);
  });
  it('localePagePath of the EMEA site', () => {
    assert.equal(localePagePath('references/footer', '/en-emea/x'), '/en-emea/references/footer');
    assert.equal(localePagePath('references/footer', `${SITE}/emea/en/x.html`), `${SITE}/emea/en/references/footer`);
  });
});
