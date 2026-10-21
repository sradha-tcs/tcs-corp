# table
## Existing README changes
- No README existed.

## Discrepancies
- Handover 6.25.11 Rule 6 and Issue 3: "the code does not pad rows or add colspans, so rows of different Row types produce ragged rows". Code pads every row to the widest row with empty cells (`table.js`, audit D-D-14). Code is current; handover needs correcting.
- Handover Rule 11, Issue 4, Common Errors: "a new Row is pre-filled with Column1 … ColumnN". The definitions in `_table.json` store no column values (re-audit R-D-9; labels "Column n"). Code is current.
- Handover Rule 1 "Every child row becomes a table row" and the input example: AEM delivers empty rows for the dialog tabs, which the code skips (`isTabRow`, audit 2.27). Code is current.
- Handover dependency table lists the `section` filter only; the Table is also in the `columns-container` and `tabs` filters.
- Handover screenshot of mobile says text 0.75rem below 900 px and 1.125rem desktop: consistent with `--body-font-size-s` / `--body-font-size-m` tokens (no discrepancy).

## Variations verified
- Standard, No Header, First Column Header, Row headers only, Striped, Bordered: `classes` multiselect in `_table.json`, `table.js`, `table.css`.
- 1 to 5 Columns: `filter` select and the five Row models / filters in `_table.json`.
- Scroll region (automatic): ResizeObserver in `table.js`, `:focus-visible` in `table.css`.

## Accessibility documented
- Native table with `scope` col / row, `aria-labelledby` from the heading before the block (`table-title-N`), focusable named scroll region with focus outline, fallback label placeholder `table`.

## Data layer documented
- Component `tcs-corp/components/table`; no block attributes; link clicks in cells as `cmp:click` (`other` / `exit` / `download`).

## Personalization
- None verified (standard statement).

## Responsive / performance
- One media query at 900px (`--body-font-size-s` to `--body-font-size-m`); horizontal scrolling inside the block; rendered once, one ResizeObserver (not disconnected), only placeholders fetched.

## Placeholders
- table-authoring-universal-editor-desktop.png, table-striped-bordered-mobile.png, table-padded-rows-desktop.png, table-empty-editor-desktop.png, table-authoring-step-1.png … table-authoring-step-4.png, table-row-headers-only-mobile.png

## Open questions
- `isTabRow` also skips an empty first Row with at most one cell (1-Column tables, or an empty first Row), making the next Row the header; confirm whether tab rows should be identified more strictly (e.g. by `data-aue-prop` in the editor).
- Whether more than five columns, captions or a stacked mobile layout are required (product owner).
