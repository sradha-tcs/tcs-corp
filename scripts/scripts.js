import {
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  toClassName,
} from './aem.js';
import { applyPageProperties, buildPropertyImage } from './page-properties.js';

// section options (models/_section.json), keyed by their normalized section-metadata row name
const SECTION_OPTIONS = ['sectionwidth', 'roundededge', 'backgroundimage', 'backgroundimagealt'];
const BACKGROUND_BREAKPOINTS = [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }];

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to?.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  );
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates formatted links to style them as buttons.
 * @param {HTMLElement} main The main container element
 */
export function decorateButtons(main) {
  main.querySelectorAll('p a[href]').forEach((a) => {
    a.title = a.title || a.textContent;
    const p = a.closest('p');
    const text = a.textContent.trim();
    const icon = !text && a.children.length === 1 && a.querySelector(':scope > span.icon');

    // quick structural checks
    if ((a.querySelector('img') && !icon) || p.textContent.trim() !== text) return;

    // skip URL display links
    try {
      if (!icon && new URL(a.href).href === new URL(text, window.location).href) return;
    } catch { /* continue */ }

    const strong = a.closest('strong');
    const em = a.closest('em');

    // unformatted icon-only links stay plain
    if (icon && !strong && !em) return;

    p.className = 'button-wrapper';

    // unformatted standalone links become link buttons
    if (!strong && !em) {
      a.classList.add('link-button');
      return;
    }

    a.className = 'button';
    if (icon) {
      const iconName = [...icon.classList].find((c) => c.startsWith('icon-')).substring(5);
      const label = a.title || iconName.replace(/-/g, ' ');
      a.classList.add('icon-button');
      a.title = label;
      a.setAttribute('aria-label', label);
      a.style.setProperty('--icon-url', `url('${window.hlx.codeBasePath}/icons/${iconName}.svg')`);
    }
    if (strong && em) { // text-only call-to-action
      a.classList.add('tertiary');
      const outer = strong.contains(em) ? strong : em;
      outer.replaceWith(a);
    } else if (strong) {
      a.classList.add('primary');
      strong.replaceWith(a);
    } else {
      a.classList.add('secondary');
      em.replaceWith(a);
    }
  });
}

/**
 * Builds a section background from the Background Image metadata cell.
 * @param {Element} cell The metadata value cell
 * @param {string} [alt] Image alt text; empty marks the image as decorative
 * @returns {Element | null} The picture or img element
 */
function buildSectionBackground(cell, alt) {
  let image = cell.querySelector('picture') || cell.querySelector('img');
  if (!image) {
    const src = cell.querySelector('a')?.href || cell.textContent.trim();
    image = buildPropertyImage(src ? { src, alt: '' } : null, BACKGROUND_BREAKPOINTS);
  }
  if (!image) return null;
  const img = image.tagName === 'IMG' ? image : image.querySelector('img');
  // the alt text field wins; otherwise keep an alt AEM may have merged into the image
  if (alt) img.alt = alt;
  else if (!img.hasAttribute('alt')) img.alt = '';
  return image;
}

/**
 * Decorates sections, including the section options: Width Type, Rounded edge, Background Image
 * and Image alt text. decorateSections() keeps only the URL of a metadata image, so these rows
 * are read and removed first, then applied to the decorated section.
 * @param {Element} container The main element, or the parent of re-rendered sections
 */
export function decorateSectionsWithOptions(container) {
  const options = [...container.querySelectorAll(':scope > div:not([data-section-status]) > .section-metadata')]
    .map((meta) => {
      const rows = {};
      [...meta.children].forEach((row) => {
        const key = toClassName(row.children[0]?.textContent || '').replace(/-/g, '');
        if (SECTION_OPTIONS.includes(key)) {
          [, rows[key]] = row.children;
          row.remove();
        }
      });
      return { section: meta.parentElement, rows };
    });

  decorateSections(container);

  options.forEach(({ section, rows }) => {
    // full width is the default and needs no class
    if (toClassName(rows.sectionwidth?.textContent.trim() || '') === 'fixed-width') {
      section.classList.add('fixed-width');
    }
    if (rows.roundededge?.textContent.trim().toLowerCase() === 'true') {
      section.classList.add('rounded');
    }
    const background = rows.backgroundimage
      && buildSectionBackground(rows.backgroundimage, rows.backgroundimagealt?.textContent.trim());
    if (background) {
      const wrapper = document.createElement('div');
      wrapper.className = 'section-background';
      wrapper.append(background);
      section.prepend(wrapper);
      section.classList.add('has-background');
    }
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSectionsWithOptions(main);
  decorateBlocks(main);
  decorateButtons(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  applyPageProperties();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  loadHeader(doc.querySelector('header'));

  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
