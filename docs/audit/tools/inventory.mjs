// Block ecosystem inventory, generated from the repository (no guessing): component definitions,
// models, filters, block folders, the code that reads each field and each option value, and the
// usage of every block, field and option in the block library and curated design pages
// (the AEM content package, i.e. what is installed in AEM). Writes /tmp/audit/inventory.json.
import {
  readFileSync, readdirSync, existsSync, writeFileSync, statSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const R = process.env.REPO || '/backups/sradha-tcs/tcs-corp/repo/';
const PKG = '/backups/sradha-tcs/tcs-corp/repo/.home-work/bl/package/jcr_root';
const json = (f) => JSON.parse(readFileSync(R + f, 'utf8'));
const defs = json('component-definition.json');
const models = new Map(json('component-models.json').map((m) => [m.id, m]));
const filters = new Map(json('component-filters.json').map((f) => [f.id, f.components || []]));
const components = defs.groups.flatMap((g) => g.components.map((c) => ({ ...c, group: g.title })));
const toClass = (s) => String(s || '').toLowerCase().replace(/[^0-9a-z]/g, '-').replace(/-+/g, '-')
  .replace(/^-|-$/g, '');
const norm = (s) => String(s || '').toLowerCase().replace(/[^0-9a-z]/g, '');

/* code corpus: each block folder's JS / CSS plus the shared modules it imports (transitively) */
const read = (f) => (existsSync(f) ? readFileSync(f, 'utf8') : '');
const importsOf = (file, seen = new Set()) => {
  if (seen.has(file) || !existsSync(file)) return seen;
  seen.add(file);
  const src = read(file);
  [...src.matchAll(/from\s+'([^']+\.js)'/g), ...src.matchAll(/import\(\s*[`']([^`'$]+\.js)[`']/g)].forEach(([, rel]) => {
    if (!rel.startsWith('.')) return;
    const target = join(file, '..', rel);
    if (!target.endsWith('scripts/aem.js')) importsOf(target, seen);
  });
  return seen;
};
const globalCss = ['styles/styles.css', 'styles/lazy-styles.css', 'styles/card-list.css', 'styles/motion.css']
  .map((f) => read(R + f)).join('\n');
const globalJs = ['scripts/scripts.js', 'scripts/editor-support.js', 'decorators/block-options-decorator.js', 'decorators/motion-decorator.js', 'utils/motion.js']
  .map((f) => read(R + f)).join('\n');

const blockFolders = readdirSync(`${R}blocks`).filter((d) => statSync(`${R}blocks/${d}`).isDirectory());
const corpus = new Map(blockFolders.map((b) => {
  const dir = `${R}blocks/${b}`;
  const jsFiles = readdirSync(dir).filter((f) => f.endsWith('.js')).map((f) => `${dir}/${f}`);
  const files = new Set();
  jsFiles.forEach((f) => importsOf(f, files));
  const js = [...files].map(read).join('\n');
  const css = readdirSync(dir).filter((f) => f.endsWith('.css')).map((f) => read(`${dir}/${f}`)).join('\n');
  return [b, {
    js, css, files: [...files].map((f) => f.replace(R, '')), readme: existsSync(`${dir}/README.md`),
  }];
}));

/* usage: the installed content package (block library + curated design pages) */
const pkg = execFileSync('bash', ['-c', `cd ${PKG} && grep -rl --include=.content.xml 'cq:PageContent' . | head -2000`], { encoding: 'utf8' })
  .split('\n').filter(Boolean);
const pageUsage = [];
pkg.forEach((rel) => {
  const xml = readFileSync(`${PKG}/${rel}`, 'utf8');
  const path = `/${rel.replace(/^\.\//, '').replace(/\/\.content\.xml$/, '')}`;
  [...xml.matchAll(/<([a-z_0-9]+) ([^>]*?)(\/?)>/g)].forEach(([, , attrs]) => {
    const get = (n) => attrs.match(new RegExp(`(?:^|\\s)${n}="([^"]*)"`))?.[1];
    const model = get('model');
    const rt = get('sling:resourceType') || '';
    if (!model && !/franklin\/components\/(title|text|image|button)/.test(rt)) return;
    const values = {};
    [...attrs.matchAll(/(?:^|\s)([A-Za-z_][\w:-]*)="([^"]*)"/g)].forEach(([, k, v]) => { values[k] = v; });
    pageUsage.push({
      page: path, model: model || rt.split('/').slice(-2, -1)[0], name: get('name') || '', values,
    });
  });
});

const fieldsOf = (model) => {
  const out = [];
  const walk = (fs, parent) => (fs || []).forEach((f) => {
    out.push({ ...f, parent });
    if (f.component === 'container') walk(f.fields, f.name);
  });
  walk(model?.fields);
  return out;
};

