# Breadcrumb

The Breadcrumb block shows where the current page sits in the site: its parent pages up to the locale's Home page, as links, then the current page. Authors choose how many parent levels it shows, whether the current page ends the trail and the text colour (white over an image). It is a key-value block: `blocks/breadcrumb/breadcrumb.js` reads its two settings and builds the trail from the page's own URL.

| Attribute | Value |
| --------- | ----- |
| Technical name | `breadcrumb` (model `breadcrumb`, template name "Breadcrumb") |
| Display name | Breadcrumb |
| Block type | Key-value block (`key-value: true`), no item children |
| Status | Active |
| Parent / children | Parents: Section, Columns Container, Tabs Container (filters `section`, `columns-container`, `tabs`). Children: none |
| Owner / version / date | Not recorded / 1.0 / 9 November 2026 |

## Overview

- **Business purpose:** helps visitors see where they are and move up to a parent page or the Home page in one click.
- **User experience:** one line in capitals with wide letter spacing, the parent pages as links separated by slashes (HOME / INSIGHTS / BLOGS / **AI IN BANKING**), the current page in bold and not a link, above a thin line. The trail wraps on narrow screens.
- **Templates / page types:** any page below a locale's Home page. No template adds the block.
- **Data source:** the page's URL (`utils/site.js` `getParentPages`: the parent pages up to the locale's Home page, or the language master's root while it is under review); the parents' titles from the query index (`utils/query-index.js` `getPages`), else from the pages themselves (`getPagesAt`; AEM author has no query index); the current page's title from its `og:title`; the labels Home and Breadcrumb from the placeholders.
- **Related blocks:** Anchor List (`blocks/anchor-list`) for links within the page; the TCS Header for the site navigation.
- **When to use:** on pages two or more levels below Home (articles, service and industry pages).
- **When not to use:** on the Home page (it has no parents; the block shows nothing there); as the main navigation.
- **Realistic use cases:** above the Page Header of an article; at the top of a service page.

## Visual Reference

<!-- BEGIN GENERATED: screenshots (npm run build:docs) -->

No handover screenshot of this block was identified.

Universal Editor dialogs (no screenshot exists yet; to be captured on AEM author):

```text
[Screenshot Placeholder]

File name:
breadcrumb-dialog-content-desktop.png

Purpose:
The Content tab of the Breadcrumb properties in Universal Editor, with the fields of the table "Content tab — Breadcrumb" in Authorable Fields below.

Annotations:
A = Levels shown
B = Show current page
C = Text color
```

```text
[Screenshot Placeholder]

File name:
breadcrumb-dialog-additional-desktop.png

Purpose:
The Additional tab of the Breadcrumb properties in Universal Editor, with the fields of the table "Additional tab — Breadcrumb" in Authorable Fields below.

Annotations:
A = Anchor ID
B = Hide block
C = Animation Type
D = Motion Speed
E = Animation Trigger
F = Padding left
G = Padding right
H = Padding top
I = Padding bottom
J = Margin left
```

<!-- END GENERATED: screenshots -->

## For Content Authors

Add a **Breadcrumb** where the trail should appear (usually the first section, above the Page Header). Choose **Levels shown** (All, or 1 to 5 parent levels counting up from the page), whether to **Show current page** and the **Text color** (White over an image or a dark background). The labels are the parent pages' titles: to change a label, change that page's Title.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

### Breadcrumb (`breadcrumb`)

Model `breadcrumb`; template name "Breadcrumb" (the block class AEM renders); key-value block (one row per property).

Stored on a new component (definition template): `showCurrent` = `true`, `levels` = `"all"`, `textColor` = `"default"`.

#### Content tab — Breadcrumb

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Levels shown | `levels` | select | No | `all` | All (from Home) (`all`), 1 parent level (`1`), 2 parent levels (`2`), 3 parent levels (`3`), 4 parent levels (`4`), 5 parent levels (`5`) | How many parent pages the trail shows, counting up from the current page. All: every parent up to the Home page. | — |
| Show current page | `showCurrent` | boolean | No | `true` | on / off | Ends the trail with the current page's title (not a link). | — |
| Text color | `textColor` | select | No | `default` | Default (`default`), White (over an image or a dark background) (`white`) | Default: dark text (light inside a dark Section). White: for a breadcrumb over an image. | — |

