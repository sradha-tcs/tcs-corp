# Blocks Documentation

The blocks of the TCS Corporate Website (AEM Sites with Edge Delivery Services and Universal Editor, xwalk). Each folder under `blocks/` is one block (or a section container, item or compatibility block) with its JavaScript, CSS, Universal Editor model and README.

## Overview

**Purpose.** This page is the entry point to the block documentation: what each block is for, its status, how blocks relate, and the conventions they share. Each block's README describes that block as implemented, for content authors, developers, site administrators, architects and QA / support.

**Authoring model.** Authors add blocks in Universal Editor from the component list of a section, a Columns Container column or a Tabs Container tab (the component filters in `component-filters.json`). Each block's dialog comes from its `_<block>.json` (definitions, models, filters), aggregated into `component-definition.json`, `component-models.json` and `component-filters.json` by `npm run build:json`. Repeating content is added as items (children) of a block, not as composite multifields. Every block model except the header and footer ends with an Additional tab (anchor, hide block, animation, padding and margin). The rules of what AEM really delivers (field collapse, tab rows, item rows, `classes_*` fields, section fields) are in [AGENTS.md](../AGENTS.md), "AEM delivery rules".

**Loading model.** Pages load in three phases (`scripts/scripts.js`): eager (the first section, up to the LCP image), lazy (the other sections, the header and footer, the shared data of Lists, Filter Lists and Canvases) and delayed (3 seconds later: `scripts/delayed.js`). A block's JavaScript and CSS load only when the block is on the page (`loadBlock` in `scripts/aem.js`); `head.html` and `preloadBlockModules` preload the modules they import (`npm run build:modules`). Section containers (Columns Container, Tabs Container, Gen Carousel) are sections that `scripts.js` wraps in a synthetic block.

The project-wide rules, architecture and standards are in the [project knowledge base](../docs/handover/knowledge-base/README.md) (block governance: [blocks.md](../docs/handover/knowledge-base/blocks.md)).

**Using this documentation.** Start with the inventory below, then the block's README. The sections marked as generated in each README (dialog fields, screenshots, files and dependencies, block library usage) are rewritten from the repository by `npm run build:docs` (`tools/docs/generate-block-docs.mjs`); `npm test` fails when they are out of date or a link is broken. Status, type and purpose of each block are kept in `tools/docs/blocks.json`. The project handover ([docs/handover/TCS-CORP-HANDOVER.md](../docs/handover/TCS-CORP-HANDOVER.md), Part 6 Component Library) has the long-form chapter of each component; where it and a README differ, the README follows the code (the differences are listed in [docs/blocks/BLOCK-DOCUMENTATION-REPORT.md](../docs/blocks/BLOCK-DOCUMENTATION-REPORT.md)).

## Block Inventory

<!-- BEGIN GENERATED: inventory (npm run build:docs) -->

