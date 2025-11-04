/**
 * Fichier: app.js
 * Auteur: Guillaume Moulard
 * Rôle: Contrôleur principal de l'application
 * 
 * Description:
 * Gère la logique principale de l'application Jeux de Plateau, incluant
 * la navigation entre les écrans, la gestion des joueurs, le versioning,
 * la sauvegarde locale et l'historique des parties.
 * 
 * Historique des versions:
 * - 1.0.0 (2024-01-15): Création initiale avec navigation de base
 * - 1.0.1 (2024-01-15): Ajout versioning, sauvegarde locale, historique
 * - 1.0.2 (2024-01-15): Ajout page des versions
 * - 1.0.3 (2024-01-15): Support complet des Petits Chevaux
 * - 1.0.4 (2024-01-15): Ajout en-têtes de documentation
 * - 1.0.6 (2024-01-15): Refactoring fichiers séparés
 * - 1.0.7 (2024-01-15): Installation PWA + fix mobile Tavli
 * - 1.4.15 (2024-01-15): Amélioration système mise à jour cache (AWS-Kiro)
 * - 1.4.16 (2024-01-15): Tavli responsive dynamique pour mobile (AWS-Kiro)
 * - 1.4.17 (2024-01-15): Correction Morpion mobile + règles Dames + liens aide (AWS-Kiro)
 */

class GameApp {
    constructor() {
        this.currentGame = null;
        this.players = [];
        this.currentPlayerIndex = 0;
        this.version = '';
        this.deferredPrompt = null;
        this.cameraStream = null;
        this.cameraActive = false;
        this.init();
    }

    init() {
        this.loadVersion();
        this.loadSettings();
        this.bindEvents();
        this.setupPWA();
    }

    async loadVersion() {
        try {
            const response = await fetch('version.json');
            const data = await response.json();
            this.version = data.version;
            this.versionInfo = data;
            const versionText = data.createdBy ? `${data.version} (${data.createdBy})` : data.version;
            document.getElementById('footer-version').textContent = versionText;
        } catch (e) {
            this.version = '1.0.0';
            this.versionInfo = { version: '1.0.0' };
            document.getElementById('footer-version').textContent = '1.0.0';
        }
    }

    loadSettings() {
        const saved = localStorage.getItem('gameSettings');
        if (saved) {
            this.savedSettings = JSON.parse(saved);
        }
        this.loadColors();
    }
    
    loadColors() {
        const colors = JSON.parse(localStorage.getItem('gameColors') || '{}');
        document.documentElement.style.setProperty('--light-cell', colors.lightCell || '#f0d9b5');
        document.documentElement.style.setProperty('--dark-cell', colors.darkCell || '#b58863');
        document.documentElement.style.setProperty('--player1-color', colors.player1 || '#ffffff');
        document.documentElement.style.setProperty('--player2-color', colors.player2 || '#333333');
    }
    
    showSettingsScreen() {
        const colors = JSON.parse(localStorage.getItem('gameColors') || '{}');
        document.getElementById('light-cell-color').value = colors.lightCell || '#f0d9b5';
        document.getElementById('dark-cell-color').value = colors.darkCell || '#b58863';
        document.getElementById('player1-color').value = colors.player1 || '#ffffff';
        document.getElementById('player2-color').value = colors.player2 || '#333333';
        this.showScreen('settings-screen');
    }
    
    updateColors() {
        const colors = {
            lightCell: document.getElementById('light-cell-color').value,
            darkCell: document.getElementById('dark-cell-color').value,
            player1: document.getElementById('player1-color').value,
            player2: document.getElementById('player2-color').value
        };
        localStorage.setItem('gameColors', JSON.stringify(colors));
        this.loadColors();
    }
    
