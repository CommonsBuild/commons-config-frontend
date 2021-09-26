import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import '../styles/global.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default App;
