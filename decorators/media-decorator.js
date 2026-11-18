/**
 * Media decorator: builds video players (YouTube, Vimeo, iframes, video files) with DOM APIs,
 * so authored URLs never end up in HTML strings. URLs come from utils/media.js.
 */
import { decorateButton } from './button-decorator.js';
import { createIconButton } from './icon-button-decorator.js';
import { prefersReducedMotion } from '../utils/environment.js';
import { videoType, vimeoEmbedUrl, youtubeEmbedUrl } from '../utils/media.js';
import { getPlaceholders } from '../utils/placeholders.js';
import { onVisible, watchVisibility } from '../utils/viewport.js';

const YOUTUBE_ALLOW = 'autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope';
const VIMEO_ALLOW = 'autoplay; fullscreen; picture-in-picture; encrypted-media';

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
 * @param {{ title?: string, privacy?: boolean }} [options] title: the iframe's accessible name;
 *   privacy: the privacy-enhanced (youtube-nocookie.com) player
 */
export const createYoutubeFrame = (url, params = {}, className = '', options = {}) => createFrame({
  src: youtubeEmbedUrl(url, params, { privacy: options.privacy }),
  title: options.title || 'Content from YouTube',
  allow: YOUTUBE_ALLOW,
  className,
});

/**
 * A Vimeo player for a video URL.
 * @param {URL} url
 * @param {Object<string, string>} [params] player parameters, e.g. { autoplay: '1' }
 * @param {string} [className]
 * @param {{ title?: string, start?: number }} [options] title: the iframe's accessible name;
 *   start: the start time in seconds
 */
export const createVimeoFrame = (url, params = {}, className = '', options = {}) => createFrame({
  src: vimeoEmbedUrl(url, params, { start: options.start }),
  title: options.title || 'Content from Vimeo',
  allow: VIMEO_ALLOW,
  className,
});

/**
 * A <video> element for a video file.
 * @param {string} source video URL
 * @param {{
 *   autoplay?: boolean, background?: boolean, muted?: boolean, loop?: boolean,
 *   controls?: boolean, poster?: string, start?: number, end?: number, title?: string,
 *   tracks?: { src: string, srclang: string, label: string }[]
 * }} [options] background: muted, looping, inline, without controls; muted: defaults to
 *   autoplay; start / end: seconds (a media fragment); tracks: WebVTT captions
 * @returns {HTMLVideoElement}
 */
export function createVideoElement(source, options = {}) {
  const {
    autoplay = false, background = false, poster = '', start = 0, end = 0, title = '',
    tracks = [],
  } = options;
  // muted by default when it plays on its own (browsers only autoplay muted videos)
  const muted = background || (options.muted ?? autoplay);
  const video = document.createElement('video');
  video.controls = !background && options.controls !== false;
  // no Download in the player's menu (Chrome, Edge), nor "Save video as" on right-click
  video.setAttribute('controlslist', 'nodownload');
  video.addEventListener('contextmenu', (e) => e.preventDefault());
  video.loop = background || !!options.loop;
  video.muted = muted;
  // the muted attribute too: browsers only autoplay videos that are muted from the start
  if (muted) video.setAttribute('muted', '');
  video.playsInline = true;
  video.preload = autoplay ? 'auto' : 'metadata';
  if (autoplay) video.autoplay = true;
  if (poster) video.poster = poster;
  if (title) video.setAttribute('aria-label', title);

  const sourceEl = document.createElement('source');
  const fragment = start > 0 || end > 0 ? `#t=${start || 0}${end > 0 ? `,${end}` : ''}` : '';
  sourceEl.src = `${source}${fragment}`;
  sourceEl.type = videoType(source);
  video.append(sourceEl);
  tracks.forEach(({ src, srclang, label }, i) => {
    const track = document.createElement('track');
    track.kind = 'captions';
    track.src = src;
    if (srclang) track.srclang = srclang;
    if (label) track.label = label;
    if (i === 0) track.default = true;
    video.append(track);
  });
  if (autoplay) video.addEventListener('canplay', () => video.play().catch(() => {}), { once: true });
  return video;
}

/** the pause / play button of a background video (labels from the placeholders) */
function createVideoToggle(video, state, className) {
  let t = (key, fallback) => fallback;
  const button = createIconButton({
    label: 'Pause video', icon: 'pause', type: 'secondary', className,
  });
  button.dataset.cmpInteraction = 'playback';
  const update = () => {
    const label = state.paused ? t('playVideo', 'Play video') : t('pauseVideo', 'Pause video');
    button.setAttribute('aria-label', label);
    decorateButton(button, {
      view: 'icon', type: 'secondary', icon: state.paused ? 'play' : 'pause', title: label,
    });
  };
  button.addEventListener('click', () => {
    state.paused = !state.paused;
    if (state.paused) video.pause();
    else video.play().catch(() => {});
    update();
  });
  update();
  getPlaceholders().then((placeholders) => {
    t = placeholders;
    update();
  }).catch(() => {});
  return button;
}

/**
 * A background video (e.g. the Hero's Video image type): muted, looping, inline, without
 * controls. It loads once it is near the viewport and the browser is idle (the page's LCP
 * isn't held up), pauses off screen, and doesn't play for reduced motion (its first frame
 * shows). Its pause / play button (WCAG 2.2.2; controls, on by default) is
 * element.animationToggle, for the block to place where it can be reached; a file that fails
 * to load (e.g. a DAM video not published) hides both and dispatches a bubbling video:failed
 * event.
 * @param {string} source the video file URL
 * @param {{ label?: string, className?: string, toggleClassName?: string, controls?: boolean }}
 *   [options] label: the video's text alternative ('' for a decorative video); controls: false
 *   leaves the pause / play button out (KB-D-072: not WCAG 2.2.2 conform)
 * @returns {HTMLVideoElement}
 */
export function createBackgroundVideo(source, {
  label = '', className = '', toggleClassName = 'video-toggle', controls = true,
} = {}) {
  const video = createVideoElement(source, { background: true, title: label });
  if (className) video.className = className;
  if (!label) video.setAttribute('aria-hidden', 'true');
  // nothing is fetched until the video is near the viewport
  video.preload = 'none';
  const state = { paused: prefersReducedMotion() };
  if (controls) video.animationToggle = createVideoToggle(video, state, toggleClassName);
  video.querySelector('source').addEventListener('error', () => {
    video.hidden = true;
    video.animationToggle?.remove();
    video.dispatchEvent(new CustomEvent('video:failed', { bubbles: true }));
  });
  onVisible(video, () => {
    const idle = window.requestIdleCallback || ((callback) => setTimeout(callback, 200));
    idle(() => {
      video.preload = state.paused ? 'metadata' : 'auto';
      video.load();
      watchVisibility(video, (visible) => {
        const play = visible && !state.paused;
        // (background videos aren't data-layer interactions: decorators/data-layer-decorator.js)
        if (play === !video.paused) return;
        if (play) video.play().catch(() => {});
        else video.pause();
      });
    });
  }, { rootMargin: '200px' });
  return video;
}
