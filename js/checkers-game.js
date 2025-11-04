/**
 * Fichier: checkers-game.js
 * Auteur: Guillaume Moulard
 * Rôle: Logique du jeu de Dames
 * 
 * Description:
 * Implémente les règles complètes du jeu de Dames incluant les déplacements,
 * les prises obligatoires, les prises multiples et la promotion en Dame.
 * 
 * Historique des versions:
 * - 1.0.0 (2024-01-15): Logique de base
 * - 1.0.1 (2024-01-15): Règles avancées (prises, dame)
 * - 1.0.5 (2024-01-15): Extraction dans fichier dédié
 */

class CheckersGame extends BaseGame {
    constructor(container, players) {
        super(container, players);
        this.currentPlayer = 0;
        this.pieces = {};
        this.mustCapture = false;
        this.mustContinueCapture = null; // Pion qui doit continuer une capture multiple
        this.captured = [0, 0];
        this.initGame();
    }

    initGame() {
        const boardEl = this.createBoard(10, 10);
        boardEl.classList.add('checkers-board');
        this.setupPieces();
        this.colorBoard();
        this.renderStats();
    }
    
    renderStats() {
        const existing = this.container.querySelector('.checkers-stats');
        if (existing) existing.remove();
        
        const stats = document.createElement('div');
        stats.className = 'checkers-stats';
        stats.innerHTML = `
            <div class="player-captures">
                <div>⚪ ${this.players[0]}: ${this.captured[0]} pions</div>
                <div>⚫ ${this.players[1]}: ${this.captured[1]} pions</div>
            </div>
        `;
        this.container.insertBefore(stats, this.container.firstChild);
    }

