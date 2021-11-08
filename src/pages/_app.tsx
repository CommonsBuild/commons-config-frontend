import type { ReactElement, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import type { NextPage } from 'next';

import '../styles/global.css';
import { ConfigNavbar as Navbar } from '@/components/_global';
import {
  ABCProvider,
  ConvictionVotingProvider,
  ParamsProvider,
  TaoVotingProvider,
  TokenFreezeThawProvider,
} from '@/hooks';
import IntroBackground from '@/components/IntroBackground';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  return getLayout(
    <AnimatePresence exitBeforeEnter>
      <ParamsProvider>
        <TokenFreezeThawProvider>
          <ABCProvider>
            <TaoVotingProvider>
              <ConvictionVotingProvider>
                {router.pathname.match('/config/[0-9]') && <Navbar />}
                <Component {...pageProps} />
                {router.pathname.match('/intro/[0-9]') && <IntroBackground />}
              </ConvictionVotingProvider>
            </TaoVotingProvider>
          </ABCProvider>
        </TokenFreezeThawProvider>
      </ParamsProvider>
    </AnimatePresence>
  );
}

export default App;
