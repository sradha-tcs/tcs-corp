---
id: "DEV-T-tabs"
title: "Tabs Block — Test Coverage"
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
relatedComponents: ["tabs"]
relatedPages: ["/design-block-master/en/block-library/tabs","/design-block-master/en/block-library/tabs/fragments","/design-block-master/en/block-library/tabs/fragments/cloud-overview","/design-block-master/en/block-library/tabs/fragments/consulting-overview","/design-block-master/en/block-library/tabs/fragments/security-overview","/design-block-master/en/block-library/tabs/fragments/tab-industries","/design-block-master/en/block-library/tabs/fragments/tab-overview","/design-block-master/en/block-library/tabs/tab","/design-block-master/en/block-library/tabs/tab-deep-link","/design-block-master/en/block-library/tabs/tabs-block","/design-block-master/en/block-library/tabs/tabs-block-styles","/design-block-master/en/block-library/tabs/tabs-block-with-fragments","/design-block-master/en/block-library/tabs/tabs-fixed-width","/design-block-master/en/block-library/tabs/tabs-section"]
confidence: "Medium"
primary: false
---

# Tabs Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-tabs |
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
| /design-block-master/en/block-library/tabs | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/tabs/fragments | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/tabs/fragments/cloud-overview | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/tabs/fragments/consulting-overview | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/tabs/fragments/security-overview | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/tabs/fragments/tab-industries | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/tabs/fragments/tab-overview | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/tabs/tab | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/tabs/tab-deep-link | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/tabs/tabs-block | ok / ok / ok / ok | 16 | 16 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/tabs/tabs-block-styles | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/tabs/tabs-block-with-fragments | ok / ok / ok / ok | 12 | 12 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/tabs/tabs-fixed-width | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/tabs/tabs-section | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 1 heading skips |

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
|---|---|---|---|
| TABS-QA-01 | Default Tabs Container | 3 Tabs with Titles and content, no Active tab | Underline tabs, first tab selected, one panel shown |
| TABS-QA-02 | Active tab | Active tab on the second Tab | Second tab selected on load |
| TABS-QA-03 | Deep link | Open the page with `#cloud` (Tab ID cloud) | Cloud selected; Tabs scrolled below the header |
| TABS-QA-04 | Deep link into a hidden tab | Link to an anchor inside a non-selected tab (Anchor List or `#id`) | Its tab opens, then the target scrolls into view |
| TABS-QA-05 | Styles | Underline, Boxed, Pills | Styles as described; selected state visible |
| TABS-QA-06 | Alignment | Left, Center, Full width (stretch) | Tabs aligned / stretched |
| TABS-QA-07 | Vertical | Orientation Vertical at 1440px and 390px | Left column from 900px; above the panel below |
| TABS-QA-08 | Column Breaks in a tab | Heading, 2 Column Breaks, Columns per row 2 | Heading above two columns from 900px; stacked below |
| TABS-QA-09 | Content before the first Tab | A Text before the first Tab | An extra first tab "Tab 1" |
| TABS-QA-10 | Hidden Tab | Hide block on one Tab | Tab and its content absent on the page; dimmed chip in edit mode |
| TABS-QA-11 | Tabs block | 2 Tab items with published fragments | Each panel shows its fragment |
| TABS-QA-12 | Missing fragment | Tab item with no or unpublished fragment | Empty panel, other tabs work |
| TABS-QA-13 | Empty | Tabs Container without Tabs | Nothing on the page; hint in edit mode |
| TABS-QA-14 | Keyboard | Arrow keys, Home, End, Tab | As in the key table; focus outline visible |
| TABS-QA-15 | Media in a hidden tab | Video playing, then another tab | The video pauses |
| TABS-QA-16 | Nested Tabs | Tabs block inside a tab, other Style | Inner tabs keep their own style |
| TABS-QA-17 | Multiple instances | Two Tabs Containers with the same Tab IDs | Unique ids (`-2` suffix); each works independently |
| TABS-QA-18 | Data layer | Switch tabs | `cmp:show` per change with the panel id; none on load; panels listed as `tabs/item` |
| TABS-QA-19 | Container Additional tab | Padding top, Hide block, Animation on a Tabs Container | Classes on the `tabs` block; Hide hides the section |
| TABS-QA-20 | Existing content | A Tabs Container holding built-in Columns authored before | Renders as before |

