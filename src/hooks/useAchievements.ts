import { useEffect, useState } from "react";
import { Achievement, ACHIEVEMENT_DEFINITIONS } from "@/types/achievements";
import { toast } from "sonner";

const STORAGE_KEY = "memory-game-achievements";

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to load achievements:", error);
    }
    
    // Initialize achievements
    return ACHIEVEMENT_DEFINITIONS.map(def => ({
      ...def,
      unlocked: false,
      progress: 0,
    }));
  });

  const saveAchievements = (newAchievements: Achievement[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAchievements));
      setAchievements(newAchievements);
    } catch (error) {
      console.error("Failed to save achievements:", error);
    }
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === achievementId);
      if (!achievement || achievement.unlocked) return prev;

      const updated = prev.map(a =>
        a.id === achievementId
          ? { ...a, unlocked: true, unlockedAt: Date.now() }
          : a
      );

      toast(`🏆 Achievement Unlocked: ${achievement.name}`, {
        description: achievement.description,
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateProgress = (achievementId: string, progress: number) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === achievementId);
      if (!achievement || achievement.unlocked) return prev;

      const updated = prev.map(a => {
        if (a.id === achievementId) {
          const newProgress = progress;
          const shouldUnlock = a.maxProgress && newProgress >= a.maxProgress;
          
          if (shouldUnlock) {
            toast(`🏆 Achievement Unlocked: ${a.name}`, {
              description: a.description,
            });
            return { ...a, unlocked: true, unlockedAt: Date.now(), progress: newProgress };
          }
          
          return { ...a, progress: newProgress };
        }
        return a;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const resetAchievements = () => {
    const reset = ACHIEVEMENT_DEFINITIONS.map(def => ({
      ...def,
      unlocked: false,
      progress: 0,
    }));
    saveAchievements(reset);
  };

  return {
    achievements,
    unlockAchievement,
    updateProgress,
    resetAchievements,
  };
};
