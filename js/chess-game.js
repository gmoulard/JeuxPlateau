/**
 * Fichier: chess-game.js
 * Auteur: Guillaume Moulard
 * Rôle: Logique du jeu d'Échecs
 * 
 * Description:
 * Implémente la logique de base du jeu d'Échecs avec déplacement,
 * capture des pièces et historique des coups.
 * 
 * Historique des versions:
 * - 1.0.0 (2024-01-15): Logique de base
 * - 1.0.1 (2024-01-15): Plateau carré
 * - 1.0.5 (2024-01-15): Extraction dans fichier dédié
 * - 1.1.1 (2024-01-15): Ajout captures et historique
 */

class ChessGame extends BaseGame {
    constructor(container, players) {
        super(container, players);
        this.currentPlayer = 0;
        this.pieces = {};
        this.captured = [[], []]; // Pièces capturées par joueur
        this.moveHistory = []; // Historique des coups
        this.initGame();
    }

    initGame() {
        this.container.innerHTML = `
            <div class="chess-container">
                <div class="chess-sidebar">
                    <div class="chess-captured">
                        <h4>Pièces capturées</h4>
                        <div class="captured-player">
                            <strong>Blancs:</strong>
                            <div id="captured-0" class="captured-pieces"></div>
                        </div>
                        <div class="captured-player">
                            <strong>Noirs:</strong>
                            <div id="captured-1" class="captured-pieces"></div>
                        </div>
                    </div>
                    <div class="chess-history">
                        <h4>Historique</h4>
                        <div id="move-history" class="move-list"></div>
                    </div>
                </div>
                <div id="chess-board-container"></div>
            </div>
        `;
        
        this.boardContainer = document.getElementById('chess-board-container');
        const boardEl = this.createBoardInContainer(this.boardContainer, 8, 8);
        boardEl.classList.add('chess-board');
        this.setupPieces();
        this.colorBoard();
        this.updateCaptured();
    }

    createBoardInContainer(container, rows, cols) {
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
        
        container.appendChild(board);
        return board;
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
        const fromKey = `${from.row}-${from.col}`;
        const piece = this.pieces[fromKey];
        
        if (!piece) return false;
        if (this.pieces[key] && this.pieces[key].player === this.currentPlayer) return false;
        
        const dx = Math.abs(to.col - from.col);
        const dy = Math.abs(to.row - from.row);
        const type = piece.type;
        
        // Validation basique par type de pièce
        if (type === '♟' || type === '♙') { // Pion
            const direction = piece.player === 0 ? -1 : 1;
            const startRow = piece.player === 0 ? 6 : 1;
            
            if (to.col === from.col && !this.pieces[key]) {
                if (to.row === from.row + direction) return true;
                if (from.row === startRow && to.row === from.row + 2 * direction) return true;
            }
            if (dx === 1 && to.row === from.row + direction && this.pieces[key]) return true;
        }
        if (type === '♜' || type === '♖') { // Tour
            return (dx === 0 || dy === 0) && this.isPathClear(from, to);
        }
        if (type === '♞' || type === '♘') { // Cavalier
            return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
        }
        if (type === '♝' || type === '♗') { // Fou
            return dx === dy && this.isPathClear(from, to);
        }
        if (type === '♛' || type === '♕') { // Dame
            return (dx === dy || dx === 0 || dy === 0) && this.isPathClear(from, to);
        }
        if (type === '♚' || type === '♔') { // Roi
            return dx <= 1 && dy <= 1;
        }
        
        return false;
    }
    
    isPathClear(from, to) {
        const dx = Math.sign(to.col - from.col);
        const dy = Math.sign(to.row - from.row);
        let x = from.col + dx;
        let y = from.row + dy;
        
        while (x !== to.col || y !== to.row) {
            if (this.pieces[`${y}-${x}`]) return false;
            x += dx;
            y += dy;
        }
        return true;
    }

    movePiece(from, to) {
        const fromKey = `${from.row}-${from.col}`;
        const toKey = `${to.row}-${to.col}`;
        
        const movingPiece = this.pieces[fromKey];
        const capturedPiece = this.pieces[toKey];
        
        // Capturer si nécessaire
        if (capturedPiece) {
            this.captured[this.currentPlayer].push(capturedPiece.type);
            this.updateCaptured();
        }
        
        // Déplacer
        this.pieces[toKey] = this.pieces[fromKey];
        delete this.pieces[fromKey];
        
        this.board[from.row][from.col].innerHTML = '';
        this.addPiece(to.row, to.col, this.pieces[toKey].type);
        
        // Ajouter à l'historique
        const move = `${this.getNotation(from)} → ${this.getNotation(to)}`;
        this.moveHistory.push({ player: this.currentPlayer, move, piece: movingPiece.type });
        this.updateHistory();
    }

    getNotation(pos) {
        const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        return `${cols[pos.col]}${8 - pos.row}`;
    }

    updateCaptured() {
        for (let player = 0; player < 2; player++) {
            const container = document.getElementById(`captured-${player}`);
            if (container) {
                container.innerHTML = this.captured[player].join(' ') || '-';
            }
        }
    }

    updateHistory() {
        const container = document.getElementById('move-history');
        if (container) {
            container.innerHTML = this.moveHistory.map((m, i) => 
                `<div class="move-item">${i + 1}. ${m.piece} ${m.move}</div>`
            ).join('');
            container.scrollTop = container.scrollHeight;
        }
    }

    clearSelection() {
        document.querySelectorAll('.cell.selected').forEach(cell => cell.classList.remove('selected'));
    }
}
