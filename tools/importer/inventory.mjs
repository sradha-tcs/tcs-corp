/* eslint-disable no-console -- Node tooling: the summary on the console */
/*
 * The migration inventory: every tcs.com sitemap URL, its target page and whether it is migrated.
 *
 *   node tools/importer/inventory.mjs <sitemap.json> [out.csv]
 *
 * <sitemap.json>: {"list": "<url>\t<lastmod>\n..."}, the tcs.com sitemap read in a browser (tcs.com
 * answers 403 to scripts; see tools/importer/README.md). Migrated: the target page is in the
 * site's query index. Writes tools/importer/inventory/tcs-sitemap-inventory.csv by default and
 * prints a summary per area. Re-run it before each migration wave: the status column of the
 * CSV is the migration list (the earlier "As-is page (Lift and Shift)" list isn't in the
 * repository).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const HOST = 'https://main--tcs-corp--sradha-tcs.aem.page';
const TARGET_ROOT = '/language-master/en';
// tcs.com locale folders (the rest is the global English site)
const SOURCE_LOCALE = /^\/([a-z]{2}-[a-z]{2})(\/|$)/;

const [sitemapFile, out = 'tools/importer/inventory/tcs-sitemap-inventory.csv'] = process.argv.slice(2);
if (!sitemapFile) {
  console.error('usage: inventory.mjs <sitemap.json> [out.csv]');
  process.exit(1);
}

const rows = JSON.parse(readFileSync(sitemapFile, 'utf8')).list.split('\n')
  .map((line) => line.split('\t')).filter(([url]) => url);
const index = await (await fetch(`${HOST}/query-index.json?limit=10000`)).json();
const migrated = new Set(index.data.map((r) => r.path.replace(/\/$/, '')));
// pages the earlier migration put at another path: the language master's Redirects sheet
const redirects = await (await fetch(`${HOST}${TARGET_ROOT}/redirects.json?limit=10000`)).json();
const moved = new Map((redirects.data || []).map((r) => [
  String(r.source || r.Source).replace(/^\/language-master\/en/, '').replace(/\/$/, '').toLowerCase(),
  String(r.destination || r.Destination),
]));

/** the target page: the language master + the tcs.com path, lower case, no trailing hyphens */
const target = (path) => `${TARGET_ROOT}${path.replace(/\.html?$/, '').replace(/\/$/, '')
  .split('/').map((s) => s.toLowerCase().replace(/-+$/, ''))
  .join('/')}`;
const csvCell = (s) => (/[",\n]/.test(s) ? `"${String(s).replace(/"/g, '""')}"` : String(s));

const records = rows.map(([url, lastmod]) => {
  const path = new URL(url).pathname;
  const locale = path.match(SOURCE_LOCALE)?.[1] || 'en';
  const destination = locale === 'en' ? moved.get(path.replace(/\/$/, '').toLowerCase()) : '';
  const page = destination || (locale === 'en' ? target(path) : '');
  const area = path.replace(SOURCE_LOCALE, '/').split('/').filter(Boolean).slice(0, 3)
    .join('/');
  return {
    url,
    lastmod: lastmod || '',
    locale,
    area,
    target: page,
    renamed: page && page !== `${TARGET_ROOT}${path.replace(/\/$/, '')}` ? 'yes' : '',
    status: page && migrated.has(page.replace(/\/$/, '')) ? 'migrated' : 'to do',
  };
});

const columns = ['url', 'lastmod', 'locale', 'area', 'target', 'renamed', 'status'];
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${[columns.join(','), ...records.map((r) => columns.map((c) => csvCell(r[c])).join(','))].join('\n')}\n`);

const areas = new Map();
records.forEach((r) => {
  const key = `${r.locale}\t${r.area.split('/').slice(0, 2).join('/')}`;
  const a = areas.get(key) || { total: 0, migrated: 0 };
  a.total += 1;
  if (r.status === 'migrated') a.migrated += 1;
  areas.set(key, a);
});
console.log(`${records.length} URLs, ${records.filter((r) => r.status === 'migrated').length} migrated -> ${out}`);
[...areas].sort((a, b) => b[1].total - a[1].total).slice(0, 25)
  .forEach(([key, a]) => console.log(`${String(a.total).padStart(5)} ${String(a.migrated).padStart(5)}  ${key}`));
