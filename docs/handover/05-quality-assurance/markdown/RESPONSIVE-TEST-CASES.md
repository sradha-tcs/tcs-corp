---
id: "QA-010"
title: "Responsive Test Cases"
role: "Quality assurance"
topic: ""
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: false
---

# Responsive Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-010 |
| Audience | QA lead, testers, release lead |
| Purpose | Responsive cases of every block |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
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

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-ACCORDION-006 | Responsive | — | Accordion at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 2 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-ANCHOR-LIST-006 | Responsive | — | Anchor List at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 3 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-BUTTON-BLOCK-011 | Responsive | — | Button at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Blocked | No block library page for this block | — | — | — | — | — |
| TC-CARDS-025 | Responsive | — | Cards at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 7 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-COLUMN-BREAK-006 | Responsive | — | Column Break at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Blocked | No block library page for this block | — | — | — | — | — |
| TC-COLUMNS-006 | Responsive | — | Columns at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 3 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-COLUMNS-CONTAINER-024 | Responsive | — | Columns Container at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Failed | Horizontal overflow on /design-block-master/en/block-library/columns-container/columns-of-blocks (1024 px) | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | DEF-004 | Automated (documentation program) | 13 November 2026 |
| TC-CONVERSATION-CANVAS-016 | Responsive | — | Conversation Canvas at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 6 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-EMBED-006 | Responsive | — | Embed at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 2 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-FILTER-LIST-016 | Responsive | — | Filter List at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 7 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-FOOTER-008 | Responsive | — | Footer at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 8 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-FORM-VARIATIONS-008 | Responsive | — | Form Variations at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 3 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-FRAGMENT-006 | Responsive | — | Fragment at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 4 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-GEN-CAROUSEL-019 | Responsive | — | Gen Carousel at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 6 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-HEADER-003 | Responsive | — | Header at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 5 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-HERO-027 | Responsive | — | Hero at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 5 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-IMAGE-COLLAGE-019 | Responsive | — | Image Collage at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Blocked | No block library page for this block | — | — | — | — | — |
| TC-INTERACTIVE-DASHBOARD-006 | Responsive | — | Interactive Dashboard at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 2 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-LIST-029 | Responsive | — | List at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 15 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-MEDIA-CONTACTS-007 | Responsive | — | Media Contacts at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Blocked | No block library page for this block | — | — | — | — | — |
| TC-MODAL-006 | Responsive | — | Modal at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 10 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-PAGE-HEADER-013 | Responsive | — | Page Header at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 17 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-QUOTE-010 | Responsive | — | Quote at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 2 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-SEPARATOR-038 | Responsive | — | Separator at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 4 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-TAB-007 | Responsive | — | Tab at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Blocked | No block library page for this block | — | — | — | — | — |
| TC-TABLE-008 | Responsive | — | Table at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Failed | Horizontal overflow on /design-block-master/en/block-library/table/table (375, 768, 1024, 1440 px) | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | DEF-007 | Automated (documentation program) | 13 November 2026 |
| TC-TABLE-LIST-014 | Responsive | — | Table List at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 6 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-TABS-025 | Responsive | — | Tabs at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 14 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-TCS-HEADER-007 | Responsive | — | TCS Header at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Blocked | No block library page for this block | — | — | — | — | — |
| TC-TEASER-041 | Responsive | — | Teaser at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 11 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |
| TC-TESTIMONIAL-008 | Responsive | — | Testimonial at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Failed | Horizontal overflow on /design-block-master/en/block-library/testimonial/testimonial-variations (375, 768, 1024 px) | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | DEF-009 | Automated (documentation program) | 13 November 2026 |
| TC-VIDEO-010 | Responsive | — | Video at 375, 768, 1024 and 1440 px | 1. Open the block library page at each width | No horizontal overflow; layout follows the responsive rules of the README | Passed | No horizontal overflow at 375, 768, 1024, 1440 px on 3 pages | Edge Delivery live, Chromium (Playwright) | screenshots in the block folder | — | Automated (documentation program) | 13 November 2026 |

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
