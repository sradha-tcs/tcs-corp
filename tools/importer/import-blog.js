/* eslint-disable */
/* global WebImporter */

/**
 * Import script, template "blog": tcs.com blogs (source template "TCS Case Studies Template",
 * /insights/blogs/...) as language master blog pages (Page Type blog, templates/blog): a Page
 * Header from metadata, the "On this page" Anchor List, one fixed-width section per chapter
 * (anchor name for the Anchor List; accordions as Accordion blocks), Related reading (List,
 * fixed list), Connect with us (Teaser) and the page metadata the Page Header, the template's
 * "About the author" (author-id, Authors data sheet), List and cards read.
 *
 * Same page name: the document path is /language-master/en + the tcs.com path, in lower case,
 * without trailing hyphens (as import-press-release.js).
 *
 * About the author isn't page content: the template builds it from the Authors data sheet. The
 * author's sheet values (name, designation, bio, image) are in the import report (author) for
 * the sheet's owner; the e-mail address ("Write to me") is personal data and isn't kept.
 */

import pageHeaderParser from './parsers/page-header.js';
import anchorListParser from './parsers/anchor-list.js';
import accordionParser from './parsers/accordion.js';
import listParser from './parsers/list.js';
import teaserParser from './parsers/teaser.js';
import blogTransformer from './transformers/tcs-blog.js';
import cleanupTransformer from './transformers/tcs-cleanup.js';
import sectionsTransformer from './transformers/tcs-sections.js';

/** the published root the pages are imported below (utils/site.js REVIEW_ROOTS) */
const TARGET_ROOT = '/language-master/en';

/** a blog's chapters: div.insight-container#insights_0, #insights_1, ... (up to 12) */
const CHAPTERS = Array.from({ length: 12 }, (_, i) => ({
  id: `rc-chapter-${i}`,
  name: `chapter-${i}`,
  selector: [`div.insight-container#insights_${i}`],
  style: null,
  blocks: ['accordion'],
  defaultContent: [`div.insight-container#insights_${i} div.richText > *`],
}));

const PAGE_TEMPLATE = {
  name: 'blog',
  urls: [
    'https://www.tcs.com/insights/blogs/enabling-growth-digital-transformation-commercial-banking',
  ],
  representativeUrl: 'https://www.tcs.com/insights/blogs/enabling-growth-digital-transformation-commercial-banking',
  description: 'tcs.com blogs (source template TCS Case Studies Template): page header from metadata, On this page (Anchor List), one section per chapter (default content, Accordion blocks), Related reading (List, fixed list), Connect with us (Teaser); About the author from the Authors data sheet (author-id)',
  blocks: [
    { name: 'page-header', instances: ['div.heroBanner'] },
    { name: 'anchor-list', instances: ['div.inPageLinks div.inpagelinks-desktop-container'] },
    { name: 'accordion', instances: ['div.insight-container div.tcsAccordion'] },
    { name: 'list', instances: ['div.staticRelatedContent'] },
    { name: 'teaser', instances: ['div.cmp-experiencefragment--email-sign-up'] },
  ],
  urlPattern: '/insights/blogs/*',
  sections: [
    { id: 'rc1', name: 'page-header', selector: ['div.heroBanner'], style: null, blocks: ['page-header'], defaultContent: [] },
    { id: 'rc2', name: 'on-this-page', selector: ['div.inPageLinks div.inpagelinks-desktop-container'], style: null, blocks: ['anchor-list'], defaultContent: [] },
    ...CHAPTERS,
    { id: 'rc3', name: 'related-reading', selector: ['div.staticRelatedContent'], style: null, blocks: ['list'], defaultContent: [] },
    { id: 'rc4', name: 'connect-with-us', selector: ['div.cmp-experiencefragment--email-sign-up'], style: null, blocks: ['teaser'], defaultContent: [] },
  ],
};

const parsers = {
  'page-header': pageHeaderParser,
  'anchor-list': anchorListParser,
  accordion: accordionParser,
  list: listParser,
  teaser: teaserParser,
};

// tcs-blog.js first: it moves the sign-up fragment out of the footer band tcs-cleanup.js drops
const transformers = [blogTransformer, cleanupTransformer, sectionsTransformer];

const text = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();

/** as toClassName in scripts/aem.js */
const toClassName = (name) => (name || '').toLowerCase().replace(/[^0-9a-z]/gi, '-')
  .replace(/-+/g, '-').replace(/^-|-$/g, '');

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

