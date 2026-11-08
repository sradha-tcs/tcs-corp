#!/bin/bash
# Builds the EDAM zips on your machine from the 1.2.0 asset packages (no download of the 22 GB again): one
# EDAM zip per asset package, holding only the asset files at their DAM paths below /content/dam
# (tcs-corp/<images|videos|audio|documents>/<L1>/<L2>/<file>), named tcs-corp-edam-<batch>-<NN>.zip as listed
# in ../EDAM-ZIPS.md. Resumable: a zip already built is skipped (--force rebuilds it).
#
# Usage: bash build-edam-zips.sh [--batch B0xx] [--packages <folder>] [--out <folder>] [--force]
#   --packages  the folder with the asset packages (searched with its subfolders); default: the branch's
#               consolidated/packages/, else packages/
#   --out       where the EDAM zips go; default: ../zips/
# Needs unzip and zip (both part of macOS).
set -uo pipefail
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
PKG="" OUT="$HERE/../zips" BATCH="" FORCE=0
while [ $# -gt 0 ]; do
  case $1 in
    --batch) BATCH=$2; shift ;;
    --packages) PKG=$2; shift ;;
    --out) OUT=$2; shift ;;
    --force) FORCE=1 ;;
    *) echo "unknown option $1"; exit 2 ;;
  esac
  shift
done
if [ -z "$PKG" ]; then
  if [ -d "$ROOT/consolidated/packages" ]; then PKG="$ROOT/consolidated/packages"; else PKG="$ROOT/packages"; fi
fi
mkdir -p "$OUT"
OUT=$(cd "$OUT" && pwd)
list=$(find "$PKG" -name "tcs-corp-ema-${BATCH}*-assets-*-1.2.0.zip" | sort)
[ -n "$list" ] || { echo "no asset packages in $PKG"; exit 1; }
n=0 built=0
# one package a line (folder names may contain spaces)
while IFS= read -r f; do
  name=$(basename "$f")
  rest=${name#tcs-corp-ema-}
  batch=${rest%-assets-*}
  nn=${rest##*-assets-}; nn=${nn%-1.2.0.zip}
  dest="$OUT/tcs-corp-edam-$batch-$nn.zip"
  n=$((n + 1))
  if [ -f "$dest" ] && [ $FORCE -eq 0 ]; then continue; fi
  echo "$(date -u +%FT%TZ) $name -> $(basename "$dest")"
  tmp=$(mktemp -d)
  # the asset files: <asset>/_jcr_content/renditions/original, stored at the asset's path
  unzip -q "$f" 'jcr_root/content/dam/*/_jcr_content/renditions/original' -d "$tmp/x" || { echo "cannot read $name"; rm -rf "$tmp"; exit 1; }
  (cd "$tmp/x/jcr_root/content/dam" && find . -path '*/_jcr_content/renditions/original' -type f) | while read -r o; do
    p=${o#./}; p=${p%/_jcr_content/renditions/original}
    mkdir -p "$tmp/out/$(dirname "$p")"
    mv "$tmp/x/jcr_root/content/dam/$o" "$tmp/out/$p"
  done
  rm -f "$dest.part"
  # a fixed date (the packages' entries have none), so zip doesn't warn and the zips are the same each time
  find "$tmp/out" -type f -exec touch -t 198001010000 {} +
  (cd "$tmp/out" && zip -q -0 -r -X "$dest.part" tcs-corp) || { echo "zip failed for $name"; rm -rf "$tmp"; exit 1; }
  mv "$dest.part" "$dest"
  rm -rf "$tmp"
  built=$((built + 1))
done <<< "$list"
echo "EDAM zips: $n for the selection, $built built now, in $OUT"
