---
id: "OPS-000"
title: "Operations and Support Guide"
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

# Operations and Support Guide

| Attribute | Value |
| --- | --- |
| Document ID | OPS-000 |
| Audience | AMS / support teams, site administrators |
| Purpose | Running and supporting the site |
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

- [Service in one table](#service-in-one-table)
- [Responsibilities](#responsibilities)
- [Routine operations](#routine-operations)
- [Support handoff](#support-handoff)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Service in one table

| Item | Value |
| --- | --- |
| Live | https://main--tcs-corp--sradha-tcs.aem.live |
| Preview | https://main--tcs-corp--sradha-tcs.aem.page |
| Code | GitHub sradha-tcs/tcs-corp, main |
| Content | AEM Sites author /content/tcs-corp |
| Roots | /content/tcs-corp/language-masters/en, /content/tcs-corp/language-master/en, /content/tcs-corp/design-block-master/en, 13 locales |

## Responsibilities

The three delivery streams are released independently (handover Part 12): content (AEM author, published by authors), code (GitHub `sradha-tcs/tcs-corp`, synced by AEM Code Sync) and configuration (the Edge Delivery site configuration of org `sradha-tcs`, site `tcs-corp`, changed through the Admin API). The Site Administrator owns the configuration stream.

| Responsibility | Owner (handover Part 14, 14.1) | Verified basis |
| --- | --- | --- |
| Site configuration: `public.json` paths, `metadata.source`, robots, CDN, access | Site Administrator / AMS (L2) | [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#site-structure-and-site-data) notes |
| Cache purge, re-index, sitemap regeneration, Admin API status and log review | L2 | Handover 12.1.9; per-page `preview`, `live`, `index` used for packages 1.0.10–1.0.13 (revisions 2.31, 2.35) |
| Sheets (placeholders, metadata, taxonomy, redirects, data) | Content team, with L1 | [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#site-structure-and-site-data) |
| Author onboarding and access requests | L1 with the AEM administrator | Handover 14.8.5 (groups and permission model not recorded) |
| Code, models, filters, index and sitemap definitions | Development team (L3) | Repository |
| Platform incidents (Edge Delivery, Universal Editor, AEM as a Cloud Service) | Adobe Support, raised by L2 / L3 | Handover 14.1.1 |

The support levels L1 (author support), L2 (AMS / site administration) and L3 (development) and their RACI are defined in handover Part 14, 14.1. The team names, the named owners (product owner, technical lead, AMS lead, site administrator, analytics owner) and the severity SLAs are not recorded (open items O-01, O-13).

## Routine operations

| Procedure | Summary | Handover |
| --- | --- | --- |
| Update placeholders | Edit Text in `{locale}/placeholders`, keep variables, publish, check `/{locale}/placeholders.json` | 14.8.3 |
| Change the taxonomy | Tags in AEM Tagging, titles on every locale's taxonomy page, publish, re-tag and republish pages | 14.8.4 |
| Onboard an author | Admin Console profile, locale permissions (model not recorded), Sidekick, training | 14.8.5 |
| Add a locale | See [Localization](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/administration-and-operations.md#localization) | 14.8.1 |
| Add a block | Block folder with JS, CSS and `_<block>.json` (Additional tab), add to the filters, `build:json`, lint, test, library page, PR | 14.8.2 |
| Release activities | R-01 … R-15 | Part 17, 17.5; [deployment-and-release.md](../../01-architecture/markdown/DEPLOYMENT-ARCHITECTURE.md) |
| Governance | Change records, tag, placeholder key, metadata value, locale, third-party script, access, findings, documentation, configuration backup, block libraries (G-01 … G-12) | Part 17, 17.7 |

The operations calendar of Part 17, 17.8 is a proposed default (time zone and calendar not recorded).

## Support handoff

- The AMS handover checklist (access, knowledge transfer sessions, documentation, open items) is handover Part 14, 14.10; no item of it is recorded as completed in the repository.
- Documentation to hand over: [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md), [blocks/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/README.md) and the block READMEs, [decorators/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/README.md), [utils/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/README.md), [templates/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/templates/README.md), the handover ([TCS-CORP-HANDOVER.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/handover/TCS-CORP-HANDOVER.md), PDF built as described in [docs/handover/README.md](https://github.com/sradha-tcs/tcs-corp/blob/migrated-page-content-edam/docs/handover/README.md)), the audits in [docs/audit/](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/README.md).
- Blocked: support hours, ticketing tool and queue, contacts and SLAs (open item O-13), a site configuration export (14.10.3 #7).

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
