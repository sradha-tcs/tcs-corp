#!/bin/bash
# AEM Sites, one command (macOS / Linux): builds the EDAM content packages and installs them on the Sites author.
#   1. build    the page packages 1.3.0 (consolidated/packages, below /content/tcs-corp/language-masters) rebuilt as
#               1.3.0-edam in packages-for-edam-sites/content-packages: every reference to an asset (/content/dam/...)
#               becomes its delivery URL on the Assets environment, from edam-state/asset-ids.csv (edam-assets.sh)
#                 images                    https://<host>/adobe/assets/<asset id>/as/<file name>
#                                           (with --images media-bus also <field>MimeType: the media bus)
#                 videos, audio, documents  https://<host>/adobe/assets/<asset id>/original/as/<file name>
#               with INSTALL-ORDER.md, REWRITE-<batch>.csv (every reference) and REWRITE-SUMMARY.md; the sheets of
#               consolidated/sheets with their asset cells rewritten the same way in content-packages/sheets/
#   2. install  the built packages on the Sites author with Package Manager, in the installation order
# A package with a reference whose asset has no ID isn't built or installed (listed at the end, exit 4): upload
# the missing assets with edam-assets.sh and run again. Resumable: installed packages are recorded in
# content-packages/install-progress-<fingerprint of the author>.log (the same log as install-packages.sh).
#
# Environment (nothing is hard-coded):
#   SITES_AUTHOR   the Sites author URL, https://author-p<program>-e<environment>.adobeaemcloud.com
#   SITES_TOKEN    an access token for it (Developer Console > Integrations > Local token); asked for when not set
#   DELIVERY_HOST  the delivery host (decision E-D2): the custom delivery domain or delivery-p...-e....adobeaemcloud.com
# Options:
#   --batch B001             only that batch (pilot)
#   --ids FILE               the asset IDs (default edam-state/asset-ids.csv)
#   --images MODE            dynamic-media (default: images too are delivered by Dynamic Media) or media-bus
#                            (images get <field>MimeType and are copied to the Edge Delivery media bus)
#   --allow-unresolved       build and install packages anyway, leaving references without an asset ID as DAM paths
#   --reinstall              install again packages the progress log lists (e.g. after a new delivery host)
#   --steps LIST             1 (build only) or 2 (install only); default 1,2
# Needs curl, unzip, zip and perl (all part of macOS). Run from the branch's root folder (where this script is).
set -uo pipefail
ROOT=$(cd "$(dirname "$0")" && pwd)
BATCH="" IDS="$ROOT/edam-state/asset-ids.csv" IMAGES=dynamic-media ALLOW=0 REINSTALL=0 STEPS="1,2"
while [ $# -gt 0 ]; do
  case $1 in
    --batch) BATCH=$2; shift ;;
    --ids) IDS=$2; shift ;;
    --images) IMAGES=$2; shift ;;
    --allow-unresolved) ALLOW=1 ;;
    --reinstall) REINSTALL=1 ;;
    --steps) STEPS=$2; shift ;;
    -h|--help) sed -n '2,29p' "$0"; exit 0 ;;
    *) echo "unknown option $1 (see --help)"; exit 2 ;;
  esac
  shift
done
for t in curl unzip zip perl; do command -v $t > /dev/null || { echo "needs $t"; exit 2; }; done
[ "$IMAGES" = media-bus ] || [ "$IMAGES" = dynamic-media ] || { echo "--images media-bus or dynamic-media"; exit 2; }
OUT="$ROOT/packages-for-edam-sites/content-packages"; mkdir -p "$OUT"
if [[ ",$STEPS," == *,1,* ]]; then
  [ -n "${DELIVERY_HOST:-}" ] || { echo "set DELIVERY_HOST (the delivery host or custom delivery domain, decision E-D2)"; exit 2; }
  [ -f "$IDS" ] || { echo "no $IDS: run edam-assets.sh first (or pass --ids)"; exit 2; }
fi
if [[ ",$STEPS," == *,2,* ]]; then
  [ -n "${SITES_AUTHOR:-}" ] || { echo "set SITES_AUTHOR (the Sites author URL)"; exit 2; }
  if [ -z "${SITES_TOKEN:-}" ]; then read -r -s -p "Access token for $SITES_AUTHOR (hidden): " SITES_TOKEN; echo; fi
  [ -n "$SITES_TOKEN" ] || { echo "no token"; exit 2; }
