---
id: "F-E01-03"
title: "Feature F-E01-03: Footer"
role: "Business analysis"
topic: "feature"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/footer"]
relatedComponents: ["footer"]
relatedPages: []
confidence: "Low"
primary: true
---

# Feature F-E01-03: Footer

| Attribute | Value |
| --- | --- |
| Document ID | F-E01-03 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | The feature Footer of EPIC E01, derived from the implementation |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/footer |
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
| Feature ID | F-E01-03 |
| Parent EPIC | E01 Site navigation and global chrome |
| Business value | Visitors find their way through the site on every device |
| Description | Site footer bar on the footer reference page (copyright, links, Conversation Canvas) |
| Primary persona | Content author; site visitor |
| Preconditions | Code deployed; the component available in the section filters |
| Functional requirements | The fields and variations of footer (developer guide) |
| Business rules | Block README: Content and Asset Guidelines |
| Non-functional requirements | WCAG 2.1 AA; three-phase loading; no personal data in the data layer |
| Data requirements | See the data layer section of the developer guide |
| Content requirements | Authored per the authoring guide |
| Analytics requirements | Component entry and interactions in the Adobe Client Data Layer |
| Accessibility requirements | See the accessibility section of the developer guide |
| SEO requirements | Semantic headings; metadata from the page |
| Localization requirements | UI text from placeholders with an English fallback |
| Security/privacy requirements | No personal data; announced new-tab links |
| Dependencies | ../fragment/fragment.js, ../../decorators/motion-decorator.js, ../../scripts/scripts.js, ../../decorators/button-decorator.js, ../../decorators/content-decorator.js, ../../decorators/editor-item-decorator.js, ../../decorators/link-decorator.js, ../../decorators/social-links-decorator.js, ../../utils/cells.js, ../../utils/data.js, ../../utils/inherited-metadata.js, ../../utils/links.js, ../../utils/placeholders.js, ../../utils/site.js |
| Acceptance criteria | See the user stories |
| Related user stories | US-F-E01-03-01, US-F-E01-03-02, US-F-E01-03-03 |
| Related components | footer |
| Related test cases | TC-FOOTER-001, TC-FOOTER-002, TC-FOOTER-003, TC-FOOTER-004, TC-FOOTER-005, TC-FOOTER-006, TC-FOOTER-007, TC-FOOTER-008, TC-FOOTER-009 |
| Definition of Ready | [DEFINITION-OF-READY](../../../../markdown/DEFINITION-OF-READY.md) |
| Definition of Done | [DEFINITION-OF-DONE](../../../../markdown/DEFINITION-OF-DONE.md) |

Developer guide: [footer](../../../../../02-development/blocks/footer/FOOTER-DEVELOPER-GUIDE.md).

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
