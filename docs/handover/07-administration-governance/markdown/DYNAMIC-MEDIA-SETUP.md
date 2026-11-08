---
id: "GOV-009"
title: "Dynamic Media Setup"
role: "Administration and governance"
topic: ""
audience: "Site administrators, product owner, program governance"
owner: "AEM Administrator"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["aem-sites.sh","edam-assets.sh","blocks/*/_*.json"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Dynamic Media Setup

| Attribute | Value |
| --- | --- |
| Document ID | GOV-009 |
| Audience | Site administrators, product owner, program governance |
| Purpose | Approving the assets, rebuilding the pages with delivery URLs and configuring the asset picker (KB-D-067) |
| Scope | — |
| Prerequisites | — |
| Owner | AEM Administrator (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | aem-sites.sh, edam-assets.sh, blocks/*/_*.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Decision](#decision)
- [Steps (AEM administrator, from the branch's root folder)](#steps-aem-administrator-from-the-branchs-root-folder)
- [The asset picker for authors](#the-asset-picker-for-authors)
- [To check in the B001 pilot](#to-check-in-the-b001-pilot)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Decision

KB-D-067 (8 November 2026): the assets stay in the Sites author's DAM; Dynamic Media with OpenAPI delivers every asset (images included, no media bus) for the migrated pages below `/content/tcs-corp/language-masters/en`; `/content/tcs-corp/language-master/en` keeps its DAM paths.

## Steps (AEM administrator, from the branch's root folder)

1. **Reprocess** the assets: Assets > Files > `tcs-corp` > select the folders > Reprocess (assets installed from packages are not processed).
2. **Approve and export the IDs** (Mac; Windows: `edam-assets.ps1 -Steps 4,5`):

```bash
export EDAM_AUTHOR=https://author-p<program>-e<environment>.adobeaemcloud.com
export DELIVERY_HOST=delivery-p<program>-e<environment>.adobeaemcloud.com
bash edam-assets.sh --steps 4,5 --batch B001
```

3. **Rebuild and install the pages** with the delivery URLs:

```bash
export SITES_AUTHOR=$EDAM_AUTHOR
bash aem-sites.sh --batch B001
```

4. Replace `data/authors` with `packages-for-edam-sites/content-packages/sheets/data-authors.csv`; publish and reindex `/content/tcs-corp/language-masters/en`.

## The asset picker for authors

1. Extension Manager: enable **Universal Editor Custom Content Advisor** for the Sites environment.
2. Fill in the templates of [assets/asset-selector](../assets/asset-selector/image.config.json) (`<author host>`, `<delivery host>` without https://) and upload them to `/content/dam/tcs-corp-config/asset-selector/` on the Sites author.
3. Merge pull request #200 (the 20 asset fields become `custom-asset-namespace:custom-asset`).

## To check in the B001 pilot

Alt text of images delivered as links, Section backgrounds, the built-in Image component, Lottie files and videos from the delivery host.

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
