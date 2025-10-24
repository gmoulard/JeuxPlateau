class GameApp {
    constructor() {
        this.currentGame = null;
        this.players = [];
        this.currentPlayerIndex = 0;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectGame(e.target.dataset.game));
        });

        document.getElementById('player-count').addEventListener('change', (e) => {
            this.updatePlayerInputs(parseInt(e.target.value));
        });

        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('back-to-menu').addEventListener('click', () => this.backToMenu());
        document.getElementById('roll-dice').addEventListener('click', () => this.rollDice());
    }

    selectGame(gameType) {
        this.currentGame = gameType;
        document.getElementById('game-title').textContent = this.getGameTitle(gameType);
        this.showScreen('game-setup');
        this.updatePlayerInputs(2);
    }

    getGameTitle(gameType) {
        const titles = {
            checkers: 'Dames',
            chess: 'Échecs',
            backgammon: 'Backgammon',
            ludo: 'Petits Chevaux'
        };
        return titles[gameType];
    }

    updatePlayerInputs(count) {
        const container = document.getElementById('player-names');
        container.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Nom du joueur ${i}`;
            input.className = 'player-input';
            container.appendChild(input);
        }
    }

    startGame() {
        const inputs = document.querySelectorAll('.player-input');
        this.players = Array.from(inputs).map((input, i) => input.value || `Joueur ${i + 1}`);
        this.currentPlayerIndex = 0;
        
        this.showScreen('game-board');
        this.updateCurrentPlayer();
        this.initializeBoard();
    }

    initializeBoard() {
        const container = document.getElementById('board-container');
        container.innerHTML = '';
        
        switch(this.currentGame) {
            case 'checkers':
                window.currentGame = new CheckersGame(container, this.players);
                break;
            case 'chess':
                window.currentGame = new ChessGame(container, this.players);
                break;
            case 'backgammon':
                window.currentGame = new BackgammonGame(container, this.players);
                break;
            case 'ludo':
                window.currentGame = new LudoGame(container, this.players);
                break;
        }
    }

    updateCurrentPlayer() {
        document.querySelector('#current-player span').textContent = this.players[this.currentPlayerIndex];
    }

    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.updateCurrentPlayer();
    }

    rollDice() {
        const result = Math.floor(Math.random() * 6) + 1;
        document.getElementById('dice-result').textContent = result;
        return result;
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    backToMenu() {
        this.showScreen('game-selection');
        this.currentGame = null;
        this.players = [];
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    window.gameApp = new GameApp();
});