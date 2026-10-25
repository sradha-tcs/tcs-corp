# Repository Structure

This page maps the repository `sradha-tcs/tcs-corp` as it is tracked in Git: every top-level folder and root file, what belongs in it and what must not, who uses it, what it depends on, how it changes over time, and what testing and documentation each change needs. It also lists the local working folders that exist in the delivery workspace but are not in Git. Rules are summarized from [AGENTS.md](../../../AGENTS.md) and the folder READMEs, which stay authoritative.

| Attribute | Value |
| --- | --- |
| Audience | Developers, architects, reviewers, release and AMS teams, AI agents |
| Source of truth | `git ls-files` at commit 2d06316, [AGENTS.md](../../../AGENTS.md), [package.json](../../../package.json), [.hlxignore](../../../.hlxignore), [.eslintrc.js](../../../.eslintrc.js), folder READMEs |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 |
| Status | Current (ownership of folders: not recorded) |

## Tracked Tree

Only paths tracked by Git (file counts from `git ls-files`):

```text
.
├── .agents/settings.json          agent tooling: enabled plugins
├── .editorconfig                  indentation (js / json 2, css 4)
├── .eslintignore                  lint exclusions (*.min.js, dompurify, docs/audit/tools)
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
├── docs/                          not served: handover, audit, blocks report, animation, proposals (691 files)
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
├── tools/                         docs, modules and paths generators; sidekick config; importer (content migration)
├── utils/                         26 util modules + README.md
├── well-known/adobe/              Cloud Manager challenge file (second copy, without the dot)
└── xwalk.json                     xwalk site option: multi-field enabled
```

## Local Folders, Not in Git

These exist in the delivery workspace but are not tracked. Except `node_modules/` (in [.gitignore](../../../.gitignore)), they are ignored only by the workspace's local `.git/info/exclude`, so a fresh clone would not ignore them: don't add them to commits.

| Path | What it holds (observed) | Note |
| --- | --- | --- |
| `.home-work/` | Delivery workspace scripts: the local library preview renderer (`render-lib.mjs`, referenced by AGENTS.md), package builders, reports, Figma crops, fixtures | Local, not in git. `tools/docs/library-snapshot.json` keeps the block library data the docs generator needs from it |
| `.handover-work/` | Handover build scripts (`build-volumes.mjs`, `build-index.mjs`, `compile-pdf.sh`, `typst-watch.sh`) and working notes | Local, not in git; described in [docs/handover/README.md](../README.md) |
| `content/` | Local content and guide workspace: earlier guides (Markdown and PDF), the whitepaper template, local content (`content`, `en`, `language-master`, `home-implementation`) | Local, not in git |
| `en/` | Local `/en` preview content (`data`, `media`, `references`, `shots`, `taxonomy.json`) | Local, not in git |
| `migration-work/` | Content package workspace (`jcr-content`, `packages`, `profile.json`) | Local, not in git |
| `drafts/dam/`, `drafts/en/`, `drafts/language-master/` | Local preview content beside the 14 tracked drafts | Local, not in git |
| `query-index.json` | A local copy of the query index for the dev server | Local, not in git |
| `node_modules/` | `npm install` output | Ignored by `.gitignore` |
| `.claude/`, `.claude-plugin/` | Agent runtime and plugin configuration | Local, not in git |

## Ownership

No ownership is recorded in the repository: there is no `CODEOWNERS` file, and the handover's ownership matrix (1.11) names roles only (code: Development Lead accountable and responsible; component models: Development Lead; site configuration: Site Administrator), with every name "To be confirmed" (open item O-01). The tables below therefore give no owner per folder.

## Folders

### blocks/

