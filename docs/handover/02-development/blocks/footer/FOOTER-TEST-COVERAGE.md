---
id: "DEV-T-footer"
title: "Footer Block — Test Coverage"
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
relatedComponents: ["footer"]
relatedPages: ["/design-block-master/en/block-library/footer","/design-block-master/en/block-library/footer/campaign-page","/design-block-master/en/block-library/footer/default-footer-page","/design-block-master/en/block-library/footer/footer-campaign","/design-block-master/en/block-library/footer/footer-conversation-canvas","/design-block-master/en/block-library/footer/footer-default","/design-block-master/en/block-library/footer/footer-investors","/design-block-master/en/block-library/footer/investors-page"]
confidence: "Medium"
primary: false
---

# Footer Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-footer |
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
| /design-block-master/en/block-library/footer | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/footer/campaign-page | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/footer/default-footer-page | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/footer/footer-campaign | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/footer/footer-conversation-canvas | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/footer/footer-default | ok / ok / ok / ok | 0 | 0 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/footer/footer-investors | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/footer/investors-page | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| FOOTER-QA-01 | Default footer | Page without Footer value | `references/footer` content and the social row |
| FOOTER-QA-02 | Area footer | Area top page with Footer `references/footer-campaign` | Child pages show the campaign footer (new session) |
| FOOTER-QA-03 | Missing footer page | Footer pointing to an unpublished page | Only the social row; no error |
| FOOTER-QA-04 | Year | Copyright `© Tata Consultancy Services {year}` | Current year |
| FOOTER-QA-05 | Canvas | Conversation Canvas Page set | Canvas above the bar; min height; bar at the bottom |
| FOOTER-QA-06 | Canvas missing | Canvas page unpublished | Bar only |
| FOOTER-QA-07 | Links | Three Footer Links | In content-tree order, plain links |
| FOOTER-QA-08 | New tab | Open in = New tab | `target="_blank"`, `rel="noopener noreferrer"`, hidden hint |
| FOOTER-QA-09 | Legacy links | Footer with Link List multifield items and Footer Links | Multifield links first, then the items |
| FOOTER-QA-10 | Editor placeholder | Add a Footer Link without a link in Universal Editor | Dashed placeholder; nothing on the published page |
| FOOTER-QA-11 | Social order and fallbacks | Rows with sort-order, an image icon, an unknown platform without icon | Sorted; image 1.5rem; text label |
| FOOTER-QA-12 | Viewports | 390 / 1024 / 1440px | As the Responsive Behavior table |
| FOOTER-QA-13 | Keyboard | Tab through the footer | All links reachable with visible focus |
| FOOTER-QA-14 | Data layer | Click a bar link and a social link | `cmp:click` on `footer-2` and `footer-1` |
| FOOTER-QA-15 | No layout shift | Throttled load | Footer appears only after the main sections |

Test cases: [05-quality-assurance/test-cases/blocks/footer](../../../05-quality-assurance/test-cases/blocks/footer/FOOTER-TEST-CASES.md).

## Screenshots

![Footer: footer at mobile 375 × 812, published page /design-block-master/en/block-library/footer](./screenshots/block-library-footer-375.jpg)

*Figure: Footer: footer — mobile 375 × 812 (/design-block-master/en/block-library/footer, captured 2026-11-08).*

![Footer: footer at tablet 768 × 900, published page /design-block-master/en/block-library/footer](./screenshots/block-library-footer-768.jpg)

*Figure: Footer: footer — tablet 768 × 900 (/design-block-master/en/block-library/footer, captured 2026-11-08).*

![Footer: footer at small desktop 1024 × 900, published page /design-block-master/en/block-library/footer](./screenshots/block-library-footer-1024.jpg)

*Figure: Footer: footer — small desktop 1024 × 900 (/design-block-master/en/block-library/footer, captured 2026-11-08).*

![Footer: footer at desktop 1440 × 900, published page /design-block-master/en/block-library/footer](./screenshots/block-library-footer-1440.jpg)

*Figure: Footer: footer — desktop 1440 × 900 (/design-block-master/en/block-library/footer, captured 2026-11-08).*

![Footer: footer/campaign-page at mobile 375 × 812, published page /design-block-master/en/block-library/footer/campaign-page](./screenshots/block-library-footer-campaign-page-375.jpg)

*Figure: Footer: footer/campaign-page — mobile 375 × 812 (/design-block-master/en/block-library/footer/campaign-page, captured 2026-11-08).*

![Footer: footer/campaign-page at tablet 768 × 900, published page /design-block-master/en/block-library/footer/campaign-page](./screenshots/block-library-footer-campaign-page-768.jpg)

