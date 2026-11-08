# migrated-page-content

Delivery branch of the tcs.com content migration driven by `URLMapping_Final_All_Levels.csv` (8,447
rows) and the EMA ETL migration prompt. It holds migration deliverables only (no site code): the
discovery and readiness report, the Knowledge Base, and the content packages, batch by batch.

| Folder | Contents |
|---|---|
| `discovery/` | Discovery and Migration Readiness Report (`00-DISCOVERY-READINESS-REPORT.md`) and the reports 01–17 (workbook validation, target path resolution, existing pages, block inventory and variations, design archetypes, package examples, source patterns, classification, batch plan, pilot plan, decision log, migration model `17-MIGRATION-MODEL.md`) |
| `knowledge-base/` | The structured Knowledge Base (JSON): blocks, variations, design pages, canonical mapping, gaps, batches, pilot, decisions |
| `packages/<batch>/` | The content packages of each batch (installed in AEM with Package Manager; each page and asset has its own filter) with the batch report and `batch-results.csv` |
| `consolidated/` | Every package in installation order, the consolidated sheets (metadata, redirects, authors, placeholders, data sheets, unmapped tags), the final reconciliation and reports, and `tools/` (automatic installation, asset ID export; macOS and Windows) |
| `packages-earlier-run-assets/` | 13 asset packages with the 1,342 assets of earlier migration runs the pages use, for **fresh environments** (merge filters: nothing changes where they exist) |
| `packages-for-edam-sites/` | The **EDAM set-up** (assets on a separate AEM Assets environment, where content packages can't be installed): `edam-zips/` (the assets as plain zips at their DAM paths, built locally with its tools, pilot B001 included; the Metadata Import file and the tags) and `content-packages/` (the page packages with the assets' delivery URLs, built after the asset ID export). `packages/` and `consolidated/packages/` stay for a local or non-EDAM set-up |

## Which version to install

**Page packages: version 1.3.0** (`tcs-corp-ema-<batch>-1.3.0.zip`): the language master below
**`/content/tcs-corp/language-masters`** (moved from `/content/tcs-corp/language-master`: pages, filters and
every link; `consolidated/packages-1.3.0-RENAME-REPORT.md`). **Asset packages: version 1.2.0**
(`-assets-NN-1.2.0.zip`, DAM paths, unchanged). Per batch the asset packages first, then the page package, as
in `consolidated/packages/INSTALL-ORDER.md`. On a **fresh environment** install `packages-earlier-run-assets/`
first (1,342 assets of earlier runs the pages use; merge filters, safe on any author).

Superseded (kept for traceability): the 1.2.0 page packages (old root), and the 1.0.0 / 1.1.0 packages. 1.2.0
migrated every live section (no content left behind), added the Media Contacts block to press releases and
lists, per row, the design sections the live page has no content for (`batch-results.csv`, column Remarks; its
paths are the workbook's, below the old root). See `discovery/17-MIGRATION-MODEL.md`, sections 7 to 9.

Before installing the 1.3.0 page packages on an author that has the old root, move the existing tree (Sites
console > Move, references adjusted) and have the site's path mapping changed for the new root.

Each package and report traces back to its workbook rows (Row ID = the CSV row number).
