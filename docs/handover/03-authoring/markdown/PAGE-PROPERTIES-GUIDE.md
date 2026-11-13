---
id: "AUT-003"
title: "Page Properties Guide"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: ["models/_page.json","docs/handover/knowledge-base/content-architecture.md"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Page Properties Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-003 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | The page properties and the bulk metadata columns |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | models/_page.json, docs/handover/knowledge-base/content-architecture.md |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Page properties (model page-metadata)](#page-properties-model-page-metadata)
- [Metadata model](#metadata-model)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Page properties (model page-metadata)

| Label | Property | Type | Description |
| --- | --- | --- | --- |
| Title | `jcr:title` | text | — |
| Description | `jcr:description` | text | — |
| Keywords | `keywords` | text | Combined with the metadata sheet's meta-keywords as its keyword-action column says: default (or empty), these win; override, the sheet's win; merge, both, these first. |
| Page Type | `page-type` | select | The Site Global Template of the page (layout and template code). Overrides the page-type column of the metadata sheet. |
| Navigation | `nav` | aem-content | The header (nav) page of this page and, unless they set their own, its child pages. Empty: the nearest parent page's Navigation (or the metadata sheet's nav column), else the locale's references/nav. |
| Footer | `footer` | aem-content | The footer page of this page and, unless they set their own, its child pages. Empty: the nearest parent page's Footer (or the metadata sheet's footer column), else the locale's references/footer. |
| 404 Page | `error-page` | aem-content | The page shown when a page below this one isn't found. Empty: the nearest parent page's 404 Page (or the metadata sheet's error-page column), else the locale's error-pages/404. |

Navigation, Footer and 404 Page are inherited by child pages from the nearest parent that sets them, up to the root page; else the root's references/nav, references/footer and error-pages/404 are used.

## Metadata model

**Purpose.** Page-level values (SEO, social, card content, page type, author, dates, flags) that code, the query index and the data layer read. Every value is a `<meta>` in the server-delivered head.

**Sources and precedence.**

| Source | Where authored | Published as |
| --- | --- | --- |
| Page properties (`models/_page.json`) | Universal Editor page properties | `<title>`, `description`, `keywords`, `page-type`, `nav`, `footer`, `error-page` metas |
| Standard AEM page properties | Sites console (e.g. Tags `cq:tags`) | `cq-tags` (one comma-separated meta) |
| Bulk metadata sheet | `/content/tcs-corp/{country}/{language}/metadata` | `/{locale}/metadata.json`; each column becomes `<meta name="{column}">` on pages matching the row's `url` pattern |

Page-level values win over bulk metadata; bulk rows apply top to bottom (handover Part 8.1.2). The bulk sheets apply only once all 13 are listed in the site configuration's `metadata.source`, and each sheet's URL patterns must start with its locale (`/de-de/**`) (AGENTS.md "Notes").

**Bulk metadata columns** (AGENTS.md, 42 columns): `url`, `page-type`, `meta-title`, `meta-description`, `meta-keywords`, `keyword-action`, `author-id`, `publish-date`, `modified-date`, `reading-time`, `og-title`, `og-description`, `og-image`, `og-type`, `twitter-card`, `twitter-title`, `twitter-description`, `twitter-image`, `canonical-url`, `robots`, `region`, `country`, `language`, `persona`, `thumbnail-image`, `featured-image`, `campaign-id`, `content-type`, `featured`, `priority`, `listen-link`, `author`, `card-title`, `card-description`, `card-image`, `card-image-alt`, `image-alt`, `eyebrow`, `category`, `hide-in-nav`, `card-style`, `card-theme`.

**Consumers.**

| Consumer | Reads | Source |
| --- | --- | --- |
| SEO decorator (eager) | `meta-title` → `<title>`; `meta-description`; `meta-keywords` combined with the page dialog's Keywords by `keyword-action` (`default` or empty: the dialog's; `override`: the sheet's; `merge`: both, the dialog's first; `utils/keywords.js`); `og-*` (falling back to `meta-*`); `twitter-*` (falling back to `og-*`, `meta-*`); `canonical-url` → `<link rel="canonical">` and `og:url`; `language` → `<html lang>` | [`decorators/seo-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/seo-decorator.js) |
| `getPageMetadata()` | title, description, image (`featured-image`, else `og:image`), `page-type` (else `template`), `content-type`, `category`, tags, `author-id`, `author`, `publish-date` (else `publication-date`), `modified-date`, `reading-time`, `listen-link`, `thumbnail-image`, `featured-image`, `image-alt`, `region`, `country` (else the locale's), language, `persona`, `campaign-id`, `featured` (yes / true / 1 / on / y), `priority` (number) | [`utils/metadata.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/metadata.js) |
| `getPageTags()` | `article:tag` metas and `cq-tags`, else a comma-separated `tags` meta | `utils/metadata.js` |
| `getPageLanguage()` | `language` when it is a language code, else the locale's `lang` | `utils/metadata.js` |
| Page Header, templates, data layer page entry | `getPageMetadata()` | [page-header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/page-header/README.md), `decorators/data-layer-decorator.js` |
| Query index | the server head (see [indexing-and-search.md](../../01-architecture/markdown/INTEGRATION-ARCHITECTURE.md)) | `helix-query.yaml` |

**Rules.** The query index reads the server-delivered head, so values set by JavaScript (the SEO decorator's) aren't indexed (handover Part 8.1.3). `robots` is a standard name and works server side. Use `card-*`, `eyebrow`, `hide-in-nav`, `card-style`, `card-theme` for List cards (List README "Page metadata contract").

**Example.**

```text
url                   | page-type      | hide-in-nav
/de-de/newsroom/**    | press-release  |
/de-de/insights/**    | article        |
/de-de/legal/imprint  |                | yes
```

**Common mistakes.** A sheet row pattern without the locale prefix; adding columns to a sheet that isn't listed in `metadata.source` (no effect); expecting a metadata change to reach lists before the page is republished and indexed. Field reference per column: handover Part 8 — Metadata Documentation (8.2, 8.4).

## Screenshots

> **Screenshot required**
>
> - Required screen: Page Properties Guide
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
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
