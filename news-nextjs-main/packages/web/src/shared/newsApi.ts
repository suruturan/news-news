import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewsResponse } from '../entities/news/types';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api' // Используем свой API route
  }),
  endpoints: (build) => ({
    topHeadlines: build.query<NewsResponse, { page?: number; q?: string }>({
      query: ({ page = 1, q = '' }) => {
        const params = new URLSearchParams({
          page: page.toString(),
        });
        
        if (q) {
          params.append('q', q);
        }

        return `/news?${params.toString()}`;
      },
    }),
  }),
});

export const { useTopHeadlinesQuery } = newsApi;
