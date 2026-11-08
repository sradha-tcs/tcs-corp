---
id: "OPS-003"
title: "Incident Management"
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

# Incident Management

| Attribute | Value |
| --- | --- |
| Document ID | OPS-003 |
| Audience | AMS / support teams, site administrators |
| Purpose | How incidents are handled |
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

- [Process (proposed)](#process-proposed)
- [Example (8 November 2026)](#example-8-november-2026)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Process (proposed)

1. Detect (monitoring, user report) and record the time, URL, root and evidence.
2. Classify severity (Critical: a root or locale unavailable; Major: a feature broken; Minor; Trivial).
3. Contain: unpublish the faulty page, revert the code commit, or republish the last good content.
4. Resolve and verify on preview and live; reindex if lists are affected.
5. Review: root cause, decision log entry if a decision changes.

## Example (8 November 2026)

The /en locale was unpublished and deleted from Edge Delivery at 16:41–16:48 UTC by the AEM publishing technical account (an author-side action): detected from the Admin API log; owner to confirm intent (Content Lead).

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
