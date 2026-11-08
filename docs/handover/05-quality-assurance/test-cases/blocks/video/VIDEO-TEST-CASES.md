---
id: "QA-TC-video"
title: "Video — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/video/_video.json"]
relatedComponents: ["video"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Video — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-video |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Video block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/video/_video.json |
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
| TC-VIDEO-001 | Functional (smoke) | — | Video renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 3 of 3 pages fail: shared failed request (DEF-002, DEF-001); own failures on /design-block-master/en/block-library/video/video | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001, DEF-010 | Automated (documentation program) | 8 November 2026 |
| TC-VIDEO-002 | Authoring | — | An author adds the Video and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Video from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-VIDEO-003 | Component variation | Playback | Video: each choice of "Playback" gives its presentation | 1. Select the Video 2. Set "Playback" to each of: Play button (on the poster image), Autoplay when in view (muted), Background video (autoplay, muted, loop, no controls) 3. Preview after each change | The rendering matches the variation (class or attribute click, autoplay, background) | Not Run | — | — | — | — | — | — |
| TC-VIDEO-004 | Component variation | Aspect Ratio | Video: each choice of "Aspect Ratio" gives its presentation | 1. Select the Video 2. Set "Aspect Ratio" to each of: 16:9 (widescreen), 4:3, 1:1 (square), 21:9 (cinema), 9:16 (vertical) 3. Preview after each change | The rendering matches the variation (class or attribute 16-9, 4-3, 1-1, 21-9, 9-16) | Not Run | — | — | — | — | — | — |
| TC-VIDEO-005 | Component variation | Size | Video: each choice of "Size" gives its presentation | 1. Select the Video 2. Set "Size" to each of: Full width, Large (900px), Medium (640px), Small (420px) 3. Preview after each change | The rendering matches the variation (class or attribute full, large, medium, small) | Not Run | — | — | — | — | — | — |
| TC-VIDEO-006 | Component variation | Alignment | Video: each choice of "Alignment" gives its presentation | 1. Select the Video 2. Set "Alignment" to each of: Center, Left, Right 3. Preview after each change | The rendering matches the variation (class or attribute center, left, right) | Not Run | — | — | — | — | — | — |
| TC-VIDEO-007 | Boundary | — | Video with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-VIDEO-008 | Negative | — | Video with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-VIDEO-009 | Accessibility | — | Video meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 1 page(s): /design-block-master/en/block-library/video: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-VIDEO-010 | Responsive | — | Video at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 3 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 8 November 2026 |
| TC-VIDEO-011 | Error recovery | — | Video when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
