# performance.md

## Sources inspected

- scripts/scripts.js (loadEager, loadLazy, loadDelayed, preloadBlockModules, preload, prefetchData, loadMainSections, loadFonts, CHROME_BLOCKS), scripts/aem.js (sampleRUM weight / enhance, loadCSS, loadBlock, loadSection, waitForFirstImage, createOptimizedPicture, decorateIcons), scripts/delayed.js (empty), scripts/module-graph.js (MODULES, BLOCKS, STYLED), head.html (20 modulepreload links, CSP), 404.html (404 checkpoint)
- tools/modules/generate-module-graph.mjs (existence), test/modules/module-graph.test.mjs
- styles/styles.css (header reservation, fallback faces), styles/fonts.css, styles/lazy-styles.css, styles/motion.css; blocks/list/list.css and cards.css (@import card-list.css); templates/blog/blog.css
- decorators/skeleton-decorator.js, motion-decorator.js (motion.css on demand), data-layer-decorator.js (trackInteractions, trackBlocks), responsive-image-decorator.js, card-list-decorator.js (eager fetch priority), scroller-decorator.js (batched frame); utils/header-space.js, utils/query-index.js (PAGE_SIZE 500, in-memory promise), utils/inherited-metadata.js (sessionStorage), utils/viewport.js, utils/lottie.js; blocks/hero/hero.js and page-header.js (eager, fetchPriority), blocks/embed/embed.js (X widgets, placeholder / onVisible), scripts/editor-support.js (DOMPurify)
- .github/workflows/main.yaml (lint only), package.json scripts
- AGENTS.md (Setup Commands build:modules, Three-Phase Page Loading, module preloading paragraph, Publishing Process, Testing > Performance)
- Handover 1.7.1, 2.10.14, 12.4 (checklist items 6 and 8), 13.15, 13.16, revision 2.36, Part 16 F-14, F-82, F-90, F-93, F-94, F-106
- docs/animation/README.md (F, I), docs/audit/DIALOG-OPTIONS-2026-10-20.md (12–13), audit harness

## Discrepancies

- implementation: `--header-reserved: var(--nav-height)` (4rem; 7.75rem from 1200px), the header Canvas out of the flow | documented: handover 1.7.1 "`--header-reserved`: 17.5rem mobile, 20.875rem tablet, 27.5rem desktop" | impact: outdated values | correct: code
- implementation: eager first section uses `loadSection(first, async (section) => { await prepareMotion(section); await waitForFirstImage(section); })` | documented: handover 1.7.1 "`loadSection(main.querySelector('.section'), waitForFirstImage)`" | impact: minor, animation preparation added | correct: code
- implementation: the first image gets `loading="eager"` only through waitForFirstImage when not yet complete, Hero / Page Header set eager + fetchPriority high | documented: handover 1.7.1 "the first image is set to loading=eager" | impact: none | correct: code (more detail)
- implementation: data-layer page entry and listeners in the eager phase, block tracking after the main sections (lazy) and again after 3 s (delayed) | documented: task brief "analytics dispatch (delayed phase)"; handover 1.7.1 "Delayed (after 3 seconds: late block tracking and scripts/delayed.js)" | impact: dispatch spans all phases, only the late tracking is delayed | correct: code
- implementation: test/ holds cards, conversation-canvas, docs, items, list, media, models, modules, motion, privacy, separator, site | documented: handover 1.7.8 "Unit tests: test/list, test/cards, test/separator" | impact: outdated list | correct: code
- implementation: handover 13.16 says "the header height is reserved (`--nav-height: 4rem`)" — consistent with code; 1.7.1 isn't (see first item)

## Gaps and blocked topics

- RUM field results: none recorded; RUM domain key and dashboard access "[To be confirmed]" (handover 2.10.14).
- Performance budgets: none defined (repository, CI, handover).
- DOM size: no measurement recorded.
- INP: only an escalation threshold (handover 13.16); no measurement recorded.
- No Lighthouse / throttling script in the repository; 2.36 measurements are documented in the handover only.
- Audit harness tied to delivery-workspace paths.

## Decisions found

- Three-phase loading and per-block code splitting (boilerplate; AGENTS.md).
- PSI 100 on the feature preview before merge (AGENTS.md Publishing Process step 3; handover 1.7.1, process only, not CI).
- Fonts eager only from 900px or when cached (handover 1.7.1).
- Footer loads alongside sections, hidden until they load; shared data from the lazy phase (handover 2.13, F-90).
- Header space reservation (handover 2.15, F-93; logo bar only from 2.21, F-98).
- Skeleton after 150 ms, minimum 250 ms (animation report; AGENTS.md "Animation and skeletons").
- Module preloading (head.html, preloadBlockModules, npm run build:modules, checked by npm test), batched scroller measurements, Canvas writes on change (handover 2.36, F-106, 20 October 2026).
- Fallback faces per system font after the font-swap CLS 0.33 (handover 2.36).

## Recommendations

- Define budgets per template (JS / CSS bytes, requests, long tasks) and review RUM p75 after releases.
- Consider preloading styles/card-list.css with the List / Cards stylesheet (currently a chained @import outside the preload graph).
- Fix F-14 (lazy non-site featured image).
- Commit runnable performance and harness scripts under tools/.
- Update handover 1.7.1 (`--header-reserved` values, loadSection callback) and 1.7.8 (test folders).
