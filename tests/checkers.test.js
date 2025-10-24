import { describe, it, expect } from 'vitest';

describe('Checkers Game', () => {
  it('should validate diagonal moves', () => {
    const isValidDiagonal = (from, to) => {
      const dx = Math.abs(to.col - from.col);
      const dy = Math.abs(to.row - from.row);
      return dx === dy && dx > 0;
    };
    
    expect(isValidDiagonal({row: 0, col: 0}, {row: 1, col: 1})).toBe(true);
    expect(isValidDiagonal({row: 0, col: 0}, {row: 1, col: 0})).toBe(false);
  });

  it('should detect capture move', () => {
    const isCaptureMove = (from, to) => {
      const dx = Math.abs(to.col - from.col);
      const dy = Math.abs(to.row - from.row);
      return dx === 2 && dy === 2;
    };
    
    expect(isCaptureMove({row: 0, col: 0}, {row: 2, col: 2})).toBe(true);
    expect(isCaptureMove({row: 0, col: 0}, {row: 1, col: 1})).toBe(false);
  });
});
