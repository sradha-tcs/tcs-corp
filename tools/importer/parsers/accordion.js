/* eslint-disable */
/* global WebImporter */

/**
 * Accordion (blocks/accordion, template name "Accordion"; not key-value, its only fields are the
 * Additional tab's classes_*).
 *
 * Source: div.tcsAccordion: an "Expand All" button and per item div.accordion-card with a
 * number (01., 02., ... drawn by the component), h3.accordion-title-heading, an optional
 * p.accordion-title-content and the body's rich text (div.accordion-body div.richText).
 * Target: the block table has 2 columns, one row per accordion item: the title cell (Summary:
 * the title, plus the sub line when the source has one) and the content cell (Text: the body's
 * paragraphs, lists and links, without classes). The numbers and the Expand All button are
 * presentation, not content.
 *
 * md2jcr (1.5.10): the model has no property rows (classes_* only), so every row is an
 * Accordion Item (field groups summary, text). AEM delivers an extra empty first row for the
 * Additional tab; it is not part of md2jcr's input (it would become an empty item).
 */

const norm = (s) => (s || '').replace(/[\s ]+/g, ' ').trim();

function bodyNodes(body) {
  const nodes = [];
  (body ? [...body.querySelectorAll('.richText')] : []).forEach((rte) => {
    [...rte.children].forEach((el) => {
      if (['LINK', 'SCRIPT', 'STYLE'].includes(el.tagName)) return;
      const copy = el.cloneNode(true);
      copy.removeAttribute('class');
      copy.removeAttribute('id');
      copy.querySelectorAll('[class], [style], [id]').forEach((child) => {
        child.removeAttribute('class');
        child.removeAttribute('style');
        child.removeAttribute('id');
      });
      if (norm(copy.textContent) || copy.querySelector('img')) nodes.push(copy);
    });
  });
  return nodes;
}

export default function parse(element, { document }) {
  const cells = [];
  element.querySelectorAll('.accordion-card').forEach((item) => {
    const title = norm(item.querySelector('.accordion-title-heading')?.textContent);
    const sub = norm(item.querySelector('.accordion-title-content')?.textContent);
    const summary = [title, sub].filter(Boolean).join(': ');
    const content = bodyNodes(item.querySelector('.accordion-body'));
    if (!summary && !content.length) return;
    cells.push([summary, content]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion', cells });
  element.replaceWith(block);
}
