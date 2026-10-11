# Utils

Reusable helpers that **don't build UI**: reading authored values and site data, formatting,
URLs, ids and checks of the browsing context. Elements are created by the
[decorators](../decorators/README.md).

| Util | Exports | Used by |
|---|---|---|
| `site.js` | `LOCALES`, `DEFAULT_LOCALE`, `getLocale`, `getParentPages`, `localePagePath`, `resolvePagePath`, `localeSheetPath`, `toPublishedPath`, `toAemPath`, `sheetRows` (the 13 locale sites, AEM ↔ published paths; references, configured nav / footer, error pages and sheets of a locale) | header, footer, `scripts.js`, placeholders, taxonomy, data, urls, inherited metadata, conversation-canvas |
| `inherited-metadata.js` | `getInheritedMetadata`, `INHERITED_METADATA` (nav, footer and error-page of the page, else of the nearest parent page up to Home; parent heads loaded in parallel and cached per session) | header, footer, `scripts.js` (404) |
| `metadata.js` | `getPageMetadata`, `getPageTags`, `getPageLanguage` (page properties and bulk metadata columns: page-type, author-id, publish-date, reading-time, ...) | page-header, conversation-canvas, SEO decorator, templates |
| `placeholders.js` | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | all blocks with UI text, header, footer |
| `taxonomy.js` | `loadTaxonomy`, `resolveTags` (tag labels from the locale's taxonomy) | teaser, page-header, conversation-canvas |
| `data.js` | `loadDataSheet`, `getAuthor`, `getAuthors`, `getLocations`, `getPartners`, `getSocialLinks`, `getMediaContacts`, `inRegion` (the locale's data sheets) | page-header, footer, templates |
| `properties.js` | `readProperties`, `textOf`, `isOn`, `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | teaser, quote, testimonial, page-header, anchor-list, form-variations, conversation-canvas, decorators |
| `multifield.js` | `readMultifieldItems` (composite multifield items) | links util, testimonial, anchor-list |
| `links.js` | `NEW_WINDOW`, `linkOf`, `readLinkItems` (CTA lists with Link Type) | hero, teaser, page-header |
| `buttons.js` | `BUTTON_VIEWS`, `BUTTON_TYPES`, `BUTTON_ALIGNMENTS`, `pick`, `readButtonOptions` | button decorators, hero, list, conversation-canvas |
| `dates.js` | `formatDate` (DD-MM-YYYY, MM-DD-YYYY, MMM d, yyyy, DD/MM/YY; no time zone shift) | date decorator |
| `tags.js` | `readTagValues`, `parseTag`, `readTags` (tag IDs; ID-derived labels as the taxonomy fallback) | teaser, taxonomy util |
| `urls.js` | `toSitePath` (AEM content paths to published paths, e.g. `/content/tcs-corp/de/de-de/x.html` → `/de-de/x`) | table-list, conversation-canvas |
| `ids.js` | `nextInstance`, `uniqueId`, `createIdFactory` (unique ids per block instance) | tabs, gen-carousel, page-header, form-variations, conversation-canvas |
| `environment.js` | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor` | gen-carousel, hero, table-list, anchor-list, video, form-variations |
| `viewport.js` | `onVisible` (once), `watchVisibility` (on / off screen) | gen-carousel, hero, table-list, embed, video |
| `media.js` | `isYoutube`, `isVimeo`, `isAnimation`, `youtubeEmbedUrl`, `vimeoEmbedUrl`, `videoType` | media decorator, embed, video, hero |
| `lottie.js` | `loadLottie` (the vendored Lottie player, loaded once per page) | hero |

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
