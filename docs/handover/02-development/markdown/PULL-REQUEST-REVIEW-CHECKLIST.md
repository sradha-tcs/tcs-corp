---
id: "DEV-015"
title: "Pull Request Review Checklist"
role: "Development"
topic: ""
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["AGENTS.md","docs/handover/knowledge-base/development-standards.md"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Pull Request Review Checklist

| Attribute | Value |
| --- | --- |
| Document ID | DEV-015 |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | What every pull request must contain and what reviewers check |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | AGENTS.md, docs/handover/knowledge-base/development-standards.md |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Checklist](#checklist)
- [Code Review](#code-review)
- [Definition of Done](#definition-of-done)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Checklist

- [ ] Branch from `main`; PR into `main` with a feature preview URL (`https://<branch>--tcs-corp--sradha-tcs.aem.page/<path>`).
- [ ] `npm run lint` and `npm test` run; real results in the PR description.
- [ ] Generated files current: `build:json`, `build:modules`, `build:docs`, `build:paths` as applicable.
- [ ] Models follow the AEM delivery rules (tabs, Additional tab, item children, naming).
- [ ] Accessibility (WCAG 2.1 AA), performance (three-phase loading, no new runtime dependency), privacy (no personal data in the data layer).
- [ ] UI text from placeholders with an English fallback.
- [ ] Block README, decorators/utils READMEs, AGENTS.md, knowledge base and decision log updated.
- [ ] **docs/handover on migrated-page-content-edam updated** for the change (role documents, test cases, screenshots) or the PR says which follow-up does it.
- [ ] `gh pr checks` green; a human merges.

## Code Review

- Template: [.github/pull_request_template.md](https://github.com/sradha-tcs/tcs-corp/blob/main/.github/pull_request_template.md) asks for the GitHub issue (`Fix #<id>`) and Before / After test URLs. It still contains the boilerplate `{repo}` / `{owner}` placeholders: write `tcs-corp` / `sradha-tcs` in the URLs.
- The PR description must link `https://{branch}--tcs-corp--sradha-tcs.aem.page/{path}` showing the change (AGENTS.md "Publishing Process"); the PageSpeed check reads the URLs from it.
- Reviewer checks: Build, Code Sync and PageSpeed green; `npm test` passed (not in CI); aggregated `component-*.json` included when partials changed; generated files current; scoped CSS in rem; placeholders for UI text; no clicks pushed by blocks; legacy content still renders; docs updated.
- Required reviewers and branch protection: Not recorded.

## Definition of Done

A change is done when all of these hold:

1. `npm run lint` passes (ESLint with xwalk model rules, Stylelint).
2. `npm test` passes; new pure logic has unit tests.
3. Generators run and their output committed where relevant: `npm run build:json` (models), `npm run build:modules` (imports), `npm run build:docs` (models, new blocks), `npm run build:paths` (`LOCALES`).
4. Verified on the local preview and the feature preview at mobile, tablet and desktop widths; no console errors, no overflow; authored content from before still renders.
5. Keyboard, focus, names and contrast checked on changed blocks; reduced motion honoured.
6. Data layer: one `cmp:click` per click, no duplicate component ids, no personal data.
7. PageSpeed Insights on the feature preview (target 100); no new render-blocking resources.
8. Documentation updated in the same change (table above).
9. PR with the preview URL; checks green; reviewed and merged with a merge commit.
10. Items that need an author, a measurement plan or another environment are reported as **Blocked**, not as passed.

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
