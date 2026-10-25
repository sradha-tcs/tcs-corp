# Content migration tooling (tools/importer)

Scripts that migrate tcs.com pages to this project's blocks, as AEM content (Universal Editor,
xwalk) below the language master `/content/tcs-corp/language-master/en`, with the same page names.
The process, the master prompt and the pilot results are in
[docs/migration/README.md](../../docs/migration/README.md). Not served (`.hlxignore`), not part of
the site's code; nothing here is loaded by a page.

| File | Purpose |
| --- | --- |
| [inventory.mjs](./inventory.mjs) | The migration list: every tcs.com sitemap URL with its locale, area, target page and status (migrated / to do), from the sitemap, the query index and the language master's Redirects sheet |
| [inventory/tcs-sitemap-inventory.csv](./inventory/tcs-sitemap-inventory.csv) | Its output (25 October 2026: 10,539 URLs, 3,181 migrated) |
| [page-templates.json](./page-templates.json) | The page templates: source URLs, block mapping (source selectors per block) and sections |
| `import-<template>.js` | One import script per template: orchestrates the transformers and parsers, writes the page metadata and the target path |
| [parsers/](./parsers/) | One parser per block: the source element to the block's rows, in the block model's order |
| [transformers/](./transformers/) | Cleanup (site chrome, headings) and sections (section breaks, Section Metadata) |
| `urls-<template>.txt` | The URLs of an import run |
| [compare-reference.mjs](./compare-reference.mjs) | Compares imported pages with the pages already published (sections, blocks, body text, metadata) |
| [build-package.mjs](./build-package.mjs) | Builds the AEM content package of imported pages, their metadata sheet rows and Redirects sheet rows |
| [import-eds-page.js](./import-eds-page.js), [parsers/eds-block.js](./parsers/eds-block.js), `urls-eds-page.txt` | Template `eds-page`: copies pages already on Edge Delivery into the local preview (`content/`) unchanged |

Not in git (`.gitignore`): `*.bundle.js` (bundled import scripts), `bd-snapshots/` (saved source
pages), `reports/` (import reports). Output of a run: `content/<path>.plain.html` (the local
preview) and `migration-work/packages/` (the package and sheet rows), both local.

## Templates

| Template | Source | Target | Blocks | State |
| --- | --- | --- | --- | --- |
| `press-release` | tcs.com press releases (`/who-we-are/newsroom/press-release/*`, source template "TCS NewsRoom Template", current and 2016 layouts) | `/language-master/en/who-we-are/newsroom/press-release/<name>` | Page Header, default content, Table, Media Contacts, List, Teaser | Pilot: 10 pages, 25 October 2026 |
| `eds-page` | Pages on this site's preview | `content/` as they are | Any (block tables unchanged) | Local preview copies |

## Run a template

tcs.com answers 403 to scripts: the pages are read in a browser and saved first (one per file,
`bd-snapshots/www.tcs.com/<path>.html`); the bulk import then reads the saved copies.

1. Save the source pages: open each URL in a browser and save the rendered HTML (`page.content()`
   in Playwright) as `bd-snapshots/www.tcs.com/<path>.html`.
2. Bundle and run the import script with the migration tooling's bulk importer
   (`aem-import-bundle.sh --importjs tools/importer/import-press-release.js`, then
   `run-bulk-import.js --import-script tools/importer/import-press-release.bundle.js --urls
   tools/importer/urls-press-release.txt`): it writes `content/<path>.plain.html`.
3. Check: `node tools/importer/compare-reference.mjs` (pages already published must match them),
   the JCR check of the migration tooling (`check-xwalk-jcr.mjs`: every page converts).
4. Package: `XWALK_CONVERTER_DIR=<tooling scripts folder> node tools/importer/build-package.mjs
   --urls tools/importer/urls-press-release.txt --name <package name> [--version x.y.z]`. Pages
   already published are left out unless `--include-existing`.
5. Hand over (people with AEM access): install the package in AEM (Package Manager), add the
   metadata rows to the language master's metadata sheet and the redirect rows to its Redirects
   sheet, then preview and publish the pages and the sheets.

## Rules for parsers

- Use the project's blocks only (blocks/README.md); a block's rows follow its model
  (`blocks/<block>/_<block>.json`): md2jcr maps a key-value block's rows by position, so a parser
  writes one row per field group in model order (List, Teaser: `FIELDS`); keep it in step with the
  model after `npm run build:json`.
- Follow the AEM delivery rules of AGENTS.md (item children, no Text / Title / Type / Alt
  suffixes for values that must be read, no sample content).
- Page-level values other than Title, Description, Keywords and Page Type are metadata sheet
  columns, not page properties: the import script writes them to the Metadata block and
  `build-package.mjs` turns them into sheet rows; the page tags become `cq:tags`.
- Template constants (the In the News List, the Connect with us Teaser, the Media Contacts title)
  are copied from the approved published page, not invented.
