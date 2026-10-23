# Testing and Quality

This page describes how the TCS Corporate website is tested and what evidence exists: the unit test suites, lint, the browser audit harness, dialog option and combination testing, accessibility, responsive, cross-browser, data layer, performance, indexing and publication checks, and the status vocabulary for test results. It records what was executed and what is blocked; it does not claim exhaustive testing. Detailed results stay in the audit reports and the handover revision history.

| Attribute | Value |
| --- | --- |
| Audience | Developers, QA, reviewers, release managers, AI coding agents |
| Source of truth | [package.json](../../../package.json), [test/](../../../test/), [.eslintrc.js](../../../.eslintrc.js), [.github/workflows/main.yaml](../../../.github/workflows/main.yaml), [docs/audit/](../../../docs/audit/README.md) (tools, BLOCK-ECOSYSTEM-AUDIT, REAUDIT, DIALOG-OPTIONS), handover revision history and Part 11.8 Validation |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 (`npm test`: 311 / 311 passed; `npm run lint`: clean, run on that commit) |
| Status | Requires validation (Universal Editor, Analytics, screen reader and non-Chromium browser testing are blocked or not executed) |

## Test Status Vocabulary

| Status | Meaning |
| --- | --- |
| Passed | Executed; the actual result matched the expected result |
| Failed | Executed; the actual result didn't match; a defect is open |
| Corrected and passed | Failed first, the defect was corrected, re-executed and matched |
| Blocked | Couldn't be executed; state what is needed (access, configuration, decision) |
| Not applicable | The capability doesn't exist in the solution (for example personalization) |

Never report a test as Passed that was not executed; a review or reasoning substitutes for a test only when labelled as such (the audits label the semantic accessibility review this way).

## Test Layers at a Glance

| Layer | How | Automated in CI | Status of evidence |
| --- | --- | --- | --- |
| Unit tests | `npm test` | No (manual) | Passed: 311 tests at 2d06316 |
| Lint (JS, JSON, models, CSS) | `npm run lint` | Yes (Build workflow, every push) | Passed at 2d06316 |
| Browser regression (local preview) | `docs/audit/tools/harness.mjs` | No (delivery workspace) | Passed: 955 loads after the dialog option changes (20 October 2026) |
| Published vs local comparison | `docs/audit/tools/compare.mjs` | No | Executed in both audits; defects found and corrected |
| Dialog combinations | Test matrix in DIALOG-OPTIONS | No | Passed / Corrected and passed; UE dialog checks Blocked |
| Universal Editor authoring | Manual, by an author | No | Blocked: AEM author access for the agent |
| Performance | PageSpeed (aem-psi-check on PRs), Lighthouse | PR check only | Passed on the measured pages (handover 2.36) |
| Analytics delivery (Tags / Web SDK) | AEP Debugger | No | Blocked: Adobe Tags property and measurement plan |

## Unit Tests

