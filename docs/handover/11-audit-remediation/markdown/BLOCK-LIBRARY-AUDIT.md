---
id: "AUD-002"
title: "Block Library Audit"
role: "Audit and remediation"
topic: ""
audience: "Technical lead, QA lead, documentation owner, product owner"
owner: "Documentation Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Block Library Audit

| Attribute | Value |
| --- | --- |
| Document ID | AUD-002 |
| Audience | Technical lead, QA lead, documentation owner, product owner |
| Purpose | Every block library page of /design-block-master/en with its blocks and checks, missing variations and blocks without a page |
| Scope | — |
| Prerequisites | — |
| Owner | Documentation Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Pages reviewed (179, automated, 8 November 2026)](#pages-reviewed-179-automated-8-november-2026)
- [Blocks without a block library page](#blocks-without-a-block-library-page)
- [Supported class options not shown in the block library (6)](#supported-class-options-not-shown-in-the-block-library-6)
- [Not reviewed](#not-reviewed)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Pages reviewed (179, automated, 8 November 2026)

| Page | Blocks | Block instances | Console errors | Failed requests | Overflow at |
| --- | --- | --- | --- | --- | --- |
| /design-block-master/en/block-library | list, button-block | 2 | 20 | 20 | none |
| accordion | list, accordion | 2 | 8 | 8 | none |
| accordion/accordion | anchor-list, accordion | 4 | 4 | 4 | none |
| anchor-list | list | 1 | 12 | 12 | none |
| anchor-list/anchor-list | anchor-list | 1 | 4 | 4 | none |
| anchor-list/anchor-list-sticky | anchor-list | 1 | 4 | 4 | none |
| animation | list | 1 | 20 | 20 | none |
| animation/background-animation | hero | 6 | 4 | 4 | none |
| animation/background-by-block | hero, conversation-canvas, teaser, quote, testimonial, form-variations | 12 | 4 | 4 | none |
| animation/content-animation | teaser, hero | 13 | 4 | 4 | none |
| animation/repeated-items | cards, list, accordion, columns-container, column-break, table-list, filter-list | 9 | 4 | 4 | none |
| animation/skeleton-loading | list, filter-list, conversation-canvas | 4 | 4 | 4 | none |
| animation/speed-and-trigger | hero, teaser, cards, conversation-canvas, list | 12 | 4 | 4 | none |
| cards | list | 1 | 20 | 20 | none |
| cards/card-colours | anchor-list, cards | 9 | 4 | 4 | none |
| cards/card-styles | anchor-list, cards | 9 | 4 | 4 | none |
| cards/grid-and-horizontal-scroll | anchor-list, cards | 17 | 4 | 4 | none |
| cards/heights-links-legacy | anchor-list, cards | 6 | 4 | 4 | none |
| cards/images-panels-style-options | anchor-list, cards | 12 | 8 | 8 | none |
| cards/per-card-styles-and-colours | anchor-list, cards | 4 | 4 | 4 | none |
| columns | list | 1 | 12 | 12 | none |
| columns-container | list | 1 | 16 | 16 | none |
| columns-container/alignment-gap-and-breakpoints | anchor-list, columns-container, column-break, button-block | 66 | 4 | 4 | none |
| columns-container/columns-of-blocks | anchor-list, columns-container, column-break, button-block, cards, teaser, quote, accordion, form-variations, list, testimonial | 34 | 4 | 4 | 1024 |
| columns-container/columns-per-row | anchor-list, columns-container, column-break | 25 | 4 | 4 | none |
| columns/columns-mobile-inset | columns-container, column-break | 3 | 4 | 4 | none |
| columns/columns-variations | anchor-list, columns-container, column-break, button-block | 27 | 4 | 4 | none |
| conversation-canvas | list | 1 | 20 | 20 | none |
| conversation-canvas/conversation-canvas | anchor-list, conversation-canvas | 17 | 4 | 4 | none |
| conversation-canvas/docked | conversation-canvas | 2 | 4 | 4 | none |
| conversation-canvas/floating | conversation-canvas | 1 | 4 | 4 | none |
| conversation-canvas/footer-canvas |  | 0 | 0 | 0 | none |
| conversation-canvas/journey-and-actions | anchor-list, conversation-canvas | 5 | 4 | 4 | none |
| embed | list | 1 | 8 | 8 | none |
| embed/embed | anchor-list, embed | 7 | 4 | 8 | none |
| filter-list | list | 1 | 20 | 20 | none |
| filter-list/content-types | anchor-list, filter-list | 3 | 4 | 4 | none |
| filter-list/filter-list | anchor-list, filter-list | 3 | 4 | 4 | none |
| filter-list/filters | anchor-list, filter-list | 5 | 4 | 4 | none |
| filter-list/insights-listing | anchor-list, filter-list | 2 | 4 | 4 | none |
| filter-list/layouts-and-card-styles | anchor-list, filter-list | 7 | 4 | 4 | none |
| filter-list/rules | anchor-list, filter-list | 13 | 4 | 4 | none |
| footer | list | 1 | 20 | 20 | none |
| footer/campaign-page |  | 0 | 4 | 4 | none |
| footer/default-footer-page |  | 0 | 4 | 4 | none |
| footer/footer-campaign | button-block, footer | 2 | 4 | 4 | none |
| footer/footer-conversation-canvas | conversation-canvas | 1 | 4 | 4 | none |
| footer/footer-default | footer | 1 | 0 | 0 | none |
| footer/footer-investors | footer | 1 | 4 | 4 | none |
| footer/investors-page |  | 0 | 4 | 4 | none |
| form-variations | list | 1 | 12 | 12 | none |
| form-variations/field-types | form-variations | 2 | 4 | 4 | none |
| form-variations/form-variations | form-variations | 14 | 4 | 4 | none |
| foundations | list | 1 | 20 | 20 | none |
| foundations/button | button-block | 19 | 4 | 4 | none |
| foundations/button-icons-and-alignment | button-block | 13 | 4 | 4 | none |
| foundations/image |  | 0 | 4 | 4 | none |
| foundations/section-anchors | anchor-list | 1 | 4 | 4 | none |
| foundations/section-colours-with-blocks | button-block, teaser, cards, list, accordion, columns-container, column-break | 33 | 4 | 4 | none |
| foundations/section-variations | teaser, button-block | 5 | 4 | 4 | none |
| foundations/section-views | button-block | 2 | 4 | 4 | none |
| foundations/section-widths | button-block | 2 | 4 | 4 | none |
| foundations/text |  | 0 | 4 | 4 | none |
| foundations/title |  | 0 | 4 | 4 | none |
| fragment | list | 2 | 12 | 12 | none |
| fragment/fragment-block | fragment, button-block | 2 | 8 | 8 | none |
| fragment/fragments | list | 1 | 8 | 8 | none |
| fragment/fragments/cta-banner | columns-container, column-break, button-block | 8 | 4 | 4 | none |
| gen-carousel | list | 1 | 20 | 20 | none |
| gen-carousel/auto | gen-carousel, hero | 6 | 4 | 4 | none |
| gen-carousel/hero-slides | gen-carousel, hero | 6 | 4 | 4 | none |
| gen-carousel/manual-and-auto | gen-carousel, hero | 6 | 4 | 4 | none |
| gen-carousel/single-slide | gen-carousel, hero | 2 | 4 | 4 | none |
| gen-carousel/teaser-slides | gen-carousel, teaser | 4 | 4 | 4 | none |
| header | list | 1 | 20 | 20 | none |
| header/header-careers |  | 0 | 8 | 8 | none |
| header/header-default |  | 0 | 8 | 8 | none |
| header/nav-careers | tcs-header | 1 | 4 | 4 | none |
| header/nav-default | tcs-header | 1 | 4 | 4 | none |
| hero | list | 1 | 20 | 20 | none |
| hero/hero-ctas | anchor-list, hero | 7 | 4 | 4 | none |
| hero/hero-motion | anchor-list, hero | 5 | 4 | 4 | none |
| hero/hero-overview | anchor-list, hero | 8 | 8 | 8 | none |
| hero/hero-styles | anchor-list, hero | 15 | 4 | 4 | none |
| interactive-dashboard | list | 1 | 8 | 8 | none |
| interactive-dashboard/interactive-dashboard | interactive-dashboard | 1 | 4 | 4 | none |
| list | list | 1 | 20 | 20 | none |
| list/card-colours-and-overrides | anchor-list, list | 7 | 4 | 4 | none |
| list/card-style-from-pages | anchor-list, list | 4 | 16 | 16 | none |
| list/card-style-from-pages/automatic |  | 0 | 4 | 4 | none |
| list/card-style-from-pages/image-light-blue |  | 0 | 4 | 4 | none |
| list/card-style-from-pages/panel-grey |  | 0 | 4 | 4 | none |
| list/card-style-from-pages/report-navy |  | 0 | 4 | 4 | none |
| list/card-style-from-pages/statistic |  | 0 | 4 | 4 | none |
| list/cards | anchor-list, list | 25 | 4 | 4 | none |
| list/empty-state | anchor-list, list | 3 | 4 | 4 | none |
| list/figma-variations | anchor-list, list | 15 | 4 | 4 | none |
| list/layout-and-scrolling | anchor-list, list | 21 | 4 | 4 | none |
| list/list-item-display | anchor-list, list | 9 | 4 | 4 | none |
| list/lists-made-before | anchor-list, list | 2 | 4 | 4 | none |
| list/sources | anchor-list, list | 11 | 4 | 4 | none |
| modal | list | 2 | 20 | 20 | none |
| modal/auto-linked-modal |  | 0 | 4 | 4 | none |
| modal/fragments | list | 1 | 20 | 20 | none |
| modal/fragments/contact-form | form-variations | 1 | 4 | 4 | none |
| modal/fragments/privacy-notice |  | 0 | 4 | 4 | none |
| modal/fragments/recognition | button-block | 1 | 4 | 4 | none |
| modal/fragments/terms |  | 0 | 4 | 4 | none |
| modal/modal-block | modal | 1 | 4 | 4 | none |
| modal/modal-long-content | modal | 1 | 4 | 4 | none |
| modal/modal-with-a-form | modal | 1 | 4 | 4 | none |
| page-header | list | 1 | 20 | 20 | none |
| page-header/article | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/article-default | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/cta-primary | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/cta-secondary | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/cta-text-link | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/default-by-page-type | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/display | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/guest-author | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/landing | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/landing-default | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/landing-featured-image | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/landing-text-only | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/press-release | page-header, anchor-list | 2 | 4 | 4 | none |
| page-header/secondary | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/tablet-widths | anchor-list, page-header | 2 | 4 | 4 | none |
| page-header/tags-and-content-type | anchor-list, list, page-header, teaser | 4 | 4 | 4 | none |
| quote | list, quote | 2 | 8 | 8 | none |
| quote/quote-variations | anchor-list, quote | 8 | 4 | 4 | none |
| separator | list, separator | 2 | 16 | 16 | none |
| separator/option-reference | anchor-list, separator | 62 | 4 | 4 | none |
| separator/separator-variations | anchor-list, separator | 56 | 4 | 4 | none |
| separator/theme-auto | anchor-list, separator | 3 | 4 | 4 | none |
| table | list | 1 | 8 | 8 | none |
| table-list | list | 1 | 20 | 20 | none |
| table-list/item-actions | anchor-list, table-list | 4 | 4 | 4 | none |
| table-list/motion | anchor-list, table-list | 5 | 4 | 4 | none |
| table-list/numbers | table-list | 1 | 4 | 4 | none |
| table-list/numbers-on-mobile | table-list | 1 | 4 | 4 | none |
| table-list/table-list | anchor-list, table-list | 8 | 4 | 4 | none |
| table/table | anchor-list, table | 10 | 4 | 4 | 375, 768, 1024, 1440 |
| tabs | list | 2 | 20 | 20 | none |
| tabs/fragments | list | 1 | 20 | 20 | none |
| tabs/fragments/cloud-overview | cards | 1 | 4 | 4 | none |
| tabs/fragments/consulting-overview | cards | 1 | 4 | 4 | none |
| tabs/fragments/security-overview | cards | 1 | 4 | 4 | none |
| tabs/fragments/tab-industries | columns-container, column-break, button-block | 7 | 4 | 4 | none |
| tabs/fragments/tab-overview |  | 0 | 4 | 4 | none |
| tabs/tab | anchor-list, tabs, tab, columns-container, column-break, button-block | 33 | 4 | 4 | none |
| tabs/tab-deep-link | anchor-list, tabs, tab, columns-container, column-break | 14 | 4 | 4 | none |
| tabs/tabs-block | anchor-list, tabs | 2 | 16 | 16 | none |
| tabs/tabs-block-styles | anchor-list, tabs | 6 | 20 | 20 | none |
| tabs/tabs-block-with-fragments | anchor-list, tabs | 2 | 12 | 12 | none |
| tabs/tabs-fixed-width | anchor-list, tabs, tab, columns-container, column-break | 27 | 4 | 4 | none |
| tabs/tabs-section | anchor-list, tabs, tab, columns-container, column-break, button-block | 97 | 4 | 4 | none |
| teaser | list | 1 | 20 | 20 | none |
| teaser/alignment | anchor-list, teaser | 10 | 4 | 4 | none |
| teaser/article-meta | anchor-list, teaser | 13 | 4 | 4 | none |
| teaser/cta-styles | anchor-list, teaser | 8 | 4 | 4 | none |
| teaser/description-eyebrow-spacing | anchor-list, teaser | 8 | 4 | 4 | none |
| teaser/image-options-and-colours | anchor-list, teaser | 11 | 4 | 4 | none |
| teaser/image-positions | anchor-list, teaser, image-collage | 10 | 4 | 4 | none |
| teaser/layouts | anchor-list, teaser | 10 | 8 | 8 | none |
| teaser/links-and-stats | anchor-list, teaser | 12 | 4 | 4 | none |
| teaser/mobile-image-position | anchor-list, teaser | 4 | 4 | 4 | none |
| teaser/title-sizes-and-weights | teaser, anchor-list | 14 | 4 | 4 | none |
| templates | list | 1 | 20 | 20 | none |
| templates/article-template | page-header | 1 | 4 | 4 | none |
| templates/blog-template | page-header | 1 | 4 | 4 | none |
| templates/error-page-404 | button-block | 1 | 4 | 4 | none |
| templates/error-page-404-careers | button-block | 2 | 4 | 4 | none |
| templates/home-template | hero, cards, button-block | 3 | 4 | 4 | none |
| templates/press-release-template | page-header | 1 | 4 | 4 | none |
| testimonial | list | 1 | 8 | 8 | none |
| testimonial/testimonial-variations | anchor-list, testimonial | 12 | 4 | 4 | 375, 768, 1024 |
| video | list | 1 | 12 | 12 | none |
| video/video | anchor-list, video | 27 | 20 | 20 | none |
| video/video-pop-up | video | 1 | 4 | 4 | none |

## Blocks without a block library page

- `button-block`
- `column-break`
- `image-collage`
- `media-contacts`
- `tab`
- `tcs-header`

## Supported class options not shown in the block library (6)

| Block | Component | Field | Option | Value |
| --- | --- | --- | --- | --- |
| hero | hero | Icon color | Black | `icon-black` |
| hero | hero | Icon color | White | `icon-white` |
| hero | hero | Eyebrow color | Royal blue | `eyebrow-royal-blue` |
| tab | tab | Columns per row | 1 | `per-row-1` |
| tab | tab | Columns per row | 3 | `per-row-3` |
| tab | tab | Columns per row | 4 | `per-row-4` |

## Not reviewed

The Universal Editor configuration of the examples (dialog values, Additional tab) couldn't be compared (AB-01).

The pages of the block folders are shown in each block's test coverage document; the pages below (animation, foundations, templates, the index) belong to no block folder.

## Screenshots

![Block library page block-library at desktop 1440 × 900, published page /design-block-master/en/block-library](../evidence/screenshots/block-library-1440.jpg)

*Figure: Block library page block-library — desktop 1440 × 900 (/design-block-master/en/block-library, captured 2026-11-08).*

![Block library page block-library at mobile 375 × 812, published page /design-block-master/en/block-library](../evidence/screenshots/block-library-375.jpg)

*Figure: Block library page block-library — mobile 375 × 812 (/design-block-master/en/block-library, captured 2026-11-08).*

![Block library page block-library/animation at desktop 1440 × 900, published page /design-block-master/en/block-library/animation](../evidence/screenshots/block-library-animation-1440.jpg)

*Figure: Block library page block-library/animation — desktop 1440 × 900 (/design-block-master/en/block-library/animation, captured 2026-11-08).*

![Block library page block-library/animation at mobile 375 × 812, published page /design-block-master/en/block-library/animation](../evidence/screenshots/block-library-animation-375.jpg)

*Figure: Block library page block-library/animation — mobile 375 × 812 (/design-block-master/en/block-library/animation, captured 2026-11-08).*

![Block library page block-library/animation/background-animation at desktop 1440 × 900, published page /design-block-master/en/block-library/animation/background-animation](../evidence/screenshots/block-library-animation-background-animation-1440.jpg)

*Figure: Block library page block-library/animation/background-animation — desktop 1440 × 900 (/design-block-master/en/block-library/animation/background-animation, captured 2026-11-08).*

![Block library page block-library/animation/background-animation at mobile 375 × 812, published page /design-block-master/en/block-library/animation/background-animation](../evidence/screenshots/block-library-animation-background-animation-375.jpg)

*Figure: Block library page block-library/animation/background-animation — mobile 375 × 812 (/design-block-master/en/block-library/animation/background-animation, captured 2026-11-08).*

![Block library page block-library/animation/background-by-block at desktop 1440 × 900, published page /design-block-master/en/block-library/animation/background-by-block](../evidence/screenshots/block-library-animation-background-by-block-1440.jpg)

*Figure: Block library page block-library/animation/background-by-block — desktop 1440 × 900 (/design-block-master/en/block-library/animation/background-by-block, captured 2026-11-08).*

![Block library page block-library/animation/background-by-block at mobile 375 × 812, published page /design-block-master/en/block-library/animation/background-by-block](../evidence/screenshots/block-library-animation-background-by-block-375.jpg)

*Figure: Block library page block-library/animation/background-by-block — mobile 375 × 812 (/design-block-master/en/block-library/animation/background-by-block, captured 2026-11-08).*

![Block library page block-library/animation/content-animation at desktop 1440 × 900, published page /design-block-master/en/block-library/animation/content-animation](../evidence/screenshots/block-library-animation-content-animation-1440.jpg)

*Figure: Block library page block-library/animation/content-animation — desktop 1440 × 900 (/design-block-master/en/block-library/animation/content-animation, captured 2026-11-08).*

![Block library page block-library/animation/content-animation at mobile 375 × 812, published page /design-block-master/en/block-library/animation/content-animation](../evidence/screenshots/block-library-animation-content-animation-375.jpg)

*Figure: Block library page block-library/animation/content-animation — mobile 375 × 812 (/design-block-master/en/block-library/animation/content-animation, captured 2026-11-08).*

![Block library page block-library/animation/repeated-items at desktop 1440 × 900, published page /design-block-master/en/block-library/animation/repeated-items](../evidence/screenshots/block-library-animation-repeated-items-1440.jpg)

*Figure: Block library page block-library/animation/repeated-items — desktop 1440 × 900 (/design-block-master/en/block-library/animation/repeated-items, captured 2026-11-08).*

![Block library page block-library/animation/repeated-items at mobile 375 × 812, published page /design-block-master/en/block-library/animation/repeated-items](../evidence/screenshots/block-library-animation-repeated-items-375.jpg)

*Figure: Block library page block-library/animation/repeated-items — mobile 375 × 812 (/design-block-master/en/block-library/animation/repeated-items, captured 2026-11-08).*

![Block library page block-library/animation/skeleton-loading at desktop 1440 × 900, published page /design-block-master/en/block-library/animation/skeleton-loading](../evidence/screenshots/block-library-animation-skeleton-loading-1440.jpg)

*Figure: Block library page block-library/animation/skeleton-loading — desktop 1440 × 900 (/design-block-master/en/block-library/animation/skeleton-loading, captured 2026-11-08).*

![Block library page block-library/animation/skeleton-loading at mobile 375 × 812, published page /design-block-master/en/block-library/animation/skeleton-loading](../evidence/screenshots/block-library-animation-skeleton-loading-375.jpg)

*Figure: Block library page block-library/animation/skeleton-loading — mobile 375 × 812 (/design-block-master/en/block-library/animation/skeleton-loading, captured 2026-11-08).*

![Block library page block-library/animation/speed-and-trigger at desktop 1440 × 900, published page /design-block-master/en/block-library/animation/speed-and-trigger](../evidence/screenshots/block-library-animation-speed-and-trigger-1440.jpg)

*Figure: Block library page block-library/animation/speed-and-trigger — desktop 1440 × 900 (/design-block-master/en/block-library/animation/speed-and-trigger, captured 2026-11-08).*

![Block library page block-library/animation/speed-and-trigger at mobile 375 × 812, published page /design-block-master/en/block-library/animation/speed-and-trigger](../evidence/screenshots/block-library-animation-speed-and-trigger-375.jpg)

*Figure: Block library page block-library/animation/speed-and-trigger — mobile 375 × 812 (/design-block-master/en/block-library/animation/speed-and-trigger, captured 2026-11-08).*

![Block library page block-library/foundations at desktop 1440 × 900, published page /design-block-master/en/block-library/foundations](../evidence/screenshots/block-library-foundations-1440.jpg)

*Figure: Block library page block-library/foundations — desktop 1440 × 900 (/design-block-master/en/block-library/foundations, captured 2026-11-08).*

![Block library page block-library/foundations at mobile 375 × 812, published page /design-block-master/en/block-library/foundations](../evidence/screenshots/block-library-foundations-375.jpg)

*Figure: Block library page block-library/foundations — mobile 375 × 812 (/design-block-master/en/block-library/foundations, captured 2026-11-08).*

![Block library page block-library/foundations/button at desktop 1440 × 900, published page /design-block-master/en/block-library/foundations/button](../evidence/screenshots/block-library-foundations-button-1440.jpg)

*Figure: Block library page block-library/foundations/button — desktop 1440 × 900 (/design-block-master/en/block-library/foundations/button, captured 2026-11-08).*

![Block library page block-library/foundations/button at mobile 375 × 812, published page /design-block-master/en/block-library/foundations/button](../evidence/screenshots/block-library-foundations-button-375.jpg)

*Figure: Block library page block-library/foundations/button — mobile 375 × 812 (/design-block-master/en/block-library/foundations/button, captured 2026-11-08).*

![Block library page block-library/foundations/button-icons-and-alignment at desktop 1440 × 900, published page /design-block-master/en/block-library/foundations/button-icons-and-alignment](../evidence/screenshots/block-library-foundations-button-icons-and-alignment-1440.jpg)

*Figure: Block library page block-library/foundations/button-icons-and-alignment — desktop 1440 × 900 (/design-block-master/en/block-library/foundations/button-icons-and-alignment, captured 2026-11-08).*

![Block library page block-library/foundations/button-icons-and-alignment at mobile 375 × 812, published page /design-block-master/en/block-library/foundations/button-icons-and-alignment](../evidence/screenshots/block-library-foundations-button-icons-and-alignment-375.jpg)

*Figure: Block library page block-library/foundations/button-icons-and-alignment — mobile 375 × 812 (/design-block-master/en/block-library/foundations/button-icons-and-alignment, captured 2026-11-08).*

![Block library page block-library/foundations/image at desktop 1440 × 900, published page /design-block-master/en/block-library/foundations/image](../evidence/screenshots/block-library-foundations-image-1440.jpg)

*Figure: Block library page block-library/foundations/image — desktop 1440 × 900 (/design-block-master/en/block-library/foundations/image, captured 2026-11-08).*

![Block library page block-library/foundations/image at mobile 375 × 812, published page /design-block-master/en/block-library/foundations/image](../evidence/screenshots/block-library-foundations-image-375.jpg)

*Figure: Block library page block-library/foundations/image — mobile 375 × 812 (/design-block-master/en/block-library/foundations/image, captured 2026-11-08).*

![Block library page block-library/foundations/section-anchors at desktop 1440 × 900, published page /design-block-master/en/block-library/foundations/section-anchors](../evidence/screenshots/block-library-foundations-section-anchors-1440.jpg)

*Figure: Block library page block-library/foundations/section-anchors — desktop 1440 × 900 (/design-block-master/en/block-library/foundations/section-anchors, captured 2026-11-08).*

![Block library page block-library/foundations/section-anchors at mobile 375 × 812, published page /design-block-master/en/block-library/foundations/section-anchors](../evidence/screenshots/block-library-foundations-section-anchors-375.jpg)

*Figure: Block library page block-library/foundations/section-anchors — mobile 375 × 812 (/design-block-master/en/block-library/foundations/section-anchors, captured 2026-11-08).*

![Block library page block-library/foundations/section-colours-with-blocks at desktop 1440 × 900, published page /design-block-master/en/block-library/foundations/section-colours-with-blocks](../evidence/screenshots/block-library-foundations-section-colours-with-blocks-1440.jpg)

*Figure: Block library page block-library/foundations/section-colours-with-blocks — desktop 1440 × 900 (/design-block-master/en/block-library/foundations/section-colours-with-blocks, captured 2026-11-08).*

![Block library page block-library/foundations/section-colours-with-blocks at mobile 375 × 812, published page /design-block-master/en/block-library/foundations/section-colours-with-blocks](../evidence/screenshots/block-library-foundations-section-colours-with-blocks-375.jpg)

*Figure: Block library page block-library/foundations/section-colours-with-blocks — mobile 375 × 812 (/design-block-master/en/block-library/foundations/section-colours-with-blocks, captured 2026-11-08).*

![Block library page block-library/foundations/section-variations at desktop 1440 × 900, published page /design-block-master/en/block-library/foundations/section-variations](../evidence/screenshots/block-library-foundations-section-variations-1440.jpg)

*Figure: Block library page block-library/foundations/section-variations — desktop 1440 × 900 (/design-block-master/en/block-library/foundations/section-variations, captured 2026-11-08).*

![Block library page block-library/foundations/section-variations at mobile 375 × 812, published page /design-block-master/en/block-library/foundations/section-variations](../evidence/screenshots/block-library-foundations-section-variations-375.jpg)

*Figure: Block library page block-library/foundations/section-variations — mobile 375 × 812 (/design-block-master/en/block-library/foundations/section-variations, captured 2026-11-08).*

![Block library page block-library/foundations/section-views at desktop 1440 × 900, published page /design-block-master/en/block-library/foundations/section-views](../evidence/screenshots/block-library-foundations-section-views-1440.jpg)

*Figure: Block library page block-library/foundations/section-views — desktop 1440 × 900 (/design-block-master/en/block-library/foundations/section-views, captured 2026-11-08).*

![Block library page block-library/foundations/section-views at mobile 375 × 812, published page /design-block-master/en/block-library/foundations/section-views](../evidence/screenshots/block-library-foundations-section-views-375.jpg)

*Figure: Block library page block-library/foundations/section-views — mobile 375 × 812 (/design-block-master/en/block-library/foundations/section-views, captured 2026-11-08).*

![Block library page block-library/foundations/section-widths at desktop 1440 × 900, published page /design-block-master/en/block-library/foundations/section-widths](../evidence/screenshots/block-library-foundations-section-widths-1440.jpg)

*Figure: Block library page block-library/foundations/section-widths — desktop 1440 × 900 (/design-block-master/en/block-library/foundations/section-widths, captured 2026-11-08).*

![Block library page block-library/foundations/section-widths at mobile 375 × 812, published page /design-block-master/en/block-library/foundations/section-widths](../evidence/screenshots/block-library-foundations-section-widths-375.jpg)

*Figure: Block library page block-library/foundations/section-widths — mobile 375 × 812 (/design-block-master/en/block-library/foundations/section-widths, captured 2026-11-08).*

![Block library page block-library/foundations/text at desktop 1440 × 900, published page /design-block-master/en/block-library/foundations/text](../evidence/screenshots/block-library-foundations-text-1440.jpg)

*Figure: Block library page block-library/foundations/text — desktop 1440 × 900 (/design-block-master/en/block-library/foundations/text, captured 2026-11-08).*

![Block library page block-library/foundations/text at mobile 375 × 812, published page /design-block-master/en/block-library/foundations/text](../evidence/screenshots/block-library-foundations-text-375.jpg)

*Figure: Block library page block-library/foundations/text — mobile 375 × 812 (/design-block-master/en/block-library/foundations/text, captured 2026-11-08).*

![Block library page block-library/foundations/title at desktop 1440 × 900, published page /design-block-master/en/block-library/foundations/title](../evidence/screenshots/block-library-foundations-title-1440.jpg)

*Figure: Block library page block-library/foundations/title — desktop 1440 × 900 (/design-block-master/en/block-library/foundations/title, captured 2026-11-08).*

![Block library page block-library/foundations/title at mobile 375 × 812, published page /design-block-master/en/block-library/foundations/title](../evidence/screenshots/block-library-foundations-title-375.jpg)

*Figure: Block library page block-library/foundations/title — mobile 375 × 812 (/design-block-master/en/block-library/foundations/title, captured 2026-11-08).*

![Block library page block-library/templates at desktop 1440 × 900, published page /design-block-master/en/block-library/templates](../evidence/screenshots/block-library-templates-1440.jpg)

*Figure: Block library page block-library/templates — desktop 1440 × 900 (/design-block-master/en/block-library/templates, captured 2026-11-08).*

![Block library page block-library/templates at mobile 375 × 812, published page /design-block-master/en/block-library/templates](../evidence/screenshots/block-library-templates-375.jpg)

*Figure: Block library page block-library/templates — mobile 375 × 812 (/design-block-master/en/block-library/templates, captured 2026-11-08).*

![Block library page block-library/templates/article-template at desktop 1440 × 900, published page /design-block-master/en/block-library/templates/article-template](../evidence/screenshots/block-library-templates-article-template-1440.jpg)

*Figure: Block library page block-library/templates/article-template — desktop 1440 × 900 (/design-block-master/en/block-library/templates/article-template, captured 2026-11-08).*

![Block library page block-library/templates/article-template at mobile 375 × 812, published page /design-block-master/en/block-library/templates/article-template](../evidence/screenshots/block-library-templates-article-template-375.jpg)

*Figure: Block library page block-library/templates/article-template — mobile 375 × 812 (/design-block-master/en/block-library/templates/article-template, captured 2026-11-08).*

![Block library page block-library/templates/blog-template at desktop 1440 × 900, published page /design-block-master/en/block-library/templates/blog-template](../evidence/screenshots/block-library-templates-blog-template-1440.jpg)

*Figure: Block library page block-library/templates/blog-template — desktop 1440 × 900 (/design-block-master/en/block-library/templates/blog-template, captured 2026-11-08).*

![Block library page block-library/templates/blog-template at mobile 375 × 812, published page /design-block-master/en/block-library/templates/blog-template](../evidence/screenshots/block-library-templates-blog-template-375.jpg)

*Figure: Block library page block-library/templates/blog-template — mobile 375 × 812 (/design-block-master/en/block-library/templates/blog-template, captured 2026-11-08).*

![Block library page block-library/templates/error-page-404 at desktop 1440 × 900, published page /design-block-master/en/block-library/templates/error-page-404](../evidence/screenshots/block-library-templates-error-page-404-1440.jpg)

*Figure: Block library page block-library/templates/error-page-404 — desktop 1440 × 900 (/design-block-master/en/block-library/templates/error-page-404, captured 2026-11-08).*

![Block library page block-library/templates/error-page-404 at mobile 375 × 812, published page /design-block-master/en/block-library/templates/error-page-404](../evidence/screenshots/block-library-templates-error-page-404-375.jpg)

*Figure: Block library page block-library/templates/error-page-404 — mobile 375 × 812 (/design-block-master/en/block-library/templates/error-page-404, captured 2026-11-08).*

![Block library page block-library/templates/error-page-404-careers at desktop 1440 × 900, published page /design-block-master/en/block-library/templates/error-page-404-careers](../evidence/screenshots/block-library-templates-error-page-404-careers-1440.jpg)

*Figure: Block library page block-library/templates/error-page-404-careers — desktop 1440 × 900 (/design-block-master/en/block-library/templates/error-page-404-careers, captured 2026-11-08).*

![Block library page block-library/templates/error-page-404-careers at mobile 375 × 812, published page /design-block-master/en/block-library/templates/error-page-404-careers](../evidence/screenshots/block-library-templates-error-page-404-careers-375.jpg)

*Figure: Block library page block-library/templates/error-page-404-careers — mobile 375 × 812 (/design-block-master/en/block-library/templates/error-page-404-careers, captured 2026-11-08).*

![Block library page block-library/templates/home-template at desktop 1440 × 900, published page /design-block-master/en/block-library/templates/home-template](../evidence/screenshots/block-library-templates-home-template-1440.jpg)

*Figure: Block library page block-library/templates/home-template — desktop 1440 × 900 (/design-block-master/en/block-library/templates/home-template, captured 2026-11-08).*

![Block library page block-library/templates/home-template at mobile 375 × 812, published page /design-block-master/en/block-library/templates/home-template](../evidence/screenshots/block-library-templates-home-template-375.jpg)

*Figure: Block library page block-library/templates/home-template — mobile 375 × 812 (/design-block-master/en/block-library/templates/home-template, captured 2026-11-08).*

![Block library page block-library/templates/press-release-template at desktop 1440 × 900, published page /design-block-master/en/block-library/templates/press-release-template](../evidence/screenshots/block-library-templates-press-release-template-1440.jpg)

*Figure: Block library page block-library/templates/press-release-template — desktop 1440 × 900 (/design-block-master/en/block-library/templates/press-release-template, captured 2026-11-08).*

![Block library page block-library/templates/press-release-template at mobile 375 × 812, published page /design-block-master/en/block-library/templates/press-release-template](../evidence/screenshots/block-library-templates-press-release-template-375.jpg)

*Figure: Block library page block-library/templates/press-release-template — mobile 375 × 812 (/design-block-master/en/block-library/templates/press-release-template, captured 2026-11-08).*

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
