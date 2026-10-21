# Indexing and Search

This file is the knowledge base summary of the query index and everything built on it: what `helix-query.yaml` indexes and excludes, how `utils/query-index.js` loads and caches it, the blocks that list pages from it (List, Filter List, the Conversation Canvas menu) and the manual alternative (Cards), the search hand-off of the Conversation Canvas, sorting, filtering, pagination, empty and error states as implemented, performance, the sitemap, and what a reindex depends on and how to validate it.

| Attribute | Value |
| --- | --- |
| Audience | Developers, site administrators, AMS / support, content leads, AI agents |
| Source of truth | [`helix-query.yaml`](../../../helix-query.yaml), [`helix-sitemap.yaml`](../../../helix-sitemap.yaml), [`utils/query-index.js`](../../../utils/query-index.js), [`utils/site.js`](../../../utils/site.js) (`indexRoot`), [`scripts/scripts.js`](../../../scripts/scripts.js) (`prefetchData`), [List](../../../blocks/list/README.md), [Filter List](../../../blocks/filter-list/README.md), [Conversation Canvas](../../../blocks/conversation-canvas/README.md) and [Cards](../../../blocks/cards/README.md) READMEs, handover Parts 2.10.7, 12.1.7, 12.1.9 ([TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md)) |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 |
| Status | Current; live index state (finding F-10) and sitemap `noindex` handling: Requires validation |

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
| `/language-master/*/references/**`, `/language-master/*/error-pages/**`, `/language-master/*/data/**`, `/language-master/*/nav`, `/language-master/*/footer`, `/language-master/*/block-library`, `/language-master/*/block-library/**` | The same for the language master under review, a folder level deeper (#131, F-108; to remove with the REVIEW settings after the rollout) |
| `/**/fragments/**`, `/**/modals/**` | Fragment and modal folders anywhere |

The `/*/…` patterns name one path segment before the folder (e.g. `/en/block-library`); the language master (`/language-master/en/…`) is a level deeper and has its own patterns. Until 21 October 2026 it had none: 166 block library pages, 6 reference pages and the 404 page of the language master were in the live index (F-108). After the fix (#131) a reindex reports "requested path does not match index configuration" for these pages but doesn't remove their rows: they were removed with the Admin API index DELETE (173 / 173; the pages stay published). The index went from 354 to 181 rows (137 language-master content pages, 44 `/en` pages), and the Lists and Filter Lists of the library and the curated Insights page still filled.

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

## Query index use in code

[`utils/query-index.js`](../../../utils/query-index.js) is the only reader of `/query-index.json`.

| Export | Behaviour |
| --- | --- |
| `getPages()` | Fetches `/query-index.json?offset={n}&limit=500` until `total` is reached (or a request fails or returns no rows); keeps one promise per page view (module variable); filters rows to `indexRoot()`; maps each row to a typed page (`path`, `title`, `description`, `image`, `tags`, `pageType`, `contentType`, `publishDate`, `readingTime`, `thumbnailImage`, `featuredImage`, `author`, `authorId`, `featured`, `priority`, `lastModified`, `row`). A failed load gives `[]` |
| `tagsOf(row)` | Merges `tags` (JSON list or comma list) and `cqTags`, without duplicates (`test/list/query-index-tags.test.mjs`) |
| `columnOf(page, name)` | A column by its metadata name (`featured-image` → `featuredImage`) |
| `listOf(value)` | A multi-value column: JSON array or comma-separated |
| `getPagesAt(paths)` | Pages the index doesn't have (AEM author, or not indexed yet), read from their own HTML in parallel, once per path per page view (`rowOfDocument`); failures are left out |

Typed values: `featured` is true for `yes`, `true`, `1`, `on`, `y` in `featured` or `featureCard`; `priority` is the number in `priority`, else `featuredPriority`, else `null`.

**Locale scoping.** `indexRoot()` ([`utils/site.js`](../../../utils/site.js)) returns the review root `/language-master/en` for pages below it (`REVIEW_ROOTS`, temporary), else the page's locale root (`/de-de`). `getPages()` keeps rows whose path is that root or below it (`test/site/index-root.test.mjs`). Every page view still downloads the rows of all locales.

**AEM author.** AEM author has no query index (`isAuthor()` in `utils/environment.js`: the path starts with `/content/`); `getPages()` then returns `[]` and blocks show editor hints (below). Fixed-list pages are read with `getPagesAt`.

## Consumers

| Consumer | Uses the index for | Source |
| --- | --- | --- |
| List | Child pages, Tagged pages, card metadata of Fixed list pages | [blocks/list/README.md](../../../blocks/list/README.md) |
| Filter List | All candidate pages (Query Index source) or the Manual List pages' metadata | [blocks/filter-list/README.md](../../../blocks/filter-list/README.md) |
| Conversation Canvas | The pop-up site menu and the Primary dock navigation (`path`, `title`) | [blocks/conversation-canvas/README.md](../../../blocks/conversation-canvas/README.md) |
| Sitemap | `/sitemap.xml` source | `helix-sitemap.yaml` |
| Cards | **Not** a consumer: authored fields only (tag labels from the taxonomy, UI text from placeholders) | [blocks/cards/README.md](../../../blocks/cards/README.md) |

```mermaid
flowchart LR
  PUB["Published pages (head metas)"] --> IDX["/query-index.json (helix-query.yaml)"]
  IDX --> QI["utils/query-index.js getPages"]
  SITE["utils/site.js indexRoot"] --> QI
  QI --> LIST["blocks/list"]
  QI --> FL["blocks/filter-list"]
  QI --> CC["blocks/conversation-canvas menu and dock"]
  IDX --> SM["/sitemap.xml (helix-sitemap.yaml)"]
  RED["utils/redirects.js"] --> LIST
  TAX["utils/taxonomy.js"] --> LIST
  TAX --> FL
  TAX --> CC
  AUTH["utils/data.js getAuthors"] --> LIST
  AUTH --> FL
```

### List

- **Sources:** Child pages (below the Parent page or the current page, direct children or down to Child depth), Tagged pages (below the Search root, Any / All of the Tags, never the current page; a tag matches its child tags, `hasTag`), Fixed list (List Items; pages, paths or external URLs).
- **Data rules:** pages with `hide-in-nav = yes` are not listed (`isListable`); card links point to redirect targets (`utils/redirects.js`, at most 5 hops); card values follow the page metadata contract (`card-title` → `og:title`, `card-description` → description, `card-image` → `og:image` / `thumbnail-image` / `featured-image`, …) and a List Item's authored fields win field by field.
- **Sorting:** Order by Manual (authored order for Fixed lists, path order for pages), Title (`Intl.Collator`, numeric, page language) or Last modified (`modified-date`, else last published); Sort order ascending / descending; ties by path. Deduplication by destination path; Maximum items applies last.

### Filter List

- **Sources:** Query Index (pages below Root path, of the selected Page types and Content types, never the current page) or Manual List (Filter Page items in authored order; Sort by ignored).
- **Sorting:** `latest` (`publishDate`, then `lastModified`), `featured`, `priority` (lower first, then latest), `alphabetical` (`Intl.Collator` with the page language).
- **Filtering:** filter pills from Filter Tag items (single or multi select), an advanced filter panel of categories below taxonomy roots (AND / OR), Clear all and Reset filters; filters run in memory and aren't in the URL.
- **Spotlights:** hero (Latest, Featured, Manual) and featured cards (Marked as featured, Priority 1 to 3, Manual).
- **Pagination:** Cards per page (default 9), Load more adds Load more count (default 6) and moves focus to the first new card; "Showing {n} of {total}".
- **Known differences from List:** `hide-in-nav` and redirects aren't applied; the Authors lookup is exact (handover F-30; audit D-A-29 deferred).

### Conversation Canvas

- **Menu:** pages below the Menu root path (default: the locale root) up to Menu depth levels, sorted by level then path (alphabetical), titled by `title`, else the last path segment (`loadMenuTree`). `hide-in-nav` isn't applied (F-33); the menu order follows the path, not a navigation order column (F-78).
- **Search:** submitting dispatches the bubbling, cancelable `conversation-canvas:search` event with `detail.query`; an integration that handles it calls `preventDefault()`; else the authored Search page opens with `?q={query}`; else a polite status "Search isn't available yet." (`searchUnavailable`). Voice input uses the browser's `SpeechRecognition` where available. The data layer records `cmp:search` with the term passed through `redactSearchTerm` (`utils/privacy.js`).
- **No search index or results page exists in the repository:** No verified search service was identified.

## Empty, editor and error states

| Block | Situation | Shown |
| --- | --- | --- |
| List | No cards on the site | Empty behaviour: `message` (default; the authored message, else `listEmpty` "There are no items to show."), `hide` (block hidden; not in the editor or on AEM author), `fallback` (the List Items as a Fixed list) |
| List | AEM author / Universal Editor, Child or Tagged pages | `listEditorPages` "The pages show on the published page (from the query index)." |
| List | Configuration incomplete | Editor hint (warnings `tags-missing`, `parent-missing`, `root-missing`, `items-missing`) |
| Filter List | No matching pages or failed index | `noResources` "No resources found.", hint and Reset filters |
| Filter List | AEM author / Universal Editor | `filterListEditor` "The results show on the published page, from the pages' metadata."; items as chips |
| Conversation Canvas | No pages (including the editor) | `noPagesFound` "No pages found" in the menu |
| All | Index request fails | `getPages()` resolves to `[]`; the block renders its empty state; a failing deferred render is logged and the skeleton removed |

## Performance

- **Prefetch:** `prefetchData(main)` (`scripts/scripts.js`) starts `getPages()` and `loadTaxonomy()` when the lazy phase begins on pages with a List, Filter List or Conversation Canvas, and `loadRedirects()` with a List; not in the eager phase, so it doesn't compete with the LCP image. The blocks reuse the same cached promises.
- **Skeletons:** List and Filter List render through `renderWhenLoaded` (`decorators/skeleton-decorator.js`): data within 150ms renders directly; later data shows a block-shaped skeleton (at least 250ms) so the section and those below aren't held back. The Canvas menus use `skeletonWhile`.
- **Transfer:** every page view with one of these blocks downloads the whole index (all locales) in pages of 500 rows and filters it in the browser; cost grows with the number of published pages (handover Part 2.10.7 and F-30; per-locale indexes are a recommendation, not implemented).
- **Placement:** avoid index-based blocks in the first section (LCP, handover Part 13.16).

## Sitemap

`helix-sitemap.yaml` defines one sitemap, `default`: source `/query-index.json`, destination `/sitemap.xml`, `lastmod: YYYY-MM-DD`, origin `https://main--tcs-corp--sradha-tcs.aem.live` (to be replaced by the production domain once `cdn.prod.host` is configured, per the file's comment).

- It covers every indexed page of all locales; there are no per-locale sitemaps and no `hreflang` alternates (handover Part 4.9.6).
- Handover Part 2.10.7 states that pages with `robots` `noindex` are left out of the sitemap while they stay in the index and in List / Filter List (no code checks `robots`); the sitemap behaviour is platform behaviour (Requires validation).
- The sitemap is regenerated when the index changes; the Admin API `sitemap` operation regenerates it on demand (handover Part 12.1.9).

## Reindex dependencies

| Event | Index effect | Source |
| --- | --- | --- |
| Page published | Row added or updated | handover Part 12.1.7 (platform) |
| Page unpublished | Row removed | handover Part 12.1.7 (platform) |
| `helix-query.yaml` changed (new column, changed exclude) | Existing rows unchanged until the pages are republished or reindexed | handover Part 12.1.7 |
| Page metadata changed (card title, tags, featured, priority, content type) | Lists change after the page is republished (and reindexed) | List and Filter List READMEs |
| Bulk metadata | Indexed only if the sheet applies (`metadata.source`) and the page is republished | handover Part 8 |

**Verified reindex operation.** The Admin API index operation `POST https://admin.hlx.page/index/{org}/{site}/{ref}/{path}` (org `sradha-tcs`, site `tcs-corp`, ref `main`) re-indexes a published path (handover Part 12.1.9). It was used per page, after `preview` and `live`, for the language master packages (handover revisions 2.31: 312 / 312 pages; 2.35: 313 / 313 and 315 / 315 pages). Calls need an authorised user or API key; no credentials are recorded. Bulk (`/*`) operations act on all locales and must be agreed with the site owner (handover Part 2.10.13).

**Excluded by design.** Block library pages stay out of the query index (handover revision 2.35; `helix-query.yaml` and `paths.json` excludes for the locale block libraries).

**Open finding.** F-10 (handover Part 16): the live index didn't match `helix-query.yaml` (card, eyebrow, category, hide-in-nav, author and feature columns missing) until the site is reindexed. The register still lists it as open; the language master pages were reindexed in revisions 2.31 and 2.35. Whether the 13 locale trees were reindexed is Not recorded.

## Post-reindex validation

A checklist derived from the configuration and code (results of a full run are Not recorded; revision 2.31 recorded 307 language-master pages in the index, 306 with an image):

1. `GET /query-index.json?offset=0&limit=500` on the live host: `total` matches the expected number of published, non-excluded pages; page through until `total`.
2. A row of each locale has the 37 columns of `helix-query.yaml` (e.g. `cardTitle`, `hideInNav`, `cardStyle`, `cardTheme` present, even if empty).
3. No row below `references/`, `error-pages/`, `data/`, `block-library`, `fragments/`, `modals/`, `site-global-templates`, and no `.json` path.
4. Tagged pages have `tags` or `cqTags` values (F-07: AEM may publish page Tags only as `cq-tags`; code merges both).
5. On preview / live (not AEM author): a List (Child pages and Tagged pages), a Filter List and a Conversation Canvas menu of each changed locale show the expected pages; a page with `hide-in-nav = yes` is absent from the List.
6. `/sitemap.xml` lists the pages with the configured origin.

## Related

- [architecture.md](./architecture.md) — runtime phases, caching, integrations
- [content-architecture.md](./content-architecture.md) — metadata model, taxonomy, locales, references
- [blocks.md](./blocks.md), [data-layer-and-analytics.md](./data-layer-and-analytics.md) — related knowledge base files
- [blocks/list/README.md](../../../blocks/list/README.md), [blocks/filter-list/README.md](../../../blocks/filter-list/README.md), [blocks/conversation-canvas/README.md](../../../blocks/conversation-canvas/README.md), [blocks/cards/README.md](../../../blocks/cards/README.md)
- [utils/README.md](../../../utils/README.md), [decorators/README.md](../../../decorators/README.md), [docs/animation/README.md](../../../docs/animation/README.md) (skeletons)
- [AGENTS.md](../../../AGENTS.md) — "Site structure and site data" notes on the query index
- Handover ([TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md)): Part 2 — Solution Architecture (2.10.7, 2.11.4), Part 12 — Publishing, Deployment & Release (12.1.7, 12.1.9), Part 13 — Global Troubleshooting Guide (13.9–13.11, 13.25), Part 16 — Handover Findings and Open Items Register
