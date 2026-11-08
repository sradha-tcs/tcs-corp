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

**Built on your machine by `aem-sites.sh` / `aem-sites.ps1`** (branch root, `../../RUN-SCRIPTS.md`), after
`edam-assets.sh` / `.ps1` has put the assets on the Assets environment and exported their IDs
(`../../edam-state/asset-ids.csv`). The script needs the delivery host (decision E-D2: a custom delivery domain,
recommended, or the default `delivery-p…-e….adobeaemcloud.com`), builds the packages here and installs them on the
Sites author. Tested with stand-in IDs on all 60 batches: 33,116 references rewritten, none left as DAM paths,
every page still valid XML, the same packages as the migration team's rebuild tool.

A batch is built only when every asset it references has an ID: the script lists the others (exit code 4); run
`edam-assets` for their assets, then `aem-sites` again.

## Then

This folder holds `tcs-corp-ema-<batch>-1.3.0-edam.zip`, `INSTALL-ORDER.md`, `REWRITE-<batch>.csv` (every
reference: page, property, DAM path, delivery URL), `REWRITE-SUMMARY.md` and the installation progress log. Install
them once the site code for EDAM assets is deployed (Universal Editor Custom Content Advisor, the models' asset
fields with their MIME type fields, delivery URL rendering): `aem-sites` does it; to install the packages of this
folder only (no rebuild):

```bash
bash aem-sites.sh --steps 2
```

```powershell
powershell -ExecutionPolicy Bypass -File aem-sites.ps1 -Steps 2
```
