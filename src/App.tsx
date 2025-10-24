import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { getHabits, getCompletions } from "./lib/db";
import { getHabitWithStats, getMotivationEmoji, formatPeriod, calculatePeriodStats } from "./lib/utils";
import { initializeCapacitor } from "./lib/capacitor";
import type { Habit, Completion, HabitWithStats, ViewPeriod } from "./types";
import { VIEW_PERIODS } from "./types";
import { Auth } from "./components/Auth";
import { HabitDialog } from "./components/HabitDialog";
import { HabitCard } from "./components/HabitCard";
import { StatsView } from "./components/StatsView";
import { Button } from "./components/ui/button";
import { Plus, LogOut, BarChart3, Home } from "lucide-react";

type Tab = "today" | "stats";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [habitsWithStats, setHabitsWithStats] = useState<HabitWithStats[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [viewPeriod, setViewPeriod] = useState<ViewPeriod>("daily");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();

  // Initialize Capacitor on mount
  useEffect(() => {
    initializeCapacitor();
  }, []);

  // Check auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load habits and completions
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  // Calculate stats when habits or completions change
  useEffect(() => {
    const stats = habits.map((habit) => getHabitWithStats(habit, completions));
    setHabitsWithStats(stats);
  }, [habits, completions]);

  const loadData = async () => {
    try {
      const [habitsData, completionsData] = await Promise.all([
        getHabits(),
        getCompletions(),
      ]);
      setHabits(habitsData);
      setCompletions(completionsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleOpenDialog = (habit?: Habit) => {
    setEditingHabit(habit);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingHabit(undefined);
  };

  const handleDialogSuccess = () => {
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  // Calculate period progress
  const periodStats = habitsWithStats.map((habit) =>
    calculatePeriodStats(habit, completions, viewPeriod)
  );
  const totalExpected = periodStats.reduce((sum, stat) => sum + stat.expectedCompletions, 0);
  const totalCompleted = periodStats.reduce((sum, stat) => sum + stat.completionsInPeriod, 0);
  const periodRate = totalExpected > 0 ? Math.round((totalCompleted / totalExpected) * 100) : 0;

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Mes Habitudes
            </h1>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">
                {formatPeriod(viewPeriod)}
              </div>
              <select
                value={viewPeriod}
                onChange={(e) => setViewPeriod(e.target.value as ViewPeriod)}
                className="text-sm border rounded px-2 py-1 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {VIEW_PERIODS.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle habitude
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4 border-b">
            <button
              onClick={() => setActiveTab("today")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                activeTab === "today"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Home className="h-4 w-4" />
              Aujourd'hui
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                activeTab === "stats"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Statistiques
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === "today" ? (
          <>
            {/* Progress bar */}
            {totalExpected > 0 && (
              <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Progression de la {viewPeriod === "daily" ? "journée" : viewPeriod === "weekly" ? "semaine" : viewPeriod === "monthly" ? "mois" : "année"}
                  </span>
                  <span className="text-2xl">{getMotivationEmoji(periodRate)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300"
                      style={{ width: `${periodRate}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium min-w-[4rem] text-right">
                    {totalCompleted}/{totalExpected} ({periodRate}%)
                  </span>
                </div>
              </div>
            )}

            {/* Habits list */}
            {habitsWithStats.length === 0 ? (
              <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                <p className="text-muted-foreground mb-4">
                  Vous n'avez pas encore d'habitudes.
                </p>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer ma première habitude
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {habitsWithStats.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    viewPeriod={viewPeriod}
                    completions={completions}
                    onToggle={loadData}
                    onEdit={() => handleOpenDialog(habit)}
                    onDelete={loadData}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <StatsView habits={habitsWithStats} viewPeriod={viewPeriod} completions={completions} />
        )}
      </main>

      {/* Habit Dialog */}
      <HabitDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseDialog();
        }}
        habit={editingHabit}
        onSuccess={handleDialogSuccess}
      />
    </div>
  );
}

export default App;
