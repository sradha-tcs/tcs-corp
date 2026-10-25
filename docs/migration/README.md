# tcs.com content migration

How tcs.com pages are migrated to this project's blocks as AEM content (Universal Editor, xwalk),
with the same page names, and what the pilot of 25 October 2026 showed. The tooling is in
[tools/importer](../../tools/importer/README.md); the reusable prompt for each migration wave is
[master-prompt.md](./master-prompt.md). Decision: KB-D-057 (Proposed) in the
[decision log](../handover/knowledge-base/decision-log.md).

| Attribute | Value |
| --- | --- |
| Source | www.tcs.com (AEM, source templates named in `<meta name="template">`, e.g. "TCS NewsRoom Template") |
| Target | `/content/tcs-corp/language-master/en/<tcs.com path>` (published at `/language-master/en/<path>`), lower case, without trailing hyphens; moved to `/en` at the rollout (`REVIEW_ROOTS`, utils/site.js) |
| Branch | `feat/content-migration-pilot` |
| State | Pilot done for press releases (10 pages); the other templates to do |

## 1. Where the migration stands

[tools/importer/inventory/tcs-sitemap-inventory.csv](../../tools/importer/inventory/tcs-sitemap-inventory.csv)
(`node tools/importer/inventory.mjs`) lists the 10,539 URLs of the tcs.com sitemap (25 October
2026) with their target page and status: 3,181 are migrated (in the query index, 655 of them at
another path, found through the language master's Redirects sheet), 7,358 are to do.

| Area (to do) | Pages | Notes |
| --- | --- | --- |
| what-we-do/industries (banking, retail, manufacturing, communications, high tech, energy, travel, life sciences, public services, insurance, healthcare, ...) | about 1,530 | Mixed templates per industry: landing, case studies, white papers, solutions; classify first |
| what-we-do/services (cloud, consulting, enterprise solutions, cybersecurity, IoT, cognitive business operations, ...) | about 780 | As industries |
| insights/blogs, insights/authors | 682, 605 | Blog template (Page Header, Teaser, author from the Authors sheet); author pages: Authors sheet rows rather than pages (to decide) |
| what-we-do/products-platforms (TCS BaNCS, ADD, Quartz, ...) | 412 | Product landing and sub pages |
| who-we-are/events, worldwide, legal, sports-sponsorships, research, investor-relations | 317, 150, 57, 90, 103, 61 | Several templates |
| contact-us/industry-overlay | 217 | Form overlays: Form Variations, or not migrated (to decide) |
| who-we-are/newsroom (remaining) | 29 | Press release template (this pilot) |
| Locale sites: jp-ja 919, cn-zh 393, de-de 373, fr-fr 160, se-sv 61, kr-ko 24 | 1,930 | Need a target per locale (tcs.com `jp-ja` → site `ja-jp`, `cn-zh` → `zh-cn`, `se-sv` → `sv-se`, `kr-ko` → `ko-kr`); the inventory leaves their target empty until decided |

## 2. The approach

One template at a time, from the inventory, against an approved reference page:

| Step | What | Tool | Output |
| --- | --- | --- | --- |
| 1 Inventory | Pick the template's URLs (area, source template), skip migrated ones | `inventory.mjs` | `urls-<template>.txt` |
| 2 Templates | Group the URLs by structure; confirm with the source `<meta name="template">` | Page classification of the migration tooling | `page-templates.json` |
| 3 Reference | One page per template migrated and approved (or the page already published), the contract for the importer | Authoring, review | Approved page |
| 4 Analysis and mapping | Sections and blocks of a representative page, mapped to the existing blocks only; source selectors for every layout of the template | Page analysis, block mapping | `page-templates.json` (blocks, sections) |
| 5 Importer | Transformers (cleanup, sections), one parser per block, `import-<template>.js` (metadata, target path) | — | `tools/importer/` |
| 6 Import | Save the source pages in a browser (tcs.com answers 403 to scripts), bulk import from the saved copies | Bulk importer | `content/<path>.plain.html` |
| 7 Validate | Text recall of the article (source body vs default content), blocks and sections per page, the approved page re-imported must match it (`compare-reference.mjs`), JCR conversion of every page | `compare-reference.mjs`, JCR check | Reports |
| 8 Package | Content package (pages not yet published only; filter per page), metadata and Redirects sheet rows | `build-package.mjs` | `migration-work/packages/` |
| 9 Publish | Install the package in AEM, add the sheet rows, preview, review, publish | AEM (people with access) | Pages on aem.page |
| 10 Record | Inventory status, decision log, handover | — | Commit |

Why this order: the importer is written once per template and proven on the approved page before
it runs on hundreds; every page is checked automatically, so review is by exception.

## 3. What the platform and the project require (learned in the pilot)

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

## 4. Pilot: press releases (25 October 2026)

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

Open after the pilot:

- Install the package, add the 9 metadata rows to `/content/tcs-corp/language-master/en/metadata`,
  preview and compare the published pages with the approved one (then the remaining 29 releases).
- The hero image of new releases is kept as `featured-image` only (the approved pages show no
  image); tcs.com's generic newsroom banner is left out. Confirm with the content owner.
- The Connect with us link and the About TCS links point to www.tcs.com, as on the approved pages;
  internal links should move to the migrated pages once their sections are migrated (a link
  rewrite step from the inventory).
- reading-time: words of the release body / 200, rounded up (matches the approved page); the
  earlier migration's exact rule isn't recorded.

## 5. Plan for the next waves

1. Remaining press releases (29) with the pilot importer; then the German and French newsroom
   once the locale targets are decided.
2. Blogs (682): Page Header (author, date, reading time from metadata and the Authors sheet),
   body, Teaser / List; decide whether author pages become Authors sheet rows.
3. Industries and services (about 2,300): classify by source template first (landing, case study,
   white paper, solution); one importer per template, largest first.
4. Products and platforms, events, worldwide, legal, research, investor relations.
5. Locale sites (1,930), after the language master's rollout decision.

Each wave: the master prompt with the template's parameters, a pilot of 10 (including 1 to 2
approved pages), then the rest in batches of about 100 (one package per batch).
