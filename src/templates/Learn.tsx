import Head from 'next/head';
import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

import { CustomNavbar as Navbar } from '@/components/Navbar';
import NeonButton from '@/components/NeonButton';

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

function Learn({ children, title, nextHref }: LearnProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="min-h-screen bg-black-one">
        <Navbar
          href="/learn/done"
          text="finish learning"
          transparentBackground={false}
        />
        <div className="container grid grid-cols-1 lg:grid-cols-4 lg:gap-24 mx-auto px-4 py-8">
          <img
            className="mb-4 lg:mt-16"
            src="/assets/learn-side-title.svg"
            alt="Getting familiar with the Commons configuration"
          />
          <motion.div
            exit="exit"
            animate="animate"
            initial="initial"
            variants={learnFade}
            className="col-span-2 text-white"
          >
            {children}
          </motion.div>
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

export default Learn;
