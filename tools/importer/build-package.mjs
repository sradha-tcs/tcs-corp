/* eslint-disable no-restricted-syntax, no-await-in-loop, no-continue, no-console -- Node tooling */
/*
 * Builds the AEM content package of imported pages (content/<path>.plain.html, written by the
 * import scripts) and the sheet rows that go with them:
 *
 *   node tools/importer/build-package.mjs --urls tools/importer/urls-press-release.txt \
 *     --name press-release-pilot [--version 1.0.0] [--include-existing]
 *
 * For every source URL of the list (the page path: /language-master/en + the tcs.com path, lower
 * case, without trailing hyphens, as import-press-release.js writes it):
 * - the page as JCR (html2md, then md2jcr with the project's component models, the conversion
 *   AEM's import uses), plus what md2jcr leaves out: the page tags (the Metadata block's tags,
 *   cq:tags; the List blocks find pages by them) and select values in the model's own form
 *   (md2jcr writes the variant "Teaser (no-image)" as classes="no image");
 * - its row of the language master's bulk metadata sheet: everything page-level except Title,
 *   Description, Keywords and Page Type is a metadata sheet column in this project (AGENTS.md),
 *   so publish-date, reading-time, content-type, eyebrow, ... are not page properties;
 * - a Redirects sheet row when the published path isn't the tcs.com path (letter case, trailing
 *   hyphens), for the CDN redirects (docs/proposals/redirects-cdn.md).
 * Pages already published (aem.page answers 200) are left out of the package unless
 * --include-existing: the package never overwrites an approved page.
 *
 * Output (migration-work/packages/, not in git): <name>-<version>.zip (filter: one entry per page,
 * so nothing else below the folders is touched), <name>-metadata.csv, <name>-redirects.csv and
 * <name>-report.json. Installing and publishing the package is a manual step in AEM.
 *
 * The converters come from the migration tooling's node_modules (XWALK_CONVERTER_DIR, see
 * tools/importer/README.md); the project has no dependency on them.
 */
