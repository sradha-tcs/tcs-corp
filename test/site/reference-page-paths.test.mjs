// Header and footer pages at any path and depth (utils/site.js resolvePagePath, KB-D-078): e.g.
// references/header-collection/tcsheader and references/footer-collection/tcsfooter, configured
// as an AEM path, a published path, a URL or a path relative to the page's site root. node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolvePagePath } from '../../utils/site.js';

const LIVE = '/language-masters/en/who-we-are/newsroom/press-release/tcs-leader';
const AUTHOR = '/content/tcs-corporate/language-masters/en/who-we-are/newsroom/press-release/tcs-leader.html';
const HEADER = '/language-masters/en/references/header-collection/tcsheader';
const FOOTER = '/language-masters/en/references/footer-collection/tcsfooter';

describe('resolvePagePath: pages in reference folders', () => {
  it('resolves every form of the value to the published page', () => {
    [
      `/content/tcs-corporate${HEADER}`,
      HEADER,
      `${HEADER}.html`,
      'references/header-collection/tcsheader',
      `https://main--tcs-corp--ultimatix.aem.live${HEADER}`,
    ].forEach((value) => assert.equal(resolvePagePath(value, 'references/nav', LIVE), HEADER, value));
    assert.equal(resolvePagePath('references/footer-collection/tcsfooter', 'references/footer', LIVE), FOOTER);
  });

  it('keeps the AEM page path in Universal Editor', () => {
    assert.equal(resolvePagePath(HEADER, 'references/nav', AUTHOR), `/content/tcs-corporate${HEADER}`);
    assert.equal(resolvePagePath(`/content/tcs-corporate${FOOTER}`, 'references/footer', AUTHOR), `/content/tcs-corporate${FOOTER}`);
    assert.equal(resolvePagePath('references/footer-collection/tcsfooter', 'references/footer', AUTHOR), `/content/tcs-corporate${FOOTER}`);
  });

  it('resolves a relative path outside references/ in the page\'s own review root', () => {
    // before: /en/header-collection/tcsheader (the US locale) on a /language-masters/en page
    assert.equal(resolvePagePath('header-collection/tcsheader', 'references/nav', LIVE), '/language-masters/en/header-collection/tcsheader');
    assert.equal(resolvePagePath('shared/footers/tcsfooter', 'references/footer', AUTHOR), '/content/tcs-corporate/language-masters/en/shared/footers/tcsfooter');
  });

  it('keeps locale pages in their locale', () => {
    assert.equal(resolvePagePath('references/header-collection/tcsheader', 'references/nav', '/de-de/insights'), '/de-de/references/header-collection/tcsheader');
    assert.equal(resolvePagePath('header-collection/tcsheader', 'references/nav', '/de-de/insights'), '/de-de/header-collection/tcsheader');
    assert.equal(resolvePagePath('/content/tcs-corp/de/de-de/references/header-collection/tcsheader', 'references/nav', '/de-de/x'), '/de-de/references/header-collection/tcsheader');
    assert.equal(resolvePagePath('references/nav-careers', 'references/nav', '/content/tcs-corp/us/en/careers.html'), '/content/tcs-corp/us/en/references/nav-careers');
  });

  it('gives the default page without a value', () => {
    assert.equal(resolvePagePath('', 'references/nav', LIVE), '/language-masters/en/references/nav');
    assert.equal(resolvePagePath('', 'references/footer', '/de-de/x'), '/de-de/references/footer');
  });
});
