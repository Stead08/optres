import { Result } from './result';

/**
 * Fetch with Result
 * @param url
 */
export async function fetchWithResult(
  url: URL
): Promise<Result<Response, Error>> {
  try {
    const res = await fetch(url);
    return Result.ok(res);
  } catch (err) {
    return Result.err(err as Error);
  }
}
