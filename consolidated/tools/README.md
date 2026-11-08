# Installing the packages automatically

`install-packages.sh` uploads and installs all 398 packages on AEM author in the order of
`../packages/INSTALL-ORDER.md` (per batch its asset packages, then its page package), through the
Package Manager HTTP service. It replaces the 398 manual uploads.

## Before you start

1. Get the packages: check out the `migrated-page-content` branch (or download its `consolidated/` folder).
   About 22 GB.
2. Get an access token for author: Developer Console of the environment > Integrations > **Local token**
   (valid 24 hours; the user needs permission to install packages), or a token from service credentials.
   Keep it in your shell only: never in a file, a chat or the repository.
3. Use bash (macOS, Linux, or Git Bash / WSL on Windows) with `curl`.

## Run

```bash
cd consolidated
export AEM_AUTHOR=https://author-p<program>-e<environment>.adobeaemcloud.com
export AEM_TOKEN=<access token>
bash tools/install-packages.sh --dry-run   # the sequence, nothing installed
bash tools/install-packages.sh --to 3      # a first test: batch B001 (packages 1-3)
bash tools/install-packages.sh             # everything else
```

- **Resumable:** every installed package is recorded in `packages/install-progress.log`; a rerun (after a
  failure, a network drop or an expired token: export a new one) continues with the next package.
- `--batch B026` installs one batch; `--from N` / `--to N` a range of the sequence.
- A package that fails three times stops the run with the server's message; nothing after it is installed.

## After the installation

Publish the DAM videos, audio and documents (non-image assets are served only once published), replace the
sheets with `../sheets/` and publish them, then publish and index the pages.
