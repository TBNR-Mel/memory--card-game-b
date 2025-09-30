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
];