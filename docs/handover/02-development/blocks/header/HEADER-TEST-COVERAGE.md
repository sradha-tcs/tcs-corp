---
id: "DEV-T-header"
title: "Header Block — Test Coverage"
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
relatedComponents: ["header"]
relatedPages: ["/design-block-master/en/block-library/header","/design-block-master/en/block-library/header/header-careers","/design-block-master/en/block-library/header/header-default","/design-block-master/en/block-library/header/nav-careers","/design-block-master/en/block-library/header/nav-default"]
confidence: "Medium"
primary: false
---

# Header Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-header |
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
| /design-block-master/en/block-library/header | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/header/header-careers | ok / ok / ok / ok | 8 | 8 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/header/header-default | ok / ok / ok / ok | 8 | 8 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/header/nav-careers | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/header/nav-default | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| HEADER-QA-01 | Default header | Page without Navigation, locale `/en` | `/en/references/nav` loaded; logos visible |
| HEADER-QA-02 | Area header | Area top page with Navigation `references/nav-careers` | Child pages show the careers menu (new session) |
| HEADER-QA-03 | Missing nav page | Navigation pointing to an unpublished page | Falls back to `references/nav`; no error |
| HEADER-QA-04 | No nav page at all | New locale without `references/nav` | Empty header, its space kept, page usable |
| HEADER-QA-05 | Desktop logo bar | 1440px | TCS left, TATA right, 124px, no menu button |
| HEADER-QA-06 | Tablet menu | 1024px, open the menu | Full screen at "Menu", page doesn't scroll, `main` / `footer` inert |
| HEADER-QA-07 | Levels | Open a section, then Back | Sub-list with the label as title, focus on Back; Back focuses the section button |
| HEADER-QA-08 | Linked label | Section label is a link | Link navigates; arrow button "Show {label} menu" opens the level |
| HEADER-QA-09 | Keyboard | Escape with the menu open; Tab past the last row | Menu closes, focus on the menu button; tabbing out closes it |
| HEADER-QA-10 | Breakpoint change | Open the menu at 1024px, resize to 1300px | Menu state reset, page scroll unlocked |
| HEADER-QA-11 | Light hero | First section a light Hero, 1440px | Header without band over the hero; hero doesn't move when the header loads (TCS Header option Auto; Always / Never: TCS-HEADER-QA-12 to 15) |
| HEADER-QA-12 | Header Canvas | Nav page with a Canvas section, Home | Row at the bottom of the first screen; floats on scroll; hidden while the tablet menu is open |
| HEADER-QA-13 | Positional nav page | Nav page without TCS Header block | Sections 1–3 are brand, menu, tools |
| HEADER-QA-14 | Placeholders | `/de-de` page | Button names from the German placeholders |
| HEADER-QA-15 | Data layer | Click a logo and the menu button | `cmp:click` on `component.header-1` with `link` / `button` |
| HEADER-QA-16 | Layout shift | Load two pages in a row | No shift when the header arrives (remembered height) |

Test cases: [05-quality-assurance/test-cases/blocks/header](../../../05-quality-assurance/test-cases/blocks/header/HEADER-TEST-CASES.md).

## Screenshots

![Header: header at mobile 375 × 812, published page /design-block-master/en/block-library/header](./screenshots/block-library-header-375.jpg)

*Figure: Header: header — mobile 375 × 812 (/design-block-master/en/block-library/header, captured 2026-11-08).*

![Header: header at tablet 768 × 900, published page /design-block-master/en/block-library/header](./screenshots/block-library-header-768.jpg)

*Figure: Header: header — tablet 768 × 900 (/design-block-master/en/block-library/header, captured 2026-11-08).*

![Header: header at small desktop 1024 × 900, published page /design-block-master/en/block-library/header](./screenshots/block-library-header-1024.jpg)

*Figure: Header: header — small desktop 1024 × 900 (/design-block-master/en/block-library/header, captured 2026-11-08).*

![Header: header at desktop 1440 × 900, published page /design-block-master/en/block-library/header](./screenshots/block-library-header-1440.jpg)

*Figure: Header: header — desktop 1440 × 900 (/design-block-master/en/block-library/header, captured 2026-11-08).*

![Header: header/header-careers at mobile 375 × 812, published page /design-block-master/en/block-library/header/header-careers](./screenshots/block-library-header-header-careers-375.jpg)

*Figure: Header: header/header-careers — mobile 375 × 812 (/design-block-master/en/block-library/header/header-careers, captured 2026-11-08).*

![Header: header/header-careers at tablet 768 × 900, published page /design-block-master/en/block-library/header/header-careers](./screenshots/block-library-header-header-careers-768.jpg)

