# Améliorations professionnelles de l'application

## Description

Cette PR améliore significativement le professionnalisme de l'application en ajoutant un système de versioning, la sauvegarde locale des paramètres utilisateur et un historique des parties jouées.

## Changements

### 1. Système de versioning

**Fichiers modifiés/créés :**
- `version.json` (nouveau) : Fichier de configuration de version
- `index.html` : Ajout de l'affichage de la version dans le header
- `js/app.js` : Chargement et affichage de la version
- `styles.css` : Styles pour l'affichage de la version

**Fonctionnalités :**
- Version visible dans le header de l'application (v1.0.0)
- Fichier version.json centralisé pour faciliter les mises à jour
- Chargement asynchrone de la version au démarrage

### 2. Sauvegarde locale des paramètres

**Fichiers modifiés :**
- `js/app.js` : Implémentation de localStorage pour les paramètres

**Fonctionnalités :**
- Sauvegarde automatique du dernier jeu sélectionné
- Sauvegarde du nombre de joueurs
- Sauvegarde des noms des joueurs
- Pré-remplissage automatique lors de la prochaine partie du même jeu
- Utilisation de localStorage (persistance navigateur)

### 3. Historique des parties

**Fichiers modifiés/créés :**
- `index.html` : Ajout d'un écran d'historique et bouton dans le header
- `js/app.js` : Gestion de l'historique des parties
- `styles.css` : Styles pour l'affichage de l'historique

**Fonctionnalités :**
- Enregistrement automatique de chaque partie lancée
- Affichage de l'historique avec :
  - Nom du jeu
  - Liste des joueurs
  - Date et heure de la partie
- Limite de 50 parties dans l'historique
- Bouton dédié dans le header (📊)
- Interface responsive pour l'historique

## Structure des données

### localStorage - gameSettings
```json
{
  "gameType": "backgammon",
  "playerCount": "2",
  "playerNames": ["Alice", "Bob"]
}
```

### localStorage - gameHistory
```json
[
  {
    "game": "Backgammon",
    "players": ["Alice", "Bob"],
    "winner": null,
    "date": "2024-01-15T10:30:00.000Z"
  }
]
```

## Prompt utilisé

```
Fait une pr pour améliore le projet et le rendre plus professionnnele. Ajoute des numero de version visisible dans l'application et qui s'imcremente a chaque PR. Ajoute un sauvegarde local des données pour que les paramettre demander dans l'interface soit toujours pré-remplie avec les derniere donnees saisie. ajoute la fonctionnalité de garder en local un histoirque des partie jouées.
```

## Tests suggérés

1. **Versioning**
   - Vérifier que la version s'affiche dans le header
   - Vérifier le format "v1.0.0"

2. **Sauvegarde des paramètres**
   - Lancer une partie avec des noms personnalisés
   - Revenir au menu et relancer le même jeu
   - Vérifier que les noms sont pré-remplis

3. **Historique**
   - Lancer plusieurs parties de différents jeux
   - Cliquer sur le bouton 📊 dans le header
   - Vérifier l'affichage de l'historique avec dates
   - Vérifier le tri (plus récent en premier)

4. **Responsive**
   - Tester sur mobile
   - Vérifier l'affichage de la version et du bouton historique

## Améliorations futures possibles

- Ajout du gagnant dans l'historique (nécessite détection de fin de partie)
- Export de l'historique en CSV
- Statistiques par jeu et par joueur
- Incrémentation automatique de version via CI/CD
- Changelog visible dans l'application

## Notes

- La version doit être mise à jour manuellement dans `version.json` à chaque PR
- Les données sont stockées dans localStorage (limitées au navigateur)
- L'historique est limité à 50 parties pour éviter la saturation du localStorage
- Aucune donnée n'est envoyée à un serveur (100% local)