/**
 * Fichier: tictactoe-game.js
 * Auteur: Guillaume Moulard
 * Rôle: Logique du jeu de Morpion (Tic-Tac-Toe)
 * 
 * Description:
 * Implémente le jeu classique de Morpion pour 2 joueurs.
 * 
 * Historique des versions:
 * - 1.2.0 (2024-01-15): Création du jeu
 */

class TicTacToeGame extends BaseGame {
    constructor(container, players) {
        super(container, players);
        this.currentPlayer = 0;
        this.board = Array(9).fill(null);
        this.gameOver = false;
        this.initGame();
    }

    // ========================================
    // INTERFACE (UI)
    // ========================================

    initGame() {
        this.container.innerHTML = `
            <div class="tictactoe-container">
                <div class="tictactoe-board" id="tictactoe-board"></div>
                <div class="tictactoe-info">
                    <button onclick="window.currentGame.resetGame()" class="tictactoe-btn">🔄 Nouvelle partie</button>
                </div>
            </div>
        `;
        this.renderBoard();
    }

    renderBoard() {
        const boardEl = document.getElementById('tictactoe-board');
        boardEl.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'tictactoe-cell';
            cell.dataset.index = i;
            
            // Utiliser innerHTML pour un meilleur contrôle du contenu
            const content = this.board[i];
            if (content) {
                cell.innerHTML = `<span class="cell-content">${content}</span>`;
                cell.classList.add('filled');
            } else {
                cell.innerHTML = '';
                cell.classList.remove('filled');
            }
            
            cell.addEventListener('click', () => this.handleCellClick(i));
            boardEl.appendChild(cell);
        }
    }

    // ========================================
    // LOGIQUE DE JEU
    // ========================================

    handleCellClick(index) {
        if (this.gameOver || this.board[index]) return;
        
        this.board[index] = this.currentPlayer === 0 ? 'X' : 'O';
        this.renderBoard();
        
        if (this.checkWinner()) {
            this.gameOver = true;
            setTimeout(() => {
                window.gameApp.showVictory(this.players[this.currentPlayer]);
            }, 100);
        } else if (this.board.every(cell => cell !== null)) {
            this.gameOver = true;
            setTimeout(() => {
                window.gameApp.showVictory('Match nul');
            }, 100);
        } else {
            this.currentPlayer = 1 - this.currentPlayer;
            window.gameApp.nextPlayer();
        }
    }

    checkWinner() {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
            [0, 4, 8], [2, 4, 6]             // Diagonales
        ];
        
        const symbol = this.currentPlayer === 0 ? 'X' : 'O';
        
        return lines.some(line => 
            line.every(index => this.board[index] === symbol)
        );
    }

    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 0;
        this.gameOver = false;
        this.renderBoard();
        window.gameApp.currentPlayerIndex = 0;
        window.gameApp.updateCurrentPlayer();
    }
}
