---
id: "DEV-T-tcs-header"
title: "TCS Header Block — Test Coverage"
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
relatedComponents: ["tcs-header"]
relatedPages: []
confidence: "Medium"
primary: false
---

# TCS Header Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-tcs-header |
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
| TCS-HEADER-QA-01 | Default | All six fields, on the nav page | Header shows both logos linked |
| TCS-HEADER-QA-02 | Standalone | Block in a page section, 1440px | TCS left, TATA right |
| TCS-HEADER-QA-03 | Standalone mobile | 390px, Full Width section | Logos together, 1rem gutter |
| TCS-HEADER-QA-04 | Fixed Width section | Block in a Fixed Width section | Section gutter, no extra padding |
| TCS-HEADER-QA-05 | No image | Link only | Text link with the placeholder name |
| TCS-HEADER-QA-06 | Empty alt | Image and link, alt empty | `img alt` is the placeholder name |
| TCS-HEADER-QA-07 | Bare domain | TATA Logo Link `www.tata.com` | `href="https://www.tata.com"` |
| TCS-HEADER-QA-08 | No link | Image only | `span` with the picture, not a link |
| TCS-HEADER-QA-09 | Positional nav page | Nav page without the block | Header still shows brand, menu, tools |
| TCS-HEADER-QA-10 | Canvas in the same section | TCS Header and a Conversation Canvas in one section | Logos in the bar, Canvas in the header Canvas |
| TCS-HEADER-QA-11 | Data layer | Click a logo (standalone) | `cmp:click` on `component.tcs-header-1` |
| TCS-HEADER-QA-12 | Header over the first block: Auto | Option empty, Home at 1440px | Bar transparent over the light Hero, as before; nothing moves when the header loads |
| TCS-HEADER-QA-13 | Always | Option Always, a page opening with a block other than a Hero, 1440px | Bar transparent; the block starts at the top of the page; `<html data-header-overlay="always">` |
| TCS-HEADER-QA-14 | Never | Option Never, Home at 1440px, second page view | Solid bar; the Hero starts below it; no shift on the second page (`localStorage` `header-overlay-v1`) |
| TCS-HEADER-QA-15 | Tablet / mobile | Each mode, 390px and 1024px; open the menu | As on desktop (64px bar); the open menu's bar is solid |
| TCS-HEADER-QA-16 | Menu root path of another site | TCS Header Menu root path in the language master, Canvas Menu root path `/en/home`, 390px | Menu button shown; the menu lists the Canvas's pages |
| TCS-HEADER-QA-17 | Sticky bar | 390px, 1024px and 1440px, scroll down, each Header over the first block mode | The logo bar stays at the top, solid once scrolled by its height; the logos stay above the content |

Test cases: [05-quality-assurance/test-cases/blocks/tcs-header](../../../05-quality-assurance/test-cases/blocks/tcs-header/TCS-HEADER-TEST-CASES.md).

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
