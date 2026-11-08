---
id: "US-F-E03-11-03"
title: "User story US-F-E03-11-03"
role: "Business analysis"
topic: "user story"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/tabs"]
relatedComponents: ["tabs"]
relatedPages: []
confidence: "Low"
primary: true
---

# User story US-F-E03-11-03

| Attribute | Value |
| --- | --- |
| Document ID | US-F-E03-11-03 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | As a content author, I want to choose the Tabs's variations (Styles, alignment, orientation), so that the block matches the design of each page |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/tabs |
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
> I want to choose the Tabs's variations (Styles, alignment, orientation),
> so that the block matches the design of each page.

| Attribute | Value |
| --- | --- |
| Story ID | US-F-E03-11-03 |
| Parent feature | F-E03-11 Tabs |
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
| Dependencies | blocks/tabs |
| Assumptions | Derived from the implementation |
| Out of scope | Back-end integrations not implemented (Tags, forms back end) |
| Related code | blocks/tabs/ |
| Related block-library example | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/tabs |
| Related curated page | /design-block-master/en/curated-design-pages/story |
| Related test cases | TC-TABS-003, TC-TABS-004, TC-TABS-005, TC-TABS-006, TC-TABS-007, TC-TABS-008, TC-TABS-009, TC-TABS-010, TC-TABS-011, TC-TABS-012, TC-TABS-013, TC-TABS-014, TC-TABS-015, TC-TABS-016, TC-TABS-017, TC-TABS-018, TC-TABS-019, TC-TABS-020, TC-TABS-021 |
| Definition of Ready / Done | See the BA package |

## Gherkin acceptance criteria

```gherkin
Feature: Tabs

Scenario: Tabs Container: each choice of "Component" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute tabs-section)

Scenario: Tabs Container: each choice of "Width Type" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute full-width, fixed-width)

Scenario: Tabs Container: each choice of "Style" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute underline, boxed, pills)

Scenario: Tabs Container: each choice of "Alignment" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute left, center, stretch)
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
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
