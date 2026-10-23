/*
 * List cards: the List Item's Show Action Label toggle and the card's call to action, inherited from
 * the List's Show call to action unless the item sets it
 * (utils/card-list-config.js cardDisplay, cardActionLabel): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { applyOverrides, kindOf, normalizeConfig } from '../../blocks/list/list-data.js';
import { cardActionLabel, cardDisplay } from '../../utils/card-list-config.js';

const DEFAULTS = { panel: 'Explore', report: 'Download' };
const config = (raw = {}) => normalizeConfig({ displayasteaser: 'true', ...raw });
// a List Item's card, with its Display toggles as AEM delivers them ('true' / 'false' / '')
const card = (item = {}) => applyOverrides({
  title: 'Banking', url: '/en/industries/banking', ctaLabel: '', kind: '', theme: '',
}, item);
// the call to action a card renders: its label, '' for none
const action = (item, raw) => {
  const cfg = config(raw);
  const c = card(item);
  return cardActionLabel(c, cardDisplay(c, cfg), kindOf(c, cfg.cardStyle), DEFAULTS);
};

describe('Show Action Label (List Item)', () => {
  it('on (the default, also items authored before): the default Explore of a panel', () => {
    assert.equal(action({ kind: 'panel' }), 'Explore');
    assert.equal(action({ kind: 'panel', showActionLabel: 'true' }), 'Explore');
    assert.equal(action({ kind: 'panel', ctaLabel: 'Learn more' }), 'Learn more');
  });
  it('off: no call to action on a panel, not even the default Explore', () => {
    assert.equal(action({ kind: 'panel', showActionLabel: 'false' }), '');
  });
  it('off: no call to action on an Image background panel', () => {
    assert.equal(action({ kind: 'panel', theme: 'image', showActionLabel: 'false' }), '');
    assert.equal(action({ theme: 'image', showActionLabel: 'false' }, { cardstyle: 'panel' }), '');
  });
  it('off: an authored Call to action label is not shown either', () => {
    assert.equal(action({ kind: 'panel', ctaLabel: 'Learn more', showActionLabel: 'false' }), '');
    assert.equal(action({ kind: 'report', showActionLabel: 'false' }), '');
    assert.equal(action({ kind: 'stat', ctaLabel: 'Read more', showActionLabel: 'false' }), '');
  });
  it('off with Hide Title on: still no call to action (the renderer keeps the title visible)', () => {
    const item = {
      kind: 'panel', theme: 'image', ctaLabel: 'Read more', titleHidden: 'true', showActionLabel: 'false',
    };
    assert.equal(action(item), '');
    const c = card(item);
    const display = cardDisplay(c, config());
    assert.equal(display.showCta, false);
    assert.equal(display.titleHidden, true);
  });
  it('only the card that has it off loses its call to action', () => {
    assert.deepEqual([
      action({ kind: 'panel' }),
      action({ kind: 'panel', showActionLabel: 'false' }),
      action({ kind: 'panel' }),
    ], ['Explore', '', 'Explore']);
  });
  it('the List\'s Show call to action off hides the call to action of items that inherit it', () => {
    assert.equal(action({ kind: 'panel', ctaLabel: 'Learn more' }, { showcta: 'false' }), '');
    assert.equal(action({ kind: 'panel', showActionLabel: '' }, { showcta: 'false' }), '');
  });
  it('image cards have no default call to action', () => {
    assert.equal(action({ kind: 'image' }), '');
    assert.equal(action({ kind: 'image', ctaLabel: 'Read more' }), 'Read more');
  });
});

describe('Show Action Label inherits the List\'s Show call to action', () => {
  // the List's Show call to action x the item's Show Action Label (true / false / not configured)
  const MATRIX = [
    ['true', '', 'Explore'],
    ['true', 'true', 'Explore'],
    ['true', 'false', ''],
    ['false', '', ''],
    ['false', 'true', 'Explore'],
    ['false', 'false', ''],
    // a List made before Show call to action (not stored): on
    ['', '', 'Explore'],
    ['', 'false', ''],
  ];
  MATRIX.forEach(([showcta, showActionLabel, expected]) => {
    it(`List ${showcta || 'not set'}, item ${showActionLabel || 'not configured'}: ${expected || 'no call to action'}`, () => {
      assert.equal(action({ kind: 'panel', showActionLabel }, { showcta }), expected);
    });
  });
  it('the example: A and C inherit the List (shown), B overrides it (hidden)', () => {
    const cfg = config({ showcta: 'true', cardstyle: 'panel' });
    const labels = [{}, { showActionLabel: 'false' }, {}].map((item) => {
      const c = card(item);
      return cardActionLabel(c, cardDisplay(c, cfg), kindOf(c, cfg.cardStyle), DEFAULTS);
    });
    assert.deepEqual(labels, ['Explore', '', 'Explore']);
  });
  it('an item set on shows its call to action in a List set off; the others inherit off', () => {
    const cfg = config({ showcta: 'false', cardstyle: 'panel' });
    const labels = [{}, { showActionLabel: 'true', ctaLabel: 'Learn more' }, {}].map((item) => {
      const c = card(item);
      return cardActionLabel(c, cardDisplay(c, cfg), kindOf(c, cfg.cardStyle), DEFAULTS);
    });
    assert.deepEqual(labels, ['', 'Learn more', '']);
  });
  it('cards without Display toggles (child and tagged pages, Cards) follow the List', () => {
    const page = { title: 'Banking', ctaLabel: '', kind: 'panel' };
    assert.equal(cardDisplay(page, config({ showcta: 'true' })).showCta, true);
    assert.equal(cardDisplay(page, config({ showcta: 'false' })).showCta, false);
  });
});
