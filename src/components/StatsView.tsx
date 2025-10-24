import type { HabitWithStats, ViewPeriod, Completion } from "../types";
import { calculatePeriodStats } from "../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface StatsViewProps {
  habits: HabitWithStats[];
  viewPeriod: ViewPeriod;
  completions: Completion[];
}

export function StatsView({ habits, viewPeriod, completions }: StatsViewProps) {
  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Aucune habitude pour le moment. Créez-en une pour voir vos statistiques !
        </p>
      </div>
    );
  }

  // Calculate period stats for all habits
  const periodStatsAll = habits.map((habit) =>
    calculatePeriodStats(habit, completions, viewPeriod)
  );

  // Calculate global stats
  const totalCompletionsInPeriod = periodStatsAll.reduce(
    (sum, stat) => sum + stat.completionsInPeriod,
    0
  );

  const totalExpectedInPeriod = periodStatsAll.reduce(
    (sum, stat) => sum + stat.expectedCompletions,
    0
  );

  const periodCompletionRate = totalExpectedInPeriod > 0
    ? Math.round((totalCompletionsInPeriod / totalExpectedInPeriod) * 100)
    : 0;

  const bestStreak = Math.max(...habits.map((h) => h.bestStreak));

  const activeStreaks = habits.filter((h) => h.currentStreak > 0).length;

  // Top 3 habits by period completion rate
  const habitsWithPeriodStats = habits.map((habit, index) => ({
    ...habit,
    periodStats: periodStatsAll[index],
  }));

  const topHabits = [...habitsWithPeriodStats]
    .sort((a, b) => b.periodStats.periodRate - a.periodStats.periodRate)
    .slice(0, 3);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de réussite {viewPeriod === "daily" ? "du jour" : viewPeriod === "weekly" ? "de la semaine" : viewPeriod === "monthly" ? "du mois" : "de l'année"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {periodCompletionRate}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Validations {viewPeriod === "daily" ? "du jour" : viewPeriod === "weekly" ? "de la semaine" : viewPeriod === "monthly" ? "du mois" : "de l'année"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">
              {totalCompletionsInPeriod}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Meilleur streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              🔥 {bestStreak}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Séries actives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {activeStreaks}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 3 Habits */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Top 3 des habitudes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topHabits.map((habit, index) => (
            <div
              key={habit.id}
              className="flex items-center gap-4 p-3 rounded-lg border"
              style={{ borderLeft: `4px solid ${habit.color}` }}
            >
              <span className="text-2xl">{medals[index]}</span>
              <span className="text-2xl" style={{ color: habit.color }}>
                {habit.icon}
              </span>
              <div className="flex-1">
                <h4 className="font-semibold">{habit.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {habit.periodStats.periodRate}% de réussite • {habit.periodStats.completionsInPeriod}/{habit.periodStats.expectedCompletions}{" "}
                  {viewPeriod === "daily" ? "aujourd'hui" : viewPeriod === "weekly" ? "cette semaine" : viewPeriod === "monthly" ? "ce mois" : "cette année"}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* All habits detailed stats */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Toutes les habitudes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {habitsWithPeriodStats.map((habit) => (
            <div
              key={habit.id}
              className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50/50 transition-colors"
              style={{ borderLeft: `4px solid ${habit.color}` }}
            >
              <span className="text-2xl" style={{ color: habit.color }}>
                {habit.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate">{habit.name}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">
                      {habit.periodStats.periodRate}%
                    </span>{" "}
                    sur période
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {habit.periodStats.completionsInPeriod}/{habit.periodStats.expectedCompletions}
                    </span>{" "}
                    {viewPeriod === "daily" ? "jour" : viewPeriod === "weekly" ? "semaine" : viewPeriod === "monthly" ? "mois" : "année"}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      🔥 {habit.currentStreak}
                    </span>{" "}
                    jours
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      ⭐ {habit.bestStreak}
                    </span>{" "}
                    meilleur
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
