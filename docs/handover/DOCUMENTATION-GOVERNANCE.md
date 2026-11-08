---
id: "DOC-002"
title: "Documentation Governance"
role: "Documentation"
topic: ""
audience: "Every role"
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

# Documentation Governance

| Attribute | Value |
| --- | --- |
| Document ID | DOC-002 |
| Audience | Every role |
| Purpose | Where the documentation lives and how it is kept current |
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

- [Where the documentation lives](#where-the-documentation-lives)
- [Update rule](#update-rule)
- [Rules](#rules)
- [Validation](#validation)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Where the documentation lives

- **This set** (role documents, registers, knowledge base for humans and agents, PDFs): branch `migrated-page-content-edam`, folder `docs/handover/`.
- **The knowledge base for code work**: `docs/handover/knowledge-base/` in the code repository (`main`), the starting point of AGENTS.md; this set's knowledge base (09) is generated from it.
- **Block READMEs**: `blocks/<block>/README.md` in the code repository (generated sections by `npm run build:docs`).

## Update rule

**Every code change updates this set** in the same change or a named follow-up: the developer and authoring guides of the affected blocks, their variations and test cases, the inventories and matrices, the registers, the knowledge base (09) and the PDFs (regenerated, never edited). The generator and its inputs: the documentation program in the migration workspace (`generate.mjs`, `pdf.mjs`, `validate.mjs`).

## Rules

- Markdown is the source; PDFs are generated (`node pdf.mjs <docs>`) and never edited.
- Every document has the metadata table (ID, audience, owner, version, status, dates, sources, AEM paths), contents, screenshots, known limitations, open items and change history.
- Test results only with evidence; inferred requirements are labelled; owners are proposed until confirmed.
- Screenshots are real (captured from the published pages) or a visible placeholder; each is in the screenshot register.

## Validation

`node validate.mjs <docs>`: required metadata, duplicate IDs, links and images, paired PDFs, orphan screenshots, JSON validity, unresolved to-do markers.

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](./SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
