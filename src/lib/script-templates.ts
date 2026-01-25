export interface ScriptOptions {
  installDrivers: boolean;
  installiTunes: boolean;
  downloadPaler1n: boolean;
  downloadCheckra1n: boolean;
  fetchIPSW: boolean;
  backupDevice: boolean;
  genGitHubWorkflow: boolean;
  genDevContainer: boolean;
  includeReadmeGuides: boolean;
  setupCodespaceProxy: boolean;
}
export function generatePowerShellScript(options: ScriptOptions): string {
  let script = `# RetroByte A1633 - Auto-Modding Setup Script
# Run this in PowerShell as Administrator
$ErrorActionPreference = "Stop"
Write-Host "Initializing RetroByte A1633 Mainframe Environment..." -ForegroundColor Green
# Ensure root modding directory exists
$modPath = "$HOME\\Desktop\\A1633_Modding"
if (!(Test-Path $modPath)) {
    New-Item -ItemType Directory -Path $modPath
}
Set-Location $modPath
`;
  if (options.backupDevice) {
    script += `Write-Host "[+] Initializing Backup Directory..." -ForegroundColor Cyan
$backupPath = Join-Path $modPath "Backups"
if (!(Test-Path $backupPath)) {
    New-Item -ItemType Directory -Path $backupPath
}
Write-Host "    [!] Manual backup target: $backupPath" -ForegroundColor Yellow
\n`;
  }
  if (options.installiTunes) {
    script += `Write-Host "[+] Installing iTunes (x64) via Winget..." -ForegroundColor Cyan
try {
    winget install Apple.iTunes --silent --accept-package-agreements --accept-source-agreements
} catch {
    Write-Host "    [!] Winget failed to install iTunes. Please install manually." -ForegroundColor Red
}
\n`;
  }
  if (options.installDrivers) {
    script += `Write-Host "[+] Fetching USBDK Drivers..." -ForegroundColor Cyan
try {
    Invoke-WebRequest -Uri "https://github.com/daynix/UsbDk/releases/download/v1.00-22/UsbDk_1.0.22_x64.msi" -OutFile "UsbDk_Installer.msi"
    Start-Process msiexec.exe -ArgumentList "/i UsbDk_Installer.msi /quiet" -Wait
} catch {
    Write-Host "    [!] Driver installation failed." -ForegroundColor Red
}
\n`;
  }
  if (options.downloadPaler1n) {
    script += `Write-Host "[+] Downloading Paler1n (Windows CLI)..." -ForegroundColor Cyan
Invoke-WebRequest -Uri "https://github.com/palera1n/palera1n/releases/latest/download/palera1n-v2.0.0-beta.8-windows-x86_64.exe" -OutFile "paler1n.exe"
\n`;
  }
  if (options.genGitHubWorkflow) {
    script += `Write-Host "[+] Generating GitHub Pages Deployment Workflow..." -ForegroundColor Magenta
$workflowDir = Join-Path $modPath ".github\\workflows"
if (!(Test-Path $workflowDir)) { New-Item -ItemType Directory -Path $workflowDir -Force }
$workflowYaml = @'
name: Deploy Archive to GitHub Pages
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
'@
Set-Content -Path (Join-Path $workflowDir "deploy.yml") -Value $workflowYaml
\n`;
  }
  if (options.genDevContainer) {
    script += `Write-Host "[+] Generating Codespaces DevContainer Config..." -ForegroundColor Magenta
$containerDir = Join-Path $modPath ".devcontainer"
if (!(Test-Path $containerDir)) { New-Item -ItemType Directory -Path $containerDir -Force }
$containerJson = @'
{
  "name": "A1633 Cloud Lab",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:20",
  "features": {
    "ghcr.io/devcontainers/features/common-utils:1": {}
  },
  "customizations": {
    "vscode": {
      "extensions": ["ms-vscode.cpptools", "ms-python.python"]
    }
  },
  "forwardPorts": [27015, 3000],
  "postCreateCommand": "sudo apt-get update && sudo apt-get install -y libimobiledevice-utils usbmuxd socat"
}
'@
Set-Content -Path (Join-Path $containerDir "devcontainer.json") -Value $containerJson
\n`;
  }
  if (options.includeReadmeGuides) {
    script += `Write-Host "[+] Generating Enhanced README with Tutorial Links..." -ForegroundColor Magenta
$readmeContent = @'
# A1633 Modding Archive
Mainframe generated via RetroByte A1633.
## Embedded Tutorials
- [Palera1n Official Guide](https://palera1n.cf)
- [Video: How to Jailbreak iPhone 6s iOS 15.8.3](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
## Quick Start
1. Connect A1633 in DFU mode.
2. Run `./paler1n.exe -v`.
'@
Set-Content -Path (Join-Path $modPath "README.md") -Value $readmeContent
\n`;
  }
  if (options.setupCodespaceProxy) {
    script += `Write-Host "[+] Generating Cloud Proxy Bridge (socat)..." -ForegroundColor Magenta
$proxyScript = @'
# usbmuxd socat bridge for Codespaces
# Forwarding local usbmuxd port 27015 to remote tunnel
socat TCP-LISTEN:27015,fork UNIX-CONNECT:/var/run/usbmuxd
'@
Set-Content -Path (Join-Path $modPath "start_cloud_proxy.sh") -Value $proxyScript
\n`;
  }
  script += `Write-Host "Mainframe Setup Complete. Assets located in: $modPath" -ForegroundColor Green
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")`;
  return script;
}