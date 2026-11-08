---
id: "QA-TC-list"
title: "List — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/list/_list.json"]
relatedComponents: ["list"]
relatedPages: []
confidence: "Medium"
primary: false
---

# List — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-list |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the List block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/list/_list.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (30)](#test-cases-30)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (30)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-LIST-001 | Functional (smoke) | — | List renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 15 of 15 pages fail: shared failed request (DEF-002, DEF-001) | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001 | Automated (documentation program) | 8 November 2026 |
| TC-LIST-002 | Authoring | — | An author adds the List and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the List from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-LIST-003 | Component variation | Heading type | List: each choice of "Heading type" gives its presentation | 1. Select the List 2. Set "Heading type" to each of: H2, H3, H4, H5, H6 3. Preview after each change | The rendering matches the variation (class or attribute h2, h3, h4, h5, h6) | Not Run | — | — | — | — | — | — |
| TC-LIST-004 | Component variation | CTA style | List: each choice of "CTA style" gives its presentation | 1. Select the List 2. Set "CTA style" to each of: Text link, Primary button, Secondary button 3. Preview after each change | The rendering matches the variation (class or attribute primary, secondary) | Not Run | — | — | — | — | — | — |
| TC-LIST-005 | Component variation | List source | List: each choice of "List source" gives its presentation | 1. Select the List 2. Set "List source" to each of: Child pages, Fixed list, Tagged pages 3. Preview after each change | The rendering matches the variation (class or attribute parent, fixed, tags) | Not Run | — | — | — | — | — | — |
| TC-LIST-006 | Component variation | Match | List: each choice of "Match" gives its presentation | 1. Select the List 2. Set "Match" to each of: Any of the tags, All of the tags 3. Preview after each change | The rendering matches the variation (class or attribute any, all) | Not Run | — | — | — | — | — | — |
| TC-LIST-007 | Component variation | Order by | List: each choice of "Order by" gives its presentation | 1. Select the List 2. Set "Order by" to each of: Manual (as authored; path order for pages), Title, Last modified 3. Preview after each change | The rendering matches the variation (class or attribute manual, title, lastModified) | Not Run | — | — | — | — | — | — |
| TC-LIST-008 | Component variation | Sort order | List: each choice of "Sort order" gives its presentation | 1. Select the List 2. Set "Sort order" to each of: Ascending, Descending 3. Preview after each change | The rendering matches the variation (class or attribute ascending, descending) | Not Run | — | — | — | — | — | — |
| TC-LIST-009 | Component variation | Card style | List: each choice of "Card style" gives its presentation | 1. Select the List 2. Set "Card style" to each of: Image card, Panel, Report, Statistic, Mixed 3. Preview after each change | The rendering matches the variation (class or attribute image, panel, report, stat, mixed) | Not Run | — | — | — | — | — | — |
| TC-LIST-010 | Component variation | Card colour | List: each choice of "Card colour" gives its presentation | 1. Select the List 2. Set "Card colour" to each of: Default for the style, Dark, Navy, Brand blue, Light blue, Light grey, Mid grey, Grey gradient, Image background 3. Preview after each change | The rendering matches the variation (class or attribute dark, navy, brand, brand-light, grey, mid-grey, ...) | Not Run | — | — | — | — | — | — |
| TC-LIST-011 | Component variation | Image ratio | List: each choice of "Image ratio" gives its presentation | 1. Select the List 2. Set "Image ratio" to each of: 16:9, 1:1, 4:3, 3:2 3. Preview after each change | The rendering matches the variation (class or attribute 16-9, 1-1, 4-3, 3-2) | Not Run | — | — | — | — | — | — |
| TC-LIST-012 | Component variation | Panel height | List: each choice of "Panel height" gives its presentation | 1. Select the List 2. Set "Panel height" to each of: Portrait (2:3), Compact, Content 3. Preview after each change | The rendering matches the variation (class or attribute portrait, compact, auto) | Not Run | — | — | — | — | — | — |
| TC-LIST-013 | Component variation | Date format | List: each choice of "Date format" gives its presentation | 1. Select the List 2. Set "Date format" to each of: 04 Sep 26, 04-09-2026, 09-04-2026, Sep 4, 2026, 04/09/26, 4th September 2026 3. Preview after each change | The rendering matches the variation (class or attribute dd-mmm-yy, dd-mm-yyyy, mm-dd-yyyy, mmm-d-yyyy, dd/mm/yy, do-mmmm-yyyy) | Not Run | — | — | — | — | — | — |
| TC-LIST-014 | Component variation | Image loading | List: each choice of "Image loading" gives its presentation | 1. Select the List 2. Set "Image loading" to each of: Lazy, Eager (first screen) 3. Preview after each change | The rendering matches the variation (class or attribute lazy, eager) | Not Run | — | — | — | — | — | — |
| TC-LIST-015 | Component variation | Desktop display | List: each choice of "Desktop display" gives its presentation | 1. Select the List 2. Set "Desktop display" to each of: Grid, Horizontal scroll 3. Preview after each change | The rendering matches the variation (class or attribute grid, horizontal-scroll) | Not Run | — | — | — | — | — | — |
| TC-LIST-016 | Component variation | Tablet display | List: each choice of "Tablet display" gives its presentation | 1. Select the List 2. Set "Tablet display" to each of: Grid, Horizontal scroll 3. Preview after each change | The rendering matches the variation (class or attribute grid, horizontal-scroll) | Not Run | — | — | — | — | — | — |
| TC-LIST-017 | Component variation | Mobile display | List: each choice of "Mobile display" gives its presentation | 1. Select the List 2. Set "Mobile display" to each of: Grid, Horizontal scroll 3. Preview after each change | The rendering matches the variation (class or attribute grid, horizontal-scroll) | Not Run | — | — | — | — | — | — |
| TC-LIST-018 | Component variation | Snap alignment | List: each choice of "Snap alignment" gives its presentation | 1. Select the List 2. Set "Snap alignment" to each of: Start, Center 3. Preview after each change | The rendering matches the variation (class or attribute start, center) | Not Run | — | — | — | — | — | — |
| TC-LIST-019 | Component variation | Scroll step | List: each choice of "Scroll step" gives its presentation | 1. Select the List 2. Set "Scroll step" to each of: One card, Viewport 3. Preview after each change | The rendering matches the variation (class or attribute one-card, viewport) | Not Run | — | — | — | — | — | — |
| TC-LIST-020 | Component variation | Edge | List: each choice of "Edge" gives its presentation | 1. Select the List 2. Set "Edge" to each of: Cards run to the edge, Inside the content width 3. Preview after each change | The rendering matches the variation (class or attribute bleed, none) | Not Run | — | — | — | — | — | — |
| TC-LIST-021 | Component variation | When there are no items | List: each choice of "When there are no items" gives its presentation | 1. Select the List 2. Set "When there are no items" to each of: Hide the list, Show a message, Show the fallback items 3. Preview after each change | The rendering matches the variation (class or attribute hide, message, fallback) | Not Run | — | — | — | — | — | — |
| TC-LIST-022 | Component variation | Style options | List: each choice of "Style options" gives its presentation | 1. Select the List 2. Set "Style options" to each of: Compact statistic title, Dividers between rows, Header centred 3. Preview after each change | The rendering matches the variation (class or attribute stat-compact, dividers, header-center) | Not Run | — | — | — | — | — | — |
| TC-LIST-023 | Component variation | Open in a new tab | List Item: each choice of "Open in a new tab" gives its presentation | 1. Select the List Item 2. Set "Open in a new tab" to each of: As the list, Yes, No 3. Preview after each change | The rendering matches the variation (class or attribute true, false) | Not Run | — | — | — | — | — | — |
| TC-LIST-024 | Component variation | Card style | List Item: each choice of "Card style" gives its presentation | 1. Select the List Item 2. Set "Card style" to each of: As the list, Image card, Panel, Report, Statistic 3. Preview after each change | The rendering matches the variation (class or attribute image, panel, report, stat) | Not Run | — | — | — | — | — | — |
| TC-LIST-025 | Component variation | Card colour | List Item: each choice of "Card colour" gives its presentation | 1. Select the List Item 2. Set "Card colour" to each of: As the list, Dark, Navy, Brand blue, Light blue, Light grey, Mid grey, Grey gradient, Image background 3. Preview after each change | The rendering matches the variation (class or attribute dark, navy, brand, brand-light, grey, mid-grey, ...) | Not Run | — | — | — | — | — | — |
| TC-LIST-026 | Boundary | — | List with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-LIST-027 | Negative | — | List with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-LIST-028 | Accessibility | — | List meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 1 page(s): /design-block-master/en/block-library/list: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-LIST-029 | Responsive | — | List at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 15 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 8 November 2026 |
| TC-LIST-030 | Error recovery | — | List when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
