# Utils

Reusable helpers that **don't build UI**: reading authored values and site data, formatting,
URLs, ids and checks of the browsing context. Elements are created by the
[decorators](../decorators/README.md).

| Util | Exports | Used by |
|---|---|---|
| `metadata.js` | `getPageMetadata`, `getPageTags` (standard page metadata: title, description, image, template, category, tags, publication date, author) | page-header, conversation-canvas |
| `placeholders.js` | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from `/placeholders.json`, with English fallbacks) | all blocks with UI text, header |
| `taxonomy.js` | `loadTaxonomy`, `resolveTags` (tag labels from `/taxonomy.json`) | teaser, page-header, conversation-canvas |
| `properties.js` | `readProperties`, `textOf`, `isOn`, `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | teaser, quote, testimonial, page-header, anchor-list, form-variations, conversation-canvas, decorators |
| `multifield.js` | `readMultifieldItems` (composite multifield items) | links util, testimonial, anchor-list |
| `links.js` | `NEW_WINDOW`, `linkOf`, `readLinkItems` (CTA lists with Link Type) | hero, teaser, page-header |
| `buttons.js` | `BUTTON_VIEWS`, `BUTTON_TYPES`, `BUTTON_ALIGNMENTS`, `pick`, `readButtonOptions` | button decorators, hero, list, conversation-canvas |
| `dates.js` | `formatDate` (DD-MM-YYYY, MM-DD-YYYY, MMM d, yyyy, DD/MM/YY; no time zone shift) | date decorator |
| `tags.js` | `readTagValues`, `parseTag`, `readTags` (tag IDs; ID-derived labels as the taxonomy fallback) | teaser, taxonomy util |
| `urls.js` | `toSitePath` (AEM content paths to site paths) | table-list, conversation-canvas |
| `ids.js` | `nextInstance`, `uniqueId`, `createIdFactory` (unique ids per block instance) | tabs, gen-carousel, page-header, form-variations, conversation-canvas |
| `environment.js` | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor` | gen-carousel, hero, table-list, anchor-list, video, form-variations |
| `viewport.js` | `onVisible` (once), `watchVisibility` (on / off screen) | gen-carousel, hero, table-list, embed, video |
| `media.js` | `isYoutube`, `isVimeo`, `isAnimation`, `youtubeEmbedUrl`, `vimeoEmbedUrl`, `videoType` | media decorator, embed, video, hero |
| `lottie.js` | `loadLottie` (the vendored Lottie player, loaded once per page) | hero |

## Site data (Adobe-recommended, no custom page properties)

| Data | Source | Read with |
|---|---|---|
| Page metadata | Page properties (Title, Description, Keywords) and the bulk metadata sheet `/metadata.json` (e.g. Template, Tags, Publication Date, Author, Category) | `metadata.js` |
| UI text | Placeholders sheet `/placeholders.json` (Key, Text) | `placeholders.js` |
| Tag labels | Published taxonomy `/taxonomy.json` | `taxonomy.js` |
| Redirects | Redirects sheet `/redirects.json` (applied by the platform, no code) | — |

All are mapped in `paths.json`. The Template metadata becomes a body class (core
`decorateTemplateAndTheme`); the Page Header uses it to pick its layout (landing / listing:
landing, otherwise article).

## Guidelines

- Utils are pure or read-only helpers; they don't create page elements and never import
  decorators.
- User-facing text in code goes through `getPlaceholders()` with an English fallback; keys are
  camelCase (the sheet's Key may use any casing).
- Blocks import what they need directly from the util module.
