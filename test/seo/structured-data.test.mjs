/*
 * Article JSON-LD (utils/structured-data.js), safe URL decoding (utils/urls.js), link checks
 * (utils/links.js) and data minimisation (utils/privacy.js): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { absoluteUrl, articleSchema, isoDate } from '../../utils/structured-data.js';
import { safeDecode } from '../../utils/urls.js';
import { isSafeUrl, telHref } from '../../utils/links.js';
import { redactPersonalData } from '../../utils/privacy.js';

describe('articleSchema', () => {
  it('writes the values the page has, and nothing empty', () => {
    assert.deepEqual(articleSchema({
      type: 'NewsArticle',
      url: 'https://www.example.com/en/newsroom/release',
      title: 'TCS opens a lab',
      description: '',
      image: '/en/media/lab.jpg',
      publishDate: '2026-11-20',
      authorName: '',
      language: 'en',
    }), {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: 'TCS opens a lab',
      image: ['https://www.example.com/en/media/lab.jpg'],
      datePublished: '2026-11-20',
      dateModified: '2026-11-20',
      inLanguage: 'en',
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.example.com/en/newsroom/release' },
    });
  });
  it('has no schema without a title or URL', () => {
    assert.equal(articleSchema({ url: 'https://www.example.com/' }), null);
    assert.equal(articleSchema(null), null);
  });
  it('accepts only real dates and served http(s) images', () => {
    assert.equal(isoDate('20 Nov 2026'), '');
    assert.equal(isoDate('2026-11-20T10:00:00Z'), '2026-11-20T10:00:00Z');
    assert.equal(absoluteUrl('/content/dam/tcs-corp/a.jpg', 'https://www.example.com/'), '');
    assert.equal(absoluteUrl(['javascript', 'alert(1)'].join(':'), 'https://www.example.com/'), '');
  });
});

describe('safeDecode', () => {
  it('decodes, and keeps a malformed value instead of throwing', () => {
    assert.equal(safeDecode('caf%C3%A9'), 'café');
    assert.equal(safeDecode('%E0%A4%A'), '%E0%A4%A');
  });
});

describe('isSafeUrl and telHref (utils/links.js)', () => {
  it('allows http(s), mailto, tel and paths; never javascript: or data:', () => {
    assert.equal(isSafeUrl('https://www.linkedin.com/in/x'), true);
    assert.equal(isSafeUrl('/en/a'), true);
    assert.equal(isSafeUrl(` ${['javascript', 'alert(1)'].join(':')}`), false);
    assert.equal(isSafeUrl('data:text/html,x'), false);
    assert.equal(isSafeUrl(''), false);
  });
  it('builds tel: links from written numbers', () => {
    assert.equal(telHref('+1 (416) 456-7650'), 'tel:+14164567650');
    assert.equal(telHref('n/a'), '');
  });
});

describe('redactPersonalData', () => {
  it('replaces e-mail addresses and international numbers, keeps dates and paths', () => {
    assert.equal(redactPersonalData('Mail a.b@example.com, call +44 7921 493382'), 'Mail [email], call [number]');
    assert.equal(redactPersonalData('/en/2026-11-22/report 2026'), '/en/2026-11-22/report 2026');
  });
});
