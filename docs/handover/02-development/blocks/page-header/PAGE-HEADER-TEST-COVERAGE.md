---
id: "DEV-T-page-header"
title: "Page Header Block — Test Coverage"
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
relatedComponents: ["page-header"]
relatedPages: ["/design-block-master/en/block-library/page-header","/design-block-master/en/block-library/page-header/article","/design-block-master/en/block-library/page-header/article-default","/design-block-master/en/block-library/page-header/cta-primary","/design-block-master/en/block-library/page-header/cta-secondary","/design-block-master/en/block-library/page-header/cta-text-link","/design-block-master/en/block-library/page-header/default-by-page-type","/design-block-master/en/block-library/page-header/display","/design-block-master/en/block-library/page-header/guest-author","/design-block-master/en/block-library/page-header/landing","/design-block-master/en/block-library/page-header/landing-default","/design-block-master/en/block-library/page-header/landing-featured-image","/design-block-master/en/block-library/page-header/landing-text-only","/design-block-master/en/block-library/page-header/press-release","/design-block-master/en/block-library/page-header/secondary","/design-block-master/en/block-library/page-header/tablet-widths","/design-block-master/en/block-library/page-header/tags-and-content-type"]
confidence: "Medium"
primary: false
---

# Page Header Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-page-header |
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
| /design-block-master/en/block-library/page-header | ok / ok / ok / ok | 20 | 20 | 0 img no alt, 0 unnamed buttons, 1 heading skips |
| /design-block-master/en/block-library/page-header/article | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/article-default | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/cta-primary | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/cta-secondary | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/cta-text-link | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/default-by-page-type | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/display | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/guest-author | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/landing | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/landing-default | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/landing-featured-image | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/landing-text-only | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/press-release | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/secondary | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/tablet-widths | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |
| /design-block-master/en/block-library/page-header/tags-and-content-type | ok / ok / ok / ok | 4 | 4 | 0 img no alt, 0 unnamed buttons, 0 heading skips |

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| PAGE-HEADER-QA-01 | Default on an article | Layout Default, page-type article | Article layout |
| PAGE-HEADER-QA-02 | Default on a landing page | Layout Default, page-type landing (sheet) | Landing layout |
| PAGE-HEADER-QA-03 | Landing with image | featured-image as site media, image-alt | Two columns from 900px; image eager, `fetchpriority="high"`, alt set |
| PAGE-HEADER-QA-04 | Landing without image | No featured-image | Text stacked, no `page-header-has-image` |
| PAGE-HEADER-QA-05 | Secondary | Layout Secondary | Eyebrow above the title column and the summary column |
| PAGE-HEADER-QA-06 | Article | publish-date, reading-time, author-id, tags, listen-link | Meta row with date dd/mm/yy, "{n} min read", three actions; author lockup |
| PAGE-HEADER-QA-07 | Display | Layout Display, tags | Pipe-separated tags above the display title |
| PAGE-HEADER-QA-08 | Template header | Article / Blog / Press Release page without a Page Header | Header added as the first section |
| PAGE-HEADER-QA-09 | CTA styles | Primary Button, Secondary Button, Text link; Open in New Window | `primary`, `secondary`, `tertiary`; new tab with hidden hint |
| PAGE-HEADER-QA-10 | Author from metadata | `author` only | Name only, no photo or link |
| PAGE-HEADER-QA-11 | Missing sheets | Authors sheet / taxonomy unpublished | Header renders; no lockup; ID-derived labels |
| PAGE-HEADER-QA-12 | Non-ISO date | publish-date "March 12" | Shown as typed after "Published" |
| PAGE-HEADER-QA-13 | Share | Browser with and without `navigator.share` | Share dialog, or "Link copied to clipboard" for 3 s |
| PAGE-HEADER-QA-14 | Keyboard | Tab through the header | Actions and links focusable with visible focus |
| PAGE-HEADER-QA-15 | Data layer | Click CTA, download, share, listen | `cmp:click` with `link`, `download`, `share`, `listen` |
| PAGE-HEADER-QA-16 | Viewports | 390, 768, 1024, 1440px | One column below 900px, two from 900px; no overflow |
| PAGE-HEADER-QA-17 | Legacy content | CTA List multifield with an empty style | CTAs render (Text link for the empty style) before CTA items |
| PAGE-HEADER-QA-18 | One H1 | Page with a Page Header | Exactly one `h1` |

