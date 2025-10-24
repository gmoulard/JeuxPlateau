# Jeux de Plateau

Une application web progressive (PWA) pour jouer aux jeux de plateau classiques.

## 🎮 Jeux Disponibles

- **Morpion** - Jeu de Tic-Tac-Toe (3x3)
- **Dames** - Jeu de dames traditionnel
- **Échecs** - Jeu d'échecs classique
- **Tavli** - Jeu de backgammon
- **Petits Chevaux** - Jeu des petits chevaux (Ludo)

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
│   ├── app.js              # Logique principale (355 lignes)
│   ├── base-game.js        # Classe de base (48 lignes)
│   ├── tictactoe-game.js   # Jeu de Morpion (86 lignes)
│   ├── checkers-game.js    # Jeu de Dames (176 lignes)
│   ├── chess-game.js       # Jeu d'Échecs (224 lignes)
│   ├── backgammon-game.js  # Jeu de Tavli (219 lignes)
│   └── ludo-game.js        # Petits Chevaux (197 lignes)
├── tests/
│   ├── tictactoe.test.js   # Tests Morpion
│   └── checkers.test.js    # Tests Dames
├── Pull_requests/          # Documentation des PR
│   └── pr_v1.0.1.md à pr_v1.3.2.md
└── README.md               # Documentation

Total code source : 2 503 lignes
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
- Logique complète du Tavli/Backgammon
- Logique complète des Petits Chevaux
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
- **Version actuelle** : 1.3.2
- **Lignes de code** : 2 503 lignes
- **Nombre de jeux** : 5 jeux complets
- **Fichiers JavaScript** : 10 fichiers (tous < 300 lignes)
- **Tests** : 2 suites de tests
- **Versions publiées** : 18 versions (1.0.0 à 1.3.2)

### Historique des prompts

Voici tous les prompts utilisés pour générer cette application :

#### Version initiale
```
fait une PR pour documenter que tout le code est generer par des LLM et met dans la description de la pr le prompte.
```

#### v1.0.0 - Professionnalisation
```
Fait une pr pour améliore le projet et le rendre plus professionnnele. Ajoute des numero de version visisible dans l'application et qui s'imcremente a chaque PR. Ajoute un sauvegarde local des données pour que les paramettre demander dans l'interface soit toujours pré-remplie avec les derniere donnees saisie. ajoute la fonctionnalité de garder en local un histoirque des partie jouées.
```

#### v1.0.1 - Améliorations Dames et Échecs
```
passe en version 1.0.1, 
dans le jeux de dame Suprime le lancé du dé, re fait un plateau, l'actuelle n'est pas bon fait le bien carre, met en place  Règles avancées pour les Dames (prise, dame).
Dans le jeux d'echque,Suprime le lancé du dé, le fait un plateau, l'actuelle n'est pas bon fait le bien carre.
Seul les petit chevaux ont besoins du nombre de joueur, les autre se joue toujours a 2.
```

#### Backgammon complet
```
fait un PR pour ajouter toute la Logique complète du Backgammon.
```

#### Page d'aide
```
fait un PR pour ajoute un page d'aide qui explique au joueur comment pour utiliser chaque jeux.
```

#### v1.0.6 - Refactoring
```
Refactoriser le code pour séparer chaque jeu dans son propre fichier, avec une limite de 300 lignes par fichier.
```

#### v1.0.7 - PWA Installation
```
Ajouter un bouton d'installation PWA dans le header et corriger l'affichage du Tavli sur mobile.
```

#### v1.0.8 - Footer et GitHub
```
Ajouter un footer avec copyright gmoulard@gmail.com et un lien GitHub sur le titre.
```

#### v1.0.9 - Refonte Tavli
```
Refaire complètement l'interface du jeu de Tavli qui ne fonctionne pas correctement.
```

#### v1.1.0 - Corrections Tavli
```
Corriger le sens de rotation des pions Tavli, ajouter l'affichage des pions capturés, ajouter la couleur du joueur, et supprimer le bouton de dés redondant.
```

#### v1.1.1 - Améliorations Interface
```
Réactiver le bouton dés pour Tavli, ajouter les pièces capturées et l'historique des coups pour les Échecs, déplacer la version uniquement dans le footer.
```

#### v1.2.0 - Morpion
```
Ajouter un nouveau jeu de Morpion (Tic-Tac-Toe) pour 2 joueurs.
```

#### v1.2.1 - PWA Offline
```
Créer un Service Worker pour le mode hors connexion, corriger le bouton dés Tavli, ajouter une animation de rotation des dés, et changer les pions des Dames en noir et blanc.
```

#### v1.2.2 - Logo et Caméra
```
Créer un logo SVG, ajouter un fond d'écran dégradé, ajouter un bouton pour activer la caméra en fond, et ajouter des effets de transparence (glassmorphism).
```

#### v1.2.3 - Fix Tavli
```
Modifier le projet, Incrémenter la version, crée et applique une un pull request dans Git.  
Les modifications sont : 
- dans tavli le bouton lance les dé ne marche pas.
```

#### v1.3.0 - Fonctionnalités complètes
```
Implémente les fonctionnalités restantes du README : Icônes PWA (192x192 et 512x512), Tests unitaires avec Vitest, et Amélioration des règles des Échecs avec validation par pièce.
```

#### v1.3.1 - GitLab CI
```
ajoute les test dans la CI de gitlab
```

#### v1.3.2 - Liens versions
```
Change les liens de la pages des version pour ne plus pointé vers les pr, mais pour pointé vers les fichier md de descrition de la pr qui don la le repertorie Poll_requests du repository
```

#### Documentation README
```
peur tu remettre a jours de fichier README/md
```

```
peut tu ajouter dans le readme tout les promptes qui ont permis de generer l'application
```

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