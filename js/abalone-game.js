/**
 * Fichier: abalone-game.js
 * Auteur: Guillaume Moulard
 * Rôle: Logique du jeu d'Abalone
 * 
 * Description:
 * Jeu de stratégie pour 2 joueurs sur plateau hexagonal.
 * But: Pousser 6 billes adverses hors du plateau.
 * 
 * Historique des versions:
 * - 1.4.0 (2024-01-15): Création initiale
 */

class AbaloneGame extends BaseGame {
    constructor(container, players) {
        super(container, players);
        this.currentPlayer = 0;
        this.board = this.createHexBoard();
        this.selected = [];
        this.ejected = [0, 0]; // Billes éjectées par joueur
        this.initGame();
    }

    createHexBoard() {
        // Plateau hexagonal 9x9 avec configuration standard
        const board = {};
        const rows = [
            { start: 'I', cells: ['I5', 'I6', 'I7', 'I8', 'I9'] },
            { start: 'H', cells: ['H4', 'H5', 'H6', 'H7', 'H8', 'H9'] },
            { start: 'G', cells: ['G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'] },
            { start: 'F', cells: ['F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'] },
            { start: 'E', cells: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'] },
            { start: 'D', cells: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'] },
            { start: 'C', cells: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'] },
            { start: 'B', cells: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'] },
            { start: 'A', cells: ['A1', 'A2', 'A3', 'A4', 'A5'] }
        ];

        rows.forEach(row => {
            row.cells.forEach(cell => {
                board[cell] = null;
            });
        });

        return board;
    }

    initGame() {
        this.setupInitialPosition();
        this.renderBoard();
    }

    setupInitialPosition() {
        // Position standard: Joueur 0 (noir) en haut, Joueur 1 (blanc) en bas
        const player0 = ['I5', 'I6', 'I7', 'I8', 'I9', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'G5', 'G6', 'G7'];
        const player1 = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'C3', 'C4', 'C5'];

        player0.forEach(cell => this.board[cell] = 0);
        player1.forEach(cell => this.board[cell] = 1);
    }

    renderBoard() {
        this.container.innerHTML = `
            <div class="abalone-container">
                <div class="abalone-info">
                    <div class="abalone-score">
                        <div>⚫ Éjectées: ${this.ejected[1]}/6</div>
                        <div>⚪ Éjectées: ${this.ejected[0]}/6</div>
                    </div>
                    <div class="abalone-selected">Sélectionnées: ${this.selected.length}</div>
                </div>
                <div class="abalone-board">
                    ${this.renderHexBoard()}
                </div>
                <div class="abalone-controls">
                    <button onclick="window.currentGame.deselectAll()">Désélectionner</button>
                </div>
            </div>
        `;
        this.attachEventListeners();
        this.checkWinner();
    }

    renderHexBoard() {
        const rows = [
            { label: 'I', cells: ['I5', 'I6', 'I7', 'I8', 'I9'], offset: 4 },
            { label: 'H', cells: ['H4', 'H5', 'H6', 'H7', 'H8', 'H9'], offset: 3 },
            { label: 'G', cells: ['G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'], offset: 2 },
            { label: 'F', cells: ['F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'], offset: 1 },
            { label: 'E', cells: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'], offset: 0 },
            { label: 'D', cells: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'], offset: 1 },
            { label: 'C', cells: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'], offset: 2 },
            { label: 'B', cells: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'], offset: 3 },
            { label: 'A', cells: ['A1', 'A2', 'A3', 'A4', 'A5'], offset: 4 }
        ];

        let html = '';
        rows.forEach(row => {
            html += `<div class="hex-row" style="padding-left: ${row.offset * 30}px;">`;
            row.cells.forEach(cell => {
                const piece = this.board[cell];
                const isSelected = this.selected.includes(cell);
                const color = piece === 0 ? 'black' : piece === 1 ? 'white' : '';
                html += `<div class="hex-cell ${isSelected ? 'selected' : ''}" data-cell="${cell}">
                    ${piece !== null ? `<div class="abalone-piece ${color}"></div>` : ''}
                </div>`;
            });
            html += '</div>';
        });

        return html;
    }

    attachEventListeners() {
        this.container.querySelectorAll('.hex-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const cellId = e.currentTarget.dataset.cell;
                this.handleCellClick(cellId);
            });
        });
    }

    handleCellClick(cellId) {
        const piece = this.board[cellId];

        // Sélection de billes
        if (piece === this.currentPlayer) {
            if (this.selected.includes(cellId)) {
                this.selected = this.selected.filter(c => c !== cellId);
            } else if (this.selected.length < 3) {
                this.selected.push(cellId);
            }
            this.renderBoard();
        }
        // Déplacement
        else if (this.selected.length > 0) {
            if (this.canMove(this.selected, cellId)) {
                this.makeMove(this.selected, cellId);
                this.selected = [];
                this.currentPlayer = 1 - this.currentPlayer;
                this.renderBoard();
                window.gameApp.nextPlayer();
            }
        }
    }

    canMove(selected, target) {
        if (selected.length === 0) return false;
        
        // Vérifier alignement
        if (!this.areAligned(selected)) return false;
        
        // Vérifier direction
        const direction = this.getDirection(selected[0], target);
        if (!direction) return false;
        
        // Vérifier que toutes les billes se déplacent dans la même direction
        return selected.every(cell => {
            const next = this.getNeighbor(cell, direction);
            return next !== null;
        });
    }

    areAligned(cells) {
        if (cells.length === 1) return true;
        if (cells.length === 2) return true;
        
        // Pour 3 billes, vérifier qu'elles sont alignées
        const sorted = [...cells].sort();
        const dir = this.getDirection(sorted[0], sorted[1]);
        if (!dir) return false;
        
        const middle = this.getNeighbor(sorted[0], dir);
        const end = this.getNeighbor(middle, dir);
        
        return sorted[1] === middle && sorted[2] === end;
    }

    getDirection(from, to) {
        const directions = ['E', 'W', 'NE', 'NW', 'SE', 'SW'];
        for (const dir of directions) {
            if (this.getNeighbor(from, dir) === to) return dir;
        }
        return null;
    }

    getNeighbor(cell, direction) {
        const row = cell[0];
        const col = parseInt(cell.substring(1));
        
        const neighbors = {
            'E': [row, col + 1],
            'W': [row, col - 1],
            'NE': [String.fromCharCode(row.charCodeAt(0) + 1), col + (row >= 'E' ? 1 : 0)],
            'NW': [String.fromCharCode(row.charCodeAt(0) + 1), col + (row >= 'E' ? 0 : -1)],
            'SE': [String.fromCharCode(row.charCodeAt(0) - 1), col + (row > 'E' ? 0 : -1)],
            'SW': [String.fromCharCode(row.charCodeAt(0) - 1), col + (row > 'E' ? -1 : -2)]
        };

        const [newRow, newCol] = neighbors[direction] || [];
        const newCell = newRow + newCol;
        
        return this.board.hasOwnProperty(newCell) ? newCell : null;
    }

    makeMove(selected, target) {
        const direction = this.getDirection(selected[0], target);
        
        // Déplacer chaque bille
        const moved = [];
        selected.forEach(cell => {
            const next = this.getNeighbor(cell, direction);
            if (next) {
                // Pousser si nécessaire
                if (this.board[next] !== null && this.board[next] !== this.currentPlayer) {
                    this.pushPieces(next, direction);
                }
                moved.push({ from: cell, to: next });
            }
        });

        // Appliquer les déplacements
        moved.forEach(m => {
            this.board[m.to] = this.board[m.from];
            this.board[m.from] = null;
        });
    }

    pushPieces(cell, direction) {
        const next = this.getNeighbor(cell, direction);
        if (next === null) {
            // Éjection
            const player = this.board[cell];
            this.ejected[player]++;
            this.board[cell] = null;
        } else if (this.board[next] !== null) {
            this.pushPieces(next, direction);
            this.board[next] = this.board[cell];
            this.board[cell] = null;
        }
    }

    deselectAll() {
        this.selected = [];
        this.renderBoard();
    }

    checkWinner() {
        if (this.ejected[0] >= 6) {
            alert(`${this.players[1]} gagne ! 6 billes noires éjectées.`);
        } else if (this.ejected[1] >= 6) {
            alert(`${this.players[0]} gagne ! 6 billes blanches éjectées.`);
        }
    }
}
