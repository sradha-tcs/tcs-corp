// Documentation program: shared helpers of the generator (document writer with the required metadata,
// table of contents and closing sections; link normalisation of carried content; Markdown helpers).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, posix, relative } from 'node:path';

export const TODAY = '8 November 2026';
export const TODAY_ISO = '2026-11-08';
export const GH = 'https://github.com/sradha-tcs/tcs-corp';
export const LIVE = 'https://main--tcs-corp--sradha-tcs.aem.live';
export const PREVIEW = 'https://main--tcs-corp--sradha-tcs.aem.page';
export const AUTHOR_UI = 'AEM Sites console (author host recorded in the site configuration; not written in documents)';
export const ROOTS = {
  test: '/content/tcs-corp/language-master/en',
  master: '/content/tcs-corp/language-masters/en',
  design: '/content/tcs-corp/design-block-master/en',
};

export const docs = []; // every document written: { path, id, title, role, topic, primary, ... }
let OUT = '';
let REPO = '';
export function init(out, repo) { OUT = out; REPO = repo; }

export const esc = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
export const code = (v) => `\`${String(v).replace(/`/g, "'")}\``;
export const table = (head, rows) => [
  `| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`,
  ...rows.map((r) => `| ${r.map((c) => esc(c)).join(' | ')} |`),
].join('\n');
// placeholders written as <name> outside code (e.g. <branch>, <block>) would be read as HTML tags and hidden:
// they are escaped; real tags of the allow list and autolinks stay
const TAGS = new Set(['br', 'details', 'summary', 'sub', 'sup', 'kbd', 'img', 'a', 'b', 'i', 'em', 'strong', 'code', 'pre', 'p', 'div', 'span', 'table', 'tr', 'td', 'th', 'ul', 'ol', 'li', 'hr', 'picture', 'source', 'section', 'main', 'header', 'footer', 'nav', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'input', 'label', 'select', 'option', 'form', 'meta', 'link', 'html', 'head', 'body', 'title', 'script', 'style', 'video', 'iframe', 'figure', 'figcaption', 'dl', 'dt', 'dd', 'blockquote', 'svg', 'time', 'article', 'aside', 'template', 'caption', 'thead', 'tbody', 'textarea', 'mark', 'small', 'u', 's', 'abbr', 'cite', 'q', 'dialog']);
export function escapePlaceholders(md) {
  let fence = false;
  return md.split('\n').map((line) => {
    if (/^\s*(```|~~~)/.test(line)) { fence = !fence; return line; }
    if (fence) return line;
    return line.split(/(`+[^`]*`+)/).map((part, i) => (i % 2 ? part : part.replace(/<(\/?)([a-zA-Z][^<>\n]*?)>/g, (all, slash, inner) => {
      const name = inner.split(/[\s/>]/)[0].toLowerCase();
      if (/^(https?|mailto):/i.test(inner)) return all;
      if (TAGS.has(name) && /^[a-z0-9]+(\s+[a-z-]+(="[^"]*")?)*\s*\/?$/i.test(inner)) return all;
      return `&lt;${slash}${inner}&gt;`;
    }))).join('');
  }).join('\n');
}

/** GitHub's heading anchor (lower case, punctuation removed, spaces to hyphens, -1, -2 for repeats) */
export function ghAnchor(text, seen) {
  const base = String(text).toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}\- _]/gu, '').trim().replace(/ /g, '-');
  const n = seen[base] || 0;
  seen[base] = n + 1;
  return n ? `${base}-${n}` : base;
}
export const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const repoLink = (p, label) => `[${label || p}](${GH}/blob/main/${p})`;
export const repoRead = (p) => readFileSync(join(REPO, p), 'utf8');
export const repoHas = (p) => existsSync(join(REPO, p));

/** a link from the document at `from` (docs-relative) to the document or file at `to` (docs-relative) */
export const rel = (from, to) => {
  const r = posix.relative(posix.dirname(from), to);
  return r.startsWith('.') ? r : `./${r}`;
};

// where carried content came from (a repository Markdown file) -> its links: repository files become GitHub
// URLs on main, knowledge base pages become their generated documents (KB_MAP), images stay absolute
export const KB_MAP = {}; // 'docs/handover/knowledge-base/x.md' -> docs-relative path of its generated document
export function normaliseLinks(md, sourcePath, targetPath) {
  return md.replace(/(!?)\[([^\]]*)\]\(([^)\s]+)((?:\s+"[^"]*")?)\)/g, (all, bang, label, href, title) => {
    if (/^[a-z]+:|^#|^\/\//i.test(href)) return all;
    const [p, anchor] = href.split('#');
    if (!p) return all;
    const t = posix.normalize(posix.join(posix.dirname(sourcePath), p));
    if (KB_MAP[t]) return `${bang}[${label}](${rel(targetPath, KB_MAP[t])}${anchor ? `#${anchor}` : ''}${title})`;
    if (existsSync(join(REPO, t))) {
      const kind = bang || /\.(png|jpe?g|gif|svg|webp)$/i.test(t) ? 'raw' : 'blob';
      const url = kind === 'raw' ? `https://raw.githubusercontent.com/sradha-tcs/tcs-corp/main/${t}` : `${GH}/blob/main/${t}${anchor ? `#${anchor}` : ''}`;
      return `${bang}[${label}](${url}${title})`;
    }
    return `${bang}[${label}](${GH}/blob/main/${t}${anchor ? `#${anchor}` : ''}${title})`;
  });
}

