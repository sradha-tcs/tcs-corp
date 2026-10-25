/* eslint-disable */
/* global WebImporter */

/**
 * tcs.com press release sections: six sections, each closed by a Section Metadata block with
 * sectionWidth = fixed-width (models/_section.json "sectionWidth", delivered as
 * data-sectionwidth), as in the approved reference (migration-work/pilot/reference.plain.html):
 * 1 page-header, 2 body (default content + tables), 3 About TCS, 4 media-contacts,
 * 5 In the News (list), 6 Connect with us (teaser).
 *
 * beforeTransform: a marked <hr> before every section element (also the first, removed again
 * in afterTransform), while the parsers' source elements still exist. Old layout fallbacks:
 * - About TCS has no rowContainer of its own: the section starts at the "About Tata
 *   Consultancy Services" heading / paragraph of the body;
 * - no media contacts fragment: a minimal one (title + In the News) is added before the
 *   Connect with us fragment, so the media-contacts and list parsers build the template's
 *   blocks.
 * afterTransform: each section's Section Metadata goes before the next section's break (the
 * last one at the end), the markers are removed.
 */

const MARKER = 'data-import-section-id';
const SECTION_METADATA = { sectionWidth: 'fixed-width' };
const ABOUT_START = /^About Tata Consultancy Services/i;
const OLD_BODY = 'div.heroBanner ~ div.responsivegrid div.rowContainer div.w-75';
const MEDIA_CONTACTS = 'div.cmp-experiencefragment--media-contacts';
const EMAIL_SIGN_UP = 'div.cmp-experiencefragment--email-sign-up';

const text = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();

function first(root, selectors) {
  for (const selector of [].concat(selectors || [])) {
    try {
      const el = root.querySelector(selector);
      if (el) return el;
    } catch (e) {
      // invalid selector in this DOM implementation: try the next one
    }
  }
  return null;
}

/** Old layout: the About TCS start (h2 after cleanup, else the bold paragraph) in the body. */
function oldLayoutAboutStart(root) {
  const body = first(root, OLD_BODY);
  if (!body) return null;
  return [...body.querySelectorAll('h2, h3, p')].find((el) => ABOUT_START.test(text(el))) || null;
}

/** Old layout: a minimal media contacts fragment (title + In the News) before the CTA. */
function ensureMediaContacts(root, document) {
  if (first(root, MEDIA_CONTACTS)) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'experiencefragment';
  wrapper.innerHTML = '<div class="cmp-experiencefragment cmp-experiencefragment--media-contacts">'
    + '<div class="richText"><h2>TCS media contacts</h2></div>'
    + '<div class="relatedContent"><h2 class="related-section-title">In the News</h2></div>'
    + '</div>';
  const cta = first(root, EMAIL_SIGN_UP);
  const anchor = cta ? (cta.closest('div.experiencefragment') || cta) : null;
  if (anchor) anchor.before(wrapper);
  else root.append(wrapper);
}

function sectionElement(root, section) {
  const el = first(root, section.selector);
  if (el) return el;
  if (section.name === 'about-tcs') return oldLayoutAboutStart(root);
  return null;
}

function metadataFor(section) {
  const cells = { ...SECTION_METADATA };
  if (section.style) cells.style = section.style;
  return cells;
}

export default function transform(hookName, element, payload) {
  const document = payload?.document || element.ownerDocument;
  const sections = payload?.template?.sections;
  if (!Array.isArray(sections) || sections.length < 2) return;

  if (hookName === 'beforeTransform') {
    if (sections.some((s) => s.name === 'media-contacts') && first(element, ['div.heroBanner'])) {
      ensureMediaContacts(element, document);
    }
    // reverse, so inserting a break never shifts a later section's element
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const el = sectionElement(element, section);
      if (el) {
        const hr = document.createElement('hr');
        hr.setAttribute(MARKER, section.id);
        el.before(hr);
      }
    }
  }

  if (hookName === 'afterTransform') {
    const markers = sections
      .map((section) => ({ section, hr: element.querySelector(`hr[${MARKER}="${section.id}"]`) }))
      .filter(({ hr }) => hr);
    for (let i = markers.length - 1; i >= 0; i -= 1) {
      const { section } = markers[i];
      const meta = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: metadataFor(section),
      });
      const next = markers[i + 1];
      if (next) next.hr.before(meta);
      else element.append(meta);
    }
    markers.forEach(({ hr }, i) => {
      if (i === 0) hr.remove(); // the first section opens the page: no break
      else hr.removeAttribute(MARKER);
    });
  }
}
