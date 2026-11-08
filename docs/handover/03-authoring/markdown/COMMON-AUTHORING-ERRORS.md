---
id: "AUT-018"
title: "Common Authoring Errors"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
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

# Common Authoring Errors

| Attribute | Value |
| --- | --- |
| Document ID | AUT-018 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | Frequent authoring mistakes and how to recover |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Troubleshooting](#troubleshooting)
- [Common Errors](#common-errors)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Troubleshooting

| Symptom | Likely cause | Handover chapter (Part 13 — Global Troubleshooting Guide) |
| --- | --- | --- |
| Page not updated after publish | Published to preview only, reference not published, browser cache | 13.2 |
| Dialog fields missing or outdated | Editor not reloaded after a code release | 13.5 |
| Wrong header or footer | Inherited Navigation / Footer value; session cache | 13.6 |
| English or built-in 404 in a locale | Locale 404 page not published | 13.7 |
| Page missing from List / Filter List | Not published, excluded, `hide-in-nav`, filters | 13.9, 13.11 |
| List or Filter List empty in the editor | No query index on author (expected) | 13.10 |
| UI text in English | Key missing or sheet not published | 13.13 |
| Tag shows an ID-like label | Taxonomy title missing or not published | 13.14 |
| Bulk metadata ignored | `metadata.source` not configured or pattern wrong | 13.17 |
| Block missing on the site | Hide block on | 13.18 |
| Anchor link doesn't jump | Missing `anchor-` prefix or duplicate id | 13.19 |
| Lottie, video or captions 404 | Non-image asset not published | 13.30 and [REAUDIT-2026-10-20.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/REAUDIT-2026-10-20.md) |
| Fragment, modal or tab content missing | Fragment not published | 13.31 |

Escalate to L1 with the AEM and published path, locale, steps, screenshot and time (handover Part 14, 14.5).

## Common Errors

| Symptom | Cause | Fix |
| --- | --- | --- |
| Dialog field missing or outdated in Universal Editor | `component-*.json` not rebuilt or not deployed | `npm run build:json`, commit, wait for code sync (handover 13.5) |
| Value saved but not on the page | Collapse suffix, grouped field in a key-value block, or `classes_*` on a section | Rename per the delivery rules; keep reading the old name |
| Block renders empty or shifted on aem.page but fine locally | An empty tab row or tab cell read as content; item first cell `<name>, <classes>` | Skip tab rows / cells (`withoutTabCells`), read by model |
| Every new item shows the same text | Sample text in the template or model default | Empty the template; use placeholders for UI text |
| `max-cells` lint error | Too many cells in a non key-value model | Make the block key-value, group or fold fields, or raise the limit with a reason in `.eslintrc.js` |
| Block class wrong or block code not loaded | Template name doesn't match the folder | Fix the template name (`test/models/block-names.test.mjs`) |
| Key lower-cased | Item `name` delivered in class-name form | A dedicated field (`fieldName`) |

## Screenshots

> **Screenshot required**
>
> - Required screen: Common Authoring Errors
> - Required role/access: AEM Sites author with Universal Editor (content author)
> - Required navigation steps: AEM Sites console > /content/tcs-corp/language-masters/en > open a page in Universal Editor
> - Reason unavailable: No AEM author access in the documentation program (access blocker AB-01)
> - Owner: Content Lead / AEM Authoring Lead (proposed)
> - Target completion date: To be confirmed

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
