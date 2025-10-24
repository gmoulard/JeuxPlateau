class GameApp {
    constructor() {
        this.currentGame = null;
        this.players = [];
        this.currentPlayerIndex = 0;
        this.version = '';
        this.init();
    }

    init() {
        this.loadVersion();
        this.loadSettings();
        this.bindEvents();
    }

    async loadVersion() {
        try {
            const response = await fetch('version.json');
            const data = await response.json();
            this.version = data.version;
            document.getElementById('app-version').textContent = `v${this.version}`;
        } catch (e) {
            this.version = '1.0.0';
            document.getElementById('app-version').textContent = 'v1.0.0';
        }
    }

    loadSettings() {
        const saved = localStorage.getItem('gameSettings');
        if (saved) {
            this.savedSettings = JSON.parse(saved);
        }
    }

    saveSettings(gameType, playerCount, playerNames) {
        const settings = { gameType, playerCount, playerNames };
        localStorage.setItem('gameSettings', JSON.stringify(settings));
    }

    saveGameHistory(gameType, players, winner = null) {
        const history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
        history.unshift({
            game: gameType,
            players: players,
            winner: winner,
            date: new Date().toISOString()
        });
        if (history.length > 50) history.pop();
        localStorage.setItem('gameHistory', JSON.stringify(history));
    }

    loadGameHistory() {
        return JSON.parse(localStorage.getItem('gameHistory') || '[]');
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
        document.getElementById('history-btn').addEventListener('click', () => this.showHistory());
        document.getElementById('back-from-history').addEventListener('click', () => this.showScreen('game-selection'));
    }

    selectGame(gameType) {
        this.currentGame = gameType;
        document.getElementById('game-title').textContent = this.getGameTitle(gameType);
        this.showScreen('game-setup');
        
        if (this.savedSettings && this.savedSettings.gameType === gameType) {
            document.getElementById('player-count').value = this.savedSettings.playerCount;
            this.updatePlayerInputs(this.savedSettings.playerCount);
            setTimeout(() => {
                const inputs = document.querySelectorAll('.player-input');
                this.savedSettings.playerNames.forEach((name, i) => {
                    if (inputs[i]) inputs[i].value = name;
                });
            }, 0);
        } else {
            this.updatePlayerInputs(2);
        }
    }

    getGameTitle(gameType) {
        const titles = {
            checkers: 'Dames',
            chess: 'Échecs',
            backgammon: 'Tavli',
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
        
        const playerCount = document.getElementById('player-count').value;
        this.saveSettings(this.currentGame, playerCount, this.players);
        this.saveGameHistory(this.getGameTitle(this.currentGame), this.players);
        
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

    showHistory() {
        const history = this.loadGameHistory();
        const container = document.getElementById('history-list');
        
        if (history.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666;">Aucune partie enregistrée</p>';
        } else {
            container.innerHTML = history.map(item => {
                const date = new Date(item.date);
                const dateStr = date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});
                return `
                    <div class="history-item">
                        <div>
                            <div class="history-game">${item.game}</div>
                            <div class="history-players">${item.players.join(', ')}</div>
                        </div>
                        <div class="history-date">${dateStr}</div>
                    </div>
                `;
            }).join('');
        }
        
        this.showScreen('history-screen');
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