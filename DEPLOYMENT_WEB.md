# 🌐 Guide de Déploiement Web

Ce guide vous explique comment déployer votre application **Habit Tracker** en tant que web app accessible depuis n'importe quel navigateur.

## ✅ Votre app est déjà prête pour le web !

Bonne nouvelle : votre application fonctionne **déjà** en mode web ! Capacitor permet d'avoir une app qui fonctionne à la fois sur mobile ET sur le web.

---

## 🚀 Option 1 : Déploiement sur Vercel (RECOMMANDÉ)

**Vercel** est la plateforme la plus simple et rapide pour déployer une app React/Vite.

### Prérequis
- Un compte GitHub (gratuit)
- Un compte Vercel (gratuit) : https://vercel.com

### Méthode A : Déploiement via GitHub (le plus simple)

#### 1. Pusher le code sur GitHub

```bash
# Si pas encore fait, créer un repo GitHub et pusher
git remote add origin https://github.com/VOTRE_USERNAME/habit-tracker.git
git push -u origin main
```

#### 2. Connecter à Vercel

1. Allez sur https://vercel.com
2. Cliquez sur **"Add New Project"**
3. Connectez votre compte GitHub
4. Sélectionnez votre repository **habit-tracker**
5. Vercel détecte automatiquement Vite
6. Configuration (déjà prête grâce à `vercel.json`) :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

7. Cliquez sur **"Deploy"**
8. ⏱️ Attendez 2-3 minutes
9. 🎉 Votre app est en ligne !

**URL automatique** : `https://habit-tracker-xxxxx.vercel.app`

#### 3. Configurer un domaine personnalisé (optionnel)

1. Dans Vercel, allez dans **Settings** > **Domains**
2. Ajoutez votre domaine : `habittracker.com`
3. Suivez les instructions pour configurer le DNS

### Méthode B : Déploiement via CLI Vercel

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel

# Suivre les prompts :
# - Set up and deploy? Y
# - Which scope? Votre compte
# - Link to existing project? N
# - Project name? habit-tracker
# - Directory? ./
# - Override settings? N

# 4. Déploiement en production
vercel --prod
```

**Résultat** : URL de production fournie instantanément !

---

## 🚀 Option 2 : Netlify

Alternative populaire à Vercel.

### Via interface web

1. Allez sur https://netlify.com
2. Cliquez sur **"Add new site"** > **"Import an existing project"**
3. Connectez GitHub et sélectionnez votre repo
4. Configuration :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
5. Cliquez sur **"Deploy"**

### Via CLI

```bash
# 1. Installer Netlify CLI
npm install -g netlify-cli

# 2. Se connecter
netlify login

# 3. Initialiser
netlify init

# 4. Déployer
netlify deploy --prod
```

---

## 🚀 Option 3 : GitHub Pages (gratuit)

Pour héberger gratuitement sur GitHub.

### 1. Installer gh-pages

```bash
npm install -D gh-pages
```

### 2. Ajouter dans package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://VOTRE_USERNAME.github.io/habit-tracker"
}
```

### 3. Configurer vite.config.ts

```typescript
export default defineConfig({
  base: '/habit-tracker/', // Nom de votre repo
  plugins: [react()],
})
```

### 4. Déployer

```bash
npm run deploy
```

**URL** : `https://VOTRE_USERNAME.github.io/habit-tracker`

---

## 🚀 Option 4 : Autres plateformes

### Render
1. Allez sur https://render.com
2. New > Static Site
3. Connectez GitHub
4. Build command : `npm run build`
5. Publish directory : `dist`

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Railway
1. Allez sur https://railway.app
2. New Project > Deploy from GitHub
3. Sélectionnez votre repo
4. Railway détecte automatiquement la configuration

---

## ⚠️ Configuration Supabase Important

**N'oubliez pas** : Avant que vos utilisateurs puissent utiliser l'app, vous devez :

1. Allez sur https://evgskaaowcwlajlotcxa.supabase.co
2. SQL Editor
3. Exécutez le fichier `supabase-setup.sql`

Sans cela, l'authentification et la création d'habitudes ne fonctionneront pas !

---

## 🔒 Variables d'environnement (optionnel)

Si vous voulez sécuriser vos clés Supabase :

### 1. Créer .env

```bash
VITE_SUPABASE_URL=https://evgskaaowcwlajlotcxa.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Modifier src/lib/supabase.ts

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### 3. Ajouter dans Vercel/Netlify

Dans les settings du projet :
- **Environment Variables**
- Ajoutez `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`

### 4. Ajouter .env au .gitignore

```
.env
.env.local
```

---

## 🧪 Tester localement avant déploiement

### Serveur de développement

```bash
npm run dev
# Ouvrir http://localhost:5173
```

### Build de production en local

```bash
# 1. Build
npm run build

# 2. Preview
npm run preview
# Ouvrir http://localhost:4173
```

Cela vous permet de tester la version de production avant de déployer !

---

## 📊 Après le déploiement

### Vérifications

✅ L'app se charge correctement
✅ L'authentification fonctionne (inscription/connexion)
✅ Création d'habitudes fonctionne
✅ Les checkboxes fonctionnent
✅ Les statistiques s'affichent
✅ Responsive sur mobile (testez sur votre téléphone)

### Partager votre app

Envoyez simplement l'URL à vos amis :
```
https://habit-tracker-xxxxx.vercel.app
```

Ils peuvent :
- L'ouvrir dans n'importe quel navigateur
- L'ajouter à leur écran d'accueil (iOS/Android)
- Créer leur compte et utiliser l'app !

---

## 🔄 Mises à jour automatiques

Avec Vercel/Netlify + GitHub :

1. Faites des modifications dans votre code
2. Commitez et pushez sur GitHub
3. **Déploiement automatique** déclenché !
4. Nouvelle version en ligne en 2-3 minutes

```bash
git add .
git commit -m "Nouvelle fonctionnalité"
git push
# ✅ Vercel/Netlify détecte et redéploie automatiquement !
```

---

## 📱 PWA (Progressive Web App)

Votre app peut déjà être ajoutée à l'écran d'accueil :

### Sur iPhone (Safari)
1. Ouvrir l'app
2. Tap sur le bouton **Partager**
3. **Sur l'écran d'accueil**
4. L'app se lance en plein écran !

### Sur Android (Chrome)
1. Ouvrir l'app
2. Menu > **Ajouter à l'écran d'accueil**
3. L'icône apparaît sur l'écran d'accueil

---

## 🎯 Recommandation finale

**Pour déployer rapidement** :
1. Pusher sur GitHub
2. Connecter à Vercel
3. Cliquer sur Deploy
4. Partager l'URL !

**Temps total** : 5-10 minutes ⚡

---

## 🆘 Problèmes courants

### Build échoue
- Vérifier que `npm run build` fonctionne localement
- Vérifier les erreurs TypeScript

### Page blanche après déploiement
- Vérifier la console du navigateur (F12)
- Vérifier que le script SQL Supabase a été exécuté

### Authentification ne fonctionne pas
- Vérifier les credentials Supabase
- Vérifier que RLS est configuré

---

## 📚 Ressources

- Documentation Vercel : https://vercel.com/docs
- Documentation Netlify : https://docs.netlify.com
- Vite Deployment : https://vitejs.dev/guide/static-deploy.html
- Supabase Docs : https://supabase.com/docs

---

Bonne chance avec votre déploiement ! 🚀
