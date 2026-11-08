---
id: "DEV-T-column-break"
title: "Column Break Block — Test Coverage"
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
relatedComponents: ["column-break"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Column Break Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-column-break |
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
| COLUMN-BREAK-QA-01 | Named | Column name "Contact details" | Label in edit mode; nothing on the page |
| COLUMN-BREAK-QA-02 | Unnamed | No name, second column | Label "Column 2" |
| COLUMN-BREAK-QA-03 | Empty column | Column Break without components | Hint in edit mode; empty column on the page |
| COLUMN-BREAK-QA-04 | Anchor | Anchor ID `anchor-contact` | The column has the id; the marker doesn't |
| COLUMN-BREAK-QA-05 | Hide | Hide block on | Column absent on the page, dimmed in edit mode |
| COLUMN-BREAK-QA-06 | Spacing | Padding top 1rem | `pt-400` on the column |
| COLUMN-BREAK-QA-07 | In a tab | 2 Column Breaks after a Tab | Two columns in the panel |
| COLUMN-BREAK-QA-08 | Legacy | Item rendered as `column` in a Columns Container | Treated as a Column Break |
| COLUMN-BREAK-QA-09 | Data layer | Inspect `adobeDataLayer` | No Column Break component |

Test cases: [05-quality-assurance/test-cases/blocks/column-break](../../../05-quality-assurance/test-cases/blocks/column-break/COLUMN-BREAK-TEST-CASES.md).

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
