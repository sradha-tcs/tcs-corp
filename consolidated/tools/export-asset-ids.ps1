<#
.SYNOPSIS
  Exports the asset IDs of the migrated assets from the AEM Assets environment (EDAM), after the asset
  packages are installed there. The PowerShell version of export-asset-ids.sh.

.DESCRIPTION
  For every asset below /content/dam/tcs-corp: its DAM path, asset ID (urn:aaid:aem:<jcr:uuid>), MIME type
  and approval status, compared with expected-assets.csv (every asset the packages install). Writes
  asset-ids.csv and asset-ids-report.txt; the page packages are rebuilt from asset-ids.csv (version 1.3.0).
  Works with Windows PowerShell 5.1 and PowerShell 7.

  Nothing is hard-coded: AEM_AUTHOR is the Assets environment's author URL, AEM_TOKEN an access token of a
  user who may read /content/dam/tcs-corp (asked for, input hidden, when not set); DELIVERY_HOST (optional,
  for -Check) the delivery host or custom delivery domain. Never put the token in a file.

.EXAMPLE
  $env:AEM_AUTHOR = "https://author-p<program>-e<environment>.adobeaemcloud.com"
  powershell -ExecutionPolicy Bypass -File tools\export-asset-ids.ps1
  powershell -ExecutionPolicy Bypass -File tools\export-asset-ids.ps1 -Check 5
#>
param(
  [string]$Out = "",
  [int]$Check = 0
)
$ErrorActionPreference = "Stop"
$here = $PSScriptRoot
if (-not $Out) { $Out = $here }
$expected = Join-Path $here "expected-assets.csv"
if (-not (Test-Path $expected)) { Write-Host "No $expected"; exit 2 }

$author = "$env:AEM_AUTHOR".TrimEnd('/')
if (-not $author) { Write-Host 'Set the Assets author first: $env:AEM_AUTHOR = "https://author-p...-e....adobeaemcloud.com"'; exit 2 }
$token = "$env:AEM_TOKEN"
if (-not $token) {
  $secure = Read-Host "Access token for $author (input hidden)" -AsSecureString
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  $token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
}
$headers = @{ Authorization = "Bearer $token" }
$root = "/content/dam/tcs-corp"
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

function Get-Json([string]$url) {
  for ($try = 1; $try -le 3; $try++) {
    try { return Invoke-RestMethod -Uri $url -Headers $headers -TimeoutSec 300 -UseBasicParsing }
    catch { if ($try -eq 3) { throw } ; Start-Sleep -Seconds 10 }
  }
}

try { Get-Json "$author/bin/querybuilder.json?path=$root&p.limit=1" | Out-Null }
catch { Write-Host "The author refuses the query ($($_.Exception.Message)): check AEM_AUTHOR, the token and the user's read access to $root"; exit 1 }

# one query per folder and kind, 500 hits a page, in path order
$ids = @{}; $status = @{}; $mime = @{}
foreach ($kind in "assets", "metadata") {
  foreach ($t in "images", "videos", "audio", "documents") {
    $off = 0
    while ($true) {
      if ($kind -eq "assets") { $q = "type=dam:Asset&p.properties=jcr:path%20jcr:uuid" }
      else { $q = "type=nt:unstructured&nodename=metadata&p.properties=jcr:path%20dam:status%20dc:format" }
      $d = Get-Json "$author/bin/querybuilder.json?path=$root/$t&$q&orderby=path&p.hits=selective&p.limit=500&p.offset=$off"
      foreach ($h in @($d.hits)) {
        $p = $h.'jcr:path'
        if ($kind -eq "assets") { $ids[$p] = "$($h.'jcr:uuid')" }
        elseif ($p -like "*/jcr:content/metadata") {
          $a = $p.Substring(0, $p.Length - "/jcr:content/metadata".Length)
          $status[$a] = "$($h.'dam:status')"; $mime[$a] = "$($h.'dc:format')"
        }
      }
      $n = @($d.hits).Count
      Write-Host ("{0,-9} {1,-10} {2,6}" -f $kind, $t, ($off + $n))
      if ($n -lt 500) { break }
      $off += 500
    }
  }
}

# merge: asset-ids.csv (expected assets first, then the other assets found) and the report
$rows = New-Object System.Collections.Generic.List[string]
$rows.Add("path,asset_id,mime,status,batch")
$want = @{}; $missing = New-Object System.Collections.Generic.List[string]; $noid = New-Object System.Collections.Generic.List[string]
$approved = 0; $notApproved = 0
foreach ($line in (Get-Content $expected | Select-Object -Skip 1)) {
  if (-not $line) { continue }
  $f = $line.Split(','); $p = $f[0]; $b = $f[1]; $want[$p] = $true
  if (-not $ids.ContainsKey($p)) { $missing.Add("$p,$b"); continue }
  if (-not $ids[$p]) { $noid.Add($p) }
  $s = "$($status[$p])"
  if ($s -eq "approved") { $approved++ } else { $notApproved++ }
  $id = if ($ids[$p]) { "urn:aaid:aem:$($ids[$p])" } else { "" }
  $rows.Add("$p,$id,$($mime[$p]),$s,$b")
}
[string[]]$extra = @($ids.Keys | Where-Object { -not $want.ContainsKey($_) })
[Array]::Sort($extra, [StringComparer]::Ordinal)
foreach ($p in $extra) {
  $id = if ($ids[$p]) { "urn:aaid:aem:$($ids[$p])" } else { "" }
  $rows.Add("$p,$id,$($mime[$p]),$($status[$p]),")
}
$csv = Join-Path $Out "asset-ids.csv"
$report = Join-Path $Out "asset-ids-report.txt"
[IO.File]::WriteAllText($csv, (($rows -join "`n") + "`n"))
$n = $want.Count
$lines = @(
  "Asset ID export, $((Get-Date).ToUniversalTime().ToString('ddd MMM d HH:mm:ss yyyy', [Globalization.CultureInfo]::InvariantCulture)) UTC", "",
  "Expected (installed by the asset packages): $n",
  "Found with an asset ID: $($n - $missing.Count - $noid.Count)",
  "Missing (not installed): $($missing.Count)",
  "Without an asset ID: $($noid.Count)",
  "Approved: $approved",
  "Not approved yet: $notApproved",
  "Other assets below the folder (not from the packages): $($extra.Count)")
if ($missing.Count) { $lines += @("", "Missing (path,batch):") + $missing }
if ($noid.Count) { $lines += @("", "Without an asset ID:") + $noid }
[IO.File]::WriteAllText($report, (($lines -join "`n") + "`n"))
$lines[2..8] | Write-Host
Write-Host "written: $csv, $report"

# spot check: approved images on the delivery tier
if ($Check -gt 0) {
  $dh = "$env:DELIVERY_HOST".TrimEnd('/')
  if (-not $dh) { Write-Host "-Check needs DELIVERY_HOST"; exit 2 }
  if ($dh -notmatch '^https?://') { $dh = "https://$dh" }
  $rows | Select-Object -Skip 1 | Where-Object { $_ -match ',image/[a-z]+,approved,' } | Select-Object -First $Check | ForEach-Object {
    $f = $_.Split(','); $u = "$dh/adobe/assets/$($f[1])/as/$($f[0].Substring($f[0].LastIndexOf('/') + 1))"
    try { $r = Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -TimeoutSec 60; $c = [int]$r.StatusCode }
    catch { $c = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 } }
    Write-Host "$c $u"
  }
}
