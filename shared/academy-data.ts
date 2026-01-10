export type AcademyTier = 'LAMER' | 'PRO' | 'GOD';
export interface Module {
  id: string;
  tier: AcademyTier;
  title: string;
  description: string;
  xpValue: number;
  videoUrl: string;
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
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Mock
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
    question: 'Why is GPU acceleration missing in Windows 11 ARM on A9?',
    options: [
      'Insufficient RAM (2GB)',
      'Lack of proprietary ACPI and DX12 drivers',
      'CPU clock speed too low',
      'iOS 15 sandbox restriction'
    ],
    correctIndex: 1
  }
];