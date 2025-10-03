import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryCard } from "./MemoryCard";
import { GameHeader } from "./GameHeader";
import { WinModal } from "./WinModal";
import { Button } from "@/components/ui/button";
import { Card, GameState, LEVELS, LevelConfig } from "@/types/game";
import { toast } from "sonner";
import { useGameProgress } from "@/hooks/useGameProgress";

const createShuffledDeck = (levelConfig: LevelConfig): Card[] => {
  const pairs = [];
  for (let i = 1; i <= levelConfig.pairs; i++) {
    pairs.push(
      { id: i * 2 - 1, value: i, isFlipped: false, isMatched: false },
      { id: i * 2, value: i, isFlipped: false, isMatched: false }
    );
  }
  
  // Ensure grid size exactly matches number of cards (pairs * 2)
  const totalSlots = levelConfig.gridCols * levelConfig.gridRows;
  const expectedCards = levelConfig.pairs * 2;
  
  if (totalSlots !== expectedCards) {
    console.warn(`Level ${levelConfig.level}: Grid size (${totalSlots}) doesn't match pairs (${expectedCards})`);
  }
  
  return pairs.sort(() => Math.random() - 0.5);
};

export const GameBoard = () => {
  const { saveProgress, loadProgress, clearProgress, isLoaded } = useGameProgress();
  
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadProgress();
    const initialLevel = saved?.currentLevel || 1;
    const initialScore = saved?.score || 0;
    
    return {
      cards: createShuffledDeck(LEVELS[initialLevel - 1]),
      flippedCards: [],
      moves: 0,
      isComplete: false,
      startTime: null,
      endTime: null,
      currentLevel: initialLevel,
      score: initialScore,
    };
  });

  const currentLevelConfig = LEVELS[gameState.currentLevel - 1];

  const resetGame = useCallback((level?: number) => {
    const targetLevel = level || gameState.currentLevel;
    const levelConfig = LEVELS[targetLevel - 1];
    const newScore = level === 1 ? 0 : gameState.score;
    
    setGameState({
      cards: createShuffledDeck(levelConfig),
      flippedCards: [],
      moves: 0,
      isComplete: false,
      startTime: null,
      endTime: null,
      currentLevel: targetLevel,
      score: newScore,
    });
    
    if (level === 1) {
      clearProgress();
    }
    
    toast(`Level ${targetLevel}: ${levelConfig.name}! 🎮`, {
      description: `${levelConfig.gridCols}×${levelConfig.gridRows} grid with ${levelConfig.pairs} pairs`
    });
  }, [gameState.currentLevel, gameState.score, clearProgress]);

  const handleCardClick = useCallback((cardId: number) => {
    if (gameState.flippedCards.length === 2 || gameState.isComplete) return;
    
    const card = gameState.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    setGameState(prev => {
      const newCards = prev.cards.map(c => 
        c.id === cardId ? { ...c, isFlipped: true } : c
      );
      const newFlippedCards = [...prev.flippedCards, cardId];
      const startTime = prev.startTime || Date.now();
      
      return {
        ...prev,
        cards: newCards,
        flippedCards: newFlippedCards,
        startTime,
      };
    });
  }, [gameState.flippedCards.length, gameState.isComplete, gameState.cards]);

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      const [firstId, secondId] = gameState.flippedCards;
      const firstCard = gameState.cards.find(c => c.id === firstId);
      const secondCard = gameState.cards.find(c => c.id === secondId);

      setTimeout(() => {
        setGameState(prev => {
          let newMoves = prev.moves + 1;
          let newCards = [...prev.cards];
          
          if (firstCard?.value === secondCard?.value) {
            // Match found!
            newCards = newCards.map(c => 
              c.id === firstId || c.id === secondId 
                ? { ...c, isMatched: true }
                : c
            );
            toast("Great match! 🎉", { 
              description: `Found a pair in ${newMoves} moves!` 
            });
          } else {
            // No match, flip back
            newCards = newCards.map(c => 
              c.id === firstId || c.id === secondId 
                ? { ...c, isFlipped: false }
                : c
            );
          }

          const allMatched = newCards.every(c => c.isMatched);
          const endTime = allMatched ? Date.now() : null;
          let newScore = prev.score;
          
          if (allMatched && prev.startTime) {
            const duration = endTime! - prev.startTime;
            const timeBonus = Math.max(0, currentLevelConfig.timeBonus * 1000 - duration);
            const moveBonus = Math.max(0, (currentLevelConfig.pairs * 3 - newMoves) * 100);
            const levelBonus = currentLevelConfig.level * 500;
            newScore += Math.round(timeBonus / 100) + moveBonus + levelBonus;
            
            toast("Level Complete! 🏆", { 
              description: `+${Math.round(timeBonus / 100) + moveBonus + levelBonus} points!` 
            });
          }

          return {
            ...prev,
            cards: newCards,
            flippedCards: [],
            moves: newMoves,
            isComplete: allMatched,
            endTime,
            score: newScore,
          };
        });
      }, 1000);
    }
  }, [gameState.flippedCards, gameState.cards, gameState.moves, currentLevelConfig]);

  const nextLevel = useCallback(() => {
    if (gameState.currentLevel < LEVELS.length) {
      resetGame(gameState.currentLevel + 1);
    }
  }, [gameState.currentLevel, resetGame]);

  // Save progress whenever level or score changes
  useEffect(() => {
    if (isLoaded) {
      saveProgress(gameState);
    }
  }, [gameState.currentLevel, gameState.score, isLoaded, saveProgress]);

  const isCardDisabled = gameState.flippedCards.length === 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/10 p-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader 
          moves={gameState.moves} 
          startTime={gameState.startTime}
          isComplete={gameState.isComplete}
          currentLevel={gameState.currentLevel}
          levelName={currentLevelConfig.name}
          score={gameState.score}
        />
        
        <motion.div 
          className={`grid gap-2 sm:gap-4 mb-8 justify-items-center max-w-fit mx-auto`}
          style={{ 
            gridTemplateColumns: `repeat(${currentLevelConfig.gridCols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${currentLevelConfig.gridRows}, minmax(0, 1fr))` 
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {gameState.cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MemoryCard
                  card={card}
                  onClick={() => handleCardClick(card.id)}
                  isDisabled={isCardDisabled}
                  size={currentLevelConfig.gridCols >= 5 ? "small" : "normal"}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center space-y-4">
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => resetGame(1)}
              variant="outline"
              size="lg"
              className="bg-background/50 backdrop-blur-sm hover:bg-background/70"
            >
              Restart Game
            </Button>
            
            {gameState.currentLevel > 1 && (
              <Button
                onClick={() => resetGame(gameState.currentLevel)}
                variant="outline"
                size="lg"
                className="bg-background/50 backdrop-blur-sm hover:bg-background/70"
              >
                Retry Level
              </Button>
            )}
          </div>
        </div>

        <WinModal 
          isOpen={gameState.isComplete}
          moves={gameState.moves}
          startTime={gameState.startTime}
          endTime={gameState.endTime}
          currentLevel={gameState.currentLevel}
          levelName={currentLevelConfig.name}
          score={gameState.score}
          hasNextLevel={gameState.currentLevel < LEVELS.length}
          onNewGame={() => resetGame(1)}
          onRetryLevel={() => resetGame(gameState.currentLevel)}
          onNextLevel={nextLevel}
        />
      </div>
    </div>
  );
};