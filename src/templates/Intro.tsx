import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, ReactNode } from 'react';
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  Variants,
} from 'framer-motion';

import { CustomNavbar as Navbar } from '@/components/_global/Navbar';
import { NeonButton } from '@/components/btns/';
import IntroBackground from '@/components/IntroBackground';
import { Modal } from '@/components/modals';

interface IntroProps {
  children: ReactNode;
  dialogContent: ReactNode;
  dialogTitle: string;
  nextHref: string;
  title: string;
}

const introFade: Variants = {
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

function animateNav(checkURL: boolean): Variants {
  const navControlHeader: Variants = {
    animate: {
      color: checkURL ? '#595959' : '#FFFFFF',
      opacity: 1,
      transition: {
        type: 'linear',
        duration: 0.8,
      },
    },
    initial: {
      transition: {
        type: 'linear',
        duration: 0.8,
      },
    },

    exit: {
      transition: {
        type: 'linear',
        duration: 0.4,
      },
    },
  };
  return navControlHeader;
}

const navBox: Variants = {
  animate: {
    opacity: 1,
    width: '7rem',
    transition: { duration: 0.6 },
  },
  initial: {
    opacity: 0,
    width: 0,
    transition: { duration: 0.6 },
  },
  exit: {
    opacity: 0,
    width: 0,
    transition: { duration: 0.6 },
  },
};

const navSubtitle: Variants = {
  animate: {
    opacity: 1,
    transition: { duration: 0.1, delay: 0.6 },
  },
  initial: {
    opacity: 0,
    transition: { duration: 0.1, delay: 0.6 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

const sections = [
  {
    slug: 1,
    subtitle: 'module',
  },
  {
    slug: 2,
    subtitle: 'module',
  },
  {
    slug: 3,
    subtitle: 'module',
  },
  {
    slug: 4,
    subtitle: 'module',
  },
];

function Intro({
  children,
  dialogContent,
  dialogTitle,
  nextHref,
  title,
}: IntroProps) {
  const router = useRouter();
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Modal
        isOpen={dialog}
        handleClose={() => setDialog(false)}
        title={dialogTitle}
      >
        {dialogContent}
      </Modal>
      <Navbar
        href="/config/1"
        text="go to configuration"
        transparentBackground
      />
      <IntroBackground />
      <div className="relative z-40">
        <div className="container grid grid-cols-1 lg:grid-cols-4 lg:gap-24 mx-auto px-4 py-8">
          <img
            className="mb-6 lg:mt-16"
            src="/assets/intro-side-title.svg"
            alt="Decide how you want your token economy to function"
          />
          <div className="col-span-2 text-white">
            <nav className="font-bj lg:mb-16">
              <ul className="flex gap-16">
                <AnimateSharedLayout>
                  {sections.map(({ slug, subtitle }) => (
                    <Link href={`/intro/${slug}`}>
                      <motion.li
                        animate="animate"
                        initial="initial"
                        exit="exit"
                        variants={animateNav(
                          router.pathname !== `/intro/${slug}`
                        )}
                        className="cursor-pointer text-gray-50 text-8xl flex items-end"
                      >
                        {slug}
                        <AnimatePresence>
                          {router.pathname === `/intro/${slug}` && (
                            <motion.div
                              animate="animate"
                              initial="initial"
                              exit="exit"
                              variants={navBox}
                              className="text-base ml-4 inline-block"
                            >
                              <motion.span
                                animate="animate"
                                initial="initial"
                                exit="exit"
                                variants={navSubtitle}
                              >
                                {subtitle}
                              </motion.span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    </Link>
                  ))}
                </AnimateSharedLayout>
              </ul>
            </nav>
            <motion.div
              exit="exit"
              animate="animate"
              initial="initial"
              variants={introFade}
            >
              {children}
              <a
                onClick={() => setDialog(true)}
                className="block font-bj font-bold text-sm text-neon uppercase my-6"
              >
                learn more
              </a>
            </motion.div>
          </div>
          <NeonButton href={nextHref}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mx-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </NeonButton>
        </div>
      </div>
    </>
  );
}

export default Intro;
