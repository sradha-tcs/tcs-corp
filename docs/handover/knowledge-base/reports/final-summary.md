# Final Knowledge Base Summary

What the knowledge base contains, how it was validated and what remains open.

| Attribute | Value |
| --- | --- |
| Audience | Project leads, documentation owners, reviewers, AI agents |
| Source of truth | The validation (`validate-knowledge-base.mjs`) and the review notes in [notes/](./notes/) |
| Last reviewed | Generated from main at commit 2d06316 |
| Status | Current (regenerate with `node docs/handover/knowledge-base/validate-knowledge-base.mjs --report`) |

- **Pages:** 24 topic pages, the agent and Copilot instruction pages, README.md (the entry point) and 6 reports plus the [repository inventory](./repository-inventory.md): 34 pages, 6594 lines, 16 Mermaid diagrams, all under `docs/handover/knowledge-base/`.
- **Sources:** the repository at the commit above (code, configuration, models, tests), AGENTS.md, the block READMEs, the decorator / utility / template READMEs, the audit reports and the handover (version 2.37); each page's sources are listed in [notes/](./notes/).
- **Validation:** 1831 links checked, 0 broken; 34 of 34 pages pass the structure, link and sensitive-value checks.
- **Decisions:** 51 entries in the [decision log](../decision-log.md) (verified decisions and open proposals).
- **Discrepancies:** 142 documentation-to-implementation differences ([discrepancy report](./discrepancy-report.md)), plus the 170 block-level ones of the block documentation report; open items: the block library pages in the live query index, CI without unit tests.
- **Blocked:** the measurement plan, consent model, personalization requirements, Figma files, AEM author access (Universal Editor checks, permissions), owners; the project team's review of each page.
- **Entry points for agents:** [AGENTS.md](../../../../AGENTS.md) points to [the knowledge base](../README.md) and [agent-guidelines](../agent-guidelines.md); the content for `.github/copilot-instructions.md` is in [copilot-instructions](../copilot-instructions.md).
