import { AppProps } from 'next/app';
import '../styles/global.css';
import { ParamsProvider } from '@/hooks/useParams';

function App({ Component, pageProps }: AppProps) {
  return (
    <ParamsProvider>
      <Component {...pageProps} />
    </ParamsProvider>
  );
}

export default App;
