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
├── js/
│   ├── app.js         # Logique principale
│   └── games.js       # Logique des jeux
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
- **JavaScript** - Logique de jeu (à implémenter)
- **PWA** - Fonctionnalités d'application progressive

## 📋 État du Développement

### ✅ Terminé
- Interface utilisateur responsive
- Structure HTML complète
- Styles CSS complets
- Configuration PWA
- Logique principale de l'application (app.js)
- Logique de base pour les Dames
- Logique de base pour les Échecs
- Structure pour le Backgammon
- Structure pour les Petits Chevaux
- Système de versioning
- Sauvegarde locale des paramètres
- Historique des parties

### 🚧 À Développer
- [ ] Règles avancées pour les Dames (prise, dame)
- [ ] Règles complètes pour les Échecs (échec, mat, roque)
- [ ] Logique complète du Backgammon
- [ ] Logique complète des Petits Chevaux
- [ ] Icônes PWA (192x192 et 512x512)

## 🎨 Personnalisation

### Couleurs
- Primaire : `#2196F3` (Bleu)
- Secondaire : `#1976D2` (Bleu foncé)
- Arrière-plan : `#f5f5f5` (Gris clair)

### Responsive
- Mobile : < 768px
- Tablette/Desktop : ≥ 768px

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