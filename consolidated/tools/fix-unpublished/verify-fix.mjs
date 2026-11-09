// Checks the fixed pages on the live site: every path of fix-publish-paths.txt answers 200, the 125 pages
// that failed are among them, the pages that had an oversized SVG show images, and the language master's
// query index lists the pages. Usage: node verify-fix.mjs
import { readFileSync } from 'node:fs';

const LIVE = 'https://main--tcs-corp--sradha-tcs.aem.live';
const here = (f) => new URL(f, import.meta.url).pathname;
const paths = readFileSync(here('fix-publish-paths.txt'), 'utf8').split('\n').filter(Boolean);
const manifest = JSON.parse(readFileSync('/tmp/fixpkg/fix-manifest.json', 'utf8'));
const ROOT = '/content/tcs-corp';
const failing = readFileSync('/tmp/np/all125.txt', 'utf8').split('\n').filter(Boolean);
const after = Object.fromEntries(manifest.pages.map((p) => [p.before.slice(ROOT.length), p.after.slice(ROOT.length)]));
const imagePages = new Set(manifest.pages.filter((p) => p.images).map((p) => p.after.slice(ROOT.length)));
const bad = [];
let images = 0;
for (let i = 0; i < paths.length; i += 6) {
  await Promise.all(paths.slice(i, i + 6).map(async (p) => {
    const r = await fetch(`${LIVE}${p}.plain.html`);
    const s = r.ok ? await r.text() : '';
    if (!r.ok) bad.push({ p, status: r.status });
    if (imagePages.has(p) && /\.png\?|media_[0-9a-f]+\.png/.test(s)) images += 1;
  }));
}
const missing = failing.filter((p) => !paths.includes(after[p] || p));
const index = [];
for (let o = 0; ; o += 1000) {
  const j = await (await fetch(`${LIVE}/language-masters/en/query-index.json?offset=${o}&limit=1000`)).json();
  index.push(...j.data.map((d) => d.path));
  if (o + 1000 >= j.total) break;
}
const idx = new Set(index);
console.log('live pages', paths.length, '| not 200', bad.length, JSON.stringify(bad.slice(0, 5)));
console.log('the 125: not in the published set', missing.length, JSON.stringify(missing.slice(0, 5)));
console.log('pages with PNG images', images, 'of', imagePages.size);
console.log('in the query index', paths.filter((p) => idx.has(p)).length, 'of', paths.length, '| index rows', index.length,
  '| not indexed', JSON.stringify(paths.filter((p) => !idx.has(p)).slice(0, 6)));
