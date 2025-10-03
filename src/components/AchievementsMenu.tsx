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
          <Trophy className="mr-2 h-5 w-5" />
          Achievements
          <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
            {unlockedCount}/{totalCount}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            Achievements
          </DialogTitle>
          <DialogDescription>
            Track your progress and unlock rewards
          </DialogDescription>
        </DialogHeader>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-bold">
              {unlockedCount} / {totalCount} ({Math.round(percentage)}%)
            </span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="grid gap-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-lg border ${
                achievement.unlocked
                  ? "bg-primary/10 border-primary/30"
                  : "bg-muted/50 border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`text-4xl ${
                    achievement.unlocked ? "grayscale-0" : "grayscale opacity-30"
                  }`}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
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
                    <p className="text-xs text-primary mt-2">
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
