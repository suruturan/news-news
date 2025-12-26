import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/admin",
  }),

  tagTypes: ["News"],

  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => "/news",
      providesTags: ["News"],
    }),

    createNews: builder.mutation({
      query: (body) => ({
        url: "/news",
        method: "POST",
        body,
      }),
      invalidatesTags: ["News"],
    }),

    updateNews: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/news/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["News"],
    }),

    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = adminApi;
