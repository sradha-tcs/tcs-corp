# Content packages for the EDAM set-up

The 60 page packages of the migration rebuilt (version **1.3.0-edam**, from the page packages 1.3.0: the language master below `/content/tcs-corp/language-masters`) for a site whose assets are on a separate AEM
Assets environment (EDAM): every reference to an asset (`/content/dam/tcs-corp/…`) becomes the asset's
**delivery URL** on EDAM. Same batches, same installation order; installed on the **Sites author** (they hold
pages only, no assets).

| Reference | Becomes |
|---|---|
| Image fields (`image`, `poster`, …) | `https://<delivery host>/adobe/assets/<asset id>/as/<file name>` plus `<field>MimeType` (e.g. `imageMimeType="image/jpeg"`), so Edge Delivery serves the image through its media bus (E-D3) |
| Page images (`fileReference`) | `https://<delivery host>/adobe/assets/<asset id>/as/<file name>` |
| Videos, audio, documents (`uri`, `link`, links in text) | `https://<delivery host>/adobe/assets/<asset id>/original/as/<file name>` |

## Status

**Not built yet: waiting for the asset IDs.** The migration team's rebuild tool is ready and tested on all 60
batches with stand-in IDs: 33,116 references rewritten, none left as DAM paths, every page still valid XML.
Each package is built within minutes of receiving:

1. **`asset-ids.csv`** from the Assets environment (`consolidated/tools/export-asset-ids.sh` / `.ps1`), after
   the batch's EDAM zips are uploaded, the metadata imported and the assets approved (`../edam-zips/README.md`).
   For the pilot: B001's 4 zips in `../edam-zips/zips/` (57 assets), exported with `--batch B001` / `-Batch B001`.
2. **The delivery host** (decision E-D2): a custom delivery domain (recommended, no environment ids in the
   content) or the default `delivery-p…-e….adobeaemcloud.com`.

A batch is built only when every asset it references has an ID; the export's report lists anything missing
(and assets not approved yet, which aren't delivered).

## Then

This folder holds `tcs-corp-ema-<batch>-1.3.0-edam.zip`, `INSTALL-ORDER.md`, `REWRITE-<batch>.csv` (every
reference: page, property, DAM path, delivery URL) and `REWRITE-SUMMARY.md`. Install them on the Sites author
once the site code for EDAM assets is deployed (Universal Editor Custom Content Advisor, the models' asset
fields with their MIME type fields, delivery URL rendering):

```bash
PKG_DIR=packages-for-edam-sites/content-packages bash consolidated/tools/install-packages.sh --only pages
```

```powershell
powershell -ExecutionPolicy Bypass -File consolidated\tools\install-packages.ps1 -Only pages -PackageDir packages-for-edam-sites\content-packages
```
