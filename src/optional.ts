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

  unwrap(): NonNullable<T> {
    if (this.value === null || this.value === undefined) {
      throw new Error("Cannot unwrap a none value");
    } else {
      return this.value as NonNullable<T>;
    }
  }

  is_some(): boolean {
    return this.value !== null && this.value !== undefined;
  }

  is_none(): boolean {
    return this.value === null || this.value === undefined;
  }
}
