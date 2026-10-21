import { loadFragment } from '../fragment/fragment.js';
import { prepareMotion } from '../../decorators/motion-decorator.js';
import { removeButtonDecoration } from '../../decorators/button-decorator.js';
import { createIdFactory } from '../../utils/ids.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';
import { rememberHeaderSpace } from '../../utils/header-space.js';
import { getInheritedMetadata } from '../../utils/inherited-metadata.js';
import { resolvePagePath } from '../../utils/site.js';
import { buildQueryIndexNav } from '../tcs-header/tcs-header.js';

let t = (key, fallback, values) => fillPlaceholder(fallback, values);

const isDesktop = window.matchMedia('(min-width: 1200px)');
const dropsOf = (navSections) => [...(navSections?.querySelectorAll('.nav-drop') || [])];
const labels = new WeakMap();

/** Updates navigation level title and back button state */
function updateLevel(navSections) {
  const level = navSections?.querySelector(':scope > .nav-level');
  if (!level) return;
  const open = dropsOf(navSections).filter((drop) => drop.dataset.expanded === 'true').pop();

  level.querySelector('.nav-level-title').textContent = open ? labels.get(open) : t('menu', 'Menu');
  level.querySelector('.nav-level-back').hidden = !open;
  navSections.classList.toggle('nav-sections-level', !!open);
}

/** Opens or closes a dropdown item */
function setDrop(drop, expanded) {
  drop.dataset.expanded = String(expanded);
  drop.querySelector(':scope > .nav-drop-toggle')?.setAttribute('aria-expanded', String(expanded));
}

/** Closes a section and all nested children */
function closeDrop(drop) {
  [drop, ...dropsOf(drop)].forEach((d) => setDrop(d, false));
}

/** Resets all sections to root level */
function toggleAllNavSections(sections, expanded = false) {
  dropsOf(sections).forEach((drop) => setDrop(drop, expanded));
  updateLevel(sections);
}

/** Opens or closes the full-screen mobile menu overlay */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.dataset.expanded === 'true';
  const button = nav.querySelector('.nav-hamburger button, .tcs-header-hamburger button');

  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.dataset.expanded = expanded ? 'false' : 'true';

  toggleAllNavSections(navSections, false);
  const open = !!navSections && !expanded && !isDesktop.matches;

  document.querySelectorAll('main, footer').forEach((el) => { el.inert = open; });
  button?.setAttribute('aria-expanded', String(open));
  button?.setAttribute('aria-label', expanded ? t('openNavigation', 'Open navigation') : t('closeNavigation', 'Close navigation'));
}

/** Escape key handler */
function closeOnEscape(e) {
  if (e.key !== 'Escape' || isDesktop.matches) return;
  const nav = document.getElementById('nav');
  if (nav?.dataset.expanded !== 'true') return;
  toggleMenu(nav, nav.querySelector('.nav-sections'), false);
  nav.querySelector('.nav-hamburger button, .tcs-header-hamburger button')?.focus();
}

/** Focus loss handler */
function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!e.relatedTarget || nav.contains(e.relatedTarget) || isDesktop.matches) return;
  if (nav.dataset.expanded === 'true') toggleMenu(nav, nav.querySelector('.nav-sections'), false);
}

function decorateDrop(drop, nextId) {
  drop.classList.add('nav-drop');
  const submenu = drop.querySelector(':scope > ul');
  const label = [...drop.childNodes].find((node) => node !== submenu
    && (node.nodeType === Node.ELEMENT_NODE || node.textContent.trim()));
  const text = label?.textContent.trim() || '';
  labels.set(drop, text);

  submenu.id = submenu.id || nextId(text);
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-drop-toggle';
  toggle.setAttribute('aria-controls', submenu.id);
  toggle.setAttribute('aria-expanded', 'false');

  if (label?.nodeType === Node.ELEMENT_NODE && (label.matches('a[href]') || label.querySelector('a[href]'))) {
    toggle.setAttribute('aria-label', t('showSubmenu', 'Show {label} menu', { label: text }));
    label.after(toggle);
  } else {
    toggle.textContent = text;
    label?.replaceWith(toggle);
    if (!label) drop.prepend(toggle);
  }

  drop.dataset.expanded = 'false';
  toggle.addEventListener('click', () => {
    const navSections = drop.closest('.nav-sections');
    if (drop.dataset.expanded === 'true') {
      closeDrop(drop);
      updateLevel(navSections);
      return;
    }

    [...drop.parentElement.children].filter((item) => item.matches('.nav-drop') && item !== drop)
      .forEach(closeDrop);
    setDrop(drop, true);
    updateLevel(navSections);
    navSections.querySelector('.nav-level-back')?.focus();
  });
}

/** Builds the level header (Back arrow + level title) */
function buildLevel(navSections) {
  const level = document.createElement('div');
  level.className = 'nav-level';

  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'nav-level-back';
  back.setAttribute('aria-label', t('back', 'Back'));
  back.hidden = true;
  back.addEventListener('click', () => {
    const open = dropsOf(navSections).filter((drop) => drop.dataset.expanded === 'true').pop();
    if (!open) return;
    closeDrop(open);
    updateLevel(navSections);
    open.querySelector(':scope > .nav-drop-toggle')?.focus();
  });

  const title = document.createElement('h2');
  title.className = 'nav-level-title';
  title.textContent = t('menu', 'Menu');

  level.append(back, title);
  return level;
}