| Aspect | Rule |
| --- | --- |
| Purpose | One folder per block, section container, child item or compatibility block (30 folders; inventory and status in [blocks/README.md](../../../blocks/README.md)) |
| Belongs | `{block}.js` (default export `decorate(block)`), `{block}.css`, `_{block}.json` (definitions, models, filters for Universal Editor), `README.md`; pure, unit-tested helpers of that block only (`list/list-data.js`, `cards/cards-data.js`, `separator/separator-config.js`, `conversation-canvas/canvas-journey.js`, `conversation-canvas/canvas-controller.js`). `header/` has no model (built from the nav page) |
| Must not | Shared behaviour (goes to `decorators/` or `utils/`); unscoped selectors or `{block}-container` / `{block}-wrapper` classes; px / em sizes (rem only, breakpoints in px); hard-coded UI text (placeholders); own click pushes to the data layer (describe clicks with `data-cmp-*`); sample content in templates or model defaults; Canvas logic in `header` or `footer` |
| Consumers | `loadBlock` in [scripts/aem.js](../../../scripts/aem.js) (by block class), `npm run build:json` (aggregation into `component-*.json`), [tools/modules/generate-module-graph.mjs](../../../tools/modules/generate-module-graph.mjs), [tools/docs/generate-block-docs.mjs](../../../tools/docs/generate-block-docs.mjs) |
| Dependencies | `decorators/`, `utils/`, `styles/` tokens (and `styles/card-list.css` for List and Cards), `models/_card-list.json` (shared List / Cards fields), placeholders, query index and sheets at runtime |
| Lifecycle | Status in [tools/docs/blocks.json](../../../tools/docs/blocks.json): Active, Compatibility-only (Columns), Experimental (Interactive Dashboard). A replaced component keeps its definition so content authored before stays editable (Columns, Button (basic)); model changes must respect the AEM delivery rules in [AGENTS.md](../../../AGENTS.md) |
| Testing and documentation | `npm run lint` (ESLint incl. xwalk model rules, Stylelint); `npm test` for pure modules, block names ([test/models/block-names.test.mjs](../../../test/models/block-names.test.mjs)), item rows and docs; block library pages; compare aem.page with the local preview after model changes. After a model change: `npm run build:json`, `npm run build:docs`; after an import change: `npm run build:modules`. Update the block README (written sections) and, for significant changes, the handover |

### models/

| Aspect | Rule |
| --- | --- |
| Purpose | Models that are not a block's: page properties (`_page.json`: Title, Description, Keywords, Page Type, Navigation, Footer, 404 Page), section (`_section.json`), built-in default content (`_text.json`, `_title.json`, `_image.json`, `_button.json` with "Button (basic)"), shared field groups (`_card-list.json`), and the three aggregators `_component-definition.json`, `_component-models.json`, `_component-filters.json` |
| Belongs | Universal Editor JSON partials (file names start with `_`, so `.hlxignore` keeps them off the site) |
| Must not | Block models (they live in `blocks/{block}/_{block}.json`); hand edits to the generated root `component-*.json` instead of the partials |
| Consumers | `npm run build:json` (`merge-json-cli`), the Husky pre-commit hook, Universal Editor (through the generated files), [templates/README.md](../../../templates/README.md) (adding a Page Type) |
| Dependencies | The block partials (`../blocks/*/_*.json`), referenced by the aggregators |
| Lifecycle | Page Type options must match `TEMPLATES` in [scripts/scripts.js](../../../scripts/scripts.js); the main filter lists `section`, `gen-carousel`, `tabs`, `columns-container` |
| Testing and documentation | `npm run lint` (xwalk rules, `max-cells` per model in [.eslintrc.js](../../../.eslintrc.js)); handover 15.4 Content Modeling Standards |

### scripts/

