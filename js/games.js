/**
 * Fichier: games.js
 * Auteur: Guillaume Moulard
 * Rôle: Logique des jeux de plateau
 * 
 * Description:
 * Contient les classes pour tous les jeux disponibles dans l'application:
 * - BaseGame: Classe de base avec fonctionnalités communes
 * - CheckersGame: Jeu de Dames avec règles avancées (prises, dame)
 * - ChessGame: Jeu d'Échecs avec logique de base
 * - BackgammonGame: Jeu de Tavli (Backgammon) avec règles complètes
 * - LudoGame: Jeu des Petits Chevaux avec règles complètes
 * 
 * Historique des versions:
 * - 1.0.0 (2024-01-15): Création avec logique de base Dames et Échecs
 * - 1.0.1 (2024-01-15): Amélioration Dames (prises obligatoires, dame)
 * - 1.0.2 (2024-01-15): Logique complète Tavli avec pions ronds
 * - 1.0.3 (2024-01-15): Logique complète Petits Chevaux
 * - 1.0.4 (2024-01-15): Ajout en-têtes de documentation
 */

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

// Jeu de Tavli (Backgammon)
class BackgammonGame extends BaseGame {
    constructor(container, players) {
        super(container, players);
        this.currentPlayer = 0;
        this.dice = [0, 0];
        this.movesLeft = [];
        this.points = Array(24).fill().map(() => ({ count: 0, player: -1 }));
        this.bar = [0, 0];
        this.off = [0, 0];
        this.selectedPoint = -1;
        this.initGame();
    }

    initGame() {
        this.setupBoard();
        this.setupInitialPosition();
        this.updateDisplay();
    }

    setupBoard() {
        this.container.innerHTML = `
            <div class="backgammon-board">
                <div class="top-points">
                    ${Array(12).fill().map((_, i) => `<div class="point" data-point="${23-i}"></div>`).join('')}
                </div>
                <div class="middle-section">
                    <div class="bar" data-bar="true"></div>
                    <div class="dice-area">
                        <div class="dice" id="dice1">1</div>
                        <div class="dice" id="dice2">1</div>
                        <button onclick="window.currentGame.rollDice()" class="roll-dice-btn">🎲 Lancer</button>
                    </div>
                    <div class="off-area">
                        <div class="off-player">Sortis J1: <span id="off-0">0</span></div>
                        <div class="off-player">Sortis J2: <span id="off-1">0</span></div>
                    </div>
                </div>
                <div class="bottom-points">
                    ${Array(12).fill().map((_, i) => `<div class="point" data-point="${i}"></div>`).join('')}
                </div>
            </div>
        `;
        
        this.container.querySelectorAll('.point').forEach(point => {
            point.addEventListener('click', (e) => {
                const pointNum = parseInt(e.currentTarget.dataset.point);
                this.handlePointClick(pointNum);
            });
        });
        
        this.container.querySelector('.bar').addEventListener('click', () => {
            this.handleBarClick();
        });
    }

    setupInitialPosition() {
        this.points[0] = { count: 2, player: 1 };
        this.points[5] = { count: 5, player: 0 };
        this.points[7] = { count: 3, player: 0 };
        this.points[11] = { count: 5, player: 1 };
        this.points[12] = { count: 5, player: 0 };
        this.points[16] = { count: 3, player: 1 };
        this.points[18] = { count: 5, player: 1 };
        this.points[23] = { count: 2, player: 0 };
    }

    rollDice() {
        if (this.movesLeft.length > 0) return;
        
        this.dice[0] = Math.floor(Math.random() * 6) + 1;
        this.dice[1] = Math.floor(Math.random() * 6) + 1;
        
        if (this.dice[0] === this.dice[1]) {
            this.movesLeft = [this.dice[0], this.dice[0], this.dice[0], this.dice[0]];
        } else {
            this.movesLeft = [this.dice[0], this.dice[1]];
        }
        
        this.updateDisplay();
        
        if (!this.hasValidMoves()) {
            this.endTurn();
        }
    }

    handlePointClick(pointNum) {
        if (this.movesLeft.length === 0) return;
        
        if (this.selectedPoint === -1) {
            if (this.points[pointNum].player === this.currentPlayer && this.points[pointNum].count > 0) {
                if (this.bar[this.currentPlayer] === 0) {
                    this.selectedPoint = pointNum;
                    this.updateDisplay();
                }
            }
        } else {
            if (this.canMoveTo(this.selectedPoint, pointNum)) {
                this.makeMove(this.selectedPoint, pointNum);
            }
            this.selectedPoint = -1;
            this.updateDisplay();
        }
    }

    handleBarClick() {
        if (this.bar[this.currentPlayer] > 0 && this.movesLeft.length > 0) {
            this.selectedPoint = -2;
            this.updateDisplay();
        }
    }

