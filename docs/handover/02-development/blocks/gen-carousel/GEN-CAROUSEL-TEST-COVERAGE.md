---
id: "DEV-T-gen-carousel"
title: "Gen Carousel Block — Test Coverage"
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
relatedComponents: ["gen-carousel"]
relatedPages: ["/design-block-master/en/block-library/gen-carousel","/design-block-master/en/block-library/gen-carousel/auto","/design-block-master/en/block-library/gen-carousel/hero-slides","/design-block-master/en/block-library/gen-carousel/manual-and-auto","/design-block-master/en/block-library/gen-carousel/single-slide","/design-block-master/en/block-library/gen-carousel/teaser-slides"]
confidence: "Medium"
primary: false
---

# Gen Carousel Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-gen-carousel |
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
| /design-block-master/en/block-library/gen-carousel | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/gen-carousel/auto | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/gen-carousel/hero-slides | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/gen-carousel/manual-and-auto | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/gen-carousel/single-slide | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/gen-carousel/teaser-slides | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| GEN-CAROUSEL-QA-01 | Manual | Three Heroes, Navigation Manual | Previous, three dots, next; no pause button; swipe works |
| GEN-CAROUSEL-QA-02 | Auto | Navigation Auto, interval 5 | Pause button and dots only; slides advance every 5 s; no swipe |
| GEN-CAROUSEL-QA-03 | Manual and Auto | Interval 7 | All controls; advance every 7 s; control click restarts the interval |
| GEN-CAROUSEL-QA-04 | Single slide | One Hero | No controls, no autoplay |
| GEN-CAROUSEL-QA-05 | Teaser slides | Three Teasers | Teasers at full slide width, same height |
| GEN-CAROUSEL-QA-06 | Interval limits | `data-interval` 1 / missing | 2 s / 5 s |
| GEN-CAROUSEL-QA-07 | Autoplay pauses | Hover, keyboard focus, scroll away, hidden browser tab | Rotation stops; resumes after |
| GEN-CAROUSEL-QA-08 | Reduced motion | OS reduced motion on, Auto | Starts paused ("Play slides"); instant scrolling |
| GEN-CAROUSEL-QA-09 | Keyboard | Tab to the controls, ArrowLeft / ArrowRight | Slide changes; focus on the current dot; hidden slides not focusable |
| GEN-CAROUSEL-QA-10 | Screen reader | Accessible name "Highlights" | Region named "Highlights" with role description "carousel"; slides named "1 of 3" with role description "slide" |
| GEN-CAROUSEL-QA-11 | Editor | Universal Editor edit mode, select slide 2's block | Slide 2 shown; no autoplay; all slides editable |
| GEN-CAROUSEL-QA-12 | Data layer | Next, dot, pause; let autoplay run | `cmp:click` `next` / `button` / `pause`; `cmp:show` with position per change, none on load |
| GEN-CAROUSEL-QA-13 | Additional tab | containerHide on; containerAnimation Fade up | Whole section hidden on the page; the carousel fades up once |
| GEN-CAROUSEL-QA-14 | Multiple instances | Two carousels on a page | Ids `gen-carousel-1`, `gen-carousel-2`; independent controls |
| GEN-CAROUSEL-QA-15 | Viewports | 375, 768, 1440px | One slide per view, controls wrap, no horizontal page overflow |
| GEN-CAROUSEL-QA-16 | Existing content | Carousel authored before the Accessible name field | Region named "Carousel" |

Test cases: [05-quality-assurance/test-cases/blocks/gen-carousel](../../../05-quality-assurance/test-cases/blocks/gen-carousel/GEN-CAROUSEL-TEST-CASES.md).

## Screenshots

![Gen Carousel: gen-carousel at mobile 375 × 812, published page /design-block-master/en/block-library/gen-carousel](./screenshots/block-library-gen-carousel-375.jpg)

*Figure: Gen Carousel: gen-carousel — mobile 375 × 812 (/design-block-master/en/block-library/gen-carousel, captured 2026-11-08).*

![Gen Carousel: gen-carousel at tablet 768 × 900, published page /design-block-master/en/block-library/gen-carousel](./screenshots/block-library-gen-carousel-768.jpg)

*Figure: Gen Carousel: gen-carousel — tablet 768 × 900 (/design-block-master/en/block-library/gen-carousel, captured 2026-11-08).*

![Gen Carousel: gen-carousel at small desktop 1024 × 900, published page /design-block-master/en/block-library/gen-carousel](./screenshots/block-library-gen-carousel-1024.jpg)

