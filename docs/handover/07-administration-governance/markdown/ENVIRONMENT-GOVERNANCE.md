---
id: "GOV-002"
title: "Environment Governance"
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

# Environment Governance

| Attribute | Value |
| --- | --- |
| Document ID | GOV-002 |
| Audience | Site administrators, product owner, program governance |
| Purpose | Environments and their configuration |
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

- [Site configuration](#site-configuration)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

| Environment | Purpose |
| --- | --- |
| Feature previews | Pull request validation |
| main preview / live | The site |
| AEM author | Content and publishing |

## Site configuration

The path mapping (public.json `paths`) maps the 13 locales, the three review roots and the taxonomy pages; the repository's paths.json is generated from `LOCALES` and `REVIEW_ROOTS` (`npm run build:paths`). Bulk metadata applies only when the site configuration lists the sheets (`metadata.source`).

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
