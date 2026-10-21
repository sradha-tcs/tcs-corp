/* eslint-disable import/extensions -- Node tooling (for...of, .mjs modules) */
/*
 * The block documentation report (docs/blocks/BLOCK-DOCUMENTATION-REPORT.md): inventory, missing
 * and updated READMEs, discrepancies, links, screenshots and placeholders, field / tab, variation,
 * container-child, accessibility, data layer, personalization, responsive / performance,
 * deprecation and validation matrices, from the READMEs, the models (generate-block-docs.mjs),
 * the validation (validate-block-docs.mjs) and the per-block review notes in docs/blocks/reports/.
 * Usage: node tools/docs/report-block-docs.mjs [base-ref] (the git ref of the state before, for
 * the README inventory; default origin/main).
 */
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { componentsOf, fieldTables, loadInputs } from './generate-block-docs.mjs';
import { validateAll } from './validate-block-docs.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const base = process.argv[2] || 'origin/main';
const inputs = loadInputs(ROOT);
const { results, folderProblems } = validateAll(ROOT);
const byBlock = new Map(results.map((r) => [r.block, r]));
const esc = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ').trim();
const table = (head, rows) => [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(esc).join(' | ')} |`)].join('\n');
const git = (cmd) => { try { return execSync(`git ${cmd}`, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { return ''; } };

/** a review note (docs/blocks/reports/<block>.md) split into its sections */
function notes(block) {
  const file = resolve(ROOT, 'docs/blocks/reports', `${block}.md`);
  if (!existsSync(file)) return {};
  const out = {};
  let key = '';
  readFileSync(file, 'utf8').split('\n').forEach((line) => {
    const m = line.match(/^## (.+)$/);
    if (m) { key = m[1].trim(); out[key] = []; return; }
    if (key && line.trim()) out[key].push(line);
  });
  return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.join('\n').trim()]));
}
const oneLine = (text) => (text || '—').replace(/^- /gm, '').replace(/\n+/g, ' ').trim();

const readme = (b) => readFileSync(resolve(ROOT, 'blocks', b, 'README.md'), 'utf8');
const before = new Map(git(`ls-tree -r --name-only ${base} blocks`).split('\n')
  .filter((p) => /^blocks\/[^/]+\/README\.md$/.test(p))
  .map((p) => [p.split('/')[1], git(`show ${base}:${p}`).split('\n').length]));
const rootBefore = !!git(`ls-tree --name-only ${base} blocks/README.md`).trim();
const { blocks } = inputs;
const meta = (b) => inputs.meta.blocks[b] || {};
const placeholdersOf = (b) => [...readme(b).matchAll(/File name:\n([^\n]+)/g)].map((m) => m[1].trim());
const statusOf = (r) => (r && !r.problems.length ? 'Passed' : 'Failed');
const sections = [];
const add = (title, body) => sections.push(`## ${title}\n\n${body}`);

/* 1 inventory */
add('1. Block Documentation Inventory', table(
  ['Block', 'Display name', 'Type', 'Status', 'README', 'Lines', 'Handover screenshots linked', 'Placeholders', 'Validation'],
  blocks.map((b) => {
    const r = byBlock.get(b);
    return [b, meta(b).name || b, meta(b).type || '—', meta(b).status || '—', `[README](../../blocks/${b}/README.md)`, r?.lines || 0, r?.screenshots || 0, r?.placeholders || 0, statusOf(r)];
  }),
).replace(/\\\|/g, '|'));

/* 2 missing */
const missingBefore = blocks.filter((b) => !before.has(b));
add('2. Missing Documentation Report', [
  `Before this change (${base}): ${blocks.length - missingBefore.length} of ${blocks.length} block folders had a README; \`blocks/README.md\` ${rootBefore ? 'existed' : 'didn\'t exist'}.`,
  `Missing then: ${missingBefore.map((b) => `\`${b}\``).join(', ') || 'none'}.`,
  `Now: ${folderProblems.length ? folderProblems.join('; ') : `every block folder (${blocks.length}) has a README and the root README lists every block (folder checks: none failed).`}`,
  'Not documented on purpose: build output, coverage, caches and package output (none are in `blocks/`); items (Accordion Item, Card, CTA, …) have no folder of their own and are documented in their block\'s README.',
].join('\n\n'));

/* 3 existing README updates */
add('3. Existing README Update Report', table(
  ['Block', 'Lines before', 'Lines after', 'Changes'],
  blocks.filter((b) => before.has(b)).map((b) => [b, before.get(b), byBlock.get(b)?.lines || 0, oneLine(notes(b)['Existing README changes'])]),
));

/* 4 discrepancies */
add('4. Documentation-to-Implementation Discrepancy Report', [
  'Where the handover (or an earlier README) and the code differ, the READMEs describe the code; each item says what needs correcting (mostly the handover chapter, written before later changes).',
  ...blocks.map((b) => `### ${meta(b).name || b} (\`${b}\`)\n\n${notes(b).Discrepancies || '- None recorded.'}`),
].join('\n\n'));

