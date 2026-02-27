import { http, HttpResponse } from 'msw';
import { usersDb } from './data';

export const handlers = [
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url);
    const q = (url.searchParams.get('q') ?? '').toLowerCase();
    const page = Number(url.searchParams.get('page') ?? 1);
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10);
    const sortBy = url.searchParams.get('sortBy') ?? 'createdAt';
    const sortDir = url.searchParams.get('sortDir') ?? 'desc';

    const filtered = usersDb.filter((user) => user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q));

    const sorted = [...filtered].sort((a, b) => {
      const left = a[sortBy as 'name' | 'email' | 'createdAt'];
      const right = b[sortBy as 'name' | 'email' | 'createdAt'];
      const comp = left > right ? 1 : left < right ? -1 : 0;
      return sortDir === 'asc' ? comp : -comp;
    });

    const start = (page - 1) * pageSize;
    const data = sorted.slice(start, start + pageSize);

    return HttpResponse.json({ data, total: filtered.length });
  }),

  http.get('/api/users/:id', ({ params }) => {
    const user = usersDb.find((item) => item.id === params.id);
    if (!user) {
      return HttpResponse.json({ message: 'ユーザーが見つかりません。' }, { status: 404 });
    }
    return HttpResponse.json(user);
  }),

  http.patch('/api/users/:id', async ({ params, request }) => {
    const index = usersDb.findIndex((item) => item.id === params.id);
    if (index < 0) {
      return HttpResponse.json({ message: 'ユーザーが見つかりません。' }, { status: 404 });
    }

    const payload = (await request.json()) as {
      name: string;
      email: string;
      role: 'admin' | 'editor' | 'viewer';
      status: 'active' | 'inactive';
    };

    if (!payload.email.endsWith('@example.com')) {
      return HttpResponse.json(
        {
          message: '社内メール（@example.com）のみ設定できます。',
          fieldErrors: { email: '許可されていないドメインです。' },
        },
        { status: 400 },
      );
    }

    usersDb[index] = { ...usersDb[index], ...payload };
    return HttpResponse.json(usersDb[index]);
  }),
];
