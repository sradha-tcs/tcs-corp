# EDAM runbook: from decisions to live pages

> **For a separate AEM Assets environment only.** The project decided on 8 November 2026 (KB-D-067) for Dynamic
> Media on the Sites environment itself: follow `../docs/handover/07-administration-governance/markdown/DYNAMIC-MEDIA-SETUP.md` instead.

Step by step for the migrated TCS Corporate content with its assets on a separate AEM Assets environment
(EDAM). Each step says who does it, where, and how to check it before the next one. Plan and decisions:
`docs/proposals/remote-assets-edam.md` in the site repository (KB-D-064).

Roles: **PO** product owner, **Admin** AEM administrator (Sites and Assets), **Dev** developers / migration team.

## Phase 0. Decisions (PO)

**Before anything else: the language master root moves** from `/content/tcs-corp/language-master` to
`/content/tcs-corp/language-masters` (page packages 1.3.0). On the Sites author, move the existing tree (Sites console > Move, references
adjusted) and have the site's path mapping changed (site configuration and `paths.json`, `utils/site.js`, `helix-query.yaml`) before installing.

| # | Step | Check |
|---|---|---|
| 0.1 | **E-D1**: Dynamic Media with OpenAPI delivery is licensed and enabled on the Assets environment | **Answered 8 November 2026: yes (licensed)** |
| 0.2 | **E-D2**: delivery domain: a custom domain (recommended) or the default `delivery-p…-e….adobeaemcloud.com` | Host name known |
| 0.3 | **E-D3 to E-D5**: images through the Edge Delivery media bus, bulk approval per batch after the pilot, the Sites author's DAM unused | Confirmed or changed |
| 0.4 | Dev records the answers in the decision log (KB-D-064 → Approved) | Pull request merged |

## Phase 1. Prepare (Admin, Dev)

| # | Step | Check |
|---|---|---|
| 1.1 | Admin Console: authors and admins in the product profiles of the Assets environment | They can open its Assets view |
| 1.2 | Download the branch `migrated-page-content-edam` (all of it: the scripts read the asset and page packages) | `edam-assets.sh` / `.ps1` and `aem-sites.sh` / `.ps1` in its root folder |
| 1.3 | Dev starts the site code for EDAM assets (step 3.1) in parallel | Pull request opened |

The two scripts (`../RUN-SCRIPTS.md`) do phases 2 to 5 except the checks in AEM, the sheets and publishing.
The tags (step 1.3 before) are created by `edam-assets`.

## Phase 2. Pilot assets: batch B001 (Admin)

| # | Step | Check |
|---|---|---|
| 2.1 | Run **`edam-assets.sh --batch B001`** (Mac) / **`edam-assets.ps1 -Batch B001`** (Windows) with `EDAM_AUTHOR` and `DELIVERY_HOST` set (commands below): extract, tags, upload, metadata, approval, asset ID export with spot checks | Report: **Expected (batch B001): 57, Found 57, Missing 0, Not approved yet 0**; the 5 spot checks answer **200** |
| 2.2 | Assets view of EDAM: `/content/dam/tcs-corp/…` | The 57 assets processed (thumbnails), approved, with titles, descriptions and tags; the 41 tags in Tools > Tagging under **TCS Corp** |

## Phase 3. Pilot pages (Dev, Admin)

| # | Step | Check |
|---|---|---|
| 3.1 | Dev: site code for EDAM assets (Universal Editor Custom Content Advisor and its configuration, the 20 asset fields of 15 component models with their MIME type fields, delivery URL rendering, tests, READMEs): reviewed and merged | Pull request merged, checks green |
| 3.2 | Run **`aem-sites.sh --batch B001`** / **`aem-sites.ps1 -Batch B001`** with `SITES_AUTHOR` (a **non-production** Sites author) and `DELIVERY_HOST`: builds `content-packages/tcs-corp-ema-B001-W2-N-A02-1.3.0-edam.zip` (pages below `/content/tcs-corp/language-masters`, every asset reference → delivery URL) and installs it | **53 references, 53 rewritten, 0 unresolved**; installed |
| 3.3 | Open the 4 B001 pages in Universal Editor | Images show; the image fields open the EDAM asset picker |
| 3.4 | Publish the 4 pages (and preview first) | On the published pages: every image, the 2 videos and the audio link load from the delivery host (no 404); PageSpeed comparable to before |
| 3.5 | PO and Dev: pilot accepted, or the findings fixed and 2.1–3.4 repeated | Go for the full run |

