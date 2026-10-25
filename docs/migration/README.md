# tcs.com content migration

How tcs.com pages are migrated to this project's blocks as AEM content (Universal Editor, xwalk),
with the same page names: what this branch adds, the process step by step, where the migration
stands (pages, blocks, preview and live URLs) and what the press release pilot of 25 October 2026
showed. The prompt that runs a migration wave is [master-prompt.md](./master-prompt.md); the page
by page mapping is [mapping-summary.md](./mapping-summary.md) and
[migration-mapping.csv](../../tools/importer/inventory/migration-mapping.csv). Decision: KB-D-057
(Proposed) in the [decision log](../handover/knowledge-base/decision-log.md).

| Attribute | Value |
| --- | --- |
| Source | www.tcs.com (AEM; each page names its source template in `<meta name="template">`, e.g. "TCS NewsRoom Template") |
| Target | AEM `/content/tcs-corp/language-master/en/<tcs.com path>`, lower case, without trailing hyphens; preview `https://main--tcs-corp--sradha-tcs.aem.page/language-master/en/<path>`, live `https://main--tcs-corp--sradha-tcs.aem.live/language-master/en/<path>`; moved to `/en` at the rollout (`REVIEW_ROOTS`, utils/site.js) |
| Branch | `feat/content-migration-pilot` |
| State (25 October 2026) | 10,539 tcs.com URLs: 3,183 migrated (all in preview and live), 9 imported in the pilot (package ready, not in AEM), 7,347 to do |

## 1. Summary

- **Migrated before:** 3,183 tcs.com pages, almost all of the newsroom (press releases, articles),
  careers testimonials and investor corporate actions; 655 of them at another path (Redirects
  sheet). The language master also holds 207 project pages without a tcs.com source (curated
  design pages, dummy pages, references).
- **Added on this branch:** the migration tooling (inventory, mapping, a press release importer,
  checks, content package builder), the documentation and the master prompt; the pilot imported 10
  press releases, the importer reproduces the approved page exactly.
- **To do:** 7,347 pages, mostly industries (1,534) and services (779), blogs (682), author pages
  (605), products and platforms (412), events (317), and 1,930 pages of tcs.com's locale sites.
- **Nothing was written to AEM, Document Authoring or the published site.** The pilot package is
  ready for someone with AEM access.

## 2. Changes on this branch

| File | Change |
| --- | --- |
| [tools/importer/README.md](../../tools/importer/README.md) | The tooling: files, templates, how to run a template, rules for parsers |
| [tools/importer/inventory.mjs](../../tools/importer/inventory.mjs) | New: the migration list from the tcs.com sitemap, the query index and the Redirects sheet |
| [tools/importer/inventory/tcs-sitemap-inventory.csv](../../tools/importer/inventory/tcs-sitemap-inventory.csv) | New: 10,539 URLs with locale, area, target page, renamed, status |
| [tools/importer/mapping.mjs](../../tools/importer/mapping.mjs) | New: the mapping of every URL and language master page to its AEM path, preview and live URL and status, page type and blocks |
| [tools/importer/inventory/migration-mapping.csv](../../tools/importer/inventory/migration-mapping.csv), [mapping-summary.md](./mapping-summary.md) | New: its output (10,746 rows) and summary per area and block |
| [tools/importer/page-templates.json](../../tools/importer/page-templates.json) | Template `press-release`: URLs, block mapping, sections (template `eds-page` kept) |
| [tools/importer/import-press-release.js](../../tools/importer/import-press-release.js) | New: the press release import script (metadata, target path) |
| [tools/importer/transformers/](../../tools/importer/transformers/) | New: `tcs-cleanup.js` (site chrome, headings, both layouts), `tcs-sections.js` (6 fixed-width sections) |
| [tools/importer/parsers/](../../tools/importer/parsers/) | New: `page-header.js`, `table.js`, `media-contacts.js`, `list.js`, `teaser.js` |
| [tools/importer/compare-reference.mjs](../../tools/importer/compare-reference.mjs) | New: imported pages vs the published pages |
| [tools/importer/build-package.mjs](../../tools/importer/build-package.mjs) | New: content package, metadata and Redirects sheet rows |
| `import-eds-page.js`, `parsers/eds-block.js`, `urls-eds-page.txt` | Committed as they were (local preview copies of pages already on the site) |
| [docs/migration/](./) | New: this guide, the master prompt, the mapping summary |
| [decision-log.md](../handover/knowledge-base/decision-log.md) | KB-D-057 (Proposed) |
| [AGENTS.md](../../AGENTS.md), [repository-structure.md](../handover/knowledge-base/repository-structure.md) | docs/migration and tools/importer listed |
| `.gitignore`, `.eslintignore`, `.hlxignore` | Bundles, source snapshots and reports not in git; bundles not linted; tools/importer not served |

