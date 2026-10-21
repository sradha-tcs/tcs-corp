# Knowledge Base Validation Matrix

The status of each knowledge base page. Implementation Verified: written from the repository with its sources recorded in the review notes. Links Validated: no broken link or anchor. Review Status: the project team's review of the page (not done yet: Blocked). Statuses: Passed, Failed, Corrected and passed, Blocked, Not applicable.

| Attribute | Value |
| --- | --- |
| Audience | Project leads, documentation owners, reviewers, AI agents |
| Source of truth | The validation (`validate-knowledge-base.mjs`) and the review notes in [notes/](./notes/) |
| Last reviewed | Generated from main at commit 966ea00 |
| Status | Current (regenerate with `node docs/handover/knowledge-base/validate-knowledge-base.mjs --report`) |

| File/Area | Created or Updated | Implementation Verified | Links Validated | Review Status | Gaps |
| --- | --- | --- | --- | --- | --- |
| README.md.md | Created | Passed | Failed | Blocked | Awaiting review by the project team |
| project-overview.md | Created | Passed | Passed | Blocked | 8 recorded gaps (missing-documentation-report); awaiting review by the project team |
| repository-structure.md | Created | Passed | Passed | Blocked | 4 recorded gaps (missing-documentation-report); awaiting review by the project team |
| architecture.md | Created | Passed | Passed | Blocked | 5 recorded gaps (missing-documentation-report); awaiting review by the project team |
| content-architecture.md | Created | Passed | Passed | Blocked | 6 recorded gaps (missing-documentation-report); awaiting review by the project team |
| authoring.md | Created | Passed | Passed | Blocked | 8 recorded gaps (missing-documentation-report); awaiting review by the project team |
| blocks.md | Created | Passed | Passed | Blocked | 5 recorded gaps (missing-documentation-report); awaiting review by the project team |
| universal-editor.md | Created | Passed | Passed | Blocked | 4 recorded gaps (missing-documentation-report); awaiting review by the project team |
| decorators-and-utilities.md | Created | Passed | Passed | Blocked | 4 recorded gaps (missing-documentation-report); awaiting review by the project team |
| design-system.md | Created | Passed | Passed | Blocked | 5 recorded gaps (missing-documentation-report); awaiting review by the project team |
| accessibility.md | Created | Passed | Passed | Blocked | 8 recorded gaps (missing-documentation-report); awaiting review by the project team |
| data-layer-and-analytics.md | Created | Passed | Passed | Blocked | 6 recorded gaps (missing-documentation-report); awaiting review by the project team |
| personalization.md | Created | Passed | Passed | Blocked | 3 recorded gaps (missing-documentation-report); awaiting review by the project team |
| indexing-and-search.md | Created | Passed | Passed | Blocked | 4 recorded gaps (missing-documentation-report); awaiting review by the project team |
| performance.md | Created | Passed | Passed | Blocked | 6 recorded gaps (missing-documentation-report); awaiting review by the project team |
| security-privacy-consent.md | Created | Passed | Passed | Blocked | 7 recorded gaps (missing-documentation-report); awaiting review by the project team |
| development-standards.md | Created | Passed | Passed | Blocked | 5 recorded gaps (missing-documentation-report); awaiting review by the project team |
| testing-and-quality.md | Created | Passed | Passed | Blocked | 7 recorded gaps (missing-documentation-report); awaiting review by the project team |
| deployment-and-release.md | Created | Passed | Passed | Blocked | 7 recorded gaps (missing-documentation-report); awaiting review by the project team |
| administration-and-operations.md | Created | Passed | Passed | Blocked | 6 recorded gaps (missing-documentation-report); awaiting review by the project team |
| troubleshooting.md | Created | Passed | Passed | Blocked | 5 recorded gaps (missing-documentation-report); awaiting review by the project team |
| agent-guidelines.md | Created | Passed | Passed | Blocked | 5 recorded gaps (missing-documentation-report); awaiting review by the project team |
| decision-log.md | Created | Passed | Passed | Blocked | 3 recorded gaps (missing-documentation-report); awaiting review by the project team |
| glossary.md | Created | Passed | Passed | Blocked | 2 recorded gaps (missing-documentation-report); awaiting review by the project team |
| references.md | Created | Passed | Passed | Blocked | 7 recorded gaps (missing-documentation-report); awaiting review by the project team |
| agent-instructions.md | Created | Passed | Passed | Blocked | 2 recorded gaps (missing-documentation-report); awaiting review by the project team |
| copilot-instructions.md | Created | Passed | Passed | Blocked | 1 recorded gaps (missing-documentation-report); awaiting review by the project team |
| reports/README.md | Created | Not applicable | Passed | Blocked | Awaiting review by the project team |
| reports/repository-inventory.md | Created | Not applicable | Passed | Blocked | 4 recorded gaps (missing-documentation-report); awaiting review by the project team |
| reports/discrepancy-report.md | Created | Not applicable | Passed | Blocked | Awaiting review by the project team |
| reports/missing-documentation-report.md | Created | Not applicable | Passed | Blocked | Awaiting review by the project team |
| reports/broken-link-report.md | Created | Not applicable | Passed | Blocked | Awaiting review by the project team |
| reports/validation-matrix.md | Created | Not applicable | Passed | Blocked | Awaiting review by the project team |
| reports/final-summary.md | Created | Not applicable | Passed | Blocked | Awaiting review by the project team |

| Area | Created or Updated | Implementation Verified | Links Validated | Review Status | Gaps |
| --- | --- | --- | --- | --- | --- |
| `AGENTS.md` (knowledge base section) | Updated | Passed | Passed | Blocked | Awaiting review |
| `blocks/README.md` and the block READMEs (link to the knowledge base) | Updated | Passed | Passed | Blocked | Awaiting review |
| `.github/copilot-instructions.md` | Not created (all files under the knowledge base folder) | Not applicable | Not applicable | Blocked | Placement is a project decision |

Structure checks (one H1, attribute table, Related section, fences, raw HTML, sensitive values): all pages passed.
