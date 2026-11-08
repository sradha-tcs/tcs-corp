<#
.SYNOPSIS
  Uploads and installs the migration packages on AEM author, one after the other, in the order of
  packages\INSTALL-ORDER.md (per batch its asset packages, then its page package), through the
  Package Manager HTTP service (/crx/packmgr/service.jsp). The PowerShell version of install-packages.sh.

.DESCRIPTION
  Resumable: every package installed is recorded in packages\install-progress.log, and a rerun continues
  after the last one. A package that fails three times stops the run with the server's message.
  Works with Windows PowerShell 5.1 and PowerShell 7 (Windows, macOS, Linux); uploads with curl.exe
  (included in Windows 10 1803 and later and in Windows 11).

  Nothing is hard-coded: the author and the access token come from the environment
  (AEM_AUTHOR, AEM_TOKEN); when AEM_TOKEN isn't set, the script asks for it (input hidden).
  Never put the token in a file.

.EXAMPLE
  cd consolidated
  $env:AEM_AUTHOR = "https://author-p<program>-e<environment>.adobeaemcloud.com"
  powershell -ExecutionPolicy Bypass -File tools\install-packages.ps1 -DryRun
  powershell -ExecutionPolicy Bypass -File tools\install-packages.ps1 -To 3
  powershell -ExecutionPolicy Bypass -File tools\install-packages.ps1
  powershell -ExecutionPolicy Bypass -File tools\install-packages.ps1 -Only assets
#>
param(
  [int]$From = 1,
  [int]$To = 999999,
  [string]$Batch = "",
  [ValidateSet("", "assets", "pages")][string]$Only = "",
  [switch]$DryRun,
  [string]$PackageDir = ""
)
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

if (-not $PackageDir) { $PackageDir = Join-Path (Split-Path -Parent $PSScriptRoot) "packages" }
$order = Join-Path $PackageDir "INSTALL-ORDER.md"
$log = Join-Path $PackageDir "install-progress.log"
if (-not (Test-Path $order)) { Write-Host "No $order"; exit 2 }

# the order table: | # | Batch | Package | MB |
$rows = foreach ($line in Get-Content $order) {
  if ($line -match '^\|\s*(\d+)\s*\|\s*(\S+)\s*\|\s*(\S+\.zip)\s*\|\s*([\d.]+)\s*\|') {
    [pscustomobject]@{ N = [int]$Matches[1]; Batch = $Matches[2]; Name = $Matches[3]; MB = $Matches[4] }
  }
}
$rows = $rows | Where-Object { $_.N -ge $From -and $_.N -le $To -and ($Batch -eq "" -or $_.Batch.StartsWith($Batch)) }
# -Only assets: the asset packages only (e.g. for a separate AEM Assets environment); -Only pages: the page packages only
if ($Only -eq "assets") { $rows = $rows | Where-Object { $_.Name -like "*-assets-*" } }
if ($Only -eq "pages") { $rows = $rows | Where-Object { $_.Name -notlike "*-assets-*" } }

# one progress log per AEM environment (e.g. the Sites author and a separate Assets environment), named
# after a fingerprint of AEM_AUTHOR (the log never contains the program or environment id)
if ("$env:AEM_AUTHOR") {
  $sha = [Security.Cryptography.SHA1]::Create()
  $fp = ([BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes("$env:AEM_AUTHOR".TrimEnd('/')))) -replace '-', '').ToLower().Substring(0, 8)
  $log = Join-Path $PackageDir "install-progress-$fp.log"
  Write-Host "progress log: install-progress-$fp.log"
}
if (-not (Test-Path $log)) { New-Item -ItemType File -Path $log | Out-Null }
$done = @{}
Get-Content $log | ForEach-Object { if ($_) { $done[$_.Trim()] = $true } }

if ($DryRun) {
  foreach ($r in $rows) { if (-not $done[$r.Name]) { Write-Host ("#{0} {1} {2} ({3} MB)" -f $r.N, $r.Batch, $r.Name, $r.MB) } }
  exit 0
}

# curl.exe on Windows (not the PowerShell alias "curl"); curl elsewhere; the first one when there are several
$curl = Get-Command curl.exe -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $curl) { $curl = Get-Command curl -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1 }
if (-not $curl) { Write-Host "curl.exe not found (Windows 10 1803 or later includes it)"; exit 2 }
$curl = $curl.Source

$author = "$env:AEM_AUTHOR".TrimEnd('/')
if (-not $author) { Write-Host 'Set the author first: $env:AEM_AUTHOR = "https://author-p...-e....adobeaemcloud.com"'; exit 2 }
$token = "$env:AEM_TOKEN"
if (-not $token) {
  $secure = Read-Host "Access token for $author (input hidden)" -AsSecureString
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  $token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
}
$nullDev = if ($env:OS -eq "Windows_NT") { "NUL" } else { "/dev/null" }
$service = "$author/crx/packmgr/service.jsp"

# the token works and may use Package Manager
$code = & $curl -s -o $nullDev -w "%{http_code}" -H "Authorization: Bearer $token" "$($service)?cmd=ls"
if ($code -ne "200") { Write-Host "Package Manager answers $code : check AEM_AUTHOR, the token and the user's permissions"; exit 1 }

foreach ($r in $rows) {
  if ($done[$r.Name]) { continue }
  $file = Join-Path $PackageDir $r.Name
  if (-not (Test-Path $file)) { Write-Host "#$($r.N) missing file $($r.Name)"; exit 1 }
  # a batch whose rows weren't migrated (e.g. B004: the source page is gone) has a page package without
  # content, which Package Manager refuses ("Missing 'jcr_root'"): nothing to install
  $z = [IO.Compression.ZipFile]::OpenRead($file)
  try { $hasContent = @($z.Entries | Where-Object { $_.FullName.StartsWith('jcr_root/') }).Count -gt 0 } finally { $z.Dispose() }
  if (-not $hasContent) {
    Write-Host ("#{0} {1} {2}: no content in it (no pages migrated), skipped" -f $r.N, $r.Batch, $r.Name)
    Add-Content -Path $log -Value $r.Name
    $done[$r.Name] = $true
    continue
  }
  $ok = $false
  for ($try = 1; $try -le 3; $try++) {
    Write-Host ("{0} #{1} {2} {3} ({4} MB), try {5}" -f (Get-Date).ToUniversalTime().ToString("s"), $r.N, $r.Batch, $r.Name, $r.MB, $try)
    $out = (& $curl -sS --max-time 3600 -H "Authorization: Bearer $token" `
      -F "file=@$file" -F "name=$([IO.Path]::GetFileNameWithoutExtension($r.Name))" -F "force=true" -F "install=true" `
      $service 2>&1) -join "`n"
    if ($LASTEXITCODE -eq 0 -and $out -match 'code="200"') { $ok = $true; break }
    ($out -split "`n" | Select-Object -Last 5) -join "`n" | Write-Host
    Start-Sleep -Seconds 20
  }
  if (-not $ok) { Write-Host "#$($r.N) $($r.Name) not installed: stopped (rerun to continue from here)"; exit 1 }
  Add-Content -Path $log -Value $r.Name
  $done[$r.Name] = $true
}
Write-Host "All packages of the selection are installed."
