---
id: "DEV-T-modal"
title: "Modal Block — Test Coverage"
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
relatedComponents: ["modal"]
relatedPages: ["/design-block-master/en/block-library/modal","/design-block-master/en/block-library/modal/auto-linked-modal","/design-block-master/en/block-library/modal/fragments","/design-block-master/en/block-library/modal/fragments/contact-form","/design-block-master/en/block-library/modal/fragments/privacy-notice","/design-block-master/en/block-library/modal/fragments/recognition","/design-block-master/en/block-library/modal/fragments/terms","/design-block-master/en/block-library/modal/modal-block","/design-block-master/en/block-library/modal/modal-long-content","/design-block-master/en/block-library/modal/modal-with-a-form"]
confidence: "Medium"
primary: false
---

# Modal Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-modal |
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
| /design-block-master/en/block-library/modal | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/modal/auto-linked-modal | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/modal/fragments | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/modal/fragments/contact-form | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/modal/fragments/privacy-notice | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/modal/fragments/recognition | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/modal/fragments/terms | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/modal/modal-block | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/modal/modal-long-content | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/modal/modal-with-a-form | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| MODAL-QA-01 | Default | Modal Content and Button Text | Primary button; dialog with the page's content |
| MODAL-QA-02 | No Button Text | Modal Content only | Button "Open" |
| MODAL-QA-03 | No Modal Content | Empty block | Nothing on the site; hint in edit mode |
| MODAL-QA-04 | Unpublished page | Modal Content not published | Button does nothing, no error shown |
| MODAL-QA-05 | Name | Page with / without a heading | `aria-labelledby` the heading / `aria-label` "Dialog" |
| MODAL-QA-06 | Closing | Close button, Escape, backdrop click | Closes each way; focus back on the opener |
| MODAL-QA-07 | Double click | Double-click the opener | One dialog |
| MODAL-QA-08 | Long content | Terms page | Scrolls inside; sticky close button; page locked |
| MODAL-QA-09 | Auto-link | Inline link to a `/modal/` page | Opens a dialog instead of navigating |
| MODAL-QA-10 | Video pop-up | Video with Play in a Pop-up | Video in the dialog |
| MODAL-QA-11 | Universal Editor preview | Select the opener in preview | Dialog opens in the visible area of the frame |
| MODAL-QA-12 | Viewports | 390 / 1024 / 1440px | Widths as the Responsive Behavior table |
| MODAL-QA-13 | Data layer | Open and close | `cmp:click` opener; `cmp:show` / `cmp:hide` on `{opener id}-dialog` |
| MODAL-QA-14 | Multiple instances | Two Modal blocks | Each opens its own page; distinct dialog ids |
| MODAL-QA-15 | Safari focus | Open with the mouse, close with Escape | Focus returns to the button |

Test cases: [05-quality-assurance/test-cases/blocks/modal](../../../05-quality-assurance/test-cases/blocks/modal/MODAL-TEST-CASES.md).

## Screenshots

![Modal: modal at mobile 375 × 812, published page /design-block-master/en/block-library/modal](./screenshots/block-library-modal-375.jpg)

*Figure: Modal: modal — mobile 375 × 812 (/design-block-master/en/block-library/modal, captured 2026-11-08).*

![Modal: modal at tablet 768 × 900, published page /design-block-master/en/block-library/modal](./screenshots/block-library-modal-768.jpg)

*Figure: Modal: modal — tablet 768 × 900 (/design-block-master/en/block-library/modal, captured 2026-11-08).*

![Modal: modal at small desktop 1024 × 900, published page /design-block-master/en/block-library/modal](./screenshots/block-library-modal-1024.jpg)

*Figure: Modal: modal — small desktop 1024 × 900 (/design-block-master/en/block-library/modal, captured 2026-11-08).*

![Modal: modal at desktop 1440 × 900, published page /design-block-master/en/block-library/modal](./screenshots/block-library-modal-1440.jpg)

*Figure: Modal: modal — desktop 1440 × 900 (/design-block-master/en/block-library/modal, captured 2026-11-08).*

![Modal: modal/auto-linked-modal at mobile 375 × 812, published page /design-block-master/en/block-library/modal/auto-linked-modal](./screenshots/block-library-modal-auto-linked-modal-375.jpg)

*Figure: Modal: modal/auto-linked-modal — mobile 375 × 812 (/design-block-master/en/block-library/modal/auto-linked-modal, captured 2026-11-08).*

