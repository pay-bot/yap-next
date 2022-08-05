import React, { useState } from 'react'
import App from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider, MutationCache } from '@tanstack/react-query';
import Layout from '../components/app'
import '../styles/global.css'
import { Provider } from 'react-redux';
import SafeHydrate from 'components/SafeHydrate';
import store from '../features/store'
import { CssBaseline } from '@mui/material';
import LayoutWrapper from 'components/layout/LayoutWrapper';
import { useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";


function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 30000,
          },
        },
        mutationCache: new MutationCache({
          // ⬇️ but we need it here

          onError: (error) => console.log(error),
        }),
      })
  );

  // const isLoading = useSelector((state) => state.loading.isReactLoading);
  // const eventMove = useSelector((state) => state.shortable.isMove);
  // const isLogin = useSelector((state) => state.authReducer);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer closeOnClick autoClose="2000" pauseOnHover={false} />

      <SafeHydrate>
        <Hydrate state={pageProps.dehydratedState}>

          <Provider store={store}>
            <LayoutWrapper>
              {/* <Layout> */}
              <Component {...pageProps} />
              {/* </Layout> */}
            </LayoutWrapper>
          </Provider>
        </Hydrate>
      </SafeHydrate>
    </QueryClientProvider>
  )
}

export default MyApp