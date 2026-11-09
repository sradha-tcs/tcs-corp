/*
 * Breadcrumb: Levels shown, the trail of parent pages (farthest first) and its items: node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  itemsOf, levelsOf, pathKey, trailOf,
} from '../../blocks/breadcrumb/breadcrumb-data.js';

// getParentPages of /en/insights/blogs/ai-in-banking: nearest first, the Home page last
const parents = ['/en/insights/blogs', '/en/insights', '/en/'];
const titles = { '/en/insights/blogs': 'Blogs', '/en/insights': 'Insights' };
const titleOf = (url) => titles[url] || '';

describe('levelsOf', () => {
  it('reads 1 to 5, everything else is all (0)', () => {
    assert.equal(levelsOf('2'), 2);
    assert.equal(levelsOf(' 5 '), 5);
    ['all', '', '0', '6', 'x', undefined].forEach((value) => assert.equal(levelsOf(value), 0, String(value)));
  });
});

describe('pathKey', () => {
  it('drops query, hash, .html, /index and the trailing slash', () => {
    assert.equal(pathKey('/en/'), '/en');
    assert.equal(pathKey('/en/index'), '/en');
    assert.equal(pathKey('/content/tcs-corp/us/en/insights.html?x=1#y'), '/content/tcs-corp/us/en/insights');
    assert.equal(pathKey('/en/a.plain.html'), '/en/a');
    assert.equal(pathKey('/'), '/');
  });
});

describe('trailOf', () => {
  it('shows every parent, farthest first, for all', () => {
    assert.deepEqual(trailOf(parents, 0), ['/en/', '/en/insights', '/en/insights/blogs']);
  });
  it('shows the nearest levels', () => {
    assert.deepEqual(trailOf(parents, 1), ['/en/insights/blogs']);
    assert.deepEqual(trailOf(parents, 2), ['/en/insights', '/en/insights/blogs']);
    assert.deepEqual(trailOf(parents, 5), ['/en/', '/en/insights', '/en/insights/blogs']);
  });
  it('is empty without parents (the Home page)', () => {
    assert.deepEqual(trailOf([], 0), []);
  });
});

describe('itemsOf', () => {
  const base = { home: '/en/', titleOf, homeLabel: 'Home' };
  it('links the parents, labels Home, ends with the current page', () => {
    assert.deepEqual(itemsOf({ ...base, trail: trailOf(parents, 0), current: 'AI in banking' }), [
      { label: 'Home', href: '/en/' },
      { label: 'Insights', href: '/en/insights' },
      { label: 'Blogs', href: '/en/insights/blogs' },
      { label: 'AI in banking', current: true },
    ]);
  });
  it('leaves out the current page when it is not shown', () => {
    assert.deepEqual(itemsOf({ ...base, trail: trailOf(parents, 1), current: '' }), [
      { label: 'Blogs', href: '/en/insights/blogs' },
    ]);
  });
  it('leaves out a parent without a page (no title), keeps Home', () => {
    const trail = ['/en/', '/en/folder', '/en/insights'];
    assert.deepEqual(itemsOf({ ...base, trail, current: 'Page' }).map((item) => item.label), ['Home', 'Insights', 'Page']);
  });
});
