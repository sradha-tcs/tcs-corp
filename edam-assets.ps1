<#
.SYNOPSIS
  EDAM assets, one command (Windows): puts the migration's assets on the separate AEM Assets environment.
  The PowerShell version of edam-assets.sh.

.DESCRIPTION
  1. extract   the asset files from the asset packages (consolidated\packages) and the earlier-run asset packages
               (packages-earlier-run-assets) into edam-upload\tcs-corp\... (their DAM paths)
  2. tags      the 41 taxonomy tags the assets use (packages-for-edam-sites\edam-zips\metadata\edam-tags.csv)
  3. upload    every file with AEM's direct binary upload (folders created as needed)
  4. metadata  once an asset is processed: title, description, tags, source (edam-metadata.csv) and approval
  5. export    the asset IDs (consolidated\tools\export-asset-ids.ps1) -> edam-state\asset-ids.csv, which
               aem-sites.ps1 uses; with DELIVERY_HOST set, a spot check of delivered images
  Resumable: what is done is recorded in edam-state\ and skipped when the script runs again.
  Nothing is hard-coded: $env:EDAM_AUTHOR is the Assets environment's author URL; $env:EDAM_TOKEN an access token
  (asked for, hidden, when not set); $env:DELIVERY_HOST (optional) the delivery host, for the spot check.
  Works with Windows PowerShell 5.1 and PowerShell 7; uses curl.exe (Windows 10 1803 and later, Windows 11).

.EXAMPLE
  $env:EDAM_AUTHOR = "https://author-p<program>-e<environment>.adobeaemcloud.com"
  powershell -ExecutionPolicy Bypass -File edam-assets.ps1 -Batch B001
  powershell -ExecutionPolicy Bypass -File edam-assets.ps1
