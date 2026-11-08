---
id: "KB-L-005"
title: "Source of Truth"
role: "LLM retrieval"
topic: ""
audience: "Every role, AI agents, LLM retrieval"
owner: "Documentation Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Source of Truth

| Attribute | Value |
| --- | --- |
| Document ID | KB-L-005 |
| Audience | Every role, AI agents, LLM retrieval |
| Purpose | Precedence of sources and where they are |
| Scope | — |
| Prerequisites | — |
| Owner | Documentation Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Precedence](#precedence)
- [Project Rules and Root Documents](#project-rules-and-root-documents)
- [Block Documentation](#block-documentation)
- [Shared Code Documentation](#shared-code-documentation)
- [Handover](#handover)
- [Audit, Animation and Proposals](#audit-animation-and-proposals)
- [Configuration and Code Used as Reference](#configuration-and-code-used-as-reference)
- [External Documentation Cited by the Repository](#external-documentation-cited-by-the-repository)
- [Outside `main`](#outside-main)
- [Not in the Repository](#not-in-the-repository)
- [Related](#related)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Precedence

1. Current executable code and configuration
2. Current generated component models
3. Current AEM-authored content
4. Current rendered preview / live behaviour
5. Automated tests and their actual results
6. Block READMEs
7. Approved decision log
8. This documentation set (and the former consolidated handover)
9. Historical or superseded documents

## Project Rules and Root Documents

| Document | Covers | State |
| --- | --- | --- |
| [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md) | Setup commands, project structure, code style, AEM delivery rules, Additional tab, dialog tabs, Columns Container, Button, item children, animation and skeletons, shared events, data layer, header, floating Canvas, backgrounds and theme, accessibility, decorators / utils, site structure and site data, three-phase loading, module preloading, deployment, contributing | Current; the authoritative rules |
| [CLAUDE.md](https://github.com/sradha-tcs/tcs-corp/blob/main/CLAUDE.md) | Points to `AGENTS.md` | Current |
| [README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/README.md) | Boilerplate README (environments with `{repo}` / `{owner}` placeholders, links to aem.live documentation, Node 20 or newer, AEM Cloud Service release 2026.4 or newer) | Requires validation: not project-specific |
| [CONTRIBUTING.md](https://github.com/sradha-tcs/tcs-corp/blob/main/CONTRIBUTING.md), [CODE_OF_CONDUCT.md](https://github.com/sradha-tcs/tcs-corp/blob/main/CODE_OF_CONDUCT.md) | Boilerplate (Project Helix) contribution and conduct texts | Requires validation: refers to an `npm run commit` script that doesn't exist |
| [LICENSE](https://github.com/sradha-tcs/tcs-corp/blob/main/LICENSE) | Apache License 2.0 | — |
| [.github/pull_request_template.md](https://github.com/sradha-tcs/tcs-corp/blob/main/.github/pull_request_template.md) | Issue and test URL template (placeholders not substituted) | Requires validation |

## Block Documentation

| Document | Covers |
| --- | --- |
| [blocks/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/README.md) | Inventory, categories, container and child relationships, shared conventions, deprecated blocks, how the docs are maintained (generated sections: `npm run build:docs`) |
| [docs/blocks/BLOCK-DOCUMENTATION-REPORT.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/blocks/BLOCK-DOCUMENTATION-REPORT.md) | Documentation inventory, 170 handover-vs-code discrepancies per block (section 4), field / variation / container / accessibility / data layer / personalization / responsive matrices, validation |
| [docs/blocks/reports/](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/blocks/reports/hero.md) | Per-block review notes (one file per block folder) used by the report |

Every block folder has a README with the same structure (overview, authoring, dialog fields per tab, variations, accessibility, data layer, responsive, developer / admin / architect / QA guidance, troubleshooting, change history):

| Block | README | Block | README |
| --- | --- | --- | --- |
| Accordion | [blocks/accordion/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/accordion/README.md) | List | [blocks/list/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/list/README.md) |
| Anchor List | [blocks/anchor-list/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/anchor-list/README.md) | Modal | [blocks/modal/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/modal/README.md) |
| Button | [blocks/button-block/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/button-block/README.md) | Page Header | [blocks/page-header/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/page-header/README.md) |
| Cards | [blocks/cards/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/cards/README.md) | Quote | [blocks/quote/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/quote/README.md) |
| Column Break | [blocks/column-break/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/column-break/README.md) | Separator | [blocks/separator/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/separator/README.md) |
| Columns | [blocks/columns/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns/README.md) | Tab | [blocks/tab/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tab/README.md) |
| Columns Container | [blocks/columns-container/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns-container/README.md) | Table | [blocks/table/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/table/README.md) |
| Conversation Canvas | [blocks/conversation-canvas/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/conversation-canvas/README.md) | Table List | [blocks/table-list/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/table-list/README.md) |
| Embed | [blocks/embed/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/embed/README.md) | Tabs | [blocks/tabs/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tabs/README.md) |
| Filter List | [blocks/filter-list/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/filter-list/README.md) | TCS Header | [blocks/tcs-header/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tcs-header/README.md) |
| Footer | [blocks/footer/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/footer/README.md) | Teaser | [blocks/teaser/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/teaser/README.md) |
| Form Variations | [blocks/form-variations/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/form-variations/README.md) | Testimonial | [blocks/testimonial/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/testimonial/README.md) |
| Fragment | [blocks/fragment/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/fragment/README.md) | Video | [blocks/video/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/video/README.md) |
| Gen Carousel | [blocks/gen-carousel/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/gen-carousel/README.md) | Header | [blocks/header/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/header/README.md) |
| Hero | [blocks/hero/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/hero/README.md) | Interactive Dashboard | [blocks/interactive-dashboard/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/interactive-dashboard/README.md) |

## Shared Code Documentation

| Document | Covers |
| --- | --- |
| [decorators/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/README.md) | Every decorator module, its exports and users; the data layer contract |
| [utils/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/README.md) | Every util module, its exports and users; site data |
| [templates/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/templates/README.md) | Site Global Templates, Page Types, adding a template |

## Handover

| Document | Covers | State |
| --- | --- | --- |
| [docs/handover/TCS-CORP-HANDOVER.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/handover/TCS-CORP-HANDOVER.md) | The project handover (version 2.37, about 123,000 lines): Parts 1–18 from project overview and architecture to operations and new joiner training; Part 16 findings and open items | Current as a whole; the Part 6 component chapters predate later changes (F-84, F-107): the block READMEs follow the code |
| [docs/handover/TCS-CORP-HANDOVER.pdf](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/handover/TCS-CORP-HANDOVER.pdf) | The PDF built from the Markdown | Current (2.37) |
| [docs/handover/README.md](https://github.com/sradha-tcs/tcs-corp/blob/migrated-page-content-edam/docs/handover/README.md) | Part map and how the PDF is built (pandoc, typst, volumes) | Current; its Part 16 range (F-01 … F-98) predates F-99 … F-107 |
| [docs/handover/screenshots/README.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/handover/screenshots/README.md) | The handover figures (renderings, annotated previews, dialog references) | Current for version 2.0 figures |
| [AUTHOR-GUIDE.pdf](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/handover/AUTHOR-GUIDE.pdf), [DEVELOPER-GUIDE.pdf](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/handover/DEVELOPER-GUIDE.pdf), [ADMIN-GUIDE.pdf](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/handover/ADMIN-GUIDE.pdf) | Guides of 11 October 2026 | Deprecated: superseded by the handover |

Main handover parts by topic: Part 1 — Project Overview, Part 2 — Solution Architecture, Part 3 — Site Structure, Part 4 — Content Architecture, Part 5 — Authoring Fundamentals, Part 6 — Component Library, Parts 7–9 — Taxonomy, Metadata and Data Sheets, Part 10 — Error Pages, Part 11 — Analytics & Data Layer, Part 12 — Publishing, Deployment & Release, Part 13 — Global Troubleshooting Guide, Part 14 — Operational Runbook & AMS Handover, Part 15 — Appendix, Part 16 — Handover Findings and Open Items Register, Part 17 — Operations Guide, Part 18 — New Joiner Training Guide.

## Audit, Animation and Proposals

| Document | Covers |
| --- | --- |
| [docs/audit/README.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/README.md) | Index of the audit documents |
| [docs/audit/BLOCK-ECOSYSTEM-AUDIT.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/BLOCK-ECOSYSTEM-AUDIT.md) | Block ecosystem audit of 19 October 2026: runtime before / after, inventories, duplicates, accessibility, data layer, consent, personalization, blocked dependencies, defect register (D-x-n, L-n), migration |
| [docs/audit/BLOCK-SECTIONS.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/BLOCK-SECTIONS.md) | One audit section per component |
| [docs/audit/REAUDIT-2026-10-20.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/REAUDIT-2026-10-20.md) | Re-audit of 20 October 2026: re-verification, new defects (R-x-n), publication and live verification, blocked dependencies |
| [docs/audit/DIALOG-OPTIONS-2026-10-20.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/DIALOG-OPTIONS-2026-10-20.md) | List Item, Teaser, Columns Container and Section dialog options |
| [docs/audit/blocks/](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/blocks/group-a-card-lists.md), [docs/audit/reaudit/](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/reaudit/review-a.md) | The four code reviews of each audit |
| [docs/audit/data/](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/data/defect-register.csv) | CSV data: block inventory, dialog fields, defect and re-audit registers, runtime before / after |
| [docs/audit/tools/](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/tools/harness.mjs) | The evidence scripts (workspace paths, Playwright; excluded from lint) |
| [docs/animation/README.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/animation/README.md) | Block animation and skeleton loading report: capability matrix, framework, authoring model, accessibility, performance, tests |
| [docs/proposals/README.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/proposals/README.md), [docs/proposals/cards-card-refactoring.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/proposals/cards-card-refactoring.md) | Design proposals; the Cards and Card refactoring is "For review", decisions D-1 to D-6 open |

## Configuration and Code Used as Reference

| File | Reference for |
| --- | --- |
| [fstab.yaml](https://github.com/sradha-tcs/tcs-corp/blob/main/fstab.yaml), [paths.json](https://github.com/sradha-tcs/tcs-corp/blob/main/paths.json), [xwalk.json](https://github.com/sradha-tcs/tcs-corp/blob/main/xwalk.json) | Content source, path mappings, xwalk options |
| [helix-query.yaml](https://github.com/sradha-tcs/tcs-corp/blob/main/helix-query.yaml), [helix-sitemap.yaml](https://github.com/sradha-tcs/tcs-corp/blob/main/helix-sitemap.yaml) | Query index columns, sitemap |
| [head.html](https://github.com/sradha-tcs/tcs-corp/blob/main/head.html), [404.html](https://github.com/sradha-tcs/tcs-corp/blob/main/404.html), [.hlxignore](https://github.com/sradha-tcs/tcs-corp/blob/main/.hlxignore) | CSP, preloads, error page, served files |
| [package.json](https://github.com/sradha-tcs/tcs-corp/blob/main/package.json), [.eslintrc.js](https://github.com/sradha-tcs/tcs-corp/blob/main/.eslintrc.js), [.stylelintrc.json](https://github.com/sradha-tcs/tcs-corp/blob/main/.stylelintrc.json), [.github/workflows/main.yaml](https://github.com/sradha-tcs/tcs-corp/blob/main/.github/workflows/main.yaml) | Scripts, lint rules, CI |
| [utils/site.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/site.js) | Locales and the language master review |
| [scripts/scripts.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/scripts.js), [decorators/data-layer-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/data-layer-decorator.js) | Page loading; data layer |

## External Documentation Cited by the Repository

Only pages a repository file cites; "Cited in" names the citing file.

| Topic | URL | Cited in |
| --- | --- | --- |
| Edge Delivery Services documentation | [aem.live/docs](https://www.aem.live/docs/) | AGENTS.md, README.md, handover 15.3 |
| Developer tutorial | [aem.live/developer/tutorial](https://www.aem.live/developer/tutorial) | AGENTS.md, handover 15.3 |
| Anatomy of a project | [aem.live/developer/anatomy-of-a-project](https://www.aem.live/developer/anatomy-of-a-project) | AGENTS.md, handover 15.3 |
| David's Model (content modelling) | [aem.live/docs/davidsmodel](https://www.aem.live/docs/davidsmodel) | AGENTS.md, handover 15.3 |
| Documentation search index | [aem.live/docpages-index.json](https://www.aem.live/docpages-index.json) | AGENTS.md, handover 15.3 |
| Markup, sections and blocks | [aem.live/developer/markup-sections-blocks](https://www.aem.live/developer/markup-sections-blocks) | AGENTS.md, handover 15.3 |
| Markup reference | [aem.live/developer/markup-reference](https://www.aem.live/developer/markup-reference) | AGENTS.md, handover 15.3 |
| Component model definitions | [aem.live/developer/component-model-definitions](https://www.aem.live/developer/component-model-definitions) | AGENTS.md, README.md, handover 15.3 |
| Keeping it 100 (performance) | [aem.live/developer/keeping-it-100](https://www.aem.live/developer/keeping-it-100) | AGENTS.md, handover 15.3 |
| AI coding agents | [aem.live/developer/ai-coding-agents](https://www.aem.live/developer/ai-coding-agents) | AGENTS.md |
| AEM authoring | [aem.live/docs/aem-authoring](https://www.aem.live/docs/aem-authoring) | README.md, handover 15.3 |
| Universal Editor tutorial | [aem.live/developer/ue-tutorial](https://www.aem.live/developer/ue-tutorial) | README.md, handover 15.3 |
| Authoring path mapping | [aem.live/developer/authoring-path-mapping](https://www.aem.live/developer/authoring-path-mapping) | README.md, handover 15.3 |
| Taxonomy | [aem.live/docs/authoring-taxonomy](https://www.aem.live/docs/authoring-taxonomy) | utils/taxonomy.js, handover 15.3 |
| Block Collection | [aem.live/developer/block-collection](https://www.aem.live/developer/block-collection) | handover 15.3 |
| Block Collection: accordion, embed, fragment, modal, table, video | [aem.live/developer/block-collection/accordion](https://www.aem.live/developer/block-collection/accordion), [aem.live/developer/block-collection/embed](https://www.aem.live/developer/block-collection/embed), [aem.live/developer/block-collection/fragment](https://www.aem.live/developer/block-collection/fragment), [aem.live/developer/block-collection/modal](https://www.aem.live/developer/block-collection/modal), [aem.live/developer/block-collection/table](https://www.aem.live/developer/block-collection/table), [aem.live/developer/block-collection/video](https://www.aem.live/developer/block-collection/video) | The header comment of each block's JavaScript (`blocks/accordion/accordion.js`, ...) |
| Content modeling for AEM authoring (field collapse, element grouping) | [experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/aem-authoring/content-modeling](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/aem-authoring/content-modeling) | handover 15.3 |
| Universal Editor introduction | [experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/introduction](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/introduction) | handover 15.3 |
| xwalk lint rules | [github.com/adobe-rnd/eslint-plugin-xwalk](https://github.com/adobe-rnd/eslint-plugin-xwalk) | AGENTS.md, handover 15.3 |
| Boilerplate and its examples | [github.com/adobe-rnd/aem-boilerplate-xwalk](https://github.com/adobe-rnd/aem-boilerplate-xwalk) | AGENTS.md, handover 15.3 |
| PageSpeed Insights | [developers.google.com/speed/pagespeed/insights](https://developers.google.com/speed/pagespeed/insights/) | AGENTS.md (publishing process) |

The Admin API (`https://admin.hlx.page/...`) and the site configuration endpoint are used in the handover's operational procedures, but no documentation page for them is cited.

## Outside `main`

| Source | What it holds | Note |
| --- | --- | --- |
| Branch `home-content-package` (remote) | Downloads: the handover PDF, audit reports and registers, block library and curated design page reports and sheets (CSV), page content | Not part of the site; its earlier states are tagged `home-content-package_*` |
| `.handover-work/` | Handover build scripts and working notes | Local, not in git |
| `.home-work/` | Delivery workspace scripts (library preview renderer, package builders, reports) | Local, not in git |
| `content/` | Earlier guide sources (Markdown) and local content | Local, not in git |

## Not in the Repository

| Input | State |
| --- | --- |
| Figma files (TCS.com Design System, "New Screens from New DS", Figma Sites of www.tcs.com) | Blocked: referred to by name and node in the handover and block READMEs; no file or link to them is in the repository |
| Measurement plan (Adobe Tags rules, Web SDK datastream, XDM schema, report suites) | Blocked: not written (open item O-07); needed before Adobe Tags and the Web SDK can be configured |
| Consent / privacy specification | Blocked: no consent platform chosen (handover 1.6.2, O-07) |
| Accessibility specification or third-party audit report | Blocked: not in the repository; the repository has the WCAG 2.1 AA rules (AGENTS.md "Accessibility") and the automated axe results of the audits |
| Release guide beyond the handover | Blocked: not in the repository; release steps are handover Part 12 and Part 17.5, the publishing process is in AGENTS.md |
| Business requirements, KPIs, stakeholder names, SLAs, browser support matrix, translation process | Blocked: "To be confirmed" in the handover (O-01, O-02, O-12, O-13, O-17) |
| Production domain and CDN configuration | Blocked: not configured (O-03) |
| Site configuration (`public.json`, `metadata.source`) as applied | Not in the repository (held by the Edge Delivery configuration service; O-04) |

## Related

- [project-overview.md](../../01-architecture/markdown/SOLUTION-ARCHITECTURE.md), [repository-structure.md](../../02-development/markdown/REPOSITORY-STRUCTURE.md), [glossary.md](../../GLOSSARY.md)
- [architecture.md](../../01-architecture/markdown/TECHNICAL-ARCHITECTURE.md), [blocks.md](../../02-development/markdown/BLOCK-DEVELOPMENT-GUIDE.md), [content-architecture.md](../../01-architecture/markdown/CONTENT-ARCHITECTURE.md), [data-layer-and-analytics.md](../../02-development/markdown/ANALYTICS-DATA-LAYER-GUIDE.md), [design-system.md](../../02-development/markdown/DESIGN-STYLE-GUIDE.md), [personalization.md](../../01-architecture/markdown/INTEGRATION-ARCHITECTURE.md)
- Handover 15.3 Reference Documents: [TCS-CORP-HANDOVER.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/handover/TCS-CORP-HANDOVER.md)

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
