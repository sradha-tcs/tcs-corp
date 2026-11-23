/**
 * Analytics utils: the Adobe Client Data Layer (window.adobeDataLayer, read by Adobe Tags and the
 * Web SDK bridge utils/web-sdk.js), following the AEM Core Components data layer: page and
 * component state entries ({ component: { id: { '@type', 'dc:title', ... } } }) and events
 * ({ event: 'cmp:click', eventInfo: { path: 'component.id', ... } }).
 *
 * Every event's eventInfo also carries eventId (unique), eventName, eventTimestamp (ISO 8601) and
 * schemaVersion; payloads are sanitized (no empty values, no e-mail addresses or phone numbers in
 * free text) and validated, and the same event isn't pushed twice in a row (duplicate dispatch).
 * Event names and fields: docs/handover/knowledge-base/data-layer-and-analytics.md.
 *
 * The data layer array is created the standard way (window.adobeDataLayer || []) so entries
 * pushed before Tags loads are processed by it. Analytics never breaks rendering or links.
 * Debugging: ?dldebug in the URL (or localStorage dl-debug = 1) logs every entry.
 */
import { compact } from './objects.js';
import { redactPersonalData } from './privacy.js';

/** the version of the event structure (eventInfo fields); raise it when a field changes meaning */
export const SCHEMA_VERSION = '1.0';

/** the event name format: a namespace and a name, e.g. page:view, cmp:click, consent:update */
const EVENT_NAME = /^[a-z]+:[a-zA-Z]+$/;
/** the namespaces of the data layer events */
export const EVENT_NAMESPACES = ['page', 'cmp', 'consent', 'app'];
/** fields whose value is an address, never redacted (their personal parts are left out upstream) */
const URL_FIELDS = new Set(['path', 'xdm:linkURL', 'xdm:mediaURL', 'repo:path', 'pageURL']);
/** the same event (name and fields) within this time is a duplicate dispatch */
const DUPLICATE_MS = 50;

let lastKey = '';
let lastTime = 0;

