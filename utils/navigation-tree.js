/*
 * Navigation tree (pure, unit tested in test/navigation/): the site navigation, at most three
 * levels (L1 > L2 > L3), built from the published pages below a root (the query index rows, see
 * utils/navigation.js). No DOM, no fetch.
 * - label: the page's Navigation Title (nav-title), else its title, else its name
 * - order: Navigation Order (nav-order) ascending; pages without one follow, by path
 * - hidden: a page with Hide in navigation (hide-in-nav) is left out with its sub-pages; a page
 *   whose parent isn't published (or is hidden) can't be reached and is left out too
 * - only site paths (starting with one /) count; the root itself isn't an item
 */

export const MAX_DEPTH = 3;

const YES = ['yes', 'true', '1', 'on', 'y'];
const isYes = (value) => YES.includes(String(value ?? '').trim().toLowerCase());

/** a site path without a trailing slash or .html ('/' for the root), '' when it isn't one */
export function normalizePath(path) {
  const value = String(path ?? '').trim();
  if (!/^\/(?!\/)/.test(value) || /[\s<>"'`]/.test(value)) return '';
  return value.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
}

const orderOf = (value) => {
  if (value === null || value === undefined || String(value).trim() === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

/** the label of a page: Navigation Title, title, else its name ("our-brand" → "our brand") */
export function navigationLabel(page) {
  const label = String(page.navTitle || page.title || '').trim();
  if (label) return label;
  const name = normalizePath(page.path).split('/').pop() || '';
  return decodeURIComponent(name).replace(/-/g, ' ');
}

const byOrder = (a, b) => {
  if (a.order !== b.order) {
    if (a.order === null) return 1;
    if (b.order === null) return -1;
    return a.order - b.order;
  }
  return a.path.localeCompare(b.path);
};

/**
 * Builds the navigation tree below a root.
 * @param {Array<{ path: string, title?: string, navTitle?: string, navOrder?: string|number,
 *   hideInNav?: string|boolean }>} pages
 * @param {{ root?: string, depth?: number }} [options] depth: levels below the root (1-3)
 * @returns {{ path: string, title: string, parent: null, children: Array }} the root node; each
 *   node is { path, title, order, parent, children }
 */
export function buildNavigationTree(pages = [], { root = '/', depth = 1 } = {}) {
  const base = normalizePath(root) === '/' ? '' : normalizePath(root);
  const levels = Math.min(MAX_DEPTH, Math.max(1, Math.floor(Number(depth)) || 1));
  const tree = {
    path: base || '/', title: '', order: null, parent: null, children: [],
  };
  if (root && !normalizePath(root)) return tree;
  const levelOf = (path) => path.slice(base.length).split('/').filter(Boolean).length;
  const rows = new Map();
  (Array.isArray(pages) ? pages : []).forEach((page) => {
    const path = normalizePath(page?.path);
    if (!path || !path.startsWith(`${base}/`) || rows.has(path)) return;
    const level = levelOf(path);
    if (level >= 1 && level <= levels) rows.set(path, { ...page, path, level });
  });
  const nodes = new Map([[tree.path, tree]]);
  [...rows.values()]
    .sort((a, b) => a.level - b.level || a.path.localeCompare(b.path))
    .forEach((page) => {
      const parent = nodes.get(page.path.slice(0, page.path.lastIndexOf('/')) || '/');
      if (!parent || isYes(page.hideInNav)) return;
      const node = {
        path: page.path,
        title: navigationLabel(page),
        order: orderOf(page.navOrder),
        parent,
        children: [],
      };
      parent.children.push(node);
      nodes.set(page.path, node);
    });
  const sort = (node) => {
    node.children.sort(byOrder);
    node.children.forEach(sort);
  };
  sort(tree);
  return tree;
}

/** the node of a path in the tree, or null */
export function findNode(tree, path) {
  const target = normalizePath(path);
  if (!tree || !target) return null;
  if (tree.path === target) return tree;
  for (let i = 0; i < tree.children.length; i += 1) {
    const found = findNode(tree.children[i], target);
    if (found) return found;
  }
  return null;
}

/** whether a node is the ancestor node or below it */
export function isWithin(node, ancestor) {
  for (let n = node; n; n = n.parent) if (n === ancestor) return true;
  return false;
}
