/**
 * Consent utils: the visitor's consent state as a Consent Management Platform (CMP) reports it,
 * for the code that sends data (utils/web-sdk.js). No CMP is configured (KB-D-074): without one,
 * every category is 'unknown' and nothing is sent. This module invents no consent behaviour: it
 * neither asks for consent nor stores it; the CMP does both and preserves it across pages.
 *
 * A CMP adapter (e.g. a small script added with the CMP) connects with:
 *   registerConsentProvider(() => ({
 *     analytics: 'granted', personalization: 'denied', marketing: 'denied',
 *   }));
 *   updateConsent({ analytics: 'granted', ... }); // on every change, also a withdrawal
 * Categories: analytics (measurement), personalization (Target, AJO), marketing (advertising).
 * The essential events (page rendering, the data layer itself) need no consent; sending them
 * anywhere does.
 */
import { pushDataLayerEvent } from './analytics.js';

export const CONSENT_CATEGORIES = ['analytics', 'personalization', 'marketing'];
const VALUES = ['granted', 'denied', 'pending'];

let provider = null;
const listeners = new Set();

/**
 * A consent state with every category (pure): granted, denied or pending as given, else unknown.
 * @param {Object} [state]
 * @param {string} [source]
 * @returns {{ analytics: string, personalization: string, marketing: string, source: string }}
 */
export function normalizeConsent(state = {}, source = 'none') {
  const value = (v) => (VALUES.includes(String(v).toLowerCase())
    ? String(v).toLowerCase() : 'unknown');
  return {
    ...Object.fromEntries(CONSENT_CATEGORIES
      .map((category) => [category, value(state?.[category])])),
    source,
  };
}

/**
 * Connects the CMP (once): a function that returns the current state.
 * @param {() => Object} fn
 */
export function registerConsentProvider(fn) {
  provider = typeof fn === 'function' ? fn : null;
}

/** the current consent state; unknown for every category without a CMP */
export function getConsentState() {
  if (!provider) return normalizeConsent({}, 'none');
  try {
    return normalizeConsent(provider(), 'cmp');
  } catch {
    return normalizeConsent({}, 'cmp-error');
  }
}

/**
 * Whether a category may be collected: only when the CMP reports it granted.
 * @param {string} category analytics, personalization or marketing
 * @param {Object} [state]
 */
export const canCollect = (category, state = getConsentState()) => state[category] === 'granted';

/**
 * The CMP reports a change (a grant or a withdrawal): the data layer gets consent:update (the
 * categories' values only) and the listeners (the Web SDK bridge) are told.
 * @param {Object} state
 * @returns {Object} the normalized state
 */
export function updateConsent(state) {
  const consent = normalizeConsent(state, 'cmp');
  pushDataLayerEvent('consent:update', {
    analytics: consent.analytics,
    personalization: consent.personalization,
    marketing: consent.marketing,
  });
  listeners.forEach((listener) => {
    try {
      listener(consent);
    } catch {
      // a listener never breaks the CMP
    }
  });
  return consent;
}

/**
 * Calls a function on every consent change.
 * @param {(state: Object) => void} listener
 * @returns {() => void} removes the listener
 */
export function onConsentChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
