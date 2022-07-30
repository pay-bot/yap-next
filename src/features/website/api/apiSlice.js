import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://yapcms.herokuapp.com/api' }),
  tagTypes: ['Page'],
  endpoints: (builder) => ({
    themes: builder.query({
      query: () => '/themes',
      providesTags: ['Theme'],
    }),
    headers: builder.query({
      query: () => '/menus/header',
      providesTags: ['Header'],
    }),
    footers: builder.query({
      query: () => '/menus/footer',
      providesTags: ['Footer'],
    }),
    pages: builder.query({
      query: () => '/pages/1/sections',
      providesTags: ['Page'],
    }),
    articles: builder.query({
      query: () => '/articles',
      providesTags: ['Article'],
    }),
    article: builder.query({
      query: (slug) => `/articles/${slug}`,
      providesTags: ['Article'],
    }),
    texts: builder.query({
      query: () => '/texts',
      providesTags: ['Text'],
    }),
  }),
});

export const { usePagesQuery, useThemesQuery, useFootersQuery, useHeadersQuery, useArticlesQuery, useArticleQuery, useTextsQuery } = Api;
