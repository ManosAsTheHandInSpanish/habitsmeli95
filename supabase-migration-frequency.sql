-- Migration pour ajouter la colonne frequency à la table habits

-- Ajouter la colonne frequency avec valeur par défaut 'daily'
ALTER TABLE habits
ADD COLUMN IF NOT EXISTS frequency TEXT NOT NULL DEFAULT 'daily';

-- Ajouter une contrainte pour valider les valeurs possibles
ALTER TABLE habits
ADD CONSTRAINT habits_frequency_check
CHECK (frequency IN ('daily', 'weekly', 'monthly'));

-- Note: Pour les habitudes existantes, elles auront automatiquement 'daily' comme fréquence
