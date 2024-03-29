import { Navbar } from '@/components/_global';
import { useParams } from '@/hooks';
import errorToast from '@/lib/notifications/error';
import api from '@/services/api';
import classnames from 'classnames';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

const success: Variants = {
  animate: {
    opacity: 1,
    transition: { ease: 'easeInOut', delay: 0.6, duration: 0.6 },
  },
  initial: {
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 0.6 },
  },
  exit: {
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 0.6 },
  },
};

const loading: Variants = {
  animate: {
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.6 },
  },
  initial: {
    opacity: 0.75,
    transition: { ease: 'easeInOut', duration: 0.6 },
  },
  exit: {
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 0.6 },
  },
};

function Import() {
  const router = useRouter();
  const { setParams } = useParams();
  const [isLoading, setIsLoading] = useState<number>(400);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      api
        .get('/import-parameters/', {
          params: {
            issueNumber: id,
          },
        })
        .then((response) => {
          const {
            tokenLockup,
            augmentedBondingCurve,
            taoVoting,
            convictionVoting,
            advancedSettings,
            title,
            overallStrategy,
          } = response.data;
          const { strategy: tokenFreezeStrategy, ...tokenFreeze } = tokenLockup;
          const { strategy: ABCStrategy, ...abc } = augmentedBondingCurve;
          const { strategy: taoStrategy, ...tao } = taoVoting;
          const { strategy: convictionStrategy, ...conviction } =
            convictionVoting;
          const { strategy: advancedStrategy, ...advanced } = advancedSettings;
          const newParams = {
            title,
            overallStrategy,
            tokenFreezeStrategy,
            ABCStrategy,
            taoStrategy,
            convictionStrategy,
            advancedStrategy,
            ...tokenFreeze,
            ...abc,
            ...tao,
            ...conviction,
            ...advanced,
            convictionVotingPeriodDays: String(conviction.votingPeriodDays),
            tableScenarios: conviction.tableScenarios || [],
            transferable: Boolean(advanced.transferability),
            zoomGraph: '0',
          };
          localStorage.setItem('params', JSON.stringify(newParams));
          setParams({ ...newParams });
          setIsLoading(response.status);
        })
        .catch(() => errorToast());
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Import | Commons Dashboard</title>
      </Head>
      <div className="min-h-screen h-full bg-dash bg-cover">
        <Navbar />
        <div className="flex flex-col justify-center items-center mt-48">
          <AnimatePresence>
            <motion.div
              key={`success-${isLoading}`}
              exit="exit"
              animate="animate"
              initial="initial"
              variants={success}
              className={classnames({ hidden: isLoading !== 200 })}
            >
              <h3 className="font-inter font-medium text-3xl text-center text-neon-light mt-18 px-96">
                The parameters we&apos;re imported successfully.{' '}
                <Link legacyBehavior href="/config/1">
                  <a className="font-bold text-neon underline">Click here</a>
                </Link>{' '}
                to start modifying the parameters!
              </h3>
            </motion.div>
            <motion.div
              key={`loading-${isLoading}`}
              exit="exit"
              animate="animate"
              initial="initial"
              variants={loading}
              className={classnames(
                'flex flex-col justify-center items-center',
                {
                  hidden: isLoading >= 200 && isLoading < 400,
                }
              )}
            >
              <h1 className="font-bj font-bold text-6xl text-center text-neon uppercase">
                importing parameters
              </h1>
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-neon mt-12" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Toaster />
    </>
  );
}
export default Import;
