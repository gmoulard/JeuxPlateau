/**
 * Fichier: game-framework.js
 * Auteur: Guillaume Moulard
 * Rôle: Framework interne pour faciliter la création de jeux
 * 
 * Description:
 * Fournit une API complète pour créer des jeux de plateau avec
 * gestion automatique de l'UI, des joueurs, des tours et des règles.
 */

class GameFramework {
    constructor(container, players, config = {}) {
        this.container = container;
        this.players = players;
        this.config = {
            rows: config.rows || 8,
            cols: config.cols || 8,
            useDice: config.useDice || false,
            diceCount: config.diceCount || 1,
            boardType: config.boardType || 'grid', // 'grid', 'hex', 'custom'
            ...config
        };
        this.currentPlayer = 0;
        this.gameState = {};
        this.board = [];
        this.selectedCell = null;
    }

    // ========================================
    // API PUBLIQUE - CRÉATION DU JEU
    // ========================================

    createGame() {
        this.container.innerHTML = '';
        const wrapper = this.createElement('div', 'game-wrapper');
        
        if (this.config.customHTML) {
            wrapper.innerHTML = this.config.customHTML;
        } else {
            const boardEl = this.createBoard();
            wrapper.appendChild(boardEl);
        }
        
        if (this.config.controls) {
            const controls = this.createControls();
            wrapper.appendChild(controls);
        }
        
        this.container.appendChild(wrapper);
        this.onGameCreated?.();
    }

    createBoard() {
        const board = this.createElement('div', 'board');
        board.style.gridTemplateColumns = `repeat(${this.config.cols}, 1fr)`;
        
        for (let row = 0; row < this.config.rows; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.config.cols; col++) {
                const cell = this.createCell(row, col);
                board.appendChild(cell);
                this.board[row][col] = cell;
            }
        }
        
        return board;
    }

    createCell(row, col) {
        const cell = this.createElement('div', 'cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', () => this.handleCellClick(row, col));
        
        if (this.config.cellClass) {
            const customClass = this.config.cellClass(row, col);
            if (customClass) cell.classList.add(customClass);
        }
        
        return cell;
    }

    createControls() {
        const controls = this.createElement('div', 'game-controls');
        
        if (this.config.resetButton !== false) {
            const resetBtn = this.createElement('button', 'game-btn');
            resetBtn.textContent = '🔄 Nouvelle partie';
            resetBtn.onclick = () => this.resetGame();
            controls.appendChild(resetBtn);
        }
        
        return controls;
    }

    // ========================================
    // API PUBLIQUE - GESTION DES PIÈCES
    // ========================================

    setPiece(row, col, content, className = '') {
        const cell = this.board[row][col];
        if (!cell) return;
        
        if (typeof content === 'string') {
            cell.innerHTML = content;
        } else {
            cell.innerHTML = '';
            cell.appendChild(content);
        }
        
        if (className) {
            const piece = cell.querySelector('*') || cell;
            piece.className = className;
        }
    }

    getPiece(row, col) {
        return this.board[row]?.[col]?.innerHTML || null;
    }

    removePiece(row, col) {
        if (this.board[row]?.[col]) {
            this.board[row][col].innerHTML = '';
        }
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
        const content = this.getPiece(fromRow, fromCol);
        this.removePiece(fromRow, fromCol);
        this.setPiece(toRow, toCol, content);
    }

    // ========================================
    // API PUBLIQUE - GESTION DES TOURS
    // ========================================

    nextTurn() {
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        window.gameApp?.nextPlayer();
        this.onTurnChanged?.(this.currentPlayer);
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getCurrentPlayerName() {
        return this.players[this.currentPlayer];
    }

    // ========================================
    // API PUBLIQUE - GESTION DE L'ÉTAT
    // ========================================

    setState(key, value) {
        this.gameState[key] = value;
    }

    getState(key) {
        return this.gameState[key];
    }

    // ========================================
    // API PUBLIQUE - VALIDATION
    // ========================================

    isValidPosition(row, col) {
        return row >= 0 && row < this.config.rows && col >= 0 && col < this.config.cols;
    }

    isEmpty(row, col) {
        return !this.getPiece(row, col);
    }

    // ========================================
    // API PUBLIQUE - SÉLECTION
    // ========================================

    selectCell(row, col) {
        this.clearSelection();
        this.selectedCell = { row, col };
        this.board[row][col].classList.add('selected');
    }

    clearSelection() {
        this.container.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        this.selectedCell = null;
    }

    getSelectedCell() {
        return this.selectedCell;
    }

    // ========================================
    // API PUBLIQUE - FIN DE JEU
    // ========================================

    endGame(winner = null, message = null) {
        const msg = message || (winner !== null ? 
            `${this.players[winner]} a gagné ! 🎉` : 
            'Match nul ! 🤝');
        
        setTimeout(() => alert(msg), 100);
        this.onGameEnded?.(winner);
    }

    // ========================================
    // API PUBLIQUE - UTILITAIRES
    // ========================================

    createElement(tag, className = '') {
        const el = document.createElement(tag);
        if (className) el.className = className;
        return el;
    }

    forEachCell(callback) {
        for (let row = 0; row < this.config.rows; row++) {
            for (let col = 0; col < this.config.cols; col++) {
                callback(row, col, this.board[row][col]);
            }
        }
    }

    // ========================================
    // MÉTHODES À SURCHARGER
    // ========================================

    handleCellClick(row, col) {
        // À implémenter dans la classe enfant
    }

    resetGame() {
        this.currentPlayer = 0;
        this.gameState = {};
        this.clearSelection();
        this.forEachCell((row, col) => this.removePiece(row, col));
        window.gameApp.currentPlayerIndex = 0;
        window.gameApp.updateCurrentPlayer();
        this.onGameReset?.();
    }

    // Hooks optionnels
    onGameCreated() {}
    onTurnChanged(player) {}
    onGameEnded(winner) {}
    onGameReset() {}
}

// ========================================
// HELPERS POUR PATTERNS COMMUNS
// ========================================

class GameHelpers {
    static checkLine(board, positions, symbol) {
        return positions.every(([row, col]) => 
            board[row]?.[col]?.innerHTML === symbol
        );
    }

    static getAdjacentCells(row, col, distance = 1) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
        return directions.map(([dr, dc]) => [row + dr * distance, col + dc * distance]);
    }

    static getDiagonalCells(row, col, distance = 1) {
        return [
            [row - distance, col - distance],
            [row - distance, col + distance],
            [row + distance, col - distance],
            [row + distance, col + distance]
        ];
    }

    static getOrthogonalCells(row, col, distance = 1) {
        return [
            [row - distance, col],
            [row + distance, col],
            [row, col - distance],
            [row, col + distance]
        ];
    }

    static isPathClear(board, fromRow, fromCol, toRow, toCol) {
        const dr = Math.sign(toRow - fromRow);
        const dc = Math.sign(toCol - fromCol);
        let r = fromRow + dr;
        let c = fromCol + dc;
        
        while (r !== toRow || c !== toCol) {
            if (board[r]?.[c]?.innerHTML) return false;
            r += dr;
            c += dc;
        }
        return true;
    }
}
