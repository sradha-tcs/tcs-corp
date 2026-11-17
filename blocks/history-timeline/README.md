# History Timeline

The History Timeline block tells the company's history as a horizontal strip of milestone cards: each card has a large year, a title, a description, an image and an optional call to action. The cards have staggered sizes and sit on a common baseline, and a "The story continues" panel closes the strip. Above it, a line from the first milestone's year to the last one's fills as the strip scrolls, and previous / next buttons sit below it. The block implements the TCS Figma frame "Match · History timeline" (5585-8421). It is a key-value block with item children: each milestone is a **Milestone** item (`history-timeline-item`) added to the block with Add.

| Attribute | Value |
| --------- | ----- |
| Technical name | `history-timeline` (model `history-timeline`, template name "History Timeline"); item `history-timeline-item` (template name "Milestone") |
| Display name | History Timeline |
| Block type | Key-value block (`key-value: true`) with item children |
| Status | Active |
| Parent / children | Parents: Section, Columns Container, Tabs Container (filters `section`, `columns-container`, `tabs`). Children: Milestone (`history-timeline-item`) |
| Owner / version / date | Not recorded / Not recorded / Not recorded |

## Overview

- **Business purpose:** presents the company's history (or any chronology: a programme, a partnership, a product) as a story the visitor moves through, with a picture for each step.
- **User experience:** the strip scrolls sideways (swipe, mouse drag, the previous / next buttons, or the arrow keys, Home and End on the focused strip). The line above it shows how far along the timeline the visitor is. On desktop (900px and wider) the cards take the Figma sizes (eight sizes, repeated for more milestones) and line up at the bottom; on mobile and tablet the cards share one width and height.
- **Templates / page types:** any page, typically an About or History page. No template adds the block.
- **Data source:** authored fields only. UI text (the strip's label, the button labels, the default closing panel text) comes from the placeholders.
- **Related blocks:** Cards (`blocks/cards`) for cards without a chronology, in a grid or horizontal scroll; Gen Carousel (`blocks/gen-carousel`) for full-width slides.
- **When to use:** three or more dated milestones that are read in order.
- **When not to use:** a list of unrelated cards (use Cards); a single milestone (use a Teaser); content that must be compared side by side (use a Table).
- **Realistic use cases:** the company history on the About page; the history of a business unit, a partnership or a location.

## Visual Reference

<!-- BEGIN GENERATED: screenshots (npm run build:docs) -->

No handover screenshot of this block was identified.

Universal Editor dialogs (no screenshot exists yet; to be captured on AEM author):

```text
[Screenshot Placeholder]

File name:
history-timeline-dialog-content-desktop.png

Purpose:
The Content tab of the History Timeline properties in Universal Editor, with the fields of the table "Content tab — History Timeline" in Authorable Fields below.

Annotations:
A = Start label
B = End label
C = Closing panel
```

```text
[Screenshot Placeholder]

File name:
history-timeline-dialog-style-desktop.png

Purpose:
The Style tab of the History Timeline properties in Universal Editor, with the fields of the table "Style tab — History Timeline" in Authorable Fields below.

Annotations:
A = Milestone heading level
B = Hide closing panel
```

```text
[Screenshot Placeholder]

File name:
history-timeline-dialog-additional-desktop.png

Purpose:
The Additional tab of the History Timeline properties in Universal Editor, with the fields of the table "Additional tab — History Timeline" in Authorable Fields below.

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

```text
[Screenshot Placeholder]

File name:
history-timeline-item-dialog-milestone-desktop.png

Purpose:
The Milestone tab of the Milestone properties in Universal Editor, with the fields of the table "Milestone tab — Milestone" in Authorable Fields below.

Annotations:
A = Year
B = Title
C = Description
D = Image
E = Image Alt Text
F = CTA Link
G = CTA Text
```

<!-- END GENERATED: screenshots -->

Figma: "Match · History timeline" (5585-8421), a desktop frame of 1600 × 1024px (minimum width 1025px). The Figma file has no mobile or tablet frame for it: the mobile and tablet layouts are derived from the desktop design (see [Responsive Behavior](#responsive-behavior)).

## For Content Authors

Add a History Timeline to a section, then add one **Milestone** per step of the story with Add, in chronological order. The block's **Start label** and **End label** (Content tab) label the two ends of the line above the strip (for example 1968 and Today); left empty, they show the first and the last milestone's Year. A milestone needs at least a year, a title, a description or an image to be shown; a milestone just added shows as a placeholder in the editor until it has one.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

### History Timeline (`history-timeline`)

Model `history-timeline`; template name "History Timeline" (the block class AEM renders); key-value block (one row per property); children: `history-timeline-item`.

Stored on a new component (definition template): `headingLevel` = `"h3"`.

#### Content tab — History Timeline

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Start label | `startLabel` | text | No | — | — | The left end of the timeline line, e.g. 1968. Leave empty for the first milestone’s year. | — |
| End label | `endLabel` | text | No | — | — | The right end of the timeline line, e.g. Today. Leave empty for the last milestone’s year. | — |
| Closing panel | `closingLabel` | text | No | — | — | Shown after the last milestone. Leave empty for “The story continues”. | — |

#### Style tab — History Timeline

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Milestone heading level | `headingLevel` | select | No | `h3` | H2 (`h2`), H3 (`h3`), H4 (`h4`), H5 (`h5`), H6 (`h6`) | The heading level of each milestone title; choose the level after the heading above the timeline. | — |
| Hide closing panel | `hideClosing` | boolean | No | `false` | on / off | — | — |

#### Additional tab — History Timeline

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

### Milestone (`history-timeline-item`)

Model `history-timeline-item`; template name "Milestone" (the block class AEM renders).

#### Milestone tab — Milestone

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Year | `year` | text | No | — | — | e.g. 1968 or Today. The first and last milestones’ years label the timeline line. | — |
| Title | `title` | text | No | — | — | — | — |
| Description | `description` | richtext | No | "" | — | — | — |
| Image | `image` | reference | No | — | — | — | — |
| Image Alt Text | `imageAlt` | text | No | — | — | Describe the image; leave empty when it is decorative. Delivered with `image` (field collapse). | — |
| CTA Link | `link` | aem-content | No | — | — | Optional: a page or URL the milestone links to. | — |
| CTA Text | `linkText` | text | No | — | — | e.g. Learn more. Delivered with `link` (field collapse). | — |

<!-- END GENERATED: fields -->

Notes:

- **Image Alt Text** collapses into the image and **CTA Text** into the CTA Link (AEM delivery rules): they are delivered as the image's alt and the link's text.
- **Milestone heading level** applies to every milestone title of the block (H3 by default). Choose the level after the heading above the timeline so the page's heading hierarchy doesn't skip a level.
- **Start label** / **End label** empty: the first / last milestone's Year. The year row is shown when both ends have a label.
- Figma layer → field: Header "Year label" 1968 → Start label; "Year label" Today → End label; Article "Date column" → Year; "Content column" → Title and Description; "Figure" → Image and Image Alt Text; "Story continues" → Closing panel. The year row line and the previous / next buttons aren't authored.
- **Closing panel** empty: the panel shows the placeholder `historyTimelineEnd` ("The story continues").

## Screenshot-Based Authoring Steps

### Authoring Step 1: Add the History Timeline

Not recorded: no Universal Editor screenshots were taken (Blocked: author access).

### Values to Enter

| Field | Value |
| --- | --- |
| Component | History Timeline (in the section's Add menu) |
| Start label | 1968 |
| End label | Today |
| Closing panel | The story continues |
| Milestone heading level | H3 (a heading H2 above the block) |

### Authoring Step 2: Add the milestones

Not recorded: no Universal Editor screenshots were taken (Blocked: author access).

### Values to Enter

| Field | Value |
| --- | --- |
| Year | 1968 |
| Title | An idea takes shape |
| Description | Mr. Fakir Chand Kohli, fondly known as the Father of Indian IT, brings together a young team … |
| Image | A portrait from the DAM |
| Image Alt Text | Portrait of F. C. Kohli |
| CTA Link / CTA Text | Optional, e.g. /about and Learn more |

## Variations

### Default

The Figma design: eight milestones, staggered cards, "The story continues" closing panel.

### With CTAs

A milestone with a CTA Link shows it under its description as a link button (semibold, underlined, with a chevron). The Figma frame has no CTA: its style is the site's link button.

### Custom or hidden closing panel

Closing panel sets the panel's text; Hide closing panel (Style tab) removes it.

### Without images

A milestone without an image holds its text only (aligned at the bottom of its card on desktop).

## Complete Authoring Example

The test page `drafts/history-timeline.html` holds the Figma content (eight milestones) and a second timeline with CTAs, a custom closing panel and a milestone without an image. As delivered by AEM (a key-value row per property, then a row per Milestone: the tab cell, year, title, description, image, link):

```html
<div class="history-timeline">
  <div><div>headingLevel</div><div>h3</div></div>
  <div><div></div><div><p>1968</p></div><div><p>An idea takes shape</p></div><div><p>Mr. Fakir Chand Kohli …</p></div><div><picture><img src="…" alt="Portrait of F. C. Kohli"></picture></div><div></div></div>
  <div><div></div><div><p>2005</p></div><div><p>Global Expansion</p></div><div><p>…</p></div><div><picture>…</picture></div><div><p><a href="/history">Read More</a></p></div></div>
</div>
```

| Year | Title | Description | Image | CTA Text | CTA Link |
| --- | --- | --- | --- | --- | --- |
| 1995 | Company Founded | Description | image.jpg | Learn More | /about |
| 2005 | Global Expansion | Description | image.jpg | Read More | /history |

## Content and Asset Guidelines

- Keep descriptions to about 40 words: on desktop the text and the image share the card's Figma height, so longer text leaves less image (the image keeps at least 12.5rem, and a card grows when its text needs more).
- Images are cropped to fill their space (`object-fit: cover`): keep the subject in the centre. Landscape and portrait images both work; at least 900px wide.
- Write alt text for informative images (a person, a place, an event); leave it empty for decorative ones.
- Year: a four-digit year is marked up as `<time datetime="YYYY">`; other values (Today, 1990s) are plain text.

## Accessibility

- The milestones are an ordered list (`<ol>`) inside a region labelled with the placeholder `historyTimeline` ("History timeline"); each title is a heading of the authored level.
- The year row (the two labels and the progress line) is `aria-hidden`: the list and the buttons convey the same information.
- Previous / next are `<button>`s with accessible names (placeholders `historyTimelinePrevious`, `historyTimelineNext`) and `aria-controls` pointing at the strip; at the start / end they are `aria-disabled` (not `disabled`, so focus isn't lost) (`decorators/scroller-decorator.js`).
- While the strip scrolls it is keyboard focusable (`tabindex="0"`), with the arrow keys, Home and End; links and CTAs inside are reached with Tab. Focus is shown by the site's focus ring (`--color-border-brand`), drawn inside the strip's edge.
- Contrast: text `--color-text-default` and `--color-text-secondary` (6.9:1) on the block background `#f9f9f9`; the buttons' brand 400 outline and chevron (5.4:1 on white, per `styles/styles.css`). Inside a Dark / Dark green section the block takes the section's colour and the theme contract's light tokens.
- Nothing moves on its own; smooth scrolling is turned off for reduced motion.

## Data Layer and Analytics

The block is added to the Adobe Client Data Layer by `decorators/data-layer-decorator.js` like every block. The previous / next buttons carry `data-cmp-interaction="previous"` / `"next"` and the CTAs `data-cmp-interaction="cta"`; clicks are captured centrally. The block pushes no events itself.

## Personalization

None. No personalization is implemented on the site (see the knowledge base page personalization.md).

## Responsive Behavior

| Width | Layout |
| --- | --- |
| < 600px | Cards 17.5rem wide (narrower on phones under 370px, so about 2rem of the next card shows), of equal height (the tallest card's), image at least 12.5rem; gutter 1rem; closing panel 12.5rem |
| 600–899px | Cards 22.5rem; gutter 2.5rem; closing panel 15rem |
| 900–1199px | The Figma cards: eight widths and heights (Article-1 … Article-8: 420 × 669, 380 × 549, 387 × 489, 400 × 579, 450 × 519, 410 × 459, 440 × 559, 420 × 499px), repeated for more milestones, aligned at the bottom of the strip. The strip is a screen high: 49.8125rem (797px, the Figma 1024px frame) on screens 1024px high or more; on lower screens the space above the tallest card shrinks (down to the tallest card, 669px), so the cards keep their Figma sizes; closing panel 16.875rem (270px); gutter 2.5rem |
| ≥ 1200px | As above with the Figma gutter of 5rem (80px) |

In a Fixed Width section the section's own gutter replaces the block's (the block adds only what the section doesn't give). Type follows the site tokens: the year `--heading-font-size-xl` (40px from 900px), the title `--heading-font-size-s` (20px), the year labels `--heading-font-size-m` (24px), the description `--label-font-size` (14px).

## For Developers

<!-- BEGIN GENERATED: files (npm run build:docs) -->

```text
blocks/history-timeline/
├── README.md
├── _history-timeline.json
├── history-timeline.css
└── history-timeline.js
```

| Decorator/Utility | Purpose | Execution or dependency point |
| ----------------- | ------- | ----------------------------- |
| [`scripts/scripts.js`](../../scripts/scripts.js) | Page decoration (moveInstrumentation and shared page helpers) | `history-timeline.js`: { moveInstrumentation } |
| [`decorators/button-decorator.js`](../../decorators/button-decorator.js) | `decorateButton` (option `newTabHint`: a link opening a new tab says so), `createButton`, `setButtonDisabled`, `setButtonAlignment`, `removeButtonDecoration` | `history-timeline.js`: { decorateButton } |
| [`decorators/content-decorator.js`](../../decorators/content-decorator.js) | `fromCell` (property content into an element, keeping editor instrumentation) | `history-timeline.js`: { fromCell } |
| [`decorators/editor-item-decorator.js`](../../decorators/editor-item-decorator.js) | `buildEditorItems`, `editorItemHint` (in Universal Editor, an item the block doesn't render yet, e.g. a CTA just added, as a dashed placeholder the author can select; styles in `styles/lazy-styles.css`; the hint loaded o | `history-timeline.js`: { buildEditorItems, editorItemHint } |
| [`decorators/heading-decorator.js`](../../decorators/heading-decorator.js) | `buildHeading` (Title + Title Type), `HEADINGS` | `history-timeline.js`: { buildHeading } |
| [`decorators/icon-button-decorator.js`](../../decorators/icon-button-decorator.js) | `createIconButton` | `history-timeline.js`: { createIconButton } |
| [`decorators/image-decorator.js`](../../decorators/image-decorator.js) | `pictureOf` (image with its alt text field) | `history-timeline.js`: { pictureOf } |
| [`decorators/scroller-decorator.js`](../../decorators/scroller-decorator.js) | `createScroller` (previous / next, scroll indicator, mouse drag, keyboard, loop and initial item for a CSS horizontal scroller; active only while it scrolls) | `history-timeline.js`: { createScroller } |
| [`utils/cells.js`](../../utils/cells.js) | `itemRows`, `KEY_VALUE_ITEM`, `FIELD_ROW_ITEM` (the item rows of a block: by model in the editor, by their cells on the page), `withoutTabCells` (drops the empty cell AEM renders for each dialog tab of an item model), `m | `history-timeline.js`: { KEY_VALUE_ITEM, itemRows, matchCells, withoutTabCells, } |
| [`utils/ids.js`](../../utils/ids.js) | `nextInstance`, `uniqueId`, `createIdFactory` (unique ids per block instance), `availableId` (an authored id kept, suffixed -2, -3, ... only when taken) | `history-timeline.js`: { uniqueId } |
| [`utils/links.js`](../../utils/links.js) | `NEW_WINDOW`, `linkOf`, `linkPathsOf` (the paths of a page property, one or many), `readLinkItems` (CTA lists with Link Type and the items' other select values), `readLinkRows` (the same from link item rows, e.g. Hero CT | `history-timeline.js`: { linkOf } |
| [`utils/placeholders.js`](../../utils/placeholders.js) | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | `history-timeline.js`: { getPlaceholders } |
| [`utils/properties.js`](../../utils/properties.js) | `readProperties`, `textOf`, `isOn`, `isOnByDefault` (a toggle that defaults to on), `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | `history-timeline.js`: { isOn, readProperties, textOf } |

<!-- END GENERATED: files -->

- `history-timeline.js` reads the properties (`readProperties`) and the Milestone rows (`itemRows` with `KEY_VALUE_ITEM`, then `withoutTabCells` / `matchCells` against `MILESTONE_LAYOUT`: tab, year, title, description, image, link), builds the year row, the strip (`.history-timeline-viewport` > `.history-timeline-track` > `ol.history-timeline-list` + `.history-timeline-closing`) and the controls, and hands the strip to `createScroller` (`decorators/scroller-decorator.js`) with the year row's line as its indicator.
- The progress line reads the scroller's `--scroller-thumb-offset` (0 to 1) and `--history-timeline-count` (set on the block): its width is `(1 + offset × (count − 1)) / count`, one milestone's share at the start and all of it at the end; 100% when the strip doesn't scroll. No layout is read during decoration.
- Editor: rows without content render as placeholders (`buildEditorItems`); every rendered element keeps its instrumentation (`moveInstrumentation`, `fromCell`, `buildHeading`, `pictureOf`).
- Shared code: `decorators/button-decorator.js` (CTA link button), `icon-button-decorator.js` (previous / next), `content-decorator.js`, `heading-decorator.js`, `image-decorator.js`, `editor-item-decorator.js`, `scroller-decorator.js`; `utils/cells.js`, `ids.js`, `links.js`, `placeholders.js`, `properties.js`.
- Animation: registered in `decorators/motion-decorator.js` (`CONTENT_TARGETS`: the year row and the milestones, one after another).

## Extending the Block

- More card sizes: add `:nth-child()` rules (and change the `8n` cycle) in the `width >= 900px` query of `history-timeline.css`.
- A new Milestone field: add it to the item model, `MILESTONE_LAYOUT`, `MATCHERS` and `test/items/item-rows.test.mjs`, and raise the `history-timeline-item` entry of `xwalk/max-cells` in `.eslintrc.js`.

## For Site Administrators

Placeholders used (add them to each locale's placeholders sheet to translate): `historyTimeline` (History timeline), `historyTimelinePrevious` (Previous milestones), `historyTimelineNext` (Next milestones), `historyTimelineEnd` (The story continues). Images are delivered with the page; nothing else needs publishing.

## For Architects

A new block (no existing block covers a chronological strip with a progress line): it reuses the scroller, button, heading, image and editor item decorators, so it adds no scrolling or button code of its own. Content model: item children (decision log: item children instead of composite multifields). It doesn't replace or overlap another block.

## For QA and Support Teams

Check on `drafts/history-timeline.html` at 1600, 1440, 700 and 390px: the cards' sizes and baseline at desktop; the progress line at the start (one milestone's share) and the end (full); previous disabled at the start and next at the end; arrow keys, Home and End on the focused strip; the second timeline's CTAs, "More to come" panel and the milestone without an image; no horizontal page scroll on mobile.

## Troubleshooting

| Symptom | Cause | Resolution |
| --- | --- | --- |
| A milestone isn't shown | It has no year, title, description or image | Fill in at least one of them |
| The year row is missing | No Start / End label and fewer than two milestones with a year | Fill in Start label and End label |
| History Timeline isn't in the editor's Add menu, or its fields can't be edited | Universal Editor reads the component definitions (`component-definition.json`, `component-models.json`, `component-filters.json`) and the block code from the branch the site is configured with (`main`): a block only on a feature branch isn't offered | Merge the pull request into `main` (or point the site configuration at the feature branch for testing) |
| The buttons are missing | The strip doesn't scroll (all cards fit) | Expected |
| Button labels in English on a localized page | The placeholders aren't in the locale's sheet | Add the keys under For Site Administrators |

## Performance Considerations

No dependencies and no layout reads while decorating: the scroller measures in a shared animation frame. Images are the authored, optimized `<picture>`s, lazy as delivered. The block is CSS-only for its layout; the progress line is a CSS width from one custom property.

## Security and Privacy

No personal data, no external requests; links are the authored ones.

## Known Limitations

- Figma has only a desktop frame: the mobile and tablet layouts are derived from it.
- In Figma the progress line is a static 149px of 1278px; the block fills it by the scroll position (one milestone's share at the start).
- Figma shows both buttons in their default state; at the start / end the block shows the site's disabled button state (grey), as the List and Cards scrollers do.
- Card sizes repeat every eight milestones; they don't adapt to the text length (a card grows only when its text doesn't fit).

## Related Documentation

- [blocks/README.md](../README.md)
- [decorators/README.md](../../decorators/README.md) (scroller, button and icon button decorators)
- [Cards](../cards/README.md)

<!-- BEGIN GENERATED: usage (npm run build:docs) -->

No block library or curated design page using this block was recorded in the library snapshot.

Project-wide standards: [knowledge base](../../docs/handover/knowledge-base/README.md) ([block governance](../../docs/handover/knowledge-base/blocks.md)).

<!-- END GENERATED: usage -->

## Change History

| Date | Change |
| --- | --- |
| 17 November 2026 | New block from the Figma "Match · History timeline" frame |
| 17 November 2026 | Start label and End label fields (Figma year row); desktop strip follows the screen height; mobile cards narrow so the next one peeks in |
