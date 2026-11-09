// The links of the /design-block-master/en pages that leave the root or don't resolve, with the fix for each:
// /content/tcs-corp/design-block-master/english/... (the folder is en) and links to the testing root
// /language-master/en/... become the design-block-master page of the same path when it exists. Reads the
// live pages (plain HTML) and the root's query index; writes dbm-link-fixes.csv and .json.
// Usage: node dbm-link-fixes.mjs <out dir>
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LIVE = 'https://main--tcs-corp--sradha-tcs.aem.live';
const ROOT = '/design-block-master/en';
const out = process.argv[2];
mkdirSync(out, { recursive: true });
const getJson = async (u) => (await fetch(`${LIVE}${u}`)).json();
const index = [];
for (let o = 0; ; o += 1000) {
  const j = await getJson(`${ROOT}/query-index.json?offset=${o}&limit=1000`);
  index.push(...j.data.map((d) => d.path));
  if (o + 1000 >= j.total) break;
}
const pages = new Set(index);
const exists = async (p) => {
  if (pages.has(p)) return true;
  const r = await fetch(`${LIVE}${p}`, { method: 'HEAD' });
  return r.ok;
};
const known = new Map();
const check = async (p) => { if (!known.has(p)) known.set(p, await exists(p)); return known.get(p); };
const rows = [];
for (const page of [...pages, `${ROOT}/references/nav`, `${ROOT}/references/footer`]) {
  const r = await fetch(`${LIVE}${page}.plain.html`);
  if (!r.ok) { rows.push({ page, link: '', kind: 'page not loading', fix: '', note: String(r.status) }); continue; } // eslint-disable-line no-continue
  const html = await r.text();
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&#x26;|&amp;/g, '&'));
  for (const link of new Set(links)) {
    const url = new URL(link, LIVE);
    if (url.origin !== LIVE) continue; // eslint-disable-line no-continue
    const path = url.pathname.replace(/\.html$/, '');
    let kind = ''; let target = '';
    if (path.startsWith('/content/tcs-corp/design-block-master/english')) {
      kind = 'wrong folder (english)'; target = ROOT + path.slice('/content/tcs-corp/design-block-master/english'.length);
    } else if (path.startsWith('/content/tcs-corp/design-block-master/en')) {
      kind = 'AEM path'; target = path.slice('/content/tcs-corp'.length);
    } else if (path.startsWith('/language-master/en')) {
      kind = 'testing root'; target = ROOT + path.slice('/language-master/en'.length);
    } else if (path.startsWith('/content/')) {
      kind = 'unmapped AEM path';
    } else continue; // eslint-disable-line no-continue
    const ok = target ? await check(target || '/') : false;
    const keepOk = kind === 'testing root' ? await check(path) : false;
    rows.push({
      page,
      link,
      kind,
      fix: ok ? target + url.search + url.hash : '',
      note: ok ? 'replace' : (kind === 'testing root' && keepOk ? 'no design-block-master page: the testing root page exists (keep, or copy the page)' : 'no target page: needs an author decision'),
    });
  }
}
const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
writeFileSync(join(out, 'dbm-link-fixes.csv'), `${['page', 'link', 'kind', 'fix', 'note'].map(esc).join(',')}\n${rows.map((x) => [x.page, x.link, x.kind, x.fix, x.note].map(esc).join(',')).join('\n')}\n`);
writeFileSync(join(out, 'dbm-link-fixes.json'), JSON.stringify(rows, null, 1));
const by = {};
rows.forEach((x) => { const k = `${x.kind} | ${x.note.split(':')[0]}`; by[k] = (by[k] || 0) + 1; });
console.log('pages', pages.size, '| link rows', rows.length, JSON.stringify(by, null, 1));
