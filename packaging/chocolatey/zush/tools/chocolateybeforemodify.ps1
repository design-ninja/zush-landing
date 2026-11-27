$ErrorActionPreference = 'Stop'

# Close Zush if it runs from this package, so upgrade and uninstall can replace its files.
$toolsDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$appDir   = Join-Path $toolsDir 'app'

Get-Process -ErrorAction SilentlyContinue | Where-Object {
  $_.Path -and $_.Path.StartsWith($appDir, [StringComparison]::OrdinalIgnoreCase)
} | ForEach-Object {
  Write-Host "Closing $($_.ProcessName) (PID $($_.Id))"
  Stop-Process -Id $_.Id -Force
}
