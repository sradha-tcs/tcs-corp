---
id: "OPS-001"
title: "Monitoring Guide"
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

# Monitoring Guide

| Attribute | Value |
| --- | --- |
| Document ID | OPS-001 |
| Audience | AMS / support teams, site administrators |
| Purpose | What is monitored and how |
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

- [Monitoring](#monitoring)
- [Environment checks](#environment-checks)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Monitoring

| Area | State | Source |
| --- | --- | --- |
| Real Use Monitoring (RUM) | Implemented: `sampleRUM` in [scripts/aem.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/aem.js) (sampling weight 100 by default, collector `ot.aem.live`); [404.html](https://github.com/sradha-tcs/tcs-corp/blob/main/404.html) sends a `404` checkpoint with the referrer; errors are sent as `error` checkpoints | Code |
| RUM dashboard and domain key | Not recorded | Handover 14.2 |
| PageSpeed Insights | Manual; the `aem-psi-check` on pull requests ([AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#publishing-process)) | [deployment-and-release.md](../../01-architecture/markdown/DEPLOYMENT-ARCHITECTURE.md#automated-checks) |
| Uptime monitoring | Not implemented; tool not recorded | Handover 14.2 |
| Analytics | Data layer populated centrally ([decorators/data-layer-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/data-layer-decorator.js)); Adobe Tags and the Web SDK not configured (blocked: measurement plan); no consent mechanism | Code |
| AEM author health, publication queues, logs | Cloud Manager and the AEM author (Workflow instances); access not recorded | Handover 14.2, 14.3.2 |
| Dependency updates | Renovate ([.renovaterc.json](https://github.com/sradha-tcs/tcs-corp/blob/main/.renovaterc.json)) | Repository |

The handover (14.2) proposes thresholds of LCP ≤ 2.5 s, CLS ≤ 0.1 and INP ≤ 200 ms at p75; no alerting on them is configured. Console messages emitted by the code and their meaning: handover Part 14, 14.3.1.

## Environment checks

| Check | How | Expected |
| --- | --- | --- |
| Locale Home pages | `/en/`, `/de-de/`, ... on the live host (handover Part 17, script 17.2-A) | HTTP 200, header and footer, no `failed to load …` console errors |
| Fragments and 404 pages | `/{locale}/references/nav.plain.html`, `/references/footer.plain.html`, `/error-pages/404.plain.html` (script 17.2-B) | HTTP 200 |
| Build and Code Sync on `main` | Commit checks of the head of `main` (script 17.2-C) | Green |
| Query index rows per locale | `/query-index.json` in pages of 500 rows (script 17.2-D) | Count consistent with publications |
| Sheets per locale | 9 sheets × 13 locales (script 17.3-B) | HTTP 200 and valid JSON |
| Sitemap | `/sitemap.xml` hosts and count (script 17.3-A) | Expected host; new pages present |
| 404 per locale | `/{locale}/health-check-404` (script 17.4-A) | HTTP 404 with the locale's authored 404 page |
| Placeholder completeness | Keys of `/en/placeholders.json` vs each locale (script 17.4-B) | Same key set |
| Data layer | `window.adobeDataLayer` on sample pages | A page entry, component entries, `cmp:click` on clicks |
| Configuration | `GET /config/sradha-tcs/sites/tcs-corp/metadata.json`; `public.json` paths vs [paths.json](https://github.com/sradha-tcs/tcs-corp/blob/main/paths.json) | 13 sources; identical paths |

The scripts and the full daily, weekly and monthly activity tables (D-01 … D-09, W-01 … W-10, M-01 … M-14) are in handover Part 17 — Operations Guide; where Part 17 and 14.7 differ, Part 17 is the checklist of record. Health check results were not recorded in the repository.

Alerting and SLOs beyond Edge Delivery RUM: To be confirmed.

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
