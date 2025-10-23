# Habit Tracker App 🌐📱

Une **application web et mobile** de suivi d'habitudes développée avec React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Supabase et Capacitor.

Accessible depuis **n'importe quel navigateur** ou en tant qu'**app mobile native** iOS/Android !

## ✨ Fonctionnalités

- 🔐 Authentification utilisateur (Supabase Auth)
- ➕ Création et gestion d'habitudes avec 24 icônes emoji et 8 couleurs pastel
- ✅ Suivi quotidien des habitudes avec checkboxes animées
- 🔥 Calcul automatique des streaks (séries) et statistiques
- 📊 Vue statistiques détaillée avec KPIs et classement
- 🎨 Design responsive avec couleurs pastel douces
- ⚡ Animations fluides et feedback haptique (mobile)
- 📱 Application native iOS et Android

## 🗄️ Configuration de la base de données

**IMPORTANT** : Avant d'utiliser l'application, configurez Supabase :

1. Connectez-vous à votre projet Supabase : https://evgskaaowcwlajlotcxa.supabase.co
2. Allez dans l'onglet "SQL Editor"
3. Copiez et exécutez le contenu du fichier `supabase-setup.sql`

Le script créera :
- La table `habits` pour stocker les habitudes
- La table `completions` pour stocker les validations quotidiennes
- Les policies RLS pour la sécurité des données
- Les index pour optimiser les performances

## 🚀 Installation

```bash
# Installer les dépendances
npm install
```

## 🌐 Déployer en tant que Web App (RECOMMANDÉ)

**Votre app est prête pour le web !** Déployez-la en quelques minutes sur Vercel, Netlify ou GitHub Pages.

👉 **Guide complet de déploiement** : [DEPLOYMENT_WEB.md](./DEPLOYMENT_WEB.md)

### Déploiement rapide sur Vercel (5 minutes)

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Déployer
vercel

# 3. Production
vercel --prod
```

**Résultat** : URL publique instantanée → `https://habit-tracker-xxxxx.vercel.app`

### Ou via GitHub + Vercel (encore plus simple)

1. Pusher le code sur GitHub
2. Connecter le repo à Vercel
3. Cliquer sur "Deploy"
4. ✅ En ligne en 2-3 minutes !

### Tester en local

```bash
# Serveur de développement
npm run dev
# Ouvrir http://localhost:5173

# Build de production
npm run build
npm run preview
```

---

## 🍎 Tester sur votre iPhone avec TestFlight

**Vous voulez installer l'app sur votre iPhone ?**

👉 **Consultez le guide complet** : [TESTFLIGHT_GUIDE.md](./TESTFLIGHT_GUIDE.md)

📋 **Checklist rapide** : [TESTFLIGHT_CHECKLIST.md](./TESTFLIGHT_CHECKLIST.md)

**Résumé rapide** :
1. Compte Apple Developer requis (99$/an)
2. Build l'app dans Xcode
3. Upload vers App Store Connect
4. Configurer TestFlight
5. Installer via TestFlight sur iPhone

⏱️ **Temps estimé première fois** : 30-60 minutes

## 📱 Développement Mobile (Recommandé)

### Android

**Prérequis** :
- Android Studio installé
- SDK Android configuré
- Un appareil Android ou un émulateur

**Étapes** :

```bash
# 1. Construire l'application et synchroniser avec Capacitor
npm run build:mobile

# 2. Ouvrir le projet Android dans Android Studio
npm run android

# 3. Dans Android Studio :
#    - Cliquez sur "Run" ou appuyez sur Shift+F10
#    - Sélectionnez votre appareil/émulateur
#    - L'application se lancera automatiquement
```

### iOS

**Prérequis** :
- macOS avec Xcode installé
- CocoaPods installé (`sudo gem install cocoapods`)
- Un iPhone/iPad ou un simulateur iOS

**Étapes** :

```bash
# 1. Construire l'application et synchroniser avec Capacitor
npm run build:mobile

# 2. Installer les pods (première fois seulement)
cd ios/App && pod install && cd ../..

# 3. Ouvrir le projet iOS dans Xcode
npm run ios

# 4. Dans Xcode :
#    - Sélectionnez votre appareil/simulateur
#    - Cliquez sur "Run" (▶️) ou appuyez sur Cmd+R
#    - L'application se lancera automatiquement
```

### Développement itératif

Après avoir fait des modifications au code :

```bash
# Reconstruire et synchroniser
npm run build:mobile

# Ensuite, relancez l'app depuis Android Studio ou Xcode
```

## 🌐 Développement Web (pour tests rapides)

```bash
# Lancer le serveur de développement web
npm run dev

# Ouvrir http://localhost:5173 dans votre navigateur
```

