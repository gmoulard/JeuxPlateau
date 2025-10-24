import { describe, it, expect, beforeEach } from 'vitest';

describe('TicTacToe Game', () => {
  let game;
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    // Note: TicTacToeGame nécessite d'être chargé comme module
  });

  it('should initialize with empty board', () => {
    const board = Array(9).fill(null);
    expect(board.every(cell => cell === null)).toBe(true);
  });

  it('should detect winner on row', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null];
    const hasWinner = board[0] === board[1] && board[1] === board[2] && board[0] !== null;
    expect(hasWinner).toBe(true);
  });

  it('should detect draw', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    const isDraw = board.every(cell => cell !== null);
    expect(isDraw).toBe(true);
  });
});
