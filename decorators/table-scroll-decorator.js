/**
 * Table scroll decorator: a table wider than its container scrolls inside it, not the page, in a
 * labelled region keyboard users can focus to scroll it (WCAG 1.4.10, 2.1.1). Used by the Table
 * block and for the tables of rich text (default content), e.g. the wide financial tables of
 * migrated press releases.
 */
import { uniqueId } from '../utils/ids.js';

/** the heading right before an element (in its default content, or before a block), if any */
export function headingBefore(el) {
  let previous = el.previousElementSibling;
  if (el.classList.contains('block')) {
    previous = el.parentElement?.previousElementSibling;
    if (previous?.classList.contains('default-content-wrapper')) previous = previous.lastElementChild;
  }
  return previous?.matches('h1, h2, h3, h4, h5, h6') ? previous : null;
}

/**
 * Names the table by the heading before it (aria-labelledby).
 * @param {HTMLTableElement} table
 * @param {Element} [before] the element whose previous sibling may be the heading
 * @returns {Element|null} the heading
 */
export function nameTable(table, before = table) {
  const heading = headingBefore(before);
  if (heading) {
    heading.id = heading.id || uniqueId('table-title');
    table.setAttribute('aria-labelledby', heading.id);
  }
  return heading;
}

/**
 * Makes the container a focusable, labelled region while its content is wider than it.
 * @param {Element} container the element that scrolls (overflow-x: auto)
 * @param {string} label the region's name
 */
export function observeScrollRegion(container, label) {
  new ResizeObserver(() => {
    const scrolls = container.scrollWidth > container.clientWidth + 1;
    if (scrolls) {
      container.tabIndex = 0;
      container.setAttribute('role', 'region');
      container.setAttribute('aria-label', label);
    } else {
      container.removeAttribute('tabindex');
      container.removeAttribute('role');
      container.removeAttribute('aria-label');
    }
  }).observe(container);
}

/**
 * Wraps each table of the default content in a scroll container (.table-scroll). Runs while the
 * page is decorated: the placeholders (the region's fallback name) load only when there's a table.
 * @param {Element} main
 */
export function decorateContentTables(main) {
  const tables = [...main.querySelectorAll('.default-content-wrapper table')]
    .filter((table) => !table.parentElement.classList.contains('table-scroll'));
  if (!tables.length) return;
  const placeholders = import('../utils/placeholders.js').then(({ getPlaceholders }) => getPlaceholders());
  tables.forEach((table) => {
    const heading = nameTable(table);
    const scroll = document.createElement('div');
    scroll.className = 'table-scroll';
    table.replaceWith(scroll);
    scroll.append(table);
    placeholders.then((t) => {
      observeScrollRegion(scroll, heading?.textContent.trim() || t('table', 'Table'));
    });
  });
}
