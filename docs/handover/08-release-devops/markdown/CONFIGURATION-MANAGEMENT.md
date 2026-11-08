---
id: "REL-008"
title: "Configuration Management"
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

# Configuration Management

| Attribute | Value |
| --- | --- |
| Document ID | REL-008 |
| Audience | Release lead, DevOps, technical lead |
| Purpose | Configuration files and the site configuration |
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

| File / setting | Managed by | Notes |
| --- | --- | --- |
| paths.json | npm run build:paths | 48 mappings, 17 includes, 28 excludes; applied to the site configuration's public.json |
| helix-query.yaml | hand | query index definition |
| helix-sitemap.yaml | hand | sitemap |
| fstab.yaml | onboarding only | Edge Delivery reads it once; the content source is in the site configuration |
| .hlxignore | hand | not served files |
| component-*.json | npm run build:json | Universal Editor configuration |

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
