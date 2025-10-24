# Pull Request - Version 1.4.0

## 📋 Description
Ajout d'un nouveau jeu de stratégie : Abalone, un jeu pour 2 joueurs sur plateau hexagonal.

## 🎯 Objectif
Enrichir l'application avec un jeu de stratégie abstrait reconnu mondialement.

## 🎮 Le jeu d'Abalone

### Règles
- **Joueurs** : 2 (Noir vs Blanc)
- **Plateau** : Hexagonal 9x9 avec 61 cases
- **Billes** : 14 billes par joueur
- **But** : Éjecter 6 billes adverses hors du plateau
- **Déplacement** : 1 à 3 billes alignées peuvent se déplacer ensemble
- **Poussée** : On peut pousser 1 ou 2 billes adverses avec 2 ou 3 de ses billes (sumito)
- **Victoire** : Premier à éjecter 6 billes adverses

### Fonctionnalités implémentées
- ✅ Plateau hexagonal avec 61 cases
- ✅ Position initiale standard
- ✅ Sélection de 1 à 3 billes
- ✅ Validation de l'alignement
- ✅ Déplacement dans 6 directions (E, W, NE, NW, SE, SW)
- ✅ Poussée des billes adverses
- ✅ Éjection hors du plateau
- ✅ Compteur de billes éjectées
- ✅ Détection de victoire
- ✅ Bouton désélectionner

## 📁 Fichiers

### Nouveau
- **`js/abalone-game.js`** (280 lignes)
  - Classe AbaloneGame héritant de BaseGame
  - Création du plateau hexagonal
  - Logique de sélection et déplacement
  - Calcul des voisins hexagonaux
  - Poussée en chaîne
  - Détection de victoire

### Modifiés
- **`styles.css`** : Ajout styles Abalone
  - `.abalone-container` : Conteneur principal
  - `.abalone-board` : Plateau hexagonal
  - `.hex-row` : Rangées avec offset
  - `.hex-cell` : Cases circulaires
  - `.abalone-piece` : Billes noir/blanc
  - Effets hover et sélection

- **`index.html`** : 
  - Ajout bouton "Abalone" dans la grille
  - Ajout script `abalone-game.js`
  - Ajout version 1.4.0

- **`js/app.js`** :
  - Ajout 'abalone' dans getGameTitle()
  - Masquage dés pour Abalone
  - Initialisation AbaloneGame
  - Aide contextuelle Abalone

- **`version.json`** : 1.3.3 → 1.4.0

## ✅ Tests

### Plateau
- ✅ 61 cases hexagonales
- ✅ Position initiale correcte (14 billes par joueur)
- ✅ Affichage responsive

### Sélection
- ✅ Clic sur bille pour sélectionner
- ✅ Maximum 3 billes
- ✅ Désélection par clic
- ✅ Bouton désélectionner tout

### Déplacement
- ✅ Validation alignement
- ✅ 6 directions possibles
- ✅ Déplacement 1 bille
- ✅ Déplacement 2 billes alignées
- ✅ Déplacement 3 billes alignées

### Poussée
- ✅ Pousser 1 bille adverse avec 2 billes
- ✅ Pousser 2 billes adverses avec 3 billes
- ✅ Éjection hors du plateau
- ✅ Compteur mis à jour

### Victoire
- ✅ Détection à 6 billes éjectées
- ✅ Message de victoire
- ✅ Affichage du gagnant

## 📊 Comparaison

### Avant (v1.3.3)
- 5 jeux disponibles
- Pas de jeu de stratégie pure

### Après (v1.4.0)
- 6 jeux disponibles
- Abalone : jeu de stratégie abstrait
- Diversité des types de jeux

## 🎨 Design

### Plateau
```
     I5 I6 I7 I8 I9
    H4 H5 H6 H7 H8 H9
   G3 G4 G5 G6 G7 G8 G9
  F2 F3 F4 F5 F6 F7 F8 F9
 E1 E2 E3 E4 E5 E6 E7 E8 E9
  D1 D2 D3 D4 D5 D6 D7 D8
   C1 C2 C3 C4 C5 C6 C7
    B1 B2 B3 B4 B5 B6
     A1 A2 A3 A4 A5
```

### Couleurs
- Plateau : Marron (#8B7355)
- Cases : Beige (#DEB887)
- Billes noires : #000
- Billes blanches : #fff
- Sélection : Or (#FFD700)

## 📝 Notes techniques

### Coordonnées hexagonales
- Notation alphanumérique (A1-I9)
- 9 rangées de longueur variable
- Offset pour centrage visuel

### Directions
- E/W : Est/Ouest
- NE/NW : Nord-Est/Nord-Ouest
- SE/SW : Sud-Est/Sud-Ouest

### Algorithme de poussée
- Récursif pour pousser en chaîne
- Détection bord pour éjection
- Validation force (2 vs 1, 3 vs 2)

### Performance
- Rendu rapide (< 300 lignes)
- Pas de calculs complexes
- Mémoire minimale

## 🔗 Liens
- Version précédente : 1.3.3
- Branche : `feature/abalone-game-v1.4.0`
- Règles officielles : https://www.letempledujeu.fr/IMG/pdf/abalone.pdf

---

**Version**: 1.4.0  
**Date**: 15 janvier 2024  
**Auteur**: Guillaume Moulard  
**Type**: Feature - Nouveau jeu
