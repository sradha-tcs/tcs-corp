# glossary.md

## Sources inspected

- Handover 15.1 Glossary, 15.2 Acronyms, 16.1 (priorities), 16.2 (finding ids), 16.3 (open item ids), Part 1 (BO / PG / SC ids), revision history (packages, curated pages, NFR mentions in 2.36)
- AGENTS.md (delivery rules, Additional tab, item children, Columns Container, Button, animation, theme, Canvas, shared events, data layer)
- blocks/README.md (names, statuses), component-definition.json (titles)
- Code checks by grep: `--header-reserved`, `header:menu`, `tabs:reveal`, `form-variations:submit` / `respondWith`, `conversation-canvas:search`, `data-canvas-journey-state`, `renderWhenLoaded`, `skeletonWhile`, `applySectionBlockOptions`, `buildColumnsSections`, `prefetchData`, `isAuthor`, `itemEditorHint`, `cmp:change`, `inter-fallback-roboto`, `display-teaser`, `motion-on-load`, `classes_bganimation`, `containerBgColor`, `ot.aem.live` (scripts/aem.js:93), `readProperties`, `itemRows`
- models/_section.json, models/_page.json, models/_button.json
- docs/audit/BLOCK-ECOSYSTEM-AUDIT.md section 10 (D-x-n, L-n), REAUDIT-2026-10-20.md section 4 (R-x-n, R-L-n), docs/audit/blocks/ file names, docs/proposals/cards-card-refactoring.md (D-1…D-6, C-4, G1)

## Discrepancies

- implementation: the Additional tab also has Animation Type, Motion Speed, Animation Trigger and (on six blocks) Background animation | documented: handover 15.1 "Additional tab" lists only Anchor ID, Hide block, Padding, Margin | impact: incomplete definition | correct: code / AGENTS.md
- implementation: section containers are Columns Container, Tabs Container and Gen Carousel | documented: handover 15.1 "Container section" lists Gen Carousel and Tabs Container only; "Container block" includes Columns | correct: code
- implementation: default content offered is Text, Title, Image; buttons are the Button Block | documented: handover 15.1 "Default content: Text, Title, Image and Button" | correct: code (Button (basic) not in filters)
- implementation: findings run to F-107 (F-67 to F-69 unused) | documented: docs/handover/README.md "F-01 … F-66, F-70 … F-98" | impact: low | correct: handover Part 16.2
- handover 15.2 expands RUM as "Real Use Monitoring" (kept as written; commonly "Real User Monitoring")

## Gaps and blocked topics

- The meaning of the audit prefixes isn't stated explicitly: D-A … D-D are mapped to the four review groups from the review file names (group-a-card-lists, group-b-heroes-teasers, group-c-containers, group-d-forms-media-chrome) and the components in the register; L-n as "found on the live site" from the entries ("Live tables…", "(live)") and handover 2.27; R-L-n from the re-audit ("Found on aem.live")
- XDM: no schema configured; the data layer uses `xdm:` keys of the Core Components schema (handover / audit section 6)

## Decisions found

- Button Block naming (template name "Button Block" to avoid the `.button` class) — AGENTS.md "Button", handover 2.26 (F-100)
- Column Break naming (template name is the block class) — handover 2.24 (F-99)
- `titleHidden` instead of `hideTitle` (field collapse) — handover 2.34
- `buttonVariant` instead of a `*Type` field — AGENTS.md delivery rules
- Video `poster` / `posterAlt` instead of grouped fields — handover 2.27, audit L-2

## Recommendations

- Update handover 15.1 (Additional tab, container sections, default content) and docs/handover/README.md (finding range)
- State the audit id prefixes in docs/audit/README.md