Test cases: [05-quality-assurance/test-cases/blocks/page-header](../../../05-quality-assurance/test-cases/blocks/page-header/PAGE-HEADER-TEST-CASES.md).

## Screenshots

![Page Header: page-header at mobile 375 × 812, published page /design-block-master/en/block-library/page-header](./screenshots/block-library-page-header-375.jpg)

*Figure: Page Header: page-header — mobile 375 × 812 (/design-block-master/en/block-library/page-header, captured 2026-11-08).*

![Page Header: page-header at tablet 768 × 900, published page /design-block-master/en/block-library/page-header](./screenshots/block-library-page-header-768.jpg)

*Figure: Page Header: page-header — tablet 768 × 900 (/design-block-master/en/block-library/page-header, captured 2026-11-08).*

![Page Header: page-header at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header](./screenshots/block-library-page-header-1024.jpg)

*Figure: Page Header: page-header — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header, captured 2026-11-08).*

![Page Header: page-header at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header](./screenshots/block-library-page-header-1440.jpg)

*Figure: Page Header: page-header — desktop 1440 × 900 (/design-block-master/en/block-library/page-header, captured 2026-11-08).*

![Page Header: page-header/article at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/article](./screenshots/block-library-page-header-article-375.jpg)

*Figure: Page Header: page-header/article — mobile 375 × 812 (/design-block-master/en/block-library/page-header/article, captured 2026-11-08).*

![Page Header: page-header/article at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/article](./screenshots/block-library-page-header-article-768.jpg)

*Figure: Page Header: page-header/article — tablet 768 × 900 (/design-block-master/en/block-library/page-header/article, captured 2026-11-08).*

![Page Header: page-header/article at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/article](./screenshots/block-library-page-header-article-1024.jpg)

*Figure: Page Header: page-header/article — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/article, captured 2026-11-08).*

![Page Header: page-header/article at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/article](./screenshots/block-library-page-header-article-1440.jpg)

*Figure: Page Header: page-header/article — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/article, captured 2026-11-08).*

![Page Header: page-header/article-default at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/article-default](./screenshots/block-library-page-header-article-default-375.jpg)

*Figure: Page Header: page-header/article-default — mobile 375 × 812 (/design-block-master/en/block-library/page-header/article-default, captured 2026-11-08).*

![Page Header: page-header/article-default at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/article-default](./screenshots/block-library-page-header-article-default-768.jpg)

*Figure: Page Header: page-header/article-default — tablet 768 × 900 (/design-block-master/en/block-library/page-header/article-default, captured 2026-11-08).*

![Page Header: page-header/article-default at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/article-default](./screenshots/block-library-page-header-article-default-1024.jpg)

*Figure: Page Header: page-header/article-default — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/article-default, captured 2026-11-08).*

![Page Header: page-header/article-default at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/article-default](./screenshots/block-library-page-header-article-default-1440.jpg)

*Figure: Page Header: page-header/article-default — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/article-default, captured 2026-11-08).*

![Page Header: page-header/cta-primary at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/cta-primary](./screenshots/block-library-page-header-cta-primary-375.jpg)

*Figure: Page Header: page-header/cta-primary — mobile 375 × 812 (/design-block-master/en/block-library/page-header/cta-primary, captured 2026-11-08).*

![Page Header: page-header/cta-primary at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/cta-primary](./screenshots/block-library-page-header-cta-primary-768.jpg)

*Figure: Page Header: page-header/cta-primary — tablet 768 × 900 (/design-block-master/en/block-library/page-header/cta-primary, captured 2026-11-08).*

![Page Header: page-header/cta-primary at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/cta-primary](./screenshots/block-library-page-header-cta-primary-1024.jpg)

*Figure: Page Header: page-header/cta-primary — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/cta-primary, captured 2026-11-08).*

![Page Header: page-header/cta-primary at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/cta-primary](./screenshots/block-library-page-header-cta-primary-1440.jpg)

*Figure: Page Header: page-header/cta-primary — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/cta-primary, captured 2026-11-08).*

![Page Header: page-header/cta-secondary at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/cta-secondary](./screenshots/block-library-page-header-cta-secondary-375.jpg)

*Figure: Page Header: page-header/cta-secondary — mobile 375 × 812 (/design-block-master/en/block-library/page-header/cta-secondary, captured 2026-11-08).*

![Page Header: page-header/cta-secondary at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/cta-secondary](./screenshots/block-library-page-header-cta-secondary-768.jpg)

*Figure: Page Header: page-header/cta-secondary — tablet 768 × 900 (/design-block-master/en/block-library/page-header/cta-secondary, captured 2026-11-08).*

