---
id: "DEV-T-list"
title: "List Block — Test Coverage"
role: "Development"
topic: "tests"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: ["test/list/display-precedence.test.mjs","test/list/list-data.test.mjs","test/list/query-index-tags.test.mjs"]
relatedComponents: ["list"]
relatedPages: ["/design-block-master/en/block-library/list","/design-block-master/en/block-library/list/card-colours-and-overrides","/design-block-master/en/block-library/list/card-style-from-pages","/design-block-master/en/block-library/list/card-style-from-pages/automatic","/design-block-master/en/block-library/list/card-style-from-pages/image-light-blue","/design-block-master/en/block-library/list/card-style-from-pages/panel-grey","/design-block-master/en/block-library/list/card-style-from-pages/report-navy","/design-block-master/en/block-library/list/card-style-from-pages/statistic","/design-block-master/en/block-library/list/cards","/design-block-master/en/block-library/list/empty-state","/design-block-master/en/block-library/list/figma-variations","/design-block-master/en/block-library/list/layout-and-scrolling","/design-block-master/en/block-library/list/list-item-display","/design-block-master/en/block-library/list/lists-made-before","/design-block-master/en/block-library/list/sources"]
confidence: "Medium"
primary: false
---

# List Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-list |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Unit tests, automated reference-page checks and manual test guidance for the block |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | test/list/display-precedence.test.mjs, test/list/list-data.test.mjs, test/list/query-index-tags.test.mjs |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Unit tests](#unit-tests)
- [Automated checks of the block library pages (executed 13 November 2026)](#automated-checks-of-the-block-library-pages-executed-13-november-2026)
- [Manual test guidance (block README)](#manual-test-guidance-block-readme)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Unit tests

| File | Suites | Tests |
| --- | --- | --- |
| `test/list/display-precedence.test.mjs` | Card style of List Items (manual); Card style of source cards (child pages, tags); Card colour; List Item content from the linked page (field by field) | 16 |
| `test/list/list-data.test.mjs` | configuration; feature card author (Show author on feature card); content type on image cards (Show content type); parent / child pages; page metadata; fixed list; fixed list: Pages and List Items; tag-based pages; deduplicate, sort and limit; card kinds; list item cells; list item display; list call to action | 69 |
| `test/list/query-index-tags.test.mjs` | index tags | 4 |

## Automated checks of the block library pages (executed 13 November 2026)

Per page: HTTP status and horizontal overflow at 375 / 768 / 1024 / 1440 px, console errors, failed requests and DOM accessibility checks at 1440 px (evidence: [screenshot register](../../../SCREENSHOT-REGISTER.md)).

| Page | 375 / 768 / 1024 / 1440 | Console errors | Failed requests | Accessibility (DOM) |
| --- | --- | --- | --- | --- |
| /design-block-master/en/block-library/list | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/list/card-colours-and-overrides | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/card-style-from-pages | ok / ok / ok / ok | 16 | 16 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/card-style-from-pages/automatic | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/card-style-from-pages/image-light-blue | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/card-style-from-pages/panel-grey | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/card-style-from-pages/report-navy | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/card-style-from-pages/statistic | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/cards | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/empty-state | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/figma-variations | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/layout-and-scrolling | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/list-item-display | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/lists-made-before | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/list/sources | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
|---|---|---|---|
| LIST-QA-01 | Default | New List, Fixed list, two List Items | Two image cards in a 4 / 4 / 1 grid |
| LIST-QA-02 | Child pages | Parent page set, Direct children only off, Child depth 2 | Children and grandchildren, path order |
| LIST-QA-03 | Tagged pages Any / All | Two tags, Match Any then All | All: only pages with both tags; never the current page |
| LIST-QA-04 | Order and limit | Order by Title, Descending, Maximum items 3 | Three cards, Z to A |
| LIST-QA-05 | Item overrides | List Item Title and Image set | Authored values win, the rest from the page |
| LIST-QA-06 | Display toggles | Hide Title, Show Image off, Show Action Label off | As described; one visible link per linked card |
| LIST-QA-06b | Call to action per item | Fixed list, Card style Panel: three List Items, Show Action Label on, off, and never changed (default) | The first and third cards have `p.list-card-action` (Explore / its label); the second has no action element and no Explore text, its title is its link |
| LIST-QA-07 | Card styles and colours | Image, Panel, Report, Statistic, Mixed; each Card colour | Precedence table respected |
| LIST-QA-08 | Feature and rows | First card as feature; Display as teaser off with dividers | Spotlight with author; rows with lines |
| LIST-QA-09 | Responsive | Each combination of grid / scroll | Layout per breakpoint at 402, 1024, 1440px |
| LIST-QA-10 | Keyboard | Scroller with buttons | Arrow keys, Home, End; buttons aria-disabled at the ends |
| LIST-QA-11 | Empty behaviour | No matches with hide / message / fallback | Hidden, message, or List Items |
| LIST-QA-12 | Editor | Universal Editor, Child pages source; new List Item | `listEditorPages` hint; dashed placeholder |
| LIST-QA-13 | Missing / invalid content | `javascript:` link, item without title, invalid numbers | Skipped; defaults |
| LIST-QA-14 | Multiple instances | Two Lists, same Anchor ID or Component ID | Unique ids (suffix), separate data layer entries |
| LIST-QA-15 | Data layer | Analytics on / off | State and `cmp:click` on / nothing |
| LIST-QA-16 | Regression | Legacy list, pageItems list, items without Display toggles | Render as before |

Test cases: [05-quality-assurance/test-cases/blocks/list](../../../05-quality-assurance/test-cases/blocks/list/LIST-TEST-CASES.md).

## Screenshots

![List: list at mobile 375 × 812, published page /design-block-master/en/block-library/list](./screenshots/block-library-list-375.jpg)

*Figure: List: list — mobile 375 × 812 (/design-block-master/en/block-library/list, captured 2026-11-08).*

![List: list at tablet 768 × 900, published page /design-block-master/en/block-library/list](./screenshots/block-library-list-768.jpg)

*Figure: List: list — tablet 768 × 900 (/design-block-master/en/block-library/list, captured 2026-11-08).*

![List: list at small desktop 1024 × 900, published page /design-block-master/en/block-library/list](./screenshots/block-library-list-1024.jpg)

*Figure: List: list — small desktop 1024 × 900 (/design-block-master/en/block-library/list, captured 2026-11-08).*

![List: list at desktop 1440 × 900, published page /design-block-master/en/block-library/list](./screenshots/block-library-list-1440.jpg)

*Figure: List: list — desktop 1440 × 900 (/design-block-master/en/block-library/list, captured 2026-11-08).*

![List: list/card-colours-and-overrides at mobile 375 × 812, published page /design-block-master/en/block-library/list/card-colours-and-overrides](./screenshots/block-library-list-card-colours-and-overrides-375.jpg)

*Figure: List: list/card-colours-and-overrides — mobile 375 × 812 (/design-block-master/en/block-library/list/card-colours-and-overrides, captured 2026-11-08).*

![List: list/card-colours-and-overrides at tablet 768 × 900, published page /design-block-master/en/block-library/list/card-colours-and-overrides](./screenshots/block-library-list-card-colours-and-overrides-768.jpg)

*Figure: List: list/card-colours-and-overrides — tablet 768 × 900 (/design-block-master/en/block-library/list/card-colours-and-overrides, captured 2026-11-08).*

![List: list/card-colours-and-overrides at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/card-colours-and-overrides](./screenshots/block-library-list-card-colours-and-overrides-1024.jpg)

*Figure: List: list/card-colours-and-overrides — small desktop 1024 × 900 (/design-block-master/en/block-library/list/card-colours-and-overrides, captured 2026-11-08).*

![List: list/card-colours-and-overrides at desktop 1440 × 900, published page /design-block-master/en/block-library/list/card-colours-and-overrides](./screenshots/block-library-list-card-colours-and-overrides-1440.jpg)

*Figure: List: list/card-colours-and-overrides — desktop 1440 × 900 (/design-block-master/en/block-library/list/card-colours-and-overrides, captured 2026-11-08).*

![List: list/card-style-from-pages at mobile 375 × 812, published page /design-block-master/en/block-library/list/card-style-from-pages](./screenshots/block-library-list-card-style-from-pages-375.jpg)

*Figure: List: list/card-style-from-pages — mobile 375 × 812 (/design-block-master/en/block-library/list/card-style-from-pages, captured 2026-11-08).*

![List: list/card-style-from-pages at tablet 768 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages](./screenshots/block-library-list-card-style-from-pages-768.jpg)

*Figure: List: list/card-style-from-pages — tablet 768 × 900 (/design-block-master/en/block-library/list/card-style-from-pages, captured 2026-11-08).*

![List: list/card-style-from-pages at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages](./screenshots/block-library-list-card-style-from-pages-1024.jpg)

*Figure: List: list/card-style-from-pages — small desktop 1024 × 900 (/design-block-master/en/block-library/list/card-style-from-pages, captured 2026-11-08).*

![List: list/card-style-from-pages at desktop 1440 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages](./screenshots/block-library-list-card-style-from-pages-1440.jpg)

*Figure: List: list/card-style-from-pages — desktop 1440 × 900 (/design-block-master/en/block-library/list/card-style-from-pages, captured 2026-11-08).*

![List: list/card-style-from-pages/automatic at mobile 375 × 812, published page /design-block-master/en/block-library/list/card-style-from-pages/automatic](./screenshots/block-library-list-card-style-from-pages-automatic-375.jpg)

*Figure: List: list/card-style-from-pages/automatic — mobile 375 × 812 (/design-block-master/en/block-library/list/card-style-from-pages/automatic, captured 2026-11-08).*

![List: list/card-style-from-pages/automatic at tablet 768 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/automatic](./screenshots/block-library-list-card-style-from-pages-automatic-768.jpg)

*Figure: List: list/card-style-from-pages/automatic — tablet 768 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/automatic, captured 2026-11-08).*

![List: list/card-style-from-pages/automatic at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/automatic](./screenshots/block-library-list-card-style-from-pages-automatic-1024.jpg)

*Figure: List: list/card-style-from-pages/automatic — small desktop 1024 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/automatic, captured 2026-11-08).*

