# development-standards.md

## Sources inspected

- AGENTS.md (on disk, includes Setup Commands lines on build:modules / build:docs, Module preloading, Contributing), CLAUDE.md, README.md, CONTRIBUTING.md
- package.json, .eslintrc.js, .eslintignore, .stylelintrc.json, .hlxignore, .gitignore, .renovaterc.json, .husky/pre-commit, .husky/pre-commit.mjs, .github/workflows/main.yaml, .github/workflows/cleanup-on-create.yaml, .github/pull_request_template.md
- git log --merges (branch prefixes counted), git tag -n1
- scripts/aem.js (loadBlock, loadCSS), scripts/scripts.js (loadTemplate, preload, preloadBlockModules, loadEager, loadLazy, loadDelayed, TEMPLATES, Column -> column-break), scripts/editor-support.js, scripts/delayed.js, head.html, scripts/module-graph.js
- decorators/data-layer-decorator.js, utils/analytics.js, utils/placeholders.js / taxonomy.js / data.js / query-index.js / redirects.js (catch handling), decorators/motion-decorator.js, skeleton-decorator.js, animation-decorator.js, editor-item-decorator.js, blocks/fragment/fragment.js (loadFragment), blocks/header/header.js (isDesktop), utils/viewport.js
- Legacy handling: blocks/hero/hero.js (LEGACY_MOTIONS), utils/motion.js (addLegacyMotion), blocks/video/video.js, blocks/list/list-data.js (itemLayoutFor), utils/query-index.js (featureCard / featuredPriority), styles/styles.css (.section.highlight)
- node_modules/eslint-plugin-xwalk/lib/index.js (recommended rules)
- blocks/README.md (Shared Conventions, Deprecated Blocks, Maintaining This Documentation), decorators/README.md, utils/README.md
- docs/audit/BLOCK-ECOSYSTEM-AUDIT.md (sections 4, 8, 9, 11), REAUDIT-2026-10-20.md (section 5), DIALOG-OPTIONS-2026-10-20.md
- Handover: 1.7 Non-Functional Requirements, 12.2 Code Deployment, 12.3 Branching and Versioning, 12.4 Release Checklist, 12.5, 12.6 Rollback, revision history 2.20–2.37
- grep of `new CustomEvent(` for the event names

## Discrepancies

- implementation: merged branches use `feature/` (85, 74 with `tcs-`), `fix/` (30), `docs/` (6), `feat/` (2), `perf/` (2); recent branches have no `tcs-` | documented: `feature/tcs-<topic>` (handover 12.2.2, 12.3) | impact: low, naming guidance outdated | correct: git history (practice); no enforced rule
- implementation: 3 git tags `home-content-package_*` exist (downloads branch markers) | documented: "No Git tags exist" (handover 12.3) | impact: low | correct: repository
- implementation: 14 test files, 311 tests (module graph, docs, motion, privacy, site, items, models, canvas journey, media, list, cards, separator) | documented: unit tests are `test/list`, `test/cards`, `test/separator` only (handover 12.2.4, 1.7.8, 11.8.4) | impact: medium, reviewers underestimate coverage | correct: repository
- implementation: header desktop layout from 1200px (`header.js` `matchMedia('(min-width: 1200px)')`, AGENTS.md "Header") | documented: header switches at 900px (handover 1.7.6, 13.1.1) | impact: medium for responsive diagnosis | correct: code
- implementation: CONTRIBUTING.md is the Adobe boilerplate (fork workflow, `npm run commit` wizard, CLA) | documented: — | `npm run commit` doesn't exist in package.json | impact: low, misleading for contributors | correct: package.json / AGENTS.md
- implementation: `lint:css` covers `blocks/**/*.css` and `styles/*.css` only; `templates/*/*.css` isn't linted | documented: AGENTS.md "Follow Stylelint standard configuration" (implies all CSS) | impact: low | correct: package.json
- implementation: AGENTS.md references `.home-work/render-lib.mjs` (library preview) and the audit tools reference workspace paths; `.home-work/` and `migration-work` are excluded via `.git/info/exclude`, and `drafts/en/` (rendered library) isn't tracked | documented: AGENTS.md "The library preview (.home-work/render-lib.mjs) reproduces these rules" | impact: medium, a fresh clone can't reproduce the local library preview or the migrations | correct: repository (files not committed)
- implementation: `data-block-status="loaded"` is set by `loadBlock` even when the module failed | documented: handover 13.3 uses it as validation | impact: medium for troubleshooting | correct: code
- implementation: `package.json` name `@adobe/aem-boilerplate` 1.3.0, repository URL adobe/aem-boilerplate | documented: handover notes the boilerplate version (consistent) | impact: none

## Gaps and blocked topics

- Branch protection, required reviewers, approval rules on `main`: Not recorded (handover lists as to be confirmed; needs repository administrator).
- PageSpeed (aem-psi-check) and AEM Code Sync configuration aren't in the repository (GitHub apps); behaviour taken from AGENTS.md / handover.
- Production content usage of legacy fields: blocked (AEM author access).
- Content package build / migration scripts (`.home-work/bl/bl-migrate.mjs`, build-package.mjs) are not in the repository.
- `./decorators-and-utilities.md` didn't exist yet when written (linked as requested; expected from a parallel writer).

## Decisions found

- Built-in Columns and Button no longer offered; definitions kept for existing content (handover 2.28, PR #119, AGENTS.md "Columns Container", "Button").
- Item children instead of composite multifields (handover 2.10 / finding F-87, AGENTS.md "Item children").
- Container sections use `container*` fields because sections don't get `classes_*` (handover 2.30, re-audit R-L-1, PR #121).
- Teaser Title size merged into Title Type; Section Highlight mapped to Grey; `hideTitle` renamed `titleHidden` (DIALOG-OPTIONS-2026-10-20 sections 4–5; handover 2.32–2.34; PRs #123–#125).
- Module preloading and no forced layouts (handover 2.36, F-106, PR #127); fallback font faces per system font (PR #128).
- Block READMEs with generated sections and `npm run build:docs`, checked by `npm test` (handover 2.37, F-107, PR #129).
- Personalization option removed from the Teaser (block audit D-B-3, handover 2.27).
- Renovate pins ESLint to v8 until airbnb-base supports v9 (.renovaterc.json).

## Recommendations

- Add `npm test` to `.github/workflows/main.yaml` (also recommended in handover 12.2.4).
- Replace `{repo}` / `{owner}` in `.github/pull_request_template.md` and replace the boilerplate CONTRIBUTING.md with a project one pointing to AGENTS.md.
- Extend `lint:css` to `templates/**/*.css`.
- Agree a branch naming convention (`feature|fix|docs|perf/<topic>`) and record it in AGENTS.md; update handover 12.3.
- Commit (or document the location of) the library preview renderer and the migration scripts, or remove their references from AGENTS.md.
- Update handover 1.7.6 / 13.1.1 (header breakpoint 1200px), 12.2.4 / 1.7.8 / 11.8.4 (test inventory), 12.3 (tags).
