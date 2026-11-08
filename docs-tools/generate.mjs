// Documentation program (master documentation prompt, 8 November 2026): generates the role-specific
// documentation tree docs/handover/ of the branch migrated-page-content-edam from the repository (code,
// models, tests, READMEs, knowledge base) and the evidence of the published reference pages.
// Usage: node generate.mjs <repo> <data dir> <evidence dir> <handover screenshots dir> <out dir>
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import {
  docs, init, writeDoc, writeFile, table, code, slug, repoLink, repoRead, rel, kb, kbIntro, KB_MAP, normaliseLinks,
  sections, demote, TODAY, TODAY_ISO, LIVE, PREVIEW, ROOTS, GH, outPath,
} from './lib.mjs';
import { architecture } from './gen-architecture.mjs';
import { development } from './gen-development.mjs';
import { authoring } from './gen-authoring.mjs';
import { businessAnalysis } from './gen-ba.mjs';
import { qualityAssurance, qaFinish } from './gen-qa.mjs';
import { operations, governance, devops, training } from './gen-ops.mjs';
import { knowledgeBase } from './gen-kb.mjs';
import { audit, rootDocs } from './gen-audit.mjs';

const [repo, dataDir, evDir, shotsDir, out] = process.argv.slice(2);
init(out, repo);
const inv = JSON.parse(readFileSync(join(dataDir, 'inventory.json'), 'utf8'));
const evidence = existsSync(join(evDir, 'evidence.json')) ? JSON.parse(readFileSync(join(evDir, 'evidence.json'), 'utf8')) : {};
const links = Object.fromEntries(['dbm', 'lm', 'lms'].map((k) => [k, existsSync(join(dataDir, `links-${k}.json`)) ? JSON.parse(readFileSync(join(dataDir, `links-${k}.json`), 'utf8')) : null]));
const commands = JSON.parse(readFileSync(join(dataDir, 'commands.json'), 'utf8'));
const publishing = existsSync(join(dataDir, 'publishing.json')) ? JSON.parse(readFileSync(join(dataDir, 'publishing.json'), 'utf8')) : {};
const handoverShots = JSON.parse(repoRead('tools/docs/handover-screenshots.json')).blocks;

// the knowledge base pages and the documents that carry them (cross-links resolve to these)
Object.assign(KB_MAP, Object.fromEntries(Object.entries({
  'README.md': '09-knowledge-base/README.md',
  'architecture.md': '01-architecture/markdown/TECHNICAL-ARCHITECTURE.md',
  'content-architecture.md': '01-architecture/markdown/CONTENT-ARCHITECTURE.md',
  'project-overview.md': '01-architecture/markdown/SOLUTION-ARCHITECTURE.md',
  'security-privacy-consent.md': '01-architecture/markdown/SECURITY-ARCHITECTURE.md',
  'deployment-and-release.md': '01-architecture/markdown/DEPLOYMENT-ARCHITECTURE.md',
  'performance.md': '01-architecture/markdown/PERFORMANCE-ARCHITECTURE.md',
  'decision-log.md': '01-architecture/markdown/ARCHITECTURE-DECISIONS.md',
  'indexing-and-search.md': '01-architecture/markdown/INTEGRATION-ARCHITECTURE.md',
  'personalization.md': '01-architecture/markdown/INTEGRATION-ARCHITECTURE.md',
  'design-system.md': '02-development/markdown/DESIGN-STYLE-GUIDE.md',
  'development-standards.md': '02-development/markdown/CODING-STANDARDS.md',
  'decorators-and-utilities.md': '02-development/markdown/DECORATORS-AND-UTILITIES-GUIDE.md',
  'data-layer-and-analytics.md': '02-development/markdown/ANALYTICS-DATA-LAYER-GUIDE.md',
  'accessibility.md': '02-development/markdown/ACCESSIBILITY-DEVELOPMENT-GUIDE.md',
  'universal-editor.md': '02-development/markdown/UNIVERSAL-EDITOR-MODEL-GUIDE.md',
  'blocks.md': '02-development/markdown/BLOCK-DEVELOPMENT-GUIDE.md',
  'repository-structure.md': '02-development/markdown/REPOSITORY-STRUCTURE.md',
  'authoring.md': '03-authoring/markdown/AUTHORING-GUIDE.md',
  'testing-and-quality.md': '05-quality-assurance/markdown/TEST-STRATEGY.md',
  'troubleshooting.md': '06-operations-support/markdown/TROUBLESHOOTING-RUNBOOK.md',
  'administration-and-operations.md': '07-administration-governance/markdown/ADMINISTRATION-AND-GOVERNANCE-GUIDE.md',
  'glossary.md': 'GLOSSARY.md',
  'references.md': '09-knowledge-base/llms/SOURCE-OF-TRUTH.md',
  'agent-guidelines.md': '09-knowledge-base/agents/AGENTS.md',
  'agent-instructions.md': '09-knowledge-base/agents/AGENTS.md',
  'copilot-instructions.md': '09-knowledge-base/llms/LLM-CONTEXT.md',
  'reports/discrepancy-report.md': 'DOCUMENTATION-DISCREPANCY-REGISTER.md',
  'reports/missing-documentation-report.md': 'DOCUMENTATION-GAP-REGISTER.md',
  'reports/broken-link-report.md': '11-audit-remediation/markdown/LINK-VALIDATION-REPORT.md',
  'reports/validation-matrix.md': '11-audit-remediation/markdown/CODE-DOCUMENTATION-AUDIT.md',
  'reports/repository-inventory.md': '02-development/markdown/REPOSITORY-STRUCTURE.md',
  'reports/final-summary.md': '11-audit-remediation/README.md',
  'reports/README.md': '11-audit-remediation/README.md',
}).map(([k, v]) => [`docs/handover/knowledge-base/${k}`, v])));

