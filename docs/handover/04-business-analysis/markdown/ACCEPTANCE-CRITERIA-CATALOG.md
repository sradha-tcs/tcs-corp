---
id: "BA-008"
title: "Acceptance Criteria Catalog"
role: "Business analysis"
topic: ""
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Low"
primary: true
---

# Acceptance Criteria Catalog

| Attribute | Value |
| --- | --- |
| Document ID | BA-008 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | The acceptance criteria of every story (from its test cases) |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

| Story | Criterion | Test case |
| --- | --- | --- |
| US-F-E01-01-02 | The page answers 200, every example renders, no console error, no failed request | TC-HEADER-001 |
| US-F-E01-01-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-HEADER-002 |
| US-F-E01-01-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-HEADER-003 |
| US-F-E01-01-02 | The block shows its English fallback or empty state and the page keeps working | TC-HEADER-004 |
| US-F-E01-02-01 | The block appears with the authored content; no empty placeholder remains | TC-TCS-HEADER-002 |
| US-F-E01-02-01 | The block renders without empty wrappers or broken layout | TC-TCS-HEADER-004 |
| US-F-E01-02-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-TCS-HEADER-005 |
| US-F-E01-02-02 | The page answers 200, every example renders, no console error, no failed request | TC-TCS-HEADER-001 |
| US-F-E01-02-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-TCS-HEADER-006 |
| US-F-E01-02-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-TCS-HEADER-007 |
| US-F-E01-02-02 | The block shows its English fallback or empty state and the page keeps working | TC-TCS-HEADER-008 |
| US-F-E01-02-03 | The rendering matches the variation (class or attribute always, never) | TC-TCS-HEADER-003 |
| US-F-E01-03-01 | The block appears with the authored content; no empty placeholder remains | TC-FOOTER-002 |
| US-F-E01-03-01 | The block renders without empty wrappers or broken layout | TC-FOOTER-005 |
| US-F-E01-03-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-FOOTER-006 |
| US-F-E01-03-02 | The page answers 200, every example renders, no console error, no failed request | TC-FOOTER-001 |
| US-F-E01-03-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-FOOTER-007 |
| US-F-E01-03-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-FOOTER-008 |
| US-F-E01-03-02 | The block shows its English fallback or empty state and the page keeps working | TC-FOOTER-009 |
| US-F-E01-03-03 | The rendering matches the variation (class or attribute new-window) | TC-FOOTER-003 |
| US-F-E01-03-03 | The rendering matches the variation (class or attribute new-window) | TC-FOOTER-004 |
| US-F-E01-04-01 | The block appears with the authored content; no empty placeholder remains | TC-FRAGMENT-002 |
| US-F-E01-04-01 | The block renders without empty wrappers or broken layout | TC-FRAGMENT-003 |
| US-F-E01-04-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-FRAGMENT-004 |
| US-F-E01-04-02 | The page answers 200, every example renders, no console error, no failed request | TC-FRAGMENT-001 |
| US-F-E01-04-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-FRAGMENT-005 |
| US-F-E01-04-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-FRAGMENT-006 |
| US-F-E01-04-02 | The block shows its English fallback or empty state and the page keeps working | TC-FRAGMENT-007 |
| US-F-E01-05-01 | The block appears with the authored content; no empty placeholder remains | TC-MODAL-002 |
| US-F-E01-05-01 | The block renders without empty wrappers or broken layout | TC-MODAL-003 |
| US-F-E01-05-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-MODAL-004 |
| US-F-E01-05-02 | The page answers 200, every example renders, no console error, no failed request | TC-MODAL-001 |
| US-F-E01-05-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-MODAL-005 |
| US-F-E01-05-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-MODAL-006 |
| US-F-E01-05-02 | The block shows its English fallback or empty state and the page keeps working | TC-MODAL-007 |
| US-F-E02-01-01 | The block appears with the authored content; no empty placeholder remains | TC-HERO-002 |
| US-F-E02-01-01 | The block renders without empty wrappers or broken layout | TC-HERO-024 |
| US-F-E02-01-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-HERO-025 |
| US-F-E02-01-02 | The page answers 200, every example renders, no console error, no failed request | TC-HERO-001 |
| US-F-E02-01-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-HERO-026 |
| US-F-E02-01-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-HERO-027 |
| US-F-E02-01-02 | The block shows its English fallback or empty state and the page keeps working | TC-HERO-028 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute lottie) | TC-HERO-003 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute media-contained) | TC-HERO-004 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute h1, h2) | TC-HERO-005 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute cta-text-black, cta-text-white) | TC-HERO-006 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute same-window, new-window) | TC-HERO-007 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute default, primary, secondary) | TC-HERO-008 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute primary-bg-default, primary-bg-azure) | TC-HERO-009 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute secondary-bg-default, secondary-bg-light-grey, secondary-bg-black-40) | TC-HERO-010 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute secondary-border-default, secondary-border-black, secondary-border-white) | TC-HERO-011 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute right, down) | TC-HERO-012 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute align-top, align-middle, align-bottom) | TC-HERO-013 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute align-left, align-center, align-right) | TC-HERO-014 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute text-left, text-center, text-right) | TC-HERO-015 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute bg-light, bg-dark, bg-dark-subtle, bg-black, bg-charcoal-80, bg-navy-60, ...) | TC-HERO-016 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute icon-black, icon-white, icon-blue, icon-pale-blue) | TC-HERO-017 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute eyebrow-royal-blue, eyebrow-sky-blue) | TC-HERO-018 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute title-black, title-white) | TC-HERO-019 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute description-black, description-white) | TC-HERO-020 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute new-window) | TC-HERO-021 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute primary, secondary) | TC-HERO-022 |
| US-F-E02-01-03 | The rendering matches the variation (class or attribute right, down) | TC-HERO-023 |
| US-F-E02-02-01 | The block appears with the authored content; no empty placeholder remains | TC-PAGE-HEADER-002 |
| US-F-E02-02-01 | The block renders without empty wrappers or broken layout | TC-PAGE-HEADER-010 |
| US-F-E02-02-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-PAGE-HEADER-011 |
| US-F-E02-02-02 | The page answers 200, every example renders, no console error, no failed request | TC-PAGE-HEADER-001 |
| US-F-E02-02-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-PAGE-HEADER-012 |
| US-F-E02-02-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-PAGE-HEADER-013 |
| US-F-E02-02-02 | The block shows its English fallback or empty state and the page keeps working | TC-PAGE-HEADER-014 |
| US-F-E02-02-03 | The rendering matches the variation (class or attribute landing, secondary, article, display) | TC-PAGE-HEADER-003 |
| US-F-E02-02-03 | The rendering matches the variation (class or attribute new-window) | TC-PAGE-HEADER-004 |
| US-F-E02-02-03 | The rendering matches the variation (class or attribute primary, secondary) | TC-PAGE-HEADER-005 |
| US-F-E02-02-03 | The rendering matches the variation (class or attribute new-window) | TC-PAGE-HEADER-006 |
| US-F-E02-02-03 | The rendering matches the variation (class or attribute tertiary, primary, secondary) | TC-PAGE-HEADER-007 |
| US-F-E02-02-03 | The rendering matches the variation (class or attribute button-bg-blue) | TC-PAGE-HEADER-008 |
| US-F-E02-02-03 | The rendering matches the variation (class or attribute button-round) | TC-PAGE-HEADER-009 |
| US-F-E03-01-01 | The block appears with the authored content; no empty placeholder remains | TC-TEASER-002 |
| US-F-E03-01-01 | The block renders without empty wrappers or broken layout | TC-TEASER-038 |
| US-F-E03-01-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-TEASER-039 |
| US-F-E03-01-02 | The page answers 200, every example renders, no console error, no failed request | TC-TEASER-001 |
| US-F-E03-01-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-TEASER-040 |
| US-F-E03-01-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-TEASER-041 |
| US-F-E03-01-02 | The block shows its English fallback or empty state and the page keeps working | TC-TEASER-042 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute h1, h2, h3, h4, h5, h6) | TC-TEASER-003 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute dd-mm-yyyy, mm-dd-yyyy, mmm-d-yyyy, dd/mm/yy) | TC-TEASER-004 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute lottie) | TC-TEASER-005 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute left, right, top, bottom) | TC-TEASER-006 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute mobile-image-top, mobile-image-bottom) | TC-TEASER-007 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute ratio-8-9, ratio-1-1, ratio-original) | TC-TEASER-008 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute square) | TC-TEASER-009 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute new-window) | TC-TEASER-010 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute list, primary, primary-no-arrow, secondary, secondary-no-arrow) | TC-TEASER-011 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | TC-TEASER-012 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute button-rectangle) | TC-TEASER-013 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute arrow-down-right, arrow-none) | TC-TEASER-014 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute new-window) | TC-TEASER-015 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute tertiary, list, primary, primary-no-arrow, secondary, secondary-no-arrow) | TC-TEASER-016 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | TC-TEASER-017 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute button-rectangle) | TC-TEASER-018 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute new-window) | TC-TEASER-019 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute tertiary, list, primary, primary-no-arrow, secondary, secondary-no-arrow) | TC-TEASER-020 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | TC-TEASER-021 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute button-rectangle) | TC-TEASER-022 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute no-image, background, card, image-collage) | TC-TEASER-023 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute grey, dark, dark-green, navy) | TC-TEASER-024 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute text-left, text-center, text-right, text-justify) | TC-TEASER-025 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute valign-top, valign-middle, valign-bottom) | TC-TEASER-026 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute title-regular, title-semibold) | TC-TEASER-027 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute title-dark, title-white, title-light-blue) | TC-TEASER-028 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute text-regular, text-large) | TC-TEASER-029 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute eyebrow-label, eyebrow-grey, eyebrow-white) | TC-TEASER-030 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute spacing-header) | TC-TEASER-031 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute right, left) | TC-TEASER-032 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute new-window) | TC-TEASER-033 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute list, primary, primary-no-arrow, secondary, secondary-no-arrow) | TC-TEASER-034 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | TC-TEASER-035 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute button-rectangle) | TC-TEASER-036 |
| US-F-E03-01-03 | The rendering matches the variation (class or attribute black-white, normal) | TC-TEASER-037 |
| US-F-E03-02-01 | The block appears with the authored content; no empty placeholder remains | TC-CARDS-002 |
| US-F-E03-02-01 | The block renders without empty wrappers or broken layout | TC-CARDS-022 |
| US-F-E03-02-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-CARDS-023 |
| US-F-E03-02-02 | The page answers 200, every example renders, no console error, no failed request | TC-CARDS-001 |
| US-F-E03-02-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-CARDS-024 |
| US-F-E03-02-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-CARDS-025 |
| US-F-E03-02-02 | The block shows its English fallback or empty state and the page keeps working | TC-CARDS-026 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute h2, h3, h4, h5, h6) | TC-CARDS-003 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute primary, secondary) | TC-CARDS-004 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute image, panel, report, stat, mixed) | TC-CARDS-005 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute dark, navy, brand, brand-light, grey, mid-grey, ...) | TC-CARDS-006 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute 16-9, 1-1, 4-3, 3-2) | TC-CARDS-007 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute portrait, compact, auto) | TC-CARDS-008 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute dd-mmm-yy, dd-mm-yyyy, mm-dd-yyyy, mmm-d-yyyy, dd/mm/yy, do-mmmm-yyyy) | TC-CARDS-009 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute lazy, eager) | TC-CARDS-010 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute grid, horizontal-scroll) | TC-CARDS-011 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute grid, horizontal-scroll) | TC-CARDS-012 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute grid, horizontal-scroll) | TC-CARDS-013 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute start, center) | TC-CARDS-014 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute one-card, viewport) | TC-CARDS-015 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute bleed, none) | TC-CARDS-016 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute hide, message) | TC-CARDS-017 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute stat-compact, dividers, header-center) | TC-CARDS-018 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute true, false) | TC-CARDS-019 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute image, panel, report, stat) | TC-CARDS-020 |
| US-F-E03-02-03 | The rendering matches the variation (class or attribute dark, navy, brand, brand-light, grey, mid-grey, ...) | TC-CARDS-021 |
| US-F-E03-03-01 | The block appears with the authored content; no empty placeholder remains | TC-COLUMNS-CONTAINER-002 |
| US-F-E03-03-01 | The block renders without empty wrappers or broken layout | TC-COLUMNS-CONTAINER-021 |
| US-F-E03-03-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-COLUMNS-CONTAINER-022 |
| US-F-E03-03-02 | The page answers 200, every example renders, no console error, no failed request | TC-COLUMNS-CONTAINER-001 |
| US-F-E03-03-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-COLUMNS-CONTAINER-023 |
| US-F-E03-03-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-COLUMNS-CONTAINER-024 |
| US-F-E03-03-02 | The block shows its English fallback or empty state and the page keeps working | TC-COLUMNS-CONTAINER-025 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute columns-container-section, highlight) | TC-COLUMNS-CONTAINER-003 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute bg-grey, bg-dark, bg-dark-green, bg-navy) | TC-COLUMNS-CONTAINER-004 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute full-width, fixed-width) | TC-COLUMNS-CONTAINER-005 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute auto, 1, 2, 3, 4) | TC-COLUMNS-CONTAINER-006 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute none, small, medium, large) | TC-COLUMNS-CONTAINER-007 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute top, middle, bottom, stretch) | TC-COLUMNS-CONTAINER-008 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute tablet, desktop, large) | TC-COLUMNS-CONTAINER-009 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute motion-fade-in, motion-fade-up, motion-fade-down, motion-fade-left, motion-fade-right, motion-slide-up, ...) | TC-COLUMNS-CONTAINER-010 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute motion-fast, motion-slow) | TC-COLUMNS-CONTAINER-011 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute motion-on-load) | TC-COLUMNS-CONTAINER-012 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute pl-0, pl-100, pl-200, pl-300, pl-400, pl-500, ...) | TC-COLUMNS-CONTAINER-013 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute pr-0, pr-100, pr-200, pr-300, pr-400, pr-500, ...) | TC-COLUMNS-CONTAINER-014 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute pt-0, pt-100, pt-200, pt-300, pt-400, pt-500, ...) | TC-COLUMNS-CONTAINER-015 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute pb-0, pb-100, pb-200, pb-300, pb-400, pb-500, ...) | TC-COLUMNS-CONTAINER-016 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute ml-0, ml-100, ml-200, ml-300, ml-400, ml-500, ...) | TC-COLUMNS-CONTAINER-017 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute mr-0, mr-100, mr-200, mr-300, mr-400, mr-500, ...) | TC-COLUMNS-CONTAINER-018 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute mt-0, mt-100, mt-200, mt-300, mt-400, mt-500, ...) | TC-COLUMNS-CONTAINER-019 |
| US-F-E03-03-03 | The rendering matches the variation (class or attribute mb-0, mb-100, mb-200, mb-300, mb-400, mb-500, ...) | TC-COLUMNS-CONTAINER-020 |
| US-F-E03-04-01 | The block appears with the authored content; no empty placeholder remains | TC-COLUMNS-002 |
| US-F-E03-04-01 | The block renders without empty wrappers or broken layout | TC-COLUMNS-003 |
| US-F-E03-04-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-COLUMNS-004 |
| US-F-E03-04-02 | The page answers 200, every example renders, no console error, no failed request | TC-COLUMNS-001 |
| US-F-E03-04-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-COLUMNS-005 |
| US-F-E03-04-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-COLUMNS-006 |
| US-F-E03-04-02 | The block shows its English fallback or empty state and the page keeps working | TC-COLUMNS-007 |
| US-F-E03-05-01 | The block appears with the authored content; no empty placeholder remains | TC-COLUMN-BREAK-002 |
| US-F-E03-05-01 | The block renders without empty wrappers or broken layout | TC-COLUMN-BREAK-003 |
| US-F-E03-05-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-COLUMN-BREAK-004 |
| US-F-E03-05-02 | The page answers 200, every example renders, no console error, no failed request | TC-COLUMN-BREAK-001 |
| US-F-E03-05-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-COLUMN-BREAK-005 |
| US-F-E03-05-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-COLUMN-BREAK-006 |
| US-F-E03-05-02 | The block shows its English fallback or empty state and the page keeps working | TC-COLUMN-BREAK-007 |
| US-F-E03-06-01 | The block appears with the authored content; no empty placeholder remains | TC-QUOTE-002 |
| US-F-E03-06-01 | The block renders without empty wrappers or broken layout | TC-QUOTE-007 |
| US-F-E03-06-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-QUOTE-008 |
| US-F-E03-06-02 | The page answers 200, every example renders, no console error, no failed request | TC-QUOTE-001 |
| US-F-E03-06-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-QUOTE-009 |
| US-F-E03-06-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-QUOTE-010 |
| US-F-E03-06-02 | The block shows its English fallback or empty state and the page keeps working | TC-QUOTE-011 |
| US-F-E03-06-03 | The rendering matches the variation (class or attribute h1, h2, h3, h4, h5, h6) | TC-QUOTE-003 |
| US-F-E03-06-03 | The rendering matches the variation (class or attribute right, left) | TC-QUOTE-004 |
| US-F-E03-06-03 | The rendering matches the variation (class or attribute top, bottom) | TC-QUOTE-005 |
| US-F-E03-06-03 | The rendering matches the variation (class or attribute grey) | TC-QUOTE-006 |
| US-F-E03-07-01 | The block appears with the authored content; no empty placeholder remains | TC-TESTIMONIAL-002 |
| US-F-E03-07-01 | The block renders without empty wrappers or broken layout | TC-TESTIMONIAL-005 |
| US-F-E03-07-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-TESTIMONIAL-006 |
| US-F-E03-07-02 | The page answers 200, every example renders, no console error, no failed request | TC-TESTIMONIAL-001 |
| US-F-E03-07-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-TESTIMONIAL-007 |
| US-F-E03-07-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-TESTIMONIAL-008 |
| US-F-E03-07-02 | The block shows its English fallback or empty state and the page keeps working | TC-TESTIMONIAL-009 |
| US-F-E03-07-03 | The rendering matches the variation (class or attribute h1, h2, h3, h4, h5, h6) | TC-TESTIMONIAL-003 |
| US-F-E03-07-03 | The rendering matches the variation (class or attribute grey, navy) | TC-TESTIMONIAL-004 |
| US-F-E03-08-01 | The block appears with the authored content; no empty placeholder remains | TC-SEPARATOR-002 |
| US-F-E03-08-01 | The block renders without empty wrappers or broken layout | TC-SEPARATOR-035 |
| US-F-E03-08-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-SEPARATOR-036 |
| US-F-E03-08-02 | The page answers 200, every example renders, no console error, no failed request | TC-SEPARATOR-001 |
| US-F-E03-08-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-SEPARATOR-037 |
| US-F-E03-08-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-SEPARATOR-038 |
| US-F-E03-08-02 | The block shows its English fallback or empty state and the page keeps working | TC-SEPARATOR-039 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute decorative, semantic) | TC-SEPARATOR-003 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute default, subtle, strong, inset, full-width, dotted, ...) | TC-SEPARATOR-004 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute auto, light, dark, brand) | TC-SEPARATOR-005 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute solid, dashed, dotted, gradient, none) | TC-SEPARATOR-006 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute thin, medium, thick) | TC-SEPARATOR-007 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute default, subtle, neutral, strong, primary, secondary, ...) | TC-SEPARATOR-008 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute 25, 50, 75, 100) | TC-SEPARATOR-009 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute 25-percent, 50-percent, 75-percent, 100-percent, content-width, full-bleed, ...) | TC-SEPARATOR-010 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute none, small, medium, large, extra-large, content-container) | TC-SEPARATOR-011 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute start, center, end) | TC-SEPARATOR-012 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute none, dot, square, diamond) | TC-SEPARATOR-013 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute none, dot, square, diamond) | TC-SEPARATOR-014 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute none, dot, square, diamond) | TC-SEPARATOR-015 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute standard, high) | TC-SEPARATOR-016 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute inherit, 25-percent, 50-percent, 75-percent, 100-percent, content-width, ...) | TC-SEPARATOR-017 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute inherit, thin, medium, thick) | TC-SEPARATOR-018 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute inherit, start, center, end) | TC-SEPARATOR-019 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute inherit, 25-percent, 50-percent, 75-percent, 100-percent, content-width, ...) | TC-SEPARATOR-020 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute inherit, thin, medium, thick) | TC-SEPARATOR-021 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute inherit, start, center, end) | TC-SEPARATOR-022 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute inherit, 25-percent, 50-percent, 75-percent, 100-percent, content-width, ...) | TC-SEPARATOR-023 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute inherit, thin, medium, thick) | TC-SEPARATOR-024 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute inherit, start, center, end) | TC-SEPARATOR-025 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | TC-SEPARATOR-026 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | TC-SEPARATOR-027 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | TC-SEPARATOR-028 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | TC-SEPARATOR-029 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | TC-SEPARATOR-030 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute default, none, 2xs, xs, small, medium, ...) | TC-SEPARATOR-031 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute none, fade, draw-from-start, draw-from-center) | TC-SEPARATOR-032 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute static, fade) | TC-SEPARATOR-033 |
| US-F-E03-08-03 | The rendering matches the variation (class or attribute show, hide) | TC-SEPARATOR-034 |
| US-F-E03-09-01 | The block appears with the authored content; no empty placeholder remains | TC-IMAGE-COLLAGE-002 |
| US-F-E03-09-01 | The block renders without empty wrappers or broken layout | TC-IMAGE-COLLAGE-016 |
| US-F-E03-09-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-IMAGE-COLLAGE-017 |
| US-F-E03-09-02 | The page answers 200, every example renders, no console error, no failed request | TC-IMAGE-COLLAGE-001 |
| US-F-E03-09-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-IMAGE-COLLAGE-018 |
| US-F-E03-09-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-IMAGE-COLLAGE-019 |
| US-F-E03-09-02 | The block shows its English fallback or empty state and the page keeps working | TC-IMAGE-COLLAGE-020 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute h1, h2, h3, h4, h5, h6) | TC-IMAGE-COLLAGE-003 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute new-window) | TC-IMAGE-COLLAGE-004 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute primary, primary-no-arrow, secondary, secondary-no-arrow) | TC-IMAGE-COLLAGE-005 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | TC-IMAGE-COLLAGE-006 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute button-rectangle) | TC-IMAGE-COLLAGE-007 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute new-window) | TC-IMAGE-COLLAGE-008 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute primary, primary-no-arrow, secondary, secondary-no-arrow) | TC-IMAGE-COLLAGE-009 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute button-bg-white, button-bg-blue, button-bg-translucent) | TC-IMAGE-COLLAGE-010 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute button-rectangle) | TC-IMAGE-COLLAGE-011 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute title-regular, title-semibold) | TC-IMAGE-COLLAGE-012 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute text-regular, text-large) | TC-IMAGE-COLLAGE-013 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute bg-navy) | TC-IMAGE-COLLAGE-014 |
| US-F-E03-09-03 | The rendering matches the variation (class or attribute black-white, normal) | TC-IMAGE-COLLAGE-015 |
| US-F-E03-10-01 | The block appears with the authored content; no empty placeholder remains | TC-ACCORDION-002 |
| US-F-E03-10-01 | The block renders without empty wrappers or broken layout | TC-ACCORDION-003 |
| US-F-E03-10-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-ACCORDION-004 |
| US-F-E03-10-02 | The page answers 200, every example renders, no console error, no failed request | TC-ACCORDION-001 |
| US-F-E03-10-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-ACCORDION-005 |
| US-F-E03-10-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-ACCORDION-006 |
| US-F-E03-10-02 | The block shows its English fallback or empty state and the page keeps working | TC-ACCORDION-007 |
| US-F-E03-11-01 | The block appears with the authored content; no empty placeholder remains | TC-TABS-002 |
| US-F-E03-11-01 | The block renders without empty wrappers or broken layout | TC-TABS-022 |
| US-F-E03-11-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-TABS-023 |
| US-F-E03-11-02 | The page answers 200, every example renders, no console error, no failed request | TC-TABS-001 |
| US-F-E03-11-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-TABS-024 |
| US-F-E03-11-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-TABS-025 |
| US-F-E03-11-02 | The block shows its English fallback or empty state and the page keeps working | TC-TABS-026 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute tabs-section) | TC-TABS-003 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute full-width, fixed-width) | TC-TABS-004 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute underline, boxed, pills) | TC-TABS-005 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute left, center, stretch) | TC-TABS-006 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute horizontal, vertical) | TC-TABS-007 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute motion-fade-in, motion-fade-up, motion-fade-down, motion-fade-left, motion-fade-right, motion-slide-up, ...) | TC-TABS-008 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute motion-fast, motion-slow) | TC-TABS-009 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute motion-on-load) | TC-TABS-010 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute pl-0, pl-100, pl-200, pl-300, pl-400, pl-500, ...) | TC-TABS-011 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute pr-0, pr-100, pr-200, pr-300, pr-400, pr-500, ...) | TC-TABS-012 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute pt-0, pt-100, pt-200, pt-300, pt-400, pt-500, ...) | TC-TABS-013 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute pb-0, pb-100, pb-200, pb-300, pb-400, pb-500, ...) | TC-TABS-014 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute ml-0, ml-100, ml-200, ml-300, ml-400, ml-500, ...) | TC-TABS-015 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute mr-0, mr-100, mr-200, mr-300, mr-400, mr-500, ...) | TC-TABS-016 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute mt-0, mt-100, mt-200, mt-300, mt-400, mt-500, ...) | TC-TABS-017 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute mb-0, mb-100, mb-200, mb-300, mb-400, mb-500, ...) | TC-TABS-018 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute underline, boxed, pills) | TC-TABS-019 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute left, center, stretch) | TC-TABS-020 |
| US-F-E03-11-03 | The rendering matches the variation (class or attribute horizontal, vertical) | TC-TABS-021 |
| US-F-E03-12-01 | The block appears with the authored content; no empty placeholder remains | TC-TAB-002 |
| US-F-E03-12-01 | The block renders without empty wrappers or broken layout | TC-TAB-004 |
| US-F-E03-12-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-TAB-005 |
| US-F-E03-12-02 | The page answers 200, every example renders, no console error, no failed request | TC-TAB-001 |
| US-F-E03-12-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-TAB-006 |
| US-F-E03-12-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-TAB-007 |
| US-F-E03-12-02 | The block shows its English fallback or empty state and the page keeps working | TC-TAB-008 |
| US-F-E03-12-03 | The rendering matches the variation (class or attribute per-row-1, per-row-2, per-row-3, per-row-4) | TC-TAB-003 |
| US-F-E03-13-01 | The block appears with the authored content; no empty placeholder remains | TC-GEN-CAROUSEL-002 |
| US-F-E03-13-01 | The block renders without empty wrappers or broken layout | TC-GEN-CAROUSEL-016 |
| US-F-E03-13-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-GEN-CAROUSEL-017 |
| US-F-E03-13-02 | The page answers 200, every example renders, no console error, no failed request | TC-GEN-CAROUSEL-001 |
| US-F-E03-13-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-GEN-CAROUSEL-018 |
| US-F-E03-13-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-GEN-CAROUSEL-019 |
| US-F-E03-13-02 | The block shows its English fallback or empty state and the page keeps working | TC-GEN-CAROUSEL-020 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute gen-carousel-section) | TC-GEN-CAROUSEL-003 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute manual, auto, manual-auto) | TC-GEN-CAROUSEL-004 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute motion-fade-in, motion-fade-up, motion-fade-down, motion-fade-left, motion-fade-right, motion-slide-up, ...) | TC-GEN-CAROUSEL-005 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute motion-fast, motion-slow) | TC-GEN-CAROUSEL-006 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute motion-on-load) | TC-GEN-CAROUSEL-007 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute pl-0, pl-100, pl-200, pl-300, pl-400, pl-500, ...) | TC-GEN-CAROUSEL-008 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute pr-0, pr-100, pr-200, pr-300, pr-400, pr-500, ...) | TC-GEN-CAROUSEL-009 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute pt-0, pt-100, pt-200, pt-300, pt-400, pt-500, ...) | TC-GEN-CAROUSEL-010 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute pb-0, pb-100, pb-200, pb-300, pb-400, pb-500, ...) | TC-GEN-CAROUSEL-011 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute ml-0, ml-100, ml-200, ml-300, ml-400, ml-500, ...) | TC-GEN-CAROUSEL-012 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute mr-0, mr-100, mr-200, mr-300, mr-400, mr-500, ...) | TC-GEN-CAROUSEL-013 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute mt-0, mt-100, mt-200, mt-300, mt-400, mt-500, ...) | TC-GEN-CAROUSEL-014 |
| US-F-E03-13-03 | The rendering matches the variation (class or attribute mb-0, mb-100, mb-200, mb-300, mb-400, mb-500, ...) | TC-GEN-CAROUSEL-015 |
| US-F-E03-14-01 | The block appears with the authored content; no empty placeholder remains | TC-TABLE-002 |
| US-F-E03-14-01 | The block renders without empty wrappers or broken layout | TC-TABLE-005 |
| US-F-E03-14-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-TABLE-006 |
| US-F-E03-14-02 | The page answers 200, every example renders, no console error, no failed request | TC-TABLE-001 |
| US-F-E03-14-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-TABLE-007 |
| US-F-E03-14-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-TABLE-008 |
| US-F-E03-14-02 | The block shows its English fallback or empty state and the page keeps working | TC-TABLE-009 |
| US-F-E03-14-03 | The rendering matches the variation (class or attribute ) | TC-TABLE-003 |
| US-F-E03-14-03 | The rendering matches the variation (class or attribute table, table-2-columns, table-3-columns, table-4-columns, table-5-columns, table-6-columns, ...) | TC-TABLE-004 |
| US-F-E03-15-01 | The block appears with the authored content; no empty placeholder remains | TC-ANCHOR-LIST-002 |
| US-F-E03-15-01 | The block renders without empty wrappers or broken layout | TC-ANCHOR-LIST-003 |
| US-F-E03-15-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-ANCHOR-LIST-004 |
| US-F-E03-15-02 | The page answers 200, every example renders, no console error, no failed request | TC-ANCHOR-LIST-001 |
| US-F-E03-15-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-ANCHOR-LIST-005 |
| US-F-E03-15-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-ANCHOR-LIST-006 |
| US-F-E03-15-02 | The block shows its English fallback or empty state and the page keeps working | TC-ANCHOR-LIST-007 |
| US-F-E03-16-01 | The block appears with the authored content; no empty placeholder remains | TC-BUTTON-BLOCK-002 |
| US-F-E03-16-01 | The block renders without empty wrappers or broken layout | TC-BUTTON-BLOCK-008 |
| US-F-E03-16-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-BUTTON-BLOCK-009 |
| US-F-E03-16-02 | The page answers 200, every example renders, no console error, no failed request | TC-BUTTON-BLOCK-001 |
| US-F-E03-16-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-BUTTON-BLOCK-010 |
| US-F-E03-16-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-BUTTON-BLOCK-011 |
| US-F-E03-16-02 | The block shows its English fallback or empty state and the page keeps working | TC-BUTTON-BLOCK-012 |
| US-F-E03-16-03 | The rendering matches the variation (class or attribute button, icon, link) | TC-BUTTON-BLOCK-003 |
| US-F-E03-16-03 | The rendering matches the variation (class or attribute primary, secondary, tertiary) | TC-BUTTON-BLOCK-004 |
| US-F-E03-16-03 | The rendering matches the variation (class or attribute arrow-right, chevron-right, chevron-down, search) | TC-BUTTON-BLOCK-005 |
| US-F-E03-16-03 | The rendering matches the variation (class or attribute left, center, right) | TC-BUTTON-BLOCK-006 |
| US-F-E03-16-03 | The rendering matches the variation (class or attribute none, overline, line-through, underline, underline overline) | TC-BUTTON-BLOCK-007 |
| US-F-E04-01-01 | The block appears with the authored content; no empty placeholder remains | TC-VIDEO-002 |
| US-F-E04-01-01 | The block renders without empty wrappers or broken layout | TC-VIDEO-007 |
| US-F-E04-01-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-VIDEO-008 |
| US-F-E04-01-02 | The page answers 200, every example renders, no console error, no failed request | TC-VIDEO-001 |
| US-F-E04-01-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-VIDEO-009 |
| US-F-E04-01-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-VIDEO-010 |
| US-F-E04-01-02 | The block shows its English fallback or empty state and the page keeps working | TC-VIDEO-011 |
| US-F-E04-01-03 | The rendering matches the variation (class or attribute click, autoplay, background) | TC-VIDEO-003 |
| US-F-E04-01-03 | The rendering matches the variation (class or attribute 16-9, 4-3, 1-1, 21-9, 9-16) | TC-VIDEO-004 |
| US-F-E04-01-03 | The rendering matches the variation (class or attribute full, large, medium, small) | TC-VIDEO-005 |
| US-F-E04-01-03 | The rendering matches the variation (class or attribute center, left, right) | TC-VIDEO-006 |
| US-F-E04-02-01 | The block appears with the authored content; no empty placeholder remains | TC-EMBED-002 |
| US-F-E04-02-01 | The block renders without empty wrappers or broken layout | TC-EMBED-003 |
| US-F-E04-02-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-EMBED-004 |
| US-F-E04-02-02 | The page answers 200, every example renders, no console error, no failed request | TC-EMBED-001 |
| US-F-E04-02-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-EMBED-005 |
| US-F-E04-02-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-EMBED-006 |
| US-F-E04-02-02 | The block shows its English fallback or empty state and the page keeps working | TC-EMBED-007 |
| US-F-E04-03-01 | The block appears with the authored content; no empty placeholder remains | TC-INTERACTIVE-DASHBOARD-002 |
| US-F-E04-03-01 | The block renders without empty wrappers or broken layout | TC-INTERACTIVE-DASHBOARD-003 |
| US-F-E04-03-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-INTERACTIVE-DASHBOARD-004 |
| US-F-E04-03-02 | The page answers 200, every example renders, no console error, no failed request | TC-INTERACTIVE-DASHBOARD-001 |
| US-F-E04-03-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-INTERACTIVE-DASHBOARD-005 |
| US-F-E04-03-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-INTERACTIVE-DASHBOARD-006 |
| US-F-E04-03-02 | The block shows its English fallback or empty state and the page keeps working | TC-INTERACTIVE-DASHBOARD-007 |
| US-F-E05-01-01 | The block appears with the authored content; no empty placeholder remains | TC-LIST-002 |
| US-F-E05-01-01 | The block renders without empty wrappers or broken layout | TC-LIST-026 |
| US-F-E05-01-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-LIST-027 |
| US-F-E05-01-02 | The page answers 200, every example renders, no console error, no failed request | TC-LIST-001 |
| US-F-E05-01-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-LIST-028 |
| US-F-E05-01-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-LIST-029 |
| US-F-E05-01-02 | The block shows its English fallback or empty state and the page keeps working | TC-LIST-030 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute h2, h3, h4, h5, h6) | TC-LIST-003 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute primary, secondary) | TC-LIST-004 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute parent, fixed, tags) | TC-LIST-005 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute any, all) | TC-LIST-006 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute manual, title, lastModified) | TC-LIST-007 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute ascending, descending) | TC-LIST-008 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute image, panel, report, stat, mixed) | TC-LIST-009 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute dark, navy, brand, brand-light, grey, mid-grey, ...) | TC-LIST-010 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute 16-9, 1-1, 4-3, 3-2) | TC-LIST-011 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute portrait, compact, auto) | TC-LIST-012 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute dd-mmm-yy, dd-mm-yyyy, mm-dd-yyyy, mmm-d-yyyy, dd/mm/yy, do-mmmm-yyyy) | TC-LIST-013 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute lazy, eager) | TC-LIST-014 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute grid, horizontal-scroll) | TC-LIST-015 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute grid, horizontal-scroll) | TC-LIST-016 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute grid, horizontal-scroll) | TC-LIST-017 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute start, center) | TC-LIST-018 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute one-card, viewport) | TC-LIST-019 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute bleed, none) | TC-LIST-020 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute hide, message, fallback) | TC-LIST-021 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute stat-compact, dividers, header-center) | TC-LIST-022 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute true, false) | TC-LIST-023 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute image, panel, report, stat) | TC-LIST-024 |
| US-F-E05-01-03 | The rendering matches the variation (class or attribute dark, navy, brand, brand-light, grey, mid-grey, ...) | TC-LIST-025 |
| US-F-E05-02-01 | The block appears with the authored content; no empty placeholder remains | TC-FILTER-LIST-002 |
| US-F-E05-02-01 | The block renders without empty wrappers or broken layout | TC-FILTER-LIST-013 |
| US-F-E05-02-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-FILTER-LIST-014 |
| US-F-E05-02-02 | The page answers 200, every example renders, no console error, no failed request | TC-FILTER-LIST-001 |
| US-F-E05-02-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-FILTER-LIST-015 |
| US-F-E05-02-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-FILTER-LIST-016 |
| US-F-E05-02-02 | The block shows its English fallback or empty state and the page keeps working | TC-FILTER-LIST-017 |
| US-F-E05-02-03 | The rendering matches the variation (class or attribute masonry, grid, list) | TC-FILTER-LIST-003 |
| US-F-E05-02-03 | The rendering matches the variation (class or attribute query-index, manual) | TC-FILTER-LIST-004 |
| US-F-E05-02-03 | The rendering matches the variation (class or attribute article, blog, press-release) | TC-FILTER-LIST-005 |
| US-F-E05-02-03 | The rendering matches the variation (class or attribute article, blog, insights, case-study, whitepaper, report, ...) | TC-FILTER-LIST-006 |
| US-F-E05-02-03 | The rendering matches the variation (class or attribute latest, featured, priority, alphabetical) | TC-FILTER-LIST-007 |
| US-F-E05-02-03 | The rendering matches the variation (class or attribute and, or) | TC-FILTER-LIST-008 |
| US-F-E05-02-03 | The rendering matches the variation (class or attribute default, compact, featured, mixed) | TC-FILTER-LIST-009 |
| US-F-E05-02-03 | The rendering matches the variation (class or attribute featured, priority, manual) | TC-FILTER-LIST-010 |
| US-F-E05-02-03 | The rendering matches the variation (class or attribute latest, featured, manual) | TC-FILTER-LIST-011 |
| US-F-E05-02-03 | The rendering matches the variation (class or attribute listed, featured) | TC-FILTER-LIST-012 |
| US-F-E05-03-01 | The block appears with the authored content; no empty placeholder remains | TC-TABLE-LIST-002 |
| US-F-E05-03-01 | The block renders without empty wrappers or broken layout | TC-TABLE-LIST-011 |
| US-F-E05-03-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-TABLE-LIST-012 |
| US-F-E05-03-02 | The page answers 200, every example renders, no console error, no failed request | TC-TABLE-LIST-001 |
| US-F-E05-03-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-TABLE-LIST-013 |
| US-F-E05-03-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-TABLE-LIST-014 |
| US-F-E05-03-02 | The block shows its English fallback or empty state and the page keeps working | TC-TABLE-LIST-015 |
| US-F-E05-03-03 | The rendering matches the variation (class or attribute industries, solutions, products, segments, approach, platforms) | TC-TABLE-LIST-003 |
| US-F-E05-03-03 | The rendering matches the variation (class or attribute white, black, dark-green, navy) | TC-TABLE-LIST-004 |
| US-F-E05-03-03 | The rendering matches the variation (class or attribute h2, h3, h4) | TC-TABLE-LIST-005 |
| US-F-E05-03-03 | The rendering matches the variation (class or attribute beside) | TC-TABLE-LIST-006 |
| US-F-E05-03-03 | The rendering matches the variation (class or attribute primary, secondary, tertiary) | TC-TABLE-LIST-007 |
| US-F-E05-03-03 | The rendering matches the variation (class or attribute show, mobile, hide) | TC-TABLE-LIST-008 |
| US-F-E05-03-03 | The rendering matches the variation (class or attribute arrow, arrow-up-right, arrow-circle, button) | TC-TABLE-LIST-009 |
| US-F-E05-03-03 | The rendering matches the variation (class or attribute tm, r) | TC-TABLE-LIST-010 |
| US-F-E05-04-01 | The block appears with the authored content; no empty placeholder remains | TC-MEDIA-CONTACTS-002 |
| US-F-E05-04-01 | The block renders without empty wrappers or broken layout | TC-MEDIA-CONTACTS-004 |
| US-F-E05-04-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-MEDIA-CONTACTS-005 |
| US-F-E05-04-02 | The page answers 200, every example renders, no console error, no failed request | TC-MEDIA-CONTACTS-001 |
| US-F-E05-04-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-MEDIA-CONTACTS-006 |
| US-F-E05-04-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-MEDIA-CONTACTS-007 |
| US-F-E05-04-02 | The block shows its English fallback or empty state and the page keeps working | TC-MEDIA-CONTACTS-008 |
| US-F-E05-04-03 | The rendering matches the variation (class or attribute h1, h2, h3, h4, h5, h6) | TC-MEDIA-CONTACTS-003 |
| US-F-E06-01-01 | The block appears with the authored content; no empty placeholder remains | TC-FORM-VARIATIONS-002 |
| US-F-E06-01-01 | The block renders without empty wrappers or broken layout | TC-FORM-VARIATIONS-005 |
| US-F-E06-01-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-FORM-VARIATIONS-006 |
| US-F-E06-01-02 | The page answers 200, every example renders, no console error, no failed request | TC-FORM-VARIATIONS-001 |
| US-F-E06-01-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-FORM-VARIATIONS-007 |
| US-F-E06-01-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-FORM-VARIATIONS-008 |
| US-F-E06-01-02 | The block shows its English fallback or empty state and the page keeps working | TC-FORM-VARIATIONS-009 |
| US-F-E06-01-03 | The rendering matches the variation (class or attribute dark) | TC-FORM-VARIATIONS-003 |
| US-F-E06-01-03 | The rendering matches the variation (class or attribute text, email, tel) | TC-FORM-VARIATIONS-004 |
| US-F-E07-01-01 | The block appears with the authored content; no empty placeholder remains | TC-CONVERSATION-CANVAS-002 |
| US-F-E07-01-01 | The block renders without empty wrappers or broken layout | TC-CONVERSATION-CANVAS-013 |
| US-F-E07-01-01 | Text wraps, no broken image icon, the link is flagged in the link check | TC-CONVERSATION-CANVAS-014 |
| US-F-E07-01-02 | The page answers 200, every example renders, no console error, no failed request | TC-CONVERSATION-CANVAS-001 |
| US-F-E07-01-02 | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | TC-CONVERSATION-CANVAS-015 |
| US-F-E07-01-02 | No horizontal overflow; layout follows the responsive rules of the README | TC-CONVERSATION-CANVAS-016 |
| US-F-E07-01-02 | The block shows its English fallback or empty state and the page keeps working | TC-CONVERSATION-CANVAS-017 |
| US-F-E07-01-03 | The rendering matches the variation (class or attribute primary, secondary) | TC-CONVERSATION-CANVAS-003 |
| US-F-E07-01-03 | The rendering matches the variation (class or attribute nofloat) | TC-CONVERSATION-CANVAS-004 |
| US-F-E07-01-03 | The rendering matches the variation (class or attribute action-pills, action-buttons) | TC-CONVERSATION-CANVAS-005 |
| US-F-E07-01-03 | The rendering matches the variation (class or attribute default, dark) | TC-CONVERSATION-CANVAS-006 |
| US-F-E07-01-03 | The rendering matches the variation (class or attribute bigger, medium) | TC-CONVERSATION-CANVAS-007 |
| US-F-E07-01-03 | The rendering matches the variation (class or attribute text-links) | TC-CONVERSATION-CANVAS-008 |
| US-F-E07-01-03 | The rendering matches the variation (class or attribute primary, secondary, tertiary) | TC-CONVERSATION-CANVAS-009 |
| US-F-E07-01-03 | The rendering matches the variation (class or attribute button, icon, link) | TC-CONVERSATION-CANVAS-010 |
| US-F-E07-01-03 | The rendering matches the variation (class or attribute primary, secondary, tertiary) | TC-CONVERSATION-CANVAS-011 |
| US-F-E07-01-03 | The rendering matches the variation (class or attribute arrow-right, chevron-right, chevron-down, search) | TC-CONVERSATION-CANVAS-012 |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
