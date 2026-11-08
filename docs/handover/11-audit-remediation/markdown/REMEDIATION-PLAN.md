---
id: "AUD-009"
title: "Remediation Plan"
role: "Audit and remediation"
topic: ""
audience: "Technical lead, QA lead, documentation owner, product owner"
owner: "Documentation Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Remediation Plan

| Attribute | Value |
| --- | --- |
| Document ID | AUD-009 |
| Audience | Technical lead, QA lead, documentation owner, product owner |
| Purpose | What to correct, by whom |
| Scope | — |
| Prerequisites | — |
| Owner | Documentation Owner (proposed) |
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

| ID | Finding | Severity | Affected role | Affected component / page | Root cause | Recommended correction | Owner | Dependency | Target release | Status | Evidence | Documentation impact | Code impact | Content impact | Test impact |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| REM-001 | 185 different requests to /content/tcs-corp/design-block-master/english/... fail with 404 (fragments, modal content, references written with the copied root's former name), e.g. 404 https://main--tcs-corp--sradha-tcs.aem.live/content/tcs-corp/design-block-master/english/block-library/anchor-list.html; 404 https://main--tcs-corp--sradha-tcs.aem.live/content/tcs-corp/design-block-master/english/block-library/columns.html; 404 https://main--tcs-corp--sradha-tcs.aem.live/content/tcs-corp/design-block-master/english/block-library/table.html | Major | Author | /design-block-master/en fragments and links | Content copied or changed on the author | Correct on the author, republish | Content Lead | — | To be confirmed | Open | evidence.json (failed requests) | Update the affected documents | None | Yes | Retest the related cases |
| REM-002 | 404 https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/english/references/footer-conversation-canvas.plain.html fails on 193 reference pages (one root cause: content of /design-block-master/en refers to /design-block-master/english/...) | Major | Author | Shared reference | Content copied or changed on the author | Correct on the author, republish | Content Lead | — | To be confirmed | Open | evidence.json (failed requests) | Update the affected documents | None | Yes | Retest the related cases |
| REM-003 | Failures specific to 1 block library page(s): /design-block-master/en/block-library/cards/images-panels-style-options (Failed to load resource: net::ERR_UNKNOWN_URL_SCHEME; Failed to load resource: net::ERR_UNKNOWN_URL_SCHEME) | Minor | Developer | cards | Implementation | Fix with tests, PR into main | Technical Lead | — | To be confirmed | Open | evidence.json | Update the affected documents | Yes | None | Retest the related cases |
| REM-004 | Horizontal overflow: /design-block-master/en/block-library/columns-container/columns-of-blocks at 1024 px | Major | Developer | columns-container | Implementation | Fix with tests, PR into main | Technical Lead | — | To be confirmed | Open | evidence.json, screenshots | Update the affected documents | Yes | None | Retest the related cases |
| REM-005 | Failures specific to 1 block library page(s): /design-block-master/en/block-library/embed/embed (failed https://partners.example.com/market-explorer; failed https://partners.example.com/market-explorer) | Minor | Developer | embed | Implementation | Fix with tests, PR into main | Technical Lead | — | To be confirmed | Open | evidence.json | Update the affected documents | Yes | None | Retest the related cases |
| REM-006 | Failures specific to 1 block library page(s): /design-block-master/en/block-library/hero/hero-overview (404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/animations/lottie-sample.json; 404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/animations/lottie-sample.json) | Minor | Developer | hero | Implementation | Fix with tests, PR into main | Technical Lead | — | To be confirmed | Open | evidence.json | Update the affected documents | Yes | None | Retest the related cases |
| REM-007 | Horizontal overflow: /design-block-master/en/block-library/table/table at 375/768/1024/1440 px | Major | Developer | table | Implementation | Fix with tests, PR into main | Technical Lead | — | To be confirmed | Open | evidence.json, screenshots | Update the affected documents | Yes | None | Retest the related cases |
| REM-008 | Failures specific to 1 block library page(s): /design-block-master/en/block-library/teaser/layouts (404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/animations/lottie-sample.json; 404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/animations/lottie-sample.json) | Minor | Developer | teaser | Implementation | Fix with tests, PR into main | Technical Lead | — | To be confirmed | Open | evidence.json | Update the affected documents | Yes | None | Retest the related cases |
| REM-009 | Horizontal overflow: /design-block-master/en/block-library/testimonial/testimonial-variations at 375/768/1024 px | Major | Developer | testimonial | Implementation | Fix with tests, PR into main | Technical Lead | — | To be confirmed | Open | evidence.json, screenshots | Update the affected documents | Yes | None | Retest the related cases |
| REM-010 | Failures specific to 1 block library page(s): /design-block-master/en/block-library/video/video (404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/videos/sample-video.mp4; 404 https://main--tcs-corp--sradha-tcs.aem.live/content/dam/tcs-corp/block-library/videos/sample-video.mp4) | Minor | Developer | video | Implementation | Fix with tests, PR into main | Technical Lead | — | To be confirmed | Open | evidence.json | Update the affected documents | Yes | None | Retest the related cases |
| REM-011 | Two Form Variations motion tests fail ("offers Content animation after Hide block", "offers Background animation only on blocks with an authored background"); known before this program; fix awaits approval | Major | Developer | test/motion/motion.test.mjs | Implementation | Fix with tests, PR into main | Technical Lead | — | To be confirmed | Open | npm test log | Update the affected documents | Yes | None | Retest the related cases |
| REM-012 | Pages link to the testing root /language-master/en (1281 links) and to unmapped /content/tcs-corp/design-block-master/english paths (358 links) | Major | Author | /design-block-master/en | Content copied or changed on the author | Correct on the author, republish | Content Lead | — | To be confirmed | Open | links-dbm.json | Update the affected documents | None | Yes | Retest the related cases |
| REM-013 | The /en locale content was unpublished and deleted from Edge Delivery on 8 November 2026 16:41–16:48 UTC by the AEM publishing technical account (author-side); /en/ answers 404 | Critical | Author | /en locale | Content copied or changed on the author | Correct on the author, republish | Content Lead | — | To be confirmed | Open | Admin API log | Update the affected documents | None | Yes | Retest the related cases |
| REM-014 | On block library pages that start with default content, the header logo overlaps the page title at 1440 px (e.g. accordion/accordion) | Minor | Developer | Header over the first block | Implementation | Fix with tests, PR into main | Technical Lead | — | To be confirmed | Open | screenshot block-library-accordion-accordion-1440.jpg | Update the affected documents | Yes | None | Retest the related cases |
| REM-015 | "There are no items to show" on 17 reference page(s): /design-block-master/en/block-library/animation/repeated-items, /design-block-master/en/block-library/animation/skeleton-loading, /design-block-master/en/block-library/animation/speed-and-trigger, /design-block-master/en/block-library/foundations/section-colours-with-blocks, /design-block-master/en/block-library/list/card-style-from-pages | Minor | Author | List / Table List | Content copied or changed on the author | Correct on the author, republish | Content Lead | — | To be confirmed | Open | evidence.json | Update the affected documents | None | Yes | Retest the related cases |
| REM-016 | Not published after 4 tries: /design-block-master/en/error-pages/404 (the root has no error pages) | Minor | Author | Publishing | Content copied or changed on the author | Correct on the author, republish | Content Lead | — | To be confirmed | Open | publishing state | Update the affected documents | None | Yes | Retest the related cases |

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
