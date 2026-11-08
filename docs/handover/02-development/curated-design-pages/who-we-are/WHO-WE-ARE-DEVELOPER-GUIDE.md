---
id: "DEV-C-who-we-are"
title: "Curated Design Page \"who-we-are\" — Developer Guide"
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
relatedComponents: ["hero","teaser","cards","testimonial","list","quote","gen-carousel"]
relatedPages: ["/design-block-master/en/curated-design-pages/who-we-are"]
confidence: "Medium"
primary: true
---

# Curated Design Page "who-we-are" — Developer Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-C-who-we-are |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | The composition, behaviour and checks of the curated design page who-we-are |
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
| Related AEM paths | /content/tcs-corp/design-block-master/en/curated-design-pages/who-we-are |

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
| Author path | /content/tcs-corp/design-block-master/en/curated-design-pages/who-we-are |
| Preview | https://main--tcs-corp--sradha-tcs.aem.page/design-block-master/en/curated-design-pages/who-we-are |
| Live | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/curated-design-pages/who-we-are |
| Title | Who We Are |
| Business purpose | Design reference of the Figma page of the same name (INFERRED, REQUIRES BUSINESS VALIDATION) |
| Unique or reusable | Unique composition |

## Blocks in order

| # | Block | Classes (variations) | Developer guide |
| --- | --- | --- | --- |
| 1 | hero | `hero align-middle align-center text-center bg-navy-60 hero-has-media` | [guide](../../blocks/hero/HERO-DEVELOPER-GUIDE.md) |
| 2 | teaser | `teaser text-left` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |
| 3 | cards | `cards pt-3000 pb-3000 card-list desktop-grid tablet-scroll mobile-scroll mobile-indicator snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-image ratio-16-9 panel-portrait source-manual` | [guide](../../blocks/cards/CARDS-DEVELOPER-GUIDE.md) |
| 4 | teaser | `teaser pl-800 pr-800 image-collage bg-navy text-center valign-middle mobile-image-top title-regular text-large spacing-header ratio-8-9 buttons-inline` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |
| 5 | testimonial | `testimonial mb-400 bg-navy` | [guide](../../blocks/testimonial/TESTIMONIAL-DEVELOPER-GUIDE.md) |
| 6 | list | `list pb-2000 card-list desktop-grid tablet-grid mobile-scroll mobile-indicator snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-panel ratio-1-1 panel-portrait source-fixed` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 7 | list | `list pl-1600 pr-1600 pt-800 card-list desktop-grid tablet-grid mobile-scroll mobile-indicator snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-panel ratio-1-1 panel-portrait source-fixed` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 8 | quote | `quote quote-has-media` | [guide](../../blocks/quote/QUOTE-DEVELOPER-GUIDE.md) |
| 9 | gen-carousel | `gen-carousel manual pt-1600 pb-2000` | [guide](../../blocks/gen-carousel/GEN-CAROUSEL-DEVELOPER-GUIDE.md) |
| 10 | teaser | `teaser` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |
| 11 | teaser | `teaser` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |
| 12 | teaser | `teaser` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |
| 13 | teaser | `teaser` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |
| 14 | teaser | `teaser pt-3000 background bg-dark text-center valign-middle title-regular` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |
| 15 | teaser | `teaser pt-2400 background bg-dark text-center valign-middle` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |

## Automated checks (executed 2026-11-08)

| Check | Result |
| --- | --- |
| HTTP status 375 / 768 / 1024 / 1440 | 200 / 200 / 200 / 200 |
| Horizontal overflow 375 / 768 / 1024 / 1440 | no / no / yes / no |
| Console errors | 375: Failed to load resource: the server responded with a status of 404 (); 375: Failed to load resource: the server responded with a status of 404 (); 375: Failed to load resource: the server responded with a status of 404 (); 768: Failed to load resource: the server responded with a status of 404 (); 768: Failed to load resource: the server responded with a status of 404 (); 768: Failed to load resource: the server responded with a status of 404 (); 1024: Failed to load resource: the server responded with a status of 404 (); 1024: Failed to load resource: the server responded with a status of 404 (); 1024: Failed to load resource: the server responded with a status of 404 (); 1440: Failed to load resource: the server responded with a status of 404 (); 1440: Failed to load resource: the server responded with a status of 404 (); 1440: Failed to load resource: the server responded with a status of 404 () |
| Failed requests | 375: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html; 375: 404 https://main--tcs-corp--sradha-tcs.aem.live/language-master/en/dummy-pages/jaguar; 375: 404 https://main--tcs-corp--sradha-tcs.aem.live/language-master/en/dummy-pages/jaguar-tcs-racing; 768: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html; 768: 404 https://main--tcs-corp--sradha-tcs.aem.live/language-master/en/dummy-pages/jaguar-tcs-racing; 768: 404 https://main--tcs-corp--sradha-tcs.aem.live/language-master/en/dummy-pages/jaguar; 1024: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html; 1024: 404 https://main--tcs-corp--sradha-tcs.aem.live/language-master/en/dummy-pages/jaguar; 1024: 404 https://main--tcs-corp--sradha-tcs.aem.live/language-master/en/dummy-pages/jaguar-tcs-racing; 1440: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html; 1440: 404 https://main--tcs-corp--sradha-tcs.aem.live/language-master/en/dummy-pages/jaguar-tcs-racing; 1440: 404 https://main--tcs-corp--sradha-tcs.aem.live/language-master/en/dummy-pages/jaguar |
| H1 count | 3 |
| Heading level skips | 0 |
| Images without alt | 0 |
| Unnamed buttons | 0 |
| Links without a name | 0 |
| Data layer entries / events | 6 / — |
| Empty lists ("There are no items to show") | 0 |
| html lang | en-US |

## Authoring and development

Build the page from the blocks above in this order; each block's developer and authoring guides describe its fields and options. Metadata, taxonomy and assets of the page were not inspected on the author (no author access).

## Screenshots

![Curated design page who-we-are at mobile 375 × 812, published page /design-block-master/en/curated-design-pages/who-we-are](./screenshots/curated-design-pages-who-we-are-375.jpg)

*Figure: Curated design page who-we-are — mobile 375 × 812 (/design-block-master/en/curated-design-pages/who-we-are, captured 2026-11-08).*

![Curated design page who-we-are at tablet 768 × 900, published page /design-block-master/en/curated-design-pages/who-we-are](./screenshots/curated-design-pages-who-we-are-768.jpg)

*Figure: Curated design page who-we-are — tablet 768 × 900 (/design-block-master/en/curated-design-pages/who-we-are, captured 2026-11-08).*

![Curated design page who-we-are at small desktop 1024 × 900, published page /design-block-master/en/curated-design-pages/who-we-are](./screenshots/curated-design-pages-who-we-are-1024.jpg)

*Figure: Curated design page who-we-are — small desktop 1024 × 900 (/design-block-master/en/curated-design-pages/who-we-are, captured 2026-11-08).*

![Curated design page who-we-are at desktop 1440 × 900, published page /design-block-master/en/curated-design-pages/who-we-are](./screenshots/curated-design-pages-who-we-are-1440.jpg)

*Figure: Curated design page who-we-are — desktop 1440 × 900 (/design-block-master/en/curated-design-pages/who-we-are, captured 2026-11-08).*

## Known limitations

- Universal Editor and AEM author views were not captured (no author access).

## Open items

- The curated pages link to /language-master/en and to /content/tcs-corp/design-block-master/english/... (see the curated design page audit).

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
