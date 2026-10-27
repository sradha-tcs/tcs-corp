// Item rows of blocks with item children (CTAs, links, stats, anchors, filters): node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { FIELD_ROW_ITEM, KEY_VALUE_ITEM, itemRows } from '../../utils/cells.js';
import modelLayout from '../model-layout.mjs';

// a row as itemRows reads it: its cells and, in Universal Editor, its model
const row = (cells, model) => ({
  children: Array.from({ length: cells }, () => ({})),
  dataset: model ? { aueModel: model } : {},
});

// the item models, their block's rule and the cells the blocks read (null: a dialog tab)
const ITEMS = [
  ['hero', 'hero-cta', FIELD_ROW_ITEM, ['link', 'linkTarget', 'linkStyle', 'secondaryBackground', 'secondaryBorder', 'linkArrow']],
  ['page-header', 'page-header-cta', KEY_VALUE_ITEM, ['link', 'linkTarget', 'linkStyle']],
  ['teaser', 'teaser-link', KEY_VALUE_ITEM, ['link', 'linkTarget', 'linkStyle']],
  ['teaser', 'teaser-stat', KEY_VALUE_ITEM, [null, 'statLabel', 'statValue']],
  ['testimonial', 'testimonial-stat', KEY_VALUE_ITEM, [null, 'statLabel', 'statValue']],
  ['anchor-list', 'anchor-list-item', KEY_VALUE_ITEM, [null, 'label', 'anchorName']],
  ['filter-list', 'filter-list-tag', KEY_VALUE_ITEM, ['tagId']],
  ['filter-list', 'filter-list-category', KEY_VALUE_ITEM, [null, 'categoryLabel', 'taxonomyRoot']],
  ['filter-list', 'filter-list-page', KEY_VALUE_ITEM, [null, 'page', 'pageRole']],
  ['footer', 'footer-link', FIELD_ROW_ITEM, ['link', 'linkTarget']],
];

describe('item models', () => {
  ITEMS.forEach(([block, model, isItem, layout]) => {
    const cells = modelLayout(`blocks/${block}/_${block}.json`, model);
    it(`${model} renders the cells its block reads`, () => {
      assert.deepEqual(cells, layout);
    });
    it(`${model} rows are told from the ${block} block's own rows on the page`, () => {
      assert.equal(isItem(row(cells.length)), true);
      // a key-value block's own rows are name | value, the others' one cell
      assert.equal(isItem(row(isItem === KEY_VALUE_ITEM ? 2 : 1)), false);
    });
  });
  it('items of one block are told apart on the page', () => {
    // filter-list: a Filter Tag has one cell, a Filter Page a link (the block checks it)
    const filterList = ITEMS.filter(([block]) => block === 'filter-list')
      .map(([block, model]) => modelLayout(`blocks/${block}/_${block}.json`, model).length);
    assert.deepEqual(filterList, [1, 3, 3]);
  });
});

describe('itemRows', () => {
  const block = (...rows) => ({ children: rows });
  it('reads the rows of the item models in the editor', () => {
    const cta = row(4, 'hero-cta');
    const own = row(1);
    assert.deepEqual(itemRows(block(own, cta), ['hero-cta'], FIELD_ROW_ITEM), [cta]);
  });
  it('leaves out rows of other models in the editor, whatever their cells', () => {
    const stat = row(3, 'teaser-stat');
    assert.deepEqual(itemRows(block(stat), ['teaser-link'], KEY_VALUE_ITEM), []);
  });
  it('tells item rows by their cells on the page', () => {
    const property = row(2);
    const tag = row(1);
    const category = row(3);
    assert.deepEqual(itemRows(block(property, tag, category), [], KEY_VALUE_ITEM), [tag, category]);
  });
});
