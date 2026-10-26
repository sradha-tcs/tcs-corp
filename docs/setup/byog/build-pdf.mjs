/* eslint-disable no-console, import/no-unresolved -- Node tooling; playwright isn't a dependency */
/*
 * The PDF version of docs/setup/BYOG-ENVIRONMENT-SETUP.md, laid out like the Word version
 * (build-docx.mjs): cover page, contents, numbered sections, tables, code blocks, links, header
 * and "Page x of y" footer.
 *
 *   PLAYWRIGHT_DIR=<folder with node_modules/playwright> node docs/setup/byog/build-pdf.mjs
 *
 * Playwright (with Chromium) isn't a dependency of the project. Writes
 * docs/setup/BYOG-ENVIRONMENT-SETUP.pdf. Mermaid diagrams are left out (the document has the
 * same flows as a table).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(`${process.env.PLAYWRIGHT_DIR || process.cwd()}/`);
const { chromium } = require('playwright');

const SOURCE = new URL('../BYOG-ENVIRONMENT-SETUP.md', import.meta.url);
const OUT = fileURLToPath(new URL('../BYOG-ENVIRONMENT-SETUP.pdf', import.meta.url));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

/** inline markdown (bold, code, links) to HTML */
function inline(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (all, label, link) => (/^https?:/.test(link)
      ? `<a href="${link}">${label}</a>`
      : `${label} <span class="path">(${link.replace(/^(\.\.\/)+/, '')})</span>`))
    .replace(/(^|[\s(])(https?:\/\/[^\s<)|]+)/g, '$1<a href="$2">$2</a>');
}

