import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../src/components/Layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
            <ToastContainer />
            <Layout>
              <Component {...pageProps} />
            </Layout>
         </>
}

export default MyApp
