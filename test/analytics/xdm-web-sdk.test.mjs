/*
 * The event-to-XDM mapping (utils/xdm.js), the Web SDK configuration and consent mapping
 * (utils/web-sdk.js) and the page sections (utils/site.js sectionsOf): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { dataLayerState, toXdm } from '../../utils/xdm.js';
import { adobeConsentOf, environmentOf, webSdkConfigOf } from '../../utils/web-sdk.js';
import { sectionsOf } from '../../utils/site.js';

const entries = [
  {
    page: {
      'page-1': {
        '@type': 'tcs-corp/components/page',
        pageName: 'en:what-we-do:industries',
        pageURL: 'https://www.example.com/en/what-we-do/industries',
        siteSection: 'what-we-do',
        'xdm:template': 'listing',
        'xdm:language': 'en',
      },
    },
  },
  { component: { 'teaser-1': { '@type': 'tcs-corp/components/teaser', parentId: 'page-1' } } },
  { component: { 'teaser-1': { 'dc:title': 'AI' } } },
];
const state = dataLayerState(entries);
const event = (name, info) => ({
  event: name,
  eventInfo: {
    eventId: 'e1', eventTimestamp: '2026-11-22T10:00:00.000Z', schemaVersion: '1.0', ...info,
  },
});

describe('dataLayerState', () => {
  it('merges the page and component entries in order and ignores events', () => {
    assert.deepEqual(state.component['teaser-1'], { '@type': 'tcs-corp/components/teaser', parentId: 'page-1', 'dc:title': 'AI' });
    assert.equal(dataLayerState([event('page:view', {})]).page['page-1'], undefined);
  });
});

describe('toXdm', () => {
  it('maps the page view to web.webPageDetails with pageViews', () => {
    assert.deepEqual(toXdm(event('page:view', { path: 'page.page-1' }), state), {
      eventType: 'web.webpagedetails.pageViews',
      _id: 'e1',
      timestamp: '2026-11-22T10:00:00.000Z',
      web: {
        webPageDetails: {
          name: 'en:what-we-do:industries',
          URL: 'https://www.example.com/en/what-we-do/industries',
          siteSection: 'what-we-do',
          pageViews: { value: 1 },
        },
      },
    });
  });
  it('maps a download click to web.webInteraction (type download, linkClicks)', () => {
    const xdm = toXdm(event('cmp:click', {
      path: 'component.teaser-1', 'dc:title': 'Annual report', 'xdm:linkURL': 'https://www.example.com/report.pdf', 'xdm:linkType': 'download',
    }), state);
    assert.deepEqual(xdm.web.webInteraction, {
      name: 'Annual report', URL: 'https://www.example.com/report.pdf', type: 'download', linkClicks: { value: 1 },
    });
    assert.equal(xdm.eventType, 'web.webinteraction.linkClicks');
  });
  it('writes custom fields only with a tenant ID, under _{tenant}.tcs, without empty values', () => {
    const click = event('cmp:click', { path: 'component.teaser-1', interaction: 'link', position: 2 });
    assert.equal(Object.keys(toXdm(click, state)).some((k) => k.startsWith('_') && k !== '_id'), false);
    const xdm = toXdm(click, state, { tenantId: '_acme' });
    // eslint-disable-next-line no-underscore-dangle
    assert.deepEqual(xdm._acme.tcs, {
      schemaVersion: '1.0',
      component: { id: 'teaser-1', type: 'tcs-corp/components/teaser', position: 2 },
      interaction: { type: 'link' },
    });
  });
  it('sends nothing for events that are not mapped (consent goes through setConsent)', () => {
    assert.equal(toXdm(event('consent:update', { analytics: 'granted' }), state), null);
    assert.equal(toXdm(null, state), null);
  });
  it('maps personalization events to _experience.decisioning', () => {
    const xdm = toXdm(event('cmp:personalizationDisplay', { path: 'component.teaser-1', decisionScope: 'home-hero', activityId: 'a1' }), state);
    // eslint-disable-next-line no-underscore-dangle
    assert.deepEqual(xdm._experience.decisioning, {
      propositions: [{ scope: 'home-hero', id: 'a1' }], propositionEventType: { display: 1 },
    });
  });
});

describe('Web SDK configuration', () => {
  const rows = [
    { environment: 'dev', datastreamId: '<datastream ID for development>', orgId: '<IMS organization ID>' },
    {
      environment: 'stage', datastreamId: 'ds-stage', orgId: 'org@AdobeOrg', decisionScopes: 'home-hero, <decision scopes or empty>', debug: 'yes', configure: 'yes', consentStandard: 'adobe-2.0',
    },
    {
      environment: 'prod', datastreamId: 'ds-prod', orgId: 'org@AdobeOrg', debug: 'yes', tenantId: '<AEP tenant ID without underscore>',
    },
    {
      environment: 'prod', host: 'www.example.com', datastreamId: 'ds-www', orgId: 'org@AdobeOrg',
    },
  ];
  it('derives the environment from the host', () => {
    assert.equal(environmentOf('localhost'), 'dev');
    assert.equal(environmentOf('main--tcs-corp--sradha-tcs.aem.page'), 'stage');
    assert.equal(environmentOf('main--tcs-corp--sradha-tcs.aem.live'), 'prod');
  });
  it('never uses a row whose values are still template placeholders', () => {
    assert.equal(webSdkConfigOf(rows, 'localhost'), null);
    assert.equal(webSdkConfigOf([], 'localhost'), null);
  });
  it('reads the environment row, without placeholder scopes; debug never on production', () => {
    const stage = webSdkConfigOf(rows, 'feature--tcs-corp--sradha-tcs.aem.page');
    assert.equal(stage.datastreamId, 'ds-stage');
    assert.deepEqual(stage.decisionScopes, ['home-hero']);
    assert.equal(stage.debug, true);
    assert.equal(stage.configure, true);
    const prod = webSdkConfigOf(rows, 'main--tcs-corp--sradha-tcs.aem.live');
    assert.equal(prod.debug, false);
    assert.equal(prod.tenantId, '');
  });
  it('prefers the row of the exact host', () => {
    assert.equal(webSdkConfigOf(rows, 'www.example.com').datastreamId, 'ds-www');
  });
  it('maps the consent state to the Adobe 2.0 standard', () => {
    assert.deepEqual(adobeConsentOf({ analytics: 'granted', personalization: 'unknown' })[0].value, {
      collect: { val: 'y' }, personalize: { content: { val: 'n' } },
    });
  });
});

describe('sectionsOf', () => {
  it('names the sections below the root', () => {
    assert.deepEqual(sectionsOf('/language-masters/en/what-we-do/industries/banking', '/language-masters/en'), {
      siteSection: 'what-we-do', subSection: 'industries', pageName: 'language-masters:en:what-we-do:industries:banking',
    });
    assert.deepEqual(sectionsOf('/en/', '/en'), { siteSection: 'home', subSection: '', pageName: 'en:home' });
  });
});
