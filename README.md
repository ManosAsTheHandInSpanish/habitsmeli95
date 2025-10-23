# Habit Tracker App

Une application web de suivi d'habitudes avec React, TypeScript, Vite, Tailwind CSS, shadcn/ui et Supabase.

## Fonctionnalités

- Authentification utilisateur (Supabase Auth)
- Création et gestion d'habitudes avec icônes et couleurs personnalisables
- Suivi quotidien des habitudes avec checkboxes
- Calcul automatique des streaks (séries) et statistiques
- Vue statistiques détaillée avec KPIs et classement
- Design responsive avec couleurs pastel douces
- Animations fluides sur les interactions

## Configuration de la base de données

1. Connectez-vous à votre projet Supabase : https://evgskaaowcwlajlotcxa.supabase.co
2. Allez dans l'onglet "SQL Editor"
3. Copiez et exécutez le contenu du fichier `supabase-setup.sql`

Le script créera :
- La table `habits` pour stocker les habitudes
- La table `completions` pour stocker les validations quotidiennes
- Les policies RLS pour la sécurité des données
- Les index pour optimiser les performances

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur http://localhost:5173

## Structure du projet

```
src/
├── lib/
│   ├── supabase.ts          # Client Supabase configuré
│   ├── db.ts                # Fonctions CRUD pour habits et completions
│   ├── utils.ts             # Utilitaires (calculs streaks, dates, stats)
│   └── cn.ts                # Utilitaire pour fusionner les classes CSS
├── components/
│   ├── ui/                  # Composants UI shadcn/ui
│   ├── Auth.tsx             # Page connexion/inscription
│   ├── HabitCard.tsx        # Carte d'affichage d'une habitude
│   ├── HabitDialog.tsx      # Dialog créer/éditer habitude
│   └── StatsView.tsx        # Vue statistiques
├── types.ts                 # Types TypeScript
└── App.tsx                  # Composant principal
```

## Technologies utilisées

- **React 18** + **TypeScript** - Framework et typage
- **Vite** - Build tool rapide
- **Tailwind CSS** - Styling avec design pastel
- **shadcn/ui** - Composants UI accessibles
- **Supabase** - Backend (Auth + PostgreSQL)
- **Lucide React** - Icônes
- **date-fns** - Manipulation des dates

## Palette de couleurs

L'application utilise 8 couleurs pastel :
- Rose (#FFB3D9)
- Bleu (#B3D9FF)
- Vert menthe (#B3FFD9)
- Jaune (#FFFEB3)
- Violet (#D9B3FF)
- Orange (#FFD9B3)
- Turquoise (#B3FFE6)
- Lavande (#E6B3FF)

## Icônes disponibles

24 émojis disponibles pour personnaliser les habitudes :
🏃 💪 🧘 📚 ✍️ 🎨 🎵 🌱 💧 🍎 😴 🧠 ❤️ ☀️ 🌙 ⭐ 🎯 📱 💻 🎮 📝 🎓 🏋️ 🚴

## Calcul des streaks

- **Streak actuel** : Nombre de jours consécutifs avec validation, en partant d'aujourd'hui ou d'hier
- **Meilleur streak** : Plus longue série consécutive dans tout l'historique
- **Taux de réussite** : Pourcentage de jours validés depuis la création de l'habitude

## Build pour la production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## License

MIT