/** the sections (## headings) of a Markdown file: { heading: body } */
export function sections(md) {
  const out = {}; let cur = null;
  md.split('\n').forEach((line) => {
    const m = line.match(/^## (.+)$/);
    if (m) { cur = m[1].trim(); out[cur] = []; return; }
    if (cur) out[cur].push(line);
  });
  return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.join('\n').trim()]));
}
/** a carried section: its headings shifted one level down so the document keeps one H1 */
export const demote = (md, by = 1) => md.replace(/^(#{1,5}) /gm, (m, h) => `${'#'.repeat(Math.min(6, h.length + by))} `);
/** the knowledge base page (code repository) as carried content: sections by heading, links normalised */
export function kb(page, targetPath, headings) {
  const src = `docs/handover/knowledge-base/${page}`;
  const md = repoRead(src).replace(/(^|[\s(`])\/(tmp|backups|home\/node)\/[^\s)`]*/g, '$1(a local workspace path)');
  const s = sections(md);
  const pick = headings ? headings.filter((h) => s[h] !== undefined) : Object.keys(s);
  return pick.map((h) => `## ${h}\n\n${normaliseLinks(demote(s[h]).trim(), src, targetPath).replace(/\]\(#([^)\s]+)\)/g, `](${GH}/blob/main/${src}#$1)`)}`).join('\n\n');
}
export const kbIntro = (page, targetPath) => {
  const src = `docs/handover/knowledge-base/${page}`;
  const md = repoRead(src);
  const intro = md.split('\n## ')[0].split('\n').filter((l) => !l.startsWith('# ') && !l.startsWith('|')).join('\n').trim();
  return normaliseLinks(intro, src, targetPath || KB_MAP[src] || 'README.md');
};

/**
 * Writes a document with the required metadata (front matter for retrieval, the metadata table), a table of
 * contents, the body, and the Screenshots, Known limitations, Open items and Change history sections.
 */
export function writeDoc(path, d) {
  const meta = {
    id: d.id, title: d.title, role: d.role, topic: d.topic || '', audience: d.audience,
    owner: d.owner || 'To be confirmed', approver: d.approver || 'Product Owner (to be confirmed)',
    version: d.version || '1.0', status: d.status || 'Draft for review', lastUpdated: TODAY_ISO,
    lastValidated: d.lastValidated || TODAY_ISO, sourceFiles: d.sources || [], relatedComponents: d.components || [],
    relatedPages: d.pages || [], confidence: d.confidence || 'Medium', primary: d.primary !== false,
  };
  const body = d.body.trim();
  const headings = [...body.matchAll(/^(##|###) (.+)$/gm)].map((m) => ({ level: m[1].length, text: m[2] }));
  const seen = { contents: 1 };
  const toc = headings.map((h) => ({ ...h, anchor: ghAnchor(h.text, seen) })).filter((h) => h.level === 2).map((h) => `- [${h.text}](#${h.anchor})`);
  const yaml = ['---', ...Object.entries(meta).map(([k, v]) => `${k}: ${JSON.stringify(v)}`), '---'].join('\n');
  const related = (d.related || []).map(([label, to]) => `[${label}](${/^https?:/.test(to) ? to : rel(path, to)})`).join(', ') || '—';
  const head = table(['Attribute', 'Value'], [
    ['Document ID', d.id], ['Audience', d.audience], ['Purpose', d.purpose], ['Scope', d.scope || '—'],
    ['Prerequisites', d.prereq || '—'], ['Owner', `${meta.owner}${d.owner ? ' (proposed)' : ''}`], ['Approver', meta.approver],
    ['Version', meta.version], ['Status', meta.status], ['Last updated', TODAY], ['Last validated', d.validated || TODAY],
    ['Source files', (d.sources || []).slice(0, 12).join(', ') + ((d.sources || []).length > 12 ? ` (+${d.sources.length - 12})` : '') || '—'],
    ['Related AEM paths', (d.aem || []).join(', ') || '—'],
  ]).replace('| Related AEM paths', `| Related documents | ${related.replace(/\|/g, '\\|')} |\n| Related AEM paths`);
  const shots = d.screenshots && d.screenshots.length ? d.screenshots.join('\n\n')
    : (d.screenshotNote || 'No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](' + rel(path, 'SCREENSHOT-REGISTER.md') + ').');
  const md = [
    yaml, '', `# ${d.title}`, '', head, '', '## Contents', '', ...toc, '- [Screenshots](#screenshots)', '- [Known limitations](#known-limitations)',
    '- [Open items](#open-items)', '- [Change history](#change-history)', '', body, '', '## Screenshots', '', shots, '',
    '## Known limitations', '', (d.limitations && d.limitations.length ? d.limitations.map((l) => `- ${l}`).join('\n') : '- None recorded for this document.'), '',
    '## Open items', '', (d.open && d.open.length ? d.open.map((l) => `- ${l}`).join('\n') : '- None.'), '',
    '## Change history', '', table(['Version', 'Date', 'Author', 'Change'], [[meta.version, TODAY, 'Delivery team (documentation program)', d.change || 'First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages']]), '',
  ].join('\n');
  const file = join(OUT, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, escapePlaceholders(md));
  docs.push({ path, ...meta, pdf: d.pdf !== false && meta.primary ? path.replace(/\/markdown\//, '/pdf/').replace(/\.md$/, '.pdf') : null, pdfSamePlace: d.pdfSamePlace || false });
  return path;
}

/** a plain file (README index, JSON, Mermaid source) */
export function writeFile(path, content) {
  const file = join(OUT, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  return path;
}
export const outPath = (p) => join(OUT, p);
export const relFrom = (a, b) => relative(a, b);
