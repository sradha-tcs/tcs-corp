# personalization.md

## Sources inspected

- grep for personaliz / Target / alloy / mbox / experiment / decisionScopes in blocks, decorators, utils, scripts, templates, models and blocks/*/_*.json (no personalization code or fields; only comments in conversation-canvas.js naming a "personalisation service" as a possible hook caller, and the experimentation comment in editor-support.js from the boilerplate)
- blocks/conversation-canvas/conversation-canvas.js (setConversationCanvasSuggestions, setConversationCanvasFilters, conversation-canvas:search), blocks/form-variations/form-variations.js (form-variations:submit, respondWith)
- utils/metadata.js (persona, region, country, language, campaignId), utils/data.js (inRegion), templates/press-release/press-release.js (inRegion by page region), helix-query.yaml (persona, region, country, language, campaignId indexed)
- Block READMEs, Personalization sections (teaser, conversation-canvas, header, footer, cards, accordion, filter-list, embed, button-block, form-variations, column-break, columns)
- Handover: revision 2.27 (line 61), 1.6.2, 2.9.8 Adobe Target, 11.7.7, 14.9 item 17, 16.4, 6.11 Variation 66
- docs/audit/BLOCK-ECOSYSTEM-AUDIT.md sections 7, 8, 9 and D-B-3; docs/audit/REAUDIT-2026-10-20.md section 1

## Discrepancies

- implementation: the Teaser has no Personalization field or marker (removed) | documented: Teaser Personalization flag adds class `personalization` and `data-personalization="true"` (handover 1.6.2, 2.4 application landscape table, 2.8 integration table row 12, 2.9.8, 6.0 inventory row 11, 6.11 Variation 66, 16.4) | impact: readers may look for a marker that doesn't exist | correct: code and revision 2.27 / D-B-3
- implementation: none of persona / campaign-id is used | documented: handover 14.9 item 17 says the same, but its remedy text still mentions the Teaser flag | correct: code

## Gaps and blocked topics

- Personalization design, audiences, activities, decision scopes, identity strategy, consent model: Blocked (audit section 9: "activities, audiences, the personalization design"; handover owner: product owner, to be confirmed).
- QA modes for personalization (forced variants, preview): not recorded.
- Personalization roadmap: To be confirmed (handover 11.7.7).

## Decisions found

- Teaser Personalization option removed (field and marker), library migrated: handover revision 2.27 (19 October 2026), audit D-B-3.
- Every block classified "Not personalizable" (audit section 8, 19 October 2026).
- Area navigation / footers are content choices, not personalization (header and footer READMEs).

## Recommendations

- Update the handover chapters listed above to drop the Teaser marker (they predate 2.27).
- Before any implementation: an approved design covering fallback to default content, consent, identity, caching, flicker / LCP, accessibility and data-layer measurement of decisions (requirements recorded in the KB file, sourced from handover 2.9.8 / 11.7.6 / 11.7.7 and the audit).
