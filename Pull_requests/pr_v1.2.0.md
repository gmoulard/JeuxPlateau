# Pull Request: v1.2.0 - Ajout Jeu de Morpion

## 🎯 Objectif

Ajouter un nouveau jeu simple et populaire : le Morpion (Tic-Tac-Toe) pour 2 joueurs.

## 🎮 Nouveau Jeu: Morpion

### Caractéristiques
- **Joueurs**: 2 (X et O)
- **Plateau**: Grille 3x3
- **But**: Aligner 3 symboles (ligne, colonne ou diagonale)
- **Durée**: Partie rapide (quelques minutes)

### Fonctionnalités
- ✅ Grille 3x3 interactive
- ✅ Alternance X et O
- ✅ Détection victoire (8 combinaisons)
- ✅ Détection match nul
- ✅ Bouton nouvelle partie
- ✅ Interface moderne et responsive

## 📋 Implémentation

### 1. Nouveau Fichier: tictactoe-game.js

**Classe TicTacToeGame:**
```javascript
class TicTacToeGame extends BaseGame {
    constructor(container, players) {
        this.board = Array(9).fill(null);
        this.currentPlayer = 0;
        this.gameOver = false;
    }
}
```

**Méthodes principales:**
- `renderBoard()` - Affiche la grille 3x3
- `handleCellClick(index)` - Gère les clics
- `checkWinner()` - Vérifie les 8 combinaisons gagnantes
- `resetGame()` - Nouvelle partie

### 2. Détection Victoire

**8 combinaisons gagnantes:**
```javascript
const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
    [0, 4, 8], [2, 4, 6]             // Diagonales
];
```

### 3. Interface

**Grille 3x3:**
```
┌───┬───┬───┐
│ X │   │ O │
├───┼───┼───┤
│   │ X │   │
├───┼───┼───┤
│ O │   │ X │
└───┴───┴───┘
```

**Styles:**
- Grille CSS moderne
- Cellules carrées (aspect-ratio: 1)
- Hover effect
- Couleurs cohérentes (bleu)
- Font-size 3rem pour X et O

### 4. Intégration

**Modifications:**
- `index.html` - Bouton "Morpion" + script
- `app.js` - Titre, initialisation, masquage dés
- `styles.css` - Styles `.tictactoe-*`
- `version.json` - 1.1.1 → 1.2.0

## 📁 Fichiers

### Nouveau
- `js/tictactoe-game.js` (95 lignes)

### Modifiés
- `index.html` - Bouton + script + version
- `js/app.js` - Intégration jeu
- `styles.css` - Styles Morpion
- `version.json` - Version 1.2.0

## ✅ Tests

### Fonctionnalités
- ✅ Sélection jeu fonctionne
- ✅ Grille s'affiche
- ✅ Clics fonctionnent
- ✅ Alternance X/O
- ✅ Victoire détectée (8 cas)
- ✅ Match nul détecté
- ✅ Nouvelle partie fonctionne

### Victoires testées
- ✅ Ligne horizontale (3 cas)
- ✅ Ligne verticale (3 cas)
- ✅ Diagonale (2 cas)
- ✅ Match nul (grille pleine)

### Interface
- ✅ Responsive mobile
- ✅ Hover effect
- ✅ Symboles lisibles
- ✅ Bouton visible

## 🎨 Design

### Desktop
```
        Morpion
    
    ┌─────────────┐
    │  X  │  O  │  X  │
    ├─────┼─────┼─────┤
    │  O  │  X  │  O  │
    ├─────┼─────┼─────┤
    │  X  │  O  │  X  │
    └─────────────┘
    
    [🔄 Nouvelle partie]
```

### Mobile
- Grille adaptée
- Touch-friendly
- Taille optimale

## 📊 Comparaison

### Avant (v1.1.1)
- 5 jeux disponibles
- Pas de jeu simple et rapide

### Après (v1.2.0)
- 6 jeux disponibles
- Morpion: jeu simple et rapide
- Parfait pour débutants

## 🎯 Avantages

1. **Simplicité** - Règles connues de tous
2. **Rapidité** - Parties de 2-3 minutes
3. **Accessibilité** - Facile à comprendre
4. **Universel** - Jeu classique mondial
5. **Léger** - Code minimal (95 lignes)

## 📝 Notes techniques

### Architecture
- Hérite de BaseGame
- État minimal (board[9])
- Pas de dépendances
- Code simple et clair

### Performance
- Rendu instantané
- Pas de calculs complexes
- Mémoire minimale
- Pas de lag

### Code Quality
- < 100 lignes
- Bien commenté
- Fonctions claires
- Pas de bugs connus

## 🚀 Déploiement

1. Merger cette PR
2. Tester le jeu Morpion
3. Vérifier victoires
4. Valider responsive

## 📚 Documentation

### Règles du Morpion
- 2 joueurs: X et O
- Grille 3x3
- Jouer à tour de rôle
- Aligner 3 symboles pour gagner
- Match nul si grille pleine

### Utilisation
1. Sélectionner "Morpion"
2. Entrer noms des joueurs
3. Cliquer sur une case
4. Alterner jusqu'à victoire/nul
5. Cliquer "Nouvelle partie" pour rejouer

---

**Version**: 1.2.0  
**Date**: 15 janvier 2024  
**Auteur**: Guillaume Moulard  
**Type**: Feature - Nouveau jeu