/* 5 links */
const linkTotal = results.reduce((s, r) => s + r.links, 0);
const broken = results.flatMap((r) => r.problems.filter((p) => /broken (link|anchor)/.test(p)).map((p) => [r.file, p]));
add('5. Broken Link Report', [
  `${linkTotal} relative and absolute links checked in ${results.length} READMEs (files and heading anchors resolved by \`tools/docs/validate-block-docs.mjs\`; external https links not fetched).`,
  broken.length ? table(['README', 'Problem'], broken) : 'Broken links or anchors: none.',
].join('\n\n'));

/* 6 placeholders */
add('6. Screenshot Placeholder Inventory', [
  'Existing screenshots are linked from the handover (`docs/handover/screenshots/`, rendering at the time of the handover revision that added them); placeholders mark what has no screenshot yet (all Universal Editor dialogs, and states the handover didn\'t capture). Each placeholder states its file name, purpose and annotations.',
  table(['Block', 'Screenshots linked', 'Placeholders', 'Placeholder files'], blocks.map((b) => {
    const files = placeholdersOf(b);
    return [b, byBlock.get(b)?.screenshots || 0, files.length, files.join(', ')];
  })),
].join('\n\n'));

/* 7 fields and tabs */
const fieldRows = [];
blocks.forEach((b) => componentsOf(inputs, b).forEach((c) => {
  const tabs = fieldTables(c.model, new Set());
  fieldRows.push([b, `${c.title} (\`${c.id}\`)`, c.modelId || '—', tabs.map((t) => `${t.tab || 'Fields'} (${t.rows.length})`).join(', ') || 'No fields', tabs.reduce((s, t) => s + t.rows.length, 0), 'Verified: generated from the model']);
}));
add('7. Authoring Field and Dialog Tab Verification Matrix', [
  'The field tables of every README are generated from `component-models.json` (labels, properties, types, defaults, allowed values, visibility conditions) and checked by `npm test` (test/docs): they match the implementation by construction.',
  table(['Block', 'Component', 'Model', 'Tabs (fields)', 'Fields', 'Verification'], fieldRows),
  'The Header has no model (it is authored through the nav page; see its README).',
].join('\n\n'));

/* 8 variations */
add('8. Variation Verification Matrix', table(
  ['Block', 'Variations documented (and where they are defined)', 'Status'],
  blocks.map((b) => [b, oneLine(notes(b)['Variations verified']), notes(b)['Variations verified'] ? 'Verified against the code' : 'Not recorded']),
));

/* 9 container / child */
const rel = [];
blocks.forEach((b) => componentsOf(inputs, b).filter((c) => c.children.length).forEach((c) => {
  const folderOf = (id) => blocks.find((x) => componentsOf(inputs, x).some((cc) => cc.id === id));
  const childFolders = [...new Set(c.children.map(folderOf).filter((f) => f && f !== b))];
  const own = c.children.filter((id) => componentsOf(inputs, b).some((cc) => cc.id === id));
  const linksToChildren = childFolders.filter((f) => readme(b).includes(`../${f}/README.md`));
  const linksBack = childFolders.filter((f) => readme(f).includes(`../${b}/README.md`));
  rel.push([b, c.id, own.join(', ') || '—', childFolders.length ? `${linksToChildren.length} of ${childFolders.length}` : '—', childFolders.length ? `${linksBack.length} of ${childFolders.length}` : '—']);
}));
add('9. Container-Child Documentation Matrix', [
  'Items of a block (its own child models) are documented in the block\'s README; children that are blocks of their own are linked both ways where they are designed to be used together (the section containers allow most blocks: a link back from every block isn\'t expected).',
  table(['Container', 'Component', 'Its own items (in its README)', 'Child block READMEs linked from it', 'Linking back'], rel),
].join('\n\n'));

/* 10–13 */
const matrix = (title, key) => add(title, table(['Block', 'Documented'], blocks.map((b) => [b, oneLine(notes(b)[key])])));
matrix('10. Accessibility Documentation Matrix', 'Accessibility documented');
matrix('11. Data Layer and Analytics Documentation Matrix', 'Data layer documented');
add('12. Personalization Documentation Matrix', [
  'No block exposes personalization: the repository has no Adobe Target or AJO integration (the Teaser\'s Personalization marker was removed in handover 2.27). Each README says so and describes the default content as what renders.',
  table(['Block', 'Documented'], blocks.map((b) => [b, oneLine(notes(b).Personalization)])),
].join('\n\n'));
matrix('13. Responsive and Performance Documentation Matrix', 'Responsive / performance');

