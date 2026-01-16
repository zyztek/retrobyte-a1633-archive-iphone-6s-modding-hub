import { Mod } from './archive-data';
export interface WikiArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  videoUrl?: string;
}
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
  performanceScore: number;
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
export const A9_HARDWARE_SPECS = {
  model: "iPhone 6s (A1633)",
  codename: "N71AP",
  chipset: {
    name: "Apple A9",
    architecture: "64-bit Twister (Dual-Core)",
    clock: "1.85 GHz",
    process: "14nm FinFET (Samsung / TSMC)",
    l3_cache: "4MB"
  },
  graphics: {
    gpu: "PowerVR GT7600",
    cores: 6,
    api_support: "Metal 2.0 / OpenGL ES 3.0"
  },
  memory: {
    capacity: "2GB",
    type: "LPDDR4",
    bandwidth: "25.6 GB/s"
  },
  display: {
    type: "Retina HD with 3D Touch",
    resolution: "1334-by-750 pixels (326 ppi)",
    contrast: "1400:1"
  }
};
export const SCRIPT_PRESETS = [
  {
    id: "minimal",
    name: "MINIMAL_JB",
    description: "Essential drivers and Paler1n CLI. Lowest risk profile.",
    complexity: "LOW",
    options: {
      installDrivers: true,
      installiTunes: true,
      downloadPaler1n: true,
      downloadCheckra1n: false,
      fetchIPSW: false,
      backupDevice: true,
      genGitHubWorkflow: false,
      genDevContainer: false,
      includeReadmeGuides: true,
      setupCodespaceProxy: false,
    }
  },
  {
    id: "dev",
    name: "DEV_STATION",
    description: "Cloud proxy orchestration and virtualization headers.",
    complexity: "MEDIUM",
    options: {
      installDrivers: true,
      installiTunes: true,
      downloadPaler1n: true,
      downloadCheckra1n: true,
      fetchIPSW: true,
      backupDevice: true,
      genGitHubWorkflow: false,
      genDevContainer: true,
      includeReadmeGuides: true,
      setupCodespaceProxy: true,
    }
  },
  {
    id: "apocalypse",
    name: "APOCALYPSE_SUITE",
    description: "Full lockdown suite with automated GitHub deployment.",
    complexity: "MAXIMUM",
    options: {
      installDrivers: true,
      installiTunes: true,
      downloadPaler1n: true,
      downloadCheckra1n: true,
      fetchIPSW: true,
      backupDevice: true,
      genGitHubWorkflow: true,
      genDevContainer: true,
      includeReadmeGuides: true,
      setupCodespaceProxy: true,
    }
  }
];
export const SINGULARITY_LOGIC: Record<string, string[]> = {
  gaming: [
    "A9_TWISTER_BURST: ENABLED",
    "THERMAL_THROTTLE_LIMIT: +15C",
    "LPDDR4_LATENCY: REDUCED_0x44"
  ],
  stable: [
    "POWERCUFF_PROFILE: ACTIVE",
    "BACKGROUND_DAEMON_SCRUB: 88%",
    "VOLTAGE_RAIL_SMOOTHING: ON"
  ]
};
export const SYSTEM_AUDIT_METRICS = [
  { id: 'battery-bms', value: '3.82V_NOMINAL' },
  { id: 'audio-i2s', value: 'MAPPED_0x12' },
  { id: 'lte-baseband', value: 'LINK_ESTABLISHED' }
];
export const ZERO_DAY_EXPLOITS = [
  { id: 'z1', name: 'USB_SHREDDER', windowSize: 5, speed: 4 },
  { id: 'z2', name: 'HEAPP_SPRAY', windowSize: 8, speed: 3 },
  { id: 'z3', name: 'SYSCALL_RACE', windowSize: 3, speed: 5 }
];
export const NETWORK_TOOLS = [
  { id: 'n1', name: 'AIRCRACK_NG', status: 'READY' },
  { id: 'n2', name: 'WIRESHARK_P7', status: 'STANDBY' }
];
export const JC_P7_COMMANDS = [
  { cmd: "AT+READ_SYSCFG", desc: "Read raw system configuration partition" },
  { cmd: "AT+WRITE_SN", desc: "Write serial number to BGA110 module" },
  { cmd: "AT+UNLOCK_WIFI", desc: "Bypass WiFi hardware bind check" },
  { cmd: "AT+DFU_HANDSHAKE", desc: "Verify P7-to-N71AP UART link" }
];
export const BGA110_ERRORS: Record<string, string> = {
  "0x1": "COMM_TIMEOUT: JC-P7 unresponsive.",
  "0x2": "DIE_MISMATCH: NAND signature not recognized.",
  "0x3": "V_RAIL_DROP: Insufficient power for reflow state."
};
export const DOCS_VAULT_CONTENT: WikiArticle[] = [
  {
    id: 'a9-architecture',
    title: 'A9 (N71AP) KERNEL STRUCTURE',
    category: 'KERNEL',
    content: 'The Apple A9 SoC utilizes a dual-core 1.85GHz Twister architecture. Memory management is handled by a sophisticated MMU mapping the 2GB LPDDR4 address space. Neural_Weights simulation indicates a stable loss of 0.00042 during Tweak_AI training cycles.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];
export const EMU_VAULT: Emulator[] = [
  {
    name: "Dolphin_A9",
    platform: "GC/Wii",
    compatibility: "EXPERIMENTAL",
    jitRequired: true,
    performanceScore: 45,
    notes: "A9 architecture requires specialized cache-line alignment for PowerVR GPU backends. Vulkan recommended."
  },
  {
    name: "PPSSPP",
    platform: "PSP",
    compatibility: "STABLE",
    jitRequired: true,
    performanceScore: 95,
    notes: "A9 hardware handles most 3D titles at 2x resolution. Tuned for Twister core bursts."
  },
  {
    name: "Delta",
    platform: "Retro",
    compatibility: "STABLE",
    jitRequired: false,
    performanceScore: 100,
    notes: "Flawless execution on A1633. Native LPDDR4 memory mapping optimized."
  }
];
export const TWEAK_AI_QUIZ: QuizQuestion[] = [
  {
    id: "goal",
    text: "WHAT IS YOUR PRIMARY OBJECTIVE?",
    options: [
      { label: "STABILITY_RELU", value: "stable", impact: { battery: 10, loss: 0.01 } },
      { label: "PERFORMANCE_SIGMOID", value: "gaming", impact: { performance: 10, loss: 0.05 } },
      { label: "AESTHETIC_SOFTMAX", value: "aesthetic", impact: { ui: 10, loss: 0.02 } }
    ]
  },
  {
    id: "battery",
    text: "NEURAL_SYNC: BATTERY HEALTH PERCENTILE?",
    options: [
      { label: "TENSOR_HIGH (>90%)", value: "good", impact: { weights: 5 } },
      { label: "TENSOR_LOW (<80%)", value: "poor", impact: { weights: -10 } }
    ]
  }
];
export const REMOTE_OPS_TOOLS = [
  { id: 'libimobiledevice', name: 'libimobiledevice', description: 'Cross-platform protocol library.', platform: 'LINUX', command: 'ideviceinfo' },
  { id: 'newterm', name: 'NewTerm 3', description: 'Terminal emulator for iOS.', platform: 'IOS', command: 'ssh root@localhost' }
];
export const CODESPACES_PROXY_GUIDE = {
  steps: [
    'Install socat: sudo apt install socat',
    'Forward usbmuxd: socat TCP-LISTEN:27015,fork UNIX-CONNECT:/var/run/usbmuxd'
  ]
};
export const MOCK_DATA_USAGE = [
  { time: '08:00', upload: 2, download: 10 },
  { time: '12:00', upload: 5, download: 40 },
  { time: '16:00', upload: 12, download: 80 }
];
export const MOCK_WIFI_NETWORKS = [
  { ssid: "CENTRAL_HUB", signal: -40, channel: 1, pwnability: 10 },
  { ssid: "CORP_SECURE", signal: -80, channel: 6, pwnability: 85 },
  { ssid: "GUEST_OPEN", signal: -60, channel: 11, pwnability: 5 }
];
export const ETHICAL_DISCLAIMER = [
  "1. DO NOT access unauthorized networks.",
  "2. Malicious activity voids RetroByte license.",
  "3. Data integrity is your responsibility."
];
export const PACKAGE_STORES: PackageStore[] = [
  {
    name: "Sileo",
    description: "Modern, fast APT front-end.",
    repoUrl: "https://repo.getsileo.app/",
    installationGuide: "Included in Palera1n defaults."
  }
];
export const AR_HARDWARE_MARKERS = [
  { id: 'cpu', name: 'A9 TWISTER CPU', specs: '1.85GHz Dual-Core / 14nm FinFET', top: '35%', left: '48%' },
  { id: 'ram', name: 'LPDDR4 RAM', specs: '2GB Samsung Stacked Die', top: '42%', left: '52%' },
  { id: 'nand', name: 'STORAGE', specs: 'SKHynix/Toshiba BGA110 128GB', top: '65%', left: '45%' }
];