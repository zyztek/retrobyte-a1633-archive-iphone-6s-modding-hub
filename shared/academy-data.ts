export type AcademyTier = 'LAMER' | 'PRO' | 'GOD';
export interface Module {
  id: string;
  tier: AcademyTier;
  title: string;
  description: string;
  xpValue: number;
  videoUrl: string;
  requiresHardware?: boolean;
}
export interface QuizQuestion {
  id: string;
  tier: AcademyTier;
  question: string;
  options: string[];
  correctIndex: number;
}
export const ACADEMY_MODULES: Module[] = [
  // LAMER TIER
  {
    id: 'dfu-101',
    tier: 'LAMER',
    title: 'DFU_HANDSHAKE_101',
    description: 'Master the rhythmic sequence required to enter Device Firmware Upgrade mode on A9 hardware.',
    xpValue: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'itunes-drivers',
    tier: 'LAMER',
    title: 'DRIVER_SUBSYSTEMS',
    description: 'Proper installation of USBDK and iTunes dependencies for Windows-to-A1633 communication.',
    xpValue: 100,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  // PRO TIER
  {
    id: 'paler1n-seq',
    tier: 'PRO',
    title: 'PALER1N_INJECTION',
    description: 'Executing the checkm8 exploit via Palera1n CLI to establish a semi-tethered jailbreak.',
    xpValue: 250,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'palen1x-creation',
    tier: 'PRO',
    title: 'USB_FORGE: PALEN1X_MEDIA',
    description: 'Creating bootable Palen1x environments using Rufus or Ventoy for BIOS/UEFI execution.',
    xpValue: 200,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    requiresHardware: true
  },
  {
    id: 'dfu-cable-verify',
    tier: 'PRO',
    title: 'HARDWARE: CABLE_DIAGNOSTICS',
    description: 'Verifying DFU/Purple mode data lines in Lightning cables for reliable exploit injection.',
    xpValue: 150,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    requiresHardware: true
  },
  {
    id: 'sileo-repos',
    tier: 'PRO',
    title: 'REPOS_AND_ROOTLESS',
    description: 'Understanding the architectural shift of iOS 15 rootless jailbreaks and modern repo management.',
    xpValue: 250,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  // GOD TIER
  {
    id: 'kvm-virt',
    tier: 'GOD',
    title: 'KVM_KERNEL_VIRT',
    description: 'Utilizing KVM on a Linux-based A1633 environment to virtualize ARM64 guest operating systems.',
    xpValue: 500,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'emmc-programmer-jcp7',
    tier: 'GOD',
    title: 'USB_FORGE: JC-P7_PROTOCOLS',
    description: 'Interfacing with BGA110 programmers via USB to read/write raw NAND syscfg data.',
    xpValue: 400,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    requiresHardware: true
  },
  {
    id: 'kali-otg-stack',
    tier: 'GOD',
    title: 'HARDWARE: KALI_OTG_NETWORKING',
    description: 'Configuring external MT7601U/RT5370 chipsets via Lightning OTG for packet injection.',
    xpValue: 350,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    requiresHardware: true
  },
  {
    id: 'emmc-reball',
    tier: 'GOD',
    title: 'BGA_NAND_RECON',
    description: 'Theoretical overview of de-soldering and re-balling NAND flash for storage expansion.',
    xpValue: 500,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];
export const ACADEMY_QUIZZES: QuizQuestion[] = [
  {
    id: 'q-lamer-1',
    tier: 'LAMER',
    question: 'What is the correct button sequence for iPhone 6s DFU mode?',
    options: [
      'Volume Up + Side Button',
      'Home Button + Side Button for 10s, then release Side',
      'Volume Down + Home Button',
      'Rapidly click Home 5 times'
    ],
    correctIndex: 1
  },
  {
    id: 'q-pro-1',
    tier: 'PRO',
    question: 'Which exploit does Palera1n utilize for iOS 15.x?',
    options: [
      'CoreTrust',
      'checkm8',
      'SockPuppet',
      'KFD'
    ],
    correctIndex: 1
  },
  {
    id: 'q-god-1',
    tier: 'GOD',
    question: 'What is a critical requirement for using the JC-P7 programmer for NAND expansion?',
    options: [
      'iTunes must be open',
      'Syncing original WiFi/BT MAC addresses to the new chip',
      'Using a standard 5V USB 2.0 port only',
      'Disabling the iPhone Passcode'
    ],
    correctIndex: 1
  }
];