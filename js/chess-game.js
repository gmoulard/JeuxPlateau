/**
 * Fichier: chess-game.js
 * Auteur: Guillaume Moulard
 * Rôle: Logique du jeu d'Échecs
 * 
 * Description:
 * Implémente la logique de base du jeu d'Échecs avec déplacement
 * et capture des pièces.
 * 
 * Historique des versions:
 * - 1.0.0 (2024-01-15): Logique de base
 * - 1.0.1 (2024-01-15): Plateau carré
 * - 1.0.5 (2024-01-15): Extraction dans fichier dédié
 */

class ChessGame extends BaseGame {
    constructor(container, players) {
        super(container, players);
        this.currentPlayer = 0;
        this.pieces = {};
        this.initGame();
    }

    initGame() {
        const boardEl = this.createBoard(8, 8);
        boardEl.classList.add('chess-board');
        this.setupPieces();
        this.colorBoard();
    }

    colorBoard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.board[row][col].classList.add('dark');
                }
            }
        }
    }

    setupPieces() {
        const pieces = ['♜','♞','♝','♛','♚','♝','♞','♜'];
        const whitePieces = ['♖','♘','♗','♕','♔','♗','♘','♖'];
        
        for (let col = 0; col < 8; col++) {
            this.addPiece(0, col, pieces[col]);
            this.addPiece(1, col, '♟');
            this.pieces[`0-${col}`] = { player: 1, type: pieces[col] };
            this.pieces[`1-${col}`] = { player: 1, type: '♟' };
        }
        
        for (let col = 0; col < 8; col++) {
            this.addPiece(7, col, whitePieces[col]);
            this.addPiece(6, col, '♙');
            this.pieces[`7-${col}`] = { player: 0, type: whitePieces[col] };
            this.pieces[`6-${col}`] = { player: 0, type: '♙' };
        }
    }

    handleCellClick(row, col) {
        const key = `${row}-${col}`;
        
        if (this.selectedPiece) {
            if (this.isValidMove(this.selectedPiece, { row, col })) {
                this.movePiece(this.selectedPiece, { row, col });
                this.selectedPiece = null;
                this.currentPlayer = 1 - this.currentPlayer;
                window.gameApp.nextPlayer();
            }
            this.clearSelection();
        } else if (this.pieces[key] && this.pieces[key].player === this.currentPlayer) {
            this.selectedPiece = { row, col };
            this.board[row][col].classList.add('selected');
        }
    }

    isValidMove(from, to) {
        const key = `${to.row}-${to.col}`;
        return !this.pieces[key] || this.pieces[key].player !== this.currentPlayer;
    }

    movePiece(from, to) {
        const fromKey = `${from.row}-${from.col}`;
        const toKey = `${to.row}-${to.col}`;
        
        this.pieces[toKey] = this.pieces[fromKey];
        delete this.pieces[fromKey];
        
        this.board[from.row][from.col].innerHTML = '';
        this.addPiece(to.row, to.col, this.pieces[toKey].type);
    }

    clearSelection() {
        document.querySelectorAll('.cell.selected').forEach(cell => cell.classList.remove('selected'));
    }
}
