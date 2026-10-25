# Master prompt: execute the tcs.com migration

The prompts that run the migration, one wave (one page template) at a time. They encode the
process of [README.md](./README.md) and the project rules of AGENTS.md; the pilot (press releases,
25 October 2026) followed them.

## How to use it

1. Pick the next wave in [README.md](./README.md) (section 7) and its URLs in
   [migration-mapping.csv](../../tools/importer/inventory/migration-mapping.csv) (status `to do`,
   the wave's area) plus 1 to 2 `migrated` pages of the same page type as references.
2. Run the **wave prompt** below with its parameters: the assistant classifies, maps, builds the
   importer, imports, validates, packages and reports; it stops at decisions (new blocks, unclear
   content) and never writes to AEM or publishes.
3. Review the report; if the pilot of the wave passes, run the same prompt on the rest of the wave
   in batches of about 100 URLs ("run the existing importer on these URLs, package as version
   1.0.n").
4. Hand the packages and sheet rows to someone with AEM access: install, add the rows, preview,
   review, publish (README section 4, step 10).
5. Run the **record prompt** to update the inventory, the mapping and the docs.

## The wave prompt

Replace the `<…>` parameters (table below the prompt).

```text
Migrate the tcs.com page template <TEMPLATE> to this project. Read AGENTS.md, the knowledge base
(docs/handover/knowledge-base/README.md), docs/migration/README.md and tools/importer/README.md
first and follow them. Work on the branch <BRANCH>; don't push, merge, install or publish
without asking me.

Source: <SOURCE PATTERN>. URLs: <URLS, or: the first <N> rows with status "to do" and area
<AREA> in tools/importer/inventory/migration-mapping.csv>, plus the already migrated references
<REFERENCE URLS>. tcs.com answers 403 to scripts: open each page in a browser, one at a time, and
save it to tools/importer/bd-snapshots/www.tcs.com/<path>.html before importing.

Target: AEM content (xwalk) below <TARGET ROOT>, same page name: <TARGET ROOT> + the tcs.com path,
lower case, without trailing hyphens. The approved reference is <REFERENCE PAGE> (its .plain.html
on aem.page and its row in the metadata sheet): match its sections, blocks, block rows and
metadata exactly.

Blocks: <BLOCKS>. Use existing blocks only (blocks/README.md, each block's README and model). If
the source has content no block covers, stop and list it with a proposal: a new block, variant or
field needs my approval and a decision log entry. Constants copied from the reference:
<CONSTANTS>. Drop: <DROP>. Metadata: <METADATA>.

Steps:
1. Classify the URLs and confirm they are one template (the source <meta name="template">); add
   the template to tools/importer/page-templates.json (keep the other templates).
2. Analyse a representative page and map sections and blocks, with selectors for every layout of
   the template (check an old and a new page).
3. Write the transformers, one parser per block (rows in the block model's order: key-value
   blocks map by position) and tools/importer/import-<TEMPLATE>.js (metadata, target path).
4. Import the URLs into content/.
5. Validate and report per page: sections and blocks; article text recall (source body vs the
   imported default content, target >= 98 %); tables and lists complete; every page converts to
   JCR; the reference pages re-imported identical to the published ones
   (node tools/importer/compare-reference.mjs). Fix the parsers / transformers and re-import
   until they pass; explain any page below target.
6. Package: node tools/importer/build-package.mjs --urls tools/importer/urls-<TEMPLATE>.txt
   --name <PACKAGE> --version <VERSION> (published pages left out), with the metadata and
   redirect rows.
7. Update tools/importer/README.md (templates table) and docs/migration/README.md (results of the
   wave); run npm run lint and npm test; commit on the branch.

Report: the pages imported, the validation table, what doesn't match and why, the package and the
sheet rows to hand over, and the decisions you need from me. Don't write to AEM, Document
Authoring or the admin API; write "Not recorded" or "Blocked: <input needed>" instead of guessing.
```

### Parameters

| Parameter | Meaning | Pilot value |
| --- | --- | --- |
| TEMPLATE | Kebab-case page type | `press-release` |
| BRANCH | The migration branch | `feat/content-migration-pilot` |
| SOURCE PATTERN | tcs.com URL pattern and source template | `/who-we-are/newsroom/press-release/*`, "TCS NewsRoom Template" |
| URLS / N / AREA | The wave's URLs, or how to take them from the mapping | 8 `to do` releases |
| REFERENCE URLS, REFERENCE PAGE | Migrated pages of the template, the approved one | `/language-master/en/who-we-are/newsroom/press-release/tcs-certified-top-employe-in-latin-america` |
| TARGET ROOT | `REVIEW_ROOTS` during the review, `/en` after the rollout | `/language-master/en` |
| BLOCKS | The reference page's blocks | Page Header, default content, Table, Media Contacts, List, Teaser |
| CONSTANTS | Blocks identical on every page of the template | In the News List, Connect with us Teaser, Media Contacts title |
| DROP | Site chrome and content blocks render from sheets or the index | Header, navigation, breadcrumb, share, cookie banner, footer, source contacts, In the News cards |
| METADATA | The reference's metadata row and page tags | page-type, content-type, eyebrow, publish-date (dateline), reading-time, region, language, persona, tags, featured-image |
| PACKAGE, VERSION | Package name and version (one per batch) | `tcs-press-release-pilot`, `1.0.0` |

## Ready to run: wave 1, the rest of the newsroom

```text
Migrate the tcs.com page template press-release to this project, with the existing importer
tools/importer/import-press-release.js. Read AGENTS.md, docs/migration/README.md and
tools/importer/README.md first and follow them. Work on the branch feat/content-migration-pilot;
don't push, merge, install or publish without asking me.

URLs: the rows of tools/importer/inventory/migration-mapping.csv with locale en, status "to do"
and area who-we-are/newsroom/press-release, plus the reference
https://www.tcs.com/who-we-are/newsroom/press-release/tcs-certified-top-employe-in-latin-america-.
Save each page from a browser first (tcs.com answers 403 to scripts). Check whether any of them
is already migrated at another path (e.g. curated-design-pages/forms for
tcs-bancs-for-treasury-marks-its-entry-into-sri-lanka-with-indian-bank) and leave those out.

Then the other newsroom pages to do (news-alert, analyst-reports, analyst-recognition,
tcs-in-the-news): open one of each, compare it with the press release template and with the
migrated newsroom articles (page-type article), and tell me whether the press release importer
fits or which template they need, before importing them.

Validate as the wave prompt says (reference identical, recall >= 98 %, JCR), package as
tcs-press-release version 1.0.1, update the docs, run lint and tests, commit, and report.
```

## Record prompt (after a wave is published)

```text
The packages <PACKAGES> are installed and published. Read the tcs.com sitemap in a browser into
/tmp/playwright/tcs-sitemap.json, then run node tools/importer/inventory.mjs
/tmp/playwright/tcs-sitemap.json and node tools/importer/mapping.mjs; compare the published pages
of the wave with their imported content (node tools/importer/compare-reference.mjs); update
docs/migration/README.md (state, results) and report what changed. Run lint and tests and commit.
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
| Code | `npm run lint` and `npm test` pass; nothing outside `tools/importer/` and `docs/` changed without a reason |

## Don'ts

- Don't create blocks, variants or model fields for a migration without approval (decision log).
- Don't overwrite published pages; don't install, preview or publish without the owner.
- Don't put metadata in page properties the model doesn't have; use the metadata sheet.
- Don't hard-code content that differs per page; constants only when identical on every page.
- Don't commit source snapshots, bundles or reports (third-party pages, generated files).