No site code, block, model, style or content changed.

## 3. Where the migration stands

From [mapping-summary.md](./mapping-summary.md) (all migrated pages are in preview and live):

| Area | Pages | Migrated | To do | Page types and blocks of the migrated pages |
| --- | --- | --- | --- | --- |
| who-we-are/newsroom | 2,835 | 2,806 | 20 (+ 9 pilot) | press-release, article; Page Header, List, Teaser (no-image), Media Contacts, Button, Table |
| careers/testimonials | 76 | 76 | 0 | article; Page Header, Teaser |
| investor-relations/corporate-action | 61 | 61 | 0 | article; Page Header, Teaser, Button |
| what-we-do/industries | 1,536 | 2 | 1,534 | Mixed per industry: landing, case studies, white papers, solutions; classify first |
| what-we-do/services | 783 | 4 | 779 | As industries |
| insights/blogs, insights/authors | 682, 605 | 0 | 1,287 | Blog template; author pages: Authors sheet rows or pages (to decide) |
| what-we-do/products-platforms | 412 | 0 | 412 | Product landing and sub pages |
| who-we-are/events, worldwide, legal, sports-sponsorships; research, pace-innovation; insights global-studies, topics | 317, 149, 57, 90; 103, 60; 55, 54 | 0 to 1 | about 885 | Several templates |
| contact-us/industry-overlay | 217 | 0 | 217 | Form overlays: Form Variations, or not migrated (to decide) |
| Locale sites: jp-ja 919, cn-zh 393, de-de 373, fr-fr 160, se-sv 61, kr-ko 24 | 1,930 | 0 | 1,930 | Need a target per locale (tcs.com `jp-ja` → site `ja-jp`, `cn-zh` → `zh-cn`, `se-sv` → `sv-se`, `kr-ko` → `ko-kr`); their target is empty until decided |

