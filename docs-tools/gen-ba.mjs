// 04-business-analysis: implementation-derived EPICs, features and user stories (all INFERRED).
import { writeDoc, writeFile, table, code, rel, slug, repoLink, LIVE, kb } from './lib.mjs';
import { readme } from './gen-architecture.mjs';
import { EPICS, CAPABILITY_FEATURES, blockTestCases } from './testcases.mjs';

const BA = '04-business-analysis';
const M = `${BA}/markdown`;
const INF = '**INFERRED REQUIREMENT, REQUIRES BUSINESS VALIDATION**';

export function businessAnalysis(ctx) {
  const { inv } = ctx;
  const common = { role: 'Business analysis', audience: 'Business analysts, product owner, QA lead', owner: 'Business Analyst / Product Owner' };
  const g = (id, file, title, purpose, body, extra = {}) => writeDoc(`${M}/${file}`, { ...common, id, title, purpose, body, confidence: 'Low', ...extra });
  const features = []; const stories = []; const rtm = [];
  EPICS.forEach(([eid, ename, objective, blocks]) => {
    const edir = `${BA}/epics/${eid}-${slug(ename)}`;
    const feats = blocks.map((bn) => inv.blocks.find((b) => b.name === bn)).filter(Boolean).map((b, i) => ({ id: `F-${eid}-${String(i + 1).padStart(2, '0')}`, name: b.meta?.name || b.name, b, source: `blocks/${b.name}` }))
      .concat((CAPABILITY_FEATURES[eid] || []).map(([id, name, source]) => ({ id, name, source })));
    feats.forEach((f) => {
      const fdir = `${edir}/features/${f.id}-${slug(f.name)}`;
      const tcs = f.b ? blockTestCases(f.b) : [];
      const st = f.b ? [
        { id: `US-${f.id}-01`, persona: 'content author', want: `to add and configure the ${f.name} in Universal Editor`, value: 'pages can present this content without developer help', flows: ['Add the component from the palette', 'Fill in the fields of each tab', 'Preview and publish'], tc: tcs.filter((t) => ['Authoring', 'Boundary', 'Negative'].includes(t.kind)) },
        { id: `US-${f.id}-02`, persona: 'site visitor', want: `to see and use the ${f.name}: ${f.b.meta?.purpose || 'its content'}`, value: 'I get the information or action it offers on any device', flows: ['Open a page with the block', 'Use it with mouse, touch or keyboard'], tc: tcs.filter((t) => ['Functional (smoke)', 'Responsive', 'Accessibility', 'Error recovery'].includes(t.kind)) },
        ...(tcs.some((t) => t.kind === 'Component variation') ? [{ id: `US-${f.id}-03`, persona: 'content author', want: `to choose the ${f.name}'s variations (${f.b.meta?.variations || 'its dialog options'})`, value: 'the block matches the design of each page', flows: ['Select the block', 'Change the variation options', 'Preview'], tc: tcs.filter((t) => t.kind === 'Component variation') }] : []),
      ] : [{ id: `US-${f.id}-01`, persona: 'site visitor or content author', want: `${f.name}`, value: objective, flows: ['See the source in the implementation'], tc: [] }];
      writeDoc(`${fdir}/FEATURE.md`, {
        ...common, id: f.id, title: `Feature ${f.id}: ${f.name}`, topic: 'feature', components: f.b ? [f.b.name] : [], confidence: 'Low',
        purpose: `The feature ${f.name} of EPIC ${eid}, derived from the implementation`, sources: [f.source],
        body: `${INF}\n\n${table(['Attribute', 'Value'], [
          ['Feature ID', f.id], ['Parent EPIC', `${eid} ${ename}`], ['Business value', objective], ['Description', f.b?.meta?.purpose || f.name], ['Primary persona', f.b ? 'Content author; site visitor' : 'Site visitor'],
          ['Preconditions', 'Code deployed; the component available in the section filters'], ['Functional requirements', f.b ? `The fields and variations of ${f.b.name} (developer guide)` : f.source],
          ['Business rules', 'Block README: Content and Asset Guidelines'], ['Non-functional requirements', 'WCAG 2.1 AA; three-phase loading; no personal data in the data layer'], ['Data requirements', f.b?.readmeSections?.['Data Layer and Analytics'] ? 'See the data layer section of the developer guide' : '—'],
          ['Content requirements', 'Authored per the authoring guide'], ['Analytics requirements', 'Component entry and interactions in the Adobe Client Data Layer'], ['Accessibility requirements', 'See the accessibility section of the developer guide'],
          ['SEO requirements', 'Semantic headings; metadata from the page'], ['Localization requirements', 'UI text from placeholders with an English fallback'], ['Security/privacy requirements', 'No personal data; announced new-tab links'],
          ['Dependencies', f.b ? (f.b.imports.join(', ') || '—') : f.source], ['Acceptance criteria', 'See the user stories'], ['Related user stories', st.map((s) => s.id).join(', ')],
          ['Related components', f.b ? f.b.name : '—'], ['Related test cases', tcs.map((t) => t.id).join(', ') || '—'], ['Definition of Ready', '[DEFINITION-OF-READY](../../../../markdown/DEFINITION-OF-READY.md)'], ['Definition of Done', '[DEFINITION-OF-DONE](../../../../markdown/DEFINITION-OF-DONE.md)'],
        ])}${f.b ? `\n\nDeveloper guide: [${f.b.name}](${rel(`${fdir}/FEATURE.md`, `02-development/blocks/${f.b.name}/${f.b.name.toUpperCase()}-DEVELOPER-GUIDE.md`)}).` : ''}`,
      });
      st.forEach((s) => {
        const sp = `${fdir}/user-stories/${s.id}-${slug(s.want).slice(0, 50)}.md`;
        const gherkin = s.tc.slice(0, 4).map((t) => `Scenario: ${t.objective}\n  Given ${t.kind === 'Authoring' ? 'an author in Universal Editor on a test page' : 'a published page with the block'}\n  When ${t.steps[t.steps.length - 1].toLowerCase()}\n  Then ${t.expected.toLowerCase()}`).join('\n\n');
        writeDoc(sp, {
          ...common, id: s.id, title: `User story ${s.id}`, topic: 'user story', components: f.b ? [f.b.name] : [], confidence: 'Low',
          purpose: `As a ${s.persona}, I want ${s.want}, so that ${s.value}`, sources: [f.source],
          body: `${INF}\n\n> As a ${s.persona},\n> I want ${s.want},\n> so that ${s.value}.\n\n${table(['Attribute', 'Value'], [
            ['Story ID', s.id], ['Parent feature', `${f.id} ${f.name}`], ['Priority', 'To be confirmed'], ['Preconditions', 'Code deployed to the environment; author access for authoring stories'],
            ['Main flow', s.flows.map((x, i) => `${i + 1}. ${x}`).join(' ')], ['Alternate flows', 'Keyboard-only and touch use'], ['Exception flows', 'A dependency (sheet, index, media) fails: fallback text or empty state'],
            ['Business rules', 'Block README: Content and Asset Guidelines'], ['Analytics events', 'Component shown / clicked (data layer)'], ['Accessibility acceptance criteria', 'Keyboard reachable, named controls, alt text, visible focus'],
            ['Responsive acceptance criteria', 'No horizontal overflow at 375, 768, 1024, 1440 px'], ['SEO acceptance criteria', 'Heading order kept'], ['Localization acceptance criteria', 'UI text from placeholders'],
            ['Security/privacy acceptance criteria', 'No personal data in the data layer'], ['Dependencies', f.source], ['Assumptions', 'Derived from the implementation'], ['Out of scope', 'Back-end integrations not implemented (Tags, forms back end)'],
            ['Related code', f.b ? `blocks/${f.b.name}/` : f.source], ['Related block-library example', f.b ? `${LIVE}/design-block-master/en/block-library/${f.b.name}` : '—'], ['Related curated page', f.b ? (ctx.pagesUsing(f.b.name).slice(0, 3).join(', ') || '—') : '—'],
            ['Related test cases', s.tc.map((t) => t.id).join(', ') || '—'], ['Definition of Ready / Done', 'See the BA package'],
          ])}\n\n## Gherkin acceptance criteria\n\n\`\`\`gherkin\nFeature: ${f.name}\n\n${gherkin || 'Scenario: to be written with the business'}\n\`\`\``,
        });
        stories.push({ s, f, eid, path: sp });
        s.tc.forEach((t) => rtm.push([objective, eid, f.id, s.id, t.objective, f.b ? f.b.name : '—', f.source, t.id]));
        if (!s.tc.length) rtm.push([objective, eid, f.id, s.id, '—', '—', f.source, 'No test case (gap)']);
      });
      features.push({ ...f, eid, path: `${fdir}/FEATURE.md` });
    });
    writeDoc(`${edir}/EPIC.md`, {
      ...common, id: eid, title: `EPIC ${eid}: ${ename}`, topic: 'epic', confidence: 'Low', purpose: objective, sources: feats.map((f) => f.source),
      body: `${INF}\n\n${table(['Attribute', 'Value'], [
        ['EPIC ID', eid], ['Name', ename], ['Background', 'Derived from the implemented capabilities of the TCS Corporate Website'], ['Business objective', objective], ['Business outcome', 'To be confirmed with the business'],
        ['In scope', feats.map((f) => f.name).join(', ')], ['Out of scope', 'Integrations not implemented (Adobe Tags, Web SDK, forms back end, personalization)'], ['Personas', 'Content author, site visitor, site administrator'],
        ['Stakeholders', 'Product Owner, Content Lead, Technical Lead'], ['Assumptions', 'The implemented behaviour reflects the intended requirement'], ['Dependencies', 'AEM Sites author, Edge Delivery, published sheets'],
        ['Constraints', 'AEM delivery rules; no runtime dependencies'], ['Risks', 'Inferred requirements differ from business intent'], ['Features', feats.map((f) => `[${f.id}](./features/${f.id}-${slug(f.name)}/FEATURE.md)`).join(', ')],
        ['Success measures', 'To be confirmed (no approved KPI)'], ['Non-functional expectations', 'WCAG 2.1 AA, Core Web Vitals, privacy'], ['Acceptance conditions', 'Every feature\'s stories accepted'],
        ['Related architecture', '[Architecture guide](../../../01-architecture/markdown/ARCHITECTURE-GUIDE.md)'], ['Related components', blocks.join(', ') || 'site-wide'], ['Related curated pages', 'See the curated page inventory'], ['Open decisions', 'Business validation of every inferred requirement'],
      ])}`,
    });
  });
  const featRows = features.map((f) => [f.eid, `[${f.id}](${rel(`${M}/EPIC-FEATURE-USER-STORY-CATALOG.md`, f.path)})`, f.name, stories.filter((s) => s.f.id === f.id).map((s) => s.s.id).join(', ')]);
  g('BA-000', 'BUSINESS-ANALYST-GUIDE.md', 'Business Analyst Guide', 'How the BA package is organised and how to validate the inferred requirements',
    `## The package\n\n${INF}: every EPIC, feature and story here is derived from the implementation (code, models, READMEs) because no approved backlog exists in the repository. Validate each with the Product Owner before using it as a requirement.\n\n## Hierarchy\n\nBusiness objective → EPIC → Feature → User story → Acceptance criterion → Requirement → Test case → Implementation component.\n\n## Counts\n\n${table(['Item', 'Count'], [['EPICs', EPICS.length], ['Features', features.length], ['User stories', stories.length], ['Traceability rows', rtm.length]])}\n\n## Documents\n\n${['BUSINESS-CONTEXT', 'SCOPE-AND-BOUNDARIES', 'PERSONAS-AND-JOURNEYS', 'FUNCTIONAL-REQUIREMENTS', 'NON-FUNCTIONAL-REQUIREMENTS', 'BUSINESS-RULES', 'EPIC-FEATURE-USER-STORY-CATALOG', 'ACCEPTANCE-CRITERIA-CATALOG', 'REQUIREMENTS-TRACEABILITY-MATRIX', 'DEPENDENCY-MATRIX', 'ASSUMPTIONS-CONSTRAINTS-RISKS', 'OPEN-DECISIONS', 'DEFINITION-OF-READY', 'DEFINITION-OF-DONE'].map((d) => `- [${d}](./${d}.md)`).join('\n')}`);
  g('BA-001', 'BUSINESS-CONTEXT.md', 'Business Context', 'Business context of the site', `${INF} for anything beyond the project overview.\n\n${kb('project-overview.md', `${M}/BUSINESS-CONTEXT.md`, ['Business and Program Objectives', 'Business Value', 'Target Users', 'Brands', 'Scope'])}`, { sources: ['docs/handover/knowledge-base/project-overview.md'] });
  g('BA-002', 'SCOPE-AND-BOUNDARIES.md', 'Scope and Boundaries', 'What the implementation covers and what it doesn\'t', `## In scope (implemented)\n\n${EPICS.map((e) => `- ${e[0]} ${e[1]}`).join('\n')}\n\n## Out of scope (not implemented)\n\n- Adobe Tags, Web SDK, Analytics, CJA, Target, consent platform\n- Forms submission back end\n- Personalization\n- CDN redirects (on hold)\n- A separate AEM Assets environment (KB-D-064 not adopted)`);
  g('BA-003', 'PERSONAS-AND-JOURNEYS.md', 'Personas and Journeys', 'The personas the implementation serves', `${INF}\n\n${table(['Persona', 'Goal', 'Journey (implemented)'], [['Site visitor', 'Learn about TCS offerings, news, careers', 'Home / landing → hero → teasers and lists → detail page → contact or Conversation Canvas'], ['Investor / media', 'Find press releases, results, media contacts', 'Newsroom list → press release → media contacts'], ['Job seeker', 'Find careers information', 'Careers pages → lists → apply links'], ['Content author', 'Build and publish pages', 'AEM Sites → Universal Editor → preview → publish'], ['Site administrator', 'Keep the site configured and published', 'Admin API, site configuration, sheets']])}`);
  g('BA-004', 'FUNCTIONAL-REQUIREMENTS.md', 'Functional Requirements', 'Functional requirements per feature (inferred)', `${INF}\n\n${table(['EPIC', 'Feature', 'Name', 'Stories'], featRows)}`);
  g('BA-005', 'NON-FUNCTIONAL-REQUIREMENTS.md', 'Non-Functional Requirements', 'Accessibility, performance, privacy, SEO and localization requirements as implemented', `${table(['ID', 'Requirement', 'Source', 'Status'], [['NFR-01', 'WCAG 2.1 AA', 'AGENTS.md, accessibility guide', 'Implemented; not fully verified'], ['NFR-02', 'PageSpeed target 100; three-phase loading', 'AGENTS.md', 'Implemented; not measured in this program'], ['NFR-03', 'No personal data in the data layer', 'utils/privacy.js', 'Implemented (unit tested)'], ['NFR-04', 'UI text from placeholders with English fallback', 'utils/placeholders.js', 'Implemented'], ['NFR-05', 'No runtime dependencies; no build step', 'AGENTS.md', 'Implemented'], ['NFR-06', 'Mobile first at 600 / 900 / 1200 px', 'styles', 'Implemented']])}`);
  g('BA-006', 'BUSINESS-RULES.md', 'Business Rules', 'Business rules found in the implementation', `${INF}\n\n${table(['Block', 'Rules (README: Content and Asset Guidelines)'], inv.blocks.map((b) => [b.meta?.name || b.name, (b.readmeSections['Content and Asset Guidelines'] || '—').split('\n').filter((l) => /^[-*] /.test(l)).slice(0, 4).map((l) => l.replace(/^[-*] /, '')).join(' • ') || '—']))}`);
  g('BA-007', 'EPIC-FEATURE-USER-STORY-CATALOG.md', 'EPIC, Feature and User Story Catalog', 'Every EPIC, feature and story', `${INF}\n\n${EPICS.map((e) => `## ${e[0]} ${e[1]}\n\n[EPIC](${rel(`${M}/EPIC-FEATURE-USER-STORY-CATALOG.md`, `${BA}/epics/${e[0]}-${slug(e[1])}/EPIC.md`)}): ${e[2]}\n\n${table(['Feature', 'Name', 'Stories'], featRows.filter((r) => r[0] === e[0]).map((r) => r.slice(1)))}`).join('\n\n')}`);
  g('BA-008', 'ACCEPTANCE-CRITERIA-CATALOG.md', 'Acceptance Criteria Catalog', 'The acceptance criteria of every story (from its test cases)', table(['Story', 'Criterion', 'Test case'], stories.flatMap(({ s }) => s.tc.map((t) => [s.id, t.expected, t.id]))));
  g('BA-009', 'REQUIREMENTS-TRACEABILITY-MATRIX.md', 'Requirements Traceability Matrix', 'Objective → EPIC → Feature → Story → Criterion → Block → Source → Test case → Result → Defect', `Results and defects: see the [test execution report](${rel(`${M}/REQUIREMENTS-TRACEABILITY-MATRIX.md`, '05-quality-assurance/markdown/TEST-EXECUTION-REPORT.md')}); a manual case without execution is Not Run.\n\n${table(['Objective', 'EPIC', 'Feature', 'Story', 'Criterion', 'Block', 'Source', 'Test case', 'Result', 'Defect'], rtm.map((r) => [...r, ctx.resultOf ? ctx.resultOf(r[7]) : 'Not Run', '—']))}`);
  g('BA-010', 'DEPENDENCY-MATRIX.md', 'Dependency Matrix', 'Features and the systems they depend on', table(['Feature', 'Depends on'], features.map((f) => [`${f.id} ${f.name}`, f.b ? (f.b.imports.filter((i) => /utils|decorators/.test(i)).map((i) => i.replace(/^\.\.\/\.\.\//, '')).join(', ') || 'none') : f.source])));
  g('BA-011', 'ASSUMPTIONS-CONSTRAINTS-RISKS.md', 'Assumptions, Constraints and Risks', 'Assumptions, constraints and risks of the requirements', table(['Type', 'Item'], [['Assumption', 'Implemented behaviour reflects the business intent (to validate)'], ['Assumption', 'The language master content is the source of the global site'], ['Constraint', 'AEM delivery rules (AGENTS.md)'], ['Constraint', 'No Adobe Tags / Web SDK'], ['Risk', 'Inferred requirements may be wrong'], ['Risk', 'MSM decision open']]));
  g('BA-012', 'OPEN-DECISIONS.md', 'Open Decisions', 'Decisions the business must take', table(['ID', 'Decision', 'Owner'], [['OD-01', 'Validate every inferred EPIC, feature and story', 'Product Owner'], ['OD-02', 'MSM or separate regional content', 'Product Owner'], ['OD-03', 'Analytics stack (Tags, Web SDK, consent)', 'Product Owner'], ['OD-04', 'Forms back end', 'Product Owner'], ['OD-05', 'Redirect implementation (CDN)', 'Solution Architect'], ['OD-06', 'Quality thresholds (pass rate, CWV)', 'QA governance']]));
  g('BA-013', 'DEFINITION-OF-READY.md', 'Definition of Ready', 'When a story can start', '- The story is validated by the Product Owner (inferred stories included).\n- Acceptance criteria are testable and linked to test cases.\n- Design (Figma or curated page) is referenced.\n- Content and author access are available.\n- Dependencies are resolved or planned.');
  g('BA-014', 'DEFINITION-OF-DONE.md', 'Definition of Done', 'When a story is done', '- Code merged into `main` through a PR with green checks and a feature preview URL.\n- `npm run lint` and `npm test` pass (real results).\n- Block README, knowledge base, decision log and **docs/handover on migrated-page-content-edam** updated.\n- Test cases executed with evidence; defects closed or accepted.\n- Content published and indexed where needed.');
  writeFile(`${BA}/README.md`, readme('Business analysis', 'Business Analyst / Product Owner (proposed)', ['Everything here is INFERRED from the implementation and requires business validation', `[markdown/BUSINESS-ANALYST-GUIDE.md](markdown/BUSINESS-ANALYST-GUIDE.md): start here`, `epics/: ${EPICS.length} EPICs, ${features.length} features, ${stories.length} user stories (each with its PDF)`]));
  ctx.ba = { features, stories, rtm };
}
