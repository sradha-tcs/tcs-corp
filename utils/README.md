# Utils

Reusable helpers that **don't build UI**: reading authored values and site data, formatting,
URLs, ids and checks of the browsing context. Elements are created by the
[decorators](../decorators/README.md).

| Util | Exports | Used by |
|---|---|---|
| `site.js` | `LOCALES`, `DEFAULT_LOCALE`, `getLocale`, `indexRoot`, `REVIEW_ROOTS` and `REVIEW_SHEETS` (temporary: the language master under review, /language-master/en, lists its own pages and reads its own placeholders, redirects, taxonomy and data sheets and its own nav and footer, `REVIEW_PAGES`), `getParentPages`, `localePagePath`, `resolvePagePath`, `pageLink` (on AEM author, a published page path as its AEM page link), `localeSheetPath`, `toPublishedPath`, `toAemPath`, `sheetRows` (the 13 locale sites, AEM ↔ published paths; references, configured nav / footer, error pages and sheets of a locale) | header, footer, `scripts.js`, placeholders, taxonomy, data, urls, inherited metadata, conversation-canvas |
| `inherited-metadata.js` | `getInheritedMetadata`, `INHERITED_METADATA` (nav, footer and error-page of the page, else of the nearest parent page up to Home; parent heads loaded in parallel and cached per session) | header, footer, `scripts.js` (404) |
| `metadata.js` | `getPageMetadata`, `getPageTags` (article:tag and the AEM page Tags published as `cq-tags`), `getPageLanguage` (page properties and bulk metadata columns: page-type, author-id, publish-date, reading-time, ...) | page-header, conversation-canvas, SEO decorator, templates |
| `placeholders.js` | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | all blocks with UI text, header, footer, `scripts.js` (404 Go back) |
| `taxonomy.js` | `loadTaxonomy`, `resolveTags` (tag labels from the locale's taxonomy) | teaser, page-header, filter-list, conversation-canvas |
| `data.js` | `loadDataSheet`, `getAuthor`, `getAuthors`, `getLocations`, `getPartners`, `getSocialLinks`, `getMediaContacts`, `inRegion` (the locale's data sheets) | page-header, filter-list, footer, templates |
| `properties.js` | `readProperties`, `textOf`, `isOn`, `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | teaser, quote, testimonial, page-header, anchor-list, form-variations, conversation-canvas, tab, tabs, table-list, decorators |
| `multifield.js` | `readMultifieldItems` (composite multifield items, authored before item children) | links util, stats decorator, anchor-list, filter-list |
| `links.js` | `NEW_WINDOW`, `linkOf`, `linkPathsOf` (the paths of a page property, one or many), `readLinkItems` (CTA lists with Link Type and the items' other select values), `readLinkRows` (the same from link item rows, e.g. Hero CTA items) | hero, teaser, page-header, footer, list |
| `buttons.js` | `BUTTON_VIEWS`, `BUTTON_TYPES`, `BUTTON_ALIGNMENTS`, `pick`, `readButtonOptions` | button decorators, hero, list, conversation-canvas, tabs, table-list |
| `dates.js` | `formatDate` (DD-MM-YYYY, MM-DD-YYYY, MMM d, yyyy, DD/MM/YY, DD MMM YY, 4th September 2026; no time zone shift) | date decorator, list, cards |
| `query-index.js` | `getPages` (the current locale's pages from `/query-index.json`, or the language master's own pages while it is under review (`indexRoot`) with their metadata columns: tags, page and content type, dates, images, author, featured, priority; loaded once per page and cached), `tagsOf` (a row's tags: the `tags` and `cqTags` columns), `columnOf` (a column by its metadata name, e.g. featured-image), `listOf` (a multi-value column), `getPagesAt` (pages the index doesn't have, e.g. on AEM author, read from their own HTML, once per page), `rowOfDocument` (an index row from a page's HTML) | filter-list, list, conversation-canvas |
| `redirects.js` | `loadRedirects`, `resolveRedirect`, `normalizeRedirectPath` (redirect targets from the locale's redirects sheet, loaded once) | list |
| `analytics.js` | `pushToDataLayer`, `pushComponents`, `pushComponentEvent` (Adobe Client Data Layer, Core Components schema; never throws) | data layer decorator, list, separator, tabs, gen-carousel, modal |
| `cells.js` | `itemRows`, `KEY_VALUE_ITEM`, `FIELD_ROW_ITEM` (the item rows of a block: by model in the editor, by their cells on the page), `withoutTabCells` (drops the empty cell AEM renders for each dialog tab of an item model), `matchCells` (block item cells to model fields when AEM leaves out unset fields) | list, table-list, cards, tabs, hero, page-header, teaser, testimonial, anchor-list, filter-list, footer |
| `card-list-config.js` | `normalizePresentation` (the card list settings of List and Cards, with defaults and validation), `PRESENTATION_PROPERTIES`, `kindOf`, `RESPONSIVE_DEFAULTS`, `CARD_STYLES` / `CARD_KINDS` / `CARD_THEMES` and the other options, `contentTypeLabel` (a content type by its taxonomy label, e.g. Case Study), `isSafeUrl`, `isExternal`, `toISODate`, `toSafeId`, `hash`, `normalizePath` | list, cards, card list decorator |
| `tags.js` | `readTagValues`, `parseTag`, `readTags` (tag IDs; ID-derived labels as the taxonomy fallback) | teaser, filter-list, taxonomy util |
| `urls.js` | `toSitePath` (AEM content paths to published paths, e.g. `/content/tcs-corp/de/de-de/x.html` → `/de-de/x`) | table-list, conversation-canvas |
| `ids.js` | `nextInstance`, `uniqueId`, `createIdFactory` (unique ids per block instance), `availableId` (an authored id kept, suffixed -2, -3, ... only when taken) | tabs, gen-carousel, page-header, filter-list, form-variations, conversation-canvas, header, block options decorator |
| `environment.js` | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor`, `isAuthor` (the page is rendered by AEM author, which has no query index) | gen-carousel, tabs, hero, table-list, anchor-list, video, form-variations, list, filter-list |
| `header-space.js` | `reserveHeaderSpace`, `rememberHeaderSpace` (the loaded header's height, remembered per breakpoint and reserved on the next pages before the header loads: no layout shift) | header, `scripts.js` |
| `viewport.js` | `onVisible` (once), `watchVisibility` (on / off screen), `currentBreakpoint` (mobile / tablet / desktop) | gen-carousel, hero, table-list, embed, video, data layer decorator |
| `media.js` | `isYoutube`, `isVimeo`, `isAnimation`, `youtubeEmbedUrl`, `vimeoEmbedUrl`, `videoType` | media decorator, embed, video, hero, teaser |
| `lottie.js` | `loadLottie` (the vendored Lottie player, loaded once per page) | animation decorator |

## Site data

Site data lives in each of the 13 locale sites (AEM `/content/tcs-corp/{country}/{language}/`,
published at `/{locale}/`, e.g. `/de-de/`): references (nav, footer, fragments), error pages,
placeholders, metadata, taxonomy, redirects, the `data/` sheets and the block library. See
"Site structure and site data" in [AGENTS.md](../AGENTS.md) for the locale table, the bulk
metadata columns and the path mappings.

## Guidelines

- Utils are pure or read-only helpers; they don't create page elements and never import
  decorators.
- User-facing text in code goes through `getPlaceholders()` with an English fallback; keys are
  camelCase (the sheet's Key may use any casing).
- Blocks import what they need directly from the util module.
