/*
 * The page properties Hide Header, Hide Footer and Hide Conversation Canvas
 * (utils/page-visibility.js): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  PAGE_PARTS, hiddenParts, isOn, pageHides,
} from '../../utils/page-visibility.js';

/** a metadata reader over a plain object, as getMetadata reads the page's <meta> */
const reader = (values) => (name) => values[name] ?? '';

describe('isOn', () => {
  it('is on for a published boolean page property and the usual sheet values', () => {
    ['true', 'TRUE', ' yes ', 'on', '1', 'y', true].forEach((value) => assert.equal(isOn(value), true, String(value)));
  });
  it('is off for empty, false and anything else (the part stays shown)', () => {
    ['', 'false', 'no', 'off', '0', 'hide', undefined, null, false].forEach((value) => assert.equal(isOn(value), false, String(value)));
  });
});

describe('PAGE_PARTS', () => {
  it('names the page properties and sheet columns', () => {
    assert.deepEqual(PAGE_PARTS, { header: 'hide-header', footer: 'hide-footer', canvas: 'hide-canvas' });
  });
  it('matches the fields of the page model', async () => {
    const { readFile } = await import('node:fs/promises');
    const model = JSON.parse(await readFile(new URL('../../models/_page.json', import.meta.url)));
    const { fields } = model.models.find(({ id }) => id === 'page-metadata');
    Object.values(PAGE_PARTS).forEach((name) => {
      const field = fields.find((f) => f.name === name);
      assert.ok(field, name);
      assert.equal(field.component, 'boolean');
      assert.equal(field.value, false, `${name} is off by default`);
    });
  });
});

describe('hiddenParts', () => {
  it('shows everything on a page without the toggles (existing pages unchanged)', () => {
    assert.deepEqual(hiddenParts(reader({})), { header: false, footer: false, canvas: false });
  });
  it('hides each part on its own', () => {
    assert.deepEqual(hiddenParts(reader({ 'hide-header': 'true' })), { header: true, footer: false, canvas: false });
    assert.deepEqual(hiddenParts(reader({ 'hide-footer': 'true' })), { header: false, footer: true, canvas: false });
    assert.deepEqual(hiddenParts(reader({ 'hide-canvas': 'yes' })), { header: false, footer: false, canvas: true });
  });
  it('keeps a part turned off again shown', () => {
    assert.deepEqual(hiddenParts(reader({ 'hide-header': 'false', 'hide-footer': 'false', 'hide-canvas': 'false' })), { header: false, footer: false, canvas: false });
  });
});

describe('pageHides', () => {
  it('reads one part', () => {
    assert.equal(pageHides('canvas', reader({ 'hide-canvas': 'true' })), true);
    assert.equal(pageHides('header', reader({ 'hide-canvas': 'true' })), false);
  });
  it('is false for an unknown part', () => {
    assert.equal(pageHides('sidebar', reader({ 'hide-sidebar': 'true' })), false);
  });
});
