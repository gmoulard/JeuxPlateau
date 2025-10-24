# Pull Request: v1.2.3 - Fix Bouton Dés Tavli

## 🎯 Objectif

Corriger le bouton "Lancer les dés" du jeu de Tavli qui ne fonctionnait pas.

## 🐛 Problème

Le bouton de dés dans le header ne fonctionnait pas pour le jeu de Tavli (Backgammon).

**Cause:**
- La méthode `rollDice()` était manquante dans la classe `BackgammonGame`
- Le bouton appelait une méthode inexistante

## ✅ Solution

Ajout de la méthode `rollDice()` dans `BackgammonGame`:

```javascript
rollDice() {
    if (this.movesLeft.length > 0) return;
    
    this.dice[0] = Math.floor(Math.random() * 6) + 1;
    this.dice[1] = Math.floor(Math.random() * 6) + 1;
    
    if (this.dice[0] === this.dice[1]) {
        this.movesLeft = [this.dice[0], this.dice[0], this.dice[0], this.dice[0]];
    } else {
        this.movesLeft = [this.dice[0], this.dice[1]];
    }
    
    this.renderBoard();
    
    if (!this.hasValidMoves()) {
        setTimeout(() => this.endTurn(), 1000);
    }
}
```

## 📋 Fonctionnalités

- Lance 2 dés (1-6)
- Détecte les doubles (4 mouvements)
- Met à jour l'affichage
- Vérifie les mouvements valides
- Passe au tour suivant si aucun mouvement

## 📁 Fichiers modifiés

- `js/backgammon-game.js` - Ajout méthode rollDice()
- `version.json` - 1.2.2 → 1.2.3
- `index.html` - Version 1.2.3

## ✅ Tests

- ✅ Bouton header fonctionne
- ✅ Dés lancés correctement
- ✅ Affichage mis à jour
- ✅ Doubles détectés (4 coups)
- ✅ Fin de tour si pas de coups
- ✅ Pas de relance si coups restants

## 📊 Avant/Après

### Avant (v1.2.2)
- ❌ Bouton dés ne fait rien
- ❌ Erreur console
- ❌ Impossible de jouer

### Après (v1.2.3)
- ✅ Bouton dés fonctionne
- ✅ Pas d'erreur
- ✅ Jeu jouable

---

**Version**: 1.2.3  
**Date**: 15 janvier 2024  
**Auteur**: Guillaume Moulard  
**Type**: Bugfix