*Figure: Gen Carousel: gen-carousel — small desktop 1024 × 900 (/design-block-master/en/block-library/gen-carousel, captured 2026-11-08).*

![Gen Carousel: gen-carousel at desktop 1440 × 900, published page /design-block-master/en/block-library/gen-carousel](./screenshots/block-library-gen-carousel-1440.jpg)

*Figure: Gen Carousel: gen-carousel — desktop 1440 × 900 (/design-block-master/en/block-library/gen-carousel, captured 2026-11-08).*

![Gen Carousel: gen-carousel/auto at mobile 375 × 812, published page /design-block-master/en/block-library/gen-carousel/auto](./screenshots/block-library-gen-carousel-auto-375.jpg)

*Figure: Gen Carousel: gen-carousel/auto — mobile 375 × 812 (/design-block-master/en/block-library/gen-carousel/auto, captured 2026-11-08).*

![Gen Carousel: gen-carousel/auto at tablet 768 × 900, published page /design-block-master/en/block-library/gen-carousel/auto](./screenshots/block-library-gen-carousel-auto-768.jpg)

*Figure: Gen Carousel: gen-carousel/auto — tablet 768 × 900 (/design-block-master/en/block-library/gen-carousel/auto, captured 2026-11-08).*

![Gen Carousel: gen-carousel/auto at small desktop 1024 × 900, published page /design-block-master/en/block-library/gen-carousel/auto](./screenshots/block-library-gen-carousel-auto-1024.jpg)

*Figure: Gen Carousel: gen-carousel/auto — small desktop 1024 × 900 (/design-block-master/en/block-library/gen-carousel/auto, captured 2026-11-08).*

![Gen Carousel: gen-carousel/auto at desktop 1440 × 900, published page /design-block-master/en/block-library/gen-carousel/auto](./screenshots/block-library-gen-carousel-auto-1440.jpg)

*Figure: Gen Carousel: gen-carousel/auto — desktop 1440 × 900 (/design-block-master/en/block-library/gen-carousel/auto, captured 2026-11-08).*

![Gen Carousel: gen-carousel/hero-slides at mobile 375 × 812, published page /design-block-master/en/block-library/gen-carousel/hero-slides](./screenshots/block-library-gen-carousel-hero-slides-375.jpg)

*Figure: Gen Carousel: gen-carousel/hero-slides — mobile 375 × 812 (/design-block-master/en/block-library/gen-carousel/hero-slides, captured 2026-11-08).*

![Gen Carousel: gen-carousel/hero-slides at tablet 768 × 900, published page /design-block-master/en/block-library/gen-carousel/hero-slides](./screenshots/block-library-gen-carousel-hero-slides-768.jpg)

*Figure: Gen Carousel: gen-carousel/hero-slides — tablet 768 × 900 (/design-block-master/en/block-library/gen-carousel/hero-slides, captured 2026-11-08).*

![Gen Carousel: gen-carousel/hero-slides at small desktop 1024 × 900, published page /design-block-master/en/block-library/gen-carousel/hero-slides](./screenshots/block-library-gen-carousel-hero-slides-1024.jpg)

*Figure: Gen Carousel: gen-carousel/hero-slides — small desktop 1024 × 900 (/design-block-master/en/block-library/gen-carousel/hero-slides, captured 2026-11-08).*

![Gen Carousel: gen-carousel/hero-slides at desktop 1440 × 900, published page /design-block-master/en/block-library/gen-carousel/hero-slides](./screenshots/block-library-gen-carousel-hero-slides-1440.jpg)

*Figure: Gen Carousel: gen-carousel/hero-slides — desktop 1440 × 900 (/design-block-master/en/block-library/gen-carousel/hero-slides, captured 2026-11-08).*

![Gen Carousel: gen-carousel/manual-and-auto at mobile 375 × 812, published page /design-block-master/en/block-library/gen-carousel/manual-and-auto](./screenshots/block-library-gen-carousel-manual-and-auto-375.jpg)

*Figure: Gen Carousel: gen-carousel/manual-and-auto — mobile 375 × 812 (/design-block-master/en/block-library/gen-carousel/manual-and-auto, captured 2026-11-08).*

![Gen Carousel: gen-carousel/manual-and-auto at tablet 768 × 900, published page /design-block-master/en/block-library/gen-carousel/manual-and-auto](./screenshots/block-library-gen-carousel-manual-and-auto-768.jpg)

