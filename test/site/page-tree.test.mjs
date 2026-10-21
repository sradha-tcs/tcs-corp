// The site tree the Conversation Canvas menus and the header menu list (utils/query-index.js
// pageTree): node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { pageTree } from '../../utils/query-index.js';

const rows = [
  { path: '/en/home', title: 'Home' },
  { path: '/en/dummy-pages/insights/ai', title: 'AI' },
  { path: '/en/dummy-pages/what-we-do', title: 'What we do' },
  { path: '/en/dummy-pages/insights', title: 'Insights' },
  { path: '/en/dummy-pages/careers', title: '' },
  { path: '/en/dummy-pages/careers/graduates', title: 'Graduates' },
  { path: '/en/dummy-pages/careers/graduates/india', title: 'India' },
  { path: '/de-de/dummy-pages/insights', title: 'Einblicke' },
];

const titles = (nodes) => nodes.map(({ title }) => title);

describe('pageTree', () => {
  it('lists the pages below the root in path order, a level per depth', () => {
    const tree = pageTree(rows, '/en/dummy-pages', 1);
    assert.equal(tree.path, '/en/dummy-pages');
    assert.deepEqual(titles(tree.children), ['careers', 'Insights', 'What we do']);
    assert.ok(tree.children.every((node) => !node.children.length));
  });

  it('nests the levels up to the depth', () => {
    const tree = pageTree(rows, '/en/dummy-pages/', 3);
    const careers = tree.children[0];
    assert.equal(careers.path, '/en/dummy-pages/careers');
    assert.deepEqual(titles(careers.children), ['Graduates']);
    assert.deepEqual(titles(careers.children[0].children), ['India']);
    assert.equal(careers.children[0].parent, careers);
    assert.deepEqual(titles(tree.children[1].children), ['AI']);
  });

  it('titles a page without a title from its path', () => {
    assert.equal(pageTree(rows, '/en/dummy-pages', 1).children[0].title, 'careers');
  });

  it('places a page whose parent page is not indexed under its nearest indexed ancestor', () => {
    // /en/dummy-pages itself isn't a row (an unpublished folder page): its pages hang off /en
    const tree = pageTree(rows, '/en', 3);
    assert.deepEqual(titles(tree.children), ['Home', 'careers', 'Insights', 'What we do']);
    const careers = tree.children[1];
    assert.equal(careers.parent, tree);
    assert.deepEqual(titles(careers.children), ['Graduates']);
    // the depth still counts path levels below the root: /en/dummy-pages/careers/graduates/india
    // (4 levels) is left out
    assert.deepEqual(careers.children[0].children, []);
    assert.deepEqual(titles(tree.children[2].children), ['AI']);
  });

  it('keeps the tree as it was when every parent page is indexed', () => {
    const indexed = [...rows, { path: '/en/dummy-pages', title: 'Pages' }];
    const tree = pageTree(indexed, '/en', 2);
    // path order: /en/dummy-pages before /en/home
    assert.deepEqual(titles(tree.children), ['Pages', 'Home']);
    assert.deepEqual(titles(tree.children[0].children), ['careers', 'Insights', 'What we do']);
    assert.equal(tree.children[0].children[0].parent, tree.children[0]);
  });

  it('is empty for a root without pages below it (e.g. a Menu root path on a leaf page)', () => {
    assert.deepEqual(pageTree(rows, '/en/home', 3).children, []);
    assert.deepEqual(pageTree([], '/en', 3).children, []);
    assert.deepEqual(pageTree(undefined, '/en', 3).children, []);
  });

  it('takes / as the whole site', () => {
    assert.equal(pageTree([{ path: '/en', title: 'English' }], '/', 1).children[0].title, 'English');
  });
});
