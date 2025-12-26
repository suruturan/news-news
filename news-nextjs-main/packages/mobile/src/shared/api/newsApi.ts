import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2",
    prepareHeaders: (headers) => {
      headers.set("X-Api-Key", process.env.NEXT_PUBLIC_NEWS_API_KEY);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTopHeadlines: builder.query({
      query: ({ page = 1 }) => `/top-headlines?country=us&page=${page}`,
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
