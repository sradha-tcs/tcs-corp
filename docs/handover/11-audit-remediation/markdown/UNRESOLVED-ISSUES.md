---
id: "AUD-010"
title: "Unresolved Issues"
role: "Audit and remediation"
topic: ""
audience: "Technical lead, QA lead, documentation owner, product owner"
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

# Unresolved Issues

| Attribute | Value |
| --- | --- |
| Document ID | AUD-010 |
| Audience | Technical lead, QA lead, documentation owner, product owner |
| Purpose | Access blockers and open items |
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

- [Access blockers](#access-blockers)
- [Open defects](#open-defects)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Access blockers

| ID | Blocker | Impact | Resolution |
| --- | --- | --- | --- |
| AB-01 | No AEM author / Universal Editor access in the documentation program | Universal Editor screenshots, dialog and Additional-tab validation, authored-vs-rendered comparison, page properties, authoring test execution | AEM Administrator: grant a documentation account, or a team member captures the screens |
| AB-02 | /language-masters/en was being published while the set was generated | Analysis of the language master pages (links, rendering) is partial | Rerun the analysis after the publishing job ends |
| AB-03 | Only Chromium (Playwright) was available | Cross-browser and device testing | QA Lead: run the cross-browser matrix |
| AB-04 | No PageSpeed / Core Web Vitals measurement in the program | Performance audit | Technical Lead: run PageSpeed on the feature preview |
| AB-05 | No screen reader or manual keyboard testing in the program | Accessibility audit beyond DOM checks | Accessibility tester |

## Open defects

See the [defect register](../../05-quality-assurance/markdown/DEFECT-REGISTER.md).

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
