#!/bin/bash
# EDAM assets, one command (macOS / Linux): puts the migration's assets on the separate AEM Assets environment.
#   1. extract   the asset files from the asset packages (consolidated/packages) and the earlier-run asset packages
#                (packages-earlier-run-assets) into edam-upload/tcs-corp/... (their DAM paths)
#   2. tags      the 41 taxonomy tags the assets use (packages-for-edam-sites/edam-zips/metadata/edam-tags.csv)
#   3. upload    every file with AEM's direct binary upload (folders created as needed)
#   4. metadata  once an asset is processed: title, description, tags, source (edam-metadata.csv) and approval
#   5. export    the asset IDs (consolidated/tools/export-asset-ids.sh) -> edam-state/asset-ids.csv, which
#                aem-sites.sh uses; with DELIVERY_HOST set, a spot check of delivered images
# Resumable: what is done is recorded in edam-state/ and skipped when the script runs again.
#
# Environment (nothing is hard-coded):
#   EDAM_AUTHOR    the Assets environment's author URL, https://author-p<program>-e<environment>.adobeaemcloud.com
#   EDAM_TOKEN     an access token for it (Developer Console > Integrations > Local token); asked for when not set
#   DELIVERY_HOST  optional: the delivery host or custom delivery domain, for the spot check
# Options:
#   --batch B001   only the assets that batch installs or its pages use (pilot)
#   --no-approve   don't approve the assets (approve them in the Assets view later)
#   --wait N       minutes to wait for asset processing before the metadata step gives up (default 120; rerun to continue)
#   --steps LIST   e.g. 3,4: run only those steps
# Needs curl, unzip and perl (all part of macOS). Run from the branch's root folder (where this script is).
set -uo pipefail
ROOT=$(cd "$(dirname "$0")" && pwd)
BATCH="" APPROVE=1 WAIT=120 STEPS="1,2,3,4,5"
while [ $# -gt 0 ]; do
  case $1 in
    --batch) BATCH=$2; shift ;;
    --no-approve) APPROVE=0 ;;
    --wait) WAIT=$2; shift ;;
    --steps) STEPS=$2; shift ;;
    -h|--help) sed -n '2,24p' "$0"; exit 0 ;;
    *) echo "unknown option $1 (see --help)"; exit 2 ;;
  esac
  shift
