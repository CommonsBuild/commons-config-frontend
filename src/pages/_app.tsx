import type { ReactElement, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import type { NextPage } from 'next';

import '../styles/global.css';
import {
  ABCProvider,
  ConvictionVotingProvider,
  ParamsProvider,
  TaoVotingProvider,
  TokenFreezeThawProvider,
} from '@/hooks';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <AnimatePresence exitBeforeEnter>
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
    </AnimatePresence>
  );
}

export default App;