const md = readFileSync(SOURCE, 'utf8').split('\n');
const title = md[0].replace(/^#\s*/, '');
const html = [];
const toc = [];
let i = 1;
while (i < md.length) {
  const line = md[i];
  if (/^\s*```/.test(line)) {
    const indent = line.match(/^\s*/)[0].length;
    const lang = line.trim().slice(3).trim();
    const block = [];
    i += 1;
    while (i < md.length && !/^\s*```/.test(md[i])) { block.push(md[i].slice(indent)); i += 1; }
    i += 1;
    if (lang !== 'mermaid') html.push(`<pre>${esc(block.join('\n'))}</pre>`);
  } else if (/^#{2,4}\s/.test(line)) {
    const level = line.match(/^#+/)[0].length;
    const text = line.replace(/^#+\s*/, '');
    const id = slug(text);
    if (level <= 3) toc.push({ level, text, id });
    html.push(`<h${level - 1} id="${id}">${inline(text)}</h${level - 1}>`);
    i += 1;
  } else if (/^\|/.test(line)) {
    const rows = [];
    while (i < md.length && /^\|/.test(md[i])) { rows.push(md[i]); i += 1; }
    const cells = rows.filter((l) => !/^\|\s*-+/.test(l))
      .map((l) => l.replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map((c) => c.trim()));
    html.push(`<table><thead><tr>${cells[0].map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${
      cells.slice(1).map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
  } else if (/^\s*([-*]|\d+\.)\s/.test(line)) {
    const ordered = /^\s*\d+\./.test(line);
    const items = [];
    while (i < md.length && /^\s*([-*]|\d+\.)\s/.test(md[i])) {
      let text = md[i].replace(/^\s*([-*]|\d+\.)\s/, '');
      i += 1;
      const extra = [];
      while (i < md.length && /^\s{2,}\S/.test(md[i]) && !/^\s*([-*]|\d+\.)\s/.test(md[i])) {
        if (/^\s*```/.test(md[i])) {
          const indent = md[i].match(/^\s*/)[0].length;
          const block = [];
          i += 1;
          while (i < md.length && !/^\s*```/.test(md[i])) { block.push(md[i].slice(indent)); i += 1; }
          i += 1;
          extra.push(`<pre>${esc(block.join('\n'))}</pre>`);
        } else {
          text += ` ${md[i].trim()}`;
          i += 1;
        }
      }
      while (i < md.length && !md[i].trim() && /^\s{2,}\S/.test(md[i + 1] || '')) i += 1;
      items.push(`<li>${inline(text)}${extra.join('')}</li>`);
    }
    html.push(`<${ordered ? 'ol' : 'ul'}>${items.join('')}</${ordered ? 'ol' : 'ul'}>`);
  } else if (line.trim()) {
    let text = line.trim();
    i += 1;
    while (i < md.length && md[i].trim() && !/^(#|\||\s*```|\s*[-*]\s|\s*\d+\.\s)/.test(md[i])) {
      text += ` ${md[i].trim()}`;
      i += 1;
    }
    html.push(`<p>${inline(text)}</p>`);
  } else {
    i += 1;
  }
}

const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>
  @page { size: A4; margin: 20mm 17mm 18mm; }
  body { font-family: Calibri, Carlito, "Liberation Sans", Arial, sans-serif; font-size: 10.5pt;
    line-height: 1.4; color: #1a1a1a; }
  h1, h2, h3 { color: #1f3864; break-after: avoid; }
  h1 { font-size: 15pt; margin: 22pt 0 6pt; border-bottom: 1px solid #d9e2f3; padding-bottom: 3pt; }
  h2 { font-size: 12.5pt; margin: 14pt 0 5pt; color: #2f5496; }
  h3 { font-size: 11pt; margin: 10pt 0 4pt; color: #2f5496; }
  p { margin: 0 0 6pt; }
  a { color: #0563c1; text-decoration: underline; overflow-wrap: anywhere; }
  code { font-family: Consolas, "DejaVu Sans Mono", monospace; font-size: 9pt; background: #f2f2f2;
    padding: 0 2px; overflow-wrap: anywhere; }
  pre { font-family: Consolas, "DejaVu Sans Mono", monospace; font-size: 7.6pt; background: #f2f2f2;
    border: 1px solid #e0e0e0; padding: 6pt 8pt; white-space: pre-wrap; overflow-wrap: anywhere;
    margin: 4pt 0 8pt; break-inside: avoid; }
  table { width: 100%; border-collapse: collapse; margin: 4pt 0 10pt; font-size: 8.5pt; }
  th, td { border: 1px solid #a6a6a6; padding: 3pt 5pt; vertical-align: top; text-align: left;
    overflow-wrap: anywhere; }
  th { background: #d9e2f3; }
  /* the first column holds short names: break only between words */
  td:first-child, td:first-child code { overflow-wrap: break-word; }
  tr { break-inside: avoid; }
  ul, ol { margin: 0 0 6pt; padding-left: 18pt; }
  li { margin-bottom: 2pt; }
  .path { color: #595959; font-size: 9pt; }
  .cover { height: 245mm; display: flex; flex-direction: column; justify-content: center;
    break-after: page; }
  .cover .kicker { font-size: 14pt; color: #595959; }
  .cover h1 { font-size: 24pt; border: 0; color: #1f3864; margin: 8pt 0 16pt; }
  .cover p { font-size: 12pt; }
  .cover .meta { margin-top: 28pt; font-size: 11pt; }
  .cover .note { font-size: 9pt; font-style: italic; color: #7f7f7f; margin-top: 12pt; }
  .toc { break-after: page; }
  .toc a { color: #1a1a1a; text-decoration: none; }
  .toc .l2 { font-weight: 600; margin-top: 4pt; }
  .toc .l3 { padding-left: 16pt; font-size: 9.5pt; }
</style></head><body>
<section class="cover">
  <div class="kicker">TCS Corporate — AEM Edge Delivery Services</div>
  <h1>${esc(title)}</h1>
  <p>Reference document: GitHub SaaS (github.com, GitHub Enterprise Cloud), GitHub Enterprise Server
  and other Git vendors through Cloud Manager (Bring Your Own Git), AEM as a Cloud Service,
  Configuration Service, Sidekick, Admin API validation</p>
  <div class="meta">Organisation: Ultimatix · Repository: tcs-corp · Site content: /content/tcs-corp ·
  Edge Delivery site: ultimatix/tcs-corp</div>
  <div class="meta" style="margin-top:6pt;color:#595959">Version 1.0 · 26 October 2026 · Rechecked
  against Adobe documentation (section 17)</div>
  <div class="note">Source: docs/setup/BYOG-ENVIRONMENT-SETUP.md; the same content as
  BYOG-ENVIRONMENT-SETUP.docx. Ids, emails, hosts and secrets are placeholders; the values are kept
  outside the repository (byog.env).</div>
</section>
<section class="toc"><h1>Contents</h1>
${toc.map((t) => `<div class="l${t.level}"><a href="#${t.id}">${inline(t.text)}</a></div>`).join('\n')}
</section>
${html.join('\n')}
</body></html>`;

// PDF_HTML=<file>: also write the HTML (to check the layout)
if (process.env.PDF_HTML) writeFileSync(process.env.PDF_HTML, page);

const browser = await chromium.launch();
try {
  const tab = await browser.newPage();
  await tab.setContent(page, { waitUntil: 'load', timeout: 30000 });
  await tab.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    margin: {
      top: '20mm', bottom: '18mm', left: '17mm', right: '17mm',
    },
    headerTemplate: '<div style="font-size:7pt;color:#7f7f7f;width:100%;text-align:right;padding-right:17mm">TCS Corporate · BYOG environment setup</div>',
    footerTemplate: '<div style="font-size:7pt;color:#7f7f7f;width:100%;text-align:center">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
    outline: true,
    tagged: true,
  });
  await tab.close();
} finally {
  await browser.close();
}
console.log(`${OUT}: ${toc.length} headings`);
