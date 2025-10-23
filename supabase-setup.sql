-- Création de la table habits
CREATE TABLE IF NOT EXISTS habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  frequency TEXT NOT NULL DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_archived BOOLEAN DEFAULT false
);

-- Création de la table completions
CREATE TABLE IF NOT EXISTS completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(habit_id, date)
);

-- Activation de Row Level Security sur habits
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

-- Activation de Row Level Security sur completions
ALTER TABLE completions ENABLE ROW LEVEL SECURITY;

-- Policies pour la table habits

-- Permettre aux utilisateurs de voir uniquement leurs propres habitudes
CREATE POLICY "Users can view their own habits"
  ON habits FOR SELECT
  USING (auth.uid() = user_id);

-- Permettre aux utilisateurs de créer leurs propres habitudes
CREATE POLICY "Users can insert their own habits"
  ON habits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Permettre aux utilisateurs de mettre à jour leurs propres habitudes
CREATE POLICY "Users can update their own habits"
  ON habits FOR UPDATE
  USING (auth.uid() = user_id);

-- Permettre aux utilisateurs de supprimer leurs propres habitudes
CREATE POLICY "Users can delete their own habits"
  ON habits FOR DELETE
  USING (auth.uid() = user_id);

-- Policies pour la table completions

-- Permettre aux utilisateurs de voir uniquement leurs propres completions
CREATE POLICY "Users can view their own completions"
  ON completions FOR SELECT
  USING (auth.uid() = user_id);

-- Permettre aux utilisateurs de créer leurs propres completions
CREATE POLICY "Users can insert their own completions"
  ON completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Permettre aux utilisateurs de supprimer leurs propres completions
CREATE POLICY "Users can delete their own completions"
  ON completions FOR DELETE
  USING (auth.uid() = user_id);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS habits_user_id_idx ON habits(user_id);
CREATE INDEX IF NOT EXISTS completions_user_id_idx ON completions(user_id);
CREATE INDEX IF NOT EXISTS completions_habit_id_idx ON completions(habit_id);
CREATE INDEX IF NOT EXISTS completions_date_idx ON completions(date);
