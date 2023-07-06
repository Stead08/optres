import { describe, it, expect } from 'vitest';
import { Result } from '../src/result';
import { primitive } from './types';

//primitive types test
describe('Result.ok', () => {
  it('should create an ok result', () => {
    primitive.map((value) => {
      const result = Result.ok(value);
      const ok_value = result.ok();
      expect(ok_value).toEqual(value);
    });
  });
  it('should create an err result', () => {
    const result = Result.err(new Error('error'));
    const err_value = result.error();
    expect(err_value).toEqual(expect.any(Error));
  });
});
