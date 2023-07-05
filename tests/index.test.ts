import { fetchWithResult } from '../src';
import { describe, it, expect } from 'vitest';

describe('fetchWithResult', () => {
  it('should return Result', async () => {
    const value = await fetchWithResult(new URL('https://www.google.com'));
    expect(value).toEqual({
      value: expect.any(Response),
    });
  });
});
