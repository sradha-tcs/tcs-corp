---
id: "DEV-012"
title: "SEO Development Guide"
role: "Development"
topic: ""
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["decorators/seo-decorator.js","helix-query.yaml","helix-sitemap.yaml"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# SEO Development Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-012 |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Metadata, SEO decorator, sitemap and indexing rules |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | decorators/seo-decorator.js, helix-query.yaml, helix-sitemap.yaml |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Metadata model](#metadata-model)
- [Sitemap](#sitemap)
- [Query index definition](#query-index-definition)
- [SEO decorator](#seo-decorator)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Metadata model

**Purpose.** Page-level values (SEO, social, card content, page type, author, dates, flags) that code, the query index and the data layer read. Every value is a `<meta>` in the server-delivered head.

**Sources and precedence.**

| Source | Where authored | Published as |
| --- | --- | --- |
| Page properties (`models/_page.json`) | Universal Editor page properties | `<title>`, `description`, `keywords`, `page-type`, `nav`, `footer`, `error-page` metas |
| Standard AEM page properties | Sites console (e.g. Tags `cq:tags`) | `cq-tags` (one comma-separated meta) |
| Bulk metadata sheet | `/content/tcs-corp/{country}/{language}/metadata` | `/{locale}/metadata.json`; each column becomes `<meta name="{column}">` on pages matching the row's `url` pattern |

Page-level values win over bulk metadata; bulk rows apply top to bottom (handover Part 8.1.2). The bulk sheets apply only once all 13 are listed in the site configuration's `metadata.source`, and each sheet's URL patterns must start with its locale (`/de-de/**`) (AGENTS.md "Notes").

**Bulk metadata columns** (AGENTS.md, 41 columns): `url`, `page-type`, `meta-title`, `meta-description`, `meta-keywords`, `author-id`, `publish-date`, `modified-date`, `reading-time`, `og-title`, `og-description`, `og-image`, `og-type`, `twitter-card`, `twitter-title`, `twitter-description`, `twitter-image`, `canonical-url`, `robots`, `region`, `country`, `language`, `persona`, `thumbnail-image`, `featured-image`, `campaign-id`, `content-type`, `featured`, `priority`, `listen-link`, `author`, `card-title`, `card-description`, `card-image`, `card-image-alt`, `image-alt`, `eyebrow`, `category`, `hide-in-nav`, `card-style`, `card-theme`.

**Consumers.**

| Consumer | Reads | Source |
| --- | --- | --- |
| SEO decorator (eager) | `meta-title` → `<title>`; `meta-description`, `meta-keywords`; `og-*` (falling back to `meta-*`); `twitter-*` (falling back to `og-*`, `meta-*`); `canonical-url` → `<link rel="canonical">` and `og:url`; `language` → `<html lang>` | [`decorators/seo-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/seo-decorator.js) |
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

## Sitemap

`helix-sitemap.yaml` defines one sitemap, `default`: source `/query-index.json`, destination `/sitemap.xml`, `lastmod: YYYY-MM-DD`, origin `https://main--tcs-corp--sradha-tcs.aem.live` (to be replaced by the production domain once `cdn.prod.host` is configured, per the file's comment).

- It covers every indexed page of all locales; there are no per-locale sitemaps and no `hreflang` alternates (handover Part 4.9.6).
- Handover Part 2.10.7 states that pages with `robots` `noindex` are left out of the sitemap while they stay in the index and in List / Filter List (no code checks `robots`); the sitemap behaviour is platform behaviour (Requires validation).
- The sitemap is regenerated when the index changes; the Admin API `sitemap` operation regenerates it on demand (handover Part 12.1.9).

## Query index definition

`helix-query.yaml` defines **one index**, `pages`, published as `/query-index.json`, for all 13 locales (and, temporarily, the language master under review).

**Included:** `/**`.

**Excluded:**

| Pattern | Why (from the file's comments) |
| --- | --- |
| `/**.json` | Sheets and other JSON resources |
| `/*/references/**` | Fragments, nav and footer pages, modals of each locale |
| `/*/error-pages/**` | Error pages |
| `/*/data/**` | Data sheets |
| `/*/nav`, `/*/footer` | Nav and footer pages at the locale root |
| `/*/block-library`, `/*/block-library/**` | Block libraries (also excluded from publishing in `paths.json`; safeguard) |
| `/site-global-templates/**` | Template pages (not published; safeguard) |
| `/language-masters/*/references/**`, `/language-masters/*/error-pages/**`, `/language-masters/*/data/**`, `/language-masters/*/nav`, `/language-masters/*/footer`, `/language-masters/*/block-library`, `/language-masters/*/block-library/**` | The same for the language master under review, a folder level deeper (#131, F-108; to remove with the REVIEW settings after the rollout) |
| `/**/fragments/**`, `/**/modals/**` | Fragment and modal folders anywhere |

The `/*/…` patterns name one path segment before the folder (e.g. `/en/block-library`); the language master (`/language-masters/en/…`) is a level deeper and has its own patterns. Until 21 October 2026 it had none: 166 block library pages, 6 reference pages and the 404 page of the language master were in the live index (F-108). After the fix (#131) a reindex reports "requested path does not match index configuration" for these pages but doesn't remove their rows: they were removed with the Admin API index DELETE (173 / 173; the pages stay published). The index went from 354 to 181 rows (137 language-master content pages, 44 `/en` pages), and the Lists and Filter Lists of the library and the curated Insights page still filled.

**Columns** (37 properties, all read from the server-delivered `<head>`):

| Group | Index columns (meta source) |
| --- | --- |
| Platform / standard | `lastModified` (`last-modified` header, parsed timestamp), `robots`, `title` (`og:title`), `description`, `image` (`og:image`, path only), `tags` (all `article:tag`, multi-value), `cqTags` (`cq-tags`, AEM page Tags as one comma-separated meta) |
| SEO | `metaTitle`, `metaDescription` |
| Classification | `pageType`, `contentType`, `category`, `eyebrow` |
| Author and dates | `author`, `authorId`, `publishDate`, `modifiedDate`, `readingTime` |
| Images | `thumbnailImage`, `featuredImage`, `imageAlt` |
| Audience | `region`, `country`, `language`, `persona`, `campaignId` |
| Featuring | `featured`, `priority`, `featureCard` and `featuredPriority` (earlier names, read as fallbacks) |
| List cards | `cardTitle`, `cardDescription`, `cardImage`, `cardImageAlt`, `cardStyle`, `cardTheme`, `hideInNav` |

Rules:

- Values set by JavaScript (e.g. the SEO decorator) aren't indexed: only the delivered head counts (handover Part 8.1.3).
- `/query-index.json` is public: don't put internal-only values in metadata (handover Part 2.10.7).
- A new metadata column used by a block needs a property here, then a reindex (List README "Extending the Block", Filter List README step 3).

## SEO decorator

| Module | Purpose |
| --- | --- |
| `seo-decorator.js` | `decorateHead` (bulk metadata SEO / social columns to the standard head tags, `<html lang>`) |

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
