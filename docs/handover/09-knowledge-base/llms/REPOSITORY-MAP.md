---
id: "KB-L-003"
title: "Repository Map"
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

# Repository Map

| Attribute | Value |
| --- | --- |
| Document ID | KB-L-003 |
| Audience | Every role, AI agents, LLM retrieval |
| Purpose | Folders and what they contain |
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

- [Tracked Tree](#tracked-tree)
- [Generated Files](#generated-files)
- [What Is Served](#what-is-served)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Tracked Tree

Only paths tracked by Git (file counts from `git ls-files`):

```text
.
├── .agents/settings.json          agent tooling: enabled plugins
├── .editorconfig                  indentation (js / json 2, css 4)
├── .eslintignore                  lint exclusions (*.min.js, dompurify)
├── .eslintrc.js                   ESLint: airbnb-base, json, xwalk model rules (max-cells)
├── .github/
│   ├── pull_request_template.md   boilerplate PR template ({repo} / {owner} not substituted)
│   └── workflows/
│       ├── main.yaml              "Build": npm ci + npm run lint on every push
│       └── cleanup-on-create.yaml boilerplate clean-up on repository creation
├── .gitignore                     .hlx, coverage, logs, node_modules, helix-importer-ui, ...
├── .hlxignore                     files not served by Edge Delivery (dot files, *.md, docs/*, test/*, _*, ...)
├── .husky/pre-commit(.mjs)        rebuilds component-*.json when a _*.json partial is staged
├── .migration/project.json        migration tooling project metadata (site, assets folder)
├── .renovaterc.json               Renovate: dev dependencies auto-merged, ESLint pinned to v8
├── .stylelintrc.json              stylelint-config-standard
├── .well-known/adobe/             Cloud Manager challenge file
├── 404.html                       the 404 page (loads the authored, inherited error page)
├── AGENTS.md / CLAUDE.md          project rules for agents and developers (CLAUDE.md points to AGENTS.md)
├── CODE_OF_CONDUCT.md, CONTRIBUTING.md, LICENSE, README.md   boilerplate files (Apache 2.0)
├── blocks/                        30 block folders + README.md (125 files)
├── component-definition.json      generated: Universal Editor palette
├── component-filters.json         generated: what each container accepts
├── component-models.json          generated: dialog fields
├── decorators/                    28 decorator modules + README.md
├── docs/                          not served: handover/knowledge-base/ (this knowledge base); the handover, audit,
│                                  blocks report, animation, proposals and EDAM set-up are on the branch
│                                  migrated-page-content-edam under docs/ (KB-D-066)
├── drafts/                        14 tracked local-preview drafts (header / Canvas journey pages, 2 logos)
├── favicon.ico
├── fonts/inter-variable.woff2     self-hosted Inter variable font
├── fstab.yaml                     content source: AEM author via the xwalk delivery bridge
├── head.html                      CSP, aem.js / scripts.js, styles.css, generated modulepreload links
├── helix-query.yaml               query index definition (/query-index.json)
├── helix-sitemap.yaml             sitemap (/sitemap.xml) from the query index
├── icons/                         22 SVG icons
├── models/                        default content, page, section and shared models (_*.json)
├── package.json / package-lock.json   scripts and dev dependencies (no runtime dependencies)
├── paths.json                     generated: AEM path -> published path mappings, includes, excludes
├── scripts/                       aem.js, scripts.js, delayed.js, editor support, module graph, vendored libs
├── styles/                        styles.css, lazy-styles.css, fonts.css, motion.css, card-list.css
├── templates/                     home, article, blog, press-release + README.md
├── test/                          unit tests (node --test) and helpers
├── tools/                         docs, modules and paths generators; sidekick config
├── utils/                         26 util modules + README.md
├── well-known/adobe/              Cloud Manager challenge file (second copy, without the dot)
└── xwalk.json                     xwalk site option: multi-field enabled
```

## Generated Files

| Output | Generator | Command | Checked by |
| --- | --- | --- | --- |
| `component-definition.json`, `component-models.json`, `component-filters.json` | `merge-json-cli` over `models/_component-*.json` | `npm run build:json` (and the pre-commit hook) | `npm run lint` (xwalk rules) |
| `paths.json` | [tools/paths/generate-paths.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/tools/paths/generate-paths.mjs) | `npm run build:paths` | Not tested |
| `head.html` modulepreload block, `scripts/module-graph.js` | [tools/modules/generate-module-graph.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/tools/modules/generate-module-graph.mjs) | `npm run build:modules` | [test/modules/module-graph.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/modules/module-graph.test.mjs) |
| Generated sections of `blocks/README.md` and the block READMEs | [tools/docs/generate-block-docs.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/tools/docs/generate-block-docs.mjs) | `npm run build:docs` | [test/docs/block-docs.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/docs/block-docs.test.mjs) |
| `docs/blocks/BLOCK-DOCUMENTATION-REPORT.md` | [tools/docs/report-block-docs.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/tools/docs/report-block-docs.mjs) | `node tools/docs/report-block-docs.mjs` | — |
| Handover PDF | Local scripts in `.handover-work/` (pandoc, typst) | See [docs/handover/README.md](https://github.com/sradha-tcs/tcs-corp/blob/migrated-page-content-edam/docs/handover/README.md) | — |

## What Is Served

Edge Delivery serves the code bus of each branch minus [.hlxignore](https://github.com/sradha-tcs/tcs-corp/blob/main/.hlxignore): `blocks/`, `scripts/`, `styles/`, `decorators/`, `utils/`, `templates/`, `fonts/`, `icons/`, `drafts/`, the root HTML / JSON / YAML files and `favicon.ico`. Not served: Markdown (all READMEs and `AGENTS.md`), `docs/`, `test/`, `_*` model partials, `package*.json`, `LICENSE` and dot files and folders. Everything served is public client-side code: no secrets, keys or environment identifiers belong anywhere in the repository.

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
