import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GameHeaderProps {
  moves: number;
  startTime: number | null;
  isComplete: boolean;
  currentLevel: number;
  levelName: string;
  score: number;
}

export const GameHeader = ({ moves, startTime, isComplete, currentLevel, levelName, score }: GameHeaderProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (startTime && !isComplete) {
      interval = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Memory Card Game
      </h1>
      
      <div className="mb-6 text-center">
        <span className="text-lg text-muted-foreground">Level {currentLevel}: </span>
        <span className="text-xl font-bold text-foreground">{levelName}</span>
      </div>
      
      <div className="flex justify-center gap-3 md:gap-8 text-sm md:text-lg flex-wrap">
        <motion.div 
          className="bg-card/50 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg border border-border/20"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-muted-foreground">Score: </span>
          <span className="text-foreground font-bold">{score.toLocaleString()}</span>
        </motion.div>
        <motion.div 
          className="bg-card/50 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg border border-border/20"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-muted-foreground">Moves: </span>
          <span className="text-foreground font-bold">{moves}</span>
        </motion.div>
        
        <motion.div 
          className="bg-card/50 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg border border-border/20"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-muted-foreground">Time: </span>
          <span className="text-foreground font-bold">{formatTime(time)}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};