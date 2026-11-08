#!/bin/bash
# Exports the asset IDs of the migrated assets from the AEM Assets environment (EDAM), after the asset
# packages are installed there: for every asset below /content/dam/tcs-corp its DAM path, asset ID
# (urn:aaid:aem:<jcr:uuid>), MIME type and approval status, compared with expected-assets.csv (every asset
# the packages install). The page packages are rebuilt from asset-ids.csv (version 1.3.0).
#
# Nothing is hard-coded: pass the Assets environment's author and an access token in the environment.
#   AEM_AUTHOR      the Assets environment's author URL, e.g. https://author-p<program>-e<environment>.adobeaemcloud.com
#   AEM_TOKEN       an access token of a user who may read /content/dam/tcs-corp (Developer Console of the
#                   Assets environment > Integrations > Local token). Never commit it.
#   DELIVERY_HOST   optional, for --check: the delivery host (delivery-p<program>-e<environment>.adobeaemcloud.com
#                   or the custom delivery domain)
#
# Usage: bash export-asset-ids.sh [--batch B0xx] [--out <folder>] [--check N]
#   --batch B0xx: compare only the assets that batch installs or its pages use (e.g. the pilot B001)
#   writes <folder>/asset-ids.csv and <folder>/asset-ids-report.txt (default: the folder of this script)
#   --check N: requests N approved images from the delivery tier (spot check of delivery)
# Needs curl and perl (both part of macOS).
set -uo pipefail
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$HERE CHECK=0 BATCH=""
while [ $# -gt 0 ]; do
  case $1 in
    --out) OUT=$2; shift ;;
    --check) CHECK=$2; shift ;;
    --batch) BATCH=$2; shift ;;
    *) echo "unknown option $1"; exit 2 ;;
  esac
  shift
done
[ -n "${AEM_AUTHOR:-}" ] && [ -n "${AEM_TOKEN:-}" ] || { echo "set AEM_AUTHOR and AEM_TOKEN"; exit 2; }
[ -f "$HERE/expected-assets.csv" ] || { echo "no $HERE/expected-assets.csv"; exit 2; }
A=${AEM_AUTHOR%/}
ROOT=/content/dam/tcs-corp
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
code=$(curl -s -o /dev/null -w '%{http_code}' -H "Authorization: Bearer $AEM_TOKEN" "$A/bin/querybuilder.json?path=$ROOT&p.limit=1")
[ "$code" = 200 ] || { echo "the author answers $code: check AEM_AUTHOR, the token and the user's read access to $ROOT"; exit 1; }

# one query per folder and kind, 500 hits a page, in path order:
#   assets:   type=dam:Asset, jcr:path and jcr:uuid
#   metadata: the assets' jcr:content/metadata nodes, dam:status and dc:format
page() { # kind folder offset -> file
  local q
  if [ "$1" = assets ]; then q="type=dam:Asset&p.properties=jcr:path%20jcr:uuid"
  else q="type=nt:unstructured&nodename=metadata&p.properties=jcr:path%20dam:status%20dc:format"; fi
  curl -sS -f --max-time 300 -H "Authorization: Bearer $AEM_TOKEN" \
    "$A/bin/querybuilder.json?path=$ROOT/$2&$q&orderby=path&p.hits=selective&p.limit=500&p.offset=$3" -o "$4"
}
for kind in assets metadata; do
  for t in images videos audio documents; do
    off=0
    while :; do
      f="$TMP/$kind-$t-$off.json"
      ok=0
      for try in 1 2 3; do page "$kind" "$t" "$off" "$f" && ok=1 && break; sleep 10; done
      [ $ok -eq 1 ] || { echo "query failed: $kind $t offset $off"; exit 1; }
      n=$(perl -MJSON::PP -0777 -ne 'print scalar @{decode_json($_)->{hits}}' "$f")
      printf '\r%-9s %-10s %6d' "$kind" "$t" $((off + n))
      [ "$n" -lt 500 ] && break
      off=$((off + 500))
    done
    echo
  done
done