![List: list/card-style-from-pages/automatic at desktop 1440 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/automatic](./screenshots/block-library-list-card-style-from-pages-automatic-1440.jpg)

*Figure: List: list/card-style-from-pages/automatic — desktop 1440 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/automatic, captured 2026-11-08).*

![List: list/card-style-from-pages/image-light-blue at mobile 375 × 812, published page /design-block-master/en/block-library/list/card-style-from-pages/image-light-blue](./screenshots/block-library-list-card-style-from-pages-image-light-blue-375.jpg)

*Figure: List: list/card-style-from-pages/image-light-blue — mobile 375 × 812 (/design-block-master/en/block-library/list/card-style-from-pages/image-light-blue, captured 2026-11-08).*

![List: list/card-style-from-pages/image-light-blue at tablet 768 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/image-light-blue](./screenshots/block-library-list-card-style-from-pages-image-light-blue-768.jpg)

*Figure: List: list/card-style-from-pages/image-light-blue — tablet 768 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/image-light-blue, captured 2026-11-08).*

![List: list/card-style-from-pages/image-light-blue at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/image-light-blue](./screenshots/block-library-list-card-style-from-pages-image-light-blue-1024.jpg)

*Figure: List: list/card-style-from-pages/image-light-blue — small desktop 1024 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/image-light-blue, captured 2026-11-08).*

