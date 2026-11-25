// The header and footer pages come only from page properties (KB-D-077): utils/site.js
// configuredPagePath resolves a Navigation / Footer value without a default page, and the header
// and footer code holds no reference page path. node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { configuredPagePath, resolvePagePath } from '../../utils/site.js';

const root = new URL('../../', import.meta.url).pathname;
const LEAF = '/language-masters/en/who-we-are/newsroom/press-release/tcs-leader';
const AUTHOR_LEAF = '/content/tcs-corporate/language-masters/en/who-we-are/newsroom/press-release/tcs-leader.html';
const HEADER = '/language-masters/en/references/header-references/tcs-header';

describe('configuredPagePath', () => {
  it('is empty without a value: no default page', () => {
    assert.equal(configuredPagePath('', LEAF), '');
    assert.equal(configuredPagePath(undefined, LEAF), '');
    assert.equal(configuredPagePath('   ', LEAF), '');
  });

  it('resolves the value in every form to the published page', () => {
    assert.equal(configuredPagePath('/content/tcs-corporate/language-masters/en/references/header-references/tcs-header', LEAF), HEADER);
    assert.equal(configuredPagePath(HEADER, LEAF), HEADER);
    assert.equal(configuredPagePath(`${HEADER}.html`, LEAF), HEADER);
    assert.equal(configuredPagePath('references/header-references/tcs-header', LEAF), HEADER);
    assert.equal(configuredPagePath('https://main--tcs-corp--ultimatix.aem.live/language-masters/en/references/footer-references/tcs-footer', LEAF), '/language-masters/en/references/footer-references/tcs-footer');
  });

  it('keeps the AEM page path in Universal Editor', () => {
    assert.equal(configuredPagePath(HEADER, AUTHOR_LEAF), `/content/tcs-corporate${HEADER}`);
    assert.equal(configuredPagePath('references/footer-references/tcs-footer', AUTHOR_LEAF), '/content/tcs-corporate/language-masters/en/references/footer-references/tcs-footer');
  });

  it('resolves locale values to the locale paths', () => {
    assert.equal(configuredPagePath('/content/tcs-corp/us/en/references/nav-careers', '/en/careers/jobs'), '/en/references/nav-careers');
    assert.equal(configuredPagePath('references/nav-careers', '/de-de/careers'), '/de-de/references/nav-careers');
    assert.equal(configuredPagePath('/en/references/nav-careers', '/content/tcs-corp/us/en/careers.html'), '/content/tcs-corp/us/en/references/nav-careers');
  });

  it('is empty for an unparsable URL', () => {
    assert.equal(configuredPagePath('https://[broken', LEAF), '');
  });
});

describe('resolvePagePath with a page path', () => {
  it('resolves values as before', () => {
    assert.equal(resolvePagePath('', 'error-pages/404', '/de-de/x'), '/de-de/error-pages/404');
    assert.equal(resolvePagePath('/content/tcs-corp/de/de-de/references/nav-jobs', '', '/de-de/x'), '/de-de/references/nav-jobs');
  });
});

describe('header and footer code', () => {
  // a quoted path in the code that names a page below references/ (comments aren't checked)
  const quotedReference = /['"`]\/?references\/[^'"`]*['"`]/;
  const code = (path) => readFileSync(`${root}${path}`, 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');

  ['blocks/header/header.js', 'blocks/footer/footer.js'].forEach((path) => {
    it(`${path} hard-codes no reference page`, () => {
      assert.doesNotMatch(code(path), quotedReference);
    });
    it(`${path} reads the page from page properties`, () => {
      const source = code(path);
      assert.match(source, /getInheritedMetadata\('(nav|footer)'\)/);
      assert.match(source, /configuredPagePath\(/);
    });
  });
});
