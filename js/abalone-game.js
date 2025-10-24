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
        // Déplacement vers case vide ou poussée
        else if (this.selected.length > 0 && (piece === null || piece !== this.currentPlayer)) {
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
        
        // Pour 1 bille, peut aller dans n'importe quelle direction vers case vide ou adjacente
        if (selected.length === 1) {
            const direction = this.getDirection(selected[0], target);
            if (!direction) return false;
            
            // Case vide ou poussée possible
            if (this.board[target] === null) return true;
            if (this.board[target] !== this.currentPlayer) return true;
            return false;
        }
        
        // Pour 2-3 billes, vérifier alignement
        if (!this.areAligned(selected)) return false;
        
        // Vérifier direction depuis n'importe quelle bille sélectionnée
        let direction = null;
        for (const cell of selected) {
            direction = this.getDirection(cell, target);
            if (direction) break;
        }
        if (!direction) return false;
        
        // Vérifier que toutes les billes peuvent se déplacer
        return selected.every(cell => {
            const next = this.getNeighbor(cell, direction);
            return next !== null || this.board[cell] !== null;
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
        // Trouver la direction depuis n'importe quelle bille
        let direction = null;
        for (const cell of selected) {
            direction = this.getDirection(cell, target);
            if (direction) break;
        }
        
        // Pousser les billes adverses si nécessaire
        if (this.board[target] !== null && this.board[target] !== this.currentPlayer) {
            this.pushPieces(target, direction);
        }
        
        // Déplacer chaque bille
        const moved = [];
        selected.forEach(cell => {
            const next = this.getNeighbor(cell, direction);
            if (next) {
                moved.push({ from: cell, to: next });
            }
        });

        // Vider les cases de départ
        selected.forEach(cell => this.board[cell] = null);
        
        // Appliquer les déplacements
        moved.forEach(m => {
            this.board[m.to] = this.currentPlayer;
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
