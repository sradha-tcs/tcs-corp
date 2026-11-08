---
id: "QA-TC-tab"
title: "Tab — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/tab/_tab.json"]
relatedComponents: ["tab"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Tab — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-tab |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Tab block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/tab/_tab.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (8)](#test-cases-8)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (8)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-TAB-001 | Functional (smoke) | — | Tab renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Blocked | No block library page for this block | — | — | — | — | — |
| TC-TAB-002 | Authoring | — | An author adds the Tab and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Tab from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-TAB-003 | Component variation | Columns per row | Tab: each choice of "Columns per row" gives its presentation | 1. Select the Tab 2. Set "Columns per row" to each of: Automatic, 1, 2, 3, 4 3. Preview after each change | The rendering matches the variation (class or attribute per-row-1, per-row-2, per-row-3, per-row-4) | Not Run | — | — | — | — | — | — |
| TC-TAB-004 | Boundary | — | Tab with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-TAB-005 | Negative | — | Tab with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-TAB-006 | Accessibility | — | Tab meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks found no issue; keyboard and screen reader checks not run | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-TAB-007 | Responsive | — | Tab at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Blocked | No block library page for this block | — | — | — | — | — |
| TC-TAB-008 | Error recovery | — | Tab when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
