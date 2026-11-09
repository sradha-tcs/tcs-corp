import { getMetadata } from '../../scripts/aem.js';
import { bone, renderWhenLoaded, skeletonElement } from '../../decorators/skeleton-decorator.js';
import { isEditing } from '../../utils/environment.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { isOnByDefault, readProperties, textOf } from '../../utils/properties.js';
import { getPages, getPagesAt } from '../../utils/query-index.js';
import { getParentPages, toPublishedPath } from '../../utils/site.js';
import {
  itemsOf, levelsOf, pathKey, trailOf,
} from './breadcrumb-data.js';

/*
 * Breadcrumb (blocks/breadcrumb/_breadcrumb.json): a key-value block. The current page's parent
 * pages up to the locale's Home page (utils/site.js getParentPages), the farthest first:
 * Levels shown (levels: all, or the nearest 1 to 5) and Show current page (showCurrent, on by
 * default). Titles from the query index; pages it doesn't have (in the editor, AEM author has
 * no query index) are read from the pages themselves; a parent without a page is left out.
 */

/** a page URL (published, or an AEM page when editing) as its published lookup key */
const keyOf = (url) => pathKey(toPublishedPath(pathKey(url)));

/** the titles of the trail's pages, by keyOf */
async function loadTitles(trail) {
  const titles = new Map((await getPages()).map((page) => [keyOf(page.path), page.title]));
  const missing = trail.filter((url) => !titles.get(keyOf(url)));
  if (missing.length) {
    (await getPagesAt(missing)).forEach((page) => titles.set(keyOf(page.path), page.title));
  }
  return titles;
}

/** the skeleton while the titles load (decorators/skeleton-decorator.js) */
function buildSkeleton(count) {
  const root = skeletonElement('breadcrumb-list');
  for (let i = 0; i < count; i += 1) root.append(bone('line', 'breadcrumb-skeleton-item'));
  return root;
}

function buildTrail(items, label) {
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', label);
  const list = document.createElement('ol');
  list.className = 'breadcrumb-list';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'breadcrumb-item';
    if (item.current) {
      li.setAttribute('aria-current', 'page');
      li.textContent = item.label;
    } else {
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.label;
      li.append(link);
    }
    list.append(li);
  });
  nav.append(list);
  return nav;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const levels = levelsOf(textOf(props.levels));
  const showCurrent = isOnByDefault(props.showcurrent);
  const parents = getParentPages();
  const trail = trailOf(parents, levels);
  const home = parents[parents.length - 1];
  const current = showCurrent ? getMetadata('og:title') || document.title : '';

  const data = Promise.all([getPlaceholders(), trail.length ? loadTitles(trail) : new Map()]);
  block.replaceChildren();
  await renderWhenLoaded(block, {
    data,
    skeleton: () => buildSkeleton(trail.length + (current ? 1 : 0)),
    render: ([t, titles]) => {
      // a page without parents (the Home page, a page outside a locale) has no breadcrumb
      const items = trail.length ? itemsOf({
        trail,
        home,
        titleOf: (url) => titles.get(keyOf(url)) || '',
        homeLabel: t('home', 'Home'),
        current,
      }) : [];
      if (!items.length) {
        block.replaceChildren();
        if (isEditing()) {
          const hint = document.createElement('p');
          hint.className = 'breadcrumb-empty';
          hint.textContent = t('breadcrumbEmpty', 'Breadcrumb: shown on pages below the Home page.');
          block.append(hint);
        }
        return;
      }
      block.replaceChildren(buildTrail(items, t('breadcrumb', 'Breadcrumb')));
    },
  });
}
