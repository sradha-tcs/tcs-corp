# repository-structure.md

## Sources inspected

- `git ls-files` (all tracked paths and counts), `git status --ignored`, `.git/info/exclude`, `git check-ignore`
- .gitignore, .hlxignore, .eslintignore, .eslintrc.js, .stylelintrc.json, .editorconfig, .renovaterc.json, .husky/pre-commit(.mjs), .github/workflows/main.yaml, cleanup-on-create.yaml, pull_request_template.md
- fstab.yaml, paths.json (counts), helix-query.yaml, helix-sitemap.yaml, head.html, 404.html (head), xwalk.json, package.json, tools/sidekick/config.json, .migration/project.json, .agents/settings.json, .well-known/ and well-known/ (sizes and history only), README.md, CONTRIBUTING.md, LICENSE (header), CLAUDE.md
- models/*.json (ids, aggregators), blocks/ file lists, scripts/ headers (module-graph.js, editor-support.js imports, editor-support-rte.js), scripts/scripts.js function names (applySectionBlockOptions, buildColumnsSections, loadErrorPage, TEMPLATES, loadTemplate, preloadBlockModules, prefetchData, loadEager / loadLazy / loadDelayed)
- tools/docs/*.mjs, tools/modules/*.mjs, tools/paths/*.mjs headers; tools/docs/blocks.json, library-snapshot.json
- test/ tree, test/model-layout.mjs, test/models/block-names.test.mjs, test/privacy header
- decorators/README.md, utils/README.md, templates/README.md, blocks/README.md, docs/handover/README.md
- Local folders (names only): .home-work, .handover-work, content, en, migration-work, drafts/{dam,en,language-master}, query-index.json, .claude, .claude-plugin
- Handover 1.7.4, 1.7.8, 1.11, 12.3

## Discrepancies

- implementation: the aggregated file is `component-definition.json`, and the third aggregate is `component-filters.json` | documented: AGENTS.md "Project Structure" lists `component-definitions.json` and `component-models.json` twice | impact: low, misleading for new joiners | correct: repository
- implementation: workspace folders (.home-work, .handover-work, content, en, migration-work, drafts/, query-index.json, .claude-plugin) are ignored only by the local `.git/info/exclude` | documented: not documented; .gitignore lists only .hlx, coverage, logs, node_modules, helix-importer-ui, .DS_Store, *.bak, .idea | impact: a fresh clone would show them as untracked and could commit them | correct: n/a (record)
- implementation: `drafts/` has 14 tracked files although `drafts/` is in the local exclude | documented: AGENTS.md describes drafts/ as local test content | impact: low | correct: repository (tracked files stay tracked)
- implementation: CI step "Use Node.js 20" installs Node 24 | documented: README "nodejs 20 or newer" | impact: cosmetic
- implementation: unit tests are not run in CI (main.yaml runs lint only) | documented: AGENTS.md "Run the unit tests: npm test" (developer step); handover 1.7.8 "CI runs lint" | impact: generator / docs checks only fail locally | correct: workflow
- implementation: Stylelint covers `blocks/**/*.css` and `styles/*.css` only | documented: AGENTS.md "Follow Stylelint standard configuration" (no scope) | impact: templates/*.css not linted
- implementation: `.hlxignore` pattern `.*` matches `.well-known/` | documented: not documented; a second copy exists as `well-known/adobe/cloudmanager-challenge.txt` | impact: Requires validation — whether the Cloud Manager challenge must be served and which copy is used
- implementation: package.json name `@adobe/aem-boilerplate`, version 1.3.0, repository adobe/aem-boilerplate; tools/sidekick project "AEM XWalk Boilerplate"; PR template `{repo}` / `{owner}` unsubstituted; CONTRIBUTING.md mentions `npm run commit` (no such script) | documented: handover 12.3 notes the boilerplate version only | impact: low, confusing metadata
- implementation: 12 test folders | documented: handover 1.7.8 lists 3 | correct: code

## Gaps and blocked topics

- Ownership per folder: no CODEOWNERS; handover 1.11 has roles only, names "To be confirmed" (O-01)
- Whether `cleanup-on-create.yaml` ever ran (its substitutions in README / PR template weren't applied): not verifiable from the repository
- Whether `drafts/` files are reachable on the code bus (not in .hlxignore): not verified on aem.page
- The applied site configuration (public.json paths, metadata.source) isn't in the repository (O-04)

## Decisions found

- `scripts/aem.js` is never modified — AGENTS.md (boilerplate rule), handover 1.7.8
- Shared behaviour in single-purpose decorators / utils; utils never import decorators — AGENTS.md "Shared code"
- Generated files: component-*.json (`build:json`, pre-commit hook), paths.json (`build:paths`), modulepreload + module-graph.js (`build:modules`, handover 2.36), block README sections (`build:docs`, handover 2.37)
- docs/ not served (`.hlxignore`) — AGENTS.md
- ESLint pinned to v8 until airbnb-base supports v9 — .renovaterc.json

## Recommendations

- Add the workspace folders to `.gitignore` (or document that they must stay out of commits)
- Add a CODEOWNERS file once owners are named
- Run `npm test` in the Build workflow (it checks the generated files)
- Extend the Stylelint globs to `templates/**/*.css`
- Remove `cleanup-on-create.yaml`, fix the PR template placeholders, and replace the boilerplate package.json / sidekick metadata
- Fix the AGENTS.md Project Structure file names
