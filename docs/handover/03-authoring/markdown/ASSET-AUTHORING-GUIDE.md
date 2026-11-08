---
id: "AUT-007"
title: "Asset Authoring Guide"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["docs/handover/knowledge-base/authoring.md"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Asset Authoring Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-007 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | Adding assets, alt text, and the Dynamic Media decision |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | docs/handover/knowledge-base/authoring.md |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Dynamic Media (KB-D-067)](#dynamic-media-kb-d-067)
- [Assets](#assets)
- [Accessibility responsibilities](#accessibility-responsibilities)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Dynamic Media (KB-D-067)

The assets are in the Sites author's DAM (`/content/dam/tcs-corp`). Dynamic Media with OpenAPI delivers **approved** assets; the migrated pages below `/language-masters/en` reference them by delivery URL once rebuilt. Authors will pick assets with the Dynamic Media asset picker after the administrator set-up (pull request #200, not merged yet); until then the image fields keep the standard asset picker.

## Assets

- Images and documents live in AEM Assets under `/content/dam/tcs-corp/`; image fields (`reference`) open the Assets picker.
- **Images travel with the page**: on publish, Edge Delivery copies each referenced image to the media bus (`media_…` URLs) and serves responsive renditions. The first image of the first section loads eagerly (LCP), the others lazily.
- **Non-image DAM files** (Lottie `.json`, videos, WebVTT captions, PDFs) are served only once they are published themselves; until then they return 404 on `aem.page` ([AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#blocks), "AEM delivery rules"; re-audit operations R-B-2, R-D-6). Publish them from AEM Assets.
- A non-image reference is delivered as a link whose text is its **Alt**: fill the Alt field of Lottie and other file references (`animationLabel` in [utils/media.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/media.js)).
- Alt text: describe informative images; leave it empty only for decorative images (the code then sets `alt=""`); don't put text inside images. Rules and image guidance: handover Part 5, 5.5.
- Image licensing rules and the DAM folder convention per locale are not recorded.

## Accessibility responsibilities

The code implements WCAG 2.1 AA behaviour ([AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#blocks), "Accessibility"); authors are responsible for the content:

- One `h1` per page (Page Header, a Hero with H1 or a Title h1) and heading levels in order; don't choose a level for its size.
- Alt text for every informative image and every Lottie / file reference; empty only for decorative images.
- Meaningful link and button text (not "click here"); the Accessibility label fields of List Items and Cards where the visible text isn't enough.
- Captions for videos with speech (WebVTT, published as an asset).
- Don't rely on colour alone; use the Section Style and BG Color options, which keep the theme contrast.
- Use animations sparingly (one or two effects per page); reduced motion is honoured by the code.

## Screenshots

> **Screenshot required**
>
> - Required screen: Asset Authoring Guide
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
