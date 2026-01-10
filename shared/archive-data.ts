export interface Guide {
  title: string;
  slug: string;
  category: 'Initial Setup' | 'Jailbreaking' | 'Post-Install' | 'Multi-Boot';
  clearance: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET';
  content: string;
  riskLevel?: number; // 1-5 scale
}
export interface Mod {
  name: string;
  description: string;
  version: string;
  compatibility: string;
  author: string;
  type: 'System' | 'UI' | 'Battery' | 'Experimental';
  rating: number; // 1-10
}
export const ARCHIVE_GUIDES: Guide[] = [
  {
    title: "The N71AP Genesis: Hardware Overview",
    slug: "hardware-overview",
    category: "Initial Setup",
    clearance: "UNCLASSIFIED",
    riskLevel: 1,
    content: "The iPhone 6s (A1633) is the last of its kind. Featuring the A9 chip and 2GB of LPDDR4 RAM, it remains the minimum viable entry for iOS 15.8.3. Before modding, ensure your battery health is above 80% to avoid CPU throttling during the jailbreak process."
  },
  {
    title: "Paler1n Injection Protocol",
    slug: "paler1n-guide",
    category: "Jailbreaking",
    clearance: "SECRET",
    riskLevel: 3,
    content: "Palera1n is a work-in-progress jailbreak for checkm8-vulnerable devices running iOS 15+. \n\n1. Connect device in DFU mode.\n2. Execute `palera1n -c -v` to create the fakefs.\n3. Wait for the reboot and then re-run `palera1n -v` to boot into jailbroken state."
  },
  {
    title: "Project Sandcastle: Android on A1633",
    slug: "android-sandcastle",
    category: "Multi-Boot",
    clearance: "SECRET",
    riskLevel: 5,
    content: "Project Sandcastle brings Android to the iPhone. While functional, it is highly experimental. \n\nHardware Status:\n- CPU: Functional\n- RAM: Functional\n- GPU: NO ACCELERATION\n- Audio: NOT WORKING\n- WiFi: PARTIAL\n\nInstallation requires a Linux host and the checkra1n exploit to bootstrap the Android kernel."
  },
  {
    title: "PostmarketOS: True Linux Freedom",
    slug: "linux-pmos",
    category: "Multi-Boot",
    clearance: "SECRET",
    riskLevel: 4,
    content: "PostmarketOS (pmOS) targets a sustainable mobile OS. For the A1633, it offers a real mainline Linux kernel experience. \n\nInstructions:\n1. Use pmbootstrap to build the image.\n2. Flash via fastboot-compatible bootloaders.\n3. Experience a pure X11 or Wayland environment on your Apple hardware."
  },
  {
    title: "Windows 11: The Impossibility Analysis",
    slug: "windows-11-fail",
    category: "Multi-Boot",
    clearance: "CONFIDENTIAL",
    riskLevel: 1,
    content: "Frequent inquiries regarding Windows 11 ARM64 on A9 hardware require clarification. \n\nBlockers:\n1. UEFI Support: The A9 lacks a standardized UEFI implementation compatible with Windows Boot Manager.\n2. Core Count: Windows 11 requires a minimum of 2 cores; while A9 has 2, the lack of architectural drivers for power management causes instant bugchecks.\n3. Instruction Set: Missing specific ARMv8.1 extensions required for modern Windows kernels."
  },
  {
    title: "Legacy Optimization: Sileo & Procursus",
    slug: "post-install-opt",
    category: "Post-Install",
    clearance: "CONFIDENTIAL",
    riskLevel: 2,
    content: "Once jailbroken, migrate from Cydia to Sileo for modern package management. Add the Procursus repo to access up-to-date terminal tools like ZSH, Vim, and OpenSSH. Disable launch daemons for GameCenter and OTA updates to reclaim 15% system resources."
  }
];
export const MOD_REPOSITORY: Mod[] = [
  {
    name: "Cylinder Reborn",
    description: "Icon scroll animations for the nostalgic soul.",
    version: "1.1.0",
    compatibility: "iOS 15.0 - 15.8.3",
    author: "Ryan Petrich / Ryannz",
    type: "UI",
    rating: 9
  },
  {
    name: "Powercuff",
    description: "Throttles CPU to save battery life. Essential for aging A9 chips.",
    version: "1.0.1",
    compatibility: "iOS 14.0+",
    author: "Ryan Petrich",
    type: "Battery",
    rating: 8
  },
  {
    name: "Filza File Manager",
    description: "Full root filesystem access. The Swiss Army knife of iOS.",
    version: "4.0.0",
    compatibility: "All Versions",
    author: "TIGI Software",
    type: "System",
    rating: 10
  }
];