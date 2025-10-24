# Pull Request - Version 1.3.1

## 📋 Description
Ajout de la configuration GitLab CI pour exécuter automatiquement les tests unitaires à chaque push.

## 🎯 Objectif
Mettre en place l'intégration continue pour garantir la qualité du code et détecter les régressions automatiquement.

## ✨ Changements

### Nouveau fichier
- **`.gitlab-ci.yml`** : Configuration GitLab CI
  - Image Node.js 18
  - Stage de test
  - Installation des dépendances npm
  - Exécution des tests avec `npm run test:run`
  - Cache des node_modules pour optimiser les builds

### Fichiers modifiés
- **`version.json`** : Version incrémentée à 1.3.1
- **`index.html`** : Ajout de la version 1.3.1 dans l'écran des versions
- **`README.md`** : Ajout section CI/CD dans la documentation

## 🧪 Tests
- Configuration testée localement
- Les tests existants (Morpion et Dames) seront exécutés automatiquement

## 📦 Impact
- Aucun impact sur le code fonctionnel
- Amélioration du processus de développement
- Détection automatique des régressions

## 🔗 Liens
- Version précédente : 1.3.0
- Branche : `feature/gitlab-ci-v1.3.1`