| Block | Type | Purpose | Variations | Authorable | Status | Documentation |
| ----- | ---- | ------- | ---------- | ---------- | ------ | ------------- |
| [Accordion](./accordion/README.md) (`accordion`) | Container | Expandable question / answer or detail panels (native details / summary) | Accordion Items; Additional tab options | Yes | Active | [README](./accordion/README.md) |
| [Anchor List](./anchor-list/README.md) (`anchor-list`) | Container | In-page navigation to section anchors, optionally sticky | Sticky or static; Anchor Link items | Yes | Active | [README](./anchor-list/README.md) |
| [Button](./button-block/README.md) (`button-block`) | Independent | A link styled as a button, icon button or link button | View (button, icon, link), Type (primary, secondary, tertiary), icon, alignment | Yes | Active | [README](./button-block/README.md) |
| [Cards](./cards/README.md) (`cards`) | Container | Manually authored cards with the List's presentation (grid or horizontal scroll) | Card style (image, panel, report, statistic, mixed), Card colour, layout per breakpoint | Yes | Active | [README](./cards/README.md) |
| [Column Break](./column-break/README.md) (`column-break`) | Child item | Starts a column in a Columns Container or a Tab | Additional tab options of its column | Yes | Active | [README](./column-break/README.md) |
| [Columns](./columns/README.md) (`columns`) | Independent | The built-in Columns block: columns of default content | Columns and rows of the built-in component | Yes | Compatibility-only | [README](./columns/README.md) |
| [Columns Container](./columns-container/README.md) (`columns-container`) | Container (section) | A section laid out in columns of default content and blocks | Columns per row, gap, vertical alignment, side by side from, BG Color | Yes | Active | [README](./columns-container/README.md) |
| [Conversation Canvas](./conversation-canvas/README.md) (`conversation-canvas`) | Container | Search prompt with quick actions; one floating journey across header, page and footer | Primary (sticky dock), Secondary, journey options, action styles | Yes | Active | [README](./conversation-canvas/README.md) |
| [Embed](./embed/README.md) (`embed`) | Independent | Third-party embeds (YouTube, Vimeo, X and other URLs) behind a privacy-friendly facade | Provider by URL | Yes | Active | [README](./embed/README.md) |
| [Filter List](./filter-list/README.md) (`filter-list`) | Container | Filterable listing of the locale's pages from the query index | Layouts, card styles, filters, featured cards | Yes | Active | [README](./filter-list/README.md) |
| [Footer](./footer/README.md) (`footer`) | Structural | Site footer bar on the footer reference page (copyright, links, Conversation Canvas) | Footer Link items; Conversation Canvas page | Yes | Active | [README](./footer/README.md) |
| [Form Variations](./form-variations/README.md) (`form-variations`) | Container | Forms (contact, download, subscribe) built from field items | Form variations and field items | Yes | Active | [README](./form-variations/README.md) |
| [Fragment](./fragment/README.md) (`fragment`) | Structural | Includes the sections of another page | — | Yes | Active | [README](./fragment/README.md) |
| [Gen Carousel](./gen-carousel/README.md) (`gen-carousel`) | Container (section) | A section whose Heroes or Teasers rotate as slides | Navigation (dots, arrows), automatic interval | Yes | Active | [README](./gen-carousel/README.md) |
| [Header](./header/README.md) (`header`) | Structural | Site header from the nav reference page: brand, menu sections, tools | Desktop logo bar; tablet / mobile full-screen menu | Through the nav page | Active | [README](./header/README.md) |
| [Hero](./hero/README.md) (`hero`) | Container | Full-width banner with image or Lottie, title, description and CTAs | Views, nine positions, BG Color, animation | Yes | Active | [README](./hero/README.md) |
| [Image Collage](./image-collage/README.md) (`image-collage`) | Container | Centred eyebrow, title, description and CTAs on a dark background framed by up to nine floating decorative images | Title weight, description size, eyebrow style, CTA styles, backgrounds and shapes, image treatment | Yes | Active (Proposed, KB-D-058) | [README](./image-collage/README.md) |
| [Interactive Dashboard](./interactive-dashboard/README.md) (`interactive-dashboard`) | Independent | Reserved for a future dashboard; renders nothing on the site | — | Yes | Experimental (placeholder) | [README](./interactive-dashboard/README.md) |
| [List](./list/README.md) (`list`) | Container | Child pages, a fixed list or tagged pages from the query index, as cards or links | Sources, card styles, layout per breakpoint, rows | Yes | Active | [README](./list/README.md) |
| [Media Contacts](./media-contacts/README.md) (`media-contacts`) | Independent | The media contacts of the locale's Media Contacts sheet, grouped by designation and region | Title and Title Type; contacts of the page's region, else all | Yes | Active | [README](./media-contacts/README.md) |
| [Modal](./modal/README.md) (`modal`) | Independent | Opens a page's content in a dialog (button or auto-linked /modal/ links) | Trigger button; auto-linked | Yes | Active | [README](./modal/README.md) |
| [Page Header](./page-header/README.md) (`page-header`) | Container | The title area of a page from its metadata (title, description, tags, author, dates) | Layouts by page type | Yes | Active | [README](./page-header/README.md) |
| [Quote](./quote/README.md) (`quote`) | Independent | A quotation with author, optional image and title | Image position, BG Color | Yes | Active | [README](./quote/README.md) |
| [Separator](./separator/README.md) (`separator`) | Independent | A divider line between content | Variants, widths per breakpoint, theme, motion | Yes | Active | [README](./separator/README.md) |
| [Tab](./tab/README.md) (`tab`) | Child item | Starts a tab panel in a Tabs Container | Columns per row of its Column Breaks | Yes | Active | [README](./tab/README.md) |
| [Table](./table/README.md) (`table`) | Container | A data table of rows with 1–9 columns | Header row, column counts | Yes | Active | [README](./table/README.md) |
| [Table List](./table-list/README.md) (`table-list`) | Container | A numbered list of linked items (industries, services) | Variations, item actions, numbers | Yes | Active | [README](./table-list/README.md) |
| [Tabs](./tabs/README.md) (`tabs`) | Container (section) and block | Tabs Container section (Tab items and content) and the Tabs block (tabs of fragments) | Styles, alignment, orientation | Yes | Active | [README](./tabs/README.md) |
| [TCS Header](./tcs-header/README.md) (`tcs-header`) | Independent | The TCS and TATA logos of the header, on the nav page | — | Yes | Active | [README](./tcs-header/README.md) |
| [Teaser](./teaser/README.md) (`teaser`) | Container | Title, text, image and links in one of four layouts | Layouts (Image & Text, Text split, Background image, Card), image positions, BG Color, styles | Yes | Active | [README](./teaser/README.md) |
| [Testimonial](./testimonial/README.md) (`testimonial`) | Container | A client testimonial with author, image and stats | BG Color, show / hide options | Yes | Active | [README](./testimonial/README.md) |
| [Video](./video/README.md) (`video`) | Independent | A DAM, YouTube or Vimeo video inline or in a pop-up, with poster and captions | Inline or pop-up, autoplay / loop options | Yes | Active | [README](./video/README.md) |

