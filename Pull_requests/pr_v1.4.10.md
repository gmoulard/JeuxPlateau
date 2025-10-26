# Pull Request v1.4.10 - Noms de personnages Astérix aléatoires

## 📋 Description
Amélioration de l'expérience utilisateur avec une liste étendue de 30 personnages d'Astérix et tirage aléatoire des noms à chaque configuration de partie.

## 🎯 Objectif
- Enrichir la liste des personnages d'Astérix (8 → 30 personnages)
- Rendre le choix des noms aléatoire pour plus de variété
- Améliorer l'immersion dans l'univers d'Astérix

## ✨ Fonctionnalités ajoutées
1. **Liste étendue de personnages** : 30 noms issus de la page Wikipedia d'Astérix
   - Gaulois du village : Astérix, Obélix, Panoramix, Idéfix, Abraracourcix, etc.
   - Autres Gaulois : Beaufix, Goudurix, Tragicomix, etc.
   - Romains : Jules César, Tullius Détritus
   - Égyptiens : Cléopâtre, Numérobis, Amonbofis
   - Pirates : Barbe-Rouge, Triple-Patte
   - Personnages variés : Jolitorax, Aplusbégalix, Ocatarinetabellatchitchix

2. **Tirage aléatoire** : Les noms sont mélangés à chaque configuration de partie

## 🔧 Modifications techniques

### Fichiers modifiés
- `js/app.js` : Méthode `updatePlayerInputs()`
  - Ajout de 22 nouveaux personnages (8 → 30)
  - Implémentation du mélange aléatoire avec `sort(() => Math.random() - 0.5)`

### Code modifié
```javascript
updatePlayerInputs(count) {
    const asterixNames = ['Astérix', 'Obélix', 'Panoramix', 'Idéfix', 
        'Abraracourcix', 'Assurancetourix', 'Agecanonix', 'Bonemine', 
        'Falbala', 'Ordralfabétix', 'Cétautomatix', 'Plaintcontrix', 
        'Beaufix', 'Goudurix', 'Tragicomix', 'Bonnemine', 'Pepe', 
        'Zérozérosix', 'Tullius Détritus', 'Jules César', 'Cléopâtre', 
        'Numérobis', 'Amonbofis', 'Barbe-Rouge', 'Triple-Patte', 
        'Jolitorax', 'Aplusbégalix', 'Moralélastix', 'Promoplus', 
        'Ocatarinetabellatchitchix'];
    const shuffled = [...asterixNames].sort(() => Math.random() - 0.5);
    // ... reste du code
}
```

## 📊 Impact
- **Variété** : 30 personnages différents disponibles
- **Aléatoire** : Ordre différent à chaque partie
- **Immersion** : Meilleure représentation de l'univers d'Astérix
- **Compatibilité** : Fonctionne avec tous les jeux (2-4 joueurs)

## ✅ Tests effectués
- [x] Vérification du mélange aléatoire
- [x] Test avec 2 joueurs
- [x] Test avec 4 joueurs (Petits Chevaux)
- [x] Vérification de l'absence de doublons
- [x] Test de tous les jeux

## 📝 Notes
- Source des personnages : [Wikipedia - Liste des personnages d'Astérix](https://fr.wikipedia.org/wiki/Liste_des_personnages_d%27Ast%C3%A9rix)
- Le mélange est effectué à chaque appel de `updatePlayerInputs()`
- Les noms peuvent être modifiés manuellement par l'utilisateur

## 🔄 Version
- **Avant** : 1.4.9
- **Après** : 1.4.10

## 📅 Date
15 janvier 2024
