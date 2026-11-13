---
id: "DEV-T-table-list"
title: "Table List Block — Test Coverage"
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
relatedComponents: ["table-list"]
relatedPages: ["/design-block-master/en/block-library/table-list","/design-block-master/en/block-library/table-list/item-actions","/design-block-master/en/block-library/table-list/motion","/design-block-master/en/block-library/table-list/numbers","/design-block-master/en/block-library/table-list/numbers-on-mobile","/design-block-master/en/block-library/table-list/table-list"]
confidence: "Medium"
primary: false
---

# Table List Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-table-list |
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
| /design-block-master/en/block-library/table-list | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/table-list/item-actions | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/table-list/motion | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/table-list/numbers | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/table-list/numbers-on-mobile | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/table-list/table-list | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| TABLE-LIST-QA-01 | Default | New block, 4 items with title, description, link | Variation 1: filled call to action (with a Link), arrows, numbers only below 600px |
| TABLE-LIST-QA-02 | Variation 2 | Variation 2 | Outline call to action, no numbers, outline Explore buttons |
| TABLE-LIST-QA-03 | Variation 3 | Variation 3, trademarks | Text link, numbers 01–04, diagonal arrows, ™ / ® after titles |
| TABLE-LIST-QA-04 | Option overrides | Style Text link, Numbers Hide, Item link Button on Variation 1 | Overrides applied |
| TABLE-LIST-QA-05 | Maximum items | 6 items, Maximum items 4 | 4 rows on the page; 2 dimmed in the editor |
| TABLE-LIST-QA-06 | Heading Type | H3 | `h3` heading, `h4` item titles |
| TABLE-LIST-QA-07 | Missing links | Item without Link (Arrow, then Button) | Decorative arrow; no button on the page, preview in the editor |
| TABLE-LIST-QA-08 | Unsupported link | Call to action Link `mailto:` | No call to action |
| TABLE-LIST-QA-09 | AEM path | Link `/content/tcs-corp/us/en/products.html` | `href="/en/products"` |
| TABLE-LIST-QA-10 | Custom numbers | Item Number 10 | "10" instead of the position |
| TABLE-LIST-QA-11 | Multiple instances | Two Table Lists | Ids `table-list-1`, `table-list-2` in the data layer |
| TABLE-LIST-QA-12 | Viewports | 375, 768, 1024, 1440px | Layout per variation as in Responsive Behavior |
| TABLE-LIST-QA-13 | Keyboard | Tab through the block | Focus outline on arrows; Enter follows links; description links reachable |
| TABLE-LIST-QA-14 | Data layer | Click an arrow and the call to action | `cmp:click`, `interaction: link`, `dc:title` "Explore {title}" / link text |
| TABLE-LIST-QA-15 | Legacy motion | Block with stored `motion` = fade | Rows fade in (Animation Type Fade in, slow) outside the editor |
| TABLE-LIST-QA-16 | Legacy header regression | Block with a heading / link header row | Header rendered from it |
| TABLE-LIST-QA-17 | Reduced motion | `prefers-reduced-motion: reduce` | No animation, no arrow transition |
| TABLE-LIST-QA-18 | Variation 4 | Variation 4, 4 items, call to action Text and Link | Outline call to action on light grey, no numbers, arrows; title / description / arrow columns from 600px, description at most 21.15rem from 900px; divider below the last row |
| TABLE-LIST-QA-19 | Variation 4 states | Hover a row, then Tab to its arrow | Row background `--color-bg-secondary`, arrow dark, focus outline on the arrow; a Button item link row isn't highlighted |
| TABLE-LIST-QA-20 | Variation 4 mobile | 375px | Call to action below the heading; title, description and arrow stacked |
| TABLE-LIST-QA-22 | Variation 5 | Variation 5, Dark Green, three items without Link | Uppercase labels beside 23.55rem descriptions from 44rem, no arrows, dividers below every row |
| TABLE-LIST-QA-23 | Variation 6 | Variation 6, four items with Trademark ™ and Links | Description top left, right-aligned 4rem title with ™, 24px arrow centred on the title |
| TABLE-LIST-QA-24 | Models & Data | Variation 4, Navy, Eyebrow, Heading position Beside, Numbers Show, Circled arrow | Two columns from 900px; titles above descriptions; circled arrows 40% white; no divider below the last row |
| TABLE-LIST-QA-25 | Narrow list | Variation 4 or 5 in a Columns Container column | Rows switch layout by the list width (container query), not the screen width |
| TABLE-LIST-QA-21 | Variation 4 dark | Background color Black or Dark Green | Light text, white arrow, transparent outline call to action; hover 5% white |

