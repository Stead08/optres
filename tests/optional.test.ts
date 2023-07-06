import { expect, it, describe } from 'vitest';
import { Optional } from '../src/optional';
import { primitive } from './types';
import { object } from './types';

// primitive types test
describe('Optional', () => {
  it('should create a some primitive value', () => {
    primitive
      .filter((value) => value !== null && value !== undefined)
      .map((value) => {
        const optional = Optional.some(value);
        const result = optional.unwrap();
        expect(result).toEqual(value);
      });
  });
  it('should create a none primitive value', () => {
    primitive
      .filter((value) => value === null || value === undefined)
      .map((value) => {
        const optional = Optional.some(value);
        const result = optional.is_none();
        expect(result).toEqual(true);
      });
  });
  it('should create a some object value', () => {
    object.map((value) => {
      const optional = Optional.some(value);
      const result = optional.unwrap();
      expect(result).toEqual(value);
    });
  });
});
