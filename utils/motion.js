/**
 * Motion utils: the block animations authors choose in the Additional tab, read from the block's
 * classes. Animation Type (classes_animation, the content animation) moves the block's foreground
 * in; Background animation (classes_bganimation) reveals its authored background (colour, image,
 * overlay). Both are independent. Motion Speed (classes_animationspeed) sets how fast and
 * Animation Trigger (classes_animationtrigger) when the block's animations run. Unknown values are
 * ignored, so no class is made from them.
 */

/** Content animation: the block class motion-{effect} */
export const CONTENT_MOTIONS = [
  'fade-in', 'fade-up', 'fade-down', 'fade-left', 'fade-right',
  'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale-in',
];

/** Background animation: the block class bg-motion-{effect} */
export const BACKGROUND_MOTIONS = ['fade-in', 'reveal', 'wipe-right', 'wipe-left', 'wipe-up', 'scale'];

/**
 * Motion Speed: the block class motion-fast / motion-slow (Medium: no class), the duration of the
 * content animation in ms (styles/motion.css --motion-duration; the background animation and the
 * stagger scale with it)
 */
export const MOTION_SPEEDS = { fast: 500, medium: 1000, slow: 2000 };

/** Animation Trigger: the block class motion-on-load (On Scroll / Viewport Entry: no class) */
export const MOTION_TRIGGERS = ['scroll', 'load'];

/**
 * The Motion Speed of a block.
 * @param {{ contains: (name: string) => boolean }} classList the block's classes
 * @returns {'fast'|'medium'|'slow'}
 */
export function speedOf(classList) {
  if (classList.contains('motion-fast')) return 'fast';
  if (classList.contains('motion-slow')) return 'slow';
  return 'medium';
}

/**
 * The Animation Trigger of a block: 'load' (as soon as its content is ready) or 'scroll' (when it
 * comes into view, also when it is in view from the start).
 * @param {{ contains: (name: string) => boolean }} classList the block's classes
 * @returns {'scroll'|'load'}
 */
export function triggerOf(classList) {
  return classList.contains('motion-on-load') ? 'load' : 'scroll';
}

/**
 * Enough of an element is in view to see its animation: a fifth of it, or a quarter of the
 * viewport height for elements taller than the viewport.
 * @param {{ intersectionRatio: number, intersectionRect: { height: number } }} entry
 * @param {number} viewportHeight
 * @returns {boolean}
 */
export function isSeen(entry, viewportHeight) {
  return entry.intersectionRatio >= 0.2 || entry.intersectionRect.height >= viewportHeight * 0.25;
}

/** repeated items start one after another; items after this one start together with it */
export const STAGGER_MAX = 5;

/**
 * The content animation of a block.
 * @param {{ contains: (name: string) => boolean }} classList the block's classes
 * @returns {string} one of CONTENT_MOTIONS, or ''
 */
export function contentMotionOf(classList) {
  return CONTENT_MOTIONS.find((motion) => classList.contains(`motion-${motion}`)) || '';
}

/**
 * The background animation of a block.
 * @param {{ contains: (name: string) => boolean }} classList the block's classes
 * @returns {string} one of BACKGROUND_MOTIONS, or ''
 */
export function backgroundMotionOf(classList) {
  return BACKGROUND_MOTIONS.find((motion) => classList.contains(`bg-motion-${motion}`)) || '';
}

/** the motion moves sideways (the block's wrapper clips it, so the page doesn't scroll sideways) */
/**
 * Maps a motion value authored before Animation Type existed onto the canonical classes, unless
 * the block has an Animation Type (content) / Background animation of its own; without a Motion
 * Speed it plays slow (the former motions took about 800ms).
 * @param {DOMTokenList} classList the block's classes
 * @param {string} motion the canonical class, e.g. motion-fade-in or bg-motion-scale
 * @returns {boolean} whether it was added
 */
export function addLegacyMotion(classList, motion) {
  const background = motion.startsWith('bg-');
  const own = background ? backgroundMotionOf(classList) : contentMotionOf(classList);
  if (!motion || own) return false;
  classList.add(motion);
  if (!classList.contains('motion-fast') && !classList.contains('motion-slow')) classList.add('motion-slow');
  return true;
}

export const isHorizontal = (motion) => /-(left|right)$/.test(motion);

/**
 * The start order of a repeated item: its index, at most STAGGER_MAX.
 * @param {number} index
 * @returns {number}
 */
export function staggerIndex(index) {
  return Math.max(0, Math.min(Number(index) || 0, STAGGER_MAX));
}

/**
 * A computed background colour that paints something (not transparent).
 * @param {string} color a computed colour, e.g. rgb(0 0 0 / 0%) or rgba(12, 12, 13, 0.8)
 * @returns {boolean}
 */
export function isVisibleColor(color) {
  const value = String(color || '').trim().toLowerCase();
  if (!value || value === 'transparent') return false;
  // the numbers of rgb() / rgba() / color(); a fourth one is the alpha
  const numbers = (value.match(/\(([^)]*)\)/)?.[1] || '').split(/[\s,/]+/)
    .filter((part) => /^[\d.]+%?$/.test(part));
  return numbers.length < 4 || parseFloat(numbers[3]) > 0;
}
