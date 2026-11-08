---
id: "REL-002"
title: "Code Sync Guide"
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

# Code Sync Guide

| Attribute | Value |
| --- | --- |
| Document ID | REL-002 |
| Audience | Release lead, DevOps, technical lead |
| Purpose | AEM Code Sync and branch previews |
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

- Every push to a branch is synced by AEM Code Sync to `<branch>--tcs-corp--sradha-tcs.aem.page` / `.aem.live`.
- Branches with large non-code files carry a `.hlxignore` of `*` so Code Sync skips them (the delivery branch).
- A sync can be triggered with the Admin API (`POST /code/<org>/<site>/<ref>/*`).

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
