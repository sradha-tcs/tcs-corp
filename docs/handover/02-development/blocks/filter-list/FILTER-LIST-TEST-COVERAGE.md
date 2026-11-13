---
id: "DEV-T-filter-list"
title: "Filter List Block — Test Coverage"
role: "Development"
topic: "tests"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: []
relatedComponents: ["filter-list"]
relatedPages: ["/design-block-master/en/block-library/filter-list","/design-block-master/en/block-library/filter-list/content-types","/design-block-master/en/block-library/filter-list/filter-list","/design-block-master/en/block-library/filter-list/filters","/design-block-master/en/block-library/filter-list/insights-listing","/design-block-master/en/block-library/filter-list/layouts-and-card-styles","/design-block-master/en/block-library/filter-list/rules"]
confidence: "Medium"
primary: false
---

# Filter List Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-filter-list |
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
| Source files | — |
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

No unit test is specific to this block (shared tests: test/models, test/items, test/docs, test/motion).

## Automated checks of the block library pages (executed 13 November 2026)

Per page: HTTP status and horizontal overflow at 375 / 768 / 1024 / 1440 px, console errors, failed requests and DOM accessibility checks at 1440 px (evidence: [screenshot register](../../../SCREENSHOT-REGISTER.md)).

| Page | 375 / 768 / 1024 / 1440 | Console errors | Failed requests | Accessibility (DOM) |
| --- | --- | --- | --- | --- |
| /design-block-master/en/block-library/filter-list | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/filter-list/content-types | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/filter-list/filter-list | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/filter-list/filters | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/filter-list/insights-listing | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/filter-list/layouts-and-card-styles | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/filter-list/rules | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| FILTER-LIST-QA-01 | Default rendering | Defaults, Query Index | Masonry of Mixed cards, newest first; featured spotlights if pages are featured; Load more if more than 9 cards |
| FILTER-LIST-QA-02 | Layouts | Masonry, Grid, List | Columns as in Responsive Behavior; List one per row with dividers |
| FILTER-LIST-QA-03 | Card styles | Default, Compact, Featured, Mixed | Card parts as in Variations; Mixed report / dark kinds |
| FILTER-LIST-QA-04 | Hero rules | Latest, Featured, Manual | The expected page first; Manual hero absent if it doesn't match |
| FILTER-LIST-QA-05 | Featured rules | Marked as featured, Priority 1 to 3, Manual | Spotlights after each page of cards, at most the count; no page twice |
| FILTER-LIST-QA-06 | Manual List | Five Filter Pages (Listed) | Authored order; Sort by ignored |
| FILTER-LIST-QA-07 | Pills single select | Click Banking, then Banking again | Only banking pages; second click shows all |
| FILTER-LIST-QA-08 | Pills multi select | Insurance + Artificial intelligence | Only pages with both tags |
| FILTER-LIST-QA-09 | Advanced AND / OR | Two options checked | AND: pages with both; OR: pages with either; badge shows 2 |
| FILTER-LIST-QA-10 | Empty state | Filters matching nothing | "No resources found.", hint, Reset filters; Reset restores and focuses the first pill |
| FILTER-LIST-QA-11 | Editor / AEM author | Open in Universal Editor | Hint text instead of cards; items as chips below the block |
| FILTER-LIST-QA-12 | Slow index | Throttled network | Skeleton shown, then cards; the section isn't held back |
| FILTER-LIST-QA-13 | Load more | More cards than Cards per page | Next cards added; focus on the first new card; count "Showing {n} of {total}"; button hidden at the end |
| FILTER-LIST-QA-14 | Missing images | Pages without image metadata | Page's own image used; none: no media (Mixed: dark card) |
| FILTER-LIST-QA-15 | Viewports | 375px, 768px, 1024px, 1440px | 1 / 2 / 3 / 4 columns (Featured 1 / 2 / 2 / 3) |
| FILTER-LIST-QA-16 | Keyboard | Tab through pills, button, panel, cards | Escape closes the panel and focuses the button; visible focus everywhere |
| FILTER-LIST-QA-17 | Data layer | Click a pill, check an option, Load more, a card | `cmp:click` filter, `cmp:change` filter-option, `cmp:click` load-more, `cmp:click` link |
| FILTER-LIST-QA-18 | Multiple instances | Two Filter Lists on a page | Independent filters; unique ids for results and panel |
| FILTER-LIST-QA-19 | Localization | A non-English locale page | Only that locale's pages; translated labels and tag titles |
| FILTER-LIST-QA-20 | Regression | `block-library/filter-list/*`, curated Insights and Collection pages | Same cards as before; legacy multifield content still renders |

Test cases: [05-quality-assurance/test-cases/blocks/filter-list](../../../05-quality-assurance/test-cases/blocks/filter-list/FILTER-LIST-TEST-CASES.md).

## Screenshots

![Filter List: filter-list at mobile 375 × 812, published page /design-block-master/en/block-library/filter-list](./screenshots/block-library-filter-list-375.jpg)

