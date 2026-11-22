/**
 * Web SDK utils: the bridge from the data layer to the Adobe Experience Platform Web SDK (alloy)
 * and the Edge Network (KB-D-074). Not active until it is configured: a page turns it on with the
 * metadata web-sdk = on (a bulk metadata column), its settings are the site's web-sdk sheet
 * (/{root}/web-sdk.json, template tools/web-sdk/web-sdk.template.csv; no IDs in the code), and the
 * Web SDK itself is loaded by Adobe Tags or its own snippet, never by this code. Started in the
 * delayed phase (scripts/delayed.js): no effect on LCP, INP or CLS.
 *
 * Business event (utils/analytics.js) -> consent check (utils/consent.js) -> event-to-XDM mapping
 * (utils/xdm.js) -> alloy('sendEvent') -> Edge Network -> Analytics / Target / CJA / AJO.
 *
 * Use either this bridge or Tags rules that send the same events, never both (duplicates).
 */
import { canCollect, getConsentState, onConsentChange } from './consent.js';
import { localeSheetPath, sheetRows } from './site.js';
import { dataLayerState, toXdm } from './xdm.js';

export const ENVIRONMENTS = ['dev', 'stage', 'prod'];

/**
 * The environment of a host (pure): dev on localhost, stage on *.aem.page, prod elsewhere
 * (*.aem.live and the production domain).
 * @param {string} hostname
 */
export function environmentOf(hostname) {
  const host = String(hostname || '').toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.localhost')) return 'dev';
  if (host.endsWith('.aem.page') || host.endsWith('.hlx.page')) return 'stage';
  return 'prod';
}

/** a value of the template that wasn't replaced (e.g. <datastream ID for development>) */
const isPlaceholder = (value) => !value || /^<.*>$/.test(String(value).trim());

/**
 * The settings of an environment from the web-sdk sheet's rows (pure): the row whose host is the
 * page's host, else the row of its environment. Rows with template placeholders are unusable.
 * @param {Object[]} rows columns: environment, host, datastreamId, orgId, edgeDomain, tenantId,
 *   decisionScopes, consentStandard, configure, debug
 * @param {string} hostname
 * @returns {Object|null}
 */
export function webSdkConfigOf(rows, hostname) {
  const environment = environmentOf(hostname);
  const same = (a, b) => String(a || '').trim().toLowerCase() === String(b || '').toLowerCase();
  const row = rows.find((r) => r.host && same(r.host, hostname))
    || rows.find((r) => same(r.environment, environment));
  if (!row || isPlaceholder(row.datastreamId) || isPlaceholder(row.orgId)) return null;
  const yes = (v) => /^(yes|true|on)$/i.test(String(v || '').trim());
  return {
    environment,
    datastreamId: String(row.datastreamId).trim(),
    orgId: String(row.orgId).trim(),
    edgeDomain: isPlaceholder(row.edgeDomain) ? '' : String(row.edgeDomain).trim(),
    tenantId: isPlaceholder(row.tenantId) ? '' : String(row.tenantId).trim(),
    decisionScopes: String(row.decisionScopes || '').split(',').map((s) => s.trim())
      .filter((s) => s && !isPlaceholder(s)),
    consentStandard: String(row.consentStandard || '').trim().toLowerCase(),
    configure: yes(row.configure),
    debug: yes(row.debug) && environment !== 'prod',
  };
}

/** the Adobe consent standard 2.0 value of a consent state (pure) */
export const adobeConsentOf = (state) => [{
  standard: 'Adobe',
  version: '2.0',
  value: {
    collect: { val: state.analytics === 'granted' ? 'y' : 'n' },
    personalize: { content: { val: state.personalization === 'granted' ? 'y' : 'n' } },
  },
}];

/** whether the page turns the bridge on (metadata web-sdk = on) */
export const isWebSdkEnabled = () => /^(on|yes|true)$/i
  .test(document.head.querySelector('meta[name="web-sdk"]')?.content?.trim() || '');

/**
 * Starts the bridge: sends the data layer's events, past and future, once each, while the
 * visitor's analytics consent is granted (none are queued before it).
 * @returns {Promise<string>} started, disabled, not-configured or no-sdk
 */
export async function startWebSdkBridge() {
  if (!isWebSdkEnabled()) return 'disabled';
  const rows = await fetch(localeSheetPath('web-sdk'))
    .then((r) => (r.ok ? r.json() : null)).then((json) => sheetRows(json)).catch(() => []);
  const config = webSdkConfigOf(rows, window.location.hostname);
  if (!config) return 'not-configured';
  const { alloy } = window;
  if (typeof alloy !== 'function') return 'no-sdk';
  if (config.configure) {
    alloy('configure', {
      datastreamId: config.datastreamId,
      orgId: config.orgId,
      ...(config.edgeDomain ? { edgeDomain: config.edgeDomain } : {}),
      defaultConsent: 'pending',
      debugEnabled: config.debug,
    });
  }
  const setConsent = (state) => {
    if (config.consentStandard !== 'adobe-2.0') return;
    alloy('setConsent', { consent: adobeConsentOf(state) }).catch(() => {});
  };
  if (getConsentState().source === 'cmp') setConsent(getConsentState());
  onConsentChange(setConsent);

  window.adobeDataLayer = window.adobeDataLayer || [];
  const layer = window.adobeDataLayer;
  const entries = Array.isArray(layer) ? [...layer] : [];
  const sent = new Set();
  const stateOf = () => (typeof layer.getState === 'function' ? layer.getState() : dataLayerState(entries));
  const send = (entry) => {
    const id = entry?.eventInfo?.eventId;
    if (!entry?.event || !id || sent.has(id) || !canCollect('analytics')) return;
    const xdm = toXdm(entry, stateOf(), config);
    if (!xdm) return;
    sent.add(id);
    const options = { xdm };
    if (entry.event === 'page:view' && config.decisionScopes.length && canCollect('personalization')) {
      options.decisionScopes = config.decisionScopes;
      options.renderDecisions = true;
    }
    alloy('sendEvent', options).catch(() => {});
  };
  entries.forEach(send);
  if (typeof layer.addEventListener === 'function') {
    // the Adobe Client Data Layer library (loaded by Tags)
    layer.addEventListener('adobeDataLayer:event', send);
  } else if (Array.isArray(layer)) {
    const push = layer.push.bind(layer);
    layer.push = (...items) => {
      const result = push(...items);
      items.forEach((item) => { entries.push(item); send(item); });
      return result;
    };
  }
  return 'started';
}
