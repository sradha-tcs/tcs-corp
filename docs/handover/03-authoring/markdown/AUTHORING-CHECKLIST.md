---
id: "AUT-017"
title: "Authoring Checklist"
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

# Authoring Checklist

| Attribute | Value |
| --- | --- |
| Document ID | AUT-017 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | Pre-publish and post-publish checks |
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

- [Pre-publish checklist](#pre-publish-checklist)
- [Post-publish validation](#post-publish-validation)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Pre-publish checklist

- [ ] Title and Description set; Page Type correct; Navigation, Footer and 404 Page empty unless the page needs its own.
- [ ] One `h1`; headings in order.
- [ ] Alt text on informative images and file references; decorative images empty.
- [ ] Links point to published paths and to pages that are published; new-tab links only where needed.
- [ ] No block unintentionally hidden (faded blocks in edit mode); no confidential content anywhere on the page.
- [ ] Anchor IDs start with `anchor-` and are used once per page.
- [ ] Checked in Preview mode at mobile, tablet and desktop.
- [ ] Referenced fragments, sheets and non-image assets are published or selected in the Publish dialog.
- [ ] New placeholder keys and tags exist in the locale's sheets.
- [ ] Bulk metadata rows cover the page (URL pattern starts with the locale).

## Post-publish validation

- [ ] The live URL in a private window shows the change, with the locale's header and footer.
- [ ] Lists and Filter Lists that should show the page list it (after a few minutes) and `/query-index.json` has its row.
- [ ] UI labels are translated (locale `placeholders.json` published) and tags show titles.
- [ ] Lottie, video and caption files load (published assets).
- [ ] The page head has the expected `description`, `page-type` and tags.

This is the author definition of done V-01 of handover Part 17 — Operations Guide.

## Screenshots

> **Screenshot required**
>
> - Required screen: Authoring Checklist
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
