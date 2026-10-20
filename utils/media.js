/**
 * Media utils: recognize video providers and build their player URLs.
 */

export const isYoutube = (link) => /youtube\.com|youtu\.be/.test(link);
export const isVimeo = (link) => /vimeo\.com/.test(link);
export const isAnimation = (href) => /\.json([?#]|$)/i.test(href);

/**
 * The video id of a YouTube watch / share / embed URL.
 * @param {URL} url
 * @returns {string}
 */
export function youtubeId(url) {
  if (url.hostname.includes('youtu.be')) return url.pathname.split('/')[1] || '';
  const embed = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/);
  return embed ? embed[1] : new URLSearchParams(url.search).get('v') || '';
}

/**
 * The YouTube embed URL for a watch / share URL.
 * @param {URL} url
 * @param {Object<string, string>} [params] player parameters, e.g. { autoplay: '1' }
 * @param {{ privacy?: boolean }} [options] privacy: the privacy-enhanced youtube-nocookie.com
 *   player (no cookies until the video plays)
 * @returns {string}
 */
export function youtubeEmbedUrl(url, params = {}, { privacy = false } = {}) {
  const vid = youtubeId(url);
  const host = privacy ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';
  const src = new URL(vid ? `${host}/embed/${encodeURIComponent(vid)}` : `${host}${url.pathname}`);
  src.searchParams.set('rel', '0');
  // the player takes pause commands (e.g. when its tab is hidden, blocks/tabs)
  src.searchParams.set('enablejsapi', '1');
  Object.entries(params).forEach(([key, value]) => src.searchParams.set(key, value));
  return src.href;
}

/**
 * The Vimeo player URL for a video URL.
 * @param {URL} url
 * @param {Object<string, string>} [params] player parameters, e.g. { autoplay: '1' }
 * @param {{ start?: number }} [options] start: the start time in seconds
 * @returns {string}
 */
export function vimeoEmbedUrl(url, params = {}, { start = 0 } = {}) {
  // the id is the numeric path segment (vimeo.com/123, player.vimeo.com/video/123,
  // vimeo.com/channels/name/123); an unlisted video's hash follows it (vimeo.com/123/abc) or is ?h=
  const parts = url.pathname.split('/').filter(Boolean);
  const at = parts.findIndex((part) => /^\d+$/.test(part));
  const video = at >= 0 ? parts[at] : parts[0] || '';
  const src = new URL(`https://player.vimeo.com/video/${encodeURIComponent(video)}`);
  const hash = url.searchParams.get('h') || (at >= 0 && /^[\da-f]+$/i.test(parts[at + 1] || '') ? parts[at + 1] : '');
  if (hash) src.searchParams.set('h', hash);
  Object.entries(params).forEach(([key, value]) => src.searchParams.set(key, value));
  if (start > 0) src.hash = `t=${Math.floor(start)}s`;
  return src.href;
}

/** the MIME type of a video file URL, e.g. video/mp4 */
export const videoType = (source) => `video/${source.split('?')[0].split('.').pop()}`;
