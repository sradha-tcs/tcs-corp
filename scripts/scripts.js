import {
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlock,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  toClassName,
  getMetadata,
} from './aem.js';
import { buildImage } from '../decorators/responsive-image-decorator.js';
import { decorateButtons } from '../decorators/content-buttons-decorator.js';
import { decorateHead } from '../decorators/seo-decorator.js';
import {
  DEFAULT_LOCALE, getLocale, localePagePath, resolvePagePath,
} from '../utils/site.js';

// re-exported for scripts that import it from here, e.g. editor-support.js
export { decorateButtons };

// section options (models/_section.json), keyed by their normalized section-metadata row name
const SECTION_OPTIONS = [
  'sectionwidth', 'roundededge', 'backgroundimage', 'backgroundimagealt', 'anchorname',
];
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
 * Builds a section background from the Background Image metadata cell.
 * @param {Element} cell The metadata value cell
 * @param {string} [alt] Image alt text; empty marks the image as decorative
 * @returns {Element | null} The picture or img element
 */
function buildSectionBackground(cell, alt) {
  let image = cell.querySelector('picture') || cell.querySelector('img');
  if (!image) {
    const src = cell.querySelector('a')?.href || cell.textContent.trim();
    image = buildImage(src ? { src, alt: '' } : null, BACKGROUND_BREAKPOINTS);
  }
  if (!image) return null;
  const img = image.tagName === 'IMG' ? image : image.querySelector('img');
  // the alt text field wins; otherwise keep an alt AEM may have merged into the image
  if (alt) img.alt = alt;
  else if (!img.hasAttribute('alt')) img.alt = '';
  return image;
}

/**
 * Gen Carousel sections (blocks/gen-carousel/_gen-carousel.json): the section's content, any
 * block its filter allows, is wrapped in a synthetic gen-carousel block that turns each piece
 * of content into a slide. The blocks keep their own markup, decoration and editor
 * instrumentation; only the carousel options move from the section to the carousel block.
 * @param {Element} container The main element, or the parent of re-rendered sections
 */
function buildCarouselSections(container) {
  container.querySelectorAll(':scope > .section.gen-carousel-section').forEach((section) => {
    if (section.querySelector(':scope > .gen-carousel-wrapper')) return;
    const carousel = document.createElement('div');
    carousel.className = 'gen-carousel';
    const { carouselnavigation: navigation, carouselinterval: interval } = section.dataset;
    if (navigation) carousel.classList.add(toClassName(navigation));
    if (interval) carousel.dataset.interval = interval;

    const contents = [...section.children].filter((el) => !el.matches('.section-background'));
    const carouselWrapper = document.createElement('div');
    carouselWrapper.append(carousel);
    section.append(carouselWrapper);
    // decorate the carousel while it's empty: decorateBlock() would treat slides as cells
    decorateBlock(carousel);

    // decorateBlocks() only finds blocks directly in a section, so decorate them here
    contents.forEach((wrapper) => {
      const block = wrapper.firstElementChild;
      if (!wrapper.classList.contains('default-content-wrapper') && block?.className) {
        decorateBlock(block);
      }
      carousel.append(wrapper);
    });
  });
}

/**
 * Decorates sections, including the section options: Width Type, Rounded edge, Background Image,
 * Image alt text and Anchor name. decorateSections() keeps only the URL of a metadata image,
 * so these rows are read and removed first, then applied to the decorated section.
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
    // Anchor name: the id Anchor List links jump to
    const anchor = toClassName(rows.anchorname?.textContent.trim().replace(/^#/, '') || '');
    if (anchor && !document.getElementById(anchor)) section.id = anchor;
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

  buildCarouselSections(container);
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
 * Loads the content of an authored page into main.
 * @param {Element} main The main element
 * @param {string} path The page path
 * @returns {Promise<boolean>} whether the page was loaded
 */
