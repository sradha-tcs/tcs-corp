/**
 * Animation decorator: plays Lottie animations (the "Lotto" image type of hero, teaser, ...)
 * the same way in every block. The player (utils/lottie.js) loads when the animation comes
 * near the viewport and the browser is idle; the animation pauses off screen and shows its
 * first frame for reduced motion.
 */
import { prefersReducedMotion } from '../utils/environment.js';
import { loadLottie } from '../utils/lottie.js';
import { onVisible, watchVisibility } from '../utils/viewport.js';

/**
 * Plays a Lottie animation in a container, after the page has rendered.
 * @param {Element} container
 * @param {string} path the animation file (.json)
 * @param {string} [fit] preserveAspectRatio: xMidYMid meet (contain) or slice (cover)
 */
export function playAnimation(container, path, fit = 'xMidYMid meet') {
  const start = async () => {
    const lottie = await loadLottie();
    const still = prefersReducedMotion();
    const animation = lottie.loadAnimation({
      container,
      path,
      renderer: 'svg',
      loop: true,
      autoplay: !still,
      rendererSettings: { preserveAspectRatio: fit },
    });
    if (still) {
      animation.addEventListener('DOMLoaded', () => animation.goToAndStop(0, true));
      return;
    }
    watchVisibility(container, (visible) => {
      if (visible) animation.play();
      else animation.pause();
    });
  };

  onVisible(container, () => {
    const idle = window.requestIdleCallback || ((callback) => setTimeout(callback, 200));
    idle(() => start().catch((error) => {
      // eslint-disable-next-line no-console
      console.error('failed to play the Lottie animation', error);
    }));
  }, { rootMargin: '200px' });
}

/**
 * An element playing a Lottie animation: an image named by the label, or decorative.
 * @param {string} path the animation file (.json)
 * @param {{ label?: string, className?: string, fit?: string }} [options]
 * @returns {HTMLDivElement}
 */
export function createAnimation(path, { label = '', className = '', fit } = {}) {
  const animation = document.createElement('div');
  animation.className = className;
  if (label) {
    animation.setAttribute('role', 'img');
    animation.setAttribute('aria-label', label);
  } else {
    animation.setAttribute('aria-hidden', 'true');
  }
  playAnimation(animation, path, fit);
  return animation;
}
