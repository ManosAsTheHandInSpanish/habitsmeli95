import { supabase } from "./supabase";
import type { Habit, Completion } from "../types";
import { getTodayString } from "./utils";

/**
 * Récupère toutes les habitudes de l'utilisateur connecté
 */
export async function getHabits(): Promise<Habit[]> {
  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("is_archived", false)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Crée une nouvelle habitude
 */
export async function createHabit(habit: {
  name: string;
  description?: string;
  color: string;
  icon: string;
}): Promise<Habit> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("habits")
    .insert({
      user_id: user.id,
      name: habit.name,
      description: habit.description || null,
      color: habit.color,
      icon: habit.icon,
      is_archived: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Met à jour une habitude existante
 */
export async function updateHabit(
  id: string,
  updates: {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
  }
): Promise<Habit> {
  const { data, error } = await supabase
    .from("habits")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Supprime une habitude (et ses completions via CASCADE)
 */
export async function deleteHabit(id: string): Promise<void> {
  const { error } = await supabase.from("habits").delete().eq("id", id);

  if (error) throw error;
}

/**
 * Récupère toutes les completions de l'utilisateur
 */
export async function getCompletions(): Promise<Completion[]> {
  const { data, error } = await supabase
    .from("completions")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Toggle la completion d'une habitude pour une date donnée
 */
export async function toggleCompletion(
  habitId: string,
  date: string = getTodayString()
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  // Vérifier si la completion existe déjà
  const { data: existing } = await supabase
    .from("completions")
    .select("*")
    .eq("habit_id", habitId)
    .eq("date", date)
    .single();

  if (existing) {
    // Supprimer la completion
    const { error } = await supabase
      .from("completions")
      .delete()
      .eq("id", existing.id);

    if (error) throw error;
  } else {
    // Créer la completion
    const { error } = await supabase.from("completions").insert({
      user_id: user.id,
      habit_id: habitId,
      date: date,
    });

    if (error) throw error;
  }
}
