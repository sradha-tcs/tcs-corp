/* eslint-disable */
/* global WebImporter */

/**
 * Page Header (blocks/page-header, key-value, template name "Page Header").
 *
 * Source: div.heroBanner (breadcrumb, h1, share bar, hero image).
 * Target (migration-work/pilot/reference.plain.html): the block with one empty row; title,
 * description, tags, date and featured image all come from page metadata, so the h1 and the
 * breadcrumb are dropped.
 *
 * The hero image container (.hero-image-container) is kept after the block so the import
 * script can still read the featured image; tcs-cleanup.js removes it in afterTransform.
 */
export default function parse(element, { document }) {
  const cells = [['']];
  const block = WebImporter.Blocks.createBlock(document, { name: 'page-header', cells });

  const heroImage = element.querySelector('.hero-image-container');
  if (heroImage) {
    element.replaceWith(block, heroImage);
  } else {
    element.replaceWith(block);
  }
}
