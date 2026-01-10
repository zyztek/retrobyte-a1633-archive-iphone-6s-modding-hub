export interface ScriptOptions {
  installDrivers: boolean;
  installiTunes: boolean;
  downloadPaler1n: boolean;
  downloadCheckra1n: boolean;
  fetchIPSW: boolean;
  backupDevice: boolean;
}
export function generatePowerShellScript(options: ScriptOptions): string {
  let script = `# RetroByte A1633 - Auto-Modding Setup Script
# Run this in PowerShell as Administrator
Write-Host "Initializing RetroByte A1633 Environment..." -ForegroundColor Green
$ErrorActionPreference = "Stop"
# Ensure directories exist
$modPath = "$HOME\\Desktop\\A1633_Modding"
if (!(Test-Path $modPath)) {
    New-Item -ItemType Directory -Path $modPath
}
Set-Location $modPath
`;
  if (options.installiTunes) {
    script += `Write-Host "[+] Installing iTunes (x64) via Winget..." -ForegroundColor Cyan
winget install Apple.iTunes --silent
\n`;
  }
  if (options.installDrivers) {
    script += `Write-Host "[+] Fetching USBDK Drivers..." -ForegroundColor Cyan
Invoke-WebRequest -Uri "https://github.com/daynix/UsbDk/releases/download/v1.00-22/UsbDk_1.0.22_x64.msi" -OutFile "UsbDk_Installer.msi"
Start-Process msiexec.exe -ArgumentList "/i UsbDk_Installer.msi /quiet" -Wait
\n`;
  }
  if (options.downloadPaler1n) {
    script += `Write-Host "[+] Downloading Paler1n (Windows CLI)..." -ForegroundColor Cyan
Invoke-WebRequest -Uri "https://github.com/palera1n/palera1n/releases/latest/download/palera1n-v2.0.0-beta.7-windows-x86_64.exe" -OutFile "paler1n.exe"
\n`;
  }
  if (options.downloadCheckra1n) {
    script += `Write-Host "[+] Note: Checkra1n usually requires Linux/MacOS. Suggesting Rufus for bootable ISO..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "https://github.com/pbatard/rufus/releases/download/v4.4/rufus-4.4.exe" -OutFile "rufus.exe"
\n`;
  }
  if (options.fetchIPSW) {
    script += `Write-Host "[+] Fetching latest iOS 15.8.3 IPSW for iPhone 6s..." -ForegroundColor Cyan
# URL for iPhone8,1 (6s) 15.8.3
Invoke-WebRequest -Uri "https://secure-appldnld.apple.com/itunes000/052-52061-20240805-4B8C3E5A-5B8B-4B8C-9B8C-5B8B4B8C9B8C/iPhone8,1_15.8.3_19H386_Restore.ipsw" -OutFile "iPhone6s_15.8.3.ipsw"
\n`;
  }
  script += `Write-Host "Setup Complete. Files located in: $modPath" -ForegroundColor Green
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")`;
  return script;
}