---
id: "AUT-002"
title: "Page Creation Guide"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["docs/handover/knowledge-base/authoring.md","models/_page.json"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Page Creation Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-002 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | Creating pages, templates, sections and reordering, duplicating and deleting content |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | docs/handover/knowledge-base/authoring.md, models/_page.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Creating and editing pages](#creating-and-editing-pages)
- [Adding and configuring blocks](#adding-and-configuring-blocks)
- [Containers and child items](#containers-and-child-items)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Creating and editing pages

#### Where pages live

The 13 locale sites and their published paths are listed in [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#site-structure-and-site-data) and defined in `LOCALES` of [utils/site.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/site.js).

| Location (below `/content/tcs-corp/{country}/{language}`) | Contents | Published |
| --- | --- | --- |
| The locale page itself | The locale's Home page | Yes, at `/{locale}/` |
| Content pages below it | All content pages | Yes |
| `references/` | Navigation (`nav`), `footer`, other fragments | Yes (read by other pages) |
| `error-pages/` | `404` (used by the site); `403` / `500` (for a CDN, not used by code) | Yes |
| `block-library/` | Every block variation in the locale's language | No (`excludes` of [paths.json](https://github.com/sradha-tcs/tcs-corp/blob/main/paths.json)) |
| `/content/tcs-corp/site-global-templates/` | Template pages to copy (home, article, blog, press release) | No |

#### Creating a page

1. In the Sites console copy the template page from `site-global-templates` and paste it into the locale folder; rename it (the page name becomes the URL segment). For pages without a template use **Create > Page** (the AEM page template offered there is not recorded).
2. Open it with **Edit**, set the page properties, edit the content, then preview and publish.
3. Values that aren't page properties (author, dates, reading time, region, images, card values, SEO and social columns) come from the locale's bulk metadata sheet (see [Metadata](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/authoring.md#metadata)).

Walkthrough: handover Part 5, 5.3, and the cheat sheet in Part 15, 15.5.1.

#### Page properties

The page model is `page-metadata` in [models/_page.json](https://github.com/sradha-tcs/tcs-corp/blob/main/models/_page.json):

| Field | Name | Notes |
| --- | --- | --- |
| Title | `jcr:title` | Browser, SEO and social title; Page Header heading; card title fallback |
| Description | `jcr:description` | Meta description; Page Header description; card description fallback |
| Keywords | `keywords` | Meta keywords |
| Page Type | `page-type` | Default, Home, Article, Blog, Press Release: loads `templates/{name}/` ([templates/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/templates/README.md)); overrides the sheet's `page-type` |
| Navigation | `nav` | Inherited (see [References](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/authoring.md#references-navigation-footer-and-404)) |
| Footer | `footer` | Inherited |
| 404 Page | `error-page` | Inherited |

`TEMPLATES` in [scripts/scripts.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/scripts.js) is `home`, `article`, `blog`, `press-release`; another value loads no template code but is still added as a body class.

#### Sections

A section is a band of the page with default content and blocks. Its fields (Section Name, Style Default / Grey / Dark / Dark Green, Width Type, Rounded edge, Background Image and its alt text, Anchor name) are in [models/_section.json](https://github.com/sradha-tcs/tcs-corp/blob/main/models/_section.json); the backgrounds and the dark theme contract are described in [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#blocks) ("Backgrounds and theme"). Sections don't get `classes_*` fields delivered, so a section has no Additional tab; the container sections use `container*` fields instead.

## Adding and configuring blocks

#### Where components can be added

What the **Add (+)** picker offers is defined by the filters in [component-filters.json](https://github.com/sradha-tcs/tcs-corp/blob/main/component-filters.json) (aggregated from [models/_component-filters.json](https://github.com/sradha-tcs/tcs-corp/blob/main/models/_component-filters.json), [models/_section.json](https://github.com/sradha-tcs/tcs-corp/blob/main/models/_section.json) and each block's `_<block>.json`):

| Container | Allowed components |
| --- | --- |
| Main (the page) | Section, Gen Carousel, Tabs Container, Columns Container |
| Section | Text, Image, Button (Button Block), Title, Page Header, Hero, Teaser, Quote, Testimonial, Anchor List, Accordion, Tabs (block), Table, Table List, List, Separator, Embed, Video, Modal, Form Variations, Filter List, Conversation Canvas, Cards, Fragment, Footer, TCS Header |
| Columns Container | Column Break, then the Section's components except Page Header, Footer and TCS Header |
| Tabs Container | Tab, Column Break, then the Section's components except Page Header, Conversation Canvas, Footer and TCS Header |
| Gen Carousel | Hero, Teaser |

The item filters of each block (Accordion Item, Card, List Item, CTA, Link, Stat, form fields, Table rows, ...) are listed in [blocks/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/README.md#container-and-child-relationships). Not offered in any filter: the built-in Columns (compatibility only), the built-in Button ("Button (basic)"), and Interactive Dashboard (placeholder) ([blocks/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/README.md#deprecated-blocks)).

#### Block reference

Each block README holds the dialog fields per tab (generated from the models), the variations, authoring steps, accessibility, data layer and troubleshooting. Don't repeat fields elsewhere; read them there.

| Block | README | Added in | Status |
| --- | --- | --- | --- |
| Accordion | [accordion](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/accordion/README.md) | Section, Columns Container, Tabs Container | Active |
| Anchor List | [anchor-list](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/anchor-list/README.md) | Section, Columns Container, Tabs Container | Active |
| Button (Button Block) | [button-block](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/button-block/README.md) | Section, Columns Container, Tabs Container | Active |
| Cards | [cards](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/cards/README.md) | Section, Columns Container, Tabs Container | Active |
| Column Break | [column-break](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/column-break/README.md) | Columns Container, Tabs Container | Active |
| Columns (built-in) | [columns](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns/README.md) | None (no longer offered) | Compatibility-only |
| Columns Container | [columns-container](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns-container/README.md) | Main (page) | Active |
| Conversation Canvas | [conversation-canvas](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/conversation-canvas/README.md) | Section, Columns Container | Active |
| Embed | [embed](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/embed/README.md) | Section, Columns Container, Tabs Container | Active |
| Filter List | [filter-list](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/filter-list/README.md) | Section, Columns Container, Tabs Container | Active |
| Footer | [footer](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/footer/README.md) | Section (on the footer reference page) | Active |
| Form Variations | [form-variations](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/form-variations/README.md) | Section, Columns Container, Tabs Container | Active |
| Fragment | [fragment](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/fragment/README.md) | Section, Columns Container, Tabs Container | Active |
| Gen Carousel | [gen-carousel](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/gen-carousel/README.md) | Main (page) | Active |
| Header | [header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/header/README.md) | Not a component: built from the nav page | Active |
| Hero | [hero](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/hero/README.md) | Section, Columns Container, Tabs Container, Gen Carousel | Active |
| Interactive Dashboard | [interactive-dashboard](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/interactive-dashboard/README.md) | None | Experimental |
| List | [list](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/list/README.md) | Section, Columns Container, Tabs Container | Active |
| Modal | [modal](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/modal/README.md) | Section, Columns Container, Tabs Container | Active |
| Page Header | [page-header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/page-header/README.md) | Section | Active |
| Quote | [quote](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/quote/README.md) | Section, Columns Container, Tabs Container | Active |
| Separator | [separator](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/separator/README.md) | Section, Columns Container, Tabs Container | Active |
| Tab | [tab](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tab/README.md) | Tabs Container | Active |
| Table | [table](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/table/README.md) | Section, Columns Container, Tabs Container | Active |
| Table List | [table-list](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/table-list/README.md) | Section, Columns Container, Tabs Container | Active |
| Tabs Container and Tabs (block) | [tabs](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tabs/README.md) | Main (container); Section, Columns Container, Tabs Container (block) | Active |
| TCS Header | [tcs-header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tcs-header/README.md) | Section (on the nav page) | Active |
| Teaser | [teaser](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/teaser/README.md) | Section, Columns Container, Tabs Container, Gen Carousel | Active |
| Testimonial | [testimonial](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/testimonial/README.md) | Section, Columns Container, Tabs Container | Active |
| Video | [video](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/video/README.md) | Section, Columns Container, Tabs Container | Active |

Default content (Text, Title, Image) uses AEM's built-in components (handover Part 6, chapters 6.6 to 6.8).

#### The Additional tab

Every block model except the header and footer ends with an **Additional** tab (rules in [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#blocks), "Additional tab" and "Animation and skeletons"):

| Field | Name | Effect |
| --- | --- | --- |
| Anchor ID | `classes_anchor` | Must match `anchor-…` (lower case, digits, hyphens); becomes the block's `id` ([decorators/block-options-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/block-options-decorator.js)), de-duplicated as `-2`, `-3`; also the block's data layer id |
| Hide block | `classes_hideblock` | Hidden on the site and in Preview; faded in edit mode; the content stays in the delivered HTML (not an embargo mechanism) |
| Padding / Margin Left, Right, Top, Bottom | `classes_padding*`, `classes_margin*` | `--space-*` tokens, the same at every breakpoint |
| Animation Type, Motion Speed, Animation Trigger | `classes_animation*` | Content animation on 19 blocks; never in edit mode or for reduced motion ([docs/animation/README.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/animation/README.md)) |
| Background animation | `classes_bganimation` | Hero, Teaser, Quote, Testimonial, Form Variations, Conversation Canvas |

Container sections (Columns Container, Tabs Container, Gen Carousel) carry the same options as `container*` fields (`containerAnchor`, `containerHide`, ...), applied by `applySectionBlockOptions` in [scripts/scripts.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/scripts.js).

## Containers and child items

- **Section containers** are added at page level (Main): a [Columns Container](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns-container/README.md) holds Column Breaks and the components of each column; a [Tabs Container](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tabs/README.md) holds Tabs (and Column Breaks inside a tab: a section can't hold a section); a [Gen Carousel](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/gen-carousel/README.md) holds Heroes and Teasers as slides. `scripts.js` wraps each in a synthetic block.
- **Column Break** ([README](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/column-break/README.md)) starts a column: the components after it belong to that column. In a Tab, content before the first Column Break stays above the columns; the Tab's **Columns per row** sets the layout.
- **Item children**: repeating content is added to the block with **Add (+)**, not with composite multifields: List Items, Cards, Hero and Page Header CTAs, Teaser Links and Stats, Testimonial Stats, Anchor Links, Filter List tags / categories / pages, Footer Links, form fields, Table rows, Canvas buttons ([AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#blocks), "Item children"). The multifields authored before are still read but don't render from content packages (handover finding F-87).
- An item without content yet is a dashed placeholder in the editor (placeholder key `itemEditorHint`).
- Universal Editor collapses a dialog's tabs into a dropdown when they don't fit; models keep at most three tabs, the last one Additional.
- Built-in **Columns** and **Button (basic)** authored before stay editable but aren't offered; use a Columns Container and the [Button](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/button-block/README.md) block.

## Screenshots

> **Screenshot required**
>
> - Required screen: Page Creation Guide
> - Required role/access: AEM Sites author with Universal Editor (content author)
> - Required navigation steps: AEM Sites console > /content/tcs-corp/language-masters/en > open a page in Universal Editor
> - Reason unavailable: No AEM author access in the documentation program (access blocker AB-01)
> - Owner: Content Lead / AEM Authoring Lead (proposed)
> - Target completion date: To be confirmed

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
