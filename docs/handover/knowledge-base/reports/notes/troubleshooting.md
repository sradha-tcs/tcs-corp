# troubleshooting.md

## Sources inspected

- Handover Part 13 — Global Troubleshooting Guide (13.1–13.32, full), 14.3 Logs, 14.4 Common Errors, 14.5 Escalation Matrix, 14.6, 11.8, 11.9
- Block READMEs, Troubleshooting sections: list, filter-list, video, hero, teaser, form-variations, conversation-canvas, header, fragment
- Code: scripts/aem.js (loadBlock, loadCSS dedupe by `head > link[href]`), scripts/scripts.js (preload into body, loadTemplate, buildAutoBlocks, loadEager fonts, loadLazy hash scroll, loadDelayed 3 s, autolinkModals, TEMPLATES), scripts/editor-support.js (reload fallback), scripts/delayed.js (empty), head.html (CSP, modulepreload), decorators/data-layer-decorator.js (tracked, summary handling, listeners), utils/analytics.js, utils/privacy.js, utils/inherited-metadata.js (sessionStorage key), utils/query-index.js, utils/redirects.js (MAX_HOPS 5), utils/card-list-config.js (isSafeUrl), decorators/responsive-image-decorator.js (`/media_` only), decorators/link-decorator.js (announceNewTab), blocks/fragment/fragment.js, blocks/header/header.js, blocks/list/list.js / separator.js (debug switches), styles/styles.css (`--nav-height`), helix-query.yaml
- docs/audit/REAUDIT-2026-10-20.md sections 5–6 (DAM assets, publication), handover revisions 2.31 / 2.35 (preview / publish / reindex counts), finding F-10, F-80, F-87, F-106

## Discrepancies

- implementation: header desktop from 1200px | documented: "header switches at 900 px" (handover 13.1.1, 1.7.6) | impact: wrong breakpoint in triage | correct: code
- implementation: `loadBlock` sets `data-block-status="loaded"` after an error too | documented: handover 13.3 validation "the block element has data-block-status=loaded" | impact: false confirmation of a fix | correct: code (use the console)
- implementation: Hero / Table List Motion Type fields removed; legacy `motion-*` values mapped to the Additional tab animations (`LEGACY_MOTIONS`, `addLegacyMotion`) | documented: handover 13.30 "Motion Types (Hero, Table List) don't run in Universal Editor or with reduced motion" (as if a current field) | impact: low | correct: code
- implementation: `loadCSS` skips a stylesheet when any `head > link` has the same href (whatever its rel) | documented: AGENTS.md "Module preloading" (consistent); not in handover Part 13 | impact: a preload link in the head would silently drop block CSS | correct: code (added as a runbook row)
- implementation: handover 13.20 says blocks are tracked "header, footer and late blocks after 3 s in loadDelayed()" | code: `loadDelayed` `setTimeout(… trackBlocks(document) …, 3000)` | consistent

## Gaps and blocked topics

- Data Collection / Web SDK, Target / AJO, consent / identity: not implemented; rows describe the expected state and the blocked dependency.
- Content package build / install procedure: not in the repository (delivery workspace); runbook row marked Blocked.
- Admin API calls (status, index, code, cache) need authentication; credentials and roles not documented here (administration KB / handover 12.1.9).
- Production CDN, redirect mechanism, production domain: to be confirmed (handover 13.12, 13.25, 13.28).
- `./decorators-and-utilities.md` didn't exist yet when written (linked as requested).

## Decisions found

- Per-locale redirect sheets aren't applied by the platform, by the user's choice (AGENTS.md "Site structure and site data"; handover 13.12).
- Lists and Filter Lists can't show index data in Universal Editor; hints instead (handover 13.10; blocks/list README Known limitations).
- Header falls back to the locale's `references/nav` when the configured Navigation page can't load (F-80, handover 2.6).
- Non-image DAM assets must be published separately (re-audit section 5, handover 2.29).
- Search terms redacted in the data layer (block audit D-D-18, utils/privacy.js).

## Recommendations

- Correct handover 13.3 validation to "no `failed to load module` error in the console".
- Add the `loadCSS` head-link rule to handover Part 13 (CSS missing).
- Update handover 13.1.1 / 1.7.6 to the 1200px header breakpoint and 13.30 to the mapped legacy Motion Types.
- Document the content package build and install procedure in the repository.
