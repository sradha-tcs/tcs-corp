<#
.SYNOPSIS
  AEM Sites, one command (Windows): builds the EDAM content packages and installs them on the Sites author.
  The PowerShell version of aem-sites.sh.

.DESCRIPTION
  1. build    the page packages 1.3.0 (consolidated\packages, below /content/tcs-corp/language-masters) rebuilt as
              1.3.0-edam in packages-for-edam-sites\content-packages: every reference to an asset (/content/dam/...)
              becomes its delivery URL on the Assets environment, from edam-state\asset-ids.csv (edam-assets.ps1)
                images                    https://<host>/adobe/assets/<asset id>/as/<file name>
                                          (with -Images media-bus also <field>MimeType: the media bus;
                                          -Images dynamic-media, the default: images too come from Dynamic Media)
                videos, audio, documents  https://<host>/adobe/assets/<asset id>/original/as/<file name>
              with INSTALL-ORDER.md, REWRITE-<batch>.csv (every reference) and REWRITE-SUMMARY.md; the sheets of
              consolidated\sheets with their asset cells rewritten the same way in content-packages\sheets\
  2. install  the built packages on the Sites author with Package Manager, in the installation order
  A package with a reference whose asset has no ID isn't built or installed (listed at the end, exit 4): upload
  the missing assets with edam-assets.ps1 and run again. Resumable: installed packages are recorded in
  content-packages\install-progress-<fingerprint of the author>.log (the same log as install-packages.ps1).
  Nothing is hard-coded: $env:SITES_AUTHOR is the Sites author URL; $env:SITES_TOKEN an access token (asked for,
  hidden, when not set); $env:DELIVERY_HOST the delivery host (decision E-D2).
  Works with Windows PowerShell 5.1 and PowerShell 7; uses curl.exe (Windows 10 1803 and later, Windows 11).

.EXAMPLE
  $env:SITES_AUTHOR = "https://author-p<program>-e<environment>.adobeaemcloud.com"
  $env:DELIVERY_HOST = "<delivery host>"
  powershell -ExecutionPolicy Bypass -File aem-sites.ps1 -Batch B001
  powershell -ExecutionPolicy Bypass -File aem-sites.ps1
#>
param(
  [string]$Batch = "",
  [string]$Ids = "",
  [ValidateSet("media-bus", "dynamic-media")][string]$Images = "dynamic-media",
  [switch]$AllowUnresolved,
  [switch]$Reinstall,
  [string]$Steps = "1,2"
)
$ErrorActionPreference = "Stop"
$Root = $PSScriptRoot
$Step = @{}; $Steps.Split(',') | ForEach-Object { $Step[$_.Trim()] = $true }
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$Source = '1.3.0'; $Version = '1.3.0-edam'
$Inv = [Globalization.CultureInfo]::InvariantCulture
$utf8 = New-Object System.Text.UTF8Encoding($false)
if (-not $Ids) { $Ids = Join-Path $Root "edam-state/asset-ids.csv" }
$Out = Join-Path $Root "packages-for-edam-sites/content-packages"; New-Item -ItemType Directory -Force -Path $Out | Out-Null
$State = Join-Path $Root "edam-state"; New-Item -ItemType Directory -Force -Path $State | Out-Null
if ($Step['1']) {
  if (-not "$env:DELIVERY_HOST") { Write-Host 'Set the delivery host first (decision E-D2): $env:DELIVERY_HOST = "<custom delivery domain or delivery-p...-e....adobeaemcloud.com>"'; exit 2 }
  if (-not (Test-Path $Ids)) { Write-Host "No $Ids : run edam-assets.ps1 first (or pass -Ids)"; exit 2 }
}
$A = "$env:SITES_AUTHOR".TrimEnd('/')
$token = ""
if ($Step['2']) {
  if (-not $A) { Write-Host 'Set the Sites author first: $env:SITES_AUTHOR = "https://author-p...-e....adobeaemcloud.com"'; exit 2 }
  $token = "$env:SITES_TOKEN"
  if (-not $token) {
    $secure = Read-Host "Access token for $A (input hidden)" -AsSecureString
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    $token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
  if (-not $token) { Write-Host "No token"; exit 2 }
}
$curl = Get-Command curl.exe -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $curl) { $curl = Get-Command curl -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1 }
if ($Step['2'] -and -not $curl) { Write-Host "curl.exe not found (Windows 10 1803 or later includes it)"; exit 2 }
# the token goes to curl in a config file (not on the command line); removed at the end
$AuthFile = Join-Path $State ".auth-sites"

