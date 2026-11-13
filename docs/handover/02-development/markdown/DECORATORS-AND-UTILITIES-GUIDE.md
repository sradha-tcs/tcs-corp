---
id: "DEV-008"
title: "Decorators and Utilities Guide"
role: "Development"
topic: ""
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: ["decorators/README.md","utils/README.md"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Decorators and Utilities Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-008 |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | The shared decorators and utilities, their layering and rules |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | decorators/README.md, utils/README.md |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Layering](#layering)
- [Decorators Inventory](#decorators-inventory)
- [Utilities Inventory](#utilities-inventory)
- [Shared Helpers in scripts/](#shared-helpers-in-scripts)
- [Rules for Shared Code](#rules-for-shared-code)
- [Related](#related)
- [Module inventory (from the READMEs)](#module-inventory-from-the-readmes)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Layering

| Layer | Builds UI | May import | Verified |
| --- | --- | --- | --- |
| `scripts/aem.js` | Core decoration (Edge Delivery library) | nothing project-specific | Never modified (AGENTS.md) |
| `utils/` (26 modules) | No | other utils, `scripts/aem.js` (`toClassName`, `getMetadata`, `loadScript`) | **No util imports a decorator** (grep of every `import` in `utils/` at commit 2d06316; the only mentions of `decorators/` are in comments) |
| `decorators/` (28 modules) | Yes (elements, behaviour) | utils, other decorators, `scripts/aem.js`, `scripts/scripts.js` (`moveInstrumentation`) | Yes |
| `scripts/scripts.js` | Page decoration and loading | decorators, utils, `aem.js`, `module-graph.js` | Yes |
| `blocks/`, `templates/` | Blocks and templates | all of the above | Yes |

`scripts/scripts.js` imports seven decorators and some decorators import `moveInstrumentation` from `scripts/scripts.js` (`content-decorator`, `card-list-decorator`, `editor-item-decorator`, `heading-decorator`, `image-decorator`, `stats-decorator`): these are ES module cycles resolved at call time. `responsive-image-decorator.js` is kept free of `scripts.js` imports so `scripts.js` can use it.

```mermaid
flowchart LR
  AEM[scripts/aem.js] --> U[utils/]
  AEM --> D[decorators/]
  U --> D
  U --> S[scripts/scripts.js]
  D --> S
  S --> B[blocks/ and templates/]
  D --> B
  U --> B
  S -. moveInstrumentation .-> D
```

## Decorators Inventory

Status: every decorator is Active (imported by at least one block, template or script). Tests: decorators touch the DOM and have no unit tests; they were validated by the browser runs of the audits (188 pages at 5 widths).

| Name | Path | Purpose | Consumers | Inputs / Outputs | Side effects | Tests | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| a11y | [decorators/a11y-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/a11y-decorator.js) | Visually hidden content for assistive technology | teaser, testimonial, conversation-canvas; link, social-links, card-list decorators | `hideVisually(el)`, `createHiddenText(text)` return the element | Adds `.visually-hidden` | None | Active |
| animation | [decorators/animation-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/animation-decorator.js) | Lottie animations (the "Lotto" image type): loaded near the viewport, paused off screen and for reduced motion, pause / play button | hero, teaser | `createAnimation(path, options)` returns a container with `animationToggle`; `playAnimation(container, path)` | Loads the vendored Lottie player once (`utils/lottie.js`); observers on the container | None | Active |
| article-meta | [decorators/article-meta-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/article-meta-decorator.js) | Published date, reading time, listen / download / share actions, author lockup (Figma "L3 Header") | page-header, teaser, filter-list; card-list decorator | `buildPublished`, `buildReadingTime`, `buildPageActions`, `buildAuthorLockup` return elements | Share button handler (Web Share API, else copies the link to the clipboard) | None | Active |
| author-bio | [decorators/author-bio-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/author-bio-decorator.js) | "About the author" card from the Authors sheet | templates/article (also used by blog through article) | `buildAuthorBio(author, labels)` returns an element | None | None | Active |
| block-options | [decorators/block-options-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/block-options-decorator.js) | Additional tab: an `anchor-…` class becomes the block id (unique, `-2`, `-3`) | `scripts.js` (`decorateMain`), `editor-support.js` | `applyBlockOptions(container)` | Sets `id` on blocks | None | Active |
| button | [decorators/button-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/button-decorator.js) | The single place for button views, types, alignment and states | 13 blocks (button-block, hero, teaser, header, footer, modal, video, ...), `scripts.js`, 5 decorators | `decorateButton(a, options)`, `createButton`, `setButtonDisabled`, `setButtonAlignment`, `removeButtonDecoration` | Classes and ARIA on the element; new-tab hint | None | Active |
| card-list | [decorators/card-list-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/card-list-decorator.js) | Cards of the TCS DS List variations: header, image / panel / report / stat / feature cards, rows, grid or scroll per breakpoint, skeleton, empty state, data layer state | list, cards | `renderCardList(block, config)` and the card renderers, `applyCardListLayout`, `buildCardListSkeleton`, `renderCardListEmpty`, `renderEditorItems`, `cardListId`, `trackCardList` | Replaces block content; scroller; pushes component state | Indirect: `test/cards`, `test/list` (data side), Passed | Active |
| contact-list | [decorators/contact-list-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/contact-list-decorator.js) | Groups of contacts with mail / phone links (Media Contacts sheet) | blocks/media-contacts | `buildContactGroups(groups, { headingLevel, labels })` returns a list, or null without groups | None | Links carry `data-cmp-interaction` email / phone and the group as `data-cmp-value` | Active |
| content-buttons | [decorators/content-buttons-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/content-buttons-decorator.js) | Standalone authored links in content become buttons, icon buttons or link buttons | `scripts.js` (re-exported for `editor-support.js`) | `decorateButtons(container)` | Changes link classes in the container | None | Active |
| content | [decorators/content-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/content-decorator.js) | Moves a property cell's content into a new element, keeping editor instrumentation | teaser, quote, form-variations, testimonial, video, footer | `fromCell(cell, tagName, className)` returns the element | Moves `data-aue-*` attributes | None | Active |
| data-layer | [decorators/data-layer-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/data-layer-decorator.js) | Page, blocks and interactions in the Adobe Client Data Layer (Core Components schema) | `scripts.js`, tabs, modal; skeleton, card-list decorators | `trackPage()`, `trackBlocks(container)`, `trackInteractions()`, `componentIdOf(block)` | Pushes to `window.adobeDataLayer`; document-level capture listeners (click, toggle, close, play, pause, ended, submit, change), registered once; `data-cmp-id`, `data-cmp-tracked` on blocks | Indirect: `test/privacy` (search redaction, contact links), Passed | Active |
| date | [decorators/date-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/date-decorator.js) | `<time>` for authored or page-property dates | filter-list; article-meta decorator | `buildTime(value, format, className)` returns `HTMLTimeElement` or null | None | Indirect: `formatDate` in `test/cards`, Passed | Active |
| editor-item | [decorators/editor-item-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/editor-item-decorator.js) | In Universal Editor, an item the block doesn't render yet (just added) as a selectable placeholder | hero, teaser, testimonial, page-header, anchor-list, accordion, filter-list, footer; stats decorator | `editorItemHint(rows)` (placeholder `itemEditorHint`, loaded only in the editor), `buildEditorItems(rows, hint)` | None on the published page | None | Active |
| heading | [decorators/heading-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/heading-decorator.js) | Heading from a title property and its Title Type | teaser, quote, form-variations, testimonial; card-list decorator | `buildHeading(cell, typeCell, className, fallback)`, `HEADINGS` | Moves instrumentation | None | Active |
| icon-button | [decorators/icon-button-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/icon-button-decorator.js) | Icon-only `<button>`s on the button decorator | conversation-canvas, gen-carousel, modal, embed, video, filter-list; card-list, animation, article-meta decorators | `createIconButton({ label, icon, ... })` returns a button | None | None | Active |
| image | [decorators/image-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/image-decorator.js) | The picture of an image property with its alt field | tcs-header, teaser, quote, testimonial, video | `pictureOf(cell, altCell)` returns `<picture>` or null | Sets `alt` (empty = decorative) | None | Active |
| link | [decorators/link-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/link-decorator.js) | New-tab links and their announcement | teaser, page-header, footer; button, card-list, social-links, author-bio decorators | `setLinkTarget(a, newWindow)`, `announceNewTab(a, hint)` | `target`, `rel`, hidden hint text | None | Active |
| masonry | [decorators/masonry-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/masonry-decorator.js) | Packs grid items of different heights into columns in reading order; native masonry where supported | filter-list | `layoutMasonry(grid)` returns `{ disconnect }` | ResizeObserver and MutationObserver until `disconnect()` | None | Active |
| media | [decorators/media-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/media-decorator.js) | YouTube, Vimeo, iframe and video players built with DOM APIs (no URL in HTML strings) | embed, video | `createFrame`, `createYoutubeFrame`, `createVimeoFrame`, `createVideoElement` return elements | None until inserted | Indirect: `test/media/vimeo-url.test.mjs` (URLs), Passed | Active |
| motion | [decorators/motion-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/motion-decorator.js) | Content and Background animations of the Additional tab, prepared before a section shows, run by one IntersectionObserver | `scripts.js`, fragment, header, footer; skeleton decorator | `prepareMotion(container)`, `releaseMotion(block)` | Loads `styles/motion.css` when needed; one page-wide observer; classes and inline styles removed at the end (safety timeout 4 s); nothing in edit mode or for reduced motion | Indirect: `test/motion/motion.test.mjs` (`utils/motion.js`), Passed | Active |
| responsive-image | [decorators/responsive-image-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/responsive-image-decorator.js) | Image from a URL; site media optimized as `<picture>` | conversation-canvas, page-header, filter-list, `scripts.js`; social-links, card-list, author-bio decorators | `buildImage({ src, alt }, breakpoints)` returns an element | None | None | Active |
| scroller | [decorators/scroller-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/scroller-decorator.js) | Previous / next, indicator, drag and keyboard for a CSS horizontal scroller, active only while it scrolls | card-list decorator | `createScroller(viewport, options)` returns `{ update, scrollToItem, destroy }` | Listeners and a ResizeObserver until `destroy()`; measurements batched in one animation frame (reads, then writes) | None | Active |
| seo | [decorators/seo-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/seo-decorator.js) | Bulk metadata SEO / social columns to the standard head tags, `<html lang>` | `scripts.js` (`loadEager`) | `decorateHead()` | Writes `<title>`, meta and link tags, `lang` | None | Active |
| skeleton | [decorators/skeleton-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/skeleton-decorator.js) | Block-shaped placeholders while data loads; render directly when data is there within 150 ms | list, filter-list, conversation-canvas; card-list decorator | `renderWhenLoaded(block, { data, render, skeleton })`, `skeletonWhile`, `showSkeleton`, `skeletonElement`, `bone` | Timers (150 ms delay, 250 ms minimum); skeleton removed on success and failure | None | Active |
| social-links | [decorators/social-links-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/social-links-decorator.js) | Social Links sheet as an icon list | footer | `buildSocialLinks(links, className, labelOf, newTabHint)` returns a list | None | None | Active |
| stats | [decorators/stats-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/stats-decorator.js) | Stats from Stat items and the legacy Stats multifield, as a description list | teaser, testimonial | `buildStats(cell, prefix, rows, hint)` returns `<dl>` | Moves instrumentation | None | Active |
| tag | [decorators/tag-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/tag-decorator.js) | A list of tag labels | teaser, page-header | `buildTagList(tags, className)` returns `<ul>` or null | None | None | Active |
| template | [decorators/template-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/template-decorator.js) | Structure a Site Global Template adds before decoration (Page Header, loaded sections) | templates/article, templates/press-release (blog through article) | `ensurePageHeader(main)`, `appendLoadedSection(main, className, build)` | Adds sections to `main` | None | Active |

## Utilities Inventory

Status: every util is Active. "Passed" means the listed test file passed in `npm test` (311 tests) at commit 2d06316.

| Name | Path | Purpose | Consumers | Inputs / Outputs | Side effects | Tests | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| analytics | [utils/analytics.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/analytics.js) | Adobe Client Data Layer pushes (Core Components schema); never throws | tabs, separator, gen-carousel, modal; data-layer, card-list decorators | `pushToDataLayer(entry)` returns a boolean; `pushComponents(map)`, `pushComponentEvent(event, id, info)` | Creates / pushes to `window.adobeDataLayer` | None | Active |
| buttons | [utils/buttons.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/buttons.js) | Button vocabulary and reading button options from authored link markup | button-block, conversation-canvas, tabs, hero, table-list; button, content-buttons, card-list decorators | `BUTTON_VIEWS`, `BUTTON_TYPES`, `BUTTON_ALIGNMENTS`, `pick`, `readButtonOptions(a)` | None (pure) | None | Active |
| card-list-config | [utils/card-list-config.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/card-list-config.js) | Presentation settings of List and Cards without the DOM: defaults, validation, card style / colour precedence | list (`list.js`, `list-data.js`), cards (`cards.js`, `cards-data.js`), filter-list; card-list decorator | `normalizePresentation(read)`, `kindOf`, `themeOf`, option lists, `isSafeUrl`, `isExternal`, `toISODate`, `toSafeId`, `hash`, `normalizePath` | None (pure) | `test/cards/cards-data.test.mjs`, `test/list/*`, Passed | Active |
| cells | [utils/cells.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/cells.js) | Item rows of a block, tab cells, cells matched to model fields | 11 blocks (list, cards, tabs, hero, teaser, testimonial, page-header, anchor-list, filter-list, footer, table-list) | `itemRows(block, models, isItem)`, `KEY_VALUE_ITEM`, `FIELD_ROW_ITEM`, `withoutTabCells(cells, layout)`, `matchCells(cells, fields, matchers)` | None (pure) | `test/items/item-rows.test.mjs`, `test/list/list-data.test.mjs`, Passed | Active |
| data | [utils/data.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/data.js) | The locale's data sheets (authors, locations, partners, social links, media contacts), loaded once per page | list, page-header, filter-list, footer, media-contacts; templates/article | `getAuthor(id)`, `getAuthors`, `getSocialLinks`, `getMediaContacts`, `getLocations`, `getPartners`, `inRegion`, `loadDataSheet` return typed rows (empty lists for missing sheets) | Fetches `/{locale}/data/*.json`; module cache | None | Active |
| dates | [utils/dates.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/dates.js) | Formats authored dates without time zone shifts | list-data, cards-data; date decorator | `formatDate(value, format)` returns a string | None (pure) | `test/cards/cards-data.test.mjs`, Passed | Active |
| environment | [utils/environment.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/environment.js) | Reduced motion and Universal Editor checks | 13 blocks; motion, animation, scroller decorators | `prefersReducedMotion()`, `scrollBehavior()`, `isAuthor()` (path starts with `/content/`), `isEditing()` (`adobe-ue-edit`), `isInEditor(el)` | None (reads `matchMedia`, location, classes) | None | Active |
| header-space | [utils/header-space.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/header-space.js) | Reserves the header's remembered height before it loads (no layout shift); the header overlay mode | header, tcs-header, `scripts.js` | `reserveHeaderSpace()`, `rememberHeaderSpace(header)`, `setHeaderOverlay(mode)` | Reads / writes `localStorage` keys `header-height-v2-{breakpoint}` and `header-overlay-v1`; sets `--header-reserved` and `data-header-overlay` on `<html>` | None | Active |
| ids | [utils/ids.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/ids.js) | Unique element ids per block instance; authored ids kept unless taken | 9 blocks, `scripts.js`; block-options, article-meta, card-list decorators | `uniqueId(name)`, `nextInstance(name)`, `createIdFactory(prefix)`, `availableId(id, self)` | Per-page counters (module state) | None | Active |
| inherited-metadata | [utils/inherited-metadata.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/inherited-metadata.js) | Navigation, Footer and 404 Page inherited from the nearest parent page up to Home | header, footer, `scripts.js` (404) | `getInheritedMetadata(name)` returns a promise of the value; `INHERITED_METADATA` | Fetches parent page heads in parallel; caches values in `sessionStorage` for the session | None | Active |
| links | [utils/links.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/links.js) | Authored links and their Link Type / Open in New Window values | 10 blocks (hero, teaser, page-header, footer, list, button-block, conversation-canvas, form-variations, video, tcs-header) | `linkOf(cell)`, `linkPathsOf`, `readLinkItems`, `readLinkRows`, `NEW_WINDOW` | None (pure) | None | Active |
| lottie | [utils/lottie.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/lottie.js) | Loads the vendored Lottie player once (`scripts/lib/lottie/lottie_light.min.js`) | animation decorator | `loadLottie()` returns a promise of the player | Adds a script once | None | Active |
| media | [utils/media.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/media.js) | Video providers and player URLs; Lottie link label | teaser, hero, embed, video; media decorator | `isYoutube`, `isVimeo`, `isAnimation`, `youtubeId`, `youtubeEmbedUrl`, `vimeoEmbedUrl`, `animationLabel`, `videoType` | None (pure) | `test/media/vimeo-url.test.mjs`, Passed | Active |
| metadata | [utils/metadata.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/metadata.js) | Page metadata from page properties and the bulk metadata sheet | conversation-canvas, page-header; seo, data-layer decorators; templates | `getPageMetadata()`, `getPageTags()`, `getPageLanguage()` | None (reads `<meta>`) | None | Active |
| motion | [utils/motion.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/motion.js) | Additional tab animation values read from block classes; legacy Motion Type mapping | hero, table-list; motion decorator | `contentMotionOf`, `backgroundMotionOf`, `speedOf`, `triggerOf`, `isSeen`, `staggerIndex`, `isHorizontal`, `isVisibleColor`, `addLegacyMotion`, option lists | None (pure; unknown values ignored) | `test/motion/motion.test.mjs`, Passed | Active |
| multifield | [utils/multifield.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/multifield.js) | Reads composite multifields authored before item children | anchor-list, filter-list; stats decorator; links util | `readMultifieldItems(cell)` returns item element runs | None (pure) | None | Active (compatibility path) |
| placeholders | [utils/placeholders.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/placeholders.js) | UI text from the locale's placeholders sheet, with English fallbacks | 24 blocks, `scripts.js`, templates; editor-item, animation decorators | `getPlaceholders()` returns `t(key, fallback, values)`; `fillPlaceholder`, `loadPlaceholders` | Fetches `/{locale}/placeholders.json` once (empty map on failure) | None | Active |
| privacy | [utils/privacy.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/privacy.js) | Data minimisation of values that leave the page | data-layer decorator | `redactSearchTerm(value)`: e-mail addresses and phone numbers replaced, trimmed, cut at 100 characters; `contactLinkKind(href)`: `mailto:` / `tel:` links as email / phone (the data layer's clicks without the address) | None (pure) | `test/privacy/privacy.test.mjs`, Passed | Active |
| properties | [utils/properties.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/properties.js) | Reads key-value block properties | 18 blocks; image, content, card-list, heading decorators; tags util | `readProperties(block)`, `textOf`, `isOn`, `isOnByDefault`, `optionOf`, `normalizeKey`, `textSource` | None (pure) | Indirect through `test/cards`, `test/list`, Passed | Active |
| query-index | [utils/query-index.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/query-index.js) | Published pages of the locale from `/query-index.json` (or the language master under review), loaded once | conversation-canvas, list, list-data, filter-list, `scripts.js` (prefetch) | `getPages()`, `getPagesAt(paths)` (pages read from their HTML, e.g. on author), `tagsOf`, `columnOf`, `listOf`, `rowOfDocument` | Fetches the index in pages of 500; module cache | `test/list/query-index-tags.test.mjs`, Passed | Active |
| redirects | [utils/redirects.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/redirects.js) | Redirect targets from the locale's redirects sheet (not applied by the platform) | list, `scripts.js` (prefetch) | `loadRedirects()` (a map), `resolveRedirect(map, href)` (up to 5 hops), `normalizeRedirectPath` | Fetches `/{locale}/redirects.json` once | `test/list/list-data.test.mjs`, Passed | Active |
| site | [utils/site.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/site.js) | The 13 locale sites, AEM and published paths, sheets, parent pages; temporary language master review | 6 blocks, `scripts.js`, 8 utils, `tools/paths/generate-paths.mjs` | `LOCALES`, `DEFAULT_LOCALE`, `getLocale`, `localePagePath`, `resolvePagePath`, `localeSheetPath`, `toPublishedPath`, `toAemPath`, `getParentPages`, `pageLink`, `indexRoot`, `sheetRows`, `REVIEW_*` | None (reads location) | `test/site/index-root.test.mjs`, Passed | Active |
| tags | [utils/tags.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/tags.js) | Tag ids to ids and labels (fallback when the taxonomy lacks them) | teaser, list, cards, filter-list; taxonomy util | `parseTag(id)`, `readTagValues(cell)`, `readTags` | None (pure) | None | Active |
| taxonomy | [utils/taxonomy.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/taxonomy.js) | Tag labels from the locale's taxonomy (language sheet when translated) | teaser, conversation-canvas, list, cards, page-header, filter-list, `scripts.js` (prefetch) | `loadTaxonomy()`, `resolveTags(values)` | Fetches `/{locale}/taxonomy.json` once | None | Active |
| urls | [utils/urls.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/urls.js) | AEM content paths to published paths | conversation-canvas, table-list | `toSitePath(path)` | None (pure) | None | Active |
| viewport | [utils/viewport.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/viewport.js) | Defers work until content is near the viewport; breakpoints | gen-carousel, embed, video, filter-list; card-list, animation, data-layer decorators; header-space util | `onVisible(el, callback)` (once, disconnects), `watchVisibility(el, callback)`, `currentBreakpoint()` | IntersectionObserver per call | None | Active |

#### Exports without a consumer outside their module

Found by searching every exported name across `blocks/`, `decorators/`, `utils/`, `scripts/`, `templates/`, `test/` and `tools/`. Most are used inside their own module or kept as part of a small API; `getLocations` and `getPartners` (`utils/data.js`) are used nowhere and are **Unused candidates** (their sheets, `data/locations` and `data/partners`, are published per locale; remove them only after checking planned use).

| Module | Exports |
| --- | --- |
| decorators | `playAnimation`, `setButtonDisabled`, `cardHeadingLevel`, `renderRow`, `renderFeature`, `SKELETON_DELAY_MS`, `SKELETON_MIN_MS`, `showSkeleton` |
| utils | `STYLE_OPTIONS`, `loadDataSheet`, `getLocations`, `getPartners`, `nextInstance`, `INHERITED_METADATA`, `MOTION_TRIGGERS`, `loadPlaceholders`, `rowOfDocument`, `normalizeRedirectPath`, `REVIEW_SHEETS`, `REVIEW_PAGES`, `readTags` (`LOCALES` and `toAemPath` are used by `tools/paths/generate-paths.mjs`) |

## Shared Helpers in scripts/

| Name | Path | Purpose | Consumers | Inputs / Outputs | Side effects | Tests | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| aem.js | [scripts/aem.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/aem.js) | Edge Delivery core library: `decorateBlock(s)`, `loadSection(s)`, `loadBlock`, `loadCSS`, `loadScript`, `getMetadata`, `toClassName`, `createOptimizedPicture`, `sampleRUM` | everything | Library | RUM (`sampleRUM`) | None | Active; never modified |
| scripts.js exports | [scripts/scripts.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/scripts.js) | `moveInstrumentation` / `moveAttributes` (Universal Editor attributes to a new element), `decorateMain`, `decorateSectionsWithOptions`, `preloadBlockModules`, re-exported `decorateButtons` | `moveInstrumentation`: 18 blocks and 6 decorators; `decorateMain`: fragment, `editor-support.js` | DOM in, DOM out | Importing it runs `loadPage()` (eager, lazy, delayed phases); `autolinkModals` adds a document click listener for `/modals/` links | None | Active |
| scripts.js internals | [scripts/scripts.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/scripts.js) | `applySectionBlockOptions` (`container*` fields to classes), `buildColumnsSections`, `buildTabsSections`, `buildCarouselSections`, `loadTemplate`, `loadErrorPage`, `prefetchData` (query index, taxonomy, redirects in the lazy phase), `loadMainSections` (`loadSection(section, prepareMotion)`) | Page loading | Not exported | Fonts flag in `sessionStorage` (`fonts-loaded`) | None | Active |
| loadFragment | [blocks/fragment/fragment.js](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/fragment/fragment.js) | Fetches and decorates another page's sections; recursion stopped by the chain of including fragments (`from`) | header, footer, modal, tabs | `loadFragment(path, from)` returns a `main` element or null | Fetches `{path}.plain.html` | None | Active |
| editor-support.js | [scripts/editor-support.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/editor-support.js) | Universal Editor live updates: sanitizes the patch with DOMPurify, re-decorates the changed block, section or main, falls back to a reload | Not referenced by `head.html` or `scripts.js`; loaded when the page is rendered for Universal Editor (loading mechanism requires validation) | `aue:content-*` events | Listeners on `main`; drops ids of the replaced element (re-audit R-C-9); a MutationObserver for rich text | None | Active |
| editor-support-rte.js | [scripts/editor-support-rte.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/editor-support-rte.js) | Groups rich-text instrumentation (`data-richtext-*`) | `editor-support.js` | `decorateRichtext(container)` | Moves instrumentation attributes | None | Active |
| module-graph.js | [scripts/module-graph.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/module-graph.js) | Generated by `npm run build:modules`: per block, the modules its JavaScript imports beyond `scripts.js`, and the blocks with a stylesheet | `scripts.js` (`preloadBlockModules`) | `blockModules(name)`, `blockStylesheet(name)` | None | `test/modules/module-graph.test.mjs`, Passed | Active (generated; don't edit) |
| delayed.js | [scripts/delayed.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/delayed.js) | Delayed phase (3 s after load) | `scripts.js` (`loadDelayed`) | None | None: the file only has a comment; Adobe Tags / Web SDK are not configured (blocked: measurement plan) | None | Active (empty) |

Block-local pure modules follow the same pattern and are unit tested: `blocks/list/list-data.js` (`test/list/`), `blocks/cards/cards-data.js` (`test/cards/`), `blocks/separator/separator-config.js` (`test/separator/`), `blocks/conversation-canvas/canvas-journey.js` (`test/conversation-canvas/`); `canvas-controller.js` applies the Canvas journey to the page.

## Rules for Shared Code

#### Reuse before creating

Search this inventory, [decorators/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/README.md) and [utils/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/README.md) before writing a helper. Every button and link button goes through the button decorators; ids through `utils/ids.js`; UI text through `getPlaceholders()`; key-value properties through `readProperties`; item rows through `itemRows`. When two blocks need the same behaviour, move it into a decorator or util instead of copying it (the audit replaced per-block copies with `matchCells`, `availableId`, `getPages`, `buildImage` and `announceNewTab`).

#### Single responsibility and layering

One purpose per file; add a new module rather than growing an unrelated one. Decorators may import utils; **utils never import decorators** (verified). Utils build no page elements. `scripts/aem.js` is never modified.

#### No hidden global side effects

Importing a decorator or util does no work: their top level only declares constants, functions and caches (the one environment read at import is the masonry decorator's `CSS.supports` check for native masonry). The global effects that exist are deliberate and documented in the module header:

| Effect | Module |
| --- | --- |
| Document-level capture listeners, registered once | `data-layer-decorator.js` (`trackInteractions`), `scripts.js` (`autolinkModals`) |
| `window.adobeDataLayer` | `utils/analytics.js` |
| One page-wide IntersectionObserver; `styles/motion.css` loaded when needed | `motion-decorator.js` |
| Browser storage | `utils/header-space.js` (`localStorage`), `utils/inherited-metadata.js` and `scripts.js` fonts flag (`sessionStorage`) |
| Module caches of fetched data | `placeholders`, `taxonomy`, `redirects`, `query-index`, `data`, `inherited-metadata`, `lottie` |
| Per-page counters | `utils/ids.js`, `data-layer-decorator.js` |

A new global effect needs the same: a reason, the module header, the README entry.

#### Idempotency

Decoration can run more than once (fragments, Universal Editor re-renders). The existing guards: `trackInteractions` registers once (`listening`); `trackBlocks` marks blocks `data-cmp-tracked` and `componentIdOf` keeps an existing `data-cmp-id`; `preload` in `scripts.js` preloads each path once; loaders memoize their promise; `availableId` keeps an id that is already the element's own; `editor-support.js` drops the ids of a replaced element so the new one gets them (R-C-9). New helpers must be safe to call twice on the same element.

#### Error handling

Shared code never breaks rendering: `pushToDataLayer` catches and returns `false`; sheet loaders resolve to empty values when a sheet is missing (placeholders: an empty map, data sheets: empty lists); `renderWhenLoaded` removes the skeleton on failure; a failed Lottie animation hides with its control (R-B-2); code always passes an English fallback to `t()`.

#### Async work

Loaders return one memoized promise per page; shared data (query index, taxonomy, redirects) is prefetched when the lazy phase starts, never in the eager phase where it would compete with the LCP image; data later than 150 ms shows a skeleton so a section isn't held back (`renderWhenLoaded`).

#### Multiple instances

Blocks appear several times per page: ids come from `uniqueId` / `createIdFactory` / `availableId`; data-layer ids are `{block}-{n}` unless the block has an id; scrollers, masonry grids and animations are per instance; the same fragment may be loaded twice side by side, but not inside itself (`loadFragment` chain, R-C-5).

#### Listener and observer cleanup

Helpers that observe return a way to stop: `createScroller` returns `destroy()`, `layoutMasonry` returns `disconnect()`, `onVisible` disconnects after its first call, the motion decorator unobserves each block and aborts its `animationend` listeners (`AbortController`, 4 s safety timeout). Known gap: editor-only listener leaks (audit deferral D-C-19).

#### Consent awareness

No consent mechanism is implemented. The data layer is filled without a consent check but stays in the page: no Adobe Tags, Web SDK, Analytics or Target library consumes it. Embeds use privacy-enhanced players (youtube-nocookie; Vimeo `dnt=1` in Embed and in Video with privacy mode). Any helper that would send data to a third party is blocked until a consent model exists (blocked: consent categories and CMP).

#### Data minimisation

`utils/privacy.js` `redactSearchTerm` replaces e-mail addresses and phone numbers and cuts search terms at 100 characters before `cmp:search` (unit tested); `cmp:submit` carries the form id and field names, never values; the data layer code writes no storage. Open items: `mailto:` / `tel:` link URLs are still pushed in full as `xdm:linkURL` (handover finding F-05, to be masked in Tags) and the Conversation Canvas Search page URL carries the raw query (re-audit R-D-12, blocked until Tags is set up).

#### Performance

- **No forced layout during decoration**: the scroller decorator measures all scrollers in one animation frame, reads before writes; the Canvas controller writes `<html>` custom properties only when they change and never measures while scrolling.
- **Module preloading**: there is no build step, so `head.html` preloads every module `scripts.js` imports and `preloadBlockModules` preloads each block's modules and stylesheet from `scripts/module-graph.js`. Run `npm run build:modules` after adding, removing or changing an import; `test/modules` fails when the lists are stale.
- **Load only when needed**: the Lottie player near the viewport, `styles/motion.css` only with animations, the placeholder hint only in the editor, shared data once per page.

#### Backward compatibility

Keep exported names and signatures stable (blocks import them directly); keep the readers of content authored before (`readMultifieldItems`, `addLegacyMotion`, the legacy Stats multifield in `buildStats`, the Video poster group); unknown option values are ignored rather than turned into classes (`utils/motion.js`).

#### Tests and documentation

Pure logic goes into utils or block-local data modules with a Node test in `test/**/*.test.mjs` (`npm test`); DOM helpers are validated on the block library pages. Update the module header, the table in `decorators/README.md` or `utils/README.md` and, when a block's dependencies change, `npm run build:docs` (the generated files section of the block READMEs). The "Used by" columns of the two READMEs have drifted from the imports (e.g. the heading, content, image, link and data-layer decorators, and `utils/site.js`); the consumers in this inventory come from the imports at commit 2d06316.

## Related

- [blocks.md](./BLOCK-DEVELOPMENT-GUIDE.md): reuse strategy and anti-patterns for blocks
- [universal-editor.md](./UNIVERSAL-EDITOR-MODEL-GUIDE.md): models whose values these helpers read
- [decorators/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/README.md) (with the data layer contract) and [utils/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/README.md)
- [templates/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/templates/README.md): templates using the template, author-bio and contact-list decorators
- [docs/animation/README.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/animation/README.md): motion and skeleton decorators
- [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#shared-code-decorators-and-utils): shared code rules, data layer, module preloading
- Handover Part 2.3 — Component Architecture and Part 11 — Analytics & Data Layer: [TCS-CORP-HANDOVER.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/handover/TCS-CORP-HANDOVER.md)
- Other knowledge base files: [architecture.md](../../01-architecture/markdown/TECHNICAL-ARCHITECTURE.md), [development-standards.md](./CODING-STANDARDS.md), [performance.md](../../01-architecture/markdown/PERFORMANCE-ARCHITECTURE.md), [data-layer-and-analytics.md](./ANALYTICS-DATA-LAYER-GUIDE.md), [security-privacy-consent.md](../../01-architecture/markdown/SECURITY-ARCHITECTURE.md), [testing-and-quality.md](../../05-quality-assurance/markdown/TEST-STRATEGY.md)

## Module inventory (from the READMEs)

### Decorators

| Module | Purpose | Used by |
| --- | --- | --- |
| `button-decorator.js` | `decorateButton` (option `newTabHint`: a link opening a new tab says so), `createButton`, `setButtonDisabled`, `setButtonAlignment`, `removeButtonDecoration` | most blocks (button-block: the Button), header, `scripts.js` (404 Go back) |
| `icon-button-decorator.js` | `createIconButton` | gen-carousel, article meta decorator, modal, embed, video, filter-list, conversation-canvas |
| `content-buttons-decorator.js` | `decorateButtons` (authored links in content become buttons) | `scripts.js`, `editor-support.js` |
| `link-decorator.js` | `setLinkTarget` (open in a new window), `announceNewTab` (tells screen reader users a link opens in a new tab: hidden text, or added to its aria-label) | button decorator, teaser, list, page-header |
| `heading-decorator.js` | `buildHeading` (Title + Title Type), `HEADINGS` | teaser, image-collage, quote, testimonial, filter-list, form-variations |
| `content-decorator.js` | `fromCell` (property content into an element, keeping editor instrumentation) | teaser, image-collage, quote, testimonial, page-header, form-variations |
| `editor-item-decorator.js` | `buildEditorItems`, `editorItemHint` (in Universal Editor, an item the block doesn't render yet, e.g. a CTA just added, as a dashed placeholder the author can select; styles in `styles/lazy-styles.css`; the hint loaded only in the editor) | hero, page-header, teaser, image-collage, testimonial, anchor-list, filter-list, footer, stats decorator |
| `image-decorator.js` | `pictureOf` (image with its alt text field) | teaser, image-collage, quote, testimonial, page-header |
| `scroller-decorator.js` | `createScroller` (previous / next, scroll indicator, mouse drag, keyboard, loop and initial item for a CSS horizontal scroller; active only while it scrolls) | card list decorator |
| `card-list-decorator.js` | `buildCardListHeader`, `renderCardList`, `renderCard`, `renderRow`, `renderFeature`, `applyCardListLayout`, `buildCardListSkeleton` (the List's skeleton in its own layout), `renderCardListEmpty`, `cardListId`, `cardHeadingLevel`, `trackCardList` (the TCS DS Figma List cards: image, panel, report, statistic, feature, rows; grid / scroll per breakpoint; data layer state; styles in `styles/card-list.css`) | list, cards |
| `motion-decorator.js` | `prepareMotion` (the Content animation and Background animation of the blocks of a section, before it is shown, or of a fragment, footer page or header Canvas once in the page: first frame paused, run by one IntersectionObserver (Animation Trigger On Scroll) or at once (On Page Load), at the Motion Speed of the block, every class and inline style removed at the end; nothing in Universal Editor or for reduced motion; styles in `styles/motion.css`, loaded only when needed), `releaseMotion` (a loaded block's content animation after its skeleton) | `scripts.js`, fragment, header, footer, skeleton decorator |
| `skeleton-decorator.js` | `renderWhenLoaded` (a block from data that may take time: directly within 150ms, else after a skeleton so its section is shown; removed on success and failure), `skeletonWhile` (a skeleton in a part that fills in by itself), `showSkeleton`, `skeletonElement`, `bone` (styles in `styles/styles.css`, `.skeleton`) | list, filter-list, conversation-canvas, card list decorator |
| `masonry-decorator.js` | `layoutMasonry` (a grid's items of different heights packed in columns, in reading order; native masonry where supported) | filter-list |
| `responsive-image-decorator.js` | `buildImage` (image from a URL; site media and EDAM delivery images optimized), `buildDeliveryPicture` (responsive picture of a Dynamic Media with OpenAPI delivery image), `decorateDeliveryImages` (standalone delivery image links become pictures before the blocks are decorated, KB-D-064) | `scripts.js` (`decorateMain`, section backgrounds), page-header, filter-list, conversation-canvas, cards |
| `date-decorator.js` | `buildTime` (`<time>` for a date) | article meta decorator, filter-list |
| `tag-decorator.js` | `buildTagList` | teaser, page-header |
| `media-decorator.js` | `createFrame`, `createYoutubeFrame`, `createVimeoFrame`, `createVideoElement` | embed, video |
| `animation-decorator.js` | `createAnimation`, `playAnimation` (Lottie animations of the Lotto image type, loaded when near the viewport; a pause / play button as `element.animationToggle`, WCAG 2.2.2; paused for reduced motion) | hero, teaser |
| `article-meta-decorator.js` | `buildPublished`, `buildReadingTime`, `buildPageActions` (listen / download / share), `buildAuthorLockup` | page-header, teaser, filter-list |
| `stats-decorator.js` | `buildStats` (Stat items, and the Stats composite multifield authored before them, as a description list) | testimonial, teaser |
| `seo-decorator.js` | `decorateHead` (bulk metadata SEO / social columns to the standard head tags, `<html lang>`; keywords: the dialog's and the sheet's by `keyword-action`, `utils/keywords.js`) | `scripts.js` |
| `social-links-decorator.js` | `buildSocialLinks` (Social Links data sheet as an icon list) | footer |
| `template-decorator.js` | `ensurePageHeader`, `appendLoadedSection` (structure templates add before decoration) | article and blog templates (both), press-release template (`ensurePageHeader`) |
| `author-bio-decorator.js` | `buildAuthorBio` (About the author from the Authors sheet) | article / blog template |
| `contact-list-decorator.js` | `buildContactGroups` (groups of contacts, each with its heading and its mail / phone links one below the other; the links carry `data-cmp-interaction` email / phone) | media-contacts |
| `a11y-decorator.js` | `hideVisually`, `createHiddenText` (with `.visually-hidden` in `styles/styles.css`) | teaser, image-collage, testimonial, conversation-canvas, link decorator |
| `block-options-decorator.js` | `applyBlockOptions` (the Additional tab of every block dialog: an `anchor-…` class becomes the block's id, unique on the page; Hide block, padding and margin are classes styled in `styles/styles.css`) | `scripts.js` (`decorateMain`), `editor-support.js` |
| `data-layer-decorator.js` | `trackPage`, `trackBlocks`, `trackInteractions`, `componentIdOf` (Adobe Client Data Layer for every block, Core Components schema, read by Adobe Tags / Web SDK; see "Data layer" below) | `scripts.js`, list, modal |

### Utilities

| Module | Purpose | Used by |
| --- | --- | --- |
| `site.js` | `LOCALES`, `DEFAULT_LOCALE`, `getLocale`, `indexRoot`, `REVIEW_ROOTS` and `REVIEW_SHEETS` (the three review roots, KB-D-068: /language-master/en for testing, /language-masters/en the language master, /design-block-master/en the block library and curated design pages; each lists its own pages and reads its own placeholders, redirects, taxonomy and data sheets and its own nav and footer, `REVIEW_PAGES`), `getParentPages`, `localePagePath`, `resolvePagePath`, `pageLink` (on AEM author, a published page path as its AEM page link), `localeSheetPath`, `toPublishedPath`, `toAemPath`, `sheetRows` (the 13 locale sites, AEM ↔ published paths; references, configured nav / footer, error pages and sheets of a locale) | header, footer, `scripts.js`, placeholders, taxonomy, data, urls, inherited metadata, conversation-canvas |
| `inherited-metadata.js` | `getInheritedMetadata`, `INHERITED_METADATA` (nav, footer and error-page of the page, else of the nearest parent page up to Home; parent heads loaded in parallel and cached per session) | header, footer, `scripts.js` (404) |
| `metadata.js` | `getPageMetadata`, `getPageTags` (article:tag and the AEM page Tags published as `cq-tags`), `getPageLanguage` (page properties and bulk metadata columns: page-type, author-id, publish-date, reading-time, ...) | page-header, conversation-canvas, SEO decorator, templates |
| `placeholders.js` | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | all blocks with UI text, header, footer, `scripts.js` (404 Go back) |
| `taxonomy.js` | `loadTaxonomy`, `resolveTags` (tag labels from the locale's taxonomy) | teaser, page-header, filter-list, conversation-canvas |
| `data.js` | `loadDataSheet`, `getAuthor`, `getAuthors`, `getLocations`, `getPartners`, `getSocialLinks`, `getMediaContacts`, `inRegion` (the locale's data sheets) | page-header, filter-list, footer, media-contacts, article template |
| `keywords.js` | `resolveKeywords` (the page's keywords from the dialog's Keywords and the sheet's `meta-keywords`, by the sheet's `keyword-action`: `default` the dialog's win, `override` the sheet's win, `merge` both, the dialog's first, each once), `keywordActionOf`, `keywordsOf`, `KEYWORD_ACTIONS`; pure, unit tested | SEO decorator |
| `privacy.js` | `redactSearchTerm` (data minimisation: e-mail addresses and phone numbers replaced, 100 characters), `contactLinkKind` (`mailto:` / `tel:` links as email / phone, so clicks are recorded without the address); unit tested | data layer decorator |
| `properties.js` | `readProperties`, `textOf`, `isOn`, `isOnByDefault` (a toggle that defaults to on), `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | teaser, image-collage, quote, testimonial, page-header, anchor-list, form-variations, conversation-canvas, tab, tabs, table-list, decorators |
| `multifield.js` | `readMultifieldItems` (composite multifield items, authored before item children) | links util, stats decorator, anchor-list, filter-list |
| `links.js` | `NEW_WINDOW`, `linkOf`, `linkPathsOf` (the paths of a page property, one or many), `readLinkItems` (CTA lists with Link Type and the items' other select values), `readLinkRows` (the same from link item rows, e.g. Hero CTA items) | hero, teaser, image-collage, page-header, footer, list |
| `buttons.js` | `BUTTON_VIEWS`, `BUTTON_TYPES`, `BUTTON_ALIGNMENTS`, `pick`, `readButtonOptions` | button decorators, button-block, hero, list, conversation-canvas, tabs, table-list |
| `dates.js` | `formatDate` (DD-MM-YYYY, MM-DD-YYYY, MMM d, yyyy, DD/MM/YY, DD MMM YY, 4th September 2026; no time zone shift) | date decorator, list, cards |
| `query-index.js` | `getPages` (the current locale's pages from `/query-index.json`, or a review root's own pages from its own index, `{root}/query-index.json`, `indexUrlOf`; requests of 1,000 rows, in parallel after the first, `remainingOffsets` with their metadata columns: tags, page and content type, dates, images, author, featured, priority; loaded once per page and cached), `tagsOf` (a row's tags: the `tags` and `cqTags` columns), `columnOf` (a column by its metadata name, e.g. featured-image), `listOf` (a multi-value column), `getPagesAt` (pages the index doesn't have, e.g. on AEM author, read from their own HTML, once per page), `rowOfDocument` (an index row from a page's HTML) | filter-list, list, conversation-canvas |
| `redirects.js` | `loadRedirects`, `resolveRedirect`, `normalizeRedirectPath` (redirect targets from the locale's redirects sheet, loaded once) | list |
| `analytics.js` | `pushToDataLayer`, `pushComponents`, `pushComponentEvent` (Adobe Client Data Layer, Core Components schema; never throws) | data layer decorator, list, separator, tabs, gen-carousel, modal |
| `cells.js` | `itemRows`, `KEY_VALUE_ITEM`, `FIELD_ROW_ITEM` (the item rows of a block: by model in the editor, by their cells on the page), `withoutTabCells` (drops the empty cell AEM renders for each dialog tab of an item model), `matchCells` (block item cells to model fields when AEM leaves out unset fields) | list, table-list, cards, tabs, hero, page-header, teaser, image-collage, testimonial, anchor-list, filter-list, footer |
| `card-list-config.js` | `normalizePresentation` (the card list settings of List and Cards, with defaults and validation), `PRESENTATION_PROPERTIES`, `kindOf` and `themeOf` (the card's Card style and Card colour: item, list, page metadata, automatic), `RESPONSIVE_DEFAULTS`, `CARD_STYLES` / `CARD_KINDS` / `CARD_THEMES` and the other options, `contentTypeLabel` (a content type by its taxonomy label, e.g. Case Study), `isContentTypeTag` / `visibleTags` (a card's tag labels, without its content type tags for Show content type off), `isSafeUrl`, `isExternal`, `toISODate`, `toSafeId`, `hash`, `normalizePath` | list, cards, card list decorator |
| `tags.js` | `readTagValues`, `parseTag`, `readTags` (tag IDs; ID-derived labels as the taxonomy fallback) | teaser, filter-list, taxonomy util |
| `urls.js` | `toSitePath` (AEM content paths to published paths, e.g. `/content/tcs-corp/de/de-de/x.html` → `/de-de/x`) | table-list, conversation-canvas |
| `ids.js` | `nextInstance`, `uniqueId`, `createIdFactory` (unique ids per block instance), `availableId` (an authored id kept, suffixed -2, -3, ... only when taken) | tabs, gen-carousel, page-header, filter-list, form-variations, conversation-canvas, header, block options decorator |
| `environment.js` | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor`, `isAuthor` (the page is rendered by AEM author, which has no query index) | gen-carousel, tabs, hero, table-list, anchor-list, video, form-variations, list, filter-list, motion decorator |
| `header-space.js` | `reserveHeaderSpace`, `rememberHeaderSpace` (the loaded header's height, the logo bar, remembered per breakpoint (`header-height-v2-*`) and reserved on the next pages before the header loads: no layout shift); `setHeaderOverlay` (the TCS Header's Header over the first block as `<html data-header-overlay>`, `always` / `never`, remembered as `header-overlay-v1` and applied by `reserveHeaderSpace` on the next pages) | header, tcs-header, `scripts.js` |
| `viewport.js` | `onVisible` (once), `watchVisibility` (on / off screen), `currentBreakpoint` (mobile / tablet / desktop) | gen-carousel, hero, table-list, embed, video, data layer decorator, card list decorator, filter-list |
| `motion.js` | `CONTENT_MOTIONS`, `BACKGROUND_MOTIONS`, `contentMotionOf`, `backgroundMotionOf` (the Content animation / Background animation of the Additional tab, read from the block classes `motion-*` / `bg-motion-*`; unknown values give none), `staggerIndex` (capped at `STAGGER_MAX`), `isHorizontal`, `isVisibleColor`, `MOTION_SPEEDS`, `speedOf` (Motion Speed), `triggerOf` (Animation Trigger), `isSeen` (enough of a block in view to start), `addLegacyMotion` (Motion Type values authored before, mapped to the Additional tab animations) | motion decorator, hero, table-list |
| `media.js` | `isYoutube`, `isVimeo`, `isAnimation`, `youtubeEmbedUrl`, `vimeoEmbedUrl`, `videoType`, `deliveryAsset` (reads a Dynamic Media with OpenAPI delivery URL of a separate AEM Assets environment), `deliveryImageUrl` (its URL at a width, WebP preferred) | media decorator, embed, video, hero, teaser, responsive image decorator |
| `lottie.js` | `loadLottie` (the vendored Lottie player, loaded once per page) | animation decorator |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
