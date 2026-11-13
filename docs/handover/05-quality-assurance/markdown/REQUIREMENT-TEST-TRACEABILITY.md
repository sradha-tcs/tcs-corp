---
id: "QA-023"
title: "Requirement to Test Traceability"
role: "Quality assurance"
topic: ""
audience: "QA lead, business analysts"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: false
---

# Requirement to Test Traceability

| Attribute | Value |
| --- | --- |
| Document ID | QA-023 |
| Audience | QA lead, business analysts |
| Purpose | Every inferred story and its test cases with their status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

| Story | Feature | Block | Test case | Status |
| --- | --- | --- | --- | --- |
| US-F-E01-01-01 | F-E01-01 | — | No test case (gap) | Not Run |
| US-F-E01-01-02 | F-E01-01 | header | TC-HEADER-001 | Failed |
| US-F-E01-01-02 | F-E01-01 | header | TC-HEADER-002 | Requires Manual Validation |
| US-F-E01-01-02 | F-E01-01 | header | TC-HEADER-003 | Passed |
| US-F-E01-01-02 | F-E01-01 | header | TC-HEADER-004 | Not Run |
| US-F-E01-02-01 | F-E01-02 | tcs-header | TC-TCS-HEADER-002 | Not Run |
| US-F-E01-02-01 | F-E01-02 | tcs-header | TC-TCS-HEADER-004 | Not Run |
| US-F-E01-02-01 | F-E01-02 | tcs-header | TC-TCS-HEADER-005 | Not Run |
| US-F-E01-02-02 | F-E01-02 | tcs-header | TC-TCS-HEADER-001 | Blocked |
| US-F-E01-02-02 | F-E01-02 | tcs-header | TC-TCS-HEADER-006 | Requires Manual Validation |
| US-F-E01-02-02 | F-E01-02 | tcs-header | TC-TCS-HEADER-007 | Blocked |
| US-F-E01-02-02 | F-E01-02 | tcs-header | TC-TCS-HEADER-008 | Not Run |
| US-F-E01-02-03 | F-E01-02 | tcs-header | TC-TCS-HEADER-003 | Not Run |
| US-F-E01-03-01 | F-E01-03 | footer | TC-FOOTER-002 | Not Run |
| US-F-E01-03-01 | F-E01-03 | footer | TC-FOOTER-005 | Not Run |
| US-F-E01-03-01 | F-E01-03 | footer | TC-FOOTER-006 | Not Run |
| US-F-E01-03-02 | F-E01-03 | footer | TC-FOOTER-001 | Failed |
| US-F-E01-03-02 | F-E01-03 | footer | TC-FOOTER-007 | Requires Manual Validation |
| US-F-E01-03-02 | F-E01-03 | footer | TC-FOOTER-008 | Passed |
| US-F-E01-03-02 | F-E01-03 | footer | TC-FOOTER-009 | Not Run |
| US-F-E01-03-03 | F-E01-03 | footer | TC-FOOTER-003 | Not Run |
| US-F-E01-03-03 | F-E01-03 | footer | TC-FOOTER-004 | Not Run |
| US-F-E01-04-01 | F-E01-04 | fragment | TC-FRAGMENT-002 | Not Run |
| US-F-E01-04-01 | F-E01-04 | fragment | TC-FRAGMENT-003 | Not Run |
| US-F-E01-04-01 | F-E01-04 | fragment | TC-FRAGMENT-004 | Not Run |
| US-F-E01-04-02 | F-E01-04 | fragment | TC-FRAGMENT-001 | Failed |
| US-F-E01-04-02 | F-E01-04 | fragment | TC-FRAGMENT-005 | Requires Manual Validation |
| US-F-E01-04-02 | F-E01-04 | fragment | TC-FRAGMENT-006 | Passed |
| US-F-E01-04-02 | F-E01-04 | fragment | TC-FRAGMENT-007 | Not Run |
| US-F-E01-05-01 | F-E01-05 | modal | TC-MODAL-002 | Not Run |
| US-F-E01-05-01 | F-E01-05 | modal | TC-MODAL-003 | Not Run |
| US-F-E01-05-01 | F-E01-05 | modal | TC-MODAL-004 | Not Run |
| US-F-E01-05-02 | F-E01-05 | modal | TC-MODAL-001 | Failed |
| US-F-E01-05-02 | F-E01-05 | modal | TC-MODAL-005 | Requires Manual Validation |
| US-F-E01-05-02 | F-E01-05 | modal | TC-MODAL-006 | Passed |
| US-F-E01-05-02 | F-E01-05 | modal | TC-MODAL-007 | Not Run |
| US-F-E02-01-01 | F-E02-01 | hero | TC-HERO-002 | Not Run |
| US-F-E02-01-01 | F-E02-01 | hero | TC-HERO-024 | Not Run |
| US-F-E02-01-01 | F-E02-01 | hero | TC-HERO-025 | Not Run |
| US-F-E02-01-02 | F-E02-01 | hero | TC-HERO-001 | Failed |
| US-F-E02-01-02 | F-E02-01 | hero | TC-HERO-026 | Requires Manual Validation |
| US-F-E02-01-02 | F-E02-01 | hero | TC-HERO-027 | Passed |
| US-F-E02-01-02 | F-E02-01 | hero | TC-HERO-028 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-003 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-004 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-005 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-006 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-007 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-008 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-009 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-010 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-011 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-012 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-013 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-014 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-015 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-016 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-017 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-018 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-019 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-020 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-021 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-022 | Not Run |
| US-F-E02-01-03 | F-E02-01 | hero | TC-HERO-023 | Not Run |
| US-F-E02-02-01 | F-E02-02 | page-header | TC-PAGE-HEADER-002 | Not Run |
| US-F-E02-02-01 | F-E02-02 | page-header | TC-PAGE-HEADER-010 | Not Run |
| US-F-E02-02-01 | F-E02-02 | page-header | TC-PAGE-HEADER-011 | Not Run |
| US-F-E02-02-02 | F-E02-02 | page-header | TC-PAGE-HEADER-001 | Failed |
| US-F-E02-02-02 | F-E02-02 | page-header | TC-PAGE-HEADER-012 | Requires Manual Validation |
| US-F-E02-02-02 | F-E02-02 | page-header | TC-PAGE-HEADER-013 | Passed |
| US-F-E02-02-02 | F-E02-02 | page-header | TC-PAGE-HEADER-014 | Not Run |
| US-F-E02-02-03 | F-E02-02 | page-header | TC-PAGE-HEADER-003 | Not Run |
| US-F-E02-02-03 | F-E02-02 | page-header | TC-PAGE-HEADER-004 | Not Run |
| US-F-E02-02-03 | F-E02-02 | page-header | TC-PAGE-HEADER-005 | Not Run |
| US-F-E02-02-03 | F-E02-02 | page-header | TC-PAGE-HEADER-006 | Not Run |
| US-F-E02-02-03 | F-E02-02 | page-header | TC-PAGE-HEADER-007 | Not Run |
| US-F-E02-02-03 | F-E02-02 | page-header | TC-PAGE-HEADER-008 | Not Run |
| US-F-E02-02-03 | F-E02-02 | page-header | TC-PAGE-HEADER-009 | Not Run |
| US-F-E03-01-01 | F-E03-01 | teaser | TC-TEASER-002 | Not Run |
| US-F-E03-01-01 | F-E03-01 | teaser | TC-TEASER-038 | Not Run |
| US-F-E03-01-01 | F-E03-01 | teaser | TC-TEASER-039 | Not Run |
| US-F-E03-01-02 | F-E03-01 | teaser | TC-TEASER-001 | Failed |
| US-F-E03-01-02 | F-E03-01 | teaser | TC-TEASER-040 | Requires Manual Validation |
| US-F-E03-01-02 | F-E03-01 | teaser | TC-TEASER-041 | Passed |
| US-F-E03-01-02 | F-E03-01 | teaser | TC-TEASER-042 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-003 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-004 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-005 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-006 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-007 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-008 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-009 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-010 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-011 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-012 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-013 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-014 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-015 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-016 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-017 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-018 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-019 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-020 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-021 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-022 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-023 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-024 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-025 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-026 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-027 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-028 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-029 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-030 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-031 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-032 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-033 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-034 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-035 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-036 | Not Run |
| US-F-E03-01-03 | F-E03-01 | teaser | TC-TEASER-037 | Not Run |
| US-F-E03-02-01 | F-E03-02 | cards | TC-CARDS-002 | Not Run |
| US-F-E03-02-01 | F-E03-02 | cards | TC-CARDS-022 | Not Run |
| US-F-E03-02-01 | F-E03-02 | cards | TC-CARDS-023 | Not Run |
| US-F-E03-02-02 | F-E03-02 | cards | TC-CARDS-001 | Failed |
| US-F-E03-02-02 | F-E03-02 | cards | TC-CARDS-024 | Requires Manual Validation |
| US-F-E03-02-02 | F-E03-02 | cards | TC-CARDS-025 | Passed |
| US-F-E03-02-02 | F-E03-02 | cards | TC-CARDS-026 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-003 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-004 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-005 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-006 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-007 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-008 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-009 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-010 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-011 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-012 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-013 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-014 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-015 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-016 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-017 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-018 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-019 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-020 | Not Run |
| US-F-E03-02-03 | F-E03-02 | cards | TC-CARDS-021 | Not Run |
| US-F-E03-03-01 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-002 | Not Run |
| US-F-E03-03-01 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-021 | Not Run |
| US-F-E03-03-01 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-022 | Not Run |
| US-F-E03-03-02 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-001 | Failed |
| US-F-E03-03-02 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-023 | Requires Manual Validation |
| US-F-E03-03-02 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-024 | Failed |
| US-F-E03-03-02 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-025 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-003 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-004 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-005 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-006 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-007 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-008 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-009 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-010 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-011 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-012 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-013 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-014 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-015 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-016 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-017 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-018 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-019 | Not Run |
| US-F-E03-03-03 | F-E03-03 | columns-container | TC-COLUMNS-CONTAINER-020 | Not Run |
| US-F-E03-04-01 | F-E03-04 | columns | TC-COLUMNS-002 | Not Run |
| US-F-E03-04-01 | F-E03-04 | columns | TC-COLUMNS-003 | Not Run |
| US-F-E03-04-01 | F-E03-04 | columns | TC-COLUMNS-004 | Not Run |
| US-F-E03-04-02 | F-E03-04 | columns | TC-COLUMNS-001 | Failed |
| US-F-E03-04-02 | F-E03-04 | columns | TC-COLUMNS-005 | Requires Manual Validation |
| US-F-E03-04-02 | F-E03-04 | columns | TC-COLUMNS-006 | Passed |
| US-F-E03-04-02 | F-E03-04 | columns | TC-COLUMNS-007 | Not Run |
| US-F-E03-05-01 | F-E03-05 | column-break | TC-COLUMN-BREAK-002 | Not Run |
| US-F-E03-05-01 | F-E03-05 | column-break | TC-COLUMN-BREAK-003 | Not Run |
| US-F-E03-05-01 | F-E03-05 | column-break | TC-COLUMN-BREAK-004 | Not Run |
| US-F-E03-05-02 | F-E03-05 | column-break | TC-COLUMN-BREAK-001 | Blocked |
| US-F-E03-05-02 | F-E03-05 | column-break | TC-COLUMN-BREAK-005 | Requires Manual Validation |
| US-F-E03-05-02 | F-E03-05 | column-break | TC-COLUMN-BREAK-006 | Blocked |
| US-F-E03-05-02 | F-E03-05 | column-break | TC-COLUMN-BREAK-007 | Not Run |
| US-F-E03-06-01 | F-E03-06 | quote | TC-QUOTE-002 | Not Run |
| US-F-E03-06-01 | F-E03-06 | quote | TC-QUOTE-007 | Not Run |
| US-F-E03-06-01 | F-E03-06 | quote | TC-QUOTE-008 | Not Run |
| US-F-E03-06-02 | F-E03-06 | quote | TC-QUOTE-001 | Failed |
| US-F-E03-06-02 | F-E03-06 | quote | TC-QUOTE-009 | Requires Manual Validation |
| US-F-E03-06-02 | F-E03-06 | quote | TC-QUOTE-010 | Passed |
| US-F-E03-06-02 | F-E03-06 | quote | TC-QUOTE-011 | Not Run |
| US-F-E03-06-03 | F-E03-06 | quote | TC-QUOTE-003 | Not Run |
| US-F-E03-06-03 | F-E03-06 | quote | TC-QUOTE-004 | Not Run |
| US-F-E03-06-03 | F-E03-06 | quote | TC-QUOTE-005 | Not Run |
| US-F-E03-06-03 | F-E03-06 | quote | TC-QUOTE-006 | Not Run |
| US-F-E03-07-01 | F-E03-07 | testimonial | TC-TESTIMONIAL-002 | Not Run |
| US-F-E03-07-01 | F-E03-07 | testimonial | TC-TESTIMONIAL-005 | Not Run |
| US-F-E03-07-01 | F-E03-07 | testimonial | TC-TESTIMONIAL-006 | Not Run |
| US-F-E03-07-02 | F-E03-07 | testimonial | TC-TESTIMONIAL-001 | Failed |
| US-F-E03-07-02 | F-E03-07 | testimonial | TC-TESTIMONIAL-007 | Requires Manual Validation |
| US-F-E03-07-02 | F-E03-07 | testimonial | TC-TESTIMONIAL-008 | Failed |
| US-F-E03-07-02 | F-E03-07 | testimonial | TC-TESTIMONIAL-009 | Not Run |
| US-F-E03-07-03 | F-E03-07 | testimonial | TC-TESTIMONIAL-003 | Not Run |
| US-F-E03-07-03 | F-E03-07 | testimonial | TC-TESTIMONIAL-004 | Not Run |
| US-F-E03-08-01 | F-E03-08 | separator | TC-SEPARATOR-002 | Not Run |
| US-F-E03-08-01 | F-E03-08 | separator | TC-SEPARATOR-035 | Not Run |
| US-F-E03-08-01 | F-E03-08 | separator | TC-SEPARATOR-036 | Not Run |
| US-F-E03-08-02 | F-E03-08 | separator | TC-SEPARATOR-001 | Failed |
| US-F-E03-08-02 | F-E03-08 | separator | TC-SEPARATOR-037 | Requires Manual Validation |
| US-F-E03-08-02 | F-E03-08 | separator | TC-SEPARATOR-038 | Passed |
| US-F-E03-08-02 | F-E03-08 | separator | TC-SEPARATOR-039 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-003 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-004 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-005 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-006 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-007 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-008 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-009 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-010 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-011 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-012 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-013 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-014 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-015 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-016 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-017 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-018 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-019 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-020 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-021 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-022 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-023 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-024 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-025 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-026 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-027 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-028 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-029 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-030 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-031 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-032 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-033 | Not Run |
| US-F-E03-08-03 | F-E03-08 | separator | TC-SEPARATOR-034 | Not Run |
| US-F-E03-09-01 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-002 | Not Run |
| US-F-E03-09-01 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-016 | Not Run |
| US-F-E03-09-01 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-017 | Not Run |
| US-F-E03-09-02 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-001 | Blocked |
| US-F-E03-09-02 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-018 | Requires Manual Validation |
| US-F-E03-09-02 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-019 | Blocked |
| US-F-E03-09-02 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-020 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-003 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-004 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-005 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-006 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-007 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-008 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-009 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-010 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-011 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-012 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-013 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-014 | Not Run |
| US-F-E03-09-03 | F-E03-09 | image-collage | TC-IMAGE-COLLAGE-015 | Not Run |
| US-F-E03-10-01 | F-E03-10 | accordion | TC-ACCORDION-002 | Not Run |
| US-F-E03-10-01 | F-E03-10 | accordion | TC-ACCORDION-003 | Not Run |
| US-F-E03-10-01 | F-E03-10 | accordion | TC-ACCORDION-004 | Not Run |
| US-F-E03-10-02 | F-E03-10 | accordion | TC-ACCORDION-001 | Failed |
| US-F-E03-10-02 | F-E03-10 | accordion | TC-ACCORDION-005 | Requires Manual Validation |
| US-F-E03-10-02 | F-E03-10 | accordion | TC-ACCORDION-006 | Passed |
| US-F-E03-10-02 | F-E03-10 | accordion | TC-ACCORDION-007 | Not Run |
| US-F-E03-11-01 | F-E03-11 | tabs | TC-TABS-002 | Not Run |
| US-F-E03-11-01 | F-E03-11 | tabs | TC-TABS-022 | Not Run |
| US-F-E03-11-01 | F-E03-11 | tabs | TC-TABS-023 | Not Run |
| US-F-E03-11-02 | F-E03-11 | tabs | TC-TABS-001 | Failed |
| US-F-E03-11-02 | F-E03-11 | tabs | TC-TABS-024 | Requires Manual Validation |
| US-F-E03-11-02 | F-E03-11 | tabs | TC-TABS-025 | Passed |
| US-F-E03-11-02 | F-E03-11 | tabs | TC-TABS-026 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-003 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-004 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-005 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-006 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-007 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-008 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-009 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-010 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-011 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-012 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-013 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-014 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-015 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-016 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-017 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-018 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-019 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-020 | Not Run |
| US-F-E03-11-03 | F-E03-11 | tabs | TC-TABS-021 | Not Run |
| US-F-E03-12-01 | F-E03-12 | tab | TC-TAB-002 | Not Run |
| US-F-E03-12-01 | F-E03-12 | tab | TC-TAB-004 | Not Run |
| US-F-E03-12-01 | F-E03-12 | tab | TC-TAB-005 | Not Run |
| US-F-E03-12-02 | F-E03-12 | tab | TC-TAB-001 | Blocked |
| US-F-E03-12-02 | F-E03-12 | tab | TC-TAB-006 | Requires Manual Validation |
| US-F-E03-12-02 | F-E03-12 | tab | TC-TAB-007 | Blocked |
| US-F-E03-12-02 | F-E03-12 | tab | TC-TAB-008 | Not Run |
| US-F-E03-12-03 | F-E03-12 | tab | TC-TAB-003 | Not Run |
| US-F-E03-13-01 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-002 | Not Run |
| US-F-E03-13-01 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-016 | Not Run |
| US-F-E03-13-01 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-017 | Not Run |
| US-F-E03-13-02 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-001 | Failed |
| US-F-E03-13-02 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-018 | Requires Manual Validation |
| US-F-E03-13-02 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-019 | Passed |
| US-F-E03-13-02 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-020 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-003 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-004 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-005 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-006 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-007 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-008 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-009 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-010 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-011 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-012 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-013 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-014 | Not Run |
| US-F-E03-13-03 | F-E03-13 | gen-carousel | TC-GEN-CAROUSEL-015 | Not Run |
| US-F-E03-14-01 | F-E03-14 | table | TC-TABLE-002 | Not Run |
| US-F-E03-14-01 | F-E03-14 | table | TC-TABLE-005 | Not Run |
| US-F-E03-14-01 | F-E03-14 | table | TC-TABLE-006 | Not Run |
| US-F-E03-14-02 | F-E03-14 | table | TC-TABLE-001 | Failed |
| US-F-E03-14-02 | F-E03-14 | table | TC-TABLE-007 | Requires Manual Validation |
| US-F-E03-14-02 | F-E03-14 | table | TC-TABLE-008 | Failed |
| US-F-E03-14-02 | F-E03-14 | table | TC-TABLE-009 | Not Run |
| US-F-E03-14-03 | F-E03-14 | table | TC-TABLE-003 | Not Run |
| US-F-E03-14-03 | F-E03-14 | table | TC-TABLE-004 | Not Run |
| US-F-E03-15-01 | F-E03-15 | anchor-list | TC-ANCHOR-LIST-002 | Not Run |
| US-F-E03-15-01 | F-E03-15 | anchor-list | TC-ANCHOR-LIST-003 | Not Run |
| US-F-E03-15-01 | F-E03-15 | anchor-list | TC-ANCHOR-LIST-004 | Not Run |
| US-F-E03-15-02 | F-E03-15 | anchor-list | TC-ANCHOR-LIST-001 | Failed |
| US-F-E03-15-02 | F-E03-15 | anchor-list | TC-ANCHOR-LIST-005 | Requires Manual Validation |
| US-F-E03-15-02 | F-E03-15 | anchor-list | TC-ANCHOR-LIST-006 | Passed |
| US-F-E03-15-02 | F-E03-15 | anchor-list | TC-ANCHOR-LIST-007 | Not Run |
| US-F-E03-16-01 | F-E03-16 | button-block | TC-BUTTON-BLOCK-002 | Not Run |
| US-F-E03-16-01 | F-E03-16 | button-block | TC-BUTTON-BLOCK-008 | Not Run |
| US-F-E03-16-01 | F-E03-16 | button-block | TC-BUTTON-BLOCK-009 | Not Run |
| US-F-E03-16-02 | F-E03-16 | button-block | TC-BUTTON-BLOCK-001 | Blocked |
| US-F-E03-16-02 | F-E03-16 | button-block | TC-BUTTON-BLOCK-010 | Requires Manual Validation |
| US-F-E03-16-02 | F-E03-16 | button-block | TC-BUTTON-BLOCK-011 | Blocked |
| US-F-E03-16-02 | F-E03-16 | button-block | TC-BUTTON-BLOCK-012 | Not Run |
| US-F-E03-16-03 | F-E03-16 | button-block | TC-BUTTON-BLOCK-003 | Not Run |
| US-F-E03-16-03 | F-E03-16 | button-block | TC-BUTTON-BLOCK-004 | Not Run |
| US-F-E03-16-03 | F-E03-16 | button-block | TC-BUTTON-BLOCK-005 | Not Run |
| US-F-E03-16-03 | F-E03-16 | button-block | TC-BUTTON-BLOCK-006 | Not Run |
| US-F-E03-16-03 | F-E03-16 | button-block | TC-BUTTON-BLOCK-007 | Not Run |
| US-F-E04-01-01 | F-E04-01 | video | TC-VIDEO-002 | Not Run |
| US-F-E04-01-01 | F-E04-01 | video | TC-VIDEO-007 | Not Run |
| US-F-E04-01-01 | F-E04-01 | video | TC-VIDEO-008 | Not Run |
| US-F-E04-01-02 | F-E04-01 | video | TC-VIDEO-001 | Failed |
| US-F-E04-01-02 | F-E04-01 | video | TC-VIDEO-009 | Requires Manual Validation |
| US-F-E04-01-02 | F-E04-01 | video | TC-VIDEO-010 | Passed |
| US-F-E04-01-02 | F-E04-01 | video | TC-VIDEO-011 | Not Run |
| US-F-E04-01-03 | F-E04-01 | video | TC-VIDEO-003 | Not Run |
| US-F-E04-01-03 | F-E04-01 | video | TC-VIDEO-004 | Not Run |
| US-F-E04-01-03 | F-E04-01 | video | TC-VIDEO-005 | Not Run |
| US-F-E04-01-03 | F-E04-01 | video | TC-VIDEO-006 | Not Run |
| US-F-E04-02-01 | F-E04-02 | embed | TC-EMBED-002 | Not Run |
| US-F-E04-02-01 | F-E04-02 | embed | TC-EMBED-003 | Not Run |
| US-F-E04-02-01 | F-E04-02 | embed | TC-EMBED-004 | Not Run |
| US-F-E04-02-02 | F-E04-02 | embed | TC-EMBED-001 | Failed |
| US-F-E04-02-02 | F-E04-02 | embed | TC-EMBED-005 | Requires Manual Validation |
| US-F-E04-02-02 | F-E04-02 | embed | TC-EMBED-006 | Passed |
| US-F-E04-02-02 | F-E04-02 | embed | TC-EMBED-007 | Not Run |
| US-F-E04-03-01 | F-E04-03 | interactive-dashboard | TC-INTERACTIVE-DASHBOARD-002 | Not Run |
| US-F-E04-03-01 | F-E04-03 | interactive-dashboard | TC-INTERACTIVE-DASHBOARD-003 | Not Run |
| US-F-E04-03-01 | F-E04-03 | interactive-dashboard | TC-INTERACTIVE-DASHBOARD-004 | Not Run |
| US-F-E04-03-02 | F-E04-03 | interactive-dashboard | TC-INTERACTIVE-DASHBOARD-001 | Failed |
| US-F-E04-03-02 | F-E04-03 | interactive-dashboard | TC-INTERACTIVE-DASHBOARD-005 | Requires Manual Validation |
| US-F-E04-03-02 | F-E04-03 | interactive-dashboard | TC-INTERACTIVE-DASHBOARD-006 | Passed |
| US-F-E04-03-02 | F-E04-03 | interactive-dashboard | TC-INTERACTIVE-DASHBOARD-007 | Not Run |
| US-F-E05-01-01 | F-E05-01 | list | TC-LIST-002 | Not Run |
| US-F-E05-01-01 | F-E05-01 | list | TC-LIST-026 | Not Run |
| US-F-E05-01-01 | F-E05-01 | list | TC-LIST-027 | Not Run |
| US-F-E05-01-02 | F-E05-01 | list | TC-LIST-001 | Failed |
| US-F-E05-01-02 | F-E05-01 | list | TC-LIST-028 | Requires Manual Validation |
| US-F-E05-01-02 | F-E05-01 | list | TC-LIST-029 | Passed |
| US-F-E05-01-02 | F-E05-01 | list | TC-LIST-030 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-003 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-004 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-005 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-006 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-007 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-008 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-009 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-010 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-011 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-012 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-013 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-014 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-015 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-016 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-017 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-018 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-019 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-020 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-021 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-022 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-023 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-024 | Not Run |
| US-F-E05-01-03 | F-E05-01 | list | TC-LIST-025 | Not Run |
| US-F-E05-02-01 | F-E05-02 | filter-list | TC-FILTER-LIST-002 | Not Run |
| US-F-E05-02-01 | F-E05-02 | filter-list | TC-FILTER-LIST-013 | Not Run |
| US-F-E05-02-01 | F-E05-02 | filter-list | TC-FILTER-LIST-014 | Not Run |
| US-F-E05-02-02 | F-E05-02 | filter-list | TC-FILTER-LIST-001 | Failed |
| US-F-E05-02-02 | F-E05-02 | filter-list | TC-FILTER-LIST-015 | Requires Manual Validation |
| US-F-E05-02-02 | F-E05-02 | filter-list | TC-FILTER-LIST-016 | Passed |
| US-F-E05-02-02 | F-E05-02 | filter-list | TC-FILTER-LIST-017 | Not Run |
| US-F-E05-02-03 | F-E05-02 | filter-list | TC-FILTER-LIST-003 | Not Run |
| US-F-E05-02-03 | F-E05-02 | filter-list | TC-FILTER-LIST-004 | Not Run |
| US-F-E05-02-03 | F-E05-02 | filter-list | TC-FILTER-LIST-005 | Not Run |
| US-F-E05-02-03 | F-E05-02 | filter-list | TC-FILTER-LIST-006 | Not Run |
| US-F-E05-02-03 | F-E05-02 | filter-list | TC-FILTER-LIST-007 | Not Run |
| US-F-E05-02-03 | F-E05-02 | filter-list | TC-FILTER-LIST-008 | Not Run |
| US-F-E05-02-03 | F-E05-02 | filter-list | TC-FILTER-LIST-009 | Not Run |
| US-F-E05-02-03 | F-E05-02 | filter-list | TC-FILTER-LIST-010 | Not Run |
| US-F-E05-02-03 | F-E05-02 | filter-list | TC-FILTER-LIST-011 | Not Run |
| US-F-E05-02-03 | F-E05-02 | filter-list | TC-FILTER-LIST-012 | Not Run |
| US-F-E05-03-01 | F-E05-03 | table-list | TC-TABLE-LIST-002 | Not Run |
| US-F-E05-03-01 | F-E05-03 | table-list | TC-TABLE-LIST-011 | Not Run |
| US-F-E05-03-01 | F-E05-03 | table-list | TC-TABLE-LIST-012 | Not Run |
| US-F-E05-03-02 | F-E05-03 | table-list | TC-TABLE-LIST-001 | Failed |
| US-F-E05-03-02 | F-E05-03 | table-list | TC-TABLE-LIST-013 | Requires Manual Validation |
| US-F-E05-03-02 | F-E05-03 | table-list | TC-TABLE-LIST-014 | Passed |
| US-F-E05-03-02 | F-E05-03 | table-list | TC-TABLE-LIST-015 | Not Run |
| US-F-E05-03-03 | F-E05-03 | table-list | TC-TABLE-LIST-003 | Not Run |
| US-F-E05-03-03 | F-E05-03 | table-list | TC-TABLE-LIST-004 | Not Run |
| US-F-E05-03-03 | F-E05-03 | table-list | TC-TABLE-LIST-005 | Not Run |
| US-F-E05-03-03 | F-E05-03 | table-list | TC-TABLE-LIST-006 | Not Run |
| US-F-E05-03-03 | F-E05-03 | table-list | TC-TABLE-LIST-007 | Not Run |
| US-F-E05-03-03 | F-E05-03 | table-list | TC-TABLE-LIST-008 | Not Run |
| US-F-E05-03-03 | F-E05-03 | table-list | TC-TABLE-LIST-009 | Not Run |
| US-F-E05-03-03 | F-E05-03 | table-list | TC-TABLE-LIST-010 | Not Run |
| US-F-E05-04-01 | F-E05-04 | media-contacts | TC-MEDIA-CONTACTS-002 | Not Run |
| US-F-E05-04-01 | F-E05-04 | media-contacts | TC-MEDIA-CONTACTS-004 | Not Run |
| US-F-E05-04-01 | F-E05-04 | media-contacts | TC-MEDIA-CONTACTS-005 | Not Run |
| US-F-E05-04-02 | F-E05-04 | media-contacts | TC-MEDIA-CONTACTS-001 | Blocked |
| US-F-E05-04-02 | F-E05-04 | media-contacts | TC-MEDIA-CONTACTS-006 | Requires Manual Validation |
| US-F-E05-04-02 | F-E05-04 | media-contacts | TC-MEDIA-CONTACTS-007 | Blocked |
| US-F-E05-04-02 | F-E05-04 | media-contacts | TC-MEDIA-CONTACTS-008 | Not Run |
| US-F-E05-04-03 | F-E05-04 | media-contacts | TC-MEDIA-CONTACTS-003 | Not Run |
| US-F-E06-01-01 | F-E06-01 | form-variations | TC-FORM-VARIATIONS-002 | Not Run |
| US-F-E06-01-01 | F-E06-01 | form-variations | TC-FORM-VARIATIONS-005 | Not Run |
| US-F-E06-01-01 | F-E06-01 | form-variations | TC-FORM-VARIATIONS-006 | Not Run |
| US-F-E06-01-02 | F-E06-01 | form-variations | TC-FORM-VARIATIONS-001 | Failed |
| US-F-E06-01-02 | F-E06-01 | form-variations | TC-FORM-VARIATIONS-007 | Requires Manual Validation |
| US-F-E06-01-02 | F-E06-01 | form-variations | TC-FORM-VARIATIONS-008 | Passed |
| US-F-E06-01-02 | F-E06-01 | form-variations | TC-FORM-VARIATIONS-009 | Not Run |
| US-F-E06-01-03 | F-E06-01 | form-variations | TC-FORM-VARIATIONS-003 | Not Run |
| US-F-E06-01-03 | F-E06-01 | form-variations | TC-FORM-VARIATIONS-004 | Not Run |
| US-F-E07-01-01 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-002 | Not Run |
| US-F-E07-01-01 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-013 | Not Run |
| US-F-E07-01-01 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-014 | Not Run |
| US-F-E07-01-02 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-001 | Failed |
| US-F-E07-01-02 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-015 | Requires Manual Validation |
| US-F-E07-01-02 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-016 | Passed |
| US-F-E07-01-02 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-017 | Not Run |
| US-F-E07-01-03 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-003 | Not Run |
| US-F-E07-01-03 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-004 | Not Run |
| US-F-E07-01-03 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-005 | Not Run |
| US-F-E07-01-03 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-006 | Not Run |
| US-F-E07-01-03 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-007 | Not Run |
| US-F-E07-01-03 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-008 | Not Run |
| US-F-E07-01-03 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-009 | Not Run |
| US-F-E07-01-03 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-010 | Not Run |
| US-F-E07-01-03 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-011 | Not Run |
| US-F-E07-01-03 | F-E07-01 | conversation-canvas | TC-CONVERSATION-CANVAS-012 | Not Run |
| US-F-E08-01-01 | F-E08-01 | — | No test case (gap) | Not Run |
| US-F-E08-02-01 | F-E08-02 | — | No test case (gap) | Not Run |
| US-F-E08-03-01 | F-E08-03 | — | No test case (gap) | Not Run |
| US-F-E08-04-01 | F-E08-04 | — | No test case (gap) | Not Run |
| US-F-E09-01-01 | F-E09-01 | — | No test case (gap) | Not Run |
| US-F-E09-02-01 | F-E09-02 | — | No test case (gap) | Not Run |
| US-F-E09-03-01 | F-E09-03 | — | No test case (gap) | Not Run |
| US-F-E09-04-01 | F-E09-04 | — | No test case (gap) | Not Run |
| US-F-E10-01-01 | F-E10-01 | — | No test case (gap) | Not Run |
| US-F-E10-02-01 | F-E10-02 | — | No test case (gap) | Not Run |
| US-F-E10-03-01 | F-E10-03 | — | No test case (gap) | Not Run |
| US-F-E10-04-01 | F-E10-04 | — | No test case (gap) | Not Run |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
