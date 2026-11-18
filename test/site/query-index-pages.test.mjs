// getPages (utils/query-index.js): the index is fetched once and its rows are turned into pages
// once per root, however many blocks ask (Lists, Filter List, Canvas menus, header menu): node --test
/* global globalThis */
import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';

const ROWS = [
  { path: '/language-masters/en/insights', title: 'Insights', tags: 'tcs-corp:topic/cloud' },
  { path: '/language-masters/en/insights/blog', title: 'Blog', metaTitle: 'Sheet title' },
  { path: '/language-master/en/other', title: 'Another root' },
];
const requests = [];

before(() => {
  globalThis.window = { location: { pathname: '/language-masters/en/insights', href: 'https://example.test/language-masters/en/insights' } };
  globalThis.fetch = async (url) => {
    requests.push(String(url));
    return { ok: true, json: async () => ({ data: ROWS, total: ROWS.length }) };
  };
});

describe('getPages', () => {
  it('fetches the index once and builds the pages once for every caller', async () => {
    const { getPages } = await import('../../utils/query-index.js');
    const [a, b, c] = await Promise.all([getPages(), getPages(), getPages()]);
    assert.equal(requests.length, 1, 'one index request');
    assert.equal(requests[0], '/language-masters/en/query-index.json?offset=0&limit=1000');
    assert.deepEqual(a.map((p) => p.path), ['/language-masters/en/insights', '/language-masters/en/insights/blog']);
    // the same page objects (built once), in an array of each caller's own
    assert.equal(a[0], b[0]);
    assert.notEqual(a, b);
    a.reverse();
    assert.equal(c[0].path, '/language-masters/en/insights', 'a caller reordering its array leaves the others alone');
  });

  it('keeps reading the pages as before (sheet overrides, tags)', async () => {
    const { getPages } = await import('../../utils/query-index.js');
    const pages = await getPages();
    const blog = pages.find((p) => p.path.endsWith('/blog'));
    assert.equal(blog.title, 'Sheet title');
    assert.equal(blog.row.title, 'Sheet title');
    assert.deepEqual(pages[0].tags, ['tcs-corp:topic/cloud']);
    assert.equal(requests.length, 1, 'still one index request');
  });
});
