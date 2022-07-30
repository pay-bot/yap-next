import { configureStore } from '@reduxjs/toolkit';
import { adminDashboardApi } from './adminDashboardApi';
import sidebar from './sideBarSlice';
import navigation from './navigationSlice';
import modal from './modal/modalSlice';
import menu from './menuSlice';
import { authApi } from './authApi';
import authReducer from './authReducer';
import loading from './reactLoadingSlice';
import artCollection from './articleCollectionSlice';
import { Api } from './website/api/apiSlice';
import shortable from './shortableSlice';
// import cartReducer from './website/shop/cartSlices';
import crud from './crudSlice';

export default configureStore({
  reducer: {
    sidebar,
    navigation,
    modal,
    authReducer,
    loading,
    menu,
    artCollection,
    shortable,
    // cart: cartReducer,
    crud,

    [adminDashboardApi.reducerPath]: adminDashboardApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminDashboardApi.middleware),
});

// store.dispatch(getTotals());