![Page Header: page-header/cta-secondary at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/cta-secondary](./screenshots/block-library-page-header-cta-secondary-1024.jpg)

*Figure: Page Header: page-header/cta-secondary — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/cta-secondary, captured 2026-11-08).*

![Page Header: page-header/cta-secondary at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/cta-secondary](./screenshots/block-library-page-header-cta-secondary-1440.jpg)

*Figure: Page Header: page-header/cta-secondary — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/cta-secondary, captured 2026-11-08).*

![Page Header: page-header/cta-text-link at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/cta-text-link](./screenshots/block-library-page-header-cta-text-link-375.jpg)

*Figure: Page Header: page-header/cta-text-link — mobile 375 × 812 (/design-block-master/en/block-library/page-header/cta-text-link, captured 2026-11-08).*

![Page Header: page-header/cta-text-link at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/cta-text-link](./screenshots/block-library-page-header-cta-text-link-768.jpg)

*Figure: Page Header: page-header/cta-text-link — tablet 768 × 900 (/design-block-master/en/block-library/page-header/cta-text-link, captured 2026-11-08).*

![Page Header: page-header/cta-text-link at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/cta-text-link](./screenshots/block-library-page-header-cta-text-link-1024.jpg)

*Figure: Page Header: page-header/cta-text-link — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/cta-text-link, captured 2026-11-08).*

![Page Header: page-header/cta-text-link at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/cta-text-link](./screenshots/block-library-page-header-cta-text-link-1440.jpg)

*Figure: Page Header: page-header/cta-text-link — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/cta-text-link, captured 2026-11-08).*

![Page Header: page-header/default-by-page-type at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/default-by-page-type](./screenshots/block-library-page-header-default-by-page-type-375.jpg)

*Figure: Page Header: page-header/default-by-page-type — mobile 375 × 812 (/design-block-master/en/block-library/page-header/default-by-page-type, captured 2026-11-08).*

![Page Header: page-header/default-by-page-type at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/default-by-page-type](./screenshots/block-library-page-header-default-by-page-type-768.jpg)

*Figure: Page Header: page-header/default-by-page-type — tablet 768 × 900 (/design-block-master/en/block-library/page-header/default-by-page-type, captured 2026-11-08).*

![Page Header: page-header/default-by-page-type at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/default-by-page-type](./screenshots/block-library-page-header-default-by-page-type-1024.jpg)

*Figure: Page Header: page-header/default-by-page-type — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/default-by-page-type, captured 2026-11-08).*

![Page Header: page-header/default-by-page-type at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/default-by-page-type](./screenshots/block-library-page-header-default-by-page-type-1440.jpg)

*Figure: Page Header: page-header/default-by-page-type — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/default-by-page-type, captured 2026-11-08).*

![Page Header: page-header/display at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/display](./screenshots/block-library-page-header-display-375.jpg)

*Figure: Page Header: page-header/display — mobile 375 × 812 (/design-block-master/en/block-library/page-header/display, captured 2026-11-08).*

![Page Header: page-header/display at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/display](./screenshots/block-library-page-header-display-768.jpg)

*Figure: Page Header: page-header/display — tablet 768 × 900 (/design-block-master/en/block-library/page-header/display, captured 2026-11-08).*

![Page Header: page-header/display at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/display](./screenshots/block-library-page-header-display-1024.jpg)

*Figure: Page Header: page-header/display — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/display, captured 2026-11-08).*

![Page Header: page-header/display at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/display](./screenshots/block-library-page-header-display-1440.jpg)

*Figure: Page Header: page-header/display — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/display, captured 2026-11-08).*

![Page Header: page-header/guest-author at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/guest-author](./screenshots/block-library-page-header-guest-author-375.jpg)

*Figure: Page Header: page-header/guest-author — mobile 375 × 812 (/design-block-master/en/block-library/page-header/guest-author, captured 2026-11-08).*

![Page Header: page-header/guest-author at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/guest-author](./screenshots/block-library-page-header-guest-author-768.jpg)

*Figure: Page Header: page-header/guest-author — tablet 768 × 900 (/design-block-master/en/block-library/page-header/guest-author, captured 2026-11-08).*

![Page Header: page-header/guest-author at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/guest-author](./screenshots/block-library-page-header-guest-author-1024.jpg)

*Figure: Page Header: page-header/guest-author — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/guest-author, captured 2026-11-08).*

