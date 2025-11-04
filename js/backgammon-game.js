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
        this.bar = [0, 0]; // Pions sur la barre (capturés)
        this.selectedPoint = null;
        this.selectedBar = false;
        this.initGame();
    }

    initGame() {
        this.setupInitialPosition();
        this.out = [0, 0]; // Pions sortis
        this.renderBoard();
        
        // Listener pour les changements d'orientation
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.renderBoard();
            }, 100);
        });
        
        // Listener pour le redimensionnement
        window.addEventListener('resize', () => {
            this.adjustForScreenSize();
        });
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
        const stats0 = this.getPlayerStats(0);
        const stats1 = this.getPlayerStats(1);
        
        // Détection de l'orientation et de la taille d'écran
        const isLandscape = window.innerWidth > window.innerHeight;
        const isMobile = window.innerWidth <= 768;
        
        this.container.innerHTML = `
            <div class="tavli-container">
                <div class="tavli-info">
                    <div class="tavli-dice-display">
                        <span class="dice-value">${this.dice[0] || '-'}</span>
                        <span class="dice-value">${this.dice[1] || '-'}</span>
                    </div>
                    <div class="tavli-moves">Coups: ${this.movesLeft.length}</div>
                    <div class="tavli-bar">
                        <div class="bar-section" data-bar="0">
                            <div>🔴: ${this.bar[0]}</div>
                            ${this.renderBarPieces(0)}
                        </div>
                        <div class="bar-section" data-bar="1">
                            <div>⚫: ${this.bar[1]}</div>
                            ${this.renderBarPieces(1)}
                        </div>
                    </div>
                </div>
                <div class="tavli-stats">
                    <div class="player-stats">
                        <div>🔴 ${isMobile ? this.players[0].substring(0, 8) : this.players[0]}</div>
                        <div>Sortis: ${stats0.out}/15</div>
                        <div>Pips: ${stats0.pips}</div>
                    </div>
                    <div class="player-stats">
                        <div>⚫ ${isMobile ? this.players[1].substring(0, 8) : this.players[1]}</div>
                        <div>Sortis: ${stats1.out}/15</div>
                        <div>Pips: ${stats1.pips}</div>
                    </div>
                </div>
                <div class="tavli-board">
                    ${this.renderPoints()}
                </div>
            </div>
        `;
        this.attachEventListeners();
        
        // Ajuster dynamiquement la taille des éléments
        this.adjustForScreenSize();
    }
    
    adjustForScreenSize() {
        const container = this.container.querySelector('.tavli-container');
        const board = this.container.querySelector('.tavli-board');
        const points = this.container.querySelectorAll('.tavli-point');
        
        if (window.innerWidth <= 480) {
            // Très petits écrans
            points.forEach(point => {
                point.style.minHeight = '40px';
            });
        } else if (window.innerWidth <= 768) {
            // Mobiles
            const isLandscape = window.innerWidth > window.innerHeight;
            points.forEach(point => {
                point.style.minHeight = isLandscape ? '50px' : '60px';
            });
        } else {
            // Tablettes et desktop
            points.forEach(point => {
                point.style.minHeight = '80px';
            });
        }
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

    renderBarPieces(player) {
        if (this.bar[player] === 0) return '';
        const color = player === 0 ? 'var(--player1-color)' : 'var(--player2-color)';
        const isSelected = this.selectedBar && this.currentPlayer === player;
        return `<div class="bar-checker ${isSelected ? 'selected' : ''}" style="background: ${color};" data-bar-player="${player}">${this.bar[player]}</div>`;
    }

    renderPoint(index) {
        const pieces = this.board[index];
        const isSelected = this.selectedPoint === index;
        const count = pieces.length;
        
        let html = `<div class="tavli-point ${isSelected ? 'selected' : ''}" data-point="${index}">`;
        html += `<div class="point-number">${index}</div>`;
        
        if (count > 0) {
            const player = pieces[0];
            const color = player === 0 ? 'var(--player1-color)' : 'var(--player2-color)';
            
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
        
        this.container.querySelectorAll('.bar-checker').forEach(checker => {
            checker.addEventListener('click', (e) => {
                const player = parseInt(e.currentTarget.dataset.barPlayer);
                this.handleBarClick(player);
            });
        });
    }

    handleBarClick(player) {
        if (this.movesLeft.length === 0 || player !== this.currentPlayer) return;
        if (this.bar[player] === 0) return;
        
        this.selectedBar = true;
        this.selectedPoint = null;
        this.renderBoard();
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
        
        // Si on a des pions sur la barre, on doit d'abord les réintroduire
        if (this.bar[this.currentPlayer] > 0 && !this.selectedBar) {
            return;
        }
        
        const pieces = this.board[pointIndex];
        
        // Réintroduction depuis la barre
        if (this.selectedBar) {
            if (this.canEnterFromBar(pointIndex)) {
                this.enterFromBar(pointIndex);
            }
            this.selectedBar = false;
            this.renderBoard();
            return;
        }
        
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

    canEnterFromBar(to) {
        // Joueur 0 entre par 0-5, Joueur 1 entre par 18-23
        const validRange = this.currentPlayer === 0 ? (to >= 0 && to <= 5) : (to >= 18 && to <= 23);
        if (!validRange) return false;
        
        // Calculer la distance depuis l'entrée
        const entryPoint = this.currentPlayer === 0 ? -1 : 24;
        const distance = Math.abs(to - entryPoint);
        
        if (!this.movesLeft.includes(distance)) return false;
        
        // Vérifier si la destination est valide
        const targetPieces = this.board[to];
        if (targetPieces.length > 0 && targetPieces[0] !== this.currentPlayer) {
            return targetPieces.length === 1;
        }
        
        return true;
    }

    enterFromBar(to) {
        const entryPoint = this.currentPlayer === 0 ? -1 : 24;
        const distance = Math.abs(to - entryPoint);
        
        // Capturer si nécessaire
        if (this.board[to].length === 1 && this.board[to][0] !== this.currentPlayer) {
            const capturedPlayer = this.board[to][0];
            this.bar[capturedPlayer]++;
            this.board[to] = [];
        }
        
        // Placer le pion
        this.bar[this.currentPlayer]--;
        this.board[to].push(this.currentPlayer);
        
        // Retirer le mouvement utilisé
        const moveIndex = this.movesLeft.indexOf(distance);
        this.movesLeft.splice(moveIndex, 1);
        
        if (this.movesLeft.length === 0 || !this.hasValidMoves()) {
            setTimeout(() => this.endTurn(), 500);
        }
    }

    makeMove(from, to) {
        const distance = Math.abs(to - from);
        
        // Capturer si nécessaire
        if (this.board[to].length === 1 && this.board[to][0] !== this.currentPlayer) {
            const capturedPlayer = this.board[to][0];
            this.bar[capturedPlayer]++;
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
        // Si on a des pions sur la barre, vérifier si on peut les réintroduire
        if (this.bar[this.currentPlayer] > 0) {
            const range = this.currentPlayer === 0 ? [0, 5] : [18, 23];
            for (let to = range[0]; to <= range[1]; to++) {
                if (this.canEnterFromBar(to)) return true;
            }
            return false;
        }
        
        // Sinon vérifier les mouvements normaux
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

    getPlayerStats(player) {
        let onBoard = 0;
        let pips = 0;
        
        for (let i = 0; i < 24; i++) {
            const count = this.board[i].filter(p => p === player).length;
            onBoard += count;
            if (player === 0) {
                pips += count * (24 - i);
            } else {
                pips += count * (i + 1);
            }
        }
        
        pips += this.bar[player] * 25;
        const out = 15 - onBoard - this.bar[player];
        
        return { out, pips };
    }

    endTurn() {
        this.movesLeft = [];
        this.selectedPoint = null;
        this.selectedBar = false;
        this.currentPlayer = 1 - this.currentPlayer;
        this.renderBoard();
        window.gameApp.nextPlayer();
    }
}
