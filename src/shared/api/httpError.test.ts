import { describe, expect, it } from 'vitest';
import { toHttpError } from './httpError';

describe('toHttpError', () => {
  it('レスポンスJSONからエラー情報を取り出す', async () => {
    const response = new Response(JSON.stringify({ message: 'bad request' }), {
      status: 400,
      statusText: 'Bad Request',
    });

    const error = await toHttpError(response);
    expect(error.status).toBe(400);
    expect(error.message).toBe('bad request');
  });
});
