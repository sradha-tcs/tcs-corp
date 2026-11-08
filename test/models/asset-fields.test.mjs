/*
 * Asset fields (KB-D-064): authors pick assets from the separate AEM Assets environment (EDAM) with the
 * Universal Editor Custom Content Advisor, so every asset field is a custom-asset field whose picker
 * configuration is a path on the Sites author (no AEM host or environment id in the repository), followed by
 * its MIME type field (<name>MimeType: images go through the Edge Delivery media bus): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const repo = new URL('../../', import.meta.url);
const models = JSON.parse(readFileSync(new URL('component-models.json', repo), 'utf8'));
const CONFIG = /^\/content\/dam\/tcs-corp-config\/asset-selector\/[a-z-]+\.config\.json$/;
const fieldsOf = (model) => (model.fields || []).flatMap((f) => [f, ...(f.fields || [])]);

describe('asset fields (EDAM asset picker)', () => {
  const assets = models.flatMap((m) => fieldsOf(m).map((f, i, all) => ({ m, f, next: all[i + 1] })))
    .filter(({ f }) => f.component === 'custom-asset-namespace:custom-asset');

  it('no asset field uses the Sites author asset picker any more', () => {
    const left = models.flatMap((m) => fieldsOf(m).filter((f) => f.component === 'reference').map((f) => `${m.id}.${f.name}`));
    assert.deepEqual(left, []);
    assert.equal(assets.length, 20);
  });
  it('each one reads its picker configuration from the Sites author', () => {
    assets.forEach(({ m, f }) => assert.match(f.configUrl, CONFIG, `${m.id}.${f.name}`));
  });
  it('each one is followed by its MIME type field', () => {
    assets.forEach(({ m, f, next }) => {
      assert.equal(next?.component, 'custom-asset-namespace:custom-asset-mimetype', `${m.id}.${f.name}`);
      assert.equal(next.name, `${f.name}MimeType`);
    });
  });
});
