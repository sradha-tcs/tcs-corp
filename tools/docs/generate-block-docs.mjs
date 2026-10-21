/* eslint-disable no-restricted-syntax -- Node tooling (for...of, .mjs modules) */
/*
 * Block documentation: the parts of blocks/<block>/README.md and blocks/README.md that come from
 * the repository, so they can't drift from it. Each README keeps its written sections; the
 * generated ones sit between markers and are rewritten:
 *   <!-- BEGIN GENERATED: fields -->      the dialog of every component of the block, a table per
 *                                         tab (label, property, type, required, default, allowed
 *                                         values, guidance with visibility, example)
 *   <!-- BEGIN GENERATED: screenshots --> the handover screenshots of the block and placeholders
 *                                         for the dialog tabs (no screenshot of them exists)
 *   <!-- BEGIN GENERATED: files -->       the block's files and the decorators / utilities it uses
 *   <!-- BEGIN GENERATED: usage -->       the block library and curated design pages using it
 *   <!-- BEGIN GENERATED: inventory -->   (blocks/README.md) the block inventory
 * Inputs: component-models.json, component-definition.json, component-filters.json, the blocks'
 * own _<block>.json, their JavaScript, decorators/README.md, utils/README.md, the handover
 * (docs/handover/TCS-CORP-HANDOVER.md) and tools/docs/blocks.json (status, type, purpose,
 * relationships: written by hand); example values and page usage come from the block library
 * build (.home-work, not in git) and are kept in tools/docs/library-snapshot.json.
 * Run `npm run build:docs`; test/docs checks that the generated sections are current.
 */
import {
  existsSync, readFileSync, readdirSync, writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const read = (path) => readFileSync(resolve(ROOT, path), 'utf8');
const json = (path) => JSON.parse(read(path));

/* ------------------------------------------------------------------ inputs */

export function loadInputs(root = ROOT) {
  const r = (p) => readFileSync(resolve(root, p), 'utf8');
  const models = new Map(JSON.parse(r('component-models.json')).map((m) => [m.id, m]));
  const definitions = new Map(JSON.parse(r('component-definition.json')).groups
    .flatMap((g) => g.components.map((c) => [c.id, { ...c, group: g.title }])));
  const filters = new Map(JSON.parse(r('component-filters.json')).map((f) => [f.id, f.components]));
  const meta = JSON.parse(r('tools/docs/blocks.json'));
  const snapshot = existsSync(resolve(root, 'tools/docs/library-snapshot.json'))
    ? JSON.parse(r('tools/docs/library-snapshot.json')) : { examples: {}, usage: {} };
  const handover = r('docs/handover/TCS-CORP-HANDOVER.md');
  const moduleDocs = {};
  ['decorators', 'utils'].forEach((folder) => {
    r(`${folder}/README.md`).split('\n').forEach((line) => {
      const [, name, purpose] = line.match(/^\| `([a-z0-9-]+\.js)` \| (.+?) \|/) || [];
      if (name) moduleDocs[`${folder}/${name}`] = purpose;
    });
  });
  const blocks = readdirSync(resolve(root, 'blocks'), { withFileTypes: true })
    .filter((d) => d.isDirectory()).map((d) => d.name).sort();
  return {
    root, models, definitions, filters, meta, snapshot, handover, moduleDocs, blocks,
  };
}

/** the component ids a block's own _<block>.json declares (definitions, models, filters) */
export function ownIds(root, block) {
  const file = resolve(root, `blocks/${block}/_${block}.json`);
  if (!existsSync(file)) return { definitions: [], models: [], filters: [] };
  const raw = JSON.parse(readFileSync(file, 'utf8'));
  const ids = (list) => (list || []).map((x) => x.id).filter(Boolean);
  return { definitions: ids(raw.definitions), models: ids(raw.models), filters: ids(raw.filters) };
}

/* ------------------------------------------------------------------ fields */

const SUFFIXES = ['MimeType', 'Title', 'Type', 'Alt', 'Text'];
const esc = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ').trim();
const code = (v) => `\`${String(v).replace(/`/g, "'")}\``;

