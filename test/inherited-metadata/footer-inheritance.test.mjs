/*
 * Integration tests of the inherited page properties (utils/inherited-metadata.js with
 * utils/site.js), with the Footer property: the page's own value, else the nearest parent
 * page's, else the locale's default page (resolvePagePath). The header (nav) and the 404 page
 * (error-page) resolve their properties this way; the Footer block doesn't load a footer page
 * since it was replaced (blocks/footer/README.md), so the Footer property has no effect. The published pages
 * are simulated: fetch returns their HTML heads, scripts/aem.js (a browser module) is replaced
 * by a getMetadata that reads the current page's metadata. npm test
 */
import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { resolvePagePath } from '../../utils/site.js';

const SITE = '/content/tcs-corp';
const FOOTER_EMEA = `${SITE}/emea/en/references/footer-emea`;
const FOOTER_CAREERS = `${SITE}/emea/en/references/footer-careers`;

// scripts/aem.js runs browser setup on import; the code under test only needs getMetadata
const AEM_STUB = `data:text/javascript,${encodeURIComponent(
  'export const getMetadata = (name) => globalThis.currentPage?.[name] || "";',
)}`;
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.endsWith('/scripts/aem.js')) return { url: AEM_STUB, shortCircuit: true };
    return nextResolve(specifier, context);
  },
});

/** the published pages: path → metadata (the Footer page property) */
let site;
let requests;

const head = (meta) => `<html><head>${Object.entries(meta)
  .map(([name, content]) => `<meta name="${name}" content="${content}">`).join('')}</head></html>`;

// the browser APIs the module uses
globalThis.DOMParser = class {
  // eslint-disable-next-line class-methods-use-this
  parseFromString(html) {
    return {
      head: {
        querySelector: (selector) => {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          const content = html.match(new RegExp(`<meta name="${name}" content="([^"]*)">`))?.[1];
          return content === undefined ? null : { content };
        },
      },
    };
  }
};

function storage() {
  const items = new Map();
  return {
    getItem: (key) => (items.has(key) ? items.get(key) : null),
    setItem: (key, value) => items.set(key, String(value)),
  };
}

globalThis.fetch = async (url) => {
  requests.push(url);
  const meta = site[url];
  return { ok: !!meta, text: async () => (meta ? head(meta) : '') };
};

let instance = 0;

/** a fresh module (its in-memory cache empty), as on a new page load */
async function loadModule() {
  instance += 1;
  return import(`../../utils/inherited-metadata.js?page=${instance}`);
}

/** opens a page: its own metadata, the URL the code reads; returns the resolved footer path */
async function footerOf(pathname) {
  const page = site[pathname] || site[`${pathname}/`] || {};
  globalThis.currentPage = page;
  globalThis.window = { location: { pathname, href: `https://example.com${pathname}` } };
  const { getInheritedMetadata } = await loadModule();
  return resolvePagePath(await getInheritedMetadata('footer'), 'references/footer');
}

beforeEach(() => {
  requests = [];
  globalThis.sessionStorage = storage();
  site = {
    // the EMEA root sets the footer once
    '/en-emea/': { footer: FOOTER_EMEA },
    '/en-emea/about': {},
    '/en-emea/about/leadership': {},
    // a section overriding it
    '/en-emea/careers': { footer: FOOTER_CAREERS },
    '/en-emea/careers/jobs': {},
    // US English: nothing configured
    '/en/': {},
    '/en/about': {},
  };
});

describe('EMEA footer inheritance', () => {
  it('the EMEA root page shows footer-emea (its own property)', async () => {
    assert.equal(await footerOf('/en-emea/'), '/en-emea/references/footer-emea');
    assert.deepEqual(requests, [], 'no parent page is loaded for an own value');
  });

  it('a child page inherits footer-emea from the root', async () => {
    assert.equal(await footerOf('/en-emea/about'), '/en-emea/references/footer-emea');
    assert.deepEqual(requests, ['/en-emea/']);
  });

  it('a grandchild inherits footer-emea; its parents are loaded in parallel, once each', async () => {
    assert.equal(await footerOf('/en-emea/about/leadership'), '/en-emea/references/footer-emea');
    assert.deepEqual(requests, ['/en-emea/about', '/en-emea/']);
  });

  it('a page-specific footer overrides the inherited one', async () => {
    assert.equal(await footerOf('/en-emea/careers'), '/en-emea/references/footer-careers');
  });

  it('below an override, the nearest parent wins', async () => {
    assert.equal(await footerOf('/en-emea/careers/jobs'), '/en-emea/references/footer-careers');
  });

  it('with no footer configured in the chain: the locale default footer', async () => {
    delete site['/en-emea/'].footer;
    assert.equal(await footerOf('/en-emea/about'), '/en-emea/references/footer');
  });

  it('a parent page that fails to load is skipped', async () => {
    delete site['/en-emea/about'];
    assert.equal(await footerOf('/en-emea/about/leadership'), '/en-emea/references/footer-emea');
  });

  it('parent values are cached for the session: no request on the next page load', async () => {
    await footerOf('/en-emea/about');
    requests = [];
    assert.equal(await footerOf('/en-emea/about'), '/en-emea/references/footer-emea');
    assert.deepEqual(requests, []);
  });

  it('nav and footer lookups of one page share the parent requests', async () => {
    globalThis.currentPage = {};
    globalThis.window = { location: { pathname: '/en-emea/about/leadership', href: 'https://example.com/en-emea/about/leadership' } };
    const { getInheritedMetadata } = await loadModule();
    await Promise.all([getInheritedMetadata('nav'), getInheritedMetadata('footer')]);
    assert.deepEqual(requests, ['/en-emea/about', '/en-emea/']);
  });

  it('in Universal Editor: the AEM parent pages and the AEM footer path', async () => {
    site[`${SITE}/emea/en.html`] = { footer: '/en-emea/references/footer-emea' };
    site[`${SITE}/emea/en/about.html`] = {};
    assert.equal(await footerOf(`${SITE}/emea/en/about.html`), FOOTER_EMEA);
    assert.deepEqual(requests, [`${SITE}/emea/en.html`]);
  });
});

describe('existing locale footers (no regression)', () => {
  it('US English without configuration: /en/references/footer', async () => {
    assert.equal(await footerOf('/en/about'), '/en/references/footer');
  });

  it('the EMEA footer does not leak into US English', async () => {
    assert.equal(await footerOf('/en/'), '/en/references/footer');
    assert.ok(!requests.some((url) => url.startsWith('/en-emea')));
  });

  it('a locale footer set on the US English Home page is inherited', async () => {
    site['/en/'].footer = 'references/footer-us';
    assert.equal(await footerOf('/en/about'), '/en/references/footer-us');
  });
});
