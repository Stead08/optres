import { Result } from "../src/result";
import { fetchWithResult } from "../src";

test("Result.ok", () => {
  const value = Result.ok(123);
  const result = value.ok();
  expect(result).toEqual(123);
});

test("Result.err", () => {
  const value = Result.err(new Error("error"));
  const error = value.error();
  expect(error).toEqual(new Error("error"));
});

test("Result.ok but result is error", () => {
  const value = Result.ok(123);
  const error = value.error();
  expect(error).toEqual(null);
});

test("Result.err but result is ok", () => {
  const value = Result.err(new Error("error"));
  const result = value.ok();
  expect(result).toEqual(null);
});

test("Result.match ok", () => {
  const value = Result.ok(123);
  value.when({
    ok: (value) => expect(value).toEqual(123),
    err: (error) => expect(error).toEqual(new Error("error")),
  });
});

test("Result.match err", () => {
  const value = Result.err(new Error("error"));
  value.when({
    ok: (value) => expect(value).toEqual(123),
    err: (error) => expect(error).toEqual(new Error("error")),
  });
});

test("Result.unwrap ok", () => {
  const value = Result.ok(123);
  const result = value.unwrap();
  expect(result).toEqual(123);
});

test("Result.unwrap err", () => {
  const value = Result.err(new Error("error"));
  expect(() => value.unwrap()).toThrow(new Error("error"));
});

test("fetch_with_result ok", async () => {
  const value = await fetchWithResult<JSON>(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  const result = value.ok();
  expect(result).toEqual({
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  });
});

test("fetch_with_result err", async () => {
  const value = await fetchWithResult<JSON>(
    "https://jsonplaceholder.typicode.com/todos/9999"
  );
  const error = value.error();
  expect(error).toEqual(new Error("HTTP error, status = 404"));
});

test("fetch_with_result with match and return ok value ", async () => {
  const value = await fetchWithResult<JSON>(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  value.when({
    ok: (value) =>
      expect(value).toEqual({
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      }),
    err: (error) => expect(error).toEqual(new Error("error")),
  });
});

test("fetch_with_result with match and return err value ", async () => {
  const value = await fetchWithResult<JSON>(
    "https://jsonplaceholder.typicode.com/todos/9999"
  );
  value.when({
    ok: (value) =>
      expect(value).toEqual({
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      }),
    err: (error) =>
      expect(error).toEqual(new Error("HTTP error, status = 404")),
  });
});
