import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['authApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://yap-admin.herokuapp.com/api/',
    // baseUrl: '${process.env.REACT_APP_API_URL}/',
    prepareHeaders: (headers, { getState }) => {
      const {authApi: { adminToken },} = getState();
      console.log('states: ', adminToken);
      headers.set('authorization', adminToken || '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPengguna: builder.query({
      query: () => ({
        url: 'pengguna',
        method: 'GET',
      }),
      providesTags: ['books'],
    }),
    register: builder.mutation({
      query: (loginData) => ({
        headers: { 'Content-type': 'application/json' },
        url: 'register',
        method: 'POST',
        body: loginData,
      }),
      invalidatesTags: ['books'],
    }),
    login: builder.mutation({
      query: (auth) => ({
        headers: { 'Content-type': 'application/json' },
        url: 'login',
        method: 'POST',
        body: auth,
      }),
      invalidatesTags: ['books'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
  }),
});
export const { useGetPenggunaQuery, useRegisterMutation, useDeleteBookMutation, useLoginMutation } = authApi;
