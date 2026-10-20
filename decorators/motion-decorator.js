/**
 * Motion decorator: the Content animation and Background animation of blocks (Additional tab,
 * utils/motion.js), run when a block comes into view. One IntersectionObserver for the page.
 *
 * Life of an animated block:
 * 1. prepareMotion(section), once its blocks are decorated and before it is shown: the block's
 *    targets get their first frame (styles/motion.css: a paused CSS animation), so nothing flashes
 * 2. Animation Trigger On Scroll (default): when enough of the block is in view (also when it is
 *    in view from the start), the animations run (content and background independently);
 *    On Page Load: they run as soon as the block's content is ready. Motion Speed sets their
 *    duration through CSS variables (styles/motion.css), never through timers
 * 3. when they have ended, every class and inline style the animation added is removed: the
 *    block is exactly as without animation
 * A block whose content is still loading (a skeleton, decorators/skeleton-decorator.js) runs its
 * background animation; its content animation waits for releaseMotion(block).
 * In Universal Editor edit mode nothing plays (styles/motion.css applies no first frame there, so
 * content shows as is) and nothing is used up: when the editor switches to Preview, the blocks
 * that haven't played yet play (On Scroll as they come into view, On Page Load at once).
 * Nothing is prepared for reduced motion or without IntersectionObserver, and the CSS doesn't
 * apply the first frame then either, so content is never left hidden.
 */
import { loadCSS } from '../scripts/aem.js';
import {
  backgroundMotionOf, contentMotionOf, isHorizontal, isSeen, isVisibleColor, staggerIndex,
  triggerOf,
} from '../utils/motion.js';
import { isEditing, prefersReducedMotion } from '../utils/environment.js';

/** the foreground that moves (else the block itself); repeated items start one after another */
const CONTENT_TARGETS = {
  hero: { targets: ':scope > .hero-content' },
  'conversation-canvas': { targets: ':scope > .conversation-canvas-content' },
  list: { targets: ':scope > :is(.list-header, .list-feature, .list-empty), .list-item', stagger: true },
  cards: { targets: ':scope > :is(.list-header, .list-feature, .list-empty), .list-item', stagger: true },
  'table-list': { targets: '.table-list-item', stagger: true },
  accordion: { targets: ':scope > .accordion-item', stagger: true },
  columns: { targets: ':scope > div > div', stagger: true },
  'columns-container': { targets: ':scope > .columns-container-column', stagger: true },
  // blocks with a background animation: their children, the background layers left out
  teaser: { targets: ':scope > *' },
  quote: { targets: ':scope > *' },
  testimonial: { targets: ':scope > *' },
  'form-variations': { targets: ':scope > *' },
};

/**
 * Blocks with an authored background: its layers. The background colour (the block's computed
 * background-color) is painted by the block's ::after while it animates; `overlay` the block's
 * ::before (an image overlay or the Canvas's brand glows); `layers` the image / animation
 * elements behind the content.
 */
const BACKGROUNDS = {
  hero: { layers: ':scope > .hero-media', overlay: true },
  teaser: { layers: ':scope > .teaser-media', when: '.background, .card', overlay: true },
  'conversation-canvas': { layers: ':scope > .conversation-canvas-background', overlay: true },
  quote: {},
  testimonial: {},
  'form-variations': {},
};

/** never content targets: background layers and the Lottie pause / play button */
const NOT_CONTENT = '.bg-motion-target, .animation-toggle';

/** longest time an animation may take before its classes are removed anyway */
const SAFETY_MS = 4000;

const states = new WeakMap();
/** blocks prepared whose animations haven't all played yet */
const armed = new Set();
let observer;
let css;
let modes;

const canAnimate = () => 'IntersectionObserver' in window && !prefersReducedMotion();
const nameOf = (block) => block.dataset.blockName || block.classList[0];
const nextFrame = (callback) => requestAnimationFrame(() => requestAnimationFrame(callback));

/**
 * Calls back when the animations of `count` targets have ended (or after SAFETY_MS); animations
 * of nested blocks, which bubble up, aren't counted.
 */
