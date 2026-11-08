/*
 * Dynamic Media with OpenAPI delivery URLs of a separate AEM Assets environment (EDAM, KB-D-064)
 * (utils/media.js deliveryAsset, deliveryImageUrl): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { deliveryAsset, deliveryImageUrl } from '../../utils/media.js';

const HOST = 'https://assets.example.com';
const ID = 'urn:aaid:aem:4faec46a-0abd-dc6c-9e98-d46d8bbf3882';

describe('deliveryAsset', () => {
  it('reads an image rendition URL', () => {
    assert.deepEqual(deliveryAsset(`${HOST}/adobe/assets/${ID}/as/ace-10.jpg`), {
      id: ID, name: 'ace-10.jpg', original: false, image: true, resizable: true,
    });
  });
  it('reads an original file URL (video, audio, document) as not an image', () => {
    assert.deepEqual(deliveryAsset(`${HOST}/adobe/assets/${ID}/original/as/pae-video-avs.mp4`), {
      id: ID, name: 'pae-video-avs.mp4', original: true, image: false, resizable: false,
    });
    assert.equal(deliveryAsset(`${HOST}/adobe/assets/${ID}/original/as/photo.jpg`).image, false);
  });
  it('reads an SVG as an image that takes no width', () => {
    const asset = deliveryAsset(`${HOST}/adobe/assets/${ID}/as/logo.svg`);
    assert.equal(asset.image, true);
    assert.equal(asset.resizable, false);
  });
  it('keeps the query and decodes the name', () => {
    const asset = deliveryAsset(`${HOST}/adobe/assets/${ID}/as/my%20image.png?width=300`);
    assert.equal(asset.name, 'my image.png');
    assert.equal(asset.resizable, true);
  });
  it('refuses other URLs', () => {
    assert.equal(deliveryAsset('/content/dam/tcs-corp/images/a.jpg'), null);
    assert.equal(deliveryAsset(`${HOST}/content/dam/tcs-corp/images/a.jpg`), null);
    assert.equal(deliveryAsset(`${HOST}/adobe/assets/not-an-id/as/a.jpg`), null);
    assert.equal(deliveryAsset(`${HOST}/adobe/assets/${ID}/as/`), null);
    assert.equal(deliveryAsset(`javascript:alert(1)//adobe/assets/${ID}/as/a.jpg`), null);
    assert.equal(deliveryAsset('not a url'), null);
  });
});

describe('deliveryImageUrl', () => {
  const src = `${HOST}/adobe/assets/${ID}/as/ace-10.jpg`;
  it('sets the width', () => {
    assert.equal(deliveryImageUrl(src, 750), `${src}?width=750`);
  });
  it('prefers WebP when asked', () => {
    assert.equal(deliveryImageUrl(src, '2000', { webp: true }), `${src}?width=2000&preferwebp=true`);
  });
  it('replaces a width and a WebP preference already in the URL', () => {
    assert.equal(deliveryImageUrl(`${src}?width=100&preferwebp=true`, 750), `${src}?width=750`);
  });
});
