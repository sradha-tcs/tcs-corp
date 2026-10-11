/*
 * Video Block (Block Collection): a video from a link (YouTube, Vimeo or a video file).
 * https://www.aem.live/developer/block-collection/video
 * Adapted: players come from the media decorator and the play button from the button
 * decorator.
 */
import { createIconButton } from '../../decorators/icon-button-decorator.js';
import {
  createVideoElement, createVimeoFrame, createYoutubeFrame,
} from '../../decorators/media-decorator.js';
import { prefersReducedMotion } from '../../utils/environment.js';
import { isVimeo, isYoutube } from '../../utils/media.js';
import { onVisible } from '../../utils/viewport.js';

const FRAME_CLASS = 'video-frame';

function youtubeParams(autoplay, background) {
  if (!background && !autoplay) return {};
  return {
    autoplay: autoplay ? '1' : '0',
    mute: background ? '1' : '0',
    controls: background ? '0' : '1',
    disablekb: background ? '1' : '0',
    loop: background ? '1' : '0',
    playsinline: background ? '1' : '0',
  };
}

function vimeoParams(autoplay, background) {
  if (!background && !autoplay) return {};
  return { autoplay: autoplay ? '1' : '0', background: background ? '1' : '0' };
}

function loadVideoEmbed(block, link, autoplay, background) {
  if (block.dataset.embedLoaded === 'true') return;
  const url = new URL(link);
  const markLoaded = () => { block.dataset.embedLoaded = true; };
  if (isYoutube(link) || isVimeo(link)) {
    const frame = isYoutube(link)
      ? createYoutubeFrame(url, youtubeParams(autoplay, background), FRAME_CLASS)
      : createVimeoFrame(url, vimeoParams(autoplay, background), FRAME_CLASS);
    block.append(frame);
    frame.querySelector('iframe').addEventListener('load', markLoaded);
  } else {
    const video = createVideoElement(link, { autoplay, background });
    block.append(video);
    video.addEventListener('canplay', markLoaded);
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
      wrapper.append(createIconButton({
        label: 'Play video',
        icon: 'play',
        type: 'primary',
        className: 'video-placeholder-play',
        onClick: () => {
          wrapper.remove();
          loadVideoEmbed(block, link, true, false);
        },
      }));
    }
    block.append(wrapper);
  }

  if (!placeholder || autoplay) {
    onVisible(block, () => {
      const playOnLoad = autoplay && !prefersReducedMotion();
      loadVideoEmbed(block, link, playOnLoad, autoplay);
    });
  }
}
