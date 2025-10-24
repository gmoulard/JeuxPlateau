# Jeux de Plateau

Une application web progressive (PWA) pour jouer aux jeux de plateau classiques.

## 🎮 Jeux Disponibles

- **Morpion** - Jeu de Tic-Tac-Toe (3x3)
- **Dames** - Jeu de dames traditionnel
- **Échecs** - Jeu d'échecs classique
- **Tavli** - Jeu de backgammon
- **Petits Chevaux** - Jeu des petits chevaux (Ludo)
- **Abalone** - Jeu de stratégie hexagonal

## 🚀 Fonctionnalités

- Interface responsive adaptée aux mobiles et tablettes
- Support PWA (Progressive Web App) - installable sur mobile
- Bouton d'installation PWA dans le header
- Mode hors connexion via Service Worker
- Multijoueur local (2-4 joueurs selon le jeu)
- Interface en français
- Design moderne avec effets glassmorphism
- Fond d'écran dégradé ou caméra (optionnel)
- Logo SVG personnalisé
- Numéro de version visible dans l'application
- Sauvegarde automatique des paramètres (noms des joueurs)
- Historique local des parties jouées
- Page d'aide contextuelle par jeu
- Historique des versions avec liens vers les PR

## 📱 Installation

URL Git : https://github.com/gmoulard/JeuxPlateau
URL Jeux : https://gmoulard.github.io/JeuxPlateau/

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
├── index.html              # Page principale (359 lignes)
├── styles.css              # Styles CSS (798 lignes)
├── manifest.json           # Configuration PWA
├── version.json            # Version de l'application
├── sw.js                   # Service Worker (41 lignes)
├── logo.svg                # Logo de l'application
├── icon-192.png            # Icône PWA 192x192
├── icon-512.png            # Icône PWA 512x512
├── .gitlab-ci.yml          # Configuration GitLab CI
├── .gitignore              # Fichiers ignorés par Git
├── package.json            # Dépendances npm
├── vitest.config.js        # Configuration Vitest
├── js/
│   ├── app.js              # Logique principale (370 lignes)
│   ├── base-game.js        # Classe de base (48 lignes)
│   ├── tictactoe-game.js   # Jeu de Morpion (86 lignes)
│   ├── checkers-game.js    # Jeu de Dames (176 lignes)
│   ├── chess-game.js       # Jeu d'Échecs (224 lignes)
│   ├── backgammon-game.js  # Jeu de Tavli (280 lignes)
│   ├── ludo-game.js        # Petits Chevaux (197 lignes)
│   └── abalone-game.js     # Jeu d'Abalone (255 lignes)
├── tests/
│   ├── tictactoe.test.js   # Tests Morpion
│   └── checkers.test.js    # Tests Dames
├── Pull_requests/          # Documentation des PR
│   └── pr_v1.0.1.md à pr_v1.3.2.md
└── README.md               # Documentation

Total code source : 2 894 lignes
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
- **Service Worker** - Mode hors connexion
- **Vitest** - Tests unitaires
- **GitLab CI** - Intégration continue

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
- Styles CSS complets avec glassmorphism
- Configuration PWA complète
- Icônes PWA (192x192 et 512x512)
- Logo SVG personnalisé
- Bouton d'installation PWA
- Service Worker pour mode hors connexion
- Option fond caméra (désactivée par défaut)
- Logique principale de l'application (app.js)
- Jeu de Morpion complet (victoire, match nul)
- Logique complète pour les Dames (prises obligatoires, dame)
- Logique avancée pour les Échecs (mouvements par pièce, validation chemin)
- Logique complète du Tavli/Backgammon avec barre de réintroduction
- Logique complète des Petits Chevaux
- Jeu d'Abalone avec plateau hexagonal
- Système de versioning
- Sauvegarde locale des paramètres
- Historique des parties
- Page d'aide contextuelle
- Refactoring: fichiers séparés par jeu (< 300 lignes)
- Tests unitaires avec Vitest (Morpion, Dames)
- GitLab CI pour tests automatiques
- Documentation complète des PR

### 🚧 À Développer
- [ ] Règles complètes pour les Échecs (échec, mat, roque, en passant)
- [ ] Tests unitaires pour tous les jeux
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

### Workflow de développement
Chaque modification suit ce processus automatisé :
1. Création d'une branche feature/fix
2. Modifications du code
3. Incrémentation de la version
4. Création de la documentation PR
5. Commit et push de la branche
6. Merge dans master
7. Push de master

### Statistiques du projet
- **Version actuelle** : 1.4.4
- **Lignes de code** : 2 894 lignes
- **Nombre de jeux** : 6 jeux complets
- **Fichiers JavaScript** : 11 fichiers (tous < 300 lignes)
- **Tests** : 2 suites de tests
- **Versions publiées** : 24 versions (1.0.0 à 1.4.4)



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