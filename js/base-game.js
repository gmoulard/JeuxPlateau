/**
 * Fichier: base-game.js
 * Auteur: Guillaume Moulard
 * Rôle: Classe de base pour tous les jeux
 * 
 * Description:
 * Fournit les fonctionnalités communes à tous les jeux incluant
 * la création du plateau, la gestion des clics et l'ajout de pièces.
 * 
 * Historique des versions:
 * - 1.0.5 (2024-01-15): Extraction depuis games.js
 */

class BaseGame {
    constructor(container, players) {
        this.container = container;
        this.players = players;
        this.board = [];
        this.selectedPiece = null;
    }

    createBoard(rows, cols) {
        const board = document.createElement('div');
        board.className = 'board';
        board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        
        for (let row = 0; row < rows; row++) {
            this.board[row] = [];
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', (e) => this.handleCellClick(row, col, e));
                board.appendChild(cell);
                this.board[row][col] = cell;
            }
        }
        
        this.container.appendChild(board);
        return board;
    }

    handleCellClick(row, col, event) {
        // À implémenter dans chaque jeu
    }

    addPiece(row, col, piece) {
        const cell = this.board[row][col];
        cell.innerHTML = piece;
    }
}
