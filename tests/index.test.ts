import { fetchWithResult } from '../src';
import { describe, it, expect } from 'vitest';

describe('fetchWithResult', () => {
  it('should return Ok', async () => {
    const response = await fetchWithResult(new URL('https://www.google.com'));
    const result = response.ok();
    expect(result).toEqual(expect.any(Response));
  });
  it('should return Err', async () => {
    const response = await fetchWithResult(
      new URL('https://www.google.com/404')
    );
    const result = response.error();
    expect(result).toEqual(expect.any(Error));
  });
});