done
for t in curl unzip perl; do command -v $t > /dev/null || { echo "needs $t"; exit 2; }; done
[ -n "${EDAM_AUTHOR:-}" ] || { echo "set EDAM_AUTHOR (the Assets environment's author URL)"; exit 2; }
if [ -z "${EDAM_TOKEN:-}" ]; then read -r -s -p "Access token for $EDAM_AUTHOR (hidden): " EDAM_TOKEN; echo; fi
[ -n "$EDAM_TOKEN" ] || { echo "no token"; exit 2; }
export EDAM_AUTHOR EDAM_TOKEN ROOT BATCH APPROVE WAIT STEPS
STATE="$ROOT/edam-state"; mkdir -p "$STATE"
# the token goes to curl in a config file readable only by you (not on the command line)
umask 077
printf 'header = "Authorization: Bearer %s"\n' "$EDAM_TOKEN" > "$STATE/.auth"
umask 022
trap 'rm -f "$STATE/.auth"' EXIT
export STATE
perl - <<'PERL'
use strict; use warnings;
use JSON::PP; use File::Path qw(make_path remove_tree); use File::Basename qw(dirname basename); use File::Temp qw(tempdir);
my ($ROOT, $STATE, $A, $BATCH, $APPROVE, $WAIT) = @ENV{qw(ROOT STATE EDAM_AUTHOR BATCH APPROVE WAIT)};
$A =~ s{/+$}{};
my %STEP = map { $_ => 1 } split /,/, $ENV{STEPS};
my $UP = "$ROOT/edam-upload";
my $TMP = tempdir(CLEANUP => 1);
$| = 1;
sub now { my @t = gmtime; sprintf '%04d-%02d-%02dT%02d:%02d:%02dZ', $t[5] + 1900, $t[4] + 1, @t[3, 2, 1, 0] }
sub say_ { print now(), ' ', @_, "\n" }
sub slurp { my ($f) = @_; open my $h, '<:raw', $f or return ''; local $/; my $s = <$h>; close $h; $s }
# curl: returns (HTTP status, body); auth adds the bearer token (from the config file)
sub http {
  my (%o) = @_;
  my $out = "$TMP/body";
  my @c = ('curl', '-s', '-S', '--max-time', $o{timeout} || 900, '-o', $out, '-w', '%{http_code}');
  push @c, '-K', "$STATE/.auth" if $o{auth};
  push @c, '-X', $o{method} if $o{method};
  my @f = @{ $o{form} || [] };
  for (my $i = 0; $i < @f; $i += 2) { push @c, '--form-string', "$f[$i]=$f[$i + 1]" }
  push @c, '-T', $o{put} if $o{put};
  push @c, $o{url};
  unlink $out;
  open(my $p, '-|', @c) or die "curl: $!";
  my $code = <$p> // '000'; close $p;
  return ($code + 0, slurp($out));
}
sub json { my ($s) = @_; my $d = eval { JSON::PP->new->utf8->decode($s) }; $d }
# CSV with quoted fields ("" for a quote), no line breaks in fields
sub csv_rows {
  my ($f) = @_; my @rows;
  open my $h, '<:raw', $f or die "cannot read $f";
  while (my $l = <$h>) {
    $l =~ s/\r?\n$//; my @c; my $cur = ''; my $inq = 0; my @ch = split //, $l; my $i = 0;
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
sub logged { my ($f) = @_; my %s; open my $h, '<', $f or return \%s; while (<$h>) { chomp; $s{$_} = 1 } close $h; \%s }
sub log_add { my ($f, $v) = @_; open my $h, '>>', $f or die; print $h "$v\n"; close $h }
my %MIME = (jpg => 'image/jpeg', jpeg => 'image/jpeg', png => 'image/png', gif => 'image/gif', webp => 'image/webp', svg => 'image/svg+xml',
  mp4 => 'video/mp4', mp3 => 'audio/mpeg', m4a => 'audio/mp4', pdf => 'application/pdf', txt => 'text/plain', csv => 'text/csv', zip => 'application/zip',
  doc => 'application/msword', xls => 'application/vnd.ms-excel', ppt => 'application/vnd.ms-powerpoint',
  docx => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', xlsx => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx => 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
sub mime_of { my ($p) = @_; my ($e) = $p =~ /\.([^.\/]+)$/; $MIME{lc($e // '')} || 'application/octet-stream' }

# the assets: all of them, or those of --batch (installed by the batch or used by its pages)
my $exp = csv_rows("$ROOT/consolidated/tools/expected-assets.csv");
my @sel = grep { $BATCH eq '' || index($_->{batch}, $BATCH) == 0 || " $_->{'needed by'}" =~ / \Q$BATCH\E/ } @$exp;
die "no assets for batch $BATCH\n" unless @sel;
my %earlier = map { $_->{path} => $_->{package} } @{ csv_rows("$ROOT/packages-earlier-run-assets/ASSETS.csv") };
say_ "assets: ", scalar(@sel), ($BATCH ? " (batch $BATCH)" : ''), " | EDAM author: $A";

# 0. the author answers
my ($code) = http(url => "$A/bin/querybuilder.json?path=/content/dam&p.limit=1", auth => 1);
die "the Assets author answers $code: check EDAM_AUTHOR, the token and the user's permissions\n" unless $code == 200;

# 1. extract
if ($STEP{1}) {
  my %by;
  for my $r (@sel) {
    my $pk = $earlier{$r->{path}} ? "$ROOT/packages-earlier-run-assets/$earlier{$r->{path}}" : "$ROOT/consolidated/packages/$r->{package}";
    $pk = "$ROOT/packages/$r->{batch}/$r->{package}" unless -f $pk;
    die "package not found for $r->{path} ($r->{package})\n" unless -f $pk;
    push @{ $by{$pk} }, $r->{path};
  }
  my $n = 0;
  for my $pk (sort keys %by) {
    my @need = grep { !-s "$UP" . substr($_, length('/content/dam')) } @{ $by{$pk} };
    next unless @need;
    say_ 'extract ', basename($pk), ' (', scalar(@need), ' files)';
    my $x = "$TMP/x"; remove_tree($x); make_path($x);
    system('unzip', '-q', '-o', $pk, 'jcr_root/content/dam/*/_jcr_content/renditions/original', '-d', $x) == 0 or die "unzip failed: $pk\n";
    for my $p (@need) {
      my $src = "$x/jcr_root$p/_jcr_content/renditions/original";
      my $dst = "$UP" . substr($p, length('/content/dam'));
      die "$p not in ", basename($pk), "\n" unless -f $src;
      make_path(dirname($dst)); rename($src, $dst) or die "move $p: $!\n"; $n++;
    }
  }
  say_ "1 extract: $n files extracted, ", scalar(@sel), " in edam-upload/";
}

# 2. tags (the namespace, the parents, the tags; existing ones are kept)
if ($STEP{2}) {
  my $tags = csv_rows("$ROOT/packages-for-edam-sites/edam-zips/metadata/edam-tags.csv");
  my %title = ('tcs-corp:' => 'TCS Corp'); my @order = ('tcs-corp:');
  for my $t (@$tags) { if (!$title{$t->{parent}}) { $title{$t->{parent}} = $t->{'parent title'} || $t->{parent}; push @order, $t->{parent} } }
  for my $t (@$tags) { next if $title{$t->{tag}}; $title{$t->{tag}} = $t->{title} || $t->{tag}; push @order, $t->{tag} }
  my ($made, $had) = (0, 0);
  for my $t (@order) {
    (my $p = $t) =~ s/^tcs-corp:/\/content\/cq:tags\/tcs-corp\//; $p =~ s{/$}{};
    my ($c) = http(url => "$A$p.json", auth => 1);
    if ($c == 200) { $had++; next }
    my ($c2, $b) = http(url => "$A/bin/tagcommand", auth => 1, method => 'POST', form => [cmd => 'createTag', tag => $t, 'jcr:title' => $title{$t}, _charset_ => 'utf-8']);
    die "tag $t: HTTP $c2 " . substr($b, 0, 200) . "\n" unless $c2 =~ /^20/;
    $made++;
  }
  say_ "2 tags: $made created, $had existed";
}

# 3. upload (direct binary upload: initiate, PUT the parts to the returned URIs, complete)
my $ulog = "$STATE/uploaded.log";
if ($STEP{3}) {
  my $done = logged($ulog); my %folder; my ($up, $had) = (0, 0);
  my @todo = grep { !$done->{$_->{path}} } @sel;
  say_ '3 upload: ', scalar(@todo), ' to upload, ', scalar(@sel) - scalar(@todo), ' done before';
  for my $r (@todo) {
    my $p = $r->{path};
    my $file = "$UP" . substr($p, length('/content/dam'));
    die "missing $file (run step 1)\n" unless -s $file;
    my ($c) = http(url => "$A$p.json", auth => 1);
    if ($c == 200) { log_add($ulog, $p); $had++; next }
    # the folders, parents first
    my @parts = split m{/}, substr(dirname($p), length('/content/dam/'));
    my $f = '/content/dam';
    for my $seg (@parts) {
      $f .= "/$seg"; next if $folder{$f};
      my ($fc) = http(url => "$A$f.json", auth => 1);
      if ($fc != 200) {
        (my $t = $seg) =~ s/-/ /g; $t =~ s/\b(\w)/\U$1/g;
        my ($cc, $b) = http(url => $A . $f, auth => 1, method => 'POST', form => ['jcr:primaryType' => 'sling:OrderedFolder', 'jcr:title' => $t, 'jcr:content/jcr:primaryType' => 'nt:unstructured', 'jcr:content/jcr:title' => $t, _charset_ => 'utf-8']);
        die "folder $f: HTTP $cc " . substr($b, 0, 200) . "\n" unless $cc =~ /^20/;
      }
      $folder{$f} = 1;
    }
    my $size = -s $file; my $name = basename($p); my $mime = mime_of($p); my $ok = 0; my $err = '';
    for my $try (1 .. 3) {
      my ($ic, $ib) = http(url => "$A" . dirname($p) . '.initiateUpload.json', auth => 1, method => 'POST', form => [fileName => $name, fileSize => $size]);
      my $d = json($ib);
      my ($fe) = grep { $_->{fileName} eq $name } @{ ($d && $d->{files}) || [] };
      if ($ic !~ /^20/ || !$fe) { $err = "initiate HTTP $ic " . substr($ib, 0, 200); sleep 10; next }
      my @uris = @{ $fe->{uploadURIs} }; my $min = $fe->{minPartSize} || 1; my $max = $fe->{maxPartSize} || $size || 1;
      my $ps = int(($size + @uris - 1) / @uris); $ps = $min if $ps < $min && $size > $min; $ps = $size if $ps > $size || $ps < 1; $ps = $max if $ps > $max;
      my $n = $size ? int(($size + $ps - 1) / $ps) : 1;
      if ($n > @uris) { $err = "file of $size bytes needs $n parts, only " . scalar(@uris) . ' URIs'; last }
      my $put = 1;
      open my $fh, '<:raw', $file or die;
      for my $i (0 .. $n - 1) {
        my $len = ($i == $n - 1) ? $size - $i * $ps : $ps; my $buf = '';
        seek($fh, $i * $ps, 0); read($fh, $buf, $len) if $len > 0;
        open my $o, '>:raw', "$TMP/part" or die; print $o $buf; close $o;
        my ($pc) = http(url => $uris[$i], put => "$TMP/part", timeout => 1800);
        if ($pc !~ /^20/) { $put = 0; $err = "part $i PUT HTTP $pc"; last }
      }
      close $fh;
      if (!$put) { sleep 10; next }
      my $cu = $d->{completeURI}; $cu = "$A$cu" if $cu =~ m{^/};
      my ($cc, $cb) = http(url => $cu, auth => 1, method => 'POST', form => [fileName => $name, mimeType => $mime, uploadToken => $fe->{uploadToken}]);
      if ($cc =~ /^20/) { $ok = 1; last }
      $err = "complete HTTP $cc " . substr($cb, 0, 200); sleep 10;
    }
    die "upload $p failed: $err\n" unless $ok;
    log_add($ulog, $p); $up++;
    say_ "uploaded $up / " . scalar(@todo) . " $p" if $up % 100 == 0 || $up == @todo;
  }
  say_ "3 upload: $up uploaded, $had were on EDAM already";
}

# 4. metadata and approval, once AEM has processed the asset
if ($STEP{4}) {
  my $mlog = "$STATE/metadata.log"; my $done = logged($mlog);
  my %meta = map { $_->{assetPath} => $_ } @{ csv_rows("$ROOT/packages-for-edam-sites/edam-zips/metadata/edam-metadata.csv") };
  my @pending = grep { !$done->{$_} } map { $_->{path} } @sel;
  my $deadline = time + 60 * $WAIT; my ($n, $failed) = (0, 0);
  say_ '4 metadata: ', scalar(@pending), ' assets', ($APPROVE ? ', approved' : '');
  while (@pending) {
    my @later;
    for my $p (@pending) {
      my ($c, $b) = http(url => "$A$p/jcr:content.json", auth => 1);
      my $st = ($c == 200 && json($b)) ? (json($b)->{'dam:assetState'} // '') : '';
      if ($st ne 'processed' && $st ne 'failed') { push @later, $p; next }
      $failed++ if $st eq 'failed';
      my $m = $meta{$p} || {};
      my @form = (_charset_ => 'utf-8');
      for my $k ('dc:title', 'dc:description', 'dc:source') { push @form, $k => $m->{$k} if ($m->{$k} // '') ne '' }
      my @tags = grep { $_ ne '' } split /\|/, ($m->{'cq:tags {{String: multi}}'} // '');
      if (@tags) { push @form, 'cq:tags' => $_ for @tags; push @form, 'cq:tags@TypeHint' => 'String[]' }
      push @form, 'dam:status' => 'approved' if $APPROVE;
      my ($mc, $mb) = http(url => "$A$p/jcr:content/metadata", auth => 1, method => 'POST', form => \@form);
      die "metadata $p: HTTP $mc " . substr($mb, 0, 200) . "\n" unless $mc =~ /^20/;
      log_add($mlog, $p); $n++;
    }
    @pending = @later;
    last unless @pending;
    if (time > $deadline) { say_ scalar(@pending), " assets still processing after $WAIT minutes: run the script again later (it continues)"; last }
    say_ scalar(@pending), ' assets still processing, waiting 30 s'; sleep 30;
  }
  say_ "4 metadata: $n written", ($failed ? ", $failed assets whose processing failed (check them in the Assets view)" : '');
  exit 3 if @pending;
}
PERL
rc=$?
rm -f "$STATE/.auth"
[ $rc -eq 0 ] || { [ $rc -eq 3 ] && echo "Not finished: assets still processing. Run the same command again later." ; exit $rc; }
# 5. export the asset IDs (and the spot check)
if [[ ",$STEPS," == *,5,* ]]; then
  args=(--out "$STATE"); [ -n "$BATCH" ] && args+=(--batch "$BATCH"); [ -n "${DELIVERY_HOST:-}" ] && args+=(--check 5)
  AEM_AUTHOR="$EDAM_AUTHOR" AEM_TOKEN="$EDAM_TOKEN" bash "$ROOT/consolidated/tools/export-asset-ids.sh" "${args[@]}" || exit 1
  echo "Done. Next: aem-sites.sh (it reads $STATE/asset-ids.csv)."
fi
