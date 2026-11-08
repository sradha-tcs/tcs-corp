---
id: "OPS-007"
title: "Health Checks"
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

# Health Checks

| Attribute | Value |
| --- | --- |
| Document ID | OPS-007 |
| Audience | AMS / support teams, site administrators |
| Purpose | Checks to run after a release or incident |
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

- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

| Check | How | Expected |
| --- | --- | --- |
| Home of each root answers 200 | curl -s -o /dev/null -w '%{http_code}' https://main--tcs-corp--sradha-tcs.aem.live/language-masters/en/ | 200 |
| Sheets | https://main--tcs-corp--sradha-tcs.aem.live/language-masters/en/placeholders.json | 200 with data |
| Query index | https://main--tcs-corp--sradha-tcs.aem.live/query-index.json | rows of the three roots |
| Code | https://main--tcs-corp--sradha-tcs.aem.live/scripts/scripts.js | 200 |
| A block library page | https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/hero | 200, no console error |

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
