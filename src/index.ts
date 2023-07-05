import { Result } from "./result";
export async function fetchWithResult<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<Result<T, Error>> {
  try {
    const response = await fetch(input, init);

    if (!response.ok) {
      return Result.err(new Error(`HTTP error, status = ${response.status}`));
    }

    const data: T = await response.json();
    return Result.ok(data);
  } catch (error) {
    return Result.err(
      error instanceof Error ? error : new Error(String(error))
    );
  }
}
