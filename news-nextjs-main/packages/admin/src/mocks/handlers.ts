import { http, HttpResponse } from 'msw';

let newsData = [
  {
    id: 1,
    title: "Первая новость",
    description: "Описание первой новости",
    author: "Админ",
    createdAt: "2024-01-15",
    urlToImage: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    title: "Вторая новость",
    description: "Описание второй новости",
    author: "Редактор",
    createdAt: "2024-01-16",
    urlToImage: "https://via.placeholder.com/150"
  }
];

let nextId = 3;

export const handlers = [
  // GET /admin/news
  http.get('http://localhost:5000/admin/news', () => {
    return HttpResponse.json(newsData);
  }),

  // POST /admin/news
  http.post('http://localhost:5000/admin/news', async ({ request }) => {
    const body = await request.json() as any;
    const newNews = {
      id: nextId++,
      ...body,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    newsData.push(newNews);
    return HttpResponse.json(newNews, { status: 201 });
  }),

  // PATCH /admin/news/:id
  http.patch('http://localhost:5000/admin/news/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json() as any;
    const index = newsData.findIndex(n => n.id === Number(id));
    
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    newsData[index] = { ...newsData[index], ...body };
    return HttpResponse.json(newsData[index]);
  }),

  // DELETE /admin/news/:id
  http.delete('http://localhost:5000/admin/news/:id', ({ params }) => {
    const { id } = params;
    newsData = newsData.filter(n => n.id !== Number(id));
    return new HttpResponse(null, { status: 204 });
  })
];
