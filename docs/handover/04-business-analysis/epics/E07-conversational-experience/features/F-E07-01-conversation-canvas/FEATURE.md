---
id: "F-E07-01"
title: "Feature F-E07-01: Conversation Canvas"
role: "Business analysis"
topic: "feature"
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

# Feature F-E07-01: Conversation Canvas

| Attribute | Value |
| --- | --- |
| Document ID | F-E07-01 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | The feature Conversation Canvas of EPIC E07, derived from the implementation |
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

- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

**INFERRED REQUIREMENT, REQUIRES BUSINESS VALIDATION**

| Attribute | Value |
| --- | --- |
| Feature ID | F-E07-01 |
| Parent EPIC | E07 Conversational experience |
| Business value | Visitors ask questions in the Conversation Canvas |
| Description | Search prompt with quick actions; one floating journey across header, page and footer |
| Primary persona | Content author; site visitor |
| Preconditions | Code deployed; the component available in the section filters |
| Functional requirements | The fields and variations of conversation-canvas (developer guide) |
| Business rules | Block README: Content and Asset Guidelines |
| Non-functional requirements | WCAG 2.1 AA; three-phase loading; no personal data in the data layer |
| Data requirements | See the data layer section of the developer guide |
| Content requirements | Authored per the authoring guide |
| Analytics requirements | Component entry and interactions in the Adobe Client Data Layer |
| Accessibility requirements | See the accessibility section of the developer guide |
| SEO requirements | Semantic headings; metadata from the page |
| Localization requirements | UI text from placeholders with an English fallback |
| Security/privacy requirements | No personal data; announced new-tab links |
| Dependencies | ./canvas-journey.js, ../../scripts/aem.js, ../../scripts/scripts.js, ../../decorators/responsive-image-decorator.js, ../../utils/metadata.js, ../../utils/query-index.js, ../../utils/site.js, ../../utils/taxonomy.js, ../../decorators/a11y-decorator.js, ../../decorators/button-decorator.js, ../../decorators/icon-button-decorator.js, ../../utils/buttons.js, ../../utils/properties.js, ../../utils/urls.js, ../../utils/ids.js, ../../utils/placeholders.js, ./canvas-controller.js, ../../decorators/skeleton-decorator.js, ../../decorators/editor-item-decorator.js |
| Acceptance criteria | See the user stories |
| Related user stories | US-F-E07-01-01, US-F-E07-01-02, US-F-E07-01-03 |
| Related components | conversation-canvas |
| Related test cases | TC-CONVERSATION-CANVAS-001, TC-CONVERSATION-CANVAS-002, TC-CONVERSATION-CANVAS-003, TC-CONVERSATION-CANVAS-004, TC-CONVERSATION-CANVAS-005, TC-CONVERSATION-CANVAS-006, TC-CONVERSATION-CANVAS-007, TC-CONVERSATION-CANVAS-008, TC-CONVERSATION-CANVAS-009, TC-CONVERSATION-CANVAS-010, TC-CONVERSATION-CANVAS-011, TC-CONVERSATION-CANVAS-012, TC-CONVERSATION-CANVAS-013, TC-CONVERSATION-CANVAS-014, TC-CONVERSATION-CANVAS-015, TC-CONVERSATION-CANVAS-016, TC-CONVERSATION-CANVAS-017 |
| Definition of Ready | [DEFINITION-OF-READY](../../../../markdown/DEFINITION-OF-READY.md) |
| Definition of Done | [DEFINITION-OF-DONE](../../../../markdown/DEFINITION-OF-DONE.md) |

Developer guide: [conversation-canvas](../../../../../02-development/blocks/conversation-canvas/CONVERSATION-CANVAS-DEVELOPER-GUIDE.md).

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../../../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
