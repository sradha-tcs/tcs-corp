# Master prompt: migrate a tcs.com page template

Copy the prompt below for each migration wave and fill in the parameters (in `<…>`). It encodes
the process of [README.md](./README.md) and the project rules of AGENTS.md; the pilot
(press releases, 25 October 2026) followed it. One prompt = one template; start with a pilot of
about 10 URLs, then run the rest in batches with the same importer.

## Parameters

| Parameter | Example (pilot) | How to get it |
| --- | --- | --- |
| TEMPLATE | `press-release` | Kebab-case name of the page type |
| SOURCE PATTERN | `/who-we-are/newsroom/press-release/*`, source template "TCS NewsRoom Template" | The inventory's `area` column; the source page's `<meta name="template">` |
| URLS | 8 new + 2 already published | `tools/importer/inventory/tcs-sitemap-inventory.csv`: status `to do` in the area, plus 1 to 2 `migrated` pages as references |
| REFERENCE PAGE | `/language-master/en/who-we-are/newsroom/press-release/tcs-certified-top-employe-in-latin-america` | An approved migrated page of the template; if none, migrate one and have it approved first |
| TARGET ROOT | `/language-master/en` | `REVIEW_ROOTS` (utils/site.js) during the review; `/en` after the rollout |
| BLOCKS | Page Header, default content, Table, Media Contacts, List, Teaser | From the reference page; existing blocks only |
| CONSTANTS | In the News List, Connect with us Teaser, Media Contacts title | Blocks identical on every page of the template, copied from the reference |
| DROP | Header, navigation, breadcrumb, share, cookie banner, footer, source contact list, In the News cards | Site chrome and content that blocks render from sheets or the query index |
| METADATA | page-type, content-type, eyebrow, publish-date (dateline), reading-time, region, language, persona, tags, featured-image | The reference page's metadata sheet row and page tags |

## Prompt

```text
Migrate the tcs.com page template <TEMPLATE> to this project. Read AGENTS.md, the knowledge base
(docs/handover/knowledge-base/README.md), docs/migration/README.md and tools/importer/README.md
first and follow them. Work on the branch <branch>; don't push, merge, install or publish without
asking me.

Source: the pages <SOURCE PATTERN>. URLs: <URLS, or: take N URLs with status "to do" in area
<area> from tools/importer/inventory/tcs-sitemap-inventory.csv, plus the already migrated
<reference URLs>>. tcs.com answers 403 to scripts: open each page in a browser, one at a time,
and save it to tools/importer/bd-snapshots/www.tcs.com/<path>.html before importing.

Target: AEM content (xwalk) below <TARGET ROOT>, same page name: <TARGET ROOT> + the tcs.com
path, lower case, without trailing hyphens. The approved reference is <REFERENCE PAGE> (its
.plain.html on aem.page and its metadata sheet row): match its sections, blocks, block rows and
metadata exactly.

Blocks: <BLOCKS>. Use existing blocks only (blocks/README.md and each block's README and model);
if the source has content no block covers, stop and list it with a proposal (a new block or
option needs my approval and a decision log entry). Template constants, copied from the
reference: <CONSTANTS>. Drop: <DROP>. Metadata: <METADATA>.

Steps:
1. Classify the URLs; confirm they are one template (the source <meta name="template">); add the
   template to tools/importer/page-templates.json (keep the other templates).
2. Analyse a representative page and map the sections and blocks (selectors for every layout of
   the template: check an old and a new page).
3. Write the transformers, one parser per block (rows in the block model's order; key-value blocks
   map by position) and tools/importer/import-<TEMPLATE>.js (metadata, target path).
4. Import the URLs into content/.
5. Validate and report per page: sections and blocks, article text recall (source body vs
   imported default content, target >= 98 %), tables (every value present), JCR conversion of
   every page, and the reference page(s) re-imported identical to the published ones
   (node tools/importer/compare-reference.mjs). Fix the parsers / transformers and re-import until
   they pass; explain any page below target.
6. Build the package: node tools/importer/build-package.mjs --urls tools/importer/urls-<TEMPLATE>.txt
   --name <package name> (published pages left out), with the metadata and redirect rows.
7. Update the inventory (node tools/importer/inventory.mjs <sitemap.json>), tools/importer/README.md
   (templates table), docs/migration/README.md (results of the wave) and the decision log if a
   decision changed; run npm run lint and npm test; commit on the branch.

Report: what was imported, the validation table, what doesn't match and why, the package and sheet
rows to hand over, and the decisions you need from me. Don't write to AEM, Document Authoring or
the admin API; report "Not recorded" or "Blocked: <input needed>" instead of guessing.
```

## Acceptance criteria per wave

| Check | Target |
| --- | --- |
| Pages imported | All URLs of the wave, or each failure explained |
| Structure | Every page has the reference's sections and blocks |
| Reference pages | Re-imported identical to the published pages (text 1.0, same blocks and metadata) |
| Article text recall | >= 98 % per page; every heading, quote, name, number and link present |
| Tables, lists, links | Every source value present; links absolute or to migrated pages |
| JCR | Every page converts |
| Package | Only pages not yet published; page tags set; one metadata row per page; redirect rows for renamed pages |
| Code | `npm run lint` and `npm test` pass; nothing outside `tools/importer/`, `docs/` changed without a reason |

## Don'ts

- Don't create blocks, variants or model fields for a migration without approval (decision log).
- Don't overwrite published pages; don't install, preview or publish without the owner.
- Don't put metadata in page properties the model doesn't have; use the metadata sheet.
- Don't hard-code content that differs per page; constants only when identical on every page.
- Don't commit source snapshots, bundles or reports (third-party pages, generated files).
