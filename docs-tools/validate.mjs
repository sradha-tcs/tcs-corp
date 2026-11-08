// Documentation program: validation of the documentation set; writes DOCUMENTATION-VALIDATION-REPORT.md with
// the actual results (Passed / Failed / Not validated per check) and exits 1 when a blocking check fails.
// Usage: node validate.mjs <docs dir> <repo>
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';
import { init, writeDoc, table, ghAnchor, TODAY } from './lib.mjs';

const [DOCS, REPO] = process.argv.slice(2);
init(DOCS, REPO);
const walk = (dir, base = '') => readdirSync(dir).filter((f) => !f.startsWith('.')).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p, `${base}${f}/`) : [`${base}${f}`]; });
const files = walk(DOCS);
const mds = files.filter((f) => f.endsWith('.md') && f !== 'DOCUMENTATION-VALIDATION-REPORT.md');
const read = (f) => readFileSync(join(DOCS, f), 'utf8');
const fm = (s) => { const m = s.match(/^---\n([\s\S]*?)\n---\n/); if (!m) return null; const o = {}; m[1].split('\n').forEach((l) => { const i = l.indexOf(':'); try { o[l.slice(0, i)] = JSON.parse(l.slice(i + 1).trim()); } catch { o[l.slice(0, i)] = l.slice(i + 1).trim(); } }); return o; };
const stripCode = (s) => s.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
const anchorsOf = {};
const anchors = (f) => {
  if (!anchorsOf[f]) { const seen = { contents: 0 }; anchorsOf[f] = new Set([...read(f).replace(/```[\s\S]*?```/g, '').matchAll(/^#{1,6} (.+)$/gm)].map((m) => ghAnchor(m[1].replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, ''), seen))); }
  return anchorsOf[f];
};
const checks = [];
const check = (name, ok, detail, blocking = true) => checks.push({ name, status: ok === null ? 'Not validated' : (ok ? 'Passed' : 'Failed'), detail, blocking });

// metadata
const REQ = ['id', 'title', 'role', 'audience', 'owner', 'version', 'status', 'lastUpdated', 'lastValidated'];
const metaDocs = mds.filter((f) => read(f).startsWith('---\n'));
const missingMeta = metaDocs.map((f) => [f, REQ.filter((k) => !fm(read(f))[k])]).filter(([, m]) => m.length);
check('Required metadata (front matter) present', !missingMeta.length, `${metaDocs.length} documents with metadata; ${missingMeta.length} incomplete${missingMeta.length ? `: ${missingMeta.slice(0, 3).map(([f, m]) => `${f} (${m.join(', ')})`).join('; ')}` : ''}`);
const SECTIONS = ['## Contents', '## Screenshots', '## Known limitations', '## Open items', '## Change history'];
const missingSec = metaDocs.filter((f) => SECTIONS.some((s) => !read(f).includes(`\n${s}\n`)));
check('Required sections (contents, screenshots, limitations, open items, change history)', !missingSec.length, `${missingSec.length} documents miss a section${missingSec.length ? `: ${missingSec.slice(0, 3).join(', ')}` : ''}`);
const ids = {}; metaDocs.forEach((f) => { const id = fm(read(f)).id; (ids[id] ||= []).push(f); });
const dup = Object.entries(ids).filter(([, v]) => v.length > 1);
check('Unique document IDs', !dup.length, dup.length ? dup.slice(0, 5).map(([k, v]) => `${k}: ${v.join(', ')}`).join('; ') : `${Object.keys(ids).length} IDs`);
const indexOnly = mds.filter((f) => !read(f).startsWith('---\n'));
check('Index files without metadata (README indexes)', true, `${indexOnly.length} README / index files (navigation only)`, false);

// links and images
const broken = []; const brokenImg = []; const brokenAnchor = []; let linkCount = 0; let external = 0;
mds.forEach((f) => {
  const s = stripCode(read(f));
  for (const m of s.matchAll(/(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const [, bang, , href] = m; linkCount += 1;
    if (/^[a-z]+:/i.test(href)) { external += 1; continue; } // eslint-disable-line no-continue
    const [p, a] = href.split('#');
    const t = p ? posix.normalize(posix.join(posix.dirname(f), decodeURIComponent(p))) : f;
    if (p && !existsSync(join(DOCS, t))) { (bang ? brokenImg : broken).push(`${f} → ${href}`); continue; } // eslint-disable-line no-continue
    if (a && t.endsWith('.md') && !anchors(t).has(a)) brokenAnchor.push(`${f} → ${href}`);
  }
});
check('Internal links resolve', !broken.length, `${linkCount} links (${external} external, not fetched); ${broken.length} broken${broken.length ? `: ${broken.slice(0, 5).join('; ')}` : ''}`);
check('Relative images resolve', !brokenImg.length, `${brokenImg.length} missing${brokenImg.length ? `: ${brokenImg.slice(0, 5).join('; ')}` : ''}`);
check('Heading anchors of internal links exist', !brokenAnchor.length, `${brokenAnchor.length} missing anchors${brokenAnchor.length ? `: ${brokenAnchor.slice(0, 5).join('; ')}` : ''}`, false);
// screenshots
const imgs = files.filter((f) => /\.(jpe?g|png|gif|svg|webp)$/i.test(f));
const referenced = new Set(); mds.forEach((f) => { for (const m of stripCode(read(f)).matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)) if (!/^[a-z]+:/i.test(m[1])) referenced.add(posix.normalize(posix.join(posix.dirname(f), decodeURIComponent(m[1])))); });
const orphans = imgs.filter((f) => !referenced.has(f));
check('No orphan screenshots', !orphans.length, `${imgs.length} images; ${orphans.length} not embedded${orphans.length ? `: ${orphans.slice(0, 5).join(', ')}` : ''}`);
const reg = existsSync(join(DOCS, 'SCREENSHOT-REGISTER.md')) ? read('SCREENSHOT-REGISTER.md') : '';
const notRegistered = imgs.filter((f) => !reg.includes(`](${f})`));
check('Every screenshot in the screenshot register', !notRegistered.length, `${notRegistered.length} not registered${notRegistered.length ? `: ${notRegistered.slice(0, 5).join(', ')}` : ''}`);
const placeholders = mds.reduce((n, f) => n + (read(f).match(/> \*\*Screenshot required\*\*/g) || []).length, 0);
check('Screenshot placeholders are visible where a screenshot could not be captured', true, `${placeholders} placeholders (Universal Editor / author screens: access blocker AB-01)`, false);
// PDFs
const pdfRes = existsSync(join(DOCS, '.pdf-results.json')) ? JSON.parse(read('.pdf-results.json')) : null;
if (pdfRes) {
  const failed = pdfRes.filter((r) => r.status.startsWith('failed'));
  const missingPdf = pdfRes.filter((r) => !existsSync(join(DOCS, r.pdf)));
  const missingImages = pdfRes.reduce((n, r) => n + (r.missingImages || []).length, 0);
  check('PDFs generated', !failed.length && !missingPdf.length, `${pdfRes.length} PDFs; ${failed.length} failed; ${missingPdf.length} missing${failed.length ? `: ${failed.slice(0, 3).map((r) => r.pdf).join(', ')}` : ''}`);
  check('No missing images in the PDFs', !missingImages, `${missingImages} images not loaded while rendering`);
  const inBooks = new Set(pdfRes.flatMap((r) => r.members));
  const primaries = metaDocs.filter((f) => fm(read(f)).primary === true);
  const unpaired = primaries.filter((f) => !inBooks.has(f) && !/^(README|DOCUMENTATION-|SCREENSHOT-REGISTER|GLOSSARY)/.test(f));
  check('Every primary document is in a PDF', !unpaired.length, `${primaries.length} primary documents; ${unpaired.length} not in a PDF${unpaired.length ? `: ${unpaired.slice(0, 5).join(', ')}` : ''} (root registers are Markdown only)`);
} else check('PDFs generated', null, 'pdf.mjs has not run');
// JSON
const jsons = files.filter((f) => f.endsWith('.json'));
const badJson = jsons.filter((f) => { try { JSON.parse(read(f)); return false; } catch { return true; } });
check('JSON files are valid', !badJson.length, `${jsons.length} JSON files; ${badJson.length} invalid${badJson.length ? `: ${badJson.join(', ')}` : ''}`);
// completeness
const blocks = readdirSync(join(REPO, 'blocks')).filter((b) => statSync(join(REPO, 'blocks', b)).isDirectory());
const needed = blocks.flatMap((b) => [`02-development/blocks/${b}/${b.toUpperCase()}-DEVELOPER-GUIDE.md`, `02-development/blocks/${b}/${b.toUpperCase()}-VARIATIONS.md`, `02-development/blocks/${b}/${b.toUpperCase()}-TEST-COVERAGE.md`, `05-quality-assurance/test-cases/blocks/${b}/${b.toUpperCase()}-TEST-CASES.md`]);
const missingBlockDocs = needed.filter((f) => !existsSync(join(DOCS, f)));
check('Every block has developer, variation, test coverage and test case documents', !missingBlockDocs.length, `${blocks.length} blocks; ${missingBlockDocs.length} documents missing${missingBlockDocs.length ? `: ${missingBlockDocs.slice(0, 5).join(', ')}` : ''}`);
// stale source references
const stale = [];
metaDocs.forEach((f) => (fm(read(f)).sourceFiles || []).flatMap((s) => String(s).replace(/\(.*?\)/g, '').split(/[\s,]+/)).forEach((p) => { if (/^(blocks|scripts|styles|utils|decorators|models|test|tools|docs|templates|\.github)\//.test(p) && !p.includes('*') && !p.endsWith('/') && !existsSync(join(REPO, p))) stale.push(`${f}: ${p}`); }));
check('Source file references exist in the repository', !stale.length, `${stale.length} stale${stale.length ? `: ${[...new Set(stale)].slice(0, 5).join('; ')}` : ''}`);
// markers
const markers = mds.flatMap((f) => [...stripCode(read(f)).matchAll(/\b(TODO|TBD|FIXME)\b/g)].map(() => f));
check('No unresolved TODO / TBD / FIXME markers', !markers.length, `${markers.length} markers${markers.length ? ` in ${[...new Set(markers)].slice(0, 5).join(', ')}` : ''}; open items are written as "To be confirmed" with an owner`);
// markdown lint (basic)
const multiH1 = metaDocs.filter((f) => (stripCode(read(f)).match(/^# /gm) || []).length !== 1);
check('Markdown: exactly one H1 per document', !multiH1.length, `${multiH1.length} documents${multiH1.length ? `: ${multiH1.slice(0, 5).join(', ')}` : ''}`, false);
const rawPaths = mds.filter((f) => /\/(backups|tmp|home\/node)\//.test(stripCode(read(f))));
check('No local absolute file paths', !rawPaths.length, `${rawPaths.length} documents${rawPaths.length ? `: ${rawPaths.slice(0, 5).join(', ')}` : ''}`);
const secrets = mds.filter((f) => /author-p\d+-e\d+|Bearer [A-Za-z0-9]{12}/.test(read(f)));
check('No AEM program / environment ids or tokens', !secrets.length, `${secrets.length} documents${secrets.length ? `: ${secrets.slice(0, 5).join(', ')}` : ''}`);
check('Cross-browser, manual and author validation', null, 'Not validated in this program (access blockers AB-01, AB-03 to AB-05)', false);

const failedBlocking = checks.filter((c) => c.status === 'Failed' && c.blocking);
writeDoc('DOCUMENTATION-VALIDATION-REPORT.md', {
  id: 'DOC-004', title: 'Documentation Validation Report', role: 'Documentation', audience: 'Documentation owner, every role owner', owner: 'Documentation Owner',
  purpose: 'The actual results of the automated validation of this documentation set', confidence: 'High', primary: false,
  body: `## Result\n\n**${failedBlocking.length ? 'Failed' : 'Passed'}** (${checks.filter((c) => c.status === 'Passed').length} passed, ${checks.filter((c) => c.status === 'Failed').length} failed, ${checks.filter((c) => c.status === 'Not validated').length} not validated; run on ${TODAY} with \`node validate.mjs\`).\n\n## Checks\n\n${table(['Check', 'Status', 'Blocking', 'Detail'], checks.map((c) => [c.name, c.status, c.blocking ? 'Yes' : 'No', c.detail]))}\n\n## Totals\n\n${table(['Measure', 'Value'], [['Markdown files', mds.length], ['Documents with metadata', metaDocs.length], ['PDF files', files.filter((f) => f.endsWith('.pdf')).length], ['Images', imgs.length], ['JSON files', jsons.length]])}`,
});
console.log(JSON.stringify(checks.map((c) => `${c.status}: ${c.name} — ${c.detail.slice(0, 160)}`), null, 1));
process.exit(failedBlocking.length ? 1 : 0);