async function loadPageContent(main, path) {
  try {
    const resp = await fetch(`${path}.plain.html`);
    if (!resp.ok) return false;
    main.innerHTML = await resp.text();
    // media of the page is relative to it
    main.querySelectorAll('img[src^="./media_"], source[srcset^="./media_"]').forEach((el) => {
      const attr = el.tagName === 'IMG' ? 'src' : 'srcset';
      el.setAttribute(attr, new URL(el.getAttribute(attr), new URL(path, window.location)).href);
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * The 404 page (404.html), authorable and locale specific. The first page that loads is shown:
 * 1. the 404 Page (error-page) of the missing page's nearest parent page up to Home (page
 *    property, or the metadata sheet's error-page column), like an inherited page property
 * 2. the locale's error-pages/404 (e.g. /de-de/error-pages/404 for /de-de/...)
 * 3. the default locale's /en/error-pages/404
 * Content from another locale is marked as its language.
 * else the built-in content stays. 403 and 500 are served by the CDN, not by code.
 * @param {Element} main The main element
 */
async function loadErrorPage(main) {
  // the built-in Go home button leads to the locale's home page
  main.querySelector('.error-button-home')?.setAttribute('href', localePagePath(''));
  if (window.errorCode && window.errorCode !== '404') return;
  // loaded on 404 pages only
  const { getInheritedMetadata } = await import('../utils/inherited-metadata.js');
  const configured = await getInheritedMetadata('error-page');
  const paths = [
    configured && resolvePagePath(configured, 'error-pages/404'),
    localePagePath('error-pages/404'),
    localePagePath('error-pages/404', `/${DEFAULT_LOCALE.code}/`),
  ].filter((path, i, all) => path && all.indexOf(path) === i);
  const { code } = getLocale();
  // eslint-disable-next-line no-restricted-syntax
  for (const path of paths) {
    // eslint-disable-next-line no-await-in-loop
    if (await loadPageContent(main, path)) {
      main.classList.add('error-authored');
      // content of another locale (e.g. the /en/ fallback) is marked as its language
      const source = getLocale(path);
      if (source.code !== code) main.lang = source.lang;
      return;
    }
  }
}

// Site Global Templates (/content/tcs-corp/site-global-templates) with template code in
// templates/{name}/: the page's Page Type (page properties or the metadata sheet's page-type)
const TEMPLATES = ['home', 'article', 'blog', 'press-release'];

/** the Page Type (page properties or the metadata sheet), else the Template metadata */
const pageTypeOf = () => toClassName(getMetadata('page-type') || getMetadata('template'));

/**
 * Adds the Page Type as a body class, like Template and Theme.
 */
function decoratePageType() {
  const pageType = toClassName(getMetadata('page-type'));
  if (pageType) document.body.classList.add(pageType);
}

/**
 * Loads the template of the Page Type (templates/{name}/{name}.js and .css) and lets it add
 * its structure to main before main is decorated.
 * @param {Element} main The main element
 */
async function loadTemplate(main) {
  const name = pageTypeOf();
  if (!TEMPLATES.includes(name)) return;
  try {
    const base = `${window.hlx.codeBasePath}/templates/${name}/${name}`;
    const [template] = await Promise.all([import(`${base}.js`), loadCSS(`${base}.css`)]);
    if (template.default) await template.default(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`failed to load template ${name}`, error);
  }
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  decorateHead();
  decorateTemplateAndTheme();
  decoratePageType();
  const main = doc.querySelector('main');
  if (main) {
    if (window.isErrorPage) await loadErrorPage(main);
    else await loadTemplate(main);
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
/**
 * Opens links to a /modals/ page as a modal (blocks/modal).
 * @param {Document} doc
 */
function autolinkModals(doc) {
  doc.addEventListener('click', async (e) => {
    const origin = e.target.closest('a');
    // links already handled (e.g. by the Modal block) are skipped
    if (!e.defaultPrevented && origin?.href && new URL(origin.href).pathname.includes('/modals/')) {
      e.preventDefault();
      const { openModal } = await import(`${window.hlx.codeBasePath}/blocks/modal/modal.js`);
      openModal(origin.href);
    }
  });
}

async function loadLazy(doc) {
  autolinkModals(doc);
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
