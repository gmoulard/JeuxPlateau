# Pull Request v1.4.7 - Plateau de Dames 10x10

## 📋 Description
Correction du plateau de dames pour respecter les dimensions officielles : 10 lignes × 10 colonnes.

## 🎯 Objectif
Implémenter le plateau de dames aux dimensions réglementaires internationales.

## ✨ Changements

### Jeu de Dames (checkers-game.js)
- ✅ Plateau 8x8 → 10x10
- ✅ 4 rangées de pions par joueur (au lieu de 3)
- ✅ 20 pions par joueur (au lieu de 12)
- ✅ Promotion en Dame à la ligne 9 (au lieu de 7)
- ✅ Ajustement des limites de validation

## 📊 Détails techniques

### Avant (8x8)
- Plateau : 8 lignes × 8 colonnes
- Pions blancs : lignes 0-2 (12 pions)
- Pions noirs : lignes 5-7 (12 pions)
- Total : 24 pions

### Après (10x10)
- Plateau : 10 lignes × 10 colonnes
- Pions blancs : lignes 0-3 (20 pions)
- Pions noirs : lignes 6-9 (20 pions)
- Total : 40 pions

## 🔧 Fichiers modifiés
- `js/checkers-game.js` - Dimensions et logique
- `version.json` - Version 1.4.7

## ✅ Tests
- [x] Plateau 10x10 affiché correctement
- [x] 20 pions par joueur
- [x] Déplacements valides
- [x] Prises fonctionnelles
- [x] Promotion en Dame ligne 9

## 📝 Notes
Conforme aux règles internationales du jeu de dames.
