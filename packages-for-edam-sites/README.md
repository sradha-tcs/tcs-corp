# Packages for the EDAM set-up

For a site whose assets live in a **separate AEM Assets environment (EDAM)**, where content packages can't be
installed. Nothing here replaces `../packages/` or `../consolidated/packages/`: those stay as they are for a
local or non-EDAM set-up (assets in the Sites author's own DAM).

| Folder | What | For | Status |
|---|---|---|---|
| `edam-zips/` | The 13,010 asset files (images, videos, audio, documents) as plain zips at their DAM paths, the metadata to import (titles, descriptions, tags, sources) and the tags they use | The Assets environment (EDAM): upload, no Package Manager | Ready: pilot batch B001's zips on the branch; all others built on your machine in minutes with `edam-zips/tools/` |
| `content-packages/` | The 60 page packages rebuilt (version 1.3.0) so the pages reference the assets on EDAM (delivery URLs) instead of the Sites author's DAM paths | The Sites author: Package Manager or `consolidated/tools/install-packages.*` | Built once the assets are on EDAM and their IDs are exported (an asset's ID exists only after it's uploaded) |

## Order

1. **EDAM: tags.** Create the 36 taxonomy tags of `edam-zips/metadata/edam-tags.csv` (with their parents) in
   the Assets environment's Tagging console, so the imported tags resolve.
2. **EDAM: assets.** Build the EDAM zips, extract them into one folder and upload its `tcs-corp` folder to
   `/content/dam` (see `edam-zips/README.md`). Pilot batch B001 first.
3. **EDAM: metadata.** Import `edam-zips/metadata/edam-metadata.csv` (Assets > Metadata Import).
4. **EDAM: approve** the assets (only approved assets are delivered).
5. **EDAM: export the asset IDs** with `consolidated/tools/export-asset-ids.sh` / `.ps1` and send
   `asset-ids.csv` to the migration team.
6. **Content packages 1.3.0** are built from `asset-ids.csv` into `content-packages/` (with their
   `INSTALL-ORDER.md`).
7. **Sites author: site code** for EDAM assets (Universal Editor Custom Content Advisor, the asset fields of the
   component models, delivery URL rendering): a pull request in the site repository, before step 8.
8. **Sites author: install** the content packages (`install-packages.sh --only pages` /
   `install-packages.ps1 -Only pages` with `PKG_DIR` / `-PackageDir` = `content-packages/`), replace and
   publish the sheets, publish and index the pages.

The plan, decisions (E-D1 to E-D5) and risks: `docs/proposals/remote-assets-edam.md` in the site repository.
