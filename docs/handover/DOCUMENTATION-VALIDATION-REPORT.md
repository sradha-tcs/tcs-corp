---
id: "DOC-004"
title: "Documentation Validation Report"
role: "Documentation"
topic: ""
audience: "Documentation owner, every role owner"
owner: "Documentation Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "High"
primary: false
---

# Documentation Validation Report

| Attribute | Value |
| --- | --- |
| Document ID | DOC-004 |
| Audience | Documentation owner, every role owner |
| Purpose | The actual results of the automated validation of this documentation set |
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

- [Result](#result)
- [Checks](#checks)
- [Totals](#totals)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Result

**Passed** (20 passed, 0 failed, 1 not validated; run on 8 November 2026 with `node validate.mjs`).

## Checks

| Check | Status | Blocking | Detail |
| --- | --- | --- | --- |
| Required metadata (front matter) present | Passed | Yes | 516 documents with metadata; 0 incomplete |
| Required sections (contents, screenshots, limitations, open items, change history) | Passed | Yes | 0 documents miss a section |
| Unique document IDs | Passed | Yes | 516 IDs |
| Index files without metadata (README indexes) | Passed | No | 100 README / index files (navigation only) |
| Internal links resolve | Passed | Yes | 11925 links (2063 external, not fetched); 0 broken |
| Relative images resolve | Passed | Yes | 0 missing |
| Heading anchors of internal links exist | Passed | No | 0 missing anchors |
| No orphan screenshots | Passed | Yes | 1387 images; 0 not embedded |
| Every screenshot in the screenshot register | Passed | Yes | 0 not registered |
| Screenshot placeholders are visible where a screenshot could not be captured | Passed | No | 61 placeholders (Universal Editor / author screens: access blocker AB-01) |
| PDFs generated | Passed | Yes | 265 PDFs; 0 failed; 0 missing |
| No missing images in the PDFs | Passed | Yes | 0 images not loaded while rendering |
| Every primary document is in a PDF | Passed | Yes | 387 primary documents; 0 not in a PDF (root registers are Markdown only) |
| JSON files are valid | Passed | Yes | 19 JSON files; 0 invalid |
| Every block has developer, variation, test coverage and test case documents | Passed | Yes | 32 blocks; 0 documents missing |
| Source file references exist in the repository | Passed | Yes | 0 stale |
| No unresolved TODO / TBD / FIXME markers | Passed | Yes | 0 markers; open items are written as "To be confirmed" with an owner |
| Markdown: exactly one H1 per document | Passed | No | 0 documents |
| No local absolute file paths | Passed | Yes | 0 documents |
| No AEM program / environment ids or tokens | Passed | Yes | 0 documents |
| Cross-browser, manual and author validation | Not validated | No | Not validated in this program (access blockers AB-01, AB-03 to AB-05) |

## Totals

| Measure | Value |
| --- | --- |
| Markdown files | 616 |
| Documents with metadata | 516 |
| PDF files | 265 |
| Images | 1387 |
| JSON files | 19 |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](./SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
