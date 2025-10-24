# Pull Request - Version 1.4.4

## 📋 Description
Suppression de tous les contrôles de déplacement dans le jeu d'Abalone pour permettre une liberté totale de mouvement.

## 🎯 Objectif
Simplifier le jeu en retirant toutes les validations et permettre aux joueurs de déplacer les billes librement.

## ✨ Changements

### Fonctions supprimées
- ❌ `canMove()` - Validation des déplacements
- ❌ `areAligned()` - Vérification alignement
- ❌ `pushPieces()` - Poussée en chaîne

### Logique simplifiée

#### handleCellClick()
- Sélection : Clic sur ses billes (max 3)
- Déplacement : Clic sur n'importe quelle case → déplacement immédiat
- Aucune validation

#### makeMove()
- Si bille adverse sur cible → éjection directe
- Vide les cases de départ
- Place la première bille sur la cible
- Pas de gestion de groupe, pas de poussée

### Règles simplifiées
- ✅ Sélectionner 1 à 3 billes
- ✅ Cliquer n'importe où pour déplacer
- ✅ Bille adverse sur cible = éjectée
- ✅ Victoire à 6 billes éjectées

## 📁 Fichiers modifiés

- **`js/abalone-game.js`** : 
  - Suppression 60+ lignes de code
  - Logique ultra-simplifiée
  - Aucun contrôle
- **`version.json`** : 1.4.3 → 1.4.4
- **`index.html`** : Ajout version 1.4.4
- **`README.md`** : Version 1.4.4, 24 versions
- **`Pull_requests/prompt_history.md`** : Ajout prompt v1.4.4

## ✅ Tests

- ✅ Sélection fonctionne
- ✅ Déplacement libre
- ✅ Éjection fonctionne
- ✅ Compteur mis à jour
- ✅ Victoire détectée

## 📊 Comparaison

### Avant (v1.4.3)
- Validation des déplacements
- Vérification alignement
- Poussée en chaîne
- Règles complexes

### Après (v1.4.4)
- Aucune validation
- Déplacement libre
- Éjection simple
- Règles ultra-simples

## 🎮 Nouveau gameplay

1. Sélectionner 1 à 3 billes
2. Cliquer n'importe où
3. Bille(s) disparaissent
4. Première bille apparaît sur cible
5. Si bille adverse → éjectée

## 🔗 Liens
- Version précédente : 1.4.3
- Branche : `fix/abalone-no-control-v1.4.4`

---

**Version**: 1.4.4  
**Date**: 15 janvier 2024  
**Auteur**: Guillaume Moulard  
**Type**: Simplification
