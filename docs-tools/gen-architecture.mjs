// 01-architecture: the architecture package.
import {
  writeDoc, writeFile, table, kb, kbIntro, repoLink, rel, ROOTS, LIVE, TODAY,
} from './lib.mjs';

const A = '01-architecture';
const M = `${A}/markdown`;
export const STATUS = [
  // capability, status, evidence
  ['Universal Editor authoring (xwalk) of 32 blocks and 5 default-content components', 'Implemented', 'component-models.json, component-definition.json, component-filters.json'],
  ['Edge Delivery Services rendering, three-phase loading, module preloading', 'Implemented', 'scripts/scripts.js, scripts/module-graph.js, head.html'],
  ['13 locale sites by path', 'Implemented (code and path mapping); content Partially implemented', 'utils/site.js LOCALES, paths.json'],
  ['Three review roots /language-master/en, /language-masters/en, /design-block-master/en (KB-D-068)', 'Implemented', 'utils/site.js REVIEW_ROOTS, paths.json, site configuration'],
  ['Query index and listing (List, Filter List, Cards from metadata)', 'Implemented', 'helix-query.yaml, utils/query-index.js, blocks/list, blocks/filter-list'],
  ['Placeholders, taxonomy, data sheets, redirects sheets per locale', 'Implemented (reading); redirects Not applied by the platform', 'utils/placeholders.js, utils/taxonomy.js, utils/data.js; redirects need a CDN rule (KB-D-055, on hold)'],
  ['Adobe Client Data Layer (page, components, interactions)', 'Implemented', 'decorators/data-layer-decorator.js, utils/analytics.js'],
  ['Adobe Tags, Web SDK, Analytics, CJA, Target, consent platform', 'Not implemented', 'decision log; AGENTS.md'],
  ['Dynamic Media with OpenAPI delivery of all assets (KB-D-067)', 'Partially implemented: rendering Implemented, page rewrite Configured but not validated, asset picker Planned (PR #200 open)', 'decorators/responsive-image-decorator.js, utils/media.js, aem-sites.sh on the delivery branch'],
  ['Separate AEM Assets environment (KB-D-064)', 'Not implemented (not adopted)', 'decision log KB-D-064'],
  ['Forms (Form Variations) submission back end', 'Not implemented (no back end connected)', 'blocks/form-variations; finding F-01'],
  ['Personalization', 'Not implemented', 'docs: personalization (knowledge base)'],
  ['CDN redirects / root redirect / to /en/', 'Planned (on hold)', 'KB-D-055'],
  ['Production custom domain and Adobe Managed CDN', 'To be confirmed', 'not recorded in the repository'],
  ['Monitoring and alerting beyond Edge Delivery RUM', 'To be confirmed', 'not recorded in the repository'],
];

import { mermaid } from './diagrams.mjs';