fi
STATE="$ROOT/edam-state"; mkdir -p "$STATE"
# the token goes to curl in a config file readable only by you (not on the command line)
umask 077
printf 'header = "Authorization: Bearer %s"\n' "${SITES_TOKEN:-}" > "$STATE/.auth-sites"
umask 022
trap 'rm -f "$STATE/.auth-sites"' EXIT
export ROOT STATE OUT BATCH IDS IMAGES ALLOW REINSTALL STEPS
export SITES_AUTHOR=${SITES_AUTHOR:-} DELIVERY_HOST=${DELIVERY_HOST:-}
perl - <<'PERL'
use strict; use warnings;
use File::Path qw(make_path remove_tree); use File::Basename qw(basename); use File::Temp qw(tempdir); use Digest::SHA qw(sha1_hex);
my ($ROOT, $STATE, $OUT, $BATCH, $IDS, $IMAGES, $ALLOW, $REINSTALL) = @ENV{qw(ROOT STATE OUT BATCH IDS IMAGES ALLOW REINSTALL)};
my %STEP = map { $_ => 1 } split /,/, $ENV{STEPS};
my ($SOURCE, $VERSION) = ('1.3.0', '1.3.0-edam');
my $TMP = tempdir(CLEANUP => 1);
$| = 1;
sub now { my @t = gmtime; sprintf '%04d-%02d-%02dT%02d:%02d:%02dZ', $t[5] + 1900, $t[4] + 1, @t[3, 2, 1, 0] }
sub say_ { print now(), ' ', @_, "\n" }
sub slurp { my ($f) = @_; open my $h, '<:raw', $f or return ''; local $/; my $s = <$h>; close $h; $s }
sub spew { my ($f, $s) = @_; open my $h, '>:raw', $f or die "cannot write $f: $!\n"; print $h $s; close $h }
# CSV with quoted fields ("" for a quote), no line breaks in fields
sub csv_rows {
  my ($f) = @_; my @rows;
  open my $h, '<:raw', $f or die "cannot read $f\n";
  while (my $l = <$h>) {
    $l =~ s/\r?\n$//; $l =~ s/^\xEF\xBB\xBF//; my @c; my $cur = ''; my $inq = 0; my @ch = split //, $l; my $i = 0;
    while ($i < @ch) {
      my $ch = $ch[$i];
      if ($inq) {
        if ($ch eq '"') { if ($i + 1 < @ch && $ch[$i + 1] eq '"') { $cur .= '"'; $i += 2; next } $inq = 0; $i++; next }
        $cur .= $ch; $i++; next;
      }
      if ($ch eq '"') { $inq = 1; $i++; next }
      if ($ch eq ',') { push @c, $cur; $cur = ''; $i++; next }
      $cur .= $ch; $i++;
    }
    push @c, $cur; push @rows, \@c;
  }
  close $h; my $head = shift @rows;
  return [map { my $r = $_; +{ map { $head->[$_] => $r->[$_] // '' } 0 .. $#$head } } @rows];
}
sub csv_field { my ($v) = @_; $v =~ /[",\r\n]/ ? '"' . ($v =~ s/"/""/gr) . '"' : $v }

# the page packages of the installation order (consolidated/packages/INSTALL-ORDER.md: | # | Batch | Package | MB |)
my @order;
open my $oh, '<', "$ROOT/consolidated/packages/INSTALL-ORDER.md" or die "no consolidated/packages/INSTALL-ORDER.md\n";
while (<$oh>) {
  next unless /^\| \d+ \|/;
  my @c = map { s/^\s+|\s+$//gr } split /\|/;
  next if $c[3] =~ /-assets-/;
  (my $src = $c[3]) =~ s/-[\d.]+\.zip$/-$SOURCE.zip/;
  (my $dst = $src) =~ s/-\Q$SOURCE\E\.zip$/-$VERSION.zip/;
  push @order, { batch => $c[2], src => $src, name => $dst };
}
close $oh;
my @sel = grep { index($_->{batch}, $BATCH) == 0 } @order;
die "no page packages for \"$BATCH\"\n" unless @sel;
my %blocked;

# 1. build
if ($STEP{1}) {
  (my $host = $ENV{DELIVERY_HOST}) =~ s{/+$}{};
  $host = "https://$host" unless $host =~ m{^https?://};
  my %ids;
  for my $r (@{ csv_rows($IDS) }) { $ids{$r->{path}} = [$r->{asset_id}, $r->{mime} // '', $r->{status} // ''] if ($r->{asset_id} // '') ne '' }
  say_ 'build: ', scalar(@sel), ' page packages', ($BATCH ? " (batch $BATCH)" : ''), ' | ', scalar(keys %ids), " asset IDs | delivery host $host | images $IMAGES";
  my %IMG = (jpg => 'image/jpeg', jpeg => 'image/jpeg', png => 'image/png', gif => 'image/gif', webp => 'image/webp', svg => 'image/svg+xml');
  # (url, mime, is image) of a DAM path, or () without an asset ID
  my $url_of = sub {
    my ($path) = @_;
    my $id = $ids{$path} or return ();
    my $name = basename($path); my ($ext) = $name =~ /\.([^.]+)$/; $ext = lc($ext // '');
    my $mime = $id->[1] || $IMG{$ext} || '';
    my $img = ($mime =~ m{^image/} || $IMG{$ext}) ? 1 : 0;
    return (($img ? "$host/adobe/assets/$id->[0]/as/$name" : "$host/adobe/assets/$id->[0]/original/as/$name"), $mime, $img);
  };
  my $xmllint = grep { -x "$_/xmllint" } split /:/, $ENV{PATH};
  my @summary;
  for my $p (@sel) {
    my $src = "$ROOT/consolidated/packages/$p->{src}";
    $src = "$ROOT/packages/$p->{batch}/$p->{src}" unless -f $src;
    die "page package not found: $p->{src}\n" unless -f $src;
    my $x = "$TMP/x"; remove_tree($x); make_path($x);
    system('unzip', '-q', '-o', $src, '-d', $x) == 0 or die "unzip failed: $p->{src}\n";
    # the pages' .content.xml in the package's order (a batch without pages has none)
    open my $lz, '-|', 'unzip', '-Z1', $src or die "unzip: $!\n";
    my @xml = map { "$x/$_" } grep { m{^jcr_root/(.*/)?\.content\.xml$} } map { s/\r?\n$//r } <$lz>;
    close $lz;
    my @log;
    for my $f (@xml) {
      my $page = '/' . substr($f, length("$x/jcr_root/"), -length('/.content.xml')); $page =~ s/_jcr_content/jcr:content/g;
      my $t = slurp($f);
      my %existing = map { $_ => 1 } $t =~ /\s([A-Za-z_][\w:.-]*)="/g;
      $t =~ s{(\s)([A-Za-z_][\w:.-]*)="(/content/dam/[^"#?]+)((?:[#?][^"]*)?)"}{
        my ($sp, $prop, $path, $rest, $all) = ($1, $2, $3, $4, $&);
        my ($url, $mime, $img) = $url_of->($path);
        if (!$url) { push @log, [$page, $prop, $path, 'UNRESOLVED']; $all }
        else {
          push @log, [$page, $prop, $path, $url];
          my $extra = ($img && $IMAGES eq 'media-bus' && $prop ne 'fileReference' && !$existing{"${prop}MimeType"}) ? " ${prop}MimeType=\"$mime\"" : '';
          "$sp$prop=\"$url$rest\"$extra";
        }
      }ge;
      $t =~ s{(&quot;)(/content/dam/[^&#?]+)((?:[#?][^&]*)?)(&quot;)}{
        my ($q1, $path, $rest, $q2, $all) = ($1, $2, $3, $4, $&);
        my ($url) = $url_of->($path);
        if (!$url) { push @log, [$page, 'rich text link', $path, 'UNRESOLVED']; $all }
        else { push @log, [$page, 'rich text link', $path, $url]; "$q1$url$rest$q2" }
      }ge;
      spew($f, $t);
    }
    if ($xmllint && @xml) { system('xmllint', '--noout', @xml) == 0 or die "$p->{batch}: a page is no longer valid XML\n" }
    my $props = "$x/META-INF/vault/properties.xml";
    if (-f $props) {
      my $t = slurp($props);
      my $desc = "TCS Corporate Website migration (URLMapping_Final_All_Levels.csv), batch $p->{batch}, EDAM set-up: the pages at the workbook's "
        . 'target paths; their assets are on the separate AEM Assets environment and referenced by delivery URL (no assets in this package). '
        . 'Each page has its own filter (the page and its content only): nothing else in AEM changes.';
      $t =~ s{<entry key="version">[^<]*</entry>}{<entry key="version">$VERSION</entry>};
      $t =~ s{<entry key="description">[^<]*</entry>}{<entry key="description">$desc</entry>};
      spew($props, $t);
    }
    my @unres = grep { $_->[3] eq 'UNRESOLVED' } @log;
    my %na = map { $_->[2] => 1 } grep { $_->[3] ne 'UNRESOLVED' && $ids{$_->[2]}[2] ne 'approved' } @log;
    my $dest = "$OUT/$p->{name}";
    if (@unres && !$ALLOW) {
      my %miss = map { $_->[2] => 1 } @unres;
      $blocked{$p->{name}} = scalar(keys %miss);
      unlink $dest;
      say_ "$p->{batch}: not built, ", scalar(keys %miss), " assets without an ID (first: $unres[0][2])";
    } else {
      unlink "$dest.part";
      my @top = grep { -e "$x/$_" } qw(META-INF jcr_root);
      system('sh', '-c', 'dir=$1; zipfile=$2; shift 2; cd "$dir" && zip -q -r -X "$zipfile" "$@"', 'sh', $x, "$dest.part", @top) == 0 or die "zip failed: $p->{name}\n";
      rename("$dest.part", $dest) or die "rename $dest: $!\n";
      say_ "$p->{batch}: ", scalar(@log), ' references, ', scalar(@log) - scalar(@unres), ' rewritten, ', scalar(@unres), ' unresolved, ', scalar(keys %na), " assets not approved yet -> $p->{name}";
    }
    my $csv = join('', map { join(',', map { csv_field($_) } @$_) . "\n" } ['page', 'property', 'dam path', 'delivery url'], @log);
    spew("$OUT/REWRITE-$p->{batch}.csv", $csv);
    push @summary, [$p->{batch}, $p->{name}, scalar(@log), scalar(@unres), scalar(keys %na), -f $dest && !$blocked{$p->{name}} ? sprintf('%.1f', (-s $dest) / 1048576) : 'not built'];
  }
  # installation order of the packages in the folder (every batch built so far)
  my @rows = grep { -f "$OUT/$_->{name}" } @order;
  my @md = ('# Installation order (EDAM content packages)', '',
    'Install on the **Sites author** with `aem-sites.sh` / `aem-sites.ps1` (or Package Manager), after the batch\'s assets are on the',
    'Assets environment and approved (`edam-assets.sh` / `edam-assets.ps1`), and once the site code for EDAM assets is deployed.', '',
    '| # | Batch | Package | MB |', '|---|---|---|---|');
  my $i = 0;
  push @md, map { sprintf('| %d | %s | %s | %.1f |', ++$i, $_->{batch}, $_->{name}, (-s "$OUT/$_->{name}") / 1048576) } @rows;
  spew("$OUT/INSTALL-ORDER.md", join("\n", @md) . "\n");
  my @s = ('# Rewrite summary', '', "Delivery host: `$host` | images: $IMAGES | asset IDs: `" . basename($IDS) . '` (' . scalar(keys %ids) . ' assets)', '',
    '| Batch | Package | References | Unresolved (no asset ID) | Assets not approved yet | MB |', '|---|---|---|---|---|---|');
  push @s, map { '| ' . join(' | ', @$_) . ' |' } @summary;
  spew("$OUT/REWRITE-SUMMARY.md", join("\n", @s) . "\n");
  # the sheets: a cell that is a DAM path with an asset ID becomes its delivery URL (e.g. an author image)
  make_path("$OUT/sheets");
  my $cells = 0;
  for my $sf (glob("$ROOT/consolidated/sheets/*.csv")) {
    my $t = slurp($sf);
    my $sub = sub { my ($pre, $q, $path) = @_; my ($url) = $url_of->($path); return "$pre$q$path$q" unless $url; $cells++; "$pre$q$url$q" };
    $t =~ s{(^|,)(")(/content/dam/[^"]+)"(?=,|\r?$)}{$sub->($1, $2, $3)}gme;
    $t =~ s{(^|,)()(/content/dam/[^,"\r\n]+)(?=,|\r?$)}{$sub->($1, $2, $3)}gme;
    spew("$OUT/sheets/" . basename($sf), $t);
  }
  say_ "sheets: $cells asset cells rewritten -> content-packages/sheets/ (replace the sheets on the author with them)";
  say_ '1 build: ', scalar(@summary) - scalar(keys %blocked), ' built, ', scalar(keys %blocked), ' not built (assets without an ID)';
}

# 2. install (Package Manager: upload and install, three tries per package)
if ($STEP{2}) {
  (my $A = $ENV{SITES_AUTHOR}) =~ s{/+$}{};
  my $service = "$A/crx/packmgr/service.jsp";
  my $code = `curl -s -o /dev/null -w '%{http_code}' -K "$STATE/.auth-sites" "$service?cmd=ls"`;
  die "Package Manager answers $code: check SITES_AUTHOR, the token and the user's permissions\n" unless $code eq '200';
  # one progress log per AEM environment, named after a fingerprint of the author (never its program or environment id)
  my $log = "$OUT/install-progress-" . substr(sha1_hex($A), 0, 8) . '.log';
  my %done; if (!$REINSTALL && open my $lh, '<', $log) { while (<$lh>) { s/\s+$//; $done{$_} = 1 if $_ ne '' } close $lh }
  say_ 'install: progress log ', basename($log);
  my ($n, $had, $missing) = (0, 0, 0);
  for my $p (@sel) {
    next if $blocked{$p->{name}};
    my $f = "$OUT/$p->{name}";
    if (!-f $f) { $missing++; say_ "$p->{batch}: $p->{name} not built (run step 1)"; next }
    if ($done{$p->{name}}) { $had++; next }
    # a batch without migrated pages (B004) has a package without content, which Package Manager refuses
    if (!grep { m{^jcr_root/} } `unzip -Z1 "$f"`) {
      say_ "$p->{batch}: $p->{name} has no content (no pages migrated), skipped";
      open my $lh, '>>', $log or die; print $lh "$p->{name}\n"; close $lh; next;
    }
    my $ok = 0; my $out = '';
    for my $try (1 .. 3) {
      say_ "$p->{batch} $p->{name} (", sprintf('%.1f', (-s $f) / 1048576), " MB), try $try";
      open(my $c, '-|', 'curl', '-sS', '--max-time', 3600, '-K', "$STATE/.auth-sites", '-F', "file=\@$f", '-F', 'name=' . ($p->{name} =~ s/\.zip$//r),
        '-F', 'force=true', '-F', 'install=true', $service) or die "curl: $!\n";
      local $/; $out = <$c> // ''; close $c;
      if ($out =~ /code="200"/) { $ok = 1; last }
      my @l = split /\n/, $out; print join("\n", @l > 5 ? @l[-5 .. -1] : @l), "\n";
      sleep 20 if $try < 3;
    }
    die "$p->{name} not installed: stopped (run again to continue from here)\n" unless $ok;
    open my $lh, '>>', $log or die; print $lh "$p->{name}\n"; close $lh;
    $n++;
  }
  say_ "2 install: $n installed, $had installed before", ($missing ? ", $missing not built" : '');
}
if (%blocked) {
  say_ scalar(keys %blocked), ' packages not built or installed, their assets have no ID yet: run edam-assets.sh for them, then this script again';
  say_ "  $_ ($blocked{$_} assets)" for sort keys %blocked;
  exit 4;
}
PERL
rc=$?
[ $rc -eq 255 ] && rc=1  # a stop (perl die)
rm -f "$STATE/.auth-sites"
[ $rc -eq 0 ] && echo "Done. Check the pages in Universal Editor and on the preview (the images load from the delivery host)."
exit $rc
