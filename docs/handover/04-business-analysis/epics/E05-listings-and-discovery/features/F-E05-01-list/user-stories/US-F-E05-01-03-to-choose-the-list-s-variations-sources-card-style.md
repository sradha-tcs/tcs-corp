---
id: "US-F-E05-01-03"
title: "User story US-F-E05-01-03"
role: "Business analysis"
topic: "user story"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/list"]
relatedComponents: ["list"]
relatedPages: []
confidence: "Low"
primary: true
---

# User story US-F-E05-01-03

| Attribute | Value |
| --- | --- |
| Document ID | US-F-E05-01-03 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | As a content author, I want to choose the List's variations (Sources, card styles, layout per breakpoint, rows), so that the block matches the design of each page |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/list |
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
> I want to choose the List's variations (Sources, card styles, layout per breakpoint, rows),
> so that the block matches the design of each page.

| Attribute | Value |
| --- | --- |
| Story ID | US-F-E05-01-03 |
| Parent feature | F-E05-01 List |
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
| Dependencies | blocks/list |
| Assumptions | Derived from the implementation |
| Out of scope | Back-end integrations not implemented (Tags, forms back end) |
| Related code | blocks/list/ |
| Related block-library example | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/list |
| Related curated page | /design-block-master/en/curated-design-pages, /design-block-master/en/curated-design-pages/case-study, /design-block-master/en/curated-design-pages/collection |
| Related test cases | TC-LIST-003, TC-LIST-004, TC-LIST-005, TC-LIST-006, TC-LIST-007, TC-LIST-008, TC-LIST-009, TC-LIST-010, TC-LIST-011, TC-LIST-012, TC-LIST-013, TC-LIST-014, TC-LIST-015, TC-LIST-016, TC-LIST-017, TC-LIST-018, TC-LIST-019, TC-LIST-020, TC-LIST-021, TC-LIST-022, TC-LIST-023, TC-LIST-024, TC-LIST-025 |
| Definition of Ready / Done | See the BA package |

## Gherkin acceptance criteria

```gherkin
Feature: List

Scenario: List: each choice of "Heading type" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute h2, h3, h4, h5, h6)

Scenario: List: each choice of "CTA style" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute primary, secondary)

Scenario: List: each choice of "List source" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute parent, fixed, tags)

Scenario: List: each choice of "Match" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute any, all)
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
