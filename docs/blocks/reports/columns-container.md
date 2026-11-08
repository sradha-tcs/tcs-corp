# columns-container
## Existing README changes
- Kept: the description (columns of blocks as a section container), the For authors steps and field table (now under For Content Authors), Column Break notes, "Columns in a Tabs Container" (now a variation), the "How it works" content (moved to For Developers: buildColumnsSections, plain columns, legacy `column`, `columns-container-{1-4}`, CSS, placeholders), the block audit note (CSS scoped to `.block.columns-container`, now in For Developers and Change History).
- Corrected: Style "Highlight (multiselect, as on sections)": Sections no longer offer Highlight (handover 2.33); the container still does (CSS `main .section.highlight` exists).
- Added: the required structure (variations, accessibility, data layer, responsive table from the CSS, QA, troubleshooting, limitations, change history), the generated-section markers, legacy `columnsLayout` note, tab defaults (Medium / Top / Desktop), data-layer ids.
- Removed: duplicates between "For authors" and "How it works".
## Discrepancies
- Handover 6.32 Purpose: "laid out in two to four columns". Code: Columns per row 1–4 (Automatic up to 4), more Column Breaks start new rows. Code is current.
- Handover 6.32 Common mistakes: "choosing an unequal Column width with three or four per row (ignored)". Column widths was removed (2.26); the sentence is stale.
- Handover 6.32 Style "Highlight as on sections": Sections dropped Highlight in 2.33. Needs a product decision (see open questions) and a handover wording update.
- Existing README matched the code otherwise.
## Variations verified
- Columns per row, Gap (None / Small / Medium / Large), Vertical alignment (Top / Middle / Bottom / Stretch), Side by side from (Tablet / Desktop / Large desktop): `_columns-container.json` Layout tab, `buildColumnsSections`, `columns-container.css`.
- BG Color (Default / Grey / Dark / Dark green): `containerBgColor`, `columns-container.css`, theme contract in `styles/styles.css`.
- Width Type and Background Image: Section fields, `decorateSectionsWithOptions`.
- Columns in a Tabs Container tab: `tabs.js` `columnsOf`.
## Accessibility documented
- Content order preserved at every width, theme contract contrast on dark backgrounds, background image alt, reduced motion, hidden columns removed, reflow (minmax(0,1fr)), editor-only hints.
## Data layer documented
- Component `tcs-corp/components/columns-container` (id Anchor ID or counter; `{panel}-columns` in tabs); blocks in columns are its children; Column Breaks data-analytics="off"; clicks measured centrally; Tags / Web SDK not configured; no consent.
## Personalization
- None verified; standard statement.
## Responsive / performance
- 600 / 900 / 1200px (from-tablet / default / from-large); synchronous DOM regrouping, one placeholders lookup, no network or listeners; section hidden until loaded.
## Placeholders
- columns-container-default-desktop.png, columns-container-default-mobile.png, columns-container-per-row-desktop.png, columns-container-bg-dark-green-desktop.png, columns-container-editor-desktop.png, columns-container-tablet.png, columns-container-from-large-desktop.png, columns-container-authoring-step-1.png to columns-container-authoring-step-4.png.
## Open questions
- Should the Columns Container keep offering Highlight now that Sections don't (2.33)? Product owner.
- Gap / alignment / breakpoint for columns in tabs are fixed: confirm this is acceptable (re-audit review-c "not offered in tabs").
- Editor live update of Column Break options (R-C-7) deferred: owner and plan not recorded.
