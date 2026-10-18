/**
 * Skeleton decorator: placeholders shaped like a block while the data it is built from (the query
 * index, sheets) is still loading. Styles in styles/styles.css (.skeleton).
 *
 * A section is shown once all its blocks are decorated, and the sections load one after another:
 * a block waiting for its data would hold back its section and the ones below it. With
 * renderWhenLoaded, data that is there at once renders the block directly (no skeleton), else the
 * block shows its skeleton, so its section is shown, and fills in when the data is there. The
 * skeleton is removed on success and on failure; the block's Content animation then runs
 * (decorators/motion-decorator.js).
 */
import { trackBlocks } from './data-layer-decorator.js';
import { releaseMotion } from './motion-decorator.js';

/** data within this time renders the block directly, without a skeleton */
export const SKELETON_DELAY_MS = 150;

/** once shown, a skeleton stays at least this long, so it doesn't flash */
export const SKELETON_MIN_MS = 250;

const wait = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

/** whether a promise settles (resolves or rejects) within `ms` */
async function settlesWithin(promise, ms) {
  return Promise.race([promise.then(() => true, () => true), wait(ms).then(() => false)]);
}

/**
 * A skeleton element (decorative: hidden from assistive technology, nothing focusable).
 * @param {string} [className] the block's own class, e.g. list-items, for its layout
 * @param {string} [tagName]
 * @returns {HTMLElement}
 */
export function skeletonElement(className = '', tagName = 'div') {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  return el;
}

/**
 * A placeholder shape.
 * @param {'line'|'title'|'media'|'pill'} kind
 * @param {string} [extra] more classes: short (60% wide), the block's own class (its size)
 * @returns {HTMLElement}
 */
export function bone(kind, extra = '') {
  return skeletonElement(`skeleton-bone skeleton-${kind}${extra ? ` ${extra}` : ''}`, 'span');
}

/**
 * Shows a skeleton in a block or a part of it (what it holds is hidden meanwhile) and marks it
 * busy.
 * @param {Element} block the block, or the element of a block that fills in later
 * @param {Element} skeleton
 * @returns {() => void} removes the skeleton (idempotent)
 */
export function showSkeleton(block, skeleton) {
  skeleton.classList.add('skeleton');
  skeleton.setAttribute('aria-hidden', 'true');
  block.classList.add('skeleton-loading');
  block.setAttribute('aria-busy', 'true');
  // the data layer tracks the block when it is rendered, not its skeleton
  const isBlock = block.classList.contains('block');
  if (isBlock && !block.dataset.analytics) block.dataset.analytics = 'pending';
  block.append(skeleton);
  let removed = false;
  return () => {
    if (removed) return;
    removed = true;
    skeleton.remove();
    block.classList.remove('skeleton-loading');
    block.removeAttribute('aria-busy');
    if (isBlock && block.dataset.analytics === 'pending') {
      delete block.dataset.analytics;
      if (block.parentElement) trackBlocks(block.parentElement);
    }
    releaseMotion(block);
  };
}

/**
 * A skeleton in a part of a block that already fills in by itself, without holding the block
 * back (e.g. a menu from the query index): shown only if the work takes longer than
 * SKELETON_DELAY_MS, removed when it settles (successfully or not).
 * @param {Element} container
 * @param {Promise} work settles once the container is filled
 * @param {() => Element} skeleton builds the skeleton (only when needed)
 */
export function skeletonWhile(container, work, skeleton) {
  let remove = null;
  const timer = setTimeout(() => {
    try {
      remove = showSkeleton(container, skeleton());
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('skeleton', e);
    }
  }, SKELETON_DELAY_MS);
  const done = () => {
    clearTimeout(timer);
    remove?.();
  };
  work.then(done, done);
}

/**
 * Renders a block from its data: directly when the data is there within SKELETON_DELAY_MS, else
 * after a skeleton (the returned promise then resolves when the skeleton is shown, so the block's
 * section can be shown). Errors of a deferred render are logged and the skeleton is removed, as
 * a failing decorate is logged by aem.js.
 * @param {Element} block
 * @param {Object} options
 * @param {Promise} options.data the block's data, already requested
 * @param {(data: *) => (Promise|void)} options.render renders the block from the data
 * @param {() => Element} options.skeleton builds the block's skeleton (only when needed)
 * @returns {Promise<void>}
 */
export async function renderWhenLoaded(block, { data, render, skeleton }) {
  if (await settlesWithin(data, SKELETON_DELAY_MS)) {
    await render(await data);
    return;
  }
  let remove = () => {};
  try {
    remove = showSkeleton(block, skeleton());
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('skeleton', e);
  }
  const shown = performance.now();
  data
    .then(async (value) => {
      const left = SKELETON_MIN_MS - (performance.now() - shown);
      if (left > 0) await wait(left);
      await render(value);
      remove();
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(`failed to render ${block.dataset.blockName || 'block'}`, e);
    })
    .finally(remove);
}
