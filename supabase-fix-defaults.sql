-- Script de correction pour assurer que tous les defaults sont bien configurés
-- Exécutez ce script dans le SQL Editor de Supabase

-- S'assurer que la colonne id a bien la valeur par défaut gen_random_uuid()
ALTER TABLE habits
ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- S'assurer que created_at a bien la valeur par défaut NOW()
ALTER TABLE habits
ALTER COLUMN created_at SET DEFAULT NOW();

-- S'assurer que is_archived a bien la valeur par défaut false
ALTER TABLE habits
ALTER COLUMN is_archived SET DEFAULT false;

-- S'assurer que frequency a bien la valeur par défaut 'daily'
ALTER TABLE habits
ALTER COLUMN frequency SET DEFAULT 'daily';

-- Faire la même chose pour la table completions
ALTER TABLE completions
ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE completions
ALTER COLUMN completed_at SET DEFAULT NOW();
