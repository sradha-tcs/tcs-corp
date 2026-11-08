---
id: "DEV-T-image-collage"
title: "Image Collage Block — Test Coverage"
role: "Development"
topic: "tests"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: ["image-collage"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Image Collage Block — Test Coverage

| Attribute | Value |
| --- | --- |
| Document ID | DEV-T-image-collage |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Unit tests, automated reference-page checks and manual test guidance for the block |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Unit tests](#unit-tests)
- [Automated checks of the block library pages (executed 8 November 2026)](#automated-checks-of-the-block-library-pages-executed-8-november-2026)
- [Manual test guidance (block README)](#manual-test-guidance-block-readme)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Unit tests

No unit test is specific to this block (shared tests: test/models, test/items, test/docs, test/motion).

## Automated checks of the block library pages (executed 8 November 2026)

Per page: HTTP status and horizontal overflow at 375 / 768 / 1024 / 1440 px, console errors, failed requests and DOM accessibility checks at 1440 px (evidence: [screenshot register](../../../SCREENSHOT-REGISTER.md)).

No block library page.

## Manual test guidance (block README)

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| IC-QA-01 | Default | Title, Description, two CTAs, nine images | Text centred, CTAs in one row, nine black and white images |
| IC-QA-02 | Colour image | Image treatment Normal on one item | That image in colour |
| IC-QA-03 | More than nine | Ten items | Nine images on the page; the tenth only as an editor placeholder |
| IC-QA-04 | Empty item | An item without image | Not on the page; an editor placeholder in Universal Editor |
| IC-QA-05 | Hidden title | Title hidden on | Title not visible, still in the accessibility tree |
| IC-QA-06 | New tab | CTA target New window | `target="_blank"` and the hidden "(opens in a new tab)" text |
| IC-QA-07 | Long CTA label | A 30-character label | The button grows; the label isn't cut off |
| IC-QA-08 | Viewports | 375 / 768 / 1024 / 1440px | Layouts as in Responsive Behavior |
| IC-QA-09 | Reduced motion | `prefers-reduced-motion: reduce` | The images don't float |

Test cases: [05-quality-assurance/test-cases/blocks/image-collage](../../../05-quality-assurance/test-cases/blocks/image-collage/IMAGE-COLLAGE-TEST-CASES.md).

## Screenshots

No block library page: no evidence screenshot.

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
