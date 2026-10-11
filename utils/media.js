/**
 * Media utils: recognize video providers and build their player URLs.
 */

export const isYoutube = (link) => /youtube\.com|youtu\.be/.test(link);
export const isVimeo = (link) => /vimeo\.com/.test(link);
export const isAnimation = (href) => /\.json([?#]|$)/i.test(href);

/**
 * The YouTube embed URL for a watch / share URL.
 * @param {URL} url
 * @param {Object<string, string>} [params] player parameters, e.g. { autoplay: '1' }
 * @returns {string}
 */
export function youtubeEmbedUrl(url, params = {}) {
  const vid = url.hostname.includes('youtu.be')
    ? url.pathname.split('/')[1]
    : new URLSearchParams(url.search).get('v') || '';
  const src = new URL(vid ? `https://www.youtube.com/embed/${encodeURIComponent(vid)}` : `https://www.youtube.com${url.pathname}`);
  src.searchParams.set('rel', '0');
  Object.entries(params).forEach(([key, value]) => src.searchParams.set(key, value));
  return src.href;
}

/**
 * The Vimeo player URL for a video URL.
 * @param {URL} url
 * @param {Object<string, string>} [params] player parameters, e.g. { autoplay: '1' }
 * @returns {string}
 */
export function vimeoEmbedUrl(url, params = {}) {
  const [, video] = url.pathname.split('/');
  const src = new URL(`https://player.vimeo.com/video/${encodeURIComponent(video)}`);
  Object.entries(params).forEach(([key, value]) => src.searchParams.set(key, value));
  return src.href;
}

/** the MIME type of a video file URL, e.g. video/mp4 */
export const videoType = (source) => `video/${source.split('?')[0].split('.').pop()}`;
