---
id: "DEV-T-tab"
title: "Tab Block — Test Coverage"
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
relatedComponents: ["tab"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Tab Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-tab |
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

No block library page.

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
|---|---|---|---|
| TAB-QA-01 | Standard | Title only | Tab button with the Title; panel id `{base}-item-{n}` |
| TAB-QA-02 | Empty Title | Title empty | Label "Tab {n}" |
| TAB-QA-03 | ID | ID `cloud`; open `#cloud` | Tab opens; panel id `cloud` |
| TAB-QA-04 | Duplicate ID | Two Tabs with ID `cloud` | Second panel `cloud-2` |
| TAB-QA-05 | Active | Active tab on the third Tab | Third tab selected on load |
| TAB-QA-06 | Columns per row | 2, with three Column Breaks | Two columns per row, the third in a new row |
| TAB-QA-07 | Hide block | On | Tab and content absent on the page; dimmed chip in edit mode |
| TAB-QA-08 | Chip | Published page | No chip visible |
| TAB-QA-09 | Live label | Change the Title in the editor | Tab button updates at once |
| TAB-QA-10 | Data layer | Inspect `adobeDataLayer` | No component for the Tab; the panel named by the Title |

Test cases: [05-quality-assurance/test-cases/blocks/tab](../../../05-quality-assurance/test-cases/blocks/tab/TAB-TEST-CASES.md).

## Screenshots

No block library page: no evidence screenshot.

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
