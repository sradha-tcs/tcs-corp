# Project Knowledge Base

The single source of truth for the TCS Corporate Website project (AEM Sites with Edge Delivery Services, xwalk / Universal Editor): what the project is, how it is built, authored, published and operated, and the rules every contributor and AI agent follows. Each page summarizes verified facts from the repository and links to the detailed sources.

| Attribute | Value |
| --- | --- |
| Audience | Everyone working on the project: see [Audience](#audience) |
| Source of truth | The repository at commit 2d06316 (`main`, 21 October 2026); [AGENTS.md](../../../AGENTS.md); the block READMEs ([blocks/README.md](../../../blocks/README.md)); the project handover ([TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md), version 2.37) |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 |
| Status | Current; topics that couldn't be verified are marked "Blocked" or "Requires validation" in their page |

## Purpose

This knowledge base is the project-wide single source of truth for humans and AI agents. It brings together, per topic, the verified current state of the implementation and the project's standards, and points to the detailed sources: the code itself, [AGENTS.md](../../../AGENTS.md) (the repository rules), the README of each block, the decorator and utility READMEs, the audit reports and the handover. Where the handover or another document differs from the code, the knowledge base describes the code and records the difference ([discrepancy report](./reports/discrepancy-report.md)).

## Mandatory Usage

Every contributor and every agent reads the relevant knowledge base pages **before** planning, generating, modifying, testing, refactoring or documenting project artifacts, and updates them **in the same change** when the change affects what they describe ([Keeping the Knowledge Base Current](#keeping-the-knowledge-base-current)). Agents follow the workflow of [agent-guidelines.md](./agent-guidelines.md); a prompt that conflicts with the knowledge base is raised, not silently implemented (its Prompt Execution Contract).

## Audience

Developers, technical leads, solution and enterprise architects, content authors, Site Administrators, QA engineers, AMS and support engineers, analytics engineers, personalization engineers, DevOps and release managers, Adobe consultants, new joiners, and AI and coding agents (EMA, GitHub Copilot, Cursor, Claude, ChatGPT and others).

## Quick Start by Role

| Role | Read in this order |
| --- | --- |
| New Developer | [project-overview](./project-overview.md) → [repository-structure](./repository-structure.md) → [architecture](./architecture.md) → [development-standards](./development-standards.md) → [blocks](./blocks.md) → [universal-editor](./universal-editor.md) → [decorators-and-utilities](./decorators-and-utilities.md) → [testing-and-quality](./testing-and-quality.md) → [AGENTS.md](../../../AGENTS.md) |
| Content Author | [project-overview](./project-overview.md) → [authoring](./authoring.md) → [content-architecture](./content-architecture.md) → the README of the blocks you use ([blocks/README.md](../../../blocks/README.md)) → [accessibility](./accessibility.md) (author responsibilities) |
| Site Administrator | [administration-and-operations](./administration-and-operations.md) → [content-architecture](./content-architecture.md) → [indexing-and-search](./indexing-and-search.md) → [deployment-and-release](./deployment-and-release.md) → [troubleshooting](./troubleshooting.md) |
| Solution Architect | [project-overview](./project-overview.md) → [architecture](./architecture.md) → [content-architecture](./content-architecture.md) → [data-layer-and-analytics](./data-layer-and-analytics.md) → [personalization](./personalization.md) → [security-privacy-consent](./security-privacy-consent.md) → [performance](./performance.md) → [decision-log](./decision-log.md) |
| QA Engineer | [testing-and-quality](./testing-and-quality.md) → [accessibility](./accessibility.md) → [performance](./performance.md) → [blocks](./blocks.md) (and the QA section of each block README) → [troubleshooting](./troubleshooting.md) |
| AMS / Support Engineer | [administration-and-operations](./administration-and-operations.md) → [troubleshooting](./troubleshooting.md) → [deployment-and-release](./deployment-and-release.md) → [indexing-and-search](./indexing-and-search.md) → [architecture](./architecture.md) |
| Analytics Engineer | [data-layer-and-analytics](./data-layer-and-analytics.md) → [security-privacy-consent](./security-privacy-consent.md) → [personalization](./personalization.md) → the Data Layer section of each block README |
| Personalization Engineer | [personalization](./personalization.md) → [data-layer-and-analytics](./data-layer-and-analytics.md) → [content-architecture](./content-architecture.md) (metadata) → [performance](./performance.md) → [decision-log](./decision-log.md) |
| AI / Coding Agent | [agent-guidelines](./agent-guidelines.md) → this page → the topic pages of the task → the README of every affected block → [AGENTS.md](../../../AGENTS.md) → [decision-log](./decision-log.md) |

## Knowledge Base Map

| Page | Purpose | Audience |
| --- | --- | --- |
| [project-overview.md](./project-overview.md) | What the project is: objectives, users, locales, site structure, stack, scope, constraints | Everyone |
| [repository-structure.md](./repository-structure.md) | The repository tree: what each folder and root file is for, what belongs there, generated files | Developers, agents |
| [architecture.md](./architecture.md) | Solution, runtime, authoring, publishing, integration, environments, data and rendering flow, caching | Architects, developers |
| [content-architecture.md](./content-architecture.md) | Sites and locales, pages and sections, templates, metadata, taxonomy, placeholders, references, data sheets, redirects | Architects, authors, admins |
| [authoring.md](./authoring.md) | The Universal Editor authoring flow, blocks, items, publishing, assets, links, checklists | Authors, admins |
| [blocks.md](./blocks.md) | Block governance: inventory, relationships, status, variations, reuse, anti-patterns | Developers, architects, agents |
| [universal-editor.md](./universal-editor.md) | Model, definition and filter conventions, field naming and the delivery rules, adding a field | Developers, agents |
| [decorators-and-utilities.md](./decorators-and-utilities.md) | Every decorator and utility, its consumers, side effects and tests; shared-code rules | Developers, agents |
| [design-system.md](./design-system.md) | Figma relationship, tokens, typography, colours, spacing, breakpoints, motion, themes | Designers, developers |
| [accessibility.md](./accessibility.md) | Accessibility standard, behaviour by component, responsibilities, definition of done, evidence | Everyone |
| [data-layer-and-analytics.md](./data-layer-and-analytics.md) | The Adobe Client Data Layer as implemented; the planned Tags / Web SDK path (not configured) | Analytics engineers, developers |
| [personalization.md](./personalization.md) | The verified state (none implemented) and the requirements for a future implementation | Personalization engineers, architects |
| [indexing-and-search.md](./indexing-and-search.md) | The query index, the blocks that use it, the sitemap, reindexing | Developers, admins |
| [performance.md](./performance.md) | NFRs, measured evidence, loading, preloading, images, fonts, layout shift, validation | Developers, QA |
| [security-privacy-consent.md](./security-privacy-consent.md) | Sanitization, link safety, embeds, CSP, storage, query strings, consent and identity (not implemented) | Architects, developers |
| [development-standards.md](./development-standards.md) | Workflow, conventions, documentation duties, backward compatibility, definition of done | Developers, agents |
| [testing-and-quality.md](./testing-and-quality.md) | Unit tests, lint, the audit harness, combination testing, evidence and status vocabulary | QA, developers |
| [deployment-and-release.md](./deployment-and-release.md) | Local development, PRs and checks, content packages, publishing, reindexing, rollback | Developers, release managers |
| [administration-and-operations.md](./administration-and-operations.md) | Site Administrator duties, governance, configuration, monitoring, support handoff | Admins, AMS |
| [troubleshooting.md](./troubleshooting.md) | Runbook: symptom, cause, diagnosis, resolution, verification | AMS, support, developers |
| [agent-guidelines.md](./agent-guidelines.md) | The mandatory workflow and rules for AI and coding agents | Agents, reviewers |
| [agent-instructions.md](./agent-instructions.md) | The concise agent rules referenced from AGENTS.md | Agents |
| [copilot-instructions.md](./copilot-instructions.md) | The same rules for GitHub Copilot (content for `.github/copilot-instructions.md`) | Copilot users |
| [decision-log.md](./decision-log.md) | Verified project decisions and open proposals | Architects, leads, agents |
| [glossary.md](./glossary.md) | Project, Universal Editor, delivery and Adobe terms; acronyms | Everyone |
| [references.md](./references.md) | Verified links to repository documentation and the external documentation it cites | Everyone |
| [reports/](./reports/README.md) | Repository inventory, discrepancy report, missing documentation, broken links, validation matrix, final summary | Leads, reviewers |

## Current Project Status

Verified at commit 2d06316 (21 October 2026); details and evidence in the linked pages.

| Area | Status |
| --- | --- |
| Sites | 13 locale sites (`/en`, `/de-de`, …) defined in `utils/site.js` and `paths.json`; the language master under review is published at `/language-master/en` (temporary `REVIEW_*` settings) — [content-architecture](./content-architecture.md) |
| Blocks | 30 block folders: 28 active, Columns compatibility-only (replaced by the Columns Container), Interactive Dashboard an experimental placeholder — [blocks](./blocks.md) |
| Technologies | Edge Delivery Services (aem.page / aem.live), Universal Editor with xwalk models, vanilla JavaScript and CSS without a build step, the Adobe Client Data Layer, RUM (`sampleRUM`) — [architecture](./architecture.md) |
| Not configured / not implemented | Adobe Tags (Data Collection), the AEP Web SDK, Analytics and CJA reporting (blocked: measurement plan); Adobe Target and AJO; a consent mechanism; per-locale redirects (sheets exist, not applied by the platform) — [data-layer-and-analytics](./data-layer-and-analytics.md), [personalization](./personalization.md) |
| Quality evidence | 311 unit tests passing; lint clean; the latest full browser regression (191 pages × 5 widths) clean, with 0 axe violations; Lighthouse 99–100 on the measured pages after the load-time work — [testing-and-quality](./testing-and-quality.md), [performance](./performance.md) |
| Known open items | CI runs lint only (not `npm test`); the handover's Part 6 chapters differ from the code in 170 places (F-107); the Universal Editor author review is blocked (no author access) — [reports/discrepancy-report](./reports/discrepancy-report.md) |

## Golden Rules

1. **Read first.** Read this knowledge base, the pages of the topic and the README of every affected block before changing anything.
2. **Reuse before creating.** Check the existing blocks, variations, fields, decorators, utilities, events and CSS patterns; prefer a variation or property over a new block, extend a shared module over writing a new one ([blocks](./blocks.md), [decorators-and-utilities](./decorators-and-utilities.md)).
3. **Follow the AEM delivery rules.** Field collapse, tab rows, item rows, `classes_*` and `container*` fields, template values ([universal-editor](./universal-editor.md), [AGENTS.md](../../../AGENTS.md)).
4. **Accessibility first.** WCAG AA behaviour, real buttons, accessible names, keyboard support, contrast on every background ([accessibility](./accessibility.md)).
5. **Performance first.** Three-phase loading, no forced layouts while decorating, module preloading (`npm run build:modules`), no layout shift ([performance](./performance.md)).
6. **Backward compatibility.** Don't remove or rename a field, value, block or class without usage analysis and migration; the code keeps reading values authored before ([development-standards](./development-standards.md)).
7. **Approved integration patterns only.** Use the central data layer; no parallel tracking libraries; no personalization or consent code without an architecture decision ([data-layer-and-analytics](./data-layer-and-analytics.md), [decision-log](./decision-log.md)).
8. **Evidence, not claims.** Don't claim a test, integration or result without evidence; use the status vocabulary Passed, Failed, Corrected and passed, Blocked, Not applicable ([testing-and-quality](./testing-and-quality.md)).
9. **No secrets or personal data** in code, content or documentation ([security-privacy-consent](./security-privacy-consent.md)).
10. **Document in the same change.** Code, tests, block README (`npm run build:docs`), this knowledge base, AGENTS.md, the handover and the decision log move together.

## Keeping the Knowledge Base Current

- **When:** every change that affects architecture, the repository structure, blocks or variations, dialogs, models or definitions, utilities or decorators, design tokens, authoring processes, accessibility, the data layer or analytics, Target / AJO / CJA, consent or identity, indexing, deployment, operational support or agent behaviour updates the relevant knowledge base page and block README sections **in the same pull request**. This is part of the definition of done ([development-standards](./development-standards.md)).
- **How:** edit the affected page; record decisions in the [decision log](./decision-log.md); run `npm run build:docs` for the generated block README sections; run `node docs/handover/knowledge-base/validate-knowledge-base.mjs` to check the links, anchors, structure and sensitive values of this knowledge base.
- **Freshness:** each page's "Last reviewed" states the commit it was written or reviewed from; it is updated only when the page is actually reviewed against the code (no invented review dates). Content that couldn't be verified is marked "Requires validation" or "Blocked".
- **Precedence:** the code is the current state. When the handover, a README or this knowledge base disagrees with the code, correct the documentation (or raise the code defect) and record it.

## Related

- [AGENTS.md](../../../AGENTS.md): repository rules for agents and developers
- [blocks/README.md](../../../blocks/README.md): block documentation index
- [docs/handover/README.md](../README.md) and [TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md): the project handover
- [reports/](./reports/README.md): inventory, discrepancies, validation
