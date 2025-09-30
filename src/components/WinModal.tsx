import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface WinModalProps {
  isOpen: boolean;
  moves: number;
  startTime: number | null;
  endTime: number | null;
  currentLevel: number;
  levelName: string;
  score: number;
  hasNextLevel: boolean;
  onNewGame: () => void;
  onRetryLevel: () => void;
  onNextLevel: () => void;
}

export const WinModal = ({ isOpen, moves, startTime, endTime, currentLevel, levelName, score, hasNextLevel, onNewGame, onRetryLevel, onNextLevel }: WinModalProps) => {
  const getGameDuration = () => {
    if (!startTime || !endTime) return 0;
    return Math.round((endTime - startTime) / 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = () => {
    if (currentLevel <= 2 && moves <= 8) return "Perfect! 🏆";
    if (currentLevel <= 4 && moves <= 15) return "Excellent! 🌟";
    if (currentLevel <= 6 && moves <= 25) return "Great job! 🎉";
    if (moves <= 35) return "Well done! 👏";
    return "Keep practicing! 💪";
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="text-center p-6"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Level {currentLevel} Complete!
              </h2>
              
              <p className="text-lg text-primary font-semibold mb-1">
                {levelName}
              </p>
              
              <p className="text-lg text-muted-foreground mb-6">
                {getPerformanceMessage()}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center bg-primary/10 p-3 rounded-lg">
                  <span className="text-muted-foreground">Score:</span>
                  <span className="font-bold text-foreground text-lg">{score.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                  <span className="text-muted-foreground">Moves:</span>
                  <span className="font-bold text-foreground">{moves}</span>
                </div>
                
                <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-bold text-foreground">{formatTime(getGameDuration())}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {hasNextLevel && (
                  <Button 
                    onClick={onNextLevel}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Next Level
                  </Button>
                )}
                
                <div className="flex gap-3">
                  <Button 
                    onClick={onRetryLevel}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    Retry Level
                  </Button>
                  
                  <Button 
                    onClick={onNewGame}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    Restart Game
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};