<!-- END GENERATED: inventory -->

Type: Independent (a block on its own), Container (a block with child items), Container (section) (a section the code turns into a block), Child item (only inside its parent), Structural (site chrome or page structure). Status: Active, Compatibility-only (kept for content authored before, not offered for new content), Experimental (placeholder, not for live pages).

## Blocks by Category

<!-- BEGIN GENERATED: categories (npm run build:docs) -->

| Category | Blocks |
| -------- | ------ |
| Content | [Button](./button-block/README.md), [Hero](./hero/README.md), [Image Collage](./image-collage/README.md), [Page Header](./page-header/README.md), [Quote](./quote/README.md), [Table](./table/README.md), [Teaser](./teaser/README.md), [Testimonial](./testimonial/README.md) |
| Layout | None: layout is provided by the section containers (Columns Container, Tabs, Gen Carousel) and the Section Style |
| Navigation | [Anchor List](./anchor-list/README.md), [Footer](./footer/README.md), [Header](./header/README.md), [TCS Header](./tcs-header/README.md) |
| Listing | [Cards](./cards/README.md), [Filter List](./filter-list/README.md), [List](./list/README.md), [Media Contacts](./media-contacts/README.md), [Table List](./table-list/README.md) |
| Interactive | [Accordion](./accordion/README.md), [Conversation Canvas](./conversation-canvas/README.md), [Form Variations](./form-variations/README.md), [Modal](./modal/README.md) |
| Media | [Embed](./embed/README.md), [Video](./video/README.md) |
| Structural | [Separator](./separator/README.md) |
| Container (section) | [Columns Container](./columns-container/README.md), [Gen Carousel](./gen-carousel/README.md), [Tabs](./tabs/README.md) |
| Child item | [Column Break](./column-break/README.md), [Tab](./tab/README.md) |
| Personalization | None: no personalization runtime (Target, AJO) is implemented; see the Personalization section of each README |
| Utility | [Fragment](./fragment/README.md), [Interactive Dashboard](./interactive-dashboard/README.md) |
| Deprecated / compatibility-only | [Columns](./columns/README.md) |

<!-- END GENERATED: categories -->

Default content (Text, Title, Image) is authored with AEM's built-in components, not blocks; see the handover chapters 6.6 to 6.8.

## Container and Child Relationships

<!-- BEGIN GENERATED: relationships (npm run build:docs) -->

