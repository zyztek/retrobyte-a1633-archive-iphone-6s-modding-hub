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