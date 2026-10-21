# deployment-and-release.md

## Sources inspected

- `AGENTS.md` "Setup Commands", "Deployment" (Environments, Publishing Process), "Content"
- `package.json` (scripts, devDependencies, version 1.3.0), `README.md` (Node 20 or newer)
- `.github/workflows/main.yaml`, `.github/workflows/cleanup-on-create.yaml`, `.github/pull_request_template.md`, `.husky/pre-commit`, `.husky/pre-commit.mjs`, `.renovaterc.json`, `.eslintrc.js`, `.stylelintrc.json`, `fstab.yaml`, `helix-query.yaml`, `helix-sitemap.yaml`, `.gitignore`
- `docs/audit/README.md`, `docs/audit/tools/{compare,harness,inventory,register}.mjs` (headers), `docs/audit/BLOCK-ECOSYSTEM-AUDIT.md` (sections 9, 11–14), `docs/audit/REAUDIT-2026-10-20.md` (sections 5–7)
- Handover Part 12 (12.1–12.6), Part 17 (17.5, 17.6), revision history (2.20–2.37)
- Git (read only): `git tag` (3 tags `home-content-package_*`), tag annotations, `git branch -a`, branch `origin/home-content-package` (file list and README), merge commits on `main` (130; branch prefixes), `git ls-files drafts` (14 files), `.home-work` not tracked
- Runs at 2d06316: `npm test` (311 tests, 53 suites, all pass), `npm run lint` (no errors), fresh merge of the three model partials compared with the aggregated files (identical)
- `gh` is not installed in this environment: PR checks, Code Sync and aem-psi-check could not be verified

## Discrepancies

- implementation: 311 unit tests in `test/` (cards, conversation-canvas, docs, items, list, media, models, modules, motion, privacy, separator, site) | documented: three test files (handover 12.2.4) | impact: understated test coverage | correct: `test/`
- implementation: three annotated tags `home-content-package_*` exist, on the `home-content-package` branch (downloads), none on `main` | documented: "No Git tags exist" (handover 12.3) | impact: tags could be mistaken for release tags | correct: git
- implementation: the `home-content-package` README mentions the tag `home-content-package_20-Oct-2026_1229`, which is not among the local tags (1446, 1801, 0256) | documented: branch README | impact: a rollback target may be missing | correct: Requires validation (`git ls-remote --tags`)
- implementation: branch prefixes `feature/`, `feat/`, `fix/`, `perf/`, `docs/` in the merge history | documented: `feature/tcs-<topic>` (handover 12.2.2, 12.3) | impact: convention not followed | correct: history (no enforced rule)
- implementation: workflow step "Use Node.js 20" installs `node-version: 24` | documented: README "nodejs 20 or newer"; handover "the GitHub workflow installs Node 24" | impact: misleading step name only | correct: workflow file
- implementation: content packages are distributed on the `home-content-package` branch | documented: not mentioned in the handover (only the package versions and their publication) | impact: admins may not find the packages | correct: git

## Gaps and blocked topics

- Branch protection on `main`, required reviews and checks: Not recorded (O-05).
- AEM Code Sync and `aem-psi-check` check results: not verifiable without GitHub access (Blocked: `gh` / repository access).
- Change management process, emergency change approval, hotfix path: Not recorded.
- Rollback: never exercised in the recorded history (the one revert commit, 03d2e87, is a change inside a branch, not a production rollback); procedures Require validation.
- The audit tools depend on delivery-workspace paths (Playwright install, `/tmp/audit` axe, untracked `drafts/en/block-library`, `.home-work/bl/package`); Blocked from a clean clone.
- Package build tooling (`.home-work/bl/`) is outside Git; how to rebuild a package is not documented in the repository.
- Production domain, CDN, push invalidation: Not recorded (O-03).

## Decisions found

- Code first, then content (handover Part 12 introduction).
- PR descriptions must link the feature preview URL or the PR is rejected (AGENTS.md "Publishing Process").
- Never force-push `main`; roll back with revert commits (handover 12.6.1).
- Renovate: devDependency PRs labelled `ignore-psi-check` and auto-merged; ESLint pinned to `^8.0.0` until airbnb-base supports v9 (`.renovaterc.json`).
- Library content migrated by code when packages are built (`bl-migrate.mjs`; audit section 11).
- Packages 1.0.10, 1.0.12, 1.0.13 published and reindexed page by page with the Admin API (handover revisions 2.31, 2.35; 20 October 2026).

## Recommendations

- Add `npm test` to `.github/workflows/main.yaml` (handover F-37, 14.9 #19).
- Replace `{repo}` / `{owner}` in `.github/pull_request_template.md`; rename the Sidekick project label (handover 14.9 #21).
- Tag production releases on `main` (handover 12.3 recommendation) and keep a changelog from PR titles.
- Parameterise the audit tools' paths so they run from a clean clone; add the `aem.page` vs local comparison to the release checklist (audit section 13).
- Document the package build in the repository or on the `home-content-package` branch README.