Test cases: [05-quality-assurance/test-cases/blocks/tabs](../../../05-quality-assurance/test-cases/blocks/tabs/TABS-TEST-CASES.md).

## Screenshots

![Tabs: tabs at mobile 375 × 812, published page /design-block-master/en/block-library/tabs](./screenshots/block-library-tabs-375.jpg)

*Figure: Tabs: tabs — mobile 375 × 812 (/design-block-master/en/block-library/tabs, captured 2026-11-08).*

![Tabs: tabs at tablet 768 × 900, published page /design-block-master/en/block-library/tabs](./screenshots/block-library-tabs-768.jpg)

*Figure: Tabs: tabs — tablet 768 × 900 (/design-block-master/en/block-library/tabs, captured 2026-11-08).*

![Tabs: tabs at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs](./screenshots/block-library-tabs-1024.jpg)

*Figure: Tabs: tabs — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs, captured 2026-11-08).*

![Tabs: tabs at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs](./screenshots/block-library-tabs-1440.jpg)

*Figure: Tabs: tabs — desktop 1440 × 900 (/design-block-master/en/block-library/tabs, captured 2026-11-08).*

![Tabs: tabs/fragments at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/fragments](./screenshots/block-library-tabs-fragments-375.jpg)

*Figure: Tabs: tabs/fragments — mobile 375 × 812 (/design-block-master/en/block-library/tabs/fragments, captured 2026-11-08).*

![Tabs: tabs/fragments at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/fragments](./screenshots/block-library-tabs-fragments-768.jpg)

*Figure: Tabs: tabs/fragments — tablet 768 × 900 (/design-block-master/en/block-library/tabs/fragments, captured 2026-11-08).*

![Tabs: tabs/fragments at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/fragments](./screenshots/block-library-tabs-fragments-1024.jpg)

*Figure: Tabs: tabs/fragments — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/fragments, captured 2026-11-08).*

![Tabs: tabs/fragments at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/fragments](./screenshots/block-library-tabs-fragments-1440.jpg)

*Figure: Tabs: tabs/fragments — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/fragments, captured 2026-11-08).*

![Tabs: tabs/fragments/cloud-overview at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/fragments/cloud-overview](./screenshots/block-library-tabs-fragments-cloud-overview-375.jpg)

*Figure: Tabs: tabs/fragments/cloud-overview — mobile 375 × 812 (/design-block-master/en/block-library/tabs/fragments/cloud-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/cloud-overview at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/fragments/cloud-overview](./screenshots/block-library-tabs-fragments-cloud-overview-768.jpg)

*Figure: Tabs: tabs/fragments/cloud-overview — tablet 768 × 900 (/design-block-master/en/block-library/tabs/fragments/cloud-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/cloud-overview at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/fragments/cloud-overview](./screenshots/block-library-tabs-fragments-cloud-overview-1024.jpg)

*Figure: Tabs: tabs/fragments/cloud-overview — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/fragments/cloud-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/cloud-overview at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/fragments/cloud-overview](./screenshots/block-library-tabs-fragments-cloud-overview-1440.jpg)

*Figure: Tabs: tabs/fragments/cloud-overview — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/fragments/cloud-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/consulting-overview at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/fragments/consulting-overview](./screenshots/block-library-tabs-fragments-consulting-overview-375.jpg)

*Figure: Tabs: tabs/fragments/consulting-overview — mobile 375 × 812 (/design-block-master/en/block-library/tabs/fragments/consulting-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/consulting-overview at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/fragments/consulting-overview](./screenshots/block-library-tabs-fragments-consulting-overview-768.jpg)

*Figure: Tabs: tabs/fragments/consulting-overview — tablet 768 × 900 (/design-block-master/en/block-library/tabs/fragments/consulting-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/consulting-overview at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/fragments/consulting-overview](./screenshots/block-library-tabs-fragments-consulting-overview-1024.jpg)

