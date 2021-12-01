import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [banner, setBanner] = useState<boolean>(true);

  return getLayout(
    <AnimatePresence exitBeforeEnter>
      <ParamsProvider>
        <TokenFreezeThawProvider>
          <ABCProvider>
            <TaoVotingProvider>
              <ConvictionVotingProvider>
                {router.pathname.match('/config/[0-9]') && (
                  <AnimatePresence>
                    {banner && (
                      <motion.div
                        key="marquee"
                        animate={{ opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed flex justify-center items-center bg-neon w-full h-12 z-100"
                      >
                        <a
                          className="cursor-pointer"
                          href="https://calendar.google.com/calendar/u/0?cid=ZHRpbnQzYmE2NnY0cDJqN25uZWdlZnB2dmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="relative flex overflow-x-hidden">
                            <div className="animate-marquee whitespace-nowrap">
                              <span className="font-bj font-bold text-sm uppercase mx-4 cursor-pointer">
                                🎉🎉 Join our param parties to build some
                                amazing economies with us! 🎉🎉
                              </span>
                              <span className="font-bj font-bold text-sm uppercase mx-4 cursor-pointer">
                                🎉🎉 Join our param parties to build some
                                amazing economies with us! 🎉🎉
                              </span>
                              <span className="font-bj font-bold text-sm uppercase mx-4 cursor-pointer">
                                🎉🎉 Join our param parties to build some
                                amazing economies with us! 🎉🎉
                              </span>
                              <span className="font-bj font-bold text-sm uppercase mx-4 cursor-pointer">
                                🎉🎉 Join our param parties to build some
                                amazing economies with us! 🎉🎉
                              </span>
                            </div>
                            <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
                              <span className="font-bj font-bold text-sm uppercase mx-4 cursor-pointer">
                                🎉🎉 Join our param parties to build some
                                amazing economies with us! 🎉🎉
                              </span>
                              <span className="font-bj font-bold text-sm uppercase mx-4 cursor-pointer">
                                🎉🎉 Join our param parties to build some
                                amazing economies with us! 🎉🎉
                              </span>
                              <span className="font-bj font-bold text-sm uppercase mx-4 cursor-pointer">
                                🎉🎉 Join our param parties to build some
                                amazing economies with us! 🎉🎉
                              </span>
                              <span className="font-bj font-bold text-sm uppercase mx-4 cursor-pointer">
                                🎉🎉 Join our param parties to build some
                                amazing economies with us! 🎉🎉
                              </span>
                            </div>
                          </div>
                        </a>
                        <div className="absolute right-0 h-8 w-16 bg-neon flex items-center justify-center">
                          <span
                            className="font-bj font-bold text-red-400 cursor-pointer z-50"
                            onClick={() => setBanner(false)}
                          >
                            X
                          </span>
                        </div>
                      </motion.div>
                    )}
                    <motion.div
                      key="navbar"
                      initial={{ y: '3rem', paddingBottom: '1rem' }}
                      animate={!banner && { y: 0, paddingBottom: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <Navbar />
                    </motion.div>
                  </AnimatePresence>
                )}
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
