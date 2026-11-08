# Content packages for the EDAM set-up

The 60 page packages of the migration rebuilt (version 1.3.0) for a site whose assets are on a separate AEM
Assets environment (EDAM): every reference to an asset of the Sites author's DAM (`/content/dam/tcs-corp/…`
in images, videos, posters, links to documents and audio, page images) becomes the asset's **delivery URL** on
EDAM, and the sheets' image columns too. Same batches, same installation order; installed on the **Sites
author** (they hold pages only).

**Not built yet**, because a delivery URL contains the asset's ID, which EDAM assigns when the asset is
uploaded. They're built as soon as the migration team has:

1. `asset-ids.csv` from the Assets environment (`consolidated/tools/export-asset-ids.sh` / `.ps1`, after the
   upload, the metadata import and the approval: see `../edam-zips/README.md`);
2. the delivery host: the default `delivery-p<program>-e<environment>.adobeaemcloud.com` or the custom delivery
   domain (decision E-D2);
3. how images are delivered: through the Edge Delivery media bus (recommended) or Dynamic Media (E-D3).

Then this folder holds `tcs-corp-ema-<batch>-1.3.0.zip` (60), their `INSTALL-ORDER.md`, the sheets with
delivery URLs and a report of every reference rewritten (and any asset without an ID). Install them on the
Sites author once the site code for EDAM assets is deployed (Universal Editor Custom Content Advisor, the
models' asset fields, delivery URL rendering):

```bash
PKG_DIR=packages-for-edam-sites/content-packages bash consolidated/tools/install-packages.sh --only pages
```

```powershell
powershell -ExecutionPolicy Bypass -File consolidated\tools\install-packages.ps1 -Only pages -PackageDir packages-for-edam-sites\content-packages
```
