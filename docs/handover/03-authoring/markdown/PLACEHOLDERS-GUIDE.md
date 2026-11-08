---
id: "AUT-011"
title: "Placeholders Guide"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["utils/placeholders.js"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Placeholders Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-011 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | The placeholders sheet (UI text) per locale and review root |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | utils/placeholders.js |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Placeholders](#placeholders)
- [Placeholders](#placeholders-1)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Placeholders

**Purpose.** All user-facing UI text in code is authorable and translated per locale (AGENTS.md "Accessibility": all UI text comes from placeholders).

**Structure.** `/{locale}/placeholders.json` with columns Key, Text, Description, Category; code uses Key and Text. Keys are compared without case and separators (`Pause Slides`, `pause-slides` and `pauseSlides` match `pauseSlides`). `{name}` variables are filled by `fillPlaceholder`.

**Consumers.** `const t = await getPlaceholders(); t('nextSlide', 'Next slide')` in every block with UI text, the header, footer and `scripts.js` (404 "Go back", key `goBack`). Source: [`utils/placeholders.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/placeholders.js); key lists per block in the block READMEs ("For Site Administrators").

**Rules.** Code always passes an English fallback. There is no fallback from a locale's sheet to the English sheet: a key missing in `/de-de/placeholders.json` shows the code's English text (handover Part 4.9.3).

**Common mistakes.** Editing the sheet without publishing it; adding a new key in code without adding it to the 13 sheets. Full key list: handover Part 4.5.3.

## Placeholders

All UI text of the blocks (button labels, ARIA labels, editor hints) comes from the locale's `placeholders` sheet (Key, Text; Description and Category are for authors) through [utils/placeholders.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/placeholders.js). Keys match without case or separators; a missing key shows the code's English fallback (not the `/en` sheet's text). Keep `{n}`, `{total}`, `{title}` and similar variables. The key list is in handover Part 4, 4.5 and Part 14, 14.8.3.

## Screenshots

> **Screenshot required**
>
> - Required screen: Placeholders Guide
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
