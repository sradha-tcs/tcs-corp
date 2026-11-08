---
id: "REL-001"
title: "Branching Strategy"
role: "Release and DevOps"
topic: ""
audience: "Release lead, DevOps, technical lead"
owner: "Release Lead / DevOps Lead"
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

# Branching Strategy

| Attribute | Value |
| --- | --- |
| Document ID | REL-001 |
| Audience | Release lead, DevOps, technical lead |
| Purpose | Branches and their use |
| Scope | — |
| Prerequisites | — |
| Owner | Release Lead / DevOps Lead (proposed) |
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

| Branch | Use |
| --- | --- |
| main | The site; every code PR targets it (since 8 November 2026) |
| feature/*, fix/*, docs/* | Short-lived; deleted after merge |
| migrated-page-content-edam | Delivery branch: migration packages, sheets, scripts and this documentation; not served (.hlxignore *) |
| main-backup-27-10-2026, release/main-code, qa | Kept on request (not merged through a PR) |

The former delivery branch `migrated-page-content` was deleted on 8 November 2026 (tag `archive/migrated-page-content-2026-11-08`); `edam-main` was merged into main (PR #198) and deleted.

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