*Figure: Gen Carousel: gen-carousel/manual-and-auto — tablet 768 × 900 (/design-block-master/en/block-library/gen-carousel/manual-and-auto, captured 2026-11-08).*

![Gen Carousel: gen-carousel/manual-and-auto at small desktop 1024 × 900, published page /design-block-master/en/block-library/gen-carousel/manual-and-auto](./screenshots/block-library-gen-carousel-manual-and-auto-1024.jpg)

*Figure: Gen Carousel: gen-carousel/manual-and-auto — small desktop 1024 × 900 (/design-block-master/en/block-library/gen-carousel/manual-and-auto, captured 2026-11-08).*

![Gen Carousel: gen-carousel/manual-and-auto at desktop 1440 × 900, published page /design-block-master/en/block-library/gen-carousel/manual-and-auto](./screenshots/block-library-gen-carousel-manual-and-auto-1440.jpg)

*Figure: Gen Carousel: gen-carousel/manual-and-auto — desktop 1440 × 900 (/design-block-master/en/block-library/gen-carousel/manual-and-auto, captured 2026-11-08).*

![Gen Carousel: gen-carousel/single-slide at mobile 375 × 812, published page /design-block-master/en/block-library/gen-carousel/single-slide](./screenshots/block-library-gen-carousel-single-slide-375.jpg)

*Figure: Gen Carousel: gen-carousel/single-slide — mobile 375 × 812 (/design-block-master/en/block-library/gen-carousel/single-slide, captured 2026-11-08).*

![Gen Carousel: gen-carousel/single-slide at tablet 768 × 900, published page /design-block-master/en/block-library/gen-carousel/single-slide](./screenshots/block-library-gen-carousel-single-slide-768.jpg)

*Figure: Gen Carousel: gen-carousel/single-slide — tablet 768 × 900 (/design-block-master/en/block-library/gen-carousel/single-slide, captured 2026-11-08).*

![Gen Carousel: gen-carousel/single-slide at small desktop 1024 × 900, published page /design-block-master/en/block-library/gen-carousel/single-slide](./screenshots/block-library-gen-carousel-single-slide-1024.jpg)

*Figure: Gen Carousel: gen-carousel/single-slide — small desktop 1024 × 900 (/design-block-master/en/block-library/gen-carousel/single-slide, captured 2026-11-08).*

![Gen Carousel: gen-carousel/single-slide at desktop 1440 × 900, published page /design-block-master/en/block-library/gen-carousel/single-slide](./screenshots/block-library-gen-carousel-single-slide-1440.jpg)

*Figure: Gen Carousel: gen-carousel/single-slide — desktop 1440 × 900 (/design-block-master/en/block-library/gen-carousel/single-slide, captured 2026-11-08).*

![Gen Carousel: gen-carousel/teaser-slides at mobile 375 × 812, published page /design-block-master/en/block-library/gen-carousel/teaser-slides](./screenshots/block-library-gen-carousel-teaser-slides-375.jpg)

*Figure: Gen Carousel: gen-carousel/teaser-slides — mobile 375 × 812 (/design-block-master/en/block-library/gen-carousel/teaser-slides, captured 2026-11-08).*

![Gen Carousel: gen-carousel/teaser-slides at tablet 768 × 900, published page /design-block-master/en/block-library/gen-carousel/teaser-slides](./screenshots/block-library-gen-carousel-teaser-slides-768.jpg)

*Figure: Gen Carousel: gen-carousel/teaser-slides — tablet 768 × 900 (/design-block-master/en/block-library/gen-carousel/teaser-slides, captured 2026-11-08).*

![Gen Carousel: gen-carousel/teaser-slides at small desktop 1024 × 900, published page /design-block-master/en/block-library/gen-carousel/teaser-slides](./screenshots/block-library-gen-carousel-teaser-slides-1024.jpg)

*Figure: Gen Carousel: gen-carousel/teaser-slides — small desktop 1024 × 900 (/design-block-master/en/block-library/gen-carousel/teaser-slides, captured 2026-11-08).*

![Gen Carousel: gen-carousel/teaser-slides at desktop 1440 × 900, published page /design-block-master/en/block-library/gen-carousel/teaser-slides](./screenshots/block-library-gen-carousel-teaser-slides-1440.jpg)

*Figure: Gen Carousel: gen-carousel/teaser-slides — desktop 1440 × 900 (/design-block-master/en/block-library/gen-carousel/teaser-slides, captured 2026-11-08).*

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
