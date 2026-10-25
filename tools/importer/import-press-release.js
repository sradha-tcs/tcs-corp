/* eslint-disable */
/* global WebImporter */

/**
 * Import script, template "press-release": tcs.com press releases (source template "TCS NewsRoom
 * Template") as the approved language master press release
 * (/language-master/en/who-we-are/newsroom/press-release/...): six fixed-width sections (Page
 * Header, body with Table blocks, About TCS, Media Contacts, In the News, Connect with us) and the
 * page metadata the Page Header, List and cards read.
 *
 * Same page name: the document path is /language-master/en + the tcs.com path, in lower case,
 * without trailing hyphens (tcs.com has a few, e.g. ...-latin-america-).
 */

import pageHeaderParser from './parsers/page-header.js';
import tableParser from './parsers/table.js';
import mediaContactsParser from './parsers/media-contacts.js';
import listParser from './parsers/list.js';
import teaserParser from './parsers/teaser.js';
import cleanupTransformer from './transformers/tcs-cleanup.js';
import sectionsTransformer from './transformers/tcs-sections.js';

/** the published root the pages are imported below (utils/site.js REVIEW_ROOTS) */
const TARGET_ROOT = '/language-master/en';

const PAGE_TEMPLATE = {
  name: 'press-release',
  urls: [
    'https://www.tcs.com/who-we-are/newsroom/press-release/best-buys-global-capability-center-india-transition-tcs',
    'https://www.tcs.com/who-we-are/newsroom/press-release/dgcx-partners-with-tcs-advance-upgrade-derivatives-market-infrastructure',
    'https://www.tcs.com/who-we-are/newsroom/press-release/tcs-accelerate-ai-led-technology-transformation-germany-aareal-bank',
    'https://www.tcs.com/who-we-are/newsroom/press-release/tcs-financial-results-q2-fy-2027',
    'https://www.tcs.com/who-we-are/newsroom/press-release/tcs-hypervault-establish-large-scale-ai-data-center-campus-telangana',
    'https://www.tcs.com/who-we-are/newsroom/press-release/tcs-launches-indias-first-lights-out-factory-lab-advance-ai-first-manufacturing',
    'https://www.tcs.com/who-we-are/newsroom/press-release/tcs-launches-industrial-intelligence-foundry-accelerate-ai-led-autonomy-engineering',
    'https://www.tcs.com/who-we-are/newsroom/press-release/tcs-renews-title-partnership-jaguar-tcs-racing-expands-role-as-official-ai-partner-formula-e-gen4-era',
    'https://www.tcs.com/who-we-are/newsroom/press-release/mystate-limited-selects-tcs-bancs-transform-core-banking-operations',
    'https://www.tcs.com/who-we-are/newsroom/press-release/tcs-certified-top-employe-in-latin-america-',
  ],
  representativeUrl: 'https://www.tcs.com/who-we-are/newsroom/press-release/best-buys-global-capability-center-india-transition-tcs',
  description: 'tcs.com press releases (source template TCS NewsRoom Template): page header from metadata, body as default content (tables as Table blocks, images), the About TCS boilerplate, TCS media contacts (Media Contacts block), In the News (List block)',
  blocks: [
    { name: 'page-header', instances: ['div.heroBanner'] },
    { name: 'table', instances: ['div.heroBanner ~ div.rowContainer div.richText table', 'div.heroBanner ~ div.responsivegrid div.rowContainer table'] },
    { name: 'media-contacts', instances: ['div.cmp-experiencefragment--media-contacts'] },
    { name: 'list', instances: ['div.cmp-experiencefragment--media-contacts div.relatedContent'] },
    { name: 'teaser', instances: ['div.cmp-experiencefragment--email-sign-up'] },
  ],
  urlPattern: '/who-we-are/newsroom/press-release/*',
  sections: [
    { id: 'rc1', name: 'page-header', selector: ['div.heroBanner'], style: null, blocks: ['page-header'], defaultContent: [] },
    { id: 'rc2', name: 'press-release-body', selector: ['div.heroBanner ~ div.rowContainer div.richText', 'div.heroBanner ~ div.responsivegrid div.rowContainer div.w-75'], style: null, blocks: ['table'], defaultContent: ['div.heroBanner ~ div.rowContainer div.richText > :not(div.table__scroller-rte)', 'div.heroBanner ~ div.responsivegrid div.rowContainer div.w-75 > :not(div.table__scroller-rte)'] },
    { id: 'rc3', name: 'about-tcs', selector: ['div.heroBanner ~ div.rowContainer ~ div.rowContainer div.richText'], style: null, blocks: [], defaultContent: ['div.heroBanner ~ div.rowContainer ~ div.rowContainer div.richText > *'] },
    { id: 'rc4', name: 'media-contacts', selector: ['div.cmp-experiencefragment--media-contacts'], style: null, blocks: ['media-contacts'], defaultContent: [] },
    { id: 'rc5', name: 'in-the-news', selector: ['div.cmp-experiencefragment--media-contacts div.relatedContent'], style: null, blocks: ['list'], defaultContent: [] },
    { id: 'rc6', name: 'connect-with-us', selector: ['div.cmp-experiencefragment--email-sign-up'], style: null, blocks: ['teaser'], defaultContent: [] },
  ],
};

