import type { User } from '../features/users/types';

export const usersDb: User[] = Array.from({ length: 35 }).map((_, index) => ({
  id: String(index + 1),
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: index % 3 === 0 ? 'admin' : index % 3 === 1 ? 'editor' : 'viewer',
  status: index % 2 === 0 ? 'active' : 'inactive',
  createdAt: new Date(Date.now() - index * 86_400_000).toISOString().slice(0, 10),
}));
