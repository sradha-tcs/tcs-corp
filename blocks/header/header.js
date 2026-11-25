import { loadFirstFragment } from '../fragment/fragment.js';
import { prepareMotion } from '../../decorators/motion-decorator.js';
import { removeButtonDecoration } from '../../decorators/button-decorator.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { rememberHeaderSpace } from '../../utils/header-space.js';
import { getInheritedMetadata } from '../../utils/inherited-metadata.js';
import { isEditing } from '../../utils/environment.js';
import { referencePagePaths } from '../../utils/site.js';

/**
 * Extracts TCS logo (brand), TATA logo + hamburger toggle (tools)
 * and keeps the drawer connected to nav-wrapper
 */
function applyLogoBar(nav) {
  const bar = nav.querySelector('.tcs-header-bar') || nav.querySelector('.tcs-header');
  if (!bar) return false;

  const brandElem = bar.querySelector('.tcs-header-brand');
  const toolsElem = bar.querySelector('.tcs-header-group');
  const toggleElem = bar.querySelector('.tcs-header-menu-toggle');

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
  const drawerElem = origSection?.querySelector('.tcs-header-menu-drawer');
  if (origSection) {
    origSection.replaceWith(brandSection);
  } else {
    nav.prepend(brandSection);
  }

  brandSection.after(toolsSection);
  if (drawerElem) toolsSection.after(drawerElem);
  return true;
}

function setupScrollFallback(navWrapper) {
  let height = 124;
  const onScroll = () => {
    const progress = Math.min(1, Math.max(0, window.scrollY / height));
    navWrapper.style.setProperty('--header-scroll-progress', String(progress));
    if (window.scrollY > 10) {
      navWrapper.classList.add('is-scrolled');
    } else {
      navWrapper.classList.remove('is-scrolled');
    }
  };
  // one update per frame however many scroll events arrive (INP)
  let frame = 0;
  const onScrollFrame = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; onScroll(); });
  };
  new ResizeObserver(([entry]) => {
    height = entry.contentRect.height || height;
    onScroll();
  }).observe(navWrapper);
  window.addEventListener('scroll', onScrollFrame, { passive: true });
  onScroll();
}

export default async function decorate(block) {
  // the Navigation page: the page's own Navigation value (page property or metadata), else the
  // nearest parent page's, else the site's default header pages (utils/site.js REFERENCE_PAGES);
  // the first that exists and has content (KB-D-077)
  const navFragment = getInheritedMetadata('nav')
    .then((value) => loadFirstFragment(referencePagePaths('nav', value)));

  const [t, fragment] = await Promise.all([getPlaceholders(), navFragment]);

  block.textContent = '';
  if (!fragment) {
    // in Universal Editor, say why the header is empty
    if (isEditing()) {
      const hint = document.createElement('p');
      hint.className = 'header-empty';
      hint.textContent = t('headerNotFound', 'Header: no Navigation page with content found. Set the Navigation page property (or a parent page\'s) to a header page.');
      block.append(hint);
    }
    return;
  }

  const nav = document.createElement('nav');
  nav.id = 'nav';
  // getPlaceholders() returns the lookup function (placeholder mainNavigation, English fallback)
  nav.setAttribute('aria-label', t('mainNavigation', 'Main navigation'));
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

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

  applyLogoBar(nav);

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
