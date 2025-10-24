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
        document.getElementById('help-btn').addEventListener('click', () => this.showScreen('help-screen'));
        document.getElementById('back-from-help').addEventListener('click', () => this.showScreen('game-selection'));
        document.getElementById('history-btn').addEventListener('click', () => this.showHistory());
        document.getElementById('back-from-history').addEventListener('click', () => this.showScreen('game-selection'));
        document.getElementById('game-help-btn').addEventListener('click', () => this.showGameHelp());
        document.getElementById('close-game-help').addEventListener('click', () => this.hideGameHelp());
        document.getElementById('app-version').addEventListener('click', () => this.showScreen('versions-screen'));
        document.getElementById('back-from-versions').addEventListener('click', () => this.showScreen('game-selection'));
    }

    selectGame(gameType) {
        this.currentGame = gameType;
        document.getElementById('game-title').textContent = this.getGameTitle(gameType);
        this.showScreen('game-setup');
        
        const playerCountSelect = document.getElementById('player-count');
        if (gameType === 'ludo') {
            playerCountSelect.parentElement.style.display = 'block';
            this.updatePlayerInputs(2);
        } else {
            playerCountSelect.parentElement.style.display = 'none';
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
        
        const diceContainer = document.getElementById('dice-container');
        if (this.currentGame === 'checkers' || this.currentGame === 'chess') {
            diceContainer.style.display = 'none';
        } else {
            diceContainer.style.display = 'flex';
        }
        
        this.loadGameHelp();
        
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

    loadGameHelp() {
        const helps = {
            checkers: `<h3>🎯 Dames</h3>
                <p><strong>But :</strong> Capturer tous les pions adverses</p>
                <ul>
                    <li>Cliquez sur un pion pour le sélectionner</li>
                    <li>Cliquez sur une case diagonale pour le déplacer</li>
                    <li>Les pions rouges avancent vers le bas, les noirs vers le haut</li>
                    <li>Sautez par-dessus un pion adverse pour le capturer</li>
                    <li>Les prises sont obligatoires</li>
                    <li>Vous pouvez enchaîner plusieurs prises</li>
                    <li>Atteignez la dernière rangée pour devenir Dame (♛)</li>
                    <li>Les Dames peuvent se déplacer en avant et en arrière</li>
                </ul>`,
            chess: `<h3>♟ Échecs</h3>
                <p><strong>But :</strong> Mettre le roi adverse en échec et mat</p>
                <ul>
                    <li>Cliquez sur une pièce pour la sélectionner</li>
                    <li>Cliquez sur une case pour la déplacer</li>
                    <li>Les blancs jouent en bas, les noirs en haut</li>
                    <li>Chaque pièce a ses propres règles de déplacement</li>
                    <li>Capturez les pièces adverses en vous plaçant sur leur case</li>
                </ul>`,
            backgammon: `<h3>🎲 Tavli (Backgammon)</h3>
                <p><strong>But :</strong> Sortir tous vos pions du plateau</p>
                <ul>
                    <li>Cliquez sur "🎲 Lancer" pour lancer les dés</li>
                    <li>Cliquez sur un point avec vos pions pour le sélectionner</li>
                    <li>Cliquez sur le point de destination</li>
                    <li>Le joueur 1 (rouge) déplace dans le sens horaire</li>
                    <li>Le joueur 2 (noir) déplace dans le sens anti-horaire</li>
                    <li>Vous ne pouvez pas vous poser sur un point avec 2+ pions adverses</li>
                    <li>Capturez un pion adverse seul en vous plaçant dessus</li>
                    <li>Les pions capturés vont sur la barre et doivent rentrer</li>
                    <li>Un double vous donne 4 mouvements au lieu de 2</li>
                </ul>`,
            ludo: `<h3>🎰 Petits Chevaux</h3>
                <p><strong>But :</strong> Faire le tour du plateau et rentrer tous vos pions</p>
                <ul>
                    <li>Cliquez sur "🎲 Lancer les dés" pour jouer</li>
                    <li>Déplacez vos pions selon le résultat du dé</li>
                    <li>Faites 6 pour sortir un pion de votre base</li>
                    <li>Capturez les pions adverses en tombant sur leur case</li>
                    <li>Un 6 vous donne un tour supplémentaire</li>
                </ul>`
        };
        
        document.getElementById('game-help-content').innerHTML = helps[this.currentGame] || '';
    }

    showGameHelp() {
        document.getElementById('game-help-panel').classList.add('active');
    }

    hideGameHelp() {
        document.getElementById('game-help-panel').classList.remove('active');
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