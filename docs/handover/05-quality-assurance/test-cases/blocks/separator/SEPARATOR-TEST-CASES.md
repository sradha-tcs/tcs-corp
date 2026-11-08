---
id: "QA-TC-separator"
title: "Separator — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/separator/_separator.json"]
relatedComponents: ["separator"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Separator — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-separator |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Separator block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/separator/_separator.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Test cases (39)](#test-cases-39)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Test cases (39)

Requirement / story: see the [traceability](../../../markdown/REQUIREMENT-TEST-TRACEABILITY.md). Status values: Passed and Failed only for checks that ran with evidence; otherwise Not Run, Blocked, Not Applicable or Requires Manual Validation.

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-SEPARATOR-001 | Functional (smoke) | — | Separator renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 4 of 4 pages fail: shared failed request (DEF-002, DEF-001) | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001 | Automated (documentation program) | 8 November 2026 |
| TC-SEPARATOR-002 | Authoring | — | An author adds the Separator and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Separator from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-003 | Component variation | Accessibility mode | Separator: each choice of "Accessibility mode" gives its presentation | 1. Select the Separator 2. Set "Accessibility mode" to each of: Decorative (visual only), Semantic (a thematic break) 3. Preview after each change | The rendering matches the variation (class or attribute decorative, semantic) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-004 | Component variation | Separator variant | Separator: each choice of "Separator variant" gives its presentation | 1. Select the Separator 2. Set "Separator variant" to each of: Default, Subtle, Strong, Inset, Full width, Dotted, Dashed, Gradient, Branded 3. Preview after each change | The rendering matches the variation (class or attribute default, subtle, strong, inset, full-width, dotted, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-005 | Component variation | Theme | Separator: each choice of "Theme" gives its presentation | 1. Select the Separator 2. Set "Theme" to each of: Auto (as the section), Light background, Dark background, Brand background 3. Preview after each change | The rendering matches the variation (class or attribute auto, light, dark, brand) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-006 | Component variation | Line style | Separator: each choice of "Line style" gives its presentation | 1. Select the Separator 2. Set "Line style" to each of: As the variant, Solid, Dashed, Dotted, Gradient, None (spacing only) 3. Preview after each change | The rendering matches the variation (class or attribute solid, dashed, dotted, gradient, none) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-007 | Component variation | Line thickness | Separator: each choice of "Line thickness" gives its presentation | 1. Select the Separator 2. Set "Line thickness" to each of: As the variant, Thin (1px), Medium (2px), Thick (3px) 3. Preview after each change | The rendering matches the variation (class or attribute thin, medium, thick) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-008 | Component variation | Line colour | Separator: each choice of "Line colour" gives its presentation | 1. Select the Separator 2. Set "Line colour" to each of: As the variant, Default, Subtle, Neutral, Strong, Primary (brand), Secondary (light brand), Accent, Inverse (on dark) 3. Preview after each change | The rendering matches the variation (class or attribute default, subtle, neutral, strong, primary, secondary, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-009 | Component variation | Line opacity | Separator: each choice of "Line opacity" gives its presentation | 1. Select the Separator 2. Set "Line opacity" to each of: 25%, 50%, 75%, 100% 3. Preview after each change | The rendering matches the variation (class or attribute 25, 50, 75, 100) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-010 | Component variation | Separator width | Separator: each choice of "Separator width" gives its presentation | 1. Select the Separator 2. Set "Separator width" to each of: As the variant, 25%, 50%, 75%, 100%, Content width, Full bleed (section edge to edge) 3. Preview after each change | The rendering matches the variation (class or attribute 25-percent, 50-percent, 75-percent, 100-percent, content-width, full-bleed, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-011 | Component variation | Maximum width | Separator: each choice of "Maximum width" gives its presentation | 1. Select the Separator 2. Set "Maximum width" to each of: None, Small (320px), Medium (640px), Large (960px), Extra large (1280px), Content container 3. Preview after each change | The rendering matches the variation (class or attribute none, small, medium, large, extra-large, content-container) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-012 | Component variation | Alignment | Separator: each choice of "Alignment" gives its presentation | 1. Select the Separator 2. Set "Alignment" to each of: Start, Center, End 3. Preview after each change | The rendering matches the variation (class or attribute start, center, end) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-013 | Component variation | Start decoration | Separator: each choice of "Start decoration" gives its presentation | 1. Select the Separator 2. Set "Start decoration" to each of: None, Dot, Square, Diamond 3. Preview after each change | The rendering matches the variation (class or attribute none, dot, square, diamond) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-014 | Component variation | Center decoration | Separator: each choice of "Center decoration" gives its presentation | 1. Select the Separator 2. Set "Center decoration" to each of: None, Dot, Square, Diamond 3. Preview after each change | The rendering matches the variation (class or attribute none, dot, square, diamond) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-015 | Component variation | End decoration | Separator: each choice of "End decoration" gives its presentation | 1. Select the Separator 2. Set "End decoration" to each of: None, Dot, Square, Diamond 3. Preview after each change | The rendering matches the variation (class or attribute none, dot, square, diamond) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-016 | Component variation | Background contrast | Separator: each choice of "Background contrast" gives its presentation | 1. Select the Separator 2. Set "Background contrast" to each of: Standard, High (stronger line) 3. Preview after each change | The rendering matches the variation (class or attribute standard, high) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-017 | Component variation | Desktop width | Separator: each choice of "Desktop width" gives its presentation | 1. Select the Separator 2. Set "Desktop width" to each of: As Appearance, 25%, 50%, 75%, 100%, Content width, Full bleed (section edge to edge) 3. Preview after each change | The rendering matches the variation (class or attribute inherit, 25-percent, 50-percent, 75-percent, 100-percent, content-width, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-018 | Component variation | Desktop thickness | Separator: each choice of "Desktop thickness" gives its presentation | 1. Select the Separator 2. Set "Desktop thickness" to each of: As Appearance, Thin (1px), Medium (2px), Thick (3px) 3. Preview after each change | The rendering matches the variation (class or attribute inherit, thin, medium, thick) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-019 | Component variation | Desktop alignment | Separator: each choice of "Desktop alignment" gives its presentation | 1. Select the Separator 2. Set "Desktop alignment" to each of: As Appearance, Start, Center, End 3. Preview after each change | The rendering matches the variation (class or attribute inherit, start, center, end) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-020 | Component variation | Tablet width | Separator: each choice of "Tablet width" gives its presentation | 1. Select the Separator 2. Set "Tablet width" to each of: As Appearance, 25%, 50%, 75%, 100%, Content width, Full bleed (section edge to edge) 3. Preview after each change | The rendering matches the variation (class or attribute inherit, 25-percent, 50-percent, 75-percent, 100-percent, content-width, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-021 | Component variation | Tablet thickness | Separator: each choice of "Tablet thickness" gives its presentation | 1. Select the Separator 2. Set "Tablet thickness" to each of: As Appearance, Thin (1px), Medium (2px), Thick (3px) 3. Preview after each change | The rendering matches the variation (class or attribute inherit, thin, medium, thick) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-022 | Component variation | Tablet alignment | Separator: each choice of "Tablet alignment" gives its presentation | 1. Select the Separator 2. Set "Tablet alignment" to each of: As Appearance, Start, Center, End 3. Preview after each change | The rendering matches the variation (class or attribute inherit, start, center, end) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-023 | Component variation | Mobile width | Separator: each choice of "Mobile width" gives its presentation | 1. Select the Separator 2. Set "Mobile width" to each of: As Appearance, 25%, 50%, 75%, 100%, Content width, Full bleed (section edge to edge) 3. Preview after each change | The rendering matches the variation (class or attribute inherit, 25-percent, 50-percent, 75-percent, 100-percent, content-width, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-024 | Component variation | Mobile thickness | Separator: each choice of "Mobile thickness" gives its presentation | 1. Select the Separator 2. Set "Mobile thickness" to each of: As Appearance, Thin (1px), Medium (2px), Thick (3px) 3. Preview after each change | The rendering matches the variation (class or attribute inherit, thin, medium, thick) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-025 | Component variation | Mobile alignment | Separator: each choice of "Mobile alignment" gives its presentation | 1. Select the Separator 2. Set "Mobile alignment" to each of: As Appearance, Start, Center, End 3. Preview after each change | The rendering matches the variation (class or attribute inherit, start, center, end) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-026 | Component variation | Desktop top spacing | Separator: each choice of "Desktop top spacing" gives its presentation | 1. Select the Separator 2. Set "Desktop top spacing" to each of: Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) 3. Preview after each change | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-027 | Component variation | Desktop bottom spacing | Separator: each choice of "Desktop bottom spacing" gives its presentation | 1. Select the Separator 2. Set "Desktop bottom spacing" to each of: Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) 3. Preview after each change | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-028 | Component variation | Tablet top spacing | Separator: each choice of "Tablet top spacing" gives its presentation | 1. Select the Separator 2. Set "Tablet top spacing" to each of: Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) 3. Preview after each change | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-029 | Component variation | Tablet bottom spacing | Separator: each choice of "Tablet bottom spacing" gives its presentation | 1. Select the Separator 2. Set "Tablet bottom spacing" to each of: Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) 3. Preview after each change | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-030 | Component variation | Mobile top spacing | Separator: each choice of "Mobile top spacing" gives its presentation | 1. Select the Separator 2. Set "Mobile top spacing" to each of: Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) 3. Preview after each change | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-031 | Component variation | Mobile bottom spacing | Separator: each choice of "Mobile bottom spacing" gives its presentation | 1. Select the Separator 2. Set "Mobile bottom spacing" to each of: Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) 3. Preview after each change | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-032 | Component variation | Animate on view | Separator: each choice of "Animate on view" gives its presentation | 1. Select the Separator 2. Set "Animate on view" to each of: None, Fade, Draw from start, Draw from center 3. Preview after each change | The rendering matches the variation (class or attribute none, fade, draw-from-start, draw-from-center) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-033 | Component variation | Reduced motion fallback | Separator: each choice of "Reduced motion fallback" gives its presentation | 1. Select the Separator 2. Set "Reduced motion fallback" to each of: Show immediately, Short fade 3. Preview after each change | The rendering matches the variation (class or attribute static, fade) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-034 | Component variation | Print | Separator: each choice of "Print" gives its presentation | 1. Select the Separator 2. Set "Print" to each of: Show when printed, Hide when printed 3. Preview after each change | The rendering matches the variation (class or attribute show, hide) | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-035 | Boundary | — | Separator with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-036 | Negative | — | Separator with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-SEPARATOR-037 | Accessibility | — | Separator meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 1 page(s): /design-block-master/en/block-library/separator: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-SEPARATOR-038 | Responsive | — | Separator at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 4 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 8 November 2026 |
| TC-SEPARATOR-039 | Error recovery | — | Separator when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
