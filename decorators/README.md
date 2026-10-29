# Decorators

Decorators **create or decorate page elements** the same way in every block: buttons, links,
headings, images, tags, dates, media players and accessibility helpers. Each file has a single
purpose. Pure helpers that don't build UI (reading authored values, dates, URLs, environment
checks) live in [`../utils`](../utils/README.md).

| Decorator | Exports | Used by |
|---|---|---|
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
| `responsive-image-decorator.js` | `buildImage` (image from a URL; site media optimized) | `scripts.js` (section backgrounds), page-header, filter-list, conversation-canvas, cards |
| `date-decorator.js` | `buildTime` (`<time>` for a date) | article meta decorator, filter-list |
| `tag-decorator.js` | `buildTagList` | teaser, page-header |
| `media-decorator.js` | `createFrame`, `createYoutubeFrame`, `createVimeoFrame`, `createVideoElement` | embed, video |
| `animation-decorator.js` | `createAnimation`, `playAnimation` (Lottie animations of the Lotto image type, loaded when near the viewport; a pause / play button as `element.animationToggle`, WCAG 2.2.2; paused for reduced motion) | hero, teaser |
| `article-meta-decorator.js` | `buildPublished`, `buildReadingTime`, `buildPageActions` (listen / download / share), `buildAuthorLockup` | page-header, teaser, filter-list |
| `stats-decorator.js` | `buildStats` (Stat items, and the Stats composite multifield authored before them, as a description list) | testimonial, teaser |
| `seo-decorator.js` | `decorateHead` (bulk metadata SEO / social columns to the standard head tags, `<html lang>`) | `scripts.js` |
| `social-links-decorator.js` | `buildSocialLinks` (Social Links data sheet as an icon list) | footer |
| `template-decorator.js` | `ensurePageHeader`, `appendLoadedSection` (structure templates add before decoration) | article and blog templates (both), press-release template (`ensurePageHeader`) |
| `author-bio-decorator.js` | `buildAuthorBio` (About the author from the Authors sheet) | article / blog template |
| `contact-list-decorator.js` | `buildContactGroups` (groups of contacts, each with its heading and its mail / phone links one below the other; the links carry `data-cmp-interaction` email / phone) | media-contacts |
| `a11y-decorator.js` | `hideVisually`, `createHiddenText` (with `.visually-hidden` in `styles/styles.css`) | teaser, image-collage, testimonial, conversation-canvas, link decorator |
| `block-options-decorator.js` | `applyBlockOptions` (the Additional tab of every block dialog: an `anchor-…` class becomes the block's id, unique on the page; Hide block, padding and margin are classes styled in `styles/styles.css`) | `scripts.js` (`decorateMain`), `editor-support.js` |
| `data-layer-decorator.js` | `trackPage`, `trackBlocks`, `trackInteractions`, `componentIdOf` (Adobe Client Data Layer for every block, Core Components schema, read by Adobe Tags / Web SDK; see "Data layer" below) | `scripts.js`, list, modal |

## Data layer

`data-layer-decorator.js` pushes to `window.adobeDataLayer` (Adobe Client Data Layer) in the
AEM Core Components schema, so Adobe Tags rules and the Web SDK (`xdm`) work without per-block
code:

- **Page**: `{ page: { 'page-{hash}': { '@type': 'tcs-corp/components/page', 'dc:title',
  'xdm:language', 'xdm:template' (Page Type), 'xdm:tags', 'repo:path' } } }`, once.
- **Components**: every block, once loaded: `{ component: { '{id}': { '@type':
  'tcs-corp/components/{block}', parentId, 'dc:title' } } }`. The id is the block's id (its
  Anchor ID or Component ID), else `{block}-{n}`, as `data-cmp-id`.
- **Events** (`eventInfo.path` = `component.{id}`; `page.{id}` for links in default content):
  - `cmp:click`: links and buttons, with `interaction` (`data-cmp-interaction`, else link /
    button), `dc:title`, `xdm:linkURL`, `xdm:linkType` (other / exit / download), `value`
    (`data-cmp-value`), `position` (`data-cmp-position`), `breakpoint` (mobile / tablet /
    desktop). A `mailto:` / `tel:` link is recorded by its kind (`dc:title` and `interaction`
    email / phone, `xdm:linkURL` `mailto:` / `tel:`), never with the address
    (`utils/privacy.js` `contactLinkKind`)
  - `cmp:show` / `cmp:hide`: accordion items, tabs, carousel slides, modals
  - `cmp:media`: play, pause and ended of videos (not muted background loops)
  - `cmp:search` (`xdm:searchTerm`) and `cmp:submit` (field names only, never values)
  - `cmp:change`: controls with `data-cmp-interaction` (e.g. filters)
- `data-analytics="off"` on a block turns its tracking off (e.g. a Separator with Analytics
  off); `"custom"` means the block pushes its own component state (List, Separator); their
  clicks are still tracked.

## Guidelines

- New blocks use these decorators for buttons and shared behavior instead of setting classes
  or building the same elements themselves.
- Keep one purpose per file; add a new decorator rather than growing an unrelated one.
- Decorators may use utils; utils never import decorators.
