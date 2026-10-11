/**
 * Links utils: read authored links and their Link Type ("Open in New Window") values.
 */
import { readMultifieldItems } from './multifield.js';

/** value of the "Open in New Window" Link Type option in the block models */
export const NEW_WINDOW = 'new-window';

/** the link of a single-link property (link + text collapsed into one anchor) */
export const linkOf = (cell) => cell?.querySelector('a[href]') || null;

/**
 * Reads a CTA List composite multifield cell: one link per item, each with an optional
 * "new-window" Link Type value.
 * @param {Element} cell
 * @returns {{ link: HTMLAnchorElement, newWindow: boolean }[]}
 */
export function readLinkItems(cell) {
  return readMultifieldItems(cell).map((item) => {
    const link = item.map((el) => (el.matches('a[href]') ? el : el.querySelector('a[href]')))
      .find(Boolean);
    const newWindow = item.some((el) => {
      const text = el.contains(link) ? el.textContent.replace(link.textContent, '') : el.textContent;
      return text.trim() === NEW_WINDOW;
    });
    return { link, newWindow };
  }).filter(({ link }) => link);
}
