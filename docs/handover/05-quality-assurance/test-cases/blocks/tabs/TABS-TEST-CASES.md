---
id: "QA-TC-tabs"
title: "Tabs — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/tabs/_tabs.json"]
relatedComponents: ["tabs"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Tabs — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-tabs |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Tabs block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/tabs/_tabs.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (26)](#test-cases-26)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (26)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-TABS-001 | Functional (smoke) | — | Tabs renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 14 of 14 pages fail: shared failed request (DEF-002, DEF-001) | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001 | Automated (documentation program) | 8 November 2026 |
| TC-TABS-002 | Authoring | — | An author adds the Tabs and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Tabs from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-TABS-003 | Component variation | Component | Tabs Container: each choice of "Component" gives its presentation | 1. Select the Tabs Container 2. Set "Component" to each of: Tabs 3. Preview after each change | The rendering matches the variation (class or attribute tabs-section) | Not Run | — | — | — | — | — | — |
| TC-TABS-004 | Component variation | Width Type | Tabs Container: each choice of "Width Type" gives its presentation | 1. Select the Tabs Container 2. Set "Width Type" to each of: Full Width, Fixed Width 3. Preview after each change | The rendering matches the variation (class or attribute full-width, fixed-width) | Not Run | — | — | — | — | — | — |
| TC-TABS-005 | Component variation | Style | Tabs Container: each choice of "Style" gives its presentation | 1. Select the Tabs Container 2. Set "Style" to each of: Underline, Boxed, Pills 3. Preview after each change | The rendering matches the variation (class or attribute underline, boxed, pills) | Not Run | — | — | — | — | — | — |
| TC-TABS-006 | Component variation | Alignment | Tabs Container: each choice of "Alignment" gives its presentation | 1. Select the Tabs Container 2. Set "Alignment" to each of: Left, Center, Full width (stretch) 3. Preview after each change | The rendering matches the variation (class or attribute left, center, stretch) | Not Run | — | — | — | — | — | — |
| TC-TABS-007 | Component variation | Orientation | Tabs Container: each choice of "Orientation" gives its presentation | 1. Select the Tabs Container 2. Set "Orientation" to each of: Horizontal, Vertical 3. Preview after each change | The rendering matches the variation (class or attribute horizontal, vertical) | Not Run | — | — | — | — | — | — |
| TC-TABS-008 | Component variation | Animation Type | Tabs Container: each choice of "Animation Type" gives its presentation | 1. Select the Tabs Container 2. Set "Animation Type" to each of: None, Fade in, Fade up, Fade down, Fade left, Fade right, Slide up, Slide down, Slide left, Slide right, Scale in 3. Preview after each change | The rendering matches the variation (class or attribute motion-fade-in, motion-fade-up, motion-fade-down, motion-fade-left, motion-fade-right, motion-slide-up, ...) | Not Run | — | — | — | — | — | — |
| TC-TABS-009 | Component variation | Motion Speed | Tabs Container: each choice of "Motion Speed" gives its presentation | 1. Select the Tabs Container 2. Set "Motion Speed" to each of: Medium, Fast, Slow 3. Preview after each change | The rendering matches the variation (class or attribute motion-fast, motion-slow) | Not Run | — | — | — | — | — | — |
| TC-TABS-010 | Component variation | Animation Trigger | Tabs Container: each choice of "Animation Trigger" gives its presentation | 1. Select the Tabs Container 2. Set "Animation Trigger" to each of: On Scroll / Viewport Entry, On Page Load 3. Preview after each change | The rendering matches the variation (class or attribute motion-on-load) | Not Run | — | — | — | — | — | — |
| TC-TABS-011 | Component variation | Padding left | Tabs Container: each choice of "Padding left" gives its presentation | 1. Select the Tabs Container 2. Set "Padding left" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute pl-0, pl-100, pl-200, pl-300, pl-400, pl-500, ...) | Not Run | — | — | — | — | — | — |
| TC-TABS-012 | Component variation | Padding right | Tabs Container: each choice of "Padding right" gives its presentation | 1. Select the Tabs Container 2. Set "Padding right" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute pr-0, pr-100, pr-200, pr-300, pr-400, pr-500, ...) | Not Run | — | — | — | — | — | — |
| TC-TABS-013 | Component variation | Padding top | Tabs Container: each choice of "Padding top" gives its presentation | 1. Select the Tabs Container 2. Set "Padding top" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute pt-0, pt-100, pt-200, pt-300, pt-400, pt-500, ...) | Not Run | — | — | — | — | — | — |
| TC-TABS-014 | Component variation | Padding bottom | Tabs Container: each choice of "Padding bottom" gives its presentation | 1. Select the Tabs Container 2. Set "Padding bottom" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute pb-0, pb-100, pb-200, pb-300, pb-400, pb-500, ...) | Not Run | — | — | — | — | — | — |
| TC-TABS-015 | Component variation | Margin left | Tabs Container: each choice of "Margin left" gives its presentation | 1. Select the Tabs Container 2. Set "Margin left" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute ml-0, ml-100, ml-200, ml-300, ml-400, ml-500, ...) | Not Run | — | — | — | — | — | — |
| TC-TABS-016 | Component variation | Margin right | Tabs Container: each choice of "Margin right" gives its presentation | 1. Select the Tabs Container 2. Set "Margin right" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute mr-0, mr-100, mr-200, mr-300, mr-400, mr-500, ...) | Not Run | — | — | — | — | — | — |
| TC-TABS-017 | Component variation | Margin top | Tabs Container: each choice of "Margin top" gives its presentation | 1. Select the Tabs Container 2. Set "Margin top" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute mt-0, mt-100, mt-200, mt-300, mt-400, mt-500, ...) | Not Run | — | — | — | — | — | — |
| TC-TABS-018 | Component variation | Margin bottom | Tabs Container: each choice of "Margin bottom" gives its presentation | 1. Select the Tabs Container 2. Set "Margin bottom" to each of: Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) 3. Preview after each change | The rendering matches the variation (class or attribute mb-0, mb-100, mb-200, mb-300, mb-400, mb-500, ...) | Not Run | — | — | — | — | — | — |
| TC-TABS-019 | Component variation | Style | Tabs: each choice of "Style" gives its presentation | 1. Select the Tabs 2. Set "Style" to each of: Underline, Boxed, Pills 3. Preview after each change | The rendering matches the variation (class or attribute underline, boxed, pills) | Not Run | — | — | — | — | — | — |
| TC-TABS-020 | Component variation | Alignment | Tabs: each choice of "Alignment" gives its presentation | 1. Select the Tabs 2. Set "Alignment" to each of: Left, Center, Full width (stretch) 3. Preview after each change | The rendering matches the variation (class or attribute left, center, stretch) | Not Run | — | — | — | — | — | — |
| TC-TABS-021 | Component variation | Orientation | Tabs: each choice of "Orientation" gives its presentation | 1. Select the Tabs 2. Set "Orientation" to each of: Horizontal, Vertical 3. Preview after each change | The rendering matches the variation (class or attribute horizontal, vertical) | Not Run | — | — | — | — | — | — |
| TC-TABS-022 | Boundary | — | Tabs with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-TABS-023 | Negative | — | Tabs with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-TABS-024 | Accessibility | — | Tabs meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 6 page(s): /design-block-master/en/block-library/tabs: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids \| /design-block-master/en/block-library/tabs/fragments: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-TABS-025 | Responsive | — | Tabs at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 14 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 8 November 2026 |
| TC-TABS-026 | Error recovery | — | Tabs when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
