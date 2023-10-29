/* eslint-disable jsx-a11y/media-has-caption */
import {
  AnimatePresence,
  AnimateSharedLayout,
  Variants,
  motion,
} from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

import { CustomNavbar as Navbar } from '@/components/_global/Navbar';
import { Checkbox, NeonButton } from '@/components/btns';

interface LearnProps {
  children: ReactNode;
  nextHref: string;
  title: string;
}

const learnFade: Variants = {
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
    subtitle: 'Token and its value',
  },
  {
    slug: 2,
    subtitle: 'The Ecomonic engine',
  },
  {
    slug: 3,
    subtitle: 'Governing the Commons',
  },
  {
    slug: 4,
    subtitle: 'Projects and funding',
  },
];

function Learn({ children, title, nextHref }: LearnProps) {
  const [checked] = useState<boolean>(true);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar
        href="/learn/done"
        text="finish learning"
        transparentBackground={false}
      />
      <div className="min-h-screen bg-black-300 z-40 absolute">
        <div className="relative z-0">
          <div className="fixed -left-5/10 top-1/10">
            <Image
              className="-rotate-90"
              src="/animation.png"
              layout="fixed"
              width="1246"
              height="1087"
            />
          </div>
          <div className="fixed left-7/10 top-2/10">
            <Image
              src="/animation.png"
              layout="fixed"
              width="1246"
              height="1087"
            />
          </div>
        </div>
        <div className="container grid grid-cols-1 lg:grid-cols-4 lg:gap-24 mx-auto px-4 py-8 z-40 relative">
          <img
            className="mb-4 lg:mt-16"
            src="/assets/learn-side-title.svg"
            alt="Getting familiar with the Commons configuration"
          />
          <div className="col-span-2">
            <nav className="font-bj lg:mb-16 h-24">
              <ul className="flex gap-16 items-center">
                <AnimateSharedLayout>
                  {sections.map(({ slug, subtitle }) => (
                    <Link href={`/learn/${slug}`} key={slug}>
                      <motion.li
                        animate="animate"
                        initial="initial"
                        exit="exit"
                        variants={animateNav(
                          router.pathname !== `/learn/${slug}`
                        )}
                        className="cursor-pointer text-gray-50 text-8xl flex items-end"
                      >
                        {slug}
                        <AnimatePresence>
                          {router.pathname === `/learn/${slug}` && (
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
              variants={learnFade}
            >
              <div className="text-white">{children}</div>
              <div className="mt-6">
                <Checkbox text="I understood everything and I’m able to configure the parameters" />
              </div>
              <div className="mt-10">
                <NeonButton disabled={!checked} href={nextHref}>
                  next
                </NeonButton>
              </div>
            </motion.div>
          </div>
          <NeonButton disabled={!checked} href={nextHref}>
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

export default Learn;
