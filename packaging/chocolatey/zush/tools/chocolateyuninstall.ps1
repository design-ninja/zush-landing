$ErrorActionPreference = 'Stop'

$toolsDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Uninstall-BinFile -Name 'zush' -Path (Join-Path $toolsDir 'app\Zush.Windows.App.exe')

# The per-user Programs folder is empty when Chocolatey runs as SYSTEM, so skip blank paths.
foreach ($folder in @([Environment]::GetFolderPath('Programs'), [Environment]::GetFolderPath('CommonPrograms'))) {
  if ([string]::IsNullOrEmpty($folder)) { continue }
  $shortcut = Join-Path $folder 'Zush.lnk'
  if (Test-Path $shortcut) { Remove-Item $shortcut -Force }
}

# Chocolatey removes the unpacked app folder under tools\ itself.
