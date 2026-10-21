# References

This page lists the documents a reader of the knowledge base can rely on: every documentation file tracked in the repository (with what it covers and whether it is current), the external Adobe and tooling documentation that the project's own files cite, and the inputs that are referred to but not in the repository. All repository links were checked against the files at commit 2d06316; external links are listed only where a repository file cites them.

| Attribute | Value |
| --- | --- |
| Audience | Everyone on the project, AI agents |
| Source of truth | `git ls-files` (Markdown, PDF and configuration files), [AGENTS.md](../../../AGENTS.md) "Troubleshooting", [README.md](../../../README.md), handover 15.3 Reference Documents ([TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md)), citations in code comments |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 |
| Status | Current (blocked inputs listed at the end) |

## Project Rules and Root Documents

| Document | Covers | State |
| --- | --- | --- |
| [AGENTS.md](../../../AGENTS.md) | Setup commands, project structure, code style, AEM delivery rules, Additional tab, dialog tabs, Columns Container, Button, item children, animation and skeletons, shared events, data layer, header, floating Canvas, backgrounds and theme, accessibility, decorators / utils, site structure and site data, three-phase loading, module preloading, deployment, contributing | Current; the authoritative rules |
| [CLAUDE.md](../../../CLAUDE.md) | Points to `AGENTS.md` | Current |
| [README.md](../../../README.md) | Boilerplate README (environments with `{repo}` / `{owner}` placeholders, links to aem.live documentation, Node 20 or newer, AEM Cloud Service release 2026.4 or newer) | Requires validation: not project-specific |
| [CONTRIBUTING.md](../../../CONTRIBUTING.md), [CODE_OF_CONDUCT.md](../../../CODE_OF_CONDUCT.md) | Boilerplate (Project Helix) contribution and conduct texts | Requires validation: refers to an `npm run commit` script that doesn't exist |
| [LICENSE](../../../LICENSE) | Apache License 2.0 | — |
| [.github/pull_request_template.md](../../../.github/pull_request_template.md) | Issue and test URL template (placeholders not substituted) | Requires validation |

## Block Documentation

| Document | Covers |
| --- | --- |
| [blocks/README.md](../../../blocks/README.md) | Inventory, categories, container and child relationships, shared conventions, deprecated blocks, how the docs are maintained (generated sections: `npm run build:docs`) |
| [docs/blocks/BLOCK-DOCUMENTATION-REPORT.md](../../blocks/BLOCK-DOCUMENTATION-REPORT.md) | Documentation inventory, 170 handover-vs-code discrepancies per block (section 4), field / variation / container / accessibility / data layer / personalization / responsive matrices, validation |
| [docs/blocks/reports/](../../blocks/reports/hero.md) | Per-block review notes (one file per block folder) used by the report |

Every block folder has a README with the same structure (overview, authoring, dialog fields per tab, variations, accessibility, data layer, responsive, developer / admin / architect / QA guidance, troubleshooting, change history):

| Block | README | Block | README |
| --- | --- | --- | --- |
| Accordion | [blocks/accordion/README.md](../../../blocks/accordion/README.md) | List | [blocks/list/README.md](../../../blocks/list/README.md) |
| Anchor List | [blocks/anchor-list/README.md](../../../blocks/anchor-list/README.md) | Modal | [blocks/modal/README.md](../../../blocks/modal/README.md) |
| Button | [blocks/button-block/README.md](../../../blocks/button-block/README.md) | Page Header | [blocks/page-header/README.md](../../../blocks/page-header/README.md) |
| Cards | [blocks/cards/README.md](../../../blocks/cards/README.md) | Quote | [blocks/quote/README.md](../../../blocks/quote/README.md) |
| Column Break | [blocks/column-break/README.md](../../../blocks/column-break/README.md) | Separator | [blocks/separator/README.md](../../../blocks/separator/README.md) |
| Columns | [blocks/columns/README.md](../../../blocks/columns/README.md) | Tab | [blocks/tab/README.md](../../../blocks/tab/README.md) |
| Columns Container | [blocks/columns-container/README.md](../../../blocks/columns-container/README.md) | Table | [blocks/table/README.md](../../../blocks/table/README.md) |
| Conversation Canvas | [blocks/conversation-canvas/README.md](../../../blocks/conversation-canvas/README.md) | Table List | [blocks/table-list/README.md](../../../blocks/table-list/README.md) |
| Embed | [blocks/embed/README.md](../../../blocks/embed/README.md) | Tabs | [blocks/tabs/README.md](../../../blocks/tabs/README.md) |
| Filter List | [blocks/filter-list/README.md](../../../blocks/filter-list/README.md) | TCS Header | [blocks/tcs-header/README.md](../../../blocks/tcs-header/README.md) |
| Footer | [blocks/footer/README.md](../../../blocks/footer/README.md) | Teaser | [blocks/teaser/README.md](../../../blocks/teaser/README.md) |
| Form Variations | [blocks/form-variations/README.md](../../../blocks/form-variations/README.md) | Testimonial | [blocks/testimonial/README.md](../../../blocks/testimonial/README.md) |
| Fragment | [blocks/fragment/README.md](../../../blocks/fragment/README.md) | Video | [blocks/video/README.md](../../../blocks/video/README.md) |
| Gen Carousel | [blocks/gen-carousel/README.md](../../../blocks/gen-carousel/README.md) | Header | [blocks/header/README.md](../../../blocks/header/README.md) |
| Hero | [blocks/hero/README.md](../../../blocks/hero/README.md) | Interactive Dashboard | [blocks/interactive-dashboard/README.md](../../../blocks/interactive-dashboard/README.md) |

## Shared Code Documentation

