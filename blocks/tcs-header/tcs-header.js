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
 * A link to a menu page, marked as the current page when it is
 */
function menuLink(node, currentPath, className) {
  const link = document.createElement('a');
  link.className = className;
  link.href = node.path;
  link.textContent = node.title;
  if (currentPath === normalizePath(node.path)) link.setAttribute('aria-current', 'page');
  return link;
}

/**
 * Builds the Mobile Drawer: the main view (L1 accordions with their L2 pages, the AI search)
 * and the L3 panel, which replaces the main view while an L2 page's children are shown
 * @returns {{ drawer: Element, showMain: Function }} showMain returns to the main view
 */
async function buildMobileDrawer(root, depth, t) {
  const drawer = document.createElement('div');
  drawer.className = 'tcs-header-menu-drawer';
  drawer.id = `tcs-header-menu-${crypto.randomUUID()}`;
  drawer.hidden = true;

  const content = document.createElement('div');
  content.className = 'tcs-header-drawer-content';

  const tree = await loadMenuTree(root, depth);
  const currentPath = normalizePath(window.location.pathname);

  const main = document.createElement('div');
  main.className = 'tcs-header-drawer-main';

  const accordionList = document.createElement('div');
  accordionList.className = 'tcs-header-accordion-list';

  const l3Panel = document.createElement('div');
  l3Panel.className = 'tcs-header-l3-panel';
  l3Panel.id = `${drawer.id}-l3`;
  l3Panel.hidden = true;

  // the L2 button that opened the L3 panel: focus returns to it on Back
  let drillTrigger = null;

  const showMain = ({ restoreFocus = false } = {}) => {
    l3Panel.hidden = true;
    l3Panel.replaceChildren();
    main.hidden = false;
    if (drillTrigger) {
      drillTrigger.setAttribute('aria-expanded', 'false');
      if (restoreFocus) drillTrigger.focus();
      drillTrigger = null;
    }
  };

  const showL3 = (l1Node, l2Node, trigger) => {
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'tcs-header-l3-back';
    back.textContent = `${t('backTo', 'Back to')} ${l1Node.title}`;
    back.addEventListener('click', () => showMain({ restoreFocus: true }));

    const list = document.createElement('ul');
    list.className = 'tcs-header-l3-list';
    list.setAttribute('aria-label', l2Node.title);
    l2Node.children.forEach((l3Node) => {
      const li = document.createElement('li');
      li.append(menuLink(l3Node, currentPath, 'tcs-header-l3-link'));
      list.append(li);
    });

    l3Panel.replaceChildren(back, list);
    main.hidden = true;
    l3Panel.hidden = false;
    drillTrigger = trigger;
    trigger.setAttribute('aria-expanded', 'true');
    drawer.scrollTop = 0;
    back.focus();
  };

  const setOpen = (item, open) => {
    item.classList.toggle('is-open', open);
    item.querySelector('.tcs-accordion-toggle')?.setAttribute('aria-expanded', String(open));
    const submenu = item.querySelector('.tcs-accordion-submenu');
    if (submenu) submenu.hidden = !open;
  };

  tree.children.forEach((l1Node, index) => {
    const item = document.createElement('div');
    item.className = 'tcs-accordion-item';

    // the L1 label goes to its page; the row and its chevron button open the accordion
    const heading = document.createElement('div');
    heading.className = 'tcs-accordion-header';
    heading.append(menuLink(l1Node, currentPath, 'tcs-accordion-label'));
    item.append(heading);

    if (l1Node.children.length) {
      const submenu = document.createElement('ul');
      submenu.className = 'tcs-accordion-submenu';
      submenu.id = `${drawer.id}-l1-${index + 1}`;
      submenu.hidden = true;

      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'tcs-accordion-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', submenu.id);
      toggle.setAttribute('aria-label', `${l1Node.title} ${t('submenu', 'submenu')}`);
      const chevron = document.createElement('span');
      chevron.className = 'tcs-accordion-chevron';
      toggle.append(chevron);
      heading.append(toggle);

      toggle.addEventListener('click', () => {
        const open = !item.classList.contains('is-open');
        accordionList.querySelectorAll('.tcs-accordion-item').forEach((other) => setOpen(other, false));
        setOpen(item, open);
      });
      heading.addEventListener('click', (event) => {
        if (!event.target.closest('a, button')) toggle.click();
      });

      l1Node.children.forEach((l2Node) => {
        const li = document.createElement('li');
        if (l2Node.children.length) {
          // an L2 page with children opens the L3 panel
          const drill = document.createElement('button');
          drill.type = 'button';
          drill.className = 'tcs-submenu-drill';
          drill.setAttribute('aria-expanded', 'false');
          drill.setAttribute('aria-controls', l3Panel.id);
          const label = document.createElement('span');
          label.className = 'tcs-submenu-drill-label';
          label.textContent = l2Node.title;
          const icon = document.createElement('span');
          icon.className = 'tcs-submenu-drill-icon';
          drill.append(label, icon);
          drill.addEventListener('click', () => showL3(l1Node, l2Node, drill));
          li.append(drill);
        } else {
          li.append(menuLink(l2Node, currentPath, 'tcs-submenu-link'));
        }
        submenu.append(li);
      });

      item.append(submenu);
    }

    accordionList.append(item);
  });

  main.append(accordionList, buildMobileSearch());
  content.append(main, l3Panel);
  drawer.append(content);

  return { drawer, showMain };
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

    const positions = {
      desktop: textOf(props.headerdesktopposition).toLowerCase() || 'float',
      tablet: textOf(props.headertabletposition).toLowerCase() || 'sticky',
      mobile: textOf(props.headermobileposition).toLowerCase() || 'sticky',
    };

    if (setHeaderPosition.length >= 2) {
      setHeaderPosition('', positions);
    } else {
      setHeaderPosition(positions);
    }

    document.documentElement.setAttribute('data-header-position-desktop', positions.desktop);
    document.documentElement.setAttribute('data-header-position-tablet', positions.tablet);
    document.documentElement.setAttribute('data-header-position-mobile', positions.mobile);
    document.documentElement.removeAttribute('data-header-position');
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
  const { drawer, showMain } = await buildMobileDrawer(root, depth, t);
  toggleBtn.setAttribute('aria-controls', drawer.id);

  const setMenuOpen = (nextState) => {
    toggleBtn.setAttribute('aria-expanded', String(nextState));
    drawer.hidden = !nextState;
    // closing the menu returns it to the main (L1) view; open accordions stay open
    if (!nextState) showMain();
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
