---
id: "F-E05-02"
title: "Feature F-E05-02: Filter List"
role: "Business analysis"
topic: "feature"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/filter-list"]
relatedComponents: ["filter-list"]
relatedPages: []
confidence: "Low"
primary: true
---

# Feature F-E05-02: Filter List

| Attribute | Value |
| --- | --- |
| Document ID | F-E05-02 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | The feature Filter List of EPIC E05, derived from the implementation |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/filter-list |
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
| Feature ID | F-E05-02 |
| Parent EPIC | E05 Listings and discovery |
| Business value | Visitors discover related pages, press releases and contacts |
| Description | Filterable listing of the locale's pages from the query index |
| Primary persona | Content author; site visitor |
| Preconditions | Code deployed; the component available in the section filters |
| Functional requirements | The fields and variations of filter-list (developer guide) |
| Business rules | Block README: Content and Asset Guidelines |
| Non-functional requirements | WCAG 2.1 AA; three-phase loading; no personal data in the data layer |
| Data requirements | See the data layer section of the developer guide |
| Content requirements | Authored per the authoring guide |
| Analytics requirements | Component entry and interactions in the Adobe Client Data Layer |
| Accessibility requirements | See the accessibility section of the developer guide |
| SEO requirements | Semantic headings; metadata from the page |
| Localization requirements | UI text from placeholders with an English fallback |
| Security/privacy requirements | No personal data; announced new-tab links |
| Dependencies | ../../decorators/article-meta-decorator.js, ../../decorators/button-decorator.js, ../../decorators/date-decorator.js, ../../decorators/editor-item-decorator.js, ../../decorators/icon-button-decorator.js, ../../decorators/masonry-decorator.js, ../../decorators/skeleton-decorator.js, ../../decorators/responsive-image-decorator.js, ../../scripts/aem.js, ../../utils/cells.js, ../../utils/data.js, ../../utils/environment.js, ../../utils/ids.js, ../../utils/multifield.js, ../../utils/placeholders.js, ../../utils/properties.js, ../../utils/query-index.js, ../../utils/site.js, ../../utils/card-list-config.js, ../../utils/tags.js, ../../utils/taxonomy.js, ../../utils/viewport.js |
| Acceptance criteria | See the user stories |
| Related user stories | US-F-E05-02-01, US-F-E05-02-02, US-F-E05-02-03 |
| Related components | filter-list |
| Related test cases | TC-FILTER-LIST-001, TC-FILTER-LIST-002, TC-FILTER-LIST-003, TC-FILTER-LIST-004, TC-FILTER-LIST-005, TC-FILTER-LIST-006, TC-FILTER-LIST-007, TC-FILTER-LIST-008, TC-FILTER-LIST-009, TC-FILTER-LIST-010, TC-FILTER-LIST-011, TC-FILTER-LIST-012, TC-FILTER-LIST-013, TC-FILTER-LIST-014, TC-FILTER-LIST-015, TC-FILTER-LIST-016, TC-FILTER-LIST-017 |
| Definition of Ready | [DEFINITION-OF-READY](../../../../markdown/DEFINITION-OF-READY.md) |
| Definition of Done | [DEFINITION-OF-DONE](../../../../markdown/DEFINITION-OF-DONE.md) |

Developer guide: [filter-list](../../../../../02-development/blocks/filter-list/FILTER-LIST-DEVELOPER-GUIDE.md).

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
