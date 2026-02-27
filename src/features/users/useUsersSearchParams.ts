import { useSearchParams } from 'react-router-dom';
import type { UsersQueryParams } from './types';

const defaults: UsersQueryParams = {
  q: '',
  page: 1,
  pageSize: 10,
  sortBy: 'createdAt',
  sortDir: 'desc',
};

export const parseUsersSearchParams = (searchParams: URLSearchParams): UsersQueryParams => {
  const page = Number(searchParams.get('page') ?? defaults.page);
  const pageSize = Number(searchParams.get('pageSize') ?? defaults.pageSize);
  const sortBy = searchParams.get('sortBy');
  const sortDir = searchParams.get('sortDir');

  return {
    q: searchParams.get('q') ?? defaults.q,
    page: Number.isNaN(page) || page < 1 ? defaults.page : page,
    pageSize: Number.isNaN(pageSize) || pageSize < 1 ? defaults.pageSize : pageSize,
    sortBy: sortBy === 'name' || sortBy === 'email' || sortBy === 'createdAt' ? sortBy : defaults.sortBy,
    sortDir: sortDir === 'asc' || sortDir === 'desc' ? sortDir : defaults.sortDir,
  };
};

export const useUsersSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = parseUsersSearchParams(searchParams);

  const updateParams = (nextParams: Partial<UsersQueryParams>) => {
    const merged = { ...params, ...nextParams };
    const nextSearchParams = new URLSearchParams();
    nextSearchParams.set('q', merged.q);
    nextSearchParams.set('page', String(merged.page));
    nextSearchParams.set('pageSize', String(merged.pageSize));
    nextSearchParams.set('sortBy', merged.sortBy);
    nextSearchParams.set('sortDir', merged.sortDir);
    setSearchParams(nextSearchParams, { replace: true });
  };

  return { params, updateParams };
};
