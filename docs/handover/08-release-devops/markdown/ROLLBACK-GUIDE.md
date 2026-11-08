---
id: "REL-006"
title: "Rollback Guide"
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

# Rollback Guide

| Attribute | Value |
| --- | --- |
| Document ID | REL-006 |
| Audience | Release lead, DevOps, technical lead |
| Purpose | Rolling back |
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

- [Rollback](#rollback)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Rollback

No rollback has been recorded; the procedures below are the handover's (Part 12, 12.6) and Require validation.

| Stream | Procedure |
| --- | --- |
| Code | Revert the merged PR in GitHub (a revert PR, checks, merge) or `git revert -m 1 <merge-commit>` on a branch, newest first; Code Sync deploys the previous code. Never force-push or rewrite `main` |
| Models | The revert restores partials and aggregated files; authors reload the editor; values saved with removed fields stay stored but aren't shown |
| Content | Sites console **Timeline > Revert to this Version** (or Restore Version), check, publish again; sheets the same way; unpublish when no good version exists |
| Configuration | Re-apply the saved JSON (`public.json` paths from a previous `paths.json`: `git show <commit>:paths.json`; the previous `metadata.source` list); repository configuration files by reverting the PR, then re-index or regenerate the sitemap |
| Content package | Reinstall the previous package version from the `home-content-package` branch (installing replaces the package's pages) |

Emergency change approval and the hotfix path are not recorded (handover 12.6.1, Part 17 R-15).

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
