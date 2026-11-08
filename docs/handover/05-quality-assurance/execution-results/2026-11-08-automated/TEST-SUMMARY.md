---
id: "QA-EX-001"
title: "Test Summary — 2026-11-08-automated"
role: "Quality assurance"
topic: "execution"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "High"
primary: true
---

# Test Summary — 2026-11-08-automated

| Attribute | Value |
| --- | --- |
| Document ID | QA-EX-001 |
| Audience | QA lead, testers, release lead |
| Purpose | Results of the automated test cycle of the documentation program |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Scope of this cycle](#scope-of-this-cycle)
- [Results](#results)
- [Commands](#commands)
- [Publishing](#publishing)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Scope of this cycle

Automated checks only, run by the documentation program on 8 November 2026: the 200 published reference pages of /design-block-master/en (block library 179, curated design pages 20) at 375, 768, 1024 and 1440 px in Chromium; unit tests; lint; publishing of the three roots. Manual, cross-browser, screen reader, performance and authoring tests were not run.

## Results

| Measure | Value |
| --- | --- |
| Block test cases | 470 |
| Passed | 23 |
| Failed | 29 |
| Blocked | 12 |
| Requires Manual Validation | 32 |
| Not Run | 374 |
| Curated page cases passed / failed | 1 / 19 |
| Reference pages with horizontal overflow | 5 |
| Defects recorded | 17 |

## Commands

| Command | Result |
| --- | --- |
| `npm run lint` | Passed (exit 0) |
| `npm test` | 387 of 389 passed, 2 failed: the 2 Form Variations motion tests (known before this program) |
| `npm run build:json` | Passed; no change to the committed files |
| `npm run build:docs` | Passed; no change to the committed files |
| `node docs/handover/knowledge-base/validate-knowledge-base.mjs` | Passed (34 pages, nothing missing or failing) |
| `node capture.mjs (documentation program)` | Completed: 200 pages, 800 screenshots |
| `node analyze-links.mjs (documentation program)` | Completed for the three roots |
| `perf.mjs (documentation program)` | Before PR #203: index done after 18.4 s (24 requests, 1.37 MB); after: 2.9 s (9 parallel requests, 0.87 MB) on /language-masters/en, 1.1 s (1 request) on /design-block-master/en |

## Publishing

| Root | Paths | Published | Indexed | Not published |
| --- | --- | --- | --- | --- |
| /design-block-master/en | 345 | 344 | 335 | /design-block-master/en/error-pages/404 (the root has no error pages) |
| /language-master/en | 3567 | 3566 | 3557 | — |
| /language-masters/en | 8442 | 8317 | 8317 | 125 pages: see consolidated/reports/NOT-PUBLISHED-LANGUAGE-MASTERS-2026-11-08.csv on the delivery branch |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
