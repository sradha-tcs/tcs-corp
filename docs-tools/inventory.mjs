// Documentation program, phase 1 (discovery): an inventory of the repository read from the code itself.
// Writes <out>/inventory.json: blocks (metadata, files, components, models with fields, filters, variations,
// README sections), standalone components (models/), tests (files, describe / it names), design tokens
// (custom properties of styles/*.css with their selector and file), breakpoints, decorators / utilities,
// templates, configuration files, knowledge base pages.
// Usage: node inventory.mjs <repo> <out dir>
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [repo, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const r = (p) => readFileSync(join(repo, p), 'utf8');
const ls = (p) => (existsSync(join(repo, p)) ? readdirSync(join(repo, p)) : []);
const models = JSON.parse(r('component-models.json'));
const modelById = new Map(models.map((m) => [m.id, m]));
const defs = JSON.parse(r('component-definition.json')).groups.flatMap((g) => g.components.map((c) => ({ ...c, group: g.title })));
const filters = JSON.parse(r('component-filters.json'));
const filterById = new Map(filters.map((f) => [f.id, f.components]));
const meta = JSON.parse(r('tools/docs/blocks.json')).blocks;

const flatFields = (model) => {
  const res = []; let tab = '';
  const walk = (fs, prefix = '') => fs.forEach((f) => {
    if (f.component === 'tab') { tab = f.label || f.name; return; }
    res.push({
      tab, name: f.name, label: `${prefix}${f.label || f.name || ''}`, component: f.component, valueType: f.valueType,
      required: !!f.required, multi: !!f.multi, value: f.value, description: f.description || '', condition: f.condition || null,
      options: (f.options || []).map((o) => ({ name: o.name, value: o.value })),
    });
    if (f.fields) walk(f.fields, `${prefix}${f.label || f.name} › `);
  });
  walk(model?.fields || []);
  return res;
};

const sections = (md) => {
  const out2 = {}; let cur = null;
  md.split('\n').forEach((line) => {
    const m = line.match(/^## (.+)$/);
    if (m) { cur = m[1].trim(); out2[cur] = []; return; }
    if (cur) out2[cur].push(line);
  });
  return Object.fromEntries(Object.entries(out2).map(([k, v]) => [k, v.join('\n').trim()]));
};

const blocks = ls('blocks').filter((b) => statSync(join(repo, 'blocks', b)).isDirectory()).sort().map((b) => {
  const files = ls(`blocks/${b}`).sort();
  const partial = files.find((f) => f === `_${b}.json`);
  const own = partial ? JSON.parse(r(`blocks/${b}/${partial}`)) : {};
  const ownDefs = (own.definitions || []).map((d) => d.id);
  const ownModels = (own.models || []).map((m) => m.id);
  const ownFilters = (own.filters || []).map((f) => f.id);
  const components = ownDefs.map((id) => {
    const d = defs.find((x) => x.id === id) || {};
    const tpl = d.plugins?.xwalk?.page?.template || {};
    const modelId = tpl.model || (ownModels.includes(id) ? id : '');
    const fields = flatFields(modelById.get(modelId));
    return {
      id, title: d.title || id, group: d.group || '', resourceType: d.plugins?.xwalk?.page?.resourceType || '',
      templateName: tpl.name || '', model: modelId, filter: tpl.filter || '', children: filterById.get(tpl.filter || id) || [],
      fields,
      variations: fields.filter((f) => f.options.length && (/^classes/.test(f.name || '') || ['select', 'multiselect', 'radio-group'].includes(f.component)))
        .map((f) => ({ field: f.name, label: f.label, tab: f.tab, multi: f.multi || f.component === 'multiselect', options: f.options, default: f.value })),
    };
  });
  const readme = existsSync(join(repo, 'blocks', b, 'README.md')) ? r(`blocks/${b}/README.md`) : '';
  const js = files.filter((f) => f.endsWith('.js'));
  const imports = [...new Set(js.flatMap((f) => [...r(`blocks/${b}/${f}`).matchAll(/from '([^']+)'/g)].map((m) => m[1])))];
  const lines = js.reduce((n, f) => n + r(`blocks/${b}/${f}`).split('\n').length, 0)
    + files.filter((f) => f.endsWith('.css')).reduce((n, f) => n + r(`blocks/${b}/${f}`).split('\n').length, 0);
  return {
    name: b, meta: meta[b] || null, files, imports, lines, components, ownFilters,
    readmeSections: sections(readme), readmeLines: readme.split('\n').length,
  };
});

// standalone components (models/ partials): page, section, text, title, image, button
const standalone = defs.filter((d) => !blocks.some((b) => b.components.some((c) => c.id === d.id))).map((d) => {
  const tpl = d.plugins?.xwalk?.page?.template || {};
  const modelId = tpl.model || (modelById.has(d.id) ? d.id : '');
  return { id: d.id, title: d.title, group: d.group, resourceType: d.plugins?.xwalk?.page?.resourceType || '', model: modelId, fields: flatFields(modelById.get(modelId)) };
});

// tests
const testFiles = [];
const walkDir = (p) => ls(p).forEach((f) => { const q = `${p}/${f}`; if (statSync(join(repo, q)).isDirectory()) walkDir(q); else if (f.endsWith('.test.mjs')) testFiles.push(q); });
walkDir('test');
const tests = testFiles.sort().map((f) => {
  const s = r(f);
  return { file: f, describes: [...s.matchAll(/describe\('([^']+)'/g)].map((m) => m[1]), its: [...s.matchAll(/\bit\(\s*[`']([^`']+)[`']/g)].map((m) => m[1]) };
});

// design tokens: custom properties per file and selector
const tokens = [];
['styles/styles.css', 'styles/lazy-styles.css', 'styles/fonts.css', 'styles/motion.css', 'styles/card-list.css'].filter((f) => existsSync(join(repo, f))).forEach((f) => {
  const s = r(f); let sel = ''; let depth = 0; let media = '';
  s.split('\n').forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith('@media')) media = t.replace(/\s*\{$/, '');
    if (t.endsWith('{') && !t.startsWith('@')) sel = t.replace(/\s*\{$/, '');
    const m = t.match(/^(--[\w-]+):\s*(.+?);?$/);
    if (m) tokens.push({ file: f, line: i + 1, selector: sel, media: depth > 1 ? media : (media && sel ? media : ''), name: m[1], value: m[2].replace(/;$/, '') });
    depth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
    if (depth === 0) media = '';
  });
});
const breakpoints = {};
const cssFiles = [...ls('styles').map((f) => `styles/${f}`), ...blocks.flatMap((b) => b.files.filter((f) => f.endsWith('.css')).map((f) => `blocks/${b.name}/${f}`))].filter((f) => f.endsWith('.css'));
cssFiles.forEach((f) => [...r(f).matchAll(/@media\s*([^{]+)\{/g)].forEach((m) => { const k = m[1].trim(); breakpoints[k] = (breakpoints[k] || 0) + 1; }));

const tableRows = (md) => md.split('\n').filter((l) => /^\| `[a-z0-9-]+\.js` \|/.test(l)).map((l) => {
  const c = l.split('|').map((x) => x.trim()); return { module: c[1].replace(/`/g, ''), purpose: c[2], users: c[3] || '' };
});
const inventory = {
  generated: new Date().toISOString(),
  repo: { head: '' },
  blocks,
  standalone,
  tests,
  tokens,
  breakpoints,
  decorators: tableRows(r('decorators/README.md')),
  utils: tableRows(r('utils/README.md')),
  templates: ls('templates').filter((t) => t !== 'README.md'),
  scriptsFiles: ls('scripts'),
  config: {
    packageScripts: JSON.parse(r('package.json')).scripts,
    workflows: ls('.github/workflows'),
    helixQuery: r('helix-query.yaml'),
    paths: JSON.parse(r('paths.json')),
    hlxignore: r('.hlxignore'),
    fstab: existsSync(join(repo, 'fstab.yaml')) ? 'present' : 'absent',
    headHtmlLines: r('head.html').split('\n').length,
  },
  kb: ls('docs/handover/knowledge-base').filter((f) => f.endsWith('.md')),
  counts: {},
};
inventory.counts = {
  blocks: blocks.length,
  components: blocks.reduce((n, b) => n + b.components.length, 0) + standalone.length,
  fields: blocks.reduce((n, b) => n + b.components.reduce((m, c) => m + c.fields.length, 0), 0),
  variationFields: blocks.reduce((n, b) => n + b.components.reduce((m, c) => m + c.variations.length, 0), 0),
  variationOptions: blocks.reduce((n, b) => n + b.components.reduce((m, c) => m + c.variations.reduce((k, v) => k + v.options.length, 0), 0), 0),
  testFiles: tests.length, testCases: tests.reduce((n, t) => n + t.its.length, 0), tokens: tokens.length,
};
writeFileSync(join(out, 'inventory.json'), JSON.stringify(inventory, null, 1));
console.log(JSON.stringify(inventory.counts));
