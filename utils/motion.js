/**
 * Motion utils: the block animations authors choose in the Additional tab, read from the block's
 * classes. Content animation (classes_animation) moves the block's foreground in; background
 * animation (classes_bganimation) reveals its authored background (colour, image, overlay).
 * Both are independent; unknown values are ignored, so no class is made from them.
 */

/** Content animation: the block class motion-{effect} */
export const CONTENT_MOTIONS = [
  'fade-in', 'fade-up', 'fade-down', 'fade-left', 'fade-right',
  'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale-in',
];

/** Background animation: the block class bg-motion-{effect} */
export const BACKGROUND_MOTIONS = ['fade-in', 'reveal', 'wipe-right', 'wipe-left', 'wipe-up', 'scale'];

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
