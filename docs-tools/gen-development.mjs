// 02-development: the developer package, one folder per block, the curated design pages.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  writeDoc, writeFile, table, kb, kbIntro, repoLink, rel, ROOTS, LIVE, PREVIEW, code, slug, normaliseLinks, demote, outPath, repoRead,
} from './lib.mjs';
import { readme } from './gen-architecture.mjs';

const D = '02-development';
const M = `${D}/markdown`;
const RAW_SHOTS = 'https://raw.githubusercontent.com/sradha-tcs/tcs-corp/migrated-page-content-edam/docs/handover/screenshots/';
export const BLOCK_DOC_DIR = (b) => `${D}/blocks/${b}`;
export const upper = (b) => b.toUpperCase();
export const COMMON_ADDITIONAL = /^classes_(anchor|hideblock|padding|margin|animation|animationspeed|animationtrigger|bganimation)/;

/** carried README content: links normalised, handover screenshots copied into the block's folder */
export function carry(ctx, block, sectionMd, docPath) {
  let md = normaliseLinks(demote(sectionMd), `blocks/${block}/README.md`, docPath)
    .replace(/\]\(#([^)\s]+)\)/g, `](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/${block}/README.md#$1)`);
  md = md.replace(/!\[([^\]]*)\]\(https:\/\/raw\.githubusercontent\.com\/sradha-tcs\/tcs-corp\/migrated-page-content-edam\/docs\/handover\/screenshots\/([^)\s]+)\)/g, (all, alt, file) => {
    const src = join(ctx.shotsDir || '', file);
    const dst = `${BLOCK_DOC_DIR(block)}/screenshots/handover/${file}`;
    if (ctx.shotsDir && existsSync(src) && !existsSync(outPath(dst))) { mkdirSync(outPath(`${BLOCK_DOC_DIR(block)}/screenshots/handover`), { recursive: true }); copyFileSync(src, outPath(dst)); }
    if (!ctx.register.some((r) => r.file === dst)) {
      ctx.register.push({ file: dst, page: 'handover preview with sample content', url: '', environment: 'preview at the time of the handover revision that added it', viewport: 'as captured', date: 'before 24 October 2026', subject: block, alt, kind: 'Handover screenshot (historical, carried)' });
    }
    return `![${alt}](${rel(docPath, dst)})`;
  });
  return md;
}

const fieldRows = (c) => c.fields.filter((f) => !COMMON_ADDITIONAL.test(f.name || '')).map((f) => [
  f.tab || '—', f.label || '—', f.name ? code(f.name) : '—', f.component, f.required ? 'Yes' : 'No',
  f.value === undefined ? '—' : code(f.value === '' ? '""' : (Array.isArray(f.value) ? f.value.join(', ') : f.value)), f.options.length ? `${f.options.length} options` : '—',
  f.condition ? 'Conditional' : '—',
]);

