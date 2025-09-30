import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryCard } from "./MemoryCard";
import { GameHeader } from "./GameHeader";
import { WinModal } from "./WinModal";
import { Button } from "@/components/ui/button";
import { Card, GameState } from "@/types/game";
import { toast } from "sonner";

const createShuffledDeck = (): Card[] => {
  const pairs = [];
  for (let i = 1; i <= 8; i++) {
    pairs.push(
      { id: i * 2 - 1, value: i, isFlipped: false, isMatched: false },
      { id: i * 2, value: i, isFlipped: false, isMatched: false }
    );
  }
  return pairs.sort(() => Math.random() - 0.5);
};

export const GameBoard = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: createShuffledDeck(),
    flippedCards: [],
    moves: 0,
    isComplete: false,
    startTime: null,
    endTime: null,
  });

  const resetGame = useCallback(() => {
    setGameState({
      cards: createShuffledDeck(),
      flippedCards: [],
      moves: 0,
      isComplete: false,
      startTime: null,
      endTime: null,
    });
    toast("New game started! Good luck! 🎮");
  }, []);

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
          
          if (allMatched) {
            const duration = endTime! - (prev.startTime || 0);
            toast("Congratulations! 🏆", { 
              description: `You won in ${newMoves} moves and ${Math.round(duration / 1000)} seconds!` 
            });
          }

          return {
            ...prev,
            cards: newCards,
            flippedCards: [],
            moves: newMoves,
            isComplete: allMatched,
            endTime,
          };
        });
      }, 1000);
    }
  }, [gameState.flippedCards, gameState.cards, gameState.moves]);

  const isCardDisabled = gameState.flippedCards.length === 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/10 p-4">
      <div className="max-w-2xl mx-auto">
        <GameHeader 
          moves={gameState.moves} 
          startTime={gameState.startTime}
          isComplete={gameState.isComplete}
        />
        
        <motion.div 
          className="grid grid-cols-4 gap-4 mb-8 justify-items-center"
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
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center">
          <Button
            onClick={resetGame}
            variant="outline"
            size="lg"
            className="bg-background/50 backdrop-blur-sm hover:bg-background/70"
          >
            New Game
          </Button>
        </div>

        <WinModal 
          isOpen={gameState.isComplete}
          moves={gameState.moves}
          startTime={gameState.startTime}
          endTime={gameState.endTime}
          onNewGame={resetGame}
        />
      </div>
    </div>
  );
};