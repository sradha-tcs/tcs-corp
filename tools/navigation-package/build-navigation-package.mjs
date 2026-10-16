/*
 * Builds the sample navigation content package (FileVault) from navigation-tree.json:
 * docs/content-packages/tcs-corp-navigation-content-final.zip, with a page per navigation item
 * below /content/tcs-corp/us/en/home (Navigation Title, Navigation Order, Hide in navigation,
 * a placeholder title and text), the tree as JSON and CSV, and a README.
 *
 * The filter has one root per L1 page in merge mode: the Home page and anything that already
 * exists in AEM are never modified or deleted; only missing pages are added.
 *
 * Run: node tools/navigation-package/build-navigation-package.mjs
 * No dependencies: the ZIP is written with node:zlib (deflate, crc32).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { crc32, deflateRawSync } from 'node:zlib';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..');
const OUTPUT = join(repo, 'docs', 'content-packages', 'tcs-corp-navigation-content-final.zip');
const NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_DEPTH = 3;

// AEM Edge Delivery (xwalk) page defaults of aem-boilerplate-xwalk; not read from the target
// author (see the README): check them against an existing page before installing
const PAGE_TEMPLATE = '/libs/core/franklin/templates/page';
const PAGE_TYPE = 'core/franklin/components/page/v1/page';

const tree = JSON.parse(readFileSync(join(here, 'navigation-tree.json'), 'utf8'));

const xml = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/** every item with its path, level, parent and order, validated (names, depth, duplicates) */
function flatten(items, parentPath, level, parentTitle, out) {
  if (items.length && level > MAX_DEPTH) throw new Error(`deeper than ${MAX_DEPTH} levels below ${parentPath}`);
  const names = new Set();
  items.forEach((item, index) => {
    if (!NAME.test(item.name)) throw new Error(`not a URL-safe page name: ${item.name}`);
    if (names.has(item.name)) throw new Error(`duplicate sibling ${item.name} in ${parentPath}`);
    if (!String(item.title || '').trim()) throw new Error(`no title: ${parentPath}/${item.name}`);
    names.add(item.name);
    const path = `${parentPath}/${item.name}`;
    out.push({
      level,
      path,
      title: item.title.trim(),
      order: index + 1,
      parent: parentTitle,
      figma: item.figma || '',
      children: (item.children || []).map((child) => child.title),
    });
    flatten(item.children || [], path, level + 1, item.title.trim(), out);
  });
  return out;
}

const pages = flatten(tree.items, tree.root, 1, '', []);
const published = (path) => path.replace(tree.root, tree.published);

function pageXml(page) {
  const text = `<p>Sample page (placeholder content) for the site navigation: ${xml(page.title)}. Replace with approved content before publishing.</p>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="cq:Page">
    <jcr:content
        cq:template="${PAGE_TEMPLATE}"
        jcr:primaryType="cq:PageContent"
        jcr:title="${xml(page.title)}"
        sling:resourceType="${PAGE_TYPE}"
        nav-title="${xml(page.title)}"
        nav-order="{Long}${page.order}"
        hide-in-nav="{Boolean}false">
        <root
            jcr:primaryType="nt:unstructured"
            sling:resourceType="core/franklin/components/root/v1/root">
            <section
                jcr:primaryType="nt:unstructured"
                sling:resourceType="core/franklin/components/section/v1/section"
                model="section">
                <title
                    jcr:primaryType="nt:unstructured"
                    sling:resourceType="core/franklin/components/title/v1/title"
                    model="title"
                    title="${xml(page.title)}"
                    titleType="h1"/>
                <text
                    jcr:primaryType="nt:unstructured"
                    sling:resourceType="core/franklin/components/text/v1/text"
                    text="${xml(text)}"/>
            </section>
        </root>
    </jcr:content>
</jcr:root>
`;
}

