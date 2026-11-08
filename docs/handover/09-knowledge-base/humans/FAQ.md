---
id: "KB-H-003"
title: "FAQ"
role: "Knowledge base"
topic: ""
audience: "Every role, AI agents, LLM retrieval"
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

# FAQ

| Attribute | Value |
| --- | --- |
| Document ID | KB-H-003 |
| Audience | Every role, AI agents, LLM retrieval |
| Purpose | Frequent questions |
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

- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

| Question | Answer |
| --- | --- |
| Why does my page under /language-masters/en show no header? | Its root needs references/nav and references/footer (copied into the root) and the page must be published; the code reads the root's own references. |
| Why does a list say "There are no items to show"? | The list reads the query index of the page's own root; the linked or tagged pages must be published and indexed in that root. |
| Where are the redirects applied? | Not by the platform for per-locale sheets: a CDN rule is needed (on hold). |
| Can I edit a PDF of this documentation? | No: edit the Markdown and regenerate. |
| Where do I record a decision? | docs/handover/knowledge-base/decision-log.md in the code repository (KB-D-xxx). |
| Which test status can I use without running a test? | Not Run, Blocked, Not Applicable or Requires Manual Validation. |
| Why are image fields not picking from Dynamic Media? | The asset picker PR #200 waits for the Extension Manager set-up. |

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
