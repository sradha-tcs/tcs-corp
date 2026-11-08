---
id: "DEV-B-DEP"
title: "Block Dependency Matrix"
role: "Development"
topic: "dependencies"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/*/*.js"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: false
---

# Block Dependency Matrix

| Attribute | Value |
| --- | --- |
| Document ID | DEV-B-DEP |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | The shared modules each block imports |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/*/*.js |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Imports per block](#imports-per-block)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Imports per block

| Block | Imports (decorators, utils, scripts) |
| --- | --- |
| `accordion` | scripts/scripts.js, decorators/editor-item-decorator.js |
| `anchor-list` | scripts/aem.js, scripts/scripts.js, decorators/editor-item-decorator.js, utils/cells.js, utils/environment.js, utils/multifield.js, utils/properties.js, utils/placeholders.js |
| `button-block` | decorators/button-decorator.js, utils/buttons.js, utils/environment.js, utils/links.js, utils/placeholders.js, utils/properties.js |
| `cards` | utils/card-list-config.js, utils/dates.js, decorators/card-list-decorator.js, utils/cells.js, utils/environment.js, utils/placeholders.js, utils/properties.js, utils/tags.js, utils/taxonomy.js |
| `column-break` | utils/placeholders.js, utils/properties.js |
| `columns` | — |
| `columns-container` | utils/placeholders.js, ../column-break/column-break.js |
| `conversation-canvas` | scripts/aem.js, scripts/scripts.js, decorators/responsive-image-decorator.js, utils/metadata.js, utils/query-index.js, utils/site.js, utils/taxonomy.js, decorators/a11y-decorator.js, decorators/button-decorator.js, decorators/icon-button-decorator.js, utils/buttons.js, utils/properties.js, utils/urls.js, utils/ids.js, utils/placeholders.js, decorators/skeleton-decorator.js, decorators/editor-item-decorator.js |
| `embed` | scripts/aem.js, decorators/icon-button-decorator.js, decorators/media-decorator.js, utils/media.js, utils/viewport.js, utils/placeholders.js |
| `filter-list` | decorators/article-meta-decorator.js, decorators/button-decorator.js, decorators/date-decorator.js, decorators/editor-item-decorator.js, decorators/icon-button-decorator.js, decorators/masonry-decorator.js, decorators/skeleton-decorator.js, decorators/responsive-image-decorator.js, scripts/aem.js, utils/cells.js, utils/data.js, utils/environment.js, utils/ids.js, utils/multifield.js, utils/placeholders.js, utils/properties.js, utils/query-index.js, utils/site.js, utils/card-list-config.js, utils/tags.js, utils/taxonomy.js, utils/viewport.js |
| `footer` | ../fragment/fragment.js, decorators/motion-decorator.js, scripts/scripts.js, decorators/button-decorator.js, decorators/content-decorator.js, decorators/editor-item-decorator.js, decorators/link-decorator.js, decorators/social-links-decorator.js, utils/cells.js, utils/data.js, utils/inherited-metadata.js, utils/links.js, utils/placeholders.js, utils/site.js |
| `form-variations` | scripts/scripts.js, decorators/button-decorator.js, decorators/content-decorator.js, decorators/heading-decorator.js, utils/environment.js, utils/links.js, utils/properties.js, utils/ids.js, utils/placeholders.js |
| `fragment` | scripts/scripts.js, scripts/aem.js, decorators/motion-decorator.js, utils/environment.js, utils/placeholders.js |
| `gen-carousel` | decorators/button-decorator.js, decorators/icon-button-decorator.js, utils/analytics.js, utils/environment.js, utils/viewport.js, utils/ids.js, utils/placeholders.js |
| `header` | ../fragment/fragment.js, decorators/motion-decorator.js, decorators/button-decorator.js, utils/placeholders.js, utils/header-space.js, utils/inherited-metadata.js, utils/site.js |
| `hero` | scripts/scripts.js, decorators/animation-decorator.js, decorators/button-decorator.js, decorators/editor-item-decorator.js, utils/buttons.js, utils/cells.js, utils/links.js, utils/motion.js, utils/media.js, utils/placeholders.js |
| `image-collage` | scripts/aem.js, scripts/scripts.js, decorators/a11y-decorator.js, decorators/button-decorator.js, decorators/content-decorator.js, decorators/editor-item-decorator.js, decorators/heading-decorator.js, decorators/image-decorator.js, utils/cells.js, utils/links.js, utils/placeholders.js, utils/properties.js |
| `interactive-dashboard` | — |
| `list` | utils/card-list-config.js, utils/dates.js, utils/query-index.js, decorators/card-list-decorator.js, decorators/skeleton-decorator.js, utils/cells.js, utils/data.js, utils/environment.js, utils/placeholders.js, utils/links.js, utils/properties.js, utils/redirects.js, utils/site.js, utils/tags.js, utils/taxonomy.js |
| `media-contacts` | decorators/contact-list-decorator.js, decorators/heading-decorator.js, decorators/skeleton-decorator.js, utils/data.js, utils/environment.js, utils/metadata.js, utils/placeholders.js, utils/properties.js |
| `modal` | ../fragment/fragment.js, scripts/aem.js, scripts/scripts.js, decorators/button-decorator.js, decorators/icon-button-decorator.js, decorators/data-layer-decorator.js, utils/analytics.js, utils/environment.js, utils/ids.js, utils/placeholders.js |
| `page-header` | scripts/scripts.js, decorators/article-meta-decorator.js, decorators/button-decorator.js, decorators/editor-item-decorator.js, decorators/link-decorator.js, decorators/responsive-image-decorator.js, decorators/tag-decorator.js, utils/cells.js, utils/data.js, utils/links.js, utils/metadata.js, utils/placeholders.js, utils/properties.js, utils/taxonomy.js |
| `quote` | decorators/content-decorator.js, decorators/heading-decorator.js, decorators/image-decorator.js, utils/properties.js |
| `separator` | utils/analytics.js, utils/environment.js, utils/ids.js, utils/placeholders.js, utils/properties.js |
| `tab` | scripts/aem.js, utils/properties.js |
| `table` | scripts/scripts.js, utils/ids.js, utils/placeholders.js |
| `table-list` | scripts/scripts.js, decorators/button-decorator.js, utils/buttons.js, utils/environment.js, utils/cells.js, utils/properties.js, utils/urls.js, utils/placeholders.js, utils/motion.js |
| `tabs` | decorators/data-layer-decorator.js, utils/analytics.js, scripts/aem.js, scripts/scripts.js, utils/buttons.js, utils/cells.js, utils/environment.js, utils/ids.js, utils/placeholders.js, utils/properties.js, ../fragment/fragment.js, ../tab/tab.js |
| `tcs-header` | decorators/image-decorator.js, utils/header-space.js, utils/links.js, utils/properties.js, utils/placeholders.js |
| `teaser` | scripts/aem.js, scripts/scripts.js, decorators/a11y-decorator.js, decorators/animation-decorator.js, decorators/article-meta-decorator.js, decorators/button-decorator.js, decorators/content-decorator.js, decorators/editor-item-decorator.js, decorators/heading-decorator.js, decorators/image-decorator.js, decorators/link-decorator.js, decorators/stats-decorator.js, decorators/tag-decorator.js, utils/cells.js, utils/links.js, utils/media.js, utils/placeholders.js, utils/properties.js, utils/tags.js, utils/taxonomy.js |
| `testimonial` | decorators/a11y-decorator.js, decorators/content-decorator.js, decorators/editor-item-decorator.js, decorators/heading-decorator.js, decorators/image-decorator.js, decorators/stats-decorator.js, utils/cells.js, utils/properties.js |
| `video` | scripts/aem.js, decorators/button-decorator.js, decorators/icon-button-decorator.js, decorators/content-decorator.js, decorators/image-decorator.js, decorators/media-decorator.js, utils/environment.js, utils/links.js, utils/media.js, utils/placeholders.js, utils/properties.js, utils/site.js, utils/viewport.js |

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