*Figure: Filter List: filter-list — mobile 375 × 812 (/design-block-master/en/block-library/filter-list, captured 2026-11-08).*

![Filter List: filter-list at tablet 768 × 900, published page /design-block-master/en/block-library/filter-list](./screenshots/block-library-filter-list-768.jpg)

*Figure: Filter List: filter-list — tablet 768 × 900 (/design-block-master/en/block-library/filter-list, captured 2026-11-08).*

![Filter List: filter-list at small desktop 1024 × 900, published page /design-block-master/en/block-library/filter-list](./screenshots/block-library-filter-list-1024.jpg)

*Figure: Filter List: filter-list — small desktop 1024 × 900 (/design-block-master/en/block-library/filter-list, captured 2026-11-08).*

![Filter List: filter-list at desktop 1440 × 900, published page /design-block-master/en/block-library/filter-list](./screenshots/block-library-filter-list-1440.jpg)

*Figure: Filter List: filter-list — desktop 1440 × 900 (/design-block-master/en/block-library/filter-list, captured 2026-11-08).*

![Filter List: filter-list/content-types at mobile 375 × 812, published page /design-block-master/en/block-library/filter-list/content-types](./screenshots/block-library-filter-list-content-types-375.jpg)

*Figure: Filter List: filter-list/content-types — mobile 375 × 812 (/design-block-master/en/block-library/filter-list/content-types, captured 2026-11-08).*

![Filter List: filter-list/content-types at tablet 768 × 900, published page /design-block-master/en/block-library/filter-list/content-types](./screenshots/block-library-filter-list-content-types-768.jpg)

*Figure: Filter List: filter-list/content-types — tablet 768 × 900 (/design-block-master/en/block-library/filter-list/content-types, captured 2026-11-08).*

![Filter List: filter-list/content-types at small desktop 1024 × 900, published page /design-block-master/en/block-library/filter-list/content-types](./screenshots/block-library-filter-list-content-types-1024.jpg)

*Figure: Filter List: filter-list/content-types — small desktop 1024 × 900 (/design-block-master/en/block-library/filter-list/content-types, captured 2026-11-08).*

![Filter List: filter-list/content-types at desktop 1440 × 900, published page /design-block-master/en/block-library/filter-list/content-types](./screenshots/block-library-filter-list-content-types-1440.jpg)

*Figure: Filter List: filter-list/content-types — desktop 1440 × 900 (/design-block-master/en/block-library/filter-list/content-types, captured 2026-11-08).*

![Filter List: filter-list/filter-list at mobile 375 × 812, published page /design-block-master/en/block-library/filter-list/filter-list](./screenshots/block-library-filter-list-filter-list-375.jpg)

*Figure: Filter List: filter-list/filter-list — mobile 375 × 812 (/design-block-master/en/block-library/filter-list/filter-list, captured 2026-11-08).*

![Filter List: filter-list/filter-list at tablet 768 × 900, published page /design-block-master/en/block-library/filter-list/filter-list](./screenshots/block-library-filter-list-filter-list-768.jpg)

*Figure: Filter List: filter-list/filter-list — tablet 768 × 900 (/design-block-master/en/block-library/filter-list/filter-list, captured 2026-11-08).*

![Filter List: filter-list/filter-list at small desktop 1024 × 900, published page /design-block-master/en/block-library/filter-list/filter-list](./screenshots/block-library-filter-list-filter-list-1024.jpg)

*Figure: Filter List: filter-list/filter-list — small desktop 1024 × 900 (/design-block-master/en/block-library/filter-list/filter-list, captured 2026-11-08).*

![Filter List: filter-list/filter-list at desktop 1440 × 900, published page /design-block-master/en/block-library/filter-list/filter-list](./screenshots/block-library-filter-list-filter-list-1440.jpg)

*Figure: Filter List: filter-list/filter-list — desktop 1440 × 900 (/design-block-master/en/block-library/filter-list/filter-list, captured 2026-11-08).*

![Filter List: filter-list/filters at mobile 375 × 812, published page /design-block-master/en/block-library/filter-list/filters](./screenshots/block-library-filter-list-filters-375.jpg)

*Figure: Filter List: filter-list/filters — mobile 375 × 812 (/design-block-master/en/block-library/filter-list/filters, captured 2026-11-08).*

![Filter List: filter-list/filters at tablet 768 × 900, published page /design-block-master/en/block-library/filter-list/filters](./screenshots/block-library-filter-list-filters-768.jpg)

*Figure: Filter List: filter-list/filters — tablet 768 × 900 (/design-block-master/en/block-library/filter-list/filters, captured 2026-11-08).*

![Filter List: filter-list/filters at small desktop 1024 × 900, published page /design-block-master/en/block-library/filter-list/filters](./screenshots/block-library-filter-list-filters-1024.jpg)

*Figure: Filter List: filter-list/filters — small desktop 1024 × 900 (/design-block-master/en/block-library/filter-list/filters, captured 2026-11-08).*