export function development(ctx) {
  const { inv, evidence } = ctx;
  const common = { role: 'Development', audience: 'Developers, technical leads, block owners, AI coding agents', owner: 'Technical Lead / Block Owner' };
  const g = (id, file, title, purpose, body, extra = {}) => writeDoc(`${M}/${file}`, { ...common, id, title, purpose, body, ...extra });
  // --- general guides
  g('DEV-000', 'DEVELOPER-GUIDE.md', 'Developer Guide', 'Entry point for developers: setup, workflow, standards, loading sequence, shared code, validation and where each topic is detailed',
    `## Prerequisites\n\n- Node.js and npm (the versions of ${repoLink('package.json')}); Git; access to the GitHub repository sradha-tcs/tcs-corp.\n- Universal Editor access to the AEM Sites author for authoring checks (not required for code changes).\n\n## Workflow in short\n\n1. Read the knowledge base README and the topic pages for the area (${repoLink('docs/handover/knowledge-base/README.md', 'knowledge base')}), then AGENTS.md.\n2. Branch from \`main\` (\`feature/\`, \`fix/\`, \`docs/\`).\n3. Change code, models (\`npm run build:json\`), imports (\`npm run build:modules\`), block docs (\`npm run build:docs\`).\n4. Run \`npm run lint\` and \`npm test\`; report the real results.\n5. Open a PR into \`main\` with a feature preview URL; checks green; a human merges.\n6. **Update this documentation set** (docs/handover on migrated-page-content-edam) in the same change (see the documentation governance).\n\n## Commands (results of ${ctx.commands.date})\n\n${table(['Command', 'Purpose', 'Result in this program'], ctx.commands.list.map((c) => [code(c.cmd), c.purpose, c.result]))}\n\n## Main loading sequence\n\n${kb('architecture.md', `${M}/DEVELOPER-GUIDE.md`, ['Runtime architecture'])}\n\n## Guides\n\n${[
      ['Local development set-up', 'LOCAL-DEVELOPMENT-SETUP.md'], ['Repository structure', 'REPOSITORY-STRUCTURE.md'], ['Coding standards', 'CODING-STANDARDS.md'],
      ['Design style guide', 'DESIGN-STYLE-GUIDE.md'], ['Block development', 'BLOCK-DEVELOPMENT-GUIDE.md'], ['Curated design page development', 'CURATED-DESIGN-PAGE-DEVELOPMENT-GUIDE.md'],
      ['Content modeling', 'CONTENT-MODELING-GUIDE.md'], ['Universal Editor models', 'UNIVERSAL-EDITOR-MODEL-GUIDE.md'], ['Decorators and utilities', 'DECORATORS-AND-UTILITIES-GUIDE.md'],
      ['Analytics data layer', 'ANALYTICS-DATA-LAYER-GUIDE.md'], ['Accessibility', 'ACCESSIBILITY-DEVELOPMENT-GUIDE.md'], ['Performance', 'PERFORMANCE-DEVELOPMENT-GUIDE.md'],
      ['SEO', 'SEO-DEVELOPMENT-GUIDE.md'], ['Unit testing', 'UNIT-TESTING-GUIDE.md'], ['Debugging and troubleshooting', 'DEBUGGING-TROUBLESHOOTING-GUIDE.md'],
      ['Pull request review checklist', 'PULL-REQUEST-REVIEW-CHECKLIST.md'], ['Release and deployment', 'RELEASE-AND-DEPLOYMENT-GUIDE.md'],
    ].map(([l, f]) => `- [${l}](./${f})`).join('\n')}\n- [Block inventory](../blocks/BLOCK-INVENTORY.md), [variation matrix](../blocks/BLOCK-VARIATION-MATRIX.md), [dependency matrix](../blocks/BLOCK-DEPENDENCY-MATRIX.md), [known limitations](../blocks/BLOCK-KNOWN-LIMITATIONS.md)\n- [Curated page inventory](../curated-design-pages/CURATED-PAGE-INVENTORY.md)`,
    { sources: ['AGENTS.md', 'package.json', 'scripts/scripts.js'], confidence: 'High' });
  g('DEV-001', 'LOCAL-DEVELOPMENT-SETUP.md', 'Local Development Setup', 'Setting up and running the site locally',
    `## Install and run\n\n1. \`git clone\` the repository and \`npm install\`.\n2. Start the dev server: \`npx -y @adobe/aem-cli up --no-open --forward-browser-logs\` (or \`aem up\` after \`npm install -g @adobe/aem-cli\`); it serves http://localhost:3000 with the local code and the previewed content.\n3. Content without an authored page: static HTML in a \`drafts/\` folder and \`--html-folder drafts\`.\n4. Inspect delivered markup: \`curl http://localhost:3000/<path>\`, \`.md\` and \`.plain.html\`.\n\n## Generated files\n\n${table(['Command', 'Regenerates', 'When'], [
      ['npm run build:json', 'component-models.json, component-definition.json, component-filters.json', 'after any _<block>.json or models/ change'],
      ['npm run build:modules', 'head.html modulepreload links, scripts/module-graph.js', 'after adding, removing or changing an import'],
      ['npm run build:docs', 'generated sections of blocks/README.md and block READMEs', 'after a model change or a new block'],
      ['npm run build:paths', 'paths.json', 'after a LOCALES or REVIEW_ROOTS change'],
    ])}\n\n${kb('deployment-and-release.md', `${M}/LOCAL-DEVELOPMENT-SETUP.md`, ['Local development', 'Branches and feature previews'])}`,
    { sources: ['AGENTS.md', 'package.json'] });
  g('DEV-002', 'REPOSITORY-STRUCTURE.md', 'Repository Structure', 'The tracked tree, generated files and what is served', kb('repository-structure.md', `${M}/REPOSITORY-STRUCTURE.md`), { sources: ['docs/handover/knowledge-base/repository-structure.md'] });
  g('DEV-003', 'CODING-STANDARDS.md', 'Coding Standards', 'JavaScript, CSS, HTML, model, shared-code, error handling, logging, responsive, accessibility, performance and review standards', kb('development-standards.md', `${M}/CODING-STANDARDS.md`), { sources: ['docs/handover/knowledge-base/development-standards.md', '.eslintrc.js', '.stylelintrc.json'] });
  // design style guide: the knowledge base page plus the tokens read from the CSS (file, line, selector)
  const tokRows = inv.tokens.map((t) => [code(t.name), code(t.value), `${t.file}:${t.line}`, t.selector + (t.media ? ` (${t.media})` : '')]);
  g('DEV-004', 'DESIGN-STYLE-GUIDE.md', 'Design Style Guide', 'Typography, colours, spacing, layout, breakpoints, motion and states, with every token cited from the source CSS',
    `${kbIntro('design-system.md')}\n\n${kb('design-system.md', `${M}/DESIGN-STYLE-GUIDE.md`)}\n\n## Token inventory (read from the CSS)\n\n${inv.tokens.length} custom properties, each with its file, line and selector.\n\n${table(['Token', 'Value', 'Source', 'Selector'], tokRows)}\n\n## Media queries in use\n\n${table(['Media query', 'Occurrences'], Object.entries(inv.breakpoints).sort((a, b) => b[1] - a[1]).map(([k, v]) => [code(k), v]))}`,
    { sources: ['styles/styles.css', 'styles/lazy-styles.css', 'styles/fonts.css', 'styles/motion.css', 'styles/card-list.css', 'docs/handover/knowledge-base/design-system.md'], owner: 'UX/UI Lead plus Technical Lead', confidence: 'High' });
  g('DEV-005', 'BLOCK-DEVELOPMENT-GUIDE.md', 'Block Development Guide', 'Block types, inventory, relationships, variation strategy, dialog standards, reuse, governance and the change checklist',
    `${kb('blocks.md', `${M}/BLOCK-DEVELOPMENT-GUIDE.md`)}\n\n## Per-block developer documentation\n\n${inv.blocks.map((b) => `- [${b.meta?.name || b.name}](../blocks/${b.name}/${upper(b.name)}-DEVELOPER-GUIDE.md)`).join('\n')}`, { sources: ['docs/handover/knowledge-base/blocks.md', 'tools/docs/blocks.json'] });
  g('DEV-006', 'CONTENT-MODELING-GUIDE.md', 'Content Modeling Guide', 'How blocks are modelled for authors and what AEM really delivers',
    `## AEM delivery rules\n\nThe rules below are verified on aem.page (block audit of 19 October 2026) and in AGENTS.md; code and the local preview must assume what AEM really delivers.\n\n${(repoRead('AGENTS.md').match(/\*\*AEM delivery rules[\s\S]*?(?=\n\n\*\*Item children)/) || [''])[0]}\n\n${kb('blocks.md', `${M}/CONTENT-MODELING-GUIDE.md`, ['Variation strategy', 'Dialog standards', 'Container and child relationships'].filter(Boolean))}\n\n${kb('universal-editor.md', `${M}/CONTENT-MODELING-GUIDE.md`, ['Field and Property Naming', 'Defaults and the Template-Value Rule', 'Multifields and Item Children', 'Container-Child Models'])}`,
    { sources: ['AGENTS.md', 'docs/handover/knowledge-base/universal-editor.md', 'docs/handover/knowledge-base/blocks.md'] });
  g('DEV-007', 'UNIVERSAL-EDITOR-MODEL-GUIDE.md', 'Universal Editor Model Guide', 'Definitions, filters, field types, tabs, naming, the Additional tab, defaults, conditions, validation and the procedure for model changes', kb('universal-editor.md', `${M}/UNIVERSAL-EDITOR-MODEL-GUIDE.md`), { sources: ['docs/handover/knowledge-base/universal-editor.md', 'models/', 'component-models.json'] });
  g('DEV-008', 'DECORATORS-AND-UTILITIES-GUIDE.md', 'Decorators and Utilities Guide', 'The shared decorators and utilities, their layering and rules',
    `${kb('decorators-and-utilities.md', `${M}/DECORATORS-AND-UTILITIES-GUIDE.md`)}\n\n## Module inventory (from the READMEs)\n\n### Decorators\n\n${table(['Module', 'Purpose', 'Used by'], ctx.inv.decorators.map((d) => [code(d.module), d.purpose, d.users]))}\n\n### Utilities\n\n${table(['Module', 'Purpose', 'Used by'], ctx.inv.utils.map((d) => [code(d.module), d.purpose, d.users]))}`, { sources: ['decorators/README.md', 'utils/README.md'] });
  g('DEV-009', 'ANALYTICS-DATA-LAYER-GUIDE.md', 'Analytics Data Layer Guide', 'The Adobe Client Data Layer implementation and the rules for developers', kb('data-layer-and-analytics.md', `${M}/ANALYTICS-DATA-LAYER-GUIDE.md`), { sources: ['decorators/data-layer-decorator.js', 'utils/analytics.js', 'docs/handover/knowledge-base/data-layer-and-analytics.md'] });
  g('DEV-010', 'ACCESSIBILITY-DEVELOPMENT-GUIDE.md', 'Accessibility Development Guide', 'WCAG 2.1 AA implementation rules and evidence', kb('accessibility.md', `${M}/ACCESSIBILITY-DEVELOPMENT-GUIDE.md`), { sources: ['docs/handover/knowledge-base/accessibility.md', 'decorators/a11y-decorator.js'] });
  g('DEV-011', 'PERFORMANCE-DEVELOPMENT-GUIDE.md', 'Performance Development Guide', 'Performance rules for code changes', kb('performance.md', `${M}/PERFORMANCE-DEVELOPMENT-GUIDE.md`, ['JavaScript loading', 'CSS loading', 'Images', 'Fonts', 'Layout shift prevention', 'DOM size, listeners and observers', 'Query and data requests', 'Budgets', 'Required performance validation']), { sources: ['docs/handover/knowledge-base/performance.md'] });
  g('DEV-012', 'SEO-DEVELOPMENT-GUIDE.md', 'SEO Development Guide', 'Metadata, SEO decorator, sitemap and indexing rules',
    `${kb('content-architecture.md', `${M}/SEO-DEVELOPMENT-GUIDE.md`, ['Metadata model'])}\n\n${kb('indexing-and-search.md', `${M}/SEO-DEVELOPMENT-GUIDE.md`, ['Sitemap', 'Query index definition'])}\n\n## SEO decorator\n\n${table(['Module', 'Purpose'], ctx.inv.decorators.filter((d) => /seo/.test(d.module)).map((d) => [code(d.module), d.purpose]))}`, { sources: ['decorators/seo-decorator.js', 'helix-query.yaml', 'helix-sitemap.yaml'] });
  const testRows = inv.tests.map((t) => [code(t.file), t.describes.join('; ') || '—', t.its.length]);
  g('DEV-013', 'UNIT-TESTING-GUIDE.md', 'Unit Testing Guide', 'The unit tests, how to run them and how to add tests',
    `${kb('testing-and-quality.md', `${M}/UNIT-TESTING-GUIDE.md`, ['Unit Tests', 'Lint'])}\n\n## Test inventory (${inv.counts.testFiles} files, ${inv.counts.testCases} test cases)\n\n${table(['File', 'Suites', 'Tests'], testRows)}\n\n## Result in this program\n\n${ctx.commands.list.filter((c) => /test|lint/.test(c.cmd)).map((c) => `- ${code(c.cmd)}: ${c.result}`).join('\n')}`, { sources: ['test/', 'package.json'], confidence: 'High' });
  g('DEV-014', 'DEBUGGING-TROUBLESHOOTING-GUIDE.md', 'Debugging and Troubleshooting Guide', 'Debugging blocks, delivery, data layer and indexing',
    `${kb('troubleshooting.md', `${M}/DEBUGGING-TROUBLESHOOTING-GUIDE.md`)}\n\n${kb('data-layer-and-analytics.md', `${M}/DEBUGGING-TROUBLESHOOTING-GUIDE.md`, ['Debugging and validation'])}`, { sources: ['docs/handover/knowledge-base/troubleshooting.md'] });
  g('DEV-015', 'PULL-REQUEST-REVIEW-CHECKLIST.md', 'Pull Request Review Checklist', 'What every pull request must contain and what reviewers check',
    `## Checklist\n\n- [ ] Branch from \`main\`; PR into \`main\` with a feature preview URL (\`https://<branch>--tcs-corp--sradha-tcs.aem.page/<path>\`).\n- [ ] \`npm run lint\` and \`npm test\` run; real results in the PR description.\n- [ ] Generated files current: \`build:json\`, \`build:modules\`, \`build:docs\`, \`build:paths\` as applicable.\n- [ ] Models follow the AEM delivery rules (tabs, Additional tab, item children, naming).\n- [ ] Accessibility (WCAG 2.1 AA), performance (three-phase loading, no new runtime dependency), privacy (no personal data in the data layer).\n- [ ] UI text from placeholders with an English fallback.\n- [ ] Block README, decorators/utils READMEs, AGENTS.md, knowledge base and decision log updated.\n- [ ] **docs/handover on migrated-page-content-edam updated** for the change (role documents, test cases, screenshots) or the PR says which follow-up does it.\n- [ ] \`gh pr checks\` green; a human merges.\n\n${kb('development-standards.md', `${M}/PULL-REQUEST-REVIEW-CHECKLIST.md`, ['Code Review', 'Definition of Done'])}`, { sources: ['AGENTS.md', 'docs/handover/knowledge-base/development-standards.md'] });
  g('DEV-016', 'RELEASE-AND-DEPLOYMENT-GUIDE.md', 'Release and Deployment Guide (developers)', 'How code reaches preview and live, and how it is rolled back', kb('deployment-and-release.md', `${M}/RELEASE-AND-DEPLOYMENT-GUIDE.md`, ['Delivery streams', 'Branches and feature previews', 'Pull requests', 'Automated checks', 'Environment promotion', 'Rollback']), { sources: ['docs/handover/knowledge-base/deployment-and-release.md', '.github/workflows/main.yaml'] });

  // --- blocks
  const refPages = Object.keys(evidence).sort();
  const libPagesOf = (b) => refPages.filter((p) => p === `/design-block-master/en/block-library/${b}` || p.startsWith(`/design-block-master/en/block-library/${b}/`));
  const pagesUsing = (b) => refPages.filter((p) => p.includes('/curated-design-pages') && (evidence[p].dom?.blocks || []).some((x) => x.name === b));
  const classesOnLibrary = (b) => new Set(refPages.flatMap((p) => (evidence[p].dom?.blocks || []).filter((x) => x.name === b).flatMap((x) => x.classes.split(/\s+/))));
  const invRows = []; const varRows = []; const depRows = []; const limitRows = [];
  inv.blocks.forEach((b) => {
    const meta = b.meta || {};
    const dir = BLOCK_DOC_DIR(b.name);
    const s = b.readmeSections;
    const dev = `${dir}/${upper(b.name)}-DEVELOPER-GUIDE.md`;
    const lib = libPagesOf(b.name);
    const used = pagesUsing(b.name);
    const firstLib = lib.find((p) => p.split('/').length > 5) || lib[0];
    const shots = firstLib ? ctx.pageShots(firstLib, `${dir}/screenshots`, dev, `${meta.name || b.name} block library page`, ['1440', '375']) : [];
    const testsFor = inv.tests.filter((t) => t.file.includes(`/${b.name}/`) || t.file.includes(b.name));
    const comps = b.components;
    const dependency = b.imports.filter((i) => !i.startsWith('./'));
    invRows.push([`[${meta.name || b.name}](./${b.name}/${upper(b.name)}-DEVELOPER-GUIDE.md)`, code(b.name), meta.type || '—', meta.category || '—', meta.status || '—', comps.map((c) => c.id).join(', ') || 'none (code only)', lib.length, used.length, testsFor.length]);
    depRows.push([code(b.name), dependency.map((i) => i.replace(/^\.\.\/\.\.\//, '')).join(', ') || '—']);
    if (s['Known Limitations']) limitRows.push([meta.name || b.name, s['Known Limitations'].split('\n').filter((l) => /^[-*] /.test(l)).length || 'see guide']);
    const libSet = classesOnLibrary(b.name);
    const variations = comps.flatMap((c) => c.variations.filter((v) => !COMMON_ADDITIONAL.test(v.field || '')).map((v) => ({ c, v })));
    variations.forEach(({ c, v }) => v.options.forEach((o) => {
      const cls = String(o.value || '');
      const represented = !cls ? 'n/a (default)' : (/^classes/.test(v.field) ? (cls.split(/\s+/).every((x) => libSet.has(x)) ? 'Yes' : 'No') : 'Not checkable (data attribute / field value)');
      varRows.push([b.name, c.id, v.label, o.name, code(cls || '""'), 'Supported (in the model)', represented]);
    }));
    const topics = [
      ['Purpose', 'Overview'], ['Source files', 'generated: Files'], ['Model, definition, filters, children', 'generated: Components'], ['Dependencies', 'generated: Dependencies'],
      ['Authored input / rendered output / DOM transformation', 'For Developers'], ['Configuration fields, defaults, required fields', 'generated: Fields'], ['Variations', `${upper(b.name)}-VARIATIONS.md`],
      ['Responsive behaviour', 'Responsive Behavior'], ['Accessibility and keyboard', 'Accessibility'], ['Analytics / data layer', 'Data Layer and Analytics'], ['Performance', 'Performance Considerations'],
      ['Security', 'Security and Privacy'], ['Extending', 'Extending the Block'], ['Known limitations', 'Known Limitations'], ['Troubleshooting', 'Troubleshooting'], ['Tests', `${upper(b.name)}-TEST-COVERAGE.md`],
      ['SEO behaviour', s['For Developers']?.match(/SEO/i) ? 'For Developers' : 'Not recorded'], ['Caching considerations', 'Not recorded (Edge Delivery default caching; no block-specific rule)'], ['Ownership', 'Technical Lead / Block Owner (proposed)'],
    ];
    writeDoc(dev, {
      ...common, id: `DEV-B-${b.name}`, title: `${meta.name || b.name} Block — Developer Guide`, topic: 'block', components: [...new Set([b.name, ...comps.map((c) => c.id)])], pages: [...lib, ...used],
      purpose: `How the ${meta.name || b.name} block is built: files, model, structure, behaviour, variations, tests and limitations`,
      scope: `blocks/${b.name}/ and its components ${comps.map((c) => c.id).join(', ') || '(none)'}`,
      sources: b.files.map((f) => `blocks/${b.name}/${f}`), aem: lib.slice(0, 3).map((p) => p.replace('/design-block-master/en', ROOTS.design)),
      related: [['Variations', `${dir}/${upper(b.name)}-VARIATIONS.md`], ['Test coverage', `${dir}/${upper(b.name)}-TEST-COVERAGE.md`], ...(comps.length ? [['Authoring guide', `03-authoring/components/${b.name}/${upper(b.name)}-AUTHORING-GUIDE.md`]] : [])],
      body: [
        `## Summary\n\n${table(['Attribute', 'Value'], [['Block', meta.name || b.name], ['Folder', code(`blocks/${b.name}`)], ['Type', meta.type || '—'], ['Category', meta.category || '—'], ['Status', meta.status || '—'], ['Purpose', meta.purpose || '—'], ['Variations (summary)', meta.variations || '—'], ['Children', (meta.children || []).join(', ') || '—'], ['Code size', `${b.lines} lines of JS and CSS`]])}`,
        `## Overview\n\n${carry(ctx, b.name, s.Overview || '', dev)}`,
        `## Source files\n\n${table(['File', 'Link'], b.files.map((f) => [code(f), repoLink(`blocks/${b.name}/${f}`, 'GitHub')]))}`,
        `## Components, models and filters\n\n${comps.length ? table(['Component', 'Title', 'Resource type', 'Template name', 'Model', 'Children allowed'], comps.map((c) => [code(c.id), c.title, code(c.resourceType), c.templateName || '—', c.model ? code(c.model) : '—', c.children.join(', ') || '—'])) : 'No Universal Editor component (code-only block).'}`,
        `## Fields\n\nThe Additional tab fields (anchor, hide, padding, margin, animation) are common to the blocks and described in the [content modeling guide](${rel(dev, `${M}/CONTENT-MODELING-GUIDE.md`)}).\n\n${comps.map((c) => `### ${c.title} (${code(c.id)})\n\n${c.fields.length ? table(['Tab', 'Label', 'Property', 'Type', 'Required in model', 'Default', 'Options', 'Visibility'], fieldRows(c)) : 'No fields.'}`).join('\n\n')}\n\n"Required in model" is the model's \`required\` flag; whether a field is required in practice is stated in the authoring guide where it is known.`,
        `## Dependencies\n\n${table(['Import'], b.imports.map((i) => [code(i)]))}`,
        ...['For Developers', 'Extending the Block', 'Responsive Behavior', 'Accessibility', 'Data Layer and Analytics', 'Performance Considerations', 'Security and Privacy', 'For Architects', 'Troubleshooting', 'Known Limitations', 'Change History']
          .filter((h) => s[h]).map((h) => `## ${({ 'Known Limitations': 'Known limitations of the block', 'Change History': 'Change history of the block' })[h] || h}\n\n${carry(ctx, b.name, s[h], dev)}`),
        `## Reference pages\n\n${table(['Kind', 'Page', 'Live URL'], [...lib.map((p) => ['Block library', p, `${LIVE}${p}`]), ...used.map((p) => ['Curated design page', p, `${LIVE}${p}`])])}`,
        `## Coverage of the required topics\n\n${table(['Topic', 'Where'], topics)}`,
      ].join('\n\n'),
      screenshots: [...(shots.length ? shots : [ctx.placeholder(`${meta.name || b.name} on its block library page`, 'none (published page)', `Open ${LIVE}/design-block-master/en/block-library/${b.name}`, 'No block library page of this block was found under /design-block-master/en/block-library')]), ...ctx.handoverShotsFor(b.name, `${dir}/screenshots/handover`, dev)],
      limitations: ['Universal Editor dialogs were not captured: no author access in this program (see the access blockers).'],
      validated: `${new Date().toISOString().slice(0, 10)} (model, files, imports from the code; reference pages from the live site)`,
    });
    // variations document
    const vdoc = `${dir}/${upper(b.name)}-VARIATIONS.md`;
    writeDoc(vdoc, {
      ...common, id: `DEV-V-${b.name}`, title: `${meta.name || b.name} Block — Variations`, topic: 'variations', components: [b.name], primary: false,
      purpose: `Every option of the ${meta.name || b.name} block's dialog that changes its presentation, and whether the block library shows it`,
      sources: b.files.filter((f) => f.endsWith('.json')).map((f) => `blocks/${b.name}/${f}`), pages: lib,
      body: `## Variation fields\n\n${variations.length ? table(['Component', 'Field', 'Tab', 'Multiple', 'Options (label = value)', 'Default'], variations.map(({ c, v }) => [code(c.id), `${v.label} (${code(v.field)})`, v.tab || '—', v.multi ? 'Yes' : 'No', v.options.map((o) => `${o.name} = ${code(o.value === '' ? '""' : o.value)}`).join('; '), v.default === undefined ? '—' : code(v.default)])) : 'No variation field.'}\n\n## Matrix\n\nStatus: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the ${meta.name || b.name} blocks on the published block library pages (${lib.length} pages); options stored as data or field values can't be checked from the classes.\n\n${table(['Component', 'Field', 'Option', 'Value', 'Status', 'In the block library'], varRows.filter((r) => r[0] === b.name).map((r) => r.slice(1)))}\n\n## Narrative (block README)\n\n${carry(ctx, b.name, s.Variations || '', vdoc)}`,
      limitations: ['Combination rules (which options cannot be combined) are described in the README narrative only where they exist; unsupported combinations are not enumerated.'],
    });
    // test coverage
    const tdoc = `${dir}/${upper(b.name)}-TEST-COVERAGE.md`;
    const evRows = lib.map((p) => {
      const e = evidence[p]; const w = e?.widths || {};
      return [p, ['375', '768', '1024', '1440'].map((x) => (w[x]?.status === 200 ? (w[x].overflow ? 'overflow' : 'ok') : (w[x]?.status || 'n/a'))).join(' / '), e?.console?.length || 0, e?.failed?.length || 0, e?.dom ? `${e.dom.imgNoAlt} img no alt, ${e.dom.buttonsNoName} unnamed buttons, ${e.dom.headingSkips} heading skips` : '—'];
    });
    writeDoc(tdoc, {
      ...common, id: `DEV-T-${b.name}`, title: `${meta.name || b.name} Block — Test Coverage`, topic: 'tests', components: [b.name], primary: false,
      purpose: 'Unit tests, automated reference-page checks and manual test guidance for the block', sources: testsFor.map((t) => t.file), pages: lib,
      screenshots: lib.flatMap((p) => ctx.pageShots(p, `${dir}/screenshots`, tdoc, `${meta.name || b.name}: ${p.split('/').slice(4).join('/') || 'block library'}`)),
      screenshotNote: 'No block library page: no evidence screenshot.',
      body: `## Unit tests\n\n${testsFor.length ? table(['File', 'Suites', 'Tests'], testsFor.map((t) => [code(t.file), t.describes.join('; '), t.its.length])) : 'No unit test is specific to this block (shared tests: test/models, test/items, test/docs, test/motion).'}\n\n## Automated checks of the block library pages (executed ${ctx.commands.date})\n\nPer page: HTTP status and horizontal overflow at 375 / 768 / 1024 / 1440 px, console errors, failed requests and DOM accessibility checks at 1440 px (evidence: [screenshot register](${rel(tdoc, 'SCREENSHOT-REGISTER.md')})).\n\n${evRows.length ? table(['Page', '375 / 768 / 1024 / 1440', 'Console errors', 'Failed requests', 'Accessibility (DOM)'], evRows) : 'No block library page.'}\n\n## Manual test guidance (block README)\n\n${carry(ctx, b.name, s['For QA and Support Teams'] || '', tdoc)}\n\nTest cases: [05-quality-assurance/test-cases/blocks/${b.name}](${rel(tdoc, `05-quality-assurance/test-cases/blocks/${b.name}/${upper(b.name)}-TEST-CASES.md`)}).`,
    });
    writeFile(`${dir}/README.md`, `# ${meta.name || b.name} block\n\n- [Developer guide](./${upper(b.name)}-DEVELOPER-GUIDE.md) ([PDF](./${upper(b.name)}-DEVELOPER-GUIDE.pdf))\n- [Variations](./${upper(b.name)}-VARIATIONS.md)\n- [Test coverage](./${upper(b.name)}-TEST-COVERAGE.md)\n${comps.length ? `- [Authoring guide](../../../03-authoring/components/${b.name}/${upper(b.name)}-AUTHORING-GUIDE.md)\n` : '- No authoring guide: the block has no Universal Editor component (code only)\n'}- Code: ${GH_TREE(`blocks/${b.name}`)}\n`);
  });
  writeDoc(`${D}/blocks/BLOCK-INVENTORY.md`, { ...common, id: 'DEV-B-INV', title: 'Block Inventory', topic: 'inventory', primary: false, purpose: 'Every block folder with its type, status, components, block library pages, curated page usage and tests', sources: ['blocks/', 'tools/docs/blocks.json', 'component-definition.json'],
    body: `## Blocks (${inv.blocks.length})\n\n${table(['Block', 'Folder', 'Type', 'Category', 'Status', 'Components', 'Library pages', 'Curated pages using it', 'Unit test files'], invRows)}\n\n## Default-content components\n\n${table(['Component', 'Title', 'Resource type', 'Model'], inv.standalone.map((c) => [code(c.id), c.title, code(c.resourceType), c.model ? code(c.model) : '—']))}` });
  writeDoc(`${D}/blocks/BLOCK-VARIATION-MATRIX.md`, { ...common, id: 'DEV-B-VAR', title: 'Block Variation Matrix', topic: 'variations', primary: false, purpose: 'Every presentation option of every block, supported by the model, and whether the block library shows it', sources: ['component-models.json'],
    body: `## Summary\n\n${table(['Measure', 'Value'], [['Options (excluding the common Additional tab)', varRows.length], ['Class options shown in the block library', varRows.filter((r) => r[6] === 'Yes').length], ['Class options not shown in the block library', varRows.filter((r) => r[6] === 'No').length], ['Options not checkable from classes', varRows.filter((r) => /Not checkable/.test(r[6])).length]])}\n\nCategories of the master prompt: every option listed is **Supported** (in the model and read by the code). Duplicate, deprecated, legacy and invalid options: none identified from the models (legacy *properties* are listed in the Universal Editor model guide). "Represented in the block library but not supported by code": not determinable from classes alone (Not recorded).\n\n## Matrix\n\n${table(['Block', 'Component', 'Field', 'Option', 'Value', 'Status', 'In the block library'], varRows)}` });
  writeDoc(`${D}/blocks/BLOCK-DEPENDENCY-MATRIX.md`, { ...common, id: 'DEV-B-DEP', title: 'Block Dependency Matrix', topic: 'dependencies', primary: false, purpose: 'The shared modules each block imports', sources: ['blocks/*/*.js'], body: `## Imports per block\n\n${table(['Block', 'Imports (decorators, utils, scripts)'], depRows)}` });
  writeDoc(`${D}/blocks/BLOCK-KNOWN-LIMITATIONS.md`, { ...common, id: 'DEV-B-LIM', title: 'Block Known Limitations', topic: 'limitations', primary: false, purpose: 'The known limitations of every block (from the block READMEs)', sources: ['blocks/*/README.md'],
    body: inv.blocks.map((b) => `## ${b.meta?.name || b.name}\n\n${carry(ctx, b.name, b.readmeSections['Known Limitations'] || 'None recorded.', `${D}/blocks/BLOCK-KNOWN-LIMITATIONS.md`)}`).join('\n\n') });

  // --- curated design pages
  const curated = refPages.filter((p) => p.includes('/curated-design-pages/'));
  const compRows = curated.map((p) => [p.replace('/design-block-master/en/curated-design-pages/', ''), (evidence[p].dom?.blocks || []).map((x) => x.name).join(' → ') || '—', (evidence[p].dom?.blocks || []).length]);
  const signature = (p) => (evidence[p].dom?.blocks || []).map((x) => x.name).join(',');
  const groups = {}; curated.forEach((p) => { (groups[signature(p)] ||= []).push(p); });
  writeDoc(`${D}/curated-design-pages/CURATED-PAGE-INVENTORY.md`, { ...common, id: 'DEV-C-INV', title: 'Curated Design Page Inventory', topic: 'curated pages', primary: false, purpose: 'Every curated design page of /design-block-master/en with its blocks', sources: ['published pages'], aem: [`${ROOTS.design}/curated-design-pages`],
    body: `## Pages (${curated.length})\n\n${table(['Page', 'Live URL', 'Title', 'Blocks', 'Console errors', 'Failed requests'], curated.map((p) => [p.replace('/design-block-master/en/curated-design-pages/', '') || '(index)', `${LIVE}${p}`, evidence[p].dom?.title || '—', (evidence[p].dom?.blocks || []).length, evidence[p].console.length, evidence[p].failed.length]))}` });
  writeDoc(`${D}/curated-design-pages/CURATED-PAGE-COMPOSITION-MATRIX.md`, { ...common, id: 'DEV-C-COMP', title: 'Curated Design Page Composition Matrix', topic: 'curated pages', primary: false, purpose: 'The blocks of each curated page in order, and pages sharing the same composition', sources: ['published pages'],
    body: `## Composition\n\n${table(['Page', 'Blocks in order', 'Count'], compRows)}\n\n## Identical compositions (candidates for one reusable pattern)\n\n${Object.entries(groups).filter(([, v]) => v.length > 1).map(([k, v]) => `- ${v.map((p) => code(p.replace('/design-block-master/en/curated-design-pages/', ''))).join(', ')}: ${k || '(no block)'}`).join('\n') || 'None: every curated page has its own composition.'}` });
  curated.forEach((p) => {
    const name = p.replace('/design-block-master/en/curated-design-pages/', '') || 'index';
    const dir = `${D}/curated-design-pages/${slug(name)}`;
    const docPath = `${dir}/${upper(slug(name))}-DEVELOPER-GUIDE.md`;
    const e = evidence[p];
    const blocks = e.dom?.blocks || [];
    const shots = ctx.pageShots(p, `${dir}/screenshots`, docPath, `Curated design page ${name}`);
    const twins = (groups[signature(p)] || []).filter((x) => x !== p);
    writeDoc(docPath, {
      ...common, id: `DEV-C-${slug(name)}`, title: `Curated Design Page "${name}" — Developer Guide`, topic: 'curated page', pages: [p], components: [...new Set(blocks.map((x) => x.name))],
      purpose: `The composition, behaviour and checks of the curated design page ${name}`, aem: [`${ROOTS.design}/curated-design-pages/${name}`], sources: ['published page'],
      body: `## Page\n\n${table(['Attribute', 'Value'], [['Author path', `${ROOTS.design}/curated-design-pages/${name}`], ['Preview', `${PREVIEW}${p}`], ['Live', `${LIVE}${p}`], ['Title', e.dom?.title || '—'], ['Business purpose', 'Design reference of the Figma page of the same name (INFERRED, REQUIRES BUSINESS VALIDATION)'], ['Unique or reusable', twins.length ? `Same composition as ${twins.join(', ')}: reusable pattern` : 'Unique composition']])}\n\n## Blocks in order\n\n${table(['#', 'Block', 'Classes (variations)', 'Developer guide'], blocks.map((x, i) => [i + 1, x.name, code(x.classes || '—'), existsSync(outPath(`${BLOCK_DOC_DIR(x.name)}`)) || ctx.inv.blocks.some((bb) => bb.name === x.name) ? `[guide](${rel(docPath, `${BLOCK_DOC_DIR(x.name)}/${upper(x.name)}-DEVELOPER-GUIDE.md`)})` : '—']))}\n\n## Automated checks (executed ${(e.date || '').slice(0, 10)})\n\n${table(['Check', 'Result'], [
        ['HTTP status 375 / 768 / 1024 / 1440', ['375', '768', '1024', '1440'].map((w) => e.widths[w]?.status || 'n/a').join(' / ')],
        ['Horizontal overflow 375 / 768 / 1024 / 1440', ['375', '768', '1024', '1440'].map((w) => (e.widths[w]?.overflow ? 'yes' : 'no')).join(' / ')],
        ['Console errors', e.console.length ? e.console.join('; ') : 'none'], ['Failed requests', e.failed.length ? e.failed.join('; ') : 'none'],
        ['H1 count', e.dom?.h1 ?? '—'], ['Heading level skips', e.dom?.headingSkips ?? '—'], ['Images without alt', e.dom?.imgNoAlt ?? '—'], ['Unnamed buttons', e.dom?.buttonsNoName ?? '—'], ['Links without a name', e.dom?.linksNoName ?? '—'],
        ['Data layer entries / events', e.dom ? `${e.dom.dataLayer.entries} / ${e.dom.dataLayer.events.join(', ') || '—'}` : '—'], ['Empty lists ("There are no items to show")', e.dom?.emptyLists ?? '—'], ['html lang', e.dom?.lang || '—'],
      ])}\n\n## Authoring and development\n\nBuild the page from the blocks above in this order; each block's developer and authoring guides describe its fields and options. Metadata, taxonomy and assets of the page were not inspected on the author (no author access).`,
      screenshots: shots,
      limitations: ['Universal Editor and AEM author views were not captured (no author access).'],
      open: ctx.links.dbm ? ['The curated pages link to /language-master/en and to /content/tcs-corp/design-block-master/english/... (see the curated design page audit).'] : [],
    });
    writeFile(`${dir}/README.md`, `# Curated design page: ${name}\n\n- [Developer guide](./${upper(slug(name))}-DEVELOPER-GUIDE.md) ([PDF](./${upper(slug(name))}-DEVELOPER-GUIDE.pdf))\n- Live: ${LIVE}${p}\n`);
  });
  g('DEV-017', 'CURATED-DESIGN-PAGE-DEVELOPMENT-GUIDE.md', 'Curated Design Page Development Guide', 'Purpose of the curated design pages, how they are built and validated, and their patterns',
    `${kb('blocks.md', `${M}/CURATED-DESIGN-PAGE-DEVELOPMENT-GUIDE.md`, ['Block Library and Curated Design Pages'])}\n\n## Where they live\n\nSince KB-D-068 the block library and the curated design pages are in \`${ROOTS.design}\` (published at /design-block-master/en/).\n\n## Pages\n\n${curated.map((p) => { const n = p.replace('/design-block-master/en/curated-design-pages/', '') || 'index'; return `- [${n}](../curated-design-pages/${slug(n)}/${upper(slug(n))}-DEVELOPER-GUIDE.md)`; }).join('\n')}\n\nComposition matrix: [CURATED-PAGE-COMPOSITION-MATRIX.md](../curated-design-pages/CURATED-PAGE-COMPOSITION-MATRIX.md).`, { sources: ['docs/handover/knowledge-base/blocks.md'], aem: [`${ROOTS.design}/curated-design-pages`] });
  writeFile(`${D}/README.md`, readme('Development', 'Technical Lead / Block Owner (proposed)', ['pdf/: DEVELOPER-GUIDE.pdf (the general guides), DESIGN-STYLE-GUIDE.pdf, BLOCK-DEVELOPMENT-GUIDE.pdf (with every block guide), CURATED-DESIGN-PAGE-DEVELOPMENT-GUIDE.pdf', '[markdown/DEVELOPER-GUIDE.md](markdown/DEVELOPER-GUIDE.md): start here', `[blocks/](blocks/BLOCK-INVENTORY.md): one folder per block (${inv.blocks.length})`, `[curated-design-pages/](curated-design-pages/CURATED-PAGE-INVENTORY.md): one folder per curated page (${curated.length})`]));
  ctx.varRows = varRows; ctx.curated = curated; ctx.groups = groups; ctx.libPagesOf = libPagesOf; ctx.pagesUsing = pagesUsing;
}
const GH_TREE = (p) => `https://github.com/sradha-tcs/tcs-corp/tree/main/${p}`;
