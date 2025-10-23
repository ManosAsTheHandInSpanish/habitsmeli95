import type { HabitWithStats } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface StatsViewProps {
  habits: HabitWithStats[];
}

export function StatsView({ habits }: StatsViewProps) {
  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Aucune habitude pour le moment. Créez-en une pour voir vos statistiques !
        </p>
      </div>
    );
  }

  // Calculate global stats
  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.totalCompletions,
    0
  );

  const globalCompletionRate =
    habits.reduce((sum, habit) => sum + habit.completionRate, 0) / habits.length;

  const bestStreak = Math.max(...habits.map((h) => h.bestStreak));

  const activeStreaks = habits.filter((h) => h.currentStreak > 0).length;

  // Top 3 habits by completion rate
  const topHabits = [...habits]
    .sort((a, b) => b.completionRate - a.completionRate)
    .slice(0, 3);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de réussite global
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {Math.round(globalCompletionRate)}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de validations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">
              {totalCompletions}
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
                  {habit.completionRate}% de réussite • {habit.totalCompletions}{" "}
                  validations
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
          {habits.map((habit) => (
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
                      {habit.completionRate}%
                    </span>{" "}
                    réussite
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {habit.totalCompletions}
                    </span>{" "}
                    validations
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
