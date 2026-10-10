/*
 * TCS Custom Properties
 *
 * The "TCS Custom Properties" tab of the page-metadata model (models/_page.json) is published
 * as <meta name="<field-name>"> tags in the page head. This module reads those tags into typed
 * values for blocks to use, and applies the page-level logic (page type, SEO tags).
 */
import {
  createOptimizedPicture,
  getMetadata,
  loadScript,
  toClassName,
} from './aem.js';

// AEM publishes page links as /content/<site>/path(.html); the site serves them as /path
const CONTENT_ROOT = /^\/content\/(?!dam\/)[^/]+(?=\/|$)/;

const LINK_STYLES = ['primary', 'secondary'];

const text = (name) => getMetadata(name).trim();

const flag = (name) => ['true', 'on', 'yes', '1'].includes(text(name).toLowerCase());

// comma- or line-separated values, e.g. tag IDs or keywords
const list = (name) => text(name).split(/[,\n]/).map((value) => value.trim()).filter(Boolean);

/**
 * Converts an AEM content path to the path the site serves; other URLs pass through.
 * @param {string} path An AEM path or URL
 * @returns {string}
 */
export function toSitePath(path) {
  if (!path) return '';
  try {
    const url = new URL(path, window.location.href);
    if (url.origin !== window.location.origin) return url.href;
    const pathname = url.pathname.replace(CONTENT_ROOT, '').replace(/\.html$/, '') || '/';
    return `${pathname}${url.search}${url.hash}`;
  } catch {
    return path;
  }
}

/**
 * Reads an image reference and its alt text.
 * @returns {{ src: string, alt: string } | null}
 */
function image(srcName, altName) {
  const src = text(srcName);
  return src ? { src, alt: text(altName) } : null;
}

/**
 * Reads a date-only value (YYYY-MM-DD) as a UTC date.
 * @returns {Date | null}
 */
function date(name) {
  const value = text(name);
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Turns an AEM tag ID (e.g. "tcs:topics/artificial-intelligence") into an id and a label.
 * @returns {{ id: string, label: string }}
 */
function tag(id) {
  const name = id.split(/[/:]/).pop().replace(/[-_]+/g, ' ').trim();
  return { id, label: name.charAt(0).toUpperCase() + name.slice(1) };
}

/**
 * Returns all TCS Custom Properties of the current page as typed values.
 * Rich-text values are raw HTML; render them with renderRichText().
 */
export function getPageProperties() {
  const linkStyle = text('story-link-style');
  return {
    pageType: text('page-type'),
    iconImage: image('icon-image', 'icon-image-alt'),
    seo: {
      title: text('og-title'),
      description: text('og-description'),
      keywords: list('og-keywords'),
    },
    story: {
      tags: list('story-tags').map(tag),
      title: text('story-title'),
      description: text('story-description'),
      link: {
        title: text('story-link-title'),
        href: toSitePath(text('story-link-path')),
        newWindow: text('story-link-type') === 'new-window',
        style: LINK_STYLES.includes(linkStyle) ? linkStyle : '',
      },
      author: {
        image: image('author-image', 'author-image-alt'),
        designationLocation: text('author-designation-location'),
      },
      socialShare: flag('social-share'),
      publishDate: date('publish-date'),
      readingTime: text('reading-time'),
      download: flag('download'),
    },
  };
}

/**
 * Formats a publish date for display, e.g. "10 October 2026".
 * @param {Date} value
 * @param {string} [locale]
 * @returns {string}
 */
export function formatPublishDate(value, locale = document.documentElement.lang || 'en') {
  if (!value) return '';
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(value);
}

/**
 * Sanitizes authored rich text and returns it as a fragment ready to insert.
 * @param {string} html
 * @returns {Promise<DocumentFragment>}
 */
export async function renderRichText(html) {
  const fragment = document.createDocumentFragment();
  if (!html) return fragment;
  if (!window.DOMPurify) await loadScript(`${window.hlx.codeBasePath}/scripts/dompurify.min.js`);
  const template = document.createElement('template');
  template.innerHTML = window.DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  fragment.append(template.content);
  return fragment;
}

/**
 * Builds an image for an image property; site media is optimized, other URLs are used as-is.
 * @param {{ src: string, alt: string } | null} img
 * @param {Array} [breakpoints] Widths passed to createOptimizedPicture
 * @returns {Element | null}
 */
export function buildPropertyImage(img, breakpoints = [{ width: '750' }]) {
  if (!img?.src) return null;
  const url = new URL(img.src, window.location.href);
  if (url.origin === window.location.origin && url.pathname.includes('/media_')) {
    return createOptimizedPicture(url.href, img.alt, false, breakpoints);
  }
  const el = document.createElement('img');
  el.src = url.href;
  el.alt = img.alt;
  el.loading = 'lazy';
  return el;
}

/**
 * Builds the story link with its target and the site's button / link-button style.
 * @param {Object} [link] Defaults to the current page's story link
 * @returns {HTMLAnchorElement | null}
 */
export function buildStoryLink(link = getPageProperties().story.link) {
  if (!link?.href) return null;
  const a = document.createElement('a');
  a.href = link.href;
  a.textContent = link.title || link.href;
  a.className = link.style ? `button ${link.style}` : 'link-button';
  if (link.newWindow) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
  return a;
}

/**
 * Creates or updates a meta tag in the head, whether it uses name= or property=.
 * New Open Graph tags (og:, article:) use property=, all others name= (e.g. twitter:title).
 * @param {string} name
 * @param {string} content
 */
function setMeta(name, content) {
  let meta = document.head.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(/^(og|article):/.test(name) ? 'property' : 'name', name);
    document.head.append(meta);
  }
  meta.content = content;
}

/**
 * Applies the page-level logic of the TCS Custom Properties. Call once, early in page load.
 */
export function applyPageProperties() {
  const { pageType, seo, story } = getPageProperties();

  // page type: body class (e.g. page-type-article) for type-specific styling and logic
  if (pageType) {
    document.body.classList.add(`page-type-${toClassName(pageType)}`);
    document.body.dataset.pageType = pageType;
  }

  // social sharing: OG values take precedence over the page title and description
  if (seo.title) {
    setMeta('og:title', seo.title);
    setMeta('twitter:title', seo.title);
  }
  if (seo.description) {
    setMeta('og:description', seo.description);
    setMeta('twitter:description', seo.description);
  }
  if (seo.keywords.length) {
    const keywords = new Set([...list('keywords'), ...seo.keywords]);
    setMeta('keywords', [...keywords].join(', '));
  }

  if (story.publishDate) {
    setMeta('article:published_time', story.publishDate.toISOString().slice(0, 10));
  }
}
