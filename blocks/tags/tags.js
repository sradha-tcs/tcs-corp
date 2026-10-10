import { moveInstrumentation } from '../../scripts/scripts.js';

const VARIANTS = ['filter', 'card', 'industry'];

/**
 * Checks whether a link points at the page currently being viewed.
 * @param {string} href The link target
 * @returns {boolean}
 */
function isCurrentPage(href) {
  try {
    const url = new URL(href, window.location.href);
    const trim = (path) => path.replace(/\/$/, '');
    return url.origin === window.location.origin
      && trim(url.pathname) === trim(window.location.pathname);
  } catch {
    return false;
  }
}

/**
 * Builds a tag from an authored list item or paragraph.
 * @param {Element} source The authored element
 * @param {string} [variant] The block variant
 * @returns {Element}
 */
function buildTag(source, variant) {
  const link = source.querySelector('a[href]');
  const tag = document.createElement(link ? 'a' : 'span');
  tag.className = variant ? `tag tag-${variant}` : 'tag';
  tag.textContent = source.textContent.trim();
  if (link) {
    tag.href = link.href;
    if (variant === 'filter' && isCurrentPage(link.href)) tag.setAttribute('aria-current', 'page');
  }
  return tag;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const variant = VARIANTS.find((v) => block.classList.contains(v));
  const cell = block.querySelector(':scope > div > div');
  const list = block.querySelector('ul, ol');

  // a list holds the tags and any paragraphs above it are a label;
  // without a list, each paragraph (or the plain cell text) is a tag
  let sources;
  let labels = [];
  if (list) {
    sources = [...list.children];
    labels = [...block.querySelectorAll('p')].filter((p) => !list.contains(p));
  } else {
    sources = [...block.querySelectorAll('p')];
    if (!sources.length && cell) sources = [cell];
  }

  const ul = document.createElement('ul');
  ul.className = 'tags-list';
  if (cell) moveInstrumentation(cell, ul);
  sources
    .filter((source) => source.textContent.trim())
    .forEach((source) => {
      const li = document.createElement('li');
      li.append(buildTag(source, variant));
      ul.append(li);
    });

  const label = labels.map((p) => p.textContent.trim()).filter(Boolean).join(' ');
  if (label) {
    const labelEl = document.createElement('p');
    labelEl.className = 'tags-label';
    labelEl.textContent = label;
    ul.setAttribute('aria-label', label);
    block.replaceChildren(labelEl, ul);
  } else {
    block.replaceChildren(ul);
  }
}
