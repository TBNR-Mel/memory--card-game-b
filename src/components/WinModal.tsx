import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface WinModalProps {
  isOpen: boolean;
  moves: number;
  startTime: number | null;
  endTime: number | null;
  onNewGame: () => void;
}

export const WinModal = ({ isOpen, moves, startTime, endTime, onNewGame }: WinModalProps) => {
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
    if (moves <= 16) return "Perfect! 🏆";
    if (moves <= 20) return "Excellent! 🌟";
    if (moves <= 25) return "Great job! 🎉";
    return "Well done! 👏";
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
                Congratulations!
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6">
                {getPerformanceMessage()}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                  <span className="text-muted-foreground">Moves:</span>
                  <span className="font-bold text-foreground">{moves}</span>
                </div>
                
                <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-bold text-foreground">{formatTime(getGameDuration())}</span>
                </div>
              </div>
              
              <Button 
                onClick={onNewGame}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
              >
                Play Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};