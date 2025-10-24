import { format, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear } from "date-fns";
import { fr } from "date-fns/locale";
import type { Completion, Habit, HabitWithStats, ViewPeriod } from "../types";

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

/**
 * Retourne le début de la période actuelle
 */
export function getStartOfPeriod(period: ViewPeriod, date: Date = new Date()): Date {
  switch (period) {
    case "daily":
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    case "weekly":
      return startOfWeek(date, { locale: fr });
    case "monthly":
      return startOfMonth(date);
    case "yearly":
      return startOfYear(date);
  }
}

/**
 * Retourne la fin de la période actuelle
 */
export function getEndOfPeriod(period: ViewPeriod, date: Date = new Date()): Date {
  switch (period) {
    case "daily":
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    case "weekly":
      return endOfWeek(date, { locale: fr });
    case "monthly":
      return endOfMonth(date);
    case "yearly":
      return endOfYear(date);
  }
}

/**
 * Filtre les completions dans une période donnée
 */
export function getCompletionsInPeriod(
  completions: Completion[],
  startDate: Date,
  endDate: Date
): Completion[] {
  const start = formatDateToYMD(startDate);
  const end = formatDateToYMD(endDate);

  return completions.filter((c) => {
    return c.date >= start && c.date <= end;
  });
}

/**
 * Calcule le nombre de périodes complétées selon la fréquence de l'habitude
 */
export function getExpectedCompletionsInPeriod(
  habit: Habit,
  startDate: Date,
  endDate: Date
): number {
  const habitStart = new Date(habit.created_at);
  const effectiveStart = habitStart > startDate ? habitStart : startDate;

  // Si l'habitude n'existait pas encore dans cette période
  if (effectiveStart > endDate) return 0;

  const daysSinceStart = Math.floor(
    (endDate.getTime() - effectiveStart.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  switch (habit.frequency) {
    case "daily":
      return daysSinceStart;
    case "weekly":
      return Math.floor(daysSinceStart / 7);
    case "monthly":
      // Approximation : 30 jours par mois
      return Math.floor(daysSinceStart / 30);
    default:
      return daysSinceStart;
  }
}

/**
 * Calcule les statistiques pour une période donnée
 */
export function calculatePeriodStats(
  habit: Habit,
  completions: Completion[],
  period: ViewPeriod
): {
  completionsInPeriod: number;
  expectedCompletions: number;
  periodRate: number;
} {
  const startDate = getStartOfPeriod(period);
  const endDate = getEndOfPeriod(period);

  const habitCompletions = completions.filter((c) => c.habit_id === habit.id);
  const periodCompletions = getCompletionsInPeriod(habitCompletions, startDate, endDate);

  const expected = getExpectedCompletionsInPeriod(habit, startDate, endDate);
  const actual = periodCompletions.length;

  const rate = expected > 0 ? Math.round((actual / expected) * 100) : 0;

  return {
    completionsInPeriod: actual,
    expectedCompletions: expected,
    periodRate: rate,
  };
}

/**
 * Formate une période en texte
 */
export function formatPeriod(period: ViewPeriod, date: Date = new Date()): string {
  switch (period) {
    case "daily":
      return format(date, "EEEE d MMMM yyyy", { locale: fr });
    case "weekly":
      const weekStart = startOfWeek(date, { locale: fr });
      const weekEnd = endOfWeek(date, { locale: fr });
      return `Semaine du ${format(weekStart, "d MMM", { locale: fr })} au ${format(weekEnd, "d MMM yyyy", { locale: fr })}`;
    case "monthly":
      return format(date, "MMMM yyyy", { locale: fr });
    case "yearly":
      return format(date, "yyyy", { locale: fr });
  }
}
