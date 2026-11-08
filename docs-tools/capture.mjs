// Evidence capture of the published reference pages (block library and curated design pages of
// /design-block-master/en, KB-D-068): per page and width (375, 768, 1024, 1440) a screenshot (JPEG, up to
// 3,000 px high), horizontal overflow; at every width the console errors and failed requests; at 1440 the
// blocks and their classes, the Adobe Client Data Layer entries and DOM accessibility checks.
// Restart-safe: results in <out>/evidence.json, screenshots in <out>/screenshots/<slug>/; done pages skipped.
// One browser, one context at a time (closed after each width).
// Usage: PLAYWRIGHT_BROWSERS_PATH=/ms-playwright node capture.mjs <paths file> <out dir>
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const [list, out] = process.argv.slice(2);
const LIVE = 'https://main--tcs-corp--sradha-tcs.aem.live';
const WIDTHS = [375, 768, 1024, 1440];
const STATE = `${out}/evidence.json`;
mkdirSync(`${out}/screenshots`, { recursive: true });
const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {};
const save = () => writeFileSync(STATE, JSON.stringify(state, null, 1));
const paths = readFileSync(list, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
const slug = (p) => p.replace(/^\/design-block-master\/en\//, '').replace(/\/$/, '').replace(/[^a-z0-9]+/gi, '-') || 'root';
const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });

const DOM_CHECKS = () => {
  const name = (el) => (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.textContent || el.title || '').trim()
    || [...el.querySelectorAll('img[alt]')].map((i) => i.alt).join('').trim();
  const headings = [...document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')].map((h) => Number(h.tagName[1]));
  let skips = 0; headings.forEach((h, i) => { if (i && h > headings[i - 1] + 1) skips += 1; });
  const ids = [...document.querySelectorAll('[id]')].map((e) => e.id); const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  const blocks = [...document.querySelectorAll('main .block')].map((b) => ({ name: b.dataset.blockName || b.classList[0], classes: [...b.classList].filter((c) => !['block'].includes(c)).join(' ') }));
  const dl = window.adobeDataLayer || [];
  return {
    title: document.title,
    lang: document.documentElement.lang,
    h1: document.querySelectorAll('main h1').length,
    headingSkips: skips,
    imgNoAlt: [...document.querySelectorAll('main img')].filter((i) => !i.hasAttribute('alt')).length,
    imgs: document.querySelectorAll('main img').length,
    brokenImgs: [...document.querySelectorAll('main img')].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== 'lazy').length,
    buttonsNoName: [...document.querySelectorAll('button')].filter((b) => !name(b)).length,
    linksNoName: [...document.querySelectorAll('main a[href]')].filter((a) => !name(a)).length,
    duplicateIds: [...new Set(dup)].slice(0, 10),
    landmarks: { header: !!document.querySelector('header'), main: !!document.querySelector('main'), footer: !!document.querySelector('footer') },
    blocks,
    dataLayer: { entries: dl.length, events: [...new Set(dl.map((e) => e.event).filter(Boolean))], components: dl.filter((e) => e.component).length },
    emptyLists: [...document.querySelectorAll('main')].map((m) => (m.textContent.match(/There are no items to show/g) || []).length)[0] || 0,
  };
};

const browser = await chromium.launch();
let n = 0;
const todo = paths.filter((p) => !state[p]?.done);
async function one(p) {
  const rec = { url: `${LIVE}${p}`, widths: {}, console: [], failed: [], date: new Date().toISOString() };
  const dir = `${out}/screenshots/${slug(p)}`; mkdirSync(dir, { recursive: true });
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 812 : 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    page.on('console', (m) => { if (m.type() === 'error' && rec.console.length < 20) rec.console.push(`${w}: ${m.text().slice(0, 200)}`); });
    page.on('pageerror', (e) => { if (rec.console.length < 20) rec.console.push(`${w}: pageerror ${String(e.message).slice(0, 200)}`); });
    page.on('response', (r) => { if (r.status() >= 400 && rec.failed.length < 20) rec.failed.push(`${w}: ${r.status()} ${r.url().slice(0, 160)}`); });
    page.on('requestfailed', (r) => { if (rec.failed.length < 20 && !/beacon|rum/.test(r.url())) rec.failed.push(`${w}: failed ${r.url().slice(0, 160)}`); });
    let status = 0;
    try {
      const resp = await page.goto(rec.url, { waitUntil: 'load', timeout: 45000 });
      status = resp ? resp.status() : 0;
      await sleep(1500);
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => { setTimeout(r, 120); }); } window.scrollTo(0, 0); });
      await sleep(800);
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      const file = `${dir}/${slug(p)}-${w}.jpg`;
      await page.screenshot({ path: file, type: 'jpeg', quality: 55, fullPage: true, clip: { x: 0, y: 0, width: w, height: Math.min(height, 3000) } });
      rec.widths[w] = { status, height, overflow, screenshot: file.slice(out.length + 1) };
      if (w === 1440) rec.dom = await page.evaluate(DOM_CHECKS);
    } catch (e) {
      rec.widths[w] = { status, error: String(e.message).slice(0, 200) };
    }
    await page.close(); await ctx.close();
  }
  rec.done = true; state[p] = rec; n += 1;
  if (n % 5 === 0) save();
  if (n % 10 === 0) console.log(new Date().toISOString().slice(11, 19), `${Object.keys(state).length} of ${paths.length}`);
}
// 3 pages at a time (each one context at a time)
await Promise.all(Array.from({ length: Number(process.env.CONCURRENCY || 3) }, async () => { while (todo.length) await one(todo.shift()); }));
save();
await browser.close();
console.log('all done', Object.keys(state).length);
