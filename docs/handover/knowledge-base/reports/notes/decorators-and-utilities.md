# decorators-and-utilities.md

## Sources inspected

- Every file in `decorators/` (28) and `utils/` (26): header comments, exports, imports, module-level state, storage access, listeners and observers (grep), `catch` usage
- `scripts/scripts.js` (imports, exports, section options, preloading, prefetch, loading phases, `autolinkModals`), `scripts/editor-support.js`, `scripts/editor-support-rte.js`, `scripts/module-graph.js`, `scripts/delayed.js`, `head.html`, `tools/modules/generate-module-graph.mjs`, `blocks/fragment/fragment.js` (`loadFragment`)
- Consumers: grep of `from '.../<module>.js'` and dynamic imports in `blocks/`, `decorators/`, `utils/`, `scripts/`, `templates/`, `test/`; exported names searched across those folders and `tools/`
- Tests: imports of every `test/**/*.mjs`; `npm test` 311 passed at commit 2d06316
- `decorators/README.md`, `utils/README.md`, `templates/blog/blog.js`, `templates/home/home.js`
- `AGENTS.md` ("Shared code", "Data layer", "Module preloading", "Animation and skeletons"), audit section 7 (consent, privacy), re-audit (R-B-2, R-C-5, R-C-9, R-D-12), handover finding F-05

## Discrepancies

- implementation: `heading-decorator.js` is imported by teaser, quote, form-variations, testimonial and the card-list decorator | documented: "teaser, quote, testimonial, filter-list, form-variations" (decorators/README.md) | impact: Used-by column inaccurate | correct: code
- implementation: `content-decorator.js` is imported by teaser, quote, form-variations, testimonial, video, footer | documented: "teaser, quote, testimonial, page-header, form-variations" (decorators/README.md) | impact: same | correct: code
- implementation: `image-decorator.js` is imported by tcs-header, teaser, quote, testimonial, video | documented: "teaser, quote, testimonial, page-header" (decorators/README.md) | impact: same | correct: code
- implementation: `data-layer-decorator.js` is imported by `scripts.js`, tabs, modal, the skeleton and card-list decorators (list only through the card-list decorator) | documented: "`scripts.js`, list, modal" (decorators/README.md) | impact: same | correct: code
- implementation: `link-decorator.js` is also used by footer and the social-links, card-list and author-bio decorators | documented: "button decorator, teaser, list, page-header" (decorators/README.md) | impact: same | correct: code
- implementation: `utils/site.js` is also used by list, video and filter-list | documented: not listed (utils/README.md) | impact: same | correct: code
- implementation: some utils have side effects (`header-space.js` writes `localStorage`, `inherited-metadata.js` writes `sessionStorage`, `analytics.js` writes `window.adobeDataLayer`, loaders fetch and cache) | documented: "Utils are pure or read-only helpers" (utils/README.md Guidelines) | impact: wording; the effects are documented in the module headers | correct: code
- implementation: `mailto:` / `tel:` hrefs are pushed in full as `xdm:linkURL` (`data-layer-decorator.js` click handler) | documented: open finding F-05 (handover 16.2), to be masked in Tags | impact: personal data in the data layer once Tags is set up | correct: code (still open)

## Gaps and blocked topics

- The loading mechanism of `scripts/editor-support.js` in Universal Editor isn't in the repository (requires validation on AEM author).
- Decorators have no unit tests; their behaviour was validated only by the audit browser runs (not re-run for this file).
- Consent-aware behaviour: blocked (no consent model, CMP or Tags property).
- Editor-only listener leaks (audit deferral D-C-19) not quantified.

## Decisions found

- Decorators may import utils; utils never import decorators (AGENTS.md "Shared code"; verified by grep at commit 2d06316).
- Blocks don't push clicks; the data-layer decorator captures them centrally from `data-cmp-*` (AGENTS.md "Data layer").
- Search terms redacted before the data layer (audit D-D-18, `utils/privacy.js`).
- Module preloading from a generated module graph instead of a build step (AGENTS.md "Module preloading", `npm run build:modules`).
- Scroller measurements batched in one animation frame, reads before writes (AGENTS.md "Module preloading" paragraph; `scroller-decorator.js` header).
- `loadFragment(path, from)` recursion guard by the chain of including fragments (re-audit R-C-5).
- Replaced elements' ids dropped before re-rendering in the editor (re-audit R-C-9).

## Recommendations

- Generate the "Used by" columns of `decorators/README.md` and `utils/README.md` from the imports (as `npm run build:docs` does for the block READMEs) or correct them.
- Reword the utils README guideline to "build no UI; side effects only where documented in the header".
- Decide on `getLocations` / `getPartners` (`utils/data.js`, no consumer): keep for planned use or remove.
- Mask `mailto:` / `tel:` link URLs (F-05) when Tags is introduced, or in the data-layer decorator.
