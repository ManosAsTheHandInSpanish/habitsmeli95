import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Completion, Habit, HabitWithStats } from "../types";

/**
 * Retourne la date du jour au format YYYY-MM-DD
 */
export function getTodayString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Formate une date en français
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "EEEE d MMMM yyyy", { locale: fr });
}

/**
 * Calcule le streak actuel d'une habitude
 * Compte les jours consécutifs depuis aujourd'hui ou hier
 */
export function calculateCurrentStreak(completions: Completion[]): number {
  if (completions.length === 0) return 0;

  const today = getTodayString();
  const sortedDates = completions
    .map((c) => c.date)
    .sort()
    .reverse(); // Plus récent en premier

  let streak = 0;
  let checkDate = new Date();

  // Si aujourd'hui n'est pas complété, commencer à hier
  if (!sortedDates.includes(today)) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // Compter les jours consécutifs en arrière
  while (true) {
    const dateStr = formatDateToYMD(checkDate);
    if (sortedDates.includes(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Calcule le meilleur streak d'une habitude
 * Plus longue série consécutive dans tout l'historique
 */
export function calculateBestStreak(completions: Completion[]): number {
  if (completions.length === 0) return 0;

  const sortedDates = completions
    .map((c) => new Date(c.date))
    .sort((a, b) => a.getTime() - b.getTime());

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i - 1];
    const currDate = sortedDates[i];
    const diffDays = Math.floor(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
}

/**
 * Calcule le taux de réussite d'une habitude
 * Nombre de jours complétés / nombre de jours depuis la création
 */
export function calculateCompletionRate(
  habit: Habit,
  completions: Completion[]
): number {
  const createdAt = new Date(habit.created_at);
  const today = new Date();
  const daysSinceCreation = Math.floor(
    (today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  if (daysSinceCreation === 0) return 0;

  const rate = (completions.length / daysSinceCreation) * 100;
  return Math.round(rate);
}

/**
 * Enrichit une habitude avec ses statistiques
 */
export function getHabitWithStats(
  habit: Habit,
  completions: Completion[]
): HabitWithStats {
  const habitCompletions = completions.filter((c) => c.habit_id === habit.id);
  const today = getTodayString();

  return {
    ...habit,
    currentStreak: calculateCurrentStreak(habitCompletions),
    bestStreak: calculateBestStreak(habitCompletions),
    totalCompletions: habitCompletions.length,
    completionRate: calculateCompletionRate(habit, habitCompletions),
    isCompletedToday: habitCompletions.some((c) => c.date === today),
  };
}

/**
 * Formate une date en YYYY-MM-DD
 */
function formatDateToYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Retourne l'emoji motivant selon le taux de complétion
 */
export function getMotivationEmoji(rate: number): string {
  if (rate === 100) return "🎉";
  if (rate >= 50) return "💪";
  return "🌱";
}
