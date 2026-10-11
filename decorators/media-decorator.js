/**
 * Media decorator: builds video players (YouTube, Vimeo, iframes, video files) with DOM APIs,
 * so authored URLs never end up in HTML strings. URLs come from utils/media.js.
 */
import { videoType, vimeoEmbedUrl, youtubeEmbedUrl } from '../utils/media.js';

const YOUTUBE_ALLOW = 'autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope';
const VIMEO_ALLOW = 'autoplay; fullscreen; picture-in-picture';

/**
 * A responsive, lazy-loaded iframe in a wrapper (the wrapper class sets the aspect ratio).
 * @param {{ src: string, title: string, allow?: string, className?: string }} options
 * @returns {HTMLDivElement}
 */
export function createFrame({
  src, title, allow = 'encrypted-media', className = '',
}) {
  const wrapper = document.createElement('div');
  wrapper.className = className;
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = title;
  iframe.loading = 'lazy';
  iframe.allow = allow;
  iframe.allowFullscreen = true;
  wrapper.append(iframe);
  return wrapper;
}

/**
 * A YouTube player for a watch / share URL.
 * @param {URL} url
 * @param {Object<string, string>} [params] player parameters, e.g. { autoplay: '1' }
 * @param {string} [className]
 */
export const createYoutubeFrame = (url, params = {}, className = '') => createFrame({
  src: youtubeEmbedUrl(url, params), title: 'Content from YouTube', allow: YOUTUBE_ALLOW, className,
});

/**
 * A Vimeo player for a video URL.
 * @param {URL} url
 * @param {Object<string, string>} [params] player parameters, e.g. { autoplay: '1' }
 * @param {string} [className]
 */
export const createVimeoFrame = (url, params = {}, className = '') => createFrame({
  src: vimeoEmbedUrl(url, params), title: 'Content from Vimeo', allow: VIMEO_ALLOW, className,
});

/**
 * A <video> element for a video file.
 * @param {string} source video URL
 * @param {{ autoplay?: boolean, background?: boolean }} [options] background: muted loop,
 * no controls
 * @returns {HTMLVideoElement}
 */
export function createVideoElement(source, { autoplay = false, background = false } = {}) {
  const video = document.createElement('video');
  video.controls = !background;
  if (autoplay) video.autoplay = true;
  if (background) {
    video.loop = true;
    video.playsInline = true;
    video.addEventListener('canplay', () => {
      video.muted = true;
      if (autoplay) video.play();
    });
  }
  const sourceEl = document.createElement('source');
  sourceEl.src = source;
  sourceEl.type = videoType(source);
  video.append(sourceEl);
  return video;
}