# merge: asset-ids.csv (expected assets first, then the other assets found) and the report
perl -MJSON::PP -e '
  my ($tmp, $out, $exp, $sel) = @ARGV;
  my (%id, %st, %mt);
  for my $f (glob("$tmp/assets-*.json")) { local $/; open my $h, "<", $f; my $d = decode_json(<$h>);
    $id{$_->{"jcr:path"}} = $_->{"jcr:uuid"} for @{$d->{hits}} }
  for my $f (glob("$tmp/metadata-*.json")) { local $/; open my $h, "<", $f; my $d = decode_json(<$h>);
    for (@{$d->{hits}}) { (my $p = $_->{"jcr:path"}) =~ s{/jcr:content/metadata$}{} or next;
      $st{$p} = $_->{"dam:status"} // ""; $mt{$p} = $_->{"dc:format"} // "" } }
  open my $e, "<", $exp or die; <$e>;
  my (@rows, %want, %c, @missing, @noid); my $n = 0;
  while (<$e>) { chomp; my ($p, $b) = split /,/; $want{$p} = 1;
    my $need = (split /,/, $_)[3] // "";
    next if $sel ne "" && index($b, $sel) != 0 && " $need" !~ / \Q$sel\E/; $n++;
    if (!exists $id{$p}) { push @missing, "$p,$b"; $c{missing}++; next }
    if (!$id{$p}) { push @noid, $p; $c{noid}++ }
    my $s = $st{$p} // ""; $c{$s eq "approved" ? "approved" : "not approved"}++;
    push @rows, join(",", $p, ($id{$p} ? "urn:aaid:aem:$id{$p}" : ""), $mt{$p} // "", $s, $b) }
  my @extra = grep { !$want{$_} } sort keys %id;
  push @rows, join(",", $_, ($id{$_} ? "urn:aaid:aem:$id{$_}" : ""), $mt{$_} // "", $st{$_} // "", "") for @extra;
  open my $o, ">", "$out/asset-ids.csv" or die; print $o "path,asset_id,mime,status,batch\n", map { "$_\n" } @rows; close $o;
  open my $r, ">", "$out/asset-ids-report.txt" or die;
  printf $r "Asset ID export, %s UTC\n\n", scalar gmtime;
  printf $r "Expected%s: %d\nFound with an asset ID: %d\nMissing (not installed): %d\nWithout an asset ID: %d\nApproved: %d\nNot approved yet: %d\nOther assets below the folder (not from the migration): %d\n",
    ($sel ne "" ? " (batch $sel)" : " (the EDAM set-up)"), $n, $n - ($c{missing} // 0) - ($c{noid} // 0), $c{missing} // 0, $c{noid} // 0, $c{approved} // 0, $c{"not approved"} // 0, scalar @extra;
  print $r "\nMissing (path,batch):\n", map { "$_\n" } @missing if @missing;
  print $r "\nWithout an asset ID:\n", map { "$_\n" } @noid if @noid;
  close $r;
' "$TMP" "$OUT" "$HERE/expected-assets.csv" "$BATCH" || { echo "merge failed"; exit 1; }
sed -n '3,9p' "$OUT/asset-ids-report.txt"
echo "written: $OUT/asset-ids.csv, $OUT/asset-ids-report.txt"

# spot check: approved images on the delivery tier
if [ "$CHECK" -gt 0 ]; then
  [ -n "${DELIVERY_HOST:-}" ] || { echo "--check needs DELIVERY_HOST"; exit 2; }
  case $DELIVERY_HOST in http://* | https://*) base=${DELIVERY_HOST%/} ;; *) base=https://${DELIVERY_HOST%/} ;; esac
  awk -F, -v n="$CHECK" '$3 ~ /^image\// && $4 == "approved" && c < n { print; c++ }' "$OUT/asset-ids.csv" | while IFS=, read -r p id _; do
    u="$base/adobe/assets/$id/as/${p##*/}"
    echo "$(curl -s -o /dev/null -w '%{http_code}' "$u") $u"
  done
fi
exit 0
