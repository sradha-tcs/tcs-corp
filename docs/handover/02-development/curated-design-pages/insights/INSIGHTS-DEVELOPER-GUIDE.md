---
id: "DEV-C-insights"
title: "Curated Design Page \"insights\" — Developer Guide"
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
relatedComponents: ["hero","teaser","filter-list","testimonial"]
relatedPages: ["/design-block-master/en/curated-design-pages/insights"]
confidence: "Medium"
primary: true
---

# Curated Design Page "insights" — Developer Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-C-insights |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | The composition, behaviour and checks of the curated design page insights |
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
| Related AEM paths | /content/tcs-corp/design-block-master/en/curated-design-pages/insights |

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
| Author path | /content/tcs-corp/design-block-master/en/curated-design-pages/insights |
| Preview | https://main--tcs-corp--sradha-tcs.aem.page/design-block-master/en/curated-design-pages/insights |
| Live | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/curated-design-pages/insights |
| Title | Insights |
| Business purpose | Design reference of the Figma page of the same name (INFERRED, REQUIRES BUSINESS VALIDATION) |
| Unique or reusable | Unique composition |

## Blocks in order

| # | Block | Classes (variations) | Developer guide |
| --- | --- | --- | --- |
| 1 | hero | `hero align-middle align-center text-center bg-charcoal-40 hero-has-media` | [guide](../../blocks/hero/HERO-DEVELOPER-GUIDE.md) |
| 2 | teaser | `teaser pt-3000 pb-3000 text-left title-regular text-large` | [guide](../../blocks/teaser/TEASER-DEVELOPER-GUIDE.md) |
| 3 | filter-list | `filter-list card-mixed layout-masonry` | [guide](../../blocks/filter-list/FILTER-LIST-DEVELOPER-GUIDE.md) |
| 4 | testimonial | `testimonial` | [guide](../../blocks/testimonial/TESTIMONIAL-DEVELOPER-GUIDE.md) |

## Automated checks (executed 2026-11-08)

| Check | Result |
| --- | --- |
| HTTP status 375 / 768 / 1024 / 1440 | 200 / 200 / 200 / 200 |
| Horizontal overflow 375 / 768 / 1024 / 1440 | no / no / no / no |
| Console errors | 375: Failed to load resource: the server responded with a status of 404 (); 768: Failed to load resource: the server responded with a status of 404 (); 1024: Failed to load resource: the server responded with a status of 404 (); 1440: Failed to load resource: the server responded with a status of 404 () |
| Failed requests | 375: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html; 768: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html; 1024: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html; 1440: 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html |
| H1 count | 1 |
| Heading level skips | 1 |
| Images without alt | 0 |
| Unnamed buttons | 0 |
| Links without a name | 0 |
| Data layer entries / events | 3 / — |
| Empty lists ("There are no items to show") | 0 |
| html lang | en-US |

## Authoring and development

Build the page from the blocks above in this order; each block's developer and authoring guides describe its fields and options. Metadata, taxonomy and assets of the page were not inspected on the author (no author access).

## Screenshots

![Curated design page insights at mobile 375 × 812, published page /design-block-master/en/curated-design-pages/insights](./screenshots/curated-design-pages-insights-375.jpg)

*Figure: Curated design page insights — mobile 375 × 812 (/design-block-master/en/curated-design-pages/insights, captured 2026-11-08).*

![Curated design page insights at tablet 768 × 900, published page /design-block-master/en/curated-design-pages/insights](./screenshots/curated-design-pages-insights-768.jpg)

*Figure: Curated design page insights — tablet 768 × 900 (/design-block-master/en/curated-design-pages/insights, captured 2026-11-08).*

![Curated design page insights at small desktop 1024 × 900, published page /design-block-master/en/curated-design-pages/insights](./screenshots/curated-design-pages-insights-1024.jpg)

*Figure: Curated design page insights — small desktop 1024 × 900 (/design-block-master/en/curated-design-pages/insights, captured 2026-11-08).*

![Curated design page insights at desktop 1440 × 900, published page /design-block-master/en/curated-design-pages/insights](./screenshots/curated-design-pages-insights-1440.jpg)

*Figure: Curated design page insights — desktop 1440 × 900 (/design-block-master/en/curated-design-pages/insights, captured 2026-11-08).*

## Known limitations

- Universal Editor and AEM author views were not captured (no author access).

## Open items

- The curated pages link to /language-master/en and to /content/tcs-corp/design-block-master/english/... (see the curated design page audit).

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
