# tab
## Existing README changes
- No README existed.
## Discrepancies
- Handover 6.22.11 rule 10 and 6.22.13 Issue 5: "Hide block on a Tab does not remove the tab from the tab list". Code: `tabs.js` `groupContainerTabs` drops the group of a Tab with `hideblock` when not editing (tab and content removed; re-audit D-C-7 confirmed fixed). Code is current; 6.22 needs correcting.
- Handover 6.22 doesn't document the Tab field Columns per row (`classes_perrow`, added in 2.28). Needs adding.
- Handover 6.22.1 / Related: "the components allowed after a Tab: Columns, Title, Text, Image, Button". Code: the full `tabs` filter (without built-in Columns and Conversation Canvas). Needs correcting.
- Generated screenshot caption "Properties panel ... Content tab (Title, ID, Active tab)" predates Columns per row.
## Variations verified
- Standard Tab, Active Tab, Tab with ID (deep link): `_tab.json`, `tab.js` `readTab`, `tabs.js`.
- Tab with columns (Columns per row): `_tab.json` `classes_perrow`, `tabs.js` `groupContainerTabs` / `columnsOf`.
- Hidden Tab (Hide block): `_tab.json` `classes_hideblock`, `tabs.js` `groupContainerTabs`.
## Accessibility documented
- Title becomes the role="tab" button's name labelling its panel; chip hidden on the page (display none), hidden Tabs removed from the tab list and panels.
## Data layer documented
- data-analytics="off" (not a component); its Title is the panel's dc:title and its ID the panel id for the Tabs' component state and cmp:show.
## Personalization
- None verified; standard statement.
## Responsive / performance
- No media queries; no network, observers or listeners; small DOM replacement; read before its own decoration (data-tab-* cache).
## Placeholders
- tab-columns-per-row-desktop.png, tab-hidden-editor-desktop.png, tab-standard-mobile.png, tab-authoring-step-1.png to tab-authoring-step-4.png.
## Open questions
- Editor live update of ID, Active tab, Columns per row and Hide block is deferred (R-C-7): owner and plan not recorded.
