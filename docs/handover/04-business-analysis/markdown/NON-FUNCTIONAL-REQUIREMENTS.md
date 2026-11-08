---
id: "BA-005"
title: "Non-Functional Requirements"
role: "Business analysis"
topic: ""
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Low"
primary: true
---

# Non-Functional Requirements

| Attribute | Value |
| --- | --- |
| Document ID | BA-005 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | Accessibility, performance, privacy, SEO and localization requirements as implemented |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
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

| ID | Requirement | Source | Status |
| --- | --- | --- | --- |
| NFR-01 | WCAG 2.1 AA | AGENTS.md, accessibility guide | Implemented; not fully verified |
| NFR-02 | PageSpeed target 100; three-phase loading | AGENTS.md | Implemented; not measured in this program |
| NFR-03 | No personal data in the data layer | utils/privacy.js | Implemented (unit tested) |
| NFR-04 | UI text from placeholders with English fallback | utils/placeholders.js | Implemented |
| NFR-05 | No runtime dependencies; no build step | AGENTS.md | Implemented |
| NFR-06 | Mobile first at 600 / 900 / 1200 px | styles | Implemented |

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
