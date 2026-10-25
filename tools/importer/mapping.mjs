/* eslint-disable no-restricted-syntax, no-await-in-loop, no-console -- Node tooling */
/*
 * The migration mapping: every tcs.com URL of the inventory and every language master page, with
 * its AEM page, its preview and live URLs and status, its page type and the blocks it uses.
 *
 *   node tools/importer/mapping.mjs
 *
 * Reads tools/importer/inventory/tcs-sitemap-inventory.csv (node tools/importer/inventory.mjs),
 * the preview and live query indexes, the blocks of every page in the preview (its .plain.html,
 * a few requests at a time) and tools/importer/page-templates.json (the blocks a template's
 * importer writes, for pages imported but not yet in AEM). Writes
 * tools/importer/inventory/migration-mapping.csv and docs/migration/mapping-summary.md.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const PREVIEW = 'https://main--tcs-corp--sradha-tcs.aem.page';
const LIVE = 'https://main--tcs-corp--sradha-tcs.aem.live';
const SITE = '/content/tcs-corp';
const MASTER = '/language-master/en';
const PARALLEL = 6;

/** a CSV line to cells (quoted cells with commas and doubled quotes) */
function parseCsvLine(line) {
  const cells = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const c = line[i];
    if (quoted) {
      if (c === '"' && line[i + 1] === '"') { cell += '"'; i += 1; } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { cells.push(cell); cell = ''; } else cell += c;
  }
  cells.push(cell);
  return cells;
}
const csvCell = (s) => (/[",\n]/.test(String(s)) ? `"${String(s).replace(/"/g, '""')}"` : String(s));

const [header, ...lines] = readFileSync('tools/importer/inventory/tcs-sitemap-inventory.csv', 'utf8')
  .trim().split('\n');
const columns = parseCsvLine(header);
const inventory = lines
  .map((l) => Object.fromEntries(parseCsvLine(l).map((v, i) => [columns[i], v])));

const index = async (host) => (await (await fetch(`${host}/query-index.json?limit=10000`)).json()).data;
const preview = new Map((await index(PREVIEW)).map((r) => [r.path.replace(/\/$/, ''), r]));
const live = new Set((await index(LIVE)).map((r) => r.path.replace(/\/$/, '')));

const { templates } = JSON.parse(readFileSync('tools/importer/page-templates.json', 'utf8'));
const imported = new Map(templates.flatMap((t) => t.urls.map((u) => [u, t])));

/** the blocks of a published page, in order: "teaser (no-image)", one per distinct block */
async function blocksOf(path) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const resp = await fetch(`${PREVIEW}${path}.plain.html`);
      if (!resp.ok) return null;
      const html = await resp.text();
      const found = [...html.matchAll(/<div class="([a-z0-9][a-z0-9 -]*)">/g)]
        .map(([, classes]) => {
          const [block, ...variants] = classes.trim().split(/\s+/);
          return variants.length ? `${block} (${variants.join(' ')})` : block;
        });
      return [...new Set(found)];
    } catch (e) {
      // retry
    }
  }
  return null;
}

// the pages of the language master that have no tcs.com URL (curated, dummy, references, ...)
const sourced = new Set(inventory.map((r) => r.target.replace(/\/$/, '')).filter(Boolean));
const ownPages = [...preview.keys()].filter((p) => (p === MASTER || p.startsWith(`${MASTER}/`))
  && !sourced.has(p));

const rows = [
  ...inventory.map((r) => ({ ...r, source: r.url })),
  ...ownPages.map((p) => ({
    source: '', lastmod: '', locale: 'en', area: p.slice(MASTER.length + 1).split('/').slice(0, 3).join('/'), target: p, renamed: '', status: 'project page',
  })),
];

const pending = rows.filter((r) => r.target && preview.has(r.target.replace(/\/$/, '')));
let done = 0;
async function worker() {
  while (pending.length) {
    const r = pending.shift();
    r.blocks = await blocksOf(r.target.replace(/\/$/, '') || '/');
    done += 1;
    if (done % 250 === 0) console.log(`${done} pages read`);
  }
}
await Promise.all(Array.from({ length: PARALLEL }, worker));

const mapping = rows.map((r) => {
  const path = r.target.replace(/\/$/, '');
  const entry = preview.get(path);
  const template = imported.get(r.source);
  let status = r.status === 'project page' ? 'project page (no tcs.com source)' : r.status;
  if (status === 'to do' && template) status = 'imported, not in AEM yet';
  const blocks = r.blocks || (template && !entry ? template.blocks.map((b) => b.name) : []);
  return {
    source_url: r.source,
    locale: r.locale,
    area: r.area,
    status,
    template: entry?.pageType || template?.name || '',
    content_type: entry?.contentType || '',
    aem_path: path ? `${SITE}${path}` : '',
    preview_url: path ? `${PREVIEW}${path}` : '',
    live_url: path ? `${LIVE}${path}` : '',
    in_preview: entry ? 'yes' : 'no',
    live: path && live.has(path) ? 'yes' : 'no',
    renamed: r.renamed,
    blocks: blocks.join(' | '),
  };
});

const out = 'tools/importer/inventory/migration-mapping.csv';
const keys = Object.keys(mapping[0]);
writeFileSync(out, `${[keys.join(','), ...mapping.map((m) => keys.map((k) => csvCell(m[k])).join(','))].join('\n')}\n`);

// summary
const count = (list, key) => list
  .reduce((m, x) => m.set(key(x), (m.get(key(x)) || 0) + 1), new Map());
const byStatus = count(mapping, (m) => m.status);
const areaKey = (m) => `${m.locale} ${m.area.split('/').slice(0, 2).join('/') || '(root)'}`;
const areas = new Map();
mapping.forEach((m) => {
  const a = areas.get(areaKey(m)) || {
    total: 0, migrated: 0, live: 0, todo: 0, blocks: new Map(), types: new Map(),
  };
  a.total += 1;
  if (m.in_preview === 'yes') a.migrated += 1;
  if (m.live === 'yes') a.live += 1;
  if (m.status === 'to do') a.todo += 1;
  m.blocks.split(' | ').filter(Boolean).forEach((b) => a.blocks.set(b, (a.blocks.get(b) || 0) + 1));
  if (m.template) a.types.set(m.template, (a.types.get(m.template) || 0) + 1);
  areas.set(areaKey(m), a);
});
const blocks = new Map();
mapping.filter((m) => m.in_preview === 'yes').forEach((m) => m.blocks.split(' | ').filter(Boolean)
  .forEach((b) => blocks.set(b, (blocks.get(b) || 0) + 1)));
const top = (map, n) => [...map].sort((x, y) => y[1] - x[1]).slice(0, n).map(([k, v]) => `${k} ${v}`).join(', ');
const date = new Date().toISOString().slice(0, 10);

const md = `# Migration mapping summary

Generated by \`node tools/importer/mapping.mjs\` on ${date} from the inventory, the preview and live
query indexes and the blocks of the pages in the preview. The full list, one row per page (source
URL, AEM path, preview and live URL, status, page type, blocks), is
[migration-mapping.csv](../../tools/importer/inventory/migration-mapping.csv). Process:
[README.md](./README.md).

## Status

| Status | Pages |
| --- | --- |
${[...byStatus].sort((x, y) => y[1] - x[1]).map(([s, n]) => `| ${s} | ${n} |`).join('\n')}
| Total | ${mapping.length} |

In the preview: ${mapping.filter((m) => m.in_preview === 'yes').length}; live: ${mapping.filter((m) => m.live === 'yes').length}.

## By area

| Locale and area | Pages | In preview | Live | To do | Page types | Blocks used (pages) |
| --- | --- | --- | --- | --- | --- | --- |
${[...areas].sort((x, y) => y[1].total - x[1].total).filter(([, a]) => a.total >= 10 || a.migrated)
    .map(([k, a]) => `| ${k} | ${a.total} | ${a.migrated} | ${a.live} | ${a.todo} | ${top(a.types, 3) || '—'} | ${top(a.blocks, 6) || '—'} |`).join('\n')}

Areas with fewer than 10 pages and none migrated are in the CSV only.

## Blocks on the migrated pages

"No code": the page uses a block name that has no folder in \`blocks/\`, so it isn't decorated.

| Block (variant) | Pages | Code |
| --- | --- | --- |
${[...blocks].sort((x, y) => y[1] - x[1]).map(([b, n]) => `| ${b} | ${n} | ${existsSync(`blocks/${b.split(' ')[0]}`) ? 'blocks/' : '**no code**'} |`).join('\n')}
`;
writeFileSync('docs/migration/mapping-summary.md', md);
console.log(`${mapping.length} rows -> ${out}; summary -> docs/migration/mapping-summary.md`);
console.log([...byStatus].map(([s, n]) => `${s}: ${n}`).join('; '));
