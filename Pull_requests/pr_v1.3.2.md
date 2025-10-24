# Pull Request - Version 1.3.2

## 📋 Description
Correction des liens dans la page des versions pour pointer vers les fichiers MD de description des PR dans le répertoire Pull_requests/ au lieu de pointer vers la création de nouvelles PR.

## 🎯 Objectif
Permettre aux utilisateurs de consulter directement la documentation des PR depuis la page des versions de l'application.

## ✨ Changements

### Fichiers modifiés
- **`index.html`** : 
  - Modification de tous les liens "Voir la PR →"
  - Changement de `pull/new/feature/...` vers `blob/master/Pull_requests/pr_vX.X.X.md`
  - 14 liens mis à jour (versions 1.0.1 à 1.3.1)
- **`version.json`** : Version incrémentée à 1.3.2

## 📦 Impact
- Amélioration de l'expérience utilisateur
- Accès direct à la documentation des PR
- Pas d'impact sur le code fonctionnel

## 🔗 Liens
- Version précédente : 1.3.1
- Branche : `feature/fix-version-links-v1.3.2`
