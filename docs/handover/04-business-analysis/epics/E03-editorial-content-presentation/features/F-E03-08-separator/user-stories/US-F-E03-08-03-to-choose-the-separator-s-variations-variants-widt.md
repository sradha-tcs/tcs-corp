---
id: "US-F-E03-08-03"
title: "User story US-F-E03-08-03"
role: "Business analysis"
topic: "user story"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/separator"]
relatedComponents: ["separator"]
relatedPages: []
confidence: "Low"
primary: true
---

# User story US-F-E03-08-03

| Attribute | Value |
| --- | --- |
| Document ID | US-F-E03-08-03 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | As a content author, I want to choose the Separator's variations (Variants, widths per breakpoint, theme, motion), so that the block matches the design of each page |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/separator |
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
> I want to choose the Separator's variations (Variants, widths per breakpoint, theme, motion),
> so that the block matches the design of each page.

| Attribute | Value |
| --- | --- |
| Story ID | US-F-E03-08-03 |
| Parent feature | F-E03-08 Separator |
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
| Dependencies | blocks/separator |
| Assumptions | Derived from the implementation |
| Out of scope | Back-end integrations not implemented (Tags, forms back end) |
| Related code | blocks/separator/ |
| Related block-library example | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/separator |
| Related curated page | — |
| Related test cases | TC-SEPARATOR-003, TC-SEPARATOR-004, TC-SEPARATOR-005, TC-SEPARATOR-006, TC-SEPARATOR-007, TC-SEPARATOR-008, TC-SEPARATOR-009, TC-SEPARATOR-010, TC-SEPARATOR-011, TC-SEPARATOR-012, TC-SEPARATOR-013, TC-SEPARATOR-014, TC-SEPARATOR-015, TC-SEPARATOR-016, TC-SEPARATOR-017, TC-SEPARATOR-018, TC-SEPARATOR-019, TC-SEPARATOR-020, TC-SEPARATOR-021, TC-SEPARATOR-022, TC-SEPARATOR-023, TC-SEPARATOR-024, TC-SEPARATOR-025, TC-SEPARATOR-026, TC-SEPARATOR-027, TC-SEPARATOR-028, TC-SEPARATOR-029, TC-SEPARATOR-030, TC-SEPARATOR-031, TC-SEPARATOR-032, TC-SEPARATOR-033, TC-SEPARATOR-034 |
| Definition of Ready / Done | See the BA package |

## Gherkin acceptance criteria

```gherkin
Feature: Separator

Scenario: Separator: each choice of "Accessibility mode" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute decorative, semantic)

Scenario: Separator: each choice of "Separator variant" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute default, subtle, strong, inset, full-width, dotted, ...)

Scenario: Separator: each choice of "Theme" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute auto, light, dark, brand)

Scenario: Separator: each choice of "Line style" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute solid, dashed, dotted, gradient, none)
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