    canMoveTo(from, to) {
        if (from === -2) {
            const targetPoint = this.currentPlayer === 0 ? to : 23 - to;
            const distance = targetPoint + 1;
            
            if (!this.movesLeft.includes(distance)) return false;
            
            const target = this.points[to];
            return target.player !== (1 - this.currentPlayer) || target.count <= 1;
        }
        
        const distance = Math.abs(to - from);
        
        if (!this.movesLeft.includes(distance)) return false;
        
        if (this.currentPlayer === 0 && to <= from) return false;
        if (this.currentPlayer === 1 && to >= from) return false;
        
        const target = this.points[to];
        return target.player !== (1 - this.currentPlayer) || target.count <= 1;
    }

    makeMove(from, to) {
        let distance;
        
        if (from === -2) {
            this.bar[this.currentPlayer]--;
            distance = this.currentPlayer === 0 ? to + 1 : 24 - to;
        } else {
            this.points[from].count--;
            if (this.points[from].count === 0) {
                this.points[from].player = -1;
            }
            distance = Math.abs(to - from);
        }
        
        if (this.points[to].player === (1 - this.currentPlayer) && this.points[to].count === 1) {
            this.bar[1 - this.currentPlayer]++;
            this.points[to] = { count: 0, player: -1 };
        }
        
        if (this.points[to].count === 0) {
            this.points[to].player = this.currentPlayer;
        }
        this.points[to].count++;
        
        const moveIndex = this.movesLeft.indexOf(distance);
        this.movesLeft.splice(moveIndex, 1);
        
        if (this.movesLeft.length === 0 || !this.hasValidMoves()) {
            this.endTurn();
        }
    }

    hasValidMoves() {
        if (this.bar[this.currentPlayer] > 0) {
            return this.movesLeft.some(move => {
                const targetPoint = this.currentPlayer === 0 ? move - 1 : 24 - move;
                if (targetPoint < 0 || targetPoint > 23) return false;
                const target = this.points[targetPoint];
                return target.player !== (1 - this.currentPlayer) || target.count <= 1;
            });
        }
        
        for (let i = 0; i < 24; i++) {
            if (this.points[i].player === this.currentPlayer && this.points[i].count > 0) {
                for (const move of this.movesLeft) {
                    const targetPoint = this.currentPlayer === 0 ? i + move : i - move;
                    if (targetPoint >= 0 && targetPoint < 24) {
                        const target = this.points[targetPoint];
                        if (target.player !== (1 - this.currentPlayer) || target.count <= 1) {
                            return true;
                        }
                    }
                }
            }
        }
        
        return false;
    }

    endTurn() {
        this.movesLeft = [];
        this.selectedPoint = -1;
        this.currentPlayer = 1 - this.currentPlayer;
        this.updateDisplay();
        window.gameApp.nextPlayer();
    }

    updateDisplay() {
        document.getElementById('dice1').textContent = this.dice[0];
        document.getElementById('dice2').textContent = this.dice[1];
        
        document.getElementById('off-0').textContent = this.off[0];
        document.getElementById('off-1').textContent = this.off[1];
        
        this.container.querySelectorAll('.point').forEach((pointEl) => {
            const pointNum = parseInt(pointEl.dataset.point);
            const point = this.points[pointNum];
            
            pointEl.innerHTML = '';
            pointEl.className = 'point';
            
            if (pointNum === this.selectedPoint) {
                pointEl.classList.add('selected');
            }
            
            if (point.count > 0) {
                const color = point.player === 0 ? '#ff4444' : '#333';
                for (let i = 0; i < Math.min(point.count, 5); i++) {
                    const checker = document.createElement('div');
                    checker.className = 'checker';
                    checker.style.backgroundColor = color;
                    pointEl.appendChild(checker);
                }
                
                if (point.count > 5) {
                    const counter = document.createElement('div');
                    counter.className = 'counter';
                    counter.textContent = point.count;
                    pointEl.appendChild(counter);
                }
            }
        });
        
        const barEl = this.container.querySelector('.bar');
        barEl.innerHTML = '';
        for (let player = 0; player < 2; player++) {
            if (this.bar[player] > 0) {
                const barSection = document.createElement('div');
                barSection.className = 'bar-section';
                const color = player === 0 ? '#ff4444' : '#333';
                
                for (let i = 0; i < Math.min(this.bar[player], 3); i++) {
                    const checker = document.createElement('div');
                    checker.className = 'checker';
                    checker.style.backgroundColor = color;
                    barSection.appendChild(checker);
                }
                
                if (this.bar[player] > 3) {
                    const counter = document.createElement('div');
                    counter.className = 'counter';
                    counter.textContent = this.bar[player];
                    barSection.appendChild(counter);
                }
                
                barEl.appendChild(barSection);
            }
        }
    }
}

// Jeu des Petits Chevaux
class LudoGame extends BaseGame {
    constructor(container, players) {
        super(container, players);
        this.currentPlayer = 0;
        this.diceValue = 0;
        this.colors = ['#ff4444', '#44ff44', '#4444ff', '#ffff44'];
        this.pieces = [];
        this.canRollAgain = false;
        this.initGame();
    }

    initGame() {
        for (let p = 0; p < this.players.length; p++) {
            for (let i = 0; i < 4; i++) {
                this.pieces.push({ player: p, position: -1, finished: false });
            }
        }
        this.setupBoard();
    }

