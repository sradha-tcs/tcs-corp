---
id: "US-F-E02-02-02"
title: "User story US-F-E02-02-02"
role: "Business analysis"
topic: "user story"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/page-header"]
relatedComponents: ["page-header"]
relatedPages: []
confidence: "Low"
primary: true
---

# User story US-F-E02-02-02

| Attribute | Value |
| --- | --- |
| Document ID | US-F-E02-02-02 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | As a site visitor, I want to see and use the Page Header: The title area of a page from its metadata (title, description, tags, author, dates), so that I get the information or action it offers on any device |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/page-header |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Gherkin acceptance criteria](#gherkin-acceptance-criteria)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

**INFERRED REQUIREMENT, REQUIRES BUSINESS VALIDATION**

> As a site visitor,
> I want to see and use the Page Header: The title area of a page from its metadata (title, description, tags, author, dates),
> so that I get the information or action it offers on any device.

| Attribute | Value |
| --- | --- |
| Story ID | US-F-E02-02-02 |
| Parent feature | F-E02-02 Page Header |
| Priority | To be confirmed |
| Preconditions | Code deployed to the environment; author access for authoring stories |
| Main flow | 1. Open a page with the block 2. Use it with mouse, touch or keyboard |
| Alternate flows | Keyboard-only and touch use |
| Exception flows | A dependency (sheet, index, media) fails: fallback text or empty state |
| Business rules | Block README: Content and Asset Guidelines |
| Analytics events | Component shown / clicked (data layer) |
| Accessibility acceptance criteria | Keyboard reachable, named controls, alt text, visible focus |
| Responsive acceptance criteria | No horizontal overflow at 375, 768, 1024, 1440 px |
| SEO acceptance criteria | Heading order kept |
| Localization acceptance criteria | UI text from placeholders |
| Security/privacy acceptance criteria | No personal data in the data layer |
| Dependencies | blocks/page-header |
| Assumptions | Derived from the implementation |
| Out of scope | Back-end integrations not implemented (Tags, forms back end) |
| Related code | blocks/page-header/ |
| Related block-library example | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/page-header |
| Related curated page | /design-block-master/en/curated-design-pages/case-study, /design-block-master/en/curated-design-pages/collection, /design-block-master/en/curated-design-pages/story |
| Related test cases | TC-PAGE-HEADER-001, TC-PAGE-HEADER-012, TC-PAGE-HEADER-013, TC-PAGE-HEADER-014 |
| Definition of Ready / Done | See the BA package |

## Gherkin acceptance criteria

```gherkin
Feature: Page Header

Scenario: Page Header renders on its block library page
  Given a published page with the block
  When wait for the page to load
  Then the page answers 200, every example renders, no console error, no failed request

Scenario: Page Header meets WCAG 2.1 AA
  Given a published page with the block
  When run a screen reader on the block
  Then every control is reachable and named; no heading level is skipped; images have alt text or are decorative

Scenario: Page Header at 375, 768, 1024 and 1440 px
  Given a published page with the block
  When open the block library page at each width
  Then no horizontal overflow; layout follows the responsive rules of the readme

Scenario: Page Header when a dependency fails (sheet, index, media)
  Given a published page with the block
  When reload
  Then the block shows its english fallback or empty state and the page keeps working
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
