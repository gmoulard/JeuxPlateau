# Page d'aide - Règles des jeux

## Description

Cette PR ajoute une page d'aide complète accessible depuis le header, expliquant les règles et comment jouer à chaque jeu disponible dans l'application.

## Changements

### 1. Bouton d'aide dans le header

**Ajout** :
- Bouton "❓" dans le header à côté du bouton historique
- Accessible depuis n'importe quel écran
- Style cohérent avec les autres boutons du header

**Fichiers modifiés** :
- `index.html` : Ajout du bouton dans header-actions
- `styles.css` : Styles pour #help-btn
- `js/app.js` : Événement click pour afficher l'aide

### 2. Écran d'aide complet

**Contenu de la page d'aide** :

#### 🎯 Dames
- But du jeu
- Comment sélectionner et déplacer les pions
- Règles de déplacement (diagonale, sens)
- Règles de prise (obligatoire, saut, multiple)
- Promotion en Dame (♛)
- Déplacement des Dames

#### ♟ Échecs
- But du jeu (échec et mat)
- Comment sélectionner et déplacer les pièces
- Position des joueurs
- Règles de base des déplacements
- Capture des pièces

#### 🎲 Tavli (Backgammon)
- But du jeu (sortir tous les pions)
- Comment lancer les dés
- Sélection et déplacement des pions
- Sens de déplacement par joueur
- Règles de placement
- Capture de pions adverses
- Gestion de la barre
- Règle des doubles

#### 🎰 Petits Chevaux
- But du jeu (tour du plateau)
- Lancement des dés
- Déplacement des pions
- Sortie de la base (avec un 6)
- Capture des pions adverses
- Tour supplémentaire avec un 6

**Fichiers modifiés** :
- `index.html` : Nouvel écran help-screen avec contenu complet
- `styles.css` : Styles pour help-content et help-section
- `js/app.js` : Navigation vers/depuis l'aide

### 3. Navigation

**Fonctionnalités** :
- Bouton "Retour" pour revenir au menu principal
- Écran scrollable pour contenu long
- Responsive mobile

## Prompt utilisé

```
fait un PR pour ajoute un page d''aide qui explique au joueur comment pour utiliser chaque jeux.
```

## Interface

**Structure de la page d'aide** :
- Titre principal "Aide - Comment jouer"
- 4 sections (une par jeu)
- Chaque section contient :
  - Icône et nom du jeu
  - But du jeu
  - Instructions détaillées sous forme de liste
- Bouton "Retour" en bas

**Design** :
- Fond blanc pour le contenu
- Sections séparées par des bordures
- Titres en bleu (#2196F3)
- Listes à puces pour faciliter la lecture
- Hauteur maximale avec scroll si nécessaire

## Tests suggérés

1. **Accès à l'aide**
   - Cliquer sur le bouton "❓" dans le header
   - Vérifier que la page d'aide s'affiche

2. **Contenu**
   - Vérifier que les 4 jeux sont documentés
   - Vérifier la clarté des explications
   - Vérifier les icônes et emojis

3. **Navigation**
   - Cliquer sur "Retour" pour revenir au menu
   - Vérifier que le bouton fonctionne

4. **Responsive**
   - Tester sur mobile
   - Vérifier le scroll si contenu long
   - Vérifier la lisibilité

5. **Accessibilité**
   - Vérifier que le bouton a un title (tooltip)
   - Vérifier la hiérarchie des titres

## Fichiers modifiés

- `index.html` : Bouton aide + écran d'aide
- `js/app.js` : Événements navigation aide
- `styles.css` : Styles page d'aide

## Notes

- La page d'aide est accessible à tout moment via le header
- Les explications sont concises et orientées action
- Chaque jeu a ses règles spécifiques clairement expliquées
- L'interface est cohérente avec le reste de l'application
- Le contenu est en français et adapté aux joueurs débutants