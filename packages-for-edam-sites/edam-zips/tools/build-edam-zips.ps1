<#
.SYNOPSIS
  Builds the EDAM zips on your machine from the 1.2.0 asset packages (no download of the 22 GB again).
  The PowerShell version of build-edam-zips.sh.

.DESCRIPTION
  One EDAM zip per asset package, holding only the asset files at their DAM paths below /content/dam
  (tcs-corp/<images|videos|audio|documents>/<L1>/<L2>/<file>), named tcs-corp-edam-<batch>-<NN>.zip as listed in
  ..\EDAM-ZIPS.md. Resumable: a zip already built is skipped (-Force rebuilds it). Works with Windows
  PowerShell 5.1 and PowerShell 7; nothing to install.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File build-edam-zips.ps1 -Batch B001
  powershell -ExecutionPolicy Bypass -File build-edam-zips.ps1
#>
param(
  [string]$Batch = "",
  [string]$Packages = "",
  [string]$Out = "",
  [switch]$Force
)
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$root = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))
if (-not $Packages) {
  $Packages = Join-Path (Join-Path $root "consolidated") "packages"
  if (-not (Test-Path $Packages)) { $Packages = Join-Path $root "packages" }
}
if (-not $Out) { $Out = Join-Path (Split-Path -Parent $PSScriptRoot) "zips" }
New-Item -ItemType Directory -Force -Path $Out | Out-Null
$Out = (Resolve-Path $Out).Path

$list = @(Get-ChildItem -Path $Packages -Recurse -File -Filter "tcs-corp-ema-$Batch*-assets-*-1.2.0.zip" | Sort-Object { $_.Name } -Culture "")
if (-not $list.Count) { Write-Host "No asset packages in $Packages"; exit 1 }
$stamp = New-Object DateTimeOffset (1980, 1, 1, 0, 0, 0, [TimeSpan]::Zero)
$n = 0; $built = 0
foreach ($f in $list) {
  if ($f.Name -notmatch '^tcs-corp-ema-(.+)-assets-(\d+)-1\.2\.0\.zip$') { continue }
  $dest = Join-Path $Out ("tcs-corp-edam-{0}-{1}.zip" -f $Matches[1], $Matches[2])
  $n++
  if ((Test-Path $dest) -and -not $Force) { continue }
  Write-Host ("{0} {1} -> {2}" -f (Get-Date).ToUniversalTime().ToString("s"), $f.Name, (Split-Path $dest -Leaf))
  $part = "$dest.part"
  if (Test-Path $part) { Remove-Item $part }
  $src = [IO.Compression.ZipFile]::OpenRead($f.FullName)
  $zip = [IO.Compression.ZipFile]::Open($part, [IO.Compression.ZipArchiveMode]::Create)
  try {
    # the asset files: <asset>/_jcr_content/renditions/original, stored at the asset's path
    foreach ($e in $src.Entries) {
      if ($e.FullName -match '^jcr_root/content/dam/(.+?)/_jcr_content/renditions/original$') {
        $entry = $zip.CreateEntry($Matches[1], [IO.Compression.CompressionLevel]::NoCompression)
        $entry.LastWriteTime = $stamp
        $in = $e.Open(); $outStream = $entry.Open()
        try { $in.CopyTo($outStream) } finally { $outStream.Dispose(); $in.Dispose() }
      }
    }
  } finally { $zip.Dispose(); $src.Dispose() }
  Move-Item -Force $part $dest
  $built++
}
Write-Host "EDAM zips: $n for the selection, $built built now, in $Out"
