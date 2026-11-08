---
id: "US-F-E01-02-03"
title: "User story US-F-E01-02-03"
role: "Business analysis"
topic: "user story"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/tcs-header"]
relatedComponents: ["tcs-header"]
relatedPages: []
confidence: "Low"
primary: true
---

# User story US-F-E01-02-03

| Attribute | Value |
| --- | --- |
| Document ID | US-F-E01-02-03 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | As a content author, I want to choose the TCS Header's variations (—), so that the block matches the design of each page |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/tcs-header |
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
> I want to choose the TCS Header's variations (—),
> so that the block matches the design of each page.

| Attribute | Value |
| --- | --- |
| Story ID | US-F-E01-02-03 |
| Parent feature | F-E01-02 TCS Header |
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
| Dependencies | blocks/tcs-header |
| Assumptions | Derived from the implementation |
| Out of scope | Back-end integrations not implemented (Tags, forms back end) |
| Related code | blocks/tcs-header/ |
| Related block-library example | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/tcs-header |
| Related curated page | — |
| Related test cases | TC-TCS-HEADER-003 |
| Definition of Ready / Done | See the BA package |

## Gherkin acceptance criteria

```gherkin
Feature: TCS Header

Scenario: TCS Header: each choice of "Header over the first block" gives its presentation
  Given a published page with the block
  When preview after each change
  Then the rendering matches the variation (class or attribute always, never)
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