![Filter List: filter-list/filters at desktop 1440 × 900, published page /design-block-master/en/block-library/filter-list/filters](./screenshots/block-library-filter-list-filters-1440.jpg)

*Figure: Filter List: filter-list/filters — desktop 1440 × 900 (/design-block-master/en/block-library/filter-list/filters, captured 2026-11-08).*

![Filter List: filter-list/insights-listing at mobile 375 × 812, published page /design-block-master/en/block-library/filter-list/insights-listing](./screenshots/block-library-filter-list-insights-listing-375.jpg)

*Figure: Filter List: filter-list/insights-listing — mobile 375 × 812 (/design-block-master/en/block-library/filter-list/insights-listing, captured 2026-11-08).*

![Filter List: filter-list/insights-listing at tablet 768 × 900, published page /design-block-master/en/block-library/filter-list/insights-listing](./screenshots/block-library-filter-list-insights-listing-768.jpg)

*Figure: Filter List: filter-list/insights-listing — tablet 768 × 900 (/design-block-master/en/block-library/filter-list/insights-listing, captured 2026-11-08).*

![Filter List: filter-list/insights-listing at small desktop 1024 × 900, published page /design-block-master/en/block-library/filter-list/insights-listing](./screenshots/block-library-filter-list-insights-listing-1024.jpg)

*Figure: Filter List: filter-list/insights-listing — small desktop 1024 × 900 (/design-block-master/en/block-library/filter-list/insights-listing, captured 2026-11-08).*

![Filter List: filter-list/insights-listing at desktop 1440 × 900, published page /design-block-master/en/block-library/filter-list/insights-listing](./screenshots/block-library-filter-list-insights-listing-1440.jpg)

*Figure: Filter List: filter-list/insights-listing — desktop 1440 × 900 (/design-block-master/en/block-library/filter-list/insights-listing, captured 2026-11-08).*

![Filter List: filter-list/layouts-and-card-styles at mobile 375 × 812, published page /design-block-master/en/block-library/filter-list/layouts-and-card-styles](./screenshots/block-library-filter-list-layouts-and-card-styles-375.jpg)

*Figure: Filter List: filter-list/layouts-and-card-styles — mobile 375 × 812 (/design-block-master/en/block-library/filter-list/layouts-and-card-styles, captured 2026-11-08).*

![Filter List: filter-list/layouts-and-card-styles at tablet 768 × 900, published page /design-block-master/en/block-library/filter-list/layouts-and-card-styles](./screenshots/block-library-filter-list-layouts-and-card-styles-768.jpg)

*Figure: Filter List: filter-list/layouts-and-card-styles — tablet 768 × 900 (/design-block-master/en/block-library/filter-list/layouts-and-card-styles, captured 2026-11-08).*

![Filter List: filter-list/layouts-and-card-styles at small desktop 1024 × 900, published page /design-block-master/en/block-library/filter-list/layouts-and-card-styles](./screenshots/block-library-filter-list-layouts-and-card-styles-1024.jpg)

*Figure: Filter List: filter-list/layouts-and-card-styles — small desktop 1024 × 900 (/design-block-master/en/block-library/filter-list/layouts-and-card-styles, captured 2026-11-08).*

![Filter List: filter-list/layouts-and-card-styles at desktop 1440 × 900, published page /design-block-master/en/block-library/filter-list/layouts-and-card-styles](./screenshots/block-library-filter-list-layouts-and-card-styles-1440.jpg)

*Figure: Filter List: filter-list/layouts-and-card-styles — desktop 1440 × 900 (/design-block-master/en/block-library/filter-list/layouts-and-card-styles, captured 2026-11-08).*

![Filter List: filter-list/rules at mobile 375 × 812, published page /design-block-master/en/block-library/filter-list/rules](./screenshots/block-library-filter-list-rules-375.jpg)

*Figure: Filter List: filter-list/rules — mobile 375 × 812 (/design-block-master/en/block-library/filter-list/rules, captured 2026-11-08).*

![Filter List: filter-list/rules at tablet 768 × 900, published page /design-block-master/en/block-library/filter-list/rules](./screenshots/block-library-filter-list-rules-768.jpg)

*Figure: Filter List: filter-list/rules — tablet 768 × 900 (/design-block-master/en/block-library/filter-list/rules, captured 2026-11-08).*

![Filter List: filter-list/rules at small desktop 1024 × 900, published page /design-block-master/en/block-library/filter-list/rules](./screenshots/block-library-filter-list-rules-1024.jpg)

*Figure: Filter List: filter-list/rules — small desktop 1024 × 900 (/design-block-master/en/block-library/filter-list/rules, captured 2026-11-08).*

![Filter List: filter-list/rules at desktop 1440 × 900, published page /design-block-master/en/block-library/filter-list/rules](./screenshots/block-library-filter-list-rules-1440.jpg)

*Figure: Filter List: filter-list/rules — desktop 1440 × 900 (/design-block-master/en/block-library/filter-list/rules, captured 2026-11-08).*

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