/** Builds a fallback hamburger button if tcs-header is omitted */
function buildFallbackHamburger(nav, navSections) {
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';

  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-controls', 'nav-sections');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', t('openNavigation', 'Open navigation'));

  const icon = document.createElement('span');
  icon.className = 'nav-hamburger-icon';
  icon.setAttribute('aria-hidden', 'true');

  button.append(icon);
  button.addEventListener('click', () => toggleMenu(nav, navSections));
  hamburger.append(button);
  return hamburger;
}

/** Extracts TCS Brand, TATA Group logos, Hamburger button, and authored settings from tcs-header */
function applyLogoBar(nav) {
  const bar = nav.querySelector(':scope > .section .tcs-header');
  if (!bar) return null;

  const menuRootPath = bar.dataset.menuRootPath || '';
  const menuDepth = bar.dataset.menuDepth || '';
  const bgStyle = bar.dataset.bgStyle || 'transparent';
  const positionStyle = bar.dataset.positionStyle || 'sticky';

  const asSection = (element, role) => {
    const section = document.createElement('div');
    section.className = `section nav-${role}`;
    if (element) {
      if (role === 'hamburger') {
        section.append(element);
      } else {
        const p = document.createElement('p');
        p.append(element);
        section.append(p);
      }
    }
    return section;
  };

  const brand = asSection(bar.querySelector('.tcs-header-brand'), 'brand');
  const tools = asSection(bar.querySelector('.tcs-header-group'), 'tools');
  const hamburger = bar.querySelector('.tcs-header-hamburger, .nav-hamburger');

  bar.closest('.section').replaceWith(brand);

  const menu = [...nav.children].find((section) => section !== brand);
  if (menu) menu.classList.add('nav-sections');
  (menu || brand).after(tools);

  return { brand, tools, hamburger, menuRootPath, menuDepth, bgStyle, positionStyle };
}

/** Main header block decorator */
export default async function decorate(block) {
  const defaultPath = resolvePagePath('', 'references/nav');
  const defaultFragment = loadFragment(defaultPath);

  const navFragment = getInheritedMetadata('nav').then(async (value) => {
    const navPath = resolvePagePath(value, 'references/nav');
    if (navPath === defaultPath) return defaultFragment;
    return await loadFragment(navPath) || defaultFragment;
  });

  const [placeholders, fragment] = await Promise.all([getPlaceholders(), navFragment]);
  t = placeholders;

  block.textContent = '';
  if (!fragment) return;

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', t('mainNavigation', 'Main navigation'));
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const canvasSections = [...nav.children]
    .filter((section) => section.querySelector('.conversation-canvas'));

  canvasSections.forEach((section) => {
    const bar = section.querySelector('.tcs-header');
    if (bar) {
      const own = document.createElement('div');
      own.className = 'section';
      own.append(bar.closest('.tcs-header-wrapper') || bar);
      section.before(own);
    }
    section.remove();
  });

  const extractedBar = applyLogoBar(nav);

  if (!extractedBar) {
    const classes = ['brand', 'sections', 'tools'];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) section.classList.add(`nav-${c}`);
    });
  }

  const navBrand = nav.querySelector('.nav-brand');
  if (navBrand) removeButtonDecoration(navBrand.querySelector('.button, .link-button'));

  let navSections = nav.querySelector('.nav-sections');

  if (!navSections || !navSections.querySelector('ul')) {
    if (!navSections) {
      navSections = document.createElement('div');
      navSections.className = 'section nav-sections';
      const navTools = nav.querySelector('.nav-tools');
      if (navTools) nav.insertBefore(navSections, navTools);
      else nav.append(navSections);
    }
    const dynamicContent = await buildQueryIndexNav(extractedBar?.menuRootPath, extractedBar?.menuDepth);
    navSections.append(dynamicContent);
  }

  if (navSections) {
    navSections.id = 'nav-sections';
    const nextId = createIdFactory('nav-submenu');
    navSections.querySelectorAll(':scope .default-content-wrapper li').forEach((navSection) => {
      if (navSection.querySelector(':scope > ul')) decorateDrop(navSection, nextId);
    });
    navSections.prepend(buildLevel(navSections));
  }

  let hamburger;
  if (extractedBar?.hamburger) {
    hamburger = extractedBar.hamburger;
    const btn = hamburger.querySelector('button');
    btn?.addEventListener('click', () => toggleMenu(nav, navSections));
  } else {
    hamburger = navSections ? buildFallbackHamburger(nav, navSections) : null;
  }

  if (hamburger && navSections) navSections.before(hamburger);

  const navTools = nav.querySelector('.nav-tools');
  if (navTools && hamburger) hamburger.before(navTools);

  nav.dataset.expanded = 'false';
  toggleMenu(nav, navSections, isDesktop.matches);

  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));
  window.addEventListener('keydown', closeOnEscape);
  nav.addEventListener('focusout', closeOnFocusLost);

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';

  // Apply authored background style and position style classes to wrapper/nav
  if (extractedBar?.bgStyle) navWrapper.dataset.bgStyle = extractedBar.bgStyle;
  if (extractedBar?.positionStyle) navWrapper.dataset.positionStyle = extractedBar.positionStyle;

  navWrapper.append(nav);
  block.append(navWrapper);

  if (canvasSections.length) {
    const navCanvas = document.createElement('div');
    navCanvas.className = 'nav-canvas';
    navCanvas.append(...canvasSections);
    block.append(navCanvas);
    await prepareMotion(navCanvas);
  }

  const header = block.closest('header') || block;
  const setHeight = () => {
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight / 16}rem`);
  };
  setHeight();
  rememberHeaderSpace(header);
  new ResizeObserver(setHeight).observe(header);
}