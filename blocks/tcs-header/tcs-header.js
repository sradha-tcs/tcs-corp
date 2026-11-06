import { pictureOf } from '../../decorators/image-decorator.js';
import { setHeaderOverlay, setHeaderPosition } from '../../utils/header-space.js';
import { linkOf } from '../../utils/links.js';
import { readProperties, textOf } from '../../utils/properties.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { toSitePath } from '../../utils/urls.js';
import { getLocale } from '../../utils/site.js';
import { getPages } from '../../utils/query-index.js';

const normalizePath = (path) => path.replace(/\.html$/, '').replace(/\/$/, '') || '/';

/**
 * Builds the page tree using query-index.json
 */
async function loadMenuTree(root, depth = 3) {
  const base = root === '/' ? '' : root.replace(/\/$/, '');
  const tree = {
    path: base || '/',
    title: 'Home',
    parent: null,
    children: [],
    level: 0,
  };

  try {
    const data = await getPages();
    const levelOf = (path) => path.slice(base.length).split('/').filter(Boolean).length;
    const nodes = new Map([[tree.path, tree]]);

    data
      .filter(({ path }) => path.startsWith(`${base}/`) && levelOf(path) >= 1 && levelOf(path) <= depth)
      .sort((x, y) => levelOf(x.path) - levelOf(y.path) || y.path.localeCompare(x.path))
      .forEach(({ path, title }) => {
        const parentPath = path.slice(0, path.lastIndexOf('/')) || '/';
        const parent = nodes.get(parentPath);
        if (!parent) return;

        const node = {
          path,
          title: title || path.split('/').pop().replace(/-/g, ' '),
          parent,
          children: [],
          level: levelOf(path),
        };
        parent.children.push(node);
        nodes.set(path, node);
      });
  } catch (e) {
    console.error('Failed to load menu tree:', e);
  }

  return tree;
}

/**
 * Resolves the menu root and depth
 */
function menuSettings(props) {
  let root = toSitePath(props.menurootpath?.querySelector('a')?.getAttribute('href') || textOf(props.menurootpath));
  const depth = Math.max(1, parseInt(textOf(props.menudepth), 10) || 3);

  if (!root) {
    const current = window.location.pathname;
    if (current.includes('/curated-design-pages')) {
      const idx = current.indexOf('/curated-design-pages') + '/curated-design-pages'.length;
      root = current.slice(0, idx);
    } else {
      root = getLocale().root || '/';
    }
  }

  return { root, depth };
}

/**
 * Creates the Mobile Bottom AI Search / Input Bar
 */
function buildMobileSearch() {
  const container = document.createElement('div');
  container.className = 'tcs-header-mobile-search';

  const form = document.createElement('form');
  form.className = 'tcs-header-search-form';
  form.setAttribute('role', 'search');

  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'q';
  input.placeholder = 'Ask us about transformation...';
  input.autocomplete = 'off';

  const mic = document.createElement('button');
  mic.type = 'button';
  mic.className = 'tcs-header-mic-btn';
  mic.setAttribute('aria-label', 'Search by voice');

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'tcs-header-submit-btn';
  submit.setAttribute('aria-label', 'Submit search');
  submit.disabled = true;

  input.addEventListener('input', () => {
    submit.disabled = !input.value.trim();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
    }
  });

  form.append(input, mic, submit);
  container.append(form);
  return container;
}

/**
 * Builds the Mobile Drawer with accordion hierarchy
 */
