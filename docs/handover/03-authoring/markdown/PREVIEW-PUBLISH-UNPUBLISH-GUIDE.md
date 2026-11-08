---
id: "AUT-013"
title: "Preview, Publish and Unpublish Guide"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["docs/handover/knowledge-base/authoring.md"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Preview, Publish and Unpublish Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-013 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | Previewing, publishing, unpublishing and republishing |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | docs/handover/knowledge-base/authoring.md |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Previewing](#previewing)
- [Publishing](#publishing)
- [Corrective publishing](#corrective-publishing)
- [Publishing and the Admin API](#publishing-and-the-admin-api)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Previewing

1. Switch the Universal Editor to **Preview** and check the three device sizes: no editor hints left, hidden blocks gone, animations play.
2. Publish to the preview tier and open `https://main--tcs-corp--sradha-tcs.aem.page/{locale}/{path}`; Lists, Filter Lists, placeholders and taxonomy labels only resolve there (not on author).
3. Use a private window or a cache-busting query to bypass the browser cache.

Which publish destinations the Universal Editor offers in this program (Preview and / or Live) is not recorded (handover Part 5, 5.7.2).

## Publishing

| Task | Where | Verify |
| --- | --- | --- |
| One page | Universal Editor **Publish** (keep changed references selected) | Live URL in a private window |
| Several pages or a branch | Sites console **Manage Publication** (include children; schedule Later) | Sample URLs, `/query-index.json` |
| Quick publish | Sites console **Quick Publish** | Live URL |
| A sheet or data sheet | Select the sheet, **Quick Publish** | `/{locale}/{sheet}.json` |
| Take down | **Manage Publication > Unpublish** (add a redirect first if the URL was public) | The locale's 404 page |
| Undo a change | **Timeline > Revert to this Version**, then publish | Live URL |

**Published separately.** A change to these items only takes effect when the item itself is published: `references/` pages (nav, footer, fragments), error pages, the sheets (`placeholders`, `metadata`, `taxonomy`, `redirects`), the data sheets (`data/authors`, `locations`, `partners`, `social-links`, `media-contacts`) and assets. A published nav, footer or fragment change shows on every page that loads it without republishing those pages.

**Order when content depends on new code or data.** Code first (merged and synced), then sheets (placeholders, taxonomy, data, metadata), then fragments (nav, footer), then pages (handover Part 12, 12.4.2).

Pages under `block-library/` and `site-global-templates/` can't be published (`excludes` of [paths.json](https://github.com/sradha-tcs/tcs-corp/blob/main/paths.json)); during the language master review its block library is published for the review (handover revision 2.20).

## Corrective publishing

Re-publication after a correction is the verified recovery path, recorded in the handover revision history:

- Package 1.0.9 was published; on `aem.live` the container sections' Additional tab had no effect (re-audit finding R-L-1). The code was corrected (PR #121), package 1.0.10 installed, and its 312 pages previewed, published and reindexed (312 / 312) (handover revisions 2.30, 2.31; [REAUDIT-2026-10-20.md](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/REAUDIT-2026-10-20.md)).
- Package 1.0.12: one page timed out on its first preview and went through on retry (handover revision 2.35).

For one page: fix the content (or restore a version), check it in Preview mode, publish to preview, verify, then publish to live. If a correction is not visible, check that the referenced item (fragment, sheet, asset) was published too, then escalate to L1 (Admin API status, re-preview and cache operations are for administrators; see [administration-and-operations.md](../../07-administration-governance/markdown/ADMINISTRATION-AND-GOVERNANCE-GUIDE.md#publishing-and-the-admin-api)).

## Publishing and the Admin API

- Authors publish from the Universal Editor or the Sites console ([authoring.md](./AUTHORING-GUIDE.md#publishing)); sheets, references and non-image assets are published on their own.
- The Edge Delivery Admin API (`https://admin.hlx.page`, authenticated; no credentials are recorded) performs the operations behind publishing. Path segments: org `sradha-tcs`, site `tcs-corp`, ref `main`.

| Operation | Endpoint pattern | Use |
| --- | --- | --- |
| Status | `GET /status/{org}/{site}/{ref}/{path}` | First check for "page not updating" |
| Preview | `POST /preview/{org}/{site}/{ref}/{path}` | Re-preview a path |
| Live | `POST /live/{org}/{site}/{ref}/{path}` | Re-publish a path |
| Unpublish | `DELETE /live/{org}/{site}/{ref}/{path}` | Emergency takedown when AEM can't unpublish |
| Cache | `POST /cache/{org}/{site}/{ref}/{path}` | Purge after a confirmed publish |
| Index | `POST /index/{org}/{site}/{ref}/{path}` | Re-index a path |
| Sitemap | `POST /sitemap/{org}/{site}/{ref}/{path}` | Regenerate a sitemap |
| Code | `POST /code/{org}/{site}/{ref}/{path}` | Re-sync code when Code Sync didn't run |
| Log | `GET /log/{org}/{site}/{ref}` | Who previewed, published, unpublished or synced what |
| Configuration | `/config/{org}/sites/{site}.json` and sub-resources (`public.json`, `metadata.json`) | Site configuration |

Source: handover Part 12, 12.1.9. Admin API operations act immediately on the public site; bulk operations (`/*`) are agreed with the site owner and logged with the before / after JSON (handover Part 17, G-01). Per-page `preview`, `live` and `index` calls were used to publish and reindex the block library packages (handover revisions 2.31, 2.35).

## Screenshots

> **Screenshot required**
>
> - Required screen: Preview, Publish and Unpublish Guide
> - Required role/access: AEM Sites author with Universal Editor (content author)
> - Required navigation steps: AEM Sites console > /content/tcs-corp/language-masters/en > open a page in Universal Editor
> - Reason unavailable: No AEM author access in the documentation program (access blocker AB-01)
> - Owner: Content Lead / AEM Authoring Lead (proposed)
> - Target completion date: To be confirmed

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
