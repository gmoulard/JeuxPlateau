# Pull Request v1.4.8 - Menu Paramètres

## 📋 Description
Ajout d'un menu paramètres centralisé regroupant les options de configuration et de maintenance de l'application.

## 🎯 Objectifs
- Centraliser les paramètres dans un menu dédié
- Améliorer l'organisation de l'interface
- Ajouter des fonctionnalités de maintenance

## ✨ Changements

### 1. Nouveau Menu Paramètres (⚙️)
- ✅ Bouton paramètres dans le header
- ✅ Écran dédié aux paramètres
- ✅ Organisation par catégories

### 2. Déplacement des Fonctionnalités
- ✅ Caméra déplacée dans paramètres
- ✅ Historique déplacé dans paramètres
- ✅ Versions déplacées dans paramètres

### 3. Nouvelles Fonctionnalités
- ✅ **Effacer données locales** : Supprime historique et paramètres
- ✅ **Mettre à jour l'application** : Force la mise à jour via Service Worker

### 4. Organisation du Menu
```
⚙️ Paramètres
├── Affichage
│   └── 📷 Activer/Désactiver caméra
├── Historique
│   ├── 📊 Voir l'historique des parties
│   └── 📋 Voir les versions
├── Données
│   └── 🗑️ Effacer les données locales
└── Application
    └── 🔄 Mettre à jour l'application
```

## 📊 Améliorations UX
- Interface plus épurée (header simplifié)
- Accès centralisé aux paramètres
- Confirmation avant suppression des données
- Mise à jour facilitée de l'application

## 🔧 Fichiers modifiés
- `index.html` - Ajout écran paramètres
- `js/app.js` - Logique paramètres et nouvelles fonctions
- `styles.css` - Styles menu paramètres
- `version.json` - Version 1.4.8

## ✅ Tests
- [x] Menu paramètres accessible
- [x] Caméra fonctionnelle depuis paramètres
- [x] Historique accessible depuis paramètres
- [x] Versions accessibles depuis paramètres
- [x] Effacement données locales avec confirmation
- [x] Mise à jour application fonctionnelle

## 📝 Notes
Navigation améliorée : Paramètres → Historique/Versions → Retour Paramètres → Menu principal
