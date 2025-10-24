/**
 * Fichier: checkers-game.js
 * Auteur: Guillaume Moulard
 * Rôle: Logique du jeu de Dames
 * 
 * Description:
 * Implémente les règles complètes du jeu de Dames incluant les déplacements,
 * les prises obligatoires, les prises multiples et la promotion en Dame.
 * 
 * Historique des versions:
 * - 1.0.0 (2024-01-15): Logique de base
 * - 1.0.1 (2024-01-15): Règles avancées (prises, dame)
 * - 1.0.5 (2024-01-15): Extraction dans fichier dédié
 */

class CheckersGame extends BaseGame {
    constructor(container, players) {
        super(container, players);
        this.currentPlayer = 0;
        this.pieces = {};
        this.mustCapture = false;
        this.initGame();
    }

    initGame() {
        const boardEl = this.createBoard(8, 8);
        boardEl.classList.add('checkers-board');
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
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.pieces[`${row}-${col}`] = { player: 0, king: false };
                    this.renderPiece(row, col);
                }
            }
        }
        for (let row = 5; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.pieces[`${row}-${col}`] = { player: 1, king: false };
                    this.renderPiece(row, col);
                }
            }
        }
    }

    renderPiece(row, col) {
        const key = `${row}-${col}`;
        const piece = this.pieces[key];
        if (!piece) return;
        
        const color = piece.player === 0 ? '#ff4444' : '#333';
        const symbol = piece.king ? '♛' : '●';
        this.addPiece(row, col, `<div class="piece" style="background: ${color};">${symbol}</div>`);
    }

    handleCellClick(row, col) {
        const key = `${row}-${col}`;
        
        if (this.selectedPiece) {
            const move = this.isValidMove(this.selectedPiece, { row, col });
            if (move) {
                this.movePiece(this.selectedPiece, { row, col }, move.capture);
                this.selectedPiece = null;
                
                if (!move.capture || !this.canCaptureFrom(row, col)) {
                    this.currentPlayer = 1 - this.currentPlayer;
                    window.gameApp.nextPlayer();
                } else {
                    this.selectedPiece = { row, col };
                }
            }
            this.clearSelection();
            if (this.selectedPiece) {
                this.board[this.selectedPiece.row][this.selectedPiece.col].classList.add('selected');
            }
        } else if (this.pieces[key] && this.pieces[key].player === this.currentPlayer) {
            this.selectedPiece = { row, col };
            this.board[row][col].classList.add('selected');
        }
    }

    isValidMove(from, to) {
        const dx = to.col - from.col;
        const dy = to.row - from.row;
        const key = `${to.row}-${to.col}`;
        const piece = this.pieces[`${from.row}-${from.col}`];
        
        if (this.pieces[key]) return null;
        
        if (Math.abs(dx) === 2 && Math.abs(dy) === 2) {
            const midRow = from.row + dy / 2;
            const midCol = from.col + dx / 2;
            const midKey = `${midRow}-${midCol}`;
            const midPiece = this.pieces[midKey];
            
            if (midPiece && midPiece.player !== this.currentPlayer) {
                if (piece.king || (this.currentPlayer === 0 && dy > 0) || (this.currentPlayer === 1 && dy < 0)) {
                    return { capture: midKey };
                }
            }
        }
        
        if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
            if (this.hasCaptures()) return null;
            
            if (piece.king) return {};
            if (this.currentPlayer === 0 && dy > 0) return {};
            if (this.currentPlayer === 1 && dy < 0) return {};
        }
        
        return null;
    }

    hasCaptures() {
        for (let key in this.pieces) {
            if (this.pieces[key].player === this.currentPlayer) {
                const [row, col] = key.split('-').map(Number);
                if (this.canCaptureFrom(row, col)) return true;
            }
        }
        return false;
    }

    canCaptureFrom(row, col) {
        const dirs = [[2, 2], [2, -2], [-2, 2], [-2, -2]];
        const piece = this.pieces[`${row}-${col}`];
        
        for (let [dy, dx] of dirs) {
            if (!piece.king && ((this.currentPlayer === 0 && dy < 0) || (this.currentPlayer === 1 && dy > 0))) continue;
            
            const newRow = row + dy;
            const newCol = col + dx;
            if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) continue;
            
            const midRow = row + dy / 2;
            const midCol = col + dx / 2;
            const midKey = `${midRow}-${midCol}`;
            const targetKey = `${newRow}-${newCol}`;
            
            if (this.pieces[midKey] && this.pieces[midKey].player !== this.currentPlayer && !this.pieces[targetKey]) {
                return true;
            }
        }
        return false;
    }

    movePiece(from, to, captureKey) {
        const fromKey = `${from.row}-${from.col}`;
        const toKey = `${to.row}-${to.col}`;
        
        this.pieces[toKey] = this.pieces[fromKey];
        delete this.pieces[fromKey];
        
        if (captureKey) {
            delete this.pieces[captureKey];
            const [capRow, capCol] = captureKey.split('-').map(Number);
            this.board[capRow][capCol].innerHTML = '';
        }
        
        if ((to.row === 7 && this.currentPlayer === 0) || (to.row === 0 && this.currentPlayer === 1)) {
            this.pieces[toKey].king = true;
        }
        
        this.board[from.row][from.col].innerHTML = '';
        this.renderPiece(to.row, to.col);
    }

    clearSelection() {
        document.querySelectorAll('.cell.selected').forEach(cell => cell.classList.remove('selected'));
    }
}
