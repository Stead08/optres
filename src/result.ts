export class Result<T, E extends Error> {
  private readonly value: T | E;

  private constructor(value: T | E) {
    this.value = value;
  }

  static ok<T>(value: T): Result<T, Error> {
    return new Result<T, Error>(value);
  }

  static err<E extends Error>(error: E): Result<never, E> {
    return new Result<never, E>(error);
  }

  when<U>({ ok, err }: { ok: (data: T) => U; err: (error: E) => U }): U {
    if (this.value instanceof Error) {
      return err(this.value);
    } else {
      return ok(this.value);
    }
  }

  ok(): T | null {
    if (this.value instanceof Error) {
      return null;
    } else {
      return this.value;
    }
  }

  error(): E | null {
    if (this.value instanceof Error) {
      return this.value as E;
    } else {
      return null;
    }
  }

  unwrap(): T {
    if (this.value instanceof Error) {
      throw this.value;
    } else {
      return this.value;
    }
  }
}
