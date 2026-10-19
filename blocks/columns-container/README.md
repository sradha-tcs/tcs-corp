# Columns Container

A section whose content is laid out in columns. Each column holds default content (Text,
Title, Image, Button) and any block, as a section does. Edge Delivery has no blocks inside
blocks (the Columns block's columns hold default content only), so columns of blocks are a
section container, like Tabs Container and Gen Carousel.

## For authors

1. Add a **Columns Container** to the page (where sections are added).
2. Inside it, add a **Column**, then the components of that column after it; add the next
   **Column**, then its components, and so on: columns sit side by side in rows of Columns per
   row (Automatic: up to 4), more Columns start a new row.
3. Set the layout in the Columns Container's properties.

| Tab | Field | Values | Default |
|---|---|---|---|
| Content | Component | Columns Container | Columns Container |
| Content | ID | Section id, e.g. `our-offices` (link with `#our-offices`) | — |
| Content | Width Type | Full Width, Fixed Width | Full Width |
| Layout | Columns per row | Automatic (as many as there are Columns, at most 4), 1, 2, 3, 4; more Columns start a new row (6 Columns at 3 per row: 2 rows of 3) | Automatic |
| Layout | Column widths | Equal; One third, two thirds; Two thirds, one third; One quarter, three quarters; Three quarters, one quarter (rows of two columns; three or four per row are equal) | Equal |
| Layout | Gap | Small, Medium, Large | Medium |
| Layout | Vertical alignment | Top, Middle, Bottom, Stretch (equal heights) | Top |
| Layout | Side by side from | Tablet (600px), Desktop (900px), Large desktop (1200px); stacked below | Desktop |
| Additional | Anchor ID, Hide block, Animation Type, Motion Speed, Animation Trigger, Padding / Margin | As on blocks; Animation Type moves the columns in one after another | — |

**Column** (an item): *Column name* (shown in the editor only) and the Additional tab, whose
Anchor ID, Hide block and Padding / Margin apply to the column. Content before the first Column
is a column of its own. Allowed in a column: default content and every block except Page
Header, Footer and TCS Header.

In Universal Editor edit mode each column is outlined and labelled with its name, so it can be
selected; an empty column says what to add.

## How it works

- `scripts.js` `buildColumnsSections`: a section with Style `columns-container-section` is
  wrapped in a synthetic `columns-container` block (`wrapSectionContent`, as Tabs); its Layout
  properties become classes (`per-row-3`, `layout-1-2`, `gap-small`, `align-middle`,
  `from-tablet`) and its
  `classes_*` properties (Additional tab) block classes.
- `columns-container.js`: each Column (`blocks/column-break`) becomes its column element
  (`columns-container-column`, so the Column's block options apply to it) and receives the
  components after it; class `columns-container-{1-4}`: the columns per row (Columns per row,
  else the number of Columns, at most 4); the grid places further columns in new rows.
- `columns-container.css`: a grid, one column below the breakpoint; blocks in a column fill the
  column's width.
- Placeholders: `columnLabel` (Column {n}), `columnEmpty`, `columnsContainerEmpty` (editor only).
