/* eslint-disable */
/* global WebImporter */

/**
 * tcs.com blog (source template "TCS Case Studies Template") preparation, run before
 * tcs-cleanup.js and tcs-sections.js.
 *
 * beforeTransform:
 * - the "With you for the long run" sign-up fragment sits inside the footer band
 *   (div.tcs-footer, which tcs-cleanup.js drops as chrome): it is moved out of it, so the Teaser
 *   parser and the connect-with-us section find it as on press releases;
 * - drops what the blog template doesn't author: the sticky copy of the in-page links (with its
 *   share bar), the AI summary widget, panels hidden on the source (d-none, e.g. Highlights) and
 *   the author bio (About the author comes from the Authors data sheet through author-id,
 *   templates/blog; import-blog.js reads it into the report first);
 * - chapter headings: h2 > span.cs-section-title becomes a plain h2, a paragraph that is just a
 *   span.cs-title (a chapter's sub title) an h3;
 * - a line break at the end of a bold title (<strong>Title<br></strong>Text, the Challenges list)
 *   moves after it, so title and text stay apart;
 * - each chapter (div.insight-container#insights_N) gets data-section-anchor, the class name of
 *   its h2 ("Transformation drivers" -> transformation-drivers): tcs-sections.js makes it the
 *   section's anchorName and the Anchor List parser links to it.
 *
 * afterTransform: removes data-section-anchor left on elements.
 */

const ANCHOR = 'data-section-anchor';

const REMOVE_SELECTORS = [
  // the sticky in-page bar: a copy of the links plus the share bar
  'div.inPageLinks .sticky-header-container',
  // AI summary widget (generated text, not authored content)
  'div.aiSummaryButton',
  // panels hidden on the source page (display: none, aria-hidden)
  '.row-container-panel.d-none',
  // About the author: Authors data sheet (author-id)
  'div.authorBioContainer',
];

const text = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();

/** as toClassName in scripts/aem.js */
const toClassName = (name) => (typeof name === 'string'
  ? name.toLowerCase().replace(/[^0-9a-z]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  : '');

function moveSignUpOutOfFooter(root) {
  root.querySelectorAll('div.tcs-footer').forEach((footer) => {
    const signUp = footer.querySelector('div.cmp-experiencefragment--email-sign-up');
    if (!signUp) return;
    footer.replaceWith(signUp.closest('div.experiencefragment') || signUp);
  });
}

function normaliseChapterHeadings(root, document) {
  root.querySelectorAll('h2 > span.cs-section-title').forEach((span) => {
    const h2 = span.parentElement;
    if (text(h2) === text(span)) h2.textContent = text(span);
  });
  root.querySelectorAll('p > span.cs-title').forEach((span) => {
    const p = span.parentElement;
    if (!text(span) || text(p) !== text(span)) return;
    const h3 = document.createElement('h3');
    h3.textContent = text(span);
    p.replaceWith(h3);
  });
}

function moveTrailingBreaks(root) {
  root.querySelectorAll('strong, b').forEach((bold) => {
    let last = bold.lastChild;
    while (last && last.nodeType === 3 && !last.textContent.trim()) last = last.previousSibling;
    if (last?.nodeName === 'BR') bold.after(last);
  });
}

function markChapters(root) {
  root.querySelectorAll('div.insight-container[id]').forEach((chapter) => {
    const anchor = toClassName(text(chapter.querySelector('h2')));
    if (anchor) chapter.setAttribute(ANCHOR, anchor);
  });
}

export default function transform(hookName, element, payload) {
  const document = payload?.document || element.ownerDocument;

  if (hookName === 'beforeTransform') {
    moveSignUpOutOfFooter(element);
    REMOVE_SELECTORS.forEach((selector) => {
      element.querySelectorAll(selector).forEach((el) => el.remove());
    });
    normaliseChapterHeadings(element, document);
    moveTrailingBreaks(element);
    markChapters(element);
  }

  if (hookName === 'afterTransform') {
    element.querySelectorAll(`[${ANCHOR}]`).forEach((el) => el.removeAttribute(ANCHOR));
  }
}
