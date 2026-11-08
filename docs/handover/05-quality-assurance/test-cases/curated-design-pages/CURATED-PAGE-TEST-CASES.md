---
id: "QA-TC-CDP"
title: "Curated Design Pages — Test Cases"
role: "Quality assurance"
topic: "test cases"
audience: "QA lead, testers, release lead"
owner: "QA Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["published pages"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: false
---

# Curated Design Pages — Test Cases

| Attribute | Value |
| --- | --- |
| Document ID | QA-TC-CDP |
| Audience | QA lead, testers, release lead |
| Purpose | One automated case per curated design page plus manual cases |
| Scope | — |
| Prerequisites | — |
| Owner | QA Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | published pages |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Automated (executed 8 November 2026)](#automated-executed-8-november-2026)
- [Manual (Not Run)](#manual-not-run)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Automated (executed 8 November 2026)

| ID | Kind | Variation | Objective | Steps | Expected | Status | Actual | Environment | Evidence | Defect | Tester | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-CDP-001 | Curated page | — | Curated page case-study renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 4 console errors, 4 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-002 | Curated page | — | Curated page collection renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 4 console errors, 4 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-003 | Curated page | — | Curated page ar-landing renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 8 console errors, 8 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-004 | Curated page | — | Curated page csr renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 8 console errors, 8 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-005 | Curated page | — | Curated page csr-form renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 8 console errors, 8 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-006 | Curated page | — | Curated page global-contact-us renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 8 console errors, 8 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-007 | Curated page | — | Curated page inquizitive renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 8 console errors, 8 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-008 | Curated page | — | Curated page media-form renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 8 console errors, 8 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-009 | Curated page | — | Curated page talk-to-an-expert-retail renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 8 console errors, 8 failed requests; overflow at 375, 768, 1024, 1440; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-010 | Curated page | — | Curated page website-feedback-form renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 8 console errors, 8 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-011 | Curated page | — | Curated page home renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Passed | ok; overflow at none; 3 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-012 | Curated page | — | Curated page industry-landing-page renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 4 console errors, 4 failed requests; overflow at none; 3 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-013 | Curated page | — | Curated page insights renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 4 console errors, 4 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-014 | Curated page | — | Curated page media-and-investor renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 4 console errors, 4 failed requests; overflow at none; 2 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-015 | Curated page | — | Curated page news-and-events renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 8 console errors, 8 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-016 | Curated page | — | Curated page product renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 4 console errors, 4 failed requests; overflow at none; 1 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-017 | Curated page | — | Curated page services renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 4 console errors, 4 failed requests; overflow at none; 1 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-018 | Curated page | — | Curated page story renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 8 console errors, 8 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-019 | Curated page | — | Curated page what-we-do renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 4 console errors, 4 failed requests; overflow at none; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |
| TC-CDP-020 | Curated page | — | Curated page who-we-are renders and is accessible | 1. Open the page at 375, 768, 1024, 1440 px 2. Check console, network, overflow, headings, alt text | 200 everywhere, no console error or failed request, no overflow | Failed | 12 console errors, 12 failed requests; overflow at 1024; 0 empty lists | Edge Delivery live, Chromium (Playwright) | evidence.json, page screenshots | — | Automated (documentation program) | 8 November 2026 |

## Manual (Not Run)

- Compare each page with its Figma design (Requires Manual Validation).
- Compare Universal Editor, preview and live (Blocked: no author access).

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
