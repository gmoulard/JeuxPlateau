// Classe de base pour tous les jeux
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

// Jeu de Dames
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

// Jeu d'Échecs
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
        
        // Pièces noires
        for (let col = 0; col < 8; col++) {
            this.addPiece(0, col, pieces[col]);
            this.addPiece(1, col, '♟');
            this.pieces[`0-${col}`] = { player: 1, type: pieces[col] };
            this.pieces[`1-${col}`] = { player: 1, type: '♟' };
        }
        
        // Pièces blanches
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
        // Logique simplifiée - à améliorer
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

// Jeu de Backgammon
class BackgammonGame extends BaseGame {
    constructor(container, players) {
        super(container, players);
        this.initGame();
    }

    initGame() {
        this.container.innerHTML = '<h3>Backgammon</h3><p>Cliquez sur "Lancer les dés" pour commencer</p>';
    }
}

// Jeu des Petits Chevaux
class LudoGame extends BaseGame {
    constructor(container, players) {
        super(container, players);
        this.playerPositions = {};
        this.initGame();
    }

    initGame() {
        this.createBoard(15, 15);
        this.setupBoard();
        this.initializePieces();
    }

    setupBoard() {
        // Création du plateau des petits chevaux (simplifié)
        const colors = ['#ff4444', '#44ff44', '#4444ff', '#ffff44'];
        
        for (let i = 0; i < this.players.length; i++) {
            this.playerPositions[i] = [0, 0, 0, 0]; // 4 pions par joueur
        }
    }

    initializePieces() {
        // Placement initial des pions (simplifié)
        this.container.innerHTML += '<p>Utilisez les dés pour déplacer vos pions</p>';
    }

    handleCellClick(row, col) {
        // Logique de déplacement des pions
    }
}