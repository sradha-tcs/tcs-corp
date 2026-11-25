/**
 * Accessibility decorator: shared helpers for content that must stay available to assistive
 * technology. The .visually-hidden class is defined once in styles/styles.css.
 */

/**
 * Hides an element visually while keeping it for screen readers.
 * @param {Element} el
 * @returns {Element} the same element
 */
export function hideVisually(el) {
  el?.classList.add('visually-hidden');
  return el;
}

/**
 * Creates a visually hidden text element, e.g. a label or a table header for screen readers.
 * @param {string} text
 * @param {string} [tagName]
 * @returns {Element}
 */
export function createHiddenText(text, tagName = 'span') {
  const el = document.createElement(tagName);
  el.textContent = text;
  return hideVisually(el);
}

/**
 * Adds the "Skip to main content" link as the first focusable element of the page (WCAG 2.4.1):
 * visible only while focused (styles/styles.css .skip-link), it moves to <main>.
 * @param {Element} main
 * @param {(key: string, fallback: string) => string} [t] the placeholders lookup
 * @returns {HTMLAnchorElement|null}
 */
export function addSkipLink(main, t = (key, fallback) => fallback) {
  if (!main || document.querySelector('.skip-link')) return null;
  if (!main.id) main.id = 'main-content';
  const link = document.createElement('a');
  link.className = 'skip-link';
  link.href = `#${main.id}`;
  link.textContent = t('skipToContent', 'Skip to main content');
  // the target takes focus (not just the scroll position), so the next Tab continues in <main>
  link.addEventListener('click', () => {
    if (!main.hasAttribute('tabindex')) main.tabIndex = -1;
    main.focus({ preventScroll: true });
  });
  document.body.prepend(link);
  return link;
}
