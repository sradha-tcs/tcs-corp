# testing-and-quality.md

## Sources inspected

- package.json (`test`, `lint*`, `build:*`), .eslintrc.js, .eslintignore, .stylelintrc.json, .github/workflows/main.yaml
- Every file in test/ (imports, describe / it names); per-file counts from `node --test <file>`; full `npm test` run (311 tests, 53 suites, 0 failures) and `npm run lint` (clean) at commit 2d06316 on 21 October 2026
- node_modules/eslint-plugin-xwalk/lib/index.js (recommended rules)
- docs/audit/README.md, tools/harness.mjs (full), compare.mjs, inventory.mjs, register.mjs (headers), BLOCK-ECOSYSTEM-AUDIT.md (sections 1, 2, 5–9, 11–14), REAUDIT-2026-10-20.md (sections 1, 2, 5–7), DIALOG-OPTIONS-2026-10-20.md (full)
- Handover: revision history 2.20–2.37 (packages, publication, reindex, Lighthouse), 1.7 Non-Functional Requirements, 11.8 Validation, 12.4 Release Checklist, 13.16, 14.7 Health Checks
- git ls-files drafts, .git/info/exclude (what's tracked)

## Discrepancies

- implementation: 14 test files / 311 tests | documented: handover 12.2.4, 1.7.8, 11.8.4 list only List, Cards, Separator tests; DIALOG-OPTIONS 15 reports 271 unit tests (at that time) | impact: medium | correct: repository (current run)
- implementation: harness widths 1440, 1024, 768, 600, 390px | documented: DIALOG-OPTIONS 12–13 says "1440, 1024, 768, 700, 390 and 375px (the harness runs 5 widths)" (700 / 375 were manual checks) | impact: low | correct: harness.mjs for the automated widths
- implementation: the harness and compare tools depend on delivery workspace paths (Playwright under `~/.npm/_npx/...`, axe under `/tmp/audit/`, `drafts/en/block-library` which isn't tracked) | documented: BLOCK-ECOSYSTEM-AUDIT 14 "Tools (re-runnable)" with "Paths are those of the delivery workspace" | impact: medium, not runnable from a fresh clone | correct: both (re-runnable only in the workspace)
- implementation: `data-block-status` becomes `loaded` even after a failed load, so the harness "block not loaded" check can't detect a failed decorate (console errors catch it) | documented: audit tables list "Loads with a block not loaded: 0" as a check | impact: low (errors check covers it) | correct: code

## Gaps and blocked topics

- Universal Editor dialog persistence / live updates: Blocked (AEM author access; to be checked by an author).
- Analytics / Web SDK delivery: Blocked (Adobe Tags property, datastream, measurement plan).
- Screen reader runs: Blocked (no screen reader in the environment).
- Non-Chromium browsers and devices: not executed; no support matrix (handover 1.7.5 to be confirmed).
- Consent and personalization tests: Not applicable (not implemented); blocked on consent model / personalization design.
- Content package build and install procedure: not in the repository.
- No automated DOM tests for block decoration or the data layer decorator.

## Decisions found

- Automated axe runs at 1440 and 390px with WCAG 2.0–2.2 A / AA tags; reduced motion on (harness.mjs; audits 19–20 October 2026).
- The colour token change for WCAG 1.4.3 needs design sign-off (BLOCK-ECOSYSTEM-AUDIT section 13; still open in handover 2.31).
- Comparing aem.page with the local preview is recommended for the release checklist (BLOCK-ECOSYSTEM-AUDIT section 13; recommendation, not adopted in handover 12.4).
- Block library pages stay out of the query index by design (handover 2.35; helix-query.yaml).

## Recommendations

- Run `npm test` in CI.
- Commit a portable version of the harness (relative paths, Playwright and axe as devDependencies) and the renderer producing `drafts/en/`.
- Add DOM-level tests (e.g. with a lightweight DOM) for the data layer decorator click capture.
- Add a cross-browser pass (WebKit / Firefox through Playwright) and define the support matrix.
- Add the aem.page vs local comparison to the release checklist.
