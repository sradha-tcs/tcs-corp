# Assets of earlier migration runs (for fresh environments)

The migration's page packages reference **1,342 assets that no EMA asset package holds**: images and
documents of the earlier migration runs (the October press-release waves and the pilot), which the EMA build
reused by content (same file, same DAM path). On the current Sites author they exist (installed with the
October packages); on a **fresh environment** (local AEM, a new author) they don't, and 50 batches would show
missing images and links.

| File | What |
|---|---|
| `tcs-corp-ema-earlier-assets-01-1.2.0.zip` … `-13-1.2.0.zip` | The 1,342 assets (1,029 MB, at most 86 MB a package) at their DAM paths, with title, description, tags and source; files checked against their recorded content hash |
| `INSTALL-ORDER.md` | The 13 packages in order (format of `consolidated/tools/install-packages.*`) |
| `ASSETS.csv` | Every asset: DAM path, package, MIME type, earlier run, the batches whose pages use it, source URL |

**Safe on any author:** each asset has a **merge** filter: it's created where it's missing; an asset that
already exists (with its renditions and metadata) stays unchanged. Installing them on the current author
changes nothing.

## Install

Before the page packages of `../consolidated/packages/` (or at least before the pages are published):

```bash
PKG_DIR=packages-earlier-run-assets bash consolidated/tools/install-packages.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File consolidated\tools\install-packages.ps1 -PackageDir packages-earlier-run-assets
```

Then the sequence of `consolidated/packages/INSTALL-ORDER.md`, and publish the DAM documents (non-image assets
are served only once published).

For the EDAM set-up these assets are in the `-earlier` EDAM zips instead (`../packages-for-edam-sites/`).
