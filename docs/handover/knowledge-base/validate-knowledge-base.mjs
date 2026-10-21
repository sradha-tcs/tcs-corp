/* eslint-disable no-restricted-syntax, import/extensions -- Node tooling (for...of, .mjs) */
/*
 * Validation of the project knowledge base (docs/handover/knowledge-base): the required pages
 * exist; each has one H1, the attribute table (Audience, Source of truth, Last reviewed, Status)
 * and ends with a Related section; relative links and anchors resolve; fenced code has a
 * language; no raw HTML; no confidential ids, hosts or credentials; README.md links every page.
 * From the repository root:
 *   node docs/handover/knowledge-base/validate-knowledge-base.mjs
 *     checks (exit code 1 on problems);
 *   node docs/handover/knowledge-base/validate-knowledge-base.mjs --report
 *     also rewrites the reports in reports/ (broken links, validation matrix, discrepancies,
 *     missing documentation, summary) from the validation and the review notes in reports/notes/
 */
import { execSync } from 'node:child_process';
import {
  existsSync, readdirSync, readFileSync, statSync, writeFileSync,
} from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { headingsOf } from '../../../tools/docs/validate-block-docs.mjs';

const KB = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(KB, '../../..');
export const TOPICS = ['project-overview', 'repository-structure', 'architecture',
  'content-architecture', 'authoring', 'blocks', 'universal-editor', 'decorators-and-utilities',
  'design-system', 'accessibility', 'data-layer-and-analytics', 'personalization',
  'indexing-and-search', 'performance', 'security-privacy-consent', 'development-standards',
  'testing-and-quality', 'deployment-and-release', 'administration-and-operations',
  'troubleshooting', 'agent-guidelines', 'decision-log', 'glossary', 'references'];
const AGENT_FILES = ['agent-instructions', 'copilot-instructions'];
const REPORTS = ['README', 'repository-inventory', 'discrepancy-report', 'missing-documentation-report',
  'broken-link-report', 'validation-matrix', 'final-summary'];
const SENSITIVE = [/\bp\d{6}\b/, /\be\d{7}\b/, /adobeaemcloud\.com/i, /author-p\d+/i,
  /(api[_-]?key|secret|password|bearer)\s*[:=]\s*\S{8,}/i, /\bgh[pousr]_[A-Za-z0-9]{20,}/,
  /[A-Za-z0-9._%+-]+@(?!example\.)[A-Za-z0-9.-]+\.[a-z]{2,}/];
const ATTRIBUTES = ['Audience', 'Source of truth', 'Last reviewed', 'Status'];

const withoutCode = (text) => {
  let inFence = false;
  return text.split('\n').map((line) => {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return ''; }
    return inFence ? '' : line;
  });
};

