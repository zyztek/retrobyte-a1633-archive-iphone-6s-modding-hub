export interface Guide {
  title: string;
  slug: string;
  category: 'Initial Setup' | 'Jailbreaking' | 'Post-Install';
  clearance: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET';
  content: string;
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
    content: "The iPhone 6s (A1633) is the last of its kind. Featuring the A9 chip and 2GB of LPDDR4 RAM, it remains the minimum viable entry for iOS 15.8.3. Before modding, ensure your battery health is above 80% to avoid CPU throttling during the jailbreak process."
  },
  {
    title: "Paler1n Injection Protocol",
    slug: "paler1n-guide",
    category: "Jailbreaking",
    clearance: "SECRET",
    content: "Palera1n is a work-in-progress jailbreak for checkm8-vulnerable devices running iOS 15+. \n\n1. Connect device in DFU mode.\n2. Execute `palera1n -c -v` to create the fakefs.\n3. Wait for the reboot and then re-run `palera1n -v` to boot into jailbroken state."
  },
  {
    title: "Legacy Optimization: Sileo & Procursus",
    slug: "post-install-opt",
    category: "Post-Install",
    clearance: "CONFIDENTIAL",
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