*Figure: Tabs: tabs/fragments/consulting-overview — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/fragments/consulting-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/consulting-overview at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/fragments/consulting-overview](./screenshots/block-library-tabs-fragments-consulting-overview-1440.jpg)

*Figure: Tabs: tabs/fragments/consulting-overview — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/fragments/consulting-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/security-overview at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/fragments/security-overview](./screenshots/block-library-tabs-fragments-security-overview-375.jpg)

*Figure: Tabs: tabs/fragments/security-overview — mobile 375 × 812 (/design-block-master/en/block-library/tabs/fragments/security-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/security-overview at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/fragments/security-overview](./screenshots/block-library-tabs-fragments-security-overview-768.jpg)

*Figure: Tabs: tabs/fragments/security-overview — tablet 768 × 900 (/design-block-master/en/block-library/tabs/fragments/security-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/security-overview at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/fragments/security-overview](./screenshots/block-library-tabs-fragments-security-overview-1024.jpg)

*Figure: Tabs: tabs/fragments/security-overview — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/fragments/security-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/security-overview at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/fragments/security-overview](./screenshots/block-library-tabs-fragments-security-overview-1440.jpg)

*Figure: Tabs: tabs/fragments/security-overview — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/fragments/security-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/tab-industries at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/fragments/tab-industries](./screenshots/block-library-tabs-fragments-tab-industries-375.jpg)

*Figure: Tabs: tabs/fragments/tab-industries — mobile 375 × 812 (/design-block-master/en/block-library/tabs/fragments/tab-industries, captured 2026-11-08).*

![Tabs: tabs/fragments/tab-industries at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/fragments/tab-industries](./screenshots/block-library-tabs-fragments-tab-industries-768.jpg)

*Figure: Tabs: tabs/fragments/tab-industries — tablet 768 × 900 (/design-block-master/en/block-library/tabs/fragments/tab-industries, captured 2026-11-08).*

![Tabs: tabs/fragments/tab-industries at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/fragments/tab-industries](./screenshots/block-library-tabs-fragments-tab-industries-1024.jpg)

*Figure: Tabs: tabs/fragments/tab-industries — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/fragments/tab-industries, captured 2026-11-08).*

![Tabs: tabs/fragments/tab-industries at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/fragments/tab-industries](./screenshots/block-library-tabs-fragments-tab-industries-1440.jpg)

*Figure: Tabs: tabs/fragments/tab-industries — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/fragments/tab-industries, captured 2026-11-08).*

![Tabs: tabs/fragments/tab-overview at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/fragments/tab-overview](./screenshots/block-library-tabs-fragments-tab-overview-375.jpg)

*Figure: Tabs: tabs/fragments/tab-overview — mobile 375 × 812 (/design-block-master/en/block-library/tabs/fragments/tab-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/tab-overview at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/fragments/tab-overview](./screenshots/block-library-tabs-fragments-tab-overview-768.jpg)

*Figure: Tabs: tabs/fragments/tab-overview — tablet 768 × 900 (/design-block-master/en/block-library/tabs/fragments/tab-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/tab-overview at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/fragments/tab-overview](./screenshots/block-library-tabs-fragments-tab-overview-1024.jpg)

*Figure: Tabs: tabs/fragments/tab-overview — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/fragments/tab-overview, captured 2026-11-08).*

![Tabs: tabs/fragments/tab-overview at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/fragments/tab-overview](./screenshots/block-library-tabs-fragments-tab-overview-1440.jpg)

*Figure: Tabs: tabs/fragments/tab-overview — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/fragments/tab-overview, captured 2026-11-08).*

![Tabs: tabs/tab at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/tab](./screenshots/block-library-tabs-tab-375.jpg)

*Figure: Tabs: tabs/tab — mobile 375 × 812 (/design-block-master/en/block-library/tabs/tab, captured 2026-11-08).*

![Tabs: tabs/tab at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/tab](./screenshots/block-library-tabs-tab-768.jpg)

