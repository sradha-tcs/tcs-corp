# Knowledge Base Reports

The inventories and validation reports of the knowledge base.

| Attribute | Value |
| --- | --- |
| Audience | Project leads, documentation owners, reviewers, AI agents |
| Source of truth | The validation (`validate-knowledge-base.mjs`) and the review notes in [notes/](./notes/) |
| Last reviewed | Generated from main at commit efa26c5 |
| Status | Current (regenerate with `node docs/handover/knowledge-base/validate-knowledge-base.mjs --report`) |

| Report | Content |
| --- | --- |
| [repository-inventory.md](./repository-inventory.md) | Every root file, folder, script, style, block, decorator, utility, template, model, tool and test: purpose, consumers, dependencies, status |
| [discrepancy-report.md](./discrepancy-report.md) | Documentation-to-implementation differences, with the source to correct |
| [missing-documentation-report.md](./missing-documentation-report.md) | Gaps, blocked topics and the inputs they need |
| [broken-link-report.md](./broken-link-report.md) | Link and anchor validation |
| [validation-matrix.md](./validation-matrix.md) | The status of every page |
| [final-summary.md](./final-summary.md) | Totals and open items |
| [notes/](./notes/) | The review notes of each page (sources, discrepancies, gaps, decisions, recommendations) |