function whenEnded(element, prefix, count, isOwn, callback) {
  let left = count;
  const listening = new AbortController();
  const finish = () => {
    if (listening.signal.aborted) return;
    listening.abort();
    callback();
  };
  element.addEventListener('animationend', (e) => {
    if (!e.animationName.startsWith(prefix) || !isOwn(e.target)) return;
    left -= 1;
    if (left <= 0) finish();
  }, { signal: listening.signal });
  setTimeout(finish, SAFETY_MS);
}

function contentTargets(block) {
  const config = CONTENT_TARGETS[nameOf(block)];
  if (!config) return [block];
  const targets = [...block.querySelectorAll(config.targets)]
    .filter((el) => !el.matches(NOT_CONTENT));
  return targets.length ? targets : [block];
}

/** the first frame of the content animation */
function prepareContent(state) {
  const { block } = state;
  state.targets = contentTargets(block);
  const stagger = CONTENT_TARGETS[nameOf(block)]?.stagger;
  // sideways motion (its first frame too) would make the page scroll sideways
  if (isHorizontal(state.content)) block.parentElement?.classList.add('motion-clip');
  state.targets.forEach((target, i) => {
    target.classList.add('motion-target');
    if (stagger) target.style.setProperty('--motion-index', staggerIndex(i));
  });
}

function finishContent(state) {
  const { block, targets } = state;
  block.parentElement?.classList.remove('motion-clip');
  targets.forEach((target) => {
    target.classList.remove('motion-target', 'motion-running');
    target.style.removeProperty('--motion-index');
    if (!target.getAttribute('style')) target.removeAttribute('style');
  });
  state.contentDone = true;
}

function runContent(state) {
  if (state.contentRun || !state.targets) return;
  state.contentRun = true;
  const { block, targets } = state;
  targets.forEach((target) => target.classList.add('motion-running'));
  whenEnded(block, 'motion-', targets.length, (el) => targets.includes(el), () => finishContent(state));
}

/** the first frame of the background animation: false when the block has no background */
function prepareBackground(state) {
  const { block } = state;
  const config = BACKGROUNDS[nameOf(block)];
  if (!config) return false;
  const style = getComputedStyle(block);
  // `when`: the block's variations whose layers are background (else they are content)
  const layered = !config.when || block.matches(config.when);
  const layers = config.layers && layered ? [...block.querySelectorAll(config.layers)] : [];
  const color = isVisibleColor(style.backgroundColor) ? style.backgroundColor : '';
  const overlay = config.overlay && layered && getComputedStyle(block, '::before').content !== 'none';
  const count = layers.length + (color ? 1 : 0) + (overlay ? 1 : 0);
  if (!count) return false;

  state.inline = { position: block.style.position, isolation: block.style.isolation };
  if (style.position === 'static') block.style.position = 'relative';
  block.style.isolation = 'isolate';
  if (color) {
    // the authored colour, painted by ::after so it can animate apart from the content
    block.style.setProperty('--bg-motion-color', color);
    block.style.backgroundColor = 'transparent';
    block.classList.add('bg-motion-color');
  }
  if (overlay) block.classList.add('bg-motion-overlay');
  layers.forEach((layer) => layer.classList.add('bg-motion-target'));
  state.layers = layers;
  state.backgroundCount = count;
  block.classList.add('bg-motion-ready');
  return true;
}

function finishBackground(state) {
  const { block, layers, inline } = state;
  block.classList.remove('bg-motion-ready', 'bg-motion-run', 'bg-motion-color', 'bg-motion-overlay');
  layers.forEach((layer) => layer.classList.remove('bg-motion-target', 'bg-motion-running'));
  block.style.removeProperty('--bg-motion-color');
  block.style.removeProperty('background-color');
  block.style.position = inline.position;
  block.style.isolation = inline.isolation;
  if (!block.getAttribute('style')) block.removeAttribute('style');
}