*Figure: Header: header/header-careers — tablet 768 × 900 (/design-block-master/en/block-library/header/header-careers, captured 2026-11-08).*

![Header: header/header-careers at small desktop 1024 × 900, published page /design-block-master/en/block-library/header/header-careers](./screenshots/block-library-header-header-careers-1024.jpg)

*Figure: Header: header/header-careers — small desktop 1024 × 900 (/design-block-master/en/block-library/header/header-careers, captured 2026-11-08).*

![Header: header/header-careers at desktop 1440 × 900, published page /design-block-master/en/block-library/header/header-careers](./screenshots/block-library-header-header-careers-1440.jpg)

*Figure: Header: header/header-careers — desktop 1440 × 900 (/design-block-master/en/block-library/header/header-careers, captured 2026-11-08).*

![Header: header/header-default at mobile 375 × 812, published page /design-block-master/en/block-library/header/header-default](./screenshots/block-library-header-header-default-375.jpg)

*Figure: Header: header/header-default — mobile 375 × 812 (/design-block-master/en/block-library/header/header-default, captured 2026-11-08).*

![Header: header/header-default at tablet 768 × 900, published page /design-block-master/en/block-library/header/header-default](./screenshots/block-library-header-header-default-768.jpg)

*Figure: Header: header/header-default — tablet 768 × 900 (/design-block-master/en/block-library/header/header-default, captured 2026-11-08).*

![Header: header/header-default at small desktop 1024 × 900, published page /design-block-master/en/block-library/header/header-default](./screenshots/block-library-header-header-default-1024.jpg)

*Figure: Header: header/header-default — small desktop 1024 × 900 (/design-block-master/en/block-library/header/header-default, captured 2026-11-08).*

![Header: header/header-default at desktop 1440 × 900, published page /design-block-master/en/block-library/header/header-default](./screenshots/block-library-header-header-default-1440.jpg)

*Figure: Header: header/header-default — desktop 1440 × 900 (/design-block-master/en/block-library/header/header-default, captured 2026-11-08).*

![Header: header/nav-careers at mobile 375 × 812, published page /design-block-master/en/block-library/header/nav-careers](./screenshots/block-library-header-nav-careers-375.jpg)

*Figure: Header: header/nav-careers — mobile 375 × 812 (/design-block-master/en/block-library/header/nav-careers, captured 2026-11-08).*

![Header: header/nav-careers at tablet 768 × 900, published page /design-block-master/en/block-library/header/nav-careers](./screenshots/block-library-header-nav-careers-768.jpg)

*Figure: Header: header/nav-careers — tablet 768 × 900 (/design-block-master/en/block-library/header/nav-careers, captured 2026-11-08).*

![Header: header/nav-careers at small desktop 1024 × 900, published page /design-block-master/en/block-library/header/nav-careers](./screenshots/block-library-header-nav-careers-1024.jpg)

*Figure: Header: header/nav-careers — small desktop 1024 × 900 (/design-block-master/en/block-library/header/nav-careers, captured 2026-11-08).*

![Header: header/nav-careers at desktop 1440 × 900, published page /design-block-master/en/block-library/header/nav-careers](./screenshots/block-library-header-nav-careers-1440.jpg)

*Figure: Header: header/nav-careers — desktop 1440 × 900 (/design-block-master/en/block-library/header/nav-careers, captured 2026-11-08).*

![Header: header/nav-default at mobile 375 × 812, published page /design-block-master/en/block-library/header/nav-default](./screenshots/block-library-header-nav-default-375.jpg)

*Figure: Header: header/nav-default — mobile 375 × 812 (/design-block-master/en/block-library/header/nav-default, captured 2026-11-08).*

![Header: header/nav-default at tablet 768 × 900, published page /design-block-master/en/block-library/header/nav-default](./screenshots/block-library-header-nav-default-768.jpg)

*Figure: Header: header/nav-default — tablet 768 × 900 (/design-block-master/en/block-library/header/nav-default, captured 2026-11-08).*

![Header: header/nav-default at small desktop 1024 × 900, published page /design-block-master/en/block-library/header/nav-default](./screenshots/block-library-header-nav-default-1024.jpg)

*Figure: Header: header/nav-default — small desktop 1024 × 900 (/design-block-master/en/block-library/header/nav-default, captured 2026-11-08).*

![Header: header/nav-default at desktop 1440 × 900, published page /design-block-master/en/block-library/header/nav-default](./screenshots/block-library-header-nav-default-1440.jpg)

*Figure: Header: header/nav-default — desktop 1440 × 900 (/design-block-master/en/block-library/header/nav-default, captured 2026-11-08).*

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
