# Columns Container

A section whose content is laid out in columns. Each column holds default content (Text,
Title, Image, Button) and any block, as a section does. Edge Delivery has no blocks inside
blocks (the Columns block's columns hold default content only), so columns of blocks are a
section container, like Tabs Container and Gen Carousel.

## For authors

1. Add a **Columns Container** to the page (where sections are added).
2. Inside it, add a **Column Break**, then the components of that column after it; add the next
   **Column Break**, then its components, and so on: columns sit side by side in rows of Columns per
   row (Automatic: up to 4), more Columns start a new row.
3. Set the layout in the Columns Container's properties.

| Tab | Field | Values | Default |
|---|---|---|---|
| Content | Style | Columns Container (keep it selected: it makes the section a Columns Container), Highlight (multiselect, as on sections) | Columns Container |
| Content | Width Type | Full Width, Fixed Width | Full Width |
| Content | Background Image | An image behind the whole container (as on sections) | — |
| Content | Image alt text | The background image's alternative text; empty: decorative | — |
| Content | Anchor name | Section id, e.g. `our-offices` (link with `#our-offices`, Anchor List) | — |
| Layout | Columns per row | Automatic (as many as there are Columns, at most 4), 1, 2, 3, 4; more Columns start a new row (6 Columns at 3 per row: 2 rows of 3) | Automatic |
| Layout | Column widths | Equal; One third, two thirds; Two thirds, one third; One quarter, three quarters; Three quarters, one quarter (rows of two columns; three or four per row are equal) | Equal |
| Layout | Gap | Small, Medium, Large | Medium |
| Layout | Vertical alignment | Top, Middle, Bottom, Stretch (equal heights) | Top |
| Layout | Side by side from | Tablet (600px), Desktop (900px), Large desktop (1200px); stacked below | Desktop |
| Additional | Anchor ID, Hide block, Animation Type, Motion Speed, Animation Trigger, Padding / Margin | As on blocks; Animation Type moves the columns in one after another | — |

**Column Break** (an item): *Column name* (shown in the editor only) and the Additional tab, whose
Anchor ID, Hide block and Padding / Margin apply to its column. Content before the first Column
is a column of its own. Allowed in a column: default content and every block except Page
Header, Footer and TCS Header.

In Universal Editor edit mode each column is outlined and labelled with its name, so it can be
selected; an empty column says what to add.

## How it works

- The Content tab fields are the Section's (same names: `style`, `sectionWidth`, `backgroundImage`,
  `backgroundImageAlt`, `anchorName`), applied by `decorateSectionsWithOptions` as on any section.
- `scripts.js` `buildColumnsSections`: a section with Style `columns-container-section` (or, if
  an author removed that Style, with the container's Layout values) is
  wrapped in a synthetic `columns-container` block (`wrapSectionContent`, as Tabs); its Layout
  properties become classes (`per-row-3`, `layout-1-2`, `gap-small`, `align-middle`,
  `from-tablet`) and its
  `classes_*` properties (Additional tab) block classes.
- `columns-container.js`: each Column Break (`blocks/column-break`; template name "Column Break",
  so AEM renders it with the class `column-break`) starts a plain column element
  (`columns-container-column`, not a block, so Universal Editor updates of the components in it
  find their own block); the Column Break stays in it as its label (edit mode only) and its
  Hide block, Anchor ID and spacing classes are copied to the column. Content authored when the
  item was named "Column" (class `column`) is read as Column Breaks; class `columns-container-{1-4}`: the columns per row (Columns per row,
  else the number of Columns, at most 4); the grid places further columns in new rows.
- `columns-container.css`: a grid, one column below the breakpoint; blocks in a column fill the
  column's width.
- Placeholders: `columnLabel` (Column {n}), `columnEmpty`, `columnsContainerEmpty` (editor only).
