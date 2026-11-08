---
id: "ARC-010"
title: "Architecture Risks and Open Items"
role: "Architecture"
topic: "risks"
audience: "Solution architects, technical leads, developers, AI agents"
owner: "Solution Architect"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["docs/handover/knowledge-base/decision-log.md","docs/handover/knowledge-base/reports/discrepancy-report.md"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Architecture Risks and Open Items

| Attribute | Value |
| --- | --- |
| Document ID | ARC-010 |
| Audience | Solution architects, technical leads, developers, AI agents |
| Purpose | Risks and open architecture items with their status |
| Scope | — |
| Prerequisites | — |
| Owner | Solution Architect (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | docs/handover/knowledge-base/decision-log.md, docs/handover/knowledge-base/reports/discrepancy-report.md |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Open architecture items](#open-architecture-items)
- [Recommendations (not approved)](#recommendations-not-approved)
- [Recommendations (not approved)](#recommendations-not-approved-1)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Open architecture items

| ID | Item | Status | Owner (proposed) |
| --- | --- | --- | --- |
| AR-01 | Redirects: per-locale sheets aren't applied by the platform; / to /en/ needs a CDN rule (KB-D-055) | Planned (on hold) | Solution Architect |
| AR-02 | Dynamic Media for all assets (KB-D-067): reprocessing, approval, asset IDs, page rewrite and reinstall pending; picker PR #200 needs the Extension Manager set-up | Partially implemented | AEM Administrator |
| AR-03 | Adobe Tags / Web SDK / consent not configured: data layer only | Not implemented | Product Owner |
| AR-04 | Forms have no submission back end (F-01) | Not implemented | Product Owner |
| AR-05 | MSM or separate regional content for the language master rollout | To be confirmed | Product Owner |
| AR-06 | /en locale content was unpublished and deleted from Edge Delivery on 8 November 2026 16:41–16:48 UTC (author-side action) | Open: to confirm intent | Content Lead |
| AR-07 | /design-block-master/en content links to /language-master/en (1,281 links) and to unmapped /content/tcs-corp/design-block-master/english paths (358 links) | Open | Content Lead |
| AR-08 | Production domain, CDN, monitoring not recorded | To be confirmed | Solution Architect |

## Recommendations (not approved)

## Recommendations (not approved)

Recommendations recorded in the handover (Part 16 recommendations, 11.7, 12.3) and those derived for this knowledge base. None is a decision: each needs an owner's approval and a decision log entry before implementation.

| Recommendation | Source | Status |
| --- | --- | --- |
| Integrate Adobe Tags with the Web SDK and the ACDL extension in `scripts/delayed.js`, with consent | Handover 11.7; F-06; O-07 (blocked: measurement plan, Tags property, datastream, consent platform) | Recommendation (not approved) |
| Run `npm test` in the Build workflow; tag releases; replace the boilerplate values of `package.json`, the PR template and the Sidekick project name | F-37; handover 12.3 | Recommendation (not approved) |
| Configure a CDN or root redirect for `/` → `/en/` and apply the per-locale redirects sheets | F-36; O-03 | Specified in [redirects-cdn.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/proposals/redirects-cdn.md) (KB-D-055, Proposed) |
| Add hreflang alternates and a language switcher | F-39 | Recommendation (not approved) |
| Connect a form back end before publishing any form, or hide forms | F-01; O-08 | Recommendation (not approved) |
| Align the handover's Part 6 component chapters with the block READMEs | F-107 | Recommendation (not approved) |
| Reference [agent-instructions.md](../../09-knowledge-base/agents/AGENTS.md) from the root AGENTS.md and place [copilot-instructions.md](../../09-knowledge-base/llms/LLM-CONTEXT.md) in `.github/` | Derived for this knowledge base | Recommendation (not approved) |
| Remove the language master review code and paths after the rollout to /en (KB-D-010) | F-88 | Recommendation (not approved): planned, the timing isn't recorded |

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
