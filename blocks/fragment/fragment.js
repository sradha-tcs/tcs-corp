/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */

// eslint-disable-next-line import/no-cycle
import {
  decorateMain,
} from '../../scripts/scripts.js';

import {
  loadSections,
} from '../../scripts/aem.js';
import { prepareMotion } from '../../decorators/motion-decorator.js';
import { isEditing } from '../../utils/environment.js';
import { getPlaceholders } from '../../utils/placeholders.js';

/** the fragment pages an element is inside (the chain of fragments that include it) */
const chainOf = (el) => (el?.closest?.('main[data-fragment-chain]')?.dataset.fragmentChain || '')
  .split(' ').filter(Boolean);

/** fetches and decorates a fragment page (path without .html) */
async function fetchFragment(path, chain) {
  const resp = await fetch(`${path}.plain.html`);
  if (!resp.ok) return null;
  const main = document.createElement('main');
  main.dataset.fragmentChain = chain.join(' ');
  main.innerHTML = await resp.text();

  // reset base path for media to fragment base
  const resetAttributeBase = (tag, attr) => {
    main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
      elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location)).href;
    });
  };
  resetAttributeBase('img', 'src');
  resetAttributeBase('source', 'srcset');

  decorateMain(main);
  await loadSections(main);
  return main;
}

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @param {Element} [from] the element that includes it: a fragment that includes itself (through
 *   the fragments around it) or the page it is on isn't loaded again; the same fragment twice
 *   side by side is fine
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadFragment(path, from = null) {
  if (path && path.startsWith('/') && !path.startsWith('//')) {
    // eslint-disable-next-line no-param-reassign
    path = path.replace(/(\.plain)?\.html/, '');
    const page = window.location.pathname.replace(/\.html$/, '');
    const chain = chainOf(from);
    if (path === page || chain.includes(path)) return null;
    return fetchFragment(path, [...chain, path]);
  }
  return null;
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const fragment = await loadFragment(path, block);
  if (fragment) {
    block.replaceChildren(...fragment.childNodes);
    // the block animations of the fragment, once it is in the page (decorators/motion-decorator.js)
    await prepareMotion(block);
  } else if (isEditing()) {
    // Universal Editor: a Fragment without a page (or one that can't load) says what to do
    const t = await getPlaceholders();
    const hint = document.createElement('p');
    hint.className = 'fragment-empty';
    hint.textContent = t('fragmentEmpty', 'Fragment: choose the page whose content it shows.');
    block.replaceChildren(hint);
  }
}
