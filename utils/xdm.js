/**
 * XDM utils: maps the business events of the data layer (utils/analytics.js) to Adobe Experience
 * Platform XDM ExperienceEvents for the Web SDK's sendEvent (utils/web-sdk.js), outside the
 * blocks (pure, unit tested in test/analytics/xdm.test.mjs). Standard field groups only
 * (web.webPageDetails, web.webInteraction, _experience.decisioning); the site's own fields go to
 * the approved custom field group _{tenantId}.tcs (the tenant ID comes from the configuration;
 * without it no custom field is written). Empty values are never sent.
 *
 * The schema (field groups, the tcs object) must be created and approved in AEP first:
 * docs/handover/knowledge-base/data-layer-and-analytics.md, "XDM mapping".
 */
import { compact } from './objects.js';

/** the data layer's link types to XDM web.webInteraction.type */
const LINK_TYPES = { download: 'download', exit: 'exit', other: 'other' };

/** the events that are sent (the others, e.g. consent:update, go through other Web SDK commands) */
export const XDM_EVENT_TYPES = {
  'page:view': 'web.webpagedetails.pageViews',
  'cmp:click': 'web.webinteraction.linkClicks',
  'cmp:search': 'tcs.search',
  'cmp:submit': 'tcs.formSubmit',
  'cmp:formStart': 'tcs.formStart',
  'cmp:formSuccess': 'tcs.formSuccess',
  'cmp:formError': 'tcs.formError',
  'cmp:show': 'tcs.componentShow',
  'cmp:hide': 'tcs.componentHide',
  'cmp:change': 'tcs.filterChange',
  'cmp:media': 'tcs.media',
  'cmp:mediaProgress': 'tcs.mediaProgress',
  'cmp:personalizationDisplay': 'decisioning.propositionDisplay',
  'cmp:personalizationClick': 'decisioning.propositionInteract',
  'app:error': 'tcs.applicationError',
};

/**
 * The state of the data layer (pure): the page and component entries merged in order, as the
 * Adobe Client Data Layer library computes it.
 * @param {Object[]} entries
 * @returns {{ page: Object, component: Object }}
 */
export function dataLayerState(entries = []) {
  const state = { page: {}, component: {} };
  entries.forEach((entry) => {
    if (!entry || typeof entry !== 'object' || entry.event) return;
    ['page', 'component'].forEach((kind) => {
      Object.entries(entry[kind] || {}).forEach(([id, v]) => {
        state[kind][id] = { ...state[kind][id], ...v };
      });
    });
  });
  return state;
}

/** the state object an event is about (eventInfo.path page.{id} / component.{id}) */
const subjectOf = (path, state) => {
  const [kind, ...rest] = String(path || '').split('.');
  return (kind === 'page' ? state.page : state.component)?.[rest.join('.')] || {};
};

/**
 * An XDM ExperienceEvent of a data layer event.
 * @param {Object} entry { event, eventInfo }
 * @param {{ page: Object, component: Object }} state dataLayerState
 * @param {{ tenantId?: string }} [config]
 * @returns {Object|null} null for events that aren't sent
 */
export function toXdm(entry, state, config = {}) {
  const eventType = XDM_EVENT_TYPES[entry?.event];
  if (!eventType) return null;
  const info = entry.eventInfo || {};
  const page = Object.values(state.page || {})[0] || {};
  const component = String(info.path || '').startsWith('component.') ? subjectOf(info.path, state) : null;
  const componentId = component ? String(info.path).slice('component.'.length) : '';
  const isPageView = entry.event === 'page:view';
  const isClick = entry.event === 'cmp:click';
  const xdm = {
    eventType,
    _id: info.eventId,
    timestamp: info.eventTimestamp,
    web: {
      webPageDetails: {
        name: page.pageName,
        URL: page.pageURL,
        siteSection: page.siteSection,
        pageViews: isPageView ? { value: 1 } : undefined,
      },
      webInteraction: isClick ? {
        name: info['dc:title'],
        URL: info['xdm:linkURL'],
        type: LINK_TYPES[info['xdm:linkType']] || 'other',
        linkClicks: { value: 1 },
      } : undefined,
    },
  };
  if (entry.event.startsWith('cmp:personalization') && info.decisionScope) {
    // eslint-disable-next-line no-underscore-dangle
    xdm._experience = {
      decisioning: {
        propositions: [{ scope: info.decisionScope, id: info.activityId }],
        propositionEventType: { [isClick ? 'interact' : 'display']: 1 },
      },
    };
  }
  const tenant = String(config.tenantId || '').replace(/^_/, '');
  if (tenant) {
    xdm[`_${tenant}`] = {
      tcs: {
        schemaVersion: info.schemaVersion,
        page: isPageView ? {
          pageType: page['xdm:template'],
          language: page['xdm:language'],
          country: page.country,
          region: page.region,
          subSection: page.subSection,
          contentType: page.contentType,
          publishDate: page.publishDate,
          authorId: page.authorId,
          tags: page['xdm:tags'],
        } : undefined,
        component: component ? {
          id: componentId,
          type: component['@type'],
          position: info.position,
        } : undefined,
        interaction: isPageView ? undefined : {
          type: info.interaction,
          value: info.value,
          searchTerm: info['xdm:searchTerm'],
          fields: info.fields,
          mediaURL: info['xdm:mediaURL'],
          breakpoint: info.breakpoint,
        },
      },
    };
  }
  return compact(xdm) || null;
}
