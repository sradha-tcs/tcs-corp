---
id: "F-E01-05"
title: "Feature F-E01-05: Modal"
role: "Business analysis"
topic: "feature"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/modal"]
relatedComponents: ["modal"]
relatedPages: []
confidence: "Low"
primary: true
---

# Feature F-E01-05: Modal

| Attribute | Value |
| --- | --- |
| Document ID | F-E01-05 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | The feature Modal of EPIC E01, derived from the implementation |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/modal |
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
| Feature ID | F-E01-05 |
| Parent EPIC | E01 Site navigation and global chrome |
| Business value | Visitors find their way through the site on every device |
| Description | Opens a page's content in a dialog (button or auto-linked /modal/ links) |
| Primary persona | Content author; site visitor |
| Preconditions | Code deployed; the component available in the section filters |
| Functional requirements | The fields and variations of modal (developer guide) |
| Business rules | Block README: Content and Asset Guidelines |
| Non-functional requirements | WCAG 2.1 AA; three-phase loading; no personal data in the data layer |
| Data requirements | See the data layer section of the developer guide |
| Content requirements | Authored per the authoring guide |
| Analytics requirements | Component entry and interactions in the Adobe Client Data Layer |
| Accessibility requirements | See the accessibility section of the developer guide |
| SEO requirements | Semantic headings; metadata from the page |
| Localization requirements | UI text from placeholders with an English fallback |
| Security/privacy requirements | No personal data; announced new-tab links |
| Dependencies | ../fragment/fragment.js, ../../scripts/aem.js, ../../scripts/scripts.js, ../../decorators/button-decorator.js, ../../decorators/icon-button-decorator.js, ../../decorators/data-layer-decorator.js, ../../utils/analytics.js, ../../utils/environment.js, ../../utils/ids.js, ../../utils/placeholders.js |
| Acceptance criteria | See the user stories |
| Related user stories | US-F-E01-05-01, US-F-E01-05-02 |
| Related components | modal |
| Related test cases | TC-MODAL-001, TC-MODAL-002, TC-MODAL-003, TC-MODAL-004, TC-MODAL-005, TC-MODAL-006, TC-MODAL-007 |
| Definition of Ready | [DEFINITION-OF-READY](../../../../markdown/DEFINITION-OF-READY.md) |
| Definition of Done | [DEFINITION-OF-DONE](../../../../markdown/DEFINITION-OF-DONE.md) |

Developer guide: [modal](../../../../../02-development/blocks/modal/MODAL-DEVELOPER-GUIDE.md).

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
