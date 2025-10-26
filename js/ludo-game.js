/**
 * Fichier: ludo-game.js
 * Auteur: Guillaume Moulard
 * Rôle: Logique du jeu des Petits Chevaux (Ludo)
 * 
 * Description:
 * Implémente les règles complètes du jeu des Petits Chevaux avec dés,
 * déplacements, captures et gestion de la victoire.
 * 
 * Historique des versions:
 * - 1.0.3 (2024-01-15): Logique complète
 * - 1.0.6 (2024-01-15): Extraction dans fichier dédié
 */

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
                ${this.renderBoard()}
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
                    html += `<div class="ludo-piece" style="background: white;"></div>`;
                }
                html += `</div>`;
            }
            html += '</div>';
        }
        
        html += '<div class="ludo-track">';
        for (let i = 0; i < 52; i++) {
            const piecesHere = this.pieces.filter(p => p.position === i && !p.finished);
            html += `<div class="ludo-cell" data-pos="${i}">`;
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
                const starts = [0, 13, 26, 39];
                piece.position = starts[this.currentPlayer];
                this.canRollAgain = true;
            }
        } else {
            let newPos = (piece.position + this.diceValue) % 52;
            
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
        
        return true;
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
                    window.gameApp.showVictory(this.players[p]);
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
                        slot.innerHTML = `<div class="ludo-piece" style="background: white;"></div>`;
                    }
                }
            }
        }
        
        this.container.querySelectorAll('.ludo-cell').forEach(cell => {
            const pos = parseInt(cell.dataset.pos);
            const piecesHere = this.pieces.filter(p => p.position === pos && !p.finished);
            cell.innerHTML = '';
            piecesHere.forEach(p => {
                cell.innerHTML += `<div class="ludo-piece-small" style="background: ${this.colors[p.player]};"></div>`;
            });
        });
    }
}
