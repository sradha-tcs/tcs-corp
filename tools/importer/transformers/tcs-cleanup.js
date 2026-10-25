/* eslint-disable */
/* global WebImporter */

/**
 * tcs.com press release cleanup.
 *
 * beforeTransform (before the parsers match their blocks):
 * - drops the site chrome: header / global navigation fragments, skip links, breadcrumb,
 *   share bar, article tags, the sticky contact-us fragment, the accessibility widget, the
 *   footer, the OneTrust cookie banner and preference centre, scripts / styles / links;
 * - normalises the body headings: p > span.table-heading and p > span.blue-text become h2,
 *   p > span.blue-text-small h3 (text only), empty <strong> / <em> become a space;
 * - old layout (body in div.w-75): the "About Tata Consultancy Services" paragraph becomes an
 *   h2 (it opens the About section, see tcs-sections.js) and the "TCS Media Contacts" heading
 *   and everything after it in the body are removed (the Media Contacts block replaces them),
 *   and so is the body's repeated h1 (the title);
 * - the links' "Opens in new tab" screen reader text (the site adds its own).
 *
 * afterTransform: removes the hero image container (the hero image is page metadata
 * featured-image only), leftover chrome and tracking attributes. HTML comments are kept
 * (XWalk field hints).
 */

const BODY_SELECTORS = [
  'div.heroBanner ~ div.rowContainer div.richText',
  'div.heroBanner ~ div.responsivegrid div.rowContainer div.w-75',
];

const CHROME_SELECTORS = [
  // header and global navigation
  '.cmp-experiencefragment--header',
  // skip links
  '.cmp-page__skiptomaincontent',
  // hero chrome
  '.tcsBreadcrumb',
  '.socialShare',
  '.redownload-modal',
  // old layout tags bar
  'div.articleTags',
  // floating / page widgets
  '.cmp-experiencefragment--sticky-nav-contact-us',
  '.cmp-experiencefragment--accessibility-widget',
  // footer
  '.cmp-experiencefragment--footer',
  'div.tcs-footer',
  // cookie banner and preference centre
  '#onetrust-consent-sdk',
  '[id^="onetrust-"]',
  '.onetrust-pc-dark-filter',
  '#ot-sdk-btn-floating',
  '.ot-sdk-container',
  // non-content inputs
  'input#articleType',
  'input.ccm-youtubeCategoryId',
  // non-content elements
  'script',
  'style',
  'link',
  'noscript',
  'iframe',
];

const AFTER_SELECTORS = [
  // the hero image is featured-image metadata only, never body content
  '.hero-image-container',
  '.tcsBreadcrumb',
  '.socialShare',
  'header',
  'nav',
  'footer',
  'script',
  'style',
  'link',
  'noscript',
  'iframe',
];

const text = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();

function removeAll(root, selectors) {
  selectors.forEach((selector) => {
    try {
      root.querySelectorAll(selector).forEach((el) => el.remove());
    } catch (e) {
      // invalid selector in this DOM implementation: skip
    }
  });
}

/** Removes experience fragments that hold the global header / navigation (old layout). */
function removeNavigationFragments(root) {
  root.querySelectorAll('.cmp-experiencefragment--header').forEach((el) => {
    (el.closest('div.experiencefragment') || el).remove();
  });
  root.querySelectorAll('div.experiencefragment').forEach((el) => {
    if (el.querySelector('header, nav, .main-header-section')) el.remove();
  });
}

function bodyContainers(root) {
  const found = [];
  BODY_SELECTORS.forEach((selector) => {
    root.querySelectorAll(selector).forEach((el) => {
      if (!found.includes(el)) found.push(el);
    });
  });
  return found;
}

