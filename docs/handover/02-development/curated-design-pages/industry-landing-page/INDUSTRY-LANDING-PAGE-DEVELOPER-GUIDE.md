---
id: "DEV-C-industry-landing-page"
title: "Curated Design Page \"industry-landing-page\" — Developer Guide"
role: "Development"
topic: "curated page"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["published page"]
relatedComponents: ["teaser","cards","video","columns-container","column-break","table-list","list","testimonial"]
relatedPages: ["/design-block-master/en/curated-design-pages/industry-landing-page"]
confidence: "Medium"
primary: true
---

# Curated Design Page "industry-landing-page" — Developer Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-C-industry-landing-page |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | The composition, behaviour and checks of the curated design page industry-landing-page |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | published page |
| Related documents | — |
| Related AEM paths | /content/tcs-corp/design-block-master/en/curated-design-pages/industry-landing-page |

## Contents

- [Page](#page)
- [Blocks in order](#blocks-in-order)
- [Automated checks (executed 2026-11-08)](#automated-checks-executed-2026-11-08)
- [Authoring and development](#authoring-and-development)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Page

| Attribute | Value |
| --- | --- |
| Author path | /content/tcs-corp/design-block-master/en/curated-design-pages/industry-landing-page |
| Preview | https://main--tcs-corp--sradha-tcs.aem.page/design-block-master/en/curated-design-pages/industry-landing-page |
| Live | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/curated-design-pages/industry-landing-page |
| Title | Industry Landing Page |
| Business purpose | Design reference of the Figma page of the same name (INFERRED, REQUIRES BUSINESS VALIDATION) |
| Unique or reusable | Unique composition |

## Blocks in order

| # | Block | Classes (variations) | Developer guide |
| --- | --- | --- | --- |
| 1 | teaser | `teaser mt-3000 no-image text-left valign-middle mobile-image-bottom title-regular eyebrow-grey ratio-original` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |
| 2 | cards | `cards stat-compact pt-500 mt-3000 card-list desktop-grid tablet-grid mobile-grid snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-panel ratio-16-9 panel-auto source-manual` | [guide](../../blocks/cards/CARDS-DEVELOPER-GUIDE.md) |
| 3 | video | `video mt-2400 video-size-full video-align-center` | [guide](../../blocks/video/VIDEO-DEVELOPER-GUIDE.md) |
| 4 | columns-container | `columns-container per-row-auto gap-medium align-top from-desktop mt-2400 columns-container-2` | [guide](../../blocks/columns-container/COLUMNS-CONTAINER-DEVELOPER-GUIDE.md) |
| 5 | column-break | `column-break` | [guide](../../blocks/column-break/COLUMN-BREAK-DEVELOPER-GUIDE.md) |
| 6 | table-list | `table-list industries numbers-mobile background-white` | [guide](../../blocks/table-list/TABLE-LIST-DEVELOPER-GUIDE.md) |
| 7 | list | `list mt-2000 card-list desktop-grid tablet-scroll mobile-scroll mobile-indicator snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-mixed ratio-16-9 panel-portrait source-tags` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 8 | list | `list pl-1200 pr-1200 pt-2000 pb-2000 card-list desktop-grid tablet-grid mobile-grid snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-image ratio-1-1 panel-portrait source-parent` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 9 | list | `list ml-1200 mr-1200 card-list desktop-grid tablet-grid mobile-grid snap hide-scrollbar edge-bleed stretch feature-first snap-start display-teaser style-image ratio-16-9 panel-portrait source-fixed` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 10 | testimonial | `testimonial pl-1200 pr-1200 pt-2000 pb-0 mb-0` | [guide](../../blocks/testimonial/TESTIMONIAL-DEVELOPER-GUIDE.md) |
| 11 | table-list | `table-list pt-800 pb-800 segments numbers-hide background-white` | [guide](../../blocks/table-list/TABLE-LIST-DEVELOPER-GUIDE.md) |
| 12 | list | `list pt-1600 pb-2000 card-list desktop-scroll tablet-grid mobile-grid snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-stat ratio-16-9 panel-portrait source-fixed` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 13 | list | `list dividers card-list desktop-grid tablet-grid mobile-grid snap hide-scrollbar edge-bleed stretch snap-start links style-image ratio-16-9 panel-portrait source-parent` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 14 | cards | `cards card-list desktop-grid tablet-grid mobile-grid snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-image ratio-16-9 panel-portrait source-manual` | [guide](../../blocks/cards/CARDS-DEVELOPER-GUIDE.md) |
| 15 | list | `list card-list desktop-grid tablet-grid mobile-grid snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-image ratio-16-9 panel-portrait source-fixed` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |

## Automated checks (executed 2026-11-08)

| Check | Result |
| --- | --- |
| HTTP status 375 / 768 / 1024 / 1440 | 200 / 200 / 200 / 200 |
| Horizontal overflow 375 / 768 / 1024 / 1440 | no / no / no / no |
| Console errors | 375: Failed to load resource: the server responded with a status of 404 (); 768: Failed to load resource: the server responded with a status of 404 (); 1024: Failed to load resource: the server responded with a status of 404 (); 1440: Failed to load resource: the server responded with a status of 404 () |
| Failed requests | 375: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html; 768: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html; 1024: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html; 1440: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html |
| H1 count | 1 |
| Heading level skips | 0 |
| Images without alt | 0 |
| Unnamed buttons | 0 |
| Links without a name | 0 |
| Data layer entries / events | 9 / — |
| Empty lists ("There are no items to show") | 3 |
| html lang | en-US |

## Authoring and development

Build the page from the blocks above in this order; each block's developer and authoring guides describe its fields and options. Metadata, taxonomy and assets of the page were not inspected on the author (no author access).

## Screenshots

![Curated design page industry-landing-page at mobile 375 × 812, published page /design-block-master/en/curated-design-pages/industry-landing-page](./screenshots/curated-design-pages-industry-landing-page-375.jpg)

*Figure: Curated design page industry-landing-page — mobile 375 × 812 (/design-block-master/en/curated-design-pages/industry-landing-page, captured 2026-11-08).*

![Curated design page industry-landing-page at tablet 768 × 900, published page /design-block-master/en/curated-design-pages/industry-landing-page](./screenshots/curated-design-pages-industry-landing-page-768.jpg)

*Figure: Curated design page industry-landing-page — tablet 768 × 900 (/design-block-master/en/curated-design-pages/industry-landing-page, captured 2026-11-08).*

![Curated design page industry-landing-page at small desktop 1024 × 900, published page /design-block-master/en/curated-design-pages/industry-landing-page](./screenshots/curated-design-pages-industry-landing-page-1024.jpg)

*Figure: Curated design page industry-landing-page — small desktop 1024 × 900 (/design-block-master/en/curated-design-pages/industry-landing-page, captured 2026-11-08).*

![Curated design page industry-landing-page at desktop 1440 × 900, published page /design-block-master/en/curated-design-pages/industry-landing-page](./screenshots/curated-design-pages-industry-landing-page-1440.jpg)

*Figure: Curated design page industry-landing-page — desktop 1440 × 900 (/design-block-master/en/curated-design-pages/industry-landing-page, captured 2026-11-08).*

## Known limitations

- Universal Editor and AEM author views were not captured (no author access).

## Open items

- The curated pages link to /language-master/en and to /content/tcs-corp/design-block-master/english/... (see the curated design page audit).

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
