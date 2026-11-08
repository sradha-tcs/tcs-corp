---
id: "AUT-009"
title: "Taxonomy and Tagging Guide"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["utils/taxonomy.js"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Taxonomy and Tagging Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-009 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | Tags, the taxonomy page and how lists use them |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | utils/taxonomy.js |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Taxonomy](#taxonomy)
- [Taxonomy](#taxonomy-1)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Taxonomy

**Purpose.** Tag IDs on pages and in block fields are turned into localised labels at runtime.

**Structure.** Tags are maintained in AEM Tagging; a taxonomy page per locale (`/content/tcs-corp/{country}/{language}/taxonomy`) is published as `/{locale}/taxonomy.json` with columns `tag` and `title`. With translated titles the JSON is multi-sheet: `loadTaxonomy()` reads the sheet named after the locale's ISO 639-1 language (`de`), else `default`, else the first sheet (`sheetRows`).

**Consumers.** `resolveTags(values)` ([`utils/taxonomy.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/taxonomy.js)): a value with a taxonomy entry gets its title; a value containing `:` or `/` without an entry gets a label derived from the ID (`parseTag`, `utils/tags.js`); any other value is shown as written. Used by Teaser, Page Header, List, Cards, Filter List and Conversation Canvas.

**Rules.** The published namespace is `tcs-corp:` (handover Part 7.1.2; finding F-08: some help texts and examples use `tcs:`). Pick tags with the tag picker; the `aem-tag` fields don't restrict the namespace (handover Part 7.1.1). A selected tag also matches its child tags in List (`hasTag`, handover Part 7.2.2).

**Example.** `tcs-corp:region/europe` → `Europe` from `/en/taxonomy.json`; without a taxonomy entry, an ID-derived label.

**Common mistakes.** Typing tag IDs by hand; not publishing the locale's taxonomy page (labels fall back to IDs; handover F-09 records that only `/en/taxonomy.json` was published when checked); translating tag titles without republishing the taxonomy page. Governance and lifecycle: handover Part 7 — Taxonomy Documentation.

## Taxonomy

- Tags are AEM tags (`tcs-corp:` namespace) set in page properties and in block tag fields (Teaser, Cards, List Items, List, Filter List).
- Labels come from the locale's taxonomy page (`/{locale}/taxonomy.json`; a language sheet such as `de` when translated) through [utils/taxonomy.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/taxonomy.js); a tag missing there shows a label derived from its ID.
- Publish the taxonomy page after a change; Lists and Filter Lists match tags from the query index, so republish pages after re-tagging. Governance: handover Part 7 — Taxonomy Documentation.

## Screenshots

> **Screenshot required**
>
> - Required screen: Taxonomy and Tagging Guide
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