`npm test` runs `node --test 'test/**/*.test.mjs'` (Node's built-in runner, no dependencies). Tests cover pure modules (no DOM) and generated files. At commit 2d06316: 14 files, 53 suites, 311 tests, all passing.

| File | Module(s) under test | What it covers | Tests |
| --- | --- | --- | --- |
| [test/list/list-data.test.mjs](../../../test/list/list-data.test.mjs) | `blocks/list/list-data.js`, `utils/cells.js`, `utils/redirects.js` | List configuration defaults and clamping, author hints, child pages and depth, page metadata precedence, redirects (chains, loops), fixed lists, unsafe links, ordering, List Item rows (including rows rendered before the Display toggles) | 57 |
| [test/list/display-precedence.test.mjs](../../../test/list/display-precedence.test.mjs) | `blocks/list/list-data.js` | Card style and colour precedence (List Item > List > page > automatic), field-by-field overrides from the linked page | 16 |
| [test/list/query-index-tags.test.mjs](../../../test/list/query-index-tags.test.mjs) | `utils/query-index.js` | Tags from `article:tag` and `cq-tags`, merged without duplicates | 4 |
| [test/cards/cards-data.test.mjs](../../../test/cards/cards-data.test.mjs) | `blocks/cards/cards-data.js`, `utils/dates.js` | Card item cells in model order, field mapping, dates, new tab, external links, unsafe links, shared card-list settings | 15 |
| [test/items/item-rows.test.mjs](../../../test/items/item-rows.test.mjs) | `utils/cells.js` (`itemRows`) | Item rows told apart by model in the editor and by cells on the page | 24 |
| [test/separator/separator-config.test.mjs](../../../test/separator/separator-config.test.mjs) | `blocks/separator/separator-config.js` | Defaults, ids, accessibility mode, variants, widths (legacy spellings), responsive values, decorations, animation, print, analytics | 76 |
| [test/conversation-canvas/canvas-journey.test.mjs](../../../test/conversation-canvas/canvas-journey.test.mjs) | `blocks/conversation-canvas/canvas-journey.js` | Floating journey roles, states, allowed transitions, hidden state, page variations | 32 |
| [test/motion/motion.test.mjs](../../../test/motion/motion.test.mjs) | `utils/motion.js`, block models, `styles/motion.css` | Animation values, speed and trigger, stagger, background colour detection, the authoring fields offered per block (container sections use `container*`) | 15 |
| [test/site/index-root.test.mjs](../../../test/site/index-root.test.mjs) | `utils/site.js` | `indexRoot`, `localeSheetPath`, `localePagePath`, author paths, `pageLink`, language master review, `getParentPages` | 21 |
| [test/media/vimeo-url.test.mjs](../../../test/media/vimeo-url.test.mjs) | `utils/media.js` | Vimeo embed URLs (ids, channels, unlisted hashes, parameters) | 5 |
| [test/privacy/privacy.test.mjs](../../../test/privacy/privacy.test.mjs) | `utils/privacy.js` | Search term redaction (e-mail addresses, phone numbers, length) | 5 |
| [test/models/block-names.test.mjs](../../../test/models/block-names.test.mjs) | `component-definition.json` | Each block component's template name renders as an existing block folder's class | 1 |
| [test/modules/module-graph.test.mjs](../../../test/modules/module-graph.test.mjs) | `scripts/module-graph.js`, `head.html` | The module graph is current (`npm run build:modules`), `head.html` preloads every `scripts.js` import, only existing modules listed | 5 |
| [test/docs/block-docs.test.mjs](../../../test/docs/block-docs.test.mjs) | `tools/docs/` | Every block folder has a README listed in `blocks/README.md`; generated sections current; links and anchors resolve | 35 |

Helper: [test/model-layout.mjs](../../../test/model-layout.mjs) derives the cells AEM renders for an item model (tabs as empty cells, collapsed suffix fields folded, `classes` left out), so cell tests follow model changes.

Not unit tested (no DOM test environment): block decoration, the data layer decorator, the header, editor support. These are covered by the browser harness and manual checks.

## Lint

`npm run lint` = `lint:js` (ESLint on `.json`, `.js`, `.mjs`) + `lint:css` (Stylelint on `blocks/**/*.css`, `styles/*.css`). It is the only check in the Build workflow. Rules:

- `airbnb-base`, `.js` extensions required, Unix line endings.
- `plugin:json/recommended` for JSON files.
- `plugin:xwalk/recommended` for the models: `xwalk/max-cells` (default 4, per-model limits in `.eslintrc.js`), `xwalk/no-duplicate-fields`, `xwalk/invalid-field-name`, `xwalk/no-orphan-collapsible-fields` (a field such as `hideTitle` without its base field), `xwalk/no-custom-resource-types`.
- `stylelint-config-standard`.

Ignored: `*.min.js`, `dompurify.min.js`, `docs/audit/tools` ([.eslintignore](../../../.eslintignore)). Not linted: `templates/*/*.css`. `npm run lint:fix` fixes what it can.

## Integration and Browser Testing

### Local and feature previews

The local server (`aem up`) serves local code with previewed content; `--html-folder drafts` serves static pages from `drafts/`. Every change is then checked on its feature preview `https://{branch}--tcs-corp--sradha-tcs.aem.page/{path}`.

### Audit harness

[docs/audit/tools/harness.mjs](../../../docs/audit/tools/harness.mjs) (Playwright Chromium, axe-core) loads every block library and curated design page of the local preview (`drafts/en/block-library`, `drafts/en/curated-design-pages`) and records per load:

| Check | Detail |
| --- | --- |
| Widths | 1440, 1024, 768, 600 and 390px (height 900), reduced motion on |
| Errors | Console errors, page errors, failed requests (4xx / 5xx), fatal loads |
| Blocks | Every block's `data-block-status` |
| Layout | Horizontal page overflow and the elements causing it; broken images; images without `alt` |
| Ids | Duplicate element ids |
| Accessibility | axe WCAG 2.0 / 2.1 / 2.2 A and AA at 1440 and 390px |
| Data layer | Presence, entries, components, duplicate component ids, page entry |
| Clicks | At 1440px, up to 8 visible links per page: each must push exactly one `cmp:click` |

Its companions: [compare.mjs](../../../docs/audit/tools/compare.mjs) compares each block of the published preview (aem.page) with the local preview (status and a content signature) and found the critical delivery defects of the first audit; [inventory.mjs](../../../docs/audit/tools/inventory.mjs) and [register.mjs](../../../docs/audit/tools/register.mjs) build the inventories and the defect register.

Limits: the tools use absolute paths and packages of the delivery workspace, and the rendered library pages in `drafts/en/` and the renderer that produces them are not in the repository, so the harness can't run from a fresh clone without that workspace. Results and dates:

| Run | Pages × widths | Result | Source |
| --- | --- | --- | --- |
| Block audit, before / after (19 Oct 2026) | 188 × 5 = 940 | Console errors 138 → 0 (test artefact), axe nodes 3745 → 0, 758 / 758 clicks single | [BLOCK-ECOSYSTEM-AUDIT.md](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md#2-runtime-validation-before-and-after) |
| Re-audit (20 Oct 2026) | 940 | Clean before and after; new defects found by code review, targeted tests and the published site | [REAUDIT-2026-10-20.md](../../../docs/audit/REAUDIT-2026-10-20.md) |
| Dialog options (20 Oct 2026) | 191 × 5 = 955 | 0 errors, 0 failed requests, 0 axe, 0 overflow, 0 duplicate ids, 791 / 791 clicks single | [DIALOG-OPTIONS-2026-10-20.md](../../../docs/audit/DIALOG-OPTIONS-2026-10-20.md#15-regression) |
| Load time change (handover 2.36) | 955 | Clean (0 errors, 0 axe, 0 overflow; 791 / 791 clicks) | Handover revision history |

## Authoring Testing (Universal Editor)

Universal Editor checks need an AEM author session: dialog fields shown and hidden by their conditions, values persisting after save, in-place updates (`scripts/editor-support.js` re-renders the changed block, else reloads), item placeholders, editor hints (List / Filter List "show on the published page"), Add menus and filters, and edit mode vs Preview (animations don't play in edit mode).

| Check | Status | Needed |
| --- | --- | --- |
| Dialog persistence and live update of changed models | Blocked | AEM author access for the agent; to be checked by an author |
| Production content usage of legacy fields (before removing them) | Blocked | Author session or a content export |
| Published output of the same models | Passed (verified on aem.page / aem.live after the packages were published) | — |

Substitute evidence: models are linted against the delivery rules, and the local preview renderer reproduces AEM's delivery so the library pages match the published markup (AGENTS.md "AEM delivery rules"). Universal Editor uses the code of `main` only, so dialog changes can be checked by an author only after the merge.

## Dialog Option and Combination Testing

Dialog changes are tested with a test matrix that has these columns: Test ID, Block, Dialog configuration, Scenario, Expected result, Actual result, Status, Evidence. The worked example is [DIALOG-OPTIONS-2026-10-20.md](../../../docs/audit/DIALOG-OPTIONS-2026-10-20.md#14-dialog-combination-test-matrix) (List Item, Teaser, Columns Container, Section).

- **Every option alone**: each value of each changed field at least once (Teaser Title Type H1–H6, Image position Left / Right / Top / Bottom, every List Item toggle).
- **Representative combinations**: high-risk combinations are tested together rather than the full cross product. For example, TE-03 tests four position × BG Color × button layout combinations so that each value appears at least once. The report doesn't use a formal pairwise generator.
- **High-risk cases**:
  - fallbacks (Hide Title with Show Action Label off: no call to action, the title stays visible as the link; handover 2.43);
  - inheritance (List Show call to action × List Item Show Action Label not set / on / off: the item's value wins when set; handover 2.44);
  - empty fields;
  - multiple instances on a page;
  - legacy content (16-cell List Item rows, the former Title size, Section Highlight);
  - nested backgrounds (a Grey Teaser in a dark Section): a combination page found 43 contrast violations that the single-option pages didn't show.
- **Delivery**: each new property name is checked against the collapse and grouping rules. For example, `hideTitle` was renamed `titleHidden`.
- **Regression**: a full harness run, `npm test` and lint.
- **Published**: the package is published and the options are checked on aem.live.

Results recorded there: LI-01…LI-11, TE-01…TE-08, CC-01, CC-02, SE-01…SE-03 and ALL-01 / ALL-04 / ALL-05 are Passed or Corrected and passed. ALL-02 (Analytics) and ALL-03 (Universal Editor dialog) are Blocked.

## Accessibility Testing

| Check | Method | Status |
| --- | --- | --- |
| Automated WCAG 2.0 / 2.1 / 2.2 A and AA | axe in the harness at 1440 and 390px; combination pages for themes | Corrected and passed (3745 → 0 nodes in the first audit; 43 → 0 on the dark-background combination page) |
| Keyboard, focus, names, semantics | Code review per block (Tab, Shift+Tab, Enter, Space, Escape, arrows, Home / End), targeted browser tests | Executed in the audits; reviews in [docs/audit/blocks/](../../../docs/audit/blocks/group-a-card-lists.md) and [docs/audit/reaudit/](../../../docs/audit/reaudit/review-a.md) |
| Contrast of design tokens | axe; the token change needs design sign-off | Corrected and passed; sign-off open |
| Screen reader (NVDA, VoiceOver) | Not executed | Blocked: no screen reader in the environment |
| Reduced motion | Harness runs with `reducedMotion: 'reduce'`; code honours `prefers-reduced-motion` | Executed |

Monthly spot checks (keyboard on header, carousel, tabs, accordion, modal, forms; one screen reader pass; an axe scan) are listed in handover 14.7 Health Checks.

## Responsive Testing

Breakpoints: mobile < 600px, tablet 600–1199px, desktop ≥ 1200px (header desktop from 1200px; some type tokens step at 900px). The harness checks 1440, 1024, 768, 600 and 390px for overflow, broken images and errors; the dialog option work also checked 700 and 375px manually. The handover release checklist asks the product owner to review feature previews at 1440, 1024 and 402px. Universal Editor's canvas is often narrower than the browser window, so layouts that switch at 900px may look like tablet in the editor.

## Cross-Browser Testing

Only **Chromium** (Playwright) was run by the harness and the comparison tool. Firefox, Safari (macOS, iOS) and Chrome on Android were not tested by the audits. Some Safari-specific defects, such as focus return in the Modal and the Video pop-up, were corrected from code review and marked "suspected". The formal browser and device support matrix is Not recorded; handover 1.7.5 lists it as to be confirmed and targets current evergreen browsers. Status for non-Chromium browsers: **Blocked** (devices and a support matrix needed).

## Data Layer and Analytics Testing

| Check | Status | Evidence |
| --- | --- | --- |
| ACDL page entry, one component entry per block, unique ids | Passed | Harness (0 pages with duplicate component ids) |
| One `cmp:click` per click (no missing, no duplicates) | Passed | 758 / 758, later 791 / 791 test clicks |
| Events per interaction (show / hide, media, submit field names only, redacted search, change) | Passed in the audits' targeted tests | [BLOCK-ECOSYSTEM-AUDIT.md](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md#6-data-layer-deliverables-17-18) |
| Search term redaction | Passed | `test/privacy/privacy.test.mjs` |
| Delivery to Adobe Analytics / CJA through Tags and the Web SDK | Blocked | Adobe Tags property, datastream and the measurement plan |

Manual console checks and the 16 test cases (page entry, components after 3 seconds, link / download / exit clicks, cards, accordion, tabs, carousel, modal, video, search, submit, filter, Analytics off, breakpoint) are in handover 11.8 Validation ([TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md)).

## Personalization and Consent

| Area | Status | Reason |
| --- | --- | --- |
| Personalization (Target, AJO, audiences) | Not applicable | Not implemented; every block renders default content. Tests become possible only with an approved personalization design |
| Consent (CMP, categories) | Not applicable | No consent mechanism is implemented and nothing is sent to a third party. Consent dependency tests are blocked on the consent model |

## Performance Testing

- NFRs (handover 1.7 Non-Functional Requirements):
  - Lighthouse / PageSpeed 100 on feature previews (process, not enforced by CI);
  - LCP < 2.5 s, CLS ≤ 0.1 and INP < 200 ms at p75 (RUM; handover 13.16).
- Per PR: the aem-psi-check app runs PageSpeed Insights on the URLs in the PR description. Run it yourself with `https://developers.google.com/speed/pagespeed/insights/?url=<feature URL>`.
- Recorded measurements (handover 2.36, Lighthouse 12, mobile throttling):
  - before the module preloading change: 96–100 / 100, TBT up to 220 ms;
  - after: Lighthouse 99–100 mobile and 100 desktop; Home LCP 1.12–1.61 s; all sections about 37 % sooner (What we do 52 %);
  - the font-swap CLS of 0.33 on one library page was corrected to 0.003.
- Guard in tests: `test/modules/module-graph.test.mjs` fails when the preload lists are stale.

## Indexing, Preview and Publish Testing

The checks recorded in the handover revisions (2.31, 2.35) and the re-audit:

| Step | Check | Recorded result |
| --- | --- | --- |
| Install the content package | Pages appear in AEM | Packages 1.0.9, 1.0.10, 1.0.12, 1.0.13 installed |
| Preview and publish every page (Admin API `preview`, `live`) | Count of pages previewed and published | 312 / 312 (1.0.10), 313 / 313 (1.0.12; one timeout, passed on retry), 315 / 315 (1.0.13) |
| Reindex (Admin API `index` per page) | `/query-index.json` rows | 312 / 312 reindexed; 307 language-master pages, 306 with an image; block library pages excluded by design |
| Published vs local | `compare.mjs`, block by block | 127 of 188 identical; the other differences were content, except two defects (R-L-1, R-L-2), corrected in 1.0.10 |
| Live checks on aem.live | The changed options and fixes on the published pages | Passed (for example Teaser Title Type sizes, Section colours, List Item display options, axe 0 on the combination page) |

The package build and its installation steps aren't in the repository (delivery workspace); the publication steps and their order (sheets first, then fragments, then pages) are in handover Part 12.

## Existing-Content Regression

Content authored before a change must still render. The re-audit checked the published site (current code on content installed before, package 1.0.6). Forms with real "name, field-text" rows, tables with tab rows, Tabs Containers holding built-in Columns, Heroes and Table Lists with Motion Type, Canvas buttons with `linkType`, built-in Buttons and Page Header CTAs with an empty style all rendered. Videos with the former poster fields have no poster, because that field was never delivered; a content migration is needed. Repeat this check whenever a field is renamed or removed. Unit tests keep legacy inputs covered: 16-cell List Item rows, Separator legacy widths, index fallback columns.

## Evidence Requirements

Every test result names its evidence:

- the test ID and the status from the vocabulary above;
- the page (library page, aem.page or aem.live URL), the width and the browser;
- the command or tool and the commit;
- the actual result in numbers where possible (loads, violations, clicks);
- for Blocked, what is needed.

Keep the outputs, such as the harness JSON, the register CSVs in [docs/audit/data/](../../../docs/audit/data/runtime-before-after.csv) and screenshots, without personal data, tokens, cookies, author host names or AEM program / environment ids.

## Related

- [development-standards.md](./development-standards.md), [troubleshooting.md](./troubleshooting.md), [universal-editor.md](./universal-editor.md), [decorators-and-utilities.md](./decorators-and-utilities.md), [architecture.md](./architecture.md), [accessibility.md](./accessibility.md), [data-layer-and-analytics.md](./data-layer-and-analytics.md), [indexing-and-search.md](./indexing-and-search.md), [deployment-and-release.md](./deployment-and-release.md)
- [docs/audit/README.md](../../../docs/audit/README.md): [BLOCK-ECOSYSTEM-AUDIT.md](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md), [REAUDIT-2026-10-20.md](../../../docs/audit/REAUDIT-2026-10-20.md), [DIALOG-OPTIONS-2026-10-20.md](../../../docs/audit/DIALOG-OPTIONS-2026-10-20.md)
- Block README sections "For QA and Support Teams" (for example [blocks/list/README.md](../../../blocks/list/README.md#for-qa-and-support-teams))
- Handover ([TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md)): 1.7 Non-Functional Requirements, 11.8 Validation, 12.4 Release Checklist, 14.7 Health Checks, 17.6 Validation Activities
- [AGENTS.md](../../../AGENTS.md#testing--quality-assurance)
