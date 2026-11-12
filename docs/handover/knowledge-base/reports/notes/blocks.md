# blocks.md

## Sources inspected

- `tools/docs/blocks.json` (status, type, category, purpose, children, parent, replacement, deprecation), `tools/docs/library-snapshot.json` (package 1.0.13, usage per block), `tools/docs/generate-block-docs.mjs` (how usage is counted: library / curated / other pages)
- `blocks/README.md`, the folder listing of `blocks/` (30 folders), the README section headings (teaser as sample)
- `component-definition.json` (62 components: groups, resource types, template names, key-value, filters, template values), `component-filters.json` (26 filters), `component-models.json` (tabs and variant `classes*` fields per model)
- `scripts/scripts.js` (section containers, `applySectionBlockOptions`), `utils/cells.js`, `blocks/*` layout constants (`ITEM_LAYOUT`, `CARD_LAYOUT`, `CATEGORY_LAYOUT`, `PAGE_LAYOUT`), `decorators/motion-decorator.js` (`CONTENT_TARGETS`, `BACKGROUNDS`), `test/models/block-names.test.mjs`
- `paths.json` (includes / excludes), `helix-query.yaml` (block-library exclusions)
- `AGENTS.md` (repository version, incl. "Module preloading"), `docs/audit/BLOCK-ECOSYSTEM-AUDIT.md` (sections 1, 2, 4, 7, 9, 11-13), `docs/audit/REAUDIT-2026-10-20.md`, `docs/blocks/BLOCK-DOCUMENTATION-REPORT.md` (sections 1-3), `docs/proposals/README.md`
- Handover: Part 15.4 (Content Modeling Standards), Part 16.2 / 16.3 / 16.4 (findings, open items, not implemented)
- Commands run: `npm test` (311 passed), `npm run lint` (passed) at commit 2d06316

## Discrepancies

- implementation: Interactive Dashboard status "Experimental (placeholder)" (`tools/docs/blocks.json`, blocks/README) | documented: "Interactive Dashboard: deprecated (not offered, renders nothing)" (BLOCK-ECOSYSTEM-AUDIT.md section 4) | impact: status label differs between audit and block docs | correct: tools/docs/blocks.json (used Experimental)
- implementation: section filter = text, image, button-block, title, page-header, hero, teaser, quote, testimonial, anchor-list, accordion, tabs-block, table, table-list, list, separator, embed, video, modal, form-variations, filter-list, conversation-canvas, cards, fragment, footer, tcs-header; main filter includes columns-container | documented: section filter with `button`, `interactive-dashboard`, `columns`, no `tcs-header`; main filter without Columns Container (handover 15.4.5) | impact: outdated handover table | correct: component-filters.json
- implementation: 17 key-value blocks (anchor-list, button-block, cards, column-break, conversation-canvas, filter-list, list, page-header, quote, separator, tab, table-list, tabs-block, tcs-header, teaser, testimonial, video) | documented: "14 blocks" (handover 15.4.1, without button-block, column-break, tcs-header) | impact: low | correct: component-definition.json
- implementation: the Teaser personalization option was removed (D-B-3) | documented: "Teaser has a personalisation marker class only" (handover 16.4) | impact: outdated statement | correct: code / audit
- implementation: Content animation fields on 17 block models (`classes_animation`) plus 3 section containers (`containerAnimation`) = 20 models | documented: "Animation Type ... 19 blocks" (AGENTS.md "Animation and skeletons") | impact: low (count) | correct: component-models.json
- implementation: locale `block-library` folders are excluded in `paths.json`, but the language master (including its block library and curated design pages) is included and was published (re-audit section 6: 312 pages) | documented: AGENTS.md "block-library/ ... not published" (per locale) | impact: the language master library is public while under review | correct: paths.json (both statements hold; the language master is the exception)

## Gaps and blocked topics

- Production usage of every block, of the compatibility-only Columns / Button (basic) and of the legacy composite multifields: not recorded in the repository (blocked: AEM author access or a content export; audit deferral D-B-14).
- Whether the language master block library pages are in the query index: `helix-query.yaml` excludes `/*/block-library` and `/*/block-library/**`, which may not match `/language-master/en/block-library/...` (requires validation on the published index).
- Header usage isn't counted in the library snapshot (authored through the nav page).
- The snapshot counts 157 library pages that contain blocks; the audit reported 177 library pages for package 1.0.8 (pages without blocks aren't in the snapshot usage); the exact page count of package 1.0.13 is not recorded in git.
- No owner or approval flow for creating / deprecating blocks is recorded (handover O-01 open).

## Decisions found

- Built-in Columns and Button hidden from all filters, definitions kept for content authored before; library content migrated (37 Columns: 10 to Columns Containers, 27 to Column Breaks; 51 buttons to Button blocks) — follow-up decision after the audit, PR #119 (re-audit, 20 October 2026; audit section 4).
- Redundant-block assessments: retain Cards / List / Table List, Hero / Teaser / Page Header, Quote / Testimonial, Tabs Container / Tabs block, Embed / Video, Gen Carousel (BLOCK-ECOSYSTEM-AUDIT.md section 4, 19 October 2026).
- Repeating content as item children, not composite multifields (AGENTS.md "Item children").
- Section containers use `container*` fields (re-audit R-L-1, package 1.0.10, PR #121, 20 October 2026).
- Conversation Canvas not offered in Tabs Containers (re-audit R-C-4).
- Button block template name "Button Block" to avoid the `.button` class clash; `buttonVariant` instead of a `*Type` field (AGENTS.md "Button").
- Duplicate options removed in favour of the Additional tab and Anchor ID (audit section 4).

## Recommendations

- Update handover 15.4.1 / 15.4.5 and 16.4 with the current filters, key-value count and the removed Teaser personalization option.
- Align the Interactive Dashboard status wording between the audit and `tools/docs/blocks.json`.
- Measure production usage before removing Columns, Button (basic), the former `button` model or the legacy multifields (audit recommendation, section 13).
- Confirm whether the language master block library should be published and indexed while under review.
- Keep the automated aem.page vs local preview comparison in the release checklist (audit recommendation, section 13).
