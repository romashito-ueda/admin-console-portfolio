import { apiClient } from '../../shared/api/apiClient';
import type { UpdateUserInput, User, UsersListResponse, UsersQueryParams } from './types';

export const fetchUsers = async (params: UsersQueryParams) => {
  const search = new URLSearchParams({
    q: params.q,
    page: String(params.page),
    pageSize: String(params.pageSize),
    sortBy: params.sortBy,
    sortDir: params.sortDir,
  });

  return apiClient<UsersListResponse>(`/api/users?${search.toString()}`);
};

export const fetchUserById = async (id: string) => {
  return apiClient<User>(`/api/users/${id}`);
};

export const updateUserById = async (id: string, input: UpdateUserInput) => {
  return apiClient<User>(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
};
