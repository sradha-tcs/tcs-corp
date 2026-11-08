---
id: "QA-TC-quote"
title: "Quote — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/quote/_quote.json"]
relatedComponents: ["quote"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Quote — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-quote |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Quote block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/quote/_quote.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (11)](#test-cases-11)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (11)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-QUOTE-001 | Functional (smoke) | — | Quote renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 2 of 2 pages fail: shared failed request (DEF-002, DEF-001) | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001 | Automated (documentation program) | 8 November 2026 |
| TC-QUOTE-002 | Authoring | — | An author adds the Quote and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Quote from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-QUOTE-003 | Component variation | Title Type | Quote: each choice of "Title Type" gives its presentation | 1. Select the Quote 2. Set "Title Type" to each of: H1, H2, H3, H4, H5, H6 3. Preview after each change | The rendering matches the variation (class or attribute h1, h2, h3, h4, h5, h6) | Not Run | — | — | — | — | — | — |
| TC-QUOTE-004 | Component variation | Image Position (Desktop) | Quote: each choice of "Image Position (Desktop)" gives its presentation | 1. Select the Quote 2. Set "Image Position (Desktop)" to each of: Right, Left 3. Preview after each change | The rendering matches the variation (class or attribute right, left) | Not Run | — | — | — | — | — | — |
| TC-QUOTE-005 | Component variation | Image Position (Mobile) | Quote: each choice of "Image Position (Mobile)" gives its presentation | 1. Select the Quote 2. Set "Image Position (Mobile)" to each of: Top, Bottom 3. Preview after each change | The rendering matches the variation (class or attribute top, bottom) | Not Run | — | — | — | — | — | — |
| TC-QUOTE-006 | Component variation | BG Color | Quote: each choice of "BG Color" gives its presentation | 1. Select the Quote 2. Set "BG Color" to each of: Default, Grey 3. Preview after each change | The rendering matches the variation (class or attribute grey) | Not Run | — | — | — | — | — | — |
| TC-QUOTE-007 | Boundary | — | Quote with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-QUOTE-008 | Negative | — | Quote with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-QUOTE-009 | Accessibility | — | Quote meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 2 page(s): /design-block-master/en/block-library/quote: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids \| /design-block-master/en/block-library/quote/quote-variations: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-QUOTE-010 | Responsive | — | Quote at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 2 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 8 November 2026 |
| TC-QUOTE-011 | Error recovery | — | Quote when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
