---
id: "GOV-003"
title: "Content Governance"
role: "Administration and governance"
topic: ""
audience: "Site administrators, product owner, program governance"
owner: "Product Owner / Program Governance"
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

# Content Governance

| Attribute | Value |
| --- | --- |
| Document ID | GOV-003 |
| Audience | Site administrators, product owner, program governance |
| Purpose | Rules for content |
| Scope | — |
| Prerequisites | — |
| Owner | Product Owner / Program Governance (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [The roots](#the-roots)
- [Content governance](#content-governance)
- [Publishing and indexing dependencies](#publishing-and-indexing-dependencies)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## The roots

| Root | Rule |
| --- | --- |
| /content/tcs-corp/language-masters/en | Real content only; validated with the real sheets; source of the global site later |
| /content/tcs-corp/language-master/en | Dummy content for tests; never the source of other content |
| /content/tcs-corp/design-block-master/en | Block library and curated design pages; keep links inside this root |

## Content governance

Verified rules (enforced by code or configuration):

- Locale resources sit at fixed locations (`references/nav`, `references/footer`, `error-pages/404`, the sheets, `data/*`): code resolves them per locale.
- Navigation, Footer and 404 Page are inherited from parent pages up to Home.
- `hide-in-nav = yes` keeps a page out of List results (not Filter List or the Canvas menu: F-30, F-33).
- Reference, error, data, nav / footer, fragments and modals paths are excluded from the query index.
- Sheets and reference pages take effect only once published.
- No sample content in templates or model defaults (AEM stores definition template values on every new component).

Ownership, review cadences and approval flows: Not recorded in the repository (handover Parts 7.4, 14 and 17 describe proposed processes and open owners).

## Publishing and indexing dependencies

| Change | Must also be published / done | Effect |
| --- | --- | --- |
| New or changed page | Publish the page | Index row and sitemap update; lists show it (see [indexing-and-search.md](../../01-architecture/markdown/INTEGRATION-ARCHITECTURE.md)) |
| Page metadata used by cards | Republish the listed page | List / Filter List cards change; the List page itself needs no republish |
| Sheet (placeholders, metadata, taxonomy, redirects, data) | Publish the sheet | Next page load (each loaded once per page view) |
| Bulk metadata | Sheet listed in `metadata.source` | Metas on matching pages |
| Navigation / footer / fragment | Publish the reference page | Every including page; inherited values in a new browser session |
| Non-image DAM assets (Lottie JSON, videos, captions) | Publish the assets | Served only once published; images travel with the page (AGENTS.md) |
| `helix-query.yaml` | Reindex (Admin API index operation) or republish | Existing rows unchanged until then |
| `LOCALES` | `npm run build:paths`, re-apply `public.json` and `metadata.source` | New paths published |

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
