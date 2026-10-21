# Missing Documentation Report

What the knowledge base couldn't document from verified sources, and the inputs needed to complete it.

| Attribute | Value |
| --- | --- |
| Audience | Project leads, documentation owners, reviewers, AI agents |
| Source of truth | The validation (`validate-knowledge-base.mjs`) and the review notes in [notes/](./notes/) |
| Last reviewed | Generated from main at commit 2d06316 |
| Status | Current (regenerate with `node docs/handover/knowledge-base/validate-knowledge-base.mjs --report`) |

## Required knowledge base pages

All 27 required pages exist (the 24 topic pages, the agent instruction pages and README.md).

## Outside the knowledge base

- `.github/copilot-instructions.md` doesn't exist: GitHub Copilot reads only that path. Its content is ready in [copilot-instructions.md](../copilot-instructions.md); placing it there is a project decision (this knowledge base was created entirely under `docs/handover/knowledge-base/`).
- Not in the repository (blocked for every page that depends on them): the measurement plan (Analytics / CJA), the consent model, Adobe Target / AJO requirements, the Figma files (only frame names are cited), a release and support guide beyond the handover, owners and permissions of the AEM author environment, the applied site configuration.

## Gaps and blocked topics by page

| Page | Gap or blocked topic |
| --- | --- |
| project-overview | Business KPIs and targets (BO-9, SC-9; O-02): Not recorded — needs the business owner |
| project-overview | Stakeholder names and ownership (1.4, 1.11; O-01): Not recorded |
| project-overview | Production domain and CDN (O-03): Not recorded |
| project-overview | Launch scope and content status per locale (PG-3, SC-1): Not recorded |
| project-overview | Rationale for choosing Edge Delivery Services / xwalk / Universal Editor: not stated anywhere in the handover or repository (only benefits in 1.5) |
| project-overview | Visitor personas / audiences: only proposed (`tcs-corp:audience` in 7.3.2); `persona` metadata column indexed without defined values |
| project-overview | Rollout date of the language master to /en (removal of REVIEW_*): Not recorded |
| project-overview | Handover approval: "Draft for review", all approvals pending |
| repository-structure | Ownership per folder: no CODEOWNERS; handover 1.11 has roles only, names "To be confirmed" (O-01) |
| repository-structure | Whether `cleanup-on-create.yaml` ever ran (its substitutions in README / PR template weren't applied): not verifiable from the repository |
| repository-structure | Whether `drafts/` files are reachable on the code bus (not in .hlxignore): not verified on aem.page |
| repository-structure | The applied site configuration (public.json paths, metadata.source) isn't in the repository (O-04) |
| architecture | How `scripts/editor-support.js` is loaded in Universal Editor (not referenced by head.html or scripts.js): handover 2.3.6 says editor context only; mechanism is outside the repository — needs confirmation from AEM / UE configuration. |
| architecture | Production domain and CDN, `cdn.prod.host`, 403 / 500 handling, root redirect: not configured (handover O-03, F-36) — needs Site Administrator input. |
| architecture | Admin roles, preview / live access protection, other AEM environments: Not recorded. |
| architecture | Adobe Tags / Web SDK: blocked (measurement plan); Target / AJO / CJA: no integration; consent: none. |
| architecture | Edge Delivery platform behaviour (CDN purge on publish, head.html injection, CSP header move) is taken from the handover / AGENTS.md, not verifiable in the repository. |
| content-architecture | Published state of the 12 non-English taxonomy pages, metadata sheets and data sheets (handover F-09, F-11: only /en checked on 13 October 2026) — needs a fresh check on aem.live. |
| content-architecture | `metadata.source` configuration for the 13 sheets (open item O-04) — Site Administrator. |
| content-architecture | Redirect mechanism (CDN rules) and `/` → `/en/` (F-36, O-03) — Site Administrator / CDN owner. |
| content-architecture | Translation process, MSM / language copies, language selector, hreflang strategy — Not recorded (handover 4.9.6 marks them to be confirmed). |
| content-architecture | Content ownership, review cadence and approval flows — Not recorded. |
| content-architecture | Page Type and content-type value alignment between Page Type, Filter List and Page Header (F-12) — product decision needed. |
| authoring | AEM user groups, per-locale permissions, publish approval workflow: Not recorded (handover O-06). Needed: AEM administrator. |
| authoring | Universal Editor publish destinations (Preview and / or Live) enabled for the program: Not recorded. |
| authoring | Production domain and CDN: Not recorded (O-03). |
| authoring | Whether `metadata.source` lists the 13 bulk sheets: Not recorded (O-04). |
| authoring | DAM folder conventions, image licensing rules, maximum video size, approved embed domains: Not recorded (O-16). |
| authoring | Translation process (AEM translation projects, MSM): Not recorded (O-12). |
| authoring | Whether authors may use Sidekick preview / publish buttons: Not recorded. |
| authoring | Universal Editor dialog behaviour on the real author: Blocked (author access; audit section 9). |
| blocks | Production usage of every block, of the compatibility-only Columns / Button (basic) and of the legacy composite multifields: not recorded in the repository (blocked: AEM author access or a content export; audit deferral D-B-14). |
| blocks | Whether the language master block library pages are in the query index: `helix-query.yaml` excludes `/*/block-library` and `/*/block-library/**`, which may not match `/language-master/en/block-library/...` (requires validation on the published index). |
| blocks | Header usage isn't counted in the library snapshot (authored through the nav page). |
| blocks | The snapshot counts 157 library pages that contain blocks; the audit reported 177 library pages for package 1.0.8 (pages without blocks aren't in the snapshot usage); the exact page count of package 1.0.13 is not recorded in git. |
| blocks | No owner or approval flow for creating / deprecating blocks is recorded (handover O-01 open). |
| universal-editor | Persistence in Universal Editor (what is stored, whether hidden conditional fields keep and deliver values, date storage D-A-26): blocked, AEM author access needed. |
| universal-editor | How `scripts/editor-support.js` is loaded in Universal Editor is not visible in the repository. |
| universal-editor | Whether Universal Editor offers Card in the + of a new key-value Cards block (handover O-20): open. |
| universal-editor | Dialog label / help text localisation: no mechanism in the repository (labels are English). |
| decorators-and-utilities | The loading mechanism of `scripts/editor-support.js` in Universal Editor isn't in the repository (requires validation on AEM author). |
| decorators-and-utilities | Decorators have no unit tests; their behaviour was validated only by the audit browser runs (not re-run for this file). |
| decorators-and-utilities | Consent-aware behaviour: blocked (no consent model, CMP or Tags property). |
| decorators-and-utilities | Editor-only listener leaks (audit deferral D-C-19) not quantified. |
| design-system | Per-variation Figma pixel comparison: Blocked (needs the Figma file per component; audit section 9). |
| design-system | Design sign-off of the contrast token change (secondary text, brand text / fill): Requires validation (audit 13). |
| design-system | Token governance (owner, approval, versioning of token changes): Not recorded. |
| design-system | Figma file keys / node ids deliberately not reproduced (instructions); code comments still contain node ids. |
| design-system | CJK typography strategy (F-38): open, owner Design. |
| accessibility | Screen-reader testing (NVDA / VoiceOver): Blocked: no screen reader in the environment (audit section 5, 9; re-audit 7). |
| accessibility | Universal Editor dialog accessibility: Blocked: AEM author access. |
| accessibility | Reflow at 320 CSS px, zoom 200 % / 400 %, text spacing (1.4.12): Not recorded (harness narrowest width 390px). |
| accessibility | Target size measurement (2.5.8): Not recorded systematically; values from CSS / READMEs only. |
| accessibility | Focus Not Obscured with Sticky Anchor List: Requires validation ("[To be confirmed]" in the handover). |
| accessibility | Video pause outline contrast on dark posters (F-56): "[To be confirmed: contrast measurement]". |
| accessibility | Harness depends on delivery-workspace paths (npx cache path for Playwright, /tmp/audit axe-core): needs adapting before re-use. |
| accessibility | Consistent Help (3.2.6): no help mechanism defined: Not recorded. |
| data-layer-and-analytics | Adobe Tags property, Web SDK datastreams, XDM schema, Analytics report suites, CJA data views, measurement plan: Blocked (measurement plan; handover O-07). No ids recorded. |
| data-layer-and-analytics | Form submission outcome event: Blocked (R-D-3, needs the measurement plan). |
| data-layer-and-analytics | mailto: / tel: link URLs still pushed in full (F-05 open in code). |
| data-layer-and-analytics | Search page URL raw ?q= (R-D-12): Blocked until Tags exists. |
| data-layer-and-analytics | No unit tests for the data layer decorator. |
| data-layer-and-analytics | 404 page data layer entry fields (dc:title "Page not found" from 404.html og:title, repo:path the requested path) derived from code reading; not run in a browser in this pass. |
| personalization | Personalization design, audiences, activities, decision scopes, identity strategy, consent model: Blocked (audit section 9: "activities, audiences, the personalization design"; handover owner: product owner, to be confirmed). |
| personalization | QA modes for personalization (forced variants, preview): not recorded. |
| personalization | Personalization roadmap: To be confirmed (handover 11.7.7). |
| indexing-and-search | Live index state for the 13 locale trees after the F-10 column update: Not recorded (only language master reindexing recorded in revisions 2.31 / 2.35) — needs an Admin API status check or a `/query-index.json` inspection on aem.live. |
| indexing-and-search | Sitemap exclusion of `robots: noindex` pages is stated by the handover (platform behaviour), not verifiable in the repository. |
| indexing-and-search | No search service, search index or search results page exists; the `conversation-canvas:search` event and the Search page URL are the only hand-offs — blocked: search integration decision. |
| indexing-and-search | No per-locale sitemaps or hreflang: Not recorded as a decision. |
| performance | RUM field results: none recorded; RUM domain key and dashboard access "[To be confirmed]" (handover 2.10.14). |
| performance | Performance budgets: none defined (repository, CI, handover). |
| performance | DOM size: no measurement recorded. |
| performance | INP: only an escalation threshold (handover 13.16); no measurement recorded. |
| performance | No Lighthouse / throttling script in the repository; 2.36 measurements are documented in the handover only. |
| performance | Audit harness tied to delivery-workspace paths. |
| security-privacy-consent | Consent model, CMP, consent categories per locale: Blocked (privacy / legal; handover 11.7.6, O-07). |
| security-privacy-consent | Approved embed domains and consent for third-party players: Blocked (O-16). |
| security-privacy-consent | Form back end and privacy notices: Blocked (O-08); the Submit action URL is not validated by code. |
| security-privacy-consent | Preview / live access restriction, Admin API roles: not recorded (handover 2.7.3 To be confirmed). |
| security-privacy-consent | How AEM delivers `javascript:` links authored in fields other than List / Cards links: Requires validation (no code check). |
| security-privacy-consent | .hlxignore doesn't exclude drafts/, content/, migration-work/, tools/, en/ or query-index.json in the repository root, so the code bus serves them: whether that is intended Requires validation (not stated in the KB file beyond "other repository folders are served"). |
| security-privacy-consent | No legal classification or retention rules recorded (by instruction). |
| development-standards | Branch protection, required reviewers, approval rules on `main`: Not recorded (handover lists as to be confirmed; needs repository administrator). |
| development-standards | PageSpeed (aem-psi-check) and AEM Code Sync configuration aren't in the repository (GitHub apps); behaviour taken from AGENTS.md / handover. |
| development-standards | Production content usage of legacy fields: blocked (AEM author access). |
| development-standards | Content package build / migration scripts (`.home-work/bl/bl-migrate.mjs`, build-package.mjs) are not in the repository. |
| development-standards | `./decorators-and-utilities.md` didn't exist yet when written (linked as requested; expected from a parallel writer). |
| testing-and-quality | Universal Editor dialog persistence / live updates: Blocked (AEM author access; to be checked by an author). |
| testing-and-quality | Analytics / Web SDK delivery: Blocked (Adobe Tags property, datastream, measurement plan). |
| testing-and-quality | Screen reader runs: Blocked (no screen reader in the environment). |
| testing-and-quality | Non-Chromium browsers and devices: not executed; no support matrix (handover 1.7.5 to be confirmed). |
| testing-and-quality | Consent and personalization tests: Not applicable (not implemented); blocked on consent model / personalization design. |
| testing-and-quality | Content package build and install procedure: not in the repository. |
| testing-and-quality | No automated DOM tests for block decoration or the data layer decorator. |
| deployment-and-release | Branch protection on `main`, required reviews and checks: Not recorded (O-05). |
| deployment-and-release | AEM Code Sync and `aem-psi-check` check results: not verifiable without GitHub access (Blocked: `gh` / repository access). |
| deployment-and-release | Change management process, emergency change approval, hotfix path: Not recorded. |
| deployment-and-release | Rollback: never exercised in the recorded history (the one revert commit, 03d2e87, is a change inside a branch, not a production rollback); procedures Require validation. |
| deployment-and-release | The audit tools depend on delivery-workspace paths (Playwright install, `/tmp/audit` axe, untracked `drafts/en/block-library`, `.home-work/bl/package`); Blocked from a clean clone. |
| deployment-and-release | Package build tooling (`.home-work/bl/`) is outside Git; how to rebuild a package is not documented in the repository. |
| deployment-and-release | Production domain, CDN, push invalidation: Not recorded (O-03). |
| administration-and-operations | Team names, named owners, support hours, ticketing tool, severity SLAs, escalation times for P2, security contact: Not recorded (O-01, O-13). Escalation section marked Requires validation. |
| administration-and-operations | Permission model (AEM groups, locale permissions, publish approval), Admin API roles, GitHub branch protection, RUM dashboard / domain key access: Not recorded (O-05, O-06). |
| administration-and-operations | Current state of the site configuration (`public.json` paths, `metadata.source`, CDN, robots, access): not readable from the repository; Blocked: authenticated Admin API access. |
| administration-and-operations | Uptime tool: not implemented, tool not recorded. |
| administration-and-operations | Results of daily / weekly / monthly health checks: none recorded in the repository. |
| administration-and-operations | Production content migration status (Columns → Columns Container, buttons, Video poster, Hero motion, form `fieldName`): not recorded; only the block library packages are migrated. |
| troubleshooting | Data Collection / Web SDK, Target / AJO, consent / identity: not implemented; rows describe the expected state and the blocked dependency. |
| troubleshooting | Content package build / install procedure: not in the repository (delivery workspace); runbook row marked Blocked. |
| troubleshooting | Admin API calls (status, index, code, cache) need authentication; credentials and roles not documented here (administration KB / handover 12.1.9). |
| troubleshooting | Production CDN, redirect mechanism, production domain: to be confirmed (handover 13.12, 13.25, 13.28). |
| troubleshooting | `./decorators-and-utilities.md` didn't exist yet when written (linked as requested). |
| agent-guidelines | docs/handover/knowledge-base/README.md doesn't exist yet when these files were written (planned in the KB README step); all three files link ./README.md. |
| agent-guidelines | The AEM Code Sync and aem-psi-check GitHub apps aren't in the repository; their configuration can't be verified (handover 13.15 describes them). |
| agent-guidelines | Branch protection rules on main: Not recorded (O-05). |
| agent-guidelines | Analytics: blocked: measurement plan, Tags property, Web SDK datastream, consent platform (O-07). |
| agent-guidelines | Personalization: no implementation; architecture decision required. |
| decision-log | Dates for decisions recorded only in AGENTS.md without a revision row: KB-D-005 dated by the commit that added the sentence (PR #27); KB-D-009 (Content Fragment lists) and KB-D-045 (publish flow): Not recorded. |
| decision-log | Alternatives are "Not recorded" wherever the sources don't name one. |
| decision-log | Design sign-off of the contrast tokens (O-14), Universal Editor dialog checks (no author access), Analytics (measurement plan): blocked. |
| glossary | The meaning of the audit prefixes isn't stated explicitly: D-A … D-D are mapped to the four review groups from the review file names (group-a-card-lists, group-b-heroes-teasers, group-c-containers, group-d-forms-media-chrome) and the components in the register; L-n as "found on the live site" from the entries ("Live tables…", "(live)") and handover 2.27; R-L-n from the re-audit ("Found on aem.live") |
| glossary | XDM: no schema configured; the data layer uses `xdm:` keys of the Core Components schema (handover / audit section 6) |
| references | Figma files: Blocked — named in the handover and READMEs ("New Screens from New DS", Figma Sites of www.tcs.com, node ids), no file or URL in the repository |
| references | Measurement plan: Blocked — needed for Adobe Tags / Web SDK (O-07) |
| references | Consent / privacy specification: Blocked (no consent platform) |
| references | Accessibility specification or third-party audit: Blocked — only the AGENTS.md rules and the automated axe results of the audits exist |
| references | Release guide beyond handover Part 12 / 17.5: Blocked — not in the repository |
| references | Applied site configuration: not in the repository (O-04) |
| references | Admin API documentation: endpoints are used in the handover, no documentation page is cited |
| agent-instructions | The section isn't referenced from the root AGENTS.md yet (writers may not edit other repository files); the KB README step should add the pointer if the user agrees. |
| agent-instructions | 75 lines (limit 80). |
| copilot-instructions | The content isn't placed in .github/copilot-instructions.md (not allowed for KB writers; needs the user's decision). 53 lines (limit 60). |
