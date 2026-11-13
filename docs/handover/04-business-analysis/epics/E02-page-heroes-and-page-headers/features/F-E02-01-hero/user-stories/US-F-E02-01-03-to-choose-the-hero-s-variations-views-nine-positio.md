---
id: "US-F-E02-01-03"
title: "User story US-F-E02-01-03"
role: "Business analysis"
topic: "user story"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: ["blocks/hero"]
relatedComponents: ["hero"]
relatedPages: []
confidence: "Low"
primary: true
---

# User story US-F-E02-01-03

| Attribute | Value |
| --- | --- |
| Document ID | US-F-E02-01-03 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | As a content author, I want to choose the Hero's variations (Views, nine positions, BG Color, animation), so that the block matches the design of each page |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | blocks/hero |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Gherkin acceptance criteria](#gherkin-acceptance-criteria)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

**INFERRED REQUIREMENT, REQUIRES BUSINESS VALIDATION**

> As a content author,
> I want to choose the Hero's variations (Views, nine positions, BG Color, animation),
> so that the block matches the design of each page.

| Attribute | Value |
| --- | --- |
| Story ID | US-F-E02-01-03 |
| Parent feature | F-E02-01 Hero |
| Priority | To be confirmed |
| Preconditions | Code deployed to the environment; author access for authoring stories |
| Main flow | 1. Select the block 2. Change the variation options 3. Preview |
| Alternate flows | Keyboard-only and touch use |
| Exception flows | A dependency (sheet, index, media) fails: fallback text or empty state |
| Business rules | Block README: Content and Asset Guidelines |
| Analytics events | Component shown / clicked (data layer) |
| Accessibility acceptance criteria | Keyboard reachable, named controls, alt text, visible focus |
| Responsive acceptance criteria | No horizontal overflow at 375, 768, 1024, 1440 px |
| SEO acceptance criteria | Heading order kept |
| Localization acceptance criteria | UI text from placeholders |
| Security/privacy acceptance criteria | No personal data in the data layer |
| Dependencies | blocks/hero |
| Assumptions | Derived from the implementation |
| Out of scope | Back-end integrations not implemented (Tags, forms back end) |
| Related code | blocks/hero/ |
| Related block-library example | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/hero |
| Related curated page | /design-block-master/en/curated-design-pages/home, /design-block-master/en/curated-design-pages/insights, /design-block-master/en/curated-design-pages/media-and-investor |
| Related test cases | TC-HERO-003, TC-HERO-004, TC-HERO-005, TC-HERO-006, TC-HERO-007, TC-HERO-008, TC-HERO-009, TC-HERO-010, TC-HERO-011, TC-HERO-012, TC-HERO-013, TC-HERO-014, TC-HERO-015, TC-HERO-016, TC-HERO-017, TC-HERO-018, TC-HERO-019, TC-HERO-020, TC-HERO-021, TC-HERO-022, TC-HERO-023 |
| Definition of Ready / Done | See the BA package |

## Gherkin acceptance criteria

```gherkin
Feature: Hero

Scenario: Hero: each choice of "Hero Image type" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute lottie)

Scenario: Hero: each choice of "Hero View" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute media-contained)

Scenario: Hero: each choice of "Title heading level" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute h1, h2)

Scenario: Hero: each choice of "CTA List › CTA Text color" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute cta-text-black, cta-text-white)
```

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../../../../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
