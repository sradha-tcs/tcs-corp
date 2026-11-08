---
id: "QA-TC-image-collage"
title: "Image Collage — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/image-collage/_image-collage.json"]
relatedComponents: ["image-collage"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Image Collage — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-image-collage |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Image Collage block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/image-collage/_image-collage.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (20)](#test-cases-20)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (20)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-IMAGE-COLLAGE-001 | Functional (smoke) | — | Image Collage renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Blocked | No block library page for this block | — | — | — | — | — |
| TC-IMAGE-COLLAGE-002 | Authoring | — | An author adds the Image Collage and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Image Collage from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-003 | Component variation | Title Type | Image Collage: each choice of "Title Type" gives its presentation | 1. Select the Image Collage 2. Set "Title Type" to each of: H1, H2, H3, H4, H5, H6 3. Preview after each change | The rendering matches the variation (class or attribute h1, h2, h3, h4, h5, h6) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-004 | Component variation | Primary CTA Link Type | Image Collage: each choice of "Primary CTA Link Type" gives its presentation | 1. Select the Image Collage 2. Set "Primary CTA Link Type" to each of: Default, Open in New Window 3. Preview after each change | The rendering matches the variation (class or attribute new-window) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-005 | Component variation | Primary CTA Link Style | Image Collage: each choice of "Primary CTA Link Style" gives its presentation | 1. Select the Image Collage 2. Set "Primary CTA Link Style" to each of: Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) 3. Preview after each change | The rendering matches the variation (class or attribute primary, primary-no-arrow, secondary, secondary-no-arrow) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-006 | Component variation | Primary CTA Background | Image Collage: each choice of "Primary CTA Background" gives its presentation | 1. Select the Image Collage 2. Set "Primary CTA Background" to each of: Style default, White, Blue, Translucent white 3. Preview after each change | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-007 | Component variation | Primary CTA Shape | Image Collage: each choice of "Primary CTA Shape" gives its presentation | 1. Select the Image Collage 2. Set "Primary CTA Shape" to each of: Style default, Rectangle 3. Preview after each change | The rendering matches the variation (class or attribute button-rectangle) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-008 | Component variation | Secondary CTA Link Type | Image Collage: each choice of "Secondary CTA Link Type" gives its presentation | 1. Select the Image Collage 2. Set "Secondary CTA Link Type" to each of: Default, Open in New Window 3. Preview after each change | The rendering matches the variation (class or attribute new-window) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-009 | Component variation | Secondary CTA Link Style | Image Collage: each choice of "Secondary CTA Link Style" gives its presentation | 1. Select the Image Collage 2. Set "Secondary CTA Link Style" to each of: Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) 3. Preview after each change | The rendering matches the variation (class or attribute primary, primary-no-arrow, secondary, secondary-no-arrow) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-010 | Component variation | Secondary CTA Background | Image Collage: each choice of "Secondary CTA Background" gives its presentation | 1. Select the Image Collage 2. Set "Secondary CTA Background" to each of: Style default, White, Blue, Translucent white 3. Preview after each change | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-011 | Component variation | Secondary CTA Shape | Image Collage: each choice of "Secondary CTA Shape" gives its presentation | 1. Select the Image Collage 2. Set "Secondary CTA Shape" to each of: Style default, Rectangle 3. Preview after each change | The rendering matches the variation (class or attribute button-rectangle) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-012 | Component variation | Title weight | Image Collage: each choice of "Title weight" gives its presentation | 1. Select the Image Collage 2. Set "Title weight" to each of: Layout default, Regular, Semibold 3. Preview after each change | The rendering matches the variation (class or attribute title-regular, title-semibold) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-013 | Component variation | Description size | Image Collage: each choice of "Description size" gives its presentation | 1. Select the Image Collage 2. Set "Description size" to each of: Layout default, Regular (18px), Large (24px) 3. Preview after each change | The rendering matches the variation (class or attribute text-regular, text-large) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-014 | Component variation | Background color | Image Collage: each choice of "Background color" gives its presentation | 1. Select the Image Collage 2. Set "Background color" to each of: Dark, Navy 3. Preview after each change | The rendering matches the variation (class or attribute bg-navy) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-015 | Component variation | Image treatment | Collage image item: each choice of "Image treatment" gives its presentation | 1. Select the Collage image item 2. Set "Image treatment" to each of: Black and white, Normal 3. Preview after each change | The rendering matches the variation (class or attribute black-white, normal) | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-016 | Boundary | — | Image Collage with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-017 | Negative | — | Image Collage with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-IMAGE-COLLAGE-018 | Accessibility | — | Image Collage meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks found no issue; keyboard and screen reader checks not run | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-IMAGE-COLLAGE-019 | Responsive | — | Image Collage at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Blocked | No block library page for this block | — | — | — | — | — |
| TC-IMAGE-COLLAGE-020 | Error recovery | — | Image Collage when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