Mapping columns (one row per page): `source_url`, `locale`, `area`, `status` (migrated / imported,
not in AEM yet / to do / project page), `template` (page-type), `content_type`, `aem_path`,
`preview_url`, `live_url`, `in_preview`, `live`, `renamed`, `blocks` (the blocks of the page in
order, variants in brackets; for imported pages the template's blocks).

Findings of the mapping:

- 8 block names on curated design pages have no code in `blocks/` (teaser-v1, tabs-new,
  hero-banner, intro-statement, statistics-list, canvas-block, quotes, two-column-layout): those
  blocks aren't decorated (list in mapping-summary.md, "no code"). Not a migration input.
- `tcs-bancs-for-treasury-marks-its-entry-into-sri-lanka-with-indian-bank` was migrated to
  `curated-design-pages/forms/...` (handover 2.41), not to its press release path: it shows as to do.

## 4. The process, step by step

One page template at a time, against an approved reference page; each wave first as a pilot of
about 10 URLs (1 to 2 of them already published, as references), then in batches of about 100
(one package per batch).

| Step | What happens | Who / tool | Output | Check |
| --- | --- | --- | --- | --- |
| 1 Pick the wave | Filter the inventory by area and status `to do`; add 1 to 2 migrated pages of the template | Migration engineer; `inventory.mjs` | `tools/importer/urls-<template>.txt` | URLs are one area |
| 2 Classify | Group the URLs by page structure; confirm with the source `<meta name="template">` | Page classification | `page-templates.json` (template, URLs) | One template per run |
| 3 Reference | An approved migrated page of the template (or migrate one by hand and have it approved) | Content owner | The reference's `.plain.html` and metadata row | Approved |
| 4 Analyse and map | Sections and blocks of a representative page, mapped to existing blocks only; selectors for each layout (old and new pages) | Page analysis, block mapping | `page-templates.json` (blocks, sections) | No new blocks without approval |
| 5 Build the importer | Transformers (cleanup, sections), one parser per block (rows in model order), `import-<template>.js` | Migration engineer | `tools/importer/` | `node --check`, lint |
| 6 Save the sources | tcs.com answers 403 to scripts: open each page in a browser, one at a time, save the rendered HTML | Browser (Playwright) | `bd-snapshots/www.tcs.com/<path>.html` | Status 200, H1 present |
| 7 Import | Bundle the import script, run the bulk import on the saved copies | Bulk importer | `content/<path>.plain.html` | 100 % imported |
| 8 Validate | Sections and blocks per page; article text recall >= 98 %; tables complete; reference pages identical to the published ones; every page converts to JCR | `compare-reference.mjs`, JCR check | Reports | All pass, or explained |
| 9 Package | Pages not yet published, page tags, select values; metadata and Redirects rows | `build-package.mjs` | `migration-work/packages/<name>-<version>.zip`, `-metadata.csv`, `-redirects.csv` | Filter lists only the wave's pages |
| 10 Install and publish | Install the package (Package Manager), add the metadata rows to `/content/tcs-corp/language-master/en/metadata` and the redirect rows to its Redirects sheet, preview, review, publish pages and sheets | People with AEM access | Pages in preview and live | The published reference unchanged; new pages match it |
| 11 Record | Re-run the inventory and the mapping; update this guide and the decision log; commit | Migration engineer | CSVs, docs | `npm run lint`, `npm test` |

Commands (from the project root; the bulk importer and the converters are the migration tooling's,
see tools/importer/README.md):

```bash
node tools/importer/inventory.mjs <sitemap.json>          # 1: the migration list
# 5–7: bundle and run the import script with the bulk importer, on tools/importer/urls-<template>.txt
node tools/importer/compare-reference.mjs                # 8: imported vs published pages
XWALK_CONVERTER_DIR=<tooling scripts> node tools/importer/build-package.mjs \
  --urls tools/importer/urls-<template>.txt --name <package> --version 1.0.0   # 9
node tools/importer/mapping.mjs                           # 11: mapping CSV and summary
npm run lint && npm test
```

## 5. What the platform and the project require (learned in the pilot)

- **Metadata goes to the metadata sheet.** md2jcr keeps only the page model's properties (Title,
  Description, Keywords, Page Type, Navigation, Footer, 404 Page); publish-date, reading-time,
  content-type, eyebrow, region, persona, featured-image, og-* and twitter-* are columns of the
  language master's bulk metadata sheet (3,507 rows), as AGENTS.md says. `build-package.mjs` writes
  the rows (`robots` = `noindex, nofollow` during the review, as the sheet's rows).
- **Tags are page tags.** The In the News List finds press releases by `cq:tags`
  (`tcs-corp:content-type/press-release`); md2jcr doesn't write them, `build-package.mjs` adds them.
- **Key-value blocks map by position.** md2jcr maps a key-value block's rows to the model's field
  groups in order, not by key; for blocks that take items (List, Teaser), a row with two or more
  cells becomes an item. The List and Teaser parsers write one single-cell row per field group in
  model order (`FIELDS`); they must follow model changes. These rows don't render in the local
  preview: the local `content/` is the import format, the published page is the check.
- **Select values.** md2jcr writes a block variant `Teaser (no-image)` as `classes="no image"`;
  `build-package.mjs` restores the model's option value (`no-image`), or the dialog shows nothing.
- **tcs.com blocks scripts.** Requests without a browser get 403: the pages are opened in a
  browser one at a time and saved (`bd-snapshots/`), the import reads the copies.
- **Two layouts per template.** tcs.com has older pages (2016) with another DOM (body, About TCS
  and contacts in one container); the transformers handle both, each tested on a real page.
- **Template constants.** Blocks that are the same on every page of a template (In the News, Connect
  with us, the Media Contacts title) are copied from the approved page.
- **Never overwrite approved pages.** The package leaves out pages already published unless asked.

## 6. Pilot: press releases (25 October 2026)

Pages: 8 not yet migrated (the latest releases, September and October 2026) and 2 already
published (one in the 2016 layout) to check the importer against approved pages.

| Check | Result |
| --- | --- |
| Import | 10 / 10 imported, 6 sections each (Page Header, body, About TCS, Media Contacts, In the News, Connect with us), all blocks present |
| Approved page re-imported (`tcs-certified-top-employe-in-latin-america`, 2016 layout) | Body text identical (similarity 1.0), same sections and blocks, metadata identical (page-type, content-type, publish-date, reading-time, region, eyebrow) |
| Article text recall (source body and About TCS vs imported default content) | 98.6 to 99.7 % on 8 pages (the rest: words joined by adjacent tags in the source count, checked by hand); the 2016 page 97.5 % (its repeated title is removed on purpose); every heading, quote and name present |
| Tables (Q2 FY27 financial results) | 4 Table blocks (6, 6, 4, 3 columns): every source value present; merged header rows combined, spacer columns dropped, full-width rows as a label row |
| Importer score of the migration tooling | 70 to 88 % ("flagged"): it counts the content left out on purpose (source contact list, In the News cards, title, breadcrumb); not a defect, the recall above is the measure for this template |
| JCR conversion | 10 / 10 convert |
| Package | `tcs-press-release-pilot-1.0.0.zip`: 9 pages (the published one left out), with `cq:tags`; 9 metadata sheet rows; no redirect rows (no name changes) |
| Published | Not done: the package isn't installed in AEM yet (needs AEM access) |

Pilot pages (AEM path below `/content/tcs-corp/language-master/en/who-we-are/newsroom/press-release/`;
preview and live URLs once installed and published: the same path below `/language-master/en/` on
aem.page and aem.live):

| Page | Status |
| --- | --- |
| best-buys-global-capability-center-india-transition-tcs | In the package |
| dgcx-partners-with-tcs-advance-upgrade-derivatives-market-infrastructure | In the package |
| tcs-accelerate-ai-led-technology-transformation-germany-aareal-bank | In the package |
| tcs-financial-results-q2-fy-2027 | In the package (4 tables) |
| tcs-hypervault-establish-large-scale-ai-data-center-campus-telangana | In the package |
| tcs-launches-indias-first-lights-out-factory-lab-advance-ai-first-manufacturing | In the package |
| tcs-launches-industrial-intelligence-foundry-accelerate-ai-led-autonomy-engineering | In the package |
| tcs-renews-title-partnership-jaguar-tcs-racing-expands-role-as-official-ai-partner-formula-e-gen4-era | In the package |
| mystate-limited-selects-tcs-bancs-transform-core-banking-operations | In the package |
| tcs-certified-top-employe-in-latin-america | Already live (reference, left out) |

Open after the pilot:

- Install the package, add the 9 metadata rows, preview and compare the published pages with the
  approved one; then the remaining releases.
- The hero image of new releases is kept as `featured-image` only (the approved pages show no
  image); tcs.com's generic newsroom banner is left out. Confirm with the content owner.
- The Connect with us link and the About TCS links point to www.tcs.com, as on the approved pages;
  internal links should move to the migrated pages once their sections are migrated (a link
  rewrite step from the mapping).
- reading-time: words of the release body / 200, rounded up (matches the approved page); the
  earlier migration's exact rule isn't recorded.

## 7. Plan for the next waves

| Wave | Pages | Template work | Decisions needed |
| --- | --- | --- | --- |
| 1 Newsroom rest (press releases, news alerts, analyst reports, analyst recognition) | 20 + 9 pilot | Pilot importer; news alerts and analyst reports may need their own template | None for press releases |
| 2 Blogs | 682 | Page Header (author, date, reading time from metadata and the Authors sheet), body, List | Author pages (605): Authors sheet rows or pages |
| 3 Industries and services | about 2,300 | Classify by source template (landing, case study, white paper, solution); one importer per template, largest first | Landing pages: blocks per section |
| 4 Products, events, worldwide, legal, research, insights | about 1,300 | Several templates | Form overlays (217): migrate or not |
| 5 Locale sites | 1,930 | Same importers with the locale's target | Target per locale; after the language master's rollout |