    resetColors() {
        localStorage.removeItem('gameColors');
        document.getElementById('light-cell-color').value = '#f0d9b5';
        document.getElementById('dark-cell-color').value = '#b58863';
        document.getElementById('player1-color').value = '#ffffff';
        document.getElementById('player2-color').value = '#333333';
        this.loadColors();
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
        document.getElementById('settings-btn').addEventListener('click', () => this.showSettingsScreen());
        document.getElementById('back-from-settings').addEventListener('click', () => this.showScreen('game-selection'));
        document.getElementById('history-btn').addEventListener('click', () => this.showHistory());
        document.getElementById('back-from-history').addEventListener('click', () => this.showScreen('settings-screen'));
        document.getElementById('versions-btn').addEventListener('click', () => this.showScreen('versions-screen'));
        document.getElementById('game-help-btn').addEventListener('click', () => this.showGameHelp());
        document.getElementById('close-game-help').addEventListener('click', () => this.hideGameHelp());
        document.getElementById('back-from-versions').addEventListener('click', () => this.showScreen('settings-screen'));
        document.getElementById('install-btn').addEventListener('click', () => this.installPWA());
        document.getElementById('camera-btn').addEventListener('click', () => this.toggleCamera());
        document.getElementById('clear-data-btn').addEventListener('click', () => this.clearLocalData());
        document.getElementById('update-app-btn').addEventListener('click', () => this.updateApp());
        
        // Debug: Ajouter un listener pour afficher les infos de cache (Ctrl+Shift+D)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                this.showCacheInfo();
            }
        });
        document.getElementById('reset-colors-btn').addEventListener('click', () => this.resetColors());
        document.getElementById('light-cell-color').addEventListener('change', (e) => this.updateColors());
        document.getElementById('dark-cell-color').addEventListener('change', (e) => this.updateColors());
        document.getElementById('player1-color').addEventListener('change', (e) => this.updateColors());
        document.getElementById('player2-color').addEventListener('change', (e) => this.updateColors());
        document.getElementById('footer-version-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.showScreen('versions-screen');
        });
    }

    setupPWA() {
        // Enregistrer le Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(() => console.log('Service Worker enregistré'))
                .catch(err => console.log('Erreur SW:', err));
        }

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            document.getElementById('install-btn').style.display = 'block';
        });

        window.addEventListener('appinstalled', () => {
            this.deferredPrompt = null;
            document.getElementById('install-btn').style.display = 'none';
        });
    }

    async installPWA() {
        if (!this.deferredPrompt) return;
        
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('PWA installée');
        }
        
        this.deferredPrompt = null;
        document.getElementById('install-btn').style.display = 'none';
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
            tictactoe: 'Morpion',
            checkers: 'Dames',
            chess: 'Échecs',
            backgammon: 'Tavli',
            ludo: 'Petits Chevaux',
            abalone: 'Abalone'
        };
        return titles[gameType];
    }

    updatePlayerInputs(count) {
        const asterixNames = ['Astérix', 'Obélix', 'Panoramix', 'Idéfix', 'Abraracourcix', 'Assurancetourix', 'Agecanonix', 'Bonemine', 'Falbala', 'Ordralfabétix', 'Cétautomatix', 'Plaintcontrix', 'Beaufix', 'Goudurix', 'Tragicomix', 'Bonnemine', 'Pepe', 'Zérozérosix', 'Tullius Détritus', 'Jules César', 'Cléopâtre', 'Numérobis', 'Amonbofis', 'Barbe-Rouge', 'Triple-Patte', 'Jolitorax', 'Aplusbégalix', 'Moralélastix', 'Promoplus', 'Ocatarinetabellatchitchix'];
        const shuffled = [...asterixNames].sort(() => Math.random() - 0.5);
        const container = document.getElementById('player-names');
        container.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = shuffled[i - 1] || `Joueur ${i}`;
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
        if (this.currentGame === 'checkers' || this.currentGame === 'chess' || this.currentGame === 'tictactoe' || this.currentGame === 'abalone') {
            diceContainer.style.display = 'none';
        } else {
            diceContainer.style.display = 'flex';
        }
        
        this.loadGameHelp();
        
        switch(this.currentGame) {
            case 'tictactoe':
                window.currentGame = new TicTacToeGame(container, this.players);
                break;
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
            case 'abalone':
                window.currentGame = new AbaloneGame(container, this.players);
                break;
        }
    }

    loadGameHelp() {
        const helps = {
            tictactoe: `<h3>❌ Morpion (Tic-Tac-Toe)</h3>
                <p><strong>But :</strong> Aligner 3 symboles (X ou O) horizontalement, verticalement ou en diagonale</p>
                <ul>
                    <li>Cliquez sur une case vide pour placer votre symbole</li>
                    <li>Le joueur 1 joue avec X, le joueur 2 avec O</li>
                    <li>Alternez les tours jusqu'à ce qu'un joueur aligne 3 symboles</li>
                    <li>Si toutes les cases sont remplies sans alignement, c'est match nul</li>
                </ul>
                <div class="help-links">
                    <a href="https://fr.wikipedia.org/wiki/Morpion_(jeu)" target="_blank" class="help-link">📖 Wikipedia</a>
                    <a href="https://www.regles-de-jeux.com/regle-du-morpion/" target="_blank" class="help-link">📋 Règles officielles</a>
                </div>`,
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
                </ul>
                <div class="help-links">
                    <a href="https://fr.wikipedia.org/wiki/Dames" target="_blank" class="help-link">📖 Wikipedia</a>
                    <a href="https://www.ffdjd.fr/Web/index.php?page=reglements" target="_blank" class="help-link">📋 Règles officielles FFDJD</a>
                </div>`,
            chess: `<h3>♟ Échecs</h3>
                <p><strong>But :</strong> Mettre le roi adverse en échec et mat</p>
                <ul>
                    <li>Cliquez sur une pièce pour la sélectionner</li>
                    <li>Cliquez sur une case pour la déplacer</li>
                    <li>Les blancs jouent en bas, les noirs en haut</li>
                    <li>Chaque pièce a ses propres règles de déplacement</li>
                    <li>Capturez les pièces adverses en vous plaçant sur leur case</li>
                </ul>
                <div class="help-links">
                    <a href="https://fr.wikipedia.org/wiki/%C3%89checs" target="_blank" class="help-link">📖 Wikipedia</a>
                    <a href="https://www.echecs.asso.fr/Reglement.aspx" target="_blank" class="help-link">📋 Règles officielles FFE</a>
                </div>`,
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
                </ul>
                <div class="help-links">
                    <a href="https://fr.wikipedia.org/wiki/Backgammon" target="_blank" class="help-link">📖 Wikipedia</a>
                    <a href="https://www.ffb.asso.fr/reglement/" target="_blank" class="help-link">📋 Règles officielles FFB</a>
                </div>`,
            ludo: `<h3>🎰 Petits Chevaux</h3>
                <p><strong>But :</strong> Faire le tour du plateau et rentrer tous vos pions</p>
                <ul>
                    <li>Cliquez sur "🎲 Lancer les dés" pour jouer</li>
                    <li>Déplacez vos pions selon le résultat du dé</li>
                    <li>Faites 6 pour sortir un pion de votre base</li>
                    <li>Capturez les pions adverses en tombant sur leur case</li>
                    <li>Un 6 vous donne un tour supplémentaire</li>
                </ul>
                <div class="help-links">
                    <a href="https://fr.wikipedia.org/wiki/Jeu_des_petits_chevaux" target="_blank" class="help-link">📖 Wikipedia</a>
                    <a href="https://www.regles-de-jeux.com/regle-du-jeu-des-petits-chevaux/" target="_blank" class="help-link">📋 Règles officielles</a>
                </div>`,
            abalone: `<h3>⚫ Abalone</h3>
                <p><strong>But :</strong> Éjecter 6 billes adverses hors du plateau</p>
                <ul>
                    <li>Cliquez sur vos billes pour les sélectionner (1 à 3)</li>
                    <li>Cliquez sur une case vide pour déplacer</li>
                    <li>Les billes doivent être alignées pour se déplacer ensemble</li>
                    <li>Vous pouvez pousser 1 ou 2 billes adverses avec 2 ou 3 de vos billes</li>
                    <li>Une bille poussée hors du plateau est éjectée</li>
                    <li>Premier à éjecter 6 billes adverses gagne</li>
                </ul>
                <div class="help-links">
                    <a href="https://fr.wikipedia.org/wiki/Abalone_(jeu)" target="_blank" class="help-link">📖 Wikipedia</a>
                    <a href="https://www.abalone-games.com/rules/" target="_blank" class="help-link">📋 Règles officielles</a>
                </div>`
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
        const playerName = this.players[this.currentPlayerIndex];
        let playerColor = '';
        
        if (this.currentGame === 'backgammon') {
            playerColor = this.currentPlayerIndex === 0 ? ' 🔴' : ' ⚫';
        } else if (this.currentGame === 'chess') {
            playerColor = this.currentPlayerIndex === 0 ? ' (Blancs)' : ' (Noirs)';
        }
        
        document.querySelector('#current-player span').textContent = playerName + playerColor;
    }

    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.updateCurrentPlayer();
    }

    rollDice() {
        if (this.currentGame === 'backgammon' && window.currentGame) {
            window.currentGame.rollDice();
        } else if (this.currentGame === 'ludo' && window.currentGame) {
            window.currentGame.rollDice();
        } else {
            this.animateDice();
        }
    }

    animateDice() {
        const diceEl = document.getElementById('dice-result');
        let count = 0;
        const interval = setInterval(() => {
            diceEl.textContent = Math.floor(Math.random() * 6) + 1;
            count++;
            if (count >= 10) {
                clearInterval(interval);
                const result = Math.floor(Math.random() * 6) + 1;
                diceEl.textContent = result;
            }
        }, 100);
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

    async toggleCamera() {
        const video = document.getElementById('camera-bg');
        const btn = document.getElementById('camera-btn');
        
        if (this.cameraActive) {
            if (this.cameraStream) {
                this.cameraStream.getTracks().forEach(track => track.stop());
                this.cameraStream = null;
            }
            video.style.display = 'none';
            btn.classList.remove('active');
            this.cameraActive = false;
        } else {
            try {
                this.cameraStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'environment' } 
                });
                video.srcObject = this.cameraStream;
                video.style.display = 'block';
                btn.classList.add('active');
                this.cameraActive = true;
            } catch (err) {
                alert('Impossible d\'activer la caméra: ' + err.message);
            }
        }
    }

    clearLocalData() {
        if (confirm('Êtes-vous sûr de vouloir effacer toutes les données locales (historique, paramètres) ?')) {
            localStorage.clear();
            alert('Données locales effacées avec succès !');
            this.showScreen('game-selection');
        }
    }

    showVictory(winnerName) {
        const overlay = document.createElement('div');
        overlay.className = 'victory-overlay';
        overlay.innerHTML = `
            <div class="victory-modal">
                <div class="victory-trophy">🏆</div>
                <h2 class="victory-title">Victoire !</h2>
                <div class="victory-medal">🥇</div>
                <p class="victory-winner">${winnerName} a gagné !</p>
                <button class="victory-btn" onclick="this.closest('.victory-overlay').remove(); window.gameApp.backToMenu();">Retour au menu</button>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    async showCacheInfo() {
        try {
            let info = 'INFORMATIONS DE CACHE\n\n';
            
            // Informations sur les caches
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                info += `Caches trouvés: ${cacheNames.length}\n`;
                for (const cacheName of cacheNames) {
                    const cache = await caches.open(cacheName);
                    const keys = await cache.keys();
                    info += `- ${cacheName}: ${keys.length} fichiers\n`;
                }
            }
            
            // Informations sur le service worker
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    info += `\nService Worker: Actif\n`;
                    info += `- État: ${registration.active ? 'Actif' : 'Inactif'}\n`;
                    info += `- En attente: ${registration.waiting ? 'Oui' : 'Non'}\n`;
                    info += `- Installation: ${registration.installing ? 'En cours' : 'Terminée'}\n`;
                } else {
                    info += `\nService Worker: Non trouvé\n`;
                }
            }
            
            // Informations sur le localStorage
            info += `\nLocalStorage: ${Object.keys(localStorage).length} clés\n`;
            Object.keys(localStorage).forEach(key => {
                const value = localStorage.getItem(key);
                const size = new Blob([value]).size;
                info += `- ${key}: ${size} bytes\n`;
            });
            
            alert(info);
        } catch (error) {
            alert('Erreur lors de la récupération des informations: ' + error.message);
        }
    }

    async updateApp() {
        try {
            console.log('Début de la mise à jour de l\'application...');
            
            // Étape 1: Vider complètement le cache du navigateur
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                console.log('Caches trouvés:', cacheNames);
                
                await Promise.all(
                    cacheNames.map(async (cacheName) => {
                        console.log('Suppression du cache:', cacheName);
                        return caches.delete(cacheName);
                    })
                );
                console.log('Tous les caches ont été vidés');
            }

            // Étape 2: Forcer la mise à jour du service worker
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    console.log('Service Worker trouvé, mise à jour...');
                    
                    // Forcer la mise à jour
                    await registration.update();
                    
                    // Si il y a un service worker en attente, l'activer
                    if (registration.waiting) {
                        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                    }
                    
                    console.log('Service Worker mis à jour');
                } else {
                    console.log('Aucun Service Worker trouvé, enregistrement...');
                    await navigator.serviceWorker.register('./sw.js');
                }
            }

            // Étape 3: Vider le cache du navigateur (localStorage, sessionStorage)
            try {
                // Sauvegarder les données importantes avant de vider
                const gameSettings = localStorage.getItem('gameSettings');
                const gameHistory = localStorage.getItem('gameHistory');
                const gameColors = localStorage.getItem('gameColors');
                
                // Vider tout le localStorage sauf les données de jeu
                const keysToKeep = ['gameSettings', 'gameHistory', 'gameColors'];
                const allKeys = Object.keys(localStorage);
                
                allKeys.forEach(key => {
                    if (!keysToKeep.includes(key)) {
                        localStorage.removeItem(key);
                    }
                });
                
                // Vider sessionStorage
                sessionStorage.clear();
                
                console.log('Cache navigateur vidé (données de jeu conservées)');
            } catch (e) {
                console.log('Erreur lors du vidage du cache navigateur:', e);
            }

            // Étape 4: Confirmer et recharger
            const message = 'Mise à jour terminée !\n\n' +
                          '✅ Cache de l\'application vidé\n' +
                          '✅ Service Worker mis à jour\n' +
                          '✅ Tous les fichiers seront rechargés\n\n' +
                          'Recharger maintenant pour obtenir la dernière version ?';
            
            if (confirm(message)) {
                console.log('Rechargement de l\'application...');
                // Forcer le rechargement complet sans cache
                window.location.href = window.location.href + '?t=' + Date.now();
            }
            
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            
            // Fallback: rechargement simple
            const fallbackMessage = 'Erreur lors de la mise à jour automatique.\n\n' +
                                  'Voulez-vous recharger l\'application manuellement ?\n' +
                                  '(Cela devrait résoudre la plupart des problèmes)';
            
            if (confirm(fallbackMessage)) {
                window.location.href = window.location.href + '?t=' + Date.now();
            }
        }
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    window.gameApp = new GameApp();
});