#### Additional tab — Breadcrumb

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Anchor ID | `classes_anchor` | text | No | — | regExp: ^anchor-[a-z0-9][a-z0-9-]*$; customErrorMsg: Start with anchor-, then lower-case letters, digits and hyphens. | A unique ID of the block on the page, starting with anchor-, e.g. anchor-our-services; link to it with #anchor-our-services. Delivered as a block class. | — |
| Hide block | `classes_hideblock` | boolean | No | `false` | on / off | Hides the whole block on the page until it is turned off (shown faded in the editor). Delivered as a block class. | — |
| Animation Type | `classes_animation` | select | No | "" | None (""), Fade in (`motion-fade-in`), Fade up (`motion-fade-up`), Fade down (`motion-fade-down`), Fade left (`motion-fade-left`), Fade right (`motion-fade-right`), Slide up (`motion-slide-up`), Slide down (`motion-slide-down`), Slide left (`motion-slide-left`), Slide right (`motion-slide-right`), Scale in (`motion-scale-in`) | How the block's content appears; repeated items (cards, list items, accordion items, columns) appear one after another. None: shown as is. Not played in the editor or when the visitor prefers reduced motion. Delivered as a block class. | — |
| Motion Speed | `classes_animationspeed` | select | No | "" | Medium (""), Fast (`motion-fast`), Slow (`motion-slow`) | How fast the animation runs: 0.3, 0.6 or 0.9 seconds. Shown when `classes_animation` is set and `classes_animation` is not empty. Delivered as a block class. | — |
| Animation Trigger | `classes_animationtrigger` | select | No | "" | On Scroll / Viewport Entry (""), On Page Load (`motion-on-load`) | When the block's animations run. On Scroll: when the block comes into view (at once if it is in view when the page opens). On Page Load: as soon as the block is ready, wherever it is on the page. Shown when `classes_animation` is set and `classes_animation` is not empty. Delivered as a block class. | — |
| Padding left | `classes_paddingleft` | select | No | "" | Default (""), 0 (none) (`pl-0`), 0.25rem (space-100) (`pl-100`), 0.5rem (space-200) (`pl-200`), 0.75rem (space-300) (`pl-300`), 1rem (space-400) (`pl-400`), 1.25rem (space-500) (`pl-500`), 1.5rem (space-600) (`pl-600`), 2rem (space-800) (`pl-800`), 2.5rem (space-1000) (`pl-1000`), 3rem (space-1200) (`pl-1200`), 4rem (space-1600) (`pl-1600`), 5rem (space-2000) (`pl-2000`), 6rem (space-2400) (`pl-2400`), 7.5rem (space-3000) (`pl-3000`) | Delivered as a block class. | — |
| Padding right | `classes_paddingright` | select | No | "" | Default (""), 0 (none) (`pr-0`), 0.25rem (space-100) (`pr-100`), 0.5rem (space-200) (`pr-200`), 0.75rem (space-300) (`pr-300`), 1rem (space-400) (`pr-400`), 1.25rem (space-500) (`pr-500`), 1.5rem (space-600) (`pr-600`), 2rem (space-800) (`pr-800`), 2.5rem (space-1000) (`pr-1000`), 3rem (space-1200) (`pr-1200`), 4rem (space-1600) (`pr-1600`), 5rem (space-2000) (`pr-2000`), 6rem (space-2400) (`pr-2400`), 7.5rem (space-3000) (`pr-3000`) | Delivered as a block class. | — |
| Padding top | `classes_paddingtop` | select | No | "" | Default (""), 0 (none) (`pt-0`), 0.25rem (space-100) (`pt-100`), 0.5rem (space-200) (`pt-200`), 0.75rem (space-300) (`pt-300`), 1rem (space-400) (`pt-400`), 1.25rem (space-500) (`pt-500`), 1.5rem (space-600) (`pt-600`), 2rem (space-800) (`pt-800`), 2.5rem (space-1000) (`pt-1000`), 3rem (space-1200) (`pt-1200`), 4rem (space-1600) (`pt-1600`), 5rem (space-2000) (`pt-2000`), 6rem (space-2400) (`pt-2400`), 7.5rem (space-3000) (`pt-3000`) | Delivered as a block class. | — |
| Padding bottom | `classes_paddingbottom` | select | No | "" | Default (""), 0 (none) (`pb-0`), 0.25rem (space-100) (`pb-100`), 0.5rem (space-200) (`pb-200`), 0.75rem (space-300) (`pb-300`), 1rem (space-400) (`pb-400`), 1.25rem (space-500) (`pb-500`), 1.5rem (space-600) (`pb-600`), 2rem (space-800) (`pb-800`), 2.5rem (space-1000) (`pb-1000`), 3rem (space-1200) (`pb-1200`), 4rem (space-1600) (`pb-1600`), 5rem (space-2000) (`pb-2000`), 6rem (space-2400) (`pb-2400`), 7.5rem (space-3000) (`pb-3000`) | Delivered as a block class. | — |
| Margin left | `classes_marginleft` | select | No | "" | Default (""), 0 (none) (`ml-0`), 0.25rem (space-100) (`ml-100`), 0.5rem (space-200) (`ml-200`), 0.75rem (space-300) (`ml-300`), 1rem (space-400) (`ml-400`), 1.25rem (space-500) (`ml-500`), 1.5rem (space-600) (`ml-600`), 2rem (space-800) (`ml-800`), 2.5rem (space-1000) (`ml-1000`), 3rem (space-1200) (`ml-1200`), 4rem (space-1600) (`ml-1600`), 5rem (space-2000) (`ml-2000`), 6rem (space-2400) (`ml-2400`), 7.5rem (space-3000) (`ml-3000`) | Delivered as a block class. | — |
| Margin right | `classes_marginright` | select | No | "" | Default (""), 0 (none) (`mr-0`), 0.25rem (space-100) (`mr-100`), 0.5rem (space-200) (`mr-200`), 0.75rem (space-300) (`mr-300`), 1rem (space-400) (`mr-400`), 1.25rem (space-500) (`mr-500`), 1.5rem (space-600) (`mr-600`), 2rem (space-800) (`mr-800`), 2.5rem (space-1000) (`mr-1000`), 3rem (space-1200) (`mr-1200`), 4rem (space-1600) (`mr-1600`), 5rem (space-2000) (`mr-2000`), 6rem (space-2400) (`mr-2400`), 7.5rem (space-3000) (`mr-3000`) | Delivered as a block class. | — |
| Margin top | `classes_margintop` | select | No | "" | Default (""), 0 (none) (`mt-0`), 0.25rem (space-100) (`mt-100`), 0.5rem (space-200) (`mt-200`), 0.75rem (space-300) (`mt-300`), 1rem (space-400) (`mt-400`), 1.25rem (space-500) (`mt-500`), 1.5rem (space-600) (`mt-600`), 2rem (space-800) (`mt-800`), 2.5rem (space-1000) (`mt-1000`), 3rem (space-1200) (`mt-1200`), 4rem (space-1600) (`mt-1600`), 5rem (space-2000) (`mt-2000`), 6rem (space-2400) (`mt-2400`), 7.5rem (space-3000) (`mt-3000`) | Delivered as a block class. | — |
| Margin bottom | `classes_marginbottom` | select | No | "" | Default (""), 0 (none) (`mb-0`), 0.25rem (space-100) (`mb-100`), 0.5rem (space-200) (`mb-200`), 0.75rem (space-300) (`mb-300`), 1rem (space-400) (`mb-400`), 1.25rem (space-500) (`mb-500`), 1.5rem (space-600) (`mb-600`), 2rem (space-800) (`mb-800`), 2.5rem (space-1000) (`mb-1000`), 3rem (space-1200) (`mb-1200`), 4rem (space-1600) (`mb-1600`), 5rem (space-2000) (`mb-2000`), 6rem (space-2400) (`mb-2400`), 7.5rem (space-3000) (`mb-3000`) | Delivered as a block class. | — |

