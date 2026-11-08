# column-break
## Existing README changes
- No README existed.
## Discrepancies
- None between handover 6.32 (Column Break paragraph, rules 1 and 3) and the code.
- Note: the legacy `column` → `column-break` rename (F-99) is done only by `buildColumnsSections` (Columns Container sections), not by `tabs.js` `columnsOf`; documented as a limitation (Column Breaks in tabs were introduced after the rename, so no such content is expected).
## Variations verified
- Named / unnamed (Column name, placeholder `columnLabel`): `_column-break.json`, `column-break.js`.
- In a Columns Container and in a Tabs Container tab: `columns-container` and `tabs` filters, `columns-container.js`, `tabs.js` `columnsOf`.
- Column options (Anchor ID, Hide block, Padding / Margin): `_column-break.json` Additional tab, `columns-container.js` `COLUMN_OPTIONS` / `createColumn`.
## Accessibility documented
- Marker and wrapper display none on the page, label only in edit mode, content order kept, hidden columns removed.
## Data layer documented
- data-analytics="off"; the column isn't a component; blocks in it are children of the Columns Container.
## Personalization
- None verified; standard statement.
## Responsive / performance
- No media queries; one placeholders lookup, no network or listeners.
## Placeholders
- column-break-label-editor-desktop.png, column-break-published-desktop.png, column-break-hidden-editor-desktop.png, column-break-in-tab-desktop.png, column-break-authoring-step-1.png to column-break-authoring-step-4.png.
## Open questions
- Editor live update of Column Break options (R-C-7) deferred: owner and plan not recorded.
