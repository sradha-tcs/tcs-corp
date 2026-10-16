import { loadFragment } from '../fragment/fragment.js';
import { removeButtonDecoration } from '../../decorators/button-decorator.js';
import { createIdFactory } from '../../utils/ids.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';
import { getInheritedMetadata } from '../../utils/inherited-metadata.js';
import { resolvePagePath } from '../../utils/site.js';

/*
 * Header (TCS Header, Figma "New Screens from New DS"): the Navigation page (the page's
 * Navigation property, inherited from its parent pages, else the locale's references/nav) as
 * brand (TCS logo), sections and tools (TATA logo).
 * - Desktop (>= 1200px): the logo bar, TCS logo left and TATA logo right; the site navigation is
 *   in the Conversation Canvas.
 * - Tablet and mobile: the logos and a menu button that opens the sections full screen, one level
 *   at a time: a section with a sub-list opens it in place of the list, with a Back button and its
 *   label as the title.
 * The controls are buttons with aria-expanded / aria-controls; the open state is data-expanded
 * for the CSS.
 */

// UI text from the placeholders sheet; English fallbacks until it's loaded in decorate()
let t = (key, fallback, values) => fillPlaceholder(fallback, values);

// media query match of the logo bar (the menu is used below it)
const isDesktop = window.matchMedia('(min-width: 1200px)');

const dropsOf = (navSections) => [...(navSections?.querySelectorAll('.nav-drop') || [])];
const labels = new WeakMap();

/** the menu level: the deepest open section (Back button, its label as the title), else Menu */
function updateLevel(navSections) {
  const level = navSections?.querySelector(':scope > .nav-level');
  if (!level) return;
  const open = dropsOf(navSections).filter((drop) => drop.dataset.expanded === 'true').pop();
  level.querySelector('.nav-level-title').textContent = open ? labels.get(open) : t('menu', 'Menu');
  level.querySelector('.nav-level-back').hidden = !open;
  navSections.classList.toggle('nav-sections-level', !!open);
}

/** opens or closes a dropdown (its toggle button and the item's data-expanded) */
function setDrop(drop, expanded) {
  drop.dataset.expanded = String(expanded);
  drop.querySelector(':scope > .nav-drop-toggle')?.setAttribute('aria-expanded', String(expanded));
}

/** closes a section and the sections below it */
function closeDrop(drop) {
  [drop, ...dropsOf(drop)].forEach((d) => setDrop(d, false));
}

/**
 * Opens or closes all the dropdowns
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether they should be expanded
 */
function toggleAllNavSections(sections, expanded = false) {
  dropsOf(sections).forEach((drop) => setDrop(drop, expanded));
  updateLevel(sections);
}

/**
 * Opens or closes the whole nav (mobile menu)
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional: force the nav open (true) or closed (false)
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.dataset.expanded === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.dataset.expanded = expanded ? 'false' : 'true';
  // the menu opens at its first level
  toggleAllNavSections(navSections, false);
  const open = !expanded && !isDesktop.matches;
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', expanded ? t('openNavigation', 'Open navigation') : t('closeNavigation', 'Close navigation'));
  // the menu covers the page: e.g. the floating Canvas is hidden while it's open
  document.dispatchEvent(new CustomEvent('header:menu', { detail: { open } }));
}

/** Escape closes the menu (mobile), focus back on its button */
function closeOnEscape(e) {
  if (e.key !== 'Escape' || isDesktop.matches) return;
  const nav = document.getElementById('nav');
  if (nav?.dataset.expanded !== 'true') return;
  toggleMenu(nav, nav.querySelector('.nav-sections'), false);
  nav.querySelector('.nav-hamburger button')?.focus();
}

/**
 * focus moving out of the nav (e.g. tabbing past its last link) closes the menu (mobile); a tap
 * on the menu's background moves focus nowhere (no relatedTarget) and keeps it open
 */
function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!e.relatedTarget || nav.contains(e.relatedTarget) || isDesktop.matches) return;
  if (nav.dataset.expanded === 'true') toggleMenu(nav, nav.querySelector('.nav-sections'), false);
}

/**
 * A section with a sub-list: its label becomes the button that opens the sub-list as the next
 * menu level (a linked label keeps its link and gets the button next to it).
 */
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
  // the label is a link, or holds one (e.g. in a paragraph)
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
    // one open section per level
    [...drop.parentElement.children].filter((item) => item.matches('.nav-drop') && item !== drop)
      .forEach(closeDrop);
    setDrop(drop, true);
    updateLevel(navSections);
    navSections.querySelector('.nav-level-back')?.focus();
  });
}

