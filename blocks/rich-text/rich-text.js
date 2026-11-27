import { moveInstrumentation } from '../../scripts/scripts.js';
import { isEditing } from '../../utils/environment.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { readProperties } from '../../utils/properties.js';

/*
 * Rich Text (blocks/rich-text/_rich-text.json, KB-D-079): a key-value block with one rich text
 * field (Text, the full editor toolbar of models/_rte.json) and the Style tab's variations as block
 * classes (Alignment, Text size, First paragraph, Text colour, Columns, Width; rich-text.css), so
 * text gets the styles the built-in Text component can't carry (it delivers no classes).
 * The text is kept as authored: standalone bold / italic links are already buttons
 * (decorators/content-buttons-decorator.js), :icon: spans icons (aem.js).
 */

/** the authored content: text, media or a table */
const hasContent = (el) => !!el.textContent.trim() || !!el.querySelector('img, picture, table, video, iframe');

/**
 * A table wider than its container scrolls in a labelled region keyboard users can focus (as the
 * Table block does); one ResizeObserver per table, no layout read while decorating.
 * @param {HTMLTableElement} table
 * @param {string} label
 */
function scrollableTable(table, label) {
  const region = document.createElement('div');
  region.className = 'rich-text-table';
  table.replaceWith(region);
  region.append(table);
  new ResizeObserver(() => {
    if (region.scrollWidth > region.clientWidth + 1) {
      region.tabIndex = 0;
      region.setAttribute('role', 'region');
      region.setAttribute('aria-label', label);
    } else {
      region.removeAttribute('tabindex');
      region.removeAttribute('role');
      region.removeAttribute('aria-label');
    }
  }).observe(region);
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const { text } = readProperties(block);
  const content = document.createElement('div');
  content.className = 'rich-text-content';
  if (text) {
    // keep the Universal Editor instrumentation on the element that holds the text
    moveInstrumentation(text, content);
    content.append(...text.childNodes);
  }

  if (!hasContent(content)) {
    block.replaceChildren(...(isEditing() ? [content] : []));
    if (isEditing()) {
      const t = await getPlaceholders();
      const hint = document.createElement('p');
      hint.className = 'rich-text-empty';
      hint.textContent = t('richTextEmpty', 'Rich Text: add the text in the Text field.');
      content.append(hint);
    }
    return;
  }

  const tables = [...content.querySelectorAll('table')];
  if (tables.length) {
    const t = await getPlaceholders();
    tables.forEach((table) => scrollableTable(table, t('table', 'Table')));
  }
  block.replaceChildren(content);
}
