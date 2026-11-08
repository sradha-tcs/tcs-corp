// 03-authoring: the authoring package and one guide per authorable component.
import {
  writeDoc, writeFile, table, kb, kbIntro, repoLink, rel, ROOTS, LIVE, code, repoRead,
} from './lib.mjs';
import { readme } from './gen-architecture.mjs';
import { carry, upper, COMMON_ADDITIONAL } from './gen-development.mjs';

const AU = '03-authoring';
const M = `${AU}/markdown`;

export function authoring(ctx) {
  const { inv } = ctx;
  const common = { role: 'Authoring', audience: 'Content authors, content managers, AEM authoring leads', owner: 'Content Lead / AEM Authoring Lead' };
  const ue = (screen) => ctx.placeholder(screen, 'AEM Sites author with Universal Editor (content author)', `AEM Sites console > ${ROOTS.master} > open a page in Universal Editor`, 'No AEM author access in the documentation program (access blocker AB-01)');
  const g = (id, file, title, purpose, body, extra = {}) => writeDoc(`${M}/${file}`, { ...common, id, title, purpose, body, screenshots: extra.screenshots || [ue(title)], ...extra });
  const rootsTable = table(['Tree (AEM Sites)', 'Use it for'], [
    [ROOTS.master, 'The real language master content (the migrated tcs.com pages) and its sheets; validated before it becomes the global site and the regions'],
    [ROOTS.test, 'Testing page functionality with dummy content and content limitations'],
    [ROOTS.design, 'The block library (every block and variation) and the curated design pages'],
    ['/content/tcs-corp/<country>/<language>', 'The 13 locale sites (/en, /de-de, ...)'],
  ]);
  g('AUT-000', 'AUTHORING-GUIDE.md', 'Authoring Guide', 'Step-by-step guide for a new content author: systems, pages, blocks, assets, metadata, publishing and checks',
    `## Where to author\n\n${rootsTable}\n\n${kb('authoring.md', `${M}/AUTHORING-GUIDE.md`)}`, { sources: ['docs/handover/knowledge-base/authoring.md'], aem: Object.values(ROOTS) });
  g('AUT-001', 'GETTING-STARTED.md', 'Getting Started (authors)', 'The systems an author uses, access and the Universal Editor flow',
    `## Access you need\n\n- An Adobe ID in the IMS organisation with the AEM Sites author product profile (Content Authors); the AEM administrator grants it.\n- Universal Editor opens from the AEM Sites console (select a page > Edit).\n\n## Where to author\n\n${rootsTable}\n\n${kb('authoring.md', `${M}/GETTING-STARTED.md`, ['Systems an author uses', 'The Universal Editor flow'])}`, { sources: ['docs/handover/knowledge-base/authoring.md'] });
  g('AUT-002', 'PAGE-CREATION-GUIDE.md', 'Page Creation Guide', 'Creating pages, templates, sections and reordering, duplicating and deleting content', kb('authoring.md', `${M}/PAGE-CREATION-GUIDE.md`, ['Creating and editing pages', 'Adding and configuring blocks', 'Containers and child items']), { sources: ['docs/handover/knowledge-base/authoring.md', 'models/_page.json'] });
  const pageModel = JSON.parse(repoRead('component-models.json')).find((m) => m.id === 'page-metadata');
  g('AUT-003', 'PAGE-PROPERTIES-GUIDE.md', 'Page Properties Guide', 'The page properties and the bulk metadata columns',
    `## Page properties (model page-metadata)\n\n${pageModel ? table(['Label', 'Property', 'Type', 'Description'], pageModel.fields.filter((f) => f.component !== 'tab').map((f) => [f.label || f.name, code(f.name), f.component, f.description || '—'])) : 'See models/_page.json.'}\n\nNavigation, Footer and 404 Page are inherited by child pages from the nearest parent that sets them, up to the root page; else the root's references/nav, references/footer and error-pages/404 are used.\n\n${kb('content-architecture.md', `${M}/PAGE-PROPERTIES-GUIDE.md`, ['Metadata model'])}`, { sources: ['models/_page.json', 'docs/handover/knowledge-base/content-architecture.md'] });
  const comps = [...inv.blocks.filter((b) => b.components.length).map((b) => ({ id: b.name, title: b.meta?.name || b.name, block: b })), ...inv.standalone.map((c) => ({ id: c.id, title: c.title, std: c }))];
  g('AUT-004', 'COMPONENT-AUTHORING-REFERENCE.md', 'Component Authoring Reference', 'Every authorable component with its purpose, fields and authoring guide',
    `## Components (${comps.length})\n\n${table(['Component', 'Purpose', 'Fields (excl. Additional tab)', 'Guide'], comps.map((c) => [c.title, c.block?.meta?.purpose || (c.std ? 'Default content' : '—'), (c.block ? c.block.components.reduce((n, x) => n + x.fields.filter((f) => !COMMON_ADDITIONAL.test(f.name || '')).length, 0) : c.std.fields.length), `[${upper(c.id)}-AUTHORING-GUIDE](../components/${c.id}/${upper(c.id)}-AUTHORING-GUIDE.md)`]))}\n\n${kb('authoring.md', `${M}/COMPONENT-AUTHORING-REFERENCE.md`, ['Adding and configuring blocks'])}`, { sources: ['component-definition.json', 'component-models.json'] });
  g('AUT-005', 'BLOCK-VARIATION-AUTHORING-GUIDE.md', 'Block Variation Authoring Guide', 'Which dialog option gives which variation, per block',
    inv.blocks.filter((b) => b.components.length).map((b) => {
      const rows = b.components.flatMap((c) => c.variations.filter((v) => !COMMON_ADDITIONAL.test(v.field || '')).map((v) => [c.title, v.tab || '—', v.label, v.options.map((o) => o.name).join(', ')]));
      return `## ${b.meta?.name || b.name}\n\n${rows.length ? table(['Component', 'Tab', 'Option', 'Choices'], rows) : 'No variation option.'}`;
    }).join('\n\n'), { sources: ['component-models.json'] });
  g('AUT-006', 'CURATED-DESIGN-PAGE-AUTHORING-GUIDE.md', 'Curated Design Page Authoring Guide', 'Using the curated design pages as references when building pages',
    `## Where they are\n\n\`${ROOTS.design}/curated-design-pages\` (published at /design-block-master/en/curated-design-pages/). Each shows a page design of Figma built from the blocks; copy the composition, not the dummy content.\n\n## Pages\n\n${table(['Page', 'Blocks in order', 'Live'], (ctx.curated || []).map((p) => [p.replace('/design-block-master/en/curated-design-pages/', '') || 'index', (ctx.evidence[p].dom?.blocks || []).map((x) => x.name).join(' → '), `${LIVE}${p}`]))}`, { aem: [`${ROOTS.design}/curated-design-pages`] });
  g('AUT-007', 'ASSET-AUTHORING-GUIDE.md', 'Asset Authoring Guide', 'Adding assets, alt text, and the Dynamic Media decision',
    `## Dynamic Media (KB-D-067)\n\nThe assets are in the Sites author's DAM (\`/content/dam/tcs-corp\`). Dynamic Media with OpenAPI delivers **approved** assets; the migrated pages below \`/language-masters/en\` reference them by delivery URL once rebuilt. Authors will pick assets with the Dynamic Media asset picker after the administrator set-up (pull request #200, not merged yet); until then the image fields keep the standard asset picker.\n\n${kb('authoring.md', `${M}/ASSET-AUTHORING-GUIDE.md`, ['Assets', 'Accessibility responsibilities'])}`, { sources: ['docs/handover/knowledge-base/authoring.md'] });
  g('AUT-008', 'METADATA-GUIDE.md', 'Metadata Guide', 'Page properties, the bulk metadata sheet and its columns',
    `## Bulk metadata columns\n\n${(repoRead('AGENTS.md').match(/Bulk metadata columns:[^\n]+/) || [''])[0]}\n\n${kb('content-architecture.md', `${M}/METADATA-GUIDE.md`, ['Metadata model'])}\n\n${kb('authoring.md', `${M}/METADATA-GUIDE.md`, ['Metadata'])}`, { sources: ['AGENTS.md', 'docs/handover/knowledge-base/content-architecture.md'] });
  g('AUT-009', 'TAXONOMY-AND-TAGGING-GUIDE.md', 'Taxonomy and Tagging Guide', 'Tags, the taxonomy page and how lists use them', `${kb('content-architecture.md', `${M}/TAXONOMY-AND-TAGGING-GUIDE.md`, ['Taxonomy'])}\n\n${kb('authoring.md', `${M}/TAXONOMY-AND-TAGGING-GUIDE.md`, ['Taxonomy'])}`, { sources: ['utils/taxonomy.js'] });
  g('AUT-010', 'LOCALIZATION-GUIDE.md', 'Localization Guide', 'Locale sites, the language master and authoring per locale',
    `## The language master\n\n\`${ROOTS.master}\` holds the content that becomes the global site and the regions once final; MSM or separate regional content is not decided yet.\n\n${kb('content-architecture.md', `${M}/LOCALIZATION-GUIDE.md`, ['Site and locale hierarchy', 'Localization'])}\n\n${kb('authoring.md', `${M}/LOCALIZATION-GUIDE.md`, ['Localization'])}`, { sources: ['utils/site.js'] });
  g('AUT-011', 'PLACEHOLDERS-GUIDE.md', 'Placeholders Guide', 'The placeholders sheet (UI text) per locale and review root', `${kb('content-architecture.md', `${M}/PLACEHOLDERS-GUIDE.md`, ['Placeholders'])}\n\n${kb('authoring.md', `${M}/PLACEHOLDERS-GUIDE.md`, ['Placeholders'])}`, { sources: ['utils/placeholders.js'] });
  g('AUT-012', 'DATASHEETS-GUIDE.md', 'Data Sheets Guide', 'Authors, locations, partners, social links, media contacts and redirects sheets',
    `${kb('content-architecture.md', `${M}/DATASHEETS-GUIDE.md`, ['Data sheets', 'Redirects'])}\n\n## Redirects sheet (8 November 2026)\n\nThe consolidated redirects sheet maps the tcs.com path of each of the 8,432 migrated pages (e.g. \`/careers\`) to its page below \`/language-masters/en\`; per-locale redirects sheets aren't applied by the platform (a CDN rule is needed, on hold).`, { sources: ['utils/data.js'] });
  g('AUT-013', 'PREVIEW-PUBLISH-UNPUBLISH-GUIDE.md', 'Preview, Publish and Unpublish Guide', 'Previewing, publishing, unpublishing and republishing', `${kb('authoring.md', `${M}/PREVIEW-PUBLISH-UNPUBLISH-GUIDE.md`, ['Previewing', 'Publishing', 'Corrective publishing'])}\n\n${kb('administration-and-operations.md', `${M}/PREVIEW-PUBLISH-UNPUBLISH-GUIDE.md`, ['Publishing and the Admin API'])}`, { sources: ['docs/handover/knowledge-base/authoring.md'] });
  g('AUT-014', 'VERSIONING-ROLLBACK-GUIDE.md', 'Versioning and Rollback Guide', 'Page versions and restoring an earlier version',
    `## Versions in AEM Sites\n\n1. AEM Sites console: select the page > Timeline (left rail) > select a version > **Restore to this version** (or **Preview version**).\n2. Publish the page again so Edge Delivery gets the restored content.\n3. A page deleted on author is also removed from Edge Delivery (unpublished): restore it from a version or a content package and publish again.\n\nThese are the standard AEM Sites functions; they were not exercised on this author in the program (Requires manual validation).\n\n${kb('deployment-and-release.md', `${M}/VERSIONING-ROLLBACK-GUIDE.md`, ['Rollback'])}`, { confidence: 'Low' });
  g('AUT-015', 'SEO-AUTHORING-GUIDE.md', 'SEO Authoring Guide', 'Titles, descriptions, social and robots metadata for authors', kb('content-architecture.md', `${M}/SEO-AUTHORING-GUIDE.md`, ['Metadata model']), { sources: ['decorators/seo-decorator.js'] });
  g('AUT-016', 'ACCESSIBILITY-AUTHORING-GUIDE.md', 'Accessibility Authoring Guide', 'What authors must do for accessibility', `${kb('authoring.md', `${M}/ACCESSIBILITY-AUTHORING-GUIDE.md`, ['Accessibility responsibilities'])}\n\n${kb('accessibility.md', `${M}/ACCESSIBILITY-AUTHORING-GUIDE.md`, ['Images, alt text and decorative images', 'Links and buttons', 'Responsibilities'])}`, {});
  g('AUT-017', 'AUTHORING-CHECKLIST.md', 'Authoring Checklist', 'Pre-publish and post-publish checks', kb('authoring.md', `${M}/AUTHORING-CHECKLIST.md`, ['Pre-publish checklist', 'Post-publish validation']), {});
  g('AUT-018', 'COMMON-AUTHORING-ERRORS.md', 'Common Authoring Errors', 'Frequent authoring mistakes and how to recover', `${kb('authoring.md', `${M}/COMMON-AUTHORING-ERRORS.md`, ['Troubleshooting'])}\n\n${kb('universal-editor.md', `${M}/COMMON-AUTHORING-ERRORS.md`, ['Common Errors'])}`, {});
  // per component
  comps.forEach((c) => {
    const dir = `${AU}/components/${c.id}`;
    const docPath = `${dir}/${upper(c.id)}-AUTHORING-GUIDE.md`;
    let body; let shots = [];
    if (c.block) {
      const s = c.block.readmeSections;
      const lib = ctx.libPagesOf(c.id);
      const first = lib.find((p) => p.split('/').length > 5) || lib[0];
      shots = first ? ctx.pageShots(first, `${dir}/screenshots`, docPath, `${c.title} as published (block library)`, ['1440', '375']) : [];
      body = ['For Content Authors', 'Authorable Fields', 'Screenshot-Based Authoring Steps', 'Variations', 'Complete Authoring Example', 'Content and Asset Guidelines', 'Troubleshooting']
        .filter((h) => s[h]).map((h) => `## ${h}\n\n${carry(ctx, c.id, s[h], docPath)}`).join('\n\n');
      body = `## Where to see it\n\n${lib.length ? lib.map((p) => `- ${LIVE}${p}`).join('\n') : 'No block library page.'}\n\n${body}`;
    } else {
      body = `## Fields\n\n${table(['Label', 'Property', 'Type', 'Description'], c.std.fields.map((f) => [f.label || f.name, code(f.name), f.component, f.description || '—']))}\n\n## Notes\n\nThe built-in ${c.title} component (${code(c.std.resourceType)}) delivers only its fixed fields (AGENTS.md, AEM delivery rules).`;
    }
    writeDoc(docPath, {
      ...common, id: `AUT-C-${c.id}`, title: `${c.title} — Authoring Guide`, topic: 'component authoring', components: [c.id],
      purpose: `How to add, fill in and check the ${c.title} component`, sources: c.block ? [`blocks/${c.id}/README.md`, `blocks/${c.id}/_${c.id}.json`] : ['models/'],
      body, screenshots: [...shots, ue(`${c.title} dialog in Universal Editor (every tab, including Additional)`)],
      limitations: ['Universal Editor screenshots are placeholders: no author access in this program.'],
    });
    writeFile(`${dir}/README.md`, `# ${c.title} (authoring)\n\n- [Authoring guide](./${upper(c.id)}-AUTHORING-GUIDE.md) ([PDF](./${upper(c.id)}-AUTHORING-GUIDE.pdf))\n${c.block ? `- [Developer guide](../../../02-development/blocks/${c.id}/${upper(c.id)}-DEVELOPER-GUIDE.md)\n` : ''}`);
  });
  writeFile(`${AU}/README.md`, readme('Authoring', 'Content Lead / AEM Authoring Lead (proposed)', ['pdf/AUTHORING-GUIDE.pdf (the authoring guides) and pdf/COMPONENT-AUTHORING-REFERENCE.pdf (every component guide)', '[markdown/AUTHORING-GUIDE.md](markdown/AUTHORING-GUIDE.md): start here', `[components/](markdown/COMPONENT-AUTHORING-REFERENCE.md): one folder per authorable component (${comps.length})`]));
  ctx.authorComponents = comps;
}