## Phase 4. All assets (Admin)

| # | Step | Check |
|---|---|---|
| 4.1 | Run **`edam-assets.sh`** / **`edam-assets.ps1`** without the batch option (all 14,352 assets, the pilot's are skipped; up to 22 GB of free disk for the extracted files). Long run: when it stops (network, token expired after 24 hours), run it again; it continues | Report: **Expected 14,352, Found 14,352, Missing 0, Not approved yet 0**; spot checks 200. Missing assets are listed with their batch: run it again |
| 4.2 | Spot checks in the Assets view: titles, tags and approval in several folders | — |

**All assets before any content package:** 52 batches' pages also use assets of other batches.
Alternative for the upload (e.g. if the network is too slow for 22 GB from one machine): the EDAM zips
(`edam-zips/tools/build-edam-zips.*`), copied to Azure Blob or Amazon S3 and imported with Tools > Assets >
**Bulk Import** (target `/content/dam`), then Metadata Import of `edam-zips/metadata/edam-metadata.csv` (Field
Separator `,`, Multi value Delimiter `\|`, Asset Path Column Name `assetPath`), approval, and
`edam-assets --steps 5` for the asset IDs.

## Phase 5. All pages (Admin, Dev)

| # | Step | Check |
|---|---|---|
| 5.1 | Run **`aem-sites.sh`** / **`aem-sites.ps1`** without the batch option on the Sites author: builds the 60 content packages 1.3.0-edam (with `INSTALL-ORDER.md`, `REWRITE-<batch>.csv`, `REWRITE-SUMMARY.md`) and installs them (resumable) | 0 unresolved references in every batch; 60 installed (progress log) |
| 5.2 | Replace the sheets with `consolidated/sheets/` (metadata, redirects, authors, placeholders, data) and publish them | Sheets published |
| 5.3 | Publish the pages (tree activation of `/content/tcs-corp/language-masters/en`), then re-index | Query index shows the pages |
| 5.4 | Verify a sample of every batch (`consolidated/reports/BATCH-SUMMARY.md`): images, videos, documents, lists and cards | No missing assets |

## Phase 6. Close (PO, Admin)

| # | Step |
|---|---|
| 6.1 | New assets are uploaded only to EDAM; approval and expiry rules agreed; who maintains the taxonomy in both environments |
| 6.2 | The content team works through `consolidated/reports/CONTENT-TEAM-REMARKS.csv` (design sections without live content, 14 retired pages) |
| 6.3 | Redirects (on hold until all pages are built): the 652 moved pages and the tcs.com URLs (`consolidated/sheets/redirects.csv`) |

## Commands

From the branch's root folder. Leave the tokens out: the scripts ask for them (hidden input).

```bash
export EDAM_AUTHOR=https://author-p<program>-e<environment>.adobeaemcloud.com    # the Assets environment
export SITES_AUTHOR=https://author-p<program>-e<environment>.adobeaemcloud.com   # the Sites author
export DELIVERY_HOST=<delivery host>
bash edam-assets.sh --batch B001      # step 2.1 (step 4.1 without --batch)
bash aem-sites.sh --batch B001        # step 3.2 (step 5.1 without --batch)
```

```powershell
$env:EDAM_AUTHOR = "https://author-p<program>-e<environment>.adobeaemcloud.com"
$env:SITES_AUTHOR = "https://author-p<program>-e<environment>.adobeaemcloud.com"
$env:DELIVERY_HOST = "<delivery host>"
powershell -ExecutionPolicy Bypass -File edam-assets.ps1 -Batch B001
powershell -ExecutionPolicy Bypass -File aem-sites.ps1 -Batch B001
```

Options, exit codes and files: `../RUN-SCRIPTS.md`. The separate tools stay available
(`consolidated/tools/export-asset-ids.*`, `consolidated/tools/install-packages.*`, `edam-zips/tools/build-edam-zips.*`).

Never put a token in a file, a chat or the repository.
