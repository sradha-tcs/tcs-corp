---
id: "QA-TC-teaser"
title: "Teaser — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/teaser/_teaser.json"]
relatedComponents: ["teaser"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Teaser — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-teaser |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Teaser block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/teaser/_teaser.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (41)](#test-cases-41)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (41)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-TEASER-001 | Functional (smoke) | — | Teaser renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 11 of 11 pages fail: shared failed request (DEF-002, DEF-001); own failures on /design-block-master/en/block-library/teaser/layouts | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001, DEF-008 | Automated (documentation program) | 8 November 2026 |
| TC-TEASER-002 | Authoring | — | An author adds the Teaser and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Teaser from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-TEASER-003 | Component variation | Title Type | Teaser: each choice of "Title Type" gives its presentation | 1. Select the Teaser 2. Set "Title Type" to each of: H1 (64px), H2 (48px), H3 (40px), H4 (28px), H5 (24px), H6 (20px) 3. Preview after each change | The rendering matches the variation (class or attribute h1, h2, h3, h4, h5, h6) | Not Run | — | — | — | — | — | — |
| TC-TEASER-004 | Component variation | Date Format | Teaser: each choice of "Date Format" gives its presentation | 1. Select the Teaser 2. Set "Date Format" to each of: DD-MM-YYYY, MM-DD-YYYY, MMM d, yyyy, DD/MM/YY 3. Preview after each change | The rendering matches the variation (class or attribute dd-mm-yyyy, mm-dd-yyyy, mmm-d-yyyy, dd/mm/yy) | Not Run | — | — | — | — | — | — |
| TC-TEASER-005 | Component variation | Image type | Teaser: each choice of "Image type" gives its presentation | 1. Select the Teaser 2. Set "Image type" to each of: Default, Lottie 3. Preview after each change | The rendering matches the variation (class or attribute lottie) | Not Run | — | — | — | — | — | — |
| TC-TEASER-006 | Component variation | Image position | Teaser: each choice of "Image position" gives its presentation | 1. Select the Teaser 2. Set "Image position" to each of: Left, Right, Top, Bottom 3. Preview after each change | The rendering matches the variation (class or attribute left, right, top, bottom) | Not Run | — | — | — | — | — | — |
| TC-TEASER-007 | Component variation | Image position (mobile) | Teaser: each choice of "Image position (mobile)" gives its presentation | 1. Select the Teaser 2. Set "Image position (mobile)" to each of: Default, Top, Bottom 3. Preview after each change | The rendering matches the variation (class or attribute mobile-image-top, mobile-image-bottom) | Not Run | — | — | — | — | — | — |
| TC-TEASER-008 | Component variation | Image ratio | Teaser: each choice of "Image ratio" gives its presentation | 1. Select the Teaser 2. Set "Image ratio" to each of: Default (10:9; 16:9 above or below the text; original in Text split), Portrait (8:9), Square (1:1), Original 3. Preview after each change | The rendering matches the variation (class or attribute ratio-8-9, ratio-1-1, ratio-original) | Not Run | — | — | — | — | — | — |
| TC-TEASER-009 | Component variation | Image corners | Teaser: each choice of "Image corners" gives its presentation | 1. Select the Teaser 2. Set "Image corners" to each of: Rounded, Square 3. Preview after each change | The rendering matches the variation (class or attribute square) | Not Run | — | — | — | — | — | — |
| TC-TEASER-010 | Component variation | Links (authored before Link items) › CTA Link Type | Teaser: each choice of "Links (authored before Link items) › CTA Link Type" gives its presentation | 1. Select the Teaser 2. Set "Links (authored before Link items) › CTA Link Type" to each of: Default, Open in New Window 3. Preview after each change | The rendering matches the variation (class or attribute new-window) | Not Run | — | — | — | — | — | — |
| TC-TEASER-011 | Component variation | Links (authored before Link items) › CTA Link Style | Teaser: each choice of "Links (authored before Link items) › CTA Link Style" gives its presentation | 1. Select the Teaser 2. Set "Links (authored before Link items) › CTA Link Style" to each of: Text link, List, Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) 3. Preview after each change | The rendering matches the variation (class or attribute list, primary, primary-no-arrow, secondary, secondary-no-arrow) | Not Run | — | — | — | — | — | — |
| TC-TEASER-012 | Component variation | Links (authored before Link items) › CTA Background | Teaser: each choice of "Links (authored before Link items) › CTA Background" gives its presentation | 1. Select the Teaser 2. Set "Links (authored before Link items) › CTA Background" to each of: Style default, White, Blue, Translucent white 3. Preview after each change | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | Not Run | — | — | — | — | — | — |
| TC-TEASER-013 | Component variation | Links (authored before Link items) › CTA Shape | Teaser: each choice of "Links (authored before Link items) › CTA Shape" gives its presentation | 1. Select the Teaser 2. Set "Links (authored before Link items) › CTA Shape" to each of: Style default, Rectangle 3. Preview after each change | The rendering matches the variation (class or attribute button-rectangle) | Not Run | — | — | — | — | — | — |
| TC-TEASER-014 | Component variation | List arrow | Teaser: each choice of "List arrow" gives its presentation | 1. Select the Teaser 2. Set "List arrow" to each of: Right, Down right, None 3. Preview after each change | The rendering matches the variation (class or attribute arrow-down-right, arrow-none) | Not Run | — | — | — | — | — | — |
| TC-TEASER-015 | Component variation | Primary CTA Link Type | Teaser: each choice of "Primary CTA Link Type" gives its presentation | 1. Select the Teaser 2. Set "Primary CTA Link Type" to each of: Default, Open in New Window 3. Preview after each change | The rendering matches the variation (class or attribute new-window) | Not Run | — | — | — | — | — | — |
| TC-TEASER-016 | Component variation | Primary CTA Link Style | Teaser: each choice of "Primary CTA Link Style" gives its presentation | 1. Select the Teaser 2. Set "Primary CTA Link Style" to each of: Text link, List, Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) 3. Preview after each change | The rendering matches the variation (class or attribute tertiary, list, primary, primary-no-arrow, secondary, secondary-no-arrow) | Not Run | — | — | — | — | — | — |
| TC-TEASER-017 | Component variation | Primary CTA Background | Teaser: each choice of "Primary CTA Background" gives its presentation | 1. Select the Teaser 2. Set "Primary CTA Background" to each of: Style default, White, Blue, Translucent white 3. Preview after each change | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | Not Run | — | — | — | — | — | — |
| TC-TEASER-018 | Component variation | Primary CTA Shape | Teaser: each choice of "Primary CTA Shape" gives its presentation | 1. Select the Teaser 2. Set "Primary CTA Shape" to each of: Style default, Rectangle 3. Preview after each change | The rendering matches the variation (class or attribute button-rectangle) | Not Run | — | — | — | — | — | — |
| TC-TEASER-019 | Component variation | Secondary CTA Link Type | Teaser: each choice of "Secondary CTA Link Type" gives its presentation | 1. Select the Teaser 2. Set "Secondary CTA Link Type" to each of: Default, Open in New Window 3. Preview after each change | The rendering matches the variation (class or attribute new-window) | Not Run | — | — | — | — | — | — |
| TC-TEASER-020 | Component variation | Secondary CTA Link Style | Teaser: each choice of "Secondary CTA Link Style" gives its presentation | 1. Select the Teaser 2. Set "Secondary CTA Link Style" to each of: Text link, List, Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) 3. Preview after each change | The rendering matches the variation (class or attribute tertiary, list, primary, primary-no-arrow, secondary, secondary-no-arrow) | Not Run | — | — | — | — | — | — |
| TC-TEASER-021 | Component variation | Secondary CTA Background | Teaser: each choice of "Secondary CTA Background" gives its presentation | 1. Select the Teaser 2. Set "Secondary CTA Background" to each of: Style default, White, Blue, Translucent white 3. Preview after each change | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | Not Run | — | — | — | — | — | — |
| TC-TEASER-022 | Component variation | Secondary CTA Shape | Teaser: each choice of "Secondary CTA Shape" gives its presentation | 1. Select the Teaser 2. Set "Secondary CTA Shape" to each of: Style default, Rectangle 3. Preview after each change | The rendering matches the variation (class or attribute button-rectangle) | Not Run | — | — | — | — | — | — |
| TC-TEASER-023 | Component variation | Layout | Teaser: each choice of "Layout" gives its presentation | 1. Select the Teaser 2. Set "Layout" to each of: Image & Text, Text split (title left, text right), Background image, Card, Image collage 3. Preview after each change | The rendering matches the variation (class or attribute no-image, background, card, image-collage) | Not Run | — | — | — | — | — | — |
| TC-TEASER-024 | Component variation | BG Color | Teaser: each choice of "BG Color" gives its presentation | 1. Select the Teaser 2. Set "BG Color" to each of: Default, Grey, Dark, Dark green, Navy 3. Preview after each change | The rendering matches the variation (class or attribute grey, dark, dark-green, navy) | Not Run | — | — | — | — | — | — |
| TC-TEASER-025 | Component variation | Text alignment | Teaser: each choice of "Text alignment" gives its presentation | 1. Select the Teaser 2. Set "Text alignment" to each of: Layout default, Left, Center, Right, Justify 3. Preview after each change | The rendering matches the variation (class or attribute text-left, text-center, text-right, text-justify) | Not Run | — | — | — | — | — | — |
| TC-TEASER-026 | Component variation | Vertical alignment | Teaser: each choice of "Vertical alignment" gives its presentation | 1. Select the Teaser 2. Set "Vertical alignment" to each of: Layout default, Top, Center, Bottom 3. Preview after each change | The rendering matches the variation (class or attribute valign-top, valign-middle, valign-bottom) | Not Run | — | — | — | — | — | — |
| TC-TEASER-027 | Component variation | Title weight | Teaser: each choice of "Title weight" gives its presentation | 1. Select the Teaser 2. Set "Title weight" to each of: Layout default, Regular, Semibold 3. Preview after each change | The rendering matches the variation (class or attribute title-regular, title-semibold) | Not Run | — | — | — | — | — | — |
| TC-TEASER-028 | Component variation | Title color | Teaser: each choice of "Title color" gives its presentation | 1. Select the Teaser 2. Set "Title color" to each of: Style default, Dark, White, Light blue 3. Preview after each change | The rendering matches the variation (class or attribute title-dark, title-white, title-light-blue) | Not Run | — | — | — | — | — | — |
| TC-TEASER-029 | Component variation | Description size | Teaser: each choice of "Description size" gives its presentation | 1. Select the Teaser 2. Set "Description size" to each of: Layout default, Regular (18px), Large (24px) 3. Preview after each change | The rendering matches the variation (class or attribute text-regular, text-large) | Not Run | — | — | — | — | — | — |
| TC-TEASER-030 | Component variation | Eyebrow Style | Teaser: each choice of "Eyebrow Style" gives its presentation | 1. Select the Teaser 2. Set "Eyebrow Style" to each of: Brand, Label (uppercase, grey), Grey, White 3. Preview after each change | The rendering matches the variation (class or attribute eyebrow-label, eyebrow-grey, eyebrow-white) | Not Run | — | — | — | — | — | — |
| TC-TEASER-031 | Component variation | Top spacing | Teaser: each choice of "Top spacing" gives its presentation | 1. Select the Teaser 2. Set "Top spacing" to each of: Default, Page header (extra space above) 3. Preview after each change | The rendering matches the variation (class or attribute spacing-header) | Not Run | — | — | — | — | — | — |
| TC-TEASER-032 | Component variation | CTA Link Type | Link: each choice of "CTA Link Type" gives its presentation | 1. Select the Link 2. Set "CTA Link Type" to each of: Default, Open in New Window 3. Preview after each change | The rendering matches the variation (class or attribute new-window) | Not Run | — | — | — | — | — | — |
| TC-TEASER-033 | Component variation | CTA Link Style | Link: each choice of "CTA Link Style" gives its presentation | 1. Select the Link 2. Set "CTA Link Style" to each of: Text link, List, Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) 3. Preview after each change | The rendering matches the variation (class or attribute list, primary, primary-no-arrow, secondary, secondary-no-arrow) | Not Run | — | — | — | — | — | — |
| TC-TEASER-034 | Component variation | Button background | Link: each choice of "Button background" gives its presentation | 1. Select the Link 2. Set "Button background" to each of: Style default, White, Blue, Translucent white 3. Preview after each change | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | Not Run | — | — | — | — | — | — |
| TC-TEASER-035 | Component variation | Button shape | Link: each choice of "Button shape" gives its presentation | 1. Select the Link 2. Set "Button shape" to each of: Style default, Rectangle 3. Preview after each change | The rendering matches the variation (class or attribute button-rectangle) | Not Run | — | — | — | — | — | — |
| TC-TEASER-036 | Component variation | Image treatment | Collage image: each choice of "Image treatment" gives its presentation | 1. Select the Collage image 2. Set "Image treatment" to each of: Black and white, Normal 3. Preview after each change | The rendering matches the variation (class or attribute black-white, normal) | Not Run | — | — | — | — | — | — |
| TC-TEASER-037 | Boundary | — | Teaser with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-TEASER-038 | Negative | — | Teaser with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-TEASER-039 | Accessibility | — | Teaser meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 2 page(s): /design-block-master/en/block-library/teaser: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids \| /design-block-master/en/block-library/teaser/title-sizes-and-weights: 0 img without alt, 0 unnamed buttons, 3 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-TEASER-040 | Responsive | — | Teaser at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 11 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 8 November 2026 |
| TC-TEASER-041 | Error recovery | — | Teaser when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
