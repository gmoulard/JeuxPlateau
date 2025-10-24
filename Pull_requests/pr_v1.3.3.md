# Pull Request - Version 1.3.3

## 📋 Description
Amélioration du jeu de Tavli (Backgammon) avec espacement visuel entre les cases et implémentation de la barre pour réintroduire les pions capturés selon les règles officielles.

## 🎯 Objectif
Rendre le jeu de Tavli conforme aux règles officielles du backgammon avec la gestion correcte des pions capturés.

## ✨ Changements

### 1. Espacement visuel
- Ajout d'un espace entre les cases 17 et 18 (rangée du haut)
- Ajout d'un espace entre les cases 6 et 5 (rangée du bas)
- Séparation visuelle des deux moitiés du plateau

### 2. Barre de réintroduction
- Remplacement du compteur de pions capturés par une barre interactive
- Affichage des pions sur la barre (🔴 et ⚫)
- Possibilité de cliquer sur les pions de la barre pour les réintroduire

### 3. Règles de réintroduction
- **Obligation**: Si un joueur a des pions sur la barre, il DOIT les réintroduire avant de pouvoir jouer d'autres pions
- **Zone d'entrée**: 
  - Joueur 0 (🔴): entre par les cases 0-5
  - Joueur 1 (⚫): entre par les cases 18-23
- **Capture lors de la réintroduction**: Un pion seul peut être capturé lors de la réintroduction
- **Validation**: Impossible d'entrer sur une case avec 2+ pions adverses

### 4. Interface améliorée
- Pions sur la barre cliquables et sélectionnables
- Effet visuel de sélection (bordure dorée)
- Compteur du nombre de pions sur la barre

## 📁 Fichiers modifiés

### js/backgammon-game.js
- Remplacement de `captured[]` par `bar[]`
- Ajout de `selectedBar` pour la sélection depuis la barre
- Nouvelle méthode `renderBarPieces()` pour afficher les pions sur la barre
- Nouvelle méthode `handleBarClick()` pour gérer les clics sur la barre
- Nouvelle méthode `canEnterFromBar()` pour valider la réintroduction
- Nouvelle méthode `enterFromBar()` pour réintroduire un pion
- Modification de `handlePointClick()` pour bloquer si pions sur la barre
- Modification de `hasValidMoves()` pour vérifier les réintroductions possibles
- Ajout de l'espacement dans `renderPoints()` (après cases 17 et 6)

### styles.css
- Ajout de `.tavli-spacer` pour l'espacement (30px de large)
- Remplacement de `.tavli-captured` par `.tavli-bar`
- Ajout de `.bar-section` pour chaque joueur
- Ajout de `.bar-checker` pour les pions sur la barre (40x40px, cliquables)
- Effet hover et sélection pour les pions de la barre

### version.json
- Version incrémentée à 1.3.3

### index.html
- Ajout de la version 1.3.3 dans l'écran des versions

## ✅ Tests

### Espacement
- ✅ Espace visible entre cases 17-18
- ✅ Espace visible entre cases 6-5
- ✅ Séparation claire des deux moitiés

### Barre
- ✅ Pions capturés vont sur la barre
- ✅ Pions affichés avec la bonne couleur
- ✅ Compteur correct
- ✅ Cliquables

### Réintroduction
- ✅ Sélection depuis la barre fonctionne
- ✅ Entrée dans la bonne zone (0-5 ou 18-23)
- ✅ Validation selon les dés
- ✅ Capture possible lors de l'entrée
- ✅ Blocage si 2+ pions adverses

### Obligation
- ✅ Impossible de jouer d'autres pions si pions sur la barre
- ✅ Fin de tour si aucune réintroduction possible
- ✅ Jeu normal une fois la barre vidée

## 📊 Comparaison

### Avant (v1.3.2)
- ❌ Pas d'espacement visuel
- ❌ Pions capturés juste comptés
- ❌ Pas de réintroduction
- ❌ Règles incomplètes

### Après (v1.3.3)
- ✅ Espacement clair entre les moitiés
- ✅ Barre interactive
- ✅ Réintroduction fonctionnelle
- ✅ Règles officielles respectées

## 🎮 Utilisation

### Réintroduire un pion
1. Lancer les dés
2. Cliquer sur le pion de votre couleur sur la barre
3. Cliquer sur une case valide dans votre zone d'entrée (0-5 ou 18-23)
4. Le pion est réintroduit selon le dé utilisé

### Règles
- Si vous avez des pions sur la barre, vous DEVEZ les réintroduire en priorité
- Vous ne pouvez pas jouer d'autres pions tant que la barre n'est pas vide
- L'entrée se fait selon les dés lancés
- Vous pouvez capturer un pion adverse seul lors de l'entrée

## 📝 Notes techniques

### Calcul de l'entrée
- Joueur 0: distance depuis point -1 (virtuel)
- Joueur 1: distance depuis point 24 (virtuel)
- Exemple: dé 3 pour joueur 0 → case 2 (distance 3 depuis -1)

### Priorité des mouvements
1. Vérifier si pions sur la barre
2. Si oui: uniquement réintroduction possible
3. Si non: mouvements normaux

### Performance
- Pas d'impact sur les performances
- Rendu toujours rapide
- Logique claire et maintenable

## 🔗 Liens
- Version précédente : 1.3.2
- Branche : `feature/tavli-improvements-v1.3.3`

---

**Version**: 1.3.3  
**Date**: 15 janvier 2024  
**Auteur**: Guillaume Moulard  
**Type**: Feature - Règles officielles
