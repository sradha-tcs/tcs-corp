---
id: "DEV-000"
title: "Developer Guide"
role: "Development"
topic: ""
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: ["AGENTS.md","package.json","scripts/scripts.js"]
relatedComponents: []
relatedPages: []
confidence: "High"
primary: true
---

# Developer Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-000 |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Entry point for developers: setup, workflow, standards, loading sequence, shared code, validation and where each topic is detailed |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | AGENTS.md, package.json, scripts/scripts.js |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Prerequisites](#prerequisites)
- [Workflow in short](#workflow-in-short)
- [Commands (results of 13 November 2026)](#commands-results-of-13-november-2026)
- [Main loading sequence](#main-loading-sequence)
- [Runtime architecture](#runtime-architecture)
- [Guides](#guides)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Prerequisites

- Node.js and npm (the versions of [package.json](https://github.com/sradha-tcs/tcs-corp/blob/main/package.json)); Git; access to the GitHub repository sradha-tcs/tcs-corp.
- Universal Editor access to the AEM Sites author for authoring checks (not required for code changes).

## Workflow in short

1. Read the knowledge base README and the topic pages for the area ([knowledge base](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/README.md)), then AGENTS.md.
2. Branch from `main` (`feature/`, `fix/`, `docs/`).
3. Change code, models (`npm run build:json`), imports (`npm run build:modules`), block docs (`npm run build:docs`).
4. Run `npm run lint` and `npm test`; report the real results.
5. Open a PR into `main` with a feature preview URL; checks green; a human merges.
6. **Update this documentation set** (docs/handover on migrated-page-content-edam) in the same change (see the documentation governance).

## Commands (results of 13 November 2026)

| Command | Purpose | Result in this program |
| --- | --- | --- |
| `npm run lint` | ESLint (Airbnb, json, xwalk model rules) and Stylelint | Passed (exit 0) on feature/keyword-action (PR #218) |
| `npm test` | Unit tests (Node test runner) | 394 of 396 passed, 2 failed: the 2 Form Variations motion tests (failing on main since the model change of 27 October) |
| `npm run build:json` | Aggregate the Universal Editor models | Passed; the Keywords field description of PR #218 committed |
| `npm run build:docs` | Generated sections of the block READMEs | Passed; no change to the committed files |
| `node docs/handover/knowledge-base/validate-knowledge-base.mjs` | Knowledge base structure and pointers | Passed (34 pages, nothing missing or failing) |
| `node capture.mjs (documentation program)` | Automated checks and screenshots of 200 reference pages at 4 widths | 8 November 2026: Completed: 200 pages, 800 screenshots |
| `node analyze-links.mjs (documentation program)` | Links of the published pages of the roots | 8 November 2026: Completed for the three roots |
| `perf.mjs (documentation program)` | Load timing and query index requests of a page | 8 November 2026: Before PR #203: index done after 18.4 s (24 requests, 1.37 MB); after: 2.9 s (9 parallel requests, 0.87 MB) on /language-masters/en, 1.1 s (1 request) on /design-block-master/en |

## Main loading sequence

## Runtime architecture

#### Three-phase loading

`loadPage()` in [`scripts/scripts.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/scripts.js) runs `loadEager`, then `loadLazy`, then `loadDelayed`.

| Phase | Steps (in code order) |
| --- | --- |
| Eager (`loadEager`) | `decorateHead()` (SEO head tags and `<html lang>`, `decorators/seo-decorator.js`); `trackInteractions()` (page entry and capture listeners, `decorators/data-layer-decorator.js`); `decorateTemplateAndTheme()`; `decoratePageType()` (Page Type body class); on the 404 page `loadErrorPage(main)`, else `loadTemplate(main)`; `decorateMain(main)`; `reserveHeaderSpace()`; `body.appear`; `preloadBlockModules(first section)`; `loadSection(first)` with `prepareMotion` and `waitForFirstImage` (LCP); `fonts.css` only at 900px and wider or when the session flag `fonts-loaded` is set |
| Lazy (`loadLazy`) | `autolinkModals` (links containing `/modals/` open the Modal block); `preloadBlockModules(main)` and of the chrome blocks (`header`, `footer`, `fragment`, `tcs-header`, `conversation-canvas`); `prefetchData(main)`; `loadHeader`; `loadFooter` (hidden until the sections have loaded); `loadMainSections` (each section with `prepareMotion`, RUM enhancement after the first); footer shown; `trackBlocks(main)`; `addErrorBackButton` on 404 pages; scroll to the URL hash; `lazy-styles.css`; `loadFonts()` |
| Delayed (`loadDelayed`) | After 3 seconds: `trackBlocks(document)` (header, footer, late blocks such as modals) and `import('./delayed.js')`. `scripts/delayed.js` contains only a comment (`// add delayed functionality here`) |

`decorateMain(main)` runs `decorateIcons` → `buildAutoBlocks` (an empty placeholder) → `decorateSectionsWithOptions` (section options, then the container sections Gen Carousel, Tabs Container and Columns Container wrapped in synthetic blocks) → `decorateBlocks` → `applyBlockOptions` (Additional tab) → `decorateButtons`.

`prefetchData(main)` starts the query index (`getPages`) and the taxonomy (`loadTaxonomy`) at the lazy phase only when the page has a `.list`, `.filter-list` or `.conversation-canvas`, and the redirects sheet (`loadRedirects`) only with a `.list`. It isn't run in the eager phase so it doesn't compete with the LCP image (code comment). See [indexing-and-search.md](../../01-architecture/markdown/INTEGRATION-ARCHITECTURE.md).

#### Block loading

From [`scripts/aem.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/aem.js):

- `decorateBlock(block)` adds `.block`, `data-block-name` (the first class), `data-block-status="initialized"`, wraps text nodes and adds `{name}-wrapper` to the parent.
- `loadBlock(block)` sets `loading`, loads `/blocks/{name}/{name}.css` and imports `/blocks/{name}/{name}.js` in parallel, awaits the default export, catches and logs errors (`failed to load module for {name}`, `failed to load block {name}`) and always ends with `data-block-status="loaded"`.
- `loadSection(section, callback)` loads the section's blocks one after another, runs the callback (here `prepareMotion`), then shows the section.

#### Module preloading

There is no bundler, so a module's imports are only discovered after it loads (AGENTS.md "Module preloading"). Two generated lists remove these round trips (`npm run build:modules`, [`tools/modules/generate-module-graph.mjs`](https://github.com/sradha-tcs/tcs-corp/blob/main/tools/modules/generate-module-graph.mjs)):

- `head.html` has `modulepreload` links for every module `scripts.js` imports (between `<!-- modulepreload -->` markers).
- [`scripts/module-graph.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/module-graph.js) lists, per block, the modules it imports beyond `scripts.js` and whether it has a stylesheet; `preloadBlockModules()` adds `modulepreload` links (head) and stylesheet `preload` links (body, because `loadCSS` skips a stylesheet already linked in the head).

`npm test` includes `test/modules/module-graph.test.mjs`; AGENTS.md states the tests fail when the lists are out of date.

#### Templates

`loadTemplate(main)` reads the Page Type (`page-type` metadata, else `template`) and, when it is one of `TEMPLATES = ['home', 'article', 'blog', 'press-release']`, imports `templates/{name}/{name}.js` and loads its CSS, then calls the default export with `main` before decoration. Failures are logged (`failed to load template {name}`) and the page continues. What each template adds: [templates/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/templates/README.md) and [content-architecture.md](../../01-architecture/markdown/CONTENT-ARCHITECTURE.md).

## Guides

- [Local development set-up](./LOCAL-DEVELOPMENT-SETUP.md)
- [Repository structure](./REPOSITORY-STRUCTURE.md)
- [Coding standards](./CODING-STANDARDS.md)
- [Design style guide](./DESIGN-STYLE-GUIDE.md)
- [Block development](./BLOCK-DEVELOPMENT-GUIDE.md)
- [Curated design page development](./CURATED-DESIGN-PAGE-DEVELOPMENT-GUIDE.md)
- [Content modeling](./CONTENT-MODELING-GUIDE.md)
- [Universal Editor models](./UNIVERSAL-EDITOR-MODEL-GUIDE.md)
- [Decorators and utilities](./DECORATORS-AND-UTILITIES-GUIDE.md)
- [Analytics data layer](./ANALYTICS-DATA-LAYER-GUIDE.md)
- [Accessibility](./ACCESSIBILITY-DEVELOPMENT-GUIDE.md)
- [Performance](./PERFORMANCE-DEVELOPMENT-GUIDE.md)
- [SEO](./SEO-DEVELOPMENT-GUIDE.md)
- [Unit testing](./UNIT-TESTING-GUIDE.md)
- [Debugging and troubleshooting](./DEBUGGING-TROUBLESHOOTING-GUIDE.md)
- [Pull request review checklist](./PULL-REQUEST-REVIEW-CHECKLIST.md)
- [Release and deployment](./RELEASE-AND-DEPLOYMENT-GUIDE.md)
- [Block inventory](../blocks/BLOCK-INVENTORY.md), [variation matrix](../blocks/BLOCK-VARIATION-MATRIX.md), [dependency matrix](../blocks/BLOCK-DEPENDENCY-MATRIX.md), [known limitations](../blocks/BLOCK-KNOWN-LIMITATIONS.md)
- [Curated page inventory](../curated-design-pages/CURATED-PAGE-INVENTORY.md)

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