#>
param(
  [string]$Batch = "",
  [switch]$NoApprove,
  [int]$Wait = 120,
  [string]$Steps = "1,2,3,4,5"
)
$ErrorActionPreference = "Stop"
$Root = $PSScriptRoot
$Step = @{}; $Steps.Split(',') | ForEach-Object { $Step[$_.Trim()] = $true }
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$curl = Get-Command curl.exe -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $curl) { $curl = Get-Command curl -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1 }
if (-not $curl) { Write-Host "curl.exe not found (Windows 10 1803 or later includes it)"; exit 2 }
$curl = $curl.Source
$A = "$env:EDAM_AUTHOR".TrimEnd('/')
if (-not $A) { Write-Host 'Set the Assets author first: $env:EDAM_AUTHOR = "https://author-p...-e....adobeaemcloud.com"'; exit 2 }
$token = "$env:EDAM_TOKEN"
if (-not $token) {
  $secure = Read-Host "Access token for $A (input hidden)" -AsSecureString
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  $token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
}
$State = Join-Path $Root "edam-state"; New-Item -ItemType Directory -Force -Path $State | Out-Null
$Up = Join-Path $Root "edam-upload"
$Tmp = Join-Path $State ".tmp"; New-Item -ItemType Directory -Force -Path $Tmp | Out-Null
$utf8 = New-Object System.Text.UTF8Encoding($false)
# the token goes to curl in a config file (not on the command line); removed at the end
$AuthFile = Join-Path $State ".auth"
[IO.File]::WriteAllText($AuthFile, "header = `"Authorization: Bearer $token`"`n", $utf8)

function Say($m) { Write-Host ("{0} {1}" -f (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ"), $m) }
# curl: returns @{ Code; Body }; form values travel in UTF-8 files (non-ASCII text is safe on Windows PowerShell)
function Http {
  param([string]$Url, [switch]$Auth, [string]$Method = "", [object[]]$Form = @(), [string]$Put = "", [int]$Timeout = 900)
  $out = Join-Path $Tmp "body"
  if (Test-Path $out) { Remove-Item $out }
  $cargs = @('-s', '-S', '--max-time', "$Timeout", '-o', $out, '-w', '%{http_code}')
  if ($Auth) { $cargs += @('-K', $AuthFile) }
  if ($Method) { $cargs += @('-X', $Method) }
  for ($i = 0; $i -lt $Form.Count; $i += 2) {
    $vf = Join-Path $Tmp ("f$i")
    [IO.File]::WriteAllText($vf, [string]$Form[$i + 1], $utf8)
    $cargs += @('-F', "$($Form[$i])=<$vf")
  }
  if ($Put) { $cargs += @('-T', $Put) }
  $cargs += $Url
  $code = & $curl @cargs
  $body = if (Test-Path $out) { [IO.File]::ReadAllText($out, $utf8) } else { "" }
  return @{ Code = [int]("0$code".Trim()); Body = $body }
}
function Json($s) { try { return $s | ConvertFrom-Json } catch { return $null } }
function Logged($f) { $h = @{}; if (Test-Path $f) { Get-Content -Encoding UTF8 $f | ForEach-Object { if ($_) { $h[$_] = $true } } }; return $h }
function LogAdd($f, $v) { [IO.File]::AppendAllText($f, "$v`n", $utf8) }
$MimeTypes = @{ jpg = 'image/jpeg'; jpeg = 'image/jpeg'; png = 'image/png'; gif = 'image/gif'; webp = 'image/webp'; svg = 'image/svg+xml';
  mp4 = 'video/mp4'; mp3 = 'audio/mpeg'; m4a = 'audio/mp4'; pdf = 'application/pdf'; txt = 'text/plain'; csv = 'text/csv'; zip = 'application/zip';
  doc = 'application/msword'; xls = 'application/vnd.ms-excel'; ppt = 'application/vnd.ms-powerpoint';
  docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  pptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }
function MimeOf($p) { $e = [IO.Path]::GetExtension($p).TrimStart('.').ToLower(); if ($MimeTypes.ContainsKey($e)) { $MimeTypes[$e] } else { 'application/octet-stream' } }
function LocalOf($p) { Join-Path $Up ($p.Substring('/content/dam/'.Length).Replace('/', [IO.Path]::DirectorySeparatorChar)) }

$code = 0
try {
  # the assets: all, or those of -Batch (installed by the batch or used by its pages)
  $exp = Import-Csv -Encoding UTF8 (Join-Path $Root "consolidated/tools/expected-assets.csv")
  $sel = @($exp | Where-Object { $Batch -eq "" -or $_.batch.StartsWith($Batch) -or (" " + $_.'needed by') -match (" " + [regex]::Escape($Batch)) })
  if (-not $sel.Count) { throw "no assets for batch $Batch" }
  $earlier = @{}; Import-Csv -Encoding UTF8 (Join-Path $Root "packages-earlier-run-assets/ASSETS.csv") | ForEach-Object { $earlier[$_.path] = $_.package }
  Say ("assets: {0}{1} | EDAM author: {2}" -f $sel.Count, $(if ($Batch) { " (batch $Batch)" } else { "" }), $A)
  $r = Http -Url "$A/bin/querybuilder.json?path=/content/dam&p.limit=1" -Auth
  if ($r.Code -ne 200) { throw "the Assets author answers $($r.Code): check EDAM_AUTHOR, the token and the user's permissions" }

  # 1. extract
  if ($Step['1']) {
    $by = @{}
    foreach ($x in $sel) {
      $pk = if ($earlier.ContainsKey($x.path)) { Join-Path $Root ("packages-earlier-run-assets/" + $earlier[$x.path]) } else { Join-Path $Root ("consolidated/packages/" + $x.package) }
      if (-not (Test-Path $pk)) { $pk = Join-Path $Root ("packages/" + $x.batch + "/" + $x.package) }
      if (-not (Test-Path $pk)) { throw "package not found for $($x.path) ($($x.package))" }
      if (-not $by.ContainsKey($pk)) { $by[$pk] = New-Object System.Collections.Generic.List[string] }
      $by[$pk].Add($x.path)
    }
    $n = 0
    foreach ($pk in ($by.Keys | Sort-Object)) {
      $need = @($by[$pk] | Where-Object { $f = LocalOf $_; -not ((Test-Path $f) -and (Get-Item $f).Length -gt 0) })
      if (-not $need.Count) { continue }
      Say ("extract {0} ({1} files)" -f (Split-Path $pk -Leaf), $need.Count)
      $z = [IO.Compression.ZipFile]::OpenRead($pk)
      try {
        foreach ($p in $need) {
          $e = $z.GetEntry("jcr_root$p/_jcr_content/renditions/original")
          if (-not $e) { throw "$p not in $(Split-Path $pk -Leaf)" }
          $dst = LocalOf $p
          New-Item -ItemType Directory -Force -Path (Split-Path $dst -Parent) | Out-Null
          $part = "$dst.part"
          $in = $e.Open(); $o = [IO.File]::Create($part)
          try { $in.CopyTo($o) } finally { $o.Dispose(); $in.Dispose() }
          Move-Item -Force $part $dst
          $n++
        }
      } finally { $z.Dispose() }
    }
    Say "1 extract: $n files extracted, $($sel.Count) in edam-upload\"
  }

  # 2. tags (the namespace, the parents, the tags; existing ones are kept)
  if ($Step['2']) {
    $tagRows = Import-Csv -Encoding UTF8 (Join-Path $Root "packages-for-edam-sites/edam-zips/metadata/edam-tags.csv")
    $title = [ordered]@{ 'tcs-corp:' = 'TCS Corp' }
    foreach ($t in $tagRows) { if (-not $title.Contains($t.parent)) { $title[$t.parent] = $(if ($t.'parent title') { $t.'parent title' } else { $t.parent }) } }
    foreach ($t in $tagRows) { if (-not $title.Contains($t.tag)) { $title[$t.tag] = $(if ($t.title) { $t.title } else { $t.tag }) } }
    $made = 0; $had = 0
    foreach ($t in @($title.Keys)) {
      $p = ($t -replace '^tcs-corp:', '/content/cq:tags/tcs-corp/').TrimEnd('/')
      if ((Http -Url "$A$p.json" -Auth).Code -eq 200) { $had++; continue }
      $r = Http -Url "$A/bin/tagcommand" -Auth -Method POST -Form @('cmd', 'createTag', 'tag', $t, 'jcr:title', $title[$t], '_charset_', 'utf-8')
      if ($r.Code -lt 200 -or $r.Code -ge 300) { throw "tag ${t}: HTTP $($r.Code) $($r.Body.Substring(0, [Math]::Min(200, $r.Body.Length)))" }
      $made++
    }
    Say "2 tags: $made created, $had existed"
  }

  # 3. upload (direct binary upload: initiate, PUT the parts to the returned URIs, complete)
  $ulog = Join-Path $State "uploaded.log"
  if ($Step['3']) {
    $done = Logged $ulog; $folder = @{}; $upn = 0; $had = 0
    $todo = @($sel | Where-Object { -not $done.ContainsKey($_.path) })
    Say ("3 upload: {0} to upload, {1} done before" -f $todo.Count, ($sel.Count - $todo.Count))
    foreach ($x in $todo) {
      $p = $x.path; $file = LocalOf $p
      if (-not ((Test-Path $file) -and (Get-Item $file).Length -gt 0)) { throw "missing $file (run step 1)" }
      if ((Http -Url "$A$p.json" -Auth).Code -eq 200) { LogAdd $ulog $p; $had++; continue }
      $dir = $p.Substring(0, $p.LastIndexOf('/'))
      $f = '/content/dam'
      foreach ($seg in $dir.Substring('/content/dam/'.Length).Split('/')) {
        $f = "$f/$seg"; if ($folder.ContainsKey($f)) { continue }
        if ((Http -Url "$A$f.json" -Auth).Code -ne 200) {
          $t = (Get-Culture).TextInfo.ToTitleCase(($seg -replace '-', ' '))
          $r = Http -Url "$A$f" -Auth -Method POST -Form @('jcr:primaryType', 'sling:OrderedFolder', 'jcr:title', $t, 'jcr:content/jcr:primaryType', 'nt:unstructured', 'jcr:content/jcr:title', $t, '_charset_', 'utf-8')
          if ($r.Code -lt 200 -or $r.Code -ge 300) { throw "folder ${f}: HTTP $($r.Code)" }
        }
        $folder[$f] = $true
      }
      $size = (Get-Item $file).Length; $name = $p.Substring($p.LastIndexOf('/') + 1); $ctype = MimeOf $p; $ok = $false; $err = ""
      for ($try = 1; $try -le 3 -and -not $ok; $try++) {
        $r = Http -Url "$A$dir.initiateUpload.json" -Auth -Method POST -Form @('fileName', $name, 'fileSize', "$size")
        $d = Json $r.Body
        $fe = if ($d) { @($d.files) | Where-Object { $_.fileName -eq $name } | Select-Object -First 1 } else { $null }
        if ($r.Code -lt 200 -or $r.Code -ge 300 -or -not $fe) { $err = "initiate HTTP $($r.Code)"; Start-Sleep 10; continue }
        $uris = @($fe.uploadURIs); $min = [long]$fe.minPartSize; $max = [long]$fe.maxPartSize
        if ($min -lt 1) { $min = 1 }; if ($max -lt 1) { $max = [Math]::Max($size, 1) }
        $ps = [long][Math]::Ceiling($size / [double]$uris.Count)
        if ($ps -lt $min -and $size -gt $min) { $ps = $min }; if ($ps -gt $size -or $ps -lt 1) { $ps = $size }; if ($ps -gt $max) { $ps = $max }
        $n = if ($size) { [long][Math]::Ceiling($size / [double]$ps) } else { 1 }
        if ($n -gt $uris.Count) { $err = "file of $size bytes needs $n parts, only $($uris.Count) URIs"; break }
        $partsOk = $true
        $fs = [IO.File]::OpenRead($file)
        try {
          for ($i = 0; $i -lt $n; $i++) {
            $len = if ($i -eq $n - 1) { $size - $i * $ps } else { $ps }
            $buf = New-Object byte[] $len
            [void]$fs.Seek($i * $ps, 'Begin'); $read = 0
            while ($read -lt $len) { $k = $fs.Read($buf, $read, $len - $read); if ($k -le 0) { break }; $read += $k }
            $partFile = Join-Path $Tmp "part"
            [IO.File]::WriteAllBytes($partFile, $buf)
            $pr = Http -Url $uris[$i] -Put $partFile -Timeout 1800
            if ($pr.Code -lt 200 -or $pr.Code -ge 300) { $partsOk = $false; $err = "part $i PUT HTTP $($pr.Code)"; break }
          }
        } finally { $fs.Dispose() }
        if (-not $partsOk) { Start-Sleep 10; continue }
        $cu = [string]$d.completeURI; if ($cu.StartsWith('/')) { $cu = "$A$cu" }
        $cr = Http -Url $cu -Auth -Method POST -Form @('fileName', $name, 'mimeType', $ctype, 'uploadToken', [string]$fe.uploadToken)
        if ($cr.Code -ge 200 -and $cr.Code -lt 300) { $ok = $true } else { $err = "complete HTTP $($cr.Code)"; Start-Sleep 10 }
      }
      if (-not $ok) { throw "upload $p failed: $err" }
      LogAdd $ulog $p; $upn++
      if ($upn % 100 -eq 0 -or $upn -eq $todo.Count) { Say "uploaded $upn / $($todo.Count) $p" }
    }
    Say "3 upload: $upn uploaded, $had were on EDAM already"
  }

  # 4. metadata and approval, once AEM has processed the asset
  if ($Step['4']) {
    $mlog = Join-Path $State "metadata.log"; $done = Logged $mlog
    $meta = @{}; Import-Csv -Encoding UTF8 (Join-Path $Root "packages-for-edam-sites/edam-zips/metadata/edam-metadata.csv") | ForEach-Object { $meta[$_.assetPath] = $_ }
    $pending = @($sel | ForEach-Object { $_.path } | Where-Object { -not $done.ContainsKey($_) })
    $deadline = (Get-Date).AddMinutes($Wait); $n = 0; $failed = 0
    Say ("4 metadata: {0} assets{1}" -f $pending.Count, $(if ($NoApprove) { "" } else { ", approved" }))
    while ($pending.Count) {
      $later = @()
      foreach ($p in $pending) {
        $r = Http -Url "$A$p/jcr:content.json" -Auth
        $st = if ($r.Code -eq 200) { $j = Json $r.Body; if ($j) { [string]$j.'dam:assetState' } else { "" } } else { "" }
        if ($st -ne 'processed' -and $st -ne 'failed') { $later += $p; continue }
        if ($st -eq 'failed') { $failed++ }
        $m = $meta[$p]; $fields = @('_charset_', 'utf-8')
        if ($m) {
          foreach ($k in 'dc:title', 'dc:description', 'dc:source') { if ([string]$m.$k) { $fields += @($k, [string]$m.$k) } }
          $tags = @(([string]$m.'cq:tags {{String: multi}}').Split('|') | Where-Object { $_ })
          if ($tags.Count) { foreach ($t in $tags) { $fields += @('cq:tags', $t) }; $fields += @('cq:tags@TypeHint', 'String[]') }
        }
        if (-not $NoApprove) { $fields += @('dam:status', 'approved') }
        $mr = Http -Url "$A$p/jcr:content/metadata" -Auth -Method POST -Form $fields
        if ($mr.Code -lt 200 -or $mr.Code -ge 300) { throw "metadata ${p}: HTTP $($mr.Code)" }
        LogAdd $mlog $p; $n++
      }
      $pending = $later
      if (-not $pending.Count) { break }
      if ((Get-Date) -gt $deadline) { Say "$($pending.Count) assets still processing after $Wait minutes: run the script again later (it continues)"; break }
      Say "$($pending.Count) assets still processing, waiting 30 s"; Start-Sleep 30
    }
    Say ("4 metadata: {0} written{1}" -f $n, $(if ($failed) { ", $failed assets whose processing failed (check them in the Assets view)" } else { "" }))
    if ($pending.Count) { $code = 3 }
  }
} finally {
  Remove-Item -Force -ErrorAction SilentlyContinue $AuthFile
}
if ($code -eq 3) { Write-Host "Not finished: assets still processing. Run the same command again later."; exit 3 }

# 5. export the asset IDs (and the spot check)
if ($Step['5']) {
  $env:AEM_AUTHOR = $A; $env:AEM_TOKEN = $token
  $exportArgs = @{ Out = $State }
  if ($Batch) { $exportArgs.Batch = $Batch }
  if ("$env:DELIVERY_HOST") { $exportArgs.Check = 5 }
  & (Join-Path $Root "consolidated/tools/export-asset-ids.ps1") @exportArgs
  if ($LASTEXITCODE) { exit $LASTEXITCODE }
  Write-Host "Done. Next: aem-sites.ps1 (it reads $(Join-Path $State 'asset-ids.csv'))."
}