/** a JSON-logic condition in words */
export function conditionText(c) {
  if (c === null || c === undefined) return '';
  if (typeof c !== 'object') return JSON.stringify(c);
  const [op] = Object.keys(c);
  const args = c[op];
  const v = (x) => {
    if (x && typeof x === 'object' && 'var' in x) return code(x.var);
    if (x === '') return 'empty';
    return code(JSON.stringify(x).replace(/^"|"$/g, ''));
  };
  switch (op) {
    case 'var': return `${code(args)} is set`;
    case '!': return args && typeof args === 'object' && 'var' in args ? `${code(args.var)} is off or empty` : `not (${conditionText(args)})`;
    case '!!': return `${code(args.var)} is set`;
    case '===': return `${v(args[0])} is ${v(args[1])}`;
    case '!==': return `${v(args[0])} is not ${v(args[1])}`;
    case 'and': return args.map(conditionText).join(' and ');
    case 'or': return args.map((a) => (a && a.and ? `(${conditionText(a)})` : conditionText(a))).join(' or ');
    case 'in': return `${v(args[0])} is one of ${JSON.stringify(args[1])}`;
    default: return JSON.stringify(c);
  }
}

const typeOf = (f) => {
  const t = f.component === 'select' && f.multi ? 'multiselect' : f.component;
  return f.multi && f.component !== 'multiselect' && f.component !== 'select' ? `${t} (multiple)` : t;
};
const defaultOf = (f) => {
  if (f.value === undefined) return '—';
  if (f.value === '') return '""';
  return code(Array.isArray(f.value) ? f.value.join(', ') : f.value);
};
const allowedOf = (f) => {
  if (!f.options?.length) {
    if (f.component === 'boolean') return 'on / off';
    if (f.validation) return Object.entries(f.validation).map(([k, val]) => `${k}: ${esc(val)}`).join('; ');
    return '—';
  }
  return f.options.map((o) => `${esc(o.name)} (${o.value === '' ? '""' : code(o.value)})`).join(', ');
};

/** the field rows of a model, split at its tabs: [{ tab, rows: [...] }] */
export function fieldTables(model, names, examples = {}) {
  const tabs = [];
  let current = { tab: '', rows: [] };
  const push = (f, prefix = '') => {
    const base = SUFFIXES.map((s) => (f.name?.endsWith(s) ? f.name.slice(0, -s.length) : null))
      .find((b) => b && names.has(b));
    const notes = [];
    if (f.description) notes.push(esc(f.description));
    if (f.condition) notes.push(`Shown when ${conditionText(f.condition)}.`);
    if (base) notes.push(`Delivered with ${code(base)} (field collapse).`);
    if (f.name?.startsWith('classes_')) notes.push('Delivered as a block class.');
    if (f.readOnly) notes.push('Read only.');
    const example = examples[f.name];
    current.rows.push({
      label: `${prefix}${esc(f.label || f.name)}`,
      property: f.name ? code(f.name) : '—',
      type: typeOf(f),
      required: f.required ? 'Yes' : 'No',
      default: defaultOf(f),
      allowed: allowedOf(f),
      guidance: notes.join(' ') || '—',
      example: example === undefined ? '—' : esc(String(example).slice(0, 80)),
    });
    if (f.component === 'container' && f.fields) {
      f.fields.forEach((sub) => push(sub, `${prefix}${esc(f.label || f.name)} › `));
    }
  };
  (model?.fields || []).forEach((f) => {
    if (f.component === 'tab') {
      if (current.rows.length || current.tab) tabs.push(current);
      current = { tab: f.label || f.name, rows: [] };
      return;
    }
    push(f);
  });
  if (current.rows.length || current.tab) tabs.push(current);
  return tabs;
}

const fieldTableMd = (rows) => [
  '| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |',
  '| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |',
  ...rows.map((r) => `| ${r.label} | ${r.property} | ${r.type} | ${r.required} | ${r.default} | ${r.allowed} | ${r.guidance} | ${r.example} |`),
].join('\n');

/** the components of a block: its definitions with their model and the children they allow */
export function componentsOf(inputs, block) {
  const ids = ownIds(inputs.root, block);
  return ids.definitions.map((id) => {
    const def = inputs.definitions.get(id);
    const template = def?.plugins?.xwalk?.page?.template || {};
    const modelId = template.model || (ids.models.includes(id) ? id : '');
    return {
      id,
      title: def?.title || id,
      name: template.name || '',
      resourceType: def?.plugins?.xwalk?.page?.resourceType || '',
      keyValue: !!template['key-value'],
      model: modelId ? inputs.models.get(modelId) : null,
      modelId,
      filter: template.filter || '',
      children: template.filter ? (inputs.filters.get(template.filter) || []) : [],
      template,
    };
  });
}

