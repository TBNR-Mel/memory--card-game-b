import { motion } from "framer-motion";
import { Card } from "@/types/game";

interface MemoryCardProps {
  card: Card;
  onClick: () => void;
  isDisabled: boolean;
  size?: "normal" | "small";
}

const cardColors = {
  1: "bg-card-red",
  2: "bg-card-blue", 
  3: "bg-card-green",
  4: "bg-card-yellow",
  5: "bg-card-purple",
  6: "bg-card-orange",
  7: "bg-card-pink",
  8: "bg-card-cyan",
};

const cardSymbols = {
  1: "🌟",
  2: "🎨", 
  3: "🌈",
  4: "⚡",
  5: "🎭",
  6: "🔥",
  7: "💎",
  8: "🎪",
};

export const MemoryCard = ({ card, onClick, isDisabled, size = "normal" }: MemoryCardProps) => {
  const cardSize = size === "small" ? "w-12 h-12 sm:w-16 sm:h-16" : "w-16 h-16 sm:w-20 sm:h-20";
  const iconSize = size === "small" ? "text-lg sm:text-xl" : "text-xl sm:text-2xl";
  
  return (
    <motion.div
      className={`relative ${cardSize} cursor-pointer perspective-1000`}
      onClick={!isDisabled ? onClick : undefined}
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
    >
      <motion.div
        className="relative w-full h-full transform-style-preserve-3d transition-transform duration-600"
        animate={{ rotateY: card.isFlipped ? 180 : 0 }}
      >
        {/* Card Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="w-full h-full bg-card-back rounded-lg border-2 border-border/20 shadow-lg flex items-center justify-center">
            <div className={`${size === "small" ? "w-4 h-4 sm:w-6 sm:h-6" : "w-6 h-6 sm:w-8 sm:h-8"} bg-gradient-to-br from-primary to-primary/60 rounded-full shadow-inner`}></div>
          </div>
        </div>

        {/* Card Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div 
            className={`w-full h-full ${cardColors[card.value]} rounded-lg border-2 border-white/20 shadow-lg flex items-center justify-center ${iconSize} transform transition-all duration-300 ${
              card.isMatched ? 'ring-4 ring-success animate-pulse-glow' : ''
            }`}
          >
            <span className="drop-shadow-lg">{cardSymbols[card.value]}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};