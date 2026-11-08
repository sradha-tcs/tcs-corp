---
id: "F-E05-01"
title: "Feature F-E05-01: List"
role: "Business analysis"
topic: "feature"
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

# Feature F-E05-01: List

| Attribute | Value |
| --- | --- |
| Document ID | F-E05-01 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | The feature List of EPIC E05, derived from the implementation |
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

- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

**INFERRED REQUIREMENT, REQUIRES BUSINESS VALIDATION**

| Attribute | Value |
| --- | --- |
| Feature ID | F-E05-01 |
| Parent EPIC | E05 Listings and discovery |
| Business value | Visitors discover related pages, press releases and contacts |
| Description | Child pages, a fixed list or tagged pages from the query index, as cards or links |
| Primary persona | Content author; site visitor |
| Preconditions | Code deployed; the component available in the section filters |
| Functional requirements | The fields and variations of list (developer guide) |
| Business rules | Block README: Content and Asset Guidelines |
| Non-functional requirements | WCAG 2.1 AA; three-phase loading; no personal data in the data layer |
| Data requirements | See the data layer section of the developer guide |
| Content requirements | Authored per the authoring guide |
| Analytics requirements | Component entry and interactions in the Adobe Client Data Layer |
| Accessibility requirements | See the accessibility section of the developer guide |
| SEO requirements | Semantic headings; metadata from the page |
| Localization requirements | UI text from placeholders with an English fallback |
| Security/privacy requirements | No personal data; announced new-tab links |
| Dependencies | ../../utils/card-list-config.js, ../../utils/dates.js, ../../utils/query-index.js, ../../decorators/card-list-decorator.js, ../../decorators/skeleton-decorator.js, ../../utils/cells.js, ../../utils/data.js, ../../utils/environment.js, ../../utils/placeholders.js, ../../utils/links.js, ../../utils/properties.js, ../../utils/redirects.js, ../../utils/site.js, ../../utils/tags.js, ../../utils/taxonomy.js, ./list-data.js |
| Acceptance criteria | See the user stories |
| Related user stories | US-F-E05-01-01, US-F-E05-01-02, US-F-E05-01-03 |
| Related components | list |
| Related test cases | TC-LIST-001, TC-LIST-002, TC-LIST-003, TC-LIST-004, TC-LIST-005, TC-LIST-006, TC-LIST-007, TC-LIST-008, TC-LIST-009, TC-LIST-010, TC-LIST-011, TC-LIST-012, TC-LIST-013, TC-LIST-014, TC-LIST-015, TC-LIST-016, TC-LIST-017, TC-LIST-018, TC-LIST-019, TC-LIST-020, TC-LIST-021, TC-LIST-022, TC-LIST-023, TC-LIST-024, TC-LIST-025, TC-LIST-026, TC-LIST-027, TC-LIST-028, TC-LIST-029, TC-LIST-030 |
| Definition of Ready | [DEFINITION-OF-READY](../../../../markdown/DEFINITION-OF-READY.md) |
| Definition of Done | [DEFINITION-OF-DONE](../../../../markdown/DEFINITION-OF-DONE.md) |

Developer guide: [list](../../../../../02-development/blocks/list/LIST-DEVELOPER-GUIDE.md).

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