![Page Header: page-header/guest-author at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/guest-author](./screenshots/block-library-page-header-guest-author-1440.jpg)

*Figure: Page Header: page-header/guest-author — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/guest-author, captured 2026-11-08).*

![Page Header: page-header/landing at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/landing](./screenshots/block-library-page-header-landing-375.jpg)

*Figure: Page Header: page-header/landing — mobile 375 × 812 (/design-block-master/en/block-library/page-header/landing, captured 2026-11-08).*

![Page Header: page-header/landing at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/landing](./screenshots/block-library-page-header-landing-768.jpg)

*Figure: Page Header: page-header/landing — tablet 768 × 900 (/design-block-master/en/block-library/page-header/landing, captured 2026-11-08).*

![Page Header: page-header/landing at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/landing](./screenshots/block-library-page-header-landing-1024.jpg)

*Figure: Page Header: page-header/landing — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/landing, captured 2026-11-08).*

![Page Header: page-header/landing at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/landing](./screenshots/block-library-page-header-landing-1440.jpg)

*Figure: Page Header: page-header/landing — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/landing, captured 2026-11-08).*

![Page Header: page-header/landing-default at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/landing-default](./screenshots/block-library-page-header-landing-default-375.jpg)

*Figure: Page Header: page-header/landing-default — mobile 375 × 812 (/design-block-master/en/block-library/page-header/landing-default, captured 2026-11-08).*

![Page Header: page-header/landing-default at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/landing-default](./screenshots/block-library-page-header-landing-default-768.jpg)

*Figure: Page Header: page-header/landing-default — tablet 768 × 900 (/design-block-master/en/block-library/page-header/landing-default, captured 2026-11-08).*

![Page Header: page-header/landing-default at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/landing-default](./screenshots/block-library-page-header-landing-default-1024.jpg)

*Figure: Page Header: page-header/landing-default — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/landing-default, captured 2026-11-08).*

![Page Header: page-header/landing-default at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/landing-default](./screenshots/block-library-page-header-landing-default-1440.jpg)

*Figure: Page Header: page-header/landing-default — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/landing-default, captured 2026-11-08).*

![Page Header: page-header/landing-featured-image at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/landing-featured-image](./screenshots/block-library-page-header-landing-featured-image-375.jpg)

*Figure: Page Header: page-header/landing-featured-image — mobile 375 × 812 (/design-block-master/en/block-library/page-header/landing-featured-image, captured 2026-11-08).*

![Page Header: page-header/landing-featured-image at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/landing-featured-image](./screenshots/block-library-page-header-landing-featured-image-768.jpg)

*Figure: Page Header: page-header/landing-featured-image — tablet 768 × 900 (/design-block-master/en/block-library/page-header/landing-featured-image, captured 2026-11-08).*

![Page Header: page-header/landing-featured-image at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/landing-featured-image](./screenshots/block-library-page-header-landing-featured-image-1024.jpg)

*Figure: Page Header: page-header/landing-featured-image — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/landing-featured-image, captured 2026-11-08).*

![Page Header: page-header/landing-featured-image at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/landing-featured-image](./screenshots/block-library-page-header-landing-featured-image-1440.jpg)

*Figure: Page Header: page-header/landing-featured-image — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/landing-featured-image, captured 2026-11-08).*

![Page Header: page-header/landing-text-only at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/landing-text-only](./screenshots/block-library-page-header-landing-text-only-375.jpg)

*Figure: Page Header: page-header/landing-text-only — mobile 375 × 812 (/design-block-master/en/block-library/page-header/landing-text-only, captured 2026-11-08).*

![Page Header: page-header/landing-text-only at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/landing-text-only](./screenshots/block-library-page-header-landing-text-only-768.jpg)

*Figure: Page Header: page-header/landing-text-only — tablet 768 × 900 (/design-block-master/en/block-library/page-header/landing-text-only, captured 2026-11-08).*

![Page Header: page-header/landing-text-only at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/landing-text-only](./screenshots/block-library-page-header-landing-text-only-1024.jpg)

*Figure: Page Header: page-header/landing-text-only — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/landing-text-only, captured 2026-11-08).*

![Page Header: page-header/landing-text-only at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/landing-text-only](./screenshots/block-library-page-header-landing-text-only-1440.jpg)

*Figure: Page Header: page-header/landing-text-only — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/landing-text-only, captured 2026-11-08).*

![Page Header: page-header/press-release at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/press-release](./screenshots/block-library-page-header-press-release-375.jpg)

