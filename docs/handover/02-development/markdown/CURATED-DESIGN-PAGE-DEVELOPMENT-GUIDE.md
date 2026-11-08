---
id: "DEV-017"
title: "Curated Design Page Development Guide"
role: "Development"
topic: ""
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["docs/handover/knowledge-base/blocks.md"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Curated Design Page Development Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-017 |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Purpose of the curated design pages, how they are built and validated, and their patterns |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | docs/handover/knowledge-base/blocks.md |
| Related documents | — |
| Related AEM paths | /content/tcs-corp/design-block-master/en/curated-design-pages |

## Contents

- [Block Library and Curated Design Pages](#block-library-and-curated-design-pages)
- [Where they live](#where-they-live)
- [Pages](#pages)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Block Library and Curated Design Pages

The block library and the curated design pages are AEM content of the language master (`/content/tcs-corp/language-masters/en/block-library/...` and `.../curated-design-pages/...`), built as a content package from the corrected models; the build workspace (`.home-work/`, with `render-lib.mjs` for the local preview and `bl/bl-migrate.mjs` for migrations) is not in git. Each locale also has a `block-library/` folder, excluded from publishing in `paths.json`; the language master is published at `/language-masters/en` while it is under review (temporary, `REVIEW_*` in `utils/site.js`).

Uses:

- **Validation of every variation**: each block has library pages (e.g. `block-library/list/sources`, `block-library/animation/speed-and-trigger`, `block-library/foundations/section-colours-with-blocks` for the dark-background theme contract).
- **Design reference**: 11 curated design pages (case study, collection, home, industry landing page, insights, media and investor, product, services, story, what we do, who we are) rebuild Figma page designs from blocks.
- **Regression runs**: the audits loaded every library and curated page at 5 widths with axe and data-layer checks (188 pages, 940 loads) and compared aem.page with the local preview.
- **Example values in the READMEs**: `npm run build:docs` reads the library snapshot for the "Example" column and the usage section of each README.

Usage recorded in [tools/docs/library-snapshot.json](https://github.com/sradha-tcs/tcs-corp/blob/main/tools/docs/library-snapshot.json) (package 1.0.14; instances in all pages; pages counted once per block; "other" are the dummy pages used as List and Filter List sources):

| Block | Instances | Library pages | Curated pages | Other pages |
| --- | --- | --- | --- | --- |
| [Accordion](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/accordion/README.md) | 8 | 4 | 0 | 0 |
| [Anchor List](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/anchor-list/README.md) | 5 | 3 | 2 | 0 |
| [Button](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/button-block/README.md) | 79 | 18 | 0 | 1 |
| [Cards](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/cards/README.md) | 70 | 14 | 4 | 0 |
| [Column Break](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/column-break/README.md) | 161 | 13 | 0 | 0 |
| [Columns](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns/README.md) | 0 | 0 | 0 | 0 |
| [Columns Container](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns-container/README.md) | 38 | 9 | 0 | 0 |
| [Conversation Canvas](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/conversation-canvas/README.md) | 33 | 8 | 3 | 0 |
| [Embed](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/embed/README.md) | 6 | 1 | 0 | 0 |
| [Filter List](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/filter-list/README.md) | 32 | 8 | 2 | 1 |
| [Footer](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/footer/README.md) | 3 | 3 | 0 | 0 |
| [Form Variations](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/form-variations/README.md) | 19 | 5 | 0 | 0 |
| [Fragment](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/fragment/README.md) | 1 | 1 | 0 | 0 |
| [Gen Carousel](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/gen-carousel/README.md) | 5 | 5 | 0 | 0 |
| [Header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/header/README.md) | Not recorded (authored through the nav page) | 0 | 0 | 0 |
| [Hero](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/hero/README.md) | 182 | 13 | 5 | 123 |
| [Interactive Dashboard](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/interactive-dashboard/README.md) | 1 | 1 | 0 | 0 |
| [List](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/list/README.md) | 243 | 48 | 11 | 85 |
| [Media Contacts](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/media-contacts/README.md) | 6 | 3 | 1 | 0 |
| [Modal](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/modal/README.md) | 3 | 3 | 0 | 0 |
| [Page Header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/page-header/README.md) | 19 | 15 | 4 | 0 |
| [Quote](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/quote/README.md) | 12 | 3 | 2 | 0 |
| [Separator](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/separator/README.md) | 118 | 3 | 0 | 0 |
| [Tab](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tab/README.md) | 53 | 4 | 0 | 0 |
| [Table](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/table/README.md) | 12 | 1 | 0 | 0 |
| [Table List](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/table-list/README.md) | 23 | 6 | 6 | 0 |
| [Tabs](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tabs/README.md) (container and block) | 24 | 7 | 0 | 0 |
| [TCS Header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tcs-header/README.md) | 2 | 2 | 0 | 0 |
| [Teaser](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/teaser/README.md) | 173 | 18 | 12 | 0 |
| [Testimonial](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/testimonial/README.md) | 17 | 3 | 4 | 0 |
| [Video](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/video/README.md) | 27 | 2 | 0 | 0 |

These counts describe the library package, not production usage; production usage is not recorded in the repository.

## Where they live

Since KB-D-068 the block library and the curated design pages are in `/content/tcs-corp/design-block-master/en` (published at /design-block-master/en/).

## Pages

- [case-study](../curated-design-pages/case-study/CASE-STUDY-DEVELOPER-GUIDE.md)
- [collection](../curated-design-pages/collection/COLLECTION-DEVELOPER-GUIDE.md)
- [forms/ar-landing](../curated-design-pages/forms-ar-landing/FORMS-AR-LANDING-DEVELOPER-GUIDE.md)
- [forms/csr](../curated-design-pages/forms-csr/FORMS-CSR-DEVELOPER-GUIDE.md)
- [forms/csr-form](../curated-design-pages/forms-csr-form/FORMS-CSR-FORM-DEVELOPER-GUIDE.md)
- [forms/global-contact-us](../curated-design-pages/forms-global-contact-us/FORMS-GLOBAL-CONTACT-US-DEVELOPER-GUIDE.md)
- [forms/inquizitive](../curated-design-pages/forms-inquizitive/FORMS-INQUIZITIVE-DEVELOPER-GUIDE.md)
- [forms/media-form](../curated-design-pages/forms-media-form/FORMS-MEDIA-FORM-DEVELOPER-GUIDE.md)
- [forms/talk-to-an-expert-retail](../curated-design-pages/forms-talk-to-an-expert-retail/FORMS-TALK-TO-AN-EXPERT-RETAIL-DEVELOPER-GUIDE.md)
- [forms/website-feedback-form](../curated-design-pages/forms-website-feedback-form/FORMS-WEBSITE-FEEDBACK-FORM-DEVELOPER-GUIDE.md)
- [home](../curated-design-pages/home/HOME-DEVELOPER-GUIDE.md)
- [industry-landing-page](../curated-design-pages/industry-landing-page/INDUSTRY-LANDING-PAGE-DEVELOPER-GUIDE.md)
- [insights](../curated-design-pages/insights/INSIGHTS-DEVELOPER-GUIDE.md)
- [media-and-investor](../curated-design-pages/media-and-investor/MEDIA-AND-INVESTOR-DEVELOPER-GUIDE.md)
- [news-and-events](../curated-design-pages/news-and-events/NEWS-AND-EVENTS-DEVELOPER-GUIDE.md)
- [product](../curated-design-pages/product/PRODUCT-DEVELOPER-GUIDE.md)
- [services](../curated-design-pages/services/SERVICES-DEVELOPER-GUIDE.md)
- [story](../curated-design-pages/story/STORY-DEVELOPER-GUIDE.md)
- [what-we-do](../curated-design-pages/what-we-do/WHAT-WE-DO-DEVELOPER-GUIDE.md)
- [who-we-are](../curated-design-pages/who-we-are/WHO-WE-ARE-DEVELOPER-GUIDE.md)

Composition matrix: [CURATED-PAGE-COMPOSITION-MATRIX.md](../curated-design-pages/CURATED-PAGE-COMPOSITION-MATRIX.md).

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
