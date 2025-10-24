# Jeux de Plateau

Une application web progressive (PWA) pour jouer aux jeux de plateau classiques.

## 🎮 Jeux Disponibles

- **Dames** - Jeu de dames traditionnel
- **Échecs** - Jeu d'échecs classique
- **Backgammon** - Jeu de backgammon
- **Petits Chevaux** - Jeu des petits chevaux (Ludo)

## 🚀 Fonctionnalités

- Interface responsive adaptée aux mobiles et tablettes
- Support PWA (Progressive Web App) - installable sur mobile
- Multijoueur local (2-4 joueurs selon le jeu)
- Interface en français
- Design moderne et intuitif
- Numéro de version visible dans l'application
- Sauvegarde automatique des paramètres (noms des joueurs)
- Historique local des parties jouées

## 📱 Installation

### Utilisation Web
1. Ouvrez `index.html` dans votre navigateur
2. L'application fonctionne directement sans installation

### Installation PWA
1. Ouvrez l'application dans votre navigateur mobile
2. Utilisez l'option "Ajouter à l'écran d'accueil"
3. L'application sera installée comme une app native

## 🛠️ Structure du Projet

```
JeuxPlateau/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── manifest.json       # Configuration PWA
├── version.json        # Version de l'application
├── js/
│   ├── app.js              # Logique principale
│   ├── base-game.js        # Classe de base
│   ├── checkers-game.js    # Jeu de Dames
│   ├── chess-game.js       # Jeu d'Échecs
│   ├── backgammon-game.js  # Jeu de Tavli
│   └── ludo-game.js        # Petits Chevaux
└── README.md          # Documentation
```

## 🎯 Utilisation

1. **Sélection du jeu** : Choisissez un jeu sur l'écran d'accueil
2. **Configuration** : Définissez le nombre de joueurs et leurs noms
3. **Jeu** : Suivez les règles du jeu sélectionné
4. **Dés** : Utilisez le bouton de lancement de dés quand nécessaire

## 🔧 Technologies Utilisées

- **HTML5** - Structure de l'application
- **CSS3** - Styles et responsive design
- **JavaScript ES6+** - Logique de jeu
- **PWA** - Fonctionnalités d'application progressive
- **Vitest** - Tests unitaires
- **Service Worker** - Mode hors connexion

## 🧪 Tests

### Exécuter les tests
```bash
npm install
npm test        # Mode watch
npm run test:ui # Interface graphique
npm run test:run # Exécution unique
```

### Tests disponibles
- Tests Morpion (Tic-Tac-Toe)
- Tests Dames (Checkers)
- Plus de tests à venir

### CI/CD
- GitLab CI configuré pour exécuter les tests automatiquement
- Tests lancés à chaque push
- Cache npm pour optimiser les builds

## 📋 État du Développement

### ✅ Terminé
- Interface utilisateur responsive
- Structure HTML complète
- Styles CSS complets
- Configuration PWA
- Logique principale de l'application (app.js)
- Logique complète pour les Dames (prises obligatoires, dame)
- Logique avancée pour les Échecs (mouvements par pièce)
- Logique complète du Backgammon
- Logique complète des Petits Chevaux
- Système de versioning
- Sauvegarde locale des paramètres
- Historique des parties
- Refactoring: fichiers séparés par jeu (< 300 lignes)
- Icônes PWA (192x192 et 512x512)
- Tests unitaires avec Vitest

### 🚧 À Développer
- [ ] Règles complètes pour les Échecs (échec, mat, roque, en passant)
- [ ] Lazy-loading des jeux (optimisation future)

## 🎨 Personnalisation

### Couleurs
- Primaire : `#2196F3` (Bleu)
- Secondaire : `#1976D2` (Bleu foncé)
- Arrière-plan : `#f5f5f5` (Gris clair)

### Responsive
- Mobile : < 768px
- Tablette/Desktop : ≥ 768px

## 🤖 Génération par IA

**Important** : Ce projet a été entièrement généré par des modèles de langage (LLM) :
- Code HTML, CSS et JavaScript généré par Amazon Q Developer
- Architecture et structure du projet conçues par IA
- Documentation rédigée automatiquement

Cette approche permet un développement rapide et cohérent, tout en maintenant la qualité du code.

## 📄 Licence

Projet personnel - Libre d'utilisation

## 🤝 Contribution

Pour contribuer au projet :
1. Forkez le repository
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📞 Support

Pour toute question ou suggestion, ouvrez une issue sur le repository.