Test cases: [05-quality-assurance/test-cases/blocks/table-list](../../../05-quality-assurance/test-cases/blocks/table-list/TABLE-LIST-TEST-CASES.md).

## Screenshots

![Table List: table-list at mobile 375 × 812, published page /design-block-master/en/block-library/table-list](./screenshots/block-library-table-list-375.jpg)

*Figure: Table List: table-list — mobile 375 × 812 (/design-block-master/en/block-library/table-list, captured 2026-11-08).*

![Table List: table-list at tablet 768 × 900, published page /design-block-master/en/block-library/table-list](./screenshots/block-library-table-list-768.jpg)

*Figure: Table List: table-list — tablet 768 × 900 (/design-block-master/en/block-library/table-list, captured 2026-11-08).*

![Table List: table-list at small desktop 1024 × 900, published page /design-block-master/en/block-library/table-list](./screenshots/block-library-table-list-1024.jpg)

*Figure: Table List: table-list — small desktop 1024 × 900 (/design-block-master/en/block-library/table-list, captured 2026-11-08).*

![Table List: table-list at desktop 1440 × 900, published page /design-block-master/en/block-library/table-list](./screenshots/block-library-table-list-1440.jpg)

*Figure: Table List: table-list — desktop 1440 × 900 (/design-block-master/en/block-library/table-list, captured 2026-11-08).*

![Table List: table-list/item-actions at mobile 375 × 812, published page /design-block-master/en/block-library/table-list/item-actions](./screenshots/block-library-table-list-item-actions-375.jpg)

*Figure: Table List: table-list/item-actions — mobile 375 × 812 (/design-block-master/en/block-library/table-list/item-actions, captured 2026-11-08).*

![Table List: table-list/item-actions at tablet 768 × 900, published page /design-block-master/en/block-library/table-list/item-actions](./screenshots/block-library-table-list-item-actions-768.jpg)

*Figure: Table List: table-list/item-actions — tablet 768 × 900 (/design-block-master/en/block-library/table-list/item-actions, captured 2026-11-08).*

![Table List: table-list/item-actions at small desktop 1024 × 900, published page /design-block-master/en/block-library/table-list/item-actions](./screenshots/block-library-table-list-item-actions-1024.jpg)

*Figure: Table List: table-list/item-actions — small desktop 1024 × 900 (/design-block-master/en/block-library/table-list/item-actions, captured 2026-11-08).*

![Table List: table-list/item-actions at desktop 1440 × 900, published page /design-block-master/en/block-library/table-list/item-actions](./screenshots/block-library-table-list-item-actions-1440.jpg)

*Figure: Table List: table-list/item-actions — desktop 1440 × 900 (/design-block-master/en/block-library/table-list/item-actions, captured 2026-11-08).*

![Table List: table-list/motion at mobile 375 × 812, published page /design-block-master/en/block-library/table-list/motion](./screenshots/block-library-table-list-motion-375.jpg)

*Figure: Table List: table-list/motion — mobile 375 × 812 (/design-block-master/en/block-library/table-list/motion, captured 2026-11-08).*

![Table List: table-list/motion at tablet 768 × 900, published page /design-block-master/en/block-library/table-list/motion](./screenshots/block-library-table-list-motion-768.jpg)

*Figure: Table List: table-list/motion — tablet 768 × 900 (/design-block-master/en/block-library/table-list/motion, captured 2026-11-08).*

![Table List: table-list/motion at small desktop 1024 × 900, published page /design-block-master/en/block-library/table-list/motion](./screenshots/block-library-table-list-motion-1024.jpg)

*Figure: Table List: table-list/motion — small desktop 1024 × 900 (/design-block-master/en/block-library/table-list/motion, captured 2026-11-08).*

![Table List: table-list/motion at desktop 1440 × 900, published page /design-block-master/en/block-library/table-list/motion](./screenshots/block-library-table-list-motion-1440.jpg)

*Figure: Table List: table-list/motion — desktop 1440 × 900 (/design-block-master/en/block-library/table-list/motion, captured 2026-11-08).*

