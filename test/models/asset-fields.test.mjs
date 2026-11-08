/*
 * Asset fields (KB-D-067): authors pick assets with the Universal Editor Custom Content Advisor and pages store
 * their Dynamic Media with OpenAPI delivery URL, so every asset field is a custom-asset field whose picker
 * configuration is a path on the Sites author (no AEM host or environment id in the repository). No
 * <name>MimeType field: without it the asset is delivered by Dynamic Media (images too), not copied to the
 * Edge Delivery media bus: node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const repo = new URL('../../', import.meta.url);
const models = JSON.parse(readFileSync(new URL('component-models.json', repo), 'utf8'));
const CONFIG = /^\/content\/dam\/tcs-corp-config\/asset-selector\/[a-z-]+\.config\.json$/;
const fieldsOf = (model) => (model.fields || []).flatMap((f) => [f, ...(f.fields || [])]);

describe('asset fields (Dynamic Media asset picker)', () => {
  const assets = models.flatMap((m) => fieldsOf(m).map((f) => ({ m, f })))
    .filter(({ f }) => f.component === 'custom-asset-namespace:custom-asset');

  it('no asset field uses the built-in asset picker any more', () => {
    const left = models.flatMap((m) => fieldsOf(m).filter((f) => f.component === 'reference').map((f) => `${m.id}.${f.name}`));
    assert.deepEqual(left, []);
    assert.equal(assets.length, 20);
  });
  it('each one reads its picker configuration from the Sites author', () => {
    assets.forEach(({ m, f }) => assert.match(f.configUrl, CONFIG, `${m.id}.${f.name}`));
  });
  it('none has a MIME type field (Dynamic Media delivers the images too)', () => {
    assets.forEach(({ m, f }) => {
      const names = fieldsOf(m).map((x) => x.name);
      assert.ok(!names.includes(`${f.name}MimeType`), `${m.id}.${f.name}MimeType`);
    });
  });
});
