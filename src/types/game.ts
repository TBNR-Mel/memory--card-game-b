export interface Card {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface LevelConfig {
  level: number;
  name: string;
  gridCols: number;
  gridRows: number;
  pairs: number;
  timeBonus: number; // seconds for bonus scoring
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  moves: number;
  isComplete: boolean;
  startTime: number | null;
  endTime: number | null;
  currentLevel: number;
  score: number;
}

export const LEVELS: LevelConfig[] = [
  { level: 1, name: "Beginner", gridCols: 2, gridRows: 2, pairs: 2, timeBonus: 30 },
  { level: 2, name: "Easy", gridCols: 3, gridRows: 2, pairs: 3, timeBonus: 45 },
  { level: 3, name: "Medium", gridCols: 4, gridRows: 2, pairs: 4, timeBonus: 60 },
  { level: 4, name: "Hard", gridCols: 3, gridRows: 4, pairs: 6, timeBonus: 90 },
  { level: 5, name: "Expert", gridCols: 4, gridRows: 4, pairs: 8, timeBonus: 120 },
  { level: 6, name: "Master", gridCols: 5, gridRows: 4, pairs: 10, timeBonus: 150 },
  { level: 7, name: "Legend", gridCols: 6, gridRows: 4, pairs: 12, timeBonus: 180 },
  { level: 8, name: "Champion", gridCols: 6, gridRows: 5, pairs: 15, timeBonus: 210 },
  { level: 9, name: "Grandmaster", gridCols: 7, gridRows: 5, pairs: 17, timeBonus: 240 },
  { level: 10, name: "Elite", gridCols: 8, gridRows: 5, pairs: 20, timeBonus: 270 },
  { level: 11, name: "Superhuman", gridCols: 6, gridRows: 6, pairs: 18, timeBonus: 300 },
  { level: 12, name: "Prodigy", gridCols: 7, gridRows: 6, pairs: 21, timeBonus: 330 },
  { level: 13, name: "Genius", gridCols: 8, gridRows: 6, pairs: 24, timeBonus: 360 },
  { level: 14, name: "Savant", gridCols: 7, gridRows: 7, pairs: 24, timeBonus: 390 },
  { level: 15, name: "Virtuoso", gridCols: 8, gridRows: 7, pairs: 28, timeBonus: 420 },
  { level: 16, name: "Mastermind", gridCols: 8, gridRows: 8, pairs: 32, timeBonus: 450 },
  { level: 17, name: "Immortal", gridCols: 9, gridRows: 8, pairs: 36, timeBonus: 480 },
  { level: 18, name: "Transcendent", gridCols: 10, gridRows: 8, pairs: 40, timeBonus: 510 },
  { level: 19, name: "Omniscient", gridCols: 9, gridRows: 9, pairs: 40, timeBonus: 540 },
  { level: 20, name: "Ultimate", gridCols: 10, gridRows: 9, pairs: 45, timeBonus: 600 },
];