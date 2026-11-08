---
id: "KB-A-007"
title: "Documentation Agent"
role: "Agents"
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

# Documentation Agent

| Attribute | Value |
| --- | --- |
| Document ID | KB-A-007 |
| Audience | Every role, AI agents, LLM retrieval |
| Purpose | Instructions for an AI agent working on documentation |
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

- [Start](#start)
- [Allowed changes](#allowed-changes)
- [Prohibited changes](#prohibited-changes)
- [Required validation](#required-validation)
- [Escalate when](#escalate-when)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Start

Documentation governance; the master documentation prompt.

## Allowed changes

- Regenerate this set after code changes; fix definitive documentation errors

## Prohibited changes

- Edit PDFs
- Copy outdated content without validation
- Reuse unrelated screenshots

## Required validation

- validate.mjs passes; PDFs regenerated; registers updated

## Escalate when

- A decision log entry would change, a new integration is needed, or content would be deleted or unpublished.
- A requested change conflicts with AGENTS.md (name the rule, propose the compliant option).

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