| Container | Filter | Allowed children |
| --------- | ------ | ---------------- |
| [Accordion](./accordion/README.md) (`accordion`) | `accordion` | Accordion Item (`accordion-item`) |
| [Anchor List](./anchor-list/README.md) (`anchor-list`) | `anchor-list` | Anchor Link (`anchor-list-item`) |
| [Cards](./cards/README.md) (`cards`) | `cards` | Card (`card`) |
| [Columns Container](./columns-container/README.md) (`columns-container`) | `columns-container` | [Column Break](./column-break/README.md) (`column-break`), Text (`text`), Image (`image`), [Button](./button-block/README.md) (`button-block`), Title (`title`), [Hero](./hero/README.md) (`hero`), [Teaser](./teaser/README.md) (`teaser`), [Image Collage](./image-collage/README.md) (`image-collage`), [Quote](./quote/README.md) (`quote`), [Media Contacts](./media-contacts/README.md) (`media-contacts`), [Testimonial](./testimonial/README.md) (`testimonial`), [Anchor List](./anchor-list/README.md) (`anchor-list`), [Accordion](./accordion/README.md) (`accordion`), [Tabs](./tabs/README.md) (`tabs-block`), [Table](./table/README.md) (`table`), [Table List](./table-list/README.md) (`table-list`), [List](./list/README.md) (`list`), [Separator](./separator/README.md) (`separator`), [Embed](./embed/README.md) (`embed`), [Video](./video/README.md) (`video`), [Modal](./modal/README.md) (`modal`), [Form Variations](./form-variations/README.md) (`form-variations`), [Filter List](./filter-list/README.md) (`filter-list`), [Conversation Canvas](./conversation-canvas/README.md) (`conversation-canvas`), [Cards](./cards/README.md) (`cards`), [Fragment](./fragment/README.md) (`fragment`) |
| [Conversation Canvas](./conversation-canvas/README.md) (`conversation-canvas`) | `conversation-canvas` | Conversation Canvas Button (`conversation-canvas-button`) |
| [Filter List](./filter-list/README.md) (`filter-list`) | `filter-list` | Filter Tag (`filter-list-tag`), Filter Category (`filter-list-category`), Filter Page (`filter-list-page`) |
| [Footer](./footer/README.md) (`footer`) | `footer` | Footer Link (`footer-link`) |
| [Form Variations](./form-variations/README.md) (`form-variations`) | `form-variations` | Text Input Field (`field-text`), Dropdown / Select Field (`field-select`), Combined Input Field (`field-combined`), Textarea Field (`field-textarea`), Consent Checkbox Field (`field-checkbox`), Contact Card Output (`contact-card`), Submit Button (`field-submit`) |
| [Gen Carousel](./gen-carousel/README.md) (`gen-carousel`) | `gen-carousel` | [Hero](./hero/README.md) (`hero`), [Teaser](./teaser/README.md) (`teaser`) |
| [Hero](./hero/README.md) (`hero`) | `hero` | CTA (`hero-cta`) |
| [Image Collage](./image-collage/README.md) (`image-collage`) | `image-collage` | Collage image item (`image-collage-item`) |
| [List](./list/README.md) (`list`) | `list` | List Item (`list-item`) |
| [Page Header](./page-header/README.md) (`page-header`) | `page-header` | CTA (`page-header-cta`) |
| [Table](./table/README.md) (`table`) | `table` | Row (`table-row`) |
| [Table List](./table-list/README.md) (`table-list`) | `table-list` | Table List Item (`table-list-card`) |
| [Tabs Container](./tabs/README.md) (`tabs`) | `tabs` | [Tab](./tab/README.md) (`tab`), [Column Break](./column-break/README.md) (`column-break`), Text (`text`), Image (`image`), [Button](./button-block/README.md) (`button-block`), Title (`title`), [Hero](./hero/README.md) (`hero`), [Teaser](./teaser/README.md) (`teaser`), [Image Collage](./image-collage/README.md) (`image-collage`), [Quote](./quote/README.md) (`quote`), [Media Contacts](./media-contacts/README.md) (`media-contacts`), [Testimonial](./testimonial/README.md) (`testimonial`), [Anchor List](./anchor-list/README.md) (`anchor-list`), [Accordion](./accordion/README.md) (`accordion`), [Table](./table/README.md) (`table`), [Table List](./table-list/README.md) (`table-list`), [List](./list/README.md) (`list`), [Separator](./separator/README.md) (`separator`), [Embed](./embed/README.md) (`embed`), [Video](./video/README.md) (`video`), [Modal](./modal/README.md) (`modal`), [Form Variations](./form-variations/README.md) (`form-variations`), [Filter List](./filter-list/README.md) (`filter-list`), [Cards](./cards/README.md) (`cards`), [Fragment](./fragment/README.md) (`fragment`), Tabs (`tabs-block`) |
| [Tabs](./tabs/README.md) (`tabs-block`) | `tabs-block` | Tab (`tabs-item`) |
| [Teaser](./teaser/README.md) (`teaser`) | `teaser` | Link (`teaser-link`), Stat (`teaser-stat`), Collage image (`teaser-collage-image`) |
| [Testimonial](./testimonial/README.md) (`testimonial`) | `testimonial` | Stat (`testimonial-stat`) |

<!-- END GENERATED: relationships -->

- **Items** (Accordion Item, Anchor Link, Card, CTA, Link, Stat, List Item, Table List Item, Filter Tag / Category / Page, Footer Link, form fields, Table rows, Canvas buttons) are rows of their block: AEM renders each item as a row with a cell per field after the block's own rows, and `itemRows` (`utils/cells.js`) finds them. They have no folder of their own and are documented in their block's README.
- **Section containers**: a [Columns Container](./columns-container/README.md) holds [Column Breaks](./column-break/README.md) and the components of each column; a [Tabs Container](./tabs/README.md) holds [Tabs](./tab/README.md) (and Column Breaks inside a tab); a [Gen Carousel](./gen-carousel/README.md) holds Heroes and Teasers as slides. A section can't hold a section, so columns inside a tab are Column Breaks, not a Columns Container.
- **Site chrome**: the [Header](./header/README.md) loads the nav page (with its [TCS Header](./tcs-header/README.md) and an optional [Conversation Canvas](./conversation-canvas/README.md)); the [Footer](./footer/README.md) loads the footer page. Both use the [Fragment](./fragment/README.md) loader.