![Table List: table-list/numbers at mobile 375 × 812, published page /design-block-master/en/block-library/table-list/numbers](./screenshots/block-library-table-list-numbers-375.jpg)

*Figure: Table List: table-list/numbers — mobile 375 × 812 (/design-block-master/en/block-library/table-list/numbers, captured 2026-11-08).*

![Table List: table-list/numbers at tablet 768 × 900, published page /design-block-master/en/block-library/table-list/numbers](./screenshots/block-library-table-list-numbers-768.jpg)

*Figure: Table List: table-list/numbers — tablet 768 × 900 (/design-block-master/en/block-library/table-list/numbers, captured 2026-11-08).*

![Table List: table-list/numbers at small desktop 1024 × 900, published page /design-block-master/en/block-library/table-list/numbers](./screenshots/block-library-table-list-numbers-1024.jpg)

*Figure: Table List: table-list/numbers — small desktop 1024 × 900 (/design-block-master/en/block-library/table-list/numbers, captured 2026-11-08).*

![Table List: table-list/numbers at desktop 1440 × 900, published page /design-block-master/en/block-library/table-list/numbers](./screenshots/block-library-table-list-numbers-1440.jpg)

*Figure: Table List: table-list/numbers — desktop 1440 × 900 (/design-block-master/en/block-library/table-list/numbers, captured 2026-11-08).*

![Table List: table-list/numbers-on-mobile at mobile 375 × 812, published page /design-block-master/en/block-library/table-list/numbers-on-mobile](./screenshots/block-library-table-list-numbers-on-mobile-375.jpg)

*Figure: Table List: table-list/numbers-on-mobile — mobile 375 × 812 (/design-block-master/en/block-library/table-list/numbers-on-mobile, captured 2026-11-08).*

![Table List: table-list/numbers-on-mobile at tablet 768 × 900, published page /design-block-master/en/block-library/table-list/numbers-on-mobile](./screenshots/block-library-table-list-numbers-on-mobile-768.jpg)

*Figure: Table List: table-list/numbers-on-mobile — tablet 768 × 900 (/design-block-master/en/block-library/table-list/numbers-on-mobile, captured 2026-11-08).*

![Table List: table-list/numbers-on-mobile at small desktop 1024 × 900, published page /design-block-master/en/block-library/table-list/numbers-on-mobile](./screenshots/block-library-table-list-numbers-on-mobile-1024.jpg)

*Figure: Table List: table-list/numbers-on-mobile — small desktop 1024 × 900 (/design-block-master/en/block-library/table-list/numbers-on-mobile, captured 2026-11-08).*

![Table List: table-list/numbers-on-mobile at desktop 1440 × 900, published page /design-block-master/en/block-library/table-list/numbers-on-mobile](./screenshots/block-library-table-list-numbers-on-mobile-1440.jpg)

*Figure: Table List: table-list/numbers-on-mobile — desktop 1440 × 900 (/design-block-master/en/block-library/table-list/numbers-on-mobile, captured 2026-11-08).*

![Table List: table-list/table-list at mobile 375 × 812, published page /design-block-master/en/block-library/table-list/table-list](./screenshots/block-library-table-list-table-list-375.jpg)

*Figure: Table List: table-list/table-list — mobile 375 × 812 (/design-block-master/en/block-library/table-list/table-list, captured 2026-11-08).*

![Table List: table-list/table-list at tablet 768 × 900, published page /design-block-master/en/block-library/table-list/table-list](./screenshots/block-library-table-list-table-list-768.jpg)

*Figure: Table List: table-list/table-list — tablet 768 × 900 (/design-block-master/en/block-library/table-list/table-list, captured 2026-11-08).*

![Table List: table-list/table-list at small desktop 1024 × 900, published page /design-block-master/en/block-library/table-list/table-list](./screenshots/block-library-table-list-table-list-1024.jpg)

*Figure: Table List: table-list/table-list — small desktop 1024 × 900 (/design-block-master/en/block-library/table-list/table-list, captured 2026-11-08).*

![Table List: table-list/table-list at desktop 1440 × 900, published page /design-block-master/en/block-library/table-list/table-list](./screenshots/block-library-table-list-table-list-1440.jpg)

*Figure: Table List: table-list/table-list — desktop 1440 × 900 (/design-block-master/en/block-library/table-list/table-list, captured 2026-11-08).*

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
