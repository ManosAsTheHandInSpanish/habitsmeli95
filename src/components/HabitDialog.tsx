import { useState, useEffect } from "react";
import type { Habit } from "../types";
import { HABIT_ICONS, HABIT_COLORS } from "../types";
import { createHabit, updateHabit } from "../lib/db";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface HabitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habit?: Habit;
  onSuccess: () => void;
}

export function HabitDialog({
  open,
  onOpenChange,
  habit,
  onSuccess,
}: HabitDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(HABIT_ICONS[0]);
  const [color, setColor] = useState(HABIT_COLORS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setDescription(habit.description || "");
      setIcon(habit.icon);
      setColor(habit.color);
    } else {
      setName("");
      setDescription("");
      setIcon(HABIT_ICONS[0]);
      setColor(HABIT_COLORS[0]);
    }
    setError("");
  }, [habit, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Le nom est obligatoire");
      return;
    }

    if (name.length > 50) {
      setError("Le nom ne peut pas dépasser 50 caractères");
      return;
    }

    if (description.length > 200) {
      setError("La description ne peut pas dépasser 200 caractères");
      return;
    }

    setLoading(true);

    try {
      if (habit) {
        await updateHabit(habit.id, {
          name: name.trim(),
          description: description.trim() || undefined,
          icon,
          color,
        });
      } else {
        await createHabit({
          name: name.trim(),
          description: description.trim() || undefined,
          icon,
          color,
        });
      }
      onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogClose onClick={() => onOpenChange(false)} />
        <DialogHeader>
          <DialogTitle>
            {habit ? "Modifier l'habitude" : "Nouvelle habitude"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Nom <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Ex: Faire du sport"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              {name.length}/50 caractères
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Ex: 30 minutes de course à pied"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
              disabled={loading}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/200 caractères
            </p>
          </div>

          <div className="space-y-2">
            <Label>Icône</Label>
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
              {HABIT_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`text-2xl p-3 rounded-lg border-2 transition-all flex-shrink-0 snap-start ${
                    icon === emoji
                      ? "border-primary bg-primary/10 scale-110"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                  disabled={loading}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Couleur</Label>
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
              {HABIT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-12 w-12 rounded-lg border-2 transition-all flex-shrink-0 snap-start ${
                    color === c
                      ? "border-gray-800 scale-110"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: c }}
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : habit ? "Modifier" : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
