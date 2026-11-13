---
id: "DEV-T-button-block"
title: "Button Block — Test Coverage"
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
relatedComponents: ["button-block"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Button Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-button-block |
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

No block library page.

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| BUTTON-BLOCK-QA-01 | Default | Link, Text | Primary pill, left aligned |
| BUTTON-BLOCK-QA-02 | Types | Primary / Secondary / Tertiary | Matching styles; hover states |
| BUTTON-BLOCK-QA-03 | Icon view | View Icon, each Icon, each Type | Round icon button; `aria-label` = Text |
| BUTTON-BLOCK-QA-04 | Link view | View Link | Underlined link with chevron; Type hidden |
| BUTTON-BLOCK-QA-05 | Alignment | Left / Center / Right | `button-align-*` on the paragraph |
| BUTTON-BLOCK-QA-06 | Title | Title set / empty | `title` only when set (Icon view: the name) |
| BUTTON-BLOCK-QA-07 | No link | Link empty | Nothing on the page; hint in the editor |
| BUTTON-BLOCK-QA-08 | Dark section | Section Style Dark | Inverted buttons |
| BUTTON-BLOCK-QA-09 | Long label | About 70 characters at 390 px | Clipped, no wrap (known) |
| BUTTON-BLOCK-QA-10 | Multiple instances | Three Buttons | `button-block-1` … `-3`; clicks attributed to each |
| BUTTON-BLOCK-QA-11 | Keyboard | Tab, Enter | Focus outline; link followed |
| BUTTON-BLOCK-QA-12 | Data layer | Click internal, external, PDF links | `xdm:linkType` `other`, `exit`, `download` |
| BUTTON-BLOCK-QA-13 | Editor | Change View in the dialog | The canvas updates at once |
| BUTTON-BLOCK-QA-14 | Existing content | Built-in Buttons authored before | Still render Primary / Secondary |

Test cases: [05-quality-assurance/test-cases/blocks/button-block](../../../05-quality-assurance/test-cases/blocks/button-block/BUTTON-BLOCK-TEST-CASES.md).

## Screenshots

No block library page: no evidence screenshot.

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