| Document | Covers |
| --- | --- |
| [decorators/README.md](../../../decorators/README.md) | Every decorator module, its exports and users; the data layer contract |
| [utils/README.md](../../../utils/README.md) | Every util module, its exports and users; site data |
| [templates/README.md](../../../templates/README.md) | Site Global Templates, Page Types, adding a template |

## Handover

| Document | Covers | State |
| --- | --- | --- |
| [docs/handover/TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md) | The project handover (version 2.37, about 123,000 lines): Parts 1–18 from project overview and architecture to operations and new joiner training; Part 16 findings and open items | Current as a whole; the Part 6 component chapters predate later changes (F-84, F-107): the block READMEs follow the code |
| [docs/handover/TCS-CORP-HANDOVER.pdf](../TCS-CORP-HANDOVER.pdf) | The PDF built from the Markdown | Current (2.37) |
| [docs/handover/README.md](../README.md) | Part map and how the PDF is built (pandoc, typst, volumes) | Current; its Part 16 range (F-01 … F-98) predates F-99 … F-107 |
| [docs/handover/screenshots/README.md](../screenshots/README.md) | The handover figures (renderings, annotated previews, dialog references) | Current for version 2.0 figures |
| [AUTHOR-GUIDE.pdf](../AUTHOR-GUIDE.pdf), [DEVELOPER-GUIDE.pdf](../DEVELOPER-GUIDE.pdf), [ADMIN-GUIDE.pdf](../ADMIN-GUIDE.pdf) | Guides of 11 October 2026 | Deprecated: superseded by the handover |

Main handover parts by topic: Part 1 — Project Overview, Part 2 — Solution Architecture, Part 3 — Site Structure, Part 4 — Content Architecture, Part 5 — Authoring Fundamentals, Part 6 — Component Library, Parts 7–9 — Taxonomy, Metadata and Data Sheets, Part 10 — Error Pages, Part 11 — Analytics & Data Layer, Part 12 — Publishing, Deployment & Release, Part 13 — Global Troubleshooting Guide, Part 14 — Operational Runbook & AMS Handover, Part 15 — Appendix, Part 16 — Handover Findings and Open Items Register, Part 17 — Operations Guide, Part 18 — New Joiner Training Guide.

## Audit, Animation and Proposals

| Document | Covers |
| --- | --- |
| [docs/audit/README.md](../../audit/README.md) | Index of the audit documents |
| [docs/audit/BLOCK-ECOSYSTEM-AUDIT.md](../../audit/BLOCK-ECOSYSTEM-AUDIT.md) | Block ecosystem audit of 19 October 2026: runtime before / after, inventories, duplicates, accessibility, data layer, consent, personalization, blocked dependencies, defect register (D-x-n, L-n), migration |
| [docs/audit/BLOCK-SECTIONS.md](../../audit/BLOCK-SECTIONS.md) | One audit section per component |
| [docs/audit/REAUDIT-2026-10-20.md](../../audit/REAUDIT-2026-10-20.md) | Re-audit of 20 October 2026: re-verification, new defects (R-x-n), publication and live verification, blocked dependencies |
| [docs/audit/DIALOG-OPTIONS-2026-10-20.md](../../audit/DIALOG-OPTIONS-2026-10-20.md) | List Item, Teaser, Columns Container and Section dialog options |
| [docs/audit/blocks/](../../audit/blocks/group-a-card-lists.md), [docs/audit/reaudit/](../../audit/reaudit/review-a.md) | The four code reviews of each audit |
| [docs/audit/data/](../../audit/data/defect-register.csv) | CSV data: block inventory, dialog fields, defect and re-audit registers, runtime before / after |
| [docs/audit/tools/](../../audit/tools/harness.mjs) | The evidence scripts (workspace paths, Playwright; excluded from lint) |
| [docs/animation/README.md](../../animation/README.md) | Block animation and skeleton loading report: capability matrix, framework, authoring model, accessibility, performance, tests |
| [docs/proposals/README.md](../../proposals/README.md), [docs/proposals/cards-card-refactoring.md](../../proposals/cards-card-refactoring.md) | Design proposals; the Cards and Card refactoring is "For review", decisions D-1 to D-6 open |

## Configuration and Code Used as Reference

| File | Reference for |
| --- | --- |
| [fstab.yaml](../../../fstab.yaml), [paths.json](../../../paths.json), [xwalk.json](../../../xwalk.json) | Content source, path mappings, xwalk options |
| [helix-query.yaml](../../../helix-query.yaml), [helix-sitemap.yaml](../../../helix-sitemap.yaml) | Query index columns, sitemap |
| [head.html](../../../head.html), [404.html](../../../404.html), [.hlxignore](../../../.hlxignore) | CSP, preloads, error page, served files |
| [package.json](../../../package.json), [.eslintrc.js](../../../.eslintrc.js), [.stylelintrc.json](../../../.stylelintrc.json), [.github/workflows/main.yaml](../../../.github/workflows/main.yaml) | Scripts, lint rules, CI |
| [utils/site.js](../../../utils/site.js) | Locales and the language master review |
| [scripts/scripts.js](../../../scripts/scripts.js), [decorators/data-layer-decorator.js](../../../decorators/data-layer-decorator.js) | Page loading; data layer |

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

- [project-overview.md](./project-overview.md), [repository-structure.md](./repository-structure.md), [glossary.md](./glossary.md)
- [architecture.md](./architecture.md), [blocks.md](./blocks.md), [content-architecture.md](./content-architecture.md), [data-layer-and-analytics.md](./data-layer-and-analytics.md), [design-system.md](./design-system.md), [personalization.md](./personalization.md)
- Handover 15.3 Reference Documents: [TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md)
