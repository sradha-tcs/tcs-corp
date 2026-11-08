---
id: "QA-TC-table-list"
title: "Table List — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/table-list/_table-list.json"]
relatedComponents: ["table-list"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Table List — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-table-list |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Table List block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/table-list/_table-list.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (15)](#test-cases-15)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (15)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-TABLE-LIST-001 | Functional (smoke) | — | Table List renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 6 of 6 pages fail: shared failed request (DEF-002, DEF-001) | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001 | Automated (documentation program) | 8 November 2026 |
| TC-TABLE-LIST-002 | Authoring | — | An author adds the Table List and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Table List from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-TABLE-LIST-003 | Component variation | Variation | Table List: each choice of "Variation" gives its presentation | 1. Select the Table List 2. Set "Variation" to each of: Variation 1 - Title, description, arrow, Variation 2 - Description, large title, button, Variation 3 - Description, number, large title, arrow, Variation 4 - Wide title, grey description, arrow (row hover), Variation 5 - Label, large description (steps), Variation 6 - Description, right-aligned title, small arrow 3. Preview after each change | The rendering matches the variation (class or attribute industries, solutions, products, segments, approach, platforms) | Not Run | — | — | — | — | — | — |
| TC-TABLE-LIST-004 | Component variation | Background color | Table List: each choice of "Background color" gives its presentation | 1. Select the Table List 2. Set "Background color" to each of: White (default), Black, Dark Green, Navy 3. Preview after each change | The rendering matches the variation (class or attribute white, black, dark-green, navy) | Not Run | — | — | — | — | — | — |
| TC-TABLE-LIST-005 | Component variation | Heading Type | Table List: each choice of "Heading Type" gives its presentation | 1. Select the Table List 2. Set "Heading Type" to each of: H2, H3, H4 3. Preview after each change | The rendering matches the variation (class or attribute h2, h3, h4) | Not Run | — | — | — | — | — | — |
| TC-TABLE-LIST-006 | Component variation | Heading position | Table List: each choice of "Heading position" gives its presentation | 1. Select the Table List 2. Set "Heading position" to each of: Above the list, Beside the list 3. Preview after each change | The rendering matches the variation (class or attribute beside) | Not Run | — | — | — | — | — | — |
| TC-TABLE-LIST-007 | Component variation | Style | Table List: each choice of "Style" gives its presentation | 1. Select the Table List 2. Set "Style" to each of: Variation default, Filled button, Outline button, Text link 3. Preview after each change | The rendering matches the variation (class or attribute primary, secondary, tertiary) | Not Run | — | — | — | — | — | — |
| TC-TABLE-LIST-008 | Component variation | Numbers | Table List: each choice of "Numbers" gives its presentation | 1. Select the Table List 2. Set "Numbers" to each of: Variation default, Show, Show on mobile only, Hide 3. Preview after each change | The rendering matches the variation (class or attribute show, mobile, hide) | Not Run | — | — | — | — | — | — |
| TC-TABLE-LIST-009 | Component variation | Item link | Table List: each choice of "Item link" gives its presentation | 1. Select the Table List 2. Set "Item link" to each of: Variation default, Arrow, Diagonal arrow, Circled arrow, Button 3. Preview after each change | The rendering matches the variation (class or attribute arrow, arrow-up-right, arrow-circle, button) | Not Run | — | — | — | — | — | — |
| TC-TABLE-LIST-010 | Component variation | Trademark | Table List Item: each choice of "Trademark" gives its presentation | 1. Select the Table List Item 2. Set "Trademark" to each of: None, ™ Trademark, ® Registered 3. Preview after each change | The rendering matches the variation (class or attribute tm, r) | Not Run | — | — | — | — | — | — |
| TC-TABLE-LIST-011 | Boundary | — | Table List with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-TABLE-LIST-012 | Negative | — | Table List with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-TABLE-LIST-013 | Accessibility | — | Table List meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 1 page(s): /design-block-master/en/block-library/table-list: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-TABLE-LIST-014 | Responsive | — | Table List at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 6 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 8 November 2026 |
| TC-TABLE-LIST-015 | Error recovery | — | Table List when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
