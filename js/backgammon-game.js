/**
 * Fichier: backgammon-game.js
 * Auteur: Guillaume Moulard
 * Rôle: Logique du jeu de Tavli (Backgammon)
 * 
 * Description:
 * Implémente les règles complètes du Backgammon avec dés, déplacements,
 * captures et gestion de la barre.
 * 
 * Historique des versions:
 * - 1.0.2 (2024-01-15): Logique complète avec pions ronds
 * - 1.0.6 (2024-01-15): Extraction dans fichier dédié
 */

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
