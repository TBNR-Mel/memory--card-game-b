import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GameHeaderProps {
  moves: number;
  startTime: number | null;
  isComplete: boolean;
}

export const GameHeader = ({ moves, startTime, isComplete }: GameHeaderProps) => {
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
      <h1 className="text-4xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Memory Card Game
      </h1>
      
      <div className="flex justify-center gap-8 text-lg">
        <motion.div 
          className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/20"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-muted-foreground">Moves: </span>
          <span className="text-foreground font-bold">{moves}</span>
        </motion.div>
        
        <motion.div 
          className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/20"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-muted-foreground">Time: </span>
          <span className="text-foreground font-bold">{formatTime(time)}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};