export function fieldsSection(inputs, block) {
  const parts = [];
  const components = componentsOf(inputs, block);
  if (!components.length) {
    return `This block has no Universal Editor model of its own (no \`_${block}.json\` definition): it is not added from the component list. See the sections above for how its content is authored.`;
  }
  components.forEach((c) => {
    const names = new Set((c.model?.fields || []).map((f) => f.name).filter(Boolean));
    const examples = inputs.snapshot.examples?.[c.modelId] || {};
    parts.push(`### ${c.title} (\`${c.id}\`)`);
    const facts = [
      `Model \`${c.modelId || 'none'}\``,
      c.name ? `template name "${c.name}" (the block class AEM renders)` : '',
      c.keyValue ? 'key-value block (one row per property)' : '',
      c.children.length ? `children: ${c.children.map(code).join(', ')}` : '',
    ].filter(Boolean);
    parts.push(`${facts.join('; ')}.`);
    const templateValues = Object.entries(c.template)
      .filter(([k]) => !['name', 'model', 'filter', 'key-value'].includes(k));
    if (templateValues.length) {
      parts.push(`Stored on a new component (definition template): ${templateValues.map(([k, v]) => `${code(k)} = ${code(JSON.stringify(v))}`).join(', ')}.`);
    }
    const tables = fieldTables(c.model, names, examples);
    if (!tables.length) parts.push('No dialog fields.');
    tables.forEach(({ tab, rows }) => {
      parts.push(`#### ${tab ? `${tab} tab` : 'Fields'} — ${c.title}`);
      parts.push(rows.length ? fieldTableMd(rows) : 'No fields in this tab.');
    });
  });
  return parts.join('\n\n');
}

/* ------------------------------------------------------------------ screenshots */

/** the handover chapter of a block: [start, end) line offsets */
function chapterOf(handover, heading) {
  if (!heading) return '';
  const at = handover.indexOf(`\n## ${heading}`);
  if (at < 0) return '';
  const next = handover.indexOf('\n## ', at + 4);
  return handover.slice(at, next < 0 ? undefined : next);
}

export function screenshotsSection(inputs, block) {
  const meta = inputs.meta.blocks[block] || {};
  const chapter = chapterOf(inputs.handover, meta.handover);
  const seen = new Set();
  const shots = [...chapter.matchAll(/!\[([^\]]*)\]\(screenshots\/([^)\s]+)\)/g)]
    .map(([, alt, file]) => ({ alt, file }))
    .filter((s) => !meta.screenshotPrefix
      || meta.screenshotPrefix.some((p) => s.file.startsWith(p)))
    .filter((s) => !seen.has(s.file) && seen.add(s.file))
    .filter((s) => existsSync(resolve(inputs.root, 'docs/handover/screenshots', s.file)));
  const parts = [];
  if (shots.length) {
    parts.push(`Screenshots of the handover (${meta.handover}), taken on the preview with sample content; they show the rendering at the time of the handover revision that added them (later changes are in the sections below and the handover's revision history):`);
    parts.push(['| Screenshot | Shows |', '| ---------- | ----- |',
      ...shots.map((s) => {
        const [title, ...rest] = s.alt.split(' — ');
        const shows = rest.join(' — ').replace(/\s*\(Sample content[^)]*\)\s*$/, '');
        return `| [${esc(title)}](../../docs/handover/screenshots/${s.file}) | ${esc(shows || title)} |`;
      })].join('\n'));
  } else {
    parts.push('No handover screenshot of this block was identified.');
  }
  // the dialog has no screenshots: a placeholder per component and tab
  const placeholders = [];
  componentsOf(inputs, block).forEach((c) => {
    fieldTables(c.model, new Set()).forEach(({ tab, rows }) => {
      const slug = (tab || 'fields').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const letters = rows.slice(0, 10).map((r, i) => `${String.fromCharCode(65 + i)} = ${r.label}`);
      placeholders.push(`[Screenshot Placeholder]\n\nFile name:\n${c.id}-dialog-${slug}-desktop.png\n\nPurpose:\nThe ${tab ? `${tab} tab` : 'dialog'} of the ${c.title} properties in Universal Editor, with the fields of the table "${tab ? `${tab} tab` : 'Fields'} — ${c.title}" in Authorable Fields below.\n\nAnnotations:\n${letters.join('\n') || 'None (no fields)'}`);
    });
  });
  if (placeholders.length) {
    parts.push('Universal Editor dialogs (no screenshot exists yet; to be captured on AEM author):');
    parts.push(placeholders.map((p) => `\`\`\`text\n${p}\n\`\`\``).join('\n\n'));
  }
  return parts.join('\n\n');
}

