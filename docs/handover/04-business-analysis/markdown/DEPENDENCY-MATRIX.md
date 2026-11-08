---
id: "BA-010"
title: "Dependency Matrix"
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

# Dependency Matrix

| Attribute | Value |
| --- | --- |
| Document ID | BA-010 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | Features and the systems they depend on |
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

| Feature | Depends on |
| --- | --- |
| F-E01-01 Header | decorators/motion-decorator.js, decorators/button-decorator.js, utils/placeholders.js, utils/header-space.js, utils/inherited-metadata.js, utils/site.js |
| F-E01-02 TCS Header | decorators/image-decorator.js, utils/header-space.js, utils/links.js, utils/properties.js, utils/placeholders.js |
| F-E01-03 Footer | decorators/motion-decorator.js, decorators/button-decorator.js, decorators/content-decorator.js, decorators/editor-item-decorator.js, decorators/link-decorator.js, decorators/social-links-decorator.js, utils/cells.js, utils/data.js, utils/inherited-metadata.js, utils/links.js, utils/placeholders.js, utils/site.js |
| F-E01-04 Fragment | decorators/motion-decorator.js, utils/environment.js, utils/placeholders.js |
| F-E01-05 Modal | decorators/button-decorator.js, decorators/icon-button-decorator.js, decorators/data-layer-decorator.js, utils/analytics.js, utils/environment.js, utils/ids.js, utils/placeholders.js |
| F-E02-01 Hero | decorators/animation-decorator.js, decorators/button-decorator.js, decorators/editor-item-decorator.js, utils/buttons.js, utils/cells.js, utils/links.js, utils/motion.js, utils/media.js, utils/placeholders.js |
| F-E02-02 Page Header | decorators/article-meta-decorator.js, decorators/button-decorator.js, decorators/editor-item-decorator.js, decorators/link-decorator.js, decorators/responsive-image-decorator.js, decorators/tag-decorator.js, utils/cells.js, utils/data.js, utils/links.js, utils/metadata.js, utils/placeholders.js, utils/properties.js, utils/taxonomy.js |
| F-E03-01 Teaser | decorators/a11y-decorator.js, decorators/animation-decorator.js, decorators/article-meta-decorator.js, decorators/button-decorator.js, decorators/content-decorator.js, decorators/editor-item-decorator.js, decorators/heading-decorator.js, decorators/image-decorator.js, decorators/link-decorator.js, decorators/stats-decorator.js, decorators/tag-decorator.js, utils/cells.js, utils/links.js, utils/media.js, utils/placeholders.js, utils/properties.js, utils/tags.js, utils/taxonomy.js |
| F-E03-02 Cards | utils/card-list-config.js, utils/dates.js, decorators/card-list-decorator.js, utils/cells.js, utils/environment.js, utils/placeholders.js, utils/properties.js, utils/tags.js, utils/taxonomy.js |
| F-E03-03 Columns Container | utils/placeholders.js |
| F-E03-04 Columns | none |
| F-E03-05 Column Break | utils/placeholders.js, utils/properties.js |
| F-E03-06 Quote | decorators/content-decorator.js, decorators/heading-decorator.js, decorators/image-decorator.js, utils/properties.js |
| F-E03-07 Testimonial | decorators/a11y-decorator.js, decorators/content-decorator.js, decorators/editor-item-decorator.js, decorators/heading-decorator.js, decorators/image-decorator.js, decorators/stats-decorator.js, utils/cells.js, utils/properties.js |
| F-E03-08 Separator | utils/analytics.js, utils/environment.js, utils/ids.js, utils/placeholders.js, utils/properties.js |
| F-E03-09 Image Collage | decorators/a11y-decorator.js, decorators/button-decorator.js, decorators/content-decorator.js, decorators/editor-item-decorator.js, decorators/heading-decorator.js, decorators/image-decorator.js, utils/cells.js, utils/links.js, utils/placeholders.js, utils/properties.js |
| F-E03-10 Accordion | decorators/editor-item-decorator.js |
| F-E03-11 Tabs | decorators/data-layer-decorator.js, utils/analytics.js, utils/buttons.js, utils/cells.js, utils/environment.js, utils/ids.js, utils/placeholders.js, utils/properties.js |
| F-E03-12 Tab | utils/properties.js |
| F-E03-13 Gen Carousel | decorators/button-decorator.js, decorators/icon-button-decorator.js, utils/analytics.js, utils/environment.js, utils/viewport.js, utils/ids.js, utils/placeholders.js |
| F-E03-14 Table | utils/ids.js, utils/placeholders.js |
| F-E03-15 Anchor List | decorators/editor-item-decorator.js, utils/cells.js, utils/environment.js, utils/multifield.js, utils/properties.js, utils/placeholders.js |
| F-E03-16 Button | decorators/button-decorator.js, utils/buttons.js, utils/environment.js, utils/links.js, utils/placeholders.js, utils/properties.js |
| F-E04-01 Video | decorators/button-decorator.js, decorators/icon-button-decorator.js, decorators/content-decorator.js, decorators/image-decorator.js, decorators/media-decorator.js, utils/environment.js, utils/links.js, utils/media.js, utils/placeholders.js, utils/properties.js, utils/site.js, utils/viewport.js |
| F-E04-02 Embed | decorators/icon-button-decorator.js, decorators/media-decorator.js, utils/media.js, utils/viewport.js, utils/placeholders.js |
| F-E04-03 Interactive Dashboard | none |
| F-E05-01 List | utils/card-list-config.js, utils/dates.js, utils/query-index.js, decorators/card-list-decorator.js, decorators/skeleton-decorator.js, utils/cells.js, utils/data.js, utils/environment.js, utils/placeholders.js, utils/links.js, utils/properties.js, utils/redirects.js, utils/site.js, utils/tags.js, utils/taxonomy.js |
| F-E05-02 Filter List | decorators/article-meta-decorator.js, decorators/button-decorator.js, decorators/date-decorator.js, decorators/editor-item-decorator.js, decorators/icon-button-decorator.js, decorators/masonry-decorator.js, decorators/skeleton-decorator.js, decorators/responsive-image-decorator.js, utils/cells.js, utils/data.js, utils/environment.js, utils/ids.js, utils/multifield.js, utils/placeholders.js, utils/properties.js, utils/query-index.js, utils/site.js, utils/card-list-config.js, utils/tags.js, utils/taxonomy.js, utils/viewport.js |
| F-E05-03 Table List | decorators/button-decorator.js, utils/buttons.js, utils/environment.js, utils/cells.js, utils/properties.js, utils/urls.js, utils/placeholders.js, utils/motion.js |
| F-E05-04 Media Contacts | decorators/contact-list-decorator.js, decorators/heading-decorator.js, decorators/skeleton-decorator.js, utils/data.js, utils/environment.js, utils/metadata.js, utils/placeholders.js, utils/properties.js |
| F-E06-01 Form Variations | decorators/button-decorator.js, decorators/content-decorator.js, decorators/heading-decorator.js, utils/environment.js, utils/links.js, utils/properties.js, utils/ids.js, utils/placeholders.js |
| F-E07-01 Conversation Canvas | decorators/responsive-image-decorator.js, utils/metadata.js, utils/query-index.js, utils/site.js, utils/taxonomy.js, decorators/a11y-decorator.js, decorators/button-decorator.js, decorators/icon-button-decorator.js, utils/buttons.js, utils/properties.js, utils/urls.js, utils/ids.js, utils/placeholders.js, decorators/skeleton-decorator.js, decorators/editor-item-decorator.js |
| F-E08-01 Locale sites by path | utils/site.js LOCALES, paths.json |
| F-E08-02 Review roots with their own references and sheets | utils/site.js REVIEW_ROOTS |
| F-E08-03 Inherited navigation, footer and 404 page | utils/inherited-metadata.js |
| F-E08-04 Placeholders, taxonomy and data sheets | utils/placeholders.js, utils/taxonomy.js, utils/data.js |
| F-E09-01 Adobe Client Data Layer | decorators/data-layer-decorator.js |
| F-E09-02 Accessibility baseline (WCAG 2.1 AA) | decorators/a11y-decorator.js and blocks |
| F-E09-03 Three-phase loading and module preloading | scripts/scripts.js, scripts/module-graph.js |
| F-E09-04 Content and background animation | decorators/motion-decorator.js, utils/motion.js |
| F-E10-01 Migration packages (8,432 pages) | delivery branch consolidated/ |
| F-E10-02 Redirects from the tcs.com URLs | consolidated/sheets/redirects.csv |
| F-E10-03 Dynamic Media delivery of the assets | decorators/responsive-image-decorator.js, aem-sites.sh |
| F-E10-04 Publishing and indexing | Admin API, helix-query.yaml |

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
