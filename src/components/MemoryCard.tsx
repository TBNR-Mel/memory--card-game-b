import { motion } from "framer-motion";
import { Card } from "@/types/game";

interface MemoryCardProps {
  card: Card;
  onClick: () => void;
  isDisabled: boolean;
  size?: "normal" | "small" | "tiny";
}

const cardColors: Record<number, string> = {
  1: "bg-card-red",
  2: "bg-card-blue", 
  3: "bg-card-green",
  4: "bg-card-yellow",
  5: "bg-card-purple",
  6: "bg-card-orange",
  7: "bg-card-pink",
  8: "bg-card-cyan",
  9: "bg-gradient-to-br from-red-500 to-orange-500",
  10: "bg-gradient-to-br from-blue-500 to-cyan-500",
  11: "bg-gradient-to-br from-green-500 to-emerald-500",
  12: "bg-gradient-to-br from-yellow-500 to-amber-500",
  13: "bg-gradient-to-br from-purple-500 to-pink-500",
  14: "bg-gradient-to-br from-indigo-500 to-blue-500",
  15: "bg-gradient-to-br from-rose-500 to-red-500",
  16: "bg-gradient-to-br from-teal-500 to-green-500",
  17: "bg-gradient-to-br from-orange-500 to-yellow-500",
  18: "bg-gradient-to-br from-fuchsia-500 to-purple-500",
  19: "bg-gradient-to-br from-cyan-500 to-teal-500",
  20: "bg-gradient-to-br from-amber-500 to-orange-500",
  21: "bg-gradient-to-br from-violet-500 to-indigo-500",
  22: "bg-gradient-to-br from-lime-500 to-green-500",
  23: "bg-gradient-to-br from-pink-500 to-rose-500",
  24: "bg-gradient-to-br from-sky-500 to-blue-500",
  25: "bg-gradient-to-br from-emerald-500 to-teal-500",
  26: "bg-gradient-to-br from-red-600 to-pink-600",
  27: "bg-gradient-to-br from-blue-600 to-indigo-600",
  28: "bg-gradient-to-br from-green-600 to-lime-600",
  29: "bg-gradient-to-br from-yellow-600 to-orange-600",
  30: "bg-gradient-to-br from-purple-600 to-fuchsia-600",
  31: "bg-gradient-to-br from-cyan-600 to-sky-600",
  32: "bg-gradient-to-br from-rose-600 to-red-600",
  33: "bg-gradient-to-br from-teal-600 to-emerald-600",
  34: "bg-gradient-to-br from-amber-600 to-yellow-600",
  35: "bg-gradient-to-br from-indigo-600 to-violet-600",
  36: "bg-gradient-to-br from-lime-600 to-green-600",
  37: "bg-gradient-to-br from-pink-600 to-rose-600",
  38: "bg-gradient-to-br from-sky-600 to-cyan-600",
  39: "bg-gradient-to-br from-orange-600 to-red-600",
  40: "bg-gradient-to-br from-violet-600 to-purple-600",
  41: "bg-gradient-to-br from-emerald-600 to-green-600",
  42: "bg-gradient-to-br from-fuchsia-600 to-pink-600",
  43: "bg-gradient-to-br from-blue-600 to-cyan-600",
  44: "bg-gradient-to-br from-green-600 to-teal-600",
  45: "bg-gradient-to-br from-red-600 to-orange-600",
};

const cardSymbols: Record<number, string> = {
  1: "🌟", 2: "🎨", 3: "🌈", 4: "⚡", 5: "🎭", 6: "🔥", 7: "💎", 8: "🎪",
  9: "🎯", 10: "🎲", 11: "🎸", 12: "🎺", 13: "🎻", 14: "🎹", 15: "🎤", 16: "🎧",
  17: "🎬", 18: "🎮", 19: "🎰", 20: "🎳", 21: "🏀", 22: "⚽", 23: "🏈", 24: "⚾",
  25: "🎾", 26: "🏐", 27: "🏉", 28: "🥎", 29: "🏓", 30: "🏸", 31: "🥊", 32: "🥋",
  33: "🏹", 34: "🎣", 35: "🥏", 36: "🪃", 37: "🛼", 38: "🛹", 39: "🏂", 40: "⛸️",
  41: "🥌", 42: "🎿", 43: "⛷️", 44: "🪂", 45: "🏇",
};

export const MemoryCard = ({ card, onClick, isDisabled, size = "normal" }: MemoryCardProps) => {
  const cardSize = size === "tiny" ? "w-8 h-8 sm:w-10 sm:h-10" : size === "small" ? "w-12 h-12 sm:w-16 sm:h-16" : "w-16 h-16 sm:w-20 sm:h-20";
  const iconSize = size === "tiny" ? "text-sm sm:text-base" : size === "small" ? "text-lg sm:text-xl" : "text-xl sm:text-2xl";
  const dotSize = size === "tiny" ? "w-2 h-2 sm:w-3 sm:h-3" : size === "small" ? "w-4 h-4 sm:w-6 sm:h-6" : "w-6 h-6 sm:w-8 sm:h-8";
  
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
            <div className={`${dotSize} bg-gradient-to-br from-primary to-primary/60 rounded-full shadow-inner`}></div>
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