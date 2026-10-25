/* global WebImporter */
/**
 * Import script (template "eds-page"): pages that are already on Edge Delivery Services, copied
 * as they are into content/ for the local preview. The rendered page is decorated by the site's
 * code, so the source is the page's own undecorated markup (<path>.plain.html) and its head meta
 * tags, both read in onLoad:
 * - each top-level div is a section (sections separated by <hr>); its data-* options (e.g.
 *   data-sectionwidth, data-style) become a Section Metadata block
 * - each block (a div with a class) becomes its block table (parsers/eds-block.js), rows and cells
 *   unchanged; default content stays as it is
 * - media paths (./media_...) are made absolute to the source page
 * - the page's meta tags (title, description, nav, footer, page-type, ...) become a Metadata block
 */
import parseBlock from './parsers/eds-block.js';

// meta tags the site's head or browser generate, not page metadata
const SKIP_META = /^(viewport|twitter:|og:)/i;

let source = null;

/** the undecorated sections and the metadata of the page */
async function loadSource(document) {
  const { location } = document.defaultView;
  const path = location.pathname.replace(/\/$/, '/index').replace(/\.html$/, '');
  const resp = await fetch(`${path}.plain.html`, { cache: 'no-store' });
  if (!resp.ok) throw new Error(`${path}.plain.html: HTTP ${resp.status}`);
  const metadata = {};
  const title = document.querySelector('head > title')?.textContent.trim();
  if (title) metadata.Title = title;
  document.querySelectorAll('head > meta[name][content]').forEach((meta) => {
    const name = meta.getAttribute('name');
    if (!SKIP_META.test(name) && !(name in metadata)) {
      metadata[name === 'description' ? 'Description' : name] = meta.getAttribute('content');
    }
  });
  return { html: await resp.text(), metadata, base: location.href };
}

/** a section's data-* options as a Section Metadata block, null without any */
function sectionMetadata(document, section) {
  const rows = Object.entries(section.dataset);
  if (!rows.length) return null;
  return WebImporter.Blocks.createBlock(document, { name: 'Section Metadata', cells: rows.map(([key, value]) => [key, value]) });
}

export default {
  onLoad: async ({ document }) => {
    source = await loadSource(document);
  },

  transformDOM: ({ document }) => {
    const main = document.createElement('main');
    const holder = document.createElement('div');
    holder.innerHTML = source.html;
    // media of the page is relative to it
    holder.querySelectorAll('img[src]').forEach((img) => {
      img.src = new URL(img.getAttribute('src'), source.base).href;
    });
    holder.querySelectorAll('picture source').forEach((el) => el.remove());

    [...holder.children].forEach((section, i) => {
      if (i > 0) main.append(document.createElement('hr'));
      const meta = sectionMetadata(document, section);
      [...section.children].forEach((child) => {
        const isBlock = child.tagName === 'DIV' && child.classList.length > 0;
        main.append(isBlock ? parseBlock(child, { document }) : child);
      });
      if (meta) main.append(meta);
    });
    main.append(WebImporter.Blocks.getMetadataBlock(document, source.metadata));
    return main;
  },

  generateDocumentPath: ({ document }) => {
    const { pathname } = document.defaultView.location;
    return WebImporter.FileUtils.sanitizePath(pathname.replace(/\/$/, '/index').replace(/\.html$/, ''));
  },
};