/**
 * The page's JSON-LD objects (Article: dates), from the raw HTML: the importer removes the
 * scripts from the document before the transform.
 */
function jsonLd(html) {
  return [...String(html || '').matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap(([, json]) => {
      try {
        const data = JSON.parse(json);
        return [].concat(data['@graph'] || data);
      } catch (e) {
        return [];
      }
    });
}

const isoDate = (value) => (/^\d{4}-\d{2}-\d{2}/.test(value || '') ? value.slice(0, 10) : '');

/** a CSS url() of a style attribute, with CSS escapes (\2f ) decoded, absolute */
function backgroundUrl(el, base) {
  const style = el?.getAttribute('style') || '';
  const m = style.match(/url\((['"]?)(.*?)\1\)/);
  if (!m) return '';
  const raw = m[2].replace(/&quot;/g, '').replace(/\\([0-9a-f]{1,6})\s?/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  return new URL(raw.replace(/\/jcr:content\/renditions\/.*$/, ''), base).href;
}

/** the author's Authors sheet values, read from the hero and the author bio */
function readAuthor(document, url) {
  const name = text(document.querySelector('.blogs-author-name'))
    || text(document.querySelector('.authorBioContainer .author-name'));
  if (!name) return null;
  const bio = document.querySelector('.authorBioContainer .author-desc')?.cloneNode(true);
  bio?.querySelectorAll('.dot-text, .readmore-button').forEach((el) => el.remove());
  return {
    'author-id': toClassName(name),
    name,
    designation: text(document.querySelector('.blogs-author-designation')),
    bio: text(bio),
    image: backgroundUrl(document.querySelector('.authorBioContainer .author-image'), url)
      || backgroundUrl(document.querySelector('.blogs-author-icon'), url),
  };
}

/** the page metadata, read before the transformers change the DOM (values only, no removal) */
function readMetadata(document, url, html) {
  const h1 = text(document.querySelector('div.heroBanner h1, h1'));
  // blogs have a visible title (h1) and a different SEO title (title, og:title): the h1 is the
  // page Title (the Page Header's heading, card titles), the SEO title meta-title, og-, twitter-title
  const seoTitle = meta(document, 'og:title') || text(document.querySelector('title')) || h1;
  const title = h1 || seoTitle;
  const description = meta(document, 'description') || meta(document, 'og:description');
  const ld = jsonLd(html).find((o) => o.datePublished || o.dateModified) || {};
  const words = [...document.querySelectorAll('div.insight-container')]
    .map((el) => text(el)).join(' ').split(/\s+/).filter(Boolean).length;
  const hero = document.querySelector('div.heroBanner img');
  const heroSrc = hero && (hero.getAttribute('data-src') || hero.getAttribute('src'));
  const author = readAuthor(document, url);
  // the page's industry tags (meta tags, the "Industry" of the tags bar): Banking ->
  // tcs-corp:industry/banking (taxonomy)
  const industries = meta(document, 'tags').split(',').map((t) => t.trim()).filter(Boolean);
  const industry = industries.join(', ');

  const cells = {
    Title: title,
    Description: description,
    keywords: 'blog',
    'page-type': 'blog',
    'meta-title': `${seoTitle} | TCS`,
    'meta-description': description,
    'meta-keywords': 'blog',
  };
  if (author) cells['author-id'] = author['author-id'];
  const published = isoDate(ld.datePublished);
  if (published) cells['publish-date'] = published;
  const modified = isoDate(ld.dateModified) || published;
  if (modified) cells['modified-date'] = modified;
  if (words) cells['reading-time'] = String(Math.max(1, Math.ceil(words / 200)));
  Object.assign(cells, {
    'og-title': seoTitle,
    'og-description': description,
    'og-type': 'article',
    'twitter-card': 'summary_large_image',
    'twitter-title': seoTitle,
    'twitter-description': description,
    region: 'Global',
    language: 'en',
    'content-type': 'Blog',
    eyebrow: 'Blog',
    tags: ['tcs-corp:content-type/blog']
      .concat(industries.map((t) => `tcs-corp:industry/${toClassName(t)}`)).join(', '),
  });
  if (author) cells.author = author.name;
  if (heroSrc) cells['featured-image'] = new URL(heroSrc, url).href;
  return { cells, author, industry };
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
    const {
      document, url, html, params,
    } = payload;
    const main = document.body;
    const originalURL = params.originalURL || url;

    const { cells: metadata, author, industry } = readMetadata(document, originalURL, html);

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
        industry,
        author: author ? JSON.stringify(author) : '',
      },
    }];
  },
};
