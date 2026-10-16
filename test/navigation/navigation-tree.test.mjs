/* Unit tests of the navigation tree (utils/navigation-tree.js): L1 > L2 > L3 from the published pages */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNavigationTree, findNode, isWithin, navigationLabel, normalizePath, MAX_DEPTH,
} from '../../utils/navigation-tree.js';

const ROOT = '/en/home';
const page = (path, extra = {}) => ({ path: `${ROOT}${path}`, title: path.split('/').pop(), ...extra });
const labels = (node) => node.children.map((child) => child.title);

const SITE = [
  page('/who-we-are', { title: 'Who we are', navOrder: '2' }),
  page('/what-we-do', { title: 'What we do', navOrder: '1' }),
  page('/what-we-do/services', { title: 'Services', navOrder: '1' }),
  page('/what-we-do/industries', { title: 'Industries', navOrder: '2' }),
  page('/what-we-do/industries/banking', { title: 'Banking', navOrder: '1' }),
  page('/what-we-do/industries/banking/retail-banking', { title: 'Retail banking' }),
  page('/insights', { title: 'Insights', navOrder: '3' }),
];

describe('navigation tree', () => {
  it('is empty for an empty or invalid list of pages', () => {
    assert.deepEqual(buildNavigationTree([], { root: ROOT, depth: 3 }).children, []);
    assert.deepEqual(buildNavigationTree(null, { root: ROOT, depth: 3 }).children, []);
  });

  it('builds L1 only at depth 1', () => {
    const tree = buildNavigationTree(SITE, { root: ROOT, depth: 1 });
    assert.deepEqual(labels(tree), ['What we do', 'Who we are', 'Insights']);
    assert.ok(tree.children.every((node) => !node.children.length));
  });

  it('builds L1 > L2 > L3 and never more than three levels', () => {
    const tree = buildNavigationTree(SITE, { root: ROOT, depth: 9 });
    const industries = findNode(tree, `${ROOT}/what-we-do/industries`);
    assert.deepEqual(labels(industries), ['Banking']);
    assert.deepEqual(findNode(tree, `${ROOT}/what-we-do/industries/banking`).children, []);
    assert.equal(MAX_DEPTH, 3);
  });

  it('orders siblings by Navigation Order, then pages without one by path', () => {
    const tree = buildNavigationTree([
      page('/b', { title: 'B' }), page('/a', { title: 'A' }),
      page('/c', { title: 'C', navOrder: '2' }), page('/d', { title: 'D', navOrder: 1 }),
      page('/e', { title: 'E', navOrder: 'not a number' }),
    ], { root: ROOT });
    assert.deepEqual(labels(tree), ['D', 'C', 'A', 'B', 'E']);
  });

  it('labels with the Navigation Title, else the title, else the page name', () => {
    const tree = buildNavigationTree([
      page('/one', { title: 'Page title', navTitle: 'Nav title' }),
      page('/our-brand', { title: '' }),
      page('/three', { title: 'Title only' }),
    ], { root: ROOT });
    assert.deepEqual(labels(tree), ['Nav title', 'our brand', 'Title only']);
    assert.equal(navigationLabel({ path: '/en/home/x', title: '  Spaced  ' }), 'Spaced');
  });

  it('keeps duplicate titles (different pages) and drops duplicate paths', () => {
    const tree = buildNavigationTree([
      page('/a', { title: 'Same' }), page('/b', { title: 'Same' }), page('/a', { title: 'Copy' }),
    ], { root: ROOT });
    assert.deepEqual(tree.children.map((node) => [node.path, node.title]), [
      [`${ROOT}/a`, 'Same'], [`${ROOT}/b`, 'Same']]);
  });

  it('leaves out hidden pages with their sub-pages', () => {
    const tree = buildNavigationTree([
      page('/a', { title: 'A', hideInNav: 'yes' }), page('/a/b', { title: 'B' }),
      page('/c', { title: 'C', hideInNav: false }), page('/d', { title: 'D', hideInNav: 'true' }),
    ], { root: ROOT, depth: 2 });
    assert.deepEqual(labels(tree), ['C']);
    assert.equal(findNode(tree, `${ROOT}/a/b`), null);
  });

  it('leaves out pages whose parent is missing (not published)', () => {
    const tree = buildNavigationTree([
      page('/a', { title: 'A' }), page('/missing/child', { title: 'Orphan' }),
    ], { root: ROOT, depth: 2 });
    assert.deepEqual(labels(tree), ['A']);
  });

  it('keeps only site paths below the root (not the root, other sites, URLs or scripts)', () => {
    const tree = buildNavigationTree([
      { path: ROOT, title: 'Home' }, { path: `${ROOT}/`, title: 'Home again' },
      { path: '/en/other', title: 'Other' }, { path: 'https://example.com/en/home/x', title: 'URL' },
      { path: '//evil.example/en/home/x', title: 'Protocol relative' },
      { path: ['javascript', 'alert(1)'].join(':'), title: 'Script' }, { path: `${ROOT}/"onmouseover`, title: 'Quote' },
      page('/ok.html', { title: 'Ok' }), page('/slash/', { title: 'Slash' }),
    ], { root: ROOT });
    assert.deepEqual(tree.children.map((node) => node.path), [`${ROOT}/ok`, `${ROOT}/slash`]);
  });

  it('accepts the root with a trailing slash and an invalid root yields nothing', () => {
    assert.equal(buildNavigationTree(SITE, { root: `${ROOT}/` }).children.length, 3);
    assert.deepEqual(buildNavigationTree(SITE, { root: ['javascript', 'x'].join(':') }).children, []);
  });

  it('keeps long and localised titles as they are', () => {
    const long = 'Communications, Media & Information Services and a very long navigation title';
    const tree = buildNavigationTree([
      page('/a', { title: long }), page('/b', { title: 'Wer wir sind' }), page('/c', { title: '私たちについて' }),
    ], { root: ROOT });
    assert.deepEqual(labels(tree), [long, 'Wer wir sind', '私たちについて']);
  });

  it('finds the current page and its ancestors', () => {
    const tree = buildNavigationTree(SITE, { root: ROOT, depth: 3 });
    const banking = findNode(tree, `${ROOT}/what-we-do/industries/banking.html`);
    const whatWeDo = findNode(tree, `${ROOT}/what-we-do/`);
    assert.ok(isWithin(banking, whatWeDo));
    assert.ok(!isWithin(whatWeDo, banking));
    assert.equal(findNode(tree, '/en/elsewhere'), null);
    assert.equal(normalizePath('/en/home/'), '/en/home');
    assert.equal(normalizePath('mailto:x'), '');
  });
});
