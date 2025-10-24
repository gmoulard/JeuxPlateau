# Pull Request - Version 1.4.1

## 📋 Description
Correction de l'espacement du Tavli et mise à jour de la documentation.

## 🎯 Objectif
Corriger le problème d'affichage du plateau de Tavli qui ne tenait pas dans la page à cause d'un espacement trop important.

## ✨ Changements

### 1. Correction espacement Tavli
- **Avant** : Espacement de 30px entre les cases 17-18 et 6-5
- **Après** : Espacement réduit à 15px
- Le plateau tient maintenant correctement dans la page

### 2. Mise à jour README
- Ajout d'Abalone dans la liste des jeux
- Mise à jour des statistiques :
  - Version : 1.3.2 → 1.4.1
  - Lignes de code : 2 503 → 2 894
  - Nombre de jeux : 5 → 6
  - Fichiers JS : 10 → 11
  - Versions : 18 → 21
- Ajout d'abalone-game.js dans la structure
- Mise à jour des lignes par fichier

### 3. Mise à jour prompt_history.md
- Ajout prompt v1.3.3 (Tavli barre et espacement)
- Ajout prompt v1.4.0 (Abalone)
- Ajout prompt v1.4.1 (Fix spacing + doc)

## 📁 Fichiers modifiés

- **`styles.css`** : `.tavli-spacer` width 30px → 15px
- **`README.md`** : Ajout Abalone + statistiques mises à jour
- **`Pull_requests/prompt_history.md`** : Ajout 3 nouveaux prompts
- **`version.json`** : 1.4.0 → 1.4.1
- **`index.html`** : Ajout version 1.4.1

## ✅ Tests

- ✅ Plateau Tavli tient dans la page
- ✅ Espacement visible mais raisonnable
- ✅ Pas de scroll horizontal excessif
- ✅ README à jour
- ✅ Historique des prompts complet

## 📊 Comparaison

### Avant (v1.4.0)
- ❌ Espacement 30px trop large
- ❌ Plateau Tavli déborde
- ❌ Documentation incomplète

### Après (v1.4.1)
- ✅ Espacement 15px optimal
- ✅ Plateau Tavli bien dimensionné
- ✅ Documentation complète et à jour

## 🔗 Liens
- Version précédente : 1.4.0
- Branche : `fix/tavli-spacing-v1.4.1`

---

**Version**: 1.4.1  
**Date**: 15 janvier 2024  
**Auteur**: Guillaume Moulard  
**Type**: Bugfix + Documentation
