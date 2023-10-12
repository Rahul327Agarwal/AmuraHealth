/**
 * Takes in a signal which then can be used to abort the promise if needed
 *
 * @example
 * const controller = new AbortController();
 * const data = await abortablePromise(getData(), controller.signal);
 * // During useEffect cleanup or when needed
 * controller.abort();
 *
 *
 * @param promise
 * @param singal The AbortSignal (optional, if not provided, the promise behaves as usual)
 * @returns
 */
export async function abortablePromise<T extends any>(promise: Promise<T>, singal?: AbortSignal) {
  if (!singal) return promise;

  const data = Promise.race([
    promise,
    new Promise((_, reject) => singal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))),
  ]);

  return data as Promise<T>;
}
