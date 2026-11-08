# EDAM zips

The migrated assets for an AEM Assets environment where content packages can't be installed: plain zips of
the asset files at their DAM paths, and the metadata to import.

| Item | What |
|---|---|
| `EDAM-ZIPS.md` | All 395 EDAM zips in upload order: per batch one zip per asset package (338), then its `-earlier` zip(s) (56); plus the pilot's `-from-other-batches` zip: files, MB, source |
| `zips/` | The pilot batch B001's 4 zips (ready to use): its 2 asset zips, its `-earlier` zip and `-from-other-batches` (4 images its pages use from B002): 57 assets |
| `-earlier` zips | The 1,342 assets of earlier migration runs (the October waves, the pilot) that the pages reuse: no asset package holds them, so the converter can't build them; each goes with the first batch that uses it. B001's is in `zips/`; the migration team provides the others (about 1 GB). List: `metadata/assets-from-earlier-runs.csv` |
| `tools/build-edam-zips.sh` / `.ps1` | Build all zips on your machine (macOS / Windows) from the asset packages in `../../consolidated/packages/`: no 22 GB download again, a few minutes, resumable |
| `metadata/edam-metadata.csv` | Metadata Import file of all 14,352 assets (13,010 from the asset packages, 1,342 from earlier runs): `assetPath`, `dc:title`, `dc:description`, `cq:tags` (multi, `\|`), `dc:source` (the tcs.com URL) |
| `metadata/batches/edam-metadata-<batch>.csv` | The same per batch (pilot imports) |
| `metadata/edam-tags.csv` | The 41 taxonomy tags the assets use (tag, title, parent, number of assets) |

Inside a zip: `tcs-corp/<images|videos|audio|documents>/<L1>/<L2>/<file>`, the path below `/content/dam`
(e.g. `tcs-corp/images/careers/peru/peru-career-article-thumbnail-image.jpg` →
`/content/dam/tcs-corp/images/careers/peru/peru-career-article-thumbnail-image.jpg`). Every zip extracts into
the same `tcs-corp/` tree (an `-earlier` zip may add folders such as `tcs-corp/images/newsroom/2022/`: they are the paths the pages use). Keep the folder and file names: the page packages and the asset ID export
(`expected-assets.csv`) rely on these paths.

## 1. Build the zips

macOS (Terminal), from the checked-out branch:

```bash
bash packages-for-edam-sites/edam-zips/tools/build-edam-zips.sh --batch B002   # one batch
bash packages-for-edam-sites/edam-zips/tools/build-edam-zips.sh                # all (skips the zips already built)
```

Windows (PowerShell):

```powershell
powershell -ExecutionPolicy Bypass -File packages-for-edam-sites\edam-zips\tools\build-edam-zips.ps1 -Batch B002
powershell -ExecutionPolicy Bypass -File packages-for-edam-sites\edam-zips\tools\build-edam-zips.ps1
```

Options: `--packages <folder>` / `-Packages` (where the asset packages are), `--out <folder>` / `-Out` (default
`zips/`), `--force` / `-Force` (rebuild). About 22 GB of free disk space is needed for all zips.

## 2. Upload to the Assets environment

**Upload every zip before installing any content package:** most batches' pages also use assets of other batches
(`needed by` in `consolidated/tools/expected-assets.csv`).

Extract the zips into one folder (e.g. `edam-upload/`; you get `edam-upload/tcs-corp/…`). Don't upload the zip
files themselves: AEM as a Cloud Service stores a zip as one asset and doesn't unpack it.

| Way | When |
|---|---|
| **Assets view > Add Assets > upload the `tcs-corp` folder** into the root (`/content/dam`) | The pilot batch and small batches |
| **Bulk Import** (Tools > Assets > Bulk Import) from an Azure Blob or Amazon S3 container holding the `tcs-corp` folder, target `/content/dam` | Recommended for all 14,352 assets (22.4 GB): server-side, resumable, no browser upload |

After the upload, the assets are processed automatically (renditions, Dynamic Media); wait until processing is
complete before the next steps.

## 3. Tags and metadata

1. Create the tags of `metadata/edam-tags.csv` (and their parents, e.g. `tcs-corp:industry`) in the Tagging
   console, if the Assets environment doesn't have the TCS Corp taxonomy yet.
2. Assets > **Metadata Import**: `metadata/edam-metadata.csv` (pilot: `metadata/batches/edam-metadata-B001-W2-N-A02.csv`),
   Field Separator `,`, Multi value Delimiter `|`, Asset Path Column Name `assetPath`, Launch Workflows off.
3. Check the pilot's assets: title, description and tags filled. If the tags column isn't read as a list, export
   the metadata of one asset (Metadata Export) and use its header for `cq:tags`.

## 4. Approve, then export the asset IDs

Approve the assets (only approved assets are delivered), then run `consolidated/tools/export-asset-ids.sh` /
`.ps1` against the Assets environment and send `asset-ids.csv` to the migration team: the content packages are
built from it (`../content-packages/`).
