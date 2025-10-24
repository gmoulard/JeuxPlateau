# Pull Request: v1.1.1 - Améliorations Interface

## 🎯 Objectif

Améliorer l'interface avec plusieurs fonctionnalités demandées : bouton dés Tavli, captures et historique aux échecs, et optimisation de l'affichage des versions.

## 📋 Changements

### 1. Tavli - Bouton Dés Réactivé

**Problème:**
- Bouton de dés supprimé dans v1.1.0

**Solution:**
- Réactivation du bouton dans le header
- Connexion au jeu de Tavli
- Fonctionne en parallèle du bouton intégré

**Code:**
```javascript
rollDice() {
    if (this.currentGame === 'backgammon' && window.currentGame) {
        window.currentGame.rollDice();
    }
}
```

### 2. Échecs - Pièces Capturées

**Ajout:**
- Sidebar avec liste des pièces capturées
- Séparation Blancs/Noirs
- Mise à jour en temps réel

**Interface:**
```
Pièces capturées
Blancs: ♟ ♞ ♝
Noirs: ♙ ♘
```

**Code:**
```javascript
this.captured = [[], []]; // Par joueur

movePiece(from, to) {
    if (capturedPiece) {
        this.captured[this.currentPlayer].push(capturedPiece.type);
        this.updateCaptured();
    }
}
```

### 3. Échecs - Historique des Coups

**Ajout:**
- Liste des coups joués
- Notation algébrique simplifiée
- Scroll automatique
- Numérotation des coups

**Interface:**
```
Historique
1. ♙ e2 → e4
2. ♟ e7 → e5
3. ♘ g1 → f3
```

**Code:**
```javascript
this.moveHistory = [];

movePiece(from, to) {
    const move = `${this.getNotation(from)} → ${this.getNotation(to)}`;
    this.moveHistory.push({ player, move, piece });
    this.updateHistory();
}
```

### 4. Version - Optimisation Affichage

**Changements:**
- Suppression version du header
- Ajout lien dans footer
- Clic ouvre page des versions

**Avant:**
```
Header: v1.1.1 [cliquable]
Footer: Version 1.1.1
```

**Après:**
```
Header: [pas de version]
Footer: Version 1.1.1 [cliquable]
```

## 📁 Fichiers modifiés

### js/chess-game.js (réécriture)
- Ajout propriétés `captured` et `moveHistory`
- Nouvelle structure avec sidebar
- Méthodes `updateCaptured()` et `updateHistory()`
- Notation algébrique `getNotation()`

### js/app.js
- Suppression références `app-version` header
- Ajout événement `footer-version-link`
- Connexion bouton dés au Tavli
- Réactivation dés pour backgammon

### index.html
- Suppression `<span id="app-version">` du header
- Ajout lien dans footer
- Ajout version 1.1.1

### styles.css
- Styles `.chess-container` avec flexbox
- Styles `.chess-sidebar` (200px)
- Styles `.chess-captured` et `.chess-history`
- Responsive mobile (colonne)

### version.json
- 1.1.0 → 1.1.1

## ✅ Tests

### Tavli
- ✅ Bouton dés header fonctionne
- ✅ Lance les dés du jeu
- ✅ Pas de conflit avec bouton intégré

### Échecs - Captures
- ✅ Pièces capturées affichées
- ✅ Séparation Blancs/Noirs
- ✅ Mise à jour temps réel
- ✅ Affichage correct des symboles

### Échecs - Historique
- ✅ Coups enregistrés
- ✅ Notation correcte (a1-h8)
- ✅ Scroll automatique
- ✅ Numérotation séquentielle

### Version
- ✅ Pas de version dans header
- ✅ Version cliquable dans footer
- ✅ Ouvre page des versions
- ✅ Retour fonctionne

### Responsive
- ✅ Desktop: sidebar à gauche
- ✅ Mobile: sidebar en haut
- ✅ Plateau adapté
- ✅ Scroll historique

## 📊 Comparaison

### Avant (v1.1.0)
- ❌ Pas de bouton dés Tavli
- ❌ Pas de captures visibles échecs
- ❌ Pas d'historique échecs
- ❌ Version dans header

### Après (v1.1.1)
- ✅ Bouton dés Tavli fonctionnel
- ✅ Captures visibles échecs
- ✅ Historique complet échecs
- ✅ Version uniquement footer

## 🎮 Interface Échecs

### Layout Desktop
```
┌─────────────┬──────────────┐
│  Captures   │              │
│  Blancs: ♟  │   Plateau    │
│  Noirs: ♙   │   8x8        │
├─────────────┤              │
│ Historique  │              │
│ 1. e2→e4    │              │
│ 2. e7→e5    │              │
└─────────────┴──────────────┘
```

### Layout Mobile
```
┌──────────────┐
│  Captures    │
│  Historique  │
├──────────────┤
│   Plateau    │
│     8x8      │
└──────────────┘
```

## 📝 Notes techniques

### Échecs - Architecture
- Container flex avec sidebar
- Sidebar fixe 200px desktop
- Sidebar 100% mobile
- Plateau responsive

### Historique
- Array de mouvements
- Scroll automatique bas
- Max height 300px
- Format: numéro + pièce + notation

### Captures
- Array par joueur [0] et [1]
- Affichage symboles Unicode
- Mise à jour synchrone

### Performance
- Pas d'impact significatif
- Rendu rapide
- Mémoire minimale

## 🚀 Déploiement

1. Merger cette PR
2. Tester Tavli avec bouton dés
3. Tester échecs (captures + historique)
4. Vérifier version footer
5. Valider responsive

---

**Version**: 1.1.1  
**Date**: 15 janvier 2024  
**Auteur**: Guillaume Moulard  
**Type**: Feature + UI/UX
