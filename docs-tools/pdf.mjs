// Documentation program: the PDFs of the documentation set, generated from the Markdown (never edited).
// A book is one PDF of one or more Markdown documents: cover page (title, audience, version, status, owner,
// last validated, classification), table of contents with links, numbered headings, the documents as
// chapters, embedded screenshots, rendered Mermaid diagrams, header and footer with page numbers. Links to
// other documents of the book become internal links; links to documents outside it become links to the
// branch on GitHub. Restart-safe: an existing PDF newer than its sources is skipped (FORCE=1 rebuilds).
// Usage: PLAYWRIGHT_BROWSERS_PATH=/ms-playwright node pdf.mjs <docs dir>
import { createRequire } from 'node:module';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, join, posix, relative } from 'node:path';
import { ghAnchor } from './lib.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
// marked and mermaid: npm install marked@12 mermaid@10 in DOC_TOOLS (default: this folder)
const TOOLS = process.env.DOC_TOOLS || new URL('.', import.meta.url).pathname;
const { marked } = require(`${TOOLS}/node_modules/marked`);
const MERMAID = `${TOOLS}/node_modules/mermaid/dist/mermaid.min.js`;
const DOCS = process.argv[2];
const BRANCH_URL = 'https://github.com/sradha-tcs/tcs-corp/blob/migrated-page-content-edam/docs/handover';
const walk = (dir, base = '') => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p, `${base}${f}/`) : [`${base}${f}`]; });
const files = walk(DOCS);
const md = (re) => files.filter((f) => f.endsWith('.md') && re.test(f)).sort();

