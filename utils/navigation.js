/*
 * Site navigation data: the navigation tree (utils/navigation-tree.js) of the published pages
 * below a root, from the query index (loaded once per page, utils/query-index.js) with the
 * Navigation Title (nav-title), Navigation Order (nav-order) and Hide in navigation
 * (hide-in-nav) page properties. One tree per root and depth, shared by its users
 * (blocks/conversation-canvas, blocks/header).
 */
import { columnOf, getPages } from './query-index.js';
import { buildNavigationTree } from './navigation-tree.js';

export {
  MAX_DEPTH, findNode, isWithin, normalizePath,
} from './navigation-tree.js';

const trees = new Map();

/**
 * The navigation tree below a root; an empty tree when the index can't be loaded.
 * @param {string} root Site path of the navigation root (e.g. /en/home)
 * @param {number} depth Levels below the root (1-3)
 * @returns {Promise<Object>}
 */
export function loadNavigationTree(root, depth) {
  const key = `${root}|${depth}`;
  if (!trees.has(key)) {
    trees.set(key, getPages()
      .then((pages) => pages.map((page) => ({
        path: page.path,
        title: page.title,
        navTitle: columnOf(page, 'nav-title'),
        navOrder: columnOf(page, 'nav-order'),
        hideInNav: columnOf(page, 'hide-in-nav'),
      })))
      .catch(() => [])
      .then((pages) => buildNavigationTree(pages, { root, depth })));
  }
  return trees.get(key);
}