/** the level row of the menu: Back button (closes the open level) and the level's title */
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
    // focus back on the button of the section that was open, shown again on the level above
    open.querySelector(':scope > .nav-drop-toggle')?.focus();
  });
  const title = document.createElement('h2');
  title.className = 'nav-level-title';
  title.textContent = t('menu', 'Menu');
  level.append(back, title);
  return level;
}

/**
 * A TCS Header block on the nav page (blocks/tcs-header) supplies the brand (its TCS logo) and the
 * tools (its TATA logo) in place of its section; the first other section is the menu.
 * @returns {boolean} whether the nav page has one
 */
function applyLogoBar(nav) {
  const bar = nav.querySelector(':scope > .section .tcs-header');
  if (!bar) return false;
  const asSection = (logo, role) => {
    const section = document.createElement('div');
    section.className = `section nav-${role}`;
    const p = document.createElement('p');
    if (logo) p.append(logo);
    section.append(p);
    return section;
  };
  const brand = asSection(bar.querySelector('.tcs-header-brand'), 'brand');
  const tools = asSection(bar.querySelector('.tcs-header-group'), 'tools');
  bar.closest('.section').replaceWith(brand);
  const menu = [...nav.children].find((section) => section !== brand);
  menu?.classList.add('nav-sections');
  (menu || brand).after(tools);
  return true;
}

/** the menu button (mobile), drawn by the CSS (an animated icon) */
function buildHamburger(nav, navSections) {
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

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  t = await getPlaceholders();
  // load nav as fragment: the Navigation page property of the page or, inherited, of its nearest
  // parent page up to Home (or the metadata sheet's nav column), else the locale's references/nav
  const navPath = resolvePagePath(await getInheritedMetadata('nav'), 'references/nav');
  // a configured Navigation page that can't be loaded (unpublished, moved) falls back to the
  // locale's references/nav, so the page keeps a header
  const defaultPath = resolvePagePath('', 'references/nav');
  const fragment = await loadFragment(navPath)
    || (navPath !== defaultPath ? await loadFragment(defaultPath) : null);

  // decorate nav DOM
  block.textContent = '';
  // no nav page published (e.g. a new locale): leave the header empty
  if (!fragment) return;
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', t('mainNavigation', 'Main navigation'));
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // sections with a Conversation Canvas are the header Canvas, below the nav (they aren't
  // brand, sections or tools); the canvas block itself takes part in the floating journey
  const canvasSections = [...nav.children]
    .filter((section) => section.querySelector('.conversation-canvas'));
  canvasSections.forEach((section) => section.remove());

  // the logos from a TCS Header block, else the sections in order: brand, sections, tools
  if (!applyLogoBar(nav)) {
    const classes = ['brand', 'sections', 'tools'];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) section.classList.add(`nav-${c}`);
    });
  }

  // the logo link is a plain link, not a button
  const navBrand = nav.querySelector('.nav-brand');
  if (navBrand) removeButtonDecoration(navBrand.querySelector('.button, .link-button'));

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.id = 'nav-sections';
    const nextId = createIdFactory('nav-submenu');
    navSections.querySelectorAll(':scope .default-content-wrapper li').forEach((navSection) => {
      if (navSection.querySelector(':scope > ul')) decorateDrop(navSection, nextId);
    });
    navSections.prepend(buildLevel(navSections));
  }

  // reading and focus order as on screen: logos, menu button, then the menu
  const hamburger = buildHamburger(nav, navSections);
  if (navSections) navSections.before(hamburger);
  else nav.append(hamburger);
  const navTools = nav.querySelector('.nav-tools');
  if (navTools) hamburger.before(navTools);

  nav.dataset.expanded = 'false';
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));
  window.addEventListener('keydown', closeOnEscape);
  nav.addEventListener('focusout', closeOnFocusLost);

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  if (canvasSections.length) {
    const navCanvas = document.createElement('div');
    navCanvas.className = 'nav-canvas';
    navCanvas.append(...canvasSections);
    block.append(navCanvas);

    // the header grows by its Canvas: --header-height lets an opening light hero lie under all
    // of it on desktop (styles/styles.css, blocks/hero)
    const header = block.closest('header') || block;
    new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight / 16}rem`);
    }).observe(header);
  }
}
