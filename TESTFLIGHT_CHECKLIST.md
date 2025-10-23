# ✅ Checklist rapide TestFlight

Utilisez cette checklist pour déployer rapidement sur TestFlight.

## 🎯 Avant de commencer

- [ ] Compte Apple Developer actif (99$/an)
- [ ] Xcode installé sur macOS
- [ ] CocoaPods installé : `sudo gem install cocoapods`
- [ ] TestFlight installé sur votre iPhone

---

## 📋 Étapes de déploiement

### 1. Préparer le projet
```bash
- [ ] npm run build:mobile
- [ ] cd ios/App && pod install && cd ../..
- [ ] npm run ios
```

### 2. Configuration Xcode
- [ ] Projet sélectionné → Target "App"
- [ ] General → Bundle Identifier changé (ex: `com.VOTRENOM.habittracker`)
- [ ] Signing & Capabilities → "Automatically manage signing" coché
- [ ] Team sélectionnée
- [ ] Version : 1.0.0
- [ ] Build : 1 (incrémenter à chaque upload)

### 3. App Store Connect
- [ ] Se connecter sur https://appstoreconnect.apple.com
- [ ] Mes Apps → + → Nouvelle App
- [ ] iOS coché
- [ ] Nom : "Habit Tracker"
- [ ] Bundle ID sélectionné
- [ ] SKU : `habittracker001`
- [ ] Créer

### 4. Archive et Upload
- [ ] Xcode : Sélectionner "Any iOS Device (arm64)"
- [ ] Product → Archive (attendre 2-5 min)
- [ ] Organizer → Validate App ✅
- [ ] Distribute App → App Store Connect → Upload
- [ ] Attendre succès de l'upload

### 5. TestFlight Configuration
- [ ] App Store Connect → TestFlight
- [ ] Attendre traitement du build (5-15 min)
- [ ] Cliquer sur le build
- [ ] Remplir "Que tester ?"
- [ ] Conformité exportation : NON
- [ ] Soumettre pour examen
- [ ] Ajouter testeur (votre email)

### 6. Installation iPhone
- [ ] Ouvrir email d'invitation sur iPhone
- [ ] Ou ouvrir TestFlight directement
- [ ] Accepter → Installer
- [ ] Lancer l'app depuis l'écran d'accueil

---

## 🔄 Pour les mises à jour

- [ ] npm run build:mobile
- [ ] Xcode : Build number +1 (2, 3, 4...)
- [ ] Product → Archive
- [ ] Upload vers App Store Connect
- [ ] Notification automatique aux testeurs

---

## ⚠️ Vérifications importantes

✅ **Configuration Supabase** : Script SQL exécuté ?
✅ **Bundle Identifier** : Unique et jamais utilisé ?
✅ **Internet** : Connexion stable pour l'upload ?
✅ **Compte** : Apple Developer actif ?

---

## 📞 En cas de problème

Consultez le guide complet : `TESTFLIGHT_GUIDE.md`

---

**Temps estimé première fois** : 30-60 minutes
**Temps estimé mises à jour** : 10-15 minutes

Bonne chance ! 🚀