const filterXml = `<?xml version="1.0" encoding="UTF-8"?>
<workspaceFilter version="1.0">
${tree.items.map((item) => `    <filter root="${tree.root}/${item.name}" mode="merge"/>`).join('\n')}
</workspaceFilter>
`;

const propertiesXml = `<?xml version="1.0" encoding="utf-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<comment>FileVault Package Properties</comment>
<entry key="name">tcs-corp-navigation-content-final</entry>
<entry key="group">tcs-corp</entry>
<entry key="version">1.0.0</entry>
<entry key="description">Sample navigation pages (L1-L2-L3, Figma Navigation 1124:25825) below ${tree.root}; merge only, no existing content is changed.</entry>
<entry key="packageType">content</entry>
<entry key="requiresRoot">false</entry>
<entry key="allowIndexDefinitions">false</entry>
</properties>
`;

const configXml = `<?xml version="1.0" encoding="UTF-8"?>
<vaultfs version="1.1">
    <aggregates>
        <aggregate type="file" title="Files"/>
        <aggregate type="filefolder" title="File Folders"/>
        <aggregate type="nodetype" title="Node Types"/>
        <aggregate type="full" title="Full Coverage">
            <matches>
                <include name="rep:AccessControl" respectSupertype="true"/>
                <include name="rep:Policy" respectSupertype="true"/>
                <include name="cq:Widget" respectSupertype="true"/>
                <include name="cq:EditConfig" respectSupertype="true"/>
                <include name="cq:WorkflowModel" respectSupertype="true"/>
                <include name="vlt:FullCoverage" respectSupertype="true"/>
                <include name="mix:language" respectSupertype="true"/>
                <include name="sling:OsgiConfig" respectSupertype="true"/>
            </matches>
        </aggregate>
        <aggregate type="generic" title="Folders">
            <matches>
                <include name="nt:folder" respectSupertype="true"/>
            </matches>
            <contains>
                <exclude isNode="true"/>
            </contains>
        </aggregate>
        <aggregate type="generic" title="Default"/>
    </aggregates>
    <handlers>
        <handler type="folder"/>
        <handler type="file"/>
        <handler type="nodetype"/>
        <handler type="generic"/>
    </handlers>
</vaultfs>
`;