*Figure: Tabs: tabs/tab — tablet 768 × 900 (/design-block-master/en/block-library/tabs/tab, captured 2026-11-08).*

![Tabs: tabs/tab at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/tab](./screenshots/block-library-tabs-tab-1024.jpg)

*Figure: Tabs: tabs/tab — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/tab, captured 2026-11-08).*

![Tabs: tabs/tab at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/tab](./screenshots/block-library-tabs-tab-1440.jpg)

*Figure: Tabs: tabs/tab — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/tab, captured 2026-11-08).*

![Tabs: tabs/tab-deep-link at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/tab-deep-link](./screenshots/block-library-tabs-tab-deep-link-375.jpg)

*Figure: Tabs: tabs/tab-deep-link — mobile 375 × 812 (/design-block-master/en/block-library/tabs/tab-deep-link, captured 2026-11-08).*

![Tabs: tabs/tab-deep-link at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/tab-deep-link](./screenshots/block-library-tabs-tab-deep-link-768.jpg)

*Figure: Tabs: tabs/tab-deep-link — tablet 768 × 900 (/design-block-master/en/block-library/tabs/tab-deep-link, captured 2026-11-08).*

![Tabs: tabs/tab-deep-link at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/tab-deep-link](./screenshots/block-library-tabs-tab-deep-link-1024.jpg)

*Figure: Tabs: tabs/tab-deep-link — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/tab-deep-link, captured 2026-11-08).*

![Tabs: tabs/tab-deep-link at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/tab-deep-link](./screenshots/block-library-tabs-tab-deep-link-1440.jpg)

*Figure: Tabs: tabs/tab-deep-link — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/tab-deep-link, captured 2026-11-08).*

![Tabs: tabs/tabs-block at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/tabs-block](./screenshots/block-library-tabs-tabs-block-375.jpg)

*Figure: Tabs: tabs/tabs-block — mobile 375 × 812 (/design-block-master/en/block-library/tabs/tabs-block, captured 2026-11-08).*

![Tabs: tabs/tabs-block at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/tabs-block](./screenshots/block-library-tabs-tabs-block-768.jpg)

*Figure: Tabs: tabs/tabs-block — tablet 768 × 900 (/design-block-master/en/block-library/tabs/tabs-block, captured 2026-11-08).*

![Tabs: tabs/tabs-block at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/tabs-block](./screenshots/block-library-tabs-tabs-block-1024.jpg)

*Figure: Tabs: tabs/tabs-block — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/tabs-block, captured 2026-11-08).*

![Tabs: tabs/tabs-block at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/tabs-block](./screenshots/block-library-tabs-tabs-block-1440.jpg)

*Figure: Tabs: tabs/tabs-block — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/tabs-block, captured 2026-11-08).*

![Tabs: tabs/tabs-block-styles at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/tabs-block-styles](./screenshots/block-library-tabs-tabs-block-styles-375.jpg)

*Figure: Tabs: tabs/tabs-block-styles — mobile 375 × 812 (/design-block-master/en/block-library/tabs/tabs-block-styles, captured 2026-11-08).*

![Tabs: tabs/tabs-block-styles at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/tabs-block-styles](./screenshots/block-library-tabs-tabs-block-styles-768.jpg)

*Figure: Tabs: tabs/tabs-block-styles — tablet 768 × 900 (/design-block-master/en/block-library/tabs/tabs-block-styles, captured 2026-11-08).*

![Tabs: tabs/tabs-block-styles at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/tabs-block-styles](./screenshots/block-library-tabs-tabs-block-styles-1024.jpg)

*Figure: Tabs: tabs/tabs-block-styles — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/tabs-block-styles, captured 2026-11-08).*

![Tabs: tabs/tabs-block-styles at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/tabs-block-styles](./screenshots/block-library-tabs-tabs-block-styles-1440.jpg)

*Figure: Tabs: tabs/tabs-block-styles — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/tabs-block-styles, captured 2026-11-08).*

