// utils/links.js isExternalLink: the links the Rich Text block's "Links to other sites: Open in a
// new tab" option opens in a new tab (KB-D-082). node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isExternalLink } from '../../utils/links.js';

const origin = 'https://main--tcs-corp--sradha-tcs.aem.live';

describe('isExternalLink', () => {
  it('is true for http(s) links to another host', () => {
    assert.equal(isExternalLink('https://www.tcs.com/', origin), true);
    assert.equal(isExternalLink('http://example.com/x', origin), true);
    assert.equal(isExternalLink('//cdn.example.com/a', origin), true);
  });

  it('is false for the page\'s own host, paths and anchors', () => {
    assert.equal(isExternalLink(`${origin}/en/who-we-are`, origin), false);
    assert.equal(isExternalLink('/en/who-we-are', origin), false);
    assert.equal(isExternalLink('#anchor-x', origin), false);
    assert.equal(isExternalLink('/content/tcs-corp/us/en/page', origin), false);
  });

  it('is false for other schemes and empty or broken values', () => {
    ['mailto:a@example.com', 'tel:+441234', 'ftp://example.com/f', '', null, undefined].forEach((href) => {
      assert.equal(isExternalLink(href, origin), false, String(href));
    });
    assert.equal(isExternalLink('https://x', 'not a url'), false);
  });
});