/* ------------------------------------------------------------------ files */

/** static and dynamic imports of a module, relative to the repository */
function importsOfFile(root, file) {
  const source = readFileSync(resolve(root, file), 'utf8');
  const found = [];
  for (const m of source.matchAll(/^\s*import\s+(?:([^'"]*?)\s+from\s+)?['"](\.{1,2}\/[^'"]+)['"]/gm)) {
    found.push({ path: resolve(dirname(resolve(root, file)), m[2]), names: (m[1] || '').replace(/\s+/g, ' ').trim(), dynamic: false });
  }
  for (const m of source.matchAll(/import\(\s*[`'"](\.{1,2}\/[^`'"$]+)[`'"]\s*\)/g)) {
    found.push({ path: resolve(dirname(resolve(root, file)), m[1]), names: '(dynamic import)', dynamic: true });
  }
  return found.map((f) => ({ ...f, rel: f.path.slice(root.length + 1) }));
}

const CORE_MODULES = {
  'scripts/aem.js': 'Edge Delivery core library (block loading, CSS, metadata, optimized pictures)',
  'scripts/scripts.js': 'Page decoration (moveInstrumentation and shared page helpers)',
};

export function filesSection(inputs, block) {
  const dir = resolve(inputs.root, 'blocks', block);
  const files = readdirSync(dir).sort();
  const tree = ['```text', `blocks/${block}/`, ...files.map((f, i) => `${i === files.length - 1 ? '└──' : '├──'} ${f}`), '```'];
  const rows = [];
  files.filter((f) => f.endsWith('.js')).forEach((f) => {
    importsOfFile(inputs.root, `blocks/${block}/${f}`).forEach((imp) => {
      if (imp.rel.startsWith(`blocks/${block}/`)) return;
      const purpose = inputs.moduleDocs[imp.rel] || CORE_MODULES[imp.rel] || '';
      rows.push(`| [\`${imp.rel}\`](../../${imp.rel}) | ${esc(purpose).slice(0, 220) || '—'} | \`${f}\`: ${esc(imp.names) || '(side effects)'} |`);
    });
  });
  const unique = [...new Set(rows)];
  return [
    ...tree,
    '',
    unique.length ? ['| Decorator/Utility | Purpose | Execution or dependency point |', '| ----------------- | ------- | ----------------------------- |', ...unique].join('\n') : 'The block imports no shared decorator or utility.',
  ].join('\n');
}

/* ------------------------------------------------------------------ usage */

export function usageSection(inputs, block) {
  const usage = inputs.snapshot.usage?.[block];
  const kb = 'Project-wide standards: [knowledge base](../../docs/handover/knowledge-base/README.md) ([block governance](../../docs/handover/knowledge-base/blocks.md)).';
  if (!usage) return `No block library or curated design page using this block was recorded in the library snapshot.\n\n${kb}`;
  const link = (p) => `\`${p}\``;
  const lines = [`Pages of the block library package ${inputs.snapshot.package || ''} (language master, \`/content/tcs-corp/language-master/en\`) that contain the block, ${usage.instances} instance(s) in total:`];
  if (usage.library.length) lines.push(`- Block library: ${usage.library.map(link).join(', ')}`);
  if (usage.curated.length) lines.push(`- Curated design pages: ${usage.curated.map(link).join(', ')}`);
  if (usage.other.length) lines.push(`- Other pages: ${usage.other.map(link).join(', ')}`);
  return [...lines, '', kb].join('\n');
}

/* ------------------------------------------------------------------ root inventory */

export function inventorySection(inputs) {
  const rows = inputs.blocks.map((b) => {
    const m = inputs.meta.blocks[b] || {};
    const has = existsSync(resolve(inputs.root, 'blocks', b, 'README.md'));
    const authorable = componentsOf(inputs, b).length ? 'Yes' : (m.authorable || 'No');
    return `| [${esc(m.name || b)}](./${b}/README.md) (\`${b}\`) | ${esc(m.type || '—')} | ${esc(m.purpose || '—')} | ${esc(m.variations || '—')} | ${authorable} | ${esc(m.status || '—')} | ${has ? `[README](./${b}/README.md)` : 'Missing'} |`;
  });
  return ['| Block | Type | Purpose | Variations | Authorable | Status | Documentation |',
    '| ----- | ---- | ------- | ---------- | ---------- | ------ | ------------- |', ...rows].join('\n');
}

const CATEGORY_LABELS = {
  content: 'Content',
  layout: 'Layout',
  navigation: 'Navigation',
  listing: 'Listing',
  interactive: 'Interactive',
  media: 'Media',
  structural: 'Structural',
  container: 'Container (section)',
  'child-item': 'Child item',
  personalization: 'Personalization',
  utility: 'Utility',
  deprecated: 'Deprecated / compatibility-only',
};

/** blocks/README.md: the blocks grouped by category (tools/docs/blocks.json) */
export function categoriesSection(inputs) {
  const groups = {};
  inputs.blocks.forEach((b) => {
    const c = inputs.meta.blocks[b]?.category || 'utility';
    (groups[c] = groups[c] || []).push(b);
  });
  return Object.keys(CATEGORY_LABELS).map((c) => {
    const list = groups[c] || [];
    const names = list.map((b) => `[${inputs.meta.blocks[b]?.name || b}](./${b}/README.md)`).join(', ');
    const none = {
      layout: 'None: layout is provided by the section containers (Columns Container, Tabs, Gen Carousel) and the Section Style',
      personalization: 'None: no personalization runtime (Target, AJO) is implemented; see the Personalization section of each README',
    }[c] || 'None';
    return `| ${CATEGORY_LABELS[c]} | ${names || none} |`;
  }).reduce((rows, row) => [...rows, row], ['| Category | Blocks |', '| -------- | ------ |']).join('\n');
}

/** blocks/README.md: containers and the children their filters allow (component-filters.json) */
export function relationshipsSection(inputs) {
  const rows = [];
  inputs.blocks.forEach((b) => {
    componentsOf(inputs, b).filter((c) => c.children.length).forEach((c) => {
      const children = c.children.map((id) => {
        const folder = inputs.blocks.find((x) => ownIds(inputs.root, x).definitions.includes(id));
        const title = inputs.definitions.get(id)?.title || id;
        return folder && folder !== b ? `[${title}](./${folder}/README.md) (\`${id}\`)` : `${title} (\`${id}\`)`;
      });
      rows.push(`| [${c.title}](./${b}/README.md) (\`${c.id}\`) | ${c.filter ? `\`${c.filter}\`` : '—'} | ${children.join(', ')} |`);
    });
  });
  return ['| Container | Filter | Allowed children |', '| --------- | ------ | ---------------- |', ...rows].join('\n');
}

/* ------------------------------------------------------------------ markers */

const SECTIONS = {
  fields: fieldsSection, screenshots: screenshotsSection, files: filesSection, usage: usageSection,
};
const ROOT_SECTIONS = {
  inventory: (inputs) => inventorySection(inputs),
  categories: (inputs) => categoriesSection(inputs),
  relationships: (inputs) => relationshipsSection(inputs),
};

/** the README with its generated sections rewritten (sections without markers are left alone) */
export function renderReadme(text, inputs, block) {
  let out = text;
  const names = block ? Object.keys(SECTIONS) : Object.keys(ROOT_SECTIONS);
  names.forEach((name) => {
    const begin = `<!-- BEGIN GENERATED: ${name} (npm run build:docs) -->`;
    const end = `<!-- END GENERATED: ${name} -->`;
    const at = out.indexOf(begin);
    if (at < 0) return;
    const stop = out.indexOf(end, at);
    if (stop < 0) throw new Error(`${block || 'blocks'}/README.md: ${name} has no end marker`);
    const body = block ? SECTIONS[name](inputs, block) : ROOT_SECTIONS[name](inputs);
    out = `${out.slice(0, at)}${begin}\n\n${body}\n\n${out.slice(stop)}`;
  });
  return out;
}

/* ------------------------------------------------------------------ library snapshot */

/** example values and page usage from the block library build (.home-work), when present */
async function librarySnapshot(root, inputs) {
  const site = resolve(root, '.home-work/bl/bl-site.mjs');
  if (!existsSync(site)) return null;
  const { PAGES } = await import(pathToFileURL(site).href);
  const examples = {};
  const usage = {};
  const add = (model, fields) => {
    if (!model || !fields) return;
    examples[model] = examples[model] || {};
    Object.entries(fields).forEach(([k, v]) => {
      if (examples[model][k] !== undefined || v === '' || v === null || typeof v === 'object') return;
      if (typeof v === 'string' && (/<[a-z]/i.test(v) || v.length > 80)) return;
      examples[model][k] = typeof v === 'string' ? v.replace(/^\/content\/tcs-corp\/language-master\/en/, '/language-master/en') : v;
    });
  };
  const blockOfEntry = (e) => e.block || null;
  PAGES.forEach((p) => {
    const path = String(p.path || '').replace('/content/tcs-corp/language-master/en/', '');
    let kind = 'other';
    if (path.startsWith('block-library/')) kind = 'library';
    else if (path.startsWith('curated-design-pages/')) kind = 'curated';
    const seen = new Set();
    (p.sections || []).forEach((s) => {
      if (s.model && s.model !== 'section') {
        const name = { tabs: 'tabs', 'gen-carousel': 'gen-carousel', 'columns-container': 'columns-container' }[s.model];
        if (name) {
          usage[name] = usage[name] || {
            instances: 0, library: [], curated: [], other: [],
          };
          usage[name].instances += 1;
          if (!seen.has(name)) { seen.add(name); usage[name][kind].push(path); }
          add(s.model, s.fields);
        }
      }
      (s.content || []).forEach((e) => {
        const b = blockOfEntry(e);
        if (!b) return;
        const folder = inputs.blocks.includes(b) ? b : { 'tabs-block': 'tabs' }[b];
        if (folder) {
          usage[folder] = usage[folder] || {
            instances: 0, library: [], curated: [], other: [],
          };
          usage[folder].instances += 1;
          if (!seen.has(folder)) { seen.add(folder); usage[folder][kind].push(path); }
        }
        const comp = inputs.definitions.get(b);
        add(comp?.plugins?.xwalk?.page?.template?.model || b, e.fields);
        (e.items || []).forEach((item) => add(item.component || item.model || `${b}-item`, item.fields));
      });
    });
  });
  Object.values(usage).forEach((u) => ['library', 'curated', 'other'].forEach((k) => u[k].sort()));
  const pkg = readdirSync(resolve(root, '.home-work/bl')).filter((f) => /^tcs-corp-block-library-content-[\d.]+\.zip$/.test(f))
    .map((f) => f.match(/([\d.]+)\.zip$/)[1]).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .pop();
  return { package: pkg || '', examples, usage };
}

/* ------------------------------------------------------------------ CLI */

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let inputs = loadInputs();
  const snapshot = await librarySnapshot(ROOT, inputs);
  if (snapshot) {
    writeFileSync(resolve(ROOT, 'tools/docs/library-snapshot.json'), `${JSON.stringify(snapshot, null, 1)}\n`);
    inputs = loadInputs();
  }
  let changed = 0;
  inputs.blocks.forEach((block) => {
    const file = resolve(ROOT, 'blocks', block, 'README.md');
    if (!existsSync(file)) return;
    const before = readFileSync(file, 'utf8');
    const after = renderReadme(before, inputs, block);
    if (after !== before) { writeFileSync(file, after); changed += 1; }
  });
  const rootFile = resolve(ROOT, 'blocks/README.md');
  if (existsSync(rootFile)) {
    const before = readFileSync(rootFile, 'utf8');
    const after = renderReadme(before, inputs, null);
    if (after !== before) { writeFileSync(rootFile, after); changed += 1; }
  }
  // eslint-disable-next-line no-console
  console.log(`block docs: ${changed} README(s) updated${snapshot ? `, library snapshot ${snapshot.package}` : ' (library snapshot kept)'}`);
}

export { json, read };