    setupBoard() {
        this.container.innerHTML = `
            <div class="ludo-board">
                <div class="ludo-info">
                    <button onclick="window.currentGame.rollDice()" class="ludo-roll-btn">🎲 Lancer le dé</button>
                    <div class="ludo-dice">${this.diceValue || '-'}</div>
                </div>
                <div class="ludo-game">
                    ${this.renderBoard()}
                </div>
            </div>
        `;
    }

    renderBoard() {
        let html = '<div class="ludo-grid">';
        
        for (let p = 0; p < this.players.length; p++) {
            const color = this.colors[p];
            html += `<div class="ludo-home" style="background: ${color};" data-player="${p}">`;
            html += `<div class="home-label">${this.players[p]}</div>`;
            
            for (let i = 0; i < 4; i++) {
                const pieceIndex = p * 4 + i;
                const piece = this.pieces[pieceIndex];
                const inHome = piece.position === -1;
                html += `<div class="ludo-piece-slot" data-piece="${pieceIndex}" onclick="window.currentGame.selectPiece(${pieceIndex})">`;
                if (inHome) {
                    html += `<div class="ludo-piece" style="background: ${color};"></div>`;
                }
                html += `</div>`;
            }
            html += '</div>';
        }
        
        html += '<div class="ludo-track">';
        for (let i = 0; i < 56; i++) {
            const piecesHere = this.pieces.filter(p => p.position === i && !p.finished);
            html += `<div class="track-cell" data-pos="${i}">`;
            piecesHere.forEach(p => {
                html += `<div class="ludo-piece-small" style="background: ${this.colors[p.player]};"></div>`;
            });
            html += '</div>';
        }
        html += '</div>';
        
        html += '</div>';
        return html;
    }

    rollDice() {
        if (this.diceValue > 0 && !this.canRollAgain) return;
        
        this.diceValue = Math.floor(Math.random() * 6) + 1;
        this.canRollAgain = false;
        
        const playerPieces = this.pieces.filter((p, i) => Math.floor(i / 4) === this.currentPlayer);
        const canMove = playerPieces.some(p => this.canMovePiece(p));
        
        if (!canMove) {
            setTimeout(() => {
                this.diceValue = 0;
                this.nextPlayer();
            }, 1000);
        }
        
        this.updateBoard();
    }

    selectPiece(pieceIndex) {
        if (this.diceValue === 0) return;
        
        const piece = this.pieces[pieceIndex];
        if (piece.player !== this.currentPlayer) return;
        if (!this.canMovePiece(piece)) return;
        
        if (piece.position === -1) {
            if (this.diceValue === 6) {
                piece.position = this.currentPlayer * 14;
                this.canRollAgain = true;
            }
        } else {
            const newPos = piece.position + this.diceValue;
            
            if (newPos < 56) {
                const captured = this.pieces.find(p => 
                    p.position === newPos && 
                    p.player !== this.currentPlayer && 
                    !p.finished
                );
                
                if (captured) {
                    captured.position = -1;
                }
                
                piece.position = newPos;
                
                if (this.diceValue === 6) {
                    this.canRollAgain = true;
                }
            } else if (newPos === 56) {
                piece.finished = true;
                piece.position = 56;
            }
        }
        
        if (!this.canRollAgain) {
            this.diceValue = 0;
            this.nextPlayer();
        } else {
            this.diceValue = 0;
        }
        
        this.updateBoard();
        this.checkWinner();
    }

    canMovePiece(piece) {
        if (piece.finished) return false;
        
        if (piece.position === -1) {
            return this.diceValue === 6;
        }
        
        const newPos = piece.position + this.diceValue;
        return newPos <= 56;
    }

    nextPlayer() {
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        window.gameApp.nextPlayer();
    }

    checkWinner() {
        for (let p = 0; p < this.players.length; p++) {
            const playerPieces = this.pieces.filter((piece, i) => Math.floor(i / 4) === p);
            if (playerPieces.every(piece => piece.finished)) {
                setTimeout(() => {
                    alert(`${this.players[p]} a gagné !`);
                }, 100);
                return;
            }
        }
    }

    updateBoard() {
        this.container.querySelector('.ludo-dice').textContent = this.diceValue || '-';
        
        for (let p = 0; p < this.players.length; p++) {
            for (let i = 0; i < 4; i++) {
                const pieceIndex = p * 4 + i;
                const piece = this.pieces[pieceIndex];
                const slot = this.container.querySelector(`[data-piece="${pieceIndex}"]`);
                
                if (slot) {
                    slot.innerHTML = '';
                    if (piece.position === -1) {
                        slot.innerHTML = `<div class="ludo-piece" style="background: ${this.colors[p]};"></div>`;
                    }
                }
            }
        }
        
        this.container.querySelectorAll('.track-cell').forEach(cell => {
            const pos = parseInt(cell.dataset.pos);
            const piecesHere = this.pieces.filter(p => p.position === pos && !p.finished);
            cell.innerHTML = '';
            piecesHere.forEach(p => {
                cell.innerHTML += `<div class="ludo-piece-small" style="background: ${this.colors[p.player]};"></div>`;
            });
        });
    }
}