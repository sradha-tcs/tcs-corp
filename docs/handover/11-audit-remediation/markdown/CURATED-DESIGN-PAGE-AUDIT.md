---
id: "AUD-003"
title: "Curated Design Page Audit"
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

# Curated Design Page Audit

| Attribute | Value |
| --- | --- |
| Document ID | AUD-003 |
| Audience | Technical lead, QA lead, documentation owner, product owner |
| Purpose | The curated design pages: checks, links, duplicate compositions |
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

- [Pages reviewed (20)](#pages-reviewed-20)
- [Links of /design-block-master/en](#links-of-design-block-masteren)
- [Identical compositions](#identical-compositions)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Pages reviewed (20)

| Page | Blocks | Console errors | Failed requests | Empty lists | H1 | Images without alt |
| --- | --- | --- | --- | --- | --- | --- |
| case-study | 13 | 4 | 4 | 0 | 1 | 0 |
| collection | 5 | 4 | 4 | 0 | 1 | 0 |
| forms/ar-landing | 1 | 8 | 8 | 0 | 0 | 0 |
| forms/csr | 1 | 8 | 8 | 0 | 0 | 0 |
| forms/csr-form | 1 | 8 | 8 | 0 | 0 | 0 |
| forms/global-contact-us | 1 | 8 | 8 | 0 | 0 | 0 |
| forms/inquizitive | 1 | 8 | 8 | 0 | 0 | 0 |
| forms/media-form | 2 | 8 | 8 | 0 | 0 | 0 |
| forms/talk-to-an-expert-retail | 1 | 8 | 8 | 0 | 0 | 0 |
| forms/website-feedback-form | 1 | 8 | 8 | 0 | 0 | 0 |
| home | 9 | 0 | 0 | 3 | 1 | 0 |
| industry-landing-page | 15 | 4 | 4 | 3 | 1 | 0 |
| insights | 4 | 4 | 4 | 0 | 1 | 0 |
| media-and-investor | 10 | 4 | 4 | 2 | 1 | 0 |
| news-and-events | 5 | 8 | 8 | 0 | 1 | 0 |
| product | 9 | 4 | 4 | 1 | 0 | 0 |
| services | 12 | 4 | 4 | 1 | 2 | 0 |
| story | 35 | 8 | 8 | 0 | 1 | 0 |
| what-we-do | 22 | 4 | 4 | 0 | 1 | 0 |
| who-we-are | 15 | 12 | 12 | 0 | 3 | 0 |

## Links of /design-block-master/en

| Measure | Value |
| --- | --- |
| Pages analysed | 335 |
| Links by target | to /language-master/en: 1281; unmapped AEM path: 380; external: 20; own root: 15; locale or other: 7; dam: 35 |
| Links to pages that aren't published | 7 |
| Unmapped AEM paths | /content/tcs-corp/design-block-master/english: 358; /content/campaigns: 1; /content/dam: 2; /content/2026: 2; /content/tcs-corp/language-master: 1; /content/aem-eds-xwalk: 1; /content/cq:i18n: 15 |
| Links to another root | /design-block-master/en -> /language-master/en: 1281 |

The curated and block library pages were copied from the testing root: their links still point to `/language-master/en`, and links written as `/content/tcs-corp/design-block-master/english/...` don't resolve (the root's page is `en`). Correct them on the author (search and replace of the two prefixes by `/content/tcs-corp/design-block-master/en`).

## Identical compositions

- /design-block-master/en/curated-design-pages/forms/ar-landing, /design-block-master/en/curated-design-pages/forms/csr, /design-block-master/en/curated-design-pages/forms/csr-form, /design-block-master/en/curated-design-pages/forms/global-contact-us, /design-block-master/en/curated-design-pages/forms/inquizitive, /design-block-master/en/curated-design-pages/forms/talk-to-an-expert-retail, /design-block-master/en/curated-design-pages/forms/website-feedback-form: form-variations

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