const mermaidOld = {
  'system-context.mmd': `flowchart LR
  author([Content author]) -->|edits| UE[Universal Editor]
  UE -->|reads/writes| AEM[(AEM Sites author\\n/content/tcs-corp)]
  dev([Developer]) -->|push / PR| GH[(GitHub sradha-tcs/tcs-corp)]
  GH -->|AEM Code Sync| CODE[Edge Delivery code bus]
  AEM -->|Publish / Admin API preview & live| CONTENT[Edge Delivery content & media bus]
  CODE --> EDS{{Edge Delivery Services\\n*.aem.page / *.aem.live}}
  CONTENT --> EDS
  DM[(Dynamic Media with OpenAPI\\ndelivery tier)] -->|approved assets| EDS
  EDS -->|HTML, JS, CSS, JSON sheets, query index| visitor([Site visitor])
  EDS -->|window.adobeDataLayer| ACDL[Adobe Client Data Layer\\n(no Tags / Web SDK)]`,
  'delivery-flow.mmd': `sequenceDiagram
  participant A as Author (Universal Editor)
  participant S as AEM Sites author
  participant P as Edge Delivery preview (aem.page)
  participant L as Edge Delivery live (aem.live)
  participant I as Query index
  A->>S: edit page / block fields
  A->>S: Publish (Quick publish / Manage publication)
  S->>P: technical account previews the page (franklin delivery servlet)
  S->>L: publishes it
  L->>I: page indexed (helix-query.yaml) when it isn't excluded
  Note over P,L: Admin API: POST /preview, /live, /index (bulk jobs for migrations)`,
  'page-loading.mmd': `flowchart TB
  start[loadPage] --> eager[Eager: decorateMain, decorateDeliveryImages,\\nfirst section, template, LCP image]
  eager --> lazy[Lazy: other sections, header, footer,\\nlazy-styles.css, block modules preloaded]
  lazy --> delayed[Delayed: delayed.js after 3 s]
  eager -.-> motion[prepareMotion per section]
  lazy -.-> dl[data layer: page and component entries]`,
  'site-roots.mmd': `flowchart TB
  root[/content/tcs-corp/]
  root --> loc[13 locale sites\\nus/en -> /en ... kr/ko-kr -> /ko-kr]
  root --> lm[language-master/en -> /language-master/en/\\nTesting with dummy content]
  root --> lms[language-masters/en -> /language-masters/en/\\nThe language master: migrated content, real sheets]
  root --> dbm[design-block-master/en -> /design-block-master/en/\\nBlock library and curated design pages]
  root --> sgt[site-global-templates\\nauthor only]
  lms -. later source of .-> loc`,
  'release-flow.mmd': `flowchart LR
  fb[feature branch] --> pr[Pull request into main\\nfeature preview URL]
  pr --> checks[CI: lint, AEM Code Sync, PageSpeed check]
  checks --> review[Human review]
  review --> merge[merge to main]
  merge --> sync[Code Sync -> main--tcs-corp--sradha-tcs.aem.page/.live]
  merge -. rollback .-> revert[revert commit / PR]`,
};

