// Runtime harness: every block library and curated design page of the local preview at five
// widths: console errors, page errors, failed requests, block load status, horizontal overflow,
// duplicate ids, broken images, data layer (components, unique ids) and, at 1440 and 390, axe
// (WCAG 2.0 / 2.1 / 2.2 A and AA); at 1440 a click test (one cmp:click per click). Writes
// /tmp/audit/runtime-<label>.json.
//   node harness.mjs <label> [filter]
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire('/home/node/.npm/_npx/520e866687cefe78/node_modules/');
const { chromium } = require('playwright');

const [label = 'run', only = ''] = process.argv.slice(2);
const ROOT = '/backups/sradha-tcs/tcs-corp/repo/drafts';
const BASE = 'http://localhost:3000/drafts';
const AXE = readFileSync('/tmp/audit/node_modules/axe-core/axe.min.js', 'utf8');
const WIDTHS = [1440, 1024, 768, 600, 390];
const AXE_WIDTHS = [1440, 390];

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  if (statSync(p).isDirectory()) return walk(p);
  return p.endsWith('.html') && !p.endsWith('.plain.html') ? [p] : [];
});
const pages = [...walk(`${ROOT}/en/block-library`), ...walk(`${ROOT}/en/curated-design-pages`)]
  .map((p) => p.replace(ROOT, '').replace(/\.html$/, ''))
  .filter((p) => !/style-test|widths-and-columns/.test(p))
  .filter((p) => !only || p.includes(only));

const IGNORE_REQUEST = /favicon|\/\.well-known\/|rum|hlx\.page\/\.rum|_vercel|googletagmanager/;

async function measure(page) {
  return page.evaluate(() => {
    const blockOf = (el) => {
      const b = el.closest?.('.block');
      return b ? [...b.classList].find((c) => c !== 'block') : (el.closest?.('header') ? 'header' : el.closest?.('footer') ? 'footer' : 'page');
    };
    const blocks = [...document.querySelectorAll('main .block, header .block, footer .block')].map((b) => ({
      name: b.dataset.blockName || [...b.classList][0], status: b.dataset.blockStatus || '',
    }));
    const ids = {};
    document.querySelectorAll('[id]').forEach((el) => { ids[el.id] = (ids[el.id] || 0) + 1; });
    const dupIds = Object.entries(ids).filter(([, n]) => n > 1).map(([id, n]) => `${id}×${n}`);
    const de = document.documentElement;
    const overflow = de.scrollWidth - de.clientWidth;
    const wide = overflow > 1 ? [...document.querySelectorAll('main *, header *, footer *')]
      .filter((el) => { const r = el.getBoundingClientRect(); return r.width && (r.right > de.clientWidth + 1 || r.left < -1) && getComputedStyle(el).position !== 'fixed'; })
      .filter((el) => !el.closest('[class*="scroll"], [class*="carousel"], [class*="track"], .visually-hidden, [aria-hidden="true"]'))
      .slice(0, 5).map((el) => `${blockOf(el)}: ${el.tagName.toLowerCase()}.${[...el.classList].join('.')} r=${Math.round(el.getBoundingClientRect().right)}`) : [];
    const brokenImages = [...document.querySelectorAll('img')].filter((img) => img.complete && img.naturalWidth === 0 && img.getAttribute('src'))
      .map((img) => `${blockOf(img)}: ${img.getAttribute('src').slice(0, 80)}`);
    const noAlt = [...document.querySelectorAll('img:not([alt])')].map((img) => blockOf(img));
    const dl = window.adobeDataLayer;
    let dlState = null;
    try { dlState = dl?.getState ? dl.getState() : null; } catch { dlState = null; }
    const components = dlState?.component ? Object.keys(dlState.component) : (Array.isArray(dl) ? dl.filter((e) => e?.component).flatMap((e) => Object.keys(e.component)) : []);
    const dupComponents = Object.entries(components.reduce((a, k) => ({ ...a, [k]: (a[k] || 0) + 1 }), {})).filter(([, n]) => n > 1).map(([k]) => k);
    const domComponents = [...document.querySelectorAll('[data-cmp-data-layer], [data-cmp-id]')].length;
    return {
      blocks, notLoaded: blocks.filter((b) => b.status !== 'loaded').map((b) => `${b.name}:${b.status || 'none'}`),
      dupIds, overflow: overflow > 1 ? overflow : 0, wide, brokenImages, noAlt,
      dataLayer: {
        present: Array.isArray(dl), entries: Array.isArray(dl) ? dl.length : 0, components: components.length,
        dupComponents, page: Boolean(dlState?.page || (Array.isArray(dl) && dl.some((e) => e?.page))), domComponents,
      },
    };
  });
}

