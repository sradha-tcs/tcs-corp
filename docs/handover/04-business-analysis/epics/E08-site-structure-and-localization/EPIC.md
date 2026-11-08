---
id: "E08"
title: "EPIC E08: Site structure and localization"
role: "Business analysis"
topic: "epic"
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["utils/site.js LOCALES, paths.json","utils/site.js REVIEW_ROOTS","utils/inherited-metadata.js","utils/placeholders.js, utils/taxonomy.js, utils/data.js"]
relatedComponents: []
relatedPages: []
confidence: "Low"
primary: true
---

# EPIC E08: Site structure and localization

| Attribute | Value |
| --- | --- |
| Document ID | E08 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | One site serves 13 locales and three review roots |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | utils/site.js LOCALES, paths.json, utils/site.js REVIEW_ROOTS, utils/inherited-metadata.js, utils/placeholders.js, utils/taxonomy.js, utils/data.js |
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
| EPIC ID | E08 |
| Name | Site structure and localization |
| Background | Derived from the implemented capabilities of the TCS Corporate Website |
| Business objective | One site serves 13 locales and three review roots |
| Business outcome | To be confirmed with the business |
| In scope | Locale sites by path, Review roots with their own references and sheets, Inherited navigation, footer and 404 page, Placeholders, taxonomy and data sheets |
| Out of scope | Integrations not implemented (Adobe Tags, Web SDK, forms back end, personalization) |
| Personas | Content author, site visitor, site administrator |
| Stakeholders | Product Owner, Content Lead, Technical Lead |
| Assumptions | The implemented behaviour reflects the intended requirement |
| Dependencies | AEM Sites author, Edge Delivery, published sheets |
| Constraints | AEM delivery rules; no runtime dependencies |
| Risks | Inferred requirements differ from business intent |
| Features | [F-E08-01](./features/F-E08-01-locale-sites-by-path/FEATURE.md), [F-E08-02](./features/F-E08-02-review-roots-with-their-own-references-and-sheets/FEATURE.md), [F-E08-03](./features/F-E08-03-inherited-navigation-footer-and-404-page/FEATURE.md), [F-E08-04](./features/F-E08-04-placeholders-taxonomy-and-data-sheets/FEATURE.md) |
| Success measures | To be confirmed (no approved KPI) |
| Non-functional expectations | WCAG 2.1 AA, Core Web Vitals, privacy |
| Acceptance conditions | Every feature's stories accepted |
| Related architecture | [Architecture guide](../../../01-architecture/markdown/ARCHITECTURE-GUIDE.md) |
| Related components | site-wide |
| Related curated pages | See the curated page inventory |
| Open decisions | Business validation of every inferred requirement |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
