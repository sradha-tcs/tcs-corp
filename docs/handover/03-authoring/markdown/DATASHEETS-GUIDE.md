---
id: "AUT-012"
title: "Data Sheets Guide"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["utils/data.js"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Data Sheets Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-012 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | Authors, locations, partners, social links, media contacts and redirects sheets |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | utils/data.js |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Data sheets](#data-sheets)
- [Redirects](#redirects)
- [Redirects sheet (8 November 2026)](#redirects-sheet-8-november-2026)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Data sheets

**Purpose.** Shared structured data per locale, maintained by authors as AEM spreadsheets.

**Structure and consumers** ([`utils/data.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/data.js); each sheet loaded once per page view, values trimmed, missing sheets give empty lists):

| Sheet (`/{locale}/data/…json`) | Columns | Read by |
| --- | --- | --- |
| `authors` | `author-id`, `name`, `designation`, `bio`, `image`, `linkedin`, `region` | Page Header (`getAuthor`, case-insensitive id), article / blog templates, List feature card and Filter List spotlights (`getAuthors`) |
| `social-links` | `platform`, `url`, `icon`, `sort-order` | Footer (in `sort-order`, rows without one last) |
| `media-contacts` | `id`, `name`, `designation`, `email`, `phone`, `region` | Media Contacts block (`blocks/media-contacts`: `inRegion` by the page's `region`, else all; grouped by designation and region) |
| `locations` | `location-id`, `location-name`, `country`, `region`, `latitude`, `longitude` | `getLocations()` only; no component reads it (handover F-40) |
| `partners` | `partner-id`, `partner-name`, `logo`, `website`, `tier`, `description` | `getPartners()` only; no component reads it (handover F-40) |

**Rules.** The query index excludes `/*/data/**`. Sheet JSON is public: the Authors and Media Contacts sheets publish names, e-mail addresses and phone numbers by design. Column reference and authoring steps: handover Part 9 — Data Sheets Documentation.

**Common mistakes.** An `author-id` on a page that differs from the sheet in case (Filter List and List match exactly; Page Header case-insensitively, handover F-30); unpublished sheets in non-English locales.

## Redirects

**Purpose.** Per-locale lists of moved pages.

**Structure.** `/{locale}/redirects.json` with Source and Destination columns (either case).

**Rules and status.**

- The platform applies only a root `/redirects.json`; the per-locale sheets are **not applied** automatically. Redirects, including `/` → `/en/`, need another mechanism such as CDN rules (AGENTS.md "Notes"; handover Part 3.8; findings F-36, 16.4). Status: Requires validation (no mechanism configured).
- In code only the List block uses the sheet: `resolveRedirect` points card links to the final target, at most 5 hops, stopping at loops and external destinations ([`utils/redirects.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/redirects.js)). Filter List, navigation and running text links aren't rewritten.
- Sources must start with `/` (rows without a destination are ignored); paths are compared without query, hash, `.html` and trailing slash.

**Common mistakes.** Expecting a sheet row to redirect visitors; chains of redirects (point sources at final destinations).

## Redirects sheet (8 November 2026)

The consolidated redirects sheet maps the tcs.com path of each of the 8,432 migrated pages (e.g. `/careers`) to its page below `/language-masters/en`; per-locale redirects sheets aren't applied by the platform (a CDN rule is needed, on hold).

## Screenshots

> **Screenshot required**
>
> - Required screen: Data Sheets Guide
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
