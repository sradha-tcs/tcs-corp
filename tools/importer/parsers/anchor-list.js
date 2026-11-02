/* eslint-disable */
/* global WebImporter */

/**
 * Anchor List (blocks/anchor-list, key-value, template name "Anchor List") for "On this page".
 *
 * Source: div.inPageLinks div.inpagelinks-desktop-container: the title "On this page" (the
 * block's accessible name, placeholder onThisPage; the block has no title field) and one link per
 * chapter (a[href="#insights_N"], label + a screen reader "inpage" span).
 * Target: Sticky on (tcs.com pins the links while scrolling), one Anchor Link item per link:
 * its label and the anchor of the chapter it points to (data-section-anchor, set by
 * tcs-blog.js; tcs-sections.js makes it the chapter section's anchorName).
 *
 * md2jcr (1.5.10): the property rows are single-cell (key, then value), one per field group of
 * the "anchor-list" model in model order (anchors, sticky); an item row has a cell per field group
 * of "anchor-list-item" (label, anchorName), no tab cell. Keep FIELDS in step with
 * blocks/anchor-list/_anchor-list.json.
 */

/** the field groups of the "anchor-list" model, in model order (as md2jcr groups them) */
const FIELDS = ['anchors', 'sticky'];

const norm = (s) => (s || '').replace(/[\s ]+/g, ' ').trim();

/** as toClassName in scripts/aem.js */
const toClassName = (name) => name.toLowerCase().replace(/[^0-9a-z]/gi, '-')
  .replace(/-+/g, '-').replace(/^-|-$/g, '');

function row(document, key, value) {
  const keyEl = document.createElement('p');
  keyEl.textContent = key;
  return [[keyEl, ...(value ? [document.createTextNode(value)] : [])]];
}

export default function parse(element, { document }) {
  const values = { sticky: 'true' };
  const cells = FIELDS.map((key) => row(document, key, values[key]));

  element.querySelectorAll('a[href^="#"]').forEach((link) => {
    const copy = link.cloneNode(true);
    copy.querySelectorAll('.visually-hidden, .sr-only, [aria-hidden="true"]').forEach((el) => el.remove());
    const label = norm(copy.textContent);
    if (!label) return;
    const target = document.getElementById(link.getAttribute('href').slice(1));
    const anchor = target?.getAttribute('data-section-anchor') || toClassName(label);
    cells.push([label, anchor]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'anchor-list', cells });
  element.replaceWith(block);
}
