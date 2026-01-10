import { Mod } from './archive-data';
export interface PackageStore {
  name: string;
  description: string;
  iconUrl?: string;
  repoUrl: string;
  installationGuide: string;
}
export interface Emulator {
  name: string;
  platform: string;
  compatibility: 'STABLE' | 'EXPERIMENTAL' | 'NON-FUNCTIONAL';
  jitRequired: boolean;
  performanceScore: number; // 1-100
  notes: string;
}
export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    label: string;
    value: string;
    impact: Record<string, number>;
  }[];
}
export interface HardwareMod {
  id: string;
  title: string;
  difficulty: 'EASY' | 'MODERATE' | 'HARD' | 'GOD_MODE';
  tools: string[];
  steps: string[];
}
export const PACKAGE_STORES: PackageStore[] = [
  {
    name: "Sileo",
    description: "Modern, fast, and feature-rich APT front-end.",
    repoUrl: "https://repo.getsileo.app/",
    installationGuide: "Included by default in Palera1n. Use 'palera1n --install-sileo' if missing."
  },
  {
    name: "Zebra",
    description: "A high-performance package manager designed for power users.",
    repoUrl: "https://getzbra.com/repo/",
    installationGuide: "Add the official Zebra repo to Sileo and install the Zebra package."
  },
  {
    name: "Installer 5",
    description: "The successor to the original 2007 installer. High customization.",
    repoUrl: "https://apptapp.me/repo/",
    installationGuide: "Download the .deb from AppTapp and install via Filza."
  }
];
export const EMU_VAULT: Emulator[] = [
  {
    name: "PPSSPP",
    platform: "PSP",
    compatibility: "STABLE",
    jitRequired: true,
    performanceScore: 95,
    notes: "A9 hardware handles most 3D titles at 2x resolution. Requires JIT for optimal speed."
  },
  {
    name: "Delta",
    platform: "SNES/N64/GBA",
    compatibility: "STABLE",
    jitRequired: false,
    performanceScore: 100,
    notes: "Flawless execution on A1633. Recommended for long-term daily usage."
  },
  {
    name: "AetherSX2",
    platform: "PS2",
    compatibility: "EXPERIMENTAL",
    jitRequired: true,
    performanceScore: 35,
    notes: "Severe thermal throttling. Useful for turn-based RPGs only. A9 CPU bottleneck detected."
  }
];
export const TWEAK_AI_QUIZ: QuizQuestion[] = [
  {
    id: "goal",
    text: "WHAT IS YOUR PRIMARY OBJECTIVE?",
    options: [
      { label: "DAILY_STABILITY", value: "stable", impact: { battery: 10, stability: 10, performance: 0 } },
      { label: "PEAK_PERFORMANCE", value: "gaming", impact: { performance: 10, battery: -5, stability: -2 } },
      { label: "UI_OVERHAUL", value: "aesthetic", impact: { ui: 10, performance: -2 } }
    ]
  },
  {
    id: "battery",
    text: "CURRENT BATTERY HEALTH STATUS?",
    options: [
      { label: "ABOVE_90_PERCENT", value: "good", impact: { battery: 5 } },
      { label: "BELOW_80_PERCENT", value: "poor", impact: { battery: -10, performance: -5 } }
    ]
  }
];
export const HARDWARE_MODS: HardwareMod[] = [
  {
    id: "emmc-swap",
    title: "eMMC 512GB Upgrade",
    difficulty: "GOD_MODE",
    tools: ["Heat Gun (350°C)", "BGA Stencil", "Solder Paste", "JC P7 Pro Programmer"],
    steps: [
      "De-solder original NAND chip using precision heat nozzle.",
      "Clean logic board pads with copper wick and flux.",
      "Program new 512GB NAND with serial/MAC address data using JC P7.",
      "Re-ball new NAND chip using specialized stencil.",
      "Align and reflow NAND chip onto logic board.",
      "DFU restore system to initialize new partition table."
    ]
  },
  {
    id: "battery-mod",
    title: "High-Capacity Cell Swap",
    difficulty: "MODERATE",
    tools: ["Spudger", "Taptic Engine removal bits", "New 2200mAh Cell"],
    steps: [
      "Power down A1633 and remove pentalobe screws.",
      "Lift display assembly with suction tool.",
      "Disconnect battery terminal shield.",
      "Remove original 1715mAh cell adhesive strips.",
      "Install high-density 2200mAh aftermarket cell.",
      "Recalibrate BMS via System Lab dashboard."
    ]
  }
];
export const SINGULARITY_LOGIC: Record<string, string[]> = {
  stable: [
    "PREDICTION: Voltage stability prioritized. Undervolting detected.",
    "SUGGESTION: Disable Powercuff to maximize single-core burst.",
    "STATUS: System health nominal for legacy operations."
  ],
  gaming: [
    "PREDICTION: Thermal runaway imminent. CPU Throttling disabled.",
    "SUGGESTION: Liquid cooling OTG mod recommended for A9 overclocking.",
    "STATUS: Frame-time variance minimized. Peak performance locked."
  ],
  aesthetic: [
    "PREDICTION: RAM bottleneck detected due to UI assets.",
    "SUGGESTION: Swap to Cylinder Reborn 'minimalist' profiles.",
    "STATUS: Visual fidelity exceeding factory specifications."
  ]
};
// --- PHASE 13: NETWORK ARSENAL DATA ---
export const NETWORK_TOOLS = [
  {
    id: "datamonitor",
    name: "DataMonitor V3",
    desc: "Real-time bandwidth interception and cellular compression for aging A9 antennas.",
    repo: "https://repo.packix.com/",
    status: "STABLE"
  },
  {
    id: "wifiscout",
    name: "WiFiScout",
    desc: "Advanced wardriving and packet capture suite. Requires MTerminal or NewTerm.",
    repo: "https://chariz.com/",
    status: "EXPERIMENTAL"
  },
  {
    id: "vpnforge",
    name: "VPNForge",
    desc: "Hardcoded WireGuard profile loader. Bypasses standard system tunnel limitations.",
    repo: "https://havoc.app/",
    status: "VERIFIED"
  }
];
export const ETHICAL_DISCLAIMER = [
  "1. DO NOT access networks without explicit permission from the owner.",
  "2. Use of these tools for malicious activity is a violation of the RETROBYTE A1633 license.",
  "3. Packet sniffing may capture sensitive personal data; handle with absolute integrity.",
  "4. Wardriving data must remain localized and encrypted on-device.",
  "5. A1633 hardware may overheat during prolonged high-gain WiFi operations."
];
export const MOCK_WIFI_NETWORKS = [
  { ssid: "CENTRAL_HUB_GUEST", signal: -42, security: "WPA2", pwnability: 10, channel: 1 },
  { ssid: "CORP_SECURE_EXT", signal: -78, security: "WPA3", pwnability: 85, channel: 6 },
  { ssid: "NETGEAR_DEFAULT_2.4", signal: -65, security: "WEP", pwnability: 5, channel: 11 },
  { ssid: "HIDDEN_VLAN_88", signal: -92, security: "WPA2-ENT", pwnability: 95, channel: 3 }
];
export const MOCK_DATA_USAGE = [
  { time: '08:00', upload: 2.4, download: 12.1 },
  { time: '10:00', upload: 5.1, download: 45.3 },
  { time: '12:00', upload: 1.8, download: 28.7 },
  { time: '14:00', upload: 12.4, download: 89.2 },
  { time: '16:00', upload: 4.2, download: 34.5 },
  { time: '18:00', upload: 3.1, download: 15.8 },
  { time: '20:00', upload: 0.5, download: 8.2 },
];