# agent-guidelines.md (also covers agent-instructions.md and copilot-instructions.md)

## Sources inspected
- AGENTS.md (on disk, 310 lines; newer than the copy in the session context: adds build:modules, build:docs, Module preloading, fallback fonts, blocks.json in Contributing)
- package.json scripts; .eslintrc.js (xwalk max-cells per model); node_modules/eslint-plugin-xwalk/lib/rules (invalid-field-name, max-cells, no-custom-resource-types, no-duplicate-fields, no-orphan-collapsible-fields)
- .husky/pre-commit, .husky/pre-commit.mjs (runs build:json and stages component-*.json when a _*.json partial is staged)
- .github/workflows/main.yaml (npm ci + npm run lint only), cleanup-on-create.yaml, pull_request_template.md
- tools/docs/validate-block-docs.mjs (REQUIRED_SECTIONS: 23 sections; SENSITIVE patterns), tools/modules/generate-module-graph.mjs, tools/paths/generate-paths.mjs
- decorators/data-layer-decorator.js (cmp:* events, data-cmp-interaction, data-analytics="off"), utils/privacy.js, utils/analytics.js, scripts/delayed.js (empty)
- decorators/motion-decorator.js (CONTENT_TARGETS, BACKGROUNDS), decorators/skeleton-decorator.js
- styles/styles.css (tokens, inter-fallback faces), styles/fonts.css
- Handover: Revision History, 12.3 Branching and Versioning, 12.4 Release Checklist, 13.15 Lint or PageSpeed failures, Part 16
- git log --merges (branch prefixes feature/, fix/, docs/, perf/)
- npm test on commit 2d06316: 311 tests, 311 pass (Passed)

## Discrepancies
- implementation: CI runs lint only | documented: AGENTS.md "Publishing Process" step 5 implies gh pr checks cover tests ("linting, and performance tests") | impact: npm test failures (stale generated files) aren't caught by CI | correct: workflow (F-37 still open)
- implementation: branches are feature/, fix/, docs/, perf/ | documented: handover 12.3 `feature/tcs-<topic>` (as of 2.0) | impact: none | correct: git history
- implementation: the PR template keeps boilerplate placeholders ({repo}, {owner}) | documented: AGENTS.md asks for a feature preview URL | impact: authors of PRs must fill the URL by hand | correct: both (F-37)

## Gaps and blocked topics
- docs/handover/knowledge-base/README.md doesn't exist yet when these files were written (planned in the KB README step); all three files link ./README.md.
- The AEM Code Sync and aem-psi-check GitHub apps aren't in the repository; their configuration can't be verified (handover 13.15 describes them).
- Branch protection rules on main: Not recorded (O-05).
- Analytics: blocked: measurement plan, Tags property, Web SDK datastream, consent platform (O-07).
- Personalization: no implementation; architecture decision required.

## Decisions found
- See decision-log notes (all decisions are recorded there).

## Recommendations
- Reference agent-instructions.md from the root AGENTS.md (a "Knowledge base (mandatory)" section) — Recommendation (not approved).
- Place copilot-instructions.md content in .github/copilot-instructions.md — Recommendation (not approved).
- Run npm test in the Build workflow (F-37) — Recommendation (not approved).