![List: list/card-style-from-pages/image-light-blue at desktop 1440 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/image-light-blue](./screenshots/block-library-list-card-style-from-pages-image-light-blue-1440.jpg)

*Figure: List: list/card-style-from-pages/image-light-blue — desktop 1440 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/image-light-blue, captured 2026-11-08).*

![List: list/card-style-from-pages/panel-grey at mobile 375 × 812, published page /design-block-master/en/block-library/list/card-style-from-pages/panel-grey](./screenshots/block-library-list-card-style-from-pages-panel-grey-375.jpg)

*Figure: List: list/card-style-from-pages/panel-grey — mobile 375 × 812 (/design-block-master/en/block-library/list/card-style-from-pages/panel-grey, captured 2026-11-08).*

![List: list/card-style-from-pages/panel-grey at tablet 768 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/panel-grey](./screenshots/block-library-list-card-style-from-pages-panel-grey-768.jpg)

*Figure: List: list/card-style-from-pages/panel-grey — tablet 768 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/panel-grey, captured 2026-11-08).*

![List: list/card-style-from-pages/panel-grey at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/panel-grey](./screenshots/block-library-list-card-style-from-pages-panel-grey-1024.jpg)

*Figure: List: list/card-style-from-pages/panel-grey — small desktop 1024 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/panel-grey, captured 2026-11-08).*

