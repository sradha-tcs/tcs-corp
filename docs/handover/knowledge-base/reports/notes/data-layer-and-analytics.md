# data-layer-and-analytics.md

## Sources inspected

- decorators/data-layer-decorator.js, utils/analytics.js, utils/privacy.js, utils/viewport.js (currentBreakpoint), utils/metadata.js (getPageMetadata, getPageLanguage, getPageTags)
- scripts/scripts.js (loadEager trackInteractions, loadLazy trackBlocks(main), loadDelayed trackBlocks(document) + delayed.js, loadMainSections sampleRUM.enhance), scripts/delayed.js (comment only), scripts/aem.js sampleRUM (sampling, sendBeacon, ot.aem.live, ?rum= / ?optel=), 404.html (sampleRUM('404'))
- blocks/tabs/tabs.js (panel component entries, cmp:show), blocks/gen-carousel/gen-carousel.js (cmp:show, interaction values), blocks/modal/modal.js, blocks/separator/separator.js, blocks/list/list.js, blocks/cards/cards.js, blocks/tab/tab.js, blocks/column-break/column-break.js, blocks/video/video.js (data-cmp-auto), blocks/form-variations/form-variations.js (noValidate, aria-labelledby), blocks/conversation-canvas/conversation-canvas.js, decorators/card-list-decorator.js (trackCardList, data-cmp-position), decorators/skeleton-decorator.js (data-analytics pending), decorators/scroller-decorator.js (data-dragged); grep of all data-cmp-interaction values
- decorators/README.md (Data layer), utils/README.md, AGENTS.md (Data layer)
- Handover Part 11 (11.1–11.9, full), Part 16 findings F-02..F-06, O-07, 14.9
- docs/audit/BLOCK-ECOSYSTEM-AUDIT.md sections 6, 7, 9 and register (D-A-5, D-A-21, D-A-24, D-C-12, D-C-13, D-D-4, D-D-13, D-D-18); docs/audit/REAUDIT-2026-10-20.md (runtime table, R-A-3, R-C-2, R-D-3, R-D-12, R-D-17, D-D-13 corrected); docs/audit/reaudit/review-d.md; docs/audit/tools/harness.mjs
- test/privacy/privacy.test.mjs (run: 5 of 5 passed); .github/workflows/main.yaml (lint only)

## Discrepancies

- implementation: clicks outside blocks use path `page.page-{hash}` (analytics.js maps ids starting with `page-`) | documented: `component.page-{hash}` (handover 11.4 note, 11.8.2 test case 3) | impact: Tags rules / getState paths | correct: code (re-audit R-D-17 corrected it; decorators/README.md already says page.{id})
- implementation: cmp:search term is redacted (utils/privacy.js) and empty terms are not pushed; the search submit button doesn't push a cmp:click | documented: raw term, empty terms pushed (handover 11.4.5 note, 11.9 risk 1, F-03) | impact: search reports | correct: code (D-D-18)
- implementation: cmp:submit only for submissions passing checkValidity() on novalidate forms; dc:title is the form's aria-labelledby heading text | documented: pushed for every attempt before validation; dc:title `form-variations` (handover 11.4.6, F-02) | impact: form metrics | correct: code (D-D-4, R-D-3)
- implementation: card clicks carry `position` from the closest `[data-cmp-position]` item; feature card is position 1 with its own id | documented: card clicks carry no position (handover 11.6.1 note, F-04) | correct: code (D-A-5, D-A-24)
- implementation: drags, aria-disabled controls and automatic video play / pause (data-cmp-auto) are not pushed | documented: not mentioned in handover 11.4 | correct: code (D-A-21, R-A-3, D-D-13 corrected in re-audit; the first audit lists D-D-13 as Deferred)
- implementation: Tabs pushes component entries for its panels (`tcs-corp/components/tabs/item`) | documented: "Tab panels and carousel slides are not separate entries" (handover 11.4.2 note) | correct: code (D-C-13)
- implementation: getPageTags also reads the `cq-tags` meta | documented: article:tag, else tags (handover 11.2) | correct: code
- implementation: data-analytics="pending" (skeleton) exists | documented: only off / custom (handover 11.3.1, 11.5) | correct: code
- implementation: Tab and Column Break markers set data-analytics="off" | documented: not in handover 11.5 table | correct: code (D-C-12)
- decorators/README.md "Data layer" says `"custom"` for List, Separator (omits Cards) — minor; trackCardList sets custom for both List and Cards.

## Gaps and blocked topics

- Adobe Tags property, Web SDK datastreams, XDM schema, Analytics report suites, CJA data views, measurement plan: Blocked (measurement plan; handover O-07). No ids recorded.
- Form submission outcome event: Blocked (R-D-3, needs the measurement plan).
- mailto: / tel: link URLs still pushed in full (F-05 open in code).
- Search page URL raw ?q= (R-D-12): Blocked until Tags exists.
- No unit tests for the data layer decorator.
- 404 page data layer entry fields (dc:title "Page not found" from 404.html og:title, repo:path the requested path) derived from code reading; not run in a browser in this pass.

## Decisions found

- AGENTS.md rule: blocks don't push clicks themselves; they use data-cmp-* attributes and push only state the central code can't know (pushComponentEvent).
- Handover 11.7.2 (recommendation): Tags embed in scripts/delayed.js, not head.html; not in the editor.
- Re-audit 20 October 2026: page clicks under page.page-… (R-D-17); columns in tabs get {panel}-columns ids (R-C-2); aria-disabled not measured (R-A-3).
- Audit 19 October 2026 (handover 2.27): search redaction D-D-18; invalid submits D-D-4; drag clicks D-A-21; hidden markers D-C-12.

## Recommendations

- Update handover 11.4 / 11.6 / 11.8 / 11.9 and F-02..F-04 to the corrected behaviour (path page.*, redaction, positions, valid-only submits, Tabs panel entries).
- Mask or classify mailto: / tel: links before any sending (F-05).
- Add unit tests for componentIdOf / linkType / positionOf (pure parts of the decorator).
- Add `npm test` to CI.
