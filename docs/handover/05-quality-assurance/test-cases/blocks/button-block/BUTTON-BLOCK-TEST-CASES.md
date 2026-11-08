---
id: "QA-TC-button-block"
title: "Button — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/button-block/_button-block.json"]
relatedComponents: ["button-block"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Button — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-button-block |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Button block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/button-block/_button-block.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (12)](#test-cases-12)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (12)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-BUTTON-BLOCK-001 | Functional (smoke) | — | Button renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Blocked | No block library page for this block | — | — | — | — | — |
| TC-BUTTON-BLOCK-002 | Authoring | — | An author adds the Button and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Button from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-BUTTON-BLOCK-003 | Component variation | View | Button: each choice of "View" gives its presentation | 1. Select the Button 2. Set "View" to each of: Button, Icon, Link 3. Preview after each change | The rendering matches the variation (class or attribute button, icon, link) | Not Run | — | — | — | — | — | — |
| TC-BUTTON-BLOCK-004 | Component variation | Type | Button: each choice of "Type" gives its presentation | 1. Select the Button 2. Set "Type" to each of: Primary, Secondary, Tertiary 3. Preview after each change | The rendering matches the variation (class or attribute primary, secondary, tertiary) | Not Run | — | — | — | — | — | — |
| TC-BUTTON-BLOCK-005 | Component variation | Icon | Button: each choice of "Icon" gives its presentation | 1. Select the Button 2. Set "Icon" to each of: Arrow right, Chevron right, Chevron down, Search 3. Preview after each change | The rendering matches the variation (class or attribute arrow-right, chevron-right, chevron-down, search) | Not Run | — | — | — | — | — | — |
| TC-BUTTON-BLOCK-006 | Component variation | Alignment | Button: each choice of "Alignment" gives its presentation | 1. Select the Button 2. Set "Alignment" to each of: Left, Center, Right 3. Preview after each change | The rendering matches the variation (class or attribute left, center, right) | Not Run | — | — | — | — | — | — |
| TC-BUTTON-BLOCK-007 | Component variation | Text Decoration | Button: each choice of "Text Decoration" gives its presentation | 1. Select the Button 2. Set "Text Decoration" to each of: Default, Overline, line-Through, Underline, underline overline 3. Preview after each change | The rendering matches the variation (class or attribute none, overline, line-through, underline, underline overline) | Not Run | — | — | — | — | — | — |
| TC-BUTTON-BLOCK-008 | Boundary | — | Button with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-BUTTON-BLOCK-009 | Negative | — | Button with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-BUTTON-BLOCK-010 | Accessibility | — | Button meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks found no issue; keyboard and screen reader checks not run | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-BUTTON-BLOCK-011 | Responsive | — | Button at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Blocked | No block library page for this block | — | — | — | — | — |
| TC-BUTTON-BLOCK-012 | Error recovery | — | Button when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
