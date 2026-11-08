---
id: "QA-TC-columns-container"
title: "Columns Container — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/columns-container/_columns-container.json"]
relatedComponents: ["columns-container"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Columns Container — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-columns-container |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Columns Container block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/columns-container/_columns-container.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (25)](#test-cases-25)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (25)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-COLUMNS-CONTAINER-001 | Functional (smoke) | — | Columns Container renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 4 of 4 pages fail: shared failed request (DEF-002, DEF-001) | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001 | Automated (documentation program) | 8 November 2026 |
| TC-COLUMNS-CONTAINER-002 | Authoring | — | An author adds the Columns Container and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Columns Container from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-003 | Component variation | Style | Columns Container: each choice of "Style" gives its presentation | 1. Select the Columns Container 2. Set "Style" to each of: Columns Container, Highlight 3. Preview after each change | The rendering matches the variation (class or attribute columns-container-section, highlight) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-004 | Component variation | BG Color | Columns Container: each choice of "BG Color" gives its presentation | 1. Select the Columns Container 2. Set "BG Color" to each of: Default, Grey, Dark, Dark green, Navy 3. Preview after each change | The rendering matches the variation (class or attribute bg-grey, bg-dark, bg-dark-green, bg-navy) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-005 | Component variation | Width Type | Columns Container: each choice of "Width Type" gives its presentation | 1. Select the Columns Container 2. Set "Width Type" to each of: Full Width, Fixed Width 3. Preview after each change | The rendering matches the variation (class or attribute full-width, fixed-width) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-006 | Component variation | Columns per row | Columns Container: each choice of "Columns per row" gives its presentation | 1. Select the Columns Container 2. Set "Columns per row" to each of: Automatic, 1, 2, 3, 4 3. Preview after each change | The rendering matches the variation (class or attribute auto, 1, 2, 3, 4) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-007 | Component variation | Gap | Columns Container: each choice of "Gap" gives its presentation | 1. Select the Columns Container 2. Set "Gap" to each of: None, Small, Medium, Large 3. Preview after each change | The rendering matches the variation (class or attribute none, small, medium, large) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-008 | Component variation | Vertical alignment | Columns Container: each choice of "Vertical alignment" gives its presentation | 1. Select the Columns Container 2. Set "Vertical alignment" to each of: Top, Middle, Bottom, Stretch (equal heights) 3. Preview after each change | The rendering matches the variation (class or attribute top, middle, bottom, stretch) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-009 | Component variation | Side by side from | Columns Container: each choice of "Side by side from" gives its presentation | 1. Select the Columns Container 2. Set "Side by side from" to each of: Tablet (600px), Desktop (900px), Large desktop (1200px) 3. Preview after each change | The rendering matches the variation (class or attribute tablet, desktop, large) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-010 | Component variation | Animation Type | Columns Container: each choice of "Animation Type" gives its presentation | 1. Select the Columns Container 2. Set "Animation Type" to each of: None, Fade in, Fade up, Fade down, Fade left, Fade right, Slide up, Slide down, Slide left, Slide right, Scale in 3. Preview after each change | The rendering matches the variation (class or attribute motion-fade-in, motion-fade-up, motion-fade-down, motion-fade-left, motion-fade-right, motion-slide-up, ...) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-011 | Component variation | Motion Speed | Columns Container: each choice of "Motion Speed" gives its presentation | 1. Select the Columns Container 2. Set "Motion Speed" to each of: Medium, Fast, Slow 3. Preview after each change | The rendering matches the variation (class or attribute motion-fast, motion-slow) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-012 | Component variation | Animation Trigger | Columns Container: each choice of "Animation Trigger" gives its presentation | 1. Select the Columns Container 2. Set "Animation Trigger" to each of: On Scroll / Viewport Entry, On Page Load 3. Preview after each change | The rendering matches the variation (class or attribute motion-on-load) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-013 | Component variation | Padding left | Columns Container: each choice of "Padding left" gives its presentation | 1. Select the Columns Container 2. Set "Padding left" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute pl-0, pl-100, pl-200, pl-300, pl-400, pl-500, ...) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-014 | Component variation | Padding right | Columns Container: each choice of "Padding right" gives its presentation | 1. Select the Columns Container 2. Set "Padding right" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute pr-0, pr-100, pr-200, pr-300, pr-400, pr-500, ...) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-015 | Component variation | Padding top | Columns Container: each choice of "Padding top" gives its presentation | 1. Select the Columns Container 2. Set "Padding top" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute pt-0, pt-100, pt-200, pt-300, pt-400, pt-500, ...) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-016 | Component variation | Padding bottom | Columns Container: each choice of "Padding bottom" gives its presentation | 1. Select the Columns Container 2. Set "Padding bottom" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute pb-0, pb-100, pb-200, pb-300, pb-400, pb-500, ...) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-017 | Component variation | Margin left | Columns Container: each choice of "Margin left" gives its presentation | 1. Select the Columns Container 2. Set "Margin left" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute ml-0, ml-100, ml-200, ml-300, ml-400, ml-500, ...) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-018 | Component variation | Margin right | Columns Container: each choice of "Margin right" gives its presentation | 1. Select the Columns Container 2. Set "Margin right" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute mr-0, mr-100, mr-200, mr-300, mr-400, mr-500, ...) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-019 | Component variation | Margin top | Columns Container: each choice of "Margin top" gives its presentation | 1. Select the Columns Container 2. Set "Margin top" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute mt-0, mt-100, mt-200, mt-300, mt-400, mt-500, ...) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-020 | Component variation | Margin bottom | Columns Container: each choice of "Margin bottom" gives its presentation | 1. Select the Columns Container 2. Set "Margin bottom" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute mb-0, mb-100, mb-200, mb-300, mb-400, mb-500, ...) | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-021 | Boundary | — | Columns Container with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-022 | Negative | — | Columns Container with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-COLUMNS-CONTAINER-023 | Accessibility | — | Columns Container meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 1 page(s): /design-block-master/en/block-library/columns-container: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-COLUMNS-CONTAINER-024 | Responsive | — | Columns Container at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Failed | Horizontal overflow on /design-block-master/en/block-library/columns-container/columns-of-blocks (1024 px) | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | DEF-004 | Automated (documentation program) | 8 November 2026 |
| TC-COLUMNS-CONTAINER-025 | Error recovery | — | Columns Container when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
