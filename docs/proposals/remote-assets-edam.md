# Assets from a separate AEM Assets environment (EDAM)

| | |
|---|---|
| Date | 8 November 2026 |
| Status | For review — decisions E-D1 to E-D5 open (KB-D-064, Proposed) |
| Scope | Images, videos, audio and documents of the TCS Corporate site, including the 8,432 migrated pages (EMA migration 1.2.0) |

## 1. Today

The site uses the DAM of its own AEM Sites author (`/content/dam/tcs-corp/`): authors pick assets with the
Universal Editor's asset picker, pages store the asset's path (`fileReference`, `image`, `uri`, `poster`, …),
images are copied to the Edge Delivery media bus when a page is published, other files are served once
published. The migration packages follow this: 338 asset packages (`/content/dam/tcs-corp/{images,videos,audio,documents}/<L1>/<L2>/`)
and 60 page packages whose components reference those paths; the metadata and authors sheets reference
them too (`og-image`, `card-image`, `featured-image`, `thumbnail-image`, author `image`).

## 2. Target

A separate **AEM Assets as a Cloud Service environment** ("EDAM") is the single source of the site's assets:

- assets are stored, tagged, approved and expired there; the Sites author keeps no copies;
- authors pick them in Universal Editor from that environment (the **Custom Content Advisor** extension,
  which lists the repositories it may pick from: author and delivery tier);
- pages store the asset's **Dynamic Media with OpenAPI delivery URL**
  (`https://delivery-p<program>-e<env>.adobeaemcloud.com/adobe/assets/urn:aaid:aem:<asset id>/as/<name>.<ext>`,
  or a custom delivery domain); images keep going through the Edge Delivery media bus (the picker also
  stores the MIME type), videos and documents are delivered by Dynamic Media;
- only **approved** assets are available on the delivery tier.

Sources: aem.live "Publishing pages with AEM Assets", Adobe Developer "Universal Editor Custom Content
Advisor" (configurable asset picker), Experience League "Dynamic Media with OpenAPI".

## 3. Step by step

