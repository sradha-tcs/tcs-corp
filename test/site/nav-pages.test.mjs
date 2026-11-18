// getNavPages (utils/query-index.js): the menus' pages (path, title) from the small navigation
// index, else from the query index until the navigation index is built: node --test
/* global globalThis */
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

const QUERY_ROWS = [
  { path: '/language-masters/en/insights', title: 'Insights', description: 'All the columns' },
  { path: '/language-masters/en/insights/blog', title: 'Blog', metaTitle: 'Sheet title' },
];
const NAV_ROWS = [
  { path: '/language-masters/en/about', title: 'About' },
  { path: '/language-masters/en/about/team', title: 'Team', metaTitle: 'Our team' },
  { path: '/language-master/en/other', title: 'Another root' },
];
let requests;
let navIndexExists;

// a fresh copy of the module (its caches empty) for each case
const freshModule = (tag) => import(`../../utils/query-index.js?${tag}`);

const respond = (rows) => ({ ok: true, json: async () => ({ data: rows, total: rows.length }) });

beforeEach(() => {
  requests = [];
  globalThis.window = { location: { pathname: '/language-masters/en/insights', href: 'https://example.test/language-masters/en/insights' } };
  globalThis.fetch = async (url) => {
    const path = String(url);
    requests.push(path.replace(/\?.*$/, ''));
    if (path.includes('nav-index.json')) return navIndexExists ? respond(NAV_ROWS) : { ok: false, status: 404 };
    return respond(QUERY_ROWS);
  };
});

describe('navIndexUrlOf', () => {
  it('is next to the root\'s query index', async () => {
    const { navIndexUrlOf } = await freshModule('nav-url');
    assert.equal(navIndexUrlOf('/language-masters/en'), '/language-masters/en/nav-index.json');
    assert.equal(navIndexUrlOf('/de-de'), '/nav-index.json');
  });
});

describe('getNavPages', () => {
  it('reads the navigation index only: path and title, the sheet title winning, own root', async () => {
    navIndexExists = true;
    const { getNavPages } = await freshModule('nav-exists');
    const [a, b] = await Promise.all([getNavPages(), getNavPages()]);
    assert.deepEqual(a, [
      { path: '/language-masters/en/about', title: 'About' },
      { path: '/language-masters/en/about/team', title: 'Our team' },
    ]);
    assert.deepEqual(requests, ['/language-masters/en/nav-index.json'], 'one request, no query index');
    assert.notEqual(a, b, 'each caller gets its own array');
  });

  it('falls back to the query index while the navigation index doesn\'t exist', async () => {
    navIndexExists = false;
    const { getNavPages } = await freshModule('nav-missing');
    const pages = await getNavPages();
    assert.deepEqual(pages, [
      { path: '/language-masters/en/insights', title: 'Insights' },
      { path: '/language-masters/en/insights/blog', title: 'Sheet title' },
    ]);
    assert.deepEqual(requests, ['/language-masters/en/nav-index.json', '/language-masters/en/query-index.json']);
  });
});
