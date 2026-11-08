---
id: "DEV-T-interactive-dashboard"
title: "Interactive Dashboard Block — Test Coverage"
role: "Development"
topic: "tests"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: ["interactive-dashboard"]
relatedPages: ["/design-block-master/en/block-library/interactive-dashboard","/design-block-master/en/block-library/interactive-dashboard/interactive-dashboard"]
confidence: "Medium"
primary: false
---

# Interactive Dashboard Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-interactive-dashboard |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Unit tests, automated reference-page checks and manual test guidance for the block |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Unit tests](#unit-tests)
- [Automated checks of the block library pages (executed 8 November 2026)](#automated-checks-of-the-block-library-pages-executed-8-november-2026)
- [Manual test guidance (block README)](#manual-test-guidance-block-readme)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Unit tests

No unit test is specific to this block (shared tests: test/models, test/items, test/docs, test/motion).

## Automated checks of the block library pages (executed 8 November 2026)

Per page: HTTP status and horizontal overflow at 375 / 768 / 1024 / 1440 px, console errors, failed requests and DOM accessibility checks at 1440 px (evidence: [screenshot register](../../../SCREENSHOT-REGISTER.md)).

| Page | 375 / 768 / 1024 / 1440 | Console errors | Failed requests | Accessibility (DOM) |
| --- | --- | --- | --- | --- |
| /design-block-master/en/block-library/interactive-dashboard | ok / ok / ok / ok | 8 | 8 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/interactive-dashboard/interactive-dashboard | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| INTERACTIVE-DASHBOARD-QA-01 | Availability | Add (+) in a Section, Columns Container, Tabs Container | Interactive Dashboard not offered |
| INTERACTIVE-DASHBOARD-QA-02 | Site rendering | Existing instance, preview host | Nothing displayed at 1440 / 768 / 390 px |
| INTERACTIVE-DASHBOARD-QA-03 | Editor | Edit mode | Dashed box "Interactive Dashboard (placeholder)", at least 10rem |
| INTERACTIVE-DASHBOARD-QA-04 | Preview mode | Universal Editor Preview | Box hidden |
| INTERACTIVE-DASHBOARD-QA-05 | Authored content | Rows inside the block | Discarded |
| INTERACTIVE-DASHBOARD-QA-06 | Hide block | On | Wrapper hidden; faded in edit mode |
| INTERACTIVE-DASHBOARD-QA-07 | Data layer | Instance on the page | One component entry, no events |
| INTERACTIVE-DASHBOARD-QA-08 | Regression | Library page `block-library/interactive-dashboard/interactive-dashboard` | Still editable in the editor |

Test cases: [05-quality-assurance/test-cases/blocks/interactive-dashboard](../../../05-quality-assurance/test-cases/blocks/interactive-dashboard/INTERACTIVE-DASHBOARD-TEST-CASES.md).

## Screenshots

![Interactive Dashboard: interactive-dashboard at mobile 375 × 812, published page /design-block-master/en/block-library/interactive-dashboard](./screenshots/block-library-interactive-dashboard-375.jpg)

*Figure: Interactive Dashboard: interactive-dashboard — mobile 375 × 812 (/design-block-master/en/block-library/interactive-dashboard, captured 2026-11-08).*

![Interactive Dashboard: interactive-dashboard at tablet 768 × 900, published page /design-block-master/en/block-library/interactive-dashboard](./screenshots/block-library-interactive-dashboard-768.jpg)

*Figure: Interactive Dashboard: interactive-dashboard — tablet 768 × 900 (/design-block-master/en/block-library/interactive-dashboard, captured 2026-11-08).*

![Interactive Dashboard: interactive-dashboard at small desktop 1024 × 900, published page /design-block-master/en/block-library/interactive-dashboard](./screenshots/block-library-interactive-dashboard-1024.jpg)

*Figure: Interactive Dashboard: interactive-dashboard — small desktop 1024 × 900 (/design-block-master/en/block-library/interactive-dashboard, captured 2026-11-08).*

![Interactive Dashboard: interactive-dashboard at desktop 1440 × 900, published page /design-block-master/en/block-library/interactive-dashboard](./screenshots/block-library-interactive-dashboard-1440.jpg)

*Figure: Interactive Dashboard: interactive-dashboard — desktop 1440 × 900 (/design-block-master/en/block-library/interactive-dashboard, captured 2026-11-08).*

![Interactive Dashboard: interactive-dashboard/interactive-dashboard at mobile 375 × 812, published page /design-block-master/en/block-library/interactive-dashboard/interactive-dashboard](./screenshots/block-library-interactive-dashboard-interactive-dashboard-375.jpg)

*Figure: Interactive Dashboard: interactive-dashboard/interactive-dashboard — mobile 375 × 812 (/design-block-master/en/block-library/interactive-dashboard/interactive-dashboard, captured 2026-11-08).*

![Interactive Dashboard: interactive-dashboard/interactive-dashboard at tablet 768 × 900, published page /design-block-master/en/block-library/interactive-dashboard/interactive-dashboard](./screenshots/block-library-interactive-dashboard-interactive-dashboard-768.jpg)

*Figure: Interactive Dashboard: interactive-dashboard/interactive-dashboard — tablet 768 × 900 (/design-block-master/en/block-library/interactive-dashboard/interactive-dashboard, captured 2026-11-08).*

![Interactive Dashboard: interactive-dashboard/interactive-dashboard at small desktop 1024 × 900, published page /design-block-master/en/block-library/interactive-dashboard/interactive-dashboard](./screenshots/block-library-interactive-dashboard-interactive-dashboard-1024.jpg)

*Figure: Interactive Dashboard: interactive-dashboard/interactive-dashboard — small desktop 1024 × 900 (/design-block-master/en/block-library/interactive-dashboard/interactive-dashboard, captured 2026-11-08).*

![Interactive Dashboard: interactive-dashboard/interactive-dashboard at desktop 1440 × 900, published page /design-block-master/en/block-library/interactive-dashboard/interactive-dashboard](./screenshots/block-library-interactive-dashboard-interactive-dashboard-1440.jpg)

*Figure: Interactive Dashboard: interactive-dashboard/interactive-dashboard — desktop 1440 × 900 (/design-block-master/en/block-library/interactive-dashboard/interactive-dashboard, captured 2026-11-08).*

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
