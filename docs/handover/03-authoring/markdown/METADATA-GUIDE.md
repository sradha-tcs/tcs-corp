---
id: "AUT-008"
title: "Metadata Guide"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: ["AGENTS.md","docs/handover/knowledge-base/content-architecture.md"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Metadata Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-008 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | Page properties, the bulk metadata sheet and its columns |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | AGENTS.md, docs/handover/knowledge-base/content-architecture.md |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Bulk metadata columns](#bulk-metadata-columns)
- [Metadata model](#metadata-model)
- [Metadata](#metadata)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Bulk metadata columns

Bulk metadata columns: `url`, `page-type`, `meta-title`, `meta-description`, `meta-keywords`, `keyword-action`, `author-id`, `publish-date`, `modified-date`, `reading-time`, `og-title`, `og-description`, `og-image`, `og-type`, `twitter-card`, `twitter-title`, `twitter-description`, `twitter-image`, `canonical-url`, `robots`, `region`, `country`, `language`, `persona`, `thumbnail-image`, `featured-image`, `campaign-id`, `content-type`, `featured`, `priority`, `listen-link`, `author`, `card-title`, `card-description`, `card-image`, `card-image-alt`, `image-alt`, `eyebrow`, `category`, `hide-in-nav`, `card-style`, `card-theme`. Each column is published as `<meta name="{column}">`; the SEO decorator maps meta-title, meta-description, meta-keywords (with the page dialog's Keywords as `keyword-action` says: `default` or empty, the dialog's win; `override`, the sheet's win; `merge`, both, the dialog's first; `utils/keywords.js`), og-*, twitter-* and canonical-url to the standard tags in the browser (`robots` is standard and works server side). The Page Header takes all its content from metadata: page-type (default layout), title, description, tags, content-type (eyebrow / label), publish-date, reading-time, author-id (Authors sheet: name, designation, region, image, LinkedIn), featured-image (Landing) and listen-link (listen action; share and download come from code); only its Layout and CTA List are authored. The List block (`blocks/list`, see its README) lists child pages, a fixed list (List Items) or tagged pages from the query index, as cards from card-title, card-description, card-image, card-image-alt, eyebrow / category, tags, content-type and the dates (a List Item's authored fields win, field by field, over its linked page's; Card style and Card colour: List Item, else the List's unless Mixed (by page) / Default for the style, else the page's card-style / card-theme, else automatic) (pages with hide-in-nav = yes are left out; links go to the redirect targets of `/{locale}/redirects.json`), with grid or horizontal scroll per breakpoint. The Cards block (`blocks/cards`, see its README) is its manual authoring alternative: each Card holds its own image, eyebrow, title, rich text description, label, tags, date, link and call to action, with the List's presentation and block settings (shared: `models/_card-list.json` fields, `utils/card-list-config.js`, `decorators/card-list-decorator.js`, `styles/card-list.css`). The Filter List lists the locale's pages from the query index (`utils/query-index.js`, loaded once) below its Root path, of its Page types (page-type) and Content types (content-type), or a manual list, in its Sort order; its filter pills are curated tags (labels from the taxonomy), its advanced filter the tags below taxonomy roots. Cards are built from the metadata columns of its Card mapping (featured-image, else thumbnail-image; content-type; title; description; tags with reading-time; path; author, else author-id from the Authors sheet) with publish-date; the hero and featured spotlight cards come from featured (yes / true) and priority (featured cards: featured, else priority <= 3); `feature-card` / `featured-priority` are read as fallbacks; the footer lists the Social Links sheet in sort-order.

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

## Metadata

| Source | What it sets | Notes |
| --- | --- | --- |
| Page properties | Title, Description, Keywords, Page Type, Navigation, Footer, 404 Page | [models/_page.json](https://github.com/sradha-tcs/tcs-corp/blob/main/models/_page.json) |
| Bulk metadata sheet `{locale}/metadata` | Every other page-level value: `author-id`, `publish-date`, `reading-time`, `region`, `content-type`, `featured-image`, card values (`card-title`, `card-style`, ...), SEO and social columns | Column list in [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#site-structure-and-site-data); URL patterns must start with the locale (`/de-de/**`) |

The bulk sheets apply only once the administrator lists all 13 in the site configuration's `metadata.source`; whether that is done is not recorded (handover open item O-04). The Page Header takes all its content from metadata (only its Layout and CTAs are authored). Republish a page after its card values changed so the query index row updates. Field reference: handover Part 8 — Metadata Documentation.

## Screenshots

> **Screenshot required**
>
> - Required screen: Metadata Guide
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
