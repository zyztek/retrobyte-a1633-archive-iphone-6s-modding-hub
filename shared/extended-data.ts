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