async function buildMobileDrawer(root, depth) {
  const drawer = document.createElement('div');
  drawer.className = 'tcs-header-menu-drawer';
  drawer.hidden = true;

  const content = document.createElement('div');
  content.className = 'tcs-header-drawer-content';

  const tree = await loadMenuTree(root, depth);
  const currentPath = normalizePath(window.location.pathname);

  const accordionList = document.createElement('div');
  accordionList.className = 'tcs-header-accordion-list';

  tree.children.forEach((l1Node) => {
    const item = document.createElement('div');
    item.className = 'tcs-accordion-item';

    const header = document.createElement('button');
    header.type = 'button';
    header.className = 'tcs-accordion-header';
    header.setAttribute('aria-expanded', 'false');

    const label = document.createElement('span');
    label.className = 'tcs-accordion-label';
    label.textContent = l1Node.title;

    const chevron = document.createElement('span');
    chevron.className = 'tcs-accordion-chevron';

    header.append(label, chevron);
    item.append(header);

    if (l1Node.children && l1Node.children.length > 0) {
      const l2List = document.createElement('ul');
      l2List.className = 'tcs-accordion-submenu';
      l2List.hidden = true;

      l1Node.children.forEach((l2Node) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = l2Node.path;
        link.textContent = l2Node.title;

        if (currentPath === normalizePath(l2Node.path)) {
          link.setAttribute('aria-current', 'page');
        }

        li.append(link);
        l2List.append(li);
      });

      item.append(l2List);

      header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        accordionList.querySelectorAll('.tcs-accordion-header').forEach((h) => {
          h.setAttribute('aria-expanded', 'false');
          const parentItem = h.closest('.tcs-accordion-item');
          parentItem.classList.remove('is-open');
          const submenu = parentItem.querySelector('.tcs-accordion-submenu');
          if (submenu) submenu.hidden = true;
        });

        if (!isExpanded) {
          header.setAttribute('aria-expanded', 'true');
          item.classList.add('is-open');
          l2List.hidden = false;
        }
      });
    } else {
      header.addEventListener('click', () => {
        window.location.href = l1Node.path;
      });
    }

    accordionList.append(item);
  });

  content.append(accordionList);
  content.append(buildMobileSearch());
  drawer.append(content);

  return drawer;
}

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

export default async function decorate(block) {
  const props = readProperties(block);

  const inHeader = !block.isConnected || !!block.closest('header') || !!block.closest('.nav-wrapper');
  if (inHeader) {
    setHeaderOverlay(textOf(props.headeroverlay).toLowerCase());
    setHeaderPosition(textOf(props.headerposition).toLowerCase(), {
      desktop: textOf(props.headerdesktopposition).toLowerCase() || 'float',
      tablet: textOf(props.headertabletposition).toLowerCase() || 'sticky',
      mobile: textOf(props.headermobileposition).toLowerCase() || 'sticky',
    });
  }

  const t = await getPlaceholders();
  const { root, depth } = menuSettings(props);

  const bar = document.createElement('div');
  bar.className = 'tcs-header-bar';

  const brandLogo = buildLogo(props.tcslogo, props.tcslogoalt, props.tcslogolink, 'tcs-header-brand', t('tcsLogo', 'Tata Consultancy Services'));
  const tataLogo = buildLogo(props.tatalogo, props.tatalogoalt, props.tatalogolink, 'tcs-header-group', t('tataLogo', 'TATA Group'));

  // Hamburger toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'tcs-header-menu-toggle';
  toggleBtn.setAttribute('aria-label', t('mainNavigation', 'Main navigation'));
  toggleBtn.setAttribute('aria-expanded', 'false');

  // Build the complete drawer
  const drawer = await buildMobileDrawer(root, depth);
  drawer.id = `tcs-header-menu-${crypto.randomUUID()}`;
  toggleBtn.setAttribute('aria-controls', drawer.id);

  const setMenuOpen = (nextState) => {
    toggleBtn.setAttribute('aria-expanded', String(nextState));
    drawer.hidden = !nextState;
    document.body.classList.toggle('nav-menu-open', nextState);

    // If the drawer was moved by header.js, ensure it syncs
    const targetDrawer = document.querySelector('.tcs-header-menu-drawer') || drawer;
    targetDrawer.hidden = !nextState;

    document.dispatchEvent(new CustomEvent('header:menu', { detail: { open: nextState } }));
  };

  toggleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    setMenuOpen(toggleBtn.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      toggleBtn.focus();
    }
  });

  window.matchMedia('(min-width: 1200px)').addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(false);
  });

  bar.append(...[brandLogo, tataLogo, toggleBtn].filter(Boolean));
  block.replaceChildren(bar, drawer);

  // If header nav already exists, inject drawer directly into nav-wrapper
  const navWrapper = block.closest('.nav-wrapper') || document.querySelector('header .nav-wrapper');
  if (navWrapper && !navWrapper.contains(drawer)) {
    navWrapper.append(drawer);
  }
}
