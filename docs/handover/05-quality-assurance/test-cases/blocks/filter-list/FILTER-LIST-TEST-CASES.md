---
id: "QA-TC-filter-list"
title: "Filter List — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/filter-list/_filter-list.json"]
relatedComponents: ["filter-list"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Filter List — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-filter-list |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Filter List block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/filter-list/_filter-list.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (17)](#test-cases-17)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (17)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-FILTER-LIST-001 | Functional (smoke) | — | Filter List renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 7 of 7 pages fail: shared failed request (DEF-002, DEF-001) | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001 | Automated (documentation program) | 8 November 2026 |
| TC-FILTER-LIST-002 | Authoring | — | An author adds the Filter List and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Filter List from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-003 | Component variation | Default layout | Filter List: each choice of "Default layout" gives its presentation | 1. Select the Filter List 2. Set "Default layout" to each of: Masonry, Grid, List 3. Preview after each change | The rendering matches the variation (class or attribute masonry, grid, list) | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-004 | Component variation | Datasource | Filter List: each choice of "Datasource" gives its presentation | 1. Select the Filter List 2. Set "Datasource" to each of: Query Index, Manual List 3. Preview after each change | The rendering matches the variation (class or attribute query-index, manual) | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-005 | Component variation | Page types | Filter List: each choice of "Page types" gives its presentation | 1. Select the Filter List 2. Set "Page types" to each of: Article, Blog, Press release 3. Preview after each change | The rendering matches the variation (class or attribute article, blog, press-release) | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-006 | Component variation | Content types | Filter List: each choice of "Content types" gives its presentation | 1. Select the Filter List 2. Set "Content types" to each of: Article, Blog, Insights, Case study, Whitepaper, Report, News, Event, Press release 3. Preview after each change | The rendering matches the variation (class or attribute article, blog, insights, case-study, whitepaper, report, ...) | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-007 | Component variation | Sort by | Filter List: each choice of "Sort by" gives its presentation | 1. Select the Filter List 2. Set "Sort by" to each of: Latest First, Featured First, Priority, Alphabetical 3. Preview after each change | The rendering matches the variation (class or attribute latest, featured, priority, alphabetical) | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-008 | Component variation | Filter logic | Filter List: each choice of "Filter logic" gives its presentation | 1. Select the Filter List 2. Set "Filter logic" to each of: AND, OR 3. Preview after each change | The rendering matches the variation (class or attribute and, or) | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-009 | Component variation | Card style | Filter List: each choice of "Card style" gives its presentation | 1. Select the Filter List 2. Set "Card style" to each of: Default, Compact, Featured, Mixed 3. Preview after each change | The rendering matches the variation (class or attribute default, compact, featured, mixed) | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-010 | Component variation | Featured rule | Filter List: each choice of "Featured rule" gives its presentation | 1. Select the Filter List 2. Set "Featured rule" to each of: Marked as featured (featured metadata), Priority 1 to 3 (priority metadata), Manual 3. Preview after each change | The rendering matches the variation (class or attribute featured, priority, manual) | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-011 | Component variation | Hero rule | Filter List: each choice of "Hero rule" gives its presentation | 1. Select the Filter List 2. Set "Hero rule" to each of: Latest, Featured, Manual 3. Preview after each change | The rendering matches the variation (class or attribute latest, featured, manual) | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-012 | Component variation | Use | Filter Page: each choice of "Use" gives its presentation | 1. Select the Filter Page 2. Set "Use" to each of: Listed (Manual List), Featured 3. Preview after each change | The rendering matches the variation (class or attribute listed, featured) | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-013 | Boundary | — | Filter List with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-014 | Negative | — | Filter List with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-FILTER-LIST-015 | Accessibility | — | Filter List meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 1 page(s): /design-block-master/en/block-library/filter-list: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-FILTER-LIST-016 | Responsive | — | Filter List at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 7 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 8 November 2026 |
| TC-FILTER-LIST-017 | Error recovery | — | Filter List when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
