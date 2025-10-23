export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
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