/** the problems of one page; kind: topic | agent | report | readme */
export function validatePage(file, kind) {
  const text = readFileSync(file, 'utf8');
  const problems = [];
  const headings = headingsOf(text);
  const h1 = headings.filter((h) => h.level === 1);
  if (h1.length !== 1) problems.push(`${h1.length} H1 headings (one expected)`);
  if (kind === 'topic' || kind === 'readme') {
    ATTRIBUTES.forEach((a) => {
      if (!new RegExp(`^\\| ${a} \\|`, 'm').test(text)) problems.push(`attribute table: no "${a}" row`);
    });
  }
  if (kind === 'topic') {
    const h2 = headings.filter((h) => h.level === 2);
    if (h2[h2.length - 1]?.text !== 'Related') problems.push('the last section isn\'t "## Related"');
  }
  let open = false;
  text.split('\n').forEach((line, i) => {
    const m = line.match(/^\s*```(.*)$/);
    if (!m) return;
    if (!open && !m[1].trim()) problems.push(`line ${i + 1}: code fence without a language`);
    open = !open;
  });
  if (open) problems.push('unclosed code fence');
  const lines = withoutCode(text);
  const links = [];
  lines.forEach((line, i) => {
    const plain = line.replace(/`[^`]*`/g, '');
    for (const m of plain.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) links.push({ target: m[1], line: i + 1 });
    const tag = plain.replace(/<!--.*?-->/g, '').match(/<\/?([a-z][a-z0-9-]*)(\s[^>]*)?>/i);
    if (tag) problems.push(`line ${i + 1}: raw HTML or unescaped tag-like text "${tag[0]}"`);
  });
  const broken = [];
  links.forEach(({ target, line }) => {
    if (/^(https?:|mailto:)/.test(target)) return;
    const [path, anchor] = target.split('#');
    const resolved = path ? resolve(dirname(file), decodeURIComponent(path)) : file;
    if (path && !existsSync(resolved)) { broken.push(`line ${line}: broken link ${target}`); return; }
    if (anchor && resolved.endsWith('.md') && statSync(resolved).isFile()) {
      const anchors = new Set(headingsOf(readFileSync(resolved, 'utf8')).map((h) => h.anchor));
      if (!anchors.has(anchor.toLowerCase())) broken.push(`line ${line}: broken anchor ${target}`);
    }
  });
  problems.push(...broken);
  text.split('\n').forEach((line, i) => {
    SENSITIVE.forEach((re) => { if (re.test(line)) problems.push(`line ${i + 1}: possible sensitive value (${re})`); });
  });
  return {
    file: relative(ROOT, file),
    kind,
    problems,
    links: links.length,
    broken,
    lines: text.split('\n').length,
    mermaid: (text.match(/```mermaid/g) || []).length,
  };
}

const pathOf = (name, kind) => (kind === 'report' ? resolve(KB, 'reports', `${name}.md`) : resolve(KB, `${name}.md`));

/** every page and the knowledge-base-level checks */
export function validateAll() {
  const missing = [];
  const results = [];
  const pages = [['README', 'readme'], ...TOPICS.map((t) => [t, 'topic']), ...AGENT_FILES.map((a) => [a, 'agent']), ...REPORTS.map((r) => [r, 'report'])];
  pages.forEach(([name, kind]) => {
    const file = pathOf(name, kind);
    if (!existsSync(file)) { missing.push(relative(ROOT, file)); return; }
    results.push({ name, ...validatePage(file, kind) });
  });
  const readme = existsSync(resolve(KB, 'README.md')) ? readFileSync(resolve(KB, 'README.md'), 'utf8') : '';
  const unlisted = [...TOPICS, ...AGENT_FILES].filter((t) => !readme.includes(`(./${t}.md)`));
  const agents = readFileSync(resolve(ROOT, 'AGENTS.md'), 'utf8');
  const pointers = [];
  if (!agents.includes('docs/handover/knowledge-base/README.md')) pointers.push('AGENTS.md doesn\'t point to the knowledge base');
  const blocksReadme = readFileSync(resolve(ROOT, 'blocks/README.md'), 'utf8');
  if (!blocksReadme.includes('docs/handover/knowledge-base/README.md')) pointers.push('blocks/README.md doesn\'t point to the knowledge base');
  return {
    results, missing, unlisted, pointers,
  };
}

/* ------------------------------------------------------------------ reports */

const esc = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ').trim();
const table = (head, rows) => [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(esc).join(' | ')} |`)].join('\n');

/** a review note split into its sections */
function notesOf(name) {
  const file = resolve(KB, 'reports/notes', `${name}.md`);
  if (!existsSync(file)) return null;
  const out = {};
  let key = '';
  readFileSync(file, 'utf8').split('\n').forEach((line) => {
    const m = line.match(/^## (.+)$/);
    if (m) { key = m[1].trim(); out[key] = []; return; }
    if (key && /^\s*- /.test(line)) out[key].push(line.replace(/^\s*- /, '').trim());
    else if (key && line.trim() && out[key].length) out[key][out[key].length - 1] += ` ${line.trim()}`;
  });
  return out;
}

const header = (title, purpose) => `# ${title}

${purpose}

| Attribute | Value |
| --- | --- |
| Audience | Project leads, documentation owners, reviewers, AI agents |
| Source of truth | The validation (\`validate-knowledge-base.mjs\`) and the review notes in [notes/](./notes/) |
| Last reviewed | Generated from main at commit ${execSync('git rev-parse --short HEAD', { cwd: ROOT, encoding: 'utf8' }).trim()} |
| Status | Current (regenerate with \`node docs/handover/knowledge-base/validate-knowledge-base.mjs --report\`) |
`;

function writeReports(state) {
  const { results } = state;
  const names = [...TOPICS, ...AGENT_FILES];
  const write = (name, body) => writeFileSync(resolve(KB, 'reports', `${name}.md`), `${body.trim()}\n`);

  // discrepancies
  const rows = [];
  names.forEach((n) => (notesOf(n)?.Discrepancies || []).filter((d) => !/^none\.?$/i.test(d)).forEach((d) => {
    const part = (k) => (d.match(new RegExp(`${k}:\\s*([^|]+)`, 'i')) || [])[1]?.trim() || '';
    rows.push([n, part('implementation') || d, part('documented'), part('impact'), part('correct')]);
  }));
  write('discrepancy-report', `${header('Documentation-to-Implementation Discrepancy Report', 'Every difference found while writing the knowledge base between the implementation and the documentation (mostly the handover, written before later changes; also AGENTS.md, READMEs and comments). The knowledge base pages describe the implementation; the last column says which source must be corrected. The 170 block-level differences are in the [block documentation report](../../../blocks/BLOCK-DOCUMENTATION-REPORT.md), section 4.')}
## Open items found during the knowledge base work

| Item | Evidence | Impact | Correction |
| --- | --- | --- | --- |
| The language master's block library, reference and 404 pages were in the live query index (corrected) | 166 + 6 + 1 of the 354 rows of \`/query-index.json\` on aem.live (21 October 2026): \`helix-query.yaml\` excluded \`/*/block-library\` and the others, one folder level only | Lists and Filter Lists rooted at the language master could list them | Corrected and passed: excludes for \`/language-master/*/…\` (#131), the 173 rows removed (Admin API index DELETE); index 354 → 181 rows (F-108 closed) |
| CI runs lint only | \`.github/workflows/main.yaml\` runs \`npm run lint\`; \`npm test\` (311 tests) isn't run on pull requests | Unit-test regressions (including the generated-docs checks) are only caught locally | Workflow: add \`npm test\`; AGENTS.md "use gh pr checks" wording |

## By knowledge base page

${table(['Page', 'Implementation', 'Documented', 'Impact', 'Correct'], rows)}

${rows.length} differences recorded.`);

  // missing documentation
  const gaps = [];
  names.forEach((n) => (notesOf(n)?.['Gaps and blocked topics'] || []).filter((g) => !/^none\.?$/i.test(g)).forEach((g) => gaps.push([n, g])));
  write('missing-documentation-report', `${header('Missing Documentation Report', 'What the knowledge base couldn\'t document from verified sources, and the inputs needed to complete it.')}
## Required knowledge base pages

${state.missing.length ? state.missing.map((m) => `- Missing: \`${m}\``).join('\n') : `All ${TOPICS.length + AGENT_FILES.length + 1} required pages exist (the ${TOPICS.length} topic pages, the agent instruction pages and README.md).`}

## Outside the knowledge base

- \`.github/copilot-instructions.md\` doesn't exist: GitHub Copilot reads only that path. Its content is ready in [copilot-instructions.md](../copilot-instructions.md); placing it there is a project decision (this knowledge base was created entirely under \`docs/handover/knowledge-base/\`).
- Not in the repository (blocked for every page that depends on them): the measurement plan (Analytics / CJA), the consent model, Adobe Target / AJO requirements, the Figma files (only frame names are cited), a release and support guide beyond the handover, owners and permissions of the AEM author environment, the applied site configuration.

## Gaps and blocked topics by page

${table(['Page', 'Gap or blocked topic'], gaps)}`);

  // broken links
  const broken = results.flatMap((r) => r.broken.map((b) => [r.file, b]));
  const total = results.reduce((s, r) => s + r.links, 0);
  write('broken-link-report', `${header('Broken Link Report', 'Relative links and heading anchors of the knowledge base, resolved against the repository (external https links are listed, not fetched).')}
${total} links checked in ${results.length} pages.

${broken.length ? table(['Page', 'Problem'], broken) : 'Broken links or anchors: none.'}`);

  // validation matrix
  const vrows = [['README.md', 'readme'], ...names.map((n) => [n, TOPICS.includes(n) ? 'topic' : 'agent']), ...REPORTS.map((r) => [r, 'report'])].map(([n, kind]) => {
    const r = results.find((x) => x.name === n && x.kind === kind);
    const notes = notesOf(n);
    const gapCount = (notes?.['Gaps and blocked topics'] || []).filter((g) => !/^none\.?$/i.test(g)).length;
    let verified = 'Not applicable';
    if (kind === 'topic' || kind === 'agent') verified = notes?.['Sources inspected']?.length ? 'Passed' : 'Blocked';
    if (kind === 'readme') verified = 'Passed';
    return [`${kind === 'report' ? 'reports/' : ''}${n === 'README' && kind === 'readme' ? 'README' : n}.md`, 'Created',
      verified, r && !r.broken.length ? 'Passed' : 'Failed',
      'Blocked', gapCount ? `${gapCount} recorded gaps (missing-documentation-report); awaiting review by the project team` : 'Awaiting review by the project team'];
  });
  write('validation-matrix', `${header('Knowledge Base Validation Matrix', 'The status of each knowledge base page. Implementation Verified: written from the repository with its sources recorded in the review notes. Links Validated: no broken link or anchor. Review Status: the project team\'s review of the page (not done yet: Blocked). Statuses: Passed, Failed, Corrected and passed, Blocked, Not applicable.')}
${table(['File/Area', 'Created or Updated', 'Implementation Verified', 'Links Validated', 'Review Status', 'Gaps'], vrows)}

| Area | Created or Updated | Implementation Verified | Links Validated | Review Status | Gaps |
| --- | --- | --- | --- | --- | --- |
| \`AGENTS.md\` (knowledge base section) | Updated | Passed | ${state.pointers.length ? 'Failed' : 'Passed'} | Blocked | Awaiting review |
| \`blocks/README.md\` and the block READMEs (link to the knowledge base) | Updated | Passed | ${state.pointers.length ? 'Failed' : 'Passed'} | Blocked | Awaiting review |
| \`.github/copilot-instructions.md\` | Not created (all files under the knowledge base folder) | Not applicable | Not applicable | Blocked | Placement is a project decision |

Structure checks (one H1, attribute table, Related section, fences, raw HTML, sensitive values): ${results.filter((r) => r.problems.length).length ? results.filter((r) => r.problems.length).map((r) => `${r.file}: ${r.problems.map((p) => `\`${p.replace(/`/g, "'")}\``).join('; ')}`).join(' / ') : 'all pages passed'}.`);

  // final summary
  const lines = results.reduce((s, r) => s + r.lines, 0);
  const decisions = (readFileSync(resolve(KB, 'decision-log.md'), 'utf8').match(/^\| KB-D-\d+/gm) || []).length;
  write('final-summary', `${header('Final Knowledge Base Summary', 'What the knowledge base contains, how it was validated and what remains open.')}
- **Pages:** ${TOPICS.length} topic pages, the agent and Copilot instruction pages, README.md (the entry point) and ${REPORTS.length - 1} reports plus the [repository inventory](./repository-inventory.md): ${results.length} pages, ${lines} lines, ${results.reduce((s, r) => s + r.mermaid, 0)} Mermaid diagrams, all under \`docs/handover/knowledge-base/\`.
- **Sources:** the repository at the commit above (code, configuration, models, tests), AGENTS.md, the block READMEs, the decorator / utility / template READMEs, the audit reports and the handover (version 2.37); each page's sources are listed in [notes/](./notes/).
- **Validation:** ${total} links checked, ${broken.length} broken; ${results.filter((r) => !r.problems.length).length} of ${results.length} pages pass the structure, link and sensitive-value checks.
- **Decisions:** ${decisions} entries in the [decision log](../decision-log.md) (verified decisions and open proposals).
- **Discrepancies:** ${rows.length} documentation-to-implementation differences ([discrepancy report](./discrepancy-report.md)), plus the 170 block-level ones of the block documentation report; open item: CI without unit tests (the query index finding F-108 is corrected).
- **Blocked:** the measurement plan, consent model, personalization requirements, Figma files, AEM author access (Universal Editor checks, permissions), owners; the project team's review of each page.
- **Entry points for agents:** [AGENTS.md](../../../../AGENTS.md) points to [the knowledge base](../README.md) and [agent-guidelines](../agent-guidelines.md); the content for \`.github/copilot-instructions.md\` is in [copilot-instructions](../copilot-instructions.md).`);

  write('README', `${header('Knowledge Base Reports', 'The inventories and validation reports of the knowledge base.')}
| Report | Content |
| --- | --- |
| [repository-inventory.md](./repository-inventory.md) | Every root file, folder, script, style, block, decorator, utility, template, model, tool and test: purpose, consumers, dependencies, status |
| [discrepancy-report.md](./discrepancy-report.md) | Documentation-to-implementation differences, with the source to correct |
| [missing-documentation-report.md](./missing-documentation-report.md) | Gaps, blocked topics and the inputs they need |
| [broken-link-report.md](./broken-link-report.md) | Link and anchor validation |
| [validation-matrix.md](./validation-matrix.md) | The status of every page |
| [final-summary.md](./final-summary.md) | Totals and open items |
| [notes/](./notes/) | The review notes of each page (sources, discrepancies, gaps, decisions, recommendations) |`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let state = validateAll();
  if (process.argv.includes('--report')) {
    writeReports(state);
    state = validateAll();
    writeReports(state);
    state = validateAll();
  }
  const failing = state.results.filter((r) => r.problems.length);
  const summary = {
    pages: state.results.length,
    missing: state.missing,
    unlisted: state.unlisted,
    pointers: state.pointers,
    failing: failing.map((r) => ({ file: r.file, problems: r.problems })),
  };
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(summary, null, 1));
  const bad = state.missing.length || state.unlisted.length || state.pointers.length
    || failing.length;
  process.exitCode = bad ? 1 : 0;
}

export { readdirSync };
