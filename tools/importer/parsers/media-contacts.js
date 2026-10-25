/* eslint-disable */
/* global WebImporter */

/**
 * Media Contacts (blocks/media-contacts, key-value, template name "Media Contacts").
 *
 * Source: div.cmp-experiencefragment--media-contacts (the contacts rich text / panels, then
 * div.relatedContent "In the News"). The block lists the locale's Media Contacts sheet, so the
 * source contacts are dropped; the block is constant, as in the approved reference
 * (migration-work/pilot/reference.plain.html): one row, title = h2 "TCS media contacts".
 *
 * The fragment also holds "In the News" (div.relatedContent, the list parser's source, or the
 * List block if that parser already ran) and the section break tcs-sections.js inserts before
 * it: they are moved out, after the block, in document order, before the fragment is removed.
 */

const SECTION_BREAK = 'hr[data-import-section-id]';

/** a block table built by createBlock whose header cell reads `name` */
function isBlockTable(el, name) {
  if (el.tagName !== 'TABLE') return false;
  const head = el.querySelector('tr > th, tr > td');
  return !!head && head.textContent.trim().toLowerCase().startsWith(name);
}

export default function parse(element, { document }) {
  const title = document.createElement('h2');
  title.textContent = 'TCS media contacts';
  const cells = [['title', title]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'media-contacts', cells });

  // what must survive the fragment: In the News, its section break, and a List block built already
  const candidates = [...element.querySelectorAll(`div.relatedContent, ${SECTION_BREAK}, table`)]
    .filter((el) => el.tagName !== 'TABLE' || isBlockTable(el, 'list'));
  const keep = candidates.filter((el) => !candidates.some((other) => other !== el && other.contains(el)));

  element.before(block);
  let anchor = block;
  keep.forEach((el) => {
    anchor.after(el);
    anchor = el;
  });
  element.remove();
}