// screenshots: the evidence of the published reference pages (copied next to their documents) and the
// handover screenshots (per block); a register entry for each
const register = [];
const blockOfPage = (p) => {
  const m = p.match(/\/block-library\/([^/]+)/);
  if (!m) return null;
  const map = { animation: null, foundations: null, templates: null };
  return Object.prototype.hasOwnProperty.call(map, m[1]) ? map[m[1]] : m[1];
};
const WIDTHS = ['375', '768', '1024', '1440'];
const VIEWPORT = { 375: 'mobile 375 × 812', 768: 'tablet 768 × 900', 1024: 'small desktop 1024 × 900', 1440: 'desktop 1440 × 900' };
/** copies a reference page's screenshots into `folder`; returns the Markdown that embeds them from `docPath` */
function pageShots(pagePath, folder, docPath, label, widths = WIDTHS) {
  const ev = evidence[pagePath];
  if (!ev) return [];
  return widths.filter((w) => ev.widths?.[w]?.screenshot).map((w) => {
    const src = join(evDir, ev.widths[w].screenshot);
    const name = `${slug(pagePath.replace('/design-block-master/en/', ''))}-${w}.jpg`;
    const dst = `${folder}/${name}`;
    if (!existsSync(outPath(dst))) { mkdirSync(outPath(folder), { recursive: true }); copyFileSync(src, outPath(dst)); }
    const alt = `${label} at ${VIEWPORT[w]}, published page ${pagePath}`;
    if (!register.some((r) => r.file === dst)) {
      register.push({
        file: dst, page: pagePath, url: `${LIVE}${pagePath}`, environment: 'Edge Delivery live (main--tcs-corp--sradha-tcs.aem.live)', viewport: VIEWPORT[w],
        date: (ev.date || '').slice(0, 10), subject: label, alt, kind: 'Published page (Playwright, full page up to 3,000 px)',
      });
    }
    return `![${alt}](${rel(docPath, dst)})\n\n*Figure: ${label} — ${VIEWPORT[w]} (${pagePath}, captured ${(ev.date || '').slice(0, 10)}).*`;
  });
}
function handoverShotsFor(block, folder, docPath) {
  return (handoverShots[block] || []).map((s) => {
    const src = join(shotsDir, s.file);
    if (!existsSync(src)) return null;
    const dst = `${folder}/${s.file}`;
    if (!existsSync(outPath(dst))) { mkdirSync(outPath(folder), { recursive: true }); copyFileSync(src, outPath(dst)); }
    const [title, ...rest] = s.alt.split(' — ');
    if (!register.some((r) => r.file === dst)) {
      register.push({
        file: dst, page: 'handover preview with sample content', url: '', environment: 'Feature or main preview at the time of the handover revision that added it',
        viewport: 'as captured', date: 'before 24 October 2026 (handover 2.44)', subject: block, alt: s.alt, kind: 'Handover screenshot (historical, carried)',
      });
    }
    return `![${s.alt.replace(/[[\]]/g, '')}](${rel(docPath, dst)})\n\n*Figure: ${title}${rest.length ? ` — ${rest.join(' — ')}` : ''} (handover screenshot; rendering at the time it was taken).*`;
  }).filter(Boolean);
}
const placeholder = (screen, access, steps, reason) => [
  '> **Screenshot required**', '>', `> - Required screen: ${screen}`, `> - Required role/access: ${access}`, `> - Required navigation steps: ${steps}`,
  `> - Reason unavailable: ${reason}`, '> - Owner: Content Lead / AEM Authoring Lead (proposed)', '> - Target completion date: To be confirmed',
].join('\n');

const dmDir = new URL('./assets/asset-selector', import.meta.url).pathname;
const ctx = {
  inv, evidence, links, commands, publishing, register, pageShots, handoverShotsFor, placeholder, blockOfPage, out, repo, evDir, dataDir, shotsDir,
  dm: { image: readFileSync(join(dmDir, 'image.config.json'), 'utf8'), animation: readFileSync(join(dmDir, 'image-or-animation.config.json'), 'utf8') },
};
architecture(ctx);
development(ctx);
authoring(ctx);
qualityAssurance(ctx);
businessAnalysis(ctx);
qaFinish(ctx);
operations(ctx);
governance(ctx);
devops(ctx);
knowledgeBase(ctx);
training(ctx);
audit(ctx);
rootDocs(ctx);

console.log(JSON.stringify({ documents: docs.length, screenshots: register.length }));
