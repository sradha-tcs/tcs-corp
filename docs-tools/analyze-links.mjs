// Link analysis of published pages (aem.live .plain.html): per root, the links of its pages by target
// (own root, another review root, a locale, an unmapped AEM path /content/..., external) and the internal
// links whose target isn't published (404). Usage: node analyze-links.mjs <paths file> <published paths file...>
// Writes <paths file>.links.json (the details) and prints a summary. 6 requests at a time.
import { readFileSync, writeFileSync } from 'node:fs';

const LIVE = 'https://main--tcs-corp--sradha-tcs.aem.live';
const [list, ...publishedFiles] = process.argv.slice(2);
const paths = readFileSync(list, 'utf8').split('\n').map((l) => l.trim()).filter((p) => p && !p.endsWith('.json'));
const published = new Set();
publishedFiles.forEach((f) => readFileSync(f, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean)
  .forEach((p) => published.add(p.replace(/\/$/, '') || '/')));
const ROOTS = ['/language-master/en', '/language-masters/en', '/design-block-master/en'];
const rootOf = (p) => ROOTS.find((r) => p === r || p.startsWith(`${r}/`)) || '';
const out = { pages: 0, failed: [], kinds: {}, missing: {}, unmapped: {}, crossRoot: {}, damLinks: 0 };
const counts = {};
const add = (o, k, page) => { o[k] = o[k] || []; if (o[k].length < 5) o[k].push(page); const c = (counts[o === out.missing ? 'missing' : o === out.unmapped ? 'unmapped' : 'cross'] ||= {}); c[k] = (c[k] || 0) + 1; };
let i = 0;
async function worker() {
  while (i < paths.length) {
    const p = paths[i]; i += 1;
    const url = `${LIVE}${p.endsWith('/') ? `${p}index` : p}.plain.html`;
    const r = await fetch(url).catch(() => null);
    if (!r || !r.ok) { out.failed.push(`${r ? r.status : 'error'} ${p}`); continue; } // eslint-disable-line no-continue
    out.pages += 1;
    const html = await r.text();
    const own = rootOf(p);
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      let u;
      try { u = new URL(href, `${LIVE}${p}`); } catch { continue; } // eslint-disable-line no-continue
      let kind;
      if (u.origin !== LIVE && !/aem\.(live|page)$/.test(u.hostname)) kind = 'external';
      else if (u.pathname.startsWith('/content/dam/')) { kind = 'dam'; out.damLinks += 1; }
      else if (u.pathname.startsWith('/content/')) { kind = 'unmapped AEM path'; add(out.unmapped, u.pathname.split('/').slice(0, 5).join('/'), p); }
      else {
        const t = decodeURIComponent(u.pathname).replace(/\.html$/, '').replace(/\/$/, '') || '/';
        const tr = rootOf(t);
        if (!tr) kind = 'locale or other';
        else if (tr === own) kind = 'own root';
        else { kind = `to ${tr}`; add(out.crossRoot, `${own} -> ${tr}`, p); }
        if (tr && !published.has(t) && !/\.(json|pdf|png|jpe?g|svg|mp4|mp3)$/i.test(t)) add(out.missing, t, p);
      }
      out.kinds[kind] = (out.kinds[kind] || 0) + 1;
    }
  }
}
await Promise.all([1, 2, 3, 4, 5, 6].map(worker));
out.counts = counts;
writeFileSync(`${list}.links.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify({
  pages: out.pages, failed: out.failed.length, kinds: out.kinds, missingTargets: Object.keys(out.missing).length,
  unmapped: counts.unmapped || {},
  crossRoot: counts.cross || {}, missingLinks: Object.values(counts.missing || {}).reduce((a, b) => a + b, 0),
}, null, 1));
