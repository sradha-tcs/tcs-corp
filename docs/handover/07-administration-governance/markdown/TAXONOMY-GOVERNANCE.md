---
id: "GOV-004"
title: "Taxonomy Governance"
role: "Administration and governance"
topic: ""
audience: "Site administrators, product owner, program governance"
owner: "Product Owner / Program Governance"
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

# Taxonomy Governance

| Attribute | Value |
| --- | --- |
| Document ID | GOV-004 |
| Audience | Site administrators, product owner, program governance |
| Purpose | Maintaining tags |
| Scope | — |
| Prerequisites | — |
| Owner | Product Owner / Program Governance (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Taxonomy](#taxonomy)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Taxonomy

- Tags are AEM tags (`tcs-corp:` namespace); each locale publishes its taxonomy page as `/{locale}/taxonomy.json` (mapped explicitly in [paths.json](https://github.com/sradha-tcs/tcs-corp/blob/main/paths.json)); a translated taxonomy is a multi-sheet JSON read by language ([utils/taxonomy.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/taxonomy.js), `sheetRows` in [utils/site.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/site.js)).
- Changing a tag ID changes the IDs stored on pages and in the index: re-tag and republish pages before retiring a tag (handover 14.8.4). Tag governance rules and ownership: handover Part 7, 7.4–7.6 (business taxonomy owners not recorded, open item O-10).

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
