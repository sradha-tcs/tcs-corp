/* eslint-disable no-restricted-syntax, import/extensions -- Node tooling (for...of, .mjs) */
/*
 * Validation of the block documentation (blocks/README.md and blocks/<block>/README.md): every
 * block folder has a README listed in the root inventory; one H1 and the required sections in
 * order; the generated sections current (generate-block-docs.mjs); relative links and anchors
 * resolve; fenced code blocks have a language; no raw HTML outside code; no environment
 * identifiers or credentials. Used by test/docs and `node tools/docs/validate-block-docs.mjs`
 * (prints the results as JSON).
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadInputs, renderReadme } from './generate-block-docs.mjs';

export const REQUIRED_SECTIONS = [
  'Overview', 'Visual Reference', 'For Content Authors', 'Authorable Fields',
  'Screenshot-Based Authoring Steps', 'Variations', 'Complete Authoring Example',
  'Content and Asset Guidelines', 'Accessibility', 'Data Layer and Analytics', 'Personalization',
  'Responsive Behavior', 'For Developers', 'Extending the Block', 'For Site Administrators',
  'For Architects', 'For QA and Support Teams', 'Troubleshooting', 'Performance Considerations',
  'Security and Privacy', 'Known Limitations', 'Related Documentation', 'Change History',
];
export const ROOT_SECTIONS = ['Overview', 'Block Inventory', 'Blocks by Category',
  'Container and Child Relationships', 'Shared Conventions', 'Deprecated Blocks'];
const BLOCK_MARKERS = ['fields', 'screenshots', 'files', 'usage'];
const SENSITIVE = [/\bp\d{6}\b/, /\be\d{7}\b/, /adobeaemcloud\.com/i, /author-p\d+/i,
  /(api[_-]?key|secret|password|bearer)\s*[:=]\s*\S{8,}/i, /\bgh[pousr]_[A-Za-z0-9]{20,}/];

/** GitHub's heading anchor */
export const slug = (text) => text.trim().toLowerCase()
  .replace(/<[^>]+>/g, '')
  .replace(/[`*_~]/g, (c) => (c === '_' ? '_' : ''))
  .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/[^\p{L}\p{N}\s_-]/gu, '')
  .replace(/\s/g, '-');

/** the document without its fenced code (lines kept, so line numbers stay) */
function withoutCode(text) {
  let inFence = false;
  return text.split('\n').map((line) => {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return ''; }
    return inFence ? '' : line;
  });
}

export function headingsOf(text) {
  const anchors = new Map();
  const list = [];
  withoutCode(text).forEach((line, i) => {
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) return;
    const base = slug(m[2]);
    const n = anchors.get(base) || 0;
    anchors.set(base, n + 1);
    list.push({
      level: m[1].length, text: m[2], anchor: n ? `${base}-${n}` : base, line: i + 1,
    });
  });
  return list;
}

/** the problems of one README */
export function validateReadme(root, file, inputs, block) {
  const text = readFileSync(file, 'utf8');
  const problems = [];
  const headings = headingsOf(text);
  const h1 = headings.filter((h) => h.level === 1);
  if (h1.length !== 1) problems.push(`${h1.length} H1 headings (one expected)`);
  const h2 = headings.filter((h) => h.level === 2).map((h) => h.text);
  const required = block ? REQUIRED_SECTIONS : ROOT_SECTIONS;
  let last = -1;
  required.forEach((name) => {
    const at = h2.indexOf(name);
    if (at < 0) problems.push(`missing section "## ${name}"`);
    else if (at < last) problems.push(`section "## ${name}" out of order`);
    else last = at;
  });
  // heading levels don't skip (an H4 needs an H3 above it, after the H2)
  let previous = 1;
  headings.slice(1).forEach((h) => {
    if (h.level > previous + 1) problems.push(`line ${h.line}: heading level skips from H${previous} to H${h.level} ("${h.text}")`);
    previous = h.level;
  });
  // generated sections present and current
  if (block) {
    BLOCK_MARKERS.forEach((name) => {
      if (!text.includes(`<!-- BEGIN GENERATED: ${name} (npm run build:docs) -->`)) problems.push(`missing generated section "${name}"`);
    });
  }
  if (renderReadme(text, inputs, block) !== text) problems.push('generated sections out of date (npm run build:docs)');
  // fences: balanced, with a language
  let open = false;
  text.split('\n').forEach((line, i) => {
    const m = line.match(/^\s*```(.*)$/);
    if (!m) return;
    if (!open && !m[1].trim()) problems.push(`line ${i + 1}: code fence without a language`);
    open = !open;
  });
  if (open) problems.push('unclosed code fence');
  // links and anchors
  const lines = withoutCode(text);
  const links = [];
  lines.forEach((line, i) => {
    const plain = line.replace(/`[^`]*`/g, '');
    for (const m of plain.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) links.push({ target: m[1], line: i + 1 });
  });
  links.forEach(({ target, line }) => {
    if (/^(https?:|mailto:)/.test(target)) return;
    const [path, anchor] = target.split('#');
    const resolved = path ? resolve(dirname(file), decodeURIComponent(path)) : file;
    if (path && !existsSync(resolved)) { problems.push(`line ${line}: broken link ${target}`); return; }
    if (anchor && resolved.endsWith('.md') && statSync(resolved).isFile()) {
      const anchors = new Set(headingsOf(readFileSync(resolved, 'utf8')).map((h) => h.anchor));
      if (!anchors.has(anchor.toLowerCase())) problems.push(`line ${line}: broken anchor ${target}`);
    }
  });
  // raw HTML outside code (comments are the generated markers)
  lines.forEach((line, i) => {
    const plain = line.replace(/`[^`]*`/g, '').replace(/<!--.*?-->/g, '');
    const tag = plain.match(/<\/?([a-z][a-z0-9-]*)(\s[^>]*)?>/i);
    if (tag) problems.push(`line ${i + 1}: raw HTML or unescaped tag-like text "${tag[0]}"`);
  });
  // sensitive values
  text.split('\n').forEach((line, i) => {
    SENSITIVE.forEach((re) => { if (re.test(line)) problems.push(`line ${i + 1}: possible sensitive value (${re})`); });
  });
  return {
    file: file.slice(root.length + 1),
    problems,
    links: links.length,
    headings: headings.length,
    placeholders: (text.match(/\[Screenshot Placeholder\]/g) || []).length,
    screenshots: (text.match(/\]\(\.\.\/\.\.\/docs\/handover\/screenshots\//g) || []).length,
    lines: text.split('\n').length,
  };
}

/** the results of every README and the folder-level checks */
export function validateAll(root) {
  const inputs = loadInputs(root);
  const results = [];
  const folderProblems = [];
  const rootFile = resolve(root, 'blocks/README.md');
  if (!existsSync(rootFile)) folderProblems.push('blocks/README.md is missing');
  const rootText = existsSync(rootFile) ? readFileSync(rootFile, 'utf8') : '';
  inputs.blocks.forEach((block) => {
    const file = resolve(root, 'blocks', block, 'README.md');
    if (!existsSync(file)) { folderProblems.push(`blocks/${block}/README.md is missing`); return; }
    if (!rootText.includes(`(./${block}/README.md)`)) folderProblems.push(`blocks/README.md doesn't list ${block}`);
    if (!inputs.meta.blocks[block]) folderProblems.push(`tools/docs/blocks.json has no entry for ${block}`);
    results.push({ block, ...validateReadme(root, file, inputs, block) });
  });
  if (existsSync(rootFile)) results.push({ block: '(root)', ...validateReadme(root, rootFile, inputs, null) });
  return { results, folderProblems };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
  const { results, folderProblems } = validateAll(root);
  const failing = results.filter((r) => r.problems.length);
  const failed = failing.map((r) => ({ file: r.file, problems: r.problems }));
  const summary = { folderProblems, failing: failed, checked: results.length };
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(summary, null, 1));
  process.exitCode = folderProblems.length || failing.length ? 1 : 0;
}
