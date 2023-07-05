import { describe, it, expect } from 'vitest';
import { Result } from '../src/result';

describe('Result.ok', () => {
  it('should return Result', () => {
    const value = Result.ok(123);
    expect(value).toEqual({
      value: 123,
    });
  });
});