## Shared Conventions

| Area | Convention | Where |
| ---- | ---------- | ----- |
| Authoring | Repeating content is items added with Add; models have at most three tabs, the last one Additional; no sample content in templates or model defaults (they are stored on every new component) | [AGENTS.md](../AGENTS.md) "Dialog tabs", "Item children", "AEM delivery rules" |
| Delivery | Fields ending in Text, Title, Type, Alt or MimeType collapse into their base field; grouped fields (`prefix_name`) aren't delivered in key-value blocks; sections don't get their `classes_*` fields (container sections use `container*` fields) | [AGENTS.md](../AGENTS.md) "AEM delivery rules" |
| Shared code | Behaviour shared by blocks lives in single-purpose modules: decorators build elements, utils build no UI; blocks don't re-implement them | [decorators/README.md](../decorators/README.md), [utils/README.md](../utils/README.md) |
| Accessibility | WCAG 2.1 AA: real buttons with `aria-expanded` / `aria-controls`, Escape closes popups, pause / play for moving content, links opening a new tab say so, form errors next to their field, UI text from placeholders | [AGENTS.md](../AGENTS.md) "Accessibility" |
| Data layer and analytics | Every block is in the Adobe Client Data Layer (`window.adobeDataLayer`); clicks, show / hide, media, search, submit and change events are captured centrally from `data-cmp-*` attributes; blocks push only state the central code can't know. Adobe Tags and the Web SDK aren't configured yet | [decorators/data-layer-decorator.js](../decorators/data-layer-decorator.js), handover Part 11 |
| Personalization | No personalization runtime (Adobe Target, AJO) is implemented; blocks render their authored default content | Each README, "Personalization" |
| Backgrounds and theme | Teaser BG Color, Columns Container BG Color and Section Style share labels, classes (`bg-grey`, `bg-dark`, `bg-dark-green`) and tokens, and set only the colour; dark backgrounds turn the text, link and focus tokens light | [AGENTS.md](../AGENTS.md) "Backgrounds and theme", `styles/styles.css` |
| Animation | Additional tab Animation Type, Motion Speed, Animation Trigger (and Background animation on blocks with a background); nothing plays in edit mode or for reduced motion | [docs/animation/README.md](../docs/animation/README.md) |
| Responsive / CSS | Mobile first, `min-width` media queries at 600, 900 and 1200 px; sizes in rem; selectors scoped to the block | [AGENTS.md](../AGENTS.md) "CSS" |
| Performance | Three-phase loading; data blocks render through a skeleton after 150 ms; module and stylesheet preloading; no forced layout while decorating | [AGENTS.md](../AGENTS.md) "Module preloading", handover 1.7.1 |
| Testing | Unit tests for pure modules (`npm test`, `test/**/*.test.mjs`); lint (`npm run lint`, including the xwalk model rules); block library pages for every variation | [test/](../test/), handover Part 13 |

## Deprecated Blocks

| Block | Status | Replacement | Migration |
| ----- | ------ | ----------- | --------- |
| [Columns](./columns/README.md) (`columns`) | Compatibility-only: no longer offered in any component filter; the definition stays so Columns authored before render and stay editable | [Columns Container](./columns-container/README.md) with [Column Breaks](./column-break/README.md) (in a Tabs Container: Column Breaks in the tab) | Rebuild each Columns as a Columns Container section (Columns per row = its columns, a Column Break per column with the column's content); see the Columns README |
| [Interactive Dashboard](./interactive-dashboard/README.md) (`interactive-dashboard`) | Experimental placeholder: renders nothing on the site and is in no component filter | None yet | Don't use on live pages; the existing library instance stays editable |

The built-in Button component ("Button (basic)") is also no longer offered; its replacement is the [Button](./button-block/README.md) block (see AGENTS.md "Button").

## Maintaining This Documentation

1. After changing a block's model, run `npm run build:json`, then `npm run build:docs`: the field tables, screenshots, file and usage sections of the READMEs (and the tables above) are rewritten from the repository.
2. Edit the written sections of the block's README in the same change; keep `tools/docs/blocks.json` (status, type, purpose, relationships) in step.
3. `npm test` (test/docs) checks that every block folder has a README, that the generated sections are current and that the links and anchors resolve.
4. Record the change in the README's Change History and, for significant changes, in the handover (component chapter, findings, revision history).
