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
        // Plateau hexagonal standard Abalone (61 cases)
        const board = {};
        const rows = [
            { label: 'I', cells: ['I1', 'I2', 'I3', 'I4', 'I5'] },
            { label: 'H', cells: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'] },
            { label: 'G', cells: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'] },
            { label: 'F', cells: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'] },
            { label: 'E', cells: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'] },
            { label: 'D', cells: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'] },
            { label: 'C', cells: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'] },
            { label: 'B', cells: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'] },
            { label: 'A', cells: ['A1', 'A2', 'A3', 'A4', 'A5'] }
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
        const player0 = ['I1', 'I2', 'I3', 'I4', 'I5', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'G3', 'G4', 'G5'];
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
            { label: 'I', cells: ['I1', 'I2', 'I3', 'I4', 'I5'], offset: 4 },
            { label: 'H', cells: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'], offset: 3.5 },
            { label: 'G', cells: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'], offset: 3 },
            { label: 'F', cells: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'], offset: 2.5 },
            { label: 'E', cells: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'], offset: 2 },
            { label: 'D', cells: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'], offset: 2.5 },
            { label: 'C', cells: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'], offset: 3 },
            { label: 'B', cells: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'], offset: 3.5 },
            { label: 'A', cells: ['A1', 'A2', 'A3', 'A4', 'A5'], offset: 4 }
        ];

        let html = '';
        rows.forEach(row => {
            html += `<div class="hex-row" style="padding-left: ${row.offset * 28}px;">`;
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
        // Déplacement libre sans contrôle
        else if (this.selected.length > 0) {
            this.makeMove(this.selected, cellId);
            this.selected = [];
            this.currentPlayer = 1 - this.currentPlayer;
            this.renderBoard();
            window.gameApp.nextPlayer();
        }
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
        // Si bille adverse sur target, l'éjecter
        if (this.board[target] !== null && this.board[target] !== this.currentPlayer) {
            const opponent = this.board[target];
            this.ejected[opponent]++;
        }
        
        // Vider les cases de départ
        selected.forEach(cell => this.board[cell] = null);
        
        // Placer la première bille sur la cible
        this.board[target] = this.currentPlayer;
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
