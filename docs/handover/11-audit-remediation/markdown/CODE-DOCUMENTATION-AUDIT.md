---
id: "AUD-001"
title: "Code to Documentation Audit"
role: "Audit and remediation"
topic: ""
audience: "Technical lead, QA lead, documentation owner, product owner"
owner: "Documentation Owner"
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

# Code to Documentation Audit

| Attribute | Value |
| --- | --- |
| Document ID | AUD-001 |
| Audience | Technical lead, QA lead, documentation owner, product owner |
| Purpose | How the documentation was compared with the code and what was found |
| Scope | — |
| Prerequisites | — |
| Owner | Documentation Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Checks run in this program](#checks-run-in-this-program)
- [Carried validation matrix (knowledge base)](#carried-validation-matrix-knowledge-base)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Checks run in this program

| Check | Result |
| --- | --- |
| `npm run lint` | Passed (exit 0) |
| `npm test` | 387 of 389 passed, 2 failed: the 2 Form Variations motion tests (known before this program) |
| `npm run build:json` | Passed; no change to the committed files |
| `npm run build:docs` | Passed; no change to the committed files |
| `node docs/handover/knowledge-base/validate-knowledge-base.mjs` | Passed (34 pages, nothing missing or failing) |
| `node capture.mjs (documentation program)` | Completed: 200 pages, 800 screenshots |
| `node analyze-links.mjs (documentation program)` | Completed for the three roots |
| `perf.mjs (documentation program)` | Before PR #203: index done after 18.4 s (24 requests, 1.37 MB); after: 2.9 s (9 parallel requests, 0.87 MB) on /language-masters/en, 1.1 s (1 request) on /design-block-master/en |

Generated documentation is current when `build:json` and `build:docs` leave the working tree unchanged: yes (no change).

## Carried validation matrix (knowledge base)

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