import {
  mkdirSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// a folder whose node_modules hold @adobe/helix-html2md and @adobe/helix-md2jcr (the versions the
// import tooling pins); without it, they are resolved from the project
const CONVERTER_DIR = `${process.env.XWALK_CONVERTER_DIR || process.cwd()}/`;
const HOST = 'https://main--tcs-corp--sradha-tcs.aem.page';
const SITE = '/content/tcs-corp';
const TARGET_ROOT = '/language-master/en';
const OUT = 'migration-work/packages';
const SILENT = {
  info() {}, debug() {}, trace() {}, warn() {}, error() {},
};

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const urlsFile = arg('urls');
const name = arg('name');
const version = arg('version', '1.0.0');
const includeExisting = args.includes('--include-existing');
if (!urlsFile || !name) {
  console.error('usage: build-package.mjs --urls <file> --name <package name> [--version x.y.z] [--include-existing]');
  process.exit(1);
}

const require = createRequire(CONVERTER_DIR);
const { html2md } = await import(require.resolve('@adobe/helix-html2md'));
const { md2jcr } = await import(require.resolve('@adobe/helix-md2jcr'));
const json = (file) => JSON.parse(readFileSync(file, 'utf8'));
const models = json('component-models.json');
const definition = json('component-definition.json');
const filters = json('component-filters.json');

/** /language-master/en + the source path, lower case, without trailing hyphens */
const pagePath = (url) => `${TARGET_ROOT}${new URL(url).pathname.replace(/\.html?$/, '').replace(/\/$/, '')
  .split('/').map((s) => s.toLowerCase().replace(/-+$/, ''))
  .join('/')}`;

const xmlEscape = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');
const csvCell = (s) => (/[",\n]/.test(s) ? `"${String(s).replace(/"/g, '""')}"` : String(s));
const strip = (html) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim();

/** the Metadata block of the imported page: { key: text } */
function metadataOf(html) {
  const block = html.match(/<div class="metadata">([\s\S]*)$/)?.[1] || '';
  return Object.fromEntries([...block.matchAll(/<div><div>([^<]+)<\/div><div>([\s\S]*?)<\/div><\/div>/g)]
    .map(([, k, v]) => [k.trim().toLowerCase(), strip(v)]));
}

/** select / multiselect option values per model and field */
const OPTIONS = new Map(models.flatMap((m) => (m.fields || [])
  .filter((f) => Array.isArray(f.options))
  .map((f) => [`${m.id}/${f.name}`, f.options.map((o) => o.value).filter(Boolean)])));

/** md2jcr writes a variant's class as words ("no image"): use the model's option value */
function fixSelectValues(xml) {
  return xml.replace(/<block\b[^>]*>/g, (tag) => {
    const model = tag.match(/\bmodel="([^"]+)"/)?.[1];
    return tag.replace(/\b(classes)="([^"]*)"/g, (all, field, value) => {
      const options = OPTIONS.get(`${model}/${field}`);
      if (!options || options.includes(value)) return all;
      const match = options.find((o) => o.replace(/-/g, ' ') === value);
      return match ? `${field}="${match}"` : all;
    });
  });
}

/** cq:tags on jcr:content (md2jcr keeps only the page model's fields) */
function addTags(xml, tags) {
  if (!tags.length || /<jcr:content\b[^>]*\bcq:tags=/.test(xml)) return xml;
  return xml.replace(/<jcr:content\b/, `<jcr:content cq:tags="[${tags.map(xmlEscape).join(',')}]"`);
}

const sheetColumns = Object.keys((await (await fetch(`${HOST}${TARGET_ROOT}/metadata.json?limit=1`)).json()).data[0]);
const urls = readFileSync(urlsFile, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
const work = join(OUT, `${name}-${version}`);
rmSync(work, { recursive: true, force: true });

const report = [];
const metadataRows = [];
const redirectRows = [];
for (const url of urls) {
  const path = pagePath(url);
  const row = { url, path };
  report.push(row);
  let html;
  try {
    html = readFileSync(`content${path}.plain.html`, 'utf8');
  } catch {
    row.status = 'not imported';
    continue;
  }
  const published = (await fetch(`${HOST}${path}`, { method: 'HEAD' })).ok;
  if (published && !includeExisting) {
    row.status = 'skipped: already published';
    continue;
  }
  const meta = metadataOf(html);
  const md = await html2md(`<body><main>${html}</main></body>`, { log: SILENT });
  let xml = String(await md2jcr(md, {
    models, definition, filters, log: SILENT,
  }));
  xml = addTags(fixSelectValues(xml), (meta.tags || '').split(',').map((t) => t.trim()).filter(Boolean));
  const file = join(work, 'jcr_root', `${SITE}${path}`, '.content.xml');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, xml);
  row.status = published ? 'packaged (replaces the published page)' : 'packaged';

  const sheetRow = Object.fromEntries(sheetColumns.map((c) => [c, '']));
  sheetColumns.forEach((c) => { if (meta[c] !== undefined && c !== 'url') sheetRow[c] = meta[c]; });
  sheetRow.url = path;
  // the language master is reviewed before its rollout: its rows aren't indexed (as the sheet's)
  if ('robots' in sheetRow) sheetRow.robots = 'noindex, nofollow';
  metadataRows.push(sheetRow);

  const source = new URL(url).pathname;
  if (`${TARGET_ROOT}${source}` !== path) {
    redirectRows.push({ source, destination: path, description: 'tcs.com migration: normalised page name' });
  }
}

const packaged = report.filter((r) => r.status.startsWith('packaged'));
mkdirSync(join(work, 'META-INF', 'vault'), { recursive: true });
writeFileSync(join(work, 'META-INF', 'vault', 'filter.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<workspaceFilter version="1.0">
${packaged.map((r) => `  <filter root="${xmlEscape(`${SITE}${r.path}`)}"/>`).join('\n')}
</workspaceFilter>
`);
writeFileSync(join(work, 'META-INF', 'vault', 'properties.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
  <entry key="name">${xmlEscape(name)}</entry>
  <entry key="group">tcs-corp-migration</entry>
  <entry key="version">${xmlEscape(version)}</entry>
  <entry key="description">tcs.com migration: ${packaged.length} pages below ${SITE}${TARGET_ROOT}</entry>
</properties>
`);
const zip = join(OUT, `${name}-${version}.zip`);
rmSync(zip, { force: true });
if (packaged.length) {
  execFileSync('python3', ['-c', 'import shutil,sys; shutil.make_archive(sys.argv[1], \'zip\', sys.argv[2])',
    zip.replace(/\.zip$/, ''), work]);
}

const csv = (rows, columns) => [columns.join(','), ...rows.map((r) => columns.map((c) => csvCell(r[c] ?? '')).join(','))].join('\n');
writeFileSync(join(OUT, `${name}-metadata.csv`), `${csv(metadataRows, sheetColumns)}\n`);
writeFileSync(join(OUT, `${name}-redirects.csv`), `${csv(redirectRows, ['source', 'destination', 'description'])}\n`);
writeFileSync(join(OUT, `${name}-report.json`), `${JSON.stringify(report, null, 2)}\n`);

report.forEach((r) => console.log(`${r.status.padEnd(40)} ${r.path}`));
console.log(`${packaged.length} pages in ${packaged.length ? zip : '(no package)'}; ${metadataRows.length} metadata rows, ${redirectRows.length} redirect rows`);
