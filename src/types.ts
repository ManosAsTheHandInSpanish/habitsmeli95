export type HabitFrequency = "daily" | "weekly" | "monthly";

export type ViewPeriod = "daily" | "weekly" | "monthly" | "yearly";

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  frequency: HabitFrequency;
  created_at: string;
  is_archived: boolean;
}

export interface Completion {
  id: string;
  user_id: string;
  habit_id: string;
  date: string; // YYYY-MM-DD
  completed_at: string;
}

export interface HabitWithStats extends Habit {
  currentStreak: number;
  bestStreak: number;
  totalCompletions: number;
  completionRate: number;
  isCompletedToday: boolean;
}

export const HABIT_ICONS = [
  "🏃", "💪", "🧘", "📚", "✍️", "🎨",
  "🎵", "🌱", "💧", "🍎", "😴", "🧠",
  "❤️", "☀️", "🌙", "⭐", "🎯", "📱",
  "💻", "🎮", "📝", "🎓", "🏋️", "🚴"
];

export const HABIT_COLORS = [
  "#FFB3D9", // Rose pastel
  "#B3D9FF", // Bleu pastel
  "#B3FFD9", // Vert menthe
  "#FFFEB3", // Jaune pastel
  "#D9B3FF", // Violet pastel
  "#FFD9B3", // Orange pastel
  "#B3FFE6", // Turquoise pastel
  "#E6B3FF", // Lavande pastel
];

export const HABIT_FREQUENCIES = [
  { value: "daily" as HabitFrequency, label: "Quotidien" },
  { value: "weekly" as HabitFrequency, label: "Hebdomadaire" },
  { value: "monthly" as HabitFrequency, label: "Mensuel" },
];

export const VIEW_PERIODS = [
  { value: "daily" as ViewPeriod, label: "Jour" },
  { value: "weekly" as ViewPeriod, label: "Semaine" },
  { value: "monthly" as ViewPeriod, label: "Mois" },
  { value: "yearly" as ViewPeriod, label: "Année" },
];
