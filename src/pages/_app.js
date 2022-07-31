import React, { useState } from 'react'
import App from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '../components/app'
import '../styles/global.css'
import { Provider } from 'react-redux';
import SafeHydrate from 'components/SafeHydrate';
import store from '../features/store'
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { CssBaseline } from '@mui/material';
import LayoutWrapper from 'components/layout/LayoutWrapper';


function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
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