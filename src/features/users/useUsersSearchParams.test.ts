import { describe, expect, it } from 'vitest';
import { parseUsersSearchParams } from './useUsersSearchParams';

describe('parseUsersSearchParams', () => {
  it('不正値をデフォルトへフォールバックする', () => {
    const params = new URLSearchParams({
      page: '-2',
      pageSize: '0',
      sortBy: 'foo',
      sortDir: 'bar',
    });

    expect(parseUsersSearchParams(params)).toEqual({
      q: '',
      page: 1,
      pageSize: 10,
      sortBy: 'createdAt',
      sortDir: 'desc',
    });
  });
});
