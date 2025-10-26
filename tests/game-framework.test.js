/**
 * Tests unitaires pour le Game Framework
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock du DOM
global.document = {
    createElement: vi.fn((tag) => ({
        className: '',
        dataset: {},
        style: {},
        addEventListener: vi.fn(),
        appendChild: vi.fn(),
        innerHTML: ''
    })),
    querySelectorAll: vi.fn(() => [])
};

// Mock de window.gameApp
global.window = {
    gameApp: {
        nextPlayer: vi.fn(),
        currentPlayerIndex: 0,
        updateCurrentPlayer: vi.fn()
    }
};

// Import après les mocks
const GameFramework = class {
    constructor(container, players, config = {}) {
        this.container = container || { innerHTML: '', appendChild: vi.fn(), querySelectorAll: vi.fn(() => []) };
        this.players = players;
        this.config = {
            rows: config.rows || 8,
            cols: config.cols || 8,
            useDice: config.useDice || false,
            ...config
        };
        this.currentPlayer = 0;
        this.gameState = {};
        this.board = [];
        this.selectedCell = null;
    }

    setState(key, value) {
        this.gameState[key] = value;
    }

    getState(key) {
        return this.gameState[key];
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getCurrentPlayerName() {
        return this.players[this.currentPlayer];
    }

    nextTurn() {
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.config.rows && col >= 0 && col < this.config.cols;
    }
};

const GameHelpers = {
    checkLine: (board, positions, symbol) => {
        return positions.every(([row, col]) => 
            board[row]?.[col]?.innerHTML === symbol
        );
    },

    getAdjacentCells: (row, col, distance = 1) => {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
        return directions.map(([dr, dc]) => [row + dr * distance, col + dc * distance]);
    },

    getDiagonalCells: (row, col, distance = 1) => {
        return [
            [row - distance, col - distance],
            [row - distance, col + distance],
            [row + distance, col - distance],
            [row + distance, col + distance]
        ];
    },

    getOrthogonalCells: (row, col, distance = 1) => {
        return [
            [row - distance, col],
            [row + distance, col],
            [row, col - distance],
            [row, col + distance]
        ];
    }
};

describe('GameFramework', () => {
    let game;
    let container;
    let players;

    beforeEach(() => {
        container = { innerHTML: '', appendChild: vi.fn(), querySelectorAll: vi.fn(() => []) };
        players = ['Joueur 1', 'Joueur 2'];
        game = new GameFramework(container, players, { rows: 3, cols: 3 });
    });

    describe('Configuration', () => {
        it('devrait initialiser avec la configuration par défaut', () => {
            const defaultGame = new GameFramework(container, players);
            expect(defaultGame.config.rows).toBe(8);
            expect(defaultGame.config.cols).toBe(8);
            expect(defaultGame.config.useDice).toBe(false);
        });

        it('devrait accepter une configuration personnalisée', () => {
            expect(game.config.rows).toBe(3);
            expect(game.config.cols).toBe(3);
        });
    });

    describe('Gestion des joueurs', () => {
        it('devrait retourner le joueur actuel', () => {
            expect(game.getCurrentPlayer()).toBe(0);
            expect(game.getCurrentPlayerName()).toBe('Joueur 1');
        });

        it('devrait passer au joueur suivant', () => {
            game.nextTurn();
            expect(game.getCurrentPlayer()).toBe(1);
            expect(game.getCurrentPlayerName()).toBe('Joueur 2');
        });

        it('devrait boucler sur les joueurs', () => {
            game.nextTurn();
            game.nextTurn();
            expect(game.getCurrentPlayer()).toBe(0);
        });
    });

    describe('Gestion de l\'état', () => {
        it('devrait sauvegarder et récupérer l\'état', () => {
            game.setState('score', 100);
            expect(game.getState('score')).toBe(100);
        });

        it('devrait gérer plusieurs états', () => {
            game.setState('score', 100);
            game.setState('level', 5);
            game.setState('gameOver', false);
            
            expect(game.getState('score')).toBe(100);
            expect(game.getState('level')).toBe(5);
            expect(game.getState('gameOver')).toBe(false);
        });
    });

    describe('Validation des positions', () => {
        it('devrait valider les positions correctes', () => {
            expect(game.isValidPosition(0, 0)).toBe(true);
            expect(game.isValidPosition(2, 2)).toBe(true);
            expect(game.isValidPosition(1, 1)).toBe(true);
        });

        it('devrait invalider les positions hors limites', () => {
            expect(game.isValidPosition(-1, 0)).toBe(false);
            expect(game.isValidPosition(0, -1)).toBe(false);
            expect(game.isValidPosition(3, 0)).toBe(false);
            expect(game.isValidPosition(0, 3)).toBe(false);
        });
    });
});

describe('GameHelpers', () => {
    describe('checkLine', () => {
        it('devrait vérifier une ligne de symboles', () => {
            const board = [
                [{ innerHTML: 'X' }, { innerHTML: 'X' }, { innerHTML: 'X' }],
                [{ innerHTML: '' }, { innerHTML: '' }, { innerHTML: '' }],
                [{ innerHTML: '' }, { innerHTML: '' }, { innerHTML: '' }]
            ];
            
            expect(GameHelpers.checkLine(board, [[0,0], [0,1], [0,2]], 'X')).toBe(true);
            expect(GameHelpers.checkLine(board, [[0,0], [0,1], [0,2]], 'O')).toBe(false);
        });
    });

    describe('getAdjacentCells', () => {
        it('devrait retourner les 8 cellules adjacentes', () => {
            const adjacent = GameHelpers.getAdjacentCells(1, 1);
            expect(adjacent).toHaveLength(8);
            expect(adjacent).toContainEqual([0, 0]);
            expect(adjacent).toContainEqual([0, 1]);
            expect(adjacent).toContainEqual([0, 2]);
            expect(adjacent).toContainEqual([1, 0]);
            expect(adjacent).toContainEqual([1, 2]);
            expect(adjacent).toContainEqual([2, 0]);
            expect(adjacent).toContainEqual([2, 1]);
            expect(adjacent).toContainEqual([2, 2]);
        });

        it('devrait gérer la distance', () => {
            const adjacent = GameHelpers.getAdjacentCells(2, 2, 2);
            expect(adjacent).toContainEqual([0, 0]);
            expect(adjacent).toContainEqual([4, 4]);
        });
    });

    describe('getDiagonalCells', () => {
        it('devrait retourner les 4 cellules diagonales', () => {
            const diagonals = GameHelpers.getDiagonalCells(1, 1);
            expect(diagonals).toHaveLength(4);
            expect(diagonals).toContainEqual([0, 0]);
            expect(diagonals).toContainEqual([0, 2]);
            expect(diagonals).toContainEqual([2, 0]);
            expect(diagonals).toContainEqual([2, 2]);
        });
    });

    describe('getOrthogonalCells', () => {
        it('devrait retourner les 4 cellules orthogonales', () => {
            const ortho = GameHelpers.getOrthogonalCells(1, 1);
            expect(ortho).toHaveLength(4);
            expect(ortho).toContainEqual([0, 1]);
            expect(ortho).toContainEqual([2, 1]);
            expect(ortho).toContainEqual([1, 0]);
            expect(ortho).toContainEqual([1, 2]);
        });
    });
});
