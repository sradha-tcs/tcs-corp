# Installing the packages automatically

Two scripts that do the same thing, one per platform: they upload and install all 398 packages on AEM
author in the order of `../packages/INSTALL-ORDER.md` (per batch its asset packages, then its page
package), through the Package Manager HTTP service. They replace the 398 manual uploads.

| Platform | Script |
|---|---|
| macOS (and Linux) | `install-packages.sh` (bash) |
| Windows 10 / 11 | `install-packages.ps1` (Windows PowerShell 5.1 or PowerShell 7) |

Both keep the same progress log per AEM environment (`packages/install-progress-<fingerprint>.log`, the
fingerprint is derived from `AEM_AUTHOR`, so the Sites author and a separate Assets environment each have
their own): a run continues with the package after the last one installed in that environment, whichever
script installed it.

**Separate AEM Assets environment (EDAM):** install the asset packages there with `--only assets`
(`-Only assets` on Windows) and the page packages on the Sites author with `--only pages` (`-Only pages`).
For that set-up the page packages are rebuilt with the assets' delivery URLs first (version 1.3.0): see
`docs/proposals/remote-assets-edam.md` in the site repository for the order of the steps.

## Before you start (everyone)

1. Get the packages: check out the `migrated-page-content` branch (or download its `consolidated/` folder,
   about 22 GB).
2. Get an access token for author: the environment's Developer Console > Integrations > **Local token**
   (valid 24 hours; your user needs permission to install packages), or a token from service credentials.
   Keep it in your terminal only: never in a file, a chat or the repository.
3. Agree who installs: one person per environment at a time (two runs at once would install packages twice).

## macOS

Open Terminal:

```bash
cd <path>/consolidated
export AEM_AUTHOR=https://author-p<program>-e<environment>.adobeaemcloud.com
export AEM_TOKEN='<access token>'
bash tools/install-packages.sh --dry-run    # the sequence, nothing installed
bash tools/install-packages.sh --to 3       # a first test: batch B001 (packages 1-3)
bash tools/install-packages.sh              # everything else
```

Options: `--batch B026` (one batch), `--from N` / `--to N` (a range of the sequence), `--only assets` / `--only pages`, `--dry-run`.
To keep the Mac awake during the long run: `caffeinate -i bash tools/install-packages.sh`.

## Windows

Open PowerShell (Start > "PowerShell"):

```powershell
cd <path>\consolidated
$env:AEM_AUTHOR = "https://author-p<program>-e<environment>.adobeaemcloud.com"
powershell -ExecutionPolicy Bypass -File tools\install-packages.ps1 -DryRun   # the sequence, nothing installed
powershell -ExecutionPolicy Bypass -File tools\install-packages.ps1 -To 3     # a first test: batch B001
powershell -ExecutionPolicy Bypass -File tools\install-packages.ps1           # everything else
```

- The script asks for the access token (input hidden) unless `$env:AEM_TOKEN` is set.
- Options: `-Batch B026`, `-From N` / `-To N`, `-Only assets` / `-Only pages`, `-DryRun`, `-PackageDir <folder>` (when the packages are
  elsewhere).
- `-ExecutionPolicy Bypass` applies to this run only (Windows blocks downloaded scripts by default).
- It uploads with `curl.exe`, part of Windows 10 (1803 and later) and Windows 11.
- Keep the PC from sleeping during the run (Settings > System > Power).

## When something goes wrong

- **"Package Manager answers 401 / 403"**: the token expired or the user may not install packages. Get a new
  token and run again: it continues where it stopped.
- **A package fails three times**: the run stops with AEM's message; nothing after it is installed. Fix the
  cause (or ask the developers), then run again.
- A network drop or a closed laptop: run again.

## After the installation

Publish the DAM videos, audio and documents (non-image assets are served only once published), replace the
sheets with `../sheets/` and publish them, then publish and index the pages.
