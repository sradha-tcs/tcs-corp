---
id: "DEV-C-home"
title: "Curated Design Page \"home\" — Developer Guide"
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
relatedComponents: ["hero","list","conversation-canvas","table-list","teaser"]
relatedPages: ["/design-block-master/en/curated-design-pages/home"]
confidence: "Medium"
primary: true
---

# Curated Design Page "home" — Developer Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-C-home |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | The composition, behaviour and checks of the curated design page home |
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
| Related AEM paths | /content/tcs-corp/design-block-master/en/curated-design-pages/home |

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
| Author path | /content/tcs-corp/design-block-master/en/curated-design-pages/home |
| Preview | https://main--tcs-corp--sradha-tcs.aem.page/design-block-master/en/curated-design-pages/home |
| Live | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/curated-design-pages/home |
| Title | Home |
| Business purpose | Design reference of the Figma page of the same name (INFERRED, REQUIRES BUSINESS VALIDATION) |
| Unique or reusable | Unique composition |

## Blocks in order

| # | Block | Classes (variations) | Developer guide |
| --- | --- | --- | --- |
| 1 | hero | `hero align-middle align-center text-center bg-charcoal-80 icon-pale-blue eyebrow-sky-blue hero-has-media` | [guide](../../blocks/hero/HERO-DEVELOPER-GUIDE.md) |
| 2 | list | `list pt-3000 pb-3000 card-list desktop-grid tablet-grid mobile-scroll mobile-indicator snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-panel ratio-16-9 panel-auto source-fixed` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 3 | list | `list pt-3000 pb-3000 card-list desktop-grid tablet-grid mobile-grid snap hide-scrollbar edge-bleed stretch feature-first snap-start display-teaser style-image ratio-16-9 panel-portrait source-fixed` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 4 | conversation-canvas | `conversation-canvas hideblock conversation-canvas-bg-default conversation-canvas-title-bigger` | [guide](../../blocks/conversation-canvas/CONVERSATION-CANVAS-DEVELOPER-GUIDE.md) |
| 5 | table-list | `table-list hideblock industries numbers-hide background-white` | [guide](../../blocks/table-list/TABLE-LIST-DEVELOPER-GUIDE.md) |
| 6 | list | `list hideblock card-list desktop-scroll tablet-scroll mobile-scroll mobile-indicator snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-mixed ratio-16-9 panel-portrait source-tags` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 7 | list | `list card-list desktop-grid tablet-grid mobile-scroll mobile-indicator snap hide-scrollbar edge-bleed stretch snap-start display-teaser style-image ratio-1-1 panel-portrait source-parent` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 8 | list | `list dividers pt-3000 pb-3000 card-list desktop-grid tablet-grid mobile-grid snap hide-scrollbar edge-bleed stretch snap-start links style-image ratio-16-9 panel-portrait source-parent` | [guide](../../blocks/list/LIST-DEVELOPER-GUIDE.md) |
| 9 | teaser | `teaser pl-1000 pr-1000 pt-1600 pb-1600 background text-center valign-middle` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |

## Automated checks (executed 2026-11-08)

| Check | Result |
| --- | --- |
| HTTP status 375 / 768 / 1024 / 1440 | 200 / 200 / 200 / 200 |
| Horizontal overflow 375 / 768 / 1024 / 1440 | no / no / no / no |
| Console errors | none |
| Failed requests | none |
| H1 count | 1 |
| Heading level skips | 0 |
| Images without alt | 0 |
| Unnamed buttons | 0 |
| Links without a name | 0 |
| Data layer entries / events | 5 / — |
| Empty lists ("There are no items to show") | 3 |
| html lang | en-US |

## Authoring and development

Build the page from the blocks above in this order; each block's developer and authoring guides describe its fields and options. Metadata, taxonomy and assets of the page were not inspected on the author (no author access).

## Screenshots

![Curated design page home at mobile 375 × 812, published page /design-block-master/en/curated-design-pages/home](./screenshots/curated-design-pages-home-375.jpg)

*Figure: Curated design page home — mobile 375 × 812 (/design-block-master/en/curated-design-pages/home, captured 2026-11-08).*

![Curated design page home at tablet 768 × 900, published page /design-block-master/en/curated-design-pages/home](./screenshots/curated-design-pages-home-768.jpg)

*Figure: Curated design page home — tablet 768 × 900 (/design-block-master/en/curated-design-pages/home, captured 2026-11-08).*

![Curated design page home at small desktop 1024 × 900, published page /design-block-master/en/curated-design-pages/home](./screenshots/curated-design-pages-home-1024.jpg)

*Figure: Curated design page home — small desktop 1024 × 900 (/design-block-master/en/curated-design-pages/home, captured 2026-11-08).*

![Curated design page home at desktop 1440 × 900, published page /design-block-master/en/curated-design-pages/home](./screenshots/curated-design-pages-home-1440.jpg)

*Figure: Curated design page home — desktop 1440 × 900 (/design-block-master/en/curated-design-pages/home, captured 2026-11-08).*

## Known limitations

- Universal Editor and AEM author views were not captured (no author access).

## Open items

- The curated pages link to /language-master/en and to /content/tcs-corp/design-block-master/english/... (see the curated design page audit).

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
