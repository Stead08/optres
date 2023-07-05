import { Optional } from "../src/optional";

test("Optional.some with method when", () => {
  const value = Optional.some(123);
  const result = value.when({
    some: (value) => value,
    none: () => 0,
  });
  expect(result).toEqual(123);
});

test("Optional.none with method when", () => {
  const value: Optional<number> = Optional.none();
  const result = value.when({
    some: (value) => value,
    none: () => 0,
  });
  expect(result).toEqual(0);
});

test("Optional.some with method is_some", () => {
  const value = Optional.some(123);
  const result = value.is_some();
  expect(result).toEqual(true);
});

test("Optional.none with method is_some", () => {
  const value: Optional<number> = Optional.none();
  const result = value.is_some();
  expect(result).toEqual(false);
});

test("Optional.some with method is_none", () => {
  const value = Optional.some(123);
  const result = value.is_none();
  expect(result).toEqual(false);
});

test("Optional.none with method is_none", () => {
  const value: Optional<number> = Optional.none();
  const result = value.is_none();
  expect(result).toEqual(true);
});

test("Optional.unwrap success", () => {
  const value = Optional.some(123);
  const result = value.unwrap();
  expect(result).toEqual(123);
});

test("Optional.unwrap failure", () => {
  const value = Optional.none();
  expect(() => value.unwrap()).toThrow(new Error("Cannot unwrap a none value"));
});
