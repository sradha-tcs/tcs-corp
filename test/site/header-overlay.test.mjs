// When the header lies over the opening hero (utils/header-overlay.js headerOverMode): node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { headerOverMode } from '../../utils/header-overlay.js';

const opening = { opening: true, strictOpening: true };

describe('headerOverMode', () => {
  it('Page start: the header over the opening light hero at every width', () => {
    assert.deepEqual(headerOverMode({ placement: 'page-start', ...opening }), { mode: 'all', reason: '' });
  });

  it('Automatic: on desktop over a light hero in the first section, as before the option', () => {
    assert.equal(headerOverMode({ ...opening }).mode, 'desktop');
    // any hero in the first section, e.g. after a title or in a carousel (the earlier rule)
    assert.equal(headerOverMode({ opening: true }).mode, 'desktop');
  });

  it('Below header: never', () => {
    assert.equal(headerOverMode({ placement: 'below-header', ...opening }).mode, '');
  });

  it('never over a dark hero or a hero below the first section', () => {
    assert.equal(headerOverMode({ dark: true, ...opening }).mode, '');
    assert.equal(headerOverMode({}).mode, '');
    assert.deepEqual(headerOverMode({ placement: 'page-start', dark: true, ...opening }), { mode: '', reason: 'with a dark BG Color' });
  });

  it('Page start only on the hero that opens the page', () => {
    assert.deepEqual(headerOverMode({ placement: 'page-start', opening: true }), { mode: '', reason: 'unless the hero opens the page' });
  });

  it('never with a Solid header', () => {
    assert.equal(headerOverMode({ ...opening }, true).mode, '');
    assert.deepEqual(headerOverMode({ placement: 'page-start', ...opening }, true), { mode: '', reason: 'the TCS Header is Solid' });
  });

  it('defaults to no overlay without input', () => {
    assert.deepEqual(headerOverMode(), { mode: '', reason: '' });
  });
});
