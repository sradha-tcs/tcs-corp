/**
 * Link decorator: link behavior shared by buttons, link lists and plain links.
 */

/**
 * Opens a link in a new tab (or back in the same tab).
 * @param {HTMLAnchorElement} a
 * @param {boolean} [newWindow]
 */
// eslint-disable-next-line import/prefer-default-export
export function setLinkTarget(a, newWindow = true) {
  if (a?.tagName !== 'A') return;
  if (newWindow) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  } else {
    a.removeAttribute('target');
    a.removeAttribute('rel');
  }
}
