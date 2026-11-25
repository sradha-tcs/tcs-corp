/*
 * The data layer's event structure, sanitizing, validation and duplicate protection
 * (utils/analytics.js) and the consent interface (utils/consent.js): node --test
 */
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// the browser globals the data layer uses
// eslint-disable-next-line no-undef
globalThis.window = { location: { search: '' } };

const {
  SCHEMA_VERSION, createDataLayerEvent, generateEventId, isDuplicateEvent, pushComponentEvent,
  pushDataLayerEvent, sanitizeDataLayerPayload, validateDataLayerEvent,
} = await import('../../utils/analytics.js');
const {
  canCollect, getConsentState, normalizeConsent, onConsentChange, registerConsentProvider,
  updateConsent,
} = await import('../../utils/consent.js');

beforeEach(() => { window.adobeDataLayer = []; });

describe('createDataLayerEvent', () => {
  it('adds eventId, eventName, eventTimestamp and schemaVersion to the event fields', () => {
    const now = new Date('2026-11-22T10:00:00.000Z');
    const entry = createDataLayerEvent('cmp:click', { interaction: 'link', 'dc:title': 'Read more' }, { path: 'component.hero-1', now, eventId: 'e1' });
    assert.deepEqual(entry, {
      event: 'cmp:click',
      eventInfo: {
        path: 'component.hero-1',
        interaction: 'link',
        'dc:title': 'Read more',
        eventId: 'e1',
        eventName: 'cmp:click',
        eventTimestamp: '2026-11-22T10:00:00.000Z',
        schemaVersion: SCHEMA_VERSION,
      },
    });
  });
  it('generates unique event ids', () => {
    const ids = new Set(Array.from({ length: 50 }, generateEventId));
    assert.equal(ids.size, 50);
  });
});

describe('sanitizeDataLayerPayload', () => {
  it('drops empty values (undefined, null, empty strings and arrays) but keeps false and 0', () => {
    assert.deepEqual(sanitizeDataLayerPayload({
      a: undefined, b: null, c: '', d: [], e: false, f: 0, g: { h: '' }, i: 'x',
    }), { e: false, f: 0, i: 'x' });
  });
  it('replaces e-mail addresses and phone numbers in free text', () => {
    assert.deepEqual(
      sanitizeDataLayerPayload({ 'dc:title': 'Write to jane.doe@example.com or call +46 70 3178024' }),
      { 'dc:title': 'Write to [email] or call [number]' },
    );
  });
  it('keeps addresses, paths and dates as they are', () => {
    const value = { 'xdm:linkURL': 'https://example.com/2026-11-22/report.pdf', value: '2026-11-22' };
    assert.deepEqual(sanitizeDataLayerPayload(value), value);
  });
});

describe('validateDataLayerEvent', () => {
  it('accepts a built event', () => {
    assert.deepEqual(validateDataLayerEvent(createDataLayerEvent('page:view', {}, { path: 'page.page-1' })), { valid: true, errors: [] });
  });
  it('rejects malformed names, unknown namespaces and component events without a path', () => {
    assert.equal(validateDataLayerEvent(createDataLayerEvent('click', {})).valid, false);
    assert.equal(validateDataLayerEvent(createDataLayerEvent('target:show', {})).valid, false);
    assert.equal(validateDataLayerEvent(createDataLayerEvent('cmp:click', {})).valid, false);
    assert.equal(validateDataLayerEvent({ event: 'cmp:click', eventInfo: { path: 'component.a' } }).valid, false);
  });
});

describe('duplicate dispatch', () => {
  it('ignores the same event again within 50ms, not later and not a different one', () => {
    const entry = createDataLayerEvent('cmp:click', { interaction: 'next' }, { path: 'component.carousel-1' });
    assert.equal(isDuplicateEvent(entry, 1000), false);
    assert.equal(isDuplicateEvent(entry, 1020), true);
    assert.equal(isDuplicateEvent(entry, 1100), false);
    const other = createDataLayerEvent('cmp:click', { interaction: 'previous' }, { path: 'component.carousel-1' });
    assert.equal(isDuplicateEvent(other, 1105), false);
  });
  it('pushes one entry for two dispatches of the same click', () => {
    pushComponentEvent('cmp:click', 'teaser-1', { interaction: 'link', value: 'a' });
    pushComponentEvent('cmp:click', 'teaser-1', { interaction: 'link', value: 'a' });
    assert.equal(window.adobeDataLayer.length, 1);
    assert.equal(window.adobeDataLayer[0].eventInfo.path, 'component.teaser-1');
  });
  it('does not push an invalid event', () => {
    assert.equal(pushDataLayerEvent('nonsense', {}), null);
    assert.equal(window.adobeDataLayer.length, 0);
  });
});

describe('consent', () => {
  it('is unknown for every category without a CMP: nothing may be collected', () => {
    registerConsentProvider(null);
    assert.deepEqual(getConsentState(), {
      analytics: 'unknown', personalization: 'unknown', marketing: 'unknown', source: 'none',
    });
    assert.equal(canCollect('analytics'), false);
  });
  it('reads the CMP state, normalized; a CMP error collects nothing', () => {
    registerConsentProvider(() => ({ analytics: 'GRANTED', personalization: 'denied' }));
    assert.equal(canCollect('analytics'), true);
    assert.equal(canCollect('personalization'), false);
    assert.equal(getConsentState().marketing, 'unknown');
    registerConsentProvider(() => { throw new Error('cmp'); });
    assert.equal(canCollect('analytics'), false);
    registerConsentProvider(null);
  });
  it('pushes consent:update with the categories only and tells the listeners (withdrawal too)', () => {
    const seen = [];
    const off = onConsentChange((state) => seen.push(state.analytics));
    updateConsent({ analytics: 'granted' });
    updateConsent({ analytics: 'denied' });
    off();
    assert.deepEqual(seen, ['granted', 'denied']);
    const events = window.adobeDataLayer.filter((e) => e.event === 'consent:update');
    assert.equal(events.length, 2);
    assert.equal(events[1].eventInfo.analytics, 'denied');
    assert.equal(normalizeConsent({ analytics: 'maybe' }).analytics, 'unknown');
  });
});
