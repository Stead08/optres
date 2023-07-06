# OPT-RES
Error handling like rust in typescript

# Description
This library provides a way to handle errors like rust in typescript.  
There is a npm package with the same name, but I decided on the name of the package without knowing it existed. sorry!

I referenced these in the implementation of the library:
- 【TypeScript】Result型を定義してエラーハンドリングを楽にする
https://zenn.dev/junki555/articles/4ab67fc78ce64c
- Option in std::option - Rust  
https://doc.rust-lang.org/std/option/enum.Option.html
- Result in std::result - Rust  
  https://doc.rust-lang.org/std/result/enum.Result.html
## Usage
```typescript
import {fetchWithResult} from "@stead08/optres";
import {Optional} from "@stead08/optres/dist/optional";
import {Result} from "@stead08/optres/dist/result";

// divide function returns Optional<number>
function divide (a: number, b: number): Optional<number> {
    if (b === 0) {
        return Optional.none();
    }
    return Optional.some(a / b);
}

function test_divide_by_zero () {
    const result = divide(1, 0);
    result.when({
        some: (value) => console.log(value),
        none: () => console.log('error')
    });
}
test_divide_by_zero(); // error

// Using Optional<T> is useful when you want to return a value that may be null or undefined.
// you can assure that the value is not null or undefined by using Optional<T> with unwrap() method.
// Example:
const optional: Optional<number> = Optional.some(123);
const result: number = optional.unwrap();

// using when() method is useful when you want to handle both some and none cases.
// Example:
const optional2: Optional<number> = Optional.some(123);
const result2: number = optional2.when({
    some: (value) => value + 1,
    none: () => 0,
});

// you can also use Result<T, E> instead of Optional<T> for better error handling.
// Result<T, E> is a type that represents either success (Ok) or failure (Err).
// Result<T, E> is often used for error handling.
// Example:
function divide_returns_result (a: number, b: number): Result<number, Error> {
    if (b === 0) {
        return Result.err(new Error('divide by zero'));
    }
    return Result.ok(a / b);
}

function test_divide_by_zero_returns_result () {
    const result = divide_returns_result(1, 0);
    result.when({
        ok: (value) => console.log(value),
        err: (err) => console.log(err)
    });
}

test_divide_by_zero_returns_result(); // Error: divide by zero

// fetchWithResult returns Result<Response, Error>
async function fetchWithResultExample () {
    const response = await fetchWithResult(new URL('https://www.google.com'));
    const result = response.ok();
    console.log(result);
}
```