const csv = (value) => (/[",\n]/.test(String(value)) ? `"${String(value).replace(/"/g, '""')}"` : String(value));
const treeCsv = [
  ['level', 'title', 'parent', 'order', 'aem_path', 'published_path', 'figma_node'].join(','),
  ...pages.map((p) => [`L${p.level}`, p.title, p.parent, p.order, p.path, published(p.path), p.figma].map(csv).join(',')),
].join('\n').concat('\n');

const toJsonTree = (items, parentPath) => items.map((item, index) => {
  const path = `${parentPath}/${item.name}`;
  return {
    title: item.title,
    name: item.name,
    order: index + 1,
    path,
    publishedPath: published(path),
    ...(item.figma ? { figma: item.figma } : {}),
    children: toJsonTree(item.children || [], path),
  };
});
const treeJson = `${JSON.stringify({
  root: tree.root,
  published: tree.published,
  source: tree.source,
  maxDepth: MAX_DEPTH,
  pages: pages.length,
  items: toJsonTree(tree.items, tree.root),
}, null, 2)}\n`;

const counts = [1, 2, 3].map((level) => pages.filter((p) => p.level === level).length);
const readme = `# TCS Corp sample navigation content

Content package: \`tcs-corp-navigation-content-final.zip\` (FileVault), ${pages.length} pages below
\`${tree.root}\` (published at \`${tree.published}\`): ${counts[0]} L1, ${counts[1]} L2 and ${counts[2]} L3.

Source: ${tree.source}. The hierarchy is in \`navigation-tree.json\` and \`navigation-tree.csv\`.

## Before installing

1. Install on a non-production author first.
2. Check the page defaults against an existing page of the site (CRXDE, e.g.
   \`${tree.root}/jcr:content\`): every page uses \`cq:template="${PAGE_TEMPLATE}"\` and
   \`sling:resourceType="${PAGE_TYPE}"\` (the aem-boilerplate-xwalk defaults; they could not be read
   from the target author). If they differ, change them in the package or rebuild it.
3. The filter has one root per L1 page in \`merge\` mode: pages that already exist are left as they
   are (properties and children), nothing is deleted, the Home page itself isn't touched.

## What each page has

- \`jcr:title\` and \`nav-title\` (Navigation Title): the Figma label.
- \`nav-order\` (Navigation Order): its position among its siblings in Figma (1 first).
- \`hide-in-nav\` (Hide in navigation): false.
- A section with a title (h1) and one paragraph marked as placeholder content; no images.

## After installing

1. Publish the pages (Manage Publication, or Quick Publish of the tree). The navigation reads the
   published pages (query index), so unpublished pages don't appear.
2. On the Navigation page (e.g. \`/content/tcs-corp/us/en/references/tcs-header\`):
   - Conversation Canvas: Menu root path \`${tree.root}\`, Menu depth 3.
   - TCS Header: Navigation root \`${tree.root}\`, Navigation depth 3 (tablet and mobile menu).
3. Re-publish the Navigation page.

## Placeholders to confirm

- Insights has no sub-pages: Figma shows only "Dynamic category" placeholders.
- Careers L3 items show an external-link arrow in Figma; no URLs were given, so they are pages here.
- Investors > Financials > Download TCS Data Sheet reads like a download link, not a page.
- Figma's labels are kept as they are (e.g. "Capital markets", "Consumer goods", "Energy & utility").
`;

// files of the package
const files = [
  ['META-INF/vault/filter.xml', filterXml],
  ['META-INF/vault/properties.xml', propertiesXml],
  ['META-INF/vault/config.xml', configXml],
  ['navigation-tree.json', treeJson],
  ['navigation-tree.csv', treeCsv],
  ['README.md', readme],
  ...pages.map((page) => [`jcr_root${page.path}/.content.xml`, pageXml(page)]),
];

// minimal ZIP writer (deflate), with the folder entries FileVault expects; crc32 is unsigned
function zip(entries) {
  const folders = new Set();
  entries.forEach(([name]) => {
    const parts = name.split('/');
    for (let i = 1; i < parts.length; i += 1) folders.add(`${parts.slice(0, i).join('/')}/`);
  });
  const all = [...[...folders].sort().map((name) => [name, '']), ...entries];
  const locals = [];
  const centrals = [];
  let offset = 0;
  all.forEach(([name, content]) => {
    const data = Buffer.from(content, 'utf8');
    const folder = name.endsWith('/');
    const packed = folder ? Buffer.alloc(0) : deflateRawSync(data);
    const crc = folder ? 0 : crc32(data);
    const nameBytes = Buffer.from(name, 'utf8');
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(0x0800, 6);
    header.writeUInt16LE(folder ? 0 : 8, 8);
    header.writeUInt32LE(0x00210000, 10);
    header.writeUInt32LE(crc, 14);
    header.writeUInt32LE(packed.length, 18);
    header.writeUInt32LE(data.length, 22);
    header.writeUInt16LE(nameBytes.length, 26);
    locals.push(header, nameBytes, packed);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(folder ? 0 : 8, 10);
    central.writeUInt32LE(0x00210000, 12);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(packed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBytes.length, 28);
    central.writeUInt32LE(folder ? 0x10 : 0, 38);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBytes);
    offset += 30 + nameBytes.length + packed.length;
  });
  const directory = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(all.length, 8);
  end.writeUInt16LE(all.length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, directory, end]);
}

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, zip(files));
writeFileSync(join(here, 'navigation-tree.csv'), treeCsv);
// eslint-disable-next-line no-console
console.log(`${OUTPUT}: ${pages.length} pages (L1 ${counts[0]}, L2 ${counts[1]}, L3 ${counts[2]}), ${files.length} files`);
