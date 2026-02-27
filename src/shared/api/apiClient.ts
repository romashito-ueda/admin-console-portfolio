import { HttpError, toHttpError } from './httpError';

export const apiClient = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(input, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...init,
    });
  } catch {
    throw new HttpError(0, 'ネットワークエラーが発生しました。');
  }

  if (!response.ok) {
    throw await toHttpError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};