/** p > span.table-heading / span.blue-text -> h2, p > span.blue-text-small -> h3. */
function normaliseHeadings(root, document) {
  root.querySelectorAll('p').forEach((p) => {
    const span = p.querySelector('span.table-heading, span.blue-text, span.blue-text-small');
    if (!span) return;
    const label = text(span);
    // only a paragraph that is just the heading text (an inline highlight stays)
    if (!label || label !== text(p)) return;
    const level = span.classList.contains('blue-text-small') ? 'h3' : 'h2';
    const heading = document.createElement(level);
    heading.textContent = label;
    p.replaceWith(heading);
  });
}

/** Empty <strong> / <em> / <b> / <i> (whitespace only) left in running text become a space. */
function stripEmptyEmphasis(root, document) {
  root.querySelectorAll('strong, em, b, i').forEach((el) => {
    if (el.children.length || el.textContent.trim()) return;
    if (el.textContent.length) el.replaceWith(document.createTextNode(' '));
    else el.remove();
  });
}

/** Old layout: the bold "About Tata Consultancy Services ..." paragraph becomes an h2. */
function aboutParagraphToHeading(container, document) {
  const p = [...container.querySelectorAll('p')]
    .find((el) => /^About Tata Consultancy Services/i.test(text(el)));
  if (!p) return;
  const strong = p.querySelector('strong, b');
  const title = strong && /^About Tata Consultancy Services/i.test(text(strong))
    ? text(strong)
    : text(p);
  const heading = document.createElement('h2');
  heading.textContent = title;
  if (strong && text(strong) !== text(p)) {
    // title and text in one paragraph: the rest stays a paragraph after the heading
    strong.remove();
    while (p.firstChild && (p.firstChild.nodeName === 'BR' || (p.firstChild.nodeType === 3 && !p.firstChild.textContent.trim()))) {
      p.firstChild.remove();
    }
    p.before(heading);
  } else {
    p.replaceWith(heading);
  }
}

/** Old layout: "TCS Media Contacts" and everything after it in the body container go. */
function removeInlineMediaContacts(container) {
  const heading = [...container.querySelectorAll('h1, h2, h3, h4, h5, h6, p')]
    .find((el) => /^TCS Media Contacts:?$/i.test(text(el)));
  if (!heading) return;
  let node = heading;
  while (node && node !== container) {
    while (node.nextSibling) node.nextSibling.remove();
    node = node.parentElement;
  }
  heading.remove();
}

function removeComments(root, document) {
  const walker = document.createTreeWalker(root, 128 /* NodeFilter.SHOW_COMMENT */);
  const comments = [];
  while (walker.nextNode()) comments.push(walker.currentNode);
  comments.forEach((c) => c.remove());
}

function removeTrackingAttributes(root) {
  root.querySelectorAll('*').forEach((el) => {
    [...el.attributes].forEach(({ name }) => {
      if (/^on/i.test(name) || /^data-(analytics|track|gtm|cmp-data-layer)/i.test(name)) {
        el.removeAttribute(name);
      }
    });
  });
}

export default function transform(hookName, element, payload) {
  const document = payload?.document || element.ownerDocument;

  if (hookName === 'beforeTransform') {
    removeNavigationFragments(element);
    removeAll(element, CHROME_SELECTORS);
    removeComments(element, document);

    normaliseHeadings(element, document);
    stripEmptyEmphasis(element, document);

    // old layout only: the body holds About TCS and the media contacts
    element.querySelectorAll(BODY_SELECTORS[1]).forEach((container) => {
      removeInlineMediaContacts(container);
      aboutParagraphToHeading(container, document);
    });
    // current layout bodies never hold them, but a stray inline contacts block goes too
    bodyContainers(element).forEach((container) => {
      removeInlineMediaContacts(container);
      // the old layout repeats the title as an h1 in the body: the Page Header shows it
      container.querySelectorAll('h1').forEach((h1) => h1.remove());
    });
    // the source's screen reader helper ("Opens in new tab"): the site adds its own
    // (announceNewTab)
    element.querySelectorAll('a .visually-hidden, a .sr-only').forEach((el) => el.remove());
  }

  if (hookName === 'afterTransform') {
    removeAll(element, AFTER_SELECTORS);
    removeTrackingAttributes(element);
  }
}
