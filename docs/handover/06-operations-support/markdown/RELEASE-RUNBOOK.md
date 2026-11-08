---
id: "OPS-005"
title: "Release Runbook"
role: "Operations and support"
topic: ""
audience: "AMS / support teams, site administrators"
owner: "AMS / Support Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Release Runbook

| Attribute | Value |
| --- | --- |
| Document ID | OPS-005 |
| Audience | AMS / support teams, site administrators |
| Purpose | Releasing code and content |
| Scope | — |
| Prerequisites | — |
| Owner | AMS / Support Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Pull requests](#pull-requests)
- [Environment promotion](#environment-promotion)
- [Content packages](#content-packages)
- [Installation validation](#installation-validation)
- [Publishing](#publishing)
- [Reindexing](#reindexing)
- [Smoke and regression testing](#smoke-and-regression-testing)
- [Release evidence](#release-evidence)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Pull requests

The publishing process of [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#publishing-process):

1. Push the feature branch; Code Sync makes it available on the feature preview.
2. Run PageSpeed Insights on the feature preview URL and fix issues; target a score of 100.
3. Open a pull request to `main`. The description **must** link `https://{branch}--tcs-corp--sradha-tcs.aem.page/{path}` showing the change, or the PR is rejected. Without a page, create test content in `drafts/` and ask an author to create a CMS page to link.
4. Check the status of code sync, linting and performance tests (`gh pr checks`).
5. A human reviewer reviews the code, opens the URL and merges; Code Sync updates `main`.

[.github/pull_request_template.md](https://github.com/sradha-tcs/tcs-corp/blob/main/.github/pull_request_template.md) asks for the GitHub issue (`Fix #<gh-issue-id>`) and Before / After test URLs. It still contains the boilerplate placeholders `{repo}` and `{owner}`: replace them with `tcs-corp` and `sradha-tcs` (the `cleanup-on-create` workflow that would replace them only runs on repository creation or manual dispatch).

Approval rules: the number of required reviews, required checks and branch protection on `main` are not recorded (handover 12.3; open item O-05).

## Environment promotion

| Step | From → to | How | Owner |
| --- | --- | --- | --- |
| 1 | Local → feature preview | Push the branch; Code Sync | Developer |
| 2 | Feature preview → `main` (preview and live code) | Reviewed PR merged; Code Sync updates `main--tcs-corp--sradha-tcs.aem.page` and `.aem.live` | Reviewer |
| 3 | Universal Editor | Authors reload the editor to get new definitions, models and filters | Content team |
| 4 | Configuration | Apply `public.json` paths, `metadata.source`, sitemap or CDN settings through the configuration Admin API, saving the current JSON first | Site Administrator |
| 5 | Content: author → preview → live | Publish sheets, then fragments, then pages | Content team |

There is no separate staging environment in the repository: feature previews and the `main` preview tier play that role. The author environment reads the code of `main` ([fstab.yaml](https://github.com/sradha-tcs/tcs-corp/blob/main/fstab.yaml) mount point). The production domain and CDN are not configured (open item O-03).

## Content packages

The block library, the curated design pages and sample pages are delivered to AEM as content packages built **outside the repository**:

- The build and migration tooling lives in the delivery workspace (`.home-work/bl/`, for example `bl-migrate.mjs`, which maps old fields to new ones when the pages and the package are built); it is not tracked in Git ([BLOCK-ECOSYSTEM-AUDIT.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/BLOCK-ECOSYSTEM-AUDIT.md), section 11).
- The packages are distributed on the branch `home-content-package` of the repository (files only, no site code; its README describes each package). For example `block-library/tcs-corp-block-library-content-1.0.13.zip` (current), the curated design pages, Home and Columns Container packages and the matching sheet rows (placeholders, metadata, taxonomy, data CSVs).
- Install with AEM **Package Manager** (Upload Package, Install). Installing replaces each page of the package: changes made in AEM to those pages since the last install are overwritten; pages outside the package are kept.
- Tags `home-content-package_<date>` mark earlier states of that branch ("Downloads branch before the handover PDF …"); they are not code releases.

What the handover records (revision history):

| Package | Change | Publication recorded |
| --- | --- | --- |
| 1.0.3, 1.0.4 | Block library Animation folder | Published with the language master review (2.20) |
| 1.0.7 | Library migrated after the block audit | Not recorded (2.27) |
| 1.0.8 | Columns → Columns Containers / Column Breaks, buttons → Button blocks | Not recorded (2.28) |
| 1.0.9 | Re-audit fixes; language-master Placeholders (109) and Metadata (311 rows) imported | 312 / 312 previewed and published; defect R-L-1 found on live (2.30) |
| 1.0.10 | Container sections' `container*` fields | 312 / 312 previewed, published and reindexed (2.31) |
| 1.0.12 | Section Style colours (with the 1.0.11 Teaser and Columns Container options) | 313 / 313 published and reindexed (2.35) |
| 1.0.13 | List Item display options, dark-background theme | 315 / 315 previewed, published and reindexed (2.35) |

## Installation validation

After a code release or a package install, validate on the preview tier first, then on live:

- [ ] Code Sync check green on the merge commit; a changed file on `main--tcs-corp--sradha-tcs.aem.page/blocks/…` matches the commit (Part 17, R-06).
- [ ] The Universal Editor shows the new fields and components after a reload (R-08).
- [ ] After a package install: every package page previewed, published and, where listed, reindexed, with the count recorded (as in 312 / 312 for 1.0.10).
- [ ] Changed pages and one page per changed block render without `failed to load module for …` or `failed to load template …` (V-02).
- [ ] Header, footer and 404 page correct per locale; sheets reachable (V-03, V-08).
- [ ] Non-image DAM assets used by the pages published (Lottie, video, captions).
- [ ] `aem.page` compared with the local preview block by block ([docs/audit/tools/compare.mjs](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/tools/compare.mjs)): this comparison found R-L-1 and R-L-2 after 1.0.9.

## Publishing

Content publishing (Universal Editor, Sites console, sheets, references, assets, scheduling) is described in [authoring.md](../../03-authoring/markdown/AUTHORING-GUIDE.md#publishing); Admin API operations in [administration-and-operations.md](../../07-administration-governance/markdown/ADMINISTRATION-AND-GOVERNANCE-GUIDE.md#publishing-and-the-admin-api). In a release, publish in this order: sheets (placeholders, taxonomy, data, metadata) → fragments (nav, footer, other references) → pages (handover 12.4.2, Part 17 R-09). Content that depends on new code is prepared in AEM but published only after Code Sync of the merge.

## Reindexing

- Publishing updates the page's row in `/query-index.json` automatically.
- After a change to [helix-query.yaml](https://github.com/sradha-tcs/tcs-corp/blob/main/helix-query.yaml), rows are rewritten only when pages are republished or re-indexed: `POST https://admin.hlx.page/index/sradha-tcs/tcs-corp/main/{path}` for the affected paths (bulk paths agreed with the site owner), then check the columns (Part 17, R-10, W-01).
- The packages 1.0.10, 1.0.12 and 1.0.13 were reindexed page by page (Admin API `preview`, `live`, `index` per page); after 1.0.10 the query index listed 307 language-master pages (handover revision 2.31).
- The sitemap ([helix-sitemap.yaml](https://github.com/sradha-tcs/tcs-corp/blob/main/helix-sitemap.yaml)) is built from the index.

## Smoke and regression testing

| Test | Command / tool | Scope | Result at 2d06316 |
| --- | --- | --- | --- |
| Unit tests | `npm test` | `test/` (cards, conversation-canvas, docs, items, list, media, models, modules, motion, privacy, separator, site) | Passed (311 / 311) |
| Lint | `npm run lint` | JS, JSON, models (xwalk rules), CSS | Passed |
| Generated files | `npm run build:json` then check that nothing changed (Part 17, R-03) | Aggregated component files | Passed (compared with a fresh merge) |
| Runtime harness | [docs/audit/tools/harness.mjs](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/tools/harness.mjs) | Every block library and curated page of the local preview at 1440, 1024, 768, 600 and 390 px: console and page errors, failed requests, block status, overflow, duplicate ids, broken images, data layer, axe (WCAG A / AA) at 1440 and 390, a click test | Not run for this page |
| Published vs local | [docs/audit/tools/compare.mjs](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/tools/compare.mjs) | Block-by-block signature of `aem.page` against the local preview | Not run for this page |
| Inventory | [docs/audit/tools/inventory.mjs](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/tools/inventory.mjs) | Definitions, models, filters, fields, options and their usage in the content package | Not run for this page |
| Defect register | [docs/audit/tools/register.mjs](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/tools/register.mjs) | The audit's defects and outcomes | Not applicable |
| Manual | Part 17 V-01 … V-09 | Content, code, configuration, data layer, SEO, accessibility, locale launch, cache | Not recorded |

The audit tools hard-code paths of the delivery workspace (a Playwright install, an axe copy under `(a local workspace path)`, `drafts/en/block-library`, the unpacked content package under `.home-work/`), which are not in Git: re-running them from a clean clone is Blocked until those inputs are provided. Their recorded runs: 940 page loads before and after the first audit, and the re-audit runs ([BLOCK-ECOSYSTEM-AUDIT.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/BLOCK-ECOSYSTEM-AUDIT.md), [REAUDIT-2026-10-20.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/REAUDIT-2026-10-20.md), [data/runtime-before-after.csv](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/data/runtime-before-after.csv)). The block libraries in each locale (`block-library/`) are the manual regression pages for every variation.

## Release evidence

| Evidence | Where | State |
| --- | --- | --- |
| Change history | Merge commits of the pull requests on `main`; the handover revision history (versions 0.1 to 2.37) | Available |
| Validation reports | [docs/audit/](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/README.md) (audit, re-audit, dialog options; CSV registers and runtime before / after) | Available |
| Publication records | Handover revisions 2.31 and 2.35 (counts of pages previewed, published, reindexed) | Available |
| Release tags | None on `main`; `package.json` keeps the boilerplate version `1.3.0`; no `CHANGELOG.md` | Not recorded |
| Change records | Change management process | Not recorded |
| Release checklists | Handover 12.4 and Part 17, 17.5 (R-01 … R-15) define what to attach | Defined, no completed record in the repository |

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