export function architecture(ctx) {
  Object.entries(mermaid).forEach(([f, m]) => writeFile(`${A}/diagrams/${f}`, `${m}\n`));
  const dia = (name, caption) => `\`\`\`mermaid\n${mermaid[name]}\n\`\`\`\n\n*Diagram: ${caption} (source: [diagrams/${name}](../diagrams/${name})).*`;
  const statusTable = table(['Capability', 'Status', 'Evidence'], STATUS);
  const common = { role: 'Architecture', audience: 'Solution architects, technical leads, developers, AI agents', owner: 'Solution Architect' };
  const docsList = [
    ['Solution architecture', `${M}/SOLUTION-ARCHITECTURE.md`], ['Content architecture', `${M}/CONTENT-ARCHITECTURE.md`],
    ['Technical architecture', `${M}/TECHNICAL-ARCHITECTURE.md`], ['Integration architecture', `${M}/INTEGRATION-ARCHITECTURE.md`],
    ['Security architecture', `${M}/SECURITY-ARCHITECTURE.md`], ['Deployment architecture', `${M}/DEPLOYMENT-ARCHITECTURE.md`],
    ['Performance architecture', `${M}/PERFORMANCE-ARCHITECTURE.md`], ['Localization architecture', `${M}/LOCALIZATION-ARCHITECTURE.md`],
    ['Architecture decisions', `${M}/ARCHITECTURE-DECISIONS.md`], ['Risks and open items', `${M}/ARCHITECTURE-RISKS-AND-OPEN-ITEMS.md`],
  ];
  writeDoc(`${M}/ARCHITECTURE-GUIDE.md`, {
    ...common, id: 'ARC-000', title: 'Architecture Guide', topic: 'architecture overview',
    purpose: 'Entry point of the architecture package: the system, its delivery streams, the implementation status of every capability and where each architecture view is described',
    scope: 'The TCS Corporate Website on AEM Sites as a Cloud Service with Universal Editor (xwalk) and Edge Delivery Services; the repository sradha-tcs/tcs-corp (main)',
    prereq: 'None', sources: ['AGENTS.md', 'scripts/scripts.js', 'utils/site.js', 'paths.json', 'helix-query.yaml', 'component-models.json'],
    aem: [ROOTS.master, ROOTS.test, ROOTS.design, '/content/tcs-corp/us/en … /content/tcs-corp/kr/ko-kr'],
    related: docsList, confidence: 'High',
    body: `## System context\n\n${dia('system-context.mmd', 'system context')}\n\n## Delivery streams\n\n${table(['Stream', 'Source', 'Delivered by', 'Environments'], [
      ['Code', 'GitHub sradha-tcs/tcs-corp (feature branches, main)', 'AEM Code Sync', '<branch>--tcs-corp--sradha-tcs.aem.page / .aem.live'],
      ['Content', 'AEM Sites author /content/tcs-corp (Universal Editor)', 'Publish from AEM (technical account) or the Admin API', 'main--tcs-corp--sradha-tcs.aem.page (preview), .aem.live (live)'],
      ['Configuration', 'Site configuration (Config Service: public.json paths, metadata source), fstab.yaml at onboarding only', 'Admin API /config', 'all branches'],
      ['Assets', 'AEM Assets of the Sites environment (/content/dam/tcs-corp)', 'Media bus (images published with pages) or Dynamic Media with OpenAPI (approved assets, KB-D-067)', 'delivery tier of the environment'],
    ])}\n\n${dia('delivery-flow.mmd', 'authoring to delivery flow')}\n\n## Site roots\n\n${dia('site-roots.mmd', 'site roots under /content/tcs-corp')}\n\n## Implementation status\n\nStatus vocabulary: Implemented, Partially implemented, Configured but not validated, Planned, Not implemented, Blocked, To be confirmed.\n\n${statusTable}\n\n## Architecture views\n\n${docsList.map(([l, p]) => `- [${l}](${rel(`${M}/ARCHITECTURE-GUIDE.md`, p)})`).join('\n')}\n\n## Page rendering lifecycle\n\n${dia('page-loading.mmd', 'three-phase page loading')}`,
    limitations: ['Production domain, CDN and monitoring are not recorded in the repository (To be confirmed).'],
    open: ['Confirm the production domain and CDN (owner: Solution Architect, to be confirmed).', 'Approve or reject the asset picker PR #200 after the Extension Manager set-up.'],
  });
  writeDoc(`${M}/SOLUTION-ARCHITECTURE.md`, {
    ...common, id: 'ARC-001', title: 'Solution Architecture', topic: 'solution',
    purpose: 'Business and technical context, scope, technology stack and constraints of the solution',
    sources: ['docs/handover/knowledge-base/project-overview.md', 'AGENTS.md'], aem: [ROOTS.master],
    body: `${kbIntro('project-overview.md')}\n\n${kb('project-overview.md', `${M}/SOLUTION-ARCHITECTURE.md`)}`,
    limitations: ['Business objectives are carried from the project overview; they are not validated with the business in this program.'],
  });
  writeDoc(`${M}/CONTENT-ARCHITECTURE.md`, {
    ...common, id: 'ARC-002', title: 'Content Architecture', topic: 'content',
    purpose: 'The site and locale hierarchy, review roots, page structure, metadata, taxonomy, placeholders, references, data sheets, redirects and publishing dependencies',
    sources: ['docs/handover/knowledge-base/content-architecture.md', 'utils/site.js', 'paths.json', 'helix-query.yaml'], aem: Object.values(ROOTS),
    body: `## The three review roots (KB-D-068)\n\n${table(['Author path', 'Published at', 'Purpose'], [
      [ROOTS.test, '/language-master/en/', 'Testing page functionality with dummy content, content limitations and other test aspects'],
      [ROOTS.master, '/language-masters/en/', 'The language master: the 8,432 migrated tcs.com pages, validated with real sheet data; later the source of the global site and the regions (MSM or separate content to be decided once the content is final)'],
      [ROOTS.design, '/design-block-master/en/', 'The block library and the curated design pages'],
    ])}\n\nEach root has its own references (nav, footer), error pages and sheets and lists its own pages from the query index (\`REVIEW_ROOTS\`, \`REVIEW_SHEETS\`, \`REVIEW_PAGES\` in ${repoLink('utils/site.js')}).\n\n${kb('content-architecture.md', `${M}/CONTENT-ARCHITECTURE.md`)}`,
    open: ['/design-block-master/en content still links to /language-master/en and to /content/tcs-corp/design-block-master/english (see the curated design page audit).'],
  });
  writeDoc(`${M}/TECHNICAL-ARCHITECTURE.md`, {
    ...common, id: 'ARC-003', title: 'Technical Architecture', topic: 'runtime',
    purpose: 'Runtime, block loading, module preloading, templates, authoring and delivery architecture, environments, data and rendering flows, error handling and caching',
    sources: ['docs/handover/knowledge-base/architecture.md', 'scripts/scripts.js', 'scripts/aem.js', 'head.html'],
    body: `${dia('page-loading.mmd', 'three-phase page loading')}\n\n${kb('architecture.md', `${M}/TECHNICAL-ARCHITECTURE.md`)}`,
  });
  writeDoc(`${M}/INTEGRATION-ARCHITECTURE.md`, {
    ...common, id: 'ARC-004', title: 'Integration Architecture', topic: 'integrations',
    purpose: 'Integration points: query index and search, Adobe Client Data Layer, Dynamic Media, forms, personalization, external embeds',
    sources: ['docs/handover/knowledge-base/indexing-and-search.md', 'docs/handover/knowledge-base/personalization.md', 'docs/handover/knowledge-base/data-layer-and-analytics.md', 'helix-query.yaml'],
    body: `## Integration status\n\n${table(['Integration', 'Status'], STATUS.filter((s) => /Data Layer|Tags|Dynamic Media|Forms|Personalization|Query index|CDN/.test(s[0])).map((s) => [s[0], s[1]]))}\n\n# Query index and search\n\n${kb('indexing-and-search.md', `${M}/INTEGRATION-ARCHITECTURE.md`)}\n\n# Personalization\n\n${kb('personalization.md', `${M}/INTEGRATION-ARCHITECTURE.md`)}`.replace(/^# (Query index and search|Personalization)$/gm, '## $1 (section)'),
    limitations: ['Adobe Tags, Web SDK, Analytics, Target and a consent platform are not configured; nothing in this document implies they are.'],
  });
  writeDoc(`${M}/SECURITY-ARCHITECTURE.md`, {
    ...common, id: 'ARC-005', title: 'Security Architecture', topic: 'security', sources: ['docs/handover/knowledge-base/security-privacy-consent.md', 'utils/privacy.js'],
    purpose: 'Security boundaries, sanitisation, link safety, CSP, secrets, storage, data minimisation and consent dependencies',
    body: `${kbIntro('security-privacy-consent.md')}\n\n${kb('security-privacy-consent.md', `${M}/SECURITY-ARCHITECTURE.md`)}`,
  });
  writeDoc(`${M}/DEPLOYMENT-ARCHITECTURE.md`, {
    ...common, id: 'ARC-006', title: 'Deployment Architecture', topic: 'deployment', sources: ['docs/handover/knowledge-base/deployment-and-release.md', '.github/workflows/main.yaml'],
    purpose: 'Delivery streams, environments, promotion, content packages, publishing, reindexing and rollback',
    body: `${dia('release-flow.mmd', 'code release flow')}\n\n${kb('deployment-and-release.md', `${M}/DEPLOYMENT-ARCHITECTURE.md`)}`,
  });
  writeDoc(`${M}/PERFORMANCE-ARCHITECTURE.md`, {
    ...common, id: 'ARC-007', title: 'Performance Architecture', topic: 'performance', sources: ['docs/handover/knowledge-base/performance.md', 'scripts/scripts.js', 'styles/styles.css'],
    purpose: 'Core Web Vitals requirements, loading strategy, images, fonts, layout shift prevention and budgets',
    body: kb('performance.md', `${M}/PERFORMANCE-ARCHITECTURE.md`),
    limitations: ['No PageSpeed or field measurement was taken in this program (Not recorded).'],
  });
  const locales = [...repoRead('utils/site.js').matchAll(/\{ country: '([a-z]+)', code: '([a-z-]+)', lang: '([A-Za-z-]+)'/g)].map((m) => [`/content/tcs-corp/${m[1]}/${m[2]}`, `/${m[2]}`, m[3]]);
  writeDoc(`${M}/LOCALIZATION-ARCHITECTURE.md`, {
    ...common, id: 'ARC-008', title: 'Localization Architecture', topic: 'localization', sources: ['utils/site.js', 'paths.json', 'tools/paths/generate-paths.mjs'],
    purpose: 'The locales, their published paths, the language master and the review roots, and how code resolves the locale',
    body: `## Locales\n\n${locales.length ? table(['AEM path', 'Published', 'lang'], locales) : 'See `LOCALES` in utils/site.js.'}\n\n## Language master and review roots\n\nThe language master \`${ROOTS.master}\` is the future source of the global site and the regions; whether the regions are created with MSM or carry their own content is open until the content is final (tcs.com's regions don't carry language master content today). The testing root \`${ROOTS.test}\` and the design root \`${ROOTS.design}\` are not rollout sources.\n\n${kb('content-architecture.md', `${M}/LOCALIZATION-ARCHITECTURE.md`, ['Site and locale hierarchy', 'Localization'])}`,
    open: ['Decide MSM or separate regional content once the language master content is final (owner: Product Owner).'],
  });
  writeDoc(`${M}/ARCHITECTURE-DECISIONS.md`, {
    ...common, id: 'ARC-009', title: 'Architecture Decisions', topic: 'decisions', sources: ['docs/handover/knowledge-base/decision-log.md'],
    purpose: 'The decision log (KB-D-xxx) as maintained in the code repository knowledge base',
    body: `The authoritative decision log is ${repoLink('docs/handover/knowledge-base/decision-log.md')} (code repository); this copy is generated from it.\n\n${kb('decision-log.md', `${M}/ARCHITECTURE-DECISIONS.md`)}`,
    confidence: 'High',
  });
  writeDoc(`${M}/ARCHITECTURE-RISKS-AND-OPEN-ITEMS.md`, {
    ...common, id: 'ARC-010', title: 'Architecture Risks and Open Items', topic: 'risks', sources: ['docs/handover/knowledge-base/decision-log.md', 'docs/handover/knowledge-base/reports/discrepancy-report.md'],
    purpose: 'Risks and open architecture items with their status',
    body: `## Open architecture items\n\n${table(['ID', 'Item', 'Status', 'Owner (proposed)'], [
      ['AR-01', 'Redirects: per-locale sheets aren\'t applied by the platform; / to /en/ needs a CDN rule (KB-D-055)', 'Planned (on hold)', 'Solution Architect'],
      ['AR-02', 'Dynamic Media for all assets (KB-D-067): reprocessing, approval, asset IDs, page rewrite and reinstall pending; picker PR #200 needs the Extension Manager set-up', 'Partially implemented', 'AEM Administrator'],
      ['AR-03', 'Adobe Tags / Web SDK / consent not configured: data layer only', 'Not implemented', 'Product Owner'],
      ['AR-04', 'Forms have no submission back end (F-01)', 'Not implemented', 'Product Owner'],
      ['AR-05', 'MSM or separate regional content for the language master rollout', 'To be confirmed', 'Product Owner'],
      ['AR-06', '/en locale content was unpublished and deleted from Edge Delivery on 8 November 2026 16:41–16:48 UTC (author-side action)', 'Open: to confirm intent', 'Content Lead'],
      ['AR-07', '/design-block-master/en content links to /language-master/en (1,281 links) and to unmapped /content/tcs-corp/design-block-master/english paths (358 links)', 'Open', 'Content Lead'],
      ['AR-08', 'Production domain, CDN, monitoring not recorded', 'To be confirmed', 'Solution Architect'],
    ])}\n\n## Recommendations (not approved)\n\n${kb('decision-log.md', `${M}/ARCHITECTURE-RISKS-AND-OPEN-ITEMS.md`, ['Recommendations (not approved)'])}`,
  });
  writeFile(`${A}/README.md`, readme('Architecture', 'Solution Architect (proposed)', [`pdf/ARCHITECTURE-GUIDE.pdf: the architecture package as one PDF (the guide and the ten views)`, ...docsList.map(([l, p]) => `[${l}](${p.replace(`${A}/`, '')})`), 'diagrams/: Mermaid sources of the diagrams']));
}

export function readme(role, owner, items) {
  return `# ${role}\n\nOwner: ${owner}. Generated on ${TODAY} by the documentation program from the repository and the published reference pages; the Markdown files are the maintained source, the PDFs in \`pdf/\` are generated from them (don't edit PDFs).\n\n${items.map((i) => `- ${i}`).join('\n')}\n`;
}
import { repoRead } from './lib.mjs';
