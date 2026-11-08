---
id: "F-E03-02"
title: "Feature F-E03-02: Cards"
role: "Business analysis"
topic: "feature"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/cards"]
relatedComponents: ["cards"]
relatedPages: []
confidence: "Low"
primary: true
---

# Feature F-E03-02: Cards

| Attribute | Value |
| --- | --- |
| Document ID | F-E03-02 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | The feature Cards of EPIC E03, derived from the implementation |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/cards |
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
| Feature ID | F-E03-02 |
| Parent EPIC | E03 Editorial content presentation |
| Business value | Authors present stories, offerings and facts in the TCS design language |
| Description | Manually authored cards with the List's presentation (grid or horizontal scroll) |
| Primary persona | Content author; site visitor |
| Preconditions | Code deployed; the component available in the section filters |
| Functional requirements | The fields and variations of cards (developer guide) |
| Business rules | Block README: Content and Asset Guidelines |
| Non-functional requirements | WCAG 2.1 AA; three-phase loading; no personal data in the data layer |
| Data requirements | See the data layer section of the developer guide |
| Content requirements | Authored per the authoring guide |
| Analytics requirements | Component entry and interactions in the Adobe Client Data Layer |
| Accessibility requirements | See the accessibility section of the developer guide |
| SEO requirements | Semantic headings; metadata from the page |
| Localization requirements | UI text from placeholders with an English fallback |
| Security/privacy requirements | No personal data; announced new-tab links |
| Dependencies | ../../utils/card-list-config.js, ../../utils/dates.js, ../../decorators/card-list-decorator.js, ../../utils/cells.js, ../../utils/environment.js, ../../utils/placeholders.js, ../../utils/properties.js, ../../utils/tags.js, ../../utils/taxonomy.js, ./cards-data.js |
| Acceptance criteria | See the user stories |
| Related user stories | US-F-E03-02-01, US-F-E03-02-02, US-F-E03-02-03 |
| Related components | cards |
| Related test cases | TC-CARDS-001, TC-CARDS-002, TC-CARDS-003, TC-CARDS-004, TC-CARDS-005, TC-CARDS-006, TC-CARDS-007, TC-CARDS-008, TC-CARDS-009, TC-CARDS-010, TC-CARDS-011, TC-CARDS-012, TC-CARDS-013, TC-CARDS-014, TC-CARDS-015, TC-CARDS-016, TC-CARDS-017, TC-CARDS-018, TC-CARDS-019, TC-CARDS-020, TC-CARDS-021, TC-CARDS-022, TC-CARDS-023, TC-CARDS-024, TC-CARDS-025, TC-CARDS-026 |
| Definition of Ready | [DEFINITION-OF-READY](../../../../markdown/DEFINITION-OF-READY.md) |
| Definition of Done | [DEFINITION-OF-DONE](../../../../markdown/DEFINITION-OF-DONE.md) |

Developer guide: [cards](../../../../../02-development/blocks/cards/CARDS-DEVELOPER-GUIDE.md).

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