*Figure: Page Header: page-header/press-release — mobile 375 × 812 (/design-block-master/en/block-library/page-header/press-release, captured 2026-11-08).*

![Page Header: page-header/press-release at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/press-release](./screenshots/block-library-page-header-press-release-768.jpg)

*Figure: Page Header: page-header/press-release — tablet 768 × 900 (/design-block-master/en/block-library/page-header/press-release, captured 2026-11-08).*

![Page Header: page-header/press-release at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/press-release](./screenshots/block-library-page-header-press-release-1024.jpg)

*Figure: Page Header: page-header/press-release — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/press-release, captured 2026-11-08).*

![Page Header: page-header/press-release at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/press-release](./screenshots/block-library-page-header-press-release-1440.jpg)

*Figure: Page Header: page-header/press-release — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/press-release, captured 2026-11-08).*

![Page Header: page-header/secondary at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/secondary](./screenshots/block-library-page-header-secondary-375.jpg)

*Figure: Page Header: page-header/secondary — mobile 375 × 812 (/design-block-master/en/block-library/page-header/secondary, captured 2026-11-08).*

![Page Header: page-header/secondary at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/secondary](./screenshots/block-library-page-header-secondary-768.jpg)

*Figure: Page Header: page-header/secondary — tablet 768 × 900 (/design-block-master/en/block-library/page-header/secondary, captured 2026-11-08).*

![Page Header: page-header/secondary at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/secondary](./screenshots/block-library-page-header-secondary-1024.jpg)

*Figure: Page Header: page-header/secondary — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/secondary, captured 2026-11-08).*

![Page Header: page-header/secondary at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/secondary](./screenshots/block-library-page-header-secondary-1440.jpg)

*Figure: Page Header: page-header/secondary — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/secondary, captured 2026-11-08).*

![Page Header: page-header/tablet-widths at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/tablet-widths](./screenshots/block-library-page-header-tablet-widths-375.jpg)

*Figure: Page Header: page-header/tablet-widths — mobile 375 × 812 (/design-block-master/en/block-library/page-header/tablet-widths, captured 2026-11-08).*

![Page Header: page-header/tablet-widths at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/tablet-widths](./screenshots/block-library-page-header-tablet-widths-768.jpg)

*Figure: Page Header: page-header/tablet-widths — tablet 768 × 900 (/design-block-master/en/block-library/page-header/tablet-widths, captured 2026-11-08).*

![Page Header: page-header/tablet-widths at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/tablet-widths](./screenshots/block-library-page-header-tablet-widths-1024.jpg)

*Figure: Page Header: page-header/tablet-widths — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/tablet-widths, captured 2026-11-08).*

![Page Header: page-header/tablet-widths at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/tablet-widths](./screenshots/block-library-page-header-tablet-widths-1440.jpg)

*Figure: Page Header: page-header/tablet-widths — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/tablet-widths, captured 2026-11-08).*

![Page Header: page-header/tags-and-content-type at mobile 375 × 812, published page /design-block-master/en/block-library/page-header/tags-and-content-type](./screenshots/block-library-page-header-tags-and-content-type-375.jpg)

*Figure: Page Header: page-header/tags-and-content-type — mobile 375 × 812 (/design-block-master/en/block-library/page-header/tags-and-content-type, captured 2026-11-08).*

![Page Header: page-header/tags-and-content-type at tablet 768 × 900, published page /design-block-master/en/block-library/page-header/tags-and-content-type](./screenshots/block-library-page-header-tags-and-content-type-768.jpg)

*Figure: Page Header: page-header/tags-and-content-type — tablet 768 × 900 (/design-block-master/en/block-library/page-header/tags-and-content-type, captured 2026-11-08).*

![Page Header: page-header/tags-and-content-type at small desktop 1024 × 900, published page /design-block-master/en/block-library/page-header/tags-and-content-type](./screenshots/block-library-page-header-tags-and-content-type-1024.jpg)

*Figure: Page Header: page-header/tags-and-content-type — small desktop 1024 × 900 (/design-block-master/en/block-library/page-header/tags-and-content-type, captured 2026-11-08).*

![Page Header: page-header/tags-and-content-type at desktop 1440 × 900, published page /design-block-master/en/block-library/page-header/tags-and-content-type](./screenshots/block-library-page-header-tags-and-content-type-1440.jpg)

*Figure: Page Header: page-header/tags-and-content-type — desktop 1440 × 900 (/design-block-master/en/block-library/page-header/tags-and-content-type, captured 2026-11-08).*

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
