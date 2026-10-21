# reports/repository-inventory.md

## Sources inspected
- git ls-files (tracked files by top-level folder); git status --ignored (untracked local folders)
- tools/docs/blocks.json (block status, type, purpose, children)
- component-filters.json (which filters offer each block); every blocks/<b>/<b>.js import list
- Consumer map: git grep of every decorators/*.js, utils/*.js and scripts/*.js file name in *.js, *.mjs, *.html (excluding docs/ and module-graph.js)
- decorators/README.md, utils/README.md, templates/README.md (purposes); scripts/scripts.js (loadTemplate, TEMPLATES, loadFonts, lazy-styles, modal auto-links, gen-carousel / tabs / columns sections); models/_page.json (Page Type options)
- Icons: git grep of each icon name in blocks, decorators, utils, scripts, styles, templates (every icon has a consumer)
- drafts/: references of each file (canvas-journey pages listed in blocks/conversation-canvas/README.md "Local checks"; tcs-header pages referenced only by other drafts)
- .hlxignore, .gitignore, .eslintignore, .stylelintrc.json, .editorconfig, .renovaterc.json, .husky, .github, xwalk.json, fstab.yaml (host not reproduced), .migration/project.json (host not reproduced), .well-known / well-known (tokens not reproduced), helix-query.yaml, helix-sitemap.yaml, head.html (22 modulepreload links), package.json, tools/sidekick/config.json, README.md, CONTRIBUTING.md
- test/*: imports of each test; npm test on 2d06316: 311 tests, 53 suites, 0 failures (Passed)
- docs/handover/README.md (earlier guides superseded), docs/audit/README.md, docs/proposals/README.md

## Discrepancies
- implementation: decorators/author-bio-decorator.js, contact-list-decorator.js and template-decorator.js are imported by templates/article/article.js and templates/press-release/press-release.js, loaded by scripts.js loadTemplate by Page Type | documented: the task brief suggested them as unused candidates | impact: none (Active) | correct: code
- implementation: scripts/lib/lottie is loaded by utils/lottie.js (LOTTIE_PLAYER path string) | documented: brief suggested unused candidate | correct: code (Active)
- implementation: test/model-layout.mjs reads the block model partials (blocks/<b>/_<b>.json), not component-models.json | correct: code
- implementation: .hlxignore contains `.*`, which matches `.well-known/` | documented: not documented | impact: the Cloud Manager challenge under .well-known may not be served by Edge Delivery | correct: requires validation
- implementation: drafts/ isn't in .hlxignore (served by the code bus) | documented: AGENTS.md treats drafts as local test content | impact: test pages reachable on aem.page / aem.live | correct: requires validation
- implementation: interactive-dashboard has a definition and model but is in no filter | documented: blocks.json "Experimental (placeholder)" | consistent

## Gaps and blocked topics
- Renovate app installation, the external PR checks (AEM Code Sync, aem-psi-check) and whether xwalk.json is applied to the site configuration: Requires validation.
- Whether pages use each template (Page Type) can't be verified without content access.
- Untracked working-copy folders (.handover-work, .home-work, content, en, migration-work, drafts/dam, drafts/en, drafts/language-master, query-index.json) are outside the repository and listed only as a note.
- docs/handover/knowledge-base/README.md doesn't exist yet (linked as ../README.md).

## Decisions found
- multifield.js Compatibility-only (KB-D-015); blocks/columns and models/_button.json Compatibility-only (KB-D-031, KB-D-032); utils/site.js REVIEW_* temporary (KB-D-010).

## Recommendations
- Confirm and, if unused, remove well-known/adobe/cloudmanager-challenge.txt, .github/workflows/cleanup-on-create.yaml, the TCS Header drafts and drafts/media — Recommendation (not approved; nothing removed).
- Decide whether drafts/ should be listed in .hlxignore — Recommendation (not approved).
- Replace the boilerplate README.md, PR template placeholders, package.json name / version and the Sidekick project name (F-37) — Recommendation (not approved).
