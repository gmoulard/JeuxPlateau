# Corrections UI et Tavli

## Description

Cette PR corrige plusieurs problèmes identifiés dans l'application et renomme le jeu Backgammon en Tavli.

## Corrections apportées

### 1. ✅ Texte des boutons visible sur la page d'accueil

**Problème** : Le texte des boutons de sélection de jeu n'était pas visible.

**Solution** : Ajout de `color: #333;` dans le style `.game-btn` pour assurer la visibilité du texte sur fond blanc.

**Fichier modifié** : `styles.css`

### 2. ✅ Renommage Backgammon → Tavli

**Changements** :
- Bouton de sélection : "Backgammon" → "Tavli"
- Titre du jeu dans l'application : "Backgammon" → "Tavli"
- Commentaire dans le code : "Jeu de Backgammon" → "Jeu de Tavli (Backgammon)"

**Fichiers modifiés** :
- `index.html` : Texte du bouton
- `js/app.js` : Titre dans getGameTitle()
- `js/games.js` : Commentaire de classe

### 3. ✅ Déplacement des pions fonctionnel dans Tavli

**Problème** : La logique du jeu n'était pas implémentée, seul un message s'affichait.

**Solution** : Implémentation complète du jeu de Tavli avec :
- Plateau de 24 points avec position initiale standard
- Système de dés avec gestion des doubles
- Sélection et déplacement des pions par clic
- Validation des mouvements selon les règles
- Capture de pions adverses
- Gestion de la barre (pions capturés)
- Détection automatique des mouvements impossibles
- Alternance des joueurs

**Fichier modifié** : `js/games.js` (classe BackgammonGame complètement réécrite)

### 4. ✅ Bouton de dés intégré au plateau Tavli

**Problème** : Le bouton "Lancer les dés" était dans la barre supérieure, séparé du jeu.

**Solution** : 
- Bouton de dés intégré dans la section centrale du plateau Tavli
- Affichage des deux dés directement sur le plateau
- Compteur de pions sortis visible
- Interface cohérente et centralisée

**Fichiers modifiés** :
- `js/games.js` : Bouton intégré dans setupBoard()
- `js/app.js` : Ajout de window.currentGame pour accès global
- `styles.css` : Styles pour le bouton `.roll-dice-btn`

## Prompt utilisé

```
Créer une PR pour les corrections suivante : 
- Dans la home page le texte des boutons ne son pas visibles
- renorme le jeux de backgamon en Tavli
- dans le jeux de tabli, le deplacement des pions ne fonctionne pas. 
- dans le jeux de tabli, garde que le bouton central pour lancer les de.
```

## Tests suggérés

1. **Page d'accueil**
   - Vérifier que tous les textes des boutons sont visibles
   - Vérifier que le bouton affiche "Tavli" au lieu de "Backgammon"

2. **Jeu de Tavli**
   - Lancer une partie de Tavli
   - Cliquer sur le bouton "🎲 Lancer" au centre du plateau
   - Vérifier que les dés s'affichent
   - Sélectionner un pion en cliquant sur un point
   - Déplacer le pion vers un point valide
   - Vérifier la capture d'un pion adverse seul
   - Vérifier le passage automatique si aucun mouvement possible

3. **Interface**
   - Vérifier que le bouton de dés est bien intégré au plateau
   - Vérifier l'affichage des compteurs de pions sortis
   - Tester sur mobile

## Fichiers modifiés

- `index.html` : Renommage du bouton
- `styles.css` : Couleur texte boutons + styles Tavli complets
- `js/app.js` : Renommage + référence globale au jeu
- `js/games.js` : Implémentation complète de BackgammonGame

## Notes

- Le jeu de Tavli est maintenant entièrement fonctionnel
- L'interface est cohérente avec un bouton de dés intégré au plateau
- Le code respecte les règles standard du backgammon/tavli
- Toutes les corrections demandées ont été implémentées