![Modal: modal/auto-linked-modal at tablet 768 × 900, published page /design-block-master/en/block-library/modal/auto-linked-modal](./screenshots/block-library-modal-auto-linked-modal-768.jpg)

*Figure: Modal: modal/auto-linked-modal — tablet 768 × 900 (/design-block-master/en/block-library/modal/auto-linked-modal, captured 2026-11-08).*

![Modal: modal/auto-linked-modal at small desktop 1024 × 900, published page /design-block-master/en/block-library/modal/auto-linked-modal](./screenshots/block-library-modal-auto-linked-modal-1024.jpg)

*Figure: Modal: modal/auto-linked-modal — small desktop 1024 × 900 (/design-block-master/en/block-library/modal/auto-linked-modal, captured 2026-11-08).*

![Modal: modal/auto-linked-modal at desktop 1440 × 900, published page /design-block-master/en/block-library/modal/auto-linked-modal](./screenshots/block-library-modal-auto-linked-modal-1440.jpg)

*Figure: Modal: modal/auto-linked-modal — desktop 1440 × 900 (/design-block-master/en/block-library/modal/auto-linked-modal, captured 2026-11-08).*

![Modal: modal/fragments at mobile 375 × 812, published page /design-block-master/en/block-library/modal/fragments](./screenshots/block-library-modal-fragments-375.jpg)

*Figure: Modal: modal/fragments — mobile 375 × 812 (/design-block-master/en/block-library/modal/fragments, captured 2026-11-08).*

![Modal: modal/fragments at tablet 768 × 900, published page /design-block-master/en/block-library/modal/fragments](./screenshots/block-library-modal-fragments-768.jpg)

*Figure: Modal: modal/fragments — tablet 768 × 900 (/design-block-master/en/block-library/modal/fragments, captured 2026-11-08).*

![Modal: modal/fragments at small desktop 1024 × 900, published page /design-block-master/en/block-library/modal/fragments](./screenshots/block-library-modal-fragments-1024.jpg)

*Figure: Modal: modal/fragments — small desktop 1024 × 900 (/design-block-master/en/block-library/modal/fragments, captured 2026-11-08).*

![Modal: modal/fragments at desktop 1440 × 900, published page /design-block-master/en/block-library/modal/fragments](./screenshots/block-library-modal-fragments-1440.jpg)

*Figure: Modal: modal/fragments — desktop 1440 × 900 (/design-block-master/en/block-library/modal/fragments, captured 2026-11-08).*

![Modal: modal/fragments/contact-form at mobile 375 × 812, published page /design-block-master/en/block-library/modal/fragments/contact-form](./screenshots/block-library-modal-fragments-contact-form-375.jpg)

*Figure: Modal: modal/fragments/contact-form — mobile 375 × 812 (/design-block-master/en/block-library/modal/fragments/contact-form, captured 2026-11-08).*

![Modal: modal/fragments/contact-form at tablet 768 × 900, published page /design-block-master/en/block-library/modal/fragments/contact-form](./screenshots/block-library-modal-fragments-contact-form-768.jpg)

*Figure: Modal: modal/fragments/contact-form — tablet 768 × 900 (/design-block-master/en/block-library/modal/fragments/contact-form, captured 2026-11-08).*

![Modal: modal/fragments/contact-form at small desktop 1024 × 900, published page /design-block-master/en/block-library/modal/fragments/contact-form](./screenshots/block-library-modal-fragments-contact-form-1024.jpg)

*Figure: Modal: modal/fragments/contact-form — small desktop 1024 × 900 (/design-block-master/en/block-library/modal/fragments/contact-form, captured 2026-11-08).*

![Modal: modal/fragments/contact-form at desktop 1440 × 900, published page /design-block-master/en/block-library/modal/fragments/contact-form](./screenshots/block-library-modal-fragments-contact-form-1440.jpg)

*Figure: Modal: modal/fragments/contact-form — desktop 1440 × 900 (/design-block-master/en/block-library/modal/fragments/contact-form, captured 2026-11-08).*

![Modal: modal/fragments/privacy-notice at mobile 375 × 812, published page /design-block-master/en/block-library/modal/fragments/privacy-notice](./screenshots/block-library-modal-fragments-privacy-notice-375.jpg)