![Tabs: tabs/tabs-block-with-fragments at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/tabs-block-with-fragments](./screenshots/block-library-tabs-tabs-block-with-fragments-375.jpg)

*Figure: Tabs: tabs/tabs-block-with-fragments — mobile 375 × 812 (/design-block-master/en/block-library/tabs/tabs-block-with-fragments, captured 2026-11-08).*

![Tabs: tabs/tabs-block-with-fragments at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/tabs-block-with-fragments](./screenshots/block-library-tabs-tabs-block-with-fragments-768.jpg)

*Figure: Tabs: tabs/tabs-block-with-fragments — tablet 768 × 900 (/design-block-master/en/block-library/tabs/tabs-block-with-fragments, captured 2026-11-08).*

![Tabs: tabs/tabs-block-with-fragments at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/tabs-block-with-fragments](./screenshots/block-library-tabs-tabs-block-with-fragments-1024.jpg)

*Figure: Tabs: tabs/tabs-block-with-fragments — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/tabs-block-with-fragments, captured 2026-11-08).*

![Tabs: tabs/tabs-block-with-fragments at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/tabs-block-with-fragments](./screenshots/block-library-tabs-tabs-block-with-fragments-1440.jpg)

*Figure: Tabs: tabs/tabs-block-with-fragments — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/tabs-block-with-fragments, captured 2026-11-08).*

![Tabs: tabs/tabs-fixed-width at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/tabs-fixed-width](./screenshots/block-library-tabs-tabs-fixed-width-375.jpg)

*Figure: Tabs: tabs/tabs-fixed-width — mobile 375 × 812 (/design-block-master/en/block-library/tabs/tabs-fixed-width, captured 2026-11-08).*

![Tabs: tabs/tabs-fixed-width at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/tabs-fixed-width](./screenshots/block-library-tabs-tabs-fixed-width-768.jpg)

*Figure: Tabs: tabs/tabs-fixed-width — tablet 768 × 900 (/design-block-master/en/block-library/tabs/tabs-fixed-width, captured 2026-11-08).*

![Tabs: tabs/tabs-fixed-width at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/tabs-fixed-width](./screenshots/block-library-tabs-tabs-fixed-width-1024.jpg)

*Figure: Tabs: tabs/tabs-fixed-width — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/tabs-fixed-width, captured 2026-11-08).*

![Tabs: tabs/tabs-fixed-width at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/tabs-fixed-width](./screenshots/block-library-tabs-tabs-fixed-width-1440.jpg)

*Figure: Tabs: tabs/tabs-fixed-width — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/tabs-fixed-width, captured 2026-11-08).*

![Tabs: tabs/tabs-section at mobile 375 × 812, published page /design-block-master/en/block-library/tabs/tabs-section](./screenshots/block-library-tabs-tabs-section-375.jpg)

*Figure: Tabs: tabs/tabs-section — mobile 375 × 812 (/design-block-master/en/block-library/tabs/tabs-section, captured 2026-11-08).*

![Tabs: tabs/tabs-section at tablet 768 × 900, published page /design-block-master/en/block-library/tabs/tabs-section](./screenshots/block-library-tabs-tabs-section-768.jpg)

*Figure: Tabs: tabs/tabs-section — tablet 768 × 900 (/design-block-master/en/block-library/tabs/tabs-section, captured 2026-11-08).*

![Tabs: tabs/tabs-section at small desktop 1024 × 900, published page /design-block-master/en/block-library/tabs/tabs-section](./screenshots/block-library-tabs-tabs-section-1024.jpg)

*Figure: Tabs: tabs/tabs-section — small desktop 1024 × 900 (/design-block-master/en/block-library/tabs/tabs-section, captured 2026-11-08).*

![Tabs: tabs/tabs-section at desktop 1440 × 900, published page /design-block-master/en/block-library/tabs/tabs-section](./screenshots/block-library-tabs-tabs-section-1440.jpg)

*Figure: Tabs: tabs/tabs-section — desktop 1440 × 900 (/design-block-master/en/block-library/tabs/tabs-section, captured 2026-11-08).*

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