const parentsOf = (id) => [...filters.entries()].filter(([, list]) => list.includes(id)).map(([fid]) => fid);
const filterOwner = (fid) => components.filter((c) => c.plugins?.xwalk?.page?.template?.filter === fid).map((c) => c.id);

const inventory = components.map((c) => {
  const page = c.plugins?.xwalk?.page || {};
  const t = page.template || {};
  const rt = page.resourceType || '';
  const kind = /block\/v1\/block\/item$/.test(rt) ? 'item' : /(block\/v1\/block|columns\/v1\/columns)$/.test(rt) ? 'block'
    : /section/.test(rt) ? 'section' : 'default-content';
  const cls = kind === 'section' ? (t.style || 'section') : toClass(t.name || c.title);
  const folder = blockFolders.includes(cls) ? cls : (blockFolders.includes(c.id) ? c.id : null);
  const code = folder ? corpus.get(folder) : { js: globalJs + read(`${R}decorators/content-buttons-decorator.js`) + read(`${R}utils/buttons.js`), css: globalCss, files: [] };
  // items and sections are decorated by their parent block / scripts.js
  const parentBlocks = parentsOf(c.id).flatMap(filterOwner);
  const parentCode = parentBlocks.map((p) => corpus.get(toClass(components.find((x) => x.id === p)?.plugins?.xwalk?.page?.template?.name || p))
    || corpus.get(p)).filter(Boolean);
  const allJs = [code.js, ...parentCode.map((p) => p.js), kind === 'section' ? globalJs : ''].join('\n');
  const allCss = [code.css, ...parentCode.map((p) => p.css), globalCss].join('\n');
  const jsNorm = allJs.toLowerCase();
  const model = models.get(t.model || c.id);
  const uses = pageUsage.filter((u) => (u.model === (t.model || c.id)) && (!u.name || toClass(u.name) === toClass(t.name || c.title) || kind === 'default-content'));
  const fields = fieldsOf(model).filter((f) => f.component !== 'tab').map((f) => {
    const name = f.name || '';
    const isClass = name.startsWith('classes');
    const read = jsNorm.includes(`'${norm(name)}'`) || jsNorm.includes(`.${norm(name)}`) || jsNorm.includes(`"${norm(name)}"`)
      || allJs.includes(name) || jsNorm.includes(norm(name));
    const options = (f.options || []).map((o) => {
      const v = String(o.value ?? '');
      const cssHit = v && (allCss.includes(`.${v}`) || allCss.includes(`.${toClass(v)}`));
      const jsHit = v && (allJs.includes(`'${v}'`) || allJs.includes(`"${v}"`) || allJs.includes(`\`${v}\``) || allJs.includes(v));
      const used = uses.filter((u) => String(u.values[name] || '').split(/[,[\]]/).map((x) => x.trim()).includes(v)).length;
      return {
        name: o.name, value: v, css: Boolean(cssHit), js: Boolean(jsHit), used,
      };
    });
    const usedCount = uses.filter((u) => u.values[name] !== undefined && u.values[name] !== '').length;
    return {
      name, label: f.label, component: f.component, valueType: f.valueType, required: Boolean(f.required),
      default: f.value, multi: Boolean(f.multi), condition: Boolean(f.condition), parent: f.parent || null,
      description: f.description || '', readByCode: isClass ? null : read, classField: isClass, options, usedCount,
    };
  });
  return {
    id: c.id, title: c.title, group: c.group, kind, resourceType: rt, templateName: t.name || null,
    blockClass: kind === 'default-content' ? null : cls, folder, model: t.model || null, filter: t.filter || null,
    keyValue: Boolean(t['key-value']), parents: parentsOf(c.id), children: t.filter ? filters.get(t.filter) || [] : [],
    js: folder ? code.files : [], readme: folder ? code.readme : false,
    usage: { instances: uses.length, pages: [...new Set(uses.map((u) => u.page))].length },
    fields,
  };
});

const orphanFolders = blockFolders.filter((b) => !inventory.some((i) => i.folder === b));
const orphanModels = [...models.keys()].filter((m) => !inventory.some((i) => i.model === m || i.id === m));
const unusedFilters = [...filters.keys()].filter((f) => !inventory.some((i) => i.filter === f) && !['main', 'section'].includes(f));
writeFileSync(process.env.OUT || '/tmp/audit/inventory.json', JSON.stringify({
  generated: new Date().toISOString(), components: inventory, orphanFolders, orphanModels, unusedFilters,
  pages: [...new Set(pageUsage.map((u) => u.page))].length,
}, null, 1));
console.log({
  components: inventory.length, byKind: inventory.reduce((a, i) => ({ ...a, [i.kind]: (a[i.kind] || 0) + 1 }), {}),
  fields: inventory.reduce((n, i) => n + i.fields.length, 0), pages: [...new Set(pageUsage.map((u) => u.page))].length,
  orphanFolders, orphanModels, unusedFilters,
});
