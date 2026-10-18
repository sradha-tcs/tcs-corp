/*
 * List cards: field-by-field content from the linked page, and the Card style / Card colour
 * precedence (List Item > List > page card-style / card-theme metadata > automatic): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCards, kindOf, normalizeConfig, normalizePageToCard, themeOf,
} from '../../blocks/list/list-data.js';

// an index page (utils/query-index.js): columns by their index name (card-style -> cardStyle)
const page = (path, row = {}) => ({
  path,
  title: row.title || '',
  description: row.description || '',
  image: row.image || '',
  tags: [],
  lastModified: 1790000000,
  row: { path, ...row },
});
const PAGES = [
  page('/en/news', { title: 'News' }),
  page('/en/news/a', {
    title: 'Page A Title', description: 'Page A Description', image: '/en/media/a.jpg', eyebrow: 'Technology', cardStyle: 'report', cardTheme: 'navy',
  }),
  page('/en/news/b', { title: 'Page B Title', image: '/en/media/b.jpg', cardStyle: 'stat' }),
  page('/en/news/c', { title: 'Page C Title', cardStyle: 'panel', cardTheme: 'grey' }),
  page('/en/news/d', { title: 'Page D Title', image: '/en/media/d.jpg' }),
  page('/en/news/e', { title: 'Page E Title', image: '/en/media/e.jpg', cardStyle: 'horizontal', cardTheme: 'neon' }),
];

const config = (raw = {}) => normalizeConfig({ displayasteaser: 'true', ...raw });
// the rendered Card style and Card colour of each card, as the card list decorator renders them
const styles = (cfg, cards) => cards.map((card) => kindOf(card, cfg.cardStyle));
const colours = (cfg, cards) => cards.map((card) => themeOf(card, cfg.cardTheme));
const fixed = (raw, items) => {
  const cfg = config({ source: 'fixed', ...raw });
  return { cfg, cards: buildCards(cfg, { pages: PAGES, items }) };
};
const parent = (raw) => {
  const cfg = config({ source: 'parent', parentpath: '/en/news', ...raw });
  return { cfg, cards: buildCards(cfg, { pages: PAGES }) };
};

describe('Card style of List Items (manual)', () => {
  it('1: the List Item style wins over the list and the page', () => {
    const { cfg, cards } = fixed({ cardstyle: 'panel' }, [{ href: '/en/news/a', kind: 'stat' }]);
    assert.deepEqual(styles(cfg, cards), ['stat']);
  });
  it('2: without one, the list style wins over the page', () => {
    const { cfg, cards } = fixed({ cardstyle: 'panel' }, [{ href: '/en/news/a' }]);
    assert.deepEqual(styles(cfg, cards), ['panel']);
  });
  it('3: with the list on Mixed (by page), the linked page style', () => {
    const { cfg, cards } = fixed({ cardstyle: 'mixed' }, [{ href: '/en/news/a' }]);
    assert.deepEqual(styles(cfg, cards), ['report']);
  });
  it('4: without any, the automatic style (image with an image, else panel)', () => {
    const { cfg, cards } = fixed({ cardstyle: 'mixed' }, [{ href: '/en/news/d' }, { href: '/en/news' }]);
    assert.deepEqual(styles(cfg, cards), ['image', 'panel']);
  });
  it('12: each List Item style overrides the list style; the others follow the list', () => {
    const { cfg, cards } = fixed({ cardstyle: 'panel' }, [
      { href: '/en/news/a', kind: 'stat' }, { href: '/en/news/b' }, { href: '/en/news/c', kind: 'report' },
    ]);
    assert.deepEqual(styles(cfg, cards), ['stat', 'panel', 'report']);
  });
});

describe('Card style of source cards (child pages, tags)', () => {
  it('5: a list style forces every card', () => {
    const { cfg, cards } = parent({ cardstyle: 'panel' });
    assert.deepEqual(styles(cfg, cards), ['panel', 'panel', 'panel', 'panel', 'panel']);
  });
  it('6 / 10: with Mixed (by page), each page decides; pages without one are automatic', () => {
    const { cfg, cards } = parent({ cardstyle: 'mixed' });
    // a: report, b: stat, c: panel, d: no card-style (image), e: unsupported (image)
    assert.deepEqual(styles(cfg, cards), ['report', 'stat', 'panel', 'image', 'image']);
  });
  it('11: an unsupported page style is ignored: no kind or class is made from it', () => {
    const card = normalizePageToCard(PAGES[5], config());
    assert.equal(card.pageKind, '');
    assert.equal(card.pageTheme, '');
    assert.equal(kindOf(card, 'mixed'), 'image');
  });
  it('lists made before keep their style (Image card by default)', () => {
    const { cfg, cards } = parent({});
    assert.equal(cfg.cardStyle, 'image');
    assert.deepEqual(styles(cfg, cards), ['image', 'image', 'image', 'image', 'image']);
  });
});

describe('Card colour', () => {
  it('List Item > list > page > the style default', () => {
    assert.deepEqual(colours(...Object.values(fixed({ cardtheme: 'dark' }, [{ href: '/en/news/a', theme: 'brand' }]))), ['brand']);
    assert.deepEqual(colours(...Object.values(fixed({ cardtheme: 'dark' }, [{ href: '/en/news/a' }]))), ['dark']);
    assert.deepEqual(colours(...Object.values(fixed({}, [{ href: '/en/news/a' }]))), ['navy']);
    assert.deepEqual(colours(...Object.values(fixed({}, [{ href: '/en/news/d' }]))), ['']);
  });
  it('source cards: the list colour, else each page colour; unsupported ones are ignored', () => {
    assert.deepEqual(colours(...Object.values(parent({ cardtheme: 'dark' }))), ['dark', 'dark', 'dark', 'dark', 'dark']);
    assert.deepEqual(colours(...Object.values(parent({}))), ['navy', '', 'grey', '', '']);
  });
});

describe('List Item content from the linked page (field by field)', () => {
  it('7: authored fields win, empty ones come from the linked page', () => {
    const { cards: [card] } = fixed({}, [{
      href: '/en/news/a', title: 'Custom Title', description: '', image: '', eyebrow: 'Insights',
    }]);
    assert.equal(card.title, 'Custom Title');
    assert.equal(card.description, 'Page A Description');
    assert.equal(card.image, '/en/media/a.jpg');
    assert.equal(card.eyebrow, 'Insights');
    assert.equal(card.url, '/en/news/a');
  });
  it('8: a fully authored List Item keeps every authored value', () => {
    const item = {
      href: '/en/news/a',
      title: 'Author Title',
      description: 'Author description',
      image: '/en/media/author.jpg',
      imageAlt: 'Author alt',
      eyebrow: 'Author eyebrow',
      tags: ['tcs:topic/ai'],
      subtitle: '40%',
      ctaLabel: 'Read',
      kind: 'panel',
      theme: 'grey',
    };
    const { cfg, cards: [card] } = fixed({ cardstyle: 'mixed' }, [item]);
    assert.equal(card.title, 'Author Title');
    assert.equal(card.description, 'Author description');
    assert.equal(card.image, '/en/media/author.jpg');
    assert.equal(card.imageAlt, 'Author alt');
    assert.equal(card.eyebrow, 'Author eyebrow');
    assert.deepEqual(card.tagIds, ['tcs:topic/ai']);
    assert.equal(card.subtitle, '40%');
    assert.equal(card.ctaLabel, 'Read');
    assert.equal(kindOf(card, cfg.cardStyle), 'panel');
    assert.equal(themeOf(card, cfg.cardTheme), 'grey');
  });
  it('9: a linked page that can\'t be resolved keeps the authored values and the other items', () => {
    const { cfg, cards } = fixed({ cardstyle: 'mixed' }, [
      { href: '/en/news/missing', title: 'Kept title', eyebrow: 'Kept' },
      { href: '/en/news/a' },
    ]);
    assert.equal(cards.length, 2);
    assert.equal(cards[0].title, 'Kept title');
    assert.equal(cards[0].eyebrow, 'Kept');
    assert.equal(cards[0].description, '');
    assert.deepEqual(styles(cfg, cards), ['panel', 'report']);
  });
  it('an item without a link is left out, without breaking the list', () => {
    const { cards } = fixed({}, [{ href: '', title: 'No link' }, { href: '/en/news/b' }]);
    assert.deepEqual(cards.map((card) => card.title), ['Page B Title']);
  });
  it('an empty source gives no cards', () => {
    const { cards } = parent({ parentpath: '/en/nothing' });
    assert.deepEqual(cards, []);
  });
});