function runBackground(state) {
  if (state.backgroundRun) return;
  state.backgroundRun = true;
  state.block.classList.add('bg-motion-run');
  state.layers.forEach((layer) => layer.classList.add('bg-motion-running'));
  const own = (el) => el === state.block || state.layers.includes(el);
  whenEnded(state.block, 'bg-motion-', state.backgroundCount, own, () => finishBackground(state));
}

/** every animation of the block has started */
const played = (state) => (!state.content || state.contentRun)
  && (!state.background || state.backgroundRun);

function run(state) {
  nextFrame(() => {
    // in Universal Editor edit mode the block stays armed for Preview mode
    if (isEditing()) return;
    try {
      if (state.background) runBackground(state);
      if (state.content && state.contentReady) runContent(state);
      if (played(state)) armed.delete(state);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('motion', e);
      if (state.targets) finishContent(state);
      if (state.background) finishBackground(state);
      armed.delete(state);
    }
  });
}

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // enough of the block in view to see the animation (not just its first pixels)
        if (!entry.isIntersecting || !isSeen(entry, window.innerHeight)) return;
        // edit mode: keep observing, so the block plays in Preview mode
        if (isEditing()) return;
        observer.unobserve(entry.target);
        const state = states.get(entry.target);
        if (!state) return;
        state.visible = true;
        run(state);
      });
    }, { threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25] });
  }
  return observer;
}

/**
 * Universal Editor switched from edit to Preview mode: the armed blocks play, On Page Load ones
 * (and those already seen) now, On Scroll ones when in view (observing again reports the blocks
 * in view at once).
 */
function playArmed() {
  armed.forEach((state) => {
    // blocks the editor re-rendered since are gone
    if (!state.block.isConnected) {
      armed.delete(state);
      return;
    }
    if (state.visible) {
      run(state);
    } else {
      getObserver().unobserve(state.block);
      getObserver().observe(state.block);
    }
  });
}

/** follows the Universal Editor mode (the adobe-ue-edit class of <html>) */
function watchEditorMode() {
  if (modes) return;
  let editing = isEditing();
  modes = new MutationObserver(() => {
    const now = isEditing();
    if (editing && !now) playArmed();
    editing = now;
  });
  modes.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

function prepareBlock(block) {
  if (states.has(block)) return;
  const content = contentMotionOf(block.classList);
  const background = BACKGROUNDS[nameOf(block)] ? backgroundMotionOf(block.classList) : '';
  if (!content && !background) return;
  const state = {
    block, content, background: '', contentReady: block.getAttribute('aria-busy') !== 'true',
  };
  states.set(block, state);
  try {
    if (background && prepareBackground(state)) state.background = background;
    if (content && state.contentReady) prepareContent(state);
    if (!state.background && !state.content) return;
    armed.add(state);
    watchEditorMode();
    if (triggerOf(block.classList) === 'load') {
      // On Page Load: now (the content animation of a loading block when its content is there)
      state.visible = true;
      run(state);
    } else {
      getObserver().observe(block);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('motion', e);
    if (state.targets) finishContent(state);
    if (state.layers) finishBackground(state);
    armed.delete(state);
  }
}

/**
 * Prepares the animations of the blocks in a container (a section, a fragment) whose blocks are
 * decorated, before it is shown. Blocks already prepared are skipped.
 * @param {Element} container
 */
export async function prepareMotion(container) {
  if (!container || !canAnimate()) return;
  const blocks = [...container.querySelectorAll('.block')]
    .filter((block) => contentMotionOf(block.classList) || backgroundMotionOf(block.classList));
  if (!blocks.length) return;
  try {
    css = css || loadCSS(`${window.hlx.codeBasePath}/styles/motion.css`);
    await css;
    blocks.forEach(prepareBlock);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('motion', e);
  }
}

/**
 * The content of a block that was loading (its skeleton is gone) is there: its content animation
 * can run, now if the block is already in view.
 * @param {Element} block
 */
export function releaseMotion(block) {
  const state = states.get(block);
  if (!state || state.contentReady) return;
  state.contentReady = true;
  if (!state.content) return;
  try {
    prepareContent(state);
    if (state.visible) run(state);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('motion', e);
    if (state.targets) finishContent(state);
  }
}
