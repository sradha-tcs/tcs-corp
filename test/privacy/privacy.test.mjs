/*
 * Data minimisation of search terms in the data layer (utils/privacy.js): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { contactLinkKind, redactSearchTerm } from '../../utils/privacy.js';

describe('redactSearchTerm', () => {
  it('keeps an ordinary search term, trimmed', () => {
    assert.equal(redactSearchTerm('  cloud migration '), 'cloud migration');
  });
  it('replaces e-mail addresses and phone numbers', () => {
    assert.equal(redactSearchTerm('call me at +91 22 6778 9595 or jane.doe@example.com'), 'call me at [number] or [email]');
  });
  it('keeps short numbers such as years', () => {
    assert.equal(redactSearchTerm('annual report 2026'), 'annual report 2026');
  });
  it('is empty for an empty search (no event is pushed)', () => {
    assert.equal(redactSearchTerm('   '), '');
    assert.equal(redactSearchTerm(undefined), '');
  });
  it('cuts long terms at 100 characters', () => {
    assert.equal(redactSearchTerm('a'.repeat(150)).length, 100);
  });
});

describe('contactLinkKind', () => {
  it('names mail and phone links, whose address the data layer leaves out', () => {
    assert.equal(contactLinkKind('mailto:jane.doe@example.com'), 'email');
    assert.equal(contactLinkKind(' MAILTO:press@example.com?subject=Hi'), 'email');
    assert.equal(contactLinkKind('tel:+6592704560'), 'phone');
  });
  it('is empty for other links', () => {
    assert.equal(contactLinkKind('https://www.tcs.com/'), '');
    assert.equal(contactLinkKind('/en/contact'), '');
    assert.equal(contactLinkKind('#anchor'), '');
    assert.equal(contactLinkKind(undefined), '');
  });
});