function Say($m) { Write-Host ("{0} {1}" -f (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ"), $m) }
function MB($bytes) { ($bytes / 1048576).ToString('0.0', $Inv) }
function CsvField($v) { if ($v -match '[",\r\n]') { '"' + $v.Replace('"', '""') + '"' } else { $v } }

# the page packages of the installation order (consolidated\packages\INSTALL-ORDER.md: | # | Batch | Package | MB |)
$order = foreach ($line in Get-Content (Join-Path $Root "consolidated/packages/INSTALL-ORDER.md")) {
  if ($line -match '^\| \d+ \|') {
    $c = $line.Split('|') | ForEach-Object { $_.Trim() }
    if ($c[3] -like '*-assets-*') { continue }
    $src = $c[3] -replace '-[\d.]+\.zip$', "-$Source.zip"
    [pscustomobject]@{ Batch = $c[2]; Src = $src; Name = ($src -replace ([regex]::Escape("-$Source.zip") + '$'), "-$Version.zip") }
  }
}
$sel = @($order | Where-Object { $_.Batch.StartsWith($Batch) })
if (-not $sel.Count) { Write-Host "No page packages for `"$Batch`""; exit 2 }
$blocked = @{}

$exitCode = 0
try {
  # 1. build
  if ($Step['1']) {
    $hostUrl = "$env:DELIVERY_HOST".TrimEnd('/')
    if ($hostUrl -notmatch '^https?://') { $hostUrl = "https://$hostUrl" }
    $idmap = @{}
    Import-Csv -Encoding UTF8 $Ids | ForEach-Object { if ($_.asset_id) { $idmap[$_.path] = $_ } }
    Say ("build: {0} page packages{1} | {2} asset IDs | delivery host {3} | images {4}" -f $sel.Count, $(if ($Batch) { " (batch $Batch)" } else { "" }), $idmap.Count, $hostUrl, $Images)
    $Img = @{ jpg = 'image/jpeg'; jpeg = 'image/jpeg'; png = 'image/png'; gif = 'image/gif'; webp = 'image/webp'; svg = 'image/svg+xml' }
    # @{ Url; Mime; Img } of a DAM path, or $null without an asset ID
    function UrlOf($path) {
      $id = $idmap[$path]; if (-not $id) { return $null }
      $name = $path.Substring($path.LastIndexOf('/') + 1)
      $ext = if ($name.Contains('.')) { $name.Substring($name.LastIndexOf('.') + 1).ToLower() } else { '' }
      $mime = if ($id.mime) { $id.mime } elseif ($Img.ContainsKey($ext)) { $Img[$ext] } else { '' }
      $isImg = $mime.StartsWith('image/') -or $Img.ContainsKey($ext)
      $url = if ($isImg) { "$hostUrl/adobe/assets/$($id.asset_id)/as/$name" } else { "$hostUrl/adobe/assets/$($id.asset_id)/original/as/$name" }
      return @{ Url = $url; Mime = $mime; Img = $isImg }
    }
    $attrRx = New-Object regex '(\s)([A-Za-z_][\w:.-]*)="(/content/dam/[^"#?]+)((?:[#?][^"]*)?)"'
    $richRx = New-Object regex '(&quot;)(/content/dam/[^&#?]+)((?:[#?][^&]*)?)(&quot;)'
    $nameRx = New-Object regex '\s([A-Za-z_][\w:.-]*)="'
    $summary = New-Object System.Collections.Generic.List[string]
    foreach ($p in $sel) {
      $src = Join-Path $Root ("consolidated/packages/" + $p.Src)
      if (-not (Test-Path $src)) { $src = Join-Path $Root ("packages/" + $p.Batch + "/" + $p.Src) }
      if (-not (Test-Path $src)) { throw "page package not found: $($p.Src)" }
      $dest = Join-Path $Out $p.Name
      $part = "$dest.part"
      if (Test-Path $part) { Remove-Item -Force $part }
      $log = New-Object System.Collections.Generic.List[object]
      $zin = [IO.Compression.ZipFile]::OpenRead($src)
      $zout = [IO.Compression.ZipFile]::Open($part, 'Create')
      try {
        foreach ($e in $zin.Entries) {
          if ($e.FullName.EndsWith('/')) { $d = $zout.CreateEntry($e.FullName); $d.LastWriteTime = $e.LastWriteTime; continue }
          $ms = New-Object IO.MemoryStream
          $s = $e.Open(); try { $s.CopyTo($ms) } finally { $s.Dispose() }
          $data = $ms.ToArray()
          if ($e.FullName -eq 'META-INF/vault/properties.xml') {
            $t = $utf8.GetString($data)
            $desc = "TCS Corporate Website migration (URLMapping_Final_All_Levels.csv), batch $($p.Batch), EDAM set-up: the pages at the workbook's " +
              'target paths; their assets are on the separate AEM Assets environment and referenced by delivery URL (no assets in this package). ' +
              'Each page has its own filter (the page and its content only): nothing else in AEM changes.'
            $t = [regex]::Replace($t, '<entry key="version">[^<]*</entry>', { param($m) "<entry key=`"version`">$Version</entry>" })
            $t = [regex]::Replace($t, '<entry key="description">[^<]*</entry>', { param($m) "<entry key=`"description`">$desc</entry>" })
            $data = $utf8.GetBytes($t)
          } elseif ($e.FullName.StartsWith('jcr_root/') -and $e.FullName.EndsWith('.content.xml')) {
            $page = '/' + $e.FullName.Substring('jcr_root/'.Length, $e.FullName.Length - 'jcr_root/'.Length - '/.content.xml'.Length).Replace('_jcr_content', 'jcr:content')
            $t = $utf8.GetString($data)
            $existing = New-Object 'System.Collections.Generic.HashSet[string]'
            foreach ($m in $nameRx.Matches($t)) { [void]$existing.Add($m.Groups[1].Value) }
            $t = $attrRx.Replace($t, [Text.RegularExpressions.MatchEvaluator] {
                param($m)
                $prop = $m.Groups[2].Value; $path = $m.Groups[3].Value
                $u = UrlOf $path
                if (-not $u) { $log.Add(@($page, $prop, $path, 'UNRESOLVED')); return $m.Value }
                $log.Add(@($page, $prop, $path, $u.Url))
                $extra = if ($u.Img -and $Images -eq 'media-bus' -and $prop -cne 'fileReference' -and -not $existing.Contains("${prop}MimeType")) { " ${prop}MimeType=`"$($u.Mime)`"" } else { '' }
                return "$($m.Groups[1].Value)$prop=`"$($u.Url)$($m.Groups[4].Value)`"$extra"
              })
            $t = $richRx.Replace($t, [Text.RegularExpressions.MatchEvaluator] {
                param($m)
                $path = $m.Groups[2].Value
                $u = UrlOf $path
                if (-not $u) { $log.Add(@($page, 'rich text link', $path, 'UNRESOLVED')); return $m.Value }
                $log.Add(@($page, 'rich text link', $path, $u.Url))
                return "$($m.Groups[1].Value)$($u.Url)$($m.Groups[3].Value)$($m.Groups[4].Value)"
              })
            # still well-formed XML
            $doc = New-Object Xml.XmlDocument; $doc.XmlResolver = $null; $doc.LoadXml($t.TrimStart([char]0xFEFF))
            $data = $utf8.GetBytes($t)
          }
          $ne = $zout.CreateEntry($e.FullName, [IO.Compression.CompressionLevel]::Optimal)
          $ne.LastWriteTime = $e.LastWriteTime
          $w = $ne.Open(); try { $w.Write($data, 0, $data.Length) } finally { $w.Dispose() }
        }
      } finally { $zout.Dispose(); $zin.Dispose() }
      $unres = @($log | Where-Object { $_[3] -eq 'UNRESOLVED' })
      $na = @($log | Where-Object { $_[3] -ne 'UNRESOLVED' -and $idmap[$_[2]].status -ne 'approved' } | ForEach-Object { $_[2] } | Sort-Object -Unique)
      if ($unres.Count -and -not $AllowUnresolved) {
        $miss = @($unres | ForEach-Object { $_[2] } | Sort-Object -Unique)
        $blocked[$p.Name] = $miss.Count
        Remove-Item -Force $part
        if (Test-Path $dest) { Remove-Item -Force $dest }
        Say ("{0}: not built, {1} assets without an ID (first: {2})" -f $p.Batch, $miss.Count, $unres[0][2])
        $size = 'not built'
      } else {
        Move-Item -Force $part $dest
        Say ("{0}: {1} references, {2} rewritten, {3} unresolved, {4} assets not approved yet -> {5}" -f $p.Batch, $log.Count, ($log.Count - $unres.Count), $unres.Count, $na.Count, $p.Name)
        $size = MB (Get-Item $dest).Length
      }
      $csv = New-Object System.Text.StringBuilder
      [void]$csv.Append("page,property,dam path,delivery url`n")
      foreach ($l in $log) { [void]$csv.Append((($l | ForEach-Object { CsvField $_ }) -join ',') + "`n") }
      [IO.File]::WriteAllText((Join-Path $Out "REWRITE-$($p.Batch).csv"), $csv.ToString(), $utf8)
      $summary.Add("| $($p.Batch) | $($p.Name) | $($log.Count) | $($unres.Count) | $($na.Count) | $size |")
    }
    # installation order of the packages in the folder (every batch built so far)
    $md = New-Object System.Collections.Generic.List[string]
    $md.AddRange([string[]]@('# Installation order (EDAM content packages)', '',
        'Install on the **Sites author** with `aem-sites.sh` / `aem-sites.ps1` (or Package Manager), after the batch''s assets are on the',
        'Assets environment and approved (`edam-assets.sh` / `edam-assets.ps1`), and once the site code for EDAM assets is deployed.', '',
        '| # | Batch | Package | MB |', '|---|---|---|---|'))
    $i = 0
    foreach ($r in $order) { $f = Join-Path $Out $r.Name; if (Test-Path $f) { $i++; $md.Add("| $i | $($r.Batch) | $($r.Name) | $(MB (Get-Item $f).Length) |") } }
    [IO.File]::WriteAllText((Join-Path $Out "INSTALL-ORDER.md"), (($md -join "`n") + "`n"), $utf8)
    $s = @('# Rewrite summary', '', "Delivery host: ``$hostUrl`` | images: $Images | asset IDs: ``$(Split-Path $Ids -Leaf)`` ($($idmap.Count) assets)", '',
      '| Batch | Package | References | Unresolved (no asset ID) | Assets not approved yet | MB |', '|---|---|---|---|---|---|') + $summary
    [IO.File]::WriteAllText((Join-Path $Out "REWRITE-SUMMARY.md"), (($s -join "`n") + "`n"), $utf8)
    # the sheets: a cell that is a DAM path with an asset ID becomes its delivery URL (e.g. an author image)
    $sheetDir = Join-Path $Out "sheets"; New-Item -ItemType Directory -Force -Path $sheetDir | Out-Null
    $script:cells = 0
    $cellRx = New-Object regex '(?m)(^|,)("?)(/content/dam/[^",\r\n]+)\2(?=,|\r?$)'
    foreach ($sf in Get-ChildItem -Path (Join-Path $Root "consolidated/sheets") -Filter *.csv) {
      $t = [IO.File]::ReadAllText($sf.FullName, $utf8)
      $t = $cellRx.Replace($t, [Text.RegularExpressions.MatchEvaluator] {
          param($m)
          $u = UrlOf $m.Groups[3].Value
          if (-not $u) { return $m.Value }
          $script:cells++
          return "$($m.Groups[1].Value)$($m.Groups[2].Value)$($u.Url)$($m.Groups[2].Value)"
        })
      [IO.File]::WriteAllText((Join-Path $sheetDir $sf.Name), $t, $utf8)
    }
    Say "sheets: $($script:cells) asset cells rewritten -> content-packages/sheets/ (replace the sheets on the author with them)"
    Say ("1 build: {0} built, {1} not built (assets without an ID)" -f ($summary.Count - $blocked.Count), $blocked.Count)
  }

  # 2. install (Package Manager: upload and install, three tries per package)
  if ($Step['2']) {
    [IO.File]::WriteAllText($AuthFile, "header = `"Authorization: Bearer $token`"`n", $utf8)
    $curlExe = $curl.Source
    $service = "$A/crx/packmgr/service.jsp"
    $nullDev = if ($env:OS -eq "Windows_NT") { "NUL" } else { "/dev/null" }
    $code = & $curlExe -s -o $nullDev -w "%{http_code}" -K $AuthFile "$($service)?cmd=ls"
    if ($code -ne "200") { throw "Package Manager answers $code : check SITES_AUTHOR, the token and the user's permissions" }
    # one progress log per AEM environment, named after a fingerprint of the author (never its program or environment id)
    $sha = [Security.Cryptography.SHA1]::Create()
    $fp = ([BitConverter]::ToString($sha.ComputeHash($utf8.GetBytes($A))) -replace '-', '').ToLower().Substring(0, 8)
    $plog = Join-Path $Out "install-progress-$fp.log"
    $done = @{}
    if (-not $Reinstall -and (Test-Path $plog)) { Get-Content $plog | ForEach-Object { if ($_.Trim()) { $done[$_.Trim()] = $true } } }
    Say "install: progress log install-progress-$fp.log"
    $n = 0; $had = 0; $missing = 0
    foreach ($p in $sel) {
      if ($blocked.ContainsKey($p.Name)) { continue }
      $f = Join-Path $Out $p.Name
      if (-not (Test-Path $f)) { $missing++; Say "$($p.Batch): $($p.Name) not built (run step 1)"; continue }
      if ($done[$p.Name]) { $had++; continue }
      # a batch without migrated pages (B004) has a package without content, which Package Manager refuses
      $zc = [IO.Compression.ZipFile]::OpenRead($f)
      try { $hasContent = @($zc.Entries | Where-Object { $_.FullName.StartsWith('jcr_root/') }).Count -gt 0 } finally { $zc.Dispose() }
      if (-not $hasContent) { Say "$($p.Batch): $($p.Name) has no content (no pages migrated), skipped"; [IO.File]::AppendAllText($plog, "$($p.Name)`n", $utf8); continue }
      $ok = $false
      for ($try = 1; $try -le 3; $try++) {
        Say ("{0} {1} ({2} MB), try {3}" -f $p.Batch, $p.Name, (MB (Get-Item $f).Length), $try)
        $res = (& $curlExe -sS --max-time 3600 -K $AuthFile -F "file=@$f" -F "name=$([IO.Path]::GetFileNameWithoutExtension($p.Name))" -F "force=true" -F "install=true" $service 2>&1) -join "`n"
        if ($LASTEXITCODE -eq 0 -and $res -match 'code="200"') { $ok = $true; break }
        ($res -split "`n" | Select-Object -Last 5) -join "`n" | Write-Host
        if ($try -lt 3) { Start-Sleep -Seconds 20 }
      }
      if (-not $ok) { throw "$($p.Name) not installed: stopped (run again to continue from here)" }
      [IO.File]::AppendAllText($plog, "$($p.Name)`n", $utf8)
      $n++
    }
    Say ("2 install: {0} installed, {1} installed before{2}" -f $n, $had, $(if ($missing) { ", $missing not built" } else { "" }))
  }
  if ($blocked.Count) {
    Say "$($blocked.Count) packages not built or installed, their assets have no ID yet: run edam-assets.ps1 for them, then this script again"
    foreach ($k in ($blocked.Keys | Sort-Object)) { Say "  $k ($($blocked[$k]) assets)" }
    $exitCode = 4
  }
} catch {
  Write-Host $_.Exception.Message
  $exitCode = 1
} finally {
  Remove-Item -Force -ErrorAction SilentlyContinue $AuthFile
}
if ($exitCode -eq 0) { Write-Host "Done. Check the pages in Universal Editor and on the preview (the images load from the delivery host)." }
exit $exitCode
