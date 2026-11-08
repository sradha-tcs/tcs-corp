# Audit and remediation

Owner: Documentation Owner (proposed). Generated on 8 November 2026 by the documentation program from the repository and the published reference pages; the Markdown files are the maintained source, the PDFs in `pdf/` are generated from them (don't edit PDFs).

- pdf/AUDIT-AND-REMEDIATION-REPORT.pdf: all audits as one PDF
- [markdown/REMEDIATION-PLAN.md](markdown/REMEDIATION-PLAN.md)
- evidence/: link analyses and the evidence of the automated checks

## Carried summary (knowledge base reports)

What the knowledge base contains, how it was validated and what remains open.


- **Pages:** 24 topic pages, the agent and Copilot instruction pages, README.md (the entry point) and 6 reports plus the [repository inventory](../02-development/markdown/REPOSITORY-STRUCTURE.md): 34 pages, 6595 lines, 16 Mermaid diagrams, all under `docs/handover/knowledge-base/`.
- **Sources:** the repository at the commit above (code, configuration, models, tests), AGENTS.md, the block READMEs, the decorator / utility / template READMEs, the audit reports and the handover (version 2.37); each page's sources are listed in [notes/](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/reports/notes/).
- **Validation:** 1831 links checked, 0 broken; 34 of 34 pages pass the structure, link and sensitive-value checks.
- **Decisions:** 51 entries in the [decision log](../01-architecture/markdown/ARCHITECTURE-DECISIONS.md) (verified decisions and open proposals).
- **Discrepancies:** 142 documentation-to-implementation differences ([discrepancy report](../DOCUMENTATION-DISCREPANCY-REGISTER.md)), plus the 170 block-level ones of the block documentation report; open item: CI without unit tests (the query index finding F-108 is corrected).
- **Blocked:** the measurement plan, consent model, personalization requirements, Figma files, AEM author access (Universal Editor checks, permissions), owners; the project team's review of each page.
- **Entry points for agents:** [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md) points to [the knowledge base](../09-knowledge-base/README.md) and [agent-guidelines](../09-knowledge-base/agents/AGENTS.md); the content for `.github/copilot-instructions.md` is in [copilot-instructions](../09-knowledge-base/llms/LLM-CONTEXT.md).