async function axe(page) {
  await page.addScriptTag({ content: AXE });
  return page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }, resultTypes: ['violations'] });
    const blockOf = (sel) => {
      const el = document.querySelector(sel);
      const b = el?.closest('.block');
      return b ? [...b.classList].find((c) => c !== 'block') : (el?.closest('header') ? 'header' : el?.closest('footer') ? 'footer' : 'page');
    };
    return r.violations.map((v) => ({
      id: v.id, impact: v.impact, help: v.help, count: v.nodes.length,
      nodes: v.nodes.slice(0, 6).map((n) => ({ block: blockOf(n.target[0]), target: String(n.target[0]).slice(0, 120), summary: (n.failureSummary || '').split('\n').slice(1, 2).join(' ').slice(0, 160) })),
    }));
  });
}

async function clickTest(page) {
  return page.evaluate(async () => {
    const links = [...document.querySelectorAll('main a[href]')].filter((a) => a.offsetParent).slice(0, 8);
    const results = [];
    const stop = (e) => e.preventDefault();
    document.addEventListener('click', stop, true);
    for (const a of links) {
      const before = window.adobeDataLayer?.length || 0;
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 30));
      const added = (window.adobeDataLayer || []).slice(before).filter((e) => e?.event === 'cmp:click');
      const b = a.closest('.block');
      results.push({ block: b ? [...b.classList].find((c) => c !== 'block') : 'default', clicks: added.length, text: a.textContent.trim().slice(0, 40) });
    }
    document.removeEventListener('click', stop, true);
    return results;
  });
}

const browser = await chromium.launch({ executablePath: '/ms-playwright/chromium-1208/chrome-linux64/chrome' }).catch(() => chromium.launch());
const results = [];
const queue = pages.flatMap((p) => WIDTHS.map((w) => ({ p, w })));
let done = 0;
async function worker() {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  while (queue.length) {
    const { p, w } = queue.shift();
    const page = await context.newPage();
    await page.setViewportSize({ width: w, height: 900 });
    const errors = []; const failed = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
    page.on('pageerror', (e) => errors.push(`pageerror: ${String(e.message).slice(0, 200)}`));
    page.on('response', (r) => { if (r.status() >= 400 && !IGNORE_REQUEST.test(r.url())) failed.push(`${r.status()} ${r.url().replace('http://localhost:3000', '').slice(0, 120)}`); });
    const row = { page: p, width: w };
    try {
      await page.goto(`${BASE}${p}`, { waitUntil: 'load', timeout: 45000 });
      await page.waitForTimeout(1200);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1200);
      Object.assign(row, await measure(page));
      row.failed = [...new Set(failed)]; failed.length = 0;
      if (AXE_WIDTHS.includes(w)) row.axe = await axe(page);
      if (w === 1440) row.clicks = await clickTest(page);
    } catch (e) { row.fatal = String(e.message).slice(0, 200); }
    row.errors = [...new Set(errors)].filter((e) => !/Failed to load resource/.test(e) || row.failed?.length); row.failed = row.failed || [...new Set(failed)];
    results.push(row);
    await page.close();
    done += 1;
    if (done % 50 === 0) console.log(`${done} / ${pages.length * WIDTHS.length}`);
  }
  await context.close();
}
await Promise.all([1, 2, 3, 4].map(worker));
await browser.close();
writeFileSync(`/tmp/audit/runtime-${label}.json`, JSON.stringify(results, null, 1));
const sum = (k) => results.filter((r) => (Array.isArray(r[k]) ? r[k].length : r[k])).length;
console.log({
  label, pages: pages.length, loads: results.length, fatal: sum('fatal'), withErrors: sum('errors'), withFailed: sum('failed'),
  notLoaded: sum('notLoaded'), overflow: sum('overflow'), dupIds: sum('dupIds'), brokenImages: sum('brokenImages'),
  axeViolations: results.reduce((n, r) => n + (r.axe || []).reduce((m, v) => m + v.count, 0), 0),
  dupClicks: results.flatMap((r) => r.clicks || []).filter((c) => c.clicks > 1).length,
  noClick: results.flatMap((r) => r.clicks || []).filter((c) => c.clicks === 0).length,
});
