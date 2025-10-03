import { Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Achievement } from "@/types/achievements";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface AchievementsMenuProps {
  achievements: Achievement[];
}

export const AchievementsMenu = ({ achievements }: AchievementsMenuProps) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const percentage = (unlockedCount / totalCount) * 100;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="relative">
          <Trophy className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-2" />
          <span className="hidden sm:inline">Achievements</span>
          <span className="ml-1 sm:ml-2 text-xs bg-primary text-primary-foreground px-1.5 sm:px-2 py-0.5 rounded-full">
            {unlockedCount}/{totalCount}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[85vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            Achievements
          </DialogTitle>
          <DialogDescription className="text-sm">
            Track your progress and unlock rewards
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between text-xs sm:text-sm mb-2">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-bold">
              {unlockedCount} / {totalCount} ({Math.round(percentage)}%)
            </span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="grid gap-2 sm:gap-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 sm:p-4 rounded-lg border ${
                achievement.unlocked
                  ? "bg-primary/10 border-primary/30"
                  : "bg-muted/50 border-border"
              }`}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div
                  className={`text-2xl sm:text-4xl flex-shrink-0 ${
                    achievement.unlocked ? "grayscale-0" : "grayscale opacity-30"
                  }`}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base sm:text-lg mb-1 break-words">{achievement.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 break-words">
                    {achievement.description}
                  </p>
                  
                  {achievement.maxProgress && achievement.maxProgress > 1 && (
                    <div className="mt-2">
                      <Progress
                        value={((achievement.progress || 0) / achievement.maxProgress) * 100}
                        className="h-1.5"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.progress || 0} / {achievement.maxProgress}
                      </p>
                    </div>
                  )}
                  
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-[10px] sm:text-xs text-primary mt-2 break-words">
                      ✓ Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