*Figure: Modal: modal/fragments/privacy-notice — mobile 375 × 812 (/design-block-master/en/block-library/modal/fragments/privacy-notice, captured 2026-11-08).*

![Modal: modal/fragments/privacy-notice at tablet 768 × 900, published page /design-block-master/en/block-library/modal/fragments/privacy-notice](./screenshots/block-library-modal-fragments-privacy-notice-768.jpg)

*Figure: Modal: modal/fragments/privacy-notice — tablet 768 × 900 (/design-block-master/en/block-library/modal/fragments/privacy-notice, captured 2026-11-08).*

![Modal: modal/fragments/privacy-notice at small desktop 1024 × 900, published page /design-block-master/en/block-library/modal/fragments/privacy-notice](./screenshots/block-library-modal-fragments-privacy-notice-1024.jpg)

*Figure: Modal: modal/fragments/privacy-notice — small desktop 1024 × 900 (/design-block-master/en/block-library/modal/fragments/privacy-notice, captured 2026-11-08).*

![Modal: modal/fragments/privacy-notice at desktop 1440 × 900, published page /design-block-master/en/block-library/modal/fragments/privacy-notice](./screenshots/block-library-modal-fragments-privacy-notice-1440.jpg)

*Figure: Modal: modal/fragments/privacy-notice — desktop 1440 × 900 (/design-block-master/en/block-library/modal/fragments/privacy-notice, captured 2026-11-08).*

![Modal: modal/fragments/recognition at mobile 375 × 812, published page /design-block-master/en/block-library/modal/fragments/recognition](./screenshots/block-library-modal-fragments-recognition-375.jpg)

*Figure: Modal: modal/fragments/recognition — mobile 375 × 812 (/design-block-master/en/block-library/modal/fragments/recognition, captured 2026-11-08).*

![Modal: modal/fragments/recognition at tablet 768 × 900, published page /design-block-master/en/block-library/modal/fragments/recognition](./screenshots/block-library-modal-fragments-recognition-768.jpg)

*Figure: Modal: modal/fragments/recognition — tablet 768 × 900 (/design-block-master/en/block-library/modal/fragments/recognition, captured 2026-11-08).*

![Modal: modal/fragments/recognition at small desktop 1024 × 900, published page /design-block-master/en/block-library/modal/fragments/recognition](./screenshots/block-library-modal-fragments-recognition-1024.jpg)

*Figure: Modal: modal/fragments/recognition — small desktop 1024 × 900 (/design-block-master/en/block-library/modal/fragments/recognition, captured 2026-11-08).*

![Modal: modal/fragments/recognition at desktop 1440 × 900, published page /design-block-master/en/block-library/modal/fragments/recognition](./screenshots/block-library-modal-fragments-recognition-1440.jpg)

*Figure: Modal: modal/fragments/recognition — desktop 1440 × 900 (/design-block-master/en/block-library/modal/fragments/recognition, captured 2026-11-08).*

![Modal: modal/fragments/terms at mobile 375 × 812, published page /design-block-master/en/block-library/modal/fragments/terms](./screenshots/block-library-modal-fragments-terms-375.jpg)

*Figure: Modal: modal/fragments/terms — mobile 375 × 812 (/design-block-master/en/block-library/modal/fragments/terms, captured 2026-11-08).*

![Modal: modal/fragments/terms at tablet 768 × 900, published page /design-block-master/en/block-library/modal/fragments/terms](./screenshots/block-library-modal-fragments-terms-768.jpg)

*Figure: Modal: modal/fragments/terms — tablet 768 × 900 (/design-block-master/en/block-library/modal/fragments/terms, captured 2026-11-08).*

![Modal: modal/fragments/terms at small desktop 1024 × 900, published page /design-block-master/en/block-library/modal/fragments/terms](./screenshots/block-library-modal-fragments-terms-1024.jpg)

*Figure: Modal: modal/fragments/terms — small desktop 1024 × 900 (/design-block-master/en/block-library/modal/fragments/terms, captured 2026-11-08).*

![Modal: modal/fragments/terms at desktop 1440 × 900, published page /design-block-master/en/block-library/modal/fragments/terms](./screenshots/block-library-modal-fragments-terms-1440.jpg)

*Figure: Modal: modal/fragments/terms — desktop 1440 × 900 (/design-block-master/en/block-library/modal/fragments/terms, captured 2026-11-08).*

