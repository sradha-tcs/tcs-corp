/*
 * Video Block (Block Collection): a video from a link (YouTube, Vimeo or a video file).
 * https://www.aem.live/developer/block-collection/video
 * Adapted: players are built with DOM APIs and the play button uses the shared button
 * decorator.
 */
import { decorateButton } from '../../decorators/button-decorator.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function createFrame(src, title, allow) {
  const wrapper = document.createElement('div');
  wrapper.className = 'video-frame';
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = title;
  iframe.loading = 'lazy';
  iframe.allow = allow;
  iframe.allowFullscreen = true;
  wrapper.append(iframe);
  return wrapper;
}

function embedYoutube(url, autoplay, background) {
  const usp = new URLSearchParams(url.search);
  let vid = usp.get('v') || '';
  if (url.hostname.includes('youtu.be')) [, vid] = url.pathname.split('/');
  const src = new URL(vid ? `https://www.youtube.com/embed/${encodeURIComponent(vid)}` : `https://www.youtube.com${url.pathname}`);
  src.searchParams.set('rel', '0');
  if (background || autoplay) {
    Object.entries({
      autoplay: autoplay ? '1' : '0',
      mute: background ? '1' : '0',
      controls: background ? '0' : '1',
      disablekb: background ? '1' : '0',
      loop: background ? '1' : '0',
      playsinline: background ? '1' : '0',
    }).forEach(([key, value]) => src.searchParams.set(key, value));
  }
  return createFrame(src.href, 'Content from YouTube', 'autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope');
}

function embedVimeo(url, autoplay, background) {
  const [, video] = url.pathname.split('/');
  const src = new URL(`https://player.vimeo.com/video/${encodeURIComponent(video)}`);
  if (background || autoplay) {
    src.searchParams.set('autoplay', autoplay ? '1' : '0');
    src.searchParams.set('background', background ? '1' : '0');
  }
  return createFrame(src.href, 'Content from Vimeo', 'autoplay; fullscreen; picture-in-picture');
}

function getVideoElement(source, autoplay, background) {
  const video = document.createElement('video');
  video.controls = true;
  if (autoplay) video.autoplay = true;
  if (background) {
    video.loop = true;
    video.playsInline = true;
    video.controls = false;
    video.addEventListener('canplay', () => {
      video.muted = true;
      if (autoplay) video.play();
    });
  }
  const sourceEl = document.createElement('source');
  sourceEl.src = source;
  sourceEl.type = `video/${source.split('?')[0].split('.').pop()}`;
  video.append(sourceEl);
  return video;
}

function loadVideoEmbed(block, link, autoplay, background) {
  if (block.dataset.embedLoaded === 'true') return;
  const url = new URL(link);
  const isYoutube = link.includes('youtube') || link.includes('youtu.be');
  const isVimeo = link.includes('vimeo');
  if (isYoutube || isVimeo) {
    const frame = isYoutube
      ? embedYoutube(url, autoplay, background)
      : embedVimeo(url, autoplay, background);
    block.append(frame);
    frame.querySelector('iframe').addEventListener('load', () => {
      block.dataset.embedLoaded = true;
    });
  } else {
    const videoEl = getVideoElement(link, autoplay, background);
    block.append(videoEl);
    videoEl.addEventListener('canplay', () => {
      block.dataset.embedLoaded = true;
    });
  }
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const placeholder = block.querySelector('picture');
  const link = block.querySelector('a')?.href;
  block.textContent = '';
  block.dataset.embedLoaded = false;
  if (!link) return;

  const autoplay = block.classList.contains('autoplay');
  if (placeholder) {
    block.classList.add('placeholder');
    const wrapper = document.createElement('div');
    wrapper.className = 'video-placeholder';
    wrapper.append(placeholder);

    if (!autoplay) {
      const play = document.createElement('button');
      play.type = 'button';
      play.className = 'video-placeholder-play';
      play.setAttribute('aria-label', 'Play video');
      decorateButton(play, { view: 'icon', type: 'primary', icon: 'play' });
      play.addEventListener('click', () => {
        wrapper.remove();
        loadVideoEmbed(block, link, true, false);
      });
      wrapper.append(play);
    }
    block.append(wrapper);
  }

  if (!placeholder || autoplay) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        const playOnLoad = autoplay && !prefersReducedMotion.matches;
        loadVideoEmbed(block, link, playOnLoad, autoplay);
      }
    });
    observer.observe(block);
  }
}
