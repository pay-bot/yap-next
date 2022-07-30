import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './authApi';
import authReducer from './authReducer';


export default configureStore({
  reducer: {
   
    authReducer,
   

    [authApi.reducerPath]: authApi.reducer,
    // [Api.reducerPath]: Api.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminDashboardApi.middleware),
});

// store.dispatch(getTotals());
