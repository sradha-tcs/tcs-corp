/*
 * Embed Block (Block Collection): videos and social posts from a URL.
 * https://www.aem.live/developer/block-collection/embed
 * Adapted: players are built with DOM APIs (no authored URL in HTML strings) and the play
 * button uses the shared button decorator.
 */
import { loadScript } from '../../scripts/aem.js';
import { decorateButton } from '../../decorators/button-decorator.js';

/** a responsive 16:9 iframe */
function createFrame(src, title, allow = 'encrypted-media') {
  const wrapper = document.createElement('div');
  wrapper.className = 'embed-frame';
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = title;
  iframe.loading = 'lazy';
  iframe.allow = allow;
  iframe.allowFullscreen = true;
  wrapper.append(iframe);
  return wrapper;
}

const embedYoutube = (url, autoplay) => {
  const usp = new URLSearchParams(url.search);
  let vid = usp.get('v') || '';
  if (url.hostname.includes('youtu.be')) [, vid] = url.pathname.split('/');
  const src = new URL(vid ? `https://www.youtube.com/embed/${encodeURIComponent(vid)}` : `https://www.youtube.com${url.pathname}`);
  src.searchParams.set('rel', '0');
  if (autoplay) {
    src.searchParams.set('muted', '1');
    src.searchParams.set('autoplay', '1');
  }
  return createFrame(src.href, 'Content from YouTube', 'autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope');
};

const embedVimeo = (url, autoplay) => {
  const [, video] = url.pathname.split('/');
  const src = new URL(`https://player.vimeo.com/video/${encodeURIComponent(video)}`);
  if (autoplay) {
    src.searchParams.set('muted', '1');
    src.searchParams.set('autoplay', '1');
  }
  return createFrame(src.href, 'Content from Vimeo', 'autoplay; fullscreen; picture-in-picture');
};

const embedTwitter = (url) => {
  const href = url.href.replace('https://x.com', 'https://twitter.com');
  const quote = document.createElement('blockquote');
  quote.className = 'twitter-tweet';
  const a = document.createElement('a');
  a.href = href;
  quote.append(a);
  loadScript('https://platform.twitter.com/widgets.js');
  return quote;
};

const EMBEDS = [
  { match: ['youtube', 'youtu.be'], embed: embedYoutube },
  { match: ['vimeo'], embed: embedVimeo },
  { match: ['twitter', 'x.com'], embed: embedTwitter },
];

function loadEmbed(block, link, autoplay) {
  if (block.classList.contains('embed-is-loaded')) return;
  const url = new URL(link);
  const config = EMBEDS.find((e) => e.match.some((match) => link.includes(match)));
  const content = config
    ? config.embed(url, autoplay)
    : createFrame(url.href, `Content from ${url.hostname}`);
  block.replaceChildren(content);
  if (config) block.classList.add(`embed-${config.match[0].replace('.', '')}`);
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
    const play = document.createElement('button');
    play.type = 'button';
    play.className = 'embed-placeholder-play';
    play.setAttribute('aria-label', 'Play');
    decorateButton(play, { view: 'icon', type: 'primary', icon: 'play' });
    play.addEventListener('click', () => loadEmbed(block, link, true));
    wrapper.append(placeholder, play);
    block.append(wrapper);
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadEmbed(block, link);
      }
    });
    observer.observe(block);
  }
}