![List: list/card-style-from-pages/panel-grey at desktop 1440 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/panel-grey](./screenshots/block-library-list-card-style-from-pages-panel-grey-1440.jpg)

*Figure: List: list/card-style-from-pages/panel-grey — desktop 1440 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/panel-grey, captured 2026-11-08).*

![List: list/card-style-from-pages/report-navy at mobile 375 × 812, published page /design-block-master/en/block-library/list/card-style-from-pages/report-navy](./screenshots/block-library-list-card-style-from-pages-report-navy-375.jpg)

*Figure: List: list/card-style-from-pages/report-navy — mobile 375 × 812 (/design-block-master/en/block-library/list/card-style-from-pages/report-navy, captured 2026-11-08).*

![List: list/card-style-from-pages/report-navy at tablet 768 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/report-navy](./screenshots/block-library-list-card-style-from-pages-report-navy-768.jpg)

*Figure: List: list/card-style-from-pages/report-navy — tablet 768 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/report-navy, captured 2026-11-08).*

![List: list/card-style-from-pages/report-navy at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/report-navy](./screenshots/block-library-list-card-style-from-pages-report-navy-1024.jpg)

*Figure: List: list/card-style-from-pages/report-navy — small desktop 1024 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/report-navy, captured 2026-11-08).*

![List: list/card-style-from-pages/report-navy at desktop 1440 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/report-navy](./screenshots/block-library-list-card-style-from-pages-report-navy-1440.jpg)

*Figure: List: list/card-style-from-pages/report-navy — desktop 1440 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/report-navy, captured 2026-11-08).*

![List: list/card-style-from-pages/statistic at mobile 375 × 812, published page /design-block-master/en/block-library/list/card-style-from-pages/statistic](./screenshots/block-library-list-card-style-from-pages-statistic-375.jpg)

*Figure: List: list/card-style-from-pages/statistic — mobile 375 × 812 (/design-block-master/en/block-library/list/card-style-from-pages/statistic, captured 2026-11-08).*

![List: list/card-style-from-pages/statistic at tablet 768 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/statistic](./screenshots/block-library-list-card-style-from-pages-statistic-768.jpg)

*Figure: List: list/card-style-from-pages/statistic — tablet 768 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/statistic, captured 2026-11-08).*

![List: list/card-style-from-pages/statistic at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/statistic](./screenshots/block-library-list-card-style-from-pages-statistic-1024.jpg)

*Figure: List: list/card-style-from-pages/statistic — small desktop 1024 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/statistic, captured 2026-11-08).*

![List: list/card-style-from-pages/statistic at desktop 1440 × 900, published page /design-block-master/en/block-library/list/card-style-from-pages/statistic](./screenshots/block-library-list-card-style-from-pages-statistic-1440.jpg)

*Figure: List: list/card-style-from-pages/statistic — desktop 1440 × 900 (/design-block-master/en/block-library/list/card-style-from-pages/statistic, captured 2026-11-08).*

![List: list/cards at mobile 375 × 812, published page /design-block-master/en/block-library/list/cards](./screenshots/block-library-list-cards-375.jpg)

*Figure: List: list/cards — mobile 375 × 812 (/design-block-master/en/block-library/list/cards, captured 2026-11-08).*

![List: list/cards at tablet 768 × 900, published page /design-block-master/en/block-library/list/cards](./screenshots/block-library-list-cards-768.jpg)

