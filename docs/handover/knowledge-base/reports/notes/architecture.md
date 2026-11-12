# architecture.md

## Sources inspected

- scripts/scripts.js (whole), scripts/aem.js (loadBlock, decorateBlock, loadSection, loadSections), scripts/editor-support.js, scripts/module-graph.js (header), scripts/delayed.js
- head.html, 404.html, fstab.yaml, paths.json (counts of mappings / includes / excludes), xwalk.json, .hlxignore, package.json scripts, .github/workflows/main.yaml, component-filters.json (main, section), component-definition.json (group counts)
- utils/site.js, utils/query-index.js, utils/inherited-metadata.js, utils/header-space.js, utils/environment.js, utils/privacy.js, utils/placeholders.js, utils/taxonomy.js, utils/data.js, utils/redirects.js
- decorators/seo-decorator.js, decorators/data-layer-decorator.js (header, cmp:search), decorators/skeleton-decorator.js, blocks/fragment/fragment.js, blocks/header/header.js (nav fallback)
- utils/README.md, decorators list, templates/README.md, blocks/header/README.md, blocks/footer/README.md, blocks/fragment/README.md, blocks/modal/README.md
- AGENTS.md (whole), handover Part 2.1–2.8, 2.10.3–2.10.7, 2.10.13–2.10.14, 12.1.6–12.1.9, Part 16.2 (selected findings)

## Discrepancies

- implementation: `paths.json` has 154 mappings and 15 includes (incl. `/content/tcs-corp/language-master/en`) | documented: "143 mappings … 14 includes (13 locale pages + /content/dam/tcs-corp/)" (handover 2.5.3) | impact: readers under-count the review mappings | correct: paths.json (handover 2.10.2 has the right 15 / 154 figures)
- implementation: `utils/header-space.js` stores `header-height-v2-{breakpoint}` in `localStorage` | documented: handover 2.7.3 / 2.10.6 list only sessionStorage (`fonts-loaded`, `tcs-inherited-metadata`) as browser storage; 12.1.8 caching table omits it | impact: incomplete privacy / storage inventory | correct: code (handover 3.5.1 mentions localStorage for the header space)
- implementation: `loadLazy` uses `loadMainSections` (loadSection with `prepareMotion`) and `decorateSectionsWithOptions` also builds Columns Container sections | documented: handover 2.3.2 says `loadSections(main)` and only Gen Carousel and Tabs Container | impact: minor, outdated lifecycle text | correct: code
- implementation: the Fragment block keeps its authored content (the link) when the fragment can't load; only in UE edit mode it shows the `fragmentEmpty` hint | documented: handover 4.8 "renders nothing; the block stays empty" | impact: support diagnosis | correct: code (fragment README "Issue 1 — bare link" agrees with code)
- implementation: `.github/workflows/main.yaml` step is named "Use Node.js 20" but installs `node-version: 24` | documented: handover 2.10.5 says the workflow installs Node 24 | impact: cosmetic naming | correct: the `node-version` value
- implementation: `component-filters.json` `main` allows section, gen-carousel, tabs, columns-container | documented: handover 2.3.7 "main (section, gen-carousel, tabs)" | impact: outdated | correct: generated filters
- implementation: Form Variations integrations can report outcomes with `detail.respondWith(promise)` (AGENTS.md shared events) | documented: handover 2.8 warning says the success message shows even though no data is sent | impact: may be outdated; not re-verified in form-variations.js for this file | correct: Requires validation in blocks/form-variations

## Gaps and blocked topics

- How `scripts/editor-support.js` is loaded in Universal Editor (not referenced by head.html or scripts.js): handover 2.3.6 says editor context only; mechanism is outside the repository — needs confirmation from AEM / UE configuration.
- Production domain and CDN, `cdn.prod.host`, 403 / 500 handling, root redirect: not configured (handover O-03, F-36) — needs Site Administrator input.
- Admin roles, preview / live access protection, other AEM environments: Not recorded.
- Adobe Tags / Web SDK: blocked (measurement plan); Target / AJO / CJA: no integration; consent: none.
- Edge Delivery platform behaviour (CDN purge on publish, head.html injection, CSP header move) is taken from the handover / AGENTS.md, not verifiable in the repository.

## Decisions found

- `scripts/aem.js` is never modified (AGENTS.md "Project Structure").
- Layering: decorators may import utils, utils never import decorators (AGENTS.md "Shared code").
- Module preloading via generated `head.html` links and `scripts/module-graph.js` (handover revision 2.36, finding F-106, closed).
- Repeating content as item children instead of composite multifields (AGENTS.md "Item children").
- Header without navigation on desktop: product decision of 16 October 2026 (blocks/header/README.md, handover F-72).
- Data fetching not in the eager phase (code comment in `prefetchData`).

## Recommendations

- Correct handover 2.5.3 counts (154 / 15) and add the `localStorage` header-height key to handover 2.7.3 and 12.1.8.
- Run unit tests in CI (`npm test` in `.github/workflows/main.yaml`; handover F-37) and rename the Node step.
- Document how editor-support.js is injected once confirmed.
