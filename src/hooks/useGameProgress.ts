import { useEffect, useState } from "react";
import { GameState } from "@/types/game";

const STORAGE_KEY = "memory-game-progress";

export interface SavedProgress {
  currentLevel: number;
  score: number;
}

export const useGameProgress = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const saveProgress = (gameState: GameState) => {
    const progress: SavedProgress = {
      currentLevel: gameState.currentLevel,
      score: gameState.score,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  };

  const loadProgress = (): SavedProgress | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
    return null;
  };

  const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return { saveProgress, loadProgress, clearProgress, isLoaded };
};
