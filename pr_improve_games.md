# Version 1.0.1 - Améliorations Dames et Échecs

## Description

Cette PR passe l'application en version 1.0.1 et apporte des améliorations majeures aux jeux de Dames et d'Échecs, ainsi qu'une meilleure gestion du nombre de joueurs selon le jeu.

## Changements

### 1. Version 1.0.1

**Fichier créé** : `version.json`
- Version mise à jour de 1.0.0 à 1.0.1

### 2. Jeu de Dames - Améliorations complètes

**Règles avancées implémentées** :
- ✅ Prise obligatoire des pions adverses
- ✅ Prise en diagonale (saut de 2 cases)
- ✅ Prises multiples en chaîne
- ✅ Promotion en Dame (♛) en atteignant la dernière rangée
- ✅ Dame peut se déplacer en avant et en arrière
- ✅ Validation stricte des mouvements selon les règles

**Plateau carré** :
- ✅ Plateau de 480x480px (carré parfait)
- ✅ Responsive avec aspect-ratio 1:1
- ✅ Cellules carrées automatiques

**Suppression du lancé de dés** :
- ✅ Bouton de dés caché pour le jeu de Dames

**Fichiers modifiés** :
- `js/games.js` : Réécriture complète de CheckersGame
- `js/app.js` : Masquage du conteneur de dés
- `styles.css` : Styles pour plateau carré

### 3. Jeu d'Échecs - Améliorations

**Plateau carré** :
- ✅ Plateau de 480x480px (carré parfait)
- ✅ Responsive avec aspect-ratio 1:1
- ✅ Cellules carrées automatiques

**Suppression du lancé de dés** :
- ✅ Bouton de dés caché pour le jeu d'Échecs

**Fichiers modifiés** :
- `js/games.js` : Ajout de classe CSS chess-board
- `js/app.js` : Masquage du conteneur de dés
- `styles.css` : Styles pour plateau carré

### 4. Gestion du nombre de joueurs

**Logique par jeu** :
- ✅ Dames : Toujours 2 joueurs (sélecteur caché)
- ✅ Échecs : Toujours 2 joueurs (sélecteur caché)
- ✅ Tavli/Backgammon : Toujours 2 joueurs (sélecteur caché)
- ✅ Petits Chevaux : 2-4 joueurs (sélecteur visible)

**Fichier modifié** : `js/app.js`

## Prompt utilisé

```
passe en version 1.0.1, 
dans le jeux de dame Suprime le lancé du dé, re fait un plateau, l'actuelle n'est pas bon fait le bien carre, met en place  Règles avancées pour les Dames (prise, dame).
Dans le jeux d'echque,Suprime le lancé du dé, le fait un plateau, l'actuelle n'est pas bon fait le bien carre.
Seul les petit chevaux ont besoins du nombre de joueur, les autre se joue toujours a 2.
```

## Règles du jeu de Dames implémentées

1. **Déplacement simple** : Diagonale d'une case vers l'avant
2. **Prise obligatoire** : Si une prise est possible, elle doit être effectuée
3. **Prise en sautant** : Saut par-dessus un pion adverse en diagonale
4. **Prises multiples** : Enchaînement de prises si possible
5. **Promotion en Dame** : Pion atteignant la dernière rangée devient Dame (♛)
6. **Dame** : Peut se déplacer en avant et en arrière

## Tests suggérés

1. **Jeu de Dames**
   - Vérifier que le plateau est carré
   - Vérifier qu'il n'y a pas de bouton de dés
   - Tester un déplacement simple
   - Tester une prise obligatoire
   - Tester une prise multiple
   - Atteindre la dernière rangée pour devenir Dame
   - Vérifier que la Dame peut reculer

2. **Jeu d'Échecs**
   - Vérifier que le plateau est carré
   - Vérifier qu'il n'y a pas de bouton de dés
   - Vérifier que seuls 2 joueurs sont configurés

3. **Sélection de joueurs**
   - Dames : Vérifier que le sélecteur est caché
   - Échecs : Vérifier que le sélecteur est caché
   - Petits Chevaux : Vérifier que le sélecteur est visible

4. **Responsive**
   - Tester sur mobile que les plateaux restent carrés

## Fichiers modifiés

- `version.json` : Nouveau fichier avec version 1.0.1
- `js/app.js` : Gestion joueurs + masquage dés
- `js/games.js` : Règles complètes Dames + plateau carré
- `styles.css` : Styles plateaux carrés

## Notes

- Les plateaux de Dames et Échecs sont maintenant parfaitement carrés
- Le jeu de Dames respecte les règles officielles avec prises obligatoires
- L'interface s'adapte automatiquement selon le jeu sélectionné
- Version 1.0.1 reflète ces améliorations significatives