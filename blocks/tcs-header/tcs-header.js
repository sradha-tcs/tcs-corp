import { pictureOf } from '../../decorators/image-decorator.js';
import { linkOf } from '../../utils/links.js';
import { readProperties, textOf } from '../../utils/properties.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';
import { getLocale } from '../../utils/site.js';
import { getPages } from '../../utils/query-index.js';
import { toSitePath } from '../../utils/urls.js';

let t = (key, fallback, values) => fillPlaceholder(fallback, values);

/**
 * Builds the logo element (link or span containing picture or alt text fallback).
 */
function buildLogo(imageCell, altCell, linkCell, className, fallback) {
  const picture = pictureOf(imageCell, altCell);
  const alt = textOf(altCell) || (textOf(linkCell) || linkOf(linkCell) ? fallback : '');
  if (!picture && !alt) return null;

  const raw = linkOf(linkCell)?.getAttribute('href') || textOf(linkCell);
  const href = /^(www\.|[a-z0-9-]+\.[a-z]{2,}(\/|$))/i.test(raw) ? `https://${raw}` : raw;

  const img = picture?.querySelector('img');
  if (img && href && !img.getAttribute('alt')?.trim()) img.alt = fallback;

  const logo = document.createElement(href ? 'a' : 'span');
  logo.className = className;
  if (href) logo.href = href;
  logo.append(picture || alt);
  return logo;
}

/**
 * Builds the hamburger menu button structure.
 */
function buildHamburger() {
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger tcs-header-hamburger';

  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-controls', 'nav-sections');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', t('openNavigation', 'Open navigation'));

  const icon = document.createElement('span');
  icon.className = 'nav-hamburger-icon';
  icon.setAttribute('aria-hidden', 'true');

  button.append(icon);
  hamburger.append(button);
  return hamburger;
}

/**
 * Fetches site pages from query-index.json based on configured root path and menu depth
 * @param {string} customRoot Optional authored menu root path
 * @param {number} customDepth Optional authored menu depth
 */
export async function buildQueryIndexNav(customRoot, customDepth) {
  const root = toSitePath(customRoot) || getLocale().root || '/';
  const depth = Math.max(1, parseInt(customDepth, 10) || 1);
  const base = root === '/' ? '' : root.replace(/\/$/, '');
  const container = document.createElement('div');
  container.className = 'default-content-wrapper';

  try {
    const pages = await getPages();
    const levelOf = (path) => path.slice(base.length).split('/').filter(Boolean).length;

    const tree = { path: base || '/', children: [] };
    const nodes = new Map([[tree.path, tree]]);

    pages
      .filter(({ path }) => path.startsWith(`${base}/`) && levelOf(path) >= 1 && levelOf(path) <= depth)
      .sort((x, y) => levelOf(x.path) - levelOf(y.path) || x.path.localeCompare(y.path))
      .forEach(({ path, title }) => {
        const parent = nodes.get(path.slice(0, path.lastIndexOf('/')) || '/');
        if (!parent) return;
        const node = { path, title: title || path.split('/').pop().replace(/-/g, ' '), children: [] };
        parent.children.push(node);
        nodes.set(path, node);
      });

    if (tree.children.length) {
      const ul = document.createElement('ul');
      tree.children.forEach((child) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = child.path;
        a.textContent = child.title;
        li.append(a);

        if (child.children.length) {
          const subUl = document.createElement('ul');
          child.children.forEach((sub) => {
            const subLi = document.createElement('li');
            const subA = document.createElement('a');
            subA.href = sub.path;
            subA.textContent = sub.title;
            subLi.append(subA);
            subUl.append(subLi);
          });
          li.append(subUl);
        }
        ul.append(li);
      });
      container.append(ul);
    }
  } catch {
    // Fallback if query-index is unavailable
  }
  return container;
}

/**
 * Main decorator for the TCS Header block.
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const placeholders = await getPlaceholders();
  t = placeholders;

  const bar = document.createElement('div');
  bar.className = 'tcs-header-bar';

  // Store authored menu settings & background/position properties on dataset
  const rootPath = linkOf(props.menurootpath)?.getAttribute('href') || textOf(props.menurootpath);
  const depth = textOf(props.menudepth);
  const bgStyle = textOf(props.headerbgstyle) || 'transparent';
  const positionStyle = textOf(props.headerpositionstyle) || 'sticky';

  if (rootPath) block.dataset.menuRootPath = rootPath;
  if (depth) block.dataset.menuDepth = depth;
  block.dataset.bgStyle = bgStyle;
  block.dataset.positionStyle = positionStyle;

  const brand = buildLogo(props.tcslogo, props.tcslogoalt, props.tcslogolink, 'tcs-header-brand', t('tcsLogo', 'Tata Consultancy Services'));
  const tools = buildLogo(props.tatalogo, props.tatalogoalt, props.tatalogolink, 'tcs-header-group', t('tataLogo', 'TATA Group'));
  const hamburger = buildHamburger();

  bar.append(...[brand, tools, hamburger].filter(Boolean));
  block.replaceChildren(bar);
}