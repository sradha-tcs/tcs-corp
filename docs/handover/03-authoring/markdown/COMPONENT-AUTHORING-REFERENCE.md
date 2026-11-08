---
id: "AUT-004"
title: "Component Authoring Reference"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["component-definition.json","component-models.json"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Component Authoring Reference

| Attribute | Value |
| --- | --- |
| Document ID | AUT-004 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | Every authorable component with its purpose, fields and authoring guide |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | component-definition.json, component-models.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Components (36)](#components-36)
- [Adding and configuring blocks](#adding-and-configuring-blocks)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Components (36)

| Component | Purpose | Fields (excl. Additional tab) | Guide |
| --- | --- | --- | --- |
| Accordion | Expandable question / answer or detail panels (native details / summary) | 2 | [ACCORDION-AUTHORING-GUIDE](../components/accordion/ACCORDION-AUTHORING-GUIDE.md) |
| Anchor List | In-page navigation to section anchors, optionally sticky | 6 | [ANCHOR-LIST-AUTHORING-GUIDE](../components/anchor-list/ANCHOR-LIST-AUTHORING-GUIDE.md) |
| Button | A link styled as a button, icon button or link button | 8 | [BUTTON-BLOCK-AUTHORING-GUIDE](../components/button-block/BUTTON-BLOCK-AUTHORING-GUIDE.md) |
| Cards | Manually authored cards with the List's presentation (grid or horizontal scroll) | 77 | [CARDS-AUTHORING-GUIDE](../components/cards/CARDS-AUTHORING-GUIDE.md) |
| Column Break | Starts a column in a Columns Container or a Tab | 1 | [COLUMN-BREAK-AUTHORING-GUIDE](../components/column-break/COLUMN-BREAK-AUTHORING-GUIDE.md) |
| Columns | The built-in Columns block: columns of default content | 2 | [COLUMNS-AUTHORING-GUIDE](../components/columns/COLUMNS-AUTHORING-GUIDE.md) |
| Columns Container | A section laid out in columns of default content and blocks | 23 | [COLUMNS-CONTAINER-AUTHORING-GUIDE](../components/columns-container/COLUMNS-CONTAINER-AUTHORING-GUIDE.md) |
| Conversation Canvas | Search prompt with quick actions; one floating journey across header, page and footer | 28 | [CONVERSATION-CANVAS-AUTHORING-GUIDE](../components/conversation-canvas/CONVERSATION-CANVAS-AUTHORING-GUIDE.md) |
| Embed | Third-party embeds (YouTube, Vimeo, X and other URLs) behind a privacy-friendly facade | 3 | [EMBED-AUTHORING-GUIDE](../components/embed/EMBED-AUTHORING-GUIDE.md) |
| Filter List | Filterable listing of the locale's pages from the query index | 45 | [FILTER-LIST-AUTHORING-GUIDE](../components/filter-list/FILTER-LIST-AUTHORING-GUIDE.md) |
| Footer | Site footer bar on the footer reference page (copyright, links, Conversation Canvas) | 9 | [FOOTER-AUTHORING-GUIDE](../components/footer/FOOTER-AUTHORING-GUIDE.md) |
| Form Variations | Forms (contact, download, subscribe) built from field items | 39 | [FORM-VARIATIONS-AUTHORING-GUIDE](../components/form-variations/FORM-VARIATIONS-AUTHORING-GUIDE.md) |
| Fragment | Includes the sections of another page | 1 | [FRAGMENT-AUTHORING-GUIDE](../components/fragment/FRAGMENT-AUTHORING-GUIDE.md) |
| Gen Carousel | A section whose Heroes or Teasers rotate as slides | 17 | [GEN-CAROUSEL-AUTHORING-GUIDE](../components/gen-carousel/GEN-CAROUSEL-AUTHORING-GUIDE.md) |
| Hero | Full-width banner with image or Lottie, title, description and CTAs | 31 | [HERO-AUTHORING-GUIDE](../components/hero/HERO-AUTHORING-GUIDE.md) |
| Image Collage | Centred eyebrow, title, description and CTAs on a dark background framed by up to nine floating decorative images | 23 | [IMAGE-COLLAGE-AUTHORING-GUIDE](../components/image-collage/IMAGE-COLLAGE-AUTHORING-GUIDE.md) |
| Interactive Dashboard | Reserved for a future dashboard; renders nothing on the site | 0 | [INTERACTIVE-DASHBOARD-AUTHORING-GUIDE](../components/interactive-dashboard/INTERACTIVE-DASHBOARD-AUTHORING-GUIDE.md) |
| List | Child pages, a fixed list or tagged pages from the query index, as cards or links | 98 | [LIST-AUTHORING-GUIDE](../components/list/LIST-AUTHORING-GUIDE.md) |
| Media Contacts | The media contacts of the locale's Media Contacts sheet, grouped by designation and region | 2 | [MEDIA-CONTACTS-AUTHORING-GUIDE](../components/media-contacts/MEDIA-CONTACTS-AUTHORING-GUIDE.md) |
| Modal | Opens a page's content in a dialog (button or auto-linked /modal/ links) | 2 | [MODAL-AUTHORING-GUIDE](../components/modal/MODAL-AUTHORING-GUIDE.md) |
| Page Header | The title area of a page from its metadata (title, description, tags, author, dates) | 12 | [PAGE-HEADER-AUTHORING-GUIDE](../components/page-header/PAGE-HEADER-AUTHORING-GUIDE.md) |
| Quote | A quotation with author, optional image and title | 10 | [QUOTE-AUTHORING-GUIDE](../components/quote/QUOTE-AUTHORING-GUIDE.md) |
| Separator | A divider line between content | 42 | [SEPARATOR-AUTHORING-GUIDE](../components/separator/SEPARATOR-AUTHORING-GUIDE.md) |
| Tab | Starts a tab panel in a Tabs Container | 4 | [TAB-AUTHORING-GUIDE](../components/tab/TAB-AUTHORING-GUIDE.md) |
| Table | A data table of rows with 1–9 columns | 47 | [TABLE-AUTHORING-GUIDE](../components/table/TABLE-AUTHORING-GUIDE.md) |
| Table List | A numbered list of linked items (industries, services) | 21 | [TABLE-LIST-AUTHORING-GUIDE](../components/table-list/TABLE-LIST-AUTHORING-GUIDE.md) |
| Tabs | Tabs Container section (Tab items and content) and the Tabs block (tabs of fragments) | 29 | [TABS-AUTHORING-GUIDE](../components/tabs/TABS-AUTHORING-GUIDE.md) |
| TCS Header | The TCS and TATA logos of the header, on the nav page | 7 | [TCS-HEADER-AUTHORING-GUIDE](../components/tcs-header/TCS-HEADER-AUTHORING-GUIDE.md) |
| Teaser | Title, text, image and links in one of four layouts | 77 | [TEASER-AUTHORING-GUIDE](../components/teaser/TEASER-AUTHORING-GUIDE.md) |
| Testimonial | A client testimonial with author, image and stats | 18 | [TESTIMONIAL-AUTHORING-GUIDE](../components/testimonial/TESTIMONIAL-AUTHORING-GUIDE.md) |
| Video | A DAM, YouTube or Vimeo video inline or in a pop-up, with poster and captions | 22 | [VIDEO-AUTHORING-GUIDE](../components/video/VIDEO-AUTHORING-GUIDE.md) |
| Text | Default content | 0 | [TEXT-AUTHORING-GUIDE](../components/text/TEXT-AUTHORING-GUIDE.md) |
| Title | Default content | 2 | [TITLE-AUTHORING-GUIDE](../components/title/TITLE-AUTHORING-GUIDE.md) |
| Image | Default content | 2 | [IMAGE-AUTHORING-GUIDE](../components/image/IMAGE-AUTHORING-GUIDE.md) |
| Button (basic) | Default content | 4 | [BUTTON-AUTHORING-GUIDE](../components/button/BUTTON-AUTHORING-GUIDE.md) |
| Section | Default content | 7 | [SECTION-AUTHORING-GUIDE](../components/section/SECTION-AUTHORING-GUIDE.md) |

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

## Screenshots

> **Screenshot required**
>
> - Required screen: Component Authoring Reference
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
