/* eslint-disable no-restricted-syntax, no-await-in-loop, no-continue, no-console -- Node tooling */
/*
 * Compares imported press releases (content/<path>.plain.html) with the pages already migrated
 * and published (aem.page <path>.plain.html and its head metadata): sections, blocks, body text
 * similarity and metadata. Pages not yet published are reported as "new" (structure only).
 *
 * node tools/importer/compare-reference.mjs [content root, default content/language-master]
 * Writes tools/importer/reports/compare-reference.json and prints one line per page.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const HOST = 'https://main--tcs-corp--sradha-tcs.aem.page';
const ROOT = process.argv[2] || 'content/language-master';
const EXPECTED_BLOCKS = ['page-header', 'media-contacts', 'list', 'teaser'];

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((e) => (e.isDirectory()
    ? files(join(dir, e.name)) : [join(dir, e.name)])));
  return nested.flat().filter((f) => f.endsWith('.plain.html'));
}

const strip = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ')
  .replace(/&amp;/g, '&').replace(/\s+/g, ' ')
  .trim();

/**
 * body text: the default content of the sections (headings, paragraphs, list items), without
 * the blocks (a div with a class and everything in it)
 */
function bodyText(html) {
  const out = [];
  const stack = []; // per open div: is it a block?
  let blockDepth = 0;
  let last = 0;
  for (const m of html.matchAll(/<(\/?)div\b([^>]*)>/g)) {
    if (!blockDepth) out.push(html.slice(last, m.index));
    if (m[1]) {
      if (stack.pop()) blockDepth -= 1;
    } else {
      const block = /\bclass="/.test(m[2]);
      stack.push(block);
      if (block) blockDepth += 1;
    }
    last = m.index + m[0].length;
  }
  out.push(html.slice(last));
  return strip(out.join(' '));
}

function blocks(html) {
  return [...html.matchAll(/<div class="([a-z0-9-]+)[ "]/g)].map((m) => m[1])
    .filter((b) => !['section-metadata', 'metadata'].includes(b));
}

/** the local file's sections: top-level divs; the published one's: data-section divs */
const sectionCount = (html) => (html.match(/^<div[ >]/gm) || []).length;

/** word set similarity of two texts (0..1) */
function similarity(a, b) {
  const words = (t) => t.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
  const wa = words(a);
  const wb = words(b);
  if (!wa.length && !wb.length) return 1;
  const count = (list) => list.reduce((m, w) => m.set(w, (m.get(w) || 0) + 1), new Map());
  const ca = count(wa);
  const cb = count(wb);
  let common = 0;
  ca.forEach((n, w) => { common += Math.min(n, cb.get(w) || 0); });
  return (2 * common) / (wa.length + wb.length);
}

function localMetadata(html) {
  const block = html.match(/<div class="metadata">([\s\S]*)$/)?.[1] || '';
  return Object.fromEntries([...block.matchAll(/<div><div>([^<]+)<\/div><div>([\s\S]*?)<\/div><\/div>/g)]
    .map(([, k, v]) => [k.toLowerCase(), strip(v)]));
}

const results = [];
for (const file of (await files(ROOT)).sort()) {
  const path = `/${relative('content', file).replace(/\.plain\.html$/, '')}`;
  const local = await readFile(file, 'utf8');
  const meta = localMetadata(local);
  const found = blocks(local);
  const row = {
    path,
    sections: sectionCount(local),
    blocks: found,
    missingBlocks: EXPECTED_BLOCKS.filter((b) => !found.includes(b)),
    tables: found.filter((b) => b === 'table').length,
    words: bodyText(local).split(/\s+/).filter(Boolean).length,
    publishDate: meta['publish-date'] || '',
  };
  const resp = await fetch(`${HOST}${path}.plain.html`);
  if (resp.ok) {
    const published = await resp.text();
    const head = await (await fetch(`${HOST}${path}`)).text();
    const pmeta = (name) => head.match(new RegExp(`<meta name="${name}" content="([^"]*)"`))?.[1] || '';
    Object.assign(row, {
      status: 'published',
      textSimilarity: Number(similarity(bodyText(local), bodyText(published)).toFixed(3)),
      publishedBlocks: blocks(published),
      metadataDiff: ['page-type', 'content-type', 'publish-date', 'reading-time', 'region', 'eyebrow']
        .filter((k) => (meta[k] || '') !== pmeta(k))
        .map((k) => `${k}: ${meta[k] || '-'} / ${pmeta(k) || '-'}`),
    });
  } else {
    row.status = 'new';
  }
  results.push(row);
  console.log([row.status.padEnd(9), `sections ${row.sections}`, `tables ${row.tables}`,
    row.missingBlocks.length ? `MISSING ${row.missingBlocks}` : 'blocks ok',
    row.textSimilarity !== undefined ? `text ${row.textSimilarity}` : '',
    row.metadataDiff?.length ? `meta diff [${row.metadataDiff.join('; ')}]` : '',
    path.split('/').pop()].filter(Boolean).join(' | '));
}
await writeFile('tools/importer/reports/compare-reference.json', `${JSON.stringify(results, null, 2)}\n`);
