---
id: "KB-L-001"
title: "LLM Context"
role: "LLM retrieval"
topic: ""
audience: "Every role, AI agents, LLM retrieval"
owner: "Documentation Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# LLM Context

| Attribute | Value |
| --- | --- |
| Document ID | KB-L-001 |
| Audience | Every role, AI agents, LLM retrieval |
| Purpose | Context for coding assistants |
| Scope | — |
| Prerequisites | — |
| Owner | Documentation Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Content for .github/copilot-instructions.md](#content-for-githubcopilot-instructionsmd)
- [Related](#related)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Content for .github/copilot-instructions.md

```text
This is the TCS Corporate website: AEM Sites with Edge Delivery Services and Universal Editor
(xwalk). Vanilla ES6+ JavaScript and CSS, no build step, no frameworks.

Read first: docs/handover/knowledge-base/README.md, AGENTS.md, blocks/README.md and the README
of the block you change, decorators/README.md, utils/README.md,
docs/handover/knowledge-base/decision-log.md. Code wins over documentation.

- Reuse existing blocks, decorators (elements) and utils (no UI); utils never import decorators.
- Never modify scripts/aem.js. Blocks export default decorate(block).
- Generated files: component-*.json (npm run build:json), head.html modulepreload links and
  scripts/module-graph.js (npm run build:modules), block README generated sections
  (npm run build:docs), paths.json (npm run build:paths). Regenerate, don't hand-edit.
- Models: at most three short dialog tabs plus the Additional tab; repeating content as item
  children; sections use container* fields; don't end a field name that must be read with Text,
  Title, Type, Alt or MimeType; no sample content in templates; no multi on aem-content fields.
- Imports include the .js extension; Airbnb ESLint; Unix line endings.
- CSS: rem units (px only in media queries), mobile first with min-width 600 / 900 / 1200px,
  selectors scoped to the block, semantic tokens from styles/styles.css.
- UI text from placeholders: const t = await getPlaceholders(); t('key', 'English fallback').
- Accessibility WCAG 2.1 AA: real buttons, aria-expanded / aria-controls, Escape closes popups,
  pause for moving content, announceNewTab for new-tab links, labelled form errors.
- Analytics: data-cmp-* attributes; the data layer decorator pushes events centrally. Adobe Tags,
  Web SDK, Target and consent are not implemented: don't add them without an approved decision.
- Privacy and security: no personal data in the data layer, no secrets, tokens or environment ids.
- Run npm run lint and npm test before committing; never invent tests or results.
- Document with the change (block README, tools/docs/blocks.json, module READMEs, AGENTS.md,
  handover, decision log).
- PRs: feature branch, a feature preview test URL in the description, checks green.
```

## Related

- [Knowledge base index](../README.md)
- [Agent guidelines](../agents/AGENTS.md)
- [Agent instructions (for AGENTS.md)](../agents/AGENTS.md)
- [Decision log](../../01-architecture/markdown/ARCHITECTURE-DECISIONS.md)
- [Development standards](../../02-development/markdown/CODING-STANDARDS.md)
- [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md)

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