<!-- END GENERATED: fields -->

- **Levels shown:** All (`all`, the default) shows every parent up to Home; 1 to 5 show only the nearest parents (1: the direct parent). Any other value is All.
- **Show current page:** on by default (also when no value is stored); the current page's title ends the trail in bold, not as a link, marked with `aria-current="page"`.
- **Text color:** Default (`default`: `--color-text-default` with a `--color-border-default` line, so it turns light inside a dark Section) or White (`white`: the `text-white` block class, white text with a 40 % white line, for a breadcrumb over an image).

## Screenshot-Based Authoring Steps

### Authoring Step 1: Add the breadcrumb

Author action: in Universal Editor, add a **Breadcrumb** to the first section of a page below Home. Expected preview: Home and the page's parents as links, then the page's title. Validation: each link opens its page. Common mistake: adding it to the Home page, which has no parents (the editor shows a hint).

### Authoring Step 2: Limit the levels

Author action: set **Levels shown** to 2. Expected preview: only the two nearest parents, then the page. Validation: Home is no longer shown on a deep page.

### Authoring Step 3: Hide the current page

Author action: turn **Show current page** off. Expected preview: the trail ends with the direct parent.

## Variations

### Levels shown: All, 1 to 5

Purpose: a short trail on deep pages. Rendering: the nearest N parents of `getParentPages`, the farthest first (`trailOf`).

### Show current page: on, off

Purpose: end the trail with the page itself, or with its parent. Rendering: an `<li aria-current="page">` with the page's title in bold, or none.

### Text color: Default, White

Purpose: readable on light pages and over images. Rendering: `--breadcrumb-color` and `--breadcrumb-line-color` on the block (`text-white` for White).

## Complete Authoring Example

| Field | Value |
| ----- | ----- |
| Levels shown | All (from Home) |
| Show current page | On |
| Text color | White (the breadcrumb sits over the hero image) |

On `/en/insights/blogs/ai-in-banking` (parents Insights and Blogs published): `HOME / INSIGHTS / BLOGS / AI IN BANKING` in white, the first three as links, the last in bold.

## Content and Asset Guidelines

- Keep the parent pages' Titles short: they are the breadcrumb's labels.
- A folder without its own page (e.g. `/en/insights` not published) is left out of the trail rather than linked to a missing page.
- No images or assets.

## Accessibility

- A `<nav>` named by the placeholder `breadcrumb` ("Breadcrumb"), with an ordered list (`<ol>`) of the trail; the current page is `aria-current="page"` and not a link.
- The slashes are CSS content with empty alternative text (`content: '/' / ''`): screen readers don't read them. The capitals are CSS (`text-transform`), so screen readers read the titles as written.
- White text is for dark images: check its contrast on the image behind it.
- Links follow the site's focus style and underline on hover and focus.

## Data Layer and Analytics

The block entry only; link clicks are recorded centrally by `decorators/data-layer-decorator.js` like any link.

## Personalization

None: the trail follows the page's place in the site.

## Responsive Behavior

The same trail on every width, in `--body-font-size-m` capitals with letter spacing of 0.1 times the font size; it wraps onto more lines when it doesn't fit.

## For Developers

<!-- BEGIN GENERATED: files (npm run build:docs) -->

```text
blocks/breadcrumb/
├── README.md
├── _breadcrumb.json
├── breadcrumb-data.js
├── breadcrumb.css
└── breadcrumb.js
```

