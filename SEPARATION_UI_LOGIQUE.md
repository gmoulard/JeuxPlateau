# Séparation Interface / Logique

Ce document décrit la séparation entre le code d'interface (UI) et la logique de jeu dans chaque fichier.

## Structure de séparation

Chaque fichier de jeu est organisé en deux sections clairement identifiées :

```javascript
class GameName extends BaseGame {
    constructor() { ... }

    // ========================================
    // INTERFACE (UI)
    // ========================================
    
    // Méthodes d'affichage et de rendu
    initGame() { ... }
    renderBoard() { ... }
    renderPiece() { ... }
    attachEventListeners() { ... }
    
    // ========================================
    // LOGIQUE DE JEU
    // ========================================
    
    // Méthodes de règles et validation
    handleCellClick() { ... }
    isValidMove() { ... }
    checkWinner() { ... }
    makeMove() { ... }
}
```

## Fichiers organisés

### ✅ tictactoe-game.js
- **Interface** : initGame(), renderBoard()
- **Logique** : handleCellClick(), checkWinner(), resetGame()

### ✅ checkers-game.js
- **Interface** : initGame(), colorBoard(), setupPieces(), renderPiece(), clearSelection()
- **Logique** : handleCellClick(), isValidMove(), hasCaptures(), canCaptureFrom(), movePiece()

### ✅ chess-game.js
- **Interface** : initGame(), renderBoard(), updateCaptured(), updateHistory()
- **Logique** : handleCellClick(), isValidMove(), isPathClear(), movePiece()

### ✅ backgammon-game.js
- **Interface** : renderBoard(), renderPoints(), renderBarPieces(), attachEventListeners()
- **Logique** : rollDice(), handlePointClick(), handleBarClick(), canMoveTo(), canEnterFromBar(), makeMove(), enterFromBar(), hasValidMoves()

### ✅ ludo-game.js
- **Interface** : renderBoard(), renderHome(), renderTrack()
- **Logique** : rollDice(), handlePieceClick(), canMove(), movePiece(), checkWinner()

### ✅ abalone-game.js
- **Interface** : renderBoard(), renderHexBoard(), attachEventListeners()
- **Logique** : handleCellClick(), makeMove(), deselectAll(), checkWinner()

## Avantages de cette organisation

1. **Lisibilité** : Code clairement structuré
2. **Maintenance** : Facile de trouver où modifier
3. **Séparation des responsabilités** : UI vs Business Logic
4. **Documentation** : Structure auto-documentée
5. **Évolutivité** : Facile d'ajouter de nouvelles fonctionnalités

## Convention

- **Interface (UI)** : Tout ce qui touche au DOM, au rendu visuel, aux événements
- **Logique de jeu** : Règles, validations, état du jeu, calculs
