/*
 * Vimeo player URLs from the URL forms authors paste (utils/media.js vimeoEmbedUrl): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { vimeoEmbedUrl } from '../../utils/media.js';

const url = (href) => vimeoEmbedUrl(new URL(href));

describe('vimeoEmbedUrl', () => {
  it('reads the id of a video page', () => {
    assert.equal(url('https://vimeo.com/76979871'), 'https://player.vimeo.com/video/76979871');
  });
  it('keeps a player URL', () => {
    assert.equal(url('https://player.vimeo.com/video/76979871'), 'https://player.vimeo.com/video/76979871');
  });
  it('reads the id of a channel video', () => {
    assert.equal(url('https://vimeo.com/channels/staffpicks/76979871'), 'https://player.vimeo.com/video/76979871');
  });
  it('keeps the hash of an unlisted video', () => {
    assert.equal(url('https://vimeo.com/76979871/abc123def'), 'https://player.vimeo.com/video/76979871?h=abc123def');
    assert.equal(url('https://player.vimeo.com/video/76979871?h=abc123def'), 'https://player.vimeo.com/video/76979871?h=abc123def');
  });
  it('adds player parameters and the start time', () => {
    assert.equal(vimeoEmbedUrl(new URL('https://vimeo.com/1'), { dnt: '1' }, { start: 12.5 }), 'https://player.vimeo.com/video/1?dnt=1#t=12s');
  });
});
