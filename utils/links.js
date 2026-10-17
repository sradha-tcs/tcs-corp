/**
 * Links utils: read authored links and their Link Type ("Open in New Window") values.
 */
import { readMultifieldItems } from './multifield.js';

/** value of the "Open in New Window" Link Type option in the block models */
export const NEW_WINDOW = 'new-window';

/** the link of a single-link property (link + text collapsed into one anchor) */
export const linkOf = (cell) => cell?.querySelector('a[href]') || null;

/**
 * The paths of a page property (aem-content, one or many): its links, else its values as text
 * (a list, or comma-separated). A link to this site is read as its path (and query).
 * @param {Element} cell
 * @returns {string[]} the paths as authored (AEM or published paths), or external URLs
 */
export function linkPathsOf(cell) {
  if (!cell) return [];
  const links = [...cell.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
  const items = [...cell.querySelectorAll('li')].map((li) => li.textContent);
  let values = links;
  if (!values.length) values = items.length ? items : [cell.textContent];
  // paths have no commas: a comma-separated value is several paths
  return values.flatMap((value) => value.split(',')).map((value) => value.trim()).filter(Boolean)
    .map((value) => {
      if (!/^https?:/i.test(value)) return value;
      const url = new URL(value);
      return url.origin === window.location.origin ? `${url.pathname}${url.search}` : value;
    });
}

/**
 * Reads a CTA List composite multifield cell: one link per item, each with an optional
 * "new-window" Link Type value and the item's other select values (e.g. an arrow direction).
 * @param {Element} cell
 * @returns {{ link: HTMLAnchorElement, newWindow: boolean, values: string[] }[]}
 */
export function readLinkItems(cell) {
  return readMultifieldItems(cell).map((item) => {
    const link = item.map((el) => (el.matches('a[href]') ? el : el.querySelector('a[href]')))
      .find(Boolean);
    // the values next to the link: elements of the item, or of its list item
    const parts = item.flatMap((el) => (link && el !== link && el.contains(link)
      && el.children.length > 1 ? [...el.children] : [el]));
    const values = parts.filter((el) => !link || !el.contains(link))
      .map((el) => el.textContent.trim()).filter(Boolean);
    const newWindow = values.includes(NEW_WINDOW) || item.some((el) => {
      const text = el.contains(link) ? el.textContent.replace(link.textContent, '') : el.textContent;
      return text.trim() === NEW_WINDOW;
    });
    return { link, newWindow, values };
  }).filter(({ link }) => link);
}

/**
 * Reads link item rows (e.g. the Hero's CTA items): the row's link (the link field, its text
 * collapsed into it) and the values of its other cells (Link Type, style, arrow, ...).
 * @param {Element[]} rows
 * @returns {{ link: HTMLAnchorElement, newWindow: boolean, values: string[], row: Element }[]}
 */
export function readLinkRows(rows) {
  return rows.map((row) => {
    const link = row.querySelector('a[href]');
    const values = [...row.children].filter((cell) => !link || !cell.contains(link))
      .map((cell) => cell.textContent.trim()).filter(Boolean);
    return {
      link, newWindow: values.includes(NEW_WINDOW), values, row,
    };
  }).filter(({ link }) => link);
}
