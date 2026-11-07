# migrated-page-content

Delivery branch of the tcs.com content migration driven by `URLMapping_Final_All_Levels.csv` (8,447
rows) and the EMA ETL migration prompt. It holds migration deliverables only (no site code): the
discovery and readiness report, the Knowledge Base, and the content packages, batch by batch.

| Folder | Contents |
|---|---|
| `discovery/` | Discovery and Migration Readiness Report (`00-DISCOVERY-READINESS-REPORT.md`) and the reports 01–14 (workbook validation, target path resolution, existing pages, block inventory and variations, design archetypes, package examples, source patterns, classification, batch plan, pilot plan, decision log) |
| `knowledge-base/` | The structured Knowledge Base (JSON): blocks, variations, design pages, canonical mapping, gaps, batches, pilot, decisions |
| `packages/<batch>/` | The content packages of each batch (installed in AEM with Package Manager; each page has its own filter) with the batch report |

Each package and report traces back to its workbook rows (Row ID = the CSV row number).
