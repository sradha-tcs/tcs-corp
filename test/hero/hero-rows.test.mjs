/*
 * Hero rows: the block's own rows as AEM delivers them, in model order, so hero.js finds the
 * separate Eyebrow's row by its place (hero.js HERO_LAYOUT): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import modelLayout from '../model-layout.mjs';

// hero.js HERO_LAYOUT: null is a dialog tab, content the content_ element group
const HERO_LAYOUT = [null, 'content', 'image', 'eyebrow', 'ctas', null, null];

/** the model's rows: a cell per field and tab, the content_ element group once, at its first field */
function heroRows() {
  const rows = [];
  modelLayout('blocks/hero/_hero.json', 'hero').forEach((field) => {
    const row = field?.startsWith('content_') ? 'content' : field;
    if (row !== 'content' || !rows.includes('content')) rows.push(row);
  });
  return rows;
}

describe('hero rows', () => {
  it('the model delivers the rows hero.js reads (HERO_LAYOUT)', () => {
    assert.deepEqual(heroRows(), HERO_LAYOUT);
  });

  it('keeps the content group Eyebrow (authored before) next to the separate Eyebrow', () => {
    const { models } = JSON.parse(readFileSync(new URL('../../blocks/hero/_hero.json', import.meta.url)));
    const names = models.find((m) => m.id === 'hero').fields.map((f) => f.name);
    assert.ok(names.includes('eyebrow'));
    assert.ok(names.includes('content_eyebrow'));
    assert.equal(names.indexOf('content_eyebrow'), names.indexOf('eyebrow') + 1);
  });
});
