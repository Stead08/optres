import { Result } from './result';
export { Optional } from './optional';
export { Result } from './result';

/**
 * use fetch api and return Result<Response, Error>
 * @param url
 * @returns Result<Response, Error>
 * if the response.ok(), return Ok(Response)
 * otherwise, return Err(Error)
 * if fetch() throws an error, return Err(Error)
 *
 * @example
 * const response = await fetchWithResult(new URL('https://www.google.com'));
 * response.when({
 * ok: (res) => {
 *   // do something
 * }
 * err: (err) => console.log(err),
 * });
 *
 */
export async function fetchWithResult(
  url: URL
): Promise<Result<Response, Error>> {
  try {
    const res = await fetch(url);
    if (res.ok) {
      return Result.ok(res);
    } else {
      return Result.err(new Error(res.statusText));
    }
  } catch (err) {
    return Result.err(err as Error);
  }
}
