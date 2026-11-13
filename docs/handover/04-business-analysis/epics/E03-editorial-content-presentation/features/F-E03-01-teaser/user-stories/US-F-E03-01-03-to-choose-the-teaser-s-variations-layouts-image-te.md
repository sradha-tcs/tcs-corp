---
id: "US-F-E03-01-03"
title: "User story US-F-E03-01-03"
role: "Business analysis"
topic: "user story"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: ["blocks/teaser"]
relatedComponents: ["teaser"]
relatedPages: []
confidence: "Low"
primary: true
---

# User story US-F-E03-01-03

| Attribute | Value |
| --- | --- |
| Document ID | US-F-E03-01-03 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | As a content author, I want to choose the Teaser's variations (Layouts (Image & Text, Text split, Background image, Card), image positions, BG Color, styles), so that the block matches the design of each page |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | blocks/teaser |
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
> I want to choose the Teaser's variations (Layouts (Image & Text, Text split, Background image, Card), image positions, BG Color, styles),
> so that the block matches the design of each page.

| Attribute | Value |
| --- | --- |
| Story ID | US-F-E03-01-03 |
| Parent feature | F-E03-01 Teaser |
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
| Dependencies | blocks/teaser |
| Assumptions | Derived from the implementation |
| Out of scope | Back-end integrations not implemented (Tags, forms back end) |
| Related code | blocks/teaser/ |
| Related block-library example | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/teaser |
| Related curated page | /design-block-master/en/curated-design-pages/case-study, /design-block-master/en/curated-design-pages/collection, /design-block-master/en/curated-design-pages/home |
| Related test cases | TC-TEASER-003, TC-TEASER-004, TC-TEASER-005, TC-TEASER-006, TC-TEASER-007, TC-TEASER-008, TC-TEASER-009, TC-TEASER-010, TC-TEASER-011, TC-TEASER-012, TC-TEASER-013, TC-TEASER-014, TC-TEASER-015, TC-TEASER-016, TC-TEASER-017, TC-TEASER-018, TC-TEASER-019, TC-TEASER-020, TC-TEASER-021, TC-TEASER-022, TC-TEASER-023, TC-TEASER-024, TC-TEASER-025, TC-TEASER-026, TC-TEASER-027, TC-TEASER-028, TC-TEASER-029, TC-TEASER-030, TC-TEASER-031, TC-TEASER-032, TC-TEASER-033, TC-TEASER-034, TC-TEASER-035, TC-TEASER-036, TC-TEASER-037 |
| Definition of Ready / Done | See the BA package |

## Gherkin acceptance criteria

```gherkin
Feature: Teaser

Scenario: Teaser: each choice of "Title Type" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute h1, h2, h3, h4, h5, h6)

Scenario: Teaser: each choice of "Date Format" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute dd-mm-yyyy, mm-dd-yyyy, mmm-d-yyyy, dd/mm/yy)

Scenario: Teaser: each choice of "Image type" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute lottie)

Scenario: Teaser: each choice of "Image position" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute left, right, top, bottom)
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
