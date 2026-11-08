---
id: "AUD-005"
title: "Performance Audit"
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

# Performance Audit

| Attribute | Value |
| --- | --- |
| Document ID | AUD-005 |
| Audience | Technical lead, QA lead, documentation owner, product owner |
| Purpose | Performance evidence |
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

- [Query index (measured 8 November 2026, Chromium, live site)](#query-index-measured-8-november-2026-chromium-live-site)
- [PageSpeed](#pagespeed)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Query index (measured 8 November 2026, Chromium, live site)

| Page | Before (shared index) | After (per-root index, PR #203) |
| --- | --- | --- |
| Migrated press release (/language-masters/en) | 24 sequential requests, 1.37 MB, done after 18.4 s | 9 requests (parallel), 0.87 MB, done after 2.9 s |
| Curated home (/design-block-master/en) | the same 24 requests | 1 request, 14 KB, done after 1.1 s |

The shared /query-index.json still holds the review roots' 11,821 rows (no locale content is published, so no locale page reads it today); it drops them when the pages are removed from it.

## PageSpeed

Not Run in this program (AB-04). Target: PageSpeed 100 (AGENTS.md). Page heights captured at 1440 px range from 900 to 18143 px.

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
