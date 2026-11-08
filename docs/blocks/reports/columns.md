# columns
## Existing README changes
- No README existed.
## Discrepancies
- Handover 6.14 intro: "the boilerplate Columns block ... with the project's Additional tab". Code: `_columns.json` has no Additional tab (removed in the 2.27 audit: AEM doesn't deliver `classes_*` for the built-in Columns). Code is current; 6.14 needs correcting.
- Handover 6.14.1 Applicable Templates: "allowed in every section (section filter) and in Tabs sections (tabs filter)". Code: in no parent filter (2.28). 6.14 needs a deprecation notice beyond the 2.22 blockquote.
- Handover 6.14.1 dependencies list `models/_button.json` and Button components in columns. Code: the `column` filter allows Text, Image, Title only (buttons are bold / italic links in a Text, AGENTS.md).
- Handover 6.14 field entry tables: Columns / Rows "Number value type". Model: `text` components.
- Handover 6.14.1 dependencies list the block-options decorator / Additional tab; not applicable (no classes delivered).
- `decorators/motion-decorator.js` still lists `columns` in CONTENT_TARGETS, but no animation can be authored (no Additional tab; `test/motion/motion.test.mjs` lists columns in NO_ANIMATION). Harmless leftover.
## Variations verified
- Two columns, Three or more columns (`columns-{n}-cols`, no CSS uses it), Image column (`columns-img-col`), Multiple rows: `columns.js`, `columns.css` (existing content only).
## Accessibility documented
- Plain divs, content order kept for screen readers and keyboard (image-only cells reordered visually only when stacked), no key handling.
## Data layer documented
- Component `tcs-corp/components/columns` via the data-layer decorator; central cmp:click; Tags / Web SDK not configured; no consent.
## Personalization
- None verified; standard statement.
## Responsive / performance
- 900px only (stacked below, side by side with 1.5rem gap, centred, equal widths above); no network, observers or listeners.
## Placeholders
- columns-migration-desktop.png, columns-image-column-mobile.png, columns-authoring-step-1.png to columns-authoring-step-3.png.
## Open questions
- When will production content authored with the built-in Columns be migrated (re-audit "Migrate production content"), and when can the definition be removed? Not recorded.