/** a unique event id (UUID v4 where the browser has crypto.randomUUID) */
export function generateEventId() {
  try {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  } catch {
    // an insecure context: the fallback below
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * A data layer payload without empty values and without direct identifiers in its free text.
 * @param {*} value
 * @returns {*} undefined when nothing is left
 */
export function sanitizeDataLayerPayload(value, key = '') {
  if (Array.isArray(value)) return compact(value.map((v) => sanitizeDataLayerPayload(v, key)));
  if (value && typeof value === 'object') {
    return compact(Object.fromEntries(Object.entries(value)
      .map(([k, v]) => [k, sanitizeDataLayerPayload(v, k)])));
  }
  if (typeof value === 'string') {
    if (URL_FIELDS.has(key)) return compact(value.trim());
    return compact(redactPersonalData(value));
  }
  if (typeof value === 'number' && !Number.isFinite(value)) return undefined;
  return compact(value);
}

/**
 * Whether an event entry has the data layer structure.
 * @param {Object} entry
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateDataLayerEvent(entry) {
  const errors = [];
  if (!entry || typeof entry !== 'object') return { valid: false, errors: ['not an object'] };
  const { event, eventInfo } = entry;
  if (typeof event !== 'string' || !EVENT_NAME.test(event)) errors.push(`invalid event name: ${event}`);
  else if (!EVENT_NAMESPACES.includes(event.split(':')[0])) errors.push(`unknown namespace: ${event}`);
  if (!eventInfo || typeof eventInfo !== 'object') errors.push('no eventInfo');
  else {
    if (!eventInfo.eventId) errors.push('no eventId');
    if (!eventInfo.eventTimestamp || Number.isNaN(Date.parse(eventInfo.eventTimestamp))) {
      errors.push('no eventTimestamp');
    }
    if (eventInfo.schemaVersion !== SCHEMA_VERSION) errors.push('wrong schemaVersion');
    if (String(event).startsWith('cmp:') && !/^(page|component)\./.test(eventInfo.path || '')) {
      errors.push('no component path');
    }
  }
  return { valid: !errors.length, errors };
}

/**
 * Builds an event entry (pure): the eventInfo fields every event has, then the event's own.
 * @param {string} event e.g. cmp:click
 * @param {Object} [info] the event's fields
 * @param {Object} [options]
 * @param {string} [options.path] the page or component it is about (page.{id}, component.{id})
 * @param {Date} [options.now]
 * @param {string} [options.eventId]
 * @returns {Object}
 */
export function createDataLayerEvent(event, info = {}, { path, now = new Date(), eventId } = {}) {
  return {
    event,
    eventInfo: sanitizeDataLayerPayload({
      ...(path ? { path } : {}),
      ...info,
      eventId: eventId || generateEventId(),
      eventName: event,
      eventTimestamp: now.toISOString(),
      schemaVersion: SCHEMA_VERSION,
    }) || {},
  };
}

/**
 * Whether an event repeats the previous one within DUPLICATE_MS (two listeners or a bubbling and
 * a captured dispatch of the same action); records it otherwise.
 * @param {Object} entry
 * @param {number} [time]
 */
export function isDuplicateEvent(entry, time = Date.now()) {
  // the event and all its fields but its id and time
  const { eventId, eventTimestamp, ...fields } = entry.eventInfo || {};
  const key = `${entry.event}|${JSON.stringify(fields)}`;
  const duplicate = key === lastKey && time - lastTime < DUPLICATE_MS;
  lastKey = key;
  lastTime = time;
  return duplicate;
}

const debugging = () => {
  try {
    return new URLSearchParams(window.location.search).has('dldebug')
      || localStorage.getItem('dl-debug') === '1';
  } catch {
    return false;
  }
};

/**
 * Pushes an entry to the data layer.
 * @param {Object} entry
 * @returns {boolean} whether it was pushed
 */
export function pushToDataLayer(entry) {
  try {
    window.adobeDataLayer = window.adobeDataLayer || [];
    window.adobeDataLayer.push(entry);
    // eslint-disable-next-line no-console
    if (debugging()) console.debug('[data layer]', entry);
    return true;
  } catch {
    return false;
  }
}

/**
 * Pushes a business event: built, validated and de-duplicated (an invalid or repeated event isn't
 * pushed; with ?dldebug it is logged).
 * @param {string} event e.g. consent:update, app:error, cmp:formStart
 * @param {Object} [info] the event's fields
 * @param {string} [path] page.{id} or component.{id}
 * @returns {Object|null} the pushed entry
 */
export function pushDataLayerEvent(event, info = {}, path = '') {
  const entry = createDataLayerEvent(event, info, { path });
  const { valid, errors } = validateDataLayerEvent(entry);
  if (!valid || isDuplicateEvent(entry)) {
    // eslint-disable-next-line no-console
    if (debugging()) console.debug('[data layer] not pushed', entry, errors);
    return null;
  }
  return pushToDataLayer(entry) ? entry : null;
}

/**
 * Adds components' state to the data layer.
 * @param {Object<string, Object>} components by component id
 */
export const pushComponents = (components) => pushToDataLayer({
  component: sanitizeDataLayerPayload(components) || {},
});

/**
 * Pushes a component interaction.
 * @param {string} event e.g. cmp:click
 * @param {string} id the component id
 * @param {Object} [info] more eventInfo
 * @returns {Object|null} the pushed entry
 */
// the page entry is page.{id} (ids page-…); components are component.{id}
export const pushComponentEvent = (event, id, info = {}) => pushDataLayerEvent(
  event,
  info,
  id.startsWith('page-') ? `page.${id}` : `component.${id}`,
);

/**
 * Pushes a personalization event, for a future decisioning integration (Adobe Target through the
 * Web SDK): an offer shown or clicked. Components don't call Target; they describe the offer.
 * @param {'display'|'click'} kind
 * @param {string} id the component id
 * @param {{ decisionScope?: string, activityId?: string, experienceId?: string }} decision
 */
export const pushPersonalizationEvent = (kind, id, decision = {}) => pushComponentEvent(
  kind === 'click' ? 'cmp:personalizationClick' : 'cmp:personalizationDisplay',
  id,
  {
    decisionScope: decision.decisionScope,
    activityId: decision.activityId,
    experienceId: decision.experienceId,
  },
);