// the books
const books = [];
const book = (pdf, title, members) => { if (members.length) books.push({ pdf, title, members }); };
const dirMd = (dir) => md(new RegExp(`^${dir.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/[^/]+\\.md$`));
const first = (list, name) => [...list.filter((f) => f.endsWith(`/${name}`)), ...list.filter((f) => !f.endsWith(`/${name}`))];
book('01-architecture/pdf/ARCHITECTURE-GUIDE.pdf', 'Architecture Guide', first(dirMd('01-architecture/markdown'), 'ARCHITECTURE-GUIDE.md'));
const dev = dirMd('02-development/markdown');
const devSpecial = ['DESIGN-STYLE-GUIDE.md', 'BLOCK-DEVELOPMENT-GUIDE.md', 'CURATED-DESIGN-PAGE-DEVELOPMENT-GUIDE.md'];
book('02-development/pdf/DEVELOPER-GUIDE.pdf', 'Developer Guide', first(dev.filter((f) => !devSpecial.some((s) => f.endsWith(s))), 'DEVELOPER-GUIDE.md'));
book('02-development/pdf/DESIGN-STYLE-GUIDE.pdf', 'Design Style Guide', dev.filter((f) => f.endsWith('DESIGN-STYLE-GUIDE.md')));
book('02-development/pdf/BLOCK-DEVELOPMENT-GUIDE.pdf', 'Block Development Guide', [...dev.filter((f) => f.endsWith('BLOCK-DEVELOPMENT-GUIDE.md')), ...['BLOCK-INVENTORY', 'BLOCK-DEPENDENCY-MATRIX', 'BLOCK-KNOWN-LIMITATIONS'].map((n) => `02-development/blocks/${n}.md`)]);
book('02-development/pdf/CURATED-DESIGN-PAGE-DEVELOPMENT-GUIDE.pdf', 'Curated Design Page Development Guide', [...dev.filter((f) => f.endsWith('CURATED-DESIGN-PAGE-DEVELOPMENT-GUIDE.md')), '02-development/curated-design-pages/CURATED-PAGE-INVENTORY.md', '02-development/curated-design-pages/CURATED-PAGE-COMPOSITION-MATRIX.md']);
md(/^02-development\/(blocks|curated-design-pages)\/[^/]+\/[^/]+-DEVELOPER-GUIDE\.md$/).forEach((f) => book(f.replace(/\.md$/, '.pdf'), null, [f]));
const au = dirMd('03-authoring/markdown');
book('03-authoring/pdf/AUTHORING-GUIDE.pdf', 'Authoring Guide', first(au.filter((f) => !/COMPONENT-AUTHORING-REFERENCE|BLOCK-VARIATION-AUTHORING/.test(f)), 'AUTHORING-GUIDE.md'));
book('03-authoring/pdf/COMPONENT-AUTHORING-REFERENCE.pdf', 'Component Authoring Reference', au.filter((f) => /COMPONENT-AUTHORING-REFERENCE|BLOCK-VARIATION-AUTHORING/.test(f)));
md(/^03-authoring\/components\/[^/]+\/[^/]+-AUTHORING-GUIDE\.md$/).forEach((f) => book(f.replace(/\.md$/, '.pdf'), null, [f]));
const ba = dirMd('04-business-analysis/markdown');
book('04-business-analysis/pdf/BUSINESS-ANALYST-GUIDE.pdf', 'Business Analyst Guide', first(ba.filter((f) => !/EPIC-FEATURE-USER-STORY-CATALOG|REQUIREMENTS-TRACEABILITY|ACCEPTANCE-CRITERIA/.test(f)), 'BUSINESS-ANALYST-GUIDE.md'));
book('04-business-analysis/pdf/EPIC-FEATURE-USER-STORY-CATALOG.pdf', 'EPIC, Feature and User Story Catalog', ba.filter((f) => /EPIC-FEATURE-USER-STORY-CATALOG|ACCEPTANCE-CRITERIA/.test(f)));
book('04-business-analysis/pdf/REQUIREMENTS-TRACEABILITY-MATRIX.pdf', 'Requirements Traceability Matrix', ba.filter((f) => /REQUIREMENTS-TRACEABILITY/.test(f)));
md(/^04-business-analysis\/epics\/.*\.md$/).forEach((f) => book(f.replace(/\.md$/, '.pdf'), null, [f]));
const qa = dirMd('05-quality-assurance/markdown');
book('05-quality-assurance/pdf/TEST-STRATEGY.pdf', 'Test Strategy', first(qa.filter((f) => /TEST-STRATEGY|TEST-SCOPE|ENTRY|EXIT-CRITERIA|TEST-ENVIRONMENT|TEST-DATA/.test(f)), 'TEST-STRATEGY.md'));
book('05-quality-assurance/pdf/TEST-PLAN.pdf', 'Test Plan', qa.filter((f) => /MASTER-TEST-PLAN/.test(f)));
book('05-quality-assurance/pdf/TEST-CASE-CATALOG.pdf', 'Test Case Catalog', [...qa.filter((f) => /-TEST-CASES\.md$|REQUIREMENT-TEST-TRACEABILITY/.test(f))]);
book('05-quality-assurance/pdf/TEST-EXECUTION-REPORT.pdf', 'Test Execution Report', qa.filter((f) => /TEST-EXECUTION-REPORT|DEFECT-REGISTER/.test(f)));
book('05-quality-assurance/pdf/QUALITY-EXIT-REPORT.pdf', 'Quality Exit Report', qa.filter((f) => /QUALITY-EXIT-REPORT/.test(f)));
md(/^05-quality-assurance\/execution-results\/[^/]+\/TEST-SUMMARY\.md$/).forEach((f) => book(f.replace(/\.md$/, '.pdf'), null, [f]));
const ops = dirMd('06-operations-support/markdown');
book('06-operations-support/pdf/OPERATIONS-AND-SUPPORT-GUIDE.pdf', 'Operations and Support Guide', first(ops.filter((f) => !/TROUBLESHOOTING-RUNBOOK/.test(f)), 'OPERATIONS-AND-SUPPORT-GUIDE.md'));
book('06-operations-support/pdf/TROUBLESHOOTING-RUNBOOK.pdf', 'Troubleshooting Runbook', ops.filter((f) => /TROUBLESHOOTING-RUNBOOK/.test(f)));
book('07-administration-governance/pdf/ADMINISTRATION-AND-GOVERNANCE-GUIDE.pdf', 'Administration and Governance Guide', first(dirMd('07-administration-governance/markdown'), 'ADMINISTRATION-AND-GOVERNANCE-GUIDE.md'));
book('08-release-devops/pdf/RELEASE-AND-DEVOPS-GUIDE.pdf', 'Release and DevOps Guide', first(dirMd('08-release-devops/markdown'), 'RELEASE-AND-DEVOPS-GUIDE.md'));
book('09-knowledge-base/pdf/KNOWLEDGE-BASE.pdf', 'Knowledge Base', dirMd('09-knowledge-base/humans'));
book('09-knowledge-base/pdf/AI-AGENT-GUIDE.pdf', 'AI Agent Guide', [...first(dirMd('09-knowledge-base/agents'), 'AGENTS.md'), ...dirMd('09-knowledge-base/llms')]);
book('10-training-onboarding/pdf/TRAINING-AND-ONBOARDING-GUIDE.pdf', 'Training and Onboarding Guide', first(dirMd('10-training-onboarding/markdown'), 'TRAINING-AND-ONBOARDING-GUIDE.md'));
book('11-audit-remediation/pdf/AUDIT-AND-REMEDIATION-REPORT.pdf', 'Audit and Remediation Report', dirMd('11-audit-remediation/markdown'));

