#!/usr/bin/env node
/*
 * Rich Text block library (KB-D-080): generates the block library pages of the Rich Text block and
 * the built-in Text component, with at most ten variations a page, as
 * - an AEM content package (FileVault: META-INF/vault + jcr_root, the format of the block library
 *   packages in sradha-tcs/tcs-corp-delivery, archive/home-content-package/), and
 * - drafts with the markup Edge Delivery delivers for them (drafts/rich-text-library/), to check
 *   the pages in the local and feature previews before the package is installed.
 *
 * The node properties follow the current models (component-models.json: modelFields, field names,
 * option values), so run it after npm run build:json. Images are the block library's DAM images
 * (/content/dam/tcs-corp/block-library/images, from the block library package).
 *
 * Usage: node tools/library/generate-rich-text-library.mjs [--root design-block-master]
 *        [--version 1.0.0] [--out migration-work/rich-text-library] [--no-drafts]
 */
import {
  mkdirSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { crc32, deflateRawSync } from 'node:zlib';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const SITE_ROOT = option('root', 'design-block-master');
const VERSION = option('version', '1.0.0');
const OUT = resolve(REPO, option('out', 'migration-work/rich-text-library'));
const WRITE_DRAFTS = !args.includes('--no-drafts');

const PACKAGE = 'tcs-corp-rich-text-library-content';
const LIBRARY = `/content/tcs-corp/${SITE_ROOT}/en/block-library/rich-text`;
const DAM = '/content/dam/tcs-corp/block-library/images';
const DRAFTS = '/drafts/rich-text-library';
const MAX_VARIATIONS = 10;

/* ---------- models ---------- */

const models = JSON.parse(readFileSync(resolve(REPO, 'component-models.json'), 'utf8'));
const fieldsOf = (id) => {
  const model = models.find((m) => m.id === id);
  if (!model) throw new Error(`component-models.json has no model ${id}: run npm run build:json`);
  return model.fields;
};
const modelFields = (id) => fieldsOf(id).map((f) => f.name);
const RICH_TEXT_FIELDS = fieldsOf('rich-text');

/** fails when a variation uses a class the Rich Text model doesn't offer */
function checkClasses(classes) {
  Object.entries(classes).forEach(([name, value]) => {
    const field = RICH_TEXT_FIELDS.find((f) => f.name === name);
    if (!field) throw new Error(`Rich Text has no field ${name}`);
    if (field.options && !field.options.some((o) => o.value === value)) {
      throw new Error(`Rich Text ${name} has no option ${value}`);
    }
    if (field.component === 'boolean' && typeof value !== 'boolean') {
      throw new Error(`Rich Text ${name} is a boolean`);
    }
  });
}

/* ---------- sample content (HTML as the editor stores it) ---------- */

const page = (slug) => `${LIBRARY}/${slug}`;
const draft = (slug) => `${DRAFTS}/${slug}.html`;

const P1 = 'Tata Consultancy Services helps enterprises reimagine how they work, with technology, consulting and business solutions delivered across more than fifty countries.';
const P2 = 'Our teams combine deep industry knowledge with platforms, partners and research, so that every transformation starts from the outcomes that matter to the business.';
const P3 = 'From cloud foundations to AI at scale, we build resilient operations, connected experiences and new sources of growth, and we measure progress together with our clients.';
const PARAS = `<p>${P1}</p><p>${P2}</p><p>${P3}</p>`;
const LONG = `<p>${P1} ${P2}</p><p>${P3} ${P1}</p><p>${P2} ${P3}</p><p>${P1} ${P3}</p>`;

const TABLE = '<table><tbody>'
  + '<tr><th>Service line</th><th>Focus</th><th>Typical outcome</th></tr>'
  + '<tr><td>Cloud</td><td>Migration and modernisation</td><td>Lower run cost, faster releases</td></tr>'
  + '<tr><td>AI and data</td><td>Platforms and governance</td><td>Decisions in hours, not weeks</td></tr>'
  + '<tr><td>Cyber security</td><td>Managed detection and response</td><td>Fewer incidents, faster recovery</td></tr>'
  + '</tbody></table>';
const WIDE_TABLE = '<table><tbody>'
  + '<tr><th>Region</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th><th>Year</th><th>Change</th><th>Notes</th></tr>'
  + '<tr><td>North America</td><td>1,200</td><td>1,340</td><td>1,410</td><td>1,560</td><td>5,510</td><td>+8%</td><td>Strong services demand</td></tr>'
  + '<tr><td>Europe</td><td>980</td><td>1,020</td><td>1,050</td><td>1,120</td><td>4,170</td><td>+5%</td><td>Steady growth</td></tr>'
  + '<tr><td>Asia Pacific</td><td>640</td><td>690</td><td>720</td><td>780</td><td>2,830</td><td>+11%</td><td>New delivery centres</td></tr>'
  + '</tbody></table>';
const CODE = '<pre><code>const greeting = \'Hello, world\';\nconsole.log(greeting);</code></pre>';

const HEADINGS = '<h2>Heading 2</h2><p>A paragraph under a level 2 heading.</p>'
  + '<h3>Heading 3</h3><p>A paragraph under a level 3 heading.</p>'
  + '<h4>Heading 4</h4><p>A paragraph under a level 4 heading.</p>'
  + '<h5>Heading 5</h5><p>A paragraph under a level 5 heading.</p>'
  + '<h6>Heading 6</h6><p>A paragraph under a level 6 heading.</p>';
const INLINE = '<p>A paragraph with <strong>bold</strong>, <em>italic</em>, <u>underline</u>, '
  + '<del>strikethrough</del> and <code>inline code</code>.</p>'
  + '<p>Superscript and subscript: E = mc<sup>2</sup>, H<sub>2</sub>O and the 1<sup>st</sup> quarter.</p>';
const LISTS = '<h3>Bullet list</h3><ul><li>Cloud foundations<ul><li>Landing zones</li><li>Platform engineering</li></ul></li>'
  + '<li>AI at scale</li><li>Cyber resilience</li></ul>'
  + '<h3>Numbered list</h3><ol><li>Assess the estate</li><li>Plan the waves<ol><li>Pilot</li><li>Scale</li></ol></li>'
  + '<li>Run and improve</li></ol>';
const LINKS = `<p>An inline link to <a href="${LIBRARY}">the Rich Text library</a>, `
  + 'an external link to <a href="https://www.tcs.com/">tcs.com</a> '
  + 'and an e-mail link to <a href="mailto:corporate.communications@example.com">corporate communications</a>.</p>';
const BUTTONS = `<p><strong><a href="${LIBRARY}">Primary button (bold link)</a></strong></p>`
  + `<p><em><a href="${LIBRARY}">Secondary button (italic link)</a></em></p>`
  + `<p><strong><em><a href="${LIBRARY}">Tertiary button (bold and italic link)</a></em></strong></p>`
  + `<p><a href="${LIBRARY}">Link button (a link alone in its paragraph)</a></p>`;
const IMAGE = `<p>An image from the DAM, inserted with the toolbar's Image button (it is delivered as an optimized picture):</p><p><img src="${DAM}/wide-sample.jpg" alt="A team working together in a bright office"></p><p>Text continues after the image.</p>`;
const SPECIAL = '<p>Special characters: © ® ™ € £ ¥ § ¶ ° ± × ÷ ½ ¼ ¾ – — … “quotes” ‘single’ « guillemets » → ←.</p>'
  + '<blockquote><p>A quotation made with the toolbar\'s Quote format (a blockquote, delivered by Edge Delivery).</p></blockquote>';

const UNDERLINED = '<p>Tata Consultancy Services helps enterprises <u>reimagine how they work</u>, with technology, consulting and business solutions delivered across <u>more than fifty countries</u>.</p>';
const RTL = '<p>تساعد تاتا للخدمات الاستشارية المؤسسات على إعادة تصور طريقة عملها، من خلال التكنولوجيا والاستشارات وحلول الأعمال.</p><p>A sentence in English inside right-to-left text keeps its own order.</p>';

const intro = (heading, text) => `<h3>${heading}</h3><p>${text}</p>`;

/*
 * The pages: a variation is a section with an H2 title naming it and one Rich Text block (or Text
 * components); `classes` are the block's Style / Additional tab values, `style` the section's.
 */
const RICH_TEXT_PAGES = [
  {
    slug: 'rich-text-layout',
    title: 'Rich Text: alignment, width and columns',
    description: 'The Style tab\'s Alignment, Width and Columns of the Rich Text block.',
    variations: [
      { label: 'Default (left aligned, full width, one column)', classes: {}, html: `${intro('Our approach', P1)}<p>${P2}</p>` },
      { label: 'Alignment Center', classes: { classes_align: 'align-center' }, html: `${intro('Centred text', P1)}<p>${P2}</p>` },
      { label: 'Alignment Right', classes: { classes_align: 'align-right' }, html: intro('Right aligned text', P1) },
      { label: 'Alignment Justify', classes: { classes_align: 'align-justify' }, html: `<p>${P1} ${P2} ${P3}</p>` },
      { label: 'Width Medium (60rem)', classes: { classes_width: 'width-medium' }, html: PARAS },
      { label: 'Width Narrow (45rem)', classes: { classes_width: 'width-narrow' }, html: PARAS },
      { label: 'Width Narrow, Alignment Center', classes: { classes_width: 'width-narrow', classes_align: 'align-center' }, html: `${intro('A centred reading column', P1)}<p>${P2}</p>` },
      { label: 'Columns Two (from tablet)', classes: { classes_columns: 'columns-2' }, html: LONG },
      { label: 'Columns Three (from desktop)', classes: { classes_columns: 'columns-3' }, html: LONG },
      { label: 'Columns Two, Alignment Justify', classes: { classes_columns: 'columns-2', classes_align: 'align-justify' }, html: LONG },
    ],
  },
  {
    slug: 'rich-text-typography',
    title: 'Rich Text: text size, lead paragraph and colour',
    description: 'The Style tab\'s Text size, First paragraph and Text colour of the Rich Text block, on the Section backgrounds.',
    variations: [
      { label: 'Text size Small', classes: { classes_size: 'size-small' }, html: PARAS },
      { label: 'Text size Large', classes: { classes_size: 'size-large' }, html: PARAS },
      { label: 'First paragraph Lead paragraph', classes: { classes_lede: 'lede-first' }, html: PARAS },
      { label: 'Text size Small, Text colour Secondary (notes and disclaimers)', classes: { classes_size: 'size-small', classes_color: 'color-secondary' }, html: '<p>Figures are unaudited and rounded. Past performance is not a guide to future results; see the annual report for the full statements.</p>' },
      { label: 'Text colour Secondary', classes: { classes_color: 'color-secondary' }, html: intro('Secondary colour', P1) },
      { label: 'Text colour Brand', classes: { classes_color: 'color-brand' }, html: intro('Brand colour', P1) },
      {
        label: 'Default on a Grey Section', style: 'bg-grey', classes: {}, html: intro('On grey', P1) + LINKS,
      },
      {
        label: 'Default on a Dark Section', style: 'bg-dark', classes: {}, html: `${intro('On dark', P1) + LINKS}<p><strong><a href="${LIBRARY}">Primary button</a></strong></p>`,
      },
      {
        label: 'Text colour Secondary on a Dark green Section', style: 'bg-dark-green', classes: { classes_color: 'color-secondary' }, html: intro('Secondary on dark green', P1),
      },
      {
        label: 'Introduction: Alignment Center, Lead paragraph, Width Narrow, Text size Large',
        classes: {
          classes_align: 'align-center', classes_lede: 'lede-first', classes_width: 'width-narrow', classes_size: 'size-large',
        },
        html: `<h2>Building on belief</h2>${PARAS}`,
      },
    ],
  },
  {
    slug: 'rich-text-toolbar',
    title: 'Rich Text: toolbar content',
    description: 'Content made with the rich text toolbar in the Rich Text block: headings, formatting, lists, links, buttons, tables, code, images and special characters.',
    variations: [
      { label: 'Headings H2 to H6', classes: {}, html: HEADINGS },
      { label: 'Inline formatting', classes: {}, html: INLINE },
      { label: 'Bullet and numbered lists, nested', classes: {}, html: LISTS },
      { label: 'Links', classes: {}, html: LINKS },
      { label: 'Buttons (standalone bold / italic links)', classes: {}, html: BUTTONS },
      { label: 'Table with a header row', classes: {}, html: TABLE },
      { label: 'Wide table (scrolls on small screens)', classes: {}, html: WIDE_TABLE },
      { label: 'Code block', classes: {}, html: `<p>A code block keeps its line breaks and spacing:</p>${CODE}` },
      { label: 'Image', classes: {}, html: IMAGE },
      { label: 'Special characters and quote', classes: {}, html: SPECIAL },
    ],
  },
  {
    slug: 'rich-text-inline',
    title: 'Rich Text: coloured words, direction and links',
    description: 'The Style tab options that replace the toolbar tools Edge Delivery does not publish (KB-D-082): Underlined text colours the words underlined with the toolbar, Text direction and Links to other sites.',
    variations: [
      { label: 'Underlined text Underline (default)', classes: {}, html: UNDERLINED },
      { label: 'Underlined text Brand colour', classes: { classes_underline: 'underline-brand' }, html: UNDERLINED },
      { label: 'Underlined text Secondary colour', classes: { classes_underline: 'underline-secondary' }, html: UNDERLINED },
      { label: 'Underlined text Highlight', classes: { classes_underline: 'underline-highlight' }, html: UNDERLINED },
      { label: 'Underlined text Brand colour with bold and a heading', classes: { classes_underline: 'underline-brand' }, html: '<h3>Building on <u>belief</u></h3><p>Bold and underlined: <strong><u>a bold brand accent</u></strong> in a sentence.</p>' },
      {
        label: 'Underlined text Brand colour on a Dark Section', style: 'bg-dark', classes: { classes_underline: 'underline-brand' }, html: UNDERLINED,
      },
      {
        label: 'Underlined text Highlight on a Dark green Section', style: 'bg-dark-green', classes: { classes_underline: 'underline-highlight' }, html: UNDERLINED,
      },
      { label: 'Text direction Right to left', classes: { classes_direction: 'dir-rtl' }, html: RTL },
      { label: 'Links to other sites Open in a new tab', classes: { classes_links: 'links-new-tab' }, html: LINKS },
    ],
  },
  {
    slug: 'rich-text-additional',
    title: 'Rich Text: Additional tab',
    description: 'The Additional tab of the Rich Text block: Anchor ID, animation, padding, margin and Hide block.',
    variations: [
      {
        label: 'Anchor ID (anchor-rich-text-anchor-target)', anchor: 'anchor-rich-text-anchor-target', classes: {}, html: `<p>This block has the Anchor ID anchor-rich-text-anchor-target: <a href="${page('rich-text-additional')}#anchor-rich-text-anchor-target">a link to #anchor-rich-text-anchor-target</a> scrolls here.</p>`,
      },
      { label: 'Animation Fade up (Medium, On scroll)', classes: { classes_animation: 'motion-fade-up' }, html: PARAS },
      { label: 'Animation Slide left, Motion speed Slow', classes: { classes_animation: 'motion-slide-left', classes_animationspeed: 'motion-slow' }, html: PARAS },
      { label: 'Animation Scale in, Motion speed Fast, On page load', classes: { classes_animation: 'motion-scale-in', classes_animationspeed: 'motion-fast', classes_animationtrigger: 'motion-on-load' }, html: PARAS },
      {
        label: 'Padding top and bottom (pt-800, pb-800) on a Grey Section', style: 'bg-grey', classes: { classes_paddingtop: 'pt-800', classes_paddingbottom: 'pb-800' }, html: intro('Padded', P1),
      },
      { label: 'Margin left and right (ml-1200, mr-1200)', classes: { classes_marginleft: 'ml-1200', classes_marginright: 'mr-1200' }, html: intro('Indented by margins', P1) },
      { label: 'Hide block (hidden on the page, faded in the editor)', classes: { classes_hideblock: true }, html: '<p>This block is hidden on the published page; Universal Editor shows it faded and outlined.</p>' },
    ],
  },
];

/* the built-in Text component (filter text: the toolbar without tables) */
const TEXT_PAGE = {
  slug: 'text-component',
  title: 'Text component: toolbar content',
  description: 'The built-in Text component (default content) with the rich text toolbar: no tables (a table in default content becomes a block) and no block styles.',
  variations: [
    { label: 'Paragraphs and headings', html: `<h3>A level 3 heading</h3>${PARAS}<h4>A level 4 heading</h4><p>${P1}</p>` },
    { label: 'Inline formatting', html: INLINE },
    { label: 'Bullet and numbered lists, nested', html: LISTS },
    { label: 'Links', html: LINKS },
    { label: 'Buttons (standalone bold / italic links)', html: BUTTONS },
    { label: 'Image', html: IMAGE },
    { label: 'Code block', html: CODE },
    { label: 'Special characters and quote', html: SPECIAL },
    { label: 'Text on a Dark Section', style: 'bg-dark', html: intro('On dark', P1) + LINKS },
  ],
};

const ALL_PAGES = [...RICH_TEXT_PAGES, TEXT_PAGE];
ALL_PAGES.forEach((p) => {
  if (p.variations.length > MAX_VARIATIONS) throw new Error(`${p.slug}: more than ${MAX_VARIATIONS} variations, split the page`);
});

/* ---------- JCR (FileVault DocView) ---------- */

const NS = 'xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:dam="http://www.day.com/dam/1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:tiff="http://ns.adobe.com/tiff/1.0/"';
const RT = {
  page: 'core/franklin/components/page/v1/page',
  root: 'core/franklin/components/root/v1/root',
  section: 'core/franklin/components/section/v1/section',
  title: 'core/franklin/components/title/v1/title',
  text: 'core/franklin/components/text/v1/text',
  block: 'core/franklin/components/block/v1/block',
  item: 'core/franklin/components/block/v1/block/item',
};

/** an XML attribute value; FileVault escapes a leading [ or { and backslashes */
const xmlValue = (value) => {
  let s = String(value).replace(/\\/g, '\\\\');
  if (/^[[{]/.test(s)) s = `\\${s}`;
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '&#xa;')
    .replace(/\t/g, '&#x9;');
};
/** a multi-value property: [a,b] (commas in values escaped) */
const multi = (values) => `[${values.map((v) => xmlValue(v).replace(/,/g, '\\,')).join(',')}]`;
const typed = (value) => {
  if (typeof value === 'boolean') return `{Boolean}${value}`;
  if (typeof value === 'number') return `{Long}${value}`;
  return null;
};

/** a node: { name, props: [[key, value, raw?]], children } */
function nodeXml({ name, props, children = [] }, indent) {
  const pad = '    '.repeat(indent);
  const attrs = props.map(([k, v, raw]) => `${k}="${raw ? v : (typed(v) ?? xmlValue(v))}"`).join(' ');
  if (!children.length) return `${pad}<${name} ${attrs}/>`;
  return `${pad}<${name} ${attrs}>\n${children.map((c) => nodeXml(c, indent + 1)).join('\n')}\n${pad}</${name}>`;
}

/** unique child node names: text, text_0, text_1 ... (as AEM names them) */
function named(children) {
  const seen = {};
  return children.map((c) => {
    const n = seen[c.name] ?? -1;
    seen[c.name] = n + 1;
    return { ...c, name: n < 0 ? c.name : `${c.name}_${n}` };
  });
}

const SECTION_FIELDS = `[${modelFields('section').join(',')}]`;
const sectionNode = (children, style) => ({
  name: 'section',
  props: [
    ['sling:resourceType', RT.section], ['jcr:primaryType', 'nt:unstructured'], ['model', 'section'],
    ...(style ? [['style', multi([style]), true]] : []),
    ['modelFields', SECTION_FIELDS, true],
  ],
  children: named(children),
});
const titleNode = (title, level) => ({
  name: 'title',
  props: [['sling:resourceType', RT.title], ['jcr:primaryType', 'nt:unstructured'], ['model', 'title'], ['title', title], ['titleType', level]],
});
const textNode = (html, filter) => ({
  name: 'text',
  props: [['sling:resourceType', RT.text], ['jcr:primaryType', 'nt:unstructured'], ...(filter ? [['filter', filter]] : []), ['text', html]],
});

const RICH_TEXT_MODEL_FIELDS = `[${modelFields('rich-text').join(',')}]`;
const richTextNode = (html, classes, anchor) => ({
  name: 'block',
  props: [
    ['sling:resourceType', RT.block], ['jcr:primaryType', 'nt:unstructured'],
    ['name', 'Rich Text'], ['model', 'rich-text'], ['filter', 'rich-text'], ['key-value', 'true'],
    ['modelFields', RICH_TEXT_MODEL_FIELDS, true],
    ['text', html],
    ...Object.entries(classes),
    ['classes_anchor', anchor],
  ],
});

/* the List block of the folder page, as in the other block library folder pages */
const LIST_PROPS = [
  ['titleType', 'h2'], ['source', 'fixed'], ['orderBy', 'manual'], ['sortOrder', 'ascending'], ['maxItems', 0],
  ['displayAsTeaser', false], ['cardStyle', 'image'], ['imageRatio', '16-9'], ['panelHeight', 'portrait'],
  ['linkItems', true], ['showImage', true], ['showEyebrow', true], ['showTags', true], ['showDescription', true],
  ['showDate', true], ['dateFormat', 'dd-mmm-yy'], ['showCta', true], ['imageLoading', 'lazy'],
  ['desktopMode', 'grid'], ['desktopColumns', 4], ['tabletMode', 'grid'], ['tabletColumns', 4],
  ['mobileMode', 'grid'], ['mobileColumns', 1], ['scrollSnap', true], ['emptyBehavior', 'message'],
  ['analyticsEnabled', true],
];
const listNode = (links) => ({
  name: 'block',
  props: [
    ['sling:resourceType', RT.block], ['jcr:primaryType', 'nt:unstructured'],
    ['name', 'List'], ['model', 'list'], ['filter', 'list'], ['key-value', 'true'], ...LIST_PROPS,
    ['modelFields', `[${modelFields('list').join(',')}]`, true], ['listLabel', 'Pages'],
  ],
  children: links.map((link, i) => ({
    name: `item_${i}`,
    props: [
      ['sling:resourceType', RT.item], ['jcr:primaryType', 'nt:unstructured'],
      ['name', 'List Item'], ['model', 'list-item'],
      ['modelFields', `[${modelFields('list-item').join(',')}]`, true], ['link', link],
    ],
  })),
});

/** a variation's anchor: its label up to the first ( or : (anchor-rich-text-width-medium) */
const slugOf = (label) => label.split(/[(:]/)[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

function pageXml({ title, description, sections }) {
  const content = {
    name: 'jcr:content',
    props: [
      ['cq:template', '/libs/core/franklin/templates/page'], ['sling:resourceType', RT.page], ['jcr:primaryType', 'cq:PageContent'],
      ['jcr:title', title], ['jcr:description', description],
      ['keywords', multi(['block library', 'rich text']), true],
      ['modelFields', `[${modelFields('page-metadata').join(',')}]`, true],
    ],
    children: [{
      name: 'root',
      props: [['jcr:primaryType', 'nt:unstructured'], ['sling:resourceType', RT.root]],
      children: named(sections),
    }],
  };
  return `<?xml version="1.0" encoding="UTF-8"?>\n<jcr:root ${NS} jcr:primaryType="cq:Page">\n${nodeXml(content, 1)}\n</jcr:root>\n`;
}

const introText = (text, components) => `<p>${text}</p><p><strong>Components:</strong> ${components}.</p>`;
const LABEL_HINT = 'Each example is labelled with its variation; select it in Universal Editor to see the values in its dialog.';

/** a library page as JCR sections and as delivered (draft) sections */
function buildPage(p, isText) {
  const used = new Set();
  const sections = [sectionNode([titleNode(p.title, 'h1'), textNode(`<p>${p.description} ${LABEL_HINT}</p>`, 'text')])];
  const drafts = [{ html: `<h1>${p.title}</h1><p>${p.description} ${LABEL_HINT}</p>` }];
  p.variations.forEach((v) => {
    if (isText) {
      sections.push(sectionNode([titleNode(v.label, 'h2'), textNode(v.html, 'text')], v.style));
      drafts.push({ html: `<h2>${v.label}</h2>${v.html}`, style: v.style });
      return;
    }
    checkClasses(v.classes);
    let anchor = v.anchor || `anchor-rich-text-${slugOf(v.label)}`;
    for (let n = 2; used.has(anchor); n += 1) anchor = `${anchor}-${n}`;
    used.add(anchor);
    const { regExp } = RICH_TEXT_FIELDS.find((f) => f.name === 'classes_anchor').validation;
    if (!new RegExp(regExp).test(anchor)) throw new Error(`${p.slug}: invalid Anchor ID ${anchor}`);
    sections.push(sectionNode([titleNode(v.label, 'h2'), richTextNode(v.html, v.classes, anchor)], v.style));
    const classes = ['rich-text', ...Object.entries(v.classes).map(([k, val]) => (val === true ? k.replace('classes_', '') : val)), anchor];
    drafts.push({
      html: `<h2>${v.label}</h2><div class="${classes.join(' ')}"><div><div>text</div><div>${v.html}</div></div></div>`,
      style: v.style,
    });
  });
  return { sections, drafts };
}

/* ---------- drafts (the markup Edge Delivery delivers) ---------- */

/** internal links and images point at the drafts / the block library images in the drafts */
const draftHtml = (html) => html
  .replace(new RegExp(`${LIBRARY}/([a-z-]+)(#[a-z0-9-]+)?`, 'g'), (m, slug, hash = '') => `${draft(slug)}${hash}`)
  .replaceAll(`"${LIBRARY}"`, `"${draft('index')}"`)
  .replaceAll(`${DAM}/`, '/drafts/media/');

function draftDocument(title, sections) {
  const body = sections.map(({ html, style }) => {
    const meta = style ? `<div class="section-metadata"><div><div>style</div><div>${style}</div></div></div>` : '';
    return `    <div>${draftHtml(html)}${meta}</div>`;
  }).join('\n');
  return `<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="hide-header" content="true">
  <meta name="hide-footer" content="true">
  <meta name="hide-canvas" content="true">
  <meta name="robots" content="noindex, nofollow">
  <script src="/scripts/aem.js" type="module"></script>
  <script src="/scripts/scripts.js" type="module"></script>
  <link rel="stylesheet" href="/styles/styles.css">
</head>
<body>
  <header></header>
  <main>
    <!-- generated by tools/library/generate-rich-text-library.mjs: the markup Edge Delivery delivers for ${LIBRARY.replace(/^\/content\/tcs-corp/, '')} -->
${body}
  </main>
  <footer></footer>
</body>
</html>
`;
}

/* ---------- package (zip) ---------- */

const DOS_DATE = 33; // 1980-01-01: (year - 1980) * 512 + month * 32 + day

function zip(entries) {
  const files = [];
  const central = [];
  let offset = 0;
  entries.forEach(({ path, data }) => {
    const name = Buffer.from(path);
    const isDir = path.endsWith('/');
    const raw = isDir ? Buffer.alloc(0) : Buffer.from(data);
    const body = isDir ? raw : deflateRawSync(raw, { level: 9 });
    const method = isDir ? 0 : 8;
    const crc = isDir ? 0 : crc32(raw);
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(0x0800, 6); // UTF-8 names
    header.writeUInt16LE(method, 8);
    header.writeUInt16LE(0, 10); // time 00:00
    header.writeUInt16LE(DOS_DATE, 12); // 1980-01-01 (reproducible)
    header.writeUInt32LE(crc, 14);
    header.writeUInt32LE(body.length, 18);
    header.writeUInt32LE(raw.length, 22);
    header.writeUInt16LE(name.length, 26);
    files.push(header, name, body);
    const entry = Buffer.alloc(46);
    entry.writeUInt32LE(0x02014b50, 0);
    entry.writeUInt16LE(20, 4);
    entry.writeUInt16LE(20, 6);
    entry.writeUInt16LE(0x0800, 8);
    entry.writeUInt16LE(method, 10);
    entry.writeUInt16LE(0, 12);
    entry.writeUInt16LE(DOS_DATE, 14);
    entry.writeUInt32LE(crc, 16);
    entry.writeUInt32LE(body.length, 20);
    entry.writeUInt32LE(raw.length, 24);
    entry.writeUInt16LE(name.length, 28);
    entry.writeUInt32LE(isDir ? 0x10 : 0, 38);
    entry.writeUInt32LE(offset, 42);
    central.push(entry, name);
    offset += 30 + name.length + body.length;
  });
  const dir = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(dir.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...files, dir, end]);
}

/* ---------- build ---------- */

const pages = ALL_PAGES.map((p) => ({ ...p, ...buildPage(p, p === TEXT_PAGE) }));
const variationCount = ALL_PAGES.reduce((n, p) => n + p.variations.length, 0);

const folder = {
  title: 'Rich Text',
  description: 'Rich Text block (KB-D-080, KB-D-082): rich text with block styles (alignment, text size, lead paragraph, colour, columns, width, coloured underlined words, direction, new-tab links) and the editor toolbar; and the built-in Text component\'s toolbar.',
};
const folderSections = [sectionNode([
  titleNode(folder.title, 'h1'),
  textNode(introText(folder.description, 'rich-text, text'), 'text'),
  listNode(pages.map((p) => page(p.slug))),
])];

const files = [
  [`jcr_root${LIBRARY}/.content.xml`, pageXml({ ...folder, sections: folderSections })],
  ...pages.map((p) => [`jcr_root${LIBRARY}/${p.slug}/.content.xml`, pageXml(p)]),
];
const filterXml = `<?xml version="1.0" encoding="UTF-8"?>\n<workspaceFilter version="1.0">\n  <filter root="${LIBRARY}"/>\n</workspaceFilter>\n`;
const propertiesXml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<comment>FileVault Package Properties</comment>
<entry key="name">${PACKAGE}</entry>
<entry key="group">tcs-corp</entry>
<entry key="version">${VERSION}</entry>
<entry key="description">TCS Corporate Website: only ${LIBRARY} (${files.length} pages, ${variationCount} variations of the Rich Text block and the Text component, KB-D-080); the images are those of the block library package, already in AEM.</entry>
<entry key="createdBy">TCS Corp delivery</entry>
<entry key="requiresRoot">false</entry>
<entry key="allowIndexDefinitions">false</entry>
<entry key="packageType">content</entry>
</properties>
`;

const entries = [];
const dirs = new Set();
const addDirs = (path) => {
  const parts = path.split('/').slice(0, -1);
  parts.forEach((_, i) => {
    const d = `${parts.slice(0, i + 1).join('/')}/`;
    if (!dirs.has(d)) { dirs.add(d); entries.push({ path: d }); }
  });
};
[['META-INF/vault/filter.xml', filterXml], ['META-INF/vault/properties.xml', propertiesXml], ...files]
  .forEach(([path, data]) => { addDirs(path); entries.push({ path, data }); });

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
entries.filter((e) => e.data).forEach(({ path, data }) => {
  mkdirSync(dirname(resolve(OUT, 'package', path)), { recursive: true });
  writeFileSync(resolve(OUT, 'package', path), data);
});
const zipPath = resolve(OUT, `${PACKAGE}-${VERSION}.zip`);
writeFileSync(zipPath, zip(entries));

if (WRITE_DRAFTS) {
  const dir = resolve(REPO, `.${DRAFTS}`);
  mkdirSync(dir, { recursive: true });
  const index = [{ html: `<h1>${folder.title}</h1>${introText(folder.description, 'rich-text, text')}<ul>${pages.map((p) => `<li><a href="${draft(p.slug)}">${p.title}</a></li>`).join('')}</ul>` }];
  writeFileSync(resolve(dir, 'index.html'), draftDocument(folder.title, index));
  pages.forEach((p) => writeFileSync(resolve(dir, `${p.slug}.html`), draftDocument(p.title, p.drafts)));
}

// eslint-disable-next-line no-console
console.log(`${files.length} pages, ${variationCount} variations: ${zipPath}`);
