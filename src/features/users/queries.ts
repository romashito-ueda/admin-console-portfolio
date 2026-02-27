import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User, UsersQueryParams } from './types';
import { fetchUserById, fetchUsers, updateUserById } from './api';

export const usersKeys = {
  all: ['users'] as const,
  list: (params: UsersQueryParams) => [...usersKeys.all, 'list', params] as const,
  detail: (id: string) => [...usersKeys.all, 'detail', id] as const,
};

export const useUsersQuery = (params: UsersQueryParams) => {
  return useQuery({
    queryKey: usersKeys.list(params),
    queryFn: () => fetchUsers(params),
  });
};

export const useUserDetailQuery = (id?: string) => {
  return useQuery({
    queryKey: usersKeys.detail(id ?? ''),
    queryFn: () => fetchUserById(id ?? ''),
    enabled: Boolean(id),
  });
};

export const useUpdateUserMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof updateUserById>[1]) => updateUserById(id, payload),
    onMutate: async (nextUser) => {
      await queryClient.cancelQueries({ queryKey: usersKeys.detail(id) });
      const previousDetail = queryClient.getQueryData<User>(usersKeys.detail(id));
      if (previousDetail) {
        queryClient.setQueryData<User>(usersKeys.detail(id), {
          ...previousDetail,
          ...nextUser,
        });
      }

      return { previousDetail };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(usersKeys.detail(id), context.previousDetail);
      }
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(usersKeys.detail(id), updated);
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
};