⚠️ Note : Certaines fonctionnalités natives (StatusBar, SplashScreen, Haptics) ne fonctionneront que sur mobile.

## 📂 Structure du projet

```
src/
├── lib/
│   ├── supabase.ts          # Client Supabase configuré
│   ├── db.ts                # Fonctions CRUD pour habits et completions
│   ├── utils.ts             # Utilitaires (calculs streaks, dates, stats)
│   ├── capacitor.ts         # Initialisation des plugins Capacitor
│   └── cn.ts                # Utilitaire pour fusionner les classes CSS
├── components/
│   ├── ui/                  # Composants UI shadcn/ui
│   ├── Auth.tsx             # Page connexion/inscription
│   ├── HabitCard.tsx        # Carte d'affichage d'une habitude
│   ├── HabitDialog.tsx      # Dialog créer/éditer habitude
│   └── StatsView.tsx        # Vue statistiques
├── types.ts                 # Types TypeScript
└── App.tsx                  # Composant principal
android/                     # Projet Android natif
ios/                         # Projet iOS natif
```

## 🛠️ Technologies utilisées

- **React 18** + **TypeScript** - Framework et typage
- **Vite** - Build tool rapide
- **Tailwind CSS** - Styling avec design pastel
- **shadcn/ui** - Composants UI accessibles
- **Supabase** - Backend (Auth + PostgreSQL)
- **Capacitor** - Framework pour apps natives iOS/Android
- **Lucide React** - Icônes
- **date-fns** - Manipulation des dates

### Plugins Capacitor

- `@capacitor/status-bar` - Gestion de la barre de statut
- `@capacitor/splash-screen` - Écran de démarrage
- `@capacitor/keyboard` - Gestion du clavier mobile
- `@capacitor/haptics` - Feedback haptique (vibrations)

## 🎨 Design

### Palette de couleurs pastel

- Rose (#FFB3D9)
- Bleu (#B3D9FF)
- Vert menthe (#B3FFD9)
- Jaune (#FFFEB3)
- Violet (#D9B3FF)
- Orange (#FFD9B3)
- Turquoise (#B3FFE6)
- Lavande (#E6B3FF)

### Icônes disponibles

24 émojis pour personnaliser les habitudes :
🏃 💪 🧘 📚 ✍️ 🎨 🎵 🌱 💧 🍎 😴 🧠 ❤️ ☀️ 🌙 ⭐ 🎯 📱 💻 🎮 📝 🎓 🏋️ 🚴

## 📊 Calcul des streaks

- **Streak actuel** : Nombre de jours consécutifs avec validation, en partant d'aujourd'hui ou d'hier
- **Meilleur streak** : Plus longue série consécutive dans tout l'historique
- **Taux de réussite** : Pourcentage de jours validés depuis la création de l'habitude

## 📜 Scripts NPM disponibles

```bash
npm run dev          # Serveur de développement web
npm run build        # Build web uniquement
npm run build:mobile # Build + sync Capacitor (iOS + Android)
npm run android      # Ouvrir Android Studio
npm run ios          # Ouvrir Xcode
npm run sync         # Synchroniser le code web avec les apps natives
npm run lint         # Linter ESLint
npm run preview      # Preview du build de production
```

## 🔧 Configuration

### capacitor.config.ts

Configuration principale de Capacitor avec :
- Identifiant de l'app : `com.habittracker.app`
- Configuration du SplashScreen avec couleur rose pastel
- StatusBar en mode clair
- Gestion du clavier mobile

### Personnalisation

Pour changer l'identifiant de l'app, le nom ou les couleurs :

1. Modifier `capacitor.config.ts`
2. Reconstruire : `npm run build:mobile`
3. Pour Android : mettre à jour `android/app/build.gradle` (applicationId)
4. Pour iOS : mettre à jour dans Xcode (Bundle Identifier)

## 📦 Build pour la production

### Android (APK/AAB)

1. Ouvrir Android Studio : `npm run android`
2. Menu : Build > Generate Signed Bundle / APK
3. Suivre les étapes pour signer l'APK/AAB

### iOS (IPA)

1. Ouvrir Xcode : `npm run ios`
2. Product > Archive
3. Suivre les étapes pour distribuer sur l'App Store ou en TestFlight

## 🐛 Dépannage

### Android

- **Erreur de build** : Nettoyer le projet dans Android Studio (Build > Clean Project)
- **App ne se lance pas** : Vérifier les logs dans Logcat

### iOS

- **CocoaPods error** : Exécuter `cd ios/App && pod install`
- **Signing error** : Configurer votre équipe de développement dans Xcode

### Général

- **Changements non visibles** : Toujours exécuter `npm run build:mobile` après modification du code
- **Erreur Supabase** : Vérifier que le script SQL a été exécuté

## 📄 License

MIT
