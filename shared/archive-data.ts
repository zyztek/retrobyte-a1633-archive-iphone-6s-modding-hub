export interface Guide {
  title: string;
  slug: string;
  category: 'Initial Setup' | 'Jailbreaking' | 'Post-Install' | 'Multi-Boot';
  clearance: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET';
  content: string;
  riskLevel?: number; // 1-5 scale
  targetVersions?: string[];
}
export interface Mod {
  name: string;
  description: string;
  version: string;
  compatibility: string;
  author: string;
  type: 'System' | 'UI' | 'Battery' | 'Experimental' | 'Tool';
  rating: number; // 1-10
}
export const ARCHIVE_GUIDES: Guide[] = [
  {
    title: "The N71AP Genesis: Hardware Overview",
    slug: "hardware-overview",
    category: "Initial Setup",
    clearance: "UNCLASSIFIED",
    riskLevel: 1,
    targetVersions: ["15.0", "15.8.3"],
    content: "The iPhone 6s (A1633) is the last of its kind. Featuring the A9 chip and 2GB of LPDDR4 RAM, it remains the minimum viable entry for iOS 15.8.3. Before modding, ensure your battery health is above 80% to avoid CPU throttling during the jailbreak process."
  },
  {
    title: "Paler1n Injection Protocol",
    slug: "paler1n-guide",
    category: "Jailbreaking",
    clearance: "SECRET",
    riskLevel: 3,
    targetVersions: ["15.0", "15.8.3"],
    content: "Palera1n is a work-in-progress jailbreak for checkm8-vulnerable devices running iOS 15+. \n\n1. Connect device in DFU mode.\n2. Execute `palera1n -c -v` to create the fakefs.\n3. Wait for the reboot and then re-run `palera1n -v` to boot into jailbroken state."
  },
  {
    title: "Multiboot Prep: Partitioning the Void",
    slug: "multiboot-prep",
    category: "Multi-Boot",
    clearance: "SECRET",
    riskLevel: 4,
    targetVersions: ["15.0", "15.8.3"],
    content: "To host multiple operating systems, the APFS container must be manually segmented. \n\n1. Use `diskutil` via SSH or MTerminal to identify the main container.\n2. Add a new APFS volume named 'Linux' or 'Android'.\n3. Ensure at least 10GB is allocated. \n\nWARNING: Miscalculating the partition boundary on A9 hardware can lead to NAND corruption requiring a full DFU restore."
  },
  {
    title: "Project Sandcastle: Android on A1633",
    slug: "android-sandcastle",
    category: "Multi-Boot",
    clearance: "SECRET",
    riskLevel: 5,
    targetVersions: ["15.0", "15.7"],
    content: "Project Sandcastle brings Android to the iPhone. While functional, it is highly experimental. \n\nHardware Status:\n- CPU: Functional\n- RAM: Functional\n- GPU: NO ACCELERATION\n- Audio: NOT WORKING\n- WiFi: PARTIAL\n\nInstallation requires a Linux host and the checkra1n exploit to bootstrap the Android kernel."
  },
  {
    title: "PostmarketOS: True Linux Freedom",
    slug: "linux-pmos",
    category: "Multi-Boot",
    clearance: "SECRET",
    riskLevel: 4,
    targetVersions: ["15.0", "15.8.3"],
    content: "PostmarketOS (pmOS) targets a sustainable mobile OS. For the A1633, it offers a real mainline Linux kernel experience. \n\nInstructions:\n1. Use pmbootstrap to build the image.\n2. Flash via fastboot-compatible bootloaders.\n3. Experience a pure X11 or Wayland environment on your Apple hardware."
  },
  {
    title: "TrollStore: The Permasigned Revolution",
    slug: "trollstore-guide",
    category: "Post-Install",
    clearance: "CONFIDENTIAL",
    riskLevel: 2,
    targetVersions: ["15.0", "15.4.1", "15.5", "16.6.1"],
    content: "TrollStore leverages the CoreTrust bug to permanently sign IPAs. \n\nOn A9 devices:\n- 15.0 to 15.4.1: Direct installation via GTA Car Tracker exploit.\n- 15.5 and above: Requires a jailbreak (Palera1n) to install the helper, though the apps remain signed in non-jailbroken state once installed."
  }
];
export const MOD_REPOSITORY: Mod[] = [
  {
    name: "TrollStore Helper",
    description: "Permanent IPA installer. No revokes, ever.",
    version: "2.0.12",
    compatibility: "iOS 14.0 - 17.0",
    author: "Opa334",
    type: "Tool",
    rating: 10
  },
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