| Decorator/Utility | Purpose | Execution or dependency point |
| ----------------- | ------- | ----------------------------- |
| [`scripts/aem.js`](../../scripts/aem.js) | Edge Delivery core library (block loading, CSS, metadata, optimized pictures) | `breadcrumb.js`: { getMetadata } |
| [`decorators/skeleton-decorator.js`](../../decorators/skeleton-decorator.js) | `renderWhenLoaded` (a block from data that may take time: directly within 150ms, else after a skeleton so its section is shown; removed on success and failure), `skeletonWhile` (a skeleton in a part that fills in by itse | `breadcrumb.js`: { bone, renderWhenLoaded, skeletonElement } |
| [`utils/environment.js`](../../utils/environment.js) | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor`, `isAuthor` (the page is rendered by AEM author, which has no query index) | `breadcrumb.js`: { isEditing } |
| [`utils/placeholders.js`](../../utils/placeholders.js) | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | `breadcrumb.js`: { getPlaceholders } |
| [`utils/properties.js`](../../utils/properties.js) | `readProperties`, `textOf`, `isOn`, `isOnByDefault` (a toggle that defaults to on), `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | `breadcrumb.js`: { isOnByDefault, optionOf, readProperties, textOf, } |
| [`utils/query-index.js`](../../utils/query-index.js) | `getPages` (the current locale's pages from `/query-index.json`, or a review root's own pages from its own index, `{root}/query-index.json`, `indexUrlOf`; requests of 1,000 rows, in parallel after the first, `remainingOf | `breadcrumb.js`: { getPages, getPagesAt } |
| [`utils/site.js`](../../utils/site.js) | `LOCALES`, `DEFAULT_LOCALE`, `getLocale`, `indexRoot`, `REVIEW_ROOTS` and `REVIEW_SHEETS` (the three review roots, KB-D-068: /language-master/en for testing, /language-masters/en the language master, /design-block-master | `breadcrumb.js`: { getParentPages, toPublishedPath } |

<!-- END GENERATED: files -->

`breadcrumb-data.js` is pure and unit tested (`test/breadcrumb/breadcrumb-data.test.mjs`): `levelsOf`, `pathKey`, `trailOf`, `itemsOf`. `breadcrumb.js` renders through `renderWhenLoaded` (`decorators/skeleton-decorator.js`): a line skeleton when the titles take longer than 150ms.

Rendered markup:

```html
<div class="breadcrumb block">
  <nav aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item"><a href="/en/">Home</a></li>
      <li class="breadcrumb-item"><a href="/en/insights">Insights</a></li>
      <li class="breadcrumb-item" aria-current="page">AI in banking</li>
    </ol>
  </nav>
</div>
```

In Universal Editor the links are the AEM pages (`…/us/en/insights.html`), as `getParentPages` returns them when editing.

## Extending the Block

- More levels: add values to `LEVELS` (`breadcrumb-data.js`) and options to `levels` in `_breadcrumb.json`.
- A different separator: change the `content` of `.breadcrumb-item + .breadcrumb-item::before` (keep the empty alternative text).
- Another Text color: add an option to `textColor`, its value to `TEXT_COLORS` (`breadcrumb.js`) and a rule setting `--breadcrumb-color` / `--breadcrumb-line-color`.
- Run `npm run build:json`, `npm run build:docs` and `npm test` after a model change.

## For Site Administrators

The placeholders `breadcrumb` (the navigation's name), `home` (the Home label) and `breadcrumbEmpty` (the editor hint) translate the block's text; English fallbacks are in the code. Parent pages must be published to appear.

## For Architects

A key-value block with no item children and no shared state. It reuses `utils/site.js` (`getParentPages`, `toPublishedPath`) and `utils/query-index.js` (`getPages`, loaded once per page and shared with the List and Filter List; `getPagesAt` for pages the index doesn't have). No new integration.

## For QA and Support Teams

- On a page three levels below Home: Home > level 1 > level 2 > the page; each link opens its page.
- Levels shown 1: only the direct parent, then the page.
- Show current page off: the trail ends with the direct parent.
- On the Home page: nothing on the page; a dashed hint in Universal Editor.

## Troubleshooting

| Symptom | Cause | Fix |
| ------- | ----- | --- |
| A parent is missing from the trail | The parent page isn't published (or doesn't exist) | Publish the parent page |
| A label is long or wrong | The parent page's Title | Change the parent page's Title |
| Nothing shows | The page is the Home page, or outside a locale | Expected: the block needs parent pages |

## Performance Considerations

One query index request shared with the other index-based blocks; a parent the index doesn't have costs one page request (in parallel, once per page). The block renders through `renderWhenLoaded`, so a slow index shows a skeleton instead of holding the section back. No layout reads.

## Security and Privacy

The trail is built from the page's own URL and published titles; no personal data is recorded.

## Known Limitations

- The labels are the page titles; there is no separate breadcrumb title.
- Only the parents in the URL path (the site structure), not the visitor's own path through the site.
- No structured data (`BreadcrumbList` JSON-LD) yet.

## Related Documentation

- [Anchor List](../anchor-list/README.md)
- [Block documentation](../README.md)
- [Content architecture](../../docs/handover/knowledge-base/content-architecture.md)

<!-- BEGIN GENERATED: usage (npm run build:docs) -->

No block library or curated design page using this block was recorded in the library snapshot.

Project-wide standards: [knowledge base](../../docs/handover/knowledge-base/README.md) ([block governance](../../docs/handover/knowledge-base/blocks.md)).

<!-- END GENERATED: usage -->

## Change History

| Date | Change |
| ---- | ------ |
| 9 November 2026 | Block added: Levels shown and Show current page, with the Additional tab. |
| 9 November 2026 | Design: capitals with letter spacing, slash separators, the current page in bold, a line below; Text color (Default, White). |
