import { loadFragment } from '../fragment/fragment.js';
import { prepareMotion } from '../../decorators/motion-decorator.js';
import { removeButtonDecoration } from '../../decorators/button-decorator.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { rememberHeaderSpace } from '../../utils/header-space.js';
import { getInheritedMetadata } from '../../utils/inherited-metadata.js';
import { resolvePagePath } from '../../utils/site.js';

/**
 * Extracts TCS logo (brand), TATA logo + toggle, and drawer from the authored tcs-header block
 * @param {Element} nav The container element
 * @returns {boolean} whether the logo bar was successfully applied
 */
function applyLogoBar(nav) {
  const bar = nav.querySelector('.tcs-header-bar') || nav.querySelector('.tcs-header');
  if (!bar) return false;

  const brandElem = bar.querySelector('.tcs-header-brand');
  const toolsElem = bar.querySelector('.tcs-header-group');
  const toggleElem = bar.querySelector('.tcs-header-menu-toggle');
  const drawerElem = bar.closest('.tcs-header')?.querySelector('.tcs-header-menu-drawer')
    || nav.querySelector('.tcs-header-menu-drawer');

  const brandSection = document.createElement('div');
  brandSection.className = 'section nav-brand';
  const brandP = document.createElement('p');
  if (brandElem) brandP.append(brandElem);
  brandSection.append(brandP);

  const toolsSection = document.createElement('div');
  toolsSection.className = 'section nav-tools';
  const toolsP = document.createElement('p');
  if (toolsElem) toolsP.append(toolsElem);
  toolsSection.append(toolsP);
  if (toggleElem) toolsSection.append(toggleElem);

  const origSection = bar.closest('.section');
  if (origSection) {
    origSection.replaceWith(brandSection);
  } else {
    nav.prepend(brandSection);
  }

  brandSection.after(toolsSection);
  if (drawerElem) nav.after(drawerElem);

  return true;
}

/**
 * JavaScript scroll fallback for browsers without CSS scroll-timeline support.
 */
function setupScrollFallback(navWrapper) {
  if (window.CSS && CSS.supports && CSS.supports('animation-timeline', 'scroll()')) return;
  const onScroll = () => {
    if (window.scrollY > 10) {
      navWrapper.classList.add('is-scrolled');
    } else {
      navWrapper.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * loads and decorates the header shell
 */
export default async function decorate(block) {
  const defaultPath = resolvePagePath('', 'references/nav');
  const defaultFragment = loadFragment(defaultPath);
  const navFragment = getInheritedMetadata('nav').then(async (value) => {
    const navPath = resolvePagePath(value, 'references/nav');
    if (navPath === defaultPath) return defaultFragment;
    return (await loadFragment(navPath)) || defaultFragment;
  });

  const [placeholders, fragment] = await Promise.all([getPlaceholders(), navFragment]);

  block.textContent = '';
  if (!fragment) return;

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', placeholders.mainNavigation || 'Main navigation');
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // Preserve canvas sections if present
  const canvasSections = [...nav.children].filter((section) => section.querySelector('.conversation-canvas'));
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

  // Extract logos, hamburger toggle, and drawer
  if (!applyLogoBar(nav)) {
    const classes = ['brand', 'tools'];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) section.classList.add(`nav-${c}`);
    });
  }

  const navBrand = nav.querySelector('.nav-brand');
  if (navBrand) removeButtonDecoration(navBrand.querySelector('.button, .link-button'));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  setupScrollFallback(navWrapper);

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
