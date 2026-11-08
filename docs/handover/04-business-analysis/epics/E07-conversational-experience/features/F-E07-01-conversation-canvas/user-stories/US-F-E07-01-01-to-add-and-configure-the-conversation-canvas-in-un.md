---
id: "US-F-E07-01-01"
title: "User story US-F-E07-01-01"
role: "Business analysis"
topic: "user story"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/conversation-canvas"]
relatedComponents: ["conversation-canvas"]
relatedPages: []
confidence: "Low"
primary: true
---

# User story US-F-E07-01-01

| Attribute | Value |
| --- | --- |
| Document ID | US-F-E07-01-01 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | As a content author, I want to add and configure the Conversation Canvas in Universal Editor, so that pages can present this content without developer help |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/conversation-canvas |
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
> I want to add and configure the Conversation Canvas in Universal Editor,
> so that pages can present this content without developer help.

| Attribute | Value |
| --- | --- |
| Story ID | US-F-E07-01-01 |
| Parent feature | F-E07-01 Conversation Canvas |
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
| Dependencies | blocks/conversation-canvas |
| Assumptions | Derived from the implementation |
| Out of scope | Back-end integrations not implemented (Tags, forms back end) |
| Related code | blocks/conversation-canvas/ |
| Related block-library example | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/conversation-canvas |
| Related curated page | /design-block-master/en/curated-design-pages/home, /design-block-master/en/curated-design-pages/what-we-do |
| Related test cases | TC-CONVERSATION-CANVAS-002, TC-CONVERSATION-CANVAS-013, TC-CONVERSATION-CANVAS-014 |
| Definition of Ready / Done | See the BA package |

## Gherkin acceptance criteria

```gherkin
Feature: Conversation Canvas

Scenario: An author adds the Conversation Canvas and fills in its required fields
  Given an author in Universal Editor on a test page
  When preview
  Then the block appears with the authored content; no empty placeholder remains

Scenario: Conversation Canvas with optional fields left empty
  Given a published page with the block
  When preview
  Then the block renders without empty wrappers or broken layout

Scenario: Conversation Canvas with invalid content (very long text, missing image, broken link)
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
