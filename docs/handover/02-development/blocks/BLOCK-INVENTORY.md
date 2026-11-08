---
id: "DEV-B-INV"
title: "Block Inventory"
role: "Development"
topic: "inventory"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/","tools/docs/blocks.json","component-definition.json"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: false
---

# Block Inventory

| Attribute | Value |
| --- | --- |
| Document ID | DEV-B-INV |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every block folder with its type, status, components, block library pages, curated page usage and tests |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/, tools/docs/blocks.json, component-definition.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Blocks (32)](#blocks-32)
- [Default-content components](#default-content-components)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Blocks (32)

| Block | Folder | Type | Category | Status | Components | Library pages | Curated pages using it | Unit test files |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [Accordion](./accordion/ACCORDION-DEVELOPER-GUIDE.md) | `accordion` | Container | interactive | Active | accordion, accordion-item | 2 | 0 | 0 |
| [Anchor List](./anchor-list/ANCHOR-LIST-DEVELOPER-GUIDE.md) | `anchor-list` | Container | navigation | Active | anchor-list, anchor-list-item | 3 | 2 | 0 |
| [Button](./button-block/BUTTON-BLOCK-DEVELOPER-GUIDE.md) | `button-block` | Independent | content | Active | button-block | 0 | 2 | 0 |
| [Cards](./cards/CARDS-DEVELOPER-GUIDE.md) | `cards` | Container | listing | Active | cards, card | 7 | 4 | 1 |
| [Column Break](./column-break/COLUMN-BREAK-DEVELOPER-GUIDE.md) | `column-break` | Child item | child-item | Active | column-break | 0 | 4 | 0 |
| [Columns](./columns/COLUMNS-DEVELOPER-GUIDE.md) | `columns` | Independent | deprecated | Compatibility-only | columns | 3 | 0 | 0 |
| [Columns Container](./columns-container/COLUMNS-CONTAINER-DEVELOPER-GUIDE.md) | `columns-container` | Container (section) | container | Active | columns-container | 4 | 4 | 0 |
| [Conversation Canvas](./conversation-canvas/CONVERSATION-CANVAS-DEVELOPER-GUIDE.md) | `conversation-canvas` | Container | interactive | Active | conversation-canvas, conversation-canvas-button | 6 | 2 | 1 |
| [Embed](./embed/EMBED-DEVELOPER-GUIDE.md) | `embed` | Independent | media | Active | embed | 2 | 0 | 0 |
| [Filter List](./filter-list/FILTER-LIST-DEVELOPER-GUIDE.md) | `filter-list` | Container | listing | Active | filter-list, filter-list-tag, filter-list-category, filter-list-page | 7 | 4 | 0 |
| [Footer](./footer/FOOTER-DEVELOPER-GUIDE.md) | `footer` | Structural | navigation | Active | footer, footer-link | 8 | 0 | 0 |
| [Form Variations](./form-variations/FORM-VARIATIONS-DEVELOPER-GUIDE.md) | `form-variations` | Container | interactive | Active | form-variations, field-text, field-select, field-combined, field-textarea, field-checkbox, contact-card, field-submit | 3 | 8 | 0 |
| [Fragment](./fragment/FRAGMENT-DEVELOPER-GUIDE.md) | `fragment` | Structural | utility | Active | fragment | 4 | 0 | 0 |
| [Gen Carousel](./gen-carousel/GEN-CAROUSEL-DEVELOPER-GUIDE.md) | `gen-carousel` | Container (section) | container | Active | gen-carousel | 6 | 1 | 0 |
| [Header](./header/HEADER-DEVELOPER-GUIDE.md) | `header` | Structural | navigation | Active | none (code only) | 5 | 0 | 0 |
| [Hero](./hero/HERO-DEVELOPER-GUIDE.md) | `hero` | Container | content | Active | hero, hero-cta | 5 | 6 | 0 |
| [Image Collage](./image-collage/IMAGE-COLLAGE-DEVELOPER-GUIDE.md) | `image-collage` | Container | content | Active (Proposed, KB-D-063) | image-collage, image-collage-item | 0 | 0 | 0 |
| [Interactive Dashboard](./interactive-dashboard/INTERACTIVE-DASHBOARD-DEVELOPER-GUIDE.md) | `interactive-dashboard` | Independent | utility | Experimental (placeholder) | interactive-dashboard | 2 | 0 | 0 |
| [List](./list/LIST-DEVELOPER-GUIDE.md) | `list` | Container | listing | Active | list, list-item | 15 | 11 | 3 |
| [Media Contacts](./media-contacts/MEDIA-CONTACTS-DEVELOPER-GUIDE.md) | `media-contacts` | Independent | listing | Active | media-contacts | 0 | 0 | 1 |
| [Modal](./modal/MODAL-DEVELOPER-GUIDE.md) | `modal` | Independent | interactive | Active | modal | 10 | 0 | 0 |
| [Page Header](./page-header/PAGE-HEADER-DEVELOPER-GUIDE.md) | `page-header` | Container | content | Active | page-header, page-header-cta | 17 | 3 | 0 |
| [Quote](./quote/QUOTE-DEVELOPER-GUIDE.md) | `quote` | Independent | content | Active | quote | 2 | 1 | 0 |
| [Separator](./separator/SEPARATOR-DEVELOPER-GUIDE.md) | `separator` | Independent | structural | Active | separator | 4 | 0 | 1 |
| [Tab](./tab/TAB-DEVELOPER-GUIDE.md) | `tab` | Child item | child-item | Active | tab | 0 | 1 | 0 |
| [Table](./table/TABLE-DEVELOPER-GUIDE.md) | `table` | Container | content | Active | table, table-row, table-col-2, table-col-3, table-col-4, table-col-5, table-col-6, table-col-7, table-col-8, table-col-9 | 2 | 0 | 0 |
| [Table List](./table-list/TABLE-LIST-DEVELOPER-GUIDE.md) | `table-list` | Container | listing | Active | table-list, table-list-card | 6 | 6 | 0 |
| [Tabs](./tabs/TABS-DEVELOPER-GUIDE.md) | `tabs` | Container (section) and block | container | Active | tabs, tabs-block, tabs-item | 14 | 1 | 0 |
| [TCS Header](./tcs-header/TCS-HEADER-DEVELOPER-GUIDE.md) | `tcs-header` | Independent | navigation | Active | tcs-header | 0 | 0 | 0 |
| [Teaser](./teaser/TEASER-DEVELOPER-GUIDE.md) | `teaser` | Container | content | Active | teaser, teaser-link, teaser-stat, teaser-collage-image | 11 | 12 | 0 |
| [Testimonial](./testimonial/TESTIMONIAL-DEVELOPER-GUIDE.md) | `testimonial` | Container | content | Active | testimonial, testimonial-stat | 2 | 7 | 0 |
| [Video](./video/VIDEO-DEVELOPER-GUIDE.md) | `video` | Independent | media | Active | video | 3 | 3 | 0 |

## Default-content components

| Component | Title | Resource type | Model |
| --- | --- | --- | --- |
| `text` | Text | `core/franklin/components/text/v1/text` | — |
| `title` | Title | `core/franklin/components/title/v1/title` | `title` |
| `image` | Image | `core/franklin/components/image/v1/image` | `image` |
| `button` | Button (basic) | `core/franklin/components/button/v1/button` | `button-basic` |
| `section` | Section | `core/franklin/components/section/v1/section` | `section` |

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