const parsers = {
  'page-header': pageHeaderParser,
  table: tableParser,
  'media-contacts': mediaContactsParser,
  list: listParser,
  teaser: teaserParser,
};

const transformers = [cleanupTransformer, sectionsTransformer];

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
  'september', 'october', 'november', 'december'];

const text = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((fn) => {
    try { fn(hookName, element, enhancedPayload); } catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (!pageBlocks.some((b) => b.element === element)) {
          pageBlocks.push({ name: blockDef.name, selector, element });
        }
      });
    });
  });
  return pageBlocks;
}

function meta(document, name) {
  const el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
  return el?.getAttribute('content')?.trim() || '';
}

/** YYYY-MM-DD from the body's dateline ("MUMBAI, October 8, 2026:"), else '' */
function datelineDate(body) {
  const first = [...(body?.querySelectorAll('p') || [])].find((p) => text(p));
  const m = text(first).slice(0, 160).match(/([A-Za-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})/);
  if (!m) return '';
  const month = MONTHS.findIndex((name) => name.startsWith(m[1].toLowerCase().slice(0, 3)));
  if (month < 0) return '';
  return `${m[3]}-${String(month + 1).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
}

/** the page metadata, read before the transformers change the DOM (values only, no removal) */
function readMetadata(document, url) {
  const bodies = ['div.heroBanner ~ div.rowContainer div.richText',
    'div.heroBanner ~ div.responsivegrid div.rowContainer div.w-75']
    .flatMap((s) => [...document.querySelectorAll(s)]);
  const h1 = text(document.querySelector('div.heroBanner h1, h1'));
  const title = meta(document, 'og:title') || text(document.querySelector('title')) || h1;
  const description = meta(document, 'description') || meta(document, 'og:description');
  // reading time of the release itself: the body without the About TCS boilerplate (the old
  // layout has both in one container), as the pages migrated before
  const words = text(bodies[0]).split(/About Tata Consultancy Services/i)[0]
    .split(/\s+/).filter(Boolean).length;
  const date = datelineDate(bodies[0]);
  const hero = document.querySelector('div.heroBanner .hero-image-container img');
  const heroSrc = hero && (hero.getAttribute('src') || hero.getAttribute('data-src'));

  const cells = {
    Title: title,
    Description: description,
    keywords: 'press release',
    'page-type': 'press-release',
    'meta-title': `${h1 || title} | TCS`,
    'meta-description': description,
    'meta-keywords': 'press release',
  };
  if (date) {
    cells['publish-date'] = date;
    cells['modified-date'] = date;
  }
  if (words) cells['reading-time'] = String(Math.max(1, Math.ceil(words / 200)));
  Object.assign(cells, {
    'og-title': title,
    'og-description': description,
    'og-type': 'article',
    'twitter-card': 'summary_large_image',
    'twitter-title': title,
    'twitter-description': description,
    region: 'Global',
    language: 'en',
    persona: 'Media, investors and analysts',
    'content-type': 'Press Release',
    eyebrow: 'Press Release',
    tags: 'tcs-corp:content-type/press-release',
  });
  // tcs.com's generic newsroom banner (older releases) is not the page's own image
  if (heroSrc && !/default-newsroom-banner/i.test(heroSrc)) {
    cells['featured-image'] = new URL(heroSrc, url).href;
  }
  return cells;
}

/** /language-master/en + the source path, lower case, without trailing hyphens */
function documentPath(originalURL) {
  const sourcePath = new URL(originalURL).pathname
    .replace(/\.html?$/, '')
    .replace(/\/$/, '')
    .split('/')
    .map((segment) => segment.toLowerCase().replace(/-+$/, ''))
    .join('/');
  return WebImporter.FileUtils.sanitizePath(`${TARGET_ROOT}${sourcePath || '/index'}`);
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;
    const originalURL = params.originalURL || url;

    const metadata = readMetadata(document, originalURL);

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      if (!block.element.isConnected) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); } catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    executeTransformers('afterTransform', main, payload);

    main.append(WebImporter.Blocks.createBlock(document, { name: 'Metadata', cells: metadata }));
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, originalURL);

    return [{
      element: main,
      path: documentPath(originalURL),
      report: {
        title: metadata.Title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
        'publish-date': metadata['publish-date'] || '',
      },
    }];
  },
};
