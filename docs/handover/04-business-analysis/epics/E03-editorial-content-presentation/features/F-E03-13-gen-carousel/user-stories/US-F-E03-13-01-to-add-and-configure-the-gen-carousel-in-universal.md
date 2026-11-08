---
id: "US-F-E03-13-01"
title: "User story US-F-E03-13-01"
role: "Business analysis"
topic: "user story"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/gen-carousel"]
relatedComponents: ["gen-carousel"]
relatedPages: []
confidence: "Low"
primary: true
---

# User story US-F-E03-13-01

| Attribute | Value |
| --- | --- |
| Document ID | US-F-E03-13-01 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | As a content author, I want to add and configure the Gen Carousel in Universal Editor, so that pages can present this content without developer help |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/gen-carousel |
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
> I want to add and configure the Gen Carousel in Universal Editor,
> so that pages can present this content without developer help.

| Attribute | Value |
| --- | --- |
| Story ID | US-F-E03-13-01 |
| Parent feature | F-E03-13 Gen Carousel |
| Priority | To be confirmed |
| Preconditions | Code deployed to the environment; author access for authoring stories |
| Main flow | 1. Add the component from the palette 2. Fill in the fields of each tab 3. Preview and publish |
| Alternate flows | Keyboard-only and touch use |
| Exception flows | A dependency (sheet, index, media) fails: fallback text or empty state |
| Business rules | Block README: Content and Asset Guidelines |
| Analytics events | Component shown / clicked (data layer) |
| Accessibility acceptance criteria | Keyboard reachable, named controls, alt text, visible focus |
| Responsive acceptance criteria | No horizontal overflow at 375, 768, 1024, 1440 px |
| SEO acceptance criteria | Heading order kept |
| Localization acceptance criteria | UI text from placeholders |
| Security/privacy acceptance criteria | No personal data in the data layer |
| Dependencies | blocks/gen-carousel |
| Assumptions | Derived from the implementation |
| Out of scope | Back-end integrations not implemented (Tags, forms back end) |
| Related code | blocks/gen-carousel/ |
| Related block-library example | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/gen-carousel |
| Related curated page | /design-block-master/en/curated-design-pages/who-we-are |
| Related test cases | TC-GEN-CAROUSEL-002, TC-GEN-CAROUSEL-016, TC-GEN-CAROUSEL-017 |
| Definition of Ready / Done | See the BA package |

## Gherkin acceptance criteria

```gherkin
Feature: Gen Carousel

Scenario: An author adds the Gen Carousel and fills in its required fields
  Given an author in Universal Editor on a test page
  When preview
  Then the block appears with the authored content; no empty placeholder remains

Scenario: Gen Carousel with optional fields left empty
  Given a published page with the block
  When preview
  Then the block renders without empty wrappers or broken layout

Scenario: Gen Carousel with invalid content (very long text, missing image, broken link)
  Given a published page with the block
  When preview
  Then text wraps, no broken image icon, the link is flagged in the link check
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