![Modal: modal/modal-block at mobile 375 × 812, published page /design-block-master/en/block-library/modal/modal-block](./screenshots/block-library-modal-modal-block-375.jpg)

*Figure: Modal: modal/modal-block — mobile 375 × 812 (/design-block-master/en/block-library/modal/modal-block, captured 2026-11-08).*

![Modal: modal/modal-block at tablet 768 × 900, published page /design-block-master/en/block-library/modal/modal-block](./screenshots/block-library-modal-modal-block-768.jpg)

*Figure: Modal: modal/modal-block — tablet 768 × 900 (/design-block-master/en/block-library/modal/modal-block, captured 2026-11-08).*

![Modal: modal/modal-block at small desktop 1024 × 900, published page /design-block-master/en/block-library/modal/modal-block](./screenshots/block-library-modal-modal-block-1024.jpg)

*Figure: Modal: modal/modal-block — small desktop 1024 × 900 (/design-block-master/en/block-library/modal/modal-block, captured 2026-11-08).*

![Modal: modal/modal-block at desktop 1440 × 900, published page /design-block-master/en/block-library/modal/modal-block](./screenshots/block-library-modal-modal-block-1440.jpg)

*Figure: Modal: modal/modal-block — desktop 1440 × 900 (/design-block-master/en/block-library/modal/modal-block, captured 2026-11-08).*

![Modal: modal/modal-long-content at mobile 375 × 812, published page /design-block-master/en/block-library/modal/modal-long-content](./screenshots/block-library-modal-modal-long-content-375.jpg)

*Figure: Modal: modal/modal-long-content — mobile 375 × 812 (/design-block-master/en/block-library/modal/modal-long-content, captured 2026-11-08).*

![Modal: modal/modal-long-content at tablet 768 × 900, published page /design-block-master/en/block-library/modal/modal-long-content](./screenshots/block-library-modal-modal-long-content-768.jpg)

*Figure: Modal: modal/modal-long-content — tablet 768 × 900 (/design-block-master/en/block-library/modal/modal-long-content, captured 2026-11-08).*

![Modal: modal/modal-long-content at small desktop 1024 × 900, published page /design-block-master/en/block-library/modal/modal-long-content](./screenshots/block-library-modal-modal-long-content-1024.jpg)

*Figure: Modal: modal/modal-long-content — small desktop 1024 × 900 (/design-block-master/en/block-library/modal/modal-long-content, captured 2026-11-08).*

![Modal: modal/modal-long-content at desktop 1440 × 900, published page /design-block-master/en/block-library/modal/modal-long-content](./screenshots/block-library-modal-modal-long-content-1440.jpg)

*Figure: Modal: modal/modal-long-content — desktop 1440 × 900 (/design-block-master/en/block-library/modal/modal-long-content, captured 2026-11-08).*

![Modal: modal/modal-with-a-form at mobile 375 × 812, published page /design-block-master/en/block-library/modal/modal-with-a-form](./screenshots/block-library-modal-modal-with-a-form-375.jpg)

*Figure: Modal: modal/modal-with-a-form — mobile 375 × 812 (/design-block-master/en/block-library/modal/modal-with-a-form, captured 2026-11-08).*

![Modal: modal/modal-with-a-form at tablet 768 × 900, published page /design-block-master/en/block-library/modal/modal-with-a-form](./screenshots/block-library-modal-modal-with-a-form-768.jpg)

*Figure: Modal: modal/modal-with-a-form — tablet 768 × 900 (/design-block-master/en/block-library/modal/modal-with-a-form, captured 2026-11-08).*

![Modal: modal/modal-with-a-form at small desktop 1024 × 900, published page /design-block-master/en/block-library/modal/modal-with-a-form](./screenshots/block-library-modal-modal-with-a-form-1024.jpg)

*Figure: Modal: modal/modal-with-a-form — small desktop 1024 × 900 (/design-block-master/en/block-library/modal/modal-with-a-form, captured 2026-11-08).*

![Modal: modal/modal-with-a-form at desktop 1440 × 900, published page /design-block-master/en/block-library/modal/modal-with-a-form](./screenshots/block-library-modal-modal-with-a-form-1440.jpg)

*Figure: Modal: modal/modal-with-a-form — desktop 1440 × 900 (/design-block-master/en/block-library/modal/modal-with-a-form, captured 2026-11-08).*

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
