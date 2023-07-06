/**
 * A type that represents an optional value.
 * It is similar to Rust's `Option<T>` type.
 * some: a value of type T is present
 * none: when value is type null or undefined
 * @example
 * const optional: Optional<number> = Optional.some(123);
 * const result: number = optional.when({
 * some: (value) => value + 1,
 * none: () => 0,
 * });
 * @example
 * const optional: Optional<number> = Optional.some(123);
 * const result: number = optional.unwrap(); // 123
 */
export class Optional<T> {
  private readonly value: T | null | undefined;

  private constructor(value: T | null | undefined) {
    this.value = value;
  }

  static some<T>(value: NonNullable<T>): Optional<T> {
    return new Optional(value);
  }

  static none<T>(): Optional<T> {
    return new Optional<T>(null);
  }

  /**
   * Returns the contained some or none
   * @param some
   * @param none
   * if you use the method with statement, you must set the same type for some and none.
   * @example
   * const optional: Optional<number> = Optional.some(123);
   * const result: number = optional.when({
   *  some: (value) => value + 1,
   *  none: () => 0,
   *  });
   */
  when<U>({
    some,
    none,
  }: {
    some: (value: NonNullable<T>) => U;
    none: () => U;
  }): U {
    if (this.value === null || this.value === undefined) {
      return none();
    } else {
      return some(this.value as NonNullable<T>);
    }
  }

  /**
   * if this is a some value, return the value,
   * otherwise throw an error
   * recommended when you are sure that this is a some value, use this method
   */
  unwrap(): NonNullable<T> {
    if (this.value === null || this.value === undefined) {
      throw new Error('Cannot unwrap a none value');
    } else {
      return this.value as NonNullable<T>;
    }
  }

  /**
   * if this is a some value, return true
   */
  is_some(): boolean {
    return this.value !== null && this.value !== undefined;
  }

  /**
   * if this is a none value, return true
   */
  is_none(): boolean {
    return this.value === null || this.value === undefined;
  }
}
