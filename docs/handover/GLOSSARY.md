---
id: "DOC-006"
title: "Glossary"
role: "Documentation"
topic: ""
audience: "Every role"
owner: "Documentation Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Glossary

| Attribute | Value |
| --- | --- |
| Document ID | DOC-006 |
| Audience | Every role |
| Purpose | Terms, Adobe terms, identifiers and acronyms |
| Scope | — |
| Prerequisites | — |
| Owner | Documentation Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Authoring and Content Model](#authoring-and-content-model)
- [Site Structure and Site Data](#site-structure-and-site-data)
- [Delivery and Loading](#delivery-and-loading)
- [Animation, Theme and Shared Behaviour](#animation-theme-and-shared-behaviour)
- [Block Names](#block-names)
- [Adobe Terms](#adobe-terms)
- [Identifiers](#identifiers)
- [Acronyms](#acronyms)
- [Related](#related)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Authoring and Content Model

| Term | Definition |
| --- | --- |
| xwalk | AEM authoring for Edge Delivery Services ("crosswalk"): content authored in AEM with Universal Editor and delivered by Edge Delivery Services; the project is based on `adobe-rnd/aem-boilerplate-xwalk` |
| Universal Editor (UE) | The AEM visual, in-context editor the authors use. Its dialogs come from the component models |
| Component definition / model / filter | Entries of the generated [component-definition.json](https://github.com/sradha-tcs/tcs-corp/blob/main/component-definition.json) (what can be inserted, with its template), [component-models.json](https://github.com/sradha-tcs/tcs-corp/blob/main/component-models.json) (the dialog fields) and [component-filters.json](https://github.com/sradha-tcs/tcs-corp/blob/main/component-filters.json) (which components a container accepts), built from `blocks/*/_*.json` and `models/_*.json` by `npm run build:json` |
| Template name / block class | AEM renders a block with the class of its definition's template name (class-name form), not its component id; a template name must name a block folder (tested by [test/models/block-names.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/models/block-names.test.mjs)) |
| Key-value block | A block whose model renders as rows of property name and value (template `"key-value": true`), read with `readProperties` ([utils/properties.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/properties.js)) |
| Positional block | A block that isn't key-value: one row per field; AEM adds an empty row for each dialog tab, so rows are read by `data-aue-prop` in the editor and empty tab rows are skipped |
| Field collapse | A field whose name ends in Text, Title, Type, Alt or MimeType is rendered into its base field (e.g. `linkType` becomes bold / italic around the link); values that must be read get another name (`buttonVariant`, `titleHidden`) |
| Grouped field (element grouping) | Fields sharing a `prefix_` rendered into one cell; not delivered in key-value blocks, so plain names are used (Video `poster` / `posterAlt`) |
| `classes_*` fields | Fields delivered as block classes (the Additional tab, Animation Type, Columns per row); sections don't get them delivered |
| `container*` fields | The Additional tab fields of the container sections (`containerAnchor`, `containerHide`, `containerAnimation*`, `containerPadding*`, `containerMargin*`, `containerBgColor`), delivered as section data attributes and turned into the synthetic block's classes by `applySectionBlockOptions` ([scripts/scripts.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/scripts.js)) |
| Dialog tabs | At most three short tabs per model, the last one Additional (Universal Editor collapses tabs that don't fit into a dropdown) |
| Additional tab | The last tab of every block model except header and footer: Anchor ID (`anchor-…`), Hide block, Padding / Margin (the `--space-*` tokens), Animation Type, Motion Speed, Animation Trigger and, on blocks with a background, Background animation ([decorators/block-options-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/block-options-decorator.js)) |
| Anchor ID / Anchor name | Anchor ID: an Additional tab value `anchor-…` that becomes the block's id (de-duplicated `-2`, `-3`); Anchor name: a section property used by the Anchor List |
| Hide block | Additional tab toggle: the block is hidden on the page and dimmed and outlined in Universal Editor |
| Item / item children | Repeating content added to a block with Add (List Item, Card, CTA, Link, Stat, Anchor Link, Filter Tag / Category / Page, Footer Link, form fields, Table rows, Canvas buttons), instead of composite multifields; the blocks still read the multifields authored before ([utils/multifield.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/multifield.js)) |
| Item rows | AEM renders each item as a row with a cell per field (empty and tab cells included) after the block's own rows; an item row whose model has a `classes` field starts with a cell "node name, classes". Found by `itemRows` ([utils/cells.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/cells.js)) |
| Item placeholder | An item without content yet, shown as a dashed placeholder in the editor (`itemEditorHint`, [decorators/editor-item-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/editor-item-decorator.js)) |
| Template values | Values in a component definition's template are stored on every new component, so templates and model defaults carry no sample content |
| Default content | Text, Title and Image (AEM built-in components) authored directly in a section |
| Button Block | The Button authors add (`blocks/button-block`, title "Button"): every option is delivered. "Button (basic)" is AEM's built-in Button, kept only for content authored before |
| Section | A horizontal part of a page with default content and blocks; properties Style (Default, Grey, Dark, Dark Green), Width, Rounded edge, Background Image and alt, Anchor name ([models/_section.json](https://github.com/sradha-tcs/tcs-corp/blob/main/models/_section.json)) |
| Section container | A section the code wraps in a synthetic block: Columns Container, Tabs Container, Gen Carousel. A section can't hold a section |
| Synthetic block | The block element `scripts.js` creates around a container section's content (e.g. `buildColumnsSections`) |
| Column Break | The item that starts each column of a Columns Container, or of a tab in a Tabs Container |
| Compatibility-only | A component kept so content authored before renders and stays editable, but no longer offered (Columns, Button (basic)) |
| Block library | Author-only pages per locale (`block-library/`) with every block variation; excluded from publishing (the language master's is published for the review, `noindex`) |
| Curated design pages | Library pages that rebuild Figma page designs from blocks (e.g. Home, Insights), used for validation (handover 2.27, 2.31) |
| Content package (1.0.x) | A numbered package of block library and curated page content migrated and published together (e.g. 1.0.10, 1.0.13; handover revision history) |
| Site Global Templates | Author-only template pages (`/content/tcs-corp/site-global-templates/`) authors copy |
| Page Type / template | The page property (or `page-type` metadata) that selects a template in `templates/` (home, article, blog, press-release) and becomes a body class |
| Lotto / Lottie | The "Lotto" image type plays a Lottie animation (`.json`) with the vendored player `scripts/lib/lottie/` |

## Site Structure and Site Data

| Term | Definition |
| --- | --- |
| Locale / locale site | One of the 13 country / language sites under `/content/tcs-corp/{country}/{language}`, published at a language-only path (`/en`, `/de-de`, ...); `LOCALES` in [utils/site.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/site.js) |
| Locale Home | The locale page itself (e.g. `/content/tcs-corp/de/de-de`), published as `/de-de/index`, served at `/de-de/` |
| Language master | `/content/tcs-corp/language-masters/en`, the rollout source of `/en`; temporarily published at `/language-masters/en` for review |
| Review root | A published root whose pages behave like a locale site during the review (`REVIEW_ROOTS`, with `REVIEW_SHEETS`, `REVIEW_PAGES`); temporary |
| References | The locale folder `references/` with the nav page, footer page and other fragments |
| Nav page | The page the Header loads (`references/nav` by default): brand, sections (the menu) and tools, with a TCS Header block and optionally a header Canvas |
| Inherited metadata | Navigation, Footer and 404 Page taken from the page, else the nearest parent page up to the locale Home, else the locale default ([utils/inherited-metadata.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/inherited-metadata.js)) |
| Path mapping | [paths.json](https://github.com/sradha-tcs/tcs-corp/blob/main/paths.json): AEM paths to published paths, includes and excludes; applied through the site configuration's `public.json` |
| Sheet | An AEM spreadsheet published as JSON: placeholders, metadata, redirects and the data sheets |
| Placeholders | UI text per locale (`/{locale}/placeholders.json`, Key and Text), read with `getPlaceholders` and always an English fallback ([utils/placeholders.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/placeholders.js)) |
| Bulk metadata | Metadata for many pages by URL pattern in the locale's `metadata` sheet; applied only once listed in the site configuration's `metadata.source` |
| Data sheets | `data/authors`, `locations`, `partners`, `social-links`, `media-contacts` per locale ([utils/data.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/data.js)) |
| Taxonomy | The locale's taxonomy page (tag IDs to titles, `/{locale}/taxonomy.json`), with labels derived from tag IDs as fallback ([utils/taxonomy.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/taxonomy.js)) |
| Redirects sheet | `/{locale}/redirects.json`; not applied by the platform (only a root `/redirects.json` is); the List resolves its links through it |
| Query index | `/query-index.json`: the published pages with the metadata columns of [helix-query.yaml](https://github.com/sradha-tcs/tcs-corp/blob/main/helix-query.yaml); one index for all locales, filtered by locale root. AEM author has no query index (`isAuthor`) |
| Error page | The authored, inherited 404 page loaded by `404.html` (`loadErrorPage`); 403 / 500 pages are authored for a CDN only |

## Delivery and Loading

| Term | Definition |
| --- | --- |
| Edge Delivery Services (EDS) | The Adobe service that renders pages from the published content and the repository code and serves them from its CDN (`*.aem.page`, `*.aem.live`) |
| xwalk delivery bridge | The AEM author endpoint in [fstab.yaml](https://github.com/sradha-tcs/tcs-corp/blob/main/fstab.yaml) through which Edge Delivery receives the authored pages as markup |
| Content bus / media bus / code bus | Edge Delivery storage of previewed and published content, of images (served as `/media_…`) and of the code of each branch |
| Preview / live | The two content states: preview on `*.aem.page`, live (published) on `*.aem.live` and a future production domain |
| AEM Code Sync | The GitHub App that copies every pushed commit to the code bus of its branch |
| Admin API | The Edge Delivery HTTP API (`admin.hlx.page`) for preview, publish, cache, index, sitemap, status, log and configuration operations |
| Site configuration | The Edge Delivery configuration service entry of `sradha-tcs/tcs-corp` (`public.json` paths, `metadata.source`, access) |
| AEM Sidekick | Browser extension for preview / live pages; configured by [tools/sidekick/config.json](https://github.com/sradha-tcs/tcs-corp/blob/main/tools/sidekick/config.json) |
| Local preview / library preview renderer | `aem up` on `localhost:3000`; the delivery workspace's `.home-work/render-lib.mjs` (local, not in git) reproduces the AEM delivery rules for the block library |
| Three-phase loading | Eager (decorate, template, first section to LCP), lazy (other sections, header, footer, lazy styles, fonts, shared data), delayed (3 seconds later, `scripts/delayed.js`) ([AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#three-phase-page-loading)) |
| Module preloading | `head.html` modulepreload links for the modules `scripts.js` imports, and `preloadBlockModules` for each block's modules and stylesheet from the generated module graph |
| Module graph | [scripts/module-graph.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/module-graph.js), generated by `npm run build:modules`, checked by `npm test` |
| Shared data prefetch | `prefetchData` in `scripts.js`: on pages with a List, Filter List or Canvas the query index, taxonomy (and redirects) load when the lazy phase begins |
| Header space reservation | `--header-reserved` (styles) and the remembered header height per breakpoint ([utils/header-space.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/header-space.js)) keep the page from shifting when the header loads |
| Fallback font faces | `inter-fallback`, `inter-fallback-roboto`, `inter-fallback-dejavu` in `styles/styles.css`: system fonts scaled to Inter, so text doesn't reflow when Inter arrives |
| RUM / Operational Telemetry | `sampleRUM` in [scripts/aem.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/aem.js) sends sampled checkpoints to `ot.aem.live`; `404.html` sends a `404` checkpoint |

## Animation, Theme and Shared Behaviour

| Term | Definition |
| --- | --- |
| Animation Type | Additional tab content animation (`classes_animation`): Fade in / up / down / left / right, Slide up / down / left / right, Scale in |
| Motion Speed / Animation Trigger | `classes_animationspeed` (Medium 1000 ms, `motion-fast` 500 ms, `motion-slow` 2000 ms) and `classes_animationtrigger` (On Scroll by default, `motion-on-load`); shown once an animation is chosen |
| Background animation | `classes_bganimation` on Hero, Teaser, Quote, Testimonial, Form Variations and Conversation Canvas: Fade in, Reveal, Wipe left to right / right to left / bottom to top, Scale reveal |
| Skeleton | A block-shaped placeholder shown when a block's data takes longer than 150 ms (`renderWhenLoaded`, `skeletonWhile` in [decorators/skeleton-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/skeleton-decorator.js)) |
| BG Color / Section Style colours | Teaser BG Color, Columns Container `containerBgColor` and Section Style share Default, Grey, Dark, Dark green (`bg-grey`, `bg-dark`, `bg-dark-green`) and set only the colour |
| Theme contract | In `styles/styles.css`: on the dark Section and Columns Container backgrounds the text, link and focus tokens turn light, running-text links are underlined, buttons are inverted; a Grey Teaser or Columns Container inside resets them |
| Floating Canvas journey | One floating Conversation Canvas shared by the header, body and footer Canvases, with the states initial, floating, section-docked, floating-after-section, footer-docked and hidden (`<html data-canvas-journey-state>`; [blocks/conversation-canvas/canvas-journey.js](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/conversation-canvas/canvas-journey.js)) |
| Header Canvas | A Conversation Canvas on the nav page, hosted by the header (`.nav-canvas`) |
| `header:menu` | Event the header dispatches with `detail.open`; the Canvas journey is hidden while the menu is open |
| `tabs:reveal` | Bubbling event that opens the tab(s) holding its target (deep links, Anchor List) |
| `form-variations:submit` | Event dispatched on a valid form submit; integrations call `detail.respondWith(promise)`. No back end is connected |
| `conversation-canvas:search` | Event dispatched by a Canvas search; no listener exists in the code base |
| New-tab announcement | `announceNewTab` ([decorators/link-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/link-decorator.js)): a link opening a new tab says so |

## Block Names

Status from [blocks/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/README.md); each name links to its README.

| Block (folder) | Meaning | Status |
| --- | --- | --- |
| [Accordion](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/accordion/README.md) (`accordion`) | Expandable panels on native details / summary | Active |
| [Anchor List](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/anchor-list/README.md) (`anchor-list`) | In-page navigation to section anchors, optionally sticky | Active |
| [Button](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/button-block/README.md) (`button-block`) | A link styled as a button, icon button or link button | Active |
| [Cards](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/cards/README.md) (`cards`) | Manually authored cards with the List's presentation | Active |
| [Column Break](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/column-break/README.md) (`column-break`) | Starts a column in a Columns Container or a tab | Active |
| [Columns](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns/README.md) (`columns`) | The built-in Columns block (default content only) | Compatibility-only |
| [Columns Container](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns-container/README.md) (`columns-container`) | A section laid out in columns of content and blocks | Active |
| [Conversation Canvas](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/conversation-canvas/README.md) (`conversation-canvas`) | Search prompt with quick actions; the floating journey | Active |
| [Embed](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/embed/README.md) (`embed`) | YouTube, Vimeo, X and other embeds behind a facade | Active |
| [Filter List](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/filter-list/README.md) (`filter-list`) | Filterable listing of the locale's pages from the query index | Active |
| [Footer](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/footer/README.md) (`footer`) | The footer bar on the footer reference page | Active |
| [Form Variations](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/form-variations/README.md) (`form-variations`) | Forms built from field items | Active |
| [Fragment](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/fragment/README.md) (`fragment`) | Includes another page's sections | Active |
| [Gen Carousel](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/gen-carousel/README.md) (`gen-carousel`) | A section whose Heroes or Teasers rotate as slides | Active |
| [Header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/header/README.md) (`header`) | Site header built from the nav page | Active |
| [Hero](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/hero/README.md) (`hero`) | Full-width banner with image or Lottie, title, CTAs | Active |
| [Interactive Dashboard](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/interactive-dashboard/README.md) (`interactive-dashboard`) | Reserved; renders nothing on the site | Experimental |
| [List](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/list/README.md) (`list`) | Child pages, a fixed list or tagged pages as cards or links | Active |
| [Modal](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/modal/README.md) (`modal`) | Opens a page's content in a dialog (also `/modals/` links) | Active |
| [Page Header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/page-header/README.md) (`page-header`) | The title area of a page from its metadata | Active |
| [Quote](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/quote/README.md) (`quote`) | A quotation with author and optional image | Active |
| [Separator](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/separator/README.md) (`separator`) | A divider line | Active |
| [Tab](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tab/README.md) (`tab`) | Starts a tab panel in a Tabs Container | Active |
| [Table](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/table/README.md) (`table`) | A data table of 1–5 columns | Active |
| [Table List](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/table-list/README.md) (`table-list`) | A numbered list of linked items | Active |
| [Tabs](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tabs/README.md) (`tabs`) | The Tabs Container section and the Tabs block (`tabs-block`) | Active |
| [TCS Header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tcs-header/README.md) (`tcs-header`) | The TCS and TATA logos of the header, on the nav page | Active |
| [Teaser](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/teaser/README.md) (`teaser`) | Title, text, image and links in one of four layouts | Active |
| [Testimonial](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/testimonial/README.md) (`testimonial`) | A client testimonial with author, image and stats | Active |
| [Video](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/video/README.md) (`video`) | A DAM, YouTube or Vimeo video inline or in a pop-up | Active |

## Adobe Terms

| Term | Definition | Status on this project |
| --- | --- | --- |
| ACDL (Adobe Client Data Layer) | The `window.adobeDataLayer` array of state entries and events | Active: populated centrally by [decorators/data-layer-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/data-layer-decorator.js) (page, one entry per block, Core Components schema) |
| Core Components schema | The AEM Core Components data layer shape (`@type`, `parentId`, `dc:title`, `xdm:linkURL`, ...) used for the entries | Active |
| `cmp:*` events | `cmp:click`, `cmp:show`, `cmp:hide`, `cmp:media`, `cmp:search` (redacted term), `cmp:submit` (field names, never values), `cmp:change` | Active |
| `data-cmp-*` attributes | `data-cmp-interaction`, `data-cmp-value`, `data-cmp-position`, `data-cmp-id`: how blocks describe clicks for the central code | Active |
| Adobe Tags (Data Collection, formerly Launch) | Tag manager that would read the data layer | Not configured (blocked: measurement plan); `scripts/delayed.js` is the documented place for its embed |
| AEP Web SDK (alloy) | The Experience Platform JavaScript library | Not configured |
| Edge Network / datastream | Adobe Experience Platform's collection endpoint and its configuration | Not configured |
| XDM (Experience Data Model) | The AEP schema standard; the data layer uses some `xdm:` keys of the Core Components schema | No XDM schema configured |
| Adobe Analytics, CJA (Customer Journey Analytics) | Reporting | Not configured |
| Adobe Target | Testing and personalisation | No integration in the repository |
| AJO (Adobe Journey Optimizer) | Journeys and offers | No integration in the repository |
| Consent management (CMP) | Cookie consent platform | Not implemented |
| Adobe IMS / Admin Console | Author identity and access | In use (author sign-in) |
| AEM Assets (DAM) | `/content/dam/tcs-corp/`; images travel with pages, other files only once published | In use |
| Cloud Manager | AEM as a Cloud Service program management; challenge files in `.well-known/` and `well-known/` | In use; program details not recorded here |

## Identifiers

| Pattern | Meaning | Where |
| --- | --- | --- |
| F-01 … F-107 | Handover findings (F-67 to F-69 not used) with area, impact, recommendation, priority, owner role | Handover Part 16.2 |
| O-01 … O-20 | Open items "To be confirmed" (names, KPIs, domain, configuration, integrations) | Handover Part 16.3 |
| P1 / P2 / P3 | Finding priority: blocks go-live of the feature / fix before or soon after go-live / improvement | Handover Part 16.1 |
| BO-n, PG-n, SC-n | Business objectives, program goals, success criteria | Handover Part 1 |
| D-A-n, D-B-n, D-C-n, D-D-n | Defects of the block ecosystem audit, by code review group (A card lists, B heroes and teasers, C containers, D forms, media and chrome) | [BLOCK-ECOSYSTEM-AUDIT.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/BLOCK-ECOSYSTEM-AUDIT.md) section 10, [audit/blocks/](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/blocks/group-a-card-lists.md) |
| L-n | Audit defects found on the live (published) site | Same register |
| R-A-n … R-D-n, R-L-n | Re-audit defects by review (a–d) and found live after publishing (L) | [REAUDIT-2026-10-20.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/REAUDIT-2026-10-20.md) section 4 |
| D-1 … D-6, C-n, G1 | Cards proposal: open product owner decisions, confirmations to test, groups of existing Cards | [cards-card-refactoring.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/proposals/cards-card-refactoring.md) |
| Handover version (e.g. 2.37) | Revision of the handover document; each row of its revision history names the change | Handover Document Control |

## Acronyms

| Acronym | Meaning |
| --- | --- |
| AEM | Adobe Experience Manager |
| AEP | Adobe Experience Platform |
| AMS | Application Management Services (run support) |
| axe | The axe-core accessibility rule engine used in the audits |
| CDN | Content Delivery Network |
| CI | Continuous Integration (the GitHub Actions "Build" workflow) |
| CLS | Cumulative Layout Shift (NFR: ≤ 0.1) |
| CrUX | Chrome User Experience Report |
| CSP | Content Security Policy |
| CTA | Call to Action |
| CWV | Core Web Vitals (LCP, CLS, INP) |
| DAM | Digital Asset Management (AEM Assets) |
| EDS | Edge Delivery Services |
| INP | Interaction to Next Paint |
| JCR | Java Content Repository (AEM content storage) |
| L1 / L2 / L3 | Support levels |
| LCP | Largest Contentful Paint (NFR: 2.5 s, handover 2.36) |
| NFR | Non-Functional Requirement (handover 1.7) |
| OG | Open Graph metadata |
| PR | Pull request |
| PSI | PageSpeed Insights (target score 100) |
| RACI | Responsible, Accountable, Consulted, Informed |
| RTE | Rich Text Editor |
| RUM | Real Use Monitoring (Edge Delivery Operational Telemetry) |
| SLA | Service Level Agreement (not recorded) |
| TBT | Total Blocking Time (Lighthouse) |
| UE | Universal Editor |
| WCAG | Web Content Accessibility Guidelines (target 2.1 AA) |
| WebVTT | Web Video Text Tracks (captions) |

## Related

- [project-overview.md](./01-architecture/markdown/SOLUTION-ARCHITECTURE.md), [repository-structure.md](./02-development/markdown/REPOSITORY-STRUCTURE.md), [references.md](./09-knowledge-base/llms/SOURCE-OF-TRUTH.md)
- [architecture.md](./01-architecture/markdown/TECHNICAL-ARCHITECTURE.md), [blocks.md](./02-development/markdown/BLOCK-DEVELOPMENT-GUIDE.md), [content-architecture.md](./01-architecture/markdown/CONTENT-ARCHITECTURE.md), [data-layer-and-analytics.md](./02-development/markdown/ANALYTICS-DATA-LAYER-GUIDE.md), [design-system.md](./02-development/markdown/DESIGN-STYLE-GUIDE.md), [personalization.md](./01-architecture/markdown/INTEGRATION-ARCHITECTURE.md)
- [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md): delivery rules, Additional tab, item children, animation, theme
- Handover Part 15 — Appendix (15.1 Glossary, 15.2 Acronyms) and Part 16 — Handover Findings and Open Items Register: [TCS-CORP-HANDOVER.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/handover/TCS-CORP-HANDOVER.md)

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](./SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