*Figure: List: list/cards — tablet 768 × 900 (/design-block-master/en/block-library/list/cards, captured 2026-11-08).*

![List: list/cards at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/cards](./screenshots/block-library-list-cards-1024.jpg)

*Figure: List: list/cards — small desktop 1024 × 900 (/design-block-master/en/block-library/list/cards, captured 2026-11-08).*

![List: list/cards at desktop 1440 × 900, published page /design-block-master/en/block-library/list/cards](./screenshots/block-library-list-cards-1440.jpg)

*Figure: List: list/cards — desktop 1440 × 900 (/design-block-master/en/block-library/list/cards, captured 2026-11-08).*

![List: list/empty-state at mobile 375 × 812, published page /design-block-master/en/block-library/list/empty-state](./screenshots/block-library-list-empty-state-375.jpg)

*Figure: List: list/empty-state — mobile 375 × 812 (/design-block-master/en/block-library/list/empty-state, captured 2026-11-08).*

![List: list/empty-state at tablet 768 × 900, published page /design-block-master/en/block-library/list/empty-state](./screenshots/block-library-list-empty-state-768.jpg)

*Figure: List: list/empty-state — tablet 768 × 900 (/design-block-master/en/block-library/list/empty-state, captured 2026-11-08).*

![List: list/empty-state at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/empty-state](./screenshots/block-library-list-empty-state-1024.jpg)

*Figure: List: list/empty-state — small desktop 1024 × 900 (/design-block-master/en/block-library/list/empty-state, captured 2026-11-08).*

![List: list/empty-state at desktop 1440 × 900, published page /design-block-master/en/block-library/list/empty-state](./screenshots/block-library-list-empty-state-1440.jpg)

*Figure: List: list/empty-state — desktop 1440 × 900 (/design-block-master/en/block-library/list/empty-state, captured 2026-11-08).*

![List: list/figma-variations at mobile 375 × 812, published page /design-block-master/en/block-library/list/figma-variations](./screenshots/block-library-list-figma-variations-375.jpg)

*Figure: List: list/figma-variations — mobile 375 × 812 (/design-block-master/en/block-library/list/figma-variations, captured 2026-11-08).*

![List: list/figma-variations at tablet 768 × 900, published page /design-block-master/en/block-library/list/figma-variations](./screenshots/block-library-list-figma-variations-768.jpg)

*Figure: List: list/figma-variations — tablet 768 × 900 (/design-block-master/en/block-library/list/figma-variations, captured 2026-11-08).*

![List: list/figma-variations at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/figma-variations](./screenshots/block-library-list-figma-variations-1024.jpg)

*Figure: List: list/figma-variations — small desktop 1024 × 900 (/design-block-master/en/block-library/list/figma-variations, captured 2026-11-08).*

![List: list/figma-variations at desktop 1440 × 900, published page /design-block-master/en/block-library/list/figma-variations](./screenshots/block-library-list-figma-variations-1440.jpg)

*Figure: List: list/figma-variations — desktop 1440 × 900 (/design-block-master/en/block-library/list/figma-variations, captured 2026-11-08).*

![List: list/layout-and-scrolling at mobile 375 × 812, published page /design-block-master/en/block-library/list/layout-and-scrolling](./screenshots/block-library-list-layout-and-scrolling-375.jpg)

*Figure: List: list/layout-and-scrolling — mobile 375 × 812 (/design-block-master/en/block-library/list/layout-and-scrolling, captured 2026-11-08).*

![List: list/layout-and-scrolling at tablet 768 × 900, published page /design-block-master/en/block-library/list/layout-and-scrolling](./screenshots/block-library-list-layout-and-scrolling-768.jpg)

*Figure: List: list/layout-and-scrolling — tablet 768 × 900 (/design-block-master/en/block-library/list/layout-and-scrolling, captured 2026-11-08).*

![List: list/layout-and-scrolling at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/layout-and-scrolling](./screenshots/block-library-list-layout-and-scrolling-1024.jpg)

*Figure: List: list/layout-and-scrolling — small desktop 1024 × 900 (/design-block-master/en/block-library/list/layout-and-scrolling, captured 2026-11-08).*

