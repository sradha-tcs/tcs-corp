# Blockquote

The Blockquote block shows a quotation in italics next to a coloured line on its left, for example a pull quote from a press release or an article. It is a key-value block: Universal Editor stores one row per property, and `blocks/blockquote/blockquote.js` turns the rows into a `<blockquote>`.

| Attribute | Value |
| --------- | ----- |
| Technical name | `blockquote` (model `blockquote`, template name "Blockquote") |
| Display name | Blockquote |
| Block type | Key-value block (`key-value: true`), no item children |
| Status | Active |
| Parent / children | Parents: Section, Columns Container, Tabs Container (filters `section`, `columns-container`, `tabs`). Children: none |
| Owner / version / date | Not recorded / 1.0 / 9 November 2026 |

## Overview

- **Business purpose:** sets a key statement apart from the running text without the weight of a full quote card.
- **User experience:** the quote in large italic text, with a rounded line in the Line color on its left, as tall as the text. The block starts at the content edge and wraps at 66rem.
- **Templates / page types:** any page. No template adds the block.
- **Data source:** authored fields only. The block reads no sheet, metadata or query index; the empty-block hint in Universal Editor comes from the placeholders (`blockquoteEmpty`).
- **Related blocks:** Quote (`blocks/quote`) for an attributed statement with an author, quote marks and a portrait. Testimonial (`blocks/testimonial`) for a centred testimonial with stats.
- **When to use:** a short pull quote or highlighted statement in a page's text.
- **When not to use:** to name the person quoted or show a portrait (use a Quote). For a call to action (use a Teaser or a Button).
- **Realistic use cases:** a partner statement in a press release; a pull quote in an article or blog post.

## Visual Reference

<!-- BEGIN GENERATED: screenshots (npm run build:docs) -->

No handover screenshot of this block was identified.

Universal Editor dialogs (no screenshot exists yet; to be captured on AEM author):

```text
[Screenshot Placeholder]

File name:
blockquote-dialog-content-desktop.png

Purpose:
The Content tab of the Blockquote properties in Universal Editor, with the fields of the table "Content tab — Blockquote" in Authorable Fields below.

Annotations:
A = Quote
```

```text
[Screenshot Placeholder]

File name:
blockquote-dialog-style-desktop.png

Purpose:
The Style tab of the Blockquote properties in Universal Editor, with the fields of the table "Style tab — Blockquote" in Authorable Fields below.

Annotations:
A = Line color
```

```text
[Screenshot Placeholder]

File name:
blockquote-dialog-additional-desktop.png

Purpose:
The Additional tab of the Blockquote properties in Universal Editor, with the fields of the table "Additional tab — Blockquote" in Authorable Fields below.

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

Add a **Blockquote** to a section, a Columns Container column or a tab, type the quote on the Content tab and, if needed, choose its **Line color** on the Style tab. Type the quote without quotation marks: the line marks it as a quote.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

### Blockquote (`blockquote`)

Model `blockquote`; template name "Blockquote" (the block class AEM renders); key-value block (one row per property).

Stored on a new component (definition template): `lineColor` = `"brand-blue"`.

#### Content tab — Blockquote

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Quote | `quote` | richtext | No | "" | — | The quoted text, shown in italics next to the coloured line. Don't type quotation marks. | — |

#### Style tab — Blockquote

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Line color | `lineColor` | select | No | `brand-blue` | Brand blue (`brand-blue`) | Colour of the line on the left of the quote. | — |

#### Additional tab — Blockquote

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

- **Quote:** rich text. Several paragraphs stay paragraphs inside the one `<blockquote>`; the line spans all of them.
- **Line color:** a block class `line-<value>`; Brand blue (`line-brand-blue`, `--brand-500` #4673DB) is the default, also when no value is stored.

## Screenshot-Based Authoring Steps

### Authoring Step 1: Add the quote

Author action: in Universal Editor, add a **Blockquote** to the section, then type the quote in **Quote** on the Content tab. Expected preview: the quote in italics with the brand blue line on its left. Validation: the line is as tall as the text. Common mistake: typing quotation marks; remove them.

### Authoring Step 2: Choose the line colour

Author action: on the Style tab, choose **Line color**. Expected preview: the line changes colour. Validation: today Brand blue is the only colour.

## Variations

### Line color: Brand blue (`line-brand-blue`)

Purpose: the colour of the line on the left. Rendering: `--blockquote-line-color` on the block. Brand blue is the only colour today; see [Extending the Block](#extending-the-block) to add one.

## Complete Authoring Example

| Field | Value |
| ----- | ----- |
| Quote | Tata Consultancy Services is the inaugural partner in this program, which will combine its deep industry knowledge and advisory services with Conga's innovative Revenue Lifecycle Management solutions |
| Line color | Brand blue |

Expected result: the quote in italics next to a brand blue line as tall as the text.

## Content and Asset Guidelines

- Keep the quote short (one to three sentences); long italic text is harder to read.
- Use the approved wording; don't add quotation marks or an attribution in the quote (use a Quote for an attributed statement).
- No images or assets.

## Accessibility

- The quote is a `<blockquote>` (its paragraphs as `<p>`); the line is a decorative `::before` box with no content, so screen readers don't announce it.
- The text uses `--color-text-default`, so it follows the dark Section theme. The line is decorative and isn't text.
- Italic text over several lines is harder to read: keep blockquotes short.

## Data Layer and Analytics

The block entry only (`decorators/data-layer-decorator.js`); the block has no interactive elements.

## Personalization

None: the block shows its authored quote to every visitor.

## Responsive Behavior

- Below 900px: `--body-font-size-l` text, 1.5rem between the line and the text.
- From 900px: 2.5rem between the line and the text. `--body-font-size-l` grows to 1.5rem at the site's desktop breakpoint; the line height is 1.875.

## For Developers

<!-- BEGIN GENERATED: files (npm run build:docs) -->

```text
blocks/blockquote/
├── README.md
├── _blockquote.json
├── blockquote.css
└── blockquote.js
```

| Decorator/Utility | Purpose | Execution or dependency point |
| ----------------- | ------- | ----------------------------- |
| [`decorators/content-decorator.js`](../../decorators/content-decorator.js) | `fromCell` (property content into an element, keeping editor instrumentation) | `blockquote.js`: { fromCell } |
| [`utils/environment.js`](../../utils/environment.js) | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor`, `isAuthor` (the page is rendered by AEM author, which has no query index) | `blockquote.js`: { isEditing } |
| [`utils/placeholders.js`](../../utils/placeholders.js) | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | `blockquote.js`: { getPlaceholders } |
| [`utils/properties.js`](../../utils/properties.js) | `readProperties`, `textOf`, `isOn`, `isOnByDefault` (a toggle that defaults to on), `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | `blockquote.js`: { optionOf, readProperties, textOf } |

<!-- END GENERATED: files -->

Rendered markup:

```html
<div class="blockquote block line-brand-blue">
  <blockquote class="blockquote-text"><p>…</p></blockquote>
</div>
```

Developer responsibilities: keep the `<blockquote>` and the line as CSS (no extra element), and read Line color with `optionOf` so a missing value falls back to Brand blue.

## Extending the Block

To add a Line color: add an option to `lineColor` in `_blockquote.json` (value `<name>`), add `<name>` to `LINE_COLORS` in `blockquote.js` and a `.blockquote.line-<name>` rule setting `--blockquote-line-color` in `blockquote.css` (use a colour token), then run `npm run build:json` and `npm run build:docs`.

## For Site Administrators

Nothing to configure: the block needs no sheet or site setting. The optional placeholder `blockquoteEmpty` translates the empty-block hint in Universal Editor (English fallback in the code).

## For Architects

A key-value block with no item children, no data source and no shared state. It is separate from the Quote block by decision KB-D-070 (Proposed): the Quote is a card with an author and a portrait, the Blockquote a plain pull quote.

## For QA and Support Teams

- The quote renders as a `<blockquote>` with the line on its left, as tall as the text, on mobile, tablet and desktop.
- With no Line color stored, the line is Brand blue (#4673DB).
- An empty Blockquote shows the dashed hint in Universal Editor and nothing on the published page.

## Troubleshooting

| Symptom | Cause | Fix |
| ------- | ----- | --- |
| Nothing shows on the page | The Quote is empty | Type the quote |
| The quote shows quotation marks | Marks typed in the text | Remove them from the Quote |

## Performance Considerations

No JavaScript runs beyond reading the rows (no network requests, no layout reads); the stylesheet is small and loads with the block.

## Security and Privacy

The block renders authored rich text only and records no personal data.

## Known Limitations

- One Line color (Brand blue) until more are added.
- No author or source line: use a Quote for an attributed statement.
- On a dark Section background the text turns light (theme tokens) but the line keeps its authored colour; check that Brand blue stands out there.

## Related Documentation

- [Quote](../quote/README.md), [Testimonial](../testimonial/README.md)
- [Block documentation](../README.md)

<!-- BEGIN GENERATED: usage (npm run build:docs) -->

No block library or curated design page using this block was recorded in the library snapshot.

Project-wide standards: [knowledge base](../../docs/handover/knowledge-base/README.md) ([block governance](../../docs/handover/knowledge-base/blocks.md)).

<!-- END GENERATED: usage -->

## Change History

| Date | Change |
| ---- | ------ |
| 9 November 2026 | Block added: Quote and Line color (Brand blue) with the Additional tab (KB-D-070). |