| # | Step | Who | Where | Result |
|---|---|---|---|---|
| 1 | **Prerequisites.** Confirm the Assets environment (program / environment), the licence for Dynamic Media with OpenAPI delivery, the same IMS org as the Sites environment, Admin Console product profiles giving authors access to the Assets environment, and (optional) a custom delivery domain | Adobe admin, product owner | Cloud Manager, Admin Console | E-D1, E-D2 answered |
| 2 | **Taxonomy on the Assets environment.** Content packages can't be installed on EDAM: create the 36 tags the assets use (`packages-for-edam-sites/edam-zips/metadata/edam-tags.csv` on the delivery branch, with their parents) in its Tagging console | AEM admin | Assets environment | Tags ready |
| 3 | **Upload the assets as EDAM zips** (`packages-for-edam-sites/edam-zips/`; the asset packages are for a non-EDAM set-up): build the 338 zips locally from the asset packages (`tools/build-edam-zips.sh` / `.ps1`; pilot B001's zips are on the branch), extract them into one folder and upload its `tcs-corp` folder to `/content/dam`: Assets view folder upload for the pilot, **Bulk Import** from an Azure Blob / S3 container for the 22 GB. Then **Metadata Import** of `metadata/edam-metadata.csv` (titles, descriptions, tags, sources) | AEM admin | Assets environment | 13,010 assets at their DAM paths with their metadata |
| 4 | **Process and approve.** Wait for processing (renditions, Dynamic Media); approve the assets (bulk: select the folders in the Assets view > Approve, or the metadata Status = Approved); check one image, one video and one PDF on the delivery tier | AEM admin, DAM librarian | Assets environment | Delivery URLs answer 200 |
| 5 | **Export the asset ids.** `tools/export-asset-ids.sh` (macOS) / `export-asset-ids.ps1` (Windows) on the delivery branch (`consolidated/tools/`) read path → asset id (`urn:aaid:aem:<jcr:uuid>`), MIME type and approval status of every asset below `/content/dam/tcs-corp` from the Assets author (read only), compare them with `expected-assets.csv` and write `asset-ids.csv` and a report (missing, not approved) | AEM admin | Assets environment | `asset-ids.csv` (13,010 assets: 10,231 images, 2,429 documents, 294 videos, 56 audio) |
| 6 | **Rebuild the page packages (1.3.0)** with `asset-ids.csv` into `packages-for-edam-sites/content-packages/`: every DAM path in the components becomes the asset's delivery URL (images with their MIME type, for the media bus); the sheets' image columns too. Same batches, same installation sequence | Migration team | Migration tooling | 60 page packages 1.3.0, sheets 1.3.0 |
| 7 | **Site code and models** (feature branch, PR, KB-D-064 approved first): enable the Custom Content Advisor extension for the Sites environment (Extension Manager); its configuration (`tools/assets-selector/*.config.json`: repositories, file types, root path); the 20 asset fields of 15 component models (card, columns-container, conversation-canvas, embed, hero, image, image-collage-item, list-item, quote, section, tcs-header, teaser, teaser-collage-image, testimonial, video) to `custom-asset-namespace:custom-asset` with a MIME type field; the decorators to render delivery URLs (images as `<picture>`, video and documents as links / players); the metadata and authors sheet readers; tests, READMEs (`npm run build:json`, `build:docs`) | Developers | Repository | Authors pick from EDAM; existing pages still render |
| 8 | **Install the 60 page packages on the Sites author:** `--only pages` with `AEM_AUTHOR` = the Sites author; replace and publish the sheets | AEM admin | Sites author | Pages reference EDAM |
| 9 | **Publish, index, verify:** publish the pages (Edge Delivery fetches the approved images from the delivery tier); check the pilot batch, then every batch's sample (images, videos, documents, cards of lists) | Migration team, QA | Sites author, Edge Delivery | Live pages with EDAM assets |
| 10 | **Governance:** new assets are uploaded only to EDAM; approval and expiry rules; who maintains the taxonomy in both environments; remove the Sites author's DAM content once nothing references it | Product owner, DAM librarian | — | E-D5 answered |

Order: tags (step 2) → EDAM zips uploaded and metadata imported on the Assets environment (3) → approval (4) →
asset ID export (5) → page packages 1.3.0 (6) and the site code (7) → page packages installed on the Sites
author (8). **Don't install the 1.2.0 page packages** on the Sites author for this target: they reference the
Sites author's own DAM paths. The delivery branch keeps both set-ups apart: `packages/` and
`consolidated/packages/` (non-EDAM / local), `packages-for-edam-sites/` (EDAM: `edam-zips/`, `content-packages/`).

## 4. Decisions

| ID | Decision | Recommendation |
|---|---|---|
| E-D1 | Is Dynamic Media with OpenAPI delivery licensed and enabled on the Assets environment? | Required for this target; otherwise keep the assets on the Sites author (today's set-up) |
| E-D2 | Delivery domain: the default `delivery-p…-e…` host or a custom domain (e.g. `assets.tcs.com`) | Custom domain, so the page content doesn't carry environment ids |
| E-D3 | Images: Edge Delivery media bus (MIME type stored) or Dynamic Media delivery (smart crops, AVIF) | Media bus for images (the blocks keep their `<picture>` handling, PageSpeed unchanged); Dynamic Media for video |
| E-D4 | Approval of the 13,010 migrated assets: in bulk at installation, or by the DAM librarian per folder | In bulk per batch after the pilot (the content was approved on tcs.com) |
| E-D5 | The Sites author's DAM after the move | Kept empty for the site; nothing is installed there |

## 5. Risks and checks before the full run

- Pilot with batch B001 end to end (steps 3–9) before installing the other 59 batches: it confirms the asset
  ids after a package installation, approval, the delivery URLs and publishing of pages that reference them.
- Asset ids are assigned by the environment the packages are installed on: reinstalling the asset packages
  elsewhere needs a new export (step 5) and rebuild (step 6).
- Edge Delivery limits (images up to 20 MB, video limits) still apply: the migrated images and videos are within them
  (videos at most 85 MB; a processing profile `edge-delivery-services-*` covers larger ones).
- The publishing technical account must be able to read the delivery tier (approved assets only).
- Not recorded: measurements on the delivery tier (load, PageSpeed) — measure in the pilot.