    colorBoard() {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if ((row + col) % 2 === 1) {
                    this.board[row][col].classList.add('dark');
                }
            }
        }
    }

    setupPieces() {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 10; col++) {
                if ((row + col) % 2 === 1) {
                    this.pieces[`${row}-${col}`] = { player: 0, king: false };
                    this.renderPiece(row, col);
                }
            }
        }
        for (let row = 6; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
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
        
        const color = piece.player === 0 ? 'var(--player1-color)' : 'var(--player2-color)';
        const borderColor = piece.player === 0 ? 'var(--player2-color)' : 'var(--player1-color)';
        const symbol = piece.king ? '♛' : '●';
        this.addPiece(row, col, `<div class="checker-piece" style="background: ${color}; border: 3px solid ${borderColor};">${symbol}</div>`);
    }

    handleCellClick(row, col) {
        const key = `${row}-${col}`;
        
        if (this.selectedPiece) {
            // Si on clique sur le pion déjà sélectionné, le désélectionner
            if (this.selectedPiece.row === row && this.selectedPiece.col === col) {
                this.clearSelection();
                this.selectedPiece = null;
                this.clearMessage();
                return;
            }
            
            // Si on clique sur un autre pion du même joueur, le sélectionner à la place
            if (this.pieces[key] && this.pieces[key].player === this.currentPlayer) {
                this.clearSelection();
                this.selectedPiece = { row, col };
                this.board[row][col].classList.add('selected');
                this.clearMessage();
                return;
            }
            
            // Tentative de mouvement
            const move = this.isValidMove(this.selectedPiece, { row, col });
            if (move) {
                this.movePiece(this.selectedPiece, { row, col }, move.capture);
                this.clearMessage();
                
                if (move.capture && this.canCaptureFrom(row, col)) {
                    // Capture multiple possible - garder le pion sélectionné
                    this.selectedPiece = { row, col };
                    this.mustContinueCapture = { row, col };
                    const capturesCount = this.countPossibleCaptures(row, col);
                    this.showMessage(`🎯 Capture multiple ! ${capturesCount} capture(s) possible(s) avec ce pion`, "warning");
                    this.highlightPossibleCaptures(row, col);
                } else {
                    // Fin du tour
                    this.selectedPiece = null;
                    this.mustContinueCapture = null;
                    if (move.capture) {
                        this.showMessage("✅ Capture réussie !", "info");
                    }
                    this.currentPlayer = 1 - this.currentPlayer;
                    window.gameApp.nextPlayer();
                }
            } else {
                // Mouvement invalide - afficher un message d'erreur
                this.showRuleViolationMessage(this.selectedPiece, { row, col });
            }
            
            this.clearSelection();
            if (this.selectedPiece) {
                this.board[this.selectedPiece.row][this.selectedPiece.col].classList.add('selected');
            }
        } else if (this.pieces[key] && this.pieces[key].player === this.currentPlayer) {
            // Vérifier s'il y a un pion en cours de capture multiple
            if (this.mustContinueCapture && this.mustContinueCapture.row !== row && this.mustContinueCapture.col !== col) {
                this.showMessage("⚠️ Vous devez continuer la capture multiple avec le pion sélectionné !", "warning");
                return;
            }
            
            this.selectedPiece = { row, col };
            this.board[row][col].classList.add('selected');
            this.clearMessage();
            
            // Si ce pion peut capturer, montrer les possibilités
            if (this.canCaptureFrom(row, col)) {
                this.highlightPossibleCaptures(row, col);
            }
        } else {
            // Clic sur une case vide ou un pion adverse sans sélection
            if (this.pieces[key] && this.pieces[key].player !== this.currentPlayer) {
                this.showMessage("❌ Vous ne pouvez pas sélectionner les pions adverses", "error");
            }
        }
    }

    isValidMove(from, to) {
        const dx = to.col - from.col;
        const dy = to.row - from.row;
        const key = `${to.row}-${to.col}`;
        const piece = this.pieces[`${from.row}-${from.col}`];
        
        // Si on est en capture multiple, seul ce pion peut bouger
        if (this.mustContinueCapture && 
            (from.row !== this.mustContinueCapture.row || from.col !== this.mustContinueCapture.col)) {
            return null;
        }
        
        // Vérifier que la destination est libre
        if (this.pieces[key]) return null;
        
        // Vérifier que le mouvement est en diagonale
        if (Math.abs(dx) !== Math.abs(dy)) return null;
        
        if (Math.abs(dx) === 2 && Math.abs(dy) === 2) {
            const midRow = from.row + dy / 2;
            const midCol = from.col + dx / 2;
            const midKey = `${midRow}-${midCol}`;
            const midPiece = this.pieces[midKey];
            
            if (midPiece && midPiece.player !== this.currentPlayer) {
                // Vérifier la direction selon le type de pion
                if (piece.king) {
                    // Les Dames peuvent capturer dans toutes les directions
                    return { capture: midKey };
                } else {
                    // Les pions normaux ne peuvent capturer qu'en avant
                    if (this.currentPlayer === 0 && dy > 0) {
                        return { capture: midKey };
                    }
                    if (this.currentPlayer === 1 && dy < 0) {
                        return { capture: midKey };
                    }
                }
            }
        }
        
        // Déplacement normal (1 case en diagonale)
        if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
            // Si des captures sont possibles, elles sont obligatoires
            if (this.hasCaptures()) return null;
            
            // Vérifier la direction selon le type de pion
            if (piece.king) {
                // Les Dames peuvent se déplacer dans toutes les directions
                return {};
            } else {
                // Les pions normaux ne peuvent se déplacer qu'en avant
                if (this.currentPlayer === 0 && dy > 0) return {}; // Joueur 0 va vers le bas
                if (this.currentPlayer === 1 && dy < 0) return {}; // Joueur 1 va vers le haut
            }
        }
        
        return null;
    }

    hasCaptures() {
        // Si on est en cours de capture multiple, seul ce pion compte
        if (this.mustContinueCapture) {
            return this.canCaptureFrom(this.mustContinueCapture.row, this.mustContinueCapture.col);
        }
        
        // Sinon, vérifier tous les pions du joueur actuel
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
            // Les pions normaux ne peuvent capturer qu'en avant
            if (!piece.king) {
                if (this.currentPlayer === 0 && dy < 0) continue; // Joueur 0 ne peut pas aller vers le haut
                if (this.currentPlayer === 1 && dy > 0) continue; // Joueur 1 ne peut pas aller vers le bas
            }
            
            const newRow = row + dy;
            const newCol = col + dx;
            if (newRow < 0 || newRow > 9 || newCol < 0 || newCol > 9) continue;
            
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
            this.captured[this.currentPlayer]++;
            this.renderStats();
        }
        
        if ((to.row === 9 && this.currentPlayer === 0) || (to.row === 0 && this.currentPlayer === 1)) {
            this.pieces[toKey].king = true;
        }
        
        this.board[from.row][from.col].innerHTML = '';
        this.renderPiece(to.row, to.col);
    }

    clearSelection() {
        document.querySelectorAll('.cell.selected').forEach(cell => cell.classList.remove('selected'));
        document.querySelectorAll('.cell.possible-capture').forEach(cell => cell.classList.remove('possible-capture'));
    }
    
    highlightPossibleCaptures(row, col) {
        // Effacer les anciens highlights
        document.querySelectorAll('.cell.possible-capture').forEach(cell => cell.classList.remove('possible-capture'));
        
        const dirs = [[2, 2], [2, -2], [-2, 2], [-2, -2]];
        const piece = this.pieces[`${row}-${col}`];
        
        for (let [dy, dx] of dirs) {
            // Vérifier la direction selon le type de pion
            if (!piece.king) {
                if (this.currentPlayer === 0 && dy < 0) continue;
                if (this.currentPlayer === 1 && dy > 0) continue;
            }
            
            const newRow = row + dy;
            const newCol = col + dx;
            if (newRow < 0 || newRow > 9 || newCol < 0 || newCol > 9) continue;
            
            const midRow = row + dy / 2;
            const midCol = col + dx / 2;
            const midKey = `${midRow}-${midCol}`;
            const targetKey = `${newRow}-${newCol}`;
            
            if (this.pieces[midKey] && this.pieces[midKey].player !== this.currentPlayer && !this.pieces[targetKey]) {
                // Mettre en évidence cette case comme capture possible
                this.board[newRow][newCol].classList.add('possible-capture');
            }
        }
    }
    
    showMessage(message, type = "info") {
        // Supprimer l'ancien message s'il existe
        this.clearMessage();
        
        // Créer le nouveau message
        const messageEl = document.createElement('div');
        messageEl.className = `checkers-message checkers-message-${type}`;
        messageEl.innerHTML = `
            <span class="message-text">${message}</span>
            <button class="message-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        // Insérer le message en haut du conteneur
        this.container.insertBefore(messageEl, this.container.firstChild);
        
        // Auto-suppression après 3 secondes
        setTimeout(() => {
            if (messageEl.parentElement) {
                messageEl.remove();
            }
        }, 3000);
    }
    
    clearMessage() {
        const existingMessage = this.container.querySelector('.checkers-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }
    
    showRuleViolationMessage(from, to) {
        const dx = to.col - from.col;
        const dy = to.row - from.row;
        const piece = this.pieces[`${from.row}-${from.col}`];
        const targetPiece = this.pieces[`${to.row}-${to.col}`];
        
        let message = "";
        
        // Vérifier le type d'erreur
        if (targetPiece) {
            if (targetPiece.player === this.currentPlayer) {
                message = "❌ Vous ne pouvez pas vous déplacer sur vos propres pions";
            } else {
                message = "❌ Vous ne pouvez capturer qu'en sautant par-dessus un pion adverse";
            }
        } else if (Math.abs(dx) !== Math.abs(dy)) {
            message = "❌ Les pions ne peuvent se déplacer qu'en diagonale";
        } else if (Math.abs(dx) === 1 && this.mustContinueCapture) {
            message = "⚠️ Vous devez continuer la capture multiple ! Capturez encore avec ce pion";
        } else if (Math.abs(dx) === 1 && this.hasCaptures()) {
            message = "⚠️ Les captures sont obligatoires ! Vous devez capturer un pion adverse";
        } else if (Math.abs(dx) === 1) {
            // Mouvement normal invalide - vérifier la direction
            if (!piece.king) {
                if (this.currentPlayer === 0 && dy <= 0) {
                    message = "❌ Les pions blancs ne peuvent se déplacer que vers le bas";
                } else if (this.currentPlayer === 1 && dy >= 0) {
                    message = "❌ Les pions noirs ne peuvent se déplacer que vers le haut";
                } else {
                    message = "❌ Mouvement invalide";
                }
            } else {
                message = "❌ Mouvement invalide pour cette Dame";
            }
        } else if (Math.abs(dx) === 2) {
            // Tentative de capture invalide
            const midRow = from.row + dy / 2;
            const midCol = from.col + dx / 2;
            const midPiece = this.pieces[`${midRow}-${midCol}`];
            
            if (!midPiece) {
                message = "❌ Il n'y a pas de pion à capturer sur cette diagonale";
            } else if (midPiece.player === this.currentPlayer) {
                message = "❌ Vous ne pouvez pas capturer vos propres pions";
            } else if (!piece.king && ((this.currentPlayer === 0 && dy <= 0) || (this.currentPlayer === 1 && dy >= 0))) {
                message = "❌ Les pions normaux ne peuvent capturer qu'en avant";
            } else {
                message = "❌ Capture invalide";
            }
        } else {
            message = "❌ Les pions ne peuvent se déplacer que d'1 ou 2 cases en diagonale";
        }
        
        this.showMessage(message, "error");
    }
    
    /**
     * Vérifie si un pion peut se déplacer dans une direction donnée
     * @param {Object} piece - Le pion à vérifier
     * @param {number} dy - Déplacement vertical (positif = vers le bas)
     * @returns {boolean} - True si le mouvement est autorisé
     */
    canMoveInDirection(piece, dy) {
        // Les Dames peuvent se déplacer dans toutes les directions
        if (piece.king) return true;
        
        // Les pions normaux ne peuvent se déplacer qu'en avant
        if (this.currentPlayer === 0 && dy > 0) return true; // Joueur 0 (blanc) va vers le bas
        if (this.currentPlayer === 1 && dy < 0) return true; // Joueur 1 (noir) va vers le haut
        
        return false;
    }
    
    /**
     * Compte le nombre de captures possibles depuis une position
     * @param {number} row - Ligne du pion
     * @param {number} col - Colonne du pion
     * @returns {number} - Nombre de captures possibles
     */
    countPossibleCaptures(row, col) {
        const dirs = [[2, 2], [2, -2], [-2, 2], [-2, -2]];
        const piece = this.pieces[`${row}-${col}`];
        let count = 0;
        
        for (let [dy, dx] of dirs) {
            if (!piece.king) {
                if (this.currentPlayer === 0 && dy < 0) continue;
                if (this.currentPlayer === 1 && dy > 0) continue;
            }
            
            const newRow = row + dy;
            const newCol = col + dx;
            if (newRow < 0 || newRow > 9 || newCol < 0 || newCol > 9) continue;
            
            const midRow = row + dy / 2;
            const midCol = col + dx / 2;
            const midKey = `${midRow}-${midCol}`;
            const targetKey = `${newRow}-${newCol}`;
            
            if (this.pieces[midKey] && this.pieces[midKey].player !== this.currentPlayer && !this.pieces[targetKey]) {
                count++;
            }
        }
        return count;
    }
}
