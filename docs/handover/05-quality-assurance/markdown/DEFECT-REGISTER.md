---
id: "QA-022"
title: "Defect Register"
role: "Quality assurance"
topic: ""
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "High"
primary: true
---

# Defect Register

| Attribute | Value |
| --- | --- |
| Document ID | QA-022 |
| Audience | QA lead, testers, release lead |
| Purpose | Defects found in this program |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

| ID | Severity | Subject | Finding | Area | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- |
| DEF-001 | Major | /design-block-master/en fragments and links | 185 different requests to /content/tcs-corp/design-block-master/english/... fail with 404 (fragments, modal content, references written with the copied root's former name), e.g. 404 https://main--tcs-corp--sradha-tcs.aem.live/content/tcs-corp/design-block-master/english/block-library/anchor-list.html; 404 https://main--tcs-corp--sradha-tcs.aem.live/content/tcs-corp/design-block-master/english/block-library/columns.html; 404 https://main--tcs-corp--sradha-tcs.aem.live/content/tcs-corp/design-block-master/english/block-library/table.html | Content | evidence.json (failed requests) | Open |
| DEF-002 | Major | Shared reference | 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html fails on 193 reference pages (one root cause: content of /design-block-master/en refers to /design-block-master/english/...) | Content | evidence.json (failed requests) | Open |
| DEF-003 | Minor | cards | Failures specific to 1 block library page(s): /design-block-master/en/block-library/cards/images-panels-style-options (Failed to load resource: net::ERR_UNKNOWN_URL_SCHEME; Failed to load resource: net::ERR_UNKNOWN_URL_SCHEME) | Code or content | evidence.json | Open |
| DEF-004 | Major | columns-container | Horizontal overflow: /design-block-master/en/block-library/columns-container/columns-of-blocks at 1024 px | Code | evidence.json, screenshots | Open |
| DEF-005 | Minor | embed | Failures specific to 1 block library page(s): /design-block-master/en/block-library/embed/embed (failed https://partners.example.com/market-explorer; failed https://partners.example.com/market-explorer) | Code or content | evidence.json | Open |
| DEF-006 | Minor | hero | Failures specific to 1 block library page(s): /design-block-master/en/block-library/hero/hero-overview (404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/animations/lottie-sample.json; 404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/animations/lottie-sample.json) | Code or content | evidence.json | Open |
| DEF-007 | Major | table | Horizontal overflow: /design-block-master/en/block-library/table/table at 375/768/1024/1440 px | Code | evidence.json, screenshots | Open |
| DEF-008 | Minor | teaser | Failures specific to 1 block library page(s): /design-block-master/en/block-library/teaser/layouts (404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/animations/lottie-sample.json; 404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/animations/lottie-sample.json) | Code or content | evidence.json | Open |
| DEF-009 | Major | testimonial | Horizontal overflow: /design-block-master/en/block-library/testimonial/testimonial-variations at 375/768/1024 px | Code | evidence.json, screenshots | Open |
| DEF-010 | Minor | video | Failures specific to 1 block library page(s): /design-block-master/en/block-library/video/video (404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/videos/sample-video.mp4; 404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/videos/sample-video.mp4) | Code or content | evidence.json | Open |
| DEF-011 | Major | test/motion/motion.test.mjs | Two Form Variations motion tests fail ("offers Content animation after Hide block", "offers Background animation only on blocks with an authored background"); known before this program; fix awaits approval | Code | npm test log | Open |
| DEF-012 | Major | /design-block-master/en | Pages link to the testing root /language-master/en (1281 links) and to unmapped /content/tcs-corp/design-block-master/english paths (358 links) | Content | links-dbm.json | Open |
| DEF-013 | Critical | /en locale | The /en locale content was unpublished and deleted from Edge Delivery on 8 November 2026 16:41–16:48 UTC by the AEM publishing technical account (author-side); /en/ answers 404 | Content | Admin API log | Open |
| DEF-014 | Minor | Header over the first block | On block library pages that start with default content, the header logo overlaps the page title at 1440 px (e.g. accordion/accordion) | Code or content | screenshot block-library-accordion-accordion-1440.jpg | Open |
| DEF-015 | Minor | List / Table List | "There are no items to show" on 17 reference page(s): /design-block-master/en/block-library/animation/repeated-items, /design-block-master/en/block-library/animation/skeleton-loading, /design-block-master/en/block-library/animation/speed-and-trigger, /design-block-master/en/block-library/foundations/section-colours-with-blocks, /design-block-master/en/block-library/list/card-style-from-pages | Content | evidence.json | Open |
| DEF-016 | Minor | Publishing | Not published after 4 tries: /design-block-master/en/error-pages/404 (the root has no error pages) | Content | publishing state | Open |
| DEF-017 | Minor | Publishing | Not published after 4 tries: 125 pages: see consolidated/reports/NOT-PUBLISHED-LANGUAGE-MASTERS-2026-11-08.csv on the delivery branch | Content | publishing state | Open |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
