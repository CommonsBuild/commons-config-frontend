import { AppProps } from 'next/app';
import '../styles/global.css';
import {
  ABCProvider,
  ConvictionVotingProvider,
  ParamsProvider,
  TaoVotingProvider,
  TokenFreezeThawProvider,
} from '@/hooks';

function App({ Component, pageProps }: AppProps) {
  return (
    <ParamsProvider>
      <TokenFreezeThawProvider>
        <ABCProvider>
          <TaoVotingProvider>
            <ConvictionVotingProvider>
              <Component {...pageProps} />
            </ConvictionVotingProvider>
          </TaoVotingProvider>
        </ABCProvider>
      </TokenFreezeThawProvider>
    </ParamsProvider>
  );
}

export default App;
