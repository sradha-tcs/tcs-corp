/*
 * List cards: the List Item's Show Action Label toggle and the card's call to action, inherited from
 * the List's Show call to action unless the item sets it
 * (utils/card-list-config.js cardDisplay, cardActionLabel): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  applyOverrides, kindOf, normalizeConfig, themeOf,
} from '../../blocks/list/list-data.js';
import { cardActionLabel, cardDisplay } from '../../utils/card-list-config.js';

const DEFAULTS = { panel: 'Explore', report: 'Download' };
const config = (raw = {}) => normalizeConfig({ displayasteaser: 'true', ...raw });
// a List Item's card, with its Display toggles as AEM delivers them ('true' / 'false' / '')
const card = (item = {}) => applyOverrides({
  title: 'Banking', url: '/en/industries/banking', ctaLabel: '', kind: '', theme: '',
}, item);
// the card's presentation as the card list decorator renders it (renderCard)
const displayOf = (c, cfg) => {
  const kind = kindOf(c, cfg.cardStyle);
  const theme = kind === 'image' ? '' : themeOf(c, cfg.cardTheme);
  return { kind, display: cardDisplay(c, cfg, { kind, theme }) };
};
// the call to action a card renders: its label, '' for none
const action = (item, raw) => {
  const cfg = config(raw);
  const c = card(item);
  const { kind, display } = displayOf(c, cfg);
  return cardActionLabel(c, display, kind, DEFAULTS);
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
    const { display } = displayOf(card(item), config());
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
      const { kind, display } = displayOf(c, cfg);
      return cardActionLabel(c, display, kind, DEFAULTS);
    });
    assert.deepEqual(labels, ['Explore', '', 'Explore']);
  });
  it('an item set on shows its call to action in a List set off; the others inherit off', () => {
    const cfg = config({ showcta: 'false', cardstyle: 'panel' });
    const labels = [{}, { showActionLabel: 'true', ctaLabel: 'Learn more' }, {}].map((item) => {
      const c = card(item);
      const { kind, display } = displayOf(c, cfg);
      return cardActionLabel(c, display, kind, DEFAULTS);
    });
    assert.deepEqual(labels, ['', 'Learn more', '']);
  });
  it('cards without Display toggles (child and tagged pages, Cards) follow the List', () => {
    const page = { title: 'Banking', ctaLabel: '', kind: 'panel' };
    assert.equal(cardDisplay(page, config({ showcta: 'true' })).showCta, true);
    assert.equal(cardDisplay(page, config({ showcta: 'false' })).showCta, false);
  });
});

describe('Image background panels (Figma Card / Theme / image): eyebrow and title only', () => {
  it('no default Explore and no description, as in the Figma Transformation themes', () => {
    const cfg = config({ cardstyle: 'panel' });
    const c = card({ theme: 'image', description: 'Text' });
    const { display } = displayOf(c, cfg);
    assert.equal(action({ theme: 'image' }, { cardstyle: 'panel' }), '');
    assert.equal(display.showDescription, false);
    assert.equal(display.ownDescription, false);
  });
  it('the List\'s Card colour Image background works the same', () => {
    assert.equal(action({}, { cardstyle: 'panel', cardtheme: 'image' }), '');
  });
  it('the item\'s Show Action Label set on brings the default Explore back', () => {
    assert.equal(action({ kind: 'panel', theme: 'image', showActionLabel: 'true' }), 'Explore');
  });
  it('an authored Call to action label still shows, unless Show Action Label is off', () => {
    assert.equal(action({ kind: 'panel', theme: 'image', ctaLabel: 'Read more' }), 'Read more');
    assert.equal(action({ kind: 'panel', theme: 'image', ctaLabel: 'Read more', showActionLabel: 'false' }), '');
  });
  it('the other Card colours keep their description and Explore (Figma Card / Theme / Solid)', () => {
    ['', 'dark', 'navy', 'brand', 'grey', 'gradient'].forEach((theme) => {
      const { display } = displayOf(card({ kind: 'panel', theme }), config());
      assert.equal(action({ kind: 'panel', theme }), 'Explore', theme);
      assert.equal(display.showDescription, true, theme);
    });
  });
  it('only panels: report and statistic cards with Image background are unchanged', () => {
    assert.equal(action({ kind: 'report', theme: 'image' }), 'Download');
    assert.equal(displayOf(card({ kind: 'stat', theme: 'image' }), config()).display.ownDescription, true);
  });
  it('one image panel among solid panels: only it loses description and Explore', () => {
    assert.deepEqual([
      action({ kind: 'panel', theme: 'navy' }),
      action({ kind: 'panel', theme: 'image' }),
      action({ kind: 'panel', theme: 'brand' }),
      action({ kind: 'panel', theme: 'image' }),
    ], ['Explore', '', 'Explore', '']);
  });
});
