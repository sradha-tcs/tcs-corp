# Utils

Reusable helpers that **don't build UI**: reading authored values, formatting, URLs, ids and
checks of the browsing context. Elements are created by the [decorators](../decorators/README.md).

| Util | Exports | Used by |
|---|---|---|
| `properties.js` | `readProperties`, `textOf`, `isOn`, `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | teaser, quote, testimonial, page-header, anchor-list, form-variations, conversation-canvas, decorators |
| `multifield.js` | `readMultifieldItems` (composite multifield items) | links util, testimonial, anchor-list |
| `links.js` | `NEW_WINDOW`, `linkOf`, `readLinkItems` (CTA lists with Link Type) | hero, teaser, page-header |
| `buttons.js` | `BUTTON_VIEWS`, `BUTTON_TYPES`, `BUTTON_ALIGNMENTS`, `pick`, `readButtonOptions` | button decorators, hero, list, conversation-canvas |
| `dates.js` | `formatDate` (DD-MM-YYYY, MM-DD-YYYY, MMM d, yyyy, DD/MM/YY; no time zone shift) | date decorator |
| `tags.js` | `parseTag`, `readTags` (AEM tag IDs to labels) | teaser, `page-properties.js` |
| `urls.js` | `toSitePath` (AEM content paths to site paths) | table-list, conversation-canvas, `page-properties.js` |
| `ids.js` | `nextInstance`, `uniqueId`, `createIdFactory` (unique ids per block instance) | tabs, gen-carousel, page-header, form-variations, conversation-canvas |
| `environment.js` | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor` | gen-carousel, hero, table-list, anchor-list, video, form-variations |
| `viewport.js` | `onVisible` (once), `watchVisibility` (on / off screen) | gen-carousel, hero, table-list, embed, video |
| `media.js` | `isYoutube`, `isVimeo`, `isAnimation`, `youtubeEmbedUrl`, `vimeoEmbedUrl`, `videoType` | media decorator, embed, video, hero |
| `lottie.js` | `loadLottie` (the vendored Lottie player, loaded once per page) | hero |

## Guidelines

- Utils are pure or read-only helpers; they don't create page elements and never import
  decorators.
- Blocks import what they need directly from the util module.
