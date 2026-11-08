---
id: "F-E05-04"
title: "Feature F-E05-04: Media Contacts"
role: "Business analysis"
topic: "feature"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/media-contacts"]
relatedComponents: ["media-contacts"]
relatedPages: []
confidence: "Low"
primary: true
---

# Feature F-E05-04: Media Contacts

| Attribute | Value |
| --- | --- |
| Document ID | F-E05-04 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | The feature Media Contacts of EPIC E05, derived from the implementation |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/media-contacts |
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
| Feature ID | F-E05-04 |
| Parent EPIC | E05 Listings and discovery |
| Business value | Visitors discover related pages, press releases and contacts |
| Description | The media contacts of the locale's Media Contacts sheet, grouped by designation and region |
| Primary persona | Content author; site visitor |
| Preconditions | Code deployed; the component available in the section filters |
| Functional requirements | The fields and variations of media-contacts (developer guide) |
| Business rules | Block README: Content and Asset Guidelines |
| Non-functional requirements | WCAG 2.1 AA; three-phase loading; no personal data in the data layer |
| Data requirements | See the data layer section of the developer guide |
| Content requirements | Authored per the authoring guide |
| Analytics requirements | Component entry and interactions in the Adobe Client Data Layer |
| Accessibility requirements | See the accessibility section of the developer guide |
| SEO requirements | Semantic headings; metadata from the page |
| Localization requirements | UI text from placeholders with an English fallback |
| Security/privacy requirements | No personal data; announced new-tab links |
| Dependencies | ../../decorators/contact-list-decorator.js, ../../decorators/heading-decorator.js, ../../decorators/skeleton-decorator.js, ../../utils/data.js, ../../utils/environment.js, ../../utils/metadata.js, ../../utils/placeholders.js, ../../utils/properties.js, ./media-contacts-data.js |
| Acceptance criteria | See the user stories |
| Related user stories | US-F-E05-04-01, US-F-E05-04-02, US-F-E05-04-03 |
| Related components | media-contacts |
| Related test cases | TC-MEDIA-CONTACTS-001, TC-MEDIA-CONTACTS-002, TC-MEDIA-CONTACTS-003, TC-MEDIA-CONTACTS-004, TC-MEDIA-CONTACTS-005, TC-MEDIA-CONTACTS-006, TC-MEDIA-CONTACTS-007, TC-MEDIA-CONTACTS-008 |
| Definition of Ready | [DEFINITION-OF-READY](../../../../markdown/DEFINITION-OF-READY.md) |
| Definition of Done | [DEFINITION-OF-DONE](../../../../markdown/DEFINITION-OF-DONE.md) |

Developer guide: [media-contacts](../../../../../02-development/blocks/media-contacts/MEDIA-CONTACTS-DEVELOPER-GUIDE.md).

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
