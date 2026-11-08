#!/bin/bash
# Uploads and installs the migration packages on AEM author, one after the other, in the order of
# packages/INSTALL-ORDER.md (per batch its asset packages, then its page package), through the
# Package Manager HTTP service (/crx/packmgr/service.jsp). Resumable: every package installed is
# recorded in install-progress.log next to the packages, and a rerun continues after the last one.
#
# Nothing is hard-coded: pass the author and an access token in the environment.
#   AEM_AUTHOR   the author URL, e.g. https://author-p<program>-e<environment>.adobeaemcloud.com
#   AEM_TOKEN    an access token of a user allowed to install packages (Developer Console > Integrations >
#                Local token, valid 24 hours; or a token from service credentials). Never commit it.
#
# Usage: bash install-packages.sh [--from N] [--to N] [--batch B0xx] [--only assets|pages] [--dry-run]
#   --only assets: the asset packages only (e.g. for a separate AEM Assets environment); --only pages: the page packages only
#   run from consolidated/ (the folder with packages/), or set PKG_DIR to the packages folder.
set -uo pipefail
PKG_DIR=${PKG_DIR:-"$(cd "$(dirname "$0")/.." && pwd)/packages"}
ORDER="$PKG_DIR/INSTALL-ORDER.md"
LOG="$PKG_DIR/install-progress.log"
FROM=1 TO=999999 BATCH="" ONLY="" DRY=0
while [ $# -gt 0 ]; do
  case $1 in
    --from) FROM=$2; shift ;;
    --to) TO=$2; shift ;;
    --batch) BATCH=$2; shift ;;
    --only) ONLY=$2; shift ;;
    --dry-run) DRY=1 ;;
    *) echo "unknown option $1"; exit 2 ;;
  esac
  shift
done
[ -f "$ORDER" ] || { echo "no $ORDER"; exit 2; }
if [ $DRY -eq 0 ]; then
  [ -n "${AEM_AUTHOR:-}" ] && [ -n "${AEM_TOKEN:-}" ] || { echo "set AEM_AUTHOR and AEM_TOKEN"; exit 2; }
  # the token works and may use Package Manager
  code=$(curl -s -o /dev/null -w '%{http_code}' -H "Authorization: Bearer $AEM_TOKEN" "${AEM_AUTHOR%/}/crx/packmgr/service.jsp?cmd=ls")
  [ "$code" = 200 ] || { echo "Package Manager answers $code: check AEM_AUTHOR, the token and the user's permissions"; exit 1; }
fi
# one progress log per AEM environment (e.g. the Sites author and a separate Assets environment), named
# after a fingerprint of AEM_AUTHOR (the log never contains the program or environment id)
if [ -n "${AEM_AUTHOR:-}" ]; then
  fp=$(printf '%s' "${AEM_AUTHOR%/}" | { shasum 2> /dev/null || sha1sum; } | cut -c1-8)
  LOG="$PKG_DIR/install-progress-$fp.log"
  echo "progress log: $(basename "$LOG")"
fi
touch "$LOG"
# rows of the order table: | # | Batch | Package | MB |
grep -E '^\| [0-9]+ \|' "$ORDER" | while IFS='|' read -r _ n b name mb _; do
  n=${n// /}; b=${b// /}; name=${name// /}; mb=${mb// /}
  [ "$n" -ge "$FROM" ] && [ "$n" -le "$TO" ] || continue
  [ -z "$BATCH" ] || [[ $b == "$BATCH"* ]] || continue
  [ "$ONLY" != assets ] || [[ $name == *-assets-* ]] || continue
  [ "$ONLY" != pages ] || [[ $name != *-assets-* ]] || continue
  grep -qx "$name" "$LOG" && continue
  f="$PKG_DIR/$name"
  [ -f "$f" ] || { echo "#$n missing file $name"; exit 1; }
  if [ $DRY -eq 1 ]; then echo "#$n $b $name ($mb MB)"; continue; fi
  ok=0
  for try in 1 2 3; do
    echo "$(date -u +%FT%TZ) #$n $b $name ($mb MB), try $try"
    out=$(curl -sS --max-time 3600 -H "Authorization: Bearer $AEM_TOKEN" \
      -F file=@"$f" -F name="${name%.zip}" -F force=true -F install=true \
      "${AEM_AUTHOR%/}/crx/packmgr/service.jsp" 2>&1)
    if grep -q 'code="200"' <<< "$out"; then ok=1; break; fi
    echo "$out" | tail -5
    sleep 20
  done
  [ $ok -eq 1 ] || { echo "#$n $name not installed: stopped (rerun to continue from here)"; exit 1; }
  echo "$name" >> "$LOG"
done
