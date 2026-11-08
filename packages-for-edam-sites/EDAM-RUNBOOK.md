# EDAM runbook: from decisions to live pages

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
| 1.2 | Get the files (only what is needed, not the 26 GB branch), see "Getting the files" below | `packages-for-edam-sites/` and `consolidated/tools/` on your machine |
| 1.3 | Assets environment, Tools > Tagging: create the namespace **TCS Corp** (`tcs-corp`), the parents and the 41 tags of `edam-zips/metadata/edam-tags.csv` (tag, title, parent) | All 41 tags present |
| 1.4 | Dev starts the site code for EDAM assets (step 3.2) in parallel | Pull request opened |

## Phase 2. Pilot assets: batch B001 (Admin)

| # | Step | Check |
|---|---|---|
| 2.1 | Extract the 4 zips of `edam-zips/zips/` into one empty folder, e.g. `edam-upload/` | `edam-upload/tcs-corp/images/…`, `…/videos/…`, `…/audio/…`: 57 files |
| 2.2 | Assets view of EDAM > Assets (the root, `/content/dam`) > **Add Assets** > upload the folder `edam-upload/tcs-corp`. Don't upload the zip files themselves | `/content/dam/tcs-corp/…` with the 57 files |
| 2.3 | Wait until processing is complete (no "processing" badge on the assets) | Thumbnails shown |
| 2.4 | Assets > **Metadata Import**: `edam-zips/metadata/batches/edam-metadata-B001-W2-N-A02.csv`; Field Separator `,`, Multi value Delimiter `\|`, Asset Path Column Name `assetPath`, Launch Workflows off | Titles, descriptions and tags on the assets. If the tags aren't read as a list: Metadata Export of one asset and use its header for `cq:tags` |
| 2.5 | Approve the 57 assets (select > **Approve**, or Status = Approved) | All approved |
| 2.6 | Export the asset IDs from EDAM (commands below) with `--batch B001 --check 5` (Mac) / `-Batch B001 -Check 5` (Windows) | Report: **Expected (batch B001): 57, Found 57, Missing 0, Not approved yet 0**; the 5 spot checks answer **200** |
| 2.7 | Send `asset-ids.csv` and the delivery host (E-D2) to Dev | — |

## Phase 3. Pilot pages (Dev, Admin)

| # | Step | Check |
|---|---|---|
| 3.1 | Dev builds `content-packages/tcs-corp-ema-B001-W2-N-A02-1.3.0-edam.zip` (pages below `/content/tcs-corp/language-masters`) (every asset reference → delivery URL) and pushes it with its `REWRITE-B001-W2-N-A02.csv` | 53 references rewritten, 0 unresolved |
| 3.2 | Dev: site code for EDAM assets (Universal Editor Custom Content Advisor and its configuration, the 20 asset fields of 15 component models with their MIME type fields, delivery URL rendering, tests, READMEs): reviewed and merged | Pull request merged, checks green |
| 3.3 | Admin installs the B001 content package on a **non-production** Sites author (commands below: `--only pages`, `PKG_DIR` / `-PackageDir` = `packages-for-edam-sites/content-packages`, `--batch B001`) | Package Manager: installed |
| 3.4 | Open the 4 B001 pages in Universal Editor | Images show; the image fields open the EDAM asset picker |
| 3.5 | Publish the 4 pages (and preview first) | On the published pages: every image, the 2 videos and the audio link load from the delivery host (no 404); PageSpeed comparable to before |
| 3.6 | PO and Dev: pilot accepted, or the findings fixed and 3.1–3.5 repeated | Go for the full run |

## Phase 4. All assets (Admin, Dev)

