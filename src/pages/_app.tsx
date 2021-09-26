import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import '../styles/global.css';
import { ParamsProvider } from '@/hooks/useParams';

function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <ParamsProvider>
        <Component {...pageProps} />
      </ParamsProvider>
    </AnimatePresence>
  );
}

export default App;
