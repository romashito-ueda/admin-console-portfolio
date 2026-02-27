export type UserRole = 'admin' | 'editor' | 'viewer';
export type UserStatus = 'active' | 'inactive';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

export type UsersQueryParams = {
  q: string;
  page: number;
  pageSize: number;
  sortBy: 'name' | 'email' | 'createdAt';
  sortDir: 'asc' | 'desc';
};

export type UsersListResponse = {
  data: User[];
  total: number;
};

export type UpdateUserInput = Pick<User, 'name' | 'email' | 'role' | 'status'>;
