# 🚀 Guide de déploiement sur TestFlight

Ce guide vous explique comment déployer votre application **Habit Tracker** sur TestFlight pour la tester sur votre iPhone.

## 📋 Prérequis

### 1. Compte Apple Developer (OBLIGATOIRE)

**⚠️ Important** : TestFlight nécessite un compte Apple Developer payant (99$/an).

- **Si vous n'avez pas de compte** : Inscrivez-vous sur https://developer.apple.com/programs/
- **Si vous avez déjà un compte** : Passez à l'étape suivante

### 2. Logiciels requis

- ✅ **macOS** (obligatoire pour Xcode)
- ✅ **Xcode** (dernière version depuis l'App Store)
- ✅ **CocoaPods** : `sudo gem install cocoapods`
- ✅ **Application TestFlight** sur votre iPhone (gratuite sur l'App Store)

---

## 🔧 Étape 1 : Préparer le projet Xcode

### 1.1 Installer les dépendances

```bash
cd /home/user/habitsmeli95

# Build l'application
npm run build:mobile

# Installer les pods iOS
cd ios/App
pod install
cd ../..
```

### 1.2 Ouvrir le projet dans Xcode

```bash
npm run ios
```

Cela ouvrira le fichier `ios/App/App.xcworkspace` dans Xcode.

---

## 🎯 Étape 2 : Configurer l'identité dans Xcode

### 2.1 Sélectionner le projet

1. Dans Xcode, cliquez sur **"App"** dans la barre latérale gauche (projet bleu)
2. Sélectionnez la cible **"App"** sous TARGETS

### 2.2 Configurer le Bundle Identifier (unique !)

1. Allez dans l'onglet **"General"**
2. Dans **"Identity"**, changez le **Bundle Identifier** :
   - Par défaut : `com.habittracker.app`
   - Changez en quelque chose d'unique : `com.VOTRENOM.habittracker`
   - Exemple : `com.johndoe.habittracker`

**⚠️ Important** : Ce Bundle Identifier doit être unique sur l'App Store !

### 2.3 Configurer Signing & Capabilities

1. Allez dans l'onglet **"Signing & Capabilities"**
2. Cochez **"Automatically manage signing"**
3. Dans **"Team"**, sélectionnez votre équipe Apple Developer
   - Si vous ne voyez pas votre équipe : allez dans Xcode > Settings > Accounts et connectez-vous avec votre compte Apple Developer

### 2.4 Mettre à jour la version et le build

Dans l'onglet **"General"** :
- **Version** : `1.0.0` (ou votre numéro de version)
- **Build** : `1` (incrémenter à chaque upload)

---

## 🌐 Étape 3 : Créer l'app dans App Store Connect

### 3.1 Accéder à App Store Connect

1. Allez sur https://appstoreconnect.apple.com
2. Connectez-vous avec votre compte Apple Developer

### 3.2 Créer une nouvelle app

1. Cliquez sur **"Mes Apps"** (My Apps)
2. Cliquez sur le bouton **"+"** puis **"Nouvelle App"** (New App)

### 3.3 Remplir les informations

- **Plateformes** : Cochez **iOS**
- **Nom** : `Habit Tracker` (ou votre nom préféré)
- **Langue principale** : Français
- **Bundle ID** : Sélectionnez le Bundle Identifier que vous avez créé (`com.VOTRENOM.habittracker`)
- **SKU** : `habittracker001` (un identifiant unique pour vous)
- **Accès utilisateur** : Accès complet

Cliquez sur **"Créer"**.

---

## 📦 Étape 4 : Créer une archive de l'app

### 4.1 Sélectionner "Any iOS Device"

Dans Xcode, en haut à gauche, à côté du bouton ▶️ :
- Cliquez sur le nom de l'appareil
- Sélectionnez **"Any iOS Device (arm64)"**

### 4.2 Créer l'archive

1. Dans le menu Xcode : **Product** > **Archive**
2. Attendez que la compilation se termine (cela peut prendre 2-5 minutes)
3. La fenêtre **"Organizer"** s'ouvrira automatiquement

---

## ☁️ Étape 5 : Uploader vers App Store Connect

### 5.1 Valider l'archive

Dans la fenêtre **Organizer** :
1. Sélectionnez votre archive (la plus récente)
2. Cliquez sur **"Validate App"**
3. Sélectionnez votre équipe de distribution
4. Options :
   - ✅ **Upload your app's symbols** (coché)
   - ✅ **Manage Version and Build Number** (coché)
5. Cliquez sur **"Validate"**
6. Attendez la validation (1-2 minutes)

**Si des erreurs apparaissent** : corrigez-les et recommencez l'archive.

### 5.2 Distribuer l'app

1. Une fois la validation réussie, cliquez sur **"Distribute App"**
2. Sélectionnez **"App Store Connect"**
3. Cliquez sur **"Upload"**
4. Sélectionnez votre équipe de distribution
5. Mêmes options que pour la validation
6. Cliquez sur **"Upload"**
7. Attendez l'upload (2-5 minutes selon votre connexion)

**Message de succès** : "Upload Successful"

---

## 🧪 Étape 6 : Configurer TestFlight

### 6.1 Attendre le traitement

1. Retournez sur https://appstoreconnect.apple.com
2. Allez dans **"Mes Apps"** > **"Habit Tracker"**
3. Allez dans l'onglet **"TestFlight"**
4. Vous verrez votre build en statut **"En cours de traitement"** (Processing)

**⏱️ Attendez 5-15 minutes** que le statut passe à **"Prêt à soumettre"** (Ready to Submit).

### 6.2 Remplir les informations de test

Lorsque le build est prêt :

1. Cliquez sur votre build (version 1.0.0, build 1)
2. Remplissez les informations requises :

**Informations de test** :
- **Que tester ?** : "Version initiale de l'application de suivi d'habitudes. Testez la création d'habitudes, le suivi quotidien et les statistiques."
- **Email de contact** : votre email
- **Informations de connexion** (si nécessaire) :
  - Email de test : `test@example.com`
  - Mot de passe : `TestPassword123`
  - Notes : "Créer un compte directement dans l'app"

3. **Conformité à l'exportation** :
   - Question : "Votre app utilise-t-elle le chiffrement ?"
   - Réponse : **Non** (Supabase gère le chiffrement)

4. Cliquez sur **"Soumettre pour examen"**

### 6.3 Ajouter un testeur (vous-même)

1. Dans TestFlight, allez dans **"Testeurs internes"** ou **"Testeurs externes"**
2. Cliquez sur **"+"** pour ajouter des testeurs
3. Entrez votre email (celui de votre compte Apple)
4. Cochez votre nom
5. Sélectionnez le build à tester
6. Cliquez sur **"Ajouter"**

Vous recevrez un email d'invitation !

---

## 📱 Étape 7 : Installer sur votre iPhone

### 7.1 Installer TestFlight

1. Sur votre iPhone, ouvrez l'**App Store**
2. Recherchez **"TestFlight"**
3. Installez l'application officielle d'Apple

### 7.2 Accepter l'invitation

**Option 1 : Par email**
1. Ouvrez l'email d'invitation sur votre iPhone
2. Cliquez sur **"View in TestFlight"**
3. L'app TestFlight s'ouvrira

**Option 2 : Directement dans TestFlight**
1. Ouvrez TestFlight sur votre iPhone
2. Connectez-vous avec votre Apple ID
3. Vous verrez **"Habit Tracker"** dans vos invitations

### 7.3 Installer l'app

1. Dans TestFlight, cliquez sur **"Habit Tracker"**
2. Cliquez sur **"Installer"** ou **"Accepter"**
3. L'app se téléchargera et s'installera
4. L'icône apparaîtra sur votre écran d'accueil avec un point orange (TestFlight)

### 7.4 Lancer l'app

1. Tapez sur l'icône **Habit Tracker** sur votre iPhone
2. L'app se lancera en plein écran natif !
3. Créez un compte avec Supabase et profitez ! 🎉

---

## 🔄 Mettre à jour l'app (nouvelles versions)

Après avoir fait des modifications :

```bash
# 1. Rebuild
npm run build:mobile

# 2. Dans Xcode, incrémenter le Build Number
# General > Build : 1 → 2 (ou plus)

# 3. Archive à nouveau
# Product > Archive

# 4. Upload vers App Store Connect

# 5. Les testeurs recevront une notification de mise à jour
```

---

## ⚠️ Problèmes courants et solutions

### "No team found"
- **Solution** : Inscrivez-vous au programme Apple Developer et connectez votre compte dans Xcode > Settings > Accounts

### "Bundle identifier is already in use"
- **Solution** : Changez le Bundle Identifier pour quelque chose d'unique (ex: `com.votrenom.habittracker`)

### "Build stuck in Processing"
- **Solution** : Attendez jusqu'à 30 minutes. Si ça persiste, vérifiez votre email pour des messages d'Apple

### "Missing compliance"
- **Solution** : Répondez "Non" à la question sur le chiffrement dans TestFlight

### L'app crash au lancement
- **Solution** : Vérifiez que vous avez bien exécuté le script SQL Supabase

---

## 💡 Conseils

✅ **Première fois** : Le processus peut sembler long, mais les fois suivantes seront rapides
✅ **Build Number** : Incrémentez toujours le build (1, 2, 3...) pour chaque upload
✅ **Testeurs** : Vous pouvez ajouter jusqu'à 100 testeurs externes avec TestFlight
✅ **Feedback** : Les testeurs peuvent envoyer des captures d'écran et feedbacks depuis TestFlight
✅ **Notifications** : TestFlight notifie automatiquement les testeurs des nouvelles versions

---

## 🎯 Prochaines étapes après TestFlight

Une fois satisfait de votre app :
1. Remplir les informations App Store (description, captures d'écran, etc.)
2. Soumettre pour examen App Store
3. Publication publique sur l'App Store ! 🚀

---

## 📞 Besoin d'aide ?

- Documentation Apple : https://developer.apple.com/testflight/
- Capacitor iOS : https://capacitorjs.com/docs/ios
- Support Apple Developer : https://developer.apple.com/support/

Bonne chance avec votre déploiement ! 🍀