| Aspect | Rule |
| --- | --- |
| Purpose | Page decoration and loading: [aem.js](../../../scripts/aem.js) (core library, `sampleRUM`, `loadBlock`, `loadCSS`), [scripts.js](../../../scripts/scripts.js) (eager / lazy / delayed phases, templates, section containers, error page, preloading, data prefetch), [delayed.js](../../../scripts/delayed.js) (empty; the place for martech), [editor-support.js](../../../scripts/editor-support.js) and [editor-support-rte.js](../../../scripts/editor-support-rte.js) (Universal Editor live updates), [module-graph.js](../../../scripts/module-graph.js) (generated), vendored `dompurify.min.js` and `lib/lottie/` |
| Belongs | Global page lifecycle code and vendored third-party libraries |
| Must not | Changes to `aem.js` (never modified); block-specific logic; edits to the generated `module-graph.js` |
| Consumers | `head.html` (loads `aem.js` and `scripts.js`), `404.html`, Universal Editor (editor support), every block |
| Dependencies | `decorators/`, `utils/`, `templates/`, `styles/` |
| Lifecycle | `module-graph.js` regenerated by `npm run build:modules`; vendored libraries updated by hand (not by Renovate) |
| Testing and documentation | [test/modules/module-graph.test.mjs](../../../test/modules/module-graph.test.mjs) checks the generated preload lists; [AGENTS.md](../../../AGENTS.md#three-phase-page-loading) (three-phase loading, module preloading) |

### styles/

| Aspect | Rule |
| --- | --- |
| Purpose | [styles.css](../../../styles/styles.css) (tokens, LCP-critical global styles, fallback font faces, Additional tab classes, section backgrounds and the dark-background theme contract), [lazy-styles.css](../../../styles/lazy-styles.css) (post-LCP), [fonts.css](../../../styles/fonts.css) (Inter), [motion.css](../../../styles/motion.css) (loaded only when a block animates), [card-list.css](../../../styles/card-list.css) (shared by List and Cards) |
| Belongs | Global styles and design tokens |
| Must not | Block-specific styles (in the block's CSS); colours defined for animations; primitives instead of tokens for text colours in new rules |
| Consumers | `head.html`, `scripts.js` (`loadCSS` of fonts and lazy styles), `decorators/motion-decorator.js`, the List and Cards CSS |
| Dependencies | `fonts/inter-variable.woff2` |
| Lifecycle | Keep the fallback font faces when changing the font (CLS) |
| Testing and documentation | `npm run lint:css` lints `blocks/**/*.css` and `styles/*.css` (not `templates/`); check the theme on the block library page "Sections: colours with blocks" |

### decorators/ and utils/

| Aspect | Rule |
| --- | --- |
| Purpose | Shared single-purpose modules: `decorators/` create or decorate elements (28 modules: buttons, links, headings, images, media, data layer, motion, skeletons, SEO, ...); `utils/` build no UI (26 modules: site and locales, metadata, placeholders, taxonomy, data sheets, query index, properties, cells, ids, environment, privacy, ...) |
| Belongs | One purpose per file; exports listed in [decorators/README.md](../../../decorators/README.md) and [utils/README.md](../../../utils/README.md) |
| Must not | Imports from `decorators/` in `utils/` (utils never import decorators); block re-implementations of shared behaviour |
| Consumers | Blocks, templates, `scripts.js`, `editor-support.js` (the "Used by" column of each README) |
| Dependencies | `scripts/aem.js`; site data at runtime (placeholders, taxonomy, sheets, query index) |
| Lifecycle | New shared behaviour goes here, not into a block; update the README's table with the export and its users |
| Testing and documentation | Unit tests for pure modules ([test/privacy/privacy.test.mjs](../../../test/privacy/privacy.test.mjs), [test/motion/motion.test.mjs](../../../test/motion/motion.test.mjs), [test/site/index-root.test.mjs](../../../test/site/index-root.test.mjs), [test/items/item-rows.test.mjs](../../../test/items/item-rows.test.mjs), [test/media/vimeo-url.test.mjs](../../../test/media/vimeo-url.test.mjs)); the folder README |

### templates/

| Aspect | Rule |
| --- | --- |
| Purpose | Code of the Site Global Templates, loaded by Page Type: `home`, `article`, `blog`, `press-release` ([templates/README.md](../../../templates/README.md)) |
| Belongs | `templates/{name}/{name}.js` (default export gets `main` before decoration) and `{name}.css` |
| Must not | LCP content built by code (keep it authored); blocking sheet loads (use `appendLoadedSection`) |
| Consumers | `loadTemplate` in [scripts/scripts.js](../../../scripts/scripts.js) (names in `TEMPLATES`) |
| Dependencies | `decorators/template-decorator.js`, `author-bio-decorator.js`; the Authors sheet (the media contacts are the Media Contacts block, KB-D-054) |
| Lifecycle | A new template needs its AEM template page, the code, a `TEMPLATES` entry and a Page Type option in `models/_page.json` |
| Testing and documentation | `npm run lint:js` (CSS here is not in the Stylelint globs); [templates/README.md](../../../templates/README.md) |

### test/

| Aspect | Rule |
| --- | --- |
| Purpose | Unit tests run by `npm test` (`node --test 'test/**/*.test.mjs'`): cards, conversation-canvas (journey), docs, items, list (data, display precedence, query-index tags), media, models, modules, motion, privacy, separator, site; helpers `test/model-layout.mjs` and `test/list/fixtures.mjs` |
| Belongs | Tests of pure modules (no browser) and repository consistency checks |
| Must not | Browser or network tests; tests that need AEM author access |
| Consumers | Developers; not run by CI ([.github/workflows/main.yaml](../../../.github/workflows/main.yaml) runs lint only) |
| Dependencies | The modules under test, the models, `tools/docs/` |
| Lifecycle | Keep item layouts (`ITEM_LAYOUT`, `CARD_LAYOUT`) and their tests in step with model tabs |
| Testing and documentation | ESLint override for `test/**/*.mjs` (Node globals); not served (`test/*` in `.hlxignore`) |

### tools/

| Path | Purpose | Run |
| --- | --- | --- |
| [tools/paths/generate-paths.mjs](../../../tools/paths/generate-paths.mjs) | Generates `paths.json` from `LOCALES` (plus the temporary `REVIEW` block for the language master) | `npm run build:paths` after changing `LOCALES`; then apply the mappings to the site configuration |
| [tools/modules/generate-module-graph.mjs](../../../tools/modules/generate-module-graph.mjs) | Generates the `head.html` modulepreload links and `scripts/module-graph.js` | `npm run build:modules` after an import change |
| [tools/docs/generate-block-docs.mjs](../../../tools/docs/generate-block-docs.mjs) | Rewrites the generated sections of `blocks/README.md` and the block READMEs | `npm run build:docs` after a model change |
| [tools/docs/validate-block-docs.mjs](../../../tools/docs/validate-block-docs.mjs) | Validates the block READMEs (structure, links, anchors, no environment ids) | Used by `test/docs` |
| [tools/docs/report-block-docs.mjs](../../../tools/docs/report-block-docs.mjs) | Builds [docs/blocks/BLOCK-DOCUMENTATION-REPORT.md](../../blocks/BLOCK-DOCUMENTATION-REPORT.md) | `node tools/docs/report-block-docs.mjs [base-ref]` |
| [tools/docs/blocks.json](../../../tools/docs/blocks.json), [tools/docs/library-snapshot.json](../../../tools/docs/library-snapshot.json) | Hand-maintained block metadata (status, type, purpose); block library snapshot (package 1.0.13) for examples and usage | Inputs of the docs generator |
| [tools/sidekick/config.json](../../../tools/sidekick/config.json) | AEM Sidekick configuration ("AEM Editor" edit URL pattern) | Read by Sidekick |
| [tools/importer/](../../../tools/importer/README.md) | tcs.com content migration: inventory, page templates, import scripts, parsers, transformers, reference comparison, content package builder (not served) | Per migration wave, see [docs/migration/README.md](../../migration/README.md) |

Generated output must not be edited by hand; every generator is checked by `npm test` except `generate-paths.mjs`.

### docs/

| Aspect | Rule |
| --- | --- |
| Purpose | Project documentation, not served (`docs/*` in `.hlxignore`): [handover/](../README.md) (handover Markdown and PDF, earlier guides, 629 screenshot files, this knowledge base), [audit/](../../audit/README.md) (block ecosystem audit, re-audit, dialog options report, CSV data, evidence tools), [blocks/](../../blocks/BLOCK-DOCUMENTATION-REPORT.md) (documentation report and per-block review notes), [animation/](../../animation/README.md), [proposals/](../../proposals/README.md) |
| Belongs | Reports, proposals, handover sources, evidence |
| Must not | Code the site loads; secrets or environment identifiers |
| Consumers | Project and support teams; `tools/docs/` (screenshots) |
| Lifecycle | Update the handover's component chapter, Part 16 and revision history for significant changes, then regenerate the PDF ([docs/handover/README.md](../README.md)) |
| Testing and documentation | `docs/audit/tools` is excluded from ESLint ([.eslintignore](../../../.eslintignore)) |

### drafts/, fonts/, icons/

| Path | Purpose | Rule |
| --- | --- | --- |
| `drafts/` | 14 tracked static pages for the local dev server (`aem up --html-folder drafts`): Canvas journey, header and nav drafts, two logo images | Test content only; not authored content. Whether these files are reachable on the code bus is not verified (`drafts/` is not in `.hlxignore`) |
| `fonts/` | `inter-variable.woff2` | Optimised assets only |
| `icons/` | 22 SVG icons (arrows, chevrons, social, media controls) rendered by `decorateIcons` (`scripts/aem.js`, called from `decorateMain`) and used by the button and icon decorators | Optimised SVGs only |

## Root Configuration Files

| File | Purpose | Consumers | Change rule |
| --- | --- | --- | --- |
| [fstab.yaml](../../../fstab.yaml) | Content source: one mount point `/` to the AEM author's xwalk delivery bridge (`bin/franklin.delivery/sradha-tcs/tcs-corp/main`), type `markup`, suffix `.html` | Edge Delivery Services | Only with the platform administrator; assumption: no other mount points (handover 1.8) |
| [paths.json](../../../paths.json) | 42 mappings (13 locale folders, 13 locale Home pages, 13 taxonomy pages, 3 for the language master review; sheets covered by the folder mappings), 15 includes (13 locale pages, `/content/dam/tcs-corp/`, the language master root), 28 excludes (13 block libraries and Site Global Templates, each as page and subtree) | AEM uses the site configuration's `public.json` → `paths`, not this file | Generated: `npm run build:paths`; never edit by hand; apply to the site configuration after a change |
| [helix-query.yaml](../../../helix-query.yaml) | Query index `/query-index.json`: includes `/**`; excludes `.json`, `references/`, `error-pages/`, `data/`, nav / footer, block libraries, templates, fragments, modals; indexes the metadata columns | List, Filter List, Conversation Canvas menus ([utils/query-index.js](../../../utils/query-index.js)); the sitemap | Add a property when a block needs a new metadata column; reindex after changes |
| [helix-sitemap.yaml](../../../helix-sitemap.yaml) | `/sitemap.xml` from `/query-index.json`, `lastmod` YYYY-MM-DD, origin the `main--tcs-corp--sradha-tcs.aem.live` host until a production domain exists | Search engines | Replace the origin when the production domain is configured |
| [head.html](../../../head.html) | Content Security Policy (`script-src 'nonce-aem' 'strict-dynamic' ...`, moved to an HTTP header), viewport, `aem.js`, `scripts.js`, `styles.css`, the generated modulepreload block | Every page | The block between `<!-- modulepreload -->` markers is generated by `npm run build:modules`; no external scripts |
| [404.html](../../../404.html) | The 404 page: same CSP, `sampleRUM('404')` with the referrer, built-in fallback content replaced by the inherited authored 404 page (`loadErrorPage` in `scripts.js`) | Edge Delivery (served for missing pages) | Keep the built-in content as the last fallback |
| [xwalk.json](../../../xwalk.json) | xwalk option `multi-field` enabled | Universal Editor / xwalk delivery | — |
| [component-definition.json](../../../component-definition.json), [component-models.json](../../../component-models.json), [component-filters.json](../../../component-filters.json) | The Universal Editor palette, dialogs and container filters | Universal Editor | Generated by `npm run build:json` from `models/_component-*.json` and `blocks/*/_*.json` (also by the pre-commit hook); never edit by hand |
| [package.json](../../../package.json) | Scripts (`lint`, `lint:js`, `lint:css`, `lint:fix`, `test`, `build:json`, `build:paths`, `build:modules`, `build:docs`, `prepare`) and dev dependencies only | Developers, CI, Renovate | Name, version (`1.3.0`) and repository URL are still the boilerplate's |
| [.eslintrc.js](../../../.eslintrc.js) | Airbnb base, JSON and xwalk recommended rules; `.js` extensions in imports; Unix line breaks; `xwalk/max-cells` limits per model (default 4; e.g. `columns-container` 22, `tabs` 21, `list-item` 19, `card` 16) | `npm run lint:js` (`.json`, `.js`, `.mjs`) | Raise a `max-cells` limit only with the model change that needs it |
| [.stylelintrc.json](../../../.stylelintrc.json) | `stylelint-config-standard` | `npm run lint:css` | — |
| [.eslintignore](../../../.eslintignore) | `helix-importer-ui`, `dompurify.min.js`, `*.min.js`, `docs/audit/tools` | ESLint | — |
| [.hlxignore](../../../.hlxignore) | Not served: `.*`, `*.md`, `karma.config.js`, `LICENSE`, `package.json`, `package-lock.json`, `test/*`, `_*`, `docs/*` | Edge Delivery code bus | Add any file that must not be public |
| [.editorconfig](../../../.editorconfig) | Indent 2 for `.js` / `.json`, 4 for `.css` | Editors | — |
| [.gitignore](../../../.gitignore) | `.hlx/*`, `coverage/*`, `logs/*`, `node_modules/*`, `helix-importer-ui`, `.DS_Store`, `*.bak`, `.idea`; keeps `CLAUDE.md`, `AGENTS.md` tracked | Git | Workspace folders are excluded only locally (see above) |
| [.github/workflows/main.yaml](../../../.github/workflows/main.yaml) | "Build": checkout, Node 24 (the step is labelled "Use Node.js 20"), `npm ci`, `npm run lint` on every push | GitHub Actions | Unit tests are not run in CI |
| [.github/workflows/cleanup-on-create.yaml](../../../.github/workflows/cleanup-on-create.yaml) | Boilerplate workflow that removes template helper files when a repository is created from the template (or on manual dispatch) | GitHub Actions | Boilerplate leftover; Unused candidate |
| [.github/pull_request_template.md](../../../.github/pull_request_template.md) | Issue and before / after test URLs; `{repo}` / `{owner}` were never substituted | Pull requests | — |
| [.husky/pre-commit](../../../.husky/pre-commit), [.husky/pre-commit.mjs](../../../.husky/pre-commit.mjs) | When a `_*.json` partial is staged, runs `npm run build:json` and stages the three `component-*.json` | Git commits (installed by `npm install` through `prepare`) | — |
| [.renovaterc.json](../../../.renovaterc.json) | `config:recommended`; dev dependencies labelled `ignore-psi-check` and auto-merged; ESLint allowed `^8.0.0` | Renovate | — |
| [tools/sidekick/config.json](../../../tools/sidekick/config.json) | Sidekick project "AEM XWalk Boilerplate", edit URL label "AEM Editor" | AEM Sidekick | — |
| [.migration/project.json](../../../.migration/project.json), [.agents/settings.json](../../../.agents/settings.json) | Migration and agent tooling metadata (site names, assets folder, enabled agent plugins) | Delivery tooling, not the site | Not served (dot folders) |
| [.well-known/adobe/](../../../.well-known/adobe/cloud-manager-challenge), [well-known/adobe/](../../../well-known/adobe/cloudmanager-challenge.txt) | Cloud Manager challenge files (added on 10 October 2026); contents not reproduced here | Adobe Cloud Manager | Requires validation: `.hlxignore` (`.*`) keeps the dot folder off the code bus |
| [AGENTS.md](../../../AGENTS.md), [CLAUDE.md](../../../CLAUDE.md) | Verified project rules; `CLAUDE.md` contains only `see @AGENTS.md` | Developers and AI agents | Update with significant changes |
| [README.md](../../../README.md), [CONTRIBUTING.md](../../../CONTRIBUTING.md), [CODE_OF_CONDUCT.md](../../../CODE_OF_CONDUCT.md), [LICENSE](../../../LICENSE) | Boilerplate texts (README still "Your Project's Title..."; CONTRIBUTING refers to Project Helix and an `npm run commit` script that doesn't exist); Apache License 2.0 | — | Requires validation: project-specific README not written |

## Generated Files

| Output | Generator | Command | Checked by |
| --- | --- | --- | --- |
| `component-definition.json`, `component-models.json`, `component-filters.json` | `merge-json-cli` over `models/_component-*.json` | `npm run build:json` (and the pre-commit hook) | `npm run lint` (xwalk rules) |
| `paths.json` | [tools/paths/generate-paths.mjs](../../../tools/paths/generate-paths.mjs) | `npm run build:paths` | Not tested |
| `head.html` modulepreload block, `scripts/module-graph.js` | [tools/modules/generate-module-graph.mjs](../../../tools/modules/generate-module-graph.mjs) | `npm run build:modules` | [test/modules/module-graph.test.mjs](../../../test/modules/module-graph.test.mjs) |
| Generated sections of `blocks/README.md` and the block READMEs | [tools/docs/generate-block-docs.mjs](../../../tools/docs/generate-block-docs.mjs) | `npm run build:docs` | [test/docs/block-docs.test.mjs](../../../test/docs/block-docs.test.mjs) |
| `docs/blocks/BLOCK-DOCUMENTATION-REPORT.md` | [tools/docs/report-block-docs.mjs](../../../tools/docs/report-block-docs.mjs) | `node tools/docs/report-block-docs.mjs` | — |
| Handover PDF | Local scripts in `.handover-work/` (pandoc, typst) | See [docs/handover/README.md](../README.md) | — |

## What Is Served

Edge Delivery serves the code bus of each branch minus [.hlxignore](../../../.hlxignore): `blocks/`, `scripts/`, `styles/`, `decorators/`, `utils/`, `templates/`, `fonts/`, `icons/`, `drafts/`, the root HTML / JSON / YAML files and `favicon.ico`. Not served: Markdown (all READMEs and `AGENTS.md`), `docs/`, `test/`, `_*` model partials, `package*.json`, `LICENSE` and dot files and folders. Everything served is public client-side code: no secrets, keys or environment identifiers belong anywhere in the repository.

## Related

- [project-overview.md](./project-overview.md): project scope, locales, delivery model and stack
- [glossary.md](./glossary.md): terms used on this page
- [references.md](./references.md): every repository document and cited Adobe page
- [architecture.md](./architecture.md), [blocks.md](./blocks.md), [content-architecture.md](./content-architecture.md), [data-layer-and-analytics.md](./data-layer-and-analytics.md), [design-system.md](./design-system.md), [personalization.md](./personalization.md): the other knowledge base topics
- [AGENTS.md](../../../AGENTS.md): project structure, setup commands, code style
- [blocks/README.md](../../../blocks/README.md), [decorators/README.md](../../../decorators/README.md), [utils/README.md](../../../utils/README.md), [templates/README.md](../../../templates/README.md)
- Handover Part 2 — Solution Architecture and Part 12 — Publishing, Deployment & Release: [TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md)
