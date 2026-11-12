# Copilot Instructions

GitHub Copilot reads `.github/copilot-instructions.md`: the block below is the content to place there (it isn't placed automatically; the repository has no such file yet). It repeats the core agent rules in Copilot's short format; the full workflow is in [agent-guidelines.md](./agent-guidelines.md).

| Attribute | Value |
| --- | --- |
| Audience | Developers using GitHub Copilot, repository administrators |
| Source of truth | [AGENTS.md](../../../AGENTS.md), [agent-guidelines.md](./agent-guidelines.md) |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 |
| Status | Current (not placed in .github/) |

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

- [Knowledge base index](./README.md)
- [Agent guidelines](./agent-guidelines.md)
- [Agent instructions (for AGENTS.md)](./agent-instructions.md)
- [Decision log](./decision-log.md)
- [Development standards](./development-standards.md)
- [AGENTS.md](../../../AGENTS.md)