![List: list/layout-and-scrolling at desktop 1440 × 900, published page /design-block-master/en/block-library/list/layout-and-scrolling](./screenshots/block-library-list-layout-and-scrolling-1440.jpg)

*Figure: List: list/layout-and-scrolling — desktop 1440 × 900 (/design-block-master/en/block-library/list/layout-and-scrolling, captured 2026-11-08).*

![List: list/list-item-display at mobile 375 × 812, published page /design-block-master/en/block-library/list/list-item-display](./screenshots/block-library-list-list-item-display-375.jpg)

*Figure: List: list/list-item-display — mobile 375 × 812 (/design-block-master/en/block-library/list/list-item-display, captured 2026-11-08).*

![List: list/list-item-display at tablet 768 × 900, published page /design-block-master/en/block-library/list/list-item-display](./screenshots/block-library-list-list-item-display-768.jpg)

*Figure: List: list/list-item-display — tablet 768 × 900 (/design-block-master/en/block-library/list/list-item-display, captured 2026-11-08).*

![List: list/list-item-display at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/list-item-display](./screenshots/block-library-list-list-item-display-1024.jpg)

*Figure: List: list/list-item-display — small desktop 1024 × 900 (/design-block-master/en/block-library/list/list-item-display, captured 2026-11-08).*

![List: list/list-item-display at desktop 1440 × 900, published page /design-block-master/en/block-library/list/list-item-display](./screenshots/block-library-list-list-item-display-1440.jpg)

*Figure: List: list/list-item-display — desktop 1440 × 900 (/design-block-master/en/block-library/list/list-item-display, captured 2026-11-08).*

![List: list/lists-made-before at mobile 375 × 812, published page /design-block-master/en/block-library/list/lists-made-before](./screenshots/block-library-list-lists-made-before-375.jpg)

*Figure: List: list/lists-made-before — mobile 375 × 812 (/design-block-master/en/block-library/list/lists-made-before, captured 2026-11-08).*

![List: list/lists-made-before at tablet 768 × 900, published page /design-block-master/en/block-library/list/lists-made-before](./screenshots/block-library-list-lists-made-before-768.jpg)

*Figure: List: list/lists-made-before — tablet 768 × 900 (/design-block-master/en/block-library/list/lists-made-before, captured 2026-11-08).*

![List: list/lists-made-before at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/lists-made-before](./screenshots/block-library-list-lists-made-before-1024.jpg)

*Figure: List: list/lists-made-before — small desktop 1024 × 900 (/design-block-master/en/block-library/list/lists-made-before, captured 2026-11-08).*

![List: list/lists-made-before at desktop 1440 × 900, published page /design-block-master/en/block-library/list/lists-made-before](./screenshots/block-library-list-lists-made-before-1440.jpg)

*Figure: List: list/lists-made-before — desktop 1440 × 900 (/design-block-master/en/block-library/list/lists-made-before, captured 2026-11-08).*

![List: list/sources at mobile 375 × 812, published page /design-block-master/en/block-library/list/sources](./screenshots/block-library-list-sources-375.jpg)

*Figure: List: list/sources — mobile 375 × 812 (/design-block-master/en/block-library/list/sources, captured 2026-11-08).*

![List: list/sources at tablet 768 × 900, published page /design-block-master/en/block-library/list/sources](./screenshots/block-library-list-sources-768.jpg)

*Figure: List: list/sources — tablet 768 × 900 (/design-block-master/en/block-library/list/sources, captured 2026-11-08).*

![List: list/sources at small desktop 1024 × 900, published page /design-block-master/en/block-library/list/sources](./screenshots/block-library-list-sources-1024.jpg)

*Figure: List: list/sources — small desktop 1024 × 900 (/design-block-master/en/block-library/list/sources, captured 2026-11-08).*

![List: list/sources at desktop 1440 × 900, published page /design-block-master/en/block-library/list/sources](./screenshots/block-library-list-sources-1440.jpg)

*Figure: List: list/sources — desktop 1440 × 900 (/design-block-master/en/block-library/list/sources, captured 2026-11-08).*

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
