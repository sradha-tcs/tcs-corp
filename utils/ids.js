/**
 * IDs utils: per-page instance numbers, so blocks used several times on a page get unique
 * element ids (tabs, form fields, carousels, live regions).
 */

import { toClassName } from '../scripts/aem.js';

const counters = new Map();

/**
 * The next instance number for a name: 1, 2, 3, ...
 * @param {string} name e.g. the block name
 * @returns {number}
 */
export function nextInstance(name) {
  const next = (counters.get(name) || 0) + 1;
  counters.set(name, next);
  return next;
}

/**
 * A unique id for a name, e.g. "tabs-2".
 * @param {string} name
 * @returns {string}
 */
export const uniqueId = (name) => `${name}-${nextInstance(name)}`;

/**
 * Creates an id generator for the elements of one block instance: ids are prefixed, made safe
 * for ids, and de-duplicated against each other and the page.
 * @param {string} prefix e.g. "form-variations-1"
 * @returns {(name: string) => string}
 */
export function createIdFactory(prefix) {
  const used = new Set();
  return (name) => {
    const base = `${prefix}-${toClassName(name) || 'field'}`;
    let id = base;
    let n = 2;
    while (used.has(id) || document.getElementById(id)) {
      id = `${base}-${n}`;
      n += 1;
    }
    used.add(id);
    return id;
  };
}
