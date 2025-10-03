export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
  progress?: number;
  maxProgress?: number;
}

export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  {
    id: "first_win",
    name: "First Steps",
    description: "Complete your first level",
    icon: "🎯",
    maxProgress: 1,
  },
  {
    id: "speed_demon",
    name: "Speed Demon",
    description: "Complete a level in under 10 moves",
    icon: "⚡",
    maxProgress: 1,
  },
  {
    id: "perfect_memory",
    name: "Perfect Memory",
    description: "Complete a level without any wrong matches",
    icon: "🧠",
    maxProgress: 1,
  },
  {
    id: "level_5",
    name: "Expert Player",
    description: "Reach Level 5",
    icon: "🏅",
    maxProgress: 1,
  },
  {
    id: "level_7",
    name: "Legendary",
    description: "Complete the final level",
    icon: "👑",
    maxProgress: 1,
  },
  {
    id: "high_scorer",
    name: "High Scorer",
    description: "Reach 10,000 points",
    icon: "💎",
    maxProgress: 10000,
  },
  {
    id: "persistent",
    name: "Persistent",
    description: "Play 50 games",
    icon: "🎮",
    maxProgress: 50,
  },
  {
    id: "completionist",
    name: "Completionist",
    description: "Complete all 7 levels",
    icon: "🌟",
    maxProgress: 7,
  },
];
