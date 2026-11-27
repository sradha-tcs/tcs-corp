# Rich Text

The Rich Text block holds authored rich text, edited with the full Universal Editor rich text
toolbar (KB-D-080), and adds the style variations the built-in Text component can't carry: the
built-in Text delivers no classes, so alignment, text size, a lead paragraph, a text colour,
columns and a reading width are block options here. Use the built-in Text for plain running text;
use Rich Text when the text needs one of these styles or a table.

| Attribute | Value |
| --------- | ----- |
| Technical name | `rich-text` (template name "Rich Text", block class `rich-text`) |
| Display name | Rich Text |
| Block type | Independent block (key-value: one rich text field; Style and Additional tabs as block classes) |
| Status | Active (KB-D-080, Approved 27 November 2026) |
| Parent / children | Offered in Sections, Columns Container columns and Tabs Container tabs (after Text); no child items |
| Owner / version / date | Not recorded |

## Overview

**Purpose.** Text with the editor's whole toolbar (headings, lists, links, images, tables,
superscript / subscript, code, quotes, special characters) and block-level styles.

**Business value.** Authors get the familiar AEM rich text toolbar and can style a text without a
developer, in a way that survives publishing (block classes are delivered; inline styles aren't).

**When to use.** Introductions with a lead paragraph, centred statements, legal or small print,
text in two or three columns, text with a data table, code samples.

**When not to use.** A quote with an author and image (Quote), a data table on its own (Table),
plain running text without styles (the built-in Text).

**Data source.** The block's own Text field; the Style tab's selects arrive as block classes.

## Visual Reference

<!-- BEGIN GENERATED: screenshots (npm run build:docs) -->

No handover screenshot of this block was identified.

Universal Editor dialogs (no screenshot exists yet; to be captured on AEM author):

```text
[Screenshot Placeholder]

File name:
rich-text-dialog-content-desktop.png

Purpose:
The Content tab of the Rich Text properties in Universal Editor, with the fields of the table "Content tab — Rich Text" in Authorable Fields below.

Annotations:
A = Text
```

```text
[Screenshot Placeholder]

File name:
rich-text-dialog-style-desktop.png

Purpose:
The Style tab of the Rich Text properties in Universal Editor, with the fields of the table "Style tab — Rich Text" in Authorable Fields below.

Annotations:
A = Alignment
B = Text size
C = First paragraph
D = Text colour
E = Columns
F = Width
```

```text
[Screenshot Placeholder]

File name:
rich-text-dialog-additional-desktop.png

Purpose:
The Additional tab of the Rich Text properties in Universal Editor, with the fields of the table "Additional tab — Rich Text" in Authorable Fields below.

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

Screenshots: Not recorded (new block; add them to the block library and the handover screenshots).

## For Content Authors

1. In Universal Editor select a Section (or a Columns Container column, a Tabs Container tab) and
   choose Add > Rich Text.
2. Write the text in the **Text** field (or in place on the page) with the toolbar.
3. Choose the styles in the **Style** tab and the spacing in the **Additional** tab.

**Toolbar features that are kept on publish:** bold, italic, underline, strikethrough, inline code,
paragraph and H1–H6, code block, bullet and numbered lists (nested), links, images, tables,
superscript / subscript, special characters; remove format, clean unsupported tags, paste as text,
find and replace, fullscreen.

**Toolbar features that look right in the editor but aren't kept on publish** (Edge Delivery
doesn't deliver `style`, `class` or `dir` attributes): text colour, alignment, text direction,
indentation of paragraphs, the Text style classes (Lead paragraph, Small print, Highlight) and the
link target. Use the Style tab for alignment, size and colour. Quotes (blockquote) aren't in Edge
Delivery's list of delivered elements: Requires validation.

**Block library.** Every variation is on the block library pages below
`/design-block-master/en/block-library/rich-text/` (at most ten variations a page): Rich Text
alignment, width and columns (`rich-text-layout`, 10), text size, lead paragraph and colour on the
Section backgrounds (`rich-text-typography`, 10), toolbar content (`rich-text-toolbar`, 10), the
Additional tab (`rich-text-additional`, 7) and the built-in Text component's toolbar
(`text-component`, 9). They come in the content package `tcs-corp-rich-text-library-content`
([content-packages/rich-text/](../../content-packages/rich-text/README.md): its install steps; for
sradha-tcs/tcs-corp-delivery `archive/home-content-package/rich-text/` once it can be pushed there,
KB-D-070, KB-D-081), generated with
`node tools/library/generate-rich-text-library.mjs` from the current models (run it after
`npm run build:json`; `--root language-master` targets the other review root, `--version` sets the
package version). The same run writes the delivered markup to `drafts/rich-text-library/` for the
local and feature previews. The images are the block library package's DAM images: install that
package first on an environment without them.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

### Rich Text (`rich-text`)

Model `rich-text`; template name "Rich Text" (the block class AEM renders); key-value block (one row per property).

#### Content tab — Rich Text

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Text | `text` | richtext | No | — | — | Rich text with the full editor toolbar: headings, lists, links, images, tables, superscript / subscript, code and special characters. Text colour, alignment, direction and text style classes aren't kept on publish: use the Style tab for alignment, size and colour. | — |

#### Style tab — Rich Text

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Alignment | `classes_align` | select | No | "" | Left (default) (""), Center (`align-center`), Right (`align-right`), Justify (`align-justify`) | The alignment of the whole text. Delivered as a block class. | — |
| Text size | `classes_size` | select | No | "" | Default (""), Small (`size-small`), Large (`size-large`) | The size of the paragraphs and lists (headings keep their level's size). Delivered as a block class. | — |
| First paragraph | `classes_lede` | select | No | "" | Default (""), Lead paragraph (larger) (`lede-first`) | Shows the first paragraph larger, as an introduction. Delivered as a block class. | — |
| Text colour | `classes_color` | select | No | "" | Default (""), Secondary (grey) (`color-secondary`), Brand (blue) (`color-brand`) | On dark Section backgrounds the text turns light whatever the colour. Delivered as a block class. | — |
| Columns | `classes_columns` | select | No | "" | One (default) (""), Two from tablet (`columns-2`), Three from desktop (two on tablet) (`columns-3`) | Flows the text into columns on wider screens; one column on mobile. Delivered as a block class. | — |
| Width | `classes_width` | select | No | "" | Full (default) (""), Medium (60rem) (`width-medium`), Narrow, easy to read (45rem) (`width-narrow`) | The maximum line length of the text. Delivered as a block class. | — |

#### Additional tab — Rich Text

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

## Screenshot-Based Authoring Steps

Not recorded (screenshots to be taken once the block is in the block library).

1. **Add the block:** Section > Add > Rich Text.
2. **Text:** type or paste the text; use the toolbar for headings, lists, links, images and tables.
3. **Style:** Alignment Center, Text size Large, First paragraph Lead paragraph.
4. **Additional:** Padding top / bottom for the space around it.
5. **Publish:** Quick Publish the page (and any images it uses).

## Variations

| Style field | Values (class) | Effect |
| ----------- | -------------- | ------ |
| Alignment | Left (default), Center (`align-center`), Right (`align-right`), Justify (`align-justify`) | The whole text's alignment |
| Text size | Default, Small (`size-small`), Large (`size-large`) | Paragraphs, list items and table cells; headings keep their size |
| First paragraph | Default, Lead paragraph (`lede-first`) | The first paragraph larger |
| Text colour | Default, Secondary (`color-secondary`), Brand (`color-brand`) | The text colour (light on dark Sections) |
| Columns | One (default), Two from tablet (`columns-2`), Three from desktop (`columns-3`) | The text flows into columns; one on mobile |
| Width | Full (default), Medium (`width-medium`, 60rem), Narrow (`width-narrow`, 45rem) | The maximum line length (centred with Alignment Center) |

The Additional tab adds Anchor ID, Hide block, animation and padding / margin, as on every block.

## Complete Authoring Example

Scenario: an introduction centred under a heading, with a lead paragraph.

- Text: "Our approach" (H2), two paragraphs, a bullet list.
- Style: Alignment Center, First paragraph Lead paragraph, Width Narrow.
- Additional: Padding top `pt-600`, Padding bottom `pb-600`.

Expected result: a centred column of at most 45rem, the first paragraph in the large body size.

## Content and Asset Guidelines

- One H1 per page; use the heading levels in order.
- Images: from the DAM, with alt text; they are delivered as optimized pictures.
- Tables: a header row; keep them narrow enough for mobile (wider ones scroll).
- Don't rely on text colour, alignment or classes in the toolbar: they aren't published.

## Accessibility

- The text is semantic HTML (headings, lists, `strong`, `em`, `del`, tables), as authored.
- A table wider than its container is a focusable region labelled "Table" (placeholder `table`)
  that keyboard users can scroll; it has a focus outline.
- Colours use the semantic tokens, so contrast holds on dark Sections.
- Columns keep the reading order (CSS columns, not reordering).

## Data Layer and Analytics

The block is a component in the Adobe Client Data Layer like every block (data-layer decorator);
links in it are tracked by the central click capture. It pushes no events of its own.

## Personalization

None.

## Responsive Behavior

Mobile first: one column below 600px; Columns Two from 600px; Three from 900px (two between 600px
and 899px). Wide tables scroll horizontally; images never exceed the text width.

## For Developers

- `rich-text.js`: `readProperties` reads the Text cell; its content moves into
  `.rich-text-content` with the Universal Editor instrumentation (`moveInstrumentation`); tables are
  wrapped in `.rich-text-table` (a region when they scroll, ResizeObserver); an empty block shows
  the placeholder `richTextEmpty` in the editor and nothing on the page.
- `rich-text.css`: the Style tab classes, quotes, code, superscript / subscript, tables, the Text
  style classes (`rte-lede`, `rte-small`, `rte-highlight`, if ever delivered).
- `_rich-text.json`: Content / Style / Additional; filter `rich-text` with the shared RTE
  configuration (`models/_rte.json#/rte`).
- Animation: `decorators/motion-decorator.js` `CONTENT_TARGETS` (`.rich-text-content`).

<!-- BEGIN GENERATED: files (npm run build:docs) -->

```text
blocks/rich-text/
├── README.md
├── _rich-text.json
├── rich-text.css
└── rich-text.js
```

| Decorator/Utility | Purpose | Execution or dependency point |
| ----------------- | ------- | ----------------------------- |
| [`scripts/scripts.js`](../../scripts/scripts.js) | Page decoration (moveInstrumentation and shared page helpers) | `rich-text.js`: { moveInstrumentation } |
| [`utils/environment.js`](../../utils/environment.js) | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor`, `isAuthor` (the page is rendered by AEM author, which has no query index) | `rich-text.js`: { isEditing } |
| [`utils/placeholders.js`](../../utils/placeholders.js) | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | `rich-text.js`: { getPlaceholders } |
| [`utils/properties.js`](../../utils/properties.js) | `readProperties`, `textOf`, `isOn`, `isOnByDefault` (a toggle that defaults to on), `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | `rich-text.js`: { readProperties } |

<!-- END GENERATED: files -->

## Extending the Block

- A new style: a `classes_*` select in the Style tab of `_rich-text.json` (no Text / Title / Type /
  Alt / MimeType suffix), its rule in `rich-text.css`, a row in Variations, `npm run build:json`
  and `npm run build:docs`.
- A toolbar change: `models/_rte.json` (shared by every component with rich text).

## For Site Administrators

- Publishing: the page; DAM images in the text are published with it.
- The toolbar is configured in `models/_rte.json` (component filters); changing it needs a code
  change and a Universal Editor reload.

## For Architects

- KB-D-080: one shared RTE configuration for the Text component, the Rich Text block and every
  component with rich text fields; the full AEM-like toolbar was chosen, with the features Edge
  Delivery doesn't deliver documented.
- Styles are block classes (delivered), not inline styles (not delivered).

## For QA and Support Teams

| ID | Scenario | Steps | Expected |
| -- | -------- | ----- | -------- |
| RICH-TEXT-QA-01 | Toolbar | Edit the Text field in Universal Editor | The full toolbar (format, alignment, blocks, lists, insert incl. table, superscript / subscript, editor tools, Text style) |
| RICH-TEXT-QA-02 | Styles | Alignment Center, Text size Large, First paragraph Lead | Centred, larger paragraphs, first one lead size |
| RICH-TEXT-QA-03 | Columns | Columns Three from desktop; 390 / 768 / 1440px | One / two / three columns |
| RICH-TEXT-QA-04 | Wide table | A table with many columns at 390px | The table scrolls; Tab focuses it, it has an outline and the name "Table" |
| RICH-TEXT-QA-05 | Not delivered | Text colour and alignment from the toolbar; publish | The preview keeps neither (Style tab instead) |
| RICH-TEXT-QA-06 | Empty | A new block without text | Editor: the hint; page: nothing |

Universal Editor checks: Blocked (no author access for the agent); the local preview was checked
with delivered markup (drafts/rich-text.html and the 46 variations of drafts/rich-text-library/ at
1280 and 375px: every block loaded, Style classes applied, no horizontal overflow). The installed
package on AEM: Not recorded.

## Troubleshooting

| Symptom | Cause | Fix |
| ------- | ----- | --- |
| Colour / alignment from the toolbar lost after publish | Inline styles aren't delivered | Use the Style tab |
| Old toolbar in the editor | Component created before the filter existed | Re-create it, or set its `filter` property to `rich-text` in AEM |
| Text style classes have no effect | Classes aren't delivered | Use the Style tab |

## Performance Considerations

No dependencies; the CSS and JS load only where the block is used; tables are observed with one
ResizeObserver each, without layout reads during decoration.

## Security and Privacy

Authored HTML only (sanitized by Universal Editor for live updates); no personal data, no
external requests.

## Known Limitations

- Toolbar features not kept on publish: text colour, alignment, direction, paragraph indentation,
  Text style classes, link target (Edge Delivery delivers no `style` / `class` / `dir` attributes).
- Quotes (blockquote): not in Edge Delivery's delivered elements: Requires validation.
- The filter (and so the toolbar) is stored on a component when it is created: components created
  before KB-D-080 keep the default toolbar until re-created (or their `filter` property is set).

## Related Documentation

- [Universal Editor RTE configuration](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/configure-rte)
- [Edge Delivery markup reference](https://www.aem.live/developer/markup-reference)
- [Quote](../quote/README.md), [Table](../table/README.md), [blocks](../README.md)
- [knowledge base: Universal Editor](../../docs/handover/knowledge-base/universal-editor.md)

<!-- BEGIN GENERATED: usage (npm run build:docs) -->

No block library or curated design page using this block was recorded in the library snapshot.

Project-wide standards: [knowledge base](../../docs/handover/knowledge-base/README.md) ([block governance](../../docs/handover/knowledge-base/blocks.md)).

<!-- END GENERATED: usage -->

## Change History

| Version | Change | Source | Date |
| ------- | ------ | ------ | ---- |
| — | New block: rich text with the full editor toolbar and the Style tab (alignment, size, lead paragraph, colour, columns, width) | KB-D-080 (Approved), branch feat/rte-rich-text | 27 November 2026 |
| — | Block library pages (5 pages, 46 variations) and their content package, generated by tools/library/generate-rich-text-library.mjs | KB-D-070, KB-D-080, branch feat/rte-rich-text | 27 November 2026 |
