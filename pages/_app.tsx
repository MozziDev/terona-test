import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../src/components/Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from "../src/store/store";
import {Provider} from 'react-redux'


function MyApp({ Component, pageProps }: AppProps) {
  return <>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
                    <ToastContainer />
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
          </PersistGate>
      </Provider>
         </>
}

export default MyApp
