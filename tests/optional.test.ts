import { describe, it, expect } from 'vitest';
import { Optional } from '../src/optional';

describe('Optional.some', () => {
  it('should return Optional', () => {
    const value = Optional.some(123);
    expect(value).toEqual({
      value: 123,
    });
  });
});