*Figure: Footer: footer/campaign-page — tablet 768 × 900 (/design-block-master/en/block-library/footer/campaign-page, captured 2026-11-08).*

![Footer: footer/campaign-page at small desktop 1024 × 900, published page /design-block-master/en/block-library/footer/campaign-page](./screenshots/block-library-footer-campaign-page-1024.jpg)

*Figure: Footer: footer/campaign-page — small desktop 1024 × 900 (/design-block-master/en/block-library/footer/campaign-page, captured 2026-11-08).*

![Footer: footer/campaign-page at desktop 1440 × 900, published page /design-block-master/en/block-library/footer/campaign-page](./screenshots/block-library-footer-campaign-page-1440.jpg)

*Figure: Footer: footer/campaign-page — desktop 1440 × 900 (/design-block-master/en/block-library/footer/campaign-page, captured 2026-11-08).*

![Footer: footer/default-footer-page at mobile 375 × 812, published page /design-block-master/en/block-library/footer/default-footer-page](./screenshots/block-library-footer-default-footer-page-375.jpg)

*Figure: Footer: footer/default-footer-page — mobile 375 × 812 (/design-block-master/en/block-library/footer/default-footer-page, captured 2026-11-08).*

![Footer: footer/default-footer-page at tablet 768 × 900, published page /design-block-master/en/block-library/footer/default-footer-page](./screenshots/block-library-footer-default-footer-page-768.jpg)

*Figure: Footer: footer/default-footer-page — tablet 768 × 900 (/design-block-master/en/block-library/footer/default-footer-page, captured 2026-11-08).*

![Footer: footer/default-footer-page at small desktop 1024 × 900, published page /design-block-master/en/block-library/footer/default-footer-page](./screenshots/block-library-footer-default-footer-page-1024.jpg)

*Figure: Footer: footer/default-footer-page — small desktop 1024 × 900 (/design-block-master/en/block-library/footer/default-footer-page, captured 2026-11-08).*

![Footer: footer/default-footer-page at desktop 1440 × 900, published page /design-block-master/en/block-library/footer/default-footer-page](./screenshots/block-library-footer-default-footer-page-1440.jpg)

*Figure: Footer: footer/default-footer-page — desktop 1440 × 900 (/design-block-master/en/block-library/footer/default-footer-page, captured 2026-11-08).*

![Footer: footer/footer-campaign at mobile 375 × 812, published page /design-block-master/en/block-library/footer/footer-campaign](./screenshots/block-library-footer-footer-campaign-375.jpg)

*Figure: Footer: footer/footer-campaign — mobile 375 × 812 (/design-block-master/en/block-library/footer/footer-campaign, captured 2026-11-08).*

![Footer: footer/footer-campaign at tablet 768 × 900, published page /design-block-master/en/block-library/footer/footer-campaign](./screenshots/block-library-footer-footer-campaign-768.jpg)

*Figure: Footer: footer/footer-campaign — tablet 768 × 900 (/design-block-master/en/block-library/footer/footer-campaign, captured 2026-11-08).*

![Footer: footer/footer-campaign at small desktop 1024 × 900, published page /design-block-master/en/block-library/footer/footer-campaign](./screenshots/block-library-footer-footer-campaign-1024.jpg)

*Figure: Footer: footer/footer-campaign — small desktop 1024 × 900 (/design-block-master/en/block-library/footer/footer-campaign, captured 2026-11-08).*

![Footer: footer/footer-campaign at desktop 1440 × 900, published page /design-block-master/en/block-library/footer/footer-campaign](./screenshots/block-library-footer-footer-campaign-1440.jpg)

*Figure: Footer: footer/footer-campaign — desktop 1440 × 900 (/design-block-master/en/block-library/footer/footer-campaign, captured 2026-11-08).*

![Footer: footer/footer-conversation-canvas at mobile 375 × 812, published page /design-block-master/en/block-library/footer/footer-conversation-canvas](./screenshots/block-library-footer-footer-conversation-canvas-375.jpg)

*Figure: Footer: footer/footer-conversation-canvas — mobile 375 × 812 (/design-block-master/en/block-library/footer/footer-conversation-canvas, captured 2026-11-08).*

![Footer: footer/footer-conversation-canvas at tablet 768 × 900, published page /design-block-master/en/block-library/footer/footer-conversation-canvas](./screenshots/block-library-footer-footer-conversation-canvas-768.jpg)

*Figure: Footer: footer/footer-conversation-canvas — tablet 768 × 900 (/design-block-master/en/block-library/footer/footer-conversation-canvas, captured 2026-11-08).*

![Footer: footer/footer-conversation-canvas at small desktop 1024 × 900, published page /design-block-master/en/block-library/footer/footer-conversation-canvas](./screenshots/block-library-footer-footer-conversation-canvas-1024.jpg)

