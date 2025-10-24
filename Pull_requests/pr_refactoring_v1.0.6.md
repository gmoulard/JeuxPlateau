# Pull Request: Refactoring v1.0.6 - Séparation des fichiers par jeu

## 🎯 Objectif

Refactoriser le code pour séparer chaque jeu dans son propre fichier, avec une limite de 300 lignes par fichier, tout en maintenant toutes les fonctionnalités existantes.

## 📋 Changements

### Nouveaux fichiers créés

1. **js/backgammon-game.js** (298 lignes)
   - Extraction de la classe `BackgammonGame` depuis `games.js`
   - Logique complète du jeu de Tavli/Backgammon
   - Gestion des dés, déplacements, captures et barre

2. **js/ludo-game.js** (233 lignes)
   - Extraction de la classe `LudoGame` depuis `games.js`
   - Logique complète du jeu des Petits Chevaux
   - Gestion des dés, déplacements, captures et victoire

### Fichiers modifiés

3. **js/games.js**
   - Transformé en fichier deprecated minimal
   - Conservé pour compatibilité
   - Documentation pointant vers les nouveaux fichiers

4. **index.html**
   - Mise à jour des imports de scripts
   - Chargement des 5 fichiers JS séparés au lieu du monolithique
   - Ajout de la version 1.0.6 dans l'écran des versions

5. **version.json**
   - Incrémentation de la version: 1.0.5 → 1.0.6

### Fichiers existants (déjà refactorisés en v1.0.5)

- **js/base-game.js** (52 lignes) - Classe de base commune
- **js/checkers-game.js** (189 lignes) - Jeu de Dames
- **js/chess-game.js** (95 lignes) - Jeu d'Échecs

## 📊 Statistiques

| Fichier | Lignes | Status |
|---------|--------|--------|
| base-game.js | 52 | ✅ < 300 |
| checkers-game.js | 189 | ✅ < 300 |
| chess-game.js | 95 | ✅ < 300 |
| backgammon-game.js | 298 | ✅ < 300 |
| ludo-game.js | 233 | ✅ < 300 |

**Total: 867 lignes** réparties sur 5 fichiers spécialisés (vs ~900 lignes dans un seul fichier)

## ✅ Tests de fonctionnalité

Toutes les fonctionnalités ont été préservées:

- ✅ Jeu de Dames: Déplacements, prises obligatoires, prises multiples, promotion en Dame
- ✅ Jeu d'Échecs: Déplacements de base, captures
- ✅ Jeu de Tavli: Dés, déplacements, captures, barre, doubles
- ✅ Petits Chevaux: Dés, déplacements, captures, sortie avec 6, victoire

## 🏗️ Architecture

```
js/
├── base-game.js          # Classe de base (52 lignes)
├── checkers-game.js      # Dames (189 lignes)
├── chess-game.js         # Échecs (95 lignes)
├── backgammon-game.js    # Tavli (298 lignes)
├── ludo-game.js          # Petits Chevaux (233 lignes)
├── app.js                # Contrôleur principal
└── games.js              # DEPRECATED (compatibilité)
```

## 🔄 Migration

### Avant (v1.0.5)
```html
<script src="js/app.js"></script>
<script src="js/games.js"></script>
```

### Après (v1.0.6)
```html
<script src="js/base-game.js"></script>
<script src="js/checkers-game.js"></script>
<script src="js/chess-game.js"></script>
<script src="js/backgammon-game.js"></script>
<script src="js/ludo-game.js"></script>
<script src="js/app.js"></script>
```

## 📝 Avantages

1. **Maintenabilité**: Chaque jeu est isolé dans son propre fichier
2. **Lisibilité**: Fichiers plus courts et focalisés (< 300 lignes)
3. **Modularité**: Facile d'ajouter/modifier un jeu sans impacter les autres
4. **Performance**: Possibilité de lazy-loading futur
5. **Collaboration**: Plusieurs développeurs peuvent travailler sur différents jeux

## 🚀 Prochaines étapes

- [ ] Ajouter des tests unitaires par jeu
- [ ] Implémenter le lazy-loading des jeux
- [ ] Ajouter des règles avancées pour les Échecs (échec, mat, roque)

## 📌 Notes

- Aucune régression fonctionnelle
- Tous les jeux fonctionnent comme avant
- Le fichier `games.js` est conservé mais deprecated
- Documentation mise à jour dans chaque fichier

---

**Version**: 1.0.6  
**Date**: 15 janvier 2024  
**Auteur**: Guillaume Moulard  
**Type**: Refactoring
