---
id: "QA-TC-E2E"
title: "End-to-End Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: false
---

# End-to-End Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-E2E |
| Audience | QA lead, testers, release lead |
| Purpose | Cross-component journeys |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
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

| ID | Journey | Status |
| --- | --- | --- |
| TC-E2E-001 | Author creates, previews and publishes a page under /language-masters/en | Blocked (no author access) |
| TC-E2E-002 | Visitor journey: home → hero → list → detail → contact | Not Run |
| TC-E2E-003 | Locale switch between /en and /de-de keeps the page type | Not Run |
| TC-E2E-004 | Migrated page under /language-masters/en renders with its own navigation, footer and sheets | Passed (8 November 2026, a migrated press release: its own nav, footer, placeholders, media contacts and query index; taxonomy.json of the root not published yet) |
| TC-E2E-005 | Redirect from a tcs.com path to its /language-masters/en page | Not Applicable (redirects not applied by the platform; CDN rule on hold) |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