*Figure: Footer: footer/footer-conversation-canvas — small desktop 1024 × 900 (/design-block-master/en/block-library/footer/footer-conversation-canvas, captured 2026-11-08).*

![Footer: footer/footer-conversation-canvas at desktop 1440 × 900, published page /design-block-master/en/block-library/footer/footer-conversation-canvas](./screenshots/block-library-footer-footer-conversation-canvas-1440.jpg)

*Figure: Footer: footer/footer-conversation-canvas — desktop 1440 × 900 (/design-block-master/en/block-library/footer/footer-conversation-canvas, captured 2026-11-08).*

![Footer: footer/footer-default at mobile 375 × 812, published page /design-block-master/en/block-library/footer/footer-default](./screenshots/block-library-footer-footer-default-375.jpg)

*Figure: Footer: footer/footer-default — mobile 375 × 812 (/design-block-master/en/block-library/footer/footer-default, captured 2026-11-08).*

![Footer: footer/footer-default at tablet 768 × 900, published page /design-block-master/en/block-library/footer/footer-default](./screenshots/block-library-footer-footer-default-768.jpg)

*Figure: Footer: footer/footer-default — tablet 768 × 900 (/design-block-master/en/block-library/footer/footer-default, captured 2026-11-08).*

![Footer: footer/footer-default at small desktop 1024 × 900, published page /design-block-master/en/block-library/footer/footer-default](./screenshots/block-library-footer-footer-default-1024.jpg)

*Figure: Footer: footer/footer-default — small desktop 1024 × 900 (/design-block-master/en/block-library/footer/footer-default, captured 2026-11-08).*

![Footer: footer/footer-default at desktop 1440 × 900, published page /design-block-master/en/block-library/footer/footer-default](./screenshots/block-library-footer-footer-default-1440.jpg)

*Figure: Footer: footer/footer-default — desktop 1440 × 900 (/design-block-master/en/block-library/footer/footer-default, captured 2026-11-08).*

![Footer: footer/footer-investors at mobile 375 × 812, published page /design-block-master/en/block-library/footer/footer-investors](./screenshots/block-library-footer-footer-investors-375.jpg)

*Figure: Footer: footer/footer-investors — mobile 375 × 812 (/design-block-master/en/block-library/footer/footer-investors, captured 2026-11-08).*

![Footer: footer/footer-investors at tablet 768 × 900, published page /design-block-master/en/block-library/footer/footer-investors](./screenshots/block-library-footer-footer-investors-768.jpg)

*Figure: Footer: footer/footer-investors — tablet 768 × 900 (/design-block-master/en/block-library/footer/footer-investors, captured 2026-11-08).*

![Footer: footer/footer-investors at small desktop 1024 × 900, published page /design-block-master/en/block-library/footer/footer-investors](./screenshots/block-library-footer-footer-investors-1024.jpg)

*Figure: Footer: footer/footer-investors — small desktop 1024 × 900 (/design-block-master/en/block-library/footer/footer-investors, captured 2026-11-08).*

![Footer: footer/footer-investors at desktop 1440 × 900, published page /design-block-master/en/block-library/footer/footer-investors](./screenshots/block-library-footer-footer-investors-1440.jpg)

*Figure: Footer: footer/footer-investors — desktop 1440 × 900 (/design-block-master/en/block-library/footer/footer-investors, captured 2026-11-08).*

![Footer: footer/investors-page at mobile 375 × 812, published page /design-block-master/en/block-library/footer/investors-page](./screenshots/block-library-footer-investors-page-375.jpg)

*Figure: Footer: footer/investors-page — mobile 375 × 812 (/design-block-master/en/block-library/footer/investors-page, captured 2026-11-08).*

![Footer: footer/investors-page at tablet 768 × 900, published page /design-block-master/en/block-library/footer/investors-page](./screenshots/block-library-footer-investors-page-768.jpg)

*Figure: Footer: footer/investors-page — tablet 768 × 900 (/design-block-master/en/block-library/footer/investors-page, captured 2026-11-08).*

![Footer: footer/investors-page at small desktop 1024 × 900, published page /design-block-master/en/block-library/footer/investors-page](./screenshots/block-library-footer-investors-page-1024.jpg)

*Figure: Footer: footer/investors-page — small desktop 1024 × 900 (/design-block-master/en/block-library/footer/investors-page, captured 2026-11-08).*

![Footer: footer/investors-page at desktop 1440 × 900, published page /design-block-master/en/block-library/footer/investors-page](./screenshots/block-library-footer-investors-page-1440.jpg)

*Figure: Footer: footer/investors-page — desktop 1440 × 900 (/design-block-master/en/block-library/footer/investors-page, captured 2026-11-08).*

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
