---
id: "DEV-T-media-contacts"
title: "Media Contacts Block — Test Coverage"
role: "Development"
topic: "tests"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: ["test/media-contacts/media-contacts-data.test.mjs"]
relatedComponents: ["media-contacts"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Media Contacts Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-media-contacts |
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
| Source files | test/media-contacts/media-contacts-data.test.mjs |
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
| `test/media-contacts/media-contacts-data.test.mjs` | groupHeading; groupContacts; telHref | 8 |

## Automated checks of the block library pages (executed 13 November 2026)

Per page: HTTP status and horizontal overflow at 375 / 768 / 1024 / 1440 px, console errors, failed requests and DOM accessibility checks at 1440 px (evidence: [screenshot register](../../../SCREENSHOT-REGISTER.md)).

No block library page.

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| MC-QA-01 | Grouping | Three rows with the same designation and region | One heading, three links one below the other |
| MC-QA-02 | Heading | Designation empty, region "Asia Pacific" | Heading "Asia Pacific" |
| MC-QA-03 | Default title | Title empty | "Media contacts" at the Title Type level |
| MC-QA-04 | Heading levels | Title Type H2 | Group headings H3 |
| MC-QA-05 | Region | Page `region` Europe, rows for Europe | Only the Europe rows |
| MC-QA-06 | Region fallback | Page `region` Global | All rows |
| MC-QA-07 | Empty sheet | No rows | Block hidden on the page; hint in Universal Editor |
| MC-QA-08 | Links | E-mail and phone | `mailto:` with the address; `tel:` with digits and a leading + |
| MC-QA-09 | Layout | 375 / 768 / 1440px | One column below 900px; two columns filled top to bottom from 900px |
| MC-QA-10 | Data layer | Click an e-mail address | `cmp:click` with `interaction` email, `xdm:linkURL` `mailto:`, no address |
| MC-QA-11 | Screen reader | Read a link | "Email: address" / "Phone: number" |

Test cases: [05-quality-assurance/test-cases/blocks/media-contacts](../../../05-quality-assurance/test-cases/blocks/media-contacts/MEDIA-CONTACTS-TEST-CASES.md).

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
