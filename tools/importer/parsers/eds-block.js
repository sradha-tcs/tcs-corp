/* global WebImporter */
/**
 * Parser for blocks of a page that is already on Edge Delivery Services: the block's delivered
 * markup (div.<name> <variants> > row > cell, as in <path>.plain.html) back to its block table,
 * unchanged: the first class is the block name, the others its variants, every row and cell kept.
 * @param {Element} block The undecorated block element
 * @param {{ document: Document }} context
 * @returns {Element} the block table
 */
export default function parse(block, { document }) {
  const [name, ...variants] = [...block.classList];
  const cells = [...block.children].map((row) => [...row.children].map((cell) => cell));
  return WebImporter.Blocks.createBlock(document, {
    name: variants.length ? `${name} (${variants.join(', ')})` : name,
    cells,
  });
}
