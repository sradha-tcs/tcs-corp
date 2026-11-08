# tabs
## Existing README changes
- No README existed.
## Discrepancies
- Handover 6.21.1 / 6.21.2 (field entry tables, screenshots) build tab panels with the built-in Columns block and list the Tabs Container's content as "Columns, Title, Text, Image and Button (filter `tabs`)". Code: the `tabs` filter offers Tab, Column Break, Text, Image, Button (Button Block), Title, Hero, Teaser, Quote, Testimonial, Anchor List, Accordion, Table, Table List, List, Separator, Embed, Video, Modal, Form Variations, Filter List, Cards, Fragment and Tabs block; not the built-in Columns (2.28) and not the Conversation Canvas (re-audit R-C-4). Code is current; 6.21 needs correcting.
- Handover 6.21 doesn't mention Column Breaks in tabs at all (added 2.28, `columnsOf`, Tab field Columns per row). 6.21 needs a Column Breaks section.
- Handover 6.21.11 rule 23 and Issue 7: "Additional tab options apply to the Tabs block but not to the Tabs Container". Code: the Tabs Container has `container*` fields applied by `applySectionBlockOptions` (2.30, R-L-1); Hide block hides the section (styles.css). Code is current; 6.21 needs correcting.
- Handover 6.21.11 rule 18: "Only panel ids open tabs". Code: `targetOfHash` also opens the tab holding any element whose id is linked (block Anchor ID, heading), and `tabs:reveal` (R-C-3) opens nested tabs. Code is current.
- Handover 6.21.11 rule 17: `scroll-margin-top` = navigation height, "4rem". `tabs.css` uses `var(--nav-height)`; the 4rem value isn't in the block CSS. README states the variable only.
- Handover screenshot caption "Properties panel" and field entry "Label (Tabs Container › Accessibility)": four dialog tabs (Properties, Accessibility, Styles, Additional). Model: Content / Styles / Additional (2.8; F-84 notes the chapters refer to the old tabs). Code is current.
- Handover 6.21.1 "Applicable Templates": the `main` filter allows `section`, `gen-carousel` and `tabs`; it now also allows `columns-container`.
- Handover 6.21.1 dependencies list `pushComponentEvent` only; code also uses `pushComponents` (panels as `tcs-corp/components/tabs/item`) and `componentIdOf` (re-audit "panels in the data layer").
- AGENTS.md "Columns Container" paragraph: "the Tabs Container takes the same components as a Columns Container column". The filters differ: `tabs` lacks `conversation-canvas` (R-C-4, by design) and has `tab`. AGENTS.md wording could say "except the Conversation Canvas".
## Variations verified
- Tabs Container (section mode): `_tabs.json` definition `tabs`, `scripts.js` `buildTabsSections`.
- Tabs block (fragment mode): definition `tabs-block`, item `tabs-item`, `tabs.js` `readBlockProperties` / `readItem`.
- Style Underline / Boxed / Pills, Alignment Left / Center / Full width (stretch), Orientation Horizontal / Vertical: models `tabs` and `tabs-block`, `tabs.js` STYLES / ALIGNMENTS / ORIENTATIONS, `tabs.css`.
- Width Type Full / Fixed (Tabs Container only): model `tabs` `sectionWidth`, `decorateSectionsWithOptions`.
- Columns in a tab (Column Breaks): `tabs.js` `columnsOf`, `_tab.json` `classes_perrow`.
- Nested Tabs: `tabs` filter includes `tabs-block`; child selectors in `tabs.css` (R-C-1).
## Accessibility documented
- WAI-ARIA tabs (tablist / tab / tabpanel, aria-selected, aria-controls, aria-labelledby, aria-orientation), roving tabindex, Arrow / Home / End keys with wrapping, focusable panels, focus-visible outlines, media paused in hidden panels, reduced-motion transitions off, deep links below the fixed header.
## Data layer documented
- Component `tcs-corp/components/tabs`, panels `tcs-corp/components/tabs/item` (pushComponents, parentId, dc:title), `cmp:show` on tab change (not on load), DOM event `tabs:change`, central `cmp:click` on tab buttons, `data-cmp-id` on panels and `{panel}-columns`; Tags / Web SDK not configured; no consent.
## Personalization
- None verified (no Target / AJO); standard statement.
## Responsive / performance
- Breakpoint 900px only (larger padding, vertical grid); horizontal list scrolls below; fragments fetched in parallel (Tabs block); `columns-container` loaded with loadBlock for Column Breaks; all panels in the DOM; one hashchange listener per page.
## Placeholders
- tabs-column-breaks-desktop.png, tabs-editor-empty-desktop.png, tabs-focus-desktop.png, tabs-nested-desktop.png, tabs-authoring-step-1.png to tabs-authoring-step-5.png, tabs-container-desktop.png, tabs-block-fragments-desktop.png, tabs-styles-desktop.png, tabs-alignment-desktop.png, tabs-vertical-tablet.png, tabs-width-fixed-desktop.png.
## Open questions
- Should the tab shown on load push a `cmp:show` (measurement plan)? Currently it doesn't (`notify: false`).
- `targetOfHash` calls `decodeURIComponent` without try / catch: a malformed percent-encoded hash would throw during decoration (verified by reading the code, not by a browser test). Development to confirm and decide.
- A Tabs block panel whose fragment fails is empty without an editor hint (review-c notes an optional `tabsBlockEmpty` per-panel hint).
