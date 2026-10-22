// The site tree of the TCS Header's tablet / mobile menu (utils/query-index.js pageTree): node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { pageTree } from '../../utils/query-index.js';

const rows = [
  { path: '/en/home', title: 'Home' },
  { path: '/en/home/what-we-do/industries', title: 'Industries' },
  { path: '/en/home/what-we-do', title: 'What we do' },
  { path: '/en/home/who-we-are', title: '' },
  { path: '/en/home/what-we-do/industries/banking', title: 'Banking' },
  { path: '/en/home/what-we-do/industries/banking/core', title: 'Core' },
  { path: '/en/other/page', title: 'Other' },
];

const titles = (nodes) => nodes.map(({ title }) => title);

describe('pageTree', () => {
  it('lists the pages below the root in path order, a level per depth', () => {
    const tree = pageTree(rows, '/en/home', 1);
    assert.equal(tree.path, '/en/home');
    assert.deepEqual(titles(tree.children), ['What we do', 'who we are']);
    assert.ok(tree.children.every((node) => !node.children.length));
  });

  it('nests the levels up to the depth, with parent links', () => {
    const tree = pageTree(rows, '/en/home/', 3);
    const whatWeDo = tree.children[0];
    assert.deepEqual(titles(whatWeDo.children), ['Industries']);
    assert.deepEqual(titles(whatWeDo.children[0].children), ['Banking']);
    assert.equal(whatWeDo.children[0].parent, whatWeDo);
    // 4 levels below the root: beyond the depth
    assert.deepEqual(whatWeDo.children[0].children[0].children, []);
  });

  it('titles a page without a title from its path', () => {
    assert.equal(pageTree(rows, '/en/home', 1).children[1].title, 'who we are');
  });

  it('leaves out a page whose parent page is not indexed', () => {
    // /en/other isn't a row
    assert.deepEqual(titles(pageTree(rows, '/en', 2).children), ['Home']);
  });

  it('is empty for a root without pages below it or without rows', () => {
    assert.deepEqual(pageTree(rows, '/en/home/who-we-are', 3).children, []);
    assert.deepEqual(pageTree([], '/en', 3).children, []);
    assert.deepEqual(pageTree(undefined, '/en', 3).children, []);
  });
});
