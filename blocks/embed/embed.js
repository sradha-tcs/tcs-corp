/*
 * Embed Block (Block Collection): videos and social posts from a URL.
 * https://www.aem.live/developer/block-collection/embed
 * Adapted: players come from the media decorator (DOM-built, no authored URL in HTML strings)
 * and the play button from the button decorator.
 */
import { loadScript } from '../../scripts/aem.js';
import { createIconButton } from '../../decorators/icon-button-decorator.js';
import {
  createFrame, createVimeoFrame, createYoutubeFrame,
} from '../../decorators/media-decorator.js';
import { isVimeo, isYoutube } from '../../utils/media.js';
import { onVisible } from '../../utils/viewport.js';

const FRAME_CLASS = 'embed-frame';
const AUTOPLAY = { muted: '1', autoplay: '1' };

function embedTwitter(url) {
  const quote = document.createElement('blockquote');
  quote.className = 'twitter-tweet';
  const a = document.createElement('a');
  a.href = url.href.replace('https://x.com', 'https://twitter.com');
  quote.append(a);
  loadScript('https://platform.twitter.com/widgets.js');
  return quote;
}

const EMBEDS = [
  {
    name: 'youtube',
    match: isYoutube,
    embed: (url, autoplay) => createYoutubeFrame(url, autoplay ? AUTOPLAY : {}, FRAME_CLASS),
  },
  {
    name: 'vimeo',
    match: isVimeo,
    embed: (url, autoplay) => createVimeoFrame(url, autoplay ? AUTOPLAY : {}, FRAME_CLASS),
  },
  {
    name: 'twitter',
    match: (link) => /twitter\.com|x\.com/.test(link),
    embed: embedTwitter,
  },
];

function loadEmbed(block, link, autoplay) {
  if (block.classList.contains('embed-is-loaded')) return;
  const url = new URL(link);
  const config = EMBEDS.find((e) => e.match(link));
  const content = config
    ? config.embed(url, autoplay)
    : createFrame({ src: url.href, title: `Content from ${url.hostname}`, className: FRAME_CLASS });
  block.replaceChildren(content);
  if (config) block.classList.add(`embed-${config.name}`);
  block.classList.add('embed-is-loaded');
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const placeholder = block.querySelector('picture');
  const link = block.querySelector('a')?.href;
  block.textContent = '';
  if (!link) return;

  if (placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-placeholder';
    const play = createIconButton({
      label: 'Play',
      icon: 'play',
      type: 'primary',
      className: 'embed-placeholder-play',
      onClick: () => loadEmbed(block, link, true),
    });
    wrapper.append(placeholder, play);
    block.append(wrapper);
  } else {
    onVisible(block, () => loadEmbed(block, link));
  }
}