const frontMatter = (src) => {
  const m = src.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = {};
  if (m) m[1].split('\n').forEach((l) => { const i = l.indexOf(':'); try { meta[l.slice(0, i)] = JSON.parse(l.slice(i + 1).trim()); } catch { meta[l.slice(0, i)] = l.slice(i + 1).trim(); } });
  return { meta, body: m ? src.slice(m[0].length) : src };
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function render(b) {
  const docsIn = b.members.map((f, i) => ({ f, i, ...frontMatter(readFileSync(join(DOCS, f), 'utf8')) }));
  const inBook = Object.fromEntries(docsIn.map((d) => [d.f, d.i]));
  const toc = [];
  const parts = docsIn.map((d) => {
    const seen = {};
    const renderer = new marked.Renderer();
    renderer.heading = (text, level, raw) => {
      const id = `d${d.i}-${ghAnchor(raw, seen)}`;
      if (level <= 2) toc.push({ level: level === 1 ? 1 : 2, text: raw, id });
      return `<h${level} id="${id}"${level === 1 ? ' class="doc-title"' : ''}>${text}</h${level}>`;
    };
    renderer.code = (code, lang) => (lang === 'mermaid' ? `<pre class="mermaid">${esc(code)}</pre>` : `<pre><code>${esc(code)}</code></pre>`);
    renderer.link = (href, title, text) => {
      let h = href || '';
      if (h.startsWith('#')) h = `#d${d.i}-${h.slice(1)}`;
      else if (!/^[a-z]+:/i.test(h)) {
        const [p, a] = h.split('#');
        const t = posix.normalize(posix.join(posix.dirname(d.f), p));
        if (inBook[t] !== undefined) h = a ? `#d${inBook[t]}-${a}` : `#d${inBook[t]}-top`;
        else h = `${BRANCH_URL}/${t}${a ? `#${a}` : ''}`;
      }
      return `<a href="${esc(h)}"${title ? ` title="${esc(title)}"` : ''}>${text}</a>`;
    };
    renderer.image = (href, title, text) => {
      const abs = /^[a-z]+:/i.test(href) ? href : `file://${join(DOCS, posix.dirname(d.f), href)}`;
      return `<figure><img src="${esc(abs)}" alt="${esc(text)}"></figure>`;
    };
    const html = marked.parse(d.body.replace(/^## Contents\n\n(?:- \[.*\n)+/m, ''), { renderer, gfm: true });
    return `<section class="doc" id="d${d.i}-top">${html}</section>`;
  });
  const m0 = docsIn[0].meta;
  const title = b.title || m0.title;
  const cover = `<section class="cover"><div class="brand">TCS Corporate Website</div><h1 class="cover-title">${esc(title)}</h1>
<table class="cover-meta"><tr><th>Role / audience</th><td>${esc(m0.role || '')} — ${esc(m0.audience || '')}</td></tr>
<tr><th>Version</th><td>${esc(m0.version || '1.0')}</td></tr><tr><th>Status</th><td>${esc(m0.status || '')}</td></tr>
<tr><th>Owner</th><td>${esc(m0.owner || '')} (proposed)</td></tr><tr><th>Last validated</th><td>${esc(m0.lastValidated || '')}</td></tr>
<tr><th>Documents</th><td>${docsIn.length}</td></tr><tr><th>Classification</th><td>INTERNAL — classification to be confirmed</td></tr></table>
<p class="note">Generated from the Markdown sources of docs/handover (branch migrated-page-content-edam); do not edit this PDF.</p></section>`;
  const tocHtml = `<section class="toc"><h1>Contents</h1><ol>${toc.filter((t) => t.level === 1 || docsIn.length === 1 || true).map((t) => `<li class="l${t.level}"><a href="#${t.id}">${esc(t.text)}</a></li>`).join('')}</ol></section>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>
@page { size: A4; margin: 18mm 12mm 16mm 12mm; }
body { font-family: Inter, "Helvetica Neue", Arial, sans-serif; font-size: 9.5pt; line-height: 1.4; color: #1a1a1a; counter-reset: h2; }
.cover { page-break-after: always; padding-top: 30mm; } .brand { color: #2f6dc5; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
.cover-title { font-size: 26pt; margin: 8mm 0; } .cover-meta th { text-align: left; padding-right: 6mm; color: #555; } .note { color: #666; margin-top: 10mm; }
.toc { page-break-after: always; } .toc ol { list-style: none; padding: 0; } .toc .l1 { font-weight: 700; margin-top: 2mm; } .toc .l2 { margin-left: 6mm; }
.doc { page-break-before: always; counter-reset: h2; } .doc-title { font-size: 18pt; border-bottom: 2px solid #2f6dc5; padding-bottom: 2mm; }
h2 { counter-increment: h2; counter-reset: h3; font-size: 13pt; margin-top: 7mm; } h2::before { content: counter(h2) ". "; color: #2f6dc5; }
h3 { counter-increment: h3; font-size: 11pt; } h3::before { content: counter(h2) "." counter(h3) " "; color: #2f6dc5; }
table { border-collapse: collapse; width: 100%; margin: 3mm 0; font-size: 7.5pt; page-break-inside: auto; } tr { page-break-inside: avoid; }
th, td { border: 1px solid #ccc; padding: 1.2mm 1.5mm; vertical-align: top; overflow-wrap: anywhere; word-break: break-word; } th { background: #eef3fb; }
pre { white-space: pre-wrap; word-break: break-word; background: #f5f5f5; padding: 2mm; font-size: 7.5pt; } code { font-size: 8pt; overflow-wrap: anywhere; }
pre.mermaid { background: none; text-align: center; } figure { margin: 3mm 0; page-break-inside: avoid; } img { max-width: 100%; max-height: 235mm; border: 1px solid #ddd; }
blockquote { border-left: 3px solid #2f6dc5; margin: 3mm 0; padding: 1mm 4mm; background: #f7f9fd; } a { color: #2f6dc5; text-decoration: none; }
</style></head><body>${cover}${tocHtml}${parts.join('\n')}<script src="file://${MERMAID}"></script>
<script>window.mermaidDone = false; try { mermaid.initialize({ startOnLoad: false, theme: 'neutral' }); mermaid.run({ querySelector: 'pre.mermaid' }).then(() => { window.mermaidDone = true; }).catch(() => { window.mermaidDone = true; }); } catch (e) { window.mermaidDone = true; }</script></body></html>`;
}

if (process.env.ONLY) { const re = new RegExp(process.env.ONLY); books.splice(0, books.length, ...books.filter((x) => re.test(x.pdf))); }
const browser = await chromium.launch();
const results = [];
let n = 0;
for (const b of books) {
  const out = join(DOCS, b.pdf);
  const newest = Math.max(...b.members.map((f) => statSync(join(DOCS, f)).mtimeMs));
  if (!process.env.FORCE && existsSync(out) && statSync(out).mtimeMs > newest) { results.push({ pdf: b.pdf, members: b.members, status: 'skipped (current)' }); continue; } // eslint-disable-line no-continue
  const tmp = join(DOCS, dirname(b.members[0]), `.pdf-${n}.html`);
  try {
    writeFileSync(tmp, render(b));
    const page = await browser.newPage();
    await page.goto(`file://${tmp}`, { waitUntil: 'load', timeout: 120000 });
    await page.waitForFunction(() => window.mermaidDone === true, null, { timeout: 30000 }).catch(() => {});
    const missing = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
    const title = b.title || b.members[0];
    await page.pdf({
      path: out, format: 'A4', printBackground: true, displayHeaderFooter: true, margin: { top: '18mm', bottom: '16mm', left: '12mm', right: '12mm' },
      headerTemplate: `<div style="font-size:7px;width:100%;padding:0 12mm;color:#777;display:flex;justify-content:space-between"><span>TCS Corporate Website — ${esc(String(title).split('/').pop())}</span><span>INTERNAL — classification to be confirmed</span></div>`,
      footerTemplate: '<div style="font-size:7px;width:100%;padding:0 12mm;color:#777;text-align:right">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
    });
    await page.close();
    results.push({ pdf: b.pdf, members: b.members, status: 'generated', missingImages: missing });
  } catch (e) {
    results.push({ pdf: b.pdf, members: b.members, status: `failed: ${String(e.message).slice(0, 200)}` });
  } finally { if (existsSync(tmp) && !process.env.KEEP) unlinkSync(tmp); }
  n += 1;
  if (n % 25 === 0) console.log(new Date().toISOString().slice(11, 19), `${n} PDFs`);
}
await browser.close();
writeFileSync(join(DOCS, '.pdf-results.json'), JSON.stringify(results, null, 1));
console.log(JSON.stringify({ books: books.length, generated: results.filter((r) => r.status === 'generated').length, skipped: results.filter((r) => r.status.startsWith('skipped')).length, failed: results.filter((r) => r.status.startsWith('failed')).length, missingImages: results.reduce((k, r) => k + (r.missingImages || []).length, 0) }));