/* 14 deprecated */
add('14. Deprecated Block Report', table(
  ['Block', 'Status', 'Replacement', 'Compatibility and migration'],
  blocks.filter((b) => /deprecated|compatibility|experimental/i.test(`${meta(b).status} ${meta(b).category}`))
    .map((b) => [b, meta(b).status, meta(b).replacement || 'None', meta(b).deprecation || meta(b).purpose]),
));

/* 15 validation */
add('15. Documentation Validation Matrix', [
  'Fields verified: the generated tables are current (test/docs). Variations verified: the writer checked them in the code (section 8). Links validated: no broken link or anchor. Technical review: the README was written from the repository and checked by the validator (one H1, the required sections in order, fences with a language, no raw HTML, no sensitive values). Author review: a content author still has to walk through the authoring steps in Universal Editor (no author access in this review).',
  table(
    ['Block', 'README', 'Fields verified', 'Variations verified', 'Links validated', 'Technical review', 'Author review', 'Status'],
    [...blocks, '(root)'].map((b) => {
      const r = byBlock.get(b);
      const ok = r && !r.problems.length;
      const linkOk = r && !r.problems.some((p) => /broken/.test(p));
      const isRoot = b === '(root)';
      const passed = ok ? 'Passed' : 'Failed';
      let fields = 'Not applicable';
      if (!isRoot && componentsOf(inputs, b).length) fields = passed;
      let variations = 'Not applicable';
      if (!isRoot) variations = notes(b)['Variations verified'] ? 'Passed' : 'Blocked';
      return [b, r ? 'Present' : 'Missing', fields, variations, linkOk ? 'Passed' : 'Failed',
        passed, isRoot ? 'Not applicable' : 'Blocked', passed];
    }),
  ),
  results.some((r) => r.problems.length) ? table(['README', 'Problems'], results.filter((r) => r.problems.length).map((r) => [r.file, r.problems.join('; ')])) : 'Validator problems: none.',
].join('\n\n'));

/* 16 summary */
const open = blocks.map((b) => [b, oneLine(notes(b)['Open questions'])]).filter(([, q]) => q && q !== '—' && !/^none\.?$/i.test(q));
const discrepancies = blocks.reduce((s, b) => s + ((notes(b).Discrepancies || '').match(/^- /gm) || []).length, 0);
add('16. Final Documentation Summary', [
  `- ${blocks.length} block READMEs and \`blocks/README.md\`: ${missingBefore.length} created, ${blocks.length - missingBefore.length} restructured from the existing ones${rootBefore ? '' : '; the root README created'}.`,
  `- ${results.filter((r) => !r.problems.length).length} of ${results.length} READMEs pass validation; ${linkTotal} links checked, ${broken.length} broken.`,
  `- ${fieldRows.length} components' dialogs documented from the models (${fieldRows.reduce((s, r) => s + r[4], 0)} fields), ${results.reduce((s, r) => s + r.screenshots, 0)} handover screenshots linked, ${results.reduce((s, r) => s + r.placeholders, 0)} placeholders.`,
  `- ${discrepancies} documentation-to-implementation discrepancies recorded (section 4), mostly handover chapters written before later changes: the handover needs a pass to align them (the READMEs follow the code).`,
  '- Blocked: the author review in Universal Editor (dialog screenshots and walkthroughs on AEM author) and the analytics delivery (Adobe Tags and Web SDK not configured).',
  '- Kept current by `npm run build:docs` (generated sections) and `npm test` (test/docs: generated sections, links, structure).',
  open.length ? `\n### Open questions for authors and the product owner\n\n${table(['Block', 'Open questions'], open)}` : '',
].join('\n'));

const doc = `# Block Documentation Report

The validation and inventory reports of the block documentation (\`blocks/README.md\` and \`blocks/<block>/README.md\`), created on 21 October 2026 from the repository (\`main\` after pull request #128) and the project handover (version 2.36). Generated by \`node tools/docs/report-block-docs.mjs\`; the per-block review notes are in [reports/](reports/).

Contents: the README files themselves (deliverables 1 and 2: [blocks/README.md](../../blocks/README.md) and one README per block folder), then sections 1 to 16 below.

${sections.join('\n\n')}
`;
writeFileSync(resolve(ROOT, 'docs/blocks/BLOCK-DOCUMENTATION-REPORT.md'), doc);
// eslint-disable-next-line no-console
console.log(`report: ${sections.length} sections, ${results.length} READMEs, ${fieldRows.length} components`);
