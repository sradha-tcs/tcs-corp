---
id: "QA-TC-hero"
title: "Hero — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/hero/_hero.json"]
relatedComponents: ["hero"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Hero — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-hero |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Hero block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/hero/_hero.json |
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
| TC-HERO-001 | Functional (smoke) | — | Hero renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 5 of 5 pages fail: shared failed request (DEF-002, DEF-001); own failures on /design-block-master/en/block-library/hero/hero-overview | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001, DEF-006 | Automated (documentation program) | 8 November 2026 |
| TC-HERO-002 | Authoring | — | An author adds the Hero and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Hero from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-HERO-003 | Component variation | Hero Image type | Hero: each choice of "Hero Image type" gives its presentation | 1. Select the Hero 2. Set "Hero Image type" to each of: Default, Lotto 3. Preview after each change | The rendering matches the variation (class or attribute lottie) | Not Run | — | — | — | — | — | — |
| TC-HERO-004 | Component variation | Hero View | Hero: each choice of "Hero View" gives its presentation | 1. Select the Hero 2. Set "Hero View" to each of: Default, Contained image 3. Preview after each change | The rendering matches the variation (class or attribute media-contained) | Not Run | — | — | — | — | — | — |
| TC-HERO-005 | Component variation | Title heading level | Hero: each choice of "Title heading level" gives its presentation | 1. Select the Hero 2. Set "Title heading level" to each of: H1, H2 3. Preview after each change | The rendering matches the variation (class or attribute h1, h2) | Not Run | — | — | — | — | — | — |
| TC-HERO-006 | Component variation | CTA List › CTA Text color | Hero: each choice of "CTA List › CTA Text color" gives its presentation | 1. Select the Hero 2. Set "CTA List › CTA Text color" to each of: Default (Black), White 3. Preview after each change | The rendering matches the variation (class or attribute cta-text-black, cta-text-white) | Not Run | — | — | — | — | — | — |
| TC-HERO-007 | Component variation | CTA List › CTA Link Type | Hero: each choice of "CTA List › CTA Link Type" gives its presentation | 1. Select the Hero 2. Set "CTA List › CTA Link Type" to each of: Default, Open in New Window 3. Preview after each change | The rendering matches the variation (class or attribute same-window, new-window) | Not Run | — | — | — | — | — | — |
| TC-HERO-008 | Component variation | CTA List › CTA view | Hero: each choice of "CTA List › CTA view" gives its presentation | 1. Select the Hero 2. Set "CTA List › CTA view" to each of: Default, Primary, Secondary 3. Preview after each change | The rendering matches the variation (class or attribute default, primary, secondary) | Not Run | — | — | — | — | — | — |
| TC-HERO-009 | Component variation | CTA List › Primary CTA BG Color (Primary only) | Hero: each choice of "CTA List › Primary CTA BG Color (Primary only)" gives its presentation | 1. Select the Hero 2. Set "CTA List › Primary CTA BG Color (Primary only)" to each of: Default, Blue-cyan (azure) 3. Preview after each change | The rendering matches the variation (class or attribute primary-bg-default, primary-bg-azure) | Not Run | — | — | — | — | — | — |
| TC-HERO-010 | Component variation | CTA List › Secondary CTA BG Color (Secondary only) | Hero: each choice of "CTA List › Secondary CTA BG Color (Secondary only)" gives its presentation | 1. Select the Hero 2. Set "CTA List › Secondary CTA BG Color (Secondary only)" to each of: Default (transparent), Light grey, Black 40% 3. Preview after each change | The rendering matches the variation (class or attribute secondary-bg-default, secondary-bg-light-grey, secondary-bg-black-40) | Not Run | — | — | — | — | — | — |
| TC-HERO-011 | Component variation | CTA List › Secondary CTA Border color (Secondary only) | Hero: each choice of "CTA List › Secondary CTA Border color (Secondary only)" gives its presentation | 1. Select the Hero 2. Set "CTA List › Secondary CTA Border color (Secondary only)" to each of: Default (as the BG Color), Black, White 3. Preview after each change | The rendering matches the variation (class or attribute secondary-border-default, secondary-border-black, secondary-border-white) | Not Run | — | — | — | — | — | — |
| TC-HERO-012 | Component variation | CTA List › CTA Arrow | Hero: each choice of "CTA List › CTA Arrow" gives its presentation | 1. Select the Hero 2. Set "CTA List › CTA Arrow" to each of: Right, Down 3. Preview after each change | The rendering matches the variation (class or attribute right, down) | Not Run | — | — | — | — | — | — |
| TC-HERO-013 | Component variation | Vertical Alignment | Hero: each choice of "Vertical Alignment" gives its presentation | 1. Select the Hero 2. Set "Vertical Alignment" to each of: Top, Middle, Bottom 3. Preview after each change | The rendering matches the variation (class or attribute align-top, align-middle, align-bottom) | Not Run | — | — | — | — | — | — |
| TC-HERO-014 | Component variation | Horizontal Alignment | Hero: each choice of "Horizontal Alignment" gives its presentation | 1. Select the Hero 2. Set "Horizontal Alignment" to each of: Left, Center, Right 3. Preview after each change | The rendering matches the variation (class or attribute align-left, align-center, align-right) | Not Run | — | — | — | — | — | — |
| TC-HERO-015 | Component variation | Text Alignment | Hero: each choice of "Text Alignment" gives its presentation | 1. Select the Hero 2. Set "Text Alignment" to each of: Left align, Center align, Right align 3. Preview after each change | The rendering matches the variation (class or attribute text-left, text-center, text-right) | Not Run | — | — | — | — | — | — |
| TC-HERO-016 | Component variation | BG Color | Hero: each choice of "BG Color" gives its presentation | 1. Select the Hero 2. Set "BG Color" to each of: Default, Light, no overlay, Dark blue, Dark blue (subtle), Black, Charcoal Black 80 (cool charcoal), Midnight Navy 60, Charcoal Black 40 (deep charcoal) 3. Preview after each change | The rendering matches the variation (class or attribute bg-light, bg-dark, bg-dark-subtle, bg-black, bg-charcoal-80, bg-navy-60, ...) | Not Run | — | — | — | — | — | — |
| TC-HERO-017 | Component variation | Icon color | Hero: each choice of "Icon color" gives its presentation | 1. Select the Hero 2. Set "Icon color" to each of: Default (as authored), Black, White, Blue, Pale blue 3. Preview after each change | The rendering matches the variation (class or attribute icon-black, icon-white, icon-blue, icon-pale-blue) | Not Run | — | — | — | — | — | — |
| TC-HERO-018 | Component variation | Eyebrow color | Hero: each choice of "Eyebrow color" gives its presentation | 1. Select the Hero 2. Set "Eyebrow color" to each of: Default (royal blue), Royal blue, Soft sky blue 3. Preview after each change | The rendering matches the variation (class or attribute eyebrow-royal-blue, eyebrow-sky-blue) | Not Run | — | — | — | — | — | — |
| TC-HERO-019 | Component variation | CTA Link Type | CTA: each choice of "CTA Link Type" gives its presentation | 1. Select the CTA 2. Set "CTA Link Type" to each of: Default, Open in New Window 3. Preview after each change | The rendering matches the variation (class or attribute new-window) | Not Run | — | — | — | — | — | — |
| TC-HERO-020 | Component variation | CTA view | CTA: each choice of "CTA view" gives its presentation | 1. Select the CTA 2. Set "CTA view" to each of: Default, Primary, Secondary 3. Preview after each change | The rendering matches the variation (class or attribute primary, secondary) | Not Run | — | — | — | — | — | — |
| TC-HERO-021 | Component variation | CTA Arrow | CTA: each choice of "CTA Arrow" gives its presentation | 1. Select the CTA 2. Set "CTA Arrow" to each of: Auto (down for links to sections of this page), Right, Down 3. Preview after each change | The rendering matches the variation (class or attribute right, down) | Not Run | — | — | — | — | — | — |
| TC-HERO-022 | Boundary | — | Hero with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-HERO-023 | Negative | — | Hero with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-HERO-024 | Accessibility | — | Hero meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 1 page(s): /design-block-master/en/block-library/hero: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-HERO-025 | Responsive | — | Hero at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 5 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 8 November 2026 |
| TC-HERO-026 | Error recovery | — | Hero when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
