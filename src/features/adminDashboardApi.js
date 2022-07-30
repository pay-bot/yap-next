import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminDashboardApi = createApi({
  reducerPath: 'dashboard',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}` }),
  endpoints: (builder) => ({ getAllNavigations: builder.query({ query: () => 'navigations' }) }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllNavigationsQuery } = adminDashboardApi;
