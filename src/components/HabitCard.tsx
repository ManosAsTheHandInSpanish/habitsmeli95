import { useState } from "react";
import type { HabitWithStats, ViewPeriod, Completion } from "../types";
import { toggleCompletion, deleteHabit } from "../lib/db";
import { calculatePeriodStats } from "../lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "./ui/alert-dialog";

interface HabitCardProps {
  habit: HabitWithStats;
  viewPeriod: ViewPeriod;
  completions: Completion[];
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function HabitCard({ habit, viewPeriod, completions, onToggle, onEdit, onDelete }: HabitCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isTogglingCompletion, setIsTogglingCompletion] = useState(false);

  // Calculate period stats
  const periodStats = calculatePeriodStats(habit, completions, viewPeriod);
  const periodLabel = viewPeriod === "daily" ? "aujourd'hui" :
                      viewPeriod === "weekly" ? "cette semaine" :
                      viewPeriod === "monthly" ? "ce mois" : "cette année";

  const handleToggle = async () => {
    if (isTogglingCompletion) return;
    setIsTogglingCompletion(true);
    try {
      await toggleCompletion(habit.id);
      onToggle();
    } catch (error) {
      console.error("Error toggling completion:", error);
    } finally {
      setIsTogglingCompletion(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteHabit(habit.id);
      onDelete();
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting habit:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card
        className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow"
        style={{ borderLeft: `4px solid ${habit.color}` }}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <div className="pt-1">
            <Checkbox
              checked={habit.isCompletedToday}
              onCheckedChange={handleToggle}
              disabled={isTogglingCompletion}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-2xl" style={{ color: habit.color }}>
                {habit.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{habit.name}</h3>
                {habit.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {habit.description}
                  </p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              {habit.currentStreak > 0 && (
                <div className="flex items-center gap-1">
                  <span>🔥</span>
                  <span className="font-medium">{habit.currentStreak} jours</span>
                </div>
              )}
              <div>
                <span className="font-medium">{periodStats.completionsInPeriod}/{periodStats.expectedCompletions}</span> {periodLabel}
              </div>
              <div>
                <span
                  className="font-medium"
                  style={{
                    color:
                      periodStats.periodRate >= 80
                        ? "#10b981"
                        : periodStats.periodRate >= 50
                        ? "#f59e0b"
                        : "#ef4444",
                  }}
                >
                  {periodStats.periodRate}%
                </span>{" "}
                sur la période
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="h-8 w-8 hover:bg-primary/10"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDeleteDialog(true)}
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'habitude ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer "{habit.name}" ? Cette action est
              irréversible et supprimera également tout l'historique de cette habitude.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
