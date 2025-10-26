# Pull Request v1.4.14

## 📋 Description
Ajout de statistiques de jeu, personnalisation des couleurs, amélioration de l'interface et corrections diverses.

## 🎯 Objectif
Enrichir l'expérience utilisateur avec des statistiques détaillées, des options de personnalisation et des améliorations d'interface.

## ✨ Changements

### Statistiques Tavli
- **Pions sortis** : Affichage X/15 pour chaque joueur
- **Points restants** : Calcul du pip count (distance totale à parcourir)
- **Panneau dédié** : Nouveau panneau tavli-stats avec statistiques en temps réel

### Statistiques Dames
- **Pions capturés** : Compteur de pions pris par chaque joueur
- **Panneau captures** : Affichage ⚪/⚫ avec nombre de pions capturés

### Personnalisation Couleurs
- **Cases claires/foncées** : Sélecteur de couleur pour les cases du plateau
- **Pions joueur 1/2** : Personnalisation des couleurs des pions
- **Variables CSS** : Utilisation de CSS custom properties (--light-cell, --dark-cell, --player1-color, --player2-color)
- **Sauvegarde locale** : Préférences enregistrées dans localStorage
- **Bouton réinitialiser** : Retour aux couleurs par défaut
- **Application immédiate** : Changements visibles en temps réel

### Améliorations Interface
- **Logo cliquable** : Clic sur logo retourne à l'index (window.location.reload())
- **Couleur joueur Échecs** : Affichage "(Blancs)" ou "(Noirs)" à côté du nom
- **Couleurs dynamiques** : Dames, Échecs et Tavli utilisent les couleurs personnalisées

### Corrections CSS
- **Plateau Petits Chevaux** : Correction affichage avec grille 2x2 et piste
- **Tailles optimisées** : Ajustement des dimensions pour meilleure visibilité

## 📁 Fichiers Modifiés
- `version.json` : Version 1.4.14
- `index.html` : Logo cliquable, sélecteurs de couleurs dans paramètres
- `styles.css` : Variables CSS pour couleurs, styles checkers-stats
- `js/app.js` : Gestion couleurs (loadColors, updateColors, resetColors, showSettingsScreen)
- `js/checkers-game.js` : Compteur captures, utilisation var(--player1-color)
- `js/chess-game.js` : Couleurs dynamiques pour pièces
- `js/backgammon-game.js` : Statistiques (sortis, pips), couleurs dynamiques
- `js/ludo-game.js` : Corrections plateau

## 🔧 Détails Techniques

### Variables CSS
```css
:root {
    --light-cell: #f0d9b5;
    --dark-cell: #b58863;
    --player1-color: #ffffff;
    --player2-color: #333333;
}
```

### LocalStorage
- `gameColors` : Stockage des préférences de couleurs
- Chargement au démarrage de l'app
- Mise à jour en temps réel

### Statistiques Tavli
- Calcul pip count : distance × nombre de pions par position
- Pions sur barre comptent 25 points
- Pions sortis = 15 - (sur plateau + sur barre)

## ✅ Tests
- [x] Sélection couleurs fonctionne
- [x] Sauvegarde/chargement couleurs
- [x] Réinitialisation couleurs
- [x] Statistiques Tavli correctes
- [x] Compteur captures Dames
- [x] Logo cliquable retour index
- [x] Couleurs appliquées Dames/Échecs/Tavli
- [x] Affichage couleur joueur Échecs

## 📸 Résultat
Application enrichie avec statistiques détaillées, personnalisation complète des couleurs et interface améliorée pour une meilleure expérience utilisateur.
