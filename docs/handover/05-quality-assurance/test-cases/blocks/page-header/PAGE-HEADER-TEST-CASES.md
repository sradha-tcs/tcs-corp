---
id: "QA-TC-page-header"
title: "Page Header — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/page-header/_page-header.json"]
relatedComponents: ["page-header"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Page Header — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-page-header |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Page Header block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/page-header/_page-header.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (14)](#test-cases-14)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (14)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-PAGE-HEADER-001 | Functional (smoke) | — | Page Header renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 17 of 17 pages fail: shared failed request (DEF-002, DEF-001) | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001 | Automated (documentation program) | 8 November 2026 |
| TC-PAGE-HEADER-002 | Authoring | — | An author adds the Page Header and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Page Header from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-PAGE-HEADER-003 | Component variation | Layout | Page Header: each choice of "Layout" gives its presentation | 1. Select the Page Header 2. Set "Layout" to each of: Default (from the Page Type), Landing (with the featured image), Secondary (title left, text right), Article (meta row, author), Display (large title) 3. Preview after each change | The rendering matches the variation (class or attribute landing, secondary, article, display) | Not Run | — | — | — | — | — | — |
| TC-PAGE-HEADER-004 | Component variation | CTA List › CTA Link Type | Page Header: each choice of "CTA List › CTA Link Type" gives its presentation | 1. Select the Page Header 2. Set "CTA List › CTA Link Type" to each of: Default, Open in New Window 3. Preview after each change | The rendering matches the variation (class or attribute new-window) | Not Run | — | — | — | — | — | — |
| TC-PAGE-HEADER-005 | Component variation | CTA List › CTA Link Style | Page Header: each choice of "CTA List › CTA Link Style" gives its presentation | 1. Select the Page Header 2. Set "CTA List › CTA Link Style" to each of: Text link, Primary Button, Secondary Button 3. Preview after each change | The rendering matches the variation (class or attribute primary, secondary) | Not Run | — | — | — | — | — | — |
| TC-PAGE-HEADER-006 | Component variation | CTA Link Type | CTA: each choice of "CTA Link Type" gives its presentation | 1. Select the CTA 2. Set "CTA Link Type" to each of: Default, Open in New Window 3. Preview after each change | The rendering matches the variation (class or attribute new-window) | Not Run | — | — | — | — | — | — |
| TC-PAGE-HEADER-007 | Component variation | CTA Link Style | CTA: each choice of "CTA Link Style" gives its presentation | 1. Select the CTA 2. Set "CTA Link Style" to each of: Text link, Primary Button, Secondary Button 3. Preview after each change | The rendering matches the variation (class or attribute tertiary, primary, secondary) | Not Run | — | — | — | — | — | — |
| TC-PAGE-HEADER-008 | Component variation | Button background | CTA: each choice of "Button background" gives its presentation | 1. Select the CTA 2. Set "Button background" to each of: Style default, Blue 3. Preview after each change | The rendering matches the variation (class or attribute button-bg-blue) | Not Run | — | — | — | — | — | — |
| TC-PAGE-HEADER-009 | Component variation | Button shape | CTA: each choice of "Button shape" gives its presentation | 1. Select the CTA 2. Set "Button shape" to each of: Style default, Round 3. Preview after each change | The rendering matches the variation (class or attribute button-round) | Not Run | — | — | — | — | — | — |
| TC-PAGE-HEADER-010 | Boundary | — | Page Header with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-PAGE-HEADER-011 | Negative | — | Page Header with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-PAGE-HEADER-012 | Accessibility | — | Page Header meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 1 page(s): /design-block-master/en/block-library/page-header: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-PAGE-HEADER-013 | Responsive | — | Page Header at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 17 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 8 November 2026 |
| TC-PAGE-HEADER-014 | Error recovery | — | Page Header when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
