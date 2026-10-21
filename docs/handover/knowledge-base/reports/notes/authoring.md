# authoring.md

## Sources inspected

- `/tmp/kb/INSTRUCTIONS.md`, `/tmp/kb/handover-map.txt`
- Handover `docs/handover/TCS-CORP-HANDOVER.md`: Part 5 — Authoring Fundamentals (5.1–5.8, lines 3762–4450), 4.9 Localization Strategy, 15.5 Authoring Cheat Sheets, Part 12 12.1 (publishing), Part 13 issue titles (map), Part 14 14.5 / 14.9, Part 16 16.3 / 16.4, revision history 2.10–2.37
- `AGENTS.md` (Blocks: Additional tab, Dialog tabs, Columns Container, Button, AEM delivery rules, Item children, Animation, Accessibility, Backgrounds and theme; Site structure and site data)
- `blocks/README.md` (inventory, relationships, deprecated blocks); existence of all 30 `blocks/*/README.md`
- `component-filters.json`, `component-definition.json`, `component-models.json` (page-metadata, analytics / personalization / anchor field search), `models/_page.json`, `models/_section.json`
- Code: `utils/environment.js` (isAuthor, isEditing, isInEditor), `utils/placeholders.js`, `utils/site.js` (localeSheetPath, sheetRows, REVIEW_*), `utils/inherited-metadata.js` (sessionStorage key), `decorators/block-options-decorator.js` (anchor regex, availableId), `decorators/data-layer-decorator.js` (componentIdOf uses block.id), `decorators/content-buttons-decorator.js`, `decorators/button-decorator.js` (announceNewTab), `blocks/list/list.js`, `blocks/cards/cards.js`, `blocks/separator/separator-config.js`, `utils/card-list-config.js`, `decorators/card-list-decorator.js` (analytics fields), `scripts/scripts.js` (TEMPLATES), `paths.json` (includes / excludes)
- `docs/audit/REAUDIT-2026-10-20.md` (sections 4–6), `docs/audit/BLOCK-ECOSYSTEM-AUDIT.md` (sections 8–14)

## Discrepancies

- implementation: Main allows Section, Gen Carousel, Tabs Container, Columns Container; Section allows Button Block (`button-block`) and TCS Header, not the built-in Button, Columns or Interactive Dashboard; Tabs Container allows Tab, Column Break and most blocks | documented: Main without Columns Container; Section with Button, Columns, Interactive Dashboard; Tabs Container "Tab; Columns; Title; Text; Image; Button" (handover 5.2.2, 5.4.3) | impact: authors look for components that aren't offered | correct: `component-filters.json`
- implementation: the built-in Button is "Button (basic)", in no filter; it delivers only link, text, title, Primary / Secondary | documented: Button default content with Views, Type, Icon, Alignment (handover 5.4.4) | impact: options that never reach the page | correct: AGENTS.md "Button", `component-definition.json`
- implementation: Additional tab not on the built-in Columns (removed) | documented: 25 models including Columns (handover 5.6) | impact: minor | correct: models / audit section 11
- implementation: only the Separator has a Component ID field; List / Cards Component ID removed (D-A-12, stored values still read) | documented: "List, Cards and Separator have their own Component ID" (handover 5.6.3 #4) | impact: authors look for a field that isn't there | correct: `component-models.json`
- implementation: container sections' Additional tab is `container*` fields applied by `applySectionBlockOptions` | documented: effect on Gen Carousel and Tabs Container "could not be verified" (handover 5.6.4 note) | impact: stale caution | correct: AGENTS.md, re-audit R-L-1
- implementation: header desktop layout from 1200px (`blocks/header/header.css`, AGENTS.md "Header") | documented: "the header switches to the desktop navigation at 900 px" (handover 5.2.5) | impact: wrong device check | correct: code
- implementation: no personalization field in any model; Teaser Personalization removed (D-B-3) | documented: "Teaser has a personalisation marker class only" (handover 16.4; 14.9 #17) | impact: authors / admins expect a marker | correct: models, audit register

## Gaps and blocked topics

- AEM user groups, per-locale permissions, publish approval workflow: Not recorded (handover O-06). Needed: AEM administrator.
- Universal Editor publish destinations (Preview and / or Live) enabled for the program: Not recorded.
- Production domain and CDN: Not recorded (O-03).
- Whether `metadata.source` lists the 13 bulk sheets: Not recorded (O-04).
- DAM folder conventions, image licensing rules, maximum video size, approved embed domains: Not recorded (O-16).
- Translation process (AEM translation projects, MSM): Not recorded (O-12).
- Whether authors may use Sidekick preview / publish buttons: Not recorded.
- Universal Editor dialog behaviour on the real author: Blocked (author access; audit section 9).

## Decisions found

- Built-in Columns and Button no longer offered; their definitions stay for content authored before (handover revision 2.28, 20 October 2026; AGENTS.md "Columns Container", "Button").
- Repeating content as item children instead of composite multifields (handover revision 2.10, 17 October 2026, finding F-87; AGENTS.md "Item children").
- Container sections' Additional tab as `container*` fields (handover revision 2.30, 20 October 2026; re-audit R-L-1; PR #121).
- Teaser Personalization option removed (block audit D-B-3, handover revision 2.27, 19 October 2026).
- Interactive Dashboard removed from the section and Columns Container filters (audit D-B-17).
- Per-locale redirects sheets "by the user's choice" (AGENTS.md "Site structure and site data").
- The "Link Item" of the request is the List Item, decided with the product owner (handover revision 2.34).
- Content Fragment lists not supported (by decision; handover 14.9 #5).

## Recommendations

- Update handover 5.2.2, 5.4.3, 5.4.4, 5.6, 5.6.3, 5.6.4 and 5.2.5 to the current filters, Button block, Component ID and breakpoints.
- Record the permission model and the Universal Editor publish destinations, then remove the "Requires validation" status of authoring.md.
- Record a DAM folder convention per locale and the non-image asset publishing step in the author checklist of the handover.
