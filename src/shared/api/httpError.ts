export type ErrorBody = {
  message: string;
  fieldErrors?: Record<string, string>;
};

export class HttpError extends Error {
  public status: number;

  public body?: ErrorBody;

  public constructor(status: number, message: string, body?: ErrorBody) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

export const toHttpError = async (response: Response) => {
  let body: ErrorBody | undefined;

  try {
    body = (await response.json()) as ErrorBody;
  } catch {
    body = undefined;
  }

  return new HttpError(response.status, body?.message ?? response.statusText, body);
};
