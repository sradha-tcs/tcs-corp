# references.md

## Sources inspected

- `git ls-files` for every README / Markdown / PDF (40 READMEs tracked)
- AGENTS.md "Troubleshooting", "Content", "Content Modeling", "Publishing Process"; README.md; CONTRIBUTING.md; CODE_OF_CONDUCT.md (presence); LICENSE header
- `git grep` of all external URLs (aem.live, experienceleague, github.com/adobe*, developers.google.com, admin.hlx.page, ot.aem.live, figma)
- Handover 15.3 Reference Documents; docs/handover/README.md; docs/handover/screenshots/README.md
- docs/audit/README.md and its files; docs/animation/README.md headings; docs/proposals/README.md; docs/blocks/BLOCK-DOCUMENTATION-REPORT.md headings, docs/blocks/reports/
- `git ls-tree origin/home-content-package` (downloads branch contents), git tags

## Discrepancies

- implementation: 30 block READMEs plus blocks/README.md | documented: handover 15.3.2 lists only blocks/list, blocks/cards and blocks/separator READMEs | impact: readers miss the block docs | correct: repository
- implementation: README.md is the boilerplate text ("Your Project's Title...", `{repo}` / `{owner}` placeholders) | documented: n/a | impact: no project entry point at the root | correct: record
- implementation: CONTRIBUTING.md refers to `npm run commit` and Project Helix | documented: package.json has no `commit` script | impact: low
- implementation: Part 16 runs to F-107 | documented: docs/handover/README.md "F-01 … F-66, F-70 … F-98" | impact: low
- implementation: screenshots are those of version 2.0 | documented: docs/handover/screenshots/README.md says version 2.0 (consistent; noted because the handover is 2.37 and F-84 says Part 6 screenshots / tab names are those of 2.0)

## Gaps and blocked topics

- Figma files: Blocked — named in the handover and READMEs ("New Screens from New DS", Figma Sites of www.tcs.com, node ids), no file or URL in the repository
- Measurement plan: Blocked — needed for Adobe Tags / Web SDK (O-07)
- Consent / privacy specification: Blocked (no consent platform)
- Accessibility specification or third-party audit: Blocked — only the AGENTS.md rules and the automated axe results of the audits exist
- Release guide beyond handover Part 12 / 17.5: Blocked — not in the repository
- Applied site configuration: not in the repository (O-04)
- Admin API documentation: endpoints are used in the handover, no documentation page is cited

## Decisions found

- The handover supersedes the guides of 11 October 2026 — docs/handover/README.md "Earlier guides (superseded)"
- Block READMEs follow the code where the handover's component chapters differ — blocks/README.md, handover 2.37 (F-107)
- Proposals change no code; accepted ones are implemented in their own PRs — docs/proposals/README.md

## Recommendations

- Update handover 15.3.2 to list blocks/README.md and all block READMEs, the audit, animation and blocks reports
- Replace the root README.md with a project README pointing to AGENTS.md, blocks/README.md and the knowledge base
- Cite the Admin API and configuration service documentation where the handover uses those endpoints
