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
  // Beginner Achievements
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
  
  // Level Milestones
  {
    id: "level_5",
    name: "Expert Player",
    description: "Reach Level 5",
    icon: "🏅",
    maxProgress: 1,
  },
  {
    id: "level_10",
    name: "Elite Status",
    description: "Reach Level 10",
    icon: "💫",
    maxProgress: 1,
  },
  {
    id: "level_15",
    name: "Virtuoso Mind",
    description: "Reach Level 15",
    icon: "🎭",
    maxProgress: 1,
  },
  {
    id: "level_20",
    name: "Ultimate Champion",
    description: "Complete the final level 20",
    icon: "👑",
    maxProgress: 1,
  },
  
  // Score Achievements
  {
    id: "high_scorer",
    name: "High Scorer",
    description: "Reach 10,000 points",
    icon: "💎",
    maxProgress: 10000,
  },
  {
    id: "mega_scorer",
    name: "Mega Scorer",
    description: "Reach 50,000 points",
    icon: "💰",
    maxProgress: 50000,
  },
  {
    id: "legendary_scorer",
    name: "Legendary Scorer",
    description: "Reach 100,000 points",
    icon: "🌠",
    maxProgress: 100000,
  },
  
  // Completionist
  {
    id: "completionist",
    name: "Completionist",
    description: "Complete all 20 levels",
    icon: "🌟",
    maxProgress: 20,
  },
  
  // Play Count
  {
    id: "persistent",
    name: "Persistent",
    description: "Complete 50 levels total",
    icon: "🎮",
    maxProgress: 50,
  },
  {
    id: "dedicated",
    name: "Dedicated Player",
    description: "Complete 100 levels total",
    icon: "🔥",
    maxProgress: 100,
  },
  
  // Speed Achievements
  {
    id: "lightning_fast",
    name: "Lightning Fast",
    description: "Complete 3 levels in a row under time bonus",
    icon: "⚡️",
    maxProgress: 3,
  },
  {
    id: "time_master",
    name: "Time Master",
    description: "Complete 10 levels under time bonus",
    icon: "⏱️",
    maxProgress: 10,
  },
  
  // Perfect Play
  {
    id: "flawless_streak",
    name: "Flawless Streak",
    description: "Complete 5 perfect levels in a row",
    icon: "✨",
    maxProgress: 5,
  },
  
  // Efficiency
  {
    id: "efficiency_master",
    name: "Efficiency Master",
    description: "Complete a hard level (6+) with minimum moves",
    icon: "🎪",
    maxProgress: 1,
  },
  
  // Endurance
  {
    id: "marathon_runner",
    name: "Marathon Runner",
    description: "Play for 30 minutes straight",
    icon: "🏃",
    maxProgress: 1,
  },
  
  // Special
  {
    id: "comeback_kid",
    name: "Comeback Kid",
    description: "Complete a level after retrying it 3 times",
    icon: "🎯",
    maxProgress: 1,
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Get 3 perfect games in levels 10+",
    icon: "🌈",
    maxProgress: 3,
  },
];
