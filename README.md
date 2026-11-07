# migrated-page-content

Delivery branch of the tcs.com content migration driven by `URLMapping_Final_All_Levels.csv` (8,447
rows) and the EMA ETL migration prompt. It holds migration deliverables only (no site code): the
discovery and readiness report, the Knowledge Base, and the content packages, batch by batch.

| Folder | Contents |
|---|---|
| `discovery/` | Discovery and Migration Readiness Report (`00-DISCOVERY-READINESS-REPORT.md`) and the reports 01–17 (workbook validation, target path resolution, existing pages, block inventory and variations, design archetypes, package examples, source patterns, classification, batch plan, pilot plan, decision log, migration model `17-MIGRATION-MODEL.md`) |
| `knowledge-base/` | The structured Knowledge Base (JSON): blocks, variations, design pages, canonical mapping, gaps, batches, pilot, decisions |
| `packages/<batch>/` | The content packages of each batch (installed in AEM with Package Manager; each page and asset has its own filter) with the batch report and `batch-results.csv` |
| `consolidated/` | Added once all batches are built: every package in installation order, the consolidated sheets (metadata, redirects, authors, placeholders, data sheets, unmapped tags) and the final reconciliation |

## Which version to install

**Install version 1.2.0 only** (`*-1.2.0.zip`): asset packages (`-assets-NN-1.2.0.zip`) first, then the
page package (`-1.2.0.zip`). The `1.0.0` and `1.1.0` packages in the batch folders are superseded
(kept for traceability): 1.2.0 migrates every live section (no content left behind), adds the Media
Contacts block to press releases and lists, per row, the design sections the live page has no
content for (`batch-results.csv`, column Remarks) for the content team. See
`discovery/17-MIGRATION-MODEL.md`, section 7.

Each package and report traces back to its workbook rows (Row ID = the CSV row number).
