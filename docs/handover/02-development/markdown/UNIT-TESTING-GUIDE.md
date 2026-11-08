---
id: "DEV-013"
title: "Unit Testing Guide"
role: "Development"
topic: ""
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["test/","package.json"]
relatedComponents: []
relatedPages: []
confidence: "High"
primary: true
---

# Unit Testing Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-013 |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | The unit tests, how to run them and how to add tests |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | test/, package.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Unit Tests](#unit-tests)
- [Lint](#lint)
- [Test inventory (18 files, 254 test cases)](#test-inventory-18-files-254-test-cases)
- [Result in this program](#result-in-this-program)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Unit Tests

`npm test` runs `node --test 'test/**/*.test.mjs'` (Node's built-in runner, no dependencies). Tests cover pure modules (no DOM) and generated files. At commit 2d06316: 14 files, 53 suites, 311 tests, all passing.

| File | Module(s) under test | What it covers | Tests |
| --- | --- | --- | --- |
| [test/list/list-data.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/list/list-data.test.mjs) | `blocks/list/list-data.js`, `utils/cells.js`, `utils/redirects.js` | List configuration defaults and clamping, author hints, child pages and depth, page metadata precedence, redirects (chains, loops), fixed lists, unsafe links, ordering, List Item rows (including rows rendered before the Display toggles) | 57 |
| [test/list/display-precedence.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/list/display-precedence.test.mjs) | `blocks/list/list-data.js` | Card style and colour precedence (List Item > List > page > automatic), field-by-field overrides from the linked page | 16 |
| [test/list/query-index-tags.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/list/query-index-tags.test.mjs) | `utils/query-index.js` | Tags from `article:tag` and `cq-tags`, merged without duplicates | 4 |
| [test/cards/cards-data.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/cards/cards-data.test.mjs) | `blocks/cards/cards-data.js`, `utils/dates.js` | Card item cells in model order, field mapping, dates, new tab, external links, unsafe links, shared card-list settings | 15 |
| [test/items/item-rows.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/items/item-rows.test.mjs) | `utils/cells.js` (`itemRows`) | Item rows told apart by model in the editor and by cells on the page | 24 |
| [test/separator/separator-config.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/separator/separator-config.test.mjs) | `blocks/separator/separator-config.js` | Defaults, ids, accessibility mode, variants, widths (legacy spellings), responsive values, decorations, animation, print, analytics | 76 |
| [test/conversation-canvas/canvas-journey.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/conversation-canvas/canvas-journey.test.mjs) | `blocks/conversation-canvas/canvas-journey.js` | Floating journey roles, states, allowed transitions, hidden state, page variations | 32 |
| [test/motion/motion.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/motion/motion.test.mjs) | `utils/motion.js`, block models, `styles/motion.css` | Animation values, speed and trigger, stagger, background colour detection, the authoring fields offered per block (container sections use `container*`) | 15 |
| [test/site/index-root.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/site/index-root.test.mjs) | `utils/site.js` | `indexRoot`, `localeSheetPath`, `localePagePath`, author paths, `pageLink`, language master review, `getParentPages` | 21 |
| [test/media/vimeo-url.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/media/vimeo-url.test.mjs) | `utils/media.js` | Vimeo embed URLs (ids, channels, unlisted hashes, parameters) | 5 |
| [test/privacy/privacy.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/privacy/privacy.test.mjs) | `utils/privacy.js` | Search term redaction (e-mail addresses, phone numbers, length) | 5 |
| [test/models/block-names.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/models/block-names.test.mjs) | `component-definition.json` | Each block component's template name renders as an existing block folder's class | 1 |
| [test/modules/module-graph.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/modules/module-graph.test.mjs) | `scripts/module-graph.js`, `head.html` | The module graph is current (`npm run build:modules`), `head.html` preloads every `scripts.js` import, only existing modules listed | 5 |
| [test/docs/block-docs.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/docs/block-docs.test.mjs) | `tools/docs/` | Every block folder has a README listed in `blocks/README.md`; generated sections current; links and anchors resolve | 35 |

Helper: [test/model-layout.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/model-layout.mjs) derives the cells AEM renders for an item model (tabs as empty cells, collapsed suffix fields folded, `classes` left out), so cell tests follow model changes.

Not unit tested (no DOM test environment): block decoration, the data layer decorator, the header, editor support. These are covered by the browser harness and manual checks.

## Lint

`npm run lint` = `lint:js` (ESLint on `.json`, `.js`, `.mjs`) + `lint:css` (Stylelint on `blocks/**/*.css`, `styles/*.css`). It is the only check in the Build workflow. Rules:

- `airbnb-base`, `.js` extensions required, Unix line endings.
- `plugin:json/recommended` for JSON files.
- `plugin:xwalk/recommended` for the models: `xwalk/max-cells` (default 4, per-model limits in `.eslintrc.js`), `xwalk/no-duplicate-fields`, `xwalk/invalid-field-name`, `xwalk/no-orphan-collapsible-fields` (a field such as `hideTitle` without its base field), `xwalk/no-custom-resource-types`.
- `stylelint-config-standard`.

Ignored: `*.min.js`, `dompurify.min.js`, `docs/audit/tools` ([.eslintignore](https://github.com/sradha-tcs/tcs-corp/blob/main/.eslintignore)). Not linted: `templates/*/*.css`. `npm run lint:fix` fixes what it can.

## Test inventory (18 files, 254 test cases)

| File | Suites | Tests |
| --- | --- | --- |
| `test/cards/cards-data.test.mjs` | card items; shared card list settings; content type labels and long dates; cards call to action | 16 |
| `test/conversation-canvas/canvas-journey.test.mjs` | roles from placement; the journey down the page; transitions; HIDDEN; page variations; the header Canvas at the bottom of the window; a row in place that holds focus (focused) | 36 |
| `test/docs/block-docs.test.mjs` | block documentation (npm run build:docs); block documentation helpers | 5 |
| `test/items/item-rows.test.mjs` | item models; itemRows | 6 |
| `test/list/display-precedence.test.mjs` | Card style of List Items (manual); Card style of source cards (child pages, tags); Card colour; List Item content from the linked page (field by field) | 16 |
| `test/list/list-data.test.mjs` | configuration; feature card author (Show author on feature card); content type on image cards (Show content type); parent / child pages; page metadata; fixed list; fixed list: Pages and List Items; tag-based pages; deduplicate, sort and limit; card kinds; list item cells; list item display; list call to action | 69 |
| `test/list/query-index-tags.test.mjs` | index tags | 4 |
| `test/media-contacts/media-contacts-data.test.mjs` | groupHeading; groupContacts; telHref | 8 |
| `test/media/delivery-url.test.mjs` | deliveryAsset; deliveryImageUrl | 8 |
| `test/media/vimeo-url.test.mjs` | vimeoEmbedUrl | 5 |
| `test/models/block-names.test.mjs` | block component names | 1 |
| `test/modules/module-graph.test.mjs` | module graph (npm run build:modules) | 4 |
| `test/motion/motion.test.mjs` | content animation; background animation; motion speed and trigger; stagger; background colour; authoring fields | 15 |
| `test/privacy/privacy.test.mjs` | redactSearchTerm; contactLinkKind | 7 |
| `test/separator/separator-config.test.mjs` | defaults; component id; accessibility mode; variants and line settings; width and alignment; responsive; decorations; animation, print and analytics | 21 |
| `test/site/index-root.test.mjs` | indexRoot; localeSheetPath; localePagePath; on AEM author; pageLink; the language master root page; getParentPages (inherited Navigation, Footer, 404 Page) | 23 |
| `test/site/page-tree.test.mjs` | pageTree | 5 |
| `test/site/paths.test.mjs` | paths.json | 5 |

## Result in this program

- `npm run lint`: Passed (exit 0)
- `npm test`: 384 of 386 passed, 2 failed: offers Background animation only on blocks with an authored background; offers Content animation after Hide block, with the values of utils/motion.js (Form Variations motion tests, known before this program)

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
