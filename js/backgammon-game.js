/**
 * Fichier: backgammon-game.js
 * Auteur: Guillaume Moulard
 * Rôle: Logique du jeu de Tavli (Backgammon)
 * 
 * Description:
 * Implémente une version simplifiée du Backgammon avec interface fonctionnelle.
 * 
 * Historique des versions:
 * - 1.0.2 (2024-01-15): Logique complète avec pions ronds
 * - 1.0.6 (2024-01-15): Extraction dans fichier dédié
 * - 1.0.9 (2024-01-15): Refonte complète interface simplifiée
 * - 1.1.0 (2024-01-15): Correction sens rotation + pions capturés
 */

class BackgammonGame extends BaseGame {
    constructor(container, players) {
        super(container, players);
        this.currentPlayer = 0;
        this.dice = [0, 0];
        this.movesLeft = [];
        this.board = Array(24).fill(null).map(() => []);
        this.captured = [0, 0]; // Pions capturés par joueur
        this.selectedPoint = null;
        this.initGame();
    }

    initGame() {
        this.setupInitialPosition();
        this.renderBoard();
    }

    setupInitialPosition() {
        // Position initiale standard du backgammon
        // Joueur 0 (rouge) va de 0 vers 23
        // Joueur 1 (noir) va de 23 vers 0
        this.board[0] = [0, 0];
        this.board[5] = [1, 1, 1, 1, 1];
        this.board[7] = [1, 1, 1];
        this.board[11] = [0, 0, 0, 0, 0];
        this.board[12] = [1, 1, 1, 1, 1];
        this.board[16] = [0, 0, 0];
        this.board[18] = [0, 0, 0, 0, 0];
        this.board[23] = [1, 1];
    }

    renderBoard() {
        this.container.innerHTML = `
            <div class="tavli-container">
                <div class="tavli-info">
                    <div class="tavli-dice-display">
                        <span class="dice-value">${this.dice[0] || '-'}</span>
                        <span class="dice-value">${this.dice[1] || '-'}</span>
                    </div>
                    <div class="tavli-moves">Coups: ${this.movesLeft.length}</div>
                    <div class="tavli-captured">
                        <div>🔴 Capturés: ${this.captured[0]}</div>
                        <div>⚫ Capturés: ${this.captured[1]}</div>
                    </div>
                </div>
                <div class="tavli-board">
                    ${this.renderPoints()}
                </div>
            </div>
        `;
        this.attachEventListeners();
    }

    renderPoints() {
        let html = '<div class="tavli-points-container">';
        
        // Points 12-23 (haut)
        html += '<div class="tavli-row tavli-top">';
        for (let i = 12; i < 24; i++) {
            html += this.renderPoint(i);
        }
        html += '</div>';
        
        // Points 11-0 (bas)
        html += '<div class="tavli-row tavli-bottom">';
        for (let i = 11; i >= 0; i--) {
            html += this.renderPoint(i);
        }
        html += '</div>';
        
        html += '</div>';
        return html;
    }

    renderPoint(index) {
        const pieces = this.board[index];
        const isSelected = this.selectedPoint === index;
        const count = pieces.length;
        
        let html = `<div class="tavli-point ${isSelected ? 'selected' : ''}" data-point="${index}">`;
        html += `<div class="point-number">${index}</div>`;
        
        if (count > 0) {
            const player = pieces[0];
            const color = player === 0 ? '#ff4444' : '#333';
            
            // Afficher jusqu'à 5 pions
            const displayCount = Math.min(count, 5);
            for (let i = 0; i < displayCount; i++) {
                html += `<div class="tavli-checker" style="background: ${color};"></div>`;
            }
            
            // Si plus de 5, afficher le nombre
            if (count > 5) {
                html += `<div class="checker-count">${count}</div>`;
            }
        }
        
        html += '</div>';
        return html;
    }

    attachEventListeners() {
        this.container.querySelectorAll('.tavli-point').forEach(point => {
            point.addEventListener('click', (e) => {
                const pointIndex = parseInt(e.currentTarget.dataset.point);
                this.handlePointClick(pointIndex);
            });
        });
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
        
        this.renderBoard();
        
        if (!this.hasValidMoves()) {
            setTimeout(() => this.endTurn(), 1000);
        }
    }

    handlePointClick(pointIndex) {
        if (this.movesLeft.length === 0) return;
        
        const pieces = this.board[pointIndex];
        
        // Sélection d'un point avec nos pièces
        if (this.selectedPoint === null) {
            if (pieces.length > 0 && pieces[0] === this.currentPlayer) {
                this.selectedPoint = pointIndex;
                this.renderBoard();
            }
        } 
        // Déplacement vers un point
        else {
            if (this.canMoveTo(this.selectedPoint, pointIndex)) {
                this.makeMove(this.selectedPoint, pointIndex);
            }
            this.selectedPoint = null;
            this.renderBoard();
        }
    }

    canMoveTo(from, to) {
        const distance = Math.abs(to - from);
        
        // Vérifier si le mouvement correspond à un dé
        if (!this.movesLeft.includes(distance)) return false;
        
        // Vérifier la direction (corrigé)
        if (this.currentPlayer === 0 && to <= from) return false;
        if (this.currentPlayer === 1 && to >= from) return false;
        
        // Vérifier si la destination est valide
        const targetPieces = this.board[to];
        if (targetPieces.length > 0 && targetPieces[0] !== this.currentPlayer) {
            return targetPieces.length === 1; // Peut capturer si seul
        }
        
        return true;
    }

    makeMove(from, to) {
        const distance = Math.abs(to - from);
        
        // Capturer si nécessaire
        if (this.board[to].length === 1 && this.board[to][0] !== this.currentPlayer) {
            const capturedPlayer = this.board[to][0];
            this.captured[capturedPlayer]++;
            this.board[to] = [];
        }
        
        // Déplacer la pièce
        const piece = this.board[from].pop();
        this.board[to].push(piece);
        
        // Retirer le mouvement utilisé
        const moveIndex = this.movesLeft.indexOf(distance);
        this.movesLeft.splice(moveIndex, 1);
        
        // Vérifier si le tour est terminé
        if (this.movesLeft.length === 0 || !this.hasValidMoves()) {
            setTimeout(() => this.endTurn(), 500);
        }
    }

    hasValidMoves() {
        for (let from = 0; from < 24; from++) {
            if (this.board[from].length > 0 && this.board[from][0] === this.currentPlayer) {
                for (const move of this.movesLeft) {
                    const to = this.currentPlayer === 0 ? from + move : from - move;
                    if (to >= 0 && to < 24 && this.canMoveTo(from, to)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    endTurn() {
        this.movesLeft = [];
        this.selectedPoint = null;
        this.currentPlayer = 1 - this.currentPlayer;
        this.renderBoard();
        window.gameApp.nextPlayer();
    }
}
