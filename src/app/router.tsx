import { createBrowserRouter, Navigate } from 'react-router-dom';
import { UsersPage } from '../pages/UsersPage';
import { UserDetailPage } from '../pages/UserDetailPage';
import { UserEditPage } from '../pages/UserEditPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/users" replace /> },
  { path: '/users', element: <UsersPage /> },
  { path: '/users/:id', element: <UserDetailPage /> },
  { path: '/users/:id/edit', element: <UserEditPage /> },
]);
