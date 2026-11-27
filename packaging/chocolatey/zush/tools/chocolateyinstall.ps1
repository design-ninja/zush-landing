$ErrorActionPreference = 'Stop'

$packageName = $env:ChocolateyPackageName
$toolsDir    = Split-Path -Parent $MyInvocation.MyCommand.Definition
$appDir      = Join-Path $toolsDir 'app'

$urlX64      = 'https://github.com/design-ninja/zush-windows-releases/releases/download/v3.19.8.0/zush-3.19.8.0-win-x64.zip'
$checksumX64 = '108A947C572DD2F80FB9C2B3E7406FD3E774F348FF76877C4AB35CC6E1F89BD5'
$urlArm64      = 'https://github.com/design-ninja/zush-windows-releases/releases/download/v3.19.8.0/zush-3.19.8.0-win-arm64.zip'
$checksumArm64 = '322AAE7561C7E3EC6AA9723AD02EA5762AD917A4E319BD7E7C961049F19F9CEF'

$osBuild = [Environment]::OSVersion.Version.Build
if ($osBuild -lt 19041) {
  throw "Zush requires Windows 10 version 2004 (build 19041) or later. This system is build $osBuild."
}

# choco.exe runs as an x64 process under emulation on ARM64 Windows, where both the process
# environment and .NET Framework report AMD64. The machine-wide value in the registry is native.
$nativeArch = (Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Environment' -Name PROCESSOR_ARCHITECTURE -ErrorAction SilentlyContinue).PROCESSOR_ARCHITECTURE
$isArm64 = $nativeArch -eq 'ARM64'

if ($isArm64) { $url = $urlArm64; $checksum = $checksumArm64 } else { $url = $urlX64; $checksum = $checksumX64 }

Install-ChocolateyZipPackage -PackageName $packageName `
  -Url64bit $url -Checksum64 $checksum -ChecksumType64 'sha256' `
  -UnzipLocation $appDir

# Do not shim every exe in the archive (crash dump writers, restart agent, audio fingerprint helper).
Get-ChildItem -Path $appDir -Recurse -Filter '*.exe' | ForEach-Object {
  New-Item -Path "$($_.FullName).ignore" -ItemType File -Force | Out-Null
}

$appExe = Join-Path $appDir 'Zush.Windows.App.exe'

# The app is a .NET apphost: it must start from its own folder, which a shim does.
Install-BinFile -Name 'zush' -Path $appExe -UseStart

if (Test-ProcessAdminRights) {
  $startMenu = [Environment]::GetFolderPath('CommonPrograms')
} else {
  $startMenu = [Environment]::GetFolderPath('Programs')
}
Install-ChocolateyShortcut -ShortcutFilePath (Join-Path $startMenu 'Zush.lnk') `
  -TargetPath $appExe -WorkingDirectory $appDir -Description 'Zush - AI file renamer'
