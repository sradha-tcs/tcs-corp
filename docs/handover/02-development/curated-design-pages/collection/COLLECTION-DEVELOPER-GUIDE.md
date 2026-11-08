---
id: "DEV-C-collection"
title: "Curated Design Page \"collection\" — Developer Guide"
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
relatedComponents: ["page-header","teaser","filter-list","table-list","list"]
relatedPages: ["/design-block-master/en/curated-design-pages/collection"]
confidence: "Medium"
primary: true
---

# Curated Design Page "collection" — Developer Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-C-collection |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | The composition, behaviour and checks of the curated design page collection |
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
| Related AEM paths | /content/tcs-corp/design-block-master/en/curated-design-pages/collection |

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
| Author path | /content/tcs-corp/design-block-master/en/curated-design-pages/collection |
| Preview | https://main--tcs-corp--sradha-tcs.aem.page/design-block-master/en/curated-design-pages/collection |
| Live | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/curated-design-pages/collection |
| Title | The Agentic bank |
| Business purpose | Design reference of the Figma page of the same name (INFERRED, REQUIRES BUSINESS VALIDATION) |
| Unique or reusable | Unique composition |

## Blocks in order

| # | Block | Classes (variations) | Developer guide |
| --- | --- | --- | --- |
| 1 | page-header | `page-header article` | [guide](../../blocks/page-header/PAGE-HEADER-DEVELOPER-GUIDE.md) |
| 2 | teaser | `teaser text-center valign-middle title-regular title-light-blue text-regular` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |
| 3 | filter-list | `filter-list card-mixed layout-grid` | [guide](../../blocks/filter-list/FILTER-LIST-DEVELOPER-GUIDE.md) |
| 4 | table-list | `table-list industries numbers-hide background-white` | [guide](../../blocks/table-list/TABLE-LIST-DEVELOPER-GUIDE.md) |
| 5 | list | `list card-list desktop-scroll tablet-scroll mobile-scroll mobile-indicator snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-mixed ratio-16-9 panel-portrait source-fixed` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |

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
| Data layer entries / events | 4 / — |
| Empty lists ("There are no items to show") | 0 |
| html lang | en-US |

## Authoring and development

Build the page from the blocks above in this order; each block's developer and authoring guides describe its fields and options. Metadata, taxonomy and assets of the page were not inspected on the author (no author access).

## Screenshots

![Curated design page collection at mobile 375 × 812, published page /design-block-master/en/curated-design-pages/collection](./screenshots/curated-design-pages-collection-375.jpg)

*Figure: Curated design page collection — mobile 375 × 812 (/design-block-master/en/curated-design-pages/collection, captured 2026-11-08).*

![Curated design page collection at tablet 768 × 900, published page /design-block-master/en/curated-design-pages/collection](./screenshots/curated-design-pages-collection-768.jpg)

*Figure: Curated design page collection — tablet 768 × 900 (/design-block-master/en/curated-design-pages/collection, captured 2026-11-08).*

![Curated design page collection at small desktop 1024 × 900, published page /design-block-master/en/curated-design-pages/collection](./screenshots/curated-design-pages-collection-1024.jpg)

*Figure: Curated design page collection — small desktop 1024 × 900 (/design-block-master/en/curated-design-pages/collection, captured 2026-11-08).*

![Curated design page collection at desktop 1440 × 900, published page /design-block-master/en/curated-design-pages/collection](./screenshots/curated-design-pages-collection-1440.jpg)

*Figure: Curated design page collection — desktop 1440 × 900 (/design-block-master/en/curated-design-pages/collection, captured 2026-11-08).*

## Known limitations

- Universal Editor and AEM author views were not captured (no author access).

## Open items

- The curated pages link to /language-master/en and to /content/tcs-corp/design-block-master/english/... (see the curated design page audit).

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
