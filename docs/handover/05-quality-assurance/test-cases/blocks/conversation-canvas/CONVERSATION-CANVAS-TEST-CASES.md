---
id: "QA-TC-conversation-canvas"
title: "Conversation Canvas — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/conversation-canvas/_conversation-canvas.json"]
relatedComponents: ["conversation-canvas"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Conversation Canvas — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-conversation-canvas |
| Audience | QA lead, testers, release lead |
| Purpose | Test cases of the Conversation Canvas block (derived from its model) with their execution status |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/conversation-canvas/_conversation-canvas.json |
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
| TC-CONVERSATION-CANVAS-001 | Functional (smoke) | — | Conversation Canvas renders on its block library page | 1. Open the block library page of the block on the live site 2. Wait for the page to load | The page answers 200, every example renders, no console error, no failed request | Failed | 5 of 6 pages fail: shared failed request (DEF-002, DEF-001) | Edge Delivery live, Chromium (Playwright) | execution-results evidence.json | DEF-002, DEF-001 | Automated (documentation program) | 8 November 2026 |
| TC-CONVERSATION-CANVAS-002 | Authoring | — | An author adds the Conversation Canvas and fills in its required fields | 1. Open a test page in Universal Editor 2. Add the Conversation Canvas from the component palette 3. Fill in the fields of each tab 4. Preview | The block appears with the authored content; no empty placeholder remains | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-003 | Component variation | Canvas Style | Conversation Canvas: each choice of "Canvas Style" gives its presentation | 1. Select the Conversation Canvas 2. Set "Canvas Style" to each of: Default, Primary (sticky), Secondary 3. Preview after each change | The rendering matches the variation (class or attribute primary, secondary) | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-004 | Component variation | Floating journey | Conversation Canvas: each choice of "Floating journey" gives its presentation | 1. Select the Conversation Canvas 2. Set "Floating journey" to each of: Floats and docks, Stays in place 3. Preview after each change | The rendering matches the variation (class or attribute nofloat) | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-005 | Component variation | Quick actions | Conversation Canvas: each choice of "Quick actions" gives its presentation | 1. Select the Conversation Canvas 2. Set "Quick actions" to each of: Auto, Pills, Buttons 3. Preview after each change | The rendering matches the variation (class or attribute action-pills, action-buttons) | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-006 | Component variation | BG Style | Conversation Canvas: each choice of "BG Style" gives its presentation | 1. Select the Conversation Canvas 2. Set "BG Style" to each of: Default, Dark (Primary) 3. Preview after each change | The rendering matches the variation (class or attribute default, dark) | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-007 | Component variation | Title Type | Conversation Canvas: each choice of "Title Type" gives its presentation | 1. Select the Conversation Canvas 2. Set "Title Type" to each of: Default, Bigger Title, Medium Title 3. Preview after each change | The rendering matches the variation (class or attribute bigger, medium) | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-008 | Component variation | Navigation style | Conversation Canvas: each choice of "Navigation style" gives its presentation | 1. Select the Conversation Canvas 2. Set "Navigation style" to each of: Pills, Text links 3. Preview after each change | The rendering matches the variation (class or attribute text-links) | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-009 | Component variation | Search bar › Search bar button icon type | Conversation Canvas: each choice of "Search bar › Search bar button icon type" gives its presentation | 1. Select the Conversation Canvas 2. Set "Search bar › Search bar button icon type" to each of: Primary, Secondary, Tertiary 3. Preview after each change | The rendering matches the variation (class or attribute primary, secondary, tertiary) | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-010 | Component variation | Views | Conversation Canvas Button: each choice of "Views" gives its presentation | 1. Select the Conversation Canvas Button 2. Set "Views" to each of: Button, Icon, Link 3. Preview after each change | The rendering matches the variation (class or attribute button, icon, link) | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-011 | Component variation | Type | Conversation Canvas Button: each choice of "Type" gives its presentation | 1. Select the Conversation Canvas Button 2. Set "Type" to each of: Primary, Secondary, Tertiary 3. Preview after each change | The rendering matches the variation (class or attribute primary, secondary, tertiary) | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-012 | Component variation | Icon | Conversation Canvas Button: each choice of "Icon" gives its presentation | 1. Select the Conversation Canvas Button 2. Set "Icon" to each of: Arrow right, Chevron right, Chevron down, Search 3. Preview after each change | The rendering matches the variation (class or attribute arrow-right, chevron-right, chevron-down, search) | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-013 | Boundary | — | Conversation Canvas with optional fields left empty | 1. Add the block and fill in only the required fields 2. Preview | The block renders without empty wrappers or broken layout | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-014 | Negative | — | Conversation Canvas with invalid content (very long text, missing image, broken link) | 1. Enter a 300-character title 2. Remove the image 3. Link to a missing page 4. Preview | Text wraps, no broken image icon, the link is flagged in the link check | Not Run | — | — | — | — | — | — |
| TC-CONVERSATION-CANVAS-015 | Accessibility | — | Conversation Canvas meets WCAG 2.1 AA | 1. Navigate the block with the keyboard only 2. Check focus visibility, names of buttons and links, alt text, heading order 3. Run a screen reader on the block | Every control is reachable and named; no heading level is skipped; images have alt text or are decorative | Requires Manual Validation | Automated DOM checks flagged 1 page(s): /design-block-master/en/block-library/conversation-canvas: 0 img without alt, 0 unnamed buttons, 1 heading skips, 0 duplicate ids | Edge Delivery live, Chromium (Playwright) | evidence.json | — | — | — |
| TC-CONVERSATION-CANVAS-016 | Responsive | — | Conversation Canvas at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 6 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 8 November 2026 |
| TC-CONVERSATION-CANVAS-017 | Error recovery | — | Conversation Canvas when a dependency fails (sheet, index, media) | 1. Block the placeholders or query index request in the browser 2. Reload | The block shows its English fallback or empty state and the page keeps working | Not Run | — | — | — | — | — | — |

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
