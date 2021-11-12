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
                {router.pathname.match('/config/[0-9]') && (
                  <footer className="fixed bottom-0 flex justify-center items-center bg-neon w-full h-8">
                    <div className="marquee">
                      <a
                        className="cursor-pointer"
                        href="https://calendar.google.com/calendar/u/0?cid=ZHRpbnQzYmE2NnY0cDJqN25uZWdlZnB2dmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="font-bj font-bold text-sm px-16 cursor-pointer">
                          🎉🎉 Please, keep informed and join our params parties
                          to develop some nice ECONOMIES with us! Click here to
                          check our calendar with the time of the events! 🎉🎉
                        </span>
                        <span className="font-bj font-bold text-sm px-16 cursor-pointer">
                          🎉🎉 Please, keep informed and join our params parties
                          to develop some nice ECONOMIES with us! Click here to
                          check our calendar with the time of the events! 🎉🎉
                        </span>
                      </a>
                    </div>
                  </footer>
                )}
              </ConvictionVotingProvider>
            </TaoVotingProvider>
          </ABCProvider>
        </TokenFreezeThawProvider>
      </ParamsProvider>
    </AnimatePresence>
  );
}

export default App;