| # | Step | Check |
|---|---|---|
| 4.1 | Dev pushes the 55 other `-earlier` zips (about 1 GB) to `edam-zips/zips/` | Listed in `EDAM-ZIPS.md` as on the branch |
| 4.2 | Admin builds the 338 EDAM zips locally: `tools/build-edam-zips.sh` (Mac) / `build-edam-zips.ps1` (Windows); needs `consolidated/packages/` (22 GB) and 22 GB of free disk | 338 zips in `edam-zips/zips/`, plus the `-earlier` zips |
| 4.3 | Extract all zips into one folder (the 4 pilot files are the same files) | One `tcs-corp/` tree, 14,352 files |
| 4.4 | Copy the `tcs-corp` folder to an Azure Blob or Amazon S3 container; Assets environment, Tools > Assets > **Bulk Import**: that source, target `/content/dam`, existing assets replaced; run it | Bulk Import job completed without errors |
| 4.5 | Wait for processing; Metadata Import of `edam-zips/metadata/edam-metadata.csv` (all 14,352 rows, same settings as 2.4) | Spot checks of titles and tags in several folders |
| 4.6 | Approve all assets of `/content/dam/tcs-corp` | — |
| 4.7 | Export the asset IDs (no `--batch`) with `--check 5` | Report: **Expected 14,352, Found 14,352, Missing 0, Not approved yet 0**; spot checks 200. Missing assets are listed with their batch: upload them again, re-export |
| 4.8 | Send `asset-ids.csv` to Dev | — |

**All assets before any content package:** 52 batches' pages also use assets of other batches.

## Phase 5. All pages (Dev, Admin)

| # | Step | Check |
|---|---|---|
| 5.1 | Dev builds the 60 content packages 1.3.0-edam and the sheets with delivery URLs, pushes them with `INSTALL-ORDER.md` and `REWRITE-SUMMARY.md` | 0 unresolved references in every batch |
| 5.2 | Admin installs them on the Sites author: `install-packages --only pages` with `PKG_DIR` / `-PackageDir` = `packages-for-edam-sites/content-packages` (resumable) | 60 installed (progress log) |
| 5.3 | Replace the sheets with `consolidated/sheets/` (metadata, redirects, authors, placeholders, data) and publish them | Sheets published |
| 5.4 | Publish the pages (tree activation of `/content/tcs-corp/language-masters/en`), then re-index | Query index shows the pages |
| 5.5 | Verify a sample of every batch (`consolidated/reports/BATCH-SUMMARY.md`): images, videos, documents, lists and cards | No missing assets |

## Phase 6. Close (PO, Admin)

| # | Step |
|---|---|
| 6.1 | New assets are uploaded only to EDAM; approval and expiry rules agreed; who maintains the taxonomy in both environments |
| 6.2 | The content team works through `consolidated/reports/CONTENT-TEAM-REMARKS.csv` (design sections without live content, 14 retired pages) |
| 6.3 | Redirects (on hold until all pages are built): the 652 moved pages and the tcs.com URLs (`consolidated/sheets/redirects.csv`) |

## Getting the files

Only the folders needed, with Git (macOS Terminal or Windows PowerShell with Git for Windows):

```bash
git clone --filter=blob:none --no-checkout --single-branch --branch migrated-page-content https://github.com/sradha-tcs/tcs-corp.git tcs-migration
cd tcs-migration
git sparse-checkout set --no-cone /packages-for-edam-sites/ /consolidated/tools/
git checkout migrated-page-content
# for step 4.2 (the converter) also the asset packages, 22 GB:
git sparse-checkout add /consolidated/packages/
```

## Commands

Asset ID export (step 2.6 with the pilot options, step 4.7 without them), from `tcs-migration/consolidated`:

```bash
export AEM_AUTHOR=https://author-p<program>-e<environment>.adobeaemcloud.com   # the Assets environment
export AEM_TOKEN='<access token>'            # its Developer Console > Integrations > Local token
export DELIVERY_HOST=<delivery host>
bash tools/export-asset-ids.sh --batch B001 --check 5
```

```powershell
$env:AEM_AUTHOR = "https://author-p<program>-e<environment>.adobeaemcloud.com"
$env:DELIVERY_HOST = "<delivery host>"
powershell -ExecutionPolicy Bypass -File tools\export-asset-ids.ps1 -Batch B001 -Check 5
```

Content package installation (step 3.3 with `--batch B001`, step 5.2 without it), from `tcs-migration`:

```bash
export AEM_AUTHOR=https://author-p<program>-e<environment>.adobeaemcloud.com   # the Sites author
export AEM_TOKEN='<access token>'
PKG_DIR=packages-for-edam-sites/content-packages bash consolidated/tools/install-packages.sh --only pages --batch B001
```

```powershell
$env:AEM_AUTHOR = "https://author-p<program>-e<environment>.adobeaemcloud.com"
powershell -ExecutionPolicy Bypass -File consolidated\tools\install-packages.ps1 -Only pages -Batch B001 -PackageDir packages-for-edam-sites\content-packages
```

Never put a token in a file, a chat or the repository.
