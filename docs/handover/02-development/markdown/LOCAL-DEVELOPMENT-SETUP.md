---
id: "DEV-001"
title: "Local Development Setup"
role: "Development"
topic: ""
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["AGENTS.md","package.json"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Local Development Setup

| Attribute | Value |
| --- | --- |
| Document ID | DEV-001 |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Setting up and running the site locally |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | AGENTS.md, package.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Install and run](#install-and-run)
- [Generated files](#generated-files)
- [Local development](#local-development)
- [Branches and feature previews](#branches-and-feature-previews)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Install and run

1. `git clone` the repository and `npm install`.
2. Start the dev server: `npx -y @adobe/aem-cli up --no-open --forward-browser-logs` (or `aem up` after `npm install -g @adobe/aem-cli`); it serves http://localhost:3000 with the local code and the previewed content.
3. Content without an authored page: static HTML in a `drafts/` folder and `--html-folder drafts`.
4. Inspect delivered markup: `curl http://localhost:3000/<path>`, `.md` and `.plain.html`.

## Generated files

| Command | Regenerates | When |
| --- | --- | --- |
| npm run build:json | component-models.json, component-definition.json, component-filters.json | after any _&lt;block&gt;.json or models/ change |
| npm run build:modules | head.html modulepreload links, scripts/module-graph.js | after adding, removing or changing an import |
| npm run build:docs | generated sections of blocks/README.md and block READMEs | after a model change or a new block |
| npm run build:paths | paths.json | after a LOCALES or REVIEW_ROOTS change |

## Local development

| Task | Command | Notes |
| --- | --- | --- |
| Install dependencies | `npm install` | Also installs the Husky pre-commit hook (`prepare: husky`) |
| Start the dev server | `npx -y @adobe/aem-cli up --no-open --forward-browser-logs` (or `aem up` with the CLI installed globally) | `http://localhost:3000`: local code, previewed content |
| Serve static test content | Add `--html-folder drafts` | Files in `drafts/` (`.html` or `.plain.html`); 14 files are tracked |
| Lint | `npm run lint` (`lint:js`: ESLint on `.json`, `.js`, `.mjs`; `lint:css`: Stylelint on `blocks/**/*.css`, `styles/*.css`) | `npm run lint:fix` fixes what it can |
| Unit tests | `npm test` (`node --test 'test/**/*.test.mjs'`) | Pure modules, model layout, docs, module graph |
| Rebuild the Universal Editor files | `npm run build:json` | `component-models.json`, `component-definition.json`, `component-filters.json` from the partials |
| Regenerate the path mapping | `npm run build:paths` | After changing `LOCALES` in [utils/site.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/site.js); commit both |
| Regenerate the module graph | `npm run build:modules` | [tools/modules/generate-module-graph.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/tools/modules/generate-module-graph.mjs), used for module preloading |
| Regenerate block READMEs | `npm run build:docs` | Generated sections of the block READMEs ([blocks/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/README.md#maintaining-this-documentation)) |

Inspect delivered content with `curl http://localhost:3000/{path}`, `.md` and `.plain.html` ([AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#content)). Node.js: [README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/README.md) states 20 or newer; the workflows install Node 24. The local preview renderer used by the audits (`.home-work/render-lib.mjs`, named in [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#blocks)) is not tracked in Git.

## Branches and feature previews

- `main` is production. Changes go through short-lived branches merged with pull requests (130 merge commits on `main` at 2d06316, latest #129).
- Branch prefixes in use: `feature/`, `feat/`, `fix/`, `perf/`, `docs/` (for example `fix/block-reaudit`, `perf/module-preload`, `docs/block-readmes`). The handover's `feature/tcs-<topic>` convention (12.2.2) is not what recent history uses; no naming rule is enforced.
- AEM Code Sync serves every pushed branch at `https://{branch}--tcs-corp--sradha-tcs.aem.page/` (slashes become hyphens; keep names short and lower case: branch, repository and owner form the host name).

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
