---
id: "BA-004"
title: "Functional Requirements"
role: "Business analysis"
topic: ""
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Low"
primary: true
---

# Functional Requirements

| Attribute | Value |
| --- | --- |
| Document ID | BA-004 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | Functional requirements per feature (inferred) |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

**INFERRED REQUIREMENT, REQUIRES BUSINESS VALIDATION**

| EPIC | Feature | Name | Stories |
| --- | --- | --- | --- |
| E01 | [F-E01-01](../epics/E01-site-navigation-and-global-chrome/features/F-E01-01-header/FEATURE.md) | Header | US-F-E01-01-01, US-F-E01-01-02 |
| E01 | [F-E01-02](../epics/E01-site-navigation-and-global-chrome/features/F-E01-02-tcs-header/FEATURE.md) | TCS Header | US-F-E01-02-01, US-F-E01-02-02, US-F-E01-02-03 |
| E01 | [F-E01-03](../epics/E01-site-navigation-and-global-chrome/features/F-E01-03-footer/FEATURE.md) | Footer | US-F-E01-03-01, US-F-E01-03-02, US-F-E01-03-03 |
| E01 | [F-E01-04](../epics/E01-site-navigation-and-global-chrome/features/F-E01-04-fragment/FEATURE.md) | Fragment | US-F-E01-04-01, US-F-E01-04-02 |
| E01 | [F-E01-05](../epics/E01-site-navigation-and-global-chrome/features/F-E01-05-modal/FEATURE.md) | Modal | US-F-E01-05-01, US-F-E01-05-02 |
| E02 | [F-E02-01](../epics/E02-page-heroes-and-page-headers/features/F-E02-01-hero/FEATURE.md) | Hero | US-F-E02-01-01, US-F-E02-01-02, US-F-E02-01-03 |
| E02 | [F-E02-02](../epics/E02-page-heroes-and-page-headers/features/F-E02-02-page-header/FEATURE.md) | Page Header | US-F-E02-02-01, US-F-E02-02-02, US-F-E02-02-03 |
| E03 | [F-E03-01](../epics/E03-editorial-content-presentation/features/F-E03-01-teaser/FEATURE.md) | Teaser | US-F-E03-01-01, US-F-E03-01-02, US-F-E03-01-03 |
| E03 | [F-E03-02](../epics/E03-editorial-content-presentation/features/F-E03-02-cards/FEATURE.md) | Cards | US-F-E03-02-01, US-F-E03-02-02, US-F-E03-02-03 |
| E03 | [F-E03-03](../epics/E03-editorial-content-presentation/features/F-E03-03-columns-container/FEATURE.md) | Columns Container | US-F-E03-03-01, US-F-E03-03-02, US-F-E03-03-03 |
| E03 | [F-E03-04](../epics/E03-editorial-content-presentation/features/F-E03-04-columns/FEATURE.md) | Columns | US-F-E03-04-01, US-F-E03-04-02 |
| E03 | [F-E03-05](../epics/E03-editorial-content-presentation/features/F-E03-05-column-break/FEATURE.md) | Column Break | US-F-E03-05-01, US-F-E03-05-02 |
| E03 | [F-E03-06](../epics/E03-editorial-content-presentation/features/F-E03-06-quote/FEATURE.md) | Quote | US-F-E03-06-01, US-F-E03-06-02, US-F-E03-06-03 |
| E03 | [F-E03-07](../epics/E03-editorial-content-presentation/features/F-E03-07-testimonial/FEATURE.md) | Testimonial | US-F-E03-07-01, US-F-E03-07-02, US-F-E03-07-03 |
| E03 | [F-E03-08](../epics/E03-editorial-content-presentation/features/F-E03-08-separator/FEATURE.md) | Separator | US-F-E03-08-01, US-F-E03-08-02, US-F-E03-08-03 |
| E03 | [F-E03-09](../epics/E03-editorial-content-presentation/features/F-E03-09-image-collage/FEATURE.md) | Image Collage | US-F-E03-09-01, US-F-E03-09-02, US-F-E03-09-03 |
| E03 | [F-E03-10](../epics/E03-editorial-content-presentation/features/F-E03-10-accordion/FEATURE.md) | Accordion | US-F-E03-10-01, US-F-E03-10-02 |
| E03 | [F-E03-11](../epics/E03-editorial-content-presentation/features/F-E03-11-tabs/FEATURE.md) | Tabs | US-F-E03-11-01, US-F-E03-11-02, US-F-E03-11-03 |
| E03 | [F-E03-12](../epics/E03-editorial-content-presentation/features/F-E03-12-tab/FEATURE.md) | Tab | US-F-E03-12-01, US-F-E03-12-02, US-F-E03-12-03 |
| E03 | [F-E03-13](../epics/E03-editorial-content-presentation/features/F-E03-13-gen-carousel/FEATURE.md) | Gen Carousel | US-F-E03-13-01, US-F-E03-13-02, US-F-E03-13-03 |
| E03 | [F-E03-14](../epics/E03-editorial-content-presentation/features/F-E03-14-table/FEATURE.md) | Table | US-F-E03-14-01, US-F-E03-14-02, US-F-E03-14-03 |
| E03 | [F-E03-15](../epics/E03-editorial-content-presentation/features/F-E03-15-anchor-list/FEATURE.md) | Anchor List | US-F-E03-15-01, US-F-E03-15-02 |
| E03 | [F-E03-16](../epics/E03-editorial-content-presentation/features/F-E03-16-button/FEATURE.md) | Button | US-F-E03-16-01, US-F-E03-16-02, US-F-E03-16-03 |
| E04 | [F-E04-01](../epics/E04-media/features/F-E04-01-video/FEATURE.md) | Video | US-F-E04-01-01, US-F-E04-01-02, US-F-E04-01-03 |
| E04 | [F-E04-02](../epics/E04-media/features/F-E04-02-embed/FEATURE.md) | Embed | US-F-E04-02-01, US-F-E04-02-02 |
| E04 | [F-E04-03](../epics/E04-media/features/F-E04-03-interactive-dashboard/FEATURE.md) | Interactive Dashboard | US-F-E04-03-01, US-F-E04-03-02 |
| E05 | [F-E05-01](../epics/E05-listings-and-discovery/features/F-E05-01-list/FEATURE.md) | List | US-F-E05-01-01, US-F-E05-01-02, US-F-E05-01-03 |
| E05 | [F-E05-02](../epics/E05-listings-and-discovery/features/F-E05-02-filter-list/FEATURE.md) | Filter List | US-F-E05-02-01, US-F-E05-02-02, US-F-E05-02-03 |
| E05 | [F-E05-03](../epics/E05-listings-and-discovery/features/F-E05-03-table-list/FEATURE.md) | Table List | US-F-E05-03-01, US-F-E05-03-02, US-F-E05-03-03 |
| E05 | [F-E05-04](../epics/E05-listings-and-discovery/features/F-E05-04-media-contacts/FEATURE.md) | Media Contacts | US-F-E05-04-01, US-F-E05-04-02, US-F-E05-04-03 |
| E06 | [F-E06-01](../epics/E06-forms-and-lead-capture/features/F-E06-01-form-variations/FEATURE.md) | Form Variations | US-F-E06-01-01, US-F-E06-01-02, US-F-E06-01-03 |
| E07 | [F-E07-01](../epics/E07-conversational-experience/features/F-E07-01-conversation-canvas/FEATURE.md) | Conversation Canvas | US-F-E07-01-01, US-F-E07-01-02, US-F-E07-01-03 |
| E08 | [F-E08-01](../epics/E08-site-structure-and-localization/features/F-E08-01-locale-sites-by-path/FEATURE.md) | Locale sites by path | US-F-E08-01-01 |
| E08 | [F-E08-02](../epics/E08-site-structure-and-localization/features/F-E08-02-review-roots-with-their-own-references-and-sheets/FEATURE.md) | Review roots with their own references and sheets | US-F-E08-02-01 |
| E08 | [F-E08-03](../epics/E08-site-structure-and-localization/features/F-E08-03-inherited-navigation-footer-and-404-page/FEATURE.md) | Inherited navigation, footer and 404 page | US-F-E08-03-01 |
| E08 | [F-E08-04](../epics/E08-site-structure-and-localization/features/F-E08-04-placeholders-taxonomy-and-data-sheets/FEATURE.md) | Placeholders, taxonomy and data sheets | US-F-E08-04-01 |
| E09 | [F-E09-01](../epics/E09-measurement-accessibility-and-performance/features/F-E09-01-adobe-client-data-layer/FEATURE.md) | Adobe Client Data Layer | US-F-E09-01-01 |
| E09 | [F-E09-02](../epics/E09-measurement-accessibility-and-performance/features/F-E09-02-accessibility-baseline-wcag-2-1-aa/FEATURE.md) | Accessibility baseline (WCAG 2.1 AA) | US-F-E09-02-01 |
| E09 | [F-E09-03](../epics/E09-measurement-accessibility-and-performance/features/F-E09-03-three-phase-loading-and-module-preloading/FEATURE.md) | Three-phase loading and module preloading | US-F-E09-03-01 |
| E09 | [F-E09-04](../epics/E09-measurement-accessibility-and-performance/features/F-E09-04-content-and-background-animation/FEATURE.md) | Content and background animation | US-F-E09-04-01 |
| E10 | [F-E10-01](../epics/E10-content-migration-and-publishing/features/F-E10-01-migration-packages-8-432-pages/FEATURE.md) | Migration packages (8,432 pages) | US-F-E10-01-01 |
| E10 | [F-E10-02](../epics/E10-content-migration-and-publishing/features/F-E10-02-redirects-from-the-tcs-com-urls/FEATURE.md) | Redirects from the tcs.com URLs | US-F-E10-02-01 |
| E10 | [F-E10-03](../epics/E10-content-migration-and-publishing/features/F-E10-03-dynamic-media-delivery-of-the-assets/FEATURE.md) | Dynamic Media delivery of the assets | US-F-E10-03-01 |
| E10 | [F-E10-04](../epics/E10-content-migration-and-publishing/features/F-E10-04-publishing-and-indexing/FEATURE.md) | Publishing and indexing | US-F-E10-04-01 |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
