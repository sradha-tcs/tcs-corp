# Two scripts: EDAM assets, then AEM Sites

> **Not used for now (decided 8 November 2026):** the assets stay in the Sites author's own DAM and the pages
> reference them by DAM path; install `consolidated/packages/` with `consolidated/tools/install-packages.*`
> (`README.md`, "How to install"). These scripts are only for a separate AEM Assets environment.

Everything the EDAM set-up needs from this branch runs with two scripts, each in a macOS and a Windows version,
from the branch's root folder (the downloaded branch):

| # | Script | Where it works | What it does |
|---|---|---|---|
| 1 | `edam-assets.sh` (Mac) / `edam-assets.ps1` (Windows) | The **AEM Assets** environment (EDAM) | Extracts the asset files from the asset packages (`consolidated/packages/`, `packages-earlier-run-assets/`), creates the tags, uploads the files (folders as needed), writes the metadata (title, description, tags, source), approves the assets and exports their IDs to `edam-state/asset-ids.csv` |
| 2 | `aem-sites.sh` (Mac) / `aem-sites.ps1` (Windows) | The **AEM Sites** author | Builds the content packages 1.3.0-edam from the page packages 1.3.0 and `edam-state/asset-ids.csv` (every asset reference becomes its delivery URL) into `packages-for-edam-sites/content-packages/`, then installs them with Package Manager in the installation order |

Both are **resumable**: what is done is recorded (`edam-state/`, the install progress log) and skipped when the
same command runs again, so after an interruption or an error, run it again.

## Before you start

- **Decisions:** E-D2 (the delivery host) is needed by step 2; E-D3 chooses `media-bus` (default) or `dynamic-media` for images.
- **Site code for EDAM assets deployed** on the site (branch `edam-main` of the site repository) before step 2.
- **Language master moved** on the Sites author from `/content/tcs-corp/language-master` to `/content/tcs-corp/language-masters` (Sites console > Move) and the site's path mapping changed.
- **Access tokens** (Developer Console > Integrations > Local token, valid 24 hours) of a user allowed to upload
  assets on EDAM, and of a user allowed to install packages on the Sites author. Leave them out of the
  environment and the scripts ask for them with hidden input. Never put a token in a file, a chat or the repository.
- **Tools:** macOS has everything (bash, curl, unzip, zip, perl). Windows: Windows PowerShell 5.1 or PowerShell 7 and `curl.exe` (Windows 10 1803 and later, Windows 11).
- **Disk:** step 1 extracts the asset files into `edam-upload/`: up to 22 GB more for all batches (about 100 MB for B001).

## Pilot: batch B001

macOS (Terminal, in the branch's folder):

```bash
export EDAM_AUTHOR=https://author-p<program>-e<environment>.adobeaemcloud.com    # the Assets environment
export DELIVERY_HOST=<delivery host>                                             # E-D2
bash edam-assets.sh --batch B001

export SITES_AUTHOR=https://author-p<program>-e<environment>.adobeaemcloud.com   # the Sites author (non-production for the pilot)
bash aem-sites.sh --batch B001
```

Windows (PowerShell, in the branch's folder):

```powershell
$env:EDAM_AUTHOR = "https://author-p<program>-e<environment>.adobeaemcloud.com"   # the Assets environment
$env:DELIVERY_HOST = "<delivery host>"                                            # E-D2
powershell -ExecutionPolicy Bypass -File edam-assets.ps1 -Batch B001

$env:SITES_AUTHOR = "https://author-p<program>-e<environment>.adobeaemcloud.com"  # the Sites author (non-production for the pilot)
powershell -ExecutionPolicy Bypass -File aem-sites.ps1 -Batch B001
```

Expected: `edam-assets` uploads B001's 57 assets and its export reports **Expected 57, Found 57, Missing 0, Not
approved yet 0** (with the spot checks of delivered images answering 200); `aem-sites` reports **53 references,
53 rewritten, 0 unresolved** and installs `tcs-corp-ema-B001-W2-N-A02-1.3.0-edam.zip`. Then open the 4 pages in
Universal Editor, preview and publish them, and check that every image, the videos and the audio load from the
delivery host (`packages-for-edam-sites/EDAM-RUNBOOK.md`, phase 3).

## Full run

The same commands without the batch option. Run `edam-assets` for **all** assets before `aem-sites`: the pages of
52 batches also use assets of other batches.

```bash
bash edam-assets.sh
bash aem-sites.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File edam-assets.ps1
powershell -ExecutionPolicy Bypass -File aem-sites.ps1
```

Then, by hand: replace the sheets with `consolidated/sheets/` and publish them, publish the pages (tree activation of
`/content/tcs-corp/language-masters/en`) and re-index (runbook, phase 5). The scripts never publish anything.

## Options

| `edam-assets.sh` | `edam-assets.ps1` | |
|---|---|---|
| `--batch B001` | `-Batch B001` | Only the assets that batch installs or its pages use |
| `--no-approve` | `-NoApprove` | Don't approve the assets (approve them in the Assets view later; only approved assets are delivered) |
| `--wait 120` | `-Wait 120` | Minutes to wait for asset processing before the metadata step stops (run again to continue) |
| `--steps 3,4` | `-Steps 3,4` | Only some steps: 1 extract, 2 tags, 3 upload, 4 metadata and approval, 5 asset ID export |

| `aem-sites.sh` | `aem-sites.ps1` | |
|---|---|---|
| `--batch B001` | `-Batch B001` | Only that batch |
| `--images dynamic-media` | `-Images dynamic-media` | E-D3: images delivered by Dynamic Media (no `<field>MimeType`); default `media-bus` |
| `--ids FILE` | `-Ids FILE` | Another asset ID file (default `edam-state/asset-ids.csv`) |
| `--allow-unresolved` | `-AllowUnresolved` | Build and install a package even when some of its assets have no ID (those references stay DAM paths) |
| `--reinstall` | `-Reinstall` | Install again packages installed before (e.g. after a change of the delivery host) |
| `--steps 1` | `-Steps 1` | 1 build only, 2 install only |

## Results and exit codes

| Exit code | Meaning | What to do |
|---|---|---|
| 0 | Done | The next step |
| 1 | Stopped on an error (message shown) | Fix the cause (author URL, token, permissions, network) and run the same command again |
| 2 | Something to set first (author, token, delivery host, asset IDs) | As the message says |
| 3 | `edam-assets`: assets still processing | Run the same command again later |
| 4 | `aem-sites`: packages not built or installed because some of their assets have no ID yet (listed) | Run `edam-assets` for them, then `aem-sites` again |

Files written: `edam-upload/` (the extracted asset files, can be deleted after the run), `edam-state/` (progress
logs, `asset-ids.csv` and the export report), `packages-for-edam-sites/content-packages/` (the 1.3.0-edam packages,
`INSTALL-ORDER.md`, `REWRITE-<batch>.csv` with every rewritten reference, `REWRITE-SUMMARY.md`,
`install-progress-<fingerprint>.log`). No token is written to any of them (curl reads it from a temporary file
readable only by you, removed at the end).

## Tested

Both versions of both scripts were tested against stand-ins of the AEM services (direct binary upload, Sling POST,
tag command, query builder, Package Manager): batch B001's 57 assets uploaded byte-identical (multi-part uploads
included) with their metadata, tags and approval; the asset IDs exported; the content packages of all 60 batches
identical, entry by entry, to those of the migration team's rebuild tool; reruns skip what is done; the token never
reaches the upload URLs or any file. **The B001 pilot is the first run against real AEM environments**: check there
the upload, metadata and approval in the Assets view, the tags, and the delivered images